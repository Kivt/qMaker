<template>
  <div>
    <div v-if="isAvailable">
      <intro-end-page
        v-if="state === 0"
        @start="startTest"
        :start="true"
        :pageData="qSetData.intro" />

      <take-questions
        v-if="state === 1"
        @endTest="state = 2"
        :questions="qSetData.questions"/>

      <intro-end-page
        v-if="state === 2"
        @start="startTest"
        :start="false"
        :pageData="qSetData.endPage" />
    </div>

    <div
      v-if="!isAvailable && isReady"
      class="msg-holder">
      <div class="display-3">
        This question set is not available anymore
      </div>

      <v-btn
        color="warning"
        @click="$router.push('/')"
        large>
        Back To Home
      </v-btn>
    </div>

    <loader v-if="!isReady" />
  </div>
</template>

<script>
import firebase from 'firebase'
import IntroEndPage from '@/components/TakeTest/IntroEndPage'
import TakeQuestions from '@/components/TakeTest/TakeQuestions'
import Statistics from '@/mixins/Statistics'
import Loader from '@/components/Loader'

export default {
  name: 'TakeTest',
  components: {
    IntroEndPage,
    TakeQuestions,
    Loader,
  },
  mixins: [Statistics],
  data: () => ({
    qSetData: {},
    state: 0,
    isReady: false,
    isAvailable: false,
  }),
  created() {
    this.getQuestionSetData()
  },
  methods: {
    isStillAvailable() {
      let today = new Date()
      let dueDate = new Date(this.qSetData.dueTo)
      this.isAvailable = today < dueDate
    },
    getQuestionSetData() {
      firebase.database().ref('/question_sets/' + this.$route.params.id).once('value')
      .then((snapshot) => {
        this.qSetData = snapshot.val()
        this.isStillAvailable()
        this.isReady = true
      })
      .catch((err) => {
        console.error(err.message)
        this.$noty.error('Can\'t get questions')
        this.isReady = true
      })
    },
    startTest() {
      this.getAndUpdateStatistics()
      this.state++
    },
    getAndUpdateStatistics() {
      this.getStatistics().then(snapshot => {
        this.updateStatistics(snapshot.val() || {})
      })
    },
    updateStatistics(oldStat) {
      firebase.database().ref(`statistics`).update({
        [this.$route.params.id]: {
          ...oldStat,
          wasStarted: oldStat.wasStarted + 1
        }
      })
    },
  },
}
</script>

<style scoped>
.msg-holder {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
