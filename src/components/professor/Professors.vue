<template>
  <div class="table-responsive">
    <!-- navbar with links to others pages-->
  <Navbar />
    <h2>Liste des Enseignants </h2>
    <table class="table">
      <thead>
        <tr>
          <th @click="sortDate()"> Nom</th>
          <th>Prenom</th>
          <th>Origine</th>
          <th>Statut</th>
          <th>Service Statutaire</th>
          <th>Servcie Efféctué</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a class="nav-item nav-link" href="professorService">Hennach</a></td>
          <td>Leila</td>
          <td>testOrigine</td>
          <td>testStatut</td>
          <td>testService</td>
          <td>testEffectué</td>
        </tr>
        <tr>
          <td>Bourlier</td>
          <td>Sylvie</td>
          <td>testOrigine</td>
          <td>testStatut</td>
          <td>testService</td>
          <td>testEffectué</td>
        </tr>
        <tr>
          <td>Bourlier</td>
          <td>Sylvie</td>
          <td>testOrigine</td>
          <td>testStatut</td>
          <td>testService</td>
          <td>testEffectué</td>
        </tr>
        <tr>
          <td>Bourlier</td>
          <td>Sylvie</td>
          <td>testOrigine</td>
          <td>testStatut</td>
          <td>testService</td>
          <td>testEffectué</td>
        </tr>
        <tr>
          <td>Bourlier</td>
          <td>Sylvie</td>
          <td>testOrigine</td>
          <td>testStatut</td>
          <td>testService</td>
          <td>testEffectué</td>
        </tr>
        <tr>
          <td>Bourlier</td>
          <td>Sylvie</td>
          <td>testOrigine</td>
          <td>testStatut</td>
          <td>testService</td>
          <td>testEffectué</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

nav{
  background: linear-gradient(45deg, #49a09d, #5f2c82);
}
.navbar-brand{
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif ;
  color: #fff;
  font-size: 20px;
}
h2{
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #49a09d, #5f2c82);
  margin-top: 30px;
}

th,
td {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

th {
  text-align: center;
}

thead th {
  background-color: #55608f;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
tbody td {
  position: relative;
}
a{
  text-decoration: none;
  color: black;
}
</style>
<script>
import Navbar from '../Navbar';

export default {
  name : 'Professors',
  components: {
   Navbar
  },
  data(){
    return{
info : ["test","best"]
    }

  },
 
  mounted() {
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.slim.min.js')
    externalScript.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js')
    document.head.appendChild(externalScript)
  },
  methods: {
    sortDate(){

 this.info.sort((a, b) => {
   console.log(a+""+b);
        if (a > b) {
          console.log(a+""+b);
          return 1;
        } else if (a < b) {
         
          return -1;
        } else {
          return 0;
        }
      });
    }
  }
  

}
</script>