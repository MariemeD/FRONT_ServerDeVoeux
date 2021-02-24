<template>
  <div v-if="this.$cookies.get('emailProfessor') !== null">
    <Navbar />
    <div class="card">
      <div class="general">
        <h1>Mes demandes</h1>

        <table class="table table-bordered table-striped">
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
            <tr v-for="demande in Demandes" :key="demande">
              <td>{{ demande.courseRequested }}</td>
              <td   v-bind:class="{
                            
                                'text-warning': demande.status === 'En attente',
                                'text-success': demande.status === 'Validé',
                                'text-danger': demande.status === 'Refusé'
                            }">{{ demande.status }}</td>
              <td>
                <font-awesome-icon
                  data-toggle="modal"
                  data-target="#information"
                  icon="eye"
                  style="color: #55608f;"
                  @click="showRequest(demande.idDemande)"
                />
                <font-awesome-icon
                  icon="trash"
                  data-toggle="modal"
                  data-target="#delete"
                 style="color: #55608f;"
                  @click="setCookie(demande)"
                />
              </td>
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
                    <option
                      v-for="matiere in Matieres"
                      :key="matiere"
                      v-bind:value="matiere.matiereName"
                    >
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
      <div class="modal fade" id="information" v-if="display === true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Details de la demande :</h4>
              <button type="button" class="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body row">
              <form class="col">
                <div class="form-group">
                  <label for="prof">Professeur :</label>
                  <input
                    id="prof"
                    class="form-control"
                    type="text"
                    :placeholder="InfoDemande[0].requestor"
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="prof">Email :</label>
                  <input
                    id="prof"
                    class="form-control"
                    type="text"
                    :placeholder="InfoDemande[0].emailRequestor"
                    disabled
                  />
                </div>

                <div class="form-group">
                  <label for="group">Groupe :</label>
                  <input
                    id="group"
                    class="form-control"
                    type="text"
                    :placeholder="InfoDemande[0].groupRequested"
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="cours">Matière :</label>
                  <input
                    id="cours"
                    class="form-control"
                    type="text"
                    :placeholder="InfoDemande[0].courseRequested"
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="status">Statut :</label>
                  <input
                    id="status"
                    class="form-control"
                    type="text"
                    :placeholder="InfoDemande[0].status"
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="delete"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div class="modal-body">
              <p v-if="supp === false">
                Etes-vous sur de supprimer cette demande ?
              </p>
              <p v-if="supp === true">
                Vous ne pouvez pas supprimer cette demande
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="deleteRequest(idDemande, demandeStatus)"
                v-if="supp === false"
              >
                Supprimer
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="card alert alert-danger alert-dismissible"
    style="height: 200px; width: 500px; margin-left: 30%; margin-top: 50px"
    v-else
  >
    <div style="margin-top: 50px">
      Veuillez vous connecter pour accéder aux données. <br />
      <router-link :to="{ name: 'login'}">Se connecter</router-link>
    </div>
  </div>
</template>
<style scoped>
h1 {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
}
.card {
  border: none;
}
table {
  width: 70%;

  border-collapse: collapse;
  overflow: hidden;

  margin-left: 15%;
}

th,
td {
  padding: 15px;
}

th {
  text-align: center;
  background-color: #55608f;
  color: #eee;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0);
}
tbody td {
  position: relative;
}
select {
  width: 100%;
}
h1 {
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
.btn-secondary {
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
      Demandes: [],
      InfoDemande: [],
      firstSplit: String,
      branch_Name: String,
      originName: String,
      display: false,
      supp: false,
      idDemande: String,
      demandeStatus: String,
    };
  },
  mounted() {
    //get all professor's requests
    axios
      .get("https://back-serverdevoeux.herokuapp.com/api/requests")
      .then((response) => {
        response.data.forEach((demande) => {
          if (demande.emailRequestor === this.$cookies.get("emailProfessor")) {
            this.Demandes.push({
              idDemande: demande._id,
              requestor: demande.requestor,
              emailRequestor: demande.emailRequestor,
              detailRequest: demande.detailRequest,
              groupRequested: demande.groupRequested,
              courseRequested: demande.courseRequested,
              status: demande.status,
            });
          }
        });
      });
  },
  methods: {
    removeDuplicate(table) {
      let unique = [];
      var cache = {};
      unique = table.filter(function (elem) {
        return cache[elem.branchName] ? 0 : (cache[elem.branchName] = 1);
      });

      return unique;
    },
    changeVal() {
      var BranchName = document.getElementById("mySelect").value;
      this.Branches = [];

      axios
        .get("http://146.59.195.214:8006/api/v1/events/filieres")
        .then((response) => {
          response.data.forEach((branch) => {
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
          requestor:
            this.$cookies.get("FnameProfessor") +
            " " +
            this.$cookies.get("LnameProfessor"),
          emailRequestor: this.$cookies.get("emailProfessor"),
          groupRequested: document.getElementById("branch").value,
          courseRequested: document.getElementById("matiere").value,
          status: "En attente",
        })
        .then(function (response) {
          console.log(response);
          //window.location.reload();
          this.$router.go(this.$router.currentRoute)
        });
    },
    showRequest(id) {
      this.display = true;
      console.log(id);
      this.InfoDemande = [];
      axios
        .get("https://back-serverdevoeux.herokuapp.com/api/request/" + id)
        .then((demande) => {
          console.log(demande);
          this.InfoDemande.push({
            idDemande: demande.data._id,
            requestor: demande.data.requestor,
            emailRequestor: demande.data.emailRequestor,
            detailRequest: demande.data.detailRequest,
            groupRequested: demande.data.groupRequested,
            courseRequested: demande.data.courseRequested,
            status: demande.data.status,
          });
          console.log(this.InfoDemande);
        });
    },
    setCookie(demande) {
      this.$cookies.set("demande", demande.idDemande);
      this.idDemande = this.$cookies.get("demande");
      this.$cookies.set("status", demande.status);
      this.demandeStatus = this.$cookies.get("status");
      if (this.demandeStatus !== "En attente") {
        this.supp = true;
      }
    },
    deleteRequest(id) {
      axios
        .delete("https://back-serverdevoeux.herokuapp.com/api/request/" + id)
        .then((response) => {
          console.log(response);
          //window.location.reload();
          this.$router.go(this.$router.currentRoute)

        });
    },
  },
};
</script>
