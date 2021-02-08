<template>
    <div>
        <Header />

        <h1 class="pt-5">Gestion des voeux</h1>

        <div class="container pt-3">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <th>Filière</th>
                    <th>Matière</th>
                    <th>Professeur</th>
                    <th>Conflit</th>
                    <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>M2 MIAGE A</td>
                        <td>FODO</td>
                        <td>Monsieur JANODET</td>
                        <td>Non</td>
                        <td>
                            Accepter -
                            Refuser
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

    export default {
        name: "HandleWishes",
        components: { Header }
    }
</script>

<style scoped>

</style>
