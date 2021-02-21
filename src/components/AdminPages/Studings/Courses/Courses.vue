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
             <th >Filière</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="matiere in ListeCours" :key="matiere">
              <td>{{matiere.name}}</td>
              <td>{{matiere.filière}}</td>
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
        <h1 class="pt-5">Liste des cursus </h1>
  
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
             
             <th colspan=2 >Matières Fil</th>
             
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="matiere in ListeFilCours" :key="matiere">
              <td colspan=2>{{matiere}}</td>
              
            </tr> 
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link"  @click="precedent">Précédent</a></li>
                        <li class="page-item"><a class="page-link"  @click="suivant">Suivant</a></li>
                    </ul>
        </nav>

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
            success:true,
            OK:true,
            recupFil:null,
            recupFil2:null,

            Mat:[],
            FilBYmat:[],
            nbrePage: 150,
            pageSize: 150,
            currentPage: 1,
            ToutesMatiere:[],
            Toutesm1Ini:[],
            Toutesm2Ini:[],
            Toutesm1App:[],
            Toutesm2App:[],
            Toutesm2Cil:[],
            Toutesm2Asr:[],

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

                        this.Mat.push({"name":this.Nom,
                                   "type":this.Categ,
                                    "Ab":branch.abbreviation});
                        //this.MatType.push(this.Mat);

                 });
            });

            // L3 MIAGE

             axios
            .get("http://146.59.195.214:8006/api/v1/events/MIAGE/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.ToutesLmIni.push({"name":branch,
                                   "filière":"MIAGE"});
            });
            })


            //L3 CILS

            axios
            .get("http://146.59.195.214:8006/api/v1/events/CIL/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.ToutesCil.push({"name":branch,
                                   "filière":"CILS"});
            });
            })

            // L3 ASR

            axios
            .get("http://146.59.195.214:8006/api/v1/events/ASR/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.ToutesAsr.push({"name":branch,
                                   "filière":"ASR"});
            });
            })

             // M1MIAGE
                 axios
            .get("http://146.59.195.214:8006/api/v1/events/M1MIAI/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.Toutesm1Ini.push({"name":branch,
                                   "filière":"MIAGE"});
            });
            })
                    
                 axios
            .get("http://146.59.195.214:8006/api/v1/events/M1MIAA/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.Toutesm1App.push({"name":branch,
                                   "filière":"MIAGE"});
            });
            })
                                           
            //M2 MIAGE Initiale

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2MIAI/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.Toutesm2Ini.push({"name":branch,
                                   "filière":"MIAGE"});
            });
            })
            
           // M2 MIAGE App

            axios
            .get("http://146.59.195.214:8006/api/v1/events/M2MIAA/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.Toutesm2App.push({"name":branch,
                                   "filière":"MIAGE"});
            });
            })

            //CILS

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2CIL/matiere")
            .then((response) => {
                response.data.forEach((branch)=> {
                this.Toutesm2Cil.push({"name":branch,
                                   "filière":"CILS"});
            });
            })

            //ASR

             axios
            .get("http://146.59.195.214:8006/api/v1/events/M2ASR/matiere")
             .then((response) => {
                response.data.forEach((branch)=> {
                this.Toutesm2Asr.push({"name":branch,
                                   "filière":"ASR"});
            });
            })


    },

    methods:{
      RetourFili() {
            //this.success=true
            this.OK=true;
        },

        VoirListeMat() {
           // this.success=false
            this.OK=false
            axios
            .get("http://146.59.195.214:8006/api/v1/events/"+this.recupFil+"/matiere")
            .then(response => (this.FilBYmat = response.data));
            this.recupFil2=this.recpFil;
            this.recupFil="";
        },

         prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        precedent() {
            if (this.currentPage2 > 1) {
                this.currentPage2--;
            }
        },
        suivant() {
            if ((this.currentPage * this.nbrePage) < this.ListeFilCours.length) {
                this.currentPage++;
            }
        },
        nextPage() {
            if ((this.currentPage * this.nbrePage) < this.ListeCours.length) {
                this.currentPage++;
            }
        },
         setElementsnbrePage(nbrePage) {
            this.nbrePage = nbrePage
        },

        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },

    },

    computed:{

      ListeCours:function(){
           return this.Toutesm1Ini.concat( this.Toutesm1App, this.Toutesm2Ini, this.Toutesm2App, this.ToutesLmIni, this.ToutesLmIageApp, this.ToutesAsr, this.ToutesCil, this.Toutesm2Asr, this.Toutesm2Cil).filter((row, index) => {
                let start = (this.currentPage - 1) * this.nbrePage;
                let end = this.currentPage* this.nbrePage;
                if (index >= start && index < end) return true
        });
    },

    ListeFilCours:function(){
            return this.FilBYmat.filter((row, index) => {
                let start = (this.currentPage - 1) * this.nbrePage;
                let end = this.currentPage* this.nbrePage;
                if (index >= start && index < end) return true
        });
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
