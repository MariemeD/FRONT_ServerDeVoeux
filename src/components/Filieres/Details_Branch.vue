<template>
<div>
 <Navbar />
    <div class="card">
      <div class="additional">
        <div class="info-card">
          <h3>MIAGE</h3>
          <h3>Responsable : email </h3>
          <h3>Etat de filière </h3>
          
        </div>
      </div>
      <div class="general">
        <h1>Nome de la Branche</h1>
        <table class="table">
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
    </div>
</div>
</template>
<style scoped>
nav{
  background: linear-gradient(45deg, #49a09d, #5f2c82);
}
.navbar-brand{
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif ;
  color: #fff;
  font-size: 20px;
}
h1{
   font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
  
}
h3{
    color: #fff;
    margin-top: 50px;
}
a{
  text-decoration: none;
  color: black;
}
.card {

  margin-top: 5%;
}

.card h1 {
  text-align: center;
}

.card .additional {
  position: absolute;
  width: 200px;
  height: 100%;
  background: linear-gradient(45deg, #49a09d, #5f2c82);
  transition: width 0.4s;
  overflow: hidden;
  z-index: 2;
}

table {
  width: 70%;
  margin-left: 20%;
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
</style>

<script>
import Navbar from '../Navbar_Prof';

export default {
  name : 'Details_Filiere',
  components: {
   Navbar
  },
}
</script>