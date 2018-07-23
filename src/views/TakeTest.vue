<template>
  <div>
    Take test
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'TakeTest',
  data: () => ({
    testData: {},
  }),
  created() {
    firebase.database().ref('/question_sets/' + this.$route.params.id).once('value')
    .then((snapshot) => {
      this.testData = snapshot.val()
    })
    .catch((err) => {
      console.error(err)
      this.$noty.error('Network error')
    })
  }
}
</script>
