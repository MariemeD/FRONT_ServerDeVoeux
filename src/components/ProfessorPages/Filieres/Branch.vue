<template>
  <div class="container" v-if="this.$cookies.get('emailProfessor') !== null">
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
            <td @click="setCookie(branch)">
              {{ branch.branchName }}
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>M1</h4>
        <hr />
        <table v-for="branch in M1N" :key="branch">
          <tr>
            <td @click="setCookie(branch)">
              {{ branch.branchName }}
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>L3</h4>
        <hr />
        <table v-for="branch in L3N" :key="branch">
          <tr>
            <td @click="setCookie(branch)">
              {{ branch.branchName }}
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>L2</h4>
        <hr />
        <table v-for="branch in L2N" :key="branch">
          <tr>
            <td @click="setCookie(branch)">
              {{ branch.branchName }}
            </td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>L1</h4>
        <hr />
        <table v-for="branch in L1N" :key="branch">
          <tr>
            <td @click="setCookie(branch)">
              {{ branch.branchName }}
            </td>
          </tr>
        </table>
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
  background-color: #c9893c;
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
<script>
import Navbar from "../Navbar_Prof";
import axios from "axios";

export default {
  name: "Branch",
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
      info: [],
      infoN: [],
      firstSplit: String,
      branch_Name: String,
      originalName: String,
    };
  },
  mounted() {
    //get all branchs
    axios
      .get("http://146.59.195.214:8006/api/v1/events/filieres")
      .then((response) => {
        response.data.forEach((branch) => {
          if (branch.startsWith("L1")) {
            this.firstSplit = branch.split("-")[0];
            console.log(this.firstSplit);
            this.branch_Name = this.firstSplit.split("L1")[1];
            this.originalName = this.firstSplit.split("L1")[1];
            if (this.branch_Name === "CIL") {
              this.branch_Name = "CILS";
            }
            if (this.branch_Name === "MIAI") {
              this.branch_Name = "Miage Initiae";
            }
            if (this.branch_Name === "MIAA") {
              this.branch_Name = "Miage Apprentissage";
            }
            this.L1.push({
              branchName: this.branch_Name,
              branchCookie: "L1" + this.originalName,
            });

            this.L1N = this.removeDuplicate(this.L1);
            this.L1N.forEach((val) => {
              this.info.push({
                branchName: val.branchName,
                branchCookie: val.branchCookie,
              });
            });
          }
          if (branch.startsWith("L2")) {
            this.firstSplit = branch.split("-")[0];
            this.branch_Name = this.firstSplit.split("L2")[1];
            this.originalName = this.firstSplit.split("L2")[1];
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
            this.L2.push({
              branchName: this.branch_Name,
              branchCookie: "L2" + this.originalName,
            });
            this.L2N = this.removeDuplicate(this.L2);
            this.L2N.forEach((val) => {
              this.info.push({
                branchName: val.branchName,
                branchCookie: val.branchCookie,
              });
            });
          }

          if (branch.startsWith("L3")) {
            if (branch.indexOf("-") > -1) {
              this.branch_Name = branch.split("-")[1];
              this.originalName = branch.split("-")[1];

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
            this.L3.push({
              branchName: this.branch_Name,
              branchCookie: "L3" + this.originalName,
            });
            this.L3N = this.removeDuplicate(this.L3);
            this.L3N.forEach((val) => {
              this.info.push({
                branchName: val.branchName,
                branchCookie: val.branchCookie,
              });
            });
          }
          if (branch.startsWith("M1")) {
            this.firstSplit = branch.split("-")[0];

            this.branch_Name = this.firstSplit.split("M1")[1];
            this.originalName = this.firstSplit.split("M1")[1];
            if (this.branch_Name === "CIL") {
              this.branch_Name = "CILS";
            }
            if (this.branch_Name === "MIAI") {
              this.branch_Name = "Miage-Initiale";
            }
            if (this.branch_Name === "MIAA") {
              this.branch_Name = "Miage-Apprentissage";
            }
            this.M1.push({
              branchName: this.branch_Name,
              branchCookie: "M1" + this.originalName,
            });
            this.M1N = this.removeDuplicate(this.M1);
            this.M1N.forEach((val) => {
              this.info.push({
                branchName: val.branchName,
                branchCookie: val.branchCookie,
              });
            });
          }
          if (branch.startsWith("M2")) {
            this.firstSplit = branch.split("-")[0];

            this.branch_Name = this.firstSplit.split("M2")[1];
            this.originalName = this.firstSplit.split("M2")[1];
            if (this.branch_Name === "CIL") {
              this.branch_Name = "CILS";
            }
            if (this.branch_Name === "MIAI") {
              this.branch_Name = "Miage-Initiale";
            }
            if (this.branch_Name === "MIAA") {
              this.branch_Name = "Miage-Apprentissage";
            }

            this.M2.push({
              branchName: this.branch_Name,
              branchCookie: "M2" + this.originalName,
            });

            this.M2N = this.removeDuplicate(this.M2);
            this.M2N.forEach((val) => {
              this.info.push({
                branchName: val.branchName,
                branchCookie: val.branchCookie,
              });
            });
            this.infoN = this.removeDuplicate(this.info);
          }
        });
      });
  },
  methods: {
    removeDuplicate(table) {
      let unique = [];
      var cache = {};
      unique = table.filter(function (elem) {
        return cache[elem.branchCookie] ? 0 : (cache[elem.branchCookie] = 1);
      });

      return unique;
    },

    setCookie(item) {
      this.$cookies.set("filiere", item);
      console.log(this.$cookies.get("filiere"));
      this.$router.push("/detailsBranch");
    },
  },
};
</script>
