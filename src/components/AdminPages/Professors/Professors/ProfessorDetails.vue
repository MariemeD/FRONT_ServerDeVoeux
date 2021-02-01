<template>
    <div>
        <Header />

        <h1 class="pt-5">Nom Prénom</h1>

        <div class="container">
            <div class="card mt-4">
                <div class="card-header">
                    <h4 class="card-title">{{ professor.firstname }} {{ professor.lastname }}</h4>
                    <p class="card-subtitle text-muted">Professeur</p>
                </div>
                <div class="card-body text-left">
                    <form>
                        <div class="form-group">
                            <label for="lastname">Nom:</label>
                            <input id="lastname" class="form-control" type="text" :placeholder="professor.lastname" disabled>
                        </div>

                        <div class="form-group">
                            <label for="firstname">Prénom:</label>
                            <input id="firstname" class="form-control" type="text" :placeholder="professor.firstname" disabled>
                        </div>

                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input id="email" class="form-control" type="text" :placeholder="professor.email" disabled>
                        </div>

                        <div class="form-check">
                            <input id="adminInput" class="form-check-input" type="radio" :value="professor.isAdmin" disabled>
                            <label for="adminInput">Est administrateur</label>
                        </div>

                        <div class="form-check">
                            <input id="responsibleInput" class="form-check-input" type="radio" :value="professor.isAdmin" disabled>
                            <label for="responsibleInput">Est responsable de la filière : { nom filière }</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/AdminPages/Header";
    export default {
        name: "Professor",
        components: {Header},
        data() {
            return {
                idProf: this.$route.params.idProf,
                professor: {}
            }
        }
    }
</script>

<style scoped>

</style>
