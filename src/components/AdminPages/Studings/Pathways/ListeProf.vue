<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des Profs de la filière {{ $filName}}</h1>
     <div class="container">

             <div class="row justify-content-start">
                
            </div>
        <div class="row justify-content-between">
        <router-link to="/admin/filieres/">
                   <button id="bt1" class="btn btn-outline-secondary mb-2" >Retour à la liste des filières</button>
        </router-link>

        <p id="eltPerPage" class="mb-2">
                    Afficher
                    <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(30)">30</a>
                    éléments
        </p>
        </div>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Nom <font-awesome-icon icon="sortIcon" @click="sort(lastName)"></font-awesome-icon></th>
             <th @click="sortFirstName()">PreNom</th>
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
            m1Ini:[],
            m2Ini:[],
            m1App:[],
            m2App:[],
            m2Cil:[],
            m2Asr:[],
            test:[],
            currentSortDirection: 'asc',
            currentSort: 'lastName',
            pageSize: 10,
            currentPage: 1,
            sortIcon: 'sort',


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
                    
                    this.test.push(this.firstName);

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
                 var tester=this.professeur.concat(this.m1Ini, this.m1App, this.m2Ini, this.m2App);
              return this.supprimerDouble(tester, "lastName").slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });

            }
            else if (this.$filName ==="CIL"){
              return this.supprimerDouble(this.professeur.concat( this.m2Cil),"lastName").slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            
            }
            else if(this.$filName ==="ASR"){
              return this.supprimerDouble(this.professeur.concat( this.m2Asr), "lastName").slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
            else if(this.$filName ==="INFO"){
              return this.supprimerDouble(this.professeur.concat(this.m1Ini, this.m1App, this.m2Ini, this.m2App,this.m2Asr,this.m2Cil), "lastName").slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
            else{
              return this.professeur.slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
          },

          gth:function(){
               return this.removeDuplicate(this.test)
          }
},

methods:{

     sort(criteria) {
            if(criteria === this.currentSort) {
                this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc'
            }
            this.sortIcon = this.currentSortDirection === 'asc' ? 'sort-up' : 'sort-down'
            this.currentSort = criteria;
        },

      prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if ((this.currentPage * this.pageSize) < this.miage.length) {
                this.currentPage++;
            }
        },
        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },

         supprimerDouble(table, prop) {
              var unique = [];
              var lookupObject ={};
               for (var i in table) {
                 lookupObject [table[i][prop]]= table[i];
               }
               for (i in lookupObject){
                 unique.push(lookupObject[i]);
               }
             return unique;
    },

     sortFirstName() {
      this.miage.sort((a, b) => {
      
        if (a.firstName < b.firstName) return -1;
        else if (a.firstName == b.firstName) return 0;
        else return 1;
      });
    },

}
}
</script>

<style scoped>

.pageSizeElt {
    cursor: pointer;
    color: #536895;
}

</style>
