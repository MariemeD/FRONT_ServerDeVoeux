<template>
    <div>
        <Header />

        <h1 class="pt-5">Modifier le professeur</h1>

        <!-- ALERTS -->
        <div class="container mb-2" v-show="formData.errorOnSubmit || formData.submitted">
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
                <div class="form-row">
                    <div class="col">
                        <label for="inputFirstname">Prénom</label>
                        <input type="text"
                               class="form-control"
                               id="inputFirstname"
                               :placeholder="professor.firstname"
                               v-model="formData.firstnameUpdated">
                    </div>
                    <div class="col">
                        <label for="inputLastname">Nom de famille</label>
                        <input type="text"
                               class="form-control"
                               id="inputLastname"
                               :placeholder="professor.lastname"
                               v-model="formData.lastnameUpdated">
                    </div>
                </div>
                <div class="form-group mt-2">
                    <label for="inputEmail">Adresse mail</label>
                    <input type="email"
                           class="form-control"
                           id="inputEmail"
                           :placeholder="professor.email"
                           v-model="formData.emailUpdated">
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="statusSelect">Statut</label>
                        <select class="form-control" id="statusSelect" v-model.lazy="formData.statusUpdated">
                            <option v-for="statut in status" :key="statut._id" :value="statut.name" selected>
                                {{ statut.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="originSelect">Origine</label>
                        <select class="form-control" id="originSelect" v-model.lazy="formData.originUpdated">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>
                <div class="form-check text-left">
                    <input class="form-check-input" id="inputAdmin" type="checkbox" :value="professor.isSupervisor" v-model="formData.isSupervisor">
                    <label class="form-check-label" for="inputAdmin">Responsable de filière</label>
                </div>
                <button id="submitButton" type="submit" class="btn btn-outline-info">Modifier les données</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from "axios";

export default {
    name: "ModifyProfessor",
    components: {Header},
    data() {
        return {
            idProf: this.$route.params.idProf,
            professor: {},
            cursuses: [],
            status: [],
            origins: [],
            formData: {
                lastnameUpdated: '',
                firstnameUpdated: '',
                emailUpdated: '',
                statusUpdated: '',
                originUpdated: '',
                isSupervisor: false,
                errorOnSubmit: false,
                submitted: false
            }

        }
    },
    created() {
        axios.get(`https://back-serverdevoeux.herokuapp.com/api/professor/${this.idProf}`).then(response => {
            this.professor = response.data
        })
        axios.get("https://back-serverdevoeux.herokuapp.com/api/status").then(response => {
            this.status = response.data
        })
        // TODO Appel au GET de toutes les filieres
        // TODO Appel au GET de toutes les origines
    },
    methods: {
        sendForm() {
            // TODO SI "responsable de filiere" est coché et qu'une filière a été sélectionnée, on envoie le formulaire
            const updatedProfessor = {
                lastname: this.formData.lastnameUpdated !== "" ? this.formData.lastnameUpdated : this.professor.lastname,
                firstname: this.formData.firstnameUpdated !== "" ? this.formData.firstnameUpdated : this.professor.firstname,
                email: this.formData.emailUpdated !== "" ? this.formData.emailUpdated : this.professor.email,
                status: this.formData.statusUpdated !== "" ? this.formData.statusUpdated : this.professor.status,
                origin: this.formData.originUpdated !== "" ? this.formData.originUpdated : this.professor.origin,
                isSupervisor: this.formData.isSupervisor !== null ? this.formData.isSupervisor : this.professor.isSupervisor
                // TODO quand l'attr sera crée, mettre la filière dont le prof serait éventuellement responsable
            }

            axios.put(`https://back-serverdevoeux.herokuapp.com/api/professor/${this.idProf}`, updatedProfessor)
                .then(response => {
                    console.log(response)
                    this.alertMessage = "La modification a été effectuée avec succès !"
                    this.formData.submitted = true
                })
                .catch(error => {
                    console.log(error)
                    this.alertMessage = "Une erreur est survenue : Le nouveau statut n'a pas été modifié. Veuillez réessayer."
                    this.formData.errorOnSubmit = true
                })
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
