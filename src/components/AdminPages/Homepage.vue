<template>
    <div>
        <Header />

        <div class="container pt-5">
            <div class="row">
                <div class="col-4">
                    <div id="server-card" class="card p-3">
                        <div id="server-icon">
                            <font-awesome-icon icon="server" size="5x" style="color: #C9893C" />
                        </div>
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

                <div class="col-4">
                    <div id="professor-card" class="card p-3">
                        <div id="professor-icon">
                            <font-awesome-icon icon="users" size="5x" style="color: #C9893C" />
                        </div>
                        <hr>

                        <ul id="professor-actions" class="text-left mr-auto ml-auto">
                            <li>
                                - <a href="">Gestion des enseignants</a>
                            </li>
                            <li>
                                - <a href="">Gestion des primes</a>
                            </li>
                            <li>
                                - <a href="">Gestion des heures effectuées</a>
                            </li>
                            <li>
                                - <a href="">Gestion des status</a>
                            </li>
                            <li>
                                - <a href="">Gestion des décharges</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-4">
                    <div id="studings-card" class="card p-3">
                        <div id="studings-icon">
                            <font-awesome-icon icon="book" size="5x" style="color: #C9893C" />
                        </div>
                        <hr>

                        <ul id="studings-actions" class="text-left mr-auto ml-auto">
                            <li>
                                - <a href="">Gestion des cursus</a>
                            </li>
                            <li>
                                - <a href="">Gestion des filières</a>
                            </li>
                            <li>
                                - <a href="">Gestion des origines</a>
                            </li>
                            <li>
                                - <a href="">Gestion des types de cours</a>
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
.card ul {
    list-style: none;
    padding: 5px 0 0;
}

#server-card, #studings-card {
    background-color: #D5D5D5;
}

#server-icon, #professor-icon, #studings-icon {
    border: 1px solid #B5B9D1;
    border-radius: 100%;
    background-color: #B5B9D1;
    padding: 15px;
    width: 50%;
    margin: 0 auto;
}

#server-card hr {
    margin-bottom: 0;
}

#server-actions li, #studings-actions li, #server-actions a, #studings-actions a{
    color: #344C80;
}

#professor-card {
    background-color: #344C80;
}

#professor-actions li, #professor-actions a {
    color: #C9893C;
}
</style>
