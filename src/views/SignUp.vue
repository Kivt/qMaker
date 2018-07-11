<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/login" class="white--text">Back to Login</router-link>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mail"
                name="Signup"
                label="Email"
                type="email"
                v-model="user.email">
              </v-text-field>

              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="user.password">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signUp">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then((user) => {
        firebase.database().ref('users/' + user.user.uid).set({
          email: user.user.email,
          userId: user.user.uid,
          userName: 'NoName'
        })
        user.user.sendEmailVerification().then(() => {
          this.$noty.success('User created, check your email for verification')
          this.$router.replace('/')
        }).catch(err => {
          this.$noty.error(err.message)
        })
      }).catch((err) => {
        this.$noty.error(err.message)
      })
    }
  }
}
</script>
