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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #55608f;
  transition: width 0.4s;
  overflow: hidden;
  z-index: 2;
}

table {
  width: 70%;
  margin-left: 15%;
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

  /* 
	Max width before this PARTICULAR table gets nasty
	This query will take effect for any screen smaller than 760px
	and also iPads specifically.
	*/
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
		
		tr { border: 1px solid #ccc; }
		
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
     
		td:nth-of-type(1):before { content: "Type"; }
		td:nth-of-type(2):before { content: "Volume"; }
		td:nth-of-type(3):before { content: "Nbr de grp"; }
		td:nth-of-type(4):before { content: "enseignement"; }
	
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