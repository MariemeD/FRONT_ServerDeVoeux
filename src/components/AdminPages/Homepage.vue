<template>
    <div>
        <Header />

        <div class="container">
            <div class="row pt-3">
                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="professor-card" class="card p-3">
                        <div id="div-professor-icon">
                            <font-awesome-icon id="professor-icon" icon="users" size="5x" style="color: #C9893C" />
                        </div>
                        <h6 class="mt-3 mb-0 text-uppercase">Enseignants</h6>
                        <hr>

                        <ul id="professor-actions" class="text-left mr-auto ml-auto">
                            <li>
                                - <router-link :to="{ name: 'professors'}">Gestion des enseignants</router-link>
                            </li>
                            <li>
                                - <router-link :to="{ name: 'hoursMade'}">Gestion des heures effectuées</router-link>
                            </li>
                            <li>
                                - <router-link :to="{ name: 'status'}">Gestion des statuts</router-link>
                            </li>
                            <li>
                                - <router-link :to="{ name: 'disclaimers'}">Gestion des décharges</router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-6">
                    <div id="server-card" class="card p-3">
                        <div id="div-server-icon">
                            <font-awesome-icon id="server-icon" icon="server" size="5x" style="color: #C9893C" />
                        </div>
                        <h6 class="mt-3 mb-0 text-uppercase">Serveur</h6>
                        <hr>
                        <small class="text-success">Le serveur est ouvert</small>

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
#professor-card, #studings-card {
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
#professor-actions li, #studings-actions li, #professor-actions a, #studings-actions a, #professor-card h6, #studings-card h6{
    color: #344C80;
}
#server-card {
    background-color: #344C80;
}
#server-actions li, #server-actions a, #server-card h6 {
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
