<template>
    <div>
        <Header />

        <div class="container">
            <div class="row pt-3">
                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="server-card" class="card p-3">
                        <div id="div-server-icon">
                            <font-awesome-icon id="server-icon" icon="server" size="5x" style="color: #C9893C" />
                        </div>
                        <h6 class="mt-3 mb-0 text-uppercase">Serveur</h6>
                        <hr>
                        <small>Le serveur est ouvert</small>

                        <ul id="server-actions" class="text-left mr-auto ml-auto">
                            <li>
                                - <a href="">Fermer le serveur</a>
                            </li>
                            <li>
                                - <a href="">Redémarrer le serveur</a>
                            </li>
                            <li>
                                - <a href="">Sauvegarder la base</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="professor-card" class="card p-3">
                        <div id="div-professor-icon">
                            <font-awesome-icon id="professor-icon" icon="users" size="5x" style="color: #C9893C" />
                        </div>
                        <h6 class="mt-3 mb-0 text-uppercase">Enseignants</h6>
                        <hr>

                        <ul id="professor-actions" class="text-left mr-auto ml-auto">
                            <li>
                                - <router-link to="/admin/enseignants" href="">Gestion des enseignants</router-link>
                            </li>
                            <li>
                                - <router-link to="/admin/primes" href="">Gestion des primes</router-link>
                            </li>
                            <li>
                                - <router-link to="/admin/heures-effectuees" href="">Gestion des heures effectuées</router-link>
                            </li>
                            <li>
                                - <router-link to="/admin/statuts" href="">Gestion des statuts</router-link>
                            </li>
                            <li>
                                - <router-link to="/admin/decharges" href="">Gestion des décharges</router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="studings-card" class="card p-3">
                        <div id="div-studings-icon">
                            <font-awesome-icon id="studings-icon" icon="book" size="5x" style="color: #C9893C" />
                        </div>
                        <h6 class="mt-3 mb-0 text-uppercase">Enseignements</h6>
                        <hr>

                        <ul id="studings-actions" class="text-left mr-auto ml-auto">
                            <li>
                                - <router-link to="/admin/cursus" href="">Gestion des cursus</router-link>
                            </li>
                            <li>
                                - <router-link to="/admin/filieres" href="">Gestion des filières</router-link>
                            </li>
                            <li>
                                - <router-link to="/admin/origines" href="">Gestion des origines</router-link>
                            </li>
                            <li>
                                - <router-link to="/admin/types-de-cours" href="">Gestion des types de cours</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
export default {
    name: "Homepage",
    components: {Header}
}
</script>

<style scoped>
.container {
    padding-top: 3em;
}

.card ul {
    list-style: none;
    padding: 5px 0 0;
}

#server-card, #studings-card {
    background-color: #D5D5D5;
}

#div-server-icon, #div-professor-icon, #div-studings-icon {
    border: 1px solid #B5B9D1;
    border-radius: 50%;
    background-color: #B5B9D1;
    padding: 15px;
    width: 50%;
    margin: 0 auto;
}

h6 {
    font-weight: bold;
}

#server-card hr {
    margin-bottom: 0;
}

#server-actions li, #studings-actions li, #server-actions a, #studings-actions a, #server-card h6, #studings-card h6{
    color: #344C80;
}

#professor-card {
    background-color: #344C80;
}

#professor-actions li, #professor-actions a, #professor-card h6 {
    color: #C9893C;
}

@media all and (max-width: 992px) and (min-width: 769px) {
    .col-md-8 {
        margin: 5px auto;
    }

    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
}

@media all and (max-width: 768px) {
    .col-md-8 {
        margin: 5px auto;
    }

    #server-card, #professor-card, #studings-card {
        width: 100%;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 50%;
        margin: 0 auto;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.6em;
    }
}

@media all and (max-width: 576px) {
    #server-card, #professor-card, #studings-card {
        width: 60%;
        margin: 0 auto 5px;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 45%;
        margin: 0 auto;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
}

@media all and (max-width: 390px) {
    .container {
        padding-top: 1em;
    }

    #server-card, #professor-card, #studings-card {
        width: 80%;
        margin: 0 auto 5px;
    }

    #div-server-icon, #div-professor-icon, #div-studings-icon {
        border: 1px solid #B5B9D1;
        border-radius: 50%;
        background-color: #B5B9D1;
        padding: 10px;
        width: 45%;
        margin: 0 auto;
    }
    #server-icon, #professor-icon, #studings-icon {
        width: 0.7em;
    }
}

</style>
