<template>
    <div>
        <Header />
        <h1 class="pt-5">Modifier un statut</h1>

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
            <form>
                <div class="form-group">
                    <label for="nameStatus" class="form-label">Nom du statut:</label>
                    <input id="nameStatus"
                           class="form-control"
                           type="text"
                           :placeholder="currentStatus.name"
                           v-model="formData.statusName">
                </div>

                <div class="form-group">
                    <label for="mandatoryHours" class="form-label">Nombre d'heures statuaires:</label>
                    <input id="mandatoryHours"
                           class="form-control"
                           type="number"
                           step="0.01"
                           :placeholder="currentStatus.mandatoryHours"
                           v-model="formData.mandatoryHours">
                </div>

                <div class="form-group">
                    <label for="extraHours" class="form-label">Nombre d'heures supplémentaires:</label>
                    <input id="extraHours"
                           class="form-control"
                           type="number"
                           step="0.01"
                           :placeholder="currentStatus.extraHours"
                           v-model="formData.extraHours">
                </div>

                <button type="submit" class="btn statusActionBtn" @click.prevent="sendForm">Modifier le statut</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from "axios";

export default {
    name: "ModifyStatus",
    components: { Header },
    data() {
        return {
            currentStatus: {},
            alertMessage: '',
            formData: {
                statusName: '',
                mandatoryHours: null,
                extraHours: null,
                errorOnSubmit: false,
                submitted: false
            }
        }
    },
    created() {
        axios.get(`https://back-serverdevoeux.herokuapp.com/api/status/${this.$route.params.idStatus}`).then(response => {
            this.currentStatus = response.data
        })
    },
    methods: {
        sendForm() {
            const updatedStatus = {
                name: this.formData.statusName !== "" ? this.formData.statusName : this.currentStatus.name,
                mandatoryHours: this.formData.mandatoryHours !== null ? this.formData.mandatoryHours : this.currentStatus.mandatoryHours,
                extraHours: this.formData.extraHours !== null ? this.formData.extraHours : this.currentStatus.extraHours
            }

            axios.put(`https://back-serverdevoeux.herokuapp.com/api/status/${this.currentStatus._id}`, updatedStatus)
                .then(response => {
                    console.log(response)
                    this.alertMessage = "Le nouveau statut a été ajouté avec succès !"
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
