<template>
  <div>
    <Navbar />
    <div class="modules">
      <div class="card" id="infos">
        <div class="additional">
          <div class="info-card">
            <h6>{{ firstName }} {{ lastName }}</h6>
            <h6>Grad : {{ status }}</h6>
            <h6>{{ origin }}</h6>
            <h6>{{ email }}</h6>
          </div>
        </div>
      </div>
      <div class="card" id="details">
        <div class="general">
          <h1>Service de {{ firstName }} {{ lastName }}</h1>

          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Enseignement</th>
                <th>Filière</th>
                <th>Cours</th>
                <th>TD</th>
                <th>TP</th>
                <th>Total en équivalent TD</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="info in matInfo" :key="info">
                <td>{{ info.cours }}</td>
                <td>{{ info.filiere }}</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td colspan="5">total</td>
                <td>0</td>
              </tr>
              <tr>
                <td colspan="5">statutaire</td>
                <td>{{ service }}</td>
              </tr>

              <tr>
                <td colspan="5">deficit</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#infos {
  width: 200px;
  margin-left: 10px;
  margin-top: 90px;

  height: 400px;
}
#details {
  width: 70%;
  margin-top: 90px;
  margin-left: 40px;
  height: 400px;
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
    border: 2px solid #eee;
  }
  tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.3);
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
    content: "Type";
  }
  td:nth-of-type(2):before {
    content: "Volume";
  }
  td:nth-of-type(3):before {
    content: "Nbr de groupe";
  }
  td:nth-of-type(4):before {
    content: "Enseignement";
  }
}
</style>
<script>
import Navbar from "../Navbar_Prof";
import axios from "axios";

export default {
  name: "Prof_Service",
  components: {
    Navbar,
  },
  data() {
    return {
      info: ["test", "best"],
      matieres: [],
      matInfo: [],
      firstName: String,
      lastName: String,
      status: String,
      origin: String,
      email: String,
      service: String,
    };
  },
  mounted() {
    this.firstName = this.$cookies.get("prof").firstName;
    this.lastName = this.$cookies.get("prof").lastName;
    this.status = this.$cookies.get("prof").status;
    this.origin = this.$cookies.get("prof").origin;
    this.email = this.$cookies.get("prof").email;
    console.log(this.$cookies.get("prof"))
    axios
      .get(
        "http://146.59.195.214:8006/api/v1/events/teacher/" +
          this.firstName +
          "/" +
          this.lastName
      )
      .then((response) => {
        response.data.forEach((mat) => {
          axios
            .get("http://146.59.195.214:8006/api/v1/teachers/all")
            .then((response) => {
              response.data.forEach((prof) => {
                if (this.email == prof.email) {
                  this.matieres.push({
                    name: mat,
                  });
                  this.service = prof.service;
                 
                }
         

              });
     

            });
        });
      }); 
   console.log(this.matieres)
    axios
      .get("http://146.59.195.214:8006/api/v1/events/filieres")
      .then((response) => {
       console.log(response)
        response.data.forEach((filiere) => {
          if(filiere !== "DEPOT DE DEVOIR(SFA" && filiere !== "" && filiere!=="ORAL(SFA" && filiere !== "QUIZZ(SFA"){
          axios
            .get(
              "http://146.59.195.214:8006/api/v1/events/" + filiere + "/matiere"
            )
            .then((matr) => {
              
              matr.data.forEach((mat) => {
                console.log(matr)
                this.matieres.forEach((cours) => {
                  
                //console.log(cours.name)
                  if (cours.name === mat) {
                    
                    this.matInfo.push({
                      cours: cours.name,
                      filiere: filiere,
                    });
                  }
                });
              });
            });
             }
        });
      });
  },
};
</script>