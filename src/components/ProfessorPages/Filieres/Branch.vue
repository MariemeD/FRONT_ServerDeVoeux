<template>
  <div class="container">
    <Navbar />
    <div class="title">
      <h2>Liste des Enseignements</h2>
    </div>
    <div class="modules">
      
      <div class="card">
        <h4>M2</h4>
        <hr />

        <table v-for="branch in M2N" :key="branch">
          <tr>
            <td>
              <a href="/detailsBranch"> {{ branch }} </a>
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>M1</h4>
        <hr />
        <table v-for="branch in M1N" :key="branch">
          <tr>
            <td>
              <a href="/detailsBranch"> {{ branch }} </a>
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>L3</h4>
        <hr />
        <table v-for="branch in L3N" :key="branch">
          <tr>
            <td>
              <a href="/detailsBranch"> {{ branch }} </a>
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>L2</h4>
        <hr />
        <table v-for="branch in L2N" :key="branch">
          <tr>
            <td>
              <a href="/detailsBranch"> {{ branch }} </a>
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>L1</h4>
        <hr />
        <table v-for="branch in L1N" :key="branch">
          <tr>
            <td>
              <a href="/detailsBranch"> {{ branch }} </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
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
  background-color: #5f2c82;
  margin-top: 15px;

  -webkit-animation-name: line-show; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */
  animation-name: line-show;
  animation-duration: 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  -o-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1); /* custom */
}
	@media 
	only screen and (max-width: 760px),
	(min-device-width: 768px) and (max-device-width: 1024px)  {
    .modules{
      flex-flow: row wrap;
    }
    .card{
      width: 300px;
      margin-left: 20px;
    }
  }
</style>
<script>
import Navbar from "../Navbar_Prof";
import axios from "axios";

export default {
  name: "Branche",
  components: {
    Navbar,
  },
  data() {
    return {
      L1: [],
      L1N: [],
      L2: [],
      L2N: [],
      L3: [],
      L3N: [],
      M1: [],
      M1N: [],
      M2: [],
      M2N: [],
      firstSplit: String,
      branch_Name: String,
    };
  },
  mounted() {
    axios
      .get("http://146.59.195.214:8006/api/v1/events/filieres")
      .then((response) => {
        console.log(this.L1);
        response.data.forEach((branch) => {
        
          if (branch.startsWith("L1")) {
            this.firstSplit = branch.split("-")[0];
           console.log(this.firstSplit)
            this.branch_Name = this.firstSplit.split("L1")[1];
             if(this.branch_Name === "CIL"){
              this.branch_Name = "CILS"
            }
             if(this.branch_Name === "MIAI"){
              this.branch_Name = "Miage Initiae"
            }
             if(this.branch_Name === "MIAA"){
              this.branch_Name = "Miage Apprentissage"
            }
            this.L1.push({
              branchName: this.branch_Name,
            });

            this.L1N = this.removeDuplicate(this.L1);
          }
          if (branch.startsWith("L2")) {
             
            this.firstSplit = branch.split("-")[0];
            this.branch_Name = this.firstSplit.split("L2")[1];
             if(this.branch_Name === "CIL"){
              this.branch_Name = "CILS"
            }
            if(this.branch_Name === "INFX"){
              this.branch_Name = "Informatique"
            }
             if(this.branch_Name === "MIAI"){
              this.branch_Name = "Miage Initiale"
            }
             if(this.branch_Name === "MIAA"){
              this.branch_Name = "Miage Apprentissage"
            }
            this.L2.push({
              branchName: this.branch_Name,
            });
            this.L2N = this.removeDuplicate(this.L2);
          }
          if (branch.startsWith("L3")) {
           
            if(branch.indexOf("-")> -1){

           
            this.branch_Name = branch.split("-")[1];
            
           
            if(branch.split("-")[0] === "L3A"){
              this.branch_Name = this.branch_Name + "-Apprentissage";
            }
           
            //this.branch_Name = this.firstSplit.split("L3")[1];
            console.log(this.firstSplit.split("L3"))
             if(this.branch_Name === "CIL"){
              this.branch_Name = "CILS"
            }
             if(this.branch_Name === "MIAI"){
              this.branch_Name = "Miage-Initiale"
            }
             if(this.branch_Name === "MIAA"){
              this.branch_Name = "Miage-Apprentissage"
            }
             } else{
               this.branch_Name= "";
             }
            this.L3.push({
              branchName: this.branch_Name,
            });
            this.L3N = this.removeDuplicate(this.L3);
          }
          if (branch.startsWith("M1")) {
            this.firstSplit = branch.split("-")[0];
            
            this.branch_Name = this.firstSplit.split("M1")[1];
             if(this.branch_Name === "CIL"){
              this.branch_Name = "CILS"
            }
             if(this.branch_Name === "MIAI"){
              this.branch_Name = "Miage-Initiale"
            }
             if(this.branch_Name === "MIAA"){
              this.branch_Name = "Miage-Apprentissage"
            }
            this.M1.push({
              branchName: this.branch_Name,
            });
            this.M1N = this.removeDuplicate(this.M1);
          }
          if (branch.startsWith("M2")) {
            this.firstSplit = branch.split("-")[0];
             
            this.branch_Name = this.firstSplit.split("M2")[1];
            if(this.branch_Name === "CIL"){
              this.branch_Name = "CILS"
            }
             if(this.branch_Name === "MIAI"){
              this.branch_Name = "Miage-Initiale"
            }
             if(this.branch_Name === "MIAA"){
              this.branch_Name = "Miage-Apprentissage"
            }
              this.M2.push({
                branchName: this.branch_Name,
              });
             this.M2N = this.removeDuplicate(this.M2);
          }
        });
      });
  },
  methods: {
    removeDuplicate(table) {
      let unique = {};
      table.forEach(function (i) {
        if (!unique[i]) {
        //  console.log(i.branchName);
          unique[i.branchName] = true;
        }
      });
      return Object.keys(unique);
    },
    
    setCookie(item) {
      this.$cookies.set("filiere", item);
      console.log(this.$cookies.get("idexercice"));
      this.$router.push("/exerciceContent/" + this.$cookies.get("idexercice"));
    },
  },
};
</script>