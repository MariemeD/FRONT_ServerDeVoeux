<template>
    <div v-if="OK">
        <Header />
        <h1 class="pt-5">Liste des cursus</h1>
      <div class="container">
        <div class="row justify-content-between">
             <div class="form-inline" id="MargeBouton">
             <form class="form-inline">
              <div class="form-group">
               <input type="text" class="form-control" placeholder="Filière" v-model="recupFil">
              </div>
             </form>
              <button class="btn btn-info" v-on:click="VoirListeMat">Voir matières</button>
            </div>

             <p id="eltPerPage" class="mb-2">
                    Afficher
                    <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(30)">30</a>
                    éléments
        </p>
        </div>
        
        <div class="panel-heading"></div>      
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             
             <th >Matières</th>
             <th @click="sort(filière)">Filière</th>
             <th >Prof</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="(matiere,index) in ListeCours" :key="matiere">
              <td>{{matiere.name}}</td>
              <td >{{matiere.filière}}</td>
            <!--  <td ><table> <tr v-for="prof in matiere.prof" :key="prof"><td>{{prof}} </td></tr></table></td>  -->
             <td v-on:click="prendre(index)">{{matiere.prof}}</td>
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

    <div v-else>
        <Header />
        <h1 class="pt-5">Filière {{transition}} </h1>
  
        <div class="container">
        <div class="row justify-content-between">
            <button class="btn btn-outline-secondary mb-2" v-on:click="RetourFili">Retour Liste</button>
            <div class="col-md-4 ml-auto">
             <div class="form-inline" id="MargeBouton">
             <form class="form-inline">
              <div class="form-group">
               <input type="text" class="form-control" placeholder="Filière" v-model="recupFil">
              </div>
             </form>
              <button class="btn btn-info" v-on:click="VoirListeMat">Voir matières</button>
            </div>
            </div>
        </div>

        <div class="panel-heading"></div>      
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             
             <th colspan=2 >Matières </th>
             <th>Professeur </th>
             
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="matiere in ListeFilCours" :key="matiere">
              <td colspan=2>{{matiere.name}}</td>
              <td >{{matiere.prof}}</td>
              
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
import axios from 'axios';
import Vue from 'vue';
import Header from "@/components/AdminPages/Header";

export default {
    name: "Courses",
    components: {Header},
    data () {
        return {
            matieres: null,
            success:true,
            OK:true,
            recupFil:null,
            transition:null,

            Mat:[],
            Mat2:[],
            FilBYmat:[],
            nbrePage: 150,
            pageSize: 10,
            currentPage: 1,
            ToutesMatiere:[],
            Toutesm1Ini:[],
            Toutesm2Ini:[],
            Toutesm1App:[],
            Toutesm2App:[],
            Toutesm2Cil:[],
            Toutesm2Asr:[],

            profFirstName:String,
            profLastName:String,


            ToutesLmIageApp:[],
            ToutesLmIni:[],
            ToutesCil:[],
            ToutesAsr:[],

            Nom:String,
            Categ:String,
            Abbrév:String,
            ModiNom:null,
            modiAbrev:null,
            modiType:null,

            currentSortDirection: 'asc',
            currentSort: 'filière',

        }
    },
    mounted () {
        axios
            .get('http://146.59.195.214:8006/api/v1/denominations/all')
            .then((response) => {
                 response.data.forEach((branch) => {

                        this.Nom="";
                        this.Categ="";
                        this.Nom=branch.nom_complet.split("-")[0];
                        this.Categ=branch.nom_complet.split("-")[1];

                        this.Mat2.push({"name":this.Nom,
                                   "type":this.Categ,
                                    "Ab":branch.abbreviation});
                        //this.MatType.push(this.Mat);

                 });
            });

            // L3 MIAGE

             axios
            .get("http://146.59.195.214:8006/api/v1/events/MIAGE/matiere")
            .then((response) => {
                response.data.forEach((l3Mbranch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + l3Mbranch)
            .then((response) => {
                response.data.forEach((valeur)=> {
                    this.profFirstName= valeur.split("")[0];
                    this.profLastName= valeur.split("")[1];

                    

                this.ToutesLmIni.push({"name":l3Mbranch,
                                      "filière":"Licence 3 MIAGE",
                                       "prof":valeur});
            });
            })
                });
                })

                
            //L3 CILS

            axios
            .get("http://146.59.195.214:8006/api/v1/events/CIL/matiere")
            .then((response) => {
                response.data.forEach((CILL3branch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + CILL3branch)
            .then((response) => {
                response.data.forEach((valeur)=> {

                this.ToutesCil.push({"name":CILL3branch,
                                      "filière":"Licence 3 CILS",
                                       "prof":valeur});
            });
            })
                });
                })


            // L3 ASR

            axios
            .get("http://146.59.195.214:8006/api/v1/events/ASR/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + branch)
            .then((response) => {
                response.data.forEach((valeur)=> {

                this.ToutesAsr.push({"name":branch,
                                      "filière":"Licence 3 ASR",
                                       "prof":valeur});
            });
            })
                });
                })

             // M1MIAGE
             axios
            .get("http://146.59.195.214:8006/api/v1/events/M1MIAI/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                    if((branch === "BASE DE DONNEES APPROFONDIES") || (branch === "ANALDON") || (branch === "BADA")) 
                {
                    this.Nom="";
                }
                
                else{

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + branch)
            .then((response) => {
                response.data.forEach((valeur)=> {

                this.Toutesm1Ini.push({"name":branch,
                                      "filière":"Master 1 MIAGE",
                                       "prof":valeur});
            });
            })
                }
                });
                })


     
     axios
            .get("http://146.59.195.214:8006/api/v1/events/M1MIAA/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                    if((branch === "BASE DE DONNEES APPROFONDIES") || (branch === "ANALDON") || (branch === "BADA")) 
                {
                    this.Nom="";
                }
                
                else{

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + branch)
            .then((response) => {
                response.data.forEach((valeur)=> {

                this.Toutesm1App.push({"name":branch,
                                      "filière":"Master 1 MIAGE",
                                       "prof":valeur});
            });
            })
                }
                });
                })
                                           
            //M2 MIAGE Initiale

            axios
            .get("http://146.59.195.214:8006/api/v1/events/M2MIAI/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + branch)
            .then((response) => {
                response.data.forEach((valeur)=> {

                this.Toutesm2Ini.push({"name":branch,
                                      "filière":"Master 2 MIAGE",
                                       "prof":valeur});
            });
            })
                });
                })
            
           // M2 MIAGE App

            axios
            .get("http://146.59.195.214:8006/api/v1/events/M2MIAA/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + branch)
            .then((response) => {
                response.data.forEach((valeur)=> {
                
                this.Toutesm2App.push({"name":branch,
                                      "filière":"Master 2 MIAGE",
                                       "prof":valeur});
            });
            })
                });
                })

            //CILS

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2CIL/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + branch)
            .then((response) => {
                response.data.forEach((valeur)=> {

                this.Toutesm2Cil.push({"name":branch,
                                      "filière":"Master 2 CILS",
                                       "prof":valeur});
            });
            })
                });
                })

            //ASR

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2ASR/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + branch)
            .then((response) => {
                response.data.forEach((valeur)=> {

                this.Toutesm2Asr.push({"name":branch,
                                      "filière":"Master 2 ASR",
                                       "prof":valeur});
            });
            })
                });
                })


    },

    methods:{
      RetourFili() {
            //this.success=true
            this.OK=true;
        },

         suppressionDoublon(table) {
            var unique = [];
            var auxi= {};
            for (var i in table) {
                 auxi [table[i]]= 0;
               }
               for (i in auxi){
                 unique.push(i);
               }
             return unique;
    },


       deleteDouble(table, prop) {
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

        VoirListeMat() {
           // this.success=false
            this.OK=false;
            this.transition=this.recupFil;

            axios
            .get("http://146.59.195.214:8006/api/v1/events/"+this.recupFil+"/matiere")
            .then((response) => {
                response.data.forEach((l3Mbranch)=> {

                     axios
            .get("http://146.59.195.214:8006/api/v1/events/teacher/" + l3Mbranch)
            .then((response) => {
                response.data.forEach((valeur)=> {
                    this.Mat.push({"name":l3Mbranch,
                                      "filière":"Licence 3 MIAGE",
                                       "prof":valeur});
            });
            })
                });
            })
            this.transition=this.recupFil;
            this.recupFil="";

        },

         prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        nextPage() {

           let Ta =  this.Toutesm1Ini.concat( this.Toutesm1App, this.Toutesm2Ini, this.Toutesm2App, this.ToutesLmIni, this.ToutesLmIageApp, this.ToutesAsr, this.ToutesCil, this.Toutesm2Asr, this.Toutesm2Cil);
            if ((this.currentPage * this.pageSize) < Ta.length) {
                this.currentPage++;
            }
        },
         setElementsnbrePage(pageSize) {
            this.pageSize = pageSize
        },

     prendre(index){
            //let ooori=this.Origines[index];
           // let Ta =  this.Toutesm1Ini.concat( this.Toutesm1App, this.Toutesm2Ini, this.Toutesm2App, this.ToutesLmIni, this.ToutesLmIageApp, this.ToutesAsr, this.ToutesCil, this.Toutesm2Asr, this.Toutesm2Cil);
           
           Vue.prototype.$nomPrenom= this.Toutesm1Ini.concat( this.Toutesm1App, this.Toutesm2Ini, this.Toutesm2App, this.ToutesLmIni, this.ToutesLmIageApp, this.ToutesAsr, this.ToutesCil, this.Toutesm2Asr, this.Toutesm2Cil)[index].prof;

        },

        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },

        sort(criteria) {
            if(criteria === this.currentSort) {
                this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc'
            }
            this.sortIcon = this.currentSortDirection === 'asc' ? 'sort-up' : 'sort-down'
            this.currentSort = criteria;
        },

    },

    computed:{

      ListeCours:function(){
           return this.deleteDouble(this.Toutesm1Ini.concat( this.Toutesm1App, this.Toutesm2Ini, this.Toutesm2App, this.ToutesLmIni, this.ToutesAsr, this.ToutesCil, this.Toutesm2Asr, this.Toutesm2Cil),"name").filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            }).sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            });


            },

    ListeFilCours:function(){

        if (this.transition.toUpperCase() ==="MIAGE"){
              return  this.deleteDouble(this.Mat.concat(this.Toutesm1Ini, this.Toutesm1App, this.Toutesm2Ini, this.Toutesm2App),"name").filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }

        else if (this.transition ==="CIL"){
              return  this.deleteDouble(this.Mat.concat( this.Toutesm2Cil),"name").filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }

        else if (this.transition.toUpperCase() ==="ASR"){
                return this.deleteDouble(this.Mat.concat( this.Toutesm2Asr),"name").filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }

        else{
               return this.Mat.filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
            }
            
            }
    },

}
</script>

<style scoped>

.pageSizeElt {
    cursor: pointer;
    color: #536895;
}

#MargeBouton {
    margin-bottom:5px;
}

</style>
