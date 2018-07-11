<template>
  <v-container>
    <v-layout>
      <v-flex px-0>
        <indicator
          @select="activeQuestion = $event"
          @create="addQuestion"
          :active="activeQuestion"
          :isCreateButton="true"
          :amount="qInfo.questions.length" />
      </v-flex>
    </v-layout>
      
    <question-builder
      :questionData="qInfo.questions[activeQuestion]"
      @addAnswer="addAnswer"
      class="question-wrapper"/>

      <v-speed-dial
        transition="slide-y-reverse-transition"
        :fixed="true"
        :top="false"
        :bottom="true"
        :left="false"
        :right="true"
        direction="top"
        v-model="isSettingsOpen">
          <v-btn
            slot="activator"
            v-model="isSettingsOpen"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon>settings</v-icon>
            <v-icon>close</v-icon>
          </v-btn>

           <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-tooltip left>
        <v-btn
          fab
          dark
          slot="activator"
          small
          @click="saveQuestionSet"
          color="red">
          <v-icon>save</v-icon>
        </v-btn>
        <span>Save questions set</span>
      </v-tooltip>
      </v-speed-dial>
  </v-container>
</template>

<script>
import QuestionBuilder from '@/components/QuestionBuilder'
import Indicator from '@/components/QuestionsIndicator'
import firebase from 'firebase'

export default {
  name: 'CreateQuestions',
  components: {
    QuestionBuilder,
    Indicator
  },
  data: () =>  ({
    activeQuestion: 0,
    qType: 'public',
    isSettingsOpen: false,
    qInfo: {
      introText: 'intro text',
      questions: [
        {
          question: '',
          maxRating: 2,
          required: 'not required',
          answerType: 'single',
          answers: []
        }
      ]
    }
  }),
  methods: {
    addQuestion () {
      const newQuestion = {
        question: '',
        maxRating: 2,
        required: 'not required',
        answerType: 'single',
        answers: []
      }

      this.qInfo.questions.push(newQuestion)
    },
    addAnswer () {
      this.qInfo.questions[this.activeQuestion].answers.push({answer: ''})
    },
    saveQuestionSet () {
      firebase.database().ref().child('questions').child(this.qType).update({
        [Date.now()]: this.qInfo
      }, () => {
        this.$noty.success('Question list saved')
      })
    }
  }
}
</script>

<style scoped>
.question-wrapper {
  margin-top: 1.5rem;
}

.text-end {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 767px) {
  .text-end {
    margin-top: 15px;
  }
}
</style>
