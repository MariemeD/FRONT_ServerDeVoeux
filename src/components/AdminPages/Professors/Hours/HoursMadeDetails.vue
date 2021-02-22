<template>
    <div>
        <Header />
        <h1 class="pt-5">Heures de {{ firstnameProf }} {{ lastnameProf }}</h1>

        <div class="container-fluid">
            <div class="table-responsive">
                <table class="table table-striped mt-4">
                    <thead>
                        <th>Filières</th>
                        <th>Matières</th>
                        <th>CM effectués / CM totaux</th>
                        <th>TD effectués / TD totaux</th>
                        <th>TP effectués / TP totaux</th>
                    </thead>
                    <tbody>
                        <tr v-for="(hours, key) in setFilieres()" :key="key">
                            <td>{{ hours.filieres }}</td>
                            <td>{{ hours.matiere ? hours.matiere : 'Matière indeterminée' }}</td>
                            <td
                                class="font-weight-bold"
                                v-bind:class="{
                                'text-danger': hours.cmDone < hours.cmTotal / 2,
                                'text-warning': hours.cmDone >= hours.cmTotal / 2
                                    && hours.cmDone !== hours.cmTotal,
                                'text-success': hours.cmDone === hours.cmTotal
                                    || hours.cmDone > hours.cmTotal,
                                'text-dark': hours.cmTotal === 0
                            }">
                                {{ hours.cmTotal === 0 ? '-' : hours.cmDone + "h / " + hours.cmTotal + "h" }}
                            </td>
                            <td
                                class="font-weight-bold"
                                v-bind:class="{
                                'text-danger': hours.tdDone < hours.tdTotal / 2,
                                'text-warning': hours.tdDone >= hours.tdTotal / 2
                                    && hours.tdDone !== hours.tdTotal,
                                'text-success': hours.tdDone === hours.tdTotal
                                    || hours.tdDone > hours.tdTotal,
                                'text-dark': hours.tdTotal === 0
                            }">
                                {{ hours.tdTotal === 0 ? '-' : hours.tdDone + "h / " + hours.tdTotal + "h" }}
                            </td>
                            <td
                                class="font-weight-bold"
                                v-bind:class="{
                                'text-danger': hours.tpDone < hours.tpTotal / 2,
                                'text-warning': hours.tpDone >= hours.tpTotal / 2
                                    && hours.tpDone !== hours.tpTotal,
                                'text-success': hours.tpDone === hours.tpTotal
                                    || hours.tpDone > hours.tpTotal,
                                'text-dark': hours.tpTotal === 0
                            }">
                                {{ hours.tpTotal === 0 ? '-' : hours.tpDone + "h / " + hours.tpTotal + "h" }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="background-color: #6c80ab; color: #D5D5D5">
                                <b>Total heures effectuées:</b><br>
                                <small style="font-size: 0.7em">( Respectivement CM / TD / TP )</small>
                            </td>
                            <td>{{ getDoneHoursCM() }}h</td>
                            <td>{{ getDoneHoursTD() }}h</td>
                            <td>{{ getDoneHoursTP() }}h</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="background-color: #6c80ab; color: #D5D5D5">
                                <b>Total heures statuaires:</b><br>
                                <small style="font-size: 0.7em">( Respectivement CM / TD / TP )</small>
                            </td>
                            <td colspan="3">{{ professor.service }}h</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="background-color: #6c80ab; color: #D5D5D5">
                                <b>{{ this.getFinalDifference() > 0 ? "Heures supplémentaires" :
                                    this.getFinalDifference() === 0 ? "Sans déficit ni heures supplémentaires"
                                        : "Déficit"}}</b>
                                <br>
                                <small style="font-size: 0.7em">( CM / TD / TP confondus )</small>
                            </td>
                            <td colspan="3">{{ getFinalDifference() }}h</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from "axios";

export default {
    name: "HoursMadeDetails",
    components: { Header },
    data() {
        return {
            professor: {},
            lastnameProf: this.$cookies.get("currentProfLastname"),
            firstnameProf: this.$cookies.get("currentProfFirstname"),
            stats: [],
            statsTest: [],
            differenceCM: 0,
            differenceTD: 0,
            differenceTP: 0
        }
    },
    created() {
        axios.get(`https://back-serverdevoeux.herokuapp.com/api/professor/${this.$route.params.emailProf}`).then(response => {
            this.professor = response.data
        })
        axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/matieres/${this.firstnameProf}/${this.lastnameProf}`).then((response) => {
            this.statsTest = response.data
        })
        axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/events-grouped-by-categories/${this.firstnameProf}/${this.lastnameProf}`).then((response) => {
            this.stats = response.data
        })
    },
    methods: {
        setFilieres() {
            let finalStats = this.statsTest
            for (let key of Object.keys(this.statsTest)) {
                let filieres = []
                for (let stat in this.stats) {
                    if (this.stats[stat].find(m => m.matiere === key)) {
                        filieres.push(stat)
                    }
                }
                finalStats[key].matiere = key
                finalStats[key].filieres = filieres
            }
            return Object.values(finalStats).sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a.filieres[0] < b.filieres[0]) return -1 * modifier
                if(a.filieres[0] > b.filieres[0]) return modifier
                return 0;
            })
        },
        getDoneHoursCM() {
            return Math.ceil(Object.values(this.statsTest).reduce((a, b) => a + (b["cmDone"] || 0), 0) * 100) / 100
        },
        getDoneHoursTD() {
            return Math.ceil(Object.values(this.statsTest).reduce((a, b) => a + (b["tdDone"] || 0), 0) * 100) / 100
        },
        getDoneHoursTP() {
            return Math.ceil(Object.values(this.statsTest).reduce((a, b) => a + (b["tpDone"] || 0), 0) * 100) / 100
        },
        getFinalDifference() {
            return Math.ceil(((this.getDoneHoursCM() + this.getDoneHoursTD() + this.getDoneHoursTP()) - this.professor.service) * 100) / 100
        }
    }
}
</script>

<style scoped>
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
