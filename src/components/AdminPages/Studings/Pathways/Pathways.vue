
<template>
  <div class="container">
    <Header />
    <div class="title">
      <h2>Filières</h2> 
      <router-link to="/admin/filieres/RespoFil">
                   <button id="bt1" class="btn btn-outline-secondary mb-2" >Tous les responsables de filière</button>
      </router-link>
    </div>
    <div class="card-footer"> 
               <table class="table table-dark" id="tableFil">
                  <tr>
                     <td v-for="(filiere,index) in donnees" :key="filiere" > {{filiere}} <font-awesome-icon icon="user-tie" id="icProf" v-on:click="recup(index)"></font-awesome-icon> | <font-awesome-icon icon="eye" id="icProf" v-on:click="recuperer(index)"></font-awesome-icon> </td> 
                  </tr> 
                </table>
      </div>
    <div class="modules">
      <div class="card">
        <h4>Licence 1</h4>
        <hr />

        <table >
                            <tr v-for="filiere in separL1" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
      </div>
      <div class="card">
        <h4>Licence 2</h4>
        <hr />
        <table >
                            <tr v-for="filiere in separL2" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
      </div>
      <div class="card">
        <h4>Licence 3</h4>
        <hr />
        <table id="colCard">
                            <tr v-for="filiere in separL3" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
      </div>
      <div class="card">
        <h4>Master 1</h4>
        <hr />
        <table id="colCard">
                            <tr v-for="filiere in separM1" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
      </div>
      <div class="card">
        <h4>Master 2</h4>
        <hr />
        <table id="colCard">
                            <tr v-for="filiere in separM2" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
        </table>
      </div>
    </div> <br><br>
            <div class="card-footer"> 

               <table class="table table-dark" id="tableFil">
                  <tr>
                     <td > <font-awesome-icon icon="user-tie" id="icProf"></font-awesome-icon> Permet de voir la liste des profs de la filière </td> 
                     <td > <font-awesome-icon icon="eye" id="icProf"></font-awesome-icon> Permet de voir toutes les matieres de la filière</td>
                  </tr> 
                </table>
            </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import Header from "@/components/AdminPages/Header";


export default {
    name: "Pathways",
    components: {Header},
    data () {
        return {
            filieres: [],
            test:null,
            nbrePage: 5,
            currentPage: 1,
            pathway:[],
            pathways: [],
            firstSplit: String,
            secondSplit: String,
            thirdSplit: String,
            espace:String,
            branch_Name: String,
            rep:String,
            L1: [],
            lice1:[],
            lice2:[],
            lice3:[],
            M1:[],
            M2:[],
            donnees:["ASR", "CCA", "CILS", "DATA SCIENCE", "Informatique", "GESST","MIAGE"],
            Modification:false,
      
     
     
            
        }
    },
    mounted () {
        axios
            .get('http://146.59.195.214:8006/api/v1/events/filieres')
            .then(response => (this.filieres = response.data));
            axios
            .get('http://146.59.195.214:8006/api/v1/events/filieres')
            .then(response => (this.test = response.data))
    axios
      .get("http://146.59.195.214:8006/api/v1/events/filieres")
      .then((response) => {
        console.log(this.L1);
        response.data.forEach((branch) => {
          //console.log(branch)

          // LICENCE 1

          if (branch.startsWith("L1")) 
          {
            this.firstSplit = branch.split("-")[0];
            this.rep = this.firstSplit.split("L1")[1];
            this.branch_Name = this.firstSplit.split("L1")[1];

             if(this.branch_Name === "CIL")
            {
              this.branch_Name = "L1 CILS"
            } 
            else if(this.branch_Name === "MIAI")
            {
              this.branch_Name = "L1 Miage Initiale"
            } 
            else  if(this.branch_Name === "MIAA")
            {
              this.branch_Name = "L1 Miage Apprentissage"
            } 
            else  if(this.branch_Name === "MATH110")
            {
              this.branch_Name = "L1 MATH"
            }
            else {
              this.branch_Name= "L1" + " " + this.rep
            }
            this.pathway.push({
              branchName: this.branch_Name,
            });
            this.lice1.push({
              branchName: this.branch_Name,
            });
          }

          // Element commencant par L2

          else if (branch.startsWith("L2")) {
             
            this.firstSplit = branch.split("-")[0];
            this.rep=this.firstSplit.split("L2")[1];
            this.branch_Name = this.firstSplit.split("L2")[1];
             if(this.branch_Name === "CIL")
             {
              this.branch_Name = "L2 CILS"
             }
            else if(this.branch_Name === "INFX")
             {
              this.branch_Name = "L2 Informatique"
             }
            else if(this.branch_Name === "MIAI")
             {
              this.branch_Name = "L2 Miage Initiale"
             }
             else if(this.branch_Name === "MIAA")
             {
              this.branch_Name = "L2 Miage Apprentissage"
            }
            else
            {
              this.branch_Name= "L2" + " " + this.rep
            }
            this.pathway.push({
              branchName: this.branch_Name,
            });

            this.lice2.push({
              branchName: this.branch_Name,
            });
          }

          //L2 LICENCE 3

          else if (branch.startsWith("L3")) {
           
           
           
            this.firstSplit = branch.split("-")[0];
            this.secondSplit = branch.split("-")[1];
            this.thirdSplit = branch.split("-")[2];
            this.espace = branch.split(" ")[0];
            this.rep=this.firstSplit.split("L3")[1];
            //this.branch_Name = this.firstSplit.split("L3")[1];
            //console.log(this.firstSplit.split("L3"))
             if((this.firstSplit === "L3") & (this.secondSplit === "CILS"))
             {
              this.branch_Name = "L3 CILS"
            }
            else if((this.firstSplit === "L3") & (this.secondSplit === "ASR"))
            {
              this.branch_Name = "L3 ASR"
            }
             else if((this.firstSplit === "L3A") & (this.secondSplit === "MIAGE") & (this.thirdSplit === "FA"))
             {
              this.branch_Name = "L3 Miage Apprentissage"
            }
             else if((this.firstSplit === "L3") & (this.secondSplit === "MIAGE") )
             {
               this.branch_Name = "L3 Miage Initiale"
             }
              else if((this.espace === "L3DLBI"))
             {
               this.branch_Name = "L3 Double Licence"
             }
              else 
             {
               this.branch_Name = "L3" + " "+ this.firstSplit + " "+ this.secondSplit
             }

            this.pathway.push({
              branchName: this.branch_Name,
            });

            this.lice3.push({
              branchName: this.branch_Name,
            });
          }

          // MASTER 1

          else if (branch.startsWith("M1")) {
            this.firstSplit = branch.split("-")[0];
            this.rep = this.firstSplit.split("M1")[1];
            this.branch_Name = this.firstSplit.split("M1")[1];
             if(this.branch_Name === "CIL"){
              this.branch_Name = "M1 CILS"
            } 
             else if(this.branch_Name === "MIAI")
             {
              this.branch_Name = "M1 Miage-Initiale"
             }
             else if(this.branch_Name === "MIAA")
             {
              this.branch_Name = "M1 Miage-Apprentissage"
             }
             else
             {
               this.branch_Name= "M1"+ " " + this.rep
             }
            this.pathway.push({
              branchName: this.branch_Name,
            });

            this.M1.push({
              branchName: this.branch_Name,
            });
          }
        
        // MASTER 2

          else if (branch.startsWith("M2")) 
          {
            this.firstSplit = branch.split("-")[0];
            this.rep = this.firstSplit.split("M2")[1];
            this.branch_Name = this.firstSplit.split("M2")[1];
            if(this.branch_Name === "CIL")
            {
              this.branch_Name = "M2 CILS"
            }
             else if(this.branch_Name === "MIAI")
             {
              this.branch_Name = "M2 Miage-Initiale"
             }
             else if(this.branch_Name === "MIAA")
             {
              this.branch_Name = "M2 Miage-Apprentissage"
             } 
             else
             {
                 this.branch_Name= "M2"+ " " + this.rep
             }
              this.pathway.push({
              branchName: this.branch_Name,
            });

            this.M2.push({
              branchName: this.branch_Name,
            });
            
          }

          else if (branch.startsWith("LI")){
             this.branch_Name = "LAM"
          }
        });

        this.pathway.forEach((elmt)=>{
         if (elmt.startsWith("L1"))
         {
            this.lice1.push(elmt)
         }
         if (elmt.startsWith("L2"))
         {
            this.lice2.push(elmt)
         } 
         if (elmt.startsWith("L3"))
         {
            this.lice3.push(elmt);
         }
         if (elmt.startsWith("M1"))
         {
            this.M1.push(elmt);
         }
         if (elmt.startsWith("M2"))
         {
            this.M2.push(elmt);
         }
       })
      });
  },


    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if ((this.currentPage * this.nbrePage) < this.filieres.length) {
                this.currentPage++;
            }
        },
         setElementsnbrePage(nbrePage) {
            this.nbrePage = nbrePage
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

        recup(index){
            //let ooori=this.Origines[index];
           Vue.prototype.$filName=this.donnees[index];
           this.$router.push("/admin/filieres/Professeur");

        },

        recuperer(index){
            //let ooori=this.Origines[index];
           Vue.prototype.$filNameMat=this.donnees[index];
           this.$router.push("/admin/filieres/Matieres");

        },
        

        removeDuplicate(table) {
      let unique = {};
      table.forEach(function (i) {
        if (!unique[i]) {
        //  console.log(i.branchName);
          unique[i.branchName] = true;
        }
      });
      return Object.keys(unique);
    }
    },

  computed  :{

    separL1:function(){
        return this.removeDuplicate(this.lice1)
  },

  separL2:function(){
        return this.removeDuplicate(this.lice2)

  },

  separL3:function(){
        return this.removeDuplicate(this.lice3)

  },

  separM1:function(){
        return this.removeDuplicate(this.M1)
  },

  separM2:function(){
        return this.removeDuplicate(this.M2)
  },
  }
}
</script>

<style scoped>
.card {
  width: 700px;
  margin-left: 10px;
  margin-top: 5%;
  background-color: #8ea3d1;
  height: 400px;
}
.modules {
  display: flex;
}
td {
  margin-top: 5%;
  cursor: pointer;
}
h2 {
  margin-top: 100px;
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
}
h4 {
  margin-top: 10px;
}
a {
  text-decoration: none;
  color: black;
}
.title {
  margin-top: 30px;
}
hr {
  display: block;
  border: none;
  height: 3px;
  background-color: #C9893C;
  margin-top: 15px;
  -webkit-animation-name: line-show; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */
  animation-name: line-show;
  animation-duration: 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  -o-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1); /* custom */
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  .modules {
    flex-flow: row wrap;
  }
  .card {
    width: 300px;
    margin-left: 20px;
  }
}
</style>