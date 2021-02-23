<template>
    <div>
        <Header />
        <h1 :class="{'pt-5': $cookies.get('emailProfessor')}">Profil</h1>

        <div class="container" v-if="$cookies.get('emailProfessor')">
            <div class="card mt-4">
                <div class="card-header">
                    <h4>{{ currentProfessor.lastName.toUpperCase() }} {{ currentProfessor.firstName }}</h4>
                    <small>Administrateur - Responsable de filière</small>
                </div>
                <div class="card-body text-left">
                    <h5><u>Informations personnelles :</u></h5>
                    <p>
                        <strong><u>Nom:</u></strong> {{ currentProfessor.lastName }}
                    </p>
                    <p>
                        <strong><u>Prénom:</u></strong> {{ currentProfessor.firstName }}
                    </p>
                    <p>
                        <strong><u>Email:</u></strong> {{ currentProfessor.email }}
                    </p>
                    <p v-if="$cookies.get('groupProfessor')">
                        <strong><u>Responsable de la filière:</u></strong> {{ $cookies.get("groupProfessor") }}
                    </p>
                    <button
                        class="btn btn-outline-dark"
                        data-toggle="modal"
                        data-target="#passwordModal">
                        Changer de mot de passe</button>
                    <br>
                    <br>
                    <h5><u>Matières enseignées :</u></h5>
                    <ul v-if="professorCourses.length > 0">
                        <li v-for="matiere in professorCourses" :key="matiere">
                            {{ matiere.toUpperCase() }}
                        </li>
                    </ul>
                    <div v-else>
                        <p>Pour le moment, vous n'enseignez aucune matière.</p>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="passwordModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="commentModalLabel">Changement de mot de passe</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- ALERTS -->
                        <div class="container" v-if="formData.isSubmitted || formData.isError">
                            <transition :duration="5000" name="slide-fade">
                                <div class="alert alert-info">
                                    <p class="text-center mb-0">{{ alertMessage }}</p>
                                </div>
                            </transition>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="changePassword">
                                <div class="form-group">
                                    <label for="inputNewPassword" class="form-label">Nouveau mot de passe :</label>
                                    <input
                                        class="form-control"
                                        id="inputNewPassword"
                                        type="password"
                                        v-model.lazy="formData.newPassword"
                                        required />
                                </div>
                                <div class="form-group">
                                    <label for="inputConfirmedNewPassword" class="form-label">Confirmation du nouveau mot de passe :</label>
                                    <input
                                        class="form-control"
                                        id="inputConfirmedNewPassword"
                                        type="password"
                                        v-model.lazy="formData.newPasswordConfirmed"
                                        required />
                                </div>
                                <button class="btn btn-outline-success">Changer de mot de passe</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
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
    name: "Profile",
    components: { Header },
    data() {
        return {
            currentProfessor: {},
            groupSupervised: '',
            professorCourses: [],
            formData: {
                newPassword: '',
                newPasswordConfirmed: '',
                isSubmitted: false,
                isError: false,
            },
            alertMessage: ''
        }
    },
    created() {
        axios.get(`https://back-serverdevoeux.herokuapp.com/api/professor/${this.$cookies.get("emailProfessor")}`).then(response => {
            this.currentProfessor = response.data
        })
        axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/matieres/${this.$cookies.get("FnameProfessor")}/${this.$cookies.get("LnameProfessor")}`)
            .then(response => {
                this.professorCourses = Object.keys(response.data).sort()
            })
    },
    methods: {
        changePassword(){
            this.formData.isSubmitted = true;
            if (this.formData.newPassword !== this.formData.newPasswordConfirmed) {
                this.formData.isError = true
                this.errorMessage = "Les mots de passe saisis sont différents, assurez vous de mettre le même mot de passe dans les deux champs."
            } else {
                axios.put(`https://back-serverdevoeux.herokuapp.com/api/user/${this.$cookies.get('emailProfessor')}/password`,
                    {
                        password: this.formData.newPassword
                    })
                    .then(response => {
                        console.log(response)
                        this.formData.isError = false
                        this.formData.newPassword = ""
                        this.formData.newPasswordConfirmed = ""
                        this.alertMessage = "Votre mot de passe a bien été changé"
                        this.refreshPage(2000)
                    })
                    .catch(error => {
                    console.log(error)
                    this.formData.isError = true
                    this.formData.isSubmitted = false
                    this.formData.newPassword = ""
                    this.formData.newPasswordConfirmed = ""
                    switch(error.response.status) {
                        case 204:
                            this.errorMessage = "Echec mise à jour !"
                            break;
                        default:
                            this.errorMessage = "Une erreur est survenue lors du changement de votre mot de passe.. Réessayez !"
                            break;
                    }
                })
            }
        },
        refreshPage(timeout) {
            return setTimeout(function() {
                window.location.reload()
            }, timeout)
        },
    }
}
</script>

<style scoped>
h5, small {
    color: #536895;
}
li {
    list-style: "- ";
}
</style>
