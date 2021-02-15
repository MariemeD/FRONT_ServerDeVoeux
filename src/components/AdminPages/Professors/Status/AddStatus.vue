<template>
    <div>
        <Header />
        <h1 class="pt-5">Ajouter un statut</h1>

        <!-- ALERTS -->
        <div class="container mb-2" v-show="formData.errorOnSubmit || formData.submitted">
            <transition :duration="5000" name="slide-fade">
                <div class="alert"
                     :class="{'alert-success': formData.submitted, 'alert-danger': formData.errorOnSubmit}">
                    <p class="text-center">
                        {{ alertMessage }}
                        <router-link :to="{name: 'status'}" v-if="formData.submitted" class="mb-auto">
                            <span id="returnToStatus" class="statusActionBtn mb-3">Retour à la page des status</span>
                        </router-link>
                    </p>
                </div>
            </transition>
        </div>

        <div class="container">
            <form @submit.prevent="sendForm">
                <div class="form-group">
                    <label for="inputStatusName" class="form-label">Nom du statut :</label>
                    <input type="text"
                           class="form-control"
                           id="inputStatusName"
                           placeholder="Entrez l'intitulé du statut"
                           v-model.lazy="formData.statusName"
                           required>
                </div>
                <div class="form-group">
                    <label for="inputMandatoryHours" class="form-label">Nombre d'heures statuaires :</label>
                    <input type="number"
                           step="0.01"
                           min="0"
                           class="form-control"
                           id="inputMandatoryHours"
                           placeholder="Exemple: 100"
                           v-model.lazy="formData.mandatoryHours"
                           required>
                    <small id="mandatoryHoursHelp" class="form-text text-muted text-left">
                        Le nombre d'heures qu'un professeur doit <strong>obligatoirement</strong> effectuer
                    </small>
                </div>
                <div class="form-group">
                    <label for="inputExtraHours" class="form-label">Nombre d'heures supplémentaires :</label>
                    <input type="number"
                           step="0.01"
                           min="0"
                           class="form-control"
                           id="inputExtraHours"
                           placeholder="Exemple: 90"
                           v-model.lazy="formData.extraHours"
                           required>
                    <small id="extraHoursHelp" class="form-text text-muted text-left">
                        Le nombre d'heures supplémentaires qu'un professeur peut effectuer
                    </small>
                </div>
                <button type="submit" class="btn statusActionBtn">Ajouter le nouveau statut</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from 'axios'

export default {
    name: "AddStatus",
    components: { Header },
    data() {
        return {
            alertMessage: '',
            formData: {
                statusName: null,
                mandatoryHours: null,
                extraHours: null,
                submitted: false,
                errorOnSubmit: false
            }
        }
    },
    methods: {
        resetData(resetError) {
            if (resetError) {
                this.formData.errorOnSubmit = false
            }
            this.formData.statusName = null
            this.formData.mandatoryHours = null
            this.formData.extraHours = null
            this.formData.submitted = false
        },
        sendForm() {
            if (this.formData.statusName && this.formData.mandatoryHours && this.formData.extraHours) {
                const newStatusAdded = {
                    name: this.formData.statusName,
                    mandatoryHours: this.formData.mandatoryHours,
                    extraHours: this.formData.extraHours
                }

                axios.post('https://back-serverdevoeux.herokuapp.com/api/status', newStatusAdded).then((response) => {
                    console.log(response)
                    this.alertMessage = "Le nouveau statut a été ajouté avec succès !"
                    this.formData.submitted = true
                }).catch(error => {
                    this.alertMessage = "Le nouveau statut n'a pas pu être ajouté. Veuillez réessayer"
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
    }
}
</script>

<style scoped>
.statusActionBtn {
    color: #536895;
    border-color: #536895;
}
.statusActionBtn:hover {
    color: #2c3e50;
}
.form-label {
    margin-bottom: 0.40em;
    float: left !important;
}
#returnToStatus {
    text-decoration: underline;
}
.alert p {
    margin-bottom: 0;
}
</style>
