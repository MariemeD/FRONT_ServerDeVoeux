<template>
    <div>
        <Header />

        <h1 class="pt-5">Liste des professeurs</h1>

        <div class="container">
            <router-link :to="{name: 'professors-add'}">
                <button id="addProfButton" class="btn btn-outline-info mb-3 float-right">Ajouter un nouveau professeur</button>
            </router-link>

            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <th>
                            Nom de famille
                            <font-awesome-icon :icon="sortIcon" @click="sort('lastName')"></font-awesome-icon>
                        </th>
                        <th>
                            Prénom
                            <font-awesome-icon :icon="sortIcon" @click="sort('firstName')"></font-awesome-icon>
                        </th>
                        <th>
                            Email
                            <font-awesome-icon :icon="sortIcon" @click="sort('email')"></font-awesome-icon>
                        </th>
                        <th>-</th>
                    </thead>
                    <tbody>
                        <tr v-for="prof in sortedProfessors" :key="prof.email">
                            <td>{{ prof.lastName }}</td>
                            <td>{{ prof.firstName }}</td>
                            <td>{{ prof.email }}</td>
                            <td>
                                <font-awesome-icon icon="edit"></font-awesome-icon>
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
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from 'axios'

export default {
    name: "Professors",
    components: {Header},
    data() {
        return {
            professors: [],
            currentSortDirection: 'asc',
            currentSort: 'lastName',
            pageSize: 10,
            currentPage: 1,
            sortIcon: 'sort',
        }
    },
    created() {
        axios.get("http://146.59.195.214:8006/api/v1/teachers/all").then(response => {
            this.professors = response.data
        })
    },
    methods: {
        sort(criteria) {
            if(criteria === this.currentSort) {
                this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc'
            }
            this.sortIcon = this.currentSortDirection === 'asc' ? 'sort-up' : 'sort-down'
            this.currentSort = criteria;
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
        }
    },
    computed: {
        sortedProfessors:function() {
            return this.professors.slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage* this.pageSize;
                if (index >= start && index < end) return true
            });
        }
    }
}
</script>

<style scoped>
#addProfButton {
    color: #536895;
    border-color: #536895;
}

#addProfButton:hover {
    color: #FFF;
    border-color: #536895;
    background-color: #536895;
}
</style>
