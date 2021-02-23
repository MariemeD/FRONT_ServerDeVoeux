<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des matières de la filière {{ $filNameMat}}</h1>
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
                    éléments
        </p>
        </div>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Matière </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mat in EnsembleFil" :key="mat">
              <td>{{mat}} </td>
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
    name: "ListeMatiere",
    components: {Header},

    data(){
        return {
             FilBYmat:[],
             m1Ini:[],
             m2Ini:[],
             m1App:[],
             m2App:[],
             m2Cil:[],
             m2Asr:[],
             currentSortDirection: 'asc',
             currentSort: String,
             pageSize: 10,
             currentPage: 1,
             sortIcon: 'sort',

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

            // M1MIAGE
                 axios
            .get("http://146.59.195.214:8006/api/v1/events/M1MIAI/matiere")
            .then(response => (this.m1Ini = response.data));
                    
                 axios
            .get("http://146.59.195.214:8006/api/v1/events/M1MIAA/matiere")
            .then(response => (this.m1App = response.data));
                                           
            //M2 MIAGE Initiale

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2MIAI/matiere")
            .then(response => (this.m2Ini = response.data));

           // M2 MIAGE App

            axios
            .get("http://146.59.195.214:8006/api/v1/events/M2MIAA/matiere")
            .then(response => (this.m2App = response.data)); 

            
            //CILS

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2CIL/matiere")
            .then(response => (this.m2Cil = response.data));

            //ASR

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2ASR/matiere")
            .then(response => (this.m2Asr = response.data));
    },

    methods:{

        trier(critere) {
            if(critere === this.currentSort) {
                this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc'
            }
            this.sortIcon = this.currentSortDirection === 'asc' ? 'sort-up' : 'sort-down'
            this.currentSort = critere;
        },

      prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            var Tab;

             if (this.$filName ==="MIAGE"){
               Tab = this.supDoublon(this.FilBYmat.concat(this.m1Ini, this.m1App, this.m2Ini, this.m2App));
             }

             else if (this.$filName ==="CIL"){
                Tab = this.supDoublon(this.FilBYmat.concat( this.m2Cil));
             }

             else if (this.$filName ==="ASR"){
                Tab = this.supDoublon(this.FilBYmat.concat( this.m2Asr));
             }

             else{
                Tab = this.FilBYmat;
             }

            if ((this.currentPage * this.pageSize) < Tab.length) {
                this.currentPage++;
            }
        },

        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },

          supDoublon(table) {
            var unique = [];
            var auxi= {};
      for (var i in table) {
                 auxi [table[i]]= 0;
               }
               for (i in auxi){
                 unique.push(i);
               }
             return unique;
    }
    },

    computed: {
        EnsembleFil:function () {

            if (this.$filNameMat ==="MIAGE") {
              return this.supDoublon(this.FilBYmat.concat(this.m1Ini, this.m1App, this.m2Ini, this.m2App)).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
            else if (this.$filNameMat ==="CILS"){
              return this.supDoublon(this.FilBYmat.concat( this.m2Cil)).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
            else if(this.$filNameMat ==="ASR"){
              return this.supDoublon(this.FilBYmat.concat( this.m2Asr)).slice().filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
            else{
              return this.FilBYmat.slice().filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
    },

    testL1:function(){
        return this.supDoublon(this.FilBYmat)
  },
},
}
</script>

<style scoped>

</style>
