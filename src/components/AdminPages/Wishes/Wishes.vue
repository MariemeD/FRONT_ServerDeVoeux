<template>
    <div>
        <Header />
        <h1 class="pt-5">Gestion des voeux</h1>

        <div class="container">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <th>Filière</th>
                        <th>Matière</th>
                        <th>Professeur</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MIAGE</td>
                            <td>FODO</td>
                            <td>Janodet</td>
                            <td>En attente</td>
                            <td>
                                <button class="btn btn-outline-success mr-1" @click="acceptWish">
                                    Accepter <font-awesome-icon icon="check-circle" />
                                </button>
                                |
                                <button class="btn btn-outline-danger" @click="refuseWish">
                                    Refuser <font-awesome-icon icon="times-circle" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from "axios";

export default {
    name: "Wishes",
    components: { Header },
    data() {
        return {
            requests: [],
            professorsOfFiliere: []
        }
    },
    created() {

    },
    methods: {
        acceptWish(request) {
            const acceptedRequest = request
            acceptedRequest.status = 'Acceptée'
            axios.put("", acceptedRequest).then()
        },
        refuseWish() {

        }
    }
}
</script>

<style scoped>

</style>
