<template>
    <div>
        <Header />

        <h1 class="pt-5">Liste des professeurs</h1>

        <div class="container">
            <router-link :to="{name: 'professors-add'}">
                <button id="addProfButton" class="btn btn-outline-info mb-3 float-left">Ajouter un nouveau professeur</button>
            </router-link>

            <p class="float-right">
                Afficher
                <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                éléments
            </p>

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
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="prof in sortedProfessors" :key="prof.email">
                            <td>{{ prof.lastName }}</td>
                            <td>{{ prof.firstName }}</td>
                            <td>{{ prof.email }}</td>
                            <td>
                                <router-link :to="{name: 'professor', params: {idProf: prof.email}}">
                                    <font-awesome-icon class="editIcon mr-3" icon="eye" size="lg"></font-awesome-icon>
                                </router-link>
                                <router-link :to="{name: 'professors-edit'}">
                                    <font-awesome-icon class="editIcon" icon="edit" size="lg"></font-awesome-icon>
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
        },
        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },
        capitalizeTextElement(element) {
            const firstLetter = element[0].toUpperCase()
            const rest = element.toLowerCase().substring(1)
            return firstLetter + rest
        }
    },
    computed: {
        sortedProfessors:function() {
            for (let prof of this.professors) {
                prof.lastName = this.capitalizeTextElement(prof.lastName)
                prof.firstName = this.capitalizeTextElement(prof.firstName)
            }

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

table {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg, #49a09d, #7745a0);
}

td {
    border-top-color: #2c3e50;
}

.table thead th {
    border-bottom-color: #2c3e50;
}

thead th {
    background-color: #536895;
}

tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.pageSizeElt {
    cursor: pointer;
    color: #536895;
}

.editIcon {
    color: #2c3e50;
}

.page-link {
    color: #536895;
}

.page-link:hover {
    color: #2c3e50;
}
</style>
