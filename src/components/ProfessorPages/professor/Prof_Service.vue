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
          
          <table class="table table-striped">
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
              <tr>
                <td>Hennach</td>
                <td>Leila</td>
                <td>testOrigine</td>
                <td>testStatut</td>
                <td>testStatut</td>
                <td>testStatut</td>
              </tr>
              <tr>
                <td>Bourlier</td>
                <td>Sylvie</td>
                <td>testOrigine</td>
                <td>testStatut</td>
              </tr>
              <tr>
                <td>Bourlier</td>
                <td>Sylvie</td>
                <td>testOrigine</td>
                <td>testStatut</td>
              </tr>

              <tr>
                <td>Bourlier</td>
                <td>Sylvie</td>
                <td>testOrigine</td>
                <td>testStatut</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--div class="card">
      <div class="additional">
        <div class="info-card">
          <h3>Leila Hennach</h3>
          <h3>Grad:</h3>
          <h3>Université</h3>
          <h3>email</h3>
        </div>
      </div>
      <div class="general">
        <h1>Service de Leila</h1>
        <table class="table">
          <thead>
            <tr>
              <th>Enseignement</th>
              <th>Filière</th>
              <th>Cours</th>
              <th>TD</th>
              <th>TP</th>
              <th>Total en Equivalent TD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hennach</td>
              <td>Leila</td>
              <td>testOrigine</td>
              <td>testStatut</td>
              <td>testService</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td>testOrigine</td>
              <td>testStatut</td>
              <td>testService</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td>testOrigine</td>
              <td>testStatut</td>
              <td>testService</td>
              <td>100</td>
            </tr>

            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td>testOrigine</td>
              <td>testStatut</td>
              <td>testService</td>
              <td>100</td>
            </tr>
            <tr>
              <td colspan="5">Total</td>
              <td>100</td>
            </tr>
            <tr>
              <td colspan="5">Heures Statutaire</td>
              <td>100</td>
            </tr>
            <tr>
              <td colspan="5">Déficit</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div-->
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
  margin-left:40px;
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
      firstName:String,
      lastName:String,
      status: String,
      origin:String,
      email:String
    };
  },
  mounted(){
    console.log
    this.firstName =this.$cookies.get("prof").firstName;
    this.lastName= this.$cookies.get("prof").lastName;
    this.status = this.$cookies.get("prof").status;
    this.origin= this.$cookies.get("prof").origin;
    this.email= this.$cookies.get("prof").email;
     axios
      .get("http://146.59.195.214:8006/api/v1/events/teacher/"+this.firstName+"/"+this.lastName)
      .then((response) => {
        response.data.forEach((mat) => {
           this.matieres.push({
             name: mat
           })
        });
      });
    
  }
};
</script>