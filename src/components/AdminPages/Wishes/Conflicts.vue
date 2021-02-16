<template>
    <div>
        <Header />
        <h1 class="pt-5">Gestion des conflits</h1>

        <div class="container">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <th>Filière</th>
                        <th>Matière</th>
                        <th>Professeurs</th>
                        <th>Choix final</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>MIAGE</td>
                        <td>FODO</td>
                        <td>Janodet | Zehraoui</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";

export default {
    name: "Conflicts",
    components: { Header },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>
