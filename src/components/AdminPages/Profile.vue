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
        passwordChange(){
            this.changePassword.submitted = true;
            if (this.changePassword.newPassword !== this.changePassword.newPasswordConfirmed) {
                this.changePassword.error = true
                this.errorMessage = "Les mots de passe saisis sont différents, assurez vous de mettre le même mot de passe dans les deux champs."
            }
            else{
                axios.put("https://back-serverdevoeux.herokuapp.com/api/user/"+this.changePassword.emailChangement,
                    {
                        password: this.changePassword.newPassword
                    }).then(
                    response => {
                        this.changePassword.error = false
                        console.log(response)
                        this.changePassword.emailChangement = ""
                        this.changePassword.newPassword = ""
                        this.changePassword.newPasswordConfirmed = ""
                    }
                ).catch(error => {
                    console.log(error)
                    this.changePassword.error = true
                    this.changePassword.submitted = false
                    this.changePassword.emailChangement = ""
                    this.changePassword.newPassword = ""
                    this.changePassword.newPasswordConfirmed = ""
                    switch(error.response.status) {
                        case 404:
                            this.errorMessage = "Utilisateur inexistant !"
                            break;
                        case 204:
                            this.errorMessage = "Echec mise à jour  !"
                            break;
                        default:
                            this.errorMessage = "Une erreur est survenue lors de votre inscription.. Réessayez !"
                            break;
                    }
                })
            }
        }
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
