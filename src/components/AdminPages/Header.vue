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
                        <span class="badge badge-request" v-if="getRequestsForFiliere().requests.length > 0">{{ getRequestsForFiliere().requests.length }}</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'conflict-wishes', params: {conflicts: 'conflits'} }">
                        Gestion des conflits
                        <span class="badge badge-conflict" v-if="getRequestsForFiliere().conflicts.length > 0">{{ getRequestsForFiliere().conflicts.length }}</span>
                    </router-link>
                </li>
            </ul>
            <a class="nav-link my-2 my-lg-0" @click="logout">Déconnexion</a>
        </div>
    </nav>
</template>

<script>
import axios from "axios";

export default {
    name: "Header",
    data() {
        return {
            requests: [],
            conflicts: [],
            professorsOfFiliere: [],
        }
    },
    created() {
        axios.get("https://back-serverdevoeux.herokuapp.com/api/requests").then(response => {
            for (let request of response.data.filter(request => request.status === "En attente")) {
                request.requestor = request.requestor.toLowerCase().trim()
                this.requests.push(request)
            }
        })
        axios.get("http://146.59.195.214:8006/api/v1/events/teachers/M2MIAA").then(response => {
            for (let prof of response.data) {
                this.professorsOfFiliere.push(prof.toLowerCase().trim())
            }
        })
    },
    methods: {
        getRequestsForFiliere() {
            let requestsForFiliere = []
            for (let request of this.requests.filter(req => req.status === "En attente")) {
                if (this.professorsOfFiliere.includes(request.requestor)) {
                    requestsForFiliere.push(request)
                }
            }
            let conflictedRequest = []
            // https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects/53212154
            let duplicateIds = requestsForFiliere
                .map(e => e['courseRequested'])
                .map((e, i, final) => final.indexOf(e) !== i && i)
                .filter(obj=> requestsForFiliere[obj])
                .map(e => requestsForFiliere[e]["courseRequested"])
            conflictedRequest = requestsForFiliere.filter(obj=> duplicateIds.includes(obj["courseRequested"]));
            return {
                requests: requestsForFiliere.filter(allReq => !conflictedRequest.includes(allReq)),
                conflicts: conflictedRequest
            }
        },
        logout() {
            this.$cookies.remove("emailProfessor")
            this.$cookies.remove("FnameProfessor")
            this.$cookies.remove("LnameProfessor")
            this.$cookies.remove("idUser")
            this.$cookies.remove("profile")
            this.$router.push("/login")
        }
    },
    updated() {
        axios.get("https://back-serverdevoeux.herokuapp.com/api/requests").then(response => {
            for (let request of response.data) {
                request.requestor = request.requestor.toLowerCase().trim()
            }
            this.requests = response.data.filter(request => request.status === "En attente")
        }).catch(error => {
            console.error("Error on updating Header component")
            console.error(error)
        })
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

.badge-request {
    background-color: #C9893C;
}

.badge-conflict {
    background-color: #b54444;
    color: #2c3e50;
}
</style>
