<template>
    <div>
        <Header />

        <h1 class="pt-5">Heures de {{ firstnameProf }} {{ lastnameProf }}</h1>

        <div class="container-fluid">
            <div class="table-responsive">
                <table class="table mt-4">
                    <thead>
                    <th>Filières</th>
                    <th>Matières</th>
                    <th>Localisation</th>
                    </thead>
                    <tbody>
                    <tr v-for="cursus in getAllCourses()" :key="cursus">
                        <td>{{ cursus.filiere }}</td>
                        <td>{{ cursus.course }}</td>
                        <td>{{ cursus }}</td>
                    </tr>
                    </tbody>
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
                stats: []
            }
        },
        created() {
            axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/details/${this.firstnameProf}/${this.lastnameProf}`).then((response) => {
                console.log(response.data);
            })
            axios.get(`http://146.59.195.214:8006/api/v1/stats/teacher/events-grouped-by-categories/${this.firstnameProf}/${this.lastnameProf}`).then((response) => {
                this.stats = response.data
            })
        },
        methods: {
            getAllClasses() {
                return Object.keys(this.stats);
            },
            getAllCourses() {
                let courses = []
                for (let key of Object.keys(this.stats)) {
                    // console.log(this.getHoursByClasses(key))
                    for (let course of this.getAllCoursesByClasses(key)) {
                        courses.push({
                            filiere: key,
                            course: course,
                            stats: this.stats[key]
                        })
                    }
                }
                //console.log(courses)
                return courses
            },
            getAllCoursesByClasses(cursus) {
                let cursuses = []

                for (let stat of this.stats[cursus]) {
                    //console.log(stat.matiere)
                    let matiere = stat.matiere.trim()
                    if (matiere === "") {
                        matiere = "Pas de matière"
                    }
                    cursuses.push(matiere)
                }
                return cursuses.filter(this.getUniqueValues)
            },
            getAllStatsByClasses(cursus) {
                let cursuses = []
                let locations = []
                let types = []
                let durees = []
                let groups = []
                let dtStarts = []
                let dtEnds = []

                for (let stat of this.stats[cursus]) {
                    cursuses.push(stat.matiere)
                    locations.push(stat.location)
                    types.push(stat.type)
                    durees.push(stat.duree)
                    groups.push(stat.groupe)
                    dtStarts.push(stat.dtStart)
                    dtEnds.push(stat.dtEnd)
                }
                /*console.log(cursuses.filter(this.getUniqueValues))
                console.log(locations.filter(this.getUniqueValues))
                console.log(types.filter(this.getUniqueValues))
                console.log(durees.filter(this.getUniqueValues))
                console.log(groups.filter(this.getUniqueValues))
                console.log(dtStarts)
                console.log(dtEnds)*/
                return this.stats[cursus]
            },
            getHoursByClasses(cursus) {
                let hoursClasses = []
                for (let stat of this.stats[cursus]) {
                    console.log(stat)
                    if (stat.type === "CM") {

                    }
                    if (stat.type === "TD") {

                    }
                    if (stat.type === "TP") {

                    }
                }
                console.log(hoursClasses)
            },
            getUniqueValues(value, index, self) {
                return self.indexOf(value) === index;
            }
        }
    }
</script>

<style scoped>

</style>
