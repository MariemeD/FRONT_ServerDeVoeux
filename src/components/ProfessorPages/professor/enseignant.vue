<template>
  <div class="table-responsive" v-if="this.$cookies.get('emailProfessor') !== null">
    <!-- navbar with links to others pages-->
    <Navbar />
    <h2>Liste des Enseignants</h2>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th @click="sortLastName()">Nom</th>
          <th @click="sortFirstName()">Prenom</th>
          <th>Origine</th>
          <th>Statut</th>
          <th>Service Statutaire</th>
          <th>Servcie Efféctué</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prof in professors" :key="prof">
          <td @click="setCookie(prof)">
            {{ prof.lastName }}
          </td>
          <td>{{ prof.firstName }}</td>
          <td>{{ prof.origin }}</td>
          <td>{{ prof.status }}</td>
          <td>{{ prof.serviceStatutaire }}</td>
          <td>{{ prof.serviceEffectue }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card alert alert-danger alert-dismissible" style="height: 200px; width: 500px; margin-left:30%; margin-top:50px;" v-else>
    <div style="margin-top:50px" > Veuillez vous connecter pour accéder aux données. <br>
      <!--<a href="/login">
        Se connecter </a>-->
        <router-link :to="{ name: 'login'}">Se connecter</router-link>
    </div>
  </div>
</template>

<style scoped>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

h2 {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  margin-top: 50px;
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
  name: "enseignant",
  components: {
    Navbar,
  },
  data() {
    return {
      info: ["test", "best"],
      professors: [],
    };
  },

  mounted() {
  
    // get List od professors
    axios
      .get("http://146.59.195.214:8006/api/v1/teachers/all")
      .then((response) => {
        response.data.forEach((prof) => {
          if (prof.department === "Département d&#039;Informatique") {
            prof.department = "Département Informatique";
          }
          // get Professor's details
      axios
            .get(
              "http://146.59.195.214:8006/api/v1/stats/teacher/details/" +
                prof.firstName +
                "/" +
                prof.lastName
            )
            .then((service) => {
               
          
                this.professors.push({
                  firstName: prof.firstName,
                  lastName: prof.lastName,
                  origin: prof.department,
                  email: prof.email,
                  status: prof.status,
                  serviceStatutaire: prof.service,
                  serviceEffectue: service.data.Done.cm +service.data.Done.td +service.data.Done.tp
                });
           
            });
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
      this.$router.push("/professorService");
    },
  },
};
</script>
