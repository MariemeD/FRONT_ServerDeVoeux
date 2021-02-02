<template>
    <div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des cursus</h1>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>      
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Identifiants</th>
             <th >Matières</th>
             <th >Abbréviation</th>
             <th  colspan=2>Action souhaitée</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="matiere in matieres" :key="matiere">
              <td>{{matiere.id}}</td>
              <td>{{matiere.nom_complet}}</td>
              <td>{{matiere.abbreviation}}</td>
              <td><button class="btn btn-info btn-block" v-on:click="modifier"><font-awesome-icon icon="edit"></font-awesome-icon></button></td>
              <td><button class="btn btn-danger btn-block" v-on:click="supprimer"><font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr> 

            <tr>
              <td><input type="text" class="form-control"  placeholder="ID"></td>
              <td><input type="text" class="form-control"  placeholder="Nom matiere"></td>
              <td><input type="text" class="form-control"  placeholder="abbreviation"></td>
              <td colspan=2><button class="btn btn-primary btn-block" >Ajouter</button></td>
            </tr>

          </tbody>
        </table>
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
            
        }
    },
    mounted () {
        axios
            .get('http://146.59.195.214:8006/api/v1/denominations/all')
            .then(response => (this.matieres = response.data))
    }
}
</script>

<style scoped>

</style>
