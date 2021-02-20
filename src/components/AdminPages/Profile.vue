<template>
    <div>
        <Header />
        <h1 class="pt-5">Profil</h1>

        <div class="container">
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
                    <p>
                        <strong><u>Responsable de la filière:</u></strong>
                    </p>
                    <button class="btn btn-outline-dark">Changer de mot de passe</button>
                    <br>
                    <br>
                    <h5><u>Matières enseignées :</u></h5>
                    <ul>
                        <li v-for="(hours, matiere) in professorCourses" :key="matiere">
                            {{ matiere.toUpperCase() }}
                        </li>
                    </ul>
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
              professorCourses: {}
          }
        },
        created() {
            axios.get(`https://back-serverdevoeux.herokuapp.com/api/professor/${this.$cookies.get("emailProfessor")}`).then(response => {
                this.currentProfessor = response.data
            })
            axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/matieres/${this.$cookies.get("FnameProfessor")}/${this.$cookies.get("LnameProfessor")}`)
            .then(response => {
                this.professorCourses = response.data
            })
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
