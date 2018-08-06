<template>
  <div>
    <v-layout row wrap justify-center pt-4>
      <v-flex d-flex xs12 md4 xl3 mb-3>
        <v-card class="chart-wrapper pa-2">
          <bar-chart
            :chart-data="datacollection">
          </bar-chart>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 md8 xl9 mb-3>
        <v-card class="pa-2">
          <single-question-statistics 
            :questionInfo="questions[currentQuestion]"/>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center>
      <question-preview
        @click="selectQuestion($event)"
        :currentQuestion="currentQuestion"
        :questions="questions" />
    </v-layout>
  </div>
</template>

<script>
import BarChart from '@/components/Statistics/BarChart.js'
import Statistics from '@/mixins/Statistics'
import QuestionPreview from '@/components/Statistics/QuestionPreview'
import SingleQuestionStatistics from '@/components/Statistics/SingleQuestionStatistics'

export default {
  name: 'QuestionsStatistics',
  mixins: [Statistics],
  components: {
    BarChart,
    QuestionPreview,
    SingleQuestionStatistics,
  },
  data () {
    return {
      datacollection: null,
      completionRate: 0,
      currentQuestion: 0,
      questions: [],
    }
  },
  mounted () {
    this.setInitialData()
  },
  methods: {
    selectQuestion(index) {
      this.currentQuestion = index
    },
    setInitialData() {
      this.getStatistics().then(snapshot => {
        const value = snapshot.val()
        const data = {
          labels: ['Started', 'Finished'],
          data: [value.wasStarted, value.wasFinished],
          label:  'Questions statistics',
        }
        this.questions = value.questions
        this.fillData(data)
      })
    },
    fillData (data) {
      this.datacollection = {
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            data: [...data.data, 0, 10],
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
        ],
         options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      }
    },
  },
}
</script>
<style scoped>
.chart-wrapper {
  max-width: 100%;
}
</style>
