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
  background: #344C80;
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
	@media 
	only screen and (max-width: 760px),
	(min-device-width: 768px) and (max-device-width: 1024px)  {
	
		/* Force table to not be like tables anymore */
		table, thead, tbody, th, td, tr { 
			display: block; 
		}
	
		/* Hide table headers (but not display: none;, for accessibility) */
		thead tr { 
			position: absolute;
			top: -9999px;
			left: -9999px;
		}
		
		tr { border: 2px solid #eee; }
		
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
			padding-right: 10px; 
			white-space: nowrap;
		}
		
		/*
		Label the data
		*/
   
		td:nth-of-type(1):before { content: "Nom"; }
		td:nth-of-type(2):before { content: "Prenom"; }
		td:nth-of-type(3):before { content: "origine"; }
		td:nth-of-type(4):before { content: "statut"; }
    td:nth-of-type(5):before { content: "service statutaire"; }
    td:nth-of-type(6):before { content: "service effectué"; }
	
	}
	
</style>
<script>
import Navbar from '../Navbar_Prof';

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