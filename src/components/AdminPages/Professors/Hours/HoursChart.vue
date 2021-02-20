<script>
    import { Doughnut } from 'vue-chartjs'

    export default {
        extends: Doughnut,
        name: "HoursChart",
        props: ['data', 'options'],
        mounted() {
            this.renderChart(this.data, {
                borderWidth: "10px",
                hoverBackgroundColor: "red",
                hoverBorderWidth: "10px"
            })
        }
    }
</script>

<style scoped>

</style>
