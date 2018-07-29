<template>
  <v-container fluid>
    <v-card>
      <v-tabs
      centered
      color="blue-grey lighten-5"
      fixed-tabs
      v-model="currentTab">
      <v-tab
        key="settings">
        Settings  
      </v-tab>

      <v-tab
        key="questions">
        Questions
      </v-tab>

      <v-tab
        key="intro-end">
        Intro / End Page
      </v-tab>

        <v-tab-item
          class="height-full-screen mt-3"
          key="settings">
          <settings :questionData="qInfo" />
        </v-tab-item>

        <v-tab-item
          class="height-full-screen mt-3"
          key="questions">
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
        </v-tab-item>

        <v-tab-item
          class="height-full-screen mt-3"
          key="intro-end">
          <intro-end-pages :questionData="qInfo" />
        </v-tab-item>
      </v-tabs>
    </v-card>

    <floating-button  @save="saveQuestionSet" />
  </v-container>
</template>

<script>
import QuestionBuilder from '@/components/CreateQuestion/QuestionBuilder'
import Indicator from '@/components/CreateQuestion/QuestionsIndicator'
import FloatingButton from '@/components/CreateQuestion/FloatButton'
import Settings from '@/components/CreateQuestion/Settings'
import IntroEndPages from '@/components/CreateQuestion/IntroEndPages'
import firebase from 'firebase'

export default {
  name: 'CreateQuestions',
  components: {
    QuestionBuilder,
    Indicator,
    FloatingButton,
    Settings,
    IntroEndPages,
  },
  data: () => ({
    activeQuestion: 0,
    currentTab: 'settings',
    qInfo: {
      name: '',
      type: 'public',
      dueTo: null,
      intro: {
        text: '',
        bg: true
      },
      endPage: {
        text: '',
        bg: true
      },
      questions: [
        {
          question: '',
          maxRating: 3,
          required: 'not required',
          answerType: 'single',
          answers: []
        },
      ],
    },
  }),
  methods: {
    addQuestion () {
      const newQuestion = {
        question: '',
        maxRating: 3,
        required: 'not required',
        answerType: 'single',
        answers: []
      }

      this.qInfo.questions.push(newQuestion)
    },
    addAnswer () {
      this.qInfo.questions[this.activeQuestion].answers.push({answer: ''})
    },
    createStatistics(id) {
      firebase.database().ref().child('statistics').update({
        [id]: {
          wasStarted: 0,
          wasFinished: 0
        }
      }, () => {
        this.$router.push('/')
      })
    },
    saveQuestionSet () {
      let author = this.$root.currentUser.uid
      let id = Date.now()

      firebase.database().ref().child('question_sets').update({
        [id]: {...this.qInfo, author}
      }, () => {
        this.$noty.success('Question list saved')
        this.createStatistics(id)
      })
    },
  },
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
