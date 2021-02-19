<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des Profs</h1>
     <div class="container">
        <div class="row justify-content-between">
        <router-link to="/admin/filieres/">
                   <button id="bt1" class="btn btn-outline-secondary mb-2" >Retour à la liste des filières</button>
        </router-link>
        </div>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Nom</th>
             <th >PreNom</th>
           <!--  <th >Email</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="prof in professeur" :key="prof.firstName">
              <td>{{prof.lastName}} </td>
              <td>{{prof.firstName}}</td>
             <!-- <td>{{prof.email}}</td> -->
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
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from 'axios';

export default {
    name: "ProfPathway",
    components: {Header},

    data (){
        return {
            professeur:[],
            fullName:[],
            firstName:String,
            lastName:String,

        }
    },

    mounted () {
        if(this.$filName === "CILS" ){
            this.$filName = "CIL";
        }

        if(this.$filName === "Informatique" ){
            this.$filName = "INFO";
        }
        axios
            .get("http://146.59.195.214:8006/api/v1/events/teachers/"+this.$filName)
            .then((response) => {
                 response.data.forEach((branch) => {
                       this.firstName= "";
                      this.lastName= "";

                      this.firstName= branch.split(" ")[0];
                      this.lastName= branch.split(" ")[1];
                      this.professeur.push({"firstName":this.firstName,
                                           "lastName":this.lastName});

                 });
            });
            
    },
}
</script>

<style scoped>

</style>
