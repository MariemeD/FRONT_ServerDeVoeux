<template>
    <div>
        <Header />

        <h1 class="pt-5">Liste des heures effectuées</h1>

        <div class="container">
            <div class="row">
                <div class="progress mt-4" v-if="isLoading">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%; background-color: #536895"></div>
                </div>
                <div class="table-responsive" v-else>
                    <table class="table table-striped mt-4">
                        <thead>
                            <th @click="sort">Professeur</th>
                            <th>CM effectués / totaux</th>
                            <th>TD effectués / totaux</th>
                            <th>TP effectués / totaux</th>
                        </thead>
                        <tbody>
                        <tr
                            v-for="prof in sortedProfessors"
                            :key="prof.email"
                            @click.prevent="setActiveProfessor(prof)"
                        >
                            <td>{{ prof.lastname }} {{ prof.firstname }}</td>
                            <td
                                class="font-weight-bold"
                                v-bind:class="{
                                'text-danger': prof.hoursData.Done.cm < prof.hoursData.Total.cm / 2,
                                'text-warning': prof.hoursData.Done.cm >= prof.hoursData.Total.cm / 2
                                    && prof.hoursData.Done.cm !== prof.hoursData.Total.cm,
                                'text-success': prof.hoursData.Done.cm === prof.hoursData.Total.cm
                                    || prof.hoursData.Done.cm > prof.hoursData.Total.cm
                            }">
                                {{ prof.hoursData.Done.cm }}h / {{ prof.hoursData.Total.cm }}h
                            </td>
                            <td
                                class="font-weight-bold"
                                v-bind:class="{
                                'text-danger': prof.hoursData.Done.td < prof.hoursData.Total.td / 2,
                                'text-warning': prof.hoursData.Done.td >= prof.hoursData.Total.td / 2
                                    && prof.hoursData.Done.td !== prof.hoursData.Total.td,
                                'text-success': prof.hoursData.Done.td === prof.hoursData.Total.td
                                    || prof.hoursData.Done.td > prof.hoursData.Total.td
                            }">
                                {{ prof.hoursData.Done.td }}h / {{ prof.hoursData.Total.td }}h
                            </td>
                            <td
                                class="font-weight-bold"
                                v-bind:class="{
                                'text-danger': prof.hoursData.Done.tp < prof.hoursData.Total.tp / 2,
                                'text-warning': prof.hoursData.Done.tp >= prof.hoursData.Total.tp / 2
                                    && prof.hoursData.Done.tp !== prof.hoursData.Total.tp,
                                'text-success': prof.hoursData.Done.tp === prof.hoursData.Total.tp
                                    || prof.hoursData.Done.tp > prof.hoursData.Total.tp
                            }">
                                {{ prof.hoursData.Done.tp }}h / {{ prof.hoursData.Total.tp }}h
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item"><a class="page-link" @click="prevPage">Précédent</a></li>
                            <li class="page-item"><a class="page-link" @click="nextPage">Suivant</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <hr>

            <h2 class="text-left mb-4">Mes heures de travail totales</h2>
            <div class="progress mt-4 mb-4" v-if="isLoadingPersonalHours">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%; background-color: #536895"></div>
            </div>
            <div class="row" v-else>
                <div class="col-4">
                    <h4>CM</h4>
                    <hours-chart :data="chartDataCM" :options="options"></hours-chart>
                </div>
                <div class="col-4">
                    <h4>TD</h4>
                    <hours-chart :data="chartDataTD" :options="options"></hours-chart>
                </div>
                <div class="col-4">
                    <h4>TP</h4>
                    <hours-chart :data="chartDataTP" :options="options"></hours-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Header from "@/components/AdminPages/Header";
import HoursChart from "@/components/AdminPages/Professors/Hours/HoursChart";

export default {
    name: "HoursMade",
    components: { HoursChart, Header },
    data() {
        return {
            isLoading: true,
            isLoadingPersonalHours: true,
            hoursData: [],
            professors: [],
            activeProfessor: {},
            currentSortDirection: '',
            pageSize: 5,
            currentPage: 1,
            chartDataCM: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: ["Heures effectuées", "Heures totales", "Heures supplémentaires"],
                datasets: [
                    {
                        label: "CM Hours",
                        backgroundColor: ["#536895", "#ef9a35", "#41B883"],
                        data: [1, 1, 1]
                    }
                ]
            },
            chartDataTD: {
                labels: [
                    'Heures effectuées',
                    'Heures totales',
                    'Heures supplémentaires',
                ],
                datasets: [{
                    label: "TD Hours",
                    backgroundColor: ["#536895", "#ef9a35", "#41B883"],
                    data: [1, 1, 1]
                }],
            },
            chartDataTP: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: ["Heures effectuées", "Heures totales", "Heures supplémentaires"],
                datasets: [
                    {
                        label: "TP Hours",
                        backgroundColor: ["#536895", "#ef9a35", "#41B883"],
                        data: [1, 1, 1]
                    }
                ]
            },
            options: {
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    created() {
        axios
            .get(`http://146.59.195.214:8006/api/v1/stats/teacher/details/${this.$cookies.get("FnameProfessor")}/${this.$cookies.get("LnameProfessor")}`)
            .then(response => {
                console.log(response.data)
                this.hoursData = response.data
                this.chartDataCM.datasets[0].data = [
                    response.data.Done.cm,
                    response.data.Total.cm,
                    response.data.Done.cm > response.data.Total.cm ?
                        response.data.Total.cm - response.data.Done.cm
                        : 0
                ]
                this.chartDataTD.datasets[0].data = [
                    response.data.Done.td,
                    response.data.Total.td,
                    response.data.Done.td > response.data.Total.td ?
                        response.data.Total.td - response.data.Done.td
                        : 0
                ]
                this.chartDataTP.datasets[0].data = [
                    response.data.Done.tp,
                    response.data.Total.tp,
                    response.data.Done.tp > response.data.Total.tp ?
                        response.data.Total.tp - response.data.Done.tp
                        : 0
                ]
                this.isLoadingPersonalHours = false
            })
        axios.get(`http://146.59.195.214:8006/api/v1/events/teachers/${this.$cookies.get("groupProfessor")}`).then(response => {
            for (let prof of response.data) {
                let firstname = prof.split(" ")[0].replaceAll("_", " ")
                let lastname = prof.split(" ")[1].replaceAll("_", " ")
                prof = {}
                prof.firstname = this.capitalizeTextElement(firstname)
                prof.lastname = lastname.toUpperCase()
                axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/details/${firstname}/${lastname}`).then(response => {
                    prof.hoursData = response.data
                })
                if (!prof.hoursData) {
                    prof.hoursData = {
                        Done: {
                            cm: 0,
                            td: 0,
                            tp: 0
                        },
                        Total: {
                            cm: 0,
                            td: 0,
                            tp: 0
                        }
                    }
                }
                this.professors.push(prof)
            }
            this.isLoading = false
        })
    },
    methods: {
        setActiveProfessor(professor) {
            this.activeProfessor = professor
            this.$router.push({name: 'hoursMade-details', params: { lastnameProf: professor.lastname, firstnameProf: professor.firstname }})
        },
        /*
        * Inspiration for sorting and pagination :
        * https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs
        */
        sort() {
            this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc'
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if ((this.currentPage * this.pageSize) < this.professors.length) {
                this.currentPage++;
            }
        },
        capitalizeTextElement(element) {
            const firstLetter = element[0].toUpperCase()
            const rest = element.toLowerCase().substring(1)
            return firstLetter + rest
        }
    },
    computed: {
        sortedProfessors: function() {
            // Slice method to avoid unexpected side effects
            return this.professors.slice().sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDirection === 'desc') {
                    modifier = -1
                }
                if (a.lastname < b.lastname) return -1 * modifier;
                if (a.lastname > b.lastname) return modifier;
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage* this.pageSize;
                if (index >= start && index < end) return true
            })
        }
    },
}
</script>

<style scoped>
th {
    text-align: center;
    background-color: #536895;
    color: #eee;
    vertical-align: middle !important;
}
tbody tr:hover {
    background-color: rgba(96, 124, 184, 0.3);
    cursor: pointer;
}
.text-warning {
    color: #ef9a35 !important;
}
.page-link {
    color: #536895;
}
.page-link:hover {
    color: #2c3e50;
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
}
</style>
