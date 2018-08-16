<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card
          class="elevation-12"
          @keyup.enter.native="sendRecoveryLetter">
          <v-toolbar dark color="primary" class="text-xs-center">
            <v-toolbar-title>Password Recovery</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/login" class="white--text">Back to Login</router-link>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mail"
                name="email"
                label="Email"
                hint="We will send letter with instructions to this email"
                type="email"
                v-model="email">
              </v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              @click="sendRecoveryLetter">
              Send Email
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
   </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'PassRecovery',
  data: () => ({
    email: ''
  }),
  methods: {
    sendRecoveryLetter () {
      if (this.validate()) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          this.$noty.success('Email was sended. Check your mailbox')
        }).catch((error) => {
          this.$noty.error(error.message)
        })
      }
    },
    validate() {
      if (!this.email) {
        this.$noty.error('Email is required')
        return false
      }

      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.$noty.error('Email is badly formatted')
        return false
      }

      return true
    }
  }
}
</script>

