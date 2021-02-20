<template>
    <div>
        <Header />

        <div class="jumbotron vertical-center">
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
                                - <router-link :to="{ name: 'professors'}">Liste des enseignants</router-link>
                            </li>
                            <li>
                                - <router-link :to="{ name: 'hoursMade'}">Détails des heures effectuées</router-link>
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
                        <small v-if="isServerOpen" class="text-success">Le serveur est <strong>ouvert</strong></small>
                        <small v-else class="text-danger">Le serveur est <strong>fermé</strong></small>

                        <ul id="server-actions" class="text-left mr-auto ml-auto">
                            <li>
                                - <span
                                    @click.prevent="closeServer"
                                    :class="{'unvailable-link': !isServerOpen}">
                                        Fermer le serveur
                                    </span>
                            </li>
                            <li>
                                - <span
                                    @click.prevent="restartServer"
                                    :class="{'unvailable-link': isServerOpen}">
                                    Redémarrer le serveur
                                </span>
                            </li>
                            <li>
                                - <span>Sauvegarder la base</span>
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
                        </ul>
                    </div>
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
    components: { Header },
    data() {
        return {
            isServerOpen: true,
        }
    },
    methods: {
        closeServer() {
            if (this.isServerOpen) {
                this.isServerOpen = !this.isServerOpen
            }
        },
        restartServer() {
            if (!this.isServerOpen) {
                this.isServerOpen = !this.isServerOpen
            }
        }
    }
}
</script>

<style scoped>
.jumbotron {
    background-color: #FFF;
}
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
#server-actions li, #server-card h6 {
    color: #C9893C;
}
span {
    cursor: pointer;
}
.unvailable-link {
    text-decoration: line-through;
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
    .jumbotron {
        padding: 0;
    }
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
