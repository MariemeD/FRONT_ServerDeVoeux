<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <router-link class="navbar-brand" to="/admin/">
            <img alt="Vue logo" src="../../assets/Logo_Universite_Evry.png" width="175" class="img-fluid">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'admin-profil'}">Profil</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'wishes' }">
                        Gestion des voeux
                        <span class="badge badge-dark">{{ requestNb }}</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'conflict-wishes' }">
                        Gestion des conflits
                        <span class="badge badge-dark">{{ conflictNb }}</span>
                    </router-link>
                </li>
            </ul>
            <a class="nav-link my-2 my-lg-0">Déconnexion</a>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            requestNb: null,
            conflictNb: null
        }
    },
    created() {
        // TODO Récupérer le nombre de voeux pour la filiere du prof connecté
        // TODO Récupérer le nombre de voeux pour la filiere du prof connecté
    }
}
</script>

<style scoped>
nav {
    background-color: #536895;
    padding: 0.1em;
}

.nav-link {
    color: #D5D5D5;
}
</style>
