<template>
    <div>
        <Header />

        <h1 class="pt-5">Modifier le professeur</h1>

        <div class="container">
            <form>
                <div class="form-row">
                    <div class="col">
                        <label for="inputFirstname">Prénom</label>
                        <input type="text" class="form-control" id="inputFirstname" placeholder="Entrez le prénom" v-model="firstnameUpdated">
                    </div>
                    <div class="col">
                        <label for="inputLastname">Nom de famille</label>
                        <input type="text" class="form-control" id="inputLastname" placeholder="Entrez le nom de famille" v-model="lastnameUpdated">
                    </div>
                </div>
                <div class="form-group mt-2">
                    <label for="inputEmail">Adresse mail</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Entrez l'adresse mail" v-model="emailUpdated">
                </div>
                <div class="form-check text-left">
                    <input class="form-check-input" id="inputAdmin" type="radio" value="Administrateur" v-model="isAdmin">
                    <label class="form-check-label" for="inputAdmin">Administrateur</label>
                </div>
                <div class="form-check text-left">
                    <input class="form-check-input" id="inputResp" type="radio" value="Responsable">
                    <label class="form-check-label" for="inputResp">Responsable de filière</label>
                </div>
                <button id="submitButton" type="submit" class="btn btn-outline-info">Modifier les données</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";

export default {
    name: "ModifyProfessor",
    components: {Header},
    data() {
        return {
            professor: {},
            cursuses: [],
            lastnameUpdated: '',
            firstnameUpdated: '',
            emailUpdated: '',
            isAdmin: false,
            isResponsable: false
        }
    },
    created() {
        // TODO Appel au GET by id de la route professeur
        // TODO Appel au GET de toutes les filieres
    },
    methods: {
        sendForm() {
            // TODO SI "responsable de filiere" est coché et qu'une filière a été sélectionnée, on envoie le formulaire
            // TODO recupérer les data du formulaire
            // TODO appel au PUT du professeur
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
</style>
