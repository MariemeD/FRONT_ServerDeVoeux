<template>
    <div>
        <Header />
        <h1 class="pt-5">Liste des statuts</h1>

        <div class="container">

            <div class="row justify-content-between">
                <router-link :to="{name: 'status-add'}">
                    <button id="addStatusBtn" class="btn btn-outline-info mb-3">Ajouter un nouveau statut</button>
                </router-link>

                <p id="eltPerPage">
                    Afficher
                    <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                    éléments
                </p>
            </div>

            <div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <th>
                            Statut
                            <font-awesome-icon :icon="sortIcon" @click="sort('name')"></font-awesome-icon>
                        </th>
                        <th>
                            Heures statuaires / obligatoires
                            <font-awesome-icon :icon="sortIcon" @click="sort('mandatoryHours')"></font-awesome-icon>
                        </th>
                        <th>
                            Heures supplémentaires
                            <font-awesome-icon :icon="sortIcon" @click="sort('extraHours')"></font-awesome-icon>
                        </th>
                        <!-- TODO Cette colonne doit apparaitre que si le super admin est connecté -->
                        <th>Actions</th>
                        </thead>
                        <tbody>
                        <tr v-for="statut in sortedStatus" :key="statut._id">
                            <td>{{ statut.name }}</td>
                            <td>{{ statut.mandatoryHours }}</td>
                            <td>{{ statut.extraHours }}</td>
                            <!-- TODO Cette colonne doit apparaitre que si le super admin est connecté -->
                            <td>
                                <router-link :to="{ name: 'status-edit', params: { idStatus: statut._id }}">
                                    <font-awesome-icon class="editIcon mr-3" icon="edit" size="lg"></font-awesome-icon>
                                </router-link>
                                <font-awesome-icon
                                    class="editIcon"
                                    icon="trash"
                                    size="lg"
                                    data-toggle="modal"
                                    data-target="#deleteModal"
                                    @click.prevent="setCurrentStatus(statut)">
                                </font-awesome-icon>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" v-if="currentPage > 1"><a class="page-link" @click="prevPage">Précédent</a></li>
                            <li class="page-item"><a class="page-link" @click="nextPage">Suivant</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="showModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-danger" id="exampleModalLabel">Attention ! Suppression en cours...</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Est-ce vous sûre de vouloir supprimer le statut '{{ currentStatus.name }}' ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteStatus">Supprimer</button>
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
    name: "Status",
    components: { Header },
    data() {
        return {
            status: [],
            currentStatus: {},
            showModal: false,
            currentSortDirection: 'asc',
            currentSort: 'name',
            pageSize: 10,
            currentPage: 1,
            sortIcon: 'sort',
        }
    },
    created() {
        axios.get("https://back-serverdevoeux.herokuapp.com/api/status").then(response => this.status = response.data)
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
            if ((this.currentPage * this.pageSize) < this.status.length) {
                this.currentPage++;
            }
        },
        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },
        setCurrentStatus(status) {
            this.currentStatus = status
            this.showModal = true
        },
        deleteStatus() {
            axios.delete(`https://back-serverdevoeux.herokuapp.com/api/status/${this.currentStatus._id}`).then(() => {
                console.log("Suppression effective")
                window.location.reload()
            }).catch(error => {
                console.error(error)
                console.error("Le statut n'a pas été supprimé")
            })
        },
    },
    computed: {
        sortedStatus: function() {
            return this.status.slice().sort((a, b) => {
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
#addStatusBtn {
    color: #536895;
    border-color: #536895;
}
#addStatusBtn:hover {
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
table {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg, #405c9b, #b87f3a);
}
td {
    border-top-color: #2c3e50;
}
.table thead th {
    border-bottom-color: #2c3e50;
}
thead th {
    background-color: #6684c1;
}
tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.3);
}
.page-link {
    color: #536895;
}
.page-link:hover {
    color: #2c3e50;
}
</style>
