<template>
    <div v-if="OK">
        <Header />
        <h1 class="pt-5">Liste des cursus</h1>
  
        <br/><br/>
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
            <tr v-for="matiere in Mat" :key="matiere">
              <td>{{matiere.name}}</td>
              <td>{{matiere.type}}</td>
              <td>{{matiere.Ab}}</td>
              <td><button class="btn btn-outline-primary mb-2" v-on:click="modif">Modifier <font-awesome-icon icon="edit"></font-awesome-icon></button></td>
              <td><button class="btn btn-outline-danger mb-2">supprimer <font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr> 
            
            <tr v-if="Modification">
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

          </tbody>
        </table>
        </div>
    </div>

    <div v-else>
        <Header />
        <h1 class="pt-5">Liste des cursus</h1>
  
        <br/><br/>
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
            <tr v-for="matiere in Mat" :key="matiere">
              <td>{{matiere.name}}</td>
              <td>{{matiere.type}}</td>
              <td>{{matiere.Ab}}</td>
              <td><button class="btn btn-outline-primary mb-2" v-on:click="modif">Modifier <font-awesome-icon icon="edit"></font-awesome-icon></button></td>
              <td><button class="btn btn-outline-danger mb-2">supprimer <font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr> 
            
            <tr v-if="Modification">
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
            Modification:false,
            success:true,
            OK:true,
            recupFil:null,

            Mat:[],

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

    }
}
</script>

<style scoped>

#MargeBouton {
    margin-bottom:5px;
}

</style>
