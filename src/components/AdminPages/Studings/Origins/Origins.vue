<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des Origines</h1>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Origine</th>
             <th  colspan=2>Action souhaitée</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="(origine,index) in Origines" :key="origine">
              <td>{{origine}}</td>
              <td><router-link to="/admin/origines/prof">
                   <button class="btn btn-info btn-block" v-on:click="recup(index)">Voir Liste professeur</button>
                  </router-link></td>
              <td><button class="btn btn-info btn-block" v-on:click="modifier"><font-awesome-icon icon="edit"></font-awesome-icon></button></td>
              <td><button class="btn btn-danger btn-block" v-on:click="supprimer"><font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr> 

            <tr>
              <td><input type="text" class="form-control"  placeholder="Filière"></td>
              <td colspan=3><button class="btn btn-primary btn-block" disabled>Ajouter</button></td>
            </tr>

          </tbody>
        </table>

        <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link"  @click="prevPage">Précédent</a></li>
                        <li class="page-item"><a class="page-link"  @click="nextPage">Suivant</a></li>
                    </ul>
        </nav>
        </div>
    </div>
</template>
<script>
//import axios from 'axios';
import Vue from 'vue';
import Header from "@/components/AdminPages/Header";


//Vue.prototype.$ori="Informatique"

export default {
    name: "Origins",
    components: {Header},

    data () {
        return {
            success:true,
            Origines:["Département Informatique","Indéfinies","Département Bio","Département de Math","Université","UFR ST","Privé"]
        }

    },

    methods:{
        RetourOri() {
            this.success=true
        },

        VoirListeProf() {
            this.success=false
        },

        recup(index){
            //let ooori=this.Origines[index];
           Vue.prototype.$ori=this.Origines[index];

        }
    },

}
</script>

<style scoped>

</style>
