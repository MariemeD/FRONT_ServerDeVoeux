<template>
    <div>
        <Header />
        <h1 class="pt-5" v-if="this.$route.params.conflicts === 'conflits'">Gestion des conflits</h1>
        <h1 class="pt-5" v-else>Gestion des voeux</h1>

        <div class="container">
                <RequestTable
                    :conflicts="getRequestsForFiliere().conflicts"
                    :requests="getRequestsForFiliere().requests"
                    :is-conflicts="this.$route.params.conflicts === 'conflits'" />
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
            professorsOfFiliere: [],
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
            for (let request of this.requests) {
                if (this.professorsOfFiliere.includes(request.requestor.toLowerCase().trim())) {
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
