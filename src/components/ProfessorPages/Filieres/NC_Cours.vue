<template>
  <div class="table-responsive">
    <!-- navbar with links to others pages-->
    <Navbar />
    <h2>Liste des Enseignants</h2>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th @click="sortLastName()">Filiere</th>
          <th @click="sortFirstName()">Matière</th>
          <th>Cours</th>
          <th>TD</th>
          <th>TP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in matInfo" :key="info">
          
          <td>{{ info.filiere }}</td>
          <td>{{ info.cours }}</td>
          <td>test</td>
          <td>test</td>
          <td>test</td>
        </tr>
      </tbody>
    </table>
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
      matInfo:[],
      matN:[],
    };
  },

  mounted() {
    axios
      .get("http://146.59.195.214:8006/api/v1/events/matieres")
      .then((response) => {
       // console.log(response)
        response.data.forEach((matiere) => {
            
          if (matiere !== ""){
            
          //  console.log("in")
            axios
              .get(
                "http://146.59.195.214:8006/api/v1/events/teacher/" + matiere
              )
              .then((prof) => {
             //   console.log(matiere +"        "+ prof.data.length);
                if (prof.data.length === 0) {
                  this.professors.push({
                    name: matiere,
                  });
                }
             //   console.log(this.professors);
              });
          }
        });
      });

    axios
      .get("http://146.59.195.214:8006/api/v1/events/filieres")
      .then((response) => {
        //  console.log(response);
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
                  //    console.log(matr);
                  this.professors.forEach((cours) => {
                    //console.log(cours.name)
                    if (cours.name === mat) {
                      this.matInfo.push({
                        cours: cours.name,
                        filiere: filiere,

                      });
                    }
                   this.matN = this.removeDuplicate(this.matInfo);
                    
                  });
                  
                });
              });
              
          }
        });
      });
  },
  methods: {
    sortLastName() {
      this.professors.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        else if (a.lastName == b.lastName) return 0;
        else return 1;
      });
    },
    sortFirstName() {
      this.professors.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        else if (a.firstName == b.firstName) return 0;
        else return 1;
      });
    },
    setCookie(prof) {
      this.$cookies.set("prof", prof);
      console.log(this.$cookies.get("prof"));
      //  this.$cookies.set("lastName", lastName);
      // this.$cookies.set("email", email);
      this.$router.push("/professorService");
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