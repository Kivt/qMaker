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
          INTRO AND END PAGES
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
import firebase from 'firebase'

export default {
  name: 'CreateQuestions',
  components: {
    QuestionBuilder,
    Indicator,
    FloatingButton,
    Settings
  },
  data: () => ({
    activeQuestion: 0,
    currentTab: 'settings',
    qInfo: {
      name: '',
      type: 'public',
      dueTo: null,
      intro: {
        introText: '',
        introBg: ''
      },
      endPage: {
        text: '',
        endBg: ''
      },
      questions: [
        {
          question: '',
          image: '',
          maxRating: 3,
          timeForAnswer: 0,
          id: 'q-' + Date.now(),
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
        image: '',
        maxRating: 2,
        timeForAnswer: 0,
        id: 'q-' + Date.now(),
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
      let author = this.$root.currentUser.uid

      firebase.database().ref().child('question_sets').update({
        [Date.now()]: {...this.qInfo, author}
      }, () => {
        this.$noty.success('Question list saved')
        this.$router.push({name: 'Home'})
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
