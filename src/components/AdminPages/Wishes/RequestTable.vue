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
                Afin de régler le(s) conflit(s), vous pouvez choisir d'ajouter un commentaire sur la demande pour notifier chaque professeur avant de faire votre choix final.<br>
                Ou bien, cliquer sur le nom du professeur pour afficher un récapitulatif de ses heures, et choisir d'accepter ou refuser le voeu.
            </p>
        </div>

        <div class="row justify-content-start ml-1">
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
            <table id="mainRequestTable" class="table table-striped" v-if="isConflicts">
                <thead>
                    <th>Filière</th>
                    <th>Matière</th>
                    <th>Professeurs</th>
                    <th>Statut</th>
                    <th v-if="$cookies.get('groupProfessor')">Actions</th>
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
                            @click.prevent="getInfosForProfModal(req)"
                            class="selectProf">
                            {{ req.requestor }} -
                        </span>
                    </td>
                    <td class="text-danger">Conflit</td>
                    <td v-if="$cookies.get('groupProfessor')">
                        <!--<button class="btn btn-outline-primary">
                            <font-awesome-icon icon="mail-bulk" />
                            Envoyer un mail à tous
                        </button>-->
                        <button
                            class="btn btn-outline-primary"
                            @click.prevent="setCurrentRequest(request)"
                            data-toggle="modal"
                            data-target="#commentModal">
                            Ajouter un commentaire
                        </button>
                    </td>
                </tr>
                <tr v-if="conflicts.length === 0">
                    <td colspan="5">Aucun conflit pour des voeux n'est survenu pour le moment.</td>
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
                            <table id="hoursTableProf" class="table table-striped">
                                <thead>
                                    <th>Type de cours</th>
                                    <th>Heures effectuées / Heures totales</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CM</td>
                                        <td>{{ infosHoursProf().cmDone + "h / " + infosHoursProf().cmTotal }}h</td>
                                    </tr>
                                    <tr>
                                        <td>TD</td>
                                        <td>{{ infosHoursProf().tdDone + "h / " + infosHoursProf().tdTotal }}h</td>
                                    </tr>
                                    <tr>
                                        <td>TP</td>
                                        <td>{{ infosHoursProf().tpDone + "h / " + infosHoursProf().tpTotal }}h</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button
                                type="button"
                                class="btn btn-success"
                                @click.prevent="acceptRequestConflict(currentRequest)">
                                    Accepter
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                @click.prevent="refuseRequest(currentRequest)">
                                    Refuser
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="commentModalLabel">Ajouter un commentaire à la demande</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="sendComment">
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" class="form-label">Commentaire :</label>
                                    <textarea
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="5"
                                        v-model.lazy="newComment"
                                        required></textarea>
                                </div>
                                <button class="btn btn-outline-success">Ajouter le commentaire aux demandes</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tableau des voeux sans conflits -->
            <table id="mainConflictsTable" class="table table-striped" v-if="!isConflicts">
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
                    <tr v-if="sortedRequests.length === 0">
                        <td colspan="5">Aucun voeu n'a été formulé à ce jour</td>
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
            pageSize: 5,
            currentPage: 1,
            sortIcon: 'sort',
            hoursSelectedProf: {},
            newComment: ''
        }
    },
    created() {

    },
    methods: {
        acceptRequest(request) {
            const acceptedRequest = request
            acceptedRequest.status = 'Validé'
            axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${request._id}`, acceptedRequest).then(() => {
                this.sendAlertMessage(`Le voeu de ${request.requestor} a bien été accepté`)
                axios.post(`https://back-serverdevoeux.herokuapp.com/api/sendEmail/`, {
                    to: request.emailRequestor,
                    subject: `[SERVEUR DE VOEUX - UNIV EVRY] Votre demande de voeu a été acceptée`,
                    text: `Bonjour,\n
                    Votre demande de voeu concernant la matière ${request.courseRequested} a bien été acceptée.`
                }).then(response => {
                    console.log(response)
                    console.log("Le mail a bien été envoyé")
                }).catch(error => {
                    console.error(error)
                    console.error("L'envoi du mail a échoué")
                })
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
            axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${request._id}`, refusedRequest).then(() => {
                this.sendAlertMessage(`Le voeu de ${request.requestor} a bien été refusé`)
                axios.post(`https://back-serverdevoeux.herokuapp.com/api/sendEmail/`, {
                    to: request.emailRequestor,
                    subject: `[SERVEUR DE VOEUX - UNIV EVRY] Votre demande de voeu a été refusée`,
                    text: `Bonjour,\n
                    Votre demande de voeu concernant la matière ${request.courseRequested} a été refusée.`
                }).then(response => {
                    console.log(response)
                    console.log("Le mail a bien été envoyé")
                }).catch(error => {
                    console.error(error)
                    console.error("L'envoi du mail a échoué")
                })
                this.refreshPage(2000)
            }).catch(error => {
                console.error(error)
                this.sendAlertMessage("Une erreur est survenue lors du refus du voeu. Veuillez réessayer plus tard.")
                this.refreshPage(5000)
            })
        },
        acceptRequestConflict(request) {
            axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${request._id}`, {status: 'Accepté'}).then(() => {
                this.sendAlertMessage(`Le voeu de ${request.requestor} a bien été accepté`)
                for (let otherConflict of this.groupConflictByCursus()[request.courseRequested].filter(req => req !== request)) {
                    axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${otherConflict._id}`, {status: 'Refusé'}).then(() => {
                        console.log("Les voeux des autres professeurs ont été refusés")
                        axios.post(`https://back-serverdevoeux.herokuapp.com/api/sendEmail/`, {
                            to: otherConflict.emailRequestor,
                            subject: `[SERVEUR DE VOEUX - UNIV EVRY] Votre demande de voeu a été refusée`,
                            text: `Bonjour,\n
                            Suite à un conflit entre plusieurs voeux de vos professeurs
                            et le votre concernant la matière ${otherConflict.courseRequested}, votre voeu ne vous a pas été accordé`
                        }).then(() => {
                            console.log("Le mail a bien été envoyé")
                        }).catch(error => {
                            console.error(error)
                            console.error("L'envoi du mail a échoué")
                        })
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
        getInfosForProfModal(req) {
            this.currentRequest = req
            let firstname = req.requestor.split(" ")[0]
            let lastname = req.requestor.split(" ")[1]
            axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/matieres/${firstname}/${lastname}`).then((response) => {
                this.hoursSelectedProf = response.data
            })
        },
        setCurrentRequest(req) {
            this.currentRequest = req
        },
        infosHoursProf() {
            let cmTotal = Object.values(this.hoursSelectedProf).reduce((a, b) => a + (b["cmTotal"] || 0), 0)
            let tdTotal = Object.values(this.hoursSelectedProf).reduce((a, b) => a + (b["tdTotal"] || 0), 0)
            let tpTotal = Object.values(this.hoursSelectedProf).reduce((a, b) => a + (b["tpTotal"] || 0), 0)
            let cmDone = Object.values(this.hoursSelectedProf).reduce((a, b) => a + (b["cmDone"] || 0), 0)
            let tdDone = Object.values(this.hoursSelectedProf).reduce((a, b) => a + (b["tdDone"] || 0), 0)
            let tpDone = Object.values(this.hoursSelectedProf).reduce((a, b) => a + (b["tpDone"] || 0), 0)
            return {
                cmTotal: cmTotal,
                tdTotal: tdTotal,
                tpTotal: tpTotal,
                cmDone: cmDone,
                tdDone: tdDone,
                tpDone: tpDone,
            }
        },
        sendComment() {
            if (this.newComment !== "") {
                for (let request of this.currentRequest) {
                    axios.put(`https://back-serverdevoeux.herokuapp.com/api/request/${request._id}`, {
                        detailRequest: this.newComment
                    }).then(() => {
                        this.sendAlertMessage(`Les voeux ont bien été commentés`)
                        this.refreshPage(2000)
                    }).catch(error => {
                        console.error(error)
                        this.sendAlertMessage("Une erreur est survenue lors du commentaire des voeux. Veuillez réessayer plus tard.")
                        this.refreshPage(5000)
                    })
                }
            }
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
th {
    text-align: center;
    background-color: #536895;
    color: #eee;
    vertical-align: middle !important;
}
.table-striped tbody tr:hover {
    background-color: rgba(96, 124, 184, 0.3);
}
.modal-body table tr {
    height: 2em;
    vertical-align: middle !important;
}
@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px) {
    /* Force table to not be like tables anymore */
    #mainRequestTable table,
    #mainRequestTable thead,
    #mainRequestTable tbody,
    #mainRequestTable th,
    #mainRequestTable td,
    #mainRequestTable tr,
    #mainConflictsTable table,
    #mainConflictsTable thead,
    #mainConflictsTable tbody,
    #mainConflictsTable th,
    #mainConflictsTable td,
    #mainConflictsTable tr {
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
