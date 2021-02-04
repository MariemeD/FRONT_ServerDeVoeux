<template>
    <div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des filières</h1>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Filière</th>
             <th  colspan=2>Action souhaitée</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="filiere in separ" :key="filiere">
              <td>{{filiere}}</td>
              <td><button class="btn btn-info btn-block" v-on:click="modifier"><font-awesome-icon icon="edit"></font-awesome-icon></button></td>
              <td><button class="btn btn-danger btn-block" v-on:click="supprimer"><font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr> 

            <tr>
              <td><input type="text" class="form-control"  placeholder="Filière"></td>
              <td colspan=2><button class="btn btn-primary btn-block" disabled>Ajouter</button></td>
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
import Header from "@/components/AdminPages/Header";


export default {
    name: "Pathways",
    components: {Header},
    data () {
        return {
            filieres: [],
            test:null,
            nbrePage: 10,
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
            this.L1N = this.removeDuplicate(this.L1);
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
            
          }

          else if (branch.startsWith("LI")){
             this.branch_Name = "LAM"
          }
        });
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
        Listefil:function(){
            return this.filieres.filter((row, index) => {
                let start = (this.currentPage - 1) * this.nbrePage;
                let end = this.currentPage* this.nbrePage;
                if (index >= start && index < end) return true
        });
    },

    separ:function(){
        return this.removeDuplicate(this.pathway).filter((row, index) => {
                let start = (this.currentPage - 1) * this.nbrePage;
                let end = this.currentPage* this.nbrePage;
                if (index >= start && index < end) return true


    });

  }
  }
}
</script>

<style scoped>

</style>
