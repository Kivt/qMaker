<template>
  <div>
    <div v-if="isAvailable">
      <start-page
        v-if="state === 0"
        @start="startTest"
        :introData="qSetData.intro" />

      <take-questions
        v-if="state === 1"
        @selectAnswer="selectAnswer($event.qIndex, $event.index, $event.newValue)"
        :questions="qSetData.questions"/>
    </div>

    <div
      v-else
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
  </div>
</template>

<script>
import firebase from 'firebase'
import StartPage from '@/components/TakeTest/StartPage'
import TakeQuestions from '@/components/TakeTest/TakeQuestions'

export default {
  name: 'TakeTest',
  components: {
    StartPage,
    TakeQuestions,
  },
  data: () => ({
    qSetData: {},
    state: 0,
    isAvailable: true,
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
      })
      .catch((err) => {
        this.$noty.error('Network error')
      })
    },
    startTest() {
      this.state++
      this.getAndUpdateStatistics()
    },
    getAndUpdateStatistics() {
      firebase.database().ref(`/statistics/${this.$route.params.id}`).once('value')
      .then((snapshot) => {
        this.updateStatistics(snapshot.val() || {})
      })
      .catch((err) => {
        this.$noty.error('Cant get statistct')
      })
    },
    updateStatistics(oldStat) {
      firebase.database().ref(`statistics`).update({
        [this.$route.params.id]: {
          ...oldStat,
          wasStarted: (parseInt(oldStat.wasStarted || 0)) + 1
        }
      })
    }
  }
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
