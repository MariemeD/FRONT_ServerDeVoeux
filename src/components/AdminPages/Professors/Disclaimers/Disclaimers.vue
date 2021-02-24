<template>
    <div>
        <Header />

        <h1 :class="{'pt-5': $cookies.get('emailProfessor')}">Liste de décharges</h1>

        <div class="container" v-if="$cookies.get('emailProfessor')">

            <div class="row justify-content-between ml-1">
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

            <div class="progress mt-4" v-if="isLoading">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%; background-color: #536895"></div>
            </div>

            <div class="table-responsive" v-else>
                <table class="table table-striped">
                    <thead>
                    <th>
                        Nom de la décharge
                        <font-awesome-icon :icon="sortIcon" @click="sort('name')"></font-awesome-icon>
                    </th>
                    <th>
                        Objet de la décharge
                        <font-awesome-icon :icon="sortIcon" @click="sort('object')"></font-awesome-icon>
                    </th>
                    <th>
                        Nombre d'heures
                        <font-awesome-icon :icon="sortIcon" @click="sort('hours')"></font-awesome-icon>
                    </th>
                    <th>
                        Professeur
                        <font-awesome-icon :icon="sortIcon" @click="sort('professor')"></font-awesome-icon>
                    </th>
                    <!-- TODO Cette colonne doit apparaitre que si le super admin est connecté ? -->
                    <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr v-for="discharge in discharges" :key="discharge._id">
                        <td>{{ discharge.name }}</td>
                        <td>{{ discharge.object }}</td>
                        <td>{{ discharge.hours }}</td>
                        <td>{{ discharge.professor }}</td>
                        <td>
                            <router-link :to="{name: 'disclaimers-edit', params: { idDisclaimer: discharge._id }}">
                                <font-awesome-icon class="editIcon" icon="edit" size="lg"></font-awesome-icon>
                            </router-link>
                            <font-awesome-icon
                                class="trashIcon ml-2"
                                icon="trash"
                                size="lg"
                                data-toggle="modal"
                                data-target="#deleteModal"
                                @click.prevent="setCurrentDischarge(discharge)">
                            </font-awesome-icon>
                        </td>
                    </tr>
                    <tr v-if="discharges.length === 0">
                        <td colspan="5">Aucune décharge n'a été crée à ce jour</td>
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

            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-danger" id="exampleModalLabel">Attention ! Suppression en cours...</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Est-ce vous sûre de vouloir supprimer la décharge '{{ currentDischarge.name }}' ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteDischarge">Supprimer</button>
                        </div>
                    </div>
                </div>
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
            isLoading: true,
            discharges: [],
            currentDischarge: {},
            currentSortDirection: 'asc',
            currentSort: 'name',
            pageSize: 10,
            currentPage: 1,
            sortIcon: 'sort',
        }
    },
    created() {
        axios.get("https://back-serverdevoeux.herokuapp.com/api/discharges").then(response => {
            this.discharges = response.data
            this.isLoading = false
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
            if ((this.currentPage * this.pageSize) < this.discharges.length) {
                this.currentPage++;
            }
        },
        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },
        setCurrentDischarge(discharge) {
            this.currentDischarge = discharge
        },
        deleteDischarge() {
            axios.delete(`https://back-serverdevoeux.herokuapp.com/api/discharge/${this.currentDischarge._id}`)
            .then(() => {
                console.log("Suppression effective")
                //window.location.reload()
              this.$router.go(this.$router.currentRoute)

            }).catch(error => {
                console.error(error)
                console.error("La décharge n'a pas été supprimée")
            })
        }
    },
    computed: {
        sortedDischarges:function() {
            return this.discharges.slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a["name"].toLowerCase() < b["name"].toLowerCase()) return -1 * modifier
                if(a["name"].toLowerCase() > b["name"].toLowerCase()) return modifier
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
    color: #536895;
    cursor: pointer;
}
.trashIcon {
    color: #e02e2e;
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
    #addDisclaimerBtn {
        margin-bottom: 0.2em !important;
    }
}
</style>
