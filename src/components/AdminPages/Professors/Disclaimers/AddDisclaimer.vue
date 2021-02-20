<template>
    <div>
        <Header />
        <h1 class="pt-5">Ajouter une décharge</h1>

        <!-- ALERTS -->
        <div class="container mb-2" v-show="formData.errorOnSubmit || formData.submitted">
            <transition :duration="5000" name="slide-fade">
                <div class="alert"
                     :class="{'alert-success': formData.submitted, 'alert-danger': formData.errorOnSubmit}">
                    <p class="text-center">
                        {{ alertMessage }}
                        <router-link :to="{name: 'disclaimers'}" v-if="formData.submitted" class="mb-auto">
                            <span id="returnToDisclaimer" class="disclaimerActionBtn mb-3">Retour à la page des décharges</span>
                        </router-link>
                    </p>
                </div>
            </transition>
        </div>

        <div class="container">
            <form @submit.prevent="sendForm" class="mt-3">
                <div class="form-group">
                    <label for="inputDisclaimerName" class="form-label">Nom de la décharge<span class="mandatoryInput">*</span> :</label>
                    <input type="text"
                           class="form-control"
                           id="inputDisclaimerName"
                           placeholder="Entrez le nom de la décharge"
                           v-model.lazy="formData.name"
                           required>
                </div>
                <div class="form-group">
                    <label for="inputDisclaimerObject" class="form-label">Objet de la décharge<span class="mandatoryInput">*</span> :</label>
                    <input type="text"
                           class="form-control"
                           id="inputDisclaimerObject"
                           placeholder="Entrez l'objet de la décharge"
                           v-model.lazy="formData.object"
                           required>
                </div>
                <div class="form-group">
                    <label for="inputMandatoryHours" class="form-label">Nombre d'heures de services<span class="mandatoryInput">*</span> :</label>
                    <input type="number"
                           step="0.01"
                           min="0"
                           class="form-control"
                           id="inputMandatoryHours"
                           placeholder="Exemple: 100"
                           v-model.lazy="formData.hours"
                           required>
                    <small id="mandatoryHoursHelp" class="form-text text-muted text-left">
                        Le nombre d'heures de service en <strong>moins</strong>
                    </small>
                </div>
                <div class="form-group">
                    <label for="selectProf" class="form-label">Choisissez le professeur concerné<span class="mandatoryInput">*</span> :</label>
                    <select class="form-control" id="selectProf" v-model.lazy="formData.professor" required>
                        <option v-for="prof in professorsFiliere" :key="prof.email">
                            <!-- {{ prof.lastName.toUpperCase() }} {{ prof.firstName }} -->
                            {{ prof }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1" class="form-label">Commentaire :</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model.lazy="formData.comment"></textarea>
                </div>
                <button type="submit" class="btn disclaimerActionBtn">Ajouter la nouvelle décharge</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from "axios";

export default {
    name: "AddDisclaimer",
    components: { Header },
    data() {
        return {
            alertMessage: '',
            professors: [],
            professorsFiliere: [],
            formData: {
                name: '',
                object: '',
                comment: '',
                hours: null,
                professor: '',
                errorOnSubmit: false,
                submitted: false
            }
        }
    },
    created() {
        axios.get(`http://146.59.195.214:8006/api/v1/events/teachers/${this.$cookies.get("groupProfessor")}`).then(response => {
            for (let prof of response.data) {
                let name = ""
                for (let eltName of prof.split(" ")) {
                    name += this.capitalizeTextElement(eltName) + " "
                }
                this.professorsFiliere.push(name)
            }
        })
    },
    methods: {
        sendForm() {
            if (this.formData.professor !== '') {
                axios.post("https://back-serverdevoeux.herokuapp.com/api/discharge", {
                    name: this.formData.name,
                    object: this.formData.object,
                    comment: this.formData.comment,
                    hours: this.formData.hours.toString(),
                    professor: this.formData.professor
                }).then(response => {
                    console.log(response)
                    this.formData.submitted = true
                    this.alertMessage = "La nouvelle décharge a bien été crée"
                }).catch(error => {
                    console.error(error)
                    this.formData.errorOnSubmit = true
                    this.alertMessage = "Une erreur est survenue : la décharge n'a pas pu être créée"
                })
            } else {
                this.formData.errorOnSubmit = true
                this.alertMessage = "Veuillez remplir tous les champs obligatoires et sélectionner un professeur."
            }
        },
        capitalizeTextElement(element) {
            const firstLetter = element[0].toUpperCase()
            const rest = element.toLowerCase().substring(1)
            return firstLetter + rest
        }
    }
}
</script>

<style scoped>
.disclaimerActionBtn {
    color: #536895;
    border-color: #536895;
}
.disclaimerActionBtn:hover {
    color: #2c3e50;
}
.form-label {
    margin-bottom: 0.40em;
    float: left !important;
}
#returnToDisclaimer {
    text-decoration: underline;
}
.alert p {
    margin-bottom: 0;
}
.mandatoryInput {
    color: #e02e2e;
    font-size: 0.8em;
    padding-bottom: 1em;
    position: absolute;
}
</style>
