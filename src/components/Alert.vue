<template>
  <v-alert
    :type="type"
    :value="isOpen">
    <v-layout row>
      <v-flex d-flex align-center>You need to verify your email, to enable all functionality</v-flex>
      <v-flex text-end>
        <v-btn @click="sendConfirmEmail">Send confirmation email again</v-btn>
      </v-flex>
    </v-layout>
  </v-alert>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'success'
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sendConfirmEmail () {
      firebase.auth().currentUser.sendEmailVerification().then(() => {
        this.$noty.success('Letter Sended, check your email for verification')
      }).catch(err => {
        console.error(err.message)
      })
    }
  }
}
</script>

<style scoped>
  .text-end {
    text-align: end;
  }
</style>
