<template>
  <div v-if="this.$cookies.get('emailProfessor') !== null">
    <Navbar />

    <div class="modules">
      <div class="card" id="infos">
        <div class="additional">
          <div class="info-card">
            <h6>{{ branchName }}</h6>
            <h6>Responsable : {{ responsableName }}</h6>
            <h6>Email : {{ responsableEmail }}</h6>
          </div>
        </div>
      </div>
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
      <div class="card" id="details">
        <div class="general">
          <h1>{{ branchName }}</h1>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Matiere</th>
                <th>Semestre</th>
                <th>Cours</th>
                <th>TD</th>
                <th>TP</th>
                <th>Enseignant</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mat in matN" :key="mat">
                <td>{{ mat.matiereName }}</td>
                <td>1</td>
                <td>{{ mat.nbCours }}</td>
                <td>{{ mat.nbTD }}</td>
                <td>{{ mat.nbTP }}</td>
                <td>{{ mat.profName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div
    class="card alert alert-danger alert-dismissible"
    style="height: 200px; width: 500px; margin-left: 30%; margin-top: 50px"
    v-else
  >
    <div style="margin-top: 50px">
      Veuillez vous connecter pour accéder aux données. <br />
      <router-link :to="{ name: 'login'}">Se connecter</router-link>
    </div>
  </div>
</template>
<style scoped>
#infos {
  width: 200px;
  margin-left: 10px;
  margin-top: 120px;

  height: 400px;
}
#details {
  width: 70%;
  margin-top: 40px;
  margin-left: 40px;
  border: none;
}
.additional {
  position: absolute;
  width: 200px;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #55608f;
  transition: width 0.4s;
  overflow: hidden;
  z-index: 2;
}
.modules {
  display: flex;
}
td {
  margin-top: 5%;
  cursor: pointer;
}
h6 {
  color: #fff;
  margin-top: 40px;
}

a {
  text-decoration: none;
  color: black;
}
table {
  width: 100%;
  height: 100%;
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
  background-color: #55608f;
  color: #eee;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0);
}
tbody td {
  position: relative;
}
select {
  width: 100%;
}
#save {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}
#demande {
  border-color: #55608f;
  background-color: #55608f;
}
#ensDemande {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
  width: 150px;
  margin-bottom: 0%;
}

@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  .modules {
    flex-flow: row wrap;
  }
  .card {
    width: 300px;
    margin-left: 20px;
  }
  #infos {
    margin-top: 20%;
    margin-left: 40px;
  }
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
    border: 1px solid #eee;
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
    position: initial;
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
    content: "Matière";
  }
  td:nth-of-type(2):before {
    content: "Semestre";
  }
  td:nth-of-type(3):before {
    content: "Cours";
  }
  td:nth-of-type(4):before {
    content: "TD";
  }
  td:nth-of-type(5):before {
    content: "TP";
  }
}
</style>

<script>
import Navbar from "../Navbar_Prof";

import axios from "axios";

export default {
  name: "Details_Filiere",
  components: {
    Navbar,
  },
  data() {
    return {
      matieres: [],
      branchName: String,
      cmDone: Number,
      tdDone: Number,
      tpDone: Number,
      matN: [],
      ProfN: String,
      responsableName: String,
      responsableEmail: String,
      isLoading: true,
    };
  },

  mounted() {
    this.branchName =
      this.$cookies.get("filiere").branchCookie.substring(0, 2) +
      " " +
      this.$cookies.get("filiere").branchName;
    //get responsable information
    axios
      .get(
        "https://back-serverdevoeux.herokuapp.com/api/responsible/" +
          this.$cookies.get("filiere").branchCookie +
          "/responsibles"
      )
      .then((response) => {
          console.log("cc")
        console.log(response)
          if (response.data.length === 0) {
              this.responsableName ="-";
              this.responsableEmail="-";
          } else {
              response.data.forEach((val) => {

                  console.log(val)
                  if(val.lastname !== null){
                      this.responsableName = val.lastname + " " + val.firstname;
                      this.responsableEmail = val.email;
                  }else{
                      this.responsableName ="";
                      this.responsableEmail="";
                  }

              });
          }

      });
    //get branch information
    axios
      .get(
        "http://146.59.195.214:8006/api/v1/events/" +
          this.$cookies.get("filiere").branchCookie +
          "/matiere"
      )
      .then((response) => {
        console.log(this.$cookies.get("filiere").branchCookie);
        response.data.forEach((matiere) => {
          (this.ProfN = ""),
            axios
              .get(
                "http://146.59.195.214:8006/api/v1/events/teacher/" + matiere
              )
              .then((prof) => {
                if (prof.data.length !== 0) {
                  console.log(prof.data);
                  prof.data.forEach((val) => {
                    axios
                      .get(
                        "http://146.59.195.214:8006/api/v1/stats/teacher/matieres/" +
                          val.split(" ")[0] +
                          "/" +
                          val.split(" ")[1]
                      )
                      .then((response) => {
                        for (var i in response.data) {
                          if (i === matiere) {
                            this.matieres.push({
                              brName: this.$cookies.get("filiere").branchName,
                              brCookie: this.$cookies.get("filiere")
                                .branchCookie,
                              matiereName: matiere,
                              nbCours: response.data[i].cmDone,
                              nbTD: response.data[i].tdDone,
                              nbTP: response.data[i].tpDone,
                              profName: val,
                            });
                          }
                        }
                        this.matN = this.removeDuplicate(this.matieres);
                        console.log(this.matN);
                      });
                  });
                }
              });
        });
      });
    this.isLoading = false;
    console.log(this.matieres);
  },
  methods: {
    removeDuplicate(table) {
      let unique = [];
      var cache = {};
      unique = table.filter(function (elem) {
        return cache[elem.matiereName] ? 0 : (cache[elem.matiereName] = 1);
      });

      //  console.log(unique);
      return unique;
    },
    setCookie(item) {
      this.$cookies.set("hours", item.nbCours);
      this.$cookies.set("cours", item.matiereName);

      this.$router.push("/detailsMatiere");
    },
  },
};
</script>
