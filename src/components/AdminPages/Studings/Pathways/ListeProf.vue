<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des Profs de la filière {{ $filName}}</h1>
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
            <tr v-for="prof in miage" :key="prof.firstName">
              <td>{{prof.lastName}} </td>
              <td>{{prof.firstName}}</td>
             <!-- <td>{{prof.email}}</td> -->
            </tr> 
          </tbody>
        </table>
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
            m1Ini:[],
            m2Ini:[],
            m1App:[],
            m2App:[],
            m2Cil:[],
            m2Asr:[],


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
           // M1MIAGE
                 axios
            .get("http://146.59.195.214:8006/api/v1/events/teachers/M1MIAI")
            .then((response) => {
                 response.data.forEach((elmt) => {
                       this.firstName= "";
                       this.lastName= "";

                      this.firstName= elmt.split(" ")[0];
                      this.lastName= elmt.split(" ")[1];
                      this.m1Ini.push({"firstName":this.firstName,
                                           "lastName":this.lastName});

                 });
            });

                 axios
            .get("http://146.59.195.214:8006/api/v1/events/teachers/M1MIAA")
            .then((response) => {
                 response.data.forEach((element) => {
                       this.firstName= "";
                       this.lastName= "";

                      this.firstName= element.split(" ")[0];
                      this.lastName= element.split(" ")[1];
                      this.m1App.push({"firstName":this.firstName,
                                           "lastName":this.lastName});

                 });
            });  

            //M2 MIAGE Initiale

             axios
            .get("http://146.59.195.214:8006/api/v1/events/teachers/M2MIAI")
            .then((response) => {
                 response.data.forEach((element) => {
                       this.firstName= "";
                       this.lastName= "";

                      this.firstName= element.split(" ")[0];
                      this.lastName= element.split(" ")[1];
                      this.m2Ini.push({"firstName":this.firstName,
                                           "lastName":this.lastName});

                 });
            });  

           // M2 MIAGE App

            axios
            .get("http://146.59.195.214:8006/api/v1/events/teachers/M2MIAA")
            .then((response) => {
                 response.data.forEach((element) => {
                       this.firstName= "";
                       this.lastName= "";

                      this.firstName= element.split(" ")[0];
                      this.lastName= element.split(" ")[1];
                      this.m2App.push({"firstName":this.firstName,
                                           "lastName":this.lastName});

                 });
            });  

            
            //CILS

             axios
            .get("http://146.59.195.214:8006/api/v1/events/teachers/M2CIL")
            .then((response) => {
                 response.data.forEach((element) => {
                       this.firstName= "";
                       this.lastName= "";

                      this.firstName= element.split(" ")[0];
                      this.lastName= element.split(" ")[1];
                      this.m2Cil.push({"firstName":this.firstName,
                                           "lastName":this.lastName});

                 });
            });  

            //ASR

             axios
            .get("http://146.59.195.214:8006/api/v1/events/teachers/M2ASR")
            .then((response) => {
                 response.data.forEach((element) => {
                       this.firstName= "";
                       this.lastName= "";

                      this.firstName= element.split(" ")[0];
                      this.lastName= element.split(" ")[1];
                      this.m2Asr.push({"firstName":this.firstName,
                                           "lastName":this.lastName});

                 });
            });  
    },

    computed: {
        miage:function () {

            if (this.$filName ==="MIAGE") {
              return this.professeur.concat(this.m1Ini, this.m1App, this.m2Ini, this.m2App)
            }
            else if (this.$filName ==="CILS"){
              return this.professeur.concat( this.m2Cil)
            }
            else if(this.$filName ==="ASR"){
              return this.professeur.concat( this.m2Asr)
            }
            else{
              return this.professeur
            }
    }
},
}
</script>

<style scoped>

</style>
