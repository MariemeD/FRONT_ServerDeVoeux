<template>
    <div>
        <Header />
        <h1 :class="{'pt-5': $cookies.get('emailProfessor')}" v-if="this.$route.params.conflicts === 'conflits'">Gestion des conflits</h1>
        <h1 :class="{'pt-5': $cookies.get('emailProfessor')}" v-else>Gestion des voeux</h1>

        <div class="container" v-if="$cookies.get('emailProfessor')">
            <div class="progress mt-4" v-if="isLoading">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%; background-color: #536895"></div>
            </div>
                <RequestTable
                    :conflicts="getRequestsForFiliere().conflicts"
                    :requests="getRequestsForFiliere().requests"
                    :is-conflicts="this.$route.params.conflicts === 'conflits'" v-else />
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import RequestTable from "@/components/AdminPages/Wishes/RequestTable";
import axios from "axios";

export default {
    name: "Wishes",
    components: { Header, RequestTable },
    data() {
        return {
            requests: [],
            isLoading: true
        }
    },
    created() {
        axios.get("https://back-serverdevoeux.herokuapp.com/api/requests").then(response => {
            for (let request of response.data.filter(request => request.status === "En attente")) {
                let name = ""
                for (let eltName of request.requestor.split(" ")) {
                    name += this.capitalizeTextElement(eltName) + " "
                }
                request.requestor = name
                this.requests.push(request)
            }
            this.isLoading = false
        })
    },
    methods: {
        getRequestsForFiliere() {
            let requestsForFiliere = []
            if (this.$cookies.get('profile') === 'responsable' ) {
                requestsForFiliere = this.requests.filter(request => request.groupRequested === this.$cookies.get("groupProfessor"))
            } else {
                requestsForFiliere = this.requests
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
        capitalizeTextElement(element) {
            const firstLetter = element[0].toUpperCase()
            const rest = element.toLowerCase().substring(1)
            return firstLetter + rest
        }
    }
}
</script>

<style scoped>

</style>
