<template>
    <div>
        <Header />

        <h1 class="pt-5">Ajouter un professeur</h1>

        <div class="container">
            <form>
                <div class="form-group">
                    <label for="inputFirstname">Prénom</label>
                    <input type="text" class="form-control" id="inputFirstname" placeholder="Entrez le prénom">
                </div>
                <div class="form-group">
                    <label for="inputLastname">Nom de famille</label>
                    <input type="text" class="form-control" id="inputLastname" placeholder="Entrez le nom de famille">
                </div>
                <div class="form-group">
                    <label for="inputEmail">Adresse mail</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Entrez l'adresse mail">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button id="submitButton" type="submit" class="btn">Ajouter le nouveau professeur</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";

export default {
    name: "AddProfessor",
    components: {Header},
    data() {
        return {
            pathways: [],
            lastname: '',
            firstname: '',
            email: '',
            isAdmin: false,
            isResponsible: false,
            pathwayResponsibleFor: ''
        }
    },
    created() {
        // TODO Appel au GET de toutes les filieres
    },
    methods: {
        sendForm() {
            // TODO SI "responsable de filiere" est coché et qu'une filière a été sélectionnée, on envoie le formulaire
            // TODO recupérer les data du formulaire
            // TODO appel au POST du professeur
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
