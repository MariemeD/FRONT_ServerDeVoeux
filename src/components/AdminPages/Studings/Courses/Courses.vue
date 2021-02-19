<template>
    <div v-if="OK">
        <Header />
        <h1 class="pt-5">Liste des cursus</h1>
  
      <div class="container">
        <div class="row">
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
             
             <th >Matières</th>
             <th >Type</th>
             <th >Abbréviation</th>
             <th  colspan=2>Action souhaitée</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="matiere in ListeCours" :key="matiere">
              <td>{{matiere.name}}</td>
              <td>{{matiere.type}}</td>
              <td>{{matiere.Ab}}</td>
              <td><button class="btn btn-outline-primary mb-2" v-on:click="modif">Filières <font-awesome-icon icon="edit"></font-awesome-icon></button></td>
           <!--    <td><button class="btn btn-outline-danger mb-2">supprimer <font-awesome-icon icon="trash"></font-awesome-icon></button></td>  -->
            </tr> 
            
      <!--      <tr v-if="Modification">
              <td><input type="text" class="form-control"  placeholder="Nom " v-model="ModiNom"></td>
              <td><input type="text" class="form-control"  placeholder="Type" v-model="modiType"></td>
              <td><input type="text" class="form-control"  placeholder="abbrev" v-model="modiAbrev"></td>
              <td colspan=2><button class="btn btn-outline-primary mb-2" v-on:click="MethodeModifier">Modifier</button></td>
            </tr>
            <tr v-else>
              <td><input type="text" class="form-control"  placeholder="Nom " v-model="ModiNom"></td>
              <td><input type="text" class="form-control"  placeholder="Type" v-model="modiType"></td>
              <td><input type="text" class="form-control"  placeholder="abbrev" v-model="modiAbrev"></td>
              <td colspan=2><button class="btn btn-outline-success mb-2" v-on:click="Ajouter" >Ajouter <font-awesome-icon icon="plussquare"></font-awesome-icon></button></td>
            </tr>
      -->
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
             
             <th >Matières Fil</th>
             <th >Type</th>
             <th >Abbréviation Fil</th>
             <th  colspan=2>Action souhaitée</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="matiere in ListeFilCours" :key="matiere">
              <td>{{matiere}}</td>
              <td>{{matiere}}</td>
              <td>{{matiere}}</td>
              <td><button class="btn btn-outline-primary mb-2" v-on:click="modif">Filières <font-awesome-icon icon="edit"></font-awesome-icon></button></td>
            <!--  <td><button class="btn btn-outline-danger mb-2">supprimer <font-awesome-icon icon="trash"></font-awesome-icon></button></td> -->
            </tr> 
            
         <!--   <tr v-if="Modification">
              <td><input type="text" class="form-control"  placeholder="Nom " v-model="ModiNom"></td>
              <td><input type="text" class="form-control"  placeholder="Type" v-model="modiType"></td>
              <td><input type="text" class="form-control"  placeholder="abbrev" v-model="modiAbrev"></td>
              <td colspan=2><button class="btn btn-outline-primary mb-2" v-on:click="MethodeModifier">Modifier</button></td>
            </tr>
            <tr v-else>
              <td><input type="text" class="form-control"  placeholder="Nom " v-model="ModiNom"></td>
              <td><input type="text" class="form-control"  placeholder="Type" v-model="modiType"></td>
              <td><input type="text" class="form-control"  placeholder="abbrev" v-model="modiAbrev"></td>
              <td colspan=2><button class="btn btn-primary btn-block" v-on:click="Ajouter">Ajouter <font-awesome-icon icon="plussquare"></font-awesome-icon></button></td>
            </tr>
          -->

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
            Modification:false,
            success:true,
            OK:true,
            recupFil:null,
            recupFil2:null,

            Mat:[],
            FilBYmat:[],
            nbrePage: 15,
            currentPage: 1,

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

        modif() {
            this.Modification=true
        },

        Ajouter() {
            this.Modification=false
        },

        MethodeModifier() {
            this.Modification=false
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

    },

    computed:{

      ListeCours:function(){
            return this.Mat.filter((row, index) => {
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

#MargeBouton {
    margin-bottom:5px;
}

</style>
