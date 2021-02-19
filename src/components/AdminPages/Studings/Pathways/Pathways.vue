<template>
    <div>
        <Header />
        <br><br>
        <div class="card border-warning mb-3">
            <div class="card-footer"> 
               <table class="table table-dark" id="tableFil">
                  <tr>
                     <td v-for="(filiere,index) in donnees" :key="filiere" > {{filiere}} <font-awesome-icon icon="user-tie" id="icProf" v-on:click="recup(index)"></font-awesome-icon> | <font-awesome-icon icon="eye" id="icProf"></font-awesome-icon> </td> 
                  </tr> 
                </table>
            </div>
        <br>
            <div class="card-group">
                <div class="col-lg-4 col-md-4 col-sm-6" style="max-width: 15rem;">
                    <div class="card p-3">
                        <h6 class="mt-3 mb-0 text-uppercase">Licence 1</h6>
                        <hr>

                        <table >
                            <tr v-for="filiere in separL1" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6" style="max-width: 15rem;">
                    <div id="server-card" class="card p-3">
                        <h6 class="mt-3 mb-0 text-uppercase">Licence 2</h6>
                        <hr>
                        

                        <table >
                            <tr v-for="filiere in separL2" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6" style="max-width: 15rem;">
                    <div id="professor-card" class="card p-3">
                        <h6 class="mt-3 mb-0 text-uppercase">Licence 3</h6>
                        <hr>

                        <table id="colCard">
                            <tr v-for="filiere in separL3" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6" style="max-width: 20rem;">
                    <div class="card p-3">
                        <h6 class="mt-3 mb-0 text-uppercase">Master 1</h6>
                        <hr>

                        <table >
                            <tr v-for="filiere in separM1" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="col-lg-4 col-md-4 col-sm-6" style="max-width: 18rem;">
                    <div id="server-card" class="card p-3">
                        <h6 class="mt-3 mb-0 text-uppercase">Master 2</h6>
                        <hr>
                        

                        <table >
                            <tr v-for="filiere in separM2" :key="filiere">
                                <td>~ {{filiere}} </td> 
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
            <br><br>
            <div class="card-footer"> 

               <table class="table table-dark" id="tableFil">
                  <tr>
                     <td > <font-awesome-icon icon="user-tie" id="icProf"></font-awesome-icon> Permet de voir la liste des profs de la filière </td> 
                     <td > <font-awesome-icon icon="eye" id="icProf"></font-awesome-icon> Permet de voir toutes les matieres de la filière</td>
                  </tr> 
                </table>
            </div>
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
.container {
    padding-top: 3em;
}

.card ul {
    list-style: none;
    padding: 5px 0 0;
}

#server-card, #studings-card {
    background-color: #D5D5D5;
}

#div-server-icon, #div-professor-icon, #div-studings-icon {
    border: 1px solid #B5B9D1;
    border-radius: 50%;
    background-color: #B5B9D1;
    padding: 15px;
    width: 50%;
    margin: 0 auto;
}

#group{
  margin-top:20px;


}

h6 {
    font-weight: bold;
}

#server-card hr {
    margin-bottom: 0;
}

#server-actions li, #studings-actions li, #server-actions a, #studings-actions a, #server-card h6, #studings-card h6{
    color: #344C80;
}

#professor-card {
    background-color: #344C80;
}

#colCard, #professor-actions a, #professor-card h6 {
    color: #C9893C;
}


@media all and (max-width: 992px) and (min-width: 769px) {
    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
}

@media all and (max-width: 768px) {
    #server-card, #professor-card, #studings-card {
        width: 100%;
        margin-bottom: 5px;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 70%;
        margin: 0 auto;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.6em;
    }
}

@media all and (max-width: 576px) {
    #server-card, #professor-card, #studings-card {
        width: 60%;
        margin: 0 auto 5px;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 45%;
        margin: 0 auto;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
}

@media all and (max-width: 390px) {
    .container {
        padding-top: 1em;
    }

    #server-card, #professor-card, #studings-card {
        width: 80%;
        margin: 0 auto 5px;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 45%;
        margin: 0 auto;
    }

    #icProf{
      float:right;
      text-align:right;
      margin: 0 ;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
    #tableFil{
      text-align:left;
      border:none;
    }
}

</style>
