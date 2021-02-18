<template>
    <div>
        <Header />
        <h1 class="pt-5" v-if="this.$route.params.conflicts === 'conflits'">Gestion des conflits</h1>
        <h1 class="pt-5" v-else>Gestion des voeux</h1>

        <div class="container">
                <RequestTable
                    :conflicts="getConflictedRequests()"
                    :requests="requests"
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
        this.callRequests()
        axios.get("http://146.59.195.214:8006/api/v1/events/teachers/M2MIAA").then(response => {
            for (let prof of response.data) {
                this.professorsOfFiliere.push(prof.toLowerCase().trim())
            }
        })
    },
    methods: {
        callRequests() {
            let requests = []
            axios.get("https://back-serverdevoeux.herokuapp.com/api/requests").then(response => {
                for (let request of response.data) {
                    if (request.status === "En attente") {
                        //request.requestor = request.requestor
                        if (this.professorsOfFiliere.includes(request.requestor.toLowerCase().trim())) {
                            //request.requestor = this.capitalizeTextElement(request.requestor)
                            this.requests.push(request)
                            requests.push(request)
                        }
                    }
                }
            })

            let duplicateIds = requests
                .map(e => e['courseRequested'])
                .map((e, i, final) => final.indexOf(e) !== i && i)
                .filter(obj=> requests[obj])
                .map(e => requests[e]["courseRequested"])
            let conflictedRequest = requests.filter(obj=> duplicateIds.includes(obj["courseRequested"]));
            console.log(requests)
            console.log(conflictedRequest)
            //return conflictedRequest
        },
        getRequestsForFiliere() {
            let requestsForFiliere = []
            for (let request of this.requests.filter(req => req.status === "En attente")) {
                if (this.professorsOfFiliere.includes(request.requestor)) {
                    requestsForFiliere.push(request)
                }
            }
            const uniqueValues = new Set(requestsForFiliere.map(v => v.courseRequested));
            let duplicates = [...requestsForFiliere]
            //console.log(duplicates)
            uniqueValues.forEach((item) => {
                const i = duplicates.findIndex(v => v.courseRequested === item)
                duplicates = duplicates
                    .slice(0, i)
                    .concat(duplicates.slice(i + 1, duplicates.length))
            })
            //console.log(duplicates)
            //console.log(uniqueValues)
            return requestsForFiliere;
        },
        getConflictedRequests() {
            let conflictedRequest = []
            // https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects/53212154
            let duplicateIds = this.requests
                .map(e => e['courseRequested'])
                .map((e, i, final) => final.indexOf(e) !== i && i)
                .filter(obj=> this.requests[obj])
                .map(e => this.requests[e]["courseRequested"])
            conflictedRequest = this.requests.filter(obj=> duplicateIds.includes(obj["courseRequested"]));
            return conflictedRequest
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
