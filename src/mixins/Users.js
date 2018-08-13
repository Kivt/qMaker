import firebase from 'firebase'

export default {
  methods: {
    getUserInfo (id) {
      // returns promise
      return firebase.database().ref(`/users/${id}`).once('value').catch(() => {
        this.$noty.error('Can\'t get user info')
      })
    },
    pushNewQuestion (newQuestions, callback) {
      return firebase.database().ref(`/users/${this.$root.currentUser.uid}`).update({
        questions: newQuestions
      }, () => {
        if (callback) {
          callback()
        }
      })
    }
  }
}