<template>
  <div class="py-2">
    <v-layout mb-3>
      <v-flex>
        <v-card class="py-2">
          <indicator
            @select="activeQuestion = $event"
            :active="activeQuestion"
            :isCreateButton="false"
            :amount="questions.length" />
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-card class="px-2">
          <single-question
            :answer="answers[activeQuestion]"
            :questionData.sync="questions[activeQuestion]" />

          <v-card-actions>
            <v-btn
              @click="activeQuestion -= 1"
              :disabled="activeQuestion === 0">
              Prev
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              v-show="activeQuestion < (questions.length - 1)"
              @click="activeQuestion += 1">
              Next
            </v-btn>

            <v-btn
              color="success"
              v-show="activeQuestion === (questions.length - 1)"
              @click="finishTest">
              Finish
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Indicator from '@/components/CreateQuestion/QuestionsIndicator'
import SingleQuestion from '@/components/TakeTest/SingleQuestion'
import getStatistics from '@/mixins/getStatistics'
import firebase from 'firebase'

export default {
  name: 'TakeQuestions',
  components: {
    Indicator,
    SingleQuestion,
  },
  props: {
    questions: {
      type: Array,
      default: () => ([]),
    },
  },
  mixins: [getStatistics],
  data: () => ({
    activeQuestion: 0,
    answers: [],
  }),
  created() {
    this.createAnswers()
    this.$bus.$on('starClick', event => {
      this.$set(this.answers[this.activeQuestion].selectedAnswers, event.position, event.newValue)
    })
    this.$bus.$on('multipleChange', event => {
      this.$set(this.answers[this.activeQuestion], 'selectedAnswers', event)
    })
  },
  methods: {
    finishTest() {
      this.getStatistics().then(snapshot => {
        this.updateStatistics(snapshot.val() || {})
        this.$emit('endTest')
      })
    },
    updateStatistics(oldStat) {
      firebase.database().ref(`statistics`).update({
        [this.$route.params.id]: {
          ...oldStat,
          wasFinished: oldStat.wasFinished + 1
        }
      })
    },
    createAnswers() {
      this.questions.forEach(() => {
        this.answers.push({
          selectedAnswers: [],
          message: '',
        })
      });
    },
  },
}
</script>

