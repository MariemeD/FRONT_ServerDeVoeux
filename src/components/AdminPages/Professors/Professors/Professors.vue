<template>
    <div>
        <Header />

        <h1 class="pt-5">Liste des professeurs</h1>

        <div class="container">

            <div class="row justify-content-between">
                <router-link :to="{name: 'professors-add'}">
                    <button id="addProfButton" class="btn btn-outline-info mb-3">Ajouter un nouveau professeur</button>
                </router-link>

                <p id="eltPerPage" class="mb-0">
                    Afficher
                    <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                    éléments
                </p>
            </div>


            <div class="table-responsive">
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
                        <th>Origine</th>
                        <!--
                        TODO Cette colonne doit apparaitre que si le super admin est connecté et uniquement pour les professeurs liés à la filière du prof connecté
                        -->
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="prof in sortedProfessors" :key="prof.email">
                            <td>{{ prof.lastName }} {{ prof.firstName }}</td>
                            <td>{{ prof.email }}</td>
                            <td>{{ prof.status }}</td>
                            <td>{{ prof.department }}</td>
                            <!--
                            TODO Cette colonne doit apparaitre que si le super admin est connecté et uniquement pour les professeurs liés à la filière du prof connecté
                            -->
                            <td>
                                <router-link :to="{name: 'professor', params: { idProf: prof._id }}">
                                    <button class="btn btn-outline-primary btnIcon">
                                        Modifier
                                        <font-awesome-icon icon="edit"></font-awesome-icon>
                                    </button>
                                </router-link>
                                |
                                <router-link :to="{name: 'professors-edit', params: { idProf: prof._id }}">
                                    <button class="btn btn-outline-danger btnIcon">
                                        Supprimer
                                        <font-awesome-icon icon="trash"></font-awesome-icon>
                                    </button>
                                </router-link>
                            </td>
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
        // TODO Faire la différence avec les profs de la filiere dont le prof connecté est responsable
        sortedProfessors:function() {
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
#addProfButton {
    color: #536895;
    border-color: #536895;
}
#addProfButton:hover {
    color: #FFF;
    border-color: #536895;
    background-color: #536895;
}
#eltPerPage {
    margin-top: 0.60em;
}
.pageSizeElt {
    cursor: pointer;
    color: #536895;
}
.btnIcon:hover .faIcon {
    color: #FFF;
}
.editIcon:hover {
    color: #FFF;
}
.page-link {
    color: #536895;
}
.page-link:hover {
    color: #2c3e50;
}
</style>
