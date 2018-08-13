<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card
          class="elevation-12"
          @keyup.enter.native="logIn">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>

            <v-spacer></v-spacer>

            <router-link
              to="/signup"
              class="white--text">
              Have no account? Sign Up
            </router-link>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="mail" name="email" label="Email" type="email" v-model="user.email"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="user.password"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              @click="$router.push('/recovery')"
              flat>
              Forgot Password?
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              @click="logIn">
              Login
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
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    logIn () {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
        this.$noty.success('Login Successfull')
        this.$router.replace('/')
      }).catch(err => {
        this.$noty.error(err.message)
      })
    }
  }
}
</script>
