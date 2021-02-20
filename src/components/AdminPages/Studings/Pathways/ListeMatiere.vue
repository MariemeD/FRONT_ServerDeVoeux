<template>
    <div>
        <Header />

        <h1 class="pt-5">Liste des matières de la filière {{$filNameMat}}  </h1>

        <div class="container">
           <div class="row justify-content-between">
               <router-link to="/admin/filieres/">
                   <button id="bt1" class="btn btn-outline-secondary mb-2" >Retour à la liste des filières</button>
               </router-link>
           </div>
            <table class="table table-bordered table-striped">
               <thead>
                  <tr>
                     <th> <H3> MATIERE </H3></th>
                  </tr>
               </thead>

               <tbody>
                  <tr v-for="matiere in FilBYmat" :key="matiere">
                     <td> {{matiere}} </td>
                  </tr>
               </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from 'axios';

export default {
    name: "ListeMatiere",
    components: {Header},

    data(){
        return {
             FilBYmat:[],
        }
    },

    mounted (){
        if(this.$filName === "CILS" ){
            this.$filName = "CIL";
        }

        if(this.$filName === "Informatique" ){
            this.$filName = "INFO";
        }
        axios
            .get("http://146.59.195.214:8006/api/v1/events/"+this.$filNameMat+"/matiere")
            .then(response => (this.FilBYmat = response.data));

    },

    methods:{

    }
}
</script>

<style scoped>

</style>
