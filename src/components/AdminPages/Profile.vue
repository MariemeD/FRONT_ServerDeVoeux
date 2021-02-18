<template>
    <div>
        <Header />
        <h1 class="pt-5">Profil</h1>

        <div class="container">
            <div class="card mt-4">
                <div class="card-header">
                    <h4>Professeur NOM Prénom</h4>
                </div>
                <div class="card-body text-left">
                    <h5 class="text-center">Informations</h5>
                    <p>Nom: </p>
                    <p>Prénom: </p>
                    <p>Email: </p>
                    <p>Responsable de la filière: </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/AdminPages/Header";
    export default {
        name: "Profile",
        components: {Header}
    }
</script>

<style scoped>

</style>
