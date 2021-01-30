<template>
    <div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des cursus</h1>
        <div class="panel panel-primary">
        <div class="panel-heading">Liste des matières</div>        
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th class="col-sm-4">Matières</th>
             <th class="col-sm-2"></th>
             <th class="col-sm-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="Libel in tasks" :key="Libel">
              <td>{{Libel.lib}}</td>
              <td><button class="btn btn-info btn-block" v-on:click="modifier"><i class="fa fa-edit fa-lg"></i></button></td>
              <td><button class="btn btn-danger btn-block" v-on:click="supprimer"><i class="fa fa-trash-o fa-lg"></i></button></td>
            </tr> 

            <tr>
              <td><input type="text" class="form-control"  placeholder="Matière"></td>
              <td><button class="btn btn-primary btn-block" >Ajouter</button></td>
            </tr>
          </tbody>
        </table>
<div>
        {{matieres}}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Header from "@/components/AdminPages/Header";

export default {
    name: "Courses",
    components: {Header},
    data () {
        return {
            matieres: null,
            tasks: [
  {
    "lib": " SPECIFICATIONS OF OPEN SYSTEMS AND SELF"
  },
  {
    "lib": " SYSTEMES REPARTIS "
  },
  {
    "lib": "ADMIN SYSTEMES "
  },
  {
    "lib": "ADMINISTRATION DES SGBD "
  },
  {
    "lib": "ADMINISTRATION ET DEVELOPPEMENT SYSTEME POUR LES CENTRES DE CALCUL ET DE DONNEES "
  },
  {
    "lib": "ADMINISTRATION SYSTEME  "
  },
  {
    "lib": "ADMR- ADMSYS-PROJET-PROJET ADMRES - SESSION2 ORAL "
  },
  {
    "lib": "FOUILLES DE DONNEES "
  }
]
        }
    },
    mounted () {
        axios
            .get('https://jsonformatter.org/cbba56')
            .then(response => (this.matieres = response))
    }
}
</script>

<style scoped>

</style>
