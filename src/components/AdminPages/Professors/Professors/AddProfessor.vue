<template>
    <div>
        <Header />

        <h1 class="pt-5">Ajouter un professeur</h1>

        <!-- ALERTS -->
        <div class="container mb-2" v-show="formData.errorOnSubmit || formData.submitted || errorOnGettingData">
            <transition name="slide-fade">
                <div class="alert"
                     :class="{'alert-success': formData.submitted, 'alert-danger': formData.errorOnSubmit}">
                    <p class="text-center">
                        {{ alertMessage }}
                        <router-link :to="{name: 'professors'}" v-if="formData.submitted" class="mb-auto">
                            <span id="returnToStatus" class="profActionBtn mb-3">Retour à la page des professeurs</span>
                        </router-link>
                    </p>
                </div>
            </transition>
        </div>

        <div class="container">
            <form @submit.prevent="sendForm">
                <div class="row justify-content-between">
                        <div class="col form-group">
                            <label for="inputFirstname">Prénom</label>
                            <input type="text" class="form-control" id="inputFirstname" placeholder="Entrez le prénom" v-model.lazy="formData.firstname">
                        </div>
                        <div class="col form-group">
                            <label for="inputLastname">Nom de famille</label>
                            <input type="text" class="form-control" id="inputLastname" placeholder="Entrez le nom de famille" v-model.lazy="formData.lastname">
                        </div>
                </div>

                <div class="row">
                    <div class="col form-group">
                        <label for="inputEmail">Adresse mail</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="Entrez l'adresse mail" v-model.lazy="formData.email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>

                <div class="row">
                    <div class="col form-group">
                        <label for="statusSelect">Statut</label>
                        <select class="form-control" id="statusSelect" v-model.lazy="formData.status">
                            <option v-for="statut in status" :key="statut._id">
                                {{ statut.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="originSelect">Origine</label>
                        <select class="form-control" id="originSelect" v-model.lazy="formData.origin">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col form-check">
                        <input class="form-check-input" type="checkbox" name="isProfessorSupervisor" id="isSupervisorRadio" v-model.lazy="formData.isSupervisor">
                        <label class="form-check-label" for="isSupervisorRadio">
                            Est responsable de filière
                        </label>
                    </div>
                </div>

                <div v-if="formData.isSupervisor">
                    Les filières
                </div>


                <button id="submitButton" type="submit" class="btn mt-4">Ajouter le nouveau professeur</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from "axios";

export default {
    name: "AddProfessor",
    components: {Header},
    data() {
        return {
            pathways: [],
            status: [],
            origins: [],
            alertMessage: '',
            errorOnGettingData: false,
            formData: {
                lastname: '',
                firstname: '',
                email: '',
                status: '',
                origin: '',
                composante: '',
                pathwayResponsibleFor: '',
                submitted: false,
                errorOnSubmit: false
            }
        }
    },
    created: function () {
        // TODO Appel au GET de toutes les filieres
        axios.get("https://back-serverdevoeux.herokuapp.com/api/status/").then(response => {
            this.status = response.data;
        }).catch(error => {
            console.error(error)
            this.alertMessage = "Une erreur est survenue : les statuts n'ont pas pu été remontés."
        })
    },
    methods: {
        sendForm() {
            // TODO SI "responsable de filiere" est coché et qu'une filière a été sélectionnée, on envoie le formulaire
            // TODO recupérer les data du formulaire
            // TODO appel au POST du professeur
            if (this.formData.lastname && this.formData.firstname
                && this.formData.email && this.formData.status && this.formData.origin) {
                const newProfessorAdded = {
                    lastName: this.formData.lastname,
                    firstName: this.formData.firstname,
                    email: this.formData.email,
                    status: this.formData.status,
                    department: this.formData.origin,
                    composante: this.formData.composante,
                }

                axios.post('https://back-serverdevoeux.herokuapp.com/api/professor', newProfessorAdded).then((response) => {
                    console.log(response)
                    this.alertMessage = "Le nouveau professeur a été ajouté avec succès !"
                    this.formData.submitted = true
                }).catch(error => {
                    this.alertMessage = "Le nouveau professeur n'a pas pu être ajouté. Veuillez réessayer"
                    this.formData.errorOnSubmit = true
                    console.error(error)
                })
                //this.resetData(true)
                this.formData.submitted = false
            } else {
                this.formData.errorOnSubmit = true
                this.alertMessage = "Veuillez remplir tous les champs du formulaire."
            }
        }
    },
    computed: {
        sortedStatus: function() {
            return this.status.slice().sort((a, b) => {
                let modifier = 1
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1 * modifier
                if(a.name.toLowerCase() > b.name.toLowerCase()) return modifier
                return 0;
            });
        }
    }
}
</script>

<style scoped>
#submitButton {
    color: #536895;
    border-color: #536895;
}
#submitButton:hover {
    color: #FFF;
    border-color: #536895;
    background-color: #536895;
}
.profActionBtn {
    color: #536895;
    border-color: #536895;
}
.profActionBtn:hover {
    color: #2c3e50;
}
.alert p {
    margin-bottom: 0;
}
</style>
