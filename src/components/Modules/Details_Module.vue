<template>
<div>
<Navbar />
    <div class="card">
     
      <div class="general">
        <h1>Module Name</h1>
         <h4>Branche Name</h4>
        <table class="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Volume</th>
          <th>Nbr de grp</th>
          <th>Enseignement</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hennach</td>
          <td>Leila</td>
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
.card {

  margin-top: 5%;
}

.card h1 {
  text-align: center;
}



table {
  width: 70%;
  margin-left: 20%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #49a09d, #5f2c82);
  margin-top: 30px;
  margin-left: 17%;
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
  name : 'Details_Module',
  components: {
   Navbar
  },
    mounted() {
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.slim.min.js')
    externalScript.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js')
    document.head.appendChild(externalScript)
  }
}
</script>