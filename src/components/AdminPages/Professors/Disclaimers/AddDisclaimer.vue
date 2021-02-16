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
                        <router-link :to="{name: 'status'}" v-if="formData.submitted" class="mb-auto">
                            <span id="returnToDisclaimer" class="disclaimerActionBtn mb-3">Retour à la page des décharges</span>
                        </router-link>
                    </p>
                </div>
            </transition>
        </div>

        <div class="container">
            <form @submit.prevent="sendForm">
                <div class="form-group">
                    <label for="inputStatusName" class="form-label">Objet de la décharge :</label>
                    <input type="text"
                           class="form-control"
                           id="inputStatusName"
                           placeholder="Entrez l'objet de la décharge"
                           v-model.lazy="formData.object"
                           required>
                </div>
                <div class="form-group">
                    <label for="inputMandatoryHours" class="form-label">Nombre d'heures de services :</label>
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
                <button type="submit" class="btn disclaimerActionBtn">Ajouter la nouvelle décharge</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";

export default {
    name: "AddDisclaimer",
    components: { Header },
    data() {
        return {
            alertMessage: '',
            formData: {
                object: '',
                hours: null,
                errorOnSubmit: false,
                submitted: false
            }
        }
    },
    methods: {
        sendForm() {

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
</style>
