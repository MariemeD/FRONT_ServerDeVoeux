<template>
  <div v-if="this.$cookies.get('emailProfessor') !== null">
    <Navbar />
    <h2 class="pt-5">Service de {{ firstName }} {{ lastName }}</h2>

    <div class="container-fluid">
      <div class="table-responsive">
        <table class="table table-striped mt-4">
          <thead>
            <th @click="sortFiliere()">Filières</th>
            <th @click="sortMatiere()">Matières</th>
            <th>CM effectués / CM totaux</th>
            <th>TD effectués / TD totaux</th>
            <th>TP effectués / TP totaux</th>
            <th>Total equivalent TD</th>
          </thead>
          <tbody>
            <tr v-for="(hours, key) in setFilieres()" :key="key">
              <td>{{ hours.filieres }}</td>
              <td>
                {{ hours.matiere ? hours.matiere : "Matière indeterminée" }}
              </td>
              <td
                class="font-weight-bold"
                id="cm"
                v-bind:class="{
                  'text-danger': hours.cmDone < hours.cmTotal / 2,
                  'text-warning':
                    hours.cmDone >= hours.cmTotal / 2 &&
                    hours.cmDone !== hours.cmTotal,
                  'text-success':
                    hours.cmDone === hours.cmTotal ||
                    hours.cmDone > hours.cmTotal,
                  'text-dark': hours.cmTotal === 0,
                }"
              >
                {{
                  hours.cmTotal === 0
                    ? "-"
                    : hours.cmDone + "h / " + hours.cmTotal + "h"
                }}
              </td>
              <td
                class="font-weight-bold"
                id="td"
                v-bind:class="{
                  'text-danger': hours.tdDone < hours.tdTotal / 2,
                  'text-warning':
                    hours.tdDone >= hours.tdTotal / 2 &&
                    hours.tdDone !== hours.tdTotal,
                  'text-success':
                    hours.tdDone === hours.tdTotal ||
                    hours.tdDone > hours.tdTotal,
                  'text-dark': hours.tdTotal === 0,
                }"
              >
                {{
                  hours.tdTotal === 0
                    ? "-"
                    : hours.tdDone + "h / " + hours.tdTotal + "h"
                }}
              </td>
              <td
                class="font-weight-bold"
                id="tp"
                v-bind:class="{
                  'text-danger': hours.tpDone < hours.tpTotal / 2,
                  'text-warning':
                    hours.tpDone >= hours.tpTotal / 2 &&
                    hours.tpDone !== hours.tpTotal,
                  'text-success':
                    hours.tpDone === hours.tpTotal ||
                    hours.tpDone > hours.tpTotal,
                  'text-dark': hours.tpTotal === 0,
                }"
              >
                {{
                  hours.tpTotal === 0
                    ? "-"
                    : hours.tpDone + "h / " + hours.tpTotal + "h"
                }}
              </td>
              <td>{{ hours.cmDone + hours.tdDone + hours.tpDone }}</td>
            </tr>
            <tr style="font-weight: bold">
              <td colspan="5">Total</td>
              <td>{{ getHr() }}</td>
            </tr>
            <tr style="font-weight: bold">
              <td colspan="5">Service Statutaire</td>
              <td>{{ service }}</td>
            </tr>

            <tr style="font-weight: bold">
              <td colspan="5">Déficit</td>
              <td
                v-bind:class="{
                  'text-warning': getDeficit() < 0,
                  'text-success': getDeficit() > 0,
                  'text-dark': getDeficit() === 0,
                }"
              >
                {{ getDeficit() }}
              </td>
            </tr>
          </tbody>
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
      <a href="/login"> Se connecter </a>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar_Prof";
import axios from "axios";

export default {
  name: "HoursMadeDetails",
  components: { Navbar },
  data() {
    return {
      firstName: String,
      lastName: String,
      cours: [],
      branchs: [],
      differenceCM: 0,
      differenceTD: 0,
      differenceTP: 0,
      service: String,
      somme: 0,
    };
  },
  created() {
     console.log(this.$cookies.get("prof"))
    this.firstName = this.$cookies.get("prof").firstName;
    this.service = this.$cookies.get("prof").serviceStatutaire;
    this.lastName = this.$cookies.get("prof").lastName;
  
    //get List of professor cours
    axios
      .get(
        "http://146.59.195.214:8006/api/v1/stats/teacher/matieres/" +
          this.firstName +
          "/" +
          this.lastName
      )
      .then((response) => {
        this.cours = response.data;
        console.log(response.data);
      });
    //get all branchs
    axios
      .get(
        "http://146.59.195.214:8006/api/v1/stats/teacher/events-grouped-by-categories/" +
          this.firstName +
          "/" +
          this.lastName
      )
      .then((response) => {
        this.branchs = response.data;
      });
  },
  methods: {
    setFilieres() {
      let finalStats = this.cours;
      for (let key of Object.keys(this.cours)) {
        let filieres = [];
        for (let stat in this.branchs) {
          if (this.branchs[stat].find((m) => m.matiere === key)) {
            filieres.push(stat);
          }
        }
        finalStats[key].matiere = key;
        finalStats[key].filieres = filieres;
      }
      return Object.values(finalStats).sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirection === "desc") modifier = -1;
        if (a.filieres[0] < b.filieres[0]) return -1 * modifier;
        if (a.filieres[0] > b.filieres[0]) return modifier;
        return 0;
      });
    },

    getDoneHoursCM() {
      return Object.values(this.cours).reduce(
        (a, b) => a + (b["cmDone"] || 0),
        0
      );
    },
    getDoneHoursTD() {
      return Object.values(this.cours).reduce(
        (a, b) => a + (b["tdDone"] || 0),
        0
      );
    },
    getDoneHoursTP() {
      return Object.values(this.cours).reduce(
        (a, b) => a + (b["tpDone"] || 0),
        0
      );
    },

    getHr() {
      this.somme =
        this.getDoneHoursCM() + this.getDoneHoursTD() + this.getDoneHoursTP();
      return this.somme;
    },
    getDeficit() {
      return this.somme - this.service;
    },
    sortMatiere() {
      this.cours.sort((a, b) => {
        if (a.matiere < b.matiere) return -1;
        else if (a.matiere == b.matiere) return 0;
        else return 1;
      });
    },
    sortFiliere() {
      this.branchs.sort((a, b) => {
        if (a.filiere < b.filiere) return -1;
        else if (a.filiere == b.filiere) return 0;
        else return 1;
      });
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}
th {
  text-align: center;
  background-color: #536895;
  color: #eee;
  vertical-align: middle !important;
}
.table-striped tbody tr:hover {
  background-color: rgba(96, 124, 184, 0.3);
}
.text-warning {
  color: #ef9a35 !important;
}
td {
  vertical-align: middle !important;
}
tfoot td {
  font-weight: bold;
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
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
  tfoot tr {
    width: 350px;
  }
}
</style>
