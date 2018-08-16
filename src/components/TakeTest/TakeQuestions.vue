<template>
  <div class="py-2">
    <v-layout mb-3>
      <v-flex>
        <v-card class="py-2">
          <indicator
            @select="selectQuestion($event)"
            :active="activeQuestion"
            :isCreateButton="false"
            :errors="isValidated ? emptyIndexes : []"
            :amount="questions.length" />
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <transition :name="transitionName">
          <v-card v-if="isVisible" class="px-2">
            <single-question
              :answer="answers[activeQuestion]"
              :questionData.sync="questions[activeQuestion]" />

            <v-card-actions class="mt-auto">
              <v-btn
                @click="selectQuestion(activeQuestion - 1)"
                :disabled="activeQuestion === 0">
                Prev
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                v-show="activeQuestion < (questions.length - 1)"
                @click="selectQuestion(activeQuestion + 1)">
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
        </transition>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Indicator from '@/components/CreateQuestion/QuestionsIndicator'
import SingleQuestion from '@/components/TakeTest/SingleQuestion'
import Statistics from '@/mixins/Statistics'
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
  mixins: [Statistics],
  data: () => ({
    activeQuestion: 0,
    isVisible: true,
    isValidated: false,
    transitionName: 'slide-x-transition',
    answers: [],
    questionInfoHeight: 0
  }),
  computed: {
    emptyIndexes() {
      // array, contains all not unanswered & required questions
      return this.questions.reduce((result, el, index) => {
        if (el.required === 'required' && this.answers[index].selectedAnswers.length === 0) {
          result.push(index)
        }
        return result
      }, [])
    }
  },
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
      if (this.validateTest()) {
        this.getStatistics().then(snapshot => {
          this.updateStatistics(snapshot.val() || {})
          this.$emit('endTest')
        })
      }
    },
    selectQuestion(newIndex) {
      if (newIndex !== this.activeQuestion) {
        this.transitionName = newIndex > this.activeQuestion ? 'slide-x-reverse-transition' : 'slide-x-transition'
        this.isVisible = false
        this.activeQuestion = newIndex
        setTimeout(() => {
          this.isVisible = true
        }, 100)
      }
    },
    validateTest () {
      let isValid = true
      this.emptyIndexes.forEach((el, index) => {
        this.$noty.error(`Question ${el + 1} is required`)
        isValid = false
      })
      this.isValidated = true

      return isValid
    },
    updateStatistics(oldStat) {
      let newQuestions = oldStat.questions.map((question, qIndex) => {
        this.answers[qIndex].selectedAnswers.forEach((el) => {
          question.answers[el].timesSelected += 1
        })

        return question
      })

      firebase.database().ref(`statistics`).update({
        [this.$route.params.id]: {
          ...oldStat,
          questions: newQuestions,
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
