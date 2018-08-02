<template>
  <div>
    <v-layout row justify-center py-4>
      <div class="chart-wrapper">
        <bar-chart
          :chart-data="datacollection">
        </bar-chart>
      </div>
    </v-layout>

  <v-layout>
    <v-flex>
      <button @click="fillData()">Randomize</button>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import BarChart from '@/components/Statistics/BarChart.js'
import getStatistics from '@/mixins/getStatistics'

export default {
  name: 'QuestionsStatistics',
  mixins: [getStatistics],
  components: {
    BarChart,
  },
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.getData()
    this.fillData()
  },
  methods: {
    getData() {
      this.getStatistics().then(snapshot => {
        console.log(snapshot.val())
      })
    },
    fillData () {
      this.datacollection = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: 'Questions statistics',
            data: [10, 20, 3, 5, 2, 15, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)"
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          },
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  },
}
</script>
<style scoped>
.chart-wrapper {
  border: 1px solid red;
  padding: 10px;
  display: flex;
  max-width: 100%;
}
</style>
