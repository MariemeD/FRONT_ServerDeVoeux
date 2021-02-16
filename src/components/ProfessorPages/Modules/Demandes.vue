<template>
  <div>
    <Navbar />
    <div class="card">
      <div class="general">
        <h1>Demandes</h1>
       
        <table class="table">
          <thead>
            <tr>
              <th>Demande</th>
              <th>Statut</th>
              <th>
                <button
                  data-toggle="modal"
                  data-target="#formulaire"
                  class="btn btn-primary"
                  id="save"
                >
                  Nouvelle demande
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hennach</td>
              <td>Leila</td>
              <td>
                <font-awesome-icon icon="eye" />
                <font-awesome-icon icon="trash" />
              </td>
            </tr>
            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td><font-awesome-icon icon="trash" /></td>
            </tr>
            <tr>
              <td>Bourlier</td>
              <td>Sylvie</td>
              <td>Consulter</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal fade" id="formulaire">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Demande :</h4>
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
                    id="branch"
                    @change="changeBranch()"
                  >
                    <option
                      v-for="branch in BranchesN"
                      :key="branch"
                      v-bind:value="branch.branchOrigin"
                    >
                      {{ branch.branchName }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <h4>Matieres</h4>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    id="matiere"
                  >
                    <option v-for="matiere in Matieres" :key="matiere" v-bind:value="matiere.matiereName">
                      {{ matiere.matiereName }}
                    </option>
                  </select>
                </div>
                <button
                  type="button"
                  class="btn btn-primary pull-right"
                  id="demande"
                  @click="sendRequest()"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  margin-top: 5%;
  border: none;
}
table {
  width: 70%;
  margin-left: 20%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #344c80;
  margin-top: 30px;
  margin-left: 15%;
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
h1{
  margin-top: 50px;
}
#save {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}
#demande {
  border-color: #55608f;
  background-color: #55608f;
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
      Matieres: [],
      firstSplit: String,
      branch_Name: String,
      originName: String,
    };
  },

  methods: {
    removeDuplicate(table) {
      let unique = [];
      var cache = {};
      unique = table.filter(function (elem) {
        return cache[elem.branchName] ? 0 : (cache[elem.branchName] = 1);
      });

      //  console.log(unique);
      return unique;
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
                this.firstSplit = branch.split("-")[0];
                console.log(this.firstSplit);
                this.branch_Name = this.firstSplit.split("L1")[1];
                this.originName = this.firstSplit.split("L1")[1];
                if (this.branch_Name === "CIL") {
                  this.branch_Name = "CILS";
                }
                if (this.branch_Name === "MIAI") {
                  this.branch_Name = "Miage Initiae";
                }
                if (this.branch_Name === "MIAA") {
                  this.branch_Name = "Miage Apprentissage";
                }

                this.Branches.push({
                  branchName: this.branch_Name,
                  branchOrigin: "L1" + this.originName,
                });

                this.BranchesN = this.removeDuplicate(this.Branches);
                console.log(this.BranchesN);
              }
            }
            if (BranchName === "L2") {
              console.log("l2");
              if (branch.startsWith("L2")) {
                this.firstSplit = branch.split("-")[0];
                this.branch_Name = this.firstSplit.split("L2")[1];
                this.originName = this.firstSplit.split("L2")[1];
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

                this.Branches.push({
                  branchName: this.branch_Name,
                  branchOrigin: "L2" + this.originName,
                });

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
                  this.originName = branch.split("-")[1];

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
                  branchOrigin: "L3" + this.originName,
                });
                this.BranchesN = this.removeDuplicate(this.Branches);
              }
            }
            if (BranchName === "M1") {
              console.log("m1");
              if (branch.startsWith("M1")) {
                this.firstSplit = branch.split("-")[0];

                this.branch_Name = this.firstSplit.split("M1")[1];
                this.originName = this.branch_Name = this.firstSplit.split(
                  "M1"
                )[1];
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
                  branchOrigin: "M1" + this.originName,
                });
                this.BranchesN = this.removeDuplicate(this.Branches);
              }
            }
            if (BranchName === "M2") {
              console.log("m2");
              if (branch.startsWith("M2")) {
                this.firstSplit = branch.split("-")[0];

                this.branch_Name = this.firstSplit.split("M2")[1];
                this.originName = this.firstSplit.split("M2")[1];
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
                  branchOrigin: "M2" + this.originName,
                });
                this.BranchesN = this.removeDuplicate(this.Branches);
                console.log(this.BranchesN);
              }
            }
          });
        });
    },
    changeBranch() {
      var branchName = document.getElementById("branch").value;
      console.log(document.getElementById("branch").value);
      this.Matieres = [];
      axios
        .get(
          "http://146.59.195.214:8006/api/v1/events/" + branchName + "/matiere"
        )
        .then((response) => {
          console.log(response);
          response.data.forEach((matiere) => {
            this.Matieres.push({
              matiereName: matiere,
            });
            // console.log(this.matieres)
          });
        });
    },
    sendRequest() {
      
      axios
        .post("https://back-serverdevoeux.herokuapp.com/api/request", {
          requestor: "Didier Courtaud",
          emailRequestor: "didier.courtaud@univ-evry.fr",
          detailRequest: "demande de voeux",
          groupRequested: document.getElementById("branch").value,
          courseRequested: document.getElementById("matiere").value,
          status: "En Attente"
        })
        .then(function (response) {
          console.log("done");
          console.log(response);
        });
    },
  },
};
</script>