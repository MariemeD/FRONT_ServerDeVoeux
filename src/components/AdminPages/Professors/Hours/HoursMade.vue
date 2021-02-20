<template>
    <div>
        <Header />

        <h1 class="pt-5">Liste des heures effectuées</h1>

        <div class="container">
            <div class="row">
                <div class="table-responsive">
                    <table class="table mt-4">
                        <thead>
                        <tr>
                            <th @click="sort">Professeur</th>
                            <th>CM effectués / totaux</th>
                            <th>TD effectués / totaux</th>
                            <th>TP effectués / totaux</th>
                            <th>-</th>
                        </tr>
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
                            <td>
                                <router-link :to="{name: 'hoursMade-details', params: { lastnameProf: prof.lastname, firstnameProf: prof.firstname }}">
                                    Détail
                                </router-link>
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
            <div class="row">
                <div class="col-4">
                    <h4>Heures de CM</h4>
                    <hours-chart :data="chartDataCM" :options="options"></hours-chart>
                </div>
                <div class="col-4">
                    <h4>Heures de TD</h4>
                    <hours-chart :data="chartDataTD" :options="options"></hours-chart>
                </div>
                <div class="col-4">
                    <h4>Heures de TP</h4>
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
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
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
                    backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
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
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
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
            })
        //  TODO Demander confirmation aux filles => l'admin voit que les heures des profs dont il est responsable (filière)
        axios.get("http://146.59.195.214:8006/api/v1/events/teachers/M2MIAA").then(response => {
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
        })
    },
    methods: {
        setActiveProfessor(professor) {
            this.activeProfessor = professor
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
    mounted() {
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

</style>
