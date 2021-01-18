<template>
    <nav class="navbar navbar-expand fixed-top navbar-nav p-0">
        <router-link class="navbar-brand" to="/admin/">
            <img alt="Vue logo" src="../../assets/Logo_Universite_Evry.png" width="175" class="img-fluid">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/profil">Profil</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Déconnexion</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
nav {
    background-color: #536895;
}

.nav-link {
    color: #D5D5D5;
}
</style>
