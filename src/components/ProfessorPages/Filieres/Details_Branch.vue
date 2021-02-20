<template>
<div>
 <Navbar />
  <div class="modules">
      <div class="card" id="infos">
       <div class="additional">
        <div class="info-card">
          <h3>{{ branchName }}</h3>
          <h3>Responsable : email </h3>
       
          
        </div>
      </div>

       
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
          
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="mat in matieres" :key="mat">
          <td>{{ mat.matiereName }}</td>
          <td>Leila</td>
          <td>testOrigine</td>
          <td>testStatut</td>
          <td>testService</td>
         
        </tr>
      </tbody>
    </table>
       
      </div>
      </div>
    </div>
    <!--div class="card">
      <div class="additional">
        <div class="info-card">
          <h3>MIAGE</h3>
          <h3>Responsable : email </h3>
          <h3>Etat de filière </h3>
          
        </div>
      </div>
      <div class="general">
        <h1>Nom de la Branche</h1>
        <table class="table">
      <thead>
        <tr>
          <th>Matiere</th>
          <th>Semestre</th>
          <th>Cours</th>
          <th>TD</th>
          <th>TP</th>
          <th>TP</th>
         
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="/detailsModule"> Module_name </a></td>
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
  margin-top: 40px;

  height: 400px;
}
#details {
  width: 70%;
  margin-top: 40px;
  margin-left:40px;
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
h3 {
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
    position:initial;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 100%;
    white-space:nowrap;
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
import Navbar from '../Navbar_Prof';
import axios from "axios";

export default {
  name : 'Details_Filiere',
   data() {
    return {
      matieres: [],
      branchName:String
    };
  },
  components: {
   Navbar
  },
  mounted (){
    this.branchName= this.$cookies.get("filiere").branchCookie.substring(0, 2)+" "+this.$cookies.get("filiere").branchName;
     axios
      .get("http://146.59.195.214:8006/api/v1/events/"+this.$cookies.get("filiere").branchCookie+"/matiere")
      .then((response) => {
        console.log(this.$cookies.get("filiere").branchCookie)
          response.data.forEach((matiere) => {
        this.matieres.push({
          matiereName:matiere
        })
       // console.log(this.matieres)
          });
      });
  }
}
</script>
