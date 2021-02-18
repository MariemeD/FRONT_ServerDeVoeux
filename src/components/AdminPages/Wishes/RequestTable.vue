<template>
    <div>
        <!-- ALERTS -->
        <div class="container mb-2" v-show="actionClicked">
            <transition :duration="5000" name="slide-fade">
                <div class="alert alert-info">
                    <p class="text-center mb-0">{{ alertMessage }}</p>
                </div>
            </transition>
        </div>

        <div class="alert alert-info pb-0" v-if="isConflicts">
            <p>
                Afin de régler le(s) conflit(s), vous pouvez choisir de contacter chaque professeur par mail avant de faire votre choix final.<br>
                Ou bien, cliquer sur le nom du professeur pour afficher un récapitulatif de ses heures, et choisir d'accepter ou refuser le voeu.
            </p>
        </div>

        <div class="row justify-content-start">
            <p id="eltPerPage" class="mb-2">
                Afficher
                <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                éléments
            </p>
        </div>

        <div class="table-responsive">
            <!-- Tableau des voeux avec conflits -->
            <table class="table table-striped" v-if="isConflicts">
                <thead>
                <th>Filière</th>
                <th>Matière</th>
                <th>Professeurs</th>
                <th>Statut</th>
                <th>Actions</th>
                </thead>
                <tbody>
                <tr v-for="request in groupConflictByCursus()" :key="request._id">
                    <td>{{ request[0].groupRequested }}</td>
                    <td>{{ request[0].courseRequested }}</td>
                    <td>
                        <span
                            v-for="req in request"
                            :key="req._id"
                            data-toggle="modal"
                            data-target="#profModal"
                            @click.prevent="setCurrentRequest(req)"
                            class="selectProf">
                            {{ req.requestor }} -
                        </span>
                    </td>
                    <td class="text-danger">Conflit</td>
                    <td>
                        <button class="btn btn-outline-primary">
                            <font-awesome-icon icon="mail-bulk" />
                            Envoyer un mail à tous
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

            <!-- Modal -->
            <div class="modal fade" id="profModal" tabindex="-1" role="dialog" aria-labelledby="profModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="profModalLabel">Professeur : {{ currentRequest.requestor }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button type="button" class="btn btn-success" @click.prevent="acceptRequestConflict(currentRequest)">Accepter</button>
                            <button type="button" class="btn btn-danger" @click.prevent="refuseRequest(currentRequest)">Refuser</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tableau des voeux sans conflits -->
            <table class="table table-striped" v-if="!isConflicts">
                <thead>
                <th>Filière</th>
                <th>Matière</th>
                <th>Professeur</th>
                <th>Statut</th>
                <th>Actions</th>
                </thead>
                <tbody>
                <tr v-for="request in sortedRequests" :key="request._id">
                    <td>{{ request.groupRequested }}</td>
                    <td>{{ request.courseRequested }}</td>
                    <td>{{ request.requestor }}</td>
                    <td>{{ request.status }}</td>
                    <td>
                        <span class="btn btn-outline-success" @click.prevent="acceptRequest(request)">Accepter</span>
                        |
                        <span class="btn btn-outline-danger" @click.prevent="refuseRequest(request)">Refuser</span>
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
</template>

<script>

import axios from "axios";

export default {
    name: "RequestTable",
    props: ['requests', 'conflicts', 'isConflicts'],
    data() {
        return {
            alertMessage: '',
            actionClicked: false,
            currentRequest: "",
            currentSortDirection: 'asc',
            currentSort: 'courseRequested',
            pageSize: 7,
            currentPage: 1,
            sortIcon: 'sort',
        }
    },
    created() {

    },
    methods: {
        acceptRequest(request) {
            const acceptedRequest = request
            acceptedRequest.status = 'Validé'
            axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${request._id}`, acceptedRequest).then(response => {
                console.log(response)
                this.sendAlertMessage(`Le voeu de ${request.requestor} a bien été accepté`)
                this.refreshPage(2000)
            }).catch(error => {
                console.error(error)
                this.sendAlertMessage("Une erreur est survenue lors du validation du voeu. Veuillez réessayer plus tard.")
                this.refreshPage(5000)
            })
        },
        refuseRequest(request) {
            const refusedRequest = request
            refusedRequest.status = 'Refusé'
            axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${request._id}`, refusedRequest).then(response => {
                console.log(response)
                this.sendAlertMessage(`Le voeu de ${request.requestor} a bien été refusé`)
                this.refreshPage(2000)
            }).catch(error => {
                console.error(error)
                this.sendAlertMessage("Une erreur est survenue lors du refus du voeu. Veuillez réessayer plus tard.")
                this.refreshPage(5000)
            })
        },
        acceptRequestConflict(request) {
            console.log(request.requestor)
            console.log(this.groupConflictByCursus()[request.courseRequested])
            axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${request._id}`, {status: 'Accepté'}).then(response => {
                console.log(response)
                this.sendAlertMessage(`Le voeu de ${request.requestor} a bien été accepté`)
                for (let otherConflict of this.groupConflictByCursus()[request.courseRequested].filter(req => req !== request)) {
                    axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${otherConflict._id}`, {status: 'Refusé'}).then(response => {
                        console.log(response)
                        console.log("Les voeux des autres professeurs ont été refusés")
                    }).catch(error => {
                        console.error(error)
                        console.log("Une erreur est survenue. Les voeux des autres professeurs n'ont pas été refusés")
                    })
                }
                this.refreshPage(2000)
            }).catch(error => {
                console.error(error)
                this.sendAlertMessage("Une erreur est survenue lors du validation du voeu. Veuillez réessayer plus tard.")
                this.refreshPage(5000)
            })
        },
        groupConflictByCursus() {
            return this.conflicts.reduce(function(array, elt) {
                (array[elt["courseRequested"]] = array[elt["courseRequested"]] || []).push(elt);
                return array;
            }, {})
        },
        setCurrentRequest(req) {
            this.currentRequest = req
        },
        sendAlertMessage(message) {
            this.alertMessage = message
            this.actionClicked = true
        },
        refreshPage(timeout) {
            return setTimeout(function() {
                window.location.reload()
            }, timeout)
        },
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
            if (this.isConflicts) {
                if ((this.currentPage * this.pageSize) < this.conflicts.length) {
                    this.currentPage++;
                }
            } else {
                if ((this.currentPage * this.pageSize) < this.requests.length) {
                    this.currentPage++;
                }
            }
        },
        setElementsPerPage(pageSize) {
            this.pageSize = pageSize
        },
    },
    computed: {
        sortedRequests() {
            return this.requests.slice().sort((a, b) => {
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
        },
        sortedConflicts() {
            return this.groupConflictByCursus().slice().sort((a, b) => {
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
.page-link, .pageSizeElt, .selectProf {
    color: #536895;
    cursor: pointer;
}
.page-link:hover {
    color: #2c3e50;
}
.selectProf:hover {
    color: #2c3e50;
}
</style>
