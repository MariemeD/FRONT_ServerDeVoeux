<template>
    <div>
        <Header />
        <h1 :class="{'pt-5': $cookies.get('emailProfessor')}">Liste des professeurs</h1>

        <div class="container">

            <div class="row justify-content-start ml-1">
                <p id="eltPerPage" class="mb-2">
                    Afficher
                    <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                    éléments
                </p>
            </div>

            <div class="progress mt-4" v-if="isLoading">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%; background-color: #536895"></div>
            </div>

            <div class="table-responsive" v-else>
                <table class="table table-striped">
                    <thead>
                        <th>
                            Nom - Prénom
                            <font-awesome-icon :icon="sortIcon" @click="sort('lastName')"></font-awesome-icon>
                        </th>
                        <th>
                            Email
                            <font-awesome-icon :icon="sortIcon" @click="sort('email')"></font-awesome-icon>
                        </th>
                        <th>Statut</th>
                        <th>Composante</th>
                    </thead>
                    <tbody>
                        <tr v-for="prof in sortedProfessors" :key="prof.email">
                            <td>{{ prof.lastName }} {{ prof.firstName }}</td>
                            <td>{{ prof.email }}</td>
                            <td>{{ prof.status }}</td>
                            <td>{{ prof.composante }}</td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" v-if="currentPage > 1"><a class="page-link" @click="prevPage">Précédent</a></li>
                        <li class="page-item">
                            <a class="page-link" @click="nextPage">Suivant</a>
                        </li>
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
    components: { Header },
    data() {
        return {
            isLoading: true,
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
            this.isLoading = false
            this.professors = response.data
            for (let prof of response.data) {
                prof.lastName = this.capitalizeTextElement(prof.lastName)
                prof.firstName = this.capitalizeTextElement(prof.firstName)
                prof.email = prof.email.toLowerCase()
                prof.department = prof.department.replaceAll("d&#039;", "d'")
            }
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
            console.log((this.currentPage * this.pageSize) < this.professors.length)
            console.log(this.currentPage * this.pageSize)
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
        sortedProfessors: function() {
            return this.professors.slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a[this.currentSort].toLowerCase() < b[this.currentSort].toLowerCase()) return -1 * modifier
                if(a[this.currentSort].toLowerCase() > b[this.currentSort].toLowerCase()) return modifier
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true
            });
        }
    }
}
</script>

<style scoped>
#eltPerPage {
    margin-top: 0.60em;
}
.pageSizeElt {
    cursor: pointer;
    color: #536895;
}
.page-link {
    color: #536895;
}
.page-link:hover {
    color: #2c3e50;
}
th {
    text-align: center;
    background-color: #536895;
    color: #eee;
    vertical-align: middle !important;
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
