<template>
    <div>
        <Header />
        <h1 class="pt-5">Heures de {{ firstnameProf }} {{ lastnameProf }}</h1>

        {{ statsTest }}
        {{ testSetFilieres() }}

        <div class="container-fluid">
            <div class="table-responsive">
                <table class="table table-striped mt-4">
                    <thead>
                    <th>Filières</th>
                    <th>Matières</th>
                    <th>CM effectué / CM totaux</th>
                    <th>TD effectué / TD totaux</th>
                    <th>TP effectué / TP totaux</th>
                    </thead>
                    <tbody>
                    <tr v-for="(hours, key) in statsTest" :key="key">
                        <td>{{ getFiliereForCourse(key) }}</td>
                        <td>{{ key }}</td>
                        <td>{{ hours.cmDone }}h / {{ hours.cmTotal }}h</td>
                        <td>{{ hours.tdDone }}h / {{ hours.tdDone }}h</td>
                        <td>{{ hours.tpDone }}h / {{ hours.tpDone }}h</td>
                    </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">Total heures:</td>
                            <td>CM</td>
                            <td>CM</td>
                            <td>CM</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from "axios";

export default {
    name: "HoursMadeDetails",
    components: { Header },
    data() {
        return {
            lastnameProf: this.$route.params.lastnameProf,
            firstnameProf: this.$route.params.firstnameProf,
            stats: [],
            statsTest: [],
            statsTest2: []
        }
    },
    created() {
        axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/matieres/${this.firstnameProf}/${this.lastnameProf}`).then((response) => {
            console.log(response.data)
            for (let stat in response.data) {
                console.log(stat)
                this.statsTest2.push(response.data[stat])
            }
            this.statsTest = response.data
        })
        axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/events-grouped-by-categories/${this.firstnameProf}/${this.lastnameProf}`).then((response) => {
            this.stats = response.data
        })
    },
    methods: {
        getFiliereForCourse(course) {
            let filieres = []
            for (let stat in this.stats) {
                if (this.stats[stat].find(m => m.matiere === course)) {
                    filieres.push(stat)
                }
            }
            this.statsTest[course].filieres = filieres
            //console.log(this.statsTest)
            return filieres
        },
        testSetFilieres() {
            for (let stat in this.stats) {
                console.log(stat)
                console.log(this.stats[stat])
            }
        }
    },
    computed: {
        sortedHours() {
            if (this.statsTest) {
                for (let stat of this.statsTest) {
                    console.log(stat)
                    this.getFiliereForCourse(stat)
                }
            }
            return this.statsTest.slice().sort((a, b) => {
                let modifier = 1
                if(this.currentSortDirection === 'desc') modifier = -1
                if(a.filieres.toLowerCase() < b.filieres.toLowerCase()) return -1 * modifier
                if(a.filieres.toLowerCase() > b.filieres.toLowerCase()) return modifier
                return 0;
            });
        }
    }
}
</script>

<style scoped>

</style>
