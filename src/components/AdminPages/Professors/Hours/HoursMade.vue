<template>
    <div class="container-fluid">
        <Header />

        <h1 class="pt-5">Liste des heures effectuées</h1>

        <table class="table mt-4">
            <thead>
                <tr>
                    <th>Professeur</th>
                    <th>Matière</th>
                    <th>Type de cours</th>
                    <th>Localisation</th>
                    <th>Durée</th>
                    <th>Groupe</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hour in hoursData" :key="hour.id">
                    <td>{{ hour.cm }}</td>
                    <td>{{ hour.tp }}</td>
                    <td>{{ hour.td }}</td>
                    <td>{{ hour.location }}</td>
                    <td>{{ hour.duree }}</td>
                    <td>{{ hour.groupe }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import Header from "@/components/AdminPages/Header";

export default {
    name: "HoursMade",
    components: { Header },
    data() {
        return {
            hoursDataDetails: [],
            hoursData: []
        }
    },
    created() {
        axios.get("http://146.59.195.214:8006/api/v1/events/paginated?page=2&size=10").then(response => {
            console.table(response.data.content)
            this.hoursDataDetails = response.data.content
        })
        axios.get("http://146.59.195.214:8006/api/v1/stats/teacher/details/PASCAL/PETIT").then(response => {
            console.table(response.data)
            this.hoursData = response.data
        })
    }
}
</script>

<style scoped>

</style>
