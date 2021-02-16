<template>
    <div>
        <Header />

        <h1 class="pt-5">Liste de décharges</h1>

        <div class="container">

            <div class="row justify-content-between">
                <router-link :to="{name: 'disclaimers-add'}">
                    <button id="addDisclaimerBtn" class="btn btn-outline-info mb-3">Ajouter une nouvelle décharge</button>
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
                        Objet de la décharge
                        <font-awesome-icon :icon="sortIcon" @click="sort('lastname')"></font-awesome-icon>
                    </th>
                    <th>
                        Nombre d'heures
                        <font-awesome-icon :icon="sortIcon" @click="sort('firstname')"></font-awesome-icon>
                    </th>
                    <th>
                        Professeur
                        <font-awesome-icon :icon="sortIcon" @click="sort('email')"></font-awesome-icon>
                    </th>
                    <!-- TODO Cette colonne doit apparaitre que si le super admin est connecté -->
                    <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr v-for="disclaimer in sortedDisclaimers" :key="disclaimer._id">
                        <td>Nom</td>
                        <td>Valeur</td>
                        <td>Valeur</td>
                        <td>
                            <!-- TODO Cette colonne doit apparaitre que si le super admin est connecté -->
                            <router-link :to="{name: 'disclaimers-edit', params: { idDisclaimer: disclaimer._id }}">
                                <font-awesome-icon class="editIcon" icon="edit" size="lg"></font-awesome-icon>
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
import axios from "axios";

export default {
    name: "Disclaimers",
    components: { Header },
    data() {
        return {
            disclaimers: [],
            currentSortDirection: 'asc',
            currentSort: 'lastname',
            pageSize: 10,
            currentPage: 1,
            sortIcon: 'sort',
        }
    },
    created() {
        axios.get("https://back-serverdevoeux.herokuapp.com/api/professors").then(response => {
            this.disclaimers = response.data
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
            if ((this.currentPage * this.pageSize) < this.disclaimers.length) {
                this.currentPage++;
            }
        },
        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        }
    },
    computed: {
        sortedDisclaimers:function() {
            return this.disclaimers.slice().sort((a, b) => {
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
#addDisclaimerBtn {
    color: #536895;
    border-color: #536895;
}
#addDisclaimerBtn:hover {
    color: #FFF;
    border-color: #536895;
    background-color: #536895;
}
#eltPerPage {
    margin-top: 0.60em;
}
.editIcon {
    color: #2c3e50;
    cursor: pointer;
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
</style>
