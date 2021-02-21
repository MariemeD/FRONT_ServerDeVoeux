<template>
  <div>
    <Navbar />
    <div class="modules">
      <div class="card" id="infos">
        <div class="additional">
          <h3>Leila Hennach</h3>
          <h3>Grad:</h3>
          <h3>Université</h3>
          <h3>email</h3>

          <button
            data-toggle="modal"
            data-target="#formulaire"
            class="btn btn-primary"
            id="ensDemande"
          >
            Demande d'enseignement
          </button>
        </div>

        <div class="modal fade" id="formulaire">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Vos infos :</h4>
                <button type="button" class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body row">
                <form class="col">
                  <div class="form-group">
                    <h4>Niveau</h4>
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      id="mySelect"
                      @change="changeVal()"
                    >
                      <option>Selectionner un niveau</option>
                      <option>L1</option>
                      <option>L2</option>
                      <option>L3</option>
                      <option>M1</option>
                      <option>M2</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <h4>Filières</h4>
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                    >
                      <option v-for="branch in BranchesN" :key="branch">
                        {{ branch }}
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary pull-right"
                    id="demande"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" id="details">
        <div class="general">
          <h1>Module Name</h1>
          <h4>Branche Name</h4>
          <table class="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Volume</th>
                <th>Nbr de grp</th>
                <th>Enseignement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hennach</td>
                <td>Leila</td>
                <td>testOrigine</td>
                <td>testStatut</td>
              </tr>
              <tr>
                <td>Bourlier</td>
                <td>Sylvie</td>
                <td>testOrigine</td>
                <td>testStatut</td>
              </tr>
              <tr>
                <td>Bourlier</td>
                <td>Sylvie</td>
                <td>testOrigine</td>
                <td>testStatut</td>
              </tr>

              <tr>
                <td>Bourlier</td>
                <td>Sylvie</td>
                <td>testOrigine</td>
                <td>testStatut</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--div class="module">
     <div class="card"> 
      <div class="additional">
        <h3>Leila Hennach</h3>
        <h3>Grad:</h3>
        <h3>Université</h3>
        <h3>email</h3>
        
          <button
            data-toggle="modal"
            data-target="#formulaire"
            class="btn btn-primary"
            id="ensDemande"
          >
            Demande d'enseignement
          </button>
        </div>

        <div class="modal fade" id="formulaire">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Vos infos :</h4>
                <button type="button" class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body row">
                <form class="col">
                <div class="form-group">
                     <h4>Niveau</h4>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    id="mySelect"
                    @change="changeVal()"
                    
                  >
                    <option >Selectionner un niveau</option>
                    <option >L1</option>
                    <option >L2</option>
                    <option >L3</option>
                    <option >M1</option>
                    <option >M2</option>
                  </select>
                 
                </div>
                <div class="form-group">
                 <h4>Filières</h4>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    
                  >
                    <option v-for="branch in BranchesN" :key="branch">
                      {{ branch }}
                    </option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary pull-right" id="demande">
                  Envoyer
                </button>
              </form>
              </div>
            </div>
          </div>
        
      </div>
     </div>
       <div class="card"> 
      <div class="general">
      
      
        <h1>Module Name</h1>
        <h4>Branche Name</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Volume</th>
              <th>Nbr de grp</th>
              <th>Enseignement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hennach</td>
              <td>Leila</td>
              <td>testOrigine</td>
              <td>testStatut</td>
            </tr>
            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td>testOrigine</td>
              <td>testStatut</td>
            </tr>
            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td>testOrigine</td>
              <td>testStatut</td>
            </tr>

            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td>testOrigine</td>
              <td>testStatut</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div-->
  </div>
</template>
<style scoped>
#infos {
  width: 200px;
  margin-left: 10px;
  margin-top: 5%;

  height: 400px;
}
#details {
  width: 70%;
  
  margin-top: 5%;
  margin-left:40px;
  height: 400px;
}
.additional {
  position: absolute;
  width: 200px;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #55608f;
  transition: width 0.4s;
  overflow: hidden;
  z-index: 2;
  
}
.modules {
  display: flex;
}
td {
  margin-top: 5%;
}
h3 {
   color: #fff;
    margin-top: 40px;

}

a {
  text-decoration: none;
  color: black;
}
table {
  width: 100%;

  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #344c80;
  margin-top: 30px;
}

th,
td {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

th {
  text-align: center;
}

thead th {
  background-color: #55608f;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
tbody td {
  position: relative;
}
select {
  width: 100%;
}
#save {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}
#demande {
  border-color: #55608f;
  background-color: #55608f;
}
#ensDemande {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
  width: 150px;
  margin-bottom: 0%;
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
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #eee;
  }
  tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 100%;
    white-space: nowrap;
  }

  /*
		Label the data
		*/

  td:nth-of-type(1):before {
    content: "Type";
  }
  td:nth-of-type(2):before {
    content: "Volume";
  }
  td:nth-of-type(3):before {
    content: "Nbr de groupe";
  }
  td:nth-of-type(4):before {
    content: "Enseignement";
  }
}
</style>
<script>
import Navbar from "../Navbar_Prof";
import axios from "axios";

export default {
  name: "Prof_Service",
  components: {
    Navbar,
  },
  data() {
    return {
      Branches: [],
      BranchesN: [],
      //   BrancheName: String,
      firstSplit: String,
      branch_Name: String,
    };
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
    changeVal() {
      var BranchName = document.getElementById("mySelect").value;
      this.Branches = [];
      //console.log(BranchName);
      axios
        .get("http://146.59.195.214:8006/api/v1/events/filieres")
        .then((response) => {
          response.data.forEach((branch) => {
            //  console.log("pst")

            if (BranchName === "L1") {
              console.log("l1");

              if (branch.startsWith("L1")) {
                console.log("one");
                this.firstSplit = branch.split("-")[0];
                console.log(this.firstSplit);
                this.branch_Name = this.firstSplit.split("L1")[1];
                if (this.branch_Name === "CIL") {
                  this.branch_Name = "CILS";
                }
                if (this.branch_Name === "MIAI") {
                  this.branch_Name = "Miage Initiae";
                }
                if (this.branch_Name === "MIAA") {
                  this.branch_Name = "Miage Apprentissage";
                }
                console.log("two");
                this.Branches.push({
                  branchName: this.branch_Name,
                });

                this.BranchesN = this.removeDuplicate(this.Branches);
                console.log(this.BranchesN);
              }
            }
            if (BranchName === "L2") {
              console.log("l2");
              if (branch.startsWith("L2")) {
                console.log("whd");
                this.firstSplit = branch.split("-")[0];
                this.branch_Name = this.firstSplit.split("L2")[1];
                if (this.branch_Name === "CIL") {
                  this.branch_Name = "CILS";
                }
                if (this.branch_Name === "INFX") {
                  this.branch_Name = "Informatique";
                }
                if (this.branch_Name === "MIAI") {
                  this.branch_Name = "Miage Initiale";
                }
                if (this.branch_Name === "MIAA") {
                  this.branch_Name = "Miage Apprentissage";
                }
                console.log("juj");
                this.Branches.push({
                  branchName: this.branch_Name,
                });
                console.log("emm");
                console.log(this.Branches);
                this.BranchesN = this.removeDuplicate(this.Branches);
                console.log(this.BranchesN);
              }
            }
            if (BranchName === "L3") {
              console.log("m3");

              if (branch.startsWith("L3")) {
                if (branch.indexOf("-") > -1) {
                  this.branch_Name = branch.split("-")[1];

                  if (branch.split("-")[0] === "L3A") {
                    this.branch_Name = this.branch_Name + "-Apprentissage";
                  }

                  //this.branch_Name = this.firstSplit.split("L3")[1];
                  // console.log(this.firstSplit.split("L3"));
                  if (this.branch_Name === "CIL") {
                    this.branch_Name = "CILS";
                  }
                  if (this.branch_Name === "MIAI") {
                    this.branch_Name = "Miage-Initiale";
                  }
                  if (this.branch_Name === "MIAA") {
                    this.branch_Name = "Miage-Apprentissage";
                  }
                } else {
                  this.branch_Name = "";
                }
                this.Branches.push({
                  branchName: this.branch_Name,
                });
                this.BranchesN = this.removeDuplicate(this.Branches);
              }
            }
            if (BranchName === "M1") {
              console.log("m1");
              if (branch.startsWith("M1")) {
                this.firstSplit = branch.split("-")[0];

                this.branch_Name = this.firstSplit.split("M1")[1];
                if (this.branch_Name === "CIL") {
                  this.branch_Name = "CILS";
                }
                if (this.branch_Name === "MIAI") {
                  this.branch_Name = "Miage-Initiale";
                }
                if (this.branch_Name === "MIAA") {
                  this.branch_Name = "Miage-Apprentissage";
                }
                this.Branches.push({
                  branchName: this.branch_Name,
                });
                this.BranchesN = this.removeDuplicate(this.Branches);
              }
            }
            if (BranchName === "M2") {
              console.log("m2");
              if (branch.startsWith("M2")) {
                this.firstSplit = branch.split("-")[0];

                this.branch_Name = this.firstSplit.split("M2")[1];
                if (this.branch_Name === "CIL") {
                  this.branch_Name = "CILS";
                }
                if (this.branch_Name === "MIAI") {
                  this.branch_Name = "Miage-Initiale";
                }
                if (this.branch_Name === "MIAA") {
                  this.branch_Name = "Miage-Apprentissage";
                }
                this.Branches.push({
                  branchName: this.branch_Name,
                });
                this.BranchesN = this.removeDuplicate(this.Branches);
              }
            }
          });
        });
    },
  },
};
</script>
