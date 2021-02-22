<template>
  <div
    class="table-responsive"
    v-if="this.$cookies.get('emailProfessor') !== null"
  >
    <!-- navbar with links to others pages-->
    <Navbar />
    <h2>Liste des Enseignants</h2>
    <div class="progress mt-4" v-if="isLoading">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="90"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 90%; background-color: #536895"
      ></div>
    </div>
    <table class="table table-bordered table-striped" v-else>
      <thead>
        <tr>
          <th @click="sortFiliere()">Filiere</th>
          <th @click="sortMatiere()">Matière</th>
          <th>Volume d'heure par groupe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in matInfo" :key="info">
          <td>{{ info.filiere }}</td>
          <td>{{ info.cours }}</td>
          <td>{{ info.nbrCours }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="card alert alert-danger alert-dismissible"
    style="height: 200px; width: 500px; margin-left: 30%; margin-top: 50px"
    v-else
  >
    <div style="margin-top: 50px">
      Veuillez vous connecter pour accéder aux données. <br />
      <a href="/login"> Se connecter </a>
    </div>
  </div>
</template>

<style scoped>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

h2 {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}
table {
  width: 90%;
  margin-left: 5%;
  border-collapse: collapse;
  overflow: hidden;

  margin-top: 30px;
}

th,
td {
  padding: 15px;
}

th {
  text-align: center;
  cursor: pointer;
  background-color: #55608f;
  color: #eee;
}

tbody td {
  position: relative;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: black;
}
tbody tr:hover {
  background-color: rgba(255, 255, 255, 0);
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 2px solid #eee;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 100%;
    white-space: nowrap;
  }

  /*
		Label the data
		*/

  td:nth-of-type(1):before {
    content: "Nom";
  }
  td:nth-of-type(2):before {
    content: "Prenom";
  }
  td:nth-of-type(3):before {
    content: "origine";
  }
  td:nth-of-type(4):before {
    content: "statut";
  }
  td:nth-of-type(5):before {
    content: "service statutaire";
  }
  td:nth-of-type(6):before {
    content: "service effectué";
  }
}
</style>
<script>
import Navbar from "../Navbar_Prof";
import axios from "axios";

export default {
  name: "Professors",
  components: {
    Navbar,
  },
  props: ["mat"],
  data() {
    return {
      professors: [],
      matInfo: [],
      matN: [],
      isLoading: true,
    };
  },

  mounted() {
    // get Non covered cours
    axios
      .get("http://146.59.195.214:8006/api/v1/events/matieres")
      .then((response) => {
        response.data.forEach((matiere) => {
          if (matiere !== "") {
            axios
              .get(
                "http://146.59.195.214:8006/api/v1/events/teacher/" + matiere
              )
              .then((prof) => {
                if (prof.data.length === 0) {
                  this.professors.push({
                    matiere: matiere,
                  });
                }
              });
          }
        });
      });
      //get branch of NC cours
    axios
      .get("http://146.59.195.214:8006/api/v1/events/filieres")
      .then((response) => {
       
        response.data.forEach((filiere) => {
          if (
            filiere !== "DEPOT DE DEVOIR(SFA" &&
            filiere !== "" &&
            filiere !== "ORAL(SFA" &&
            filiere !== "QUIZZ(SFA"
          ) {
            axios
              .get(
                "http://146.59.195.214:8006/api/v1/events/" +
                  filiere +
                  "/matiere"
              )
              .then((matr) => {
                matr.data.forEach((mat) => {
                
                  this.professors.forEach((val) => {
                    if (val.matiere === mat) {
                      this.matInfo.push({
                        cours: val.matiere,
                        filiere: filiere,
                        nbrCours: "21.0h",
                      });
                    }
                  });

                  this.matN = this.removeDuplicate(this.matInfo);
                  this.isLoading = false;
                });
              });
          }
        });
      });
  },
  methods: {
    sortMatiere() {
      this.professors.sort((a, b) => {
        if (a.cours < b.cours) return -1;
        else if (a.cours == b.cours) return 0;
        else return 1;
      });
    },
    sortFiliere() {
      this.professors.sort((a, b) => {
        if (a.filiere < b.filiere) return -1;
        else if (a.filiere == b.filiere) return 0;
        else return 1;
      });
    },
    removeDuplicate(table) {
      let unique = [];
      var cache = {};
      unique = table.filter(function (elem) {
        return cache[elem.name] ? 0 : (cache[elem.name] = 1);
      });

      //  console.log(unique);
      return unique;
    },
  },
};
</script>