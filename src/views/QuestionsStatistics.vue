<template>
  <div>
    <v-layout row wrap justify-center pt-4>
      <v-flex d-flex xs12 md4 xl3 mb-3>
        <v-card class="chart-wrapper pa-2">
          <bar-chart
            :options="options"
            :chart-data="datacollection">
          </bar-chart>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 md8 xl9 mb-3>
        <v-card class="pa-2 question-card">
          <single-question-statistics 
            v-if="questions[currentQuestion]"
            :questionInfo="questions[currentQuestion]" />

          <h1 v-else class="display-2 text-center mt-3">
            Select question
          </h1>
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
import BarChart from '@/components/Statistics/BarChart'
import DoughnutChart from '@/components/Statistics/DoughnutChart'
import Statistics from '@/mixins/Statistics'
import QuestionPreview from '@/components/Statistics/QuestionPreview'
import SingleQuestionStatistics from '@/components/Statistics/SingleQuestionStatistics'

export default {
  name: 'QuestionsStatistics',
  mixins: [Statistics],
  components: {
    BarChart,
    DoughnutChart,
    QuestionPreview,
    SingleQuestionStatistics,
  },
  data () {
    return {
      datacollection: null,
      completionRate: 0,
      currentQuestion: -1,
      questions: [],
      options: {},
    }
  },
  mounted () {
    this.setInitialData()
  },
  methods: {
    selectQuestion(index) {
      this.currentQuestion = index
      let stats = this.questions[index].answers.reduce((prev, curr) => {
        return [...prev, curr.timesSelected]
      }, [])

      const labels = Object.keys(this.questions[index].answers).map((e) => {
        return `№ ${parseInt(e) + 1}`
      })

      const data = {
        labels,
        data: stats,
        label: `Question ${index + 1}`
      }

      this.fillData(data)
    },
    setInitialData() {
      this.getStatistics().then(snapshot => {
        const value = snapshot.val()
        const data = {
          labels: ['Started', 'Finished'],
          data: [value.wasStarted, value.wasFinished],
          label:  'Completion rate',
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
            data: [...data.data, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
          },
        ],
      }

      this.options = {
        tooltips: {
          enabled: true,
        },
        title: {
          display: true,
          text: data.label,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Times Selected',
                fontSize: 14,
              },
              // gridLines: {
              //   display: false,
              //   drawBorder: false,
              // },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Answers',
                fontSize: 14
              },
              // gridLines: {
              //   display: false,
              //   drawBorder: false,
              // },
            },
          ],
        },
      }
    },
  },
}
</script>
<style scoped>
  .chart-wrapper {
    max-width: 100%;
  }

  @media screen and (min-width: 1200px){
    .question-card {
      min-height: 460px;
    }
  }
</style>
