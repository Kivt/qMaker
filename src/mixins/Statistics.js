import firebase from 'firebase'

export default {
  methods: {
    getStatistics() {
      return firebase.database().ref(`/statistics/${this.$route.params.id}`).once('value').catch(() => {
        this.$noty.error('Can\'t get statistics')
      })
    },
    onStatisticsChange(callback) {
      return firebase .database().ref(`/statistics/${this.$route.params.id}`).on('value', snapshot => {
        callback(snapshot.val())
      })
    },
  },
};