<template>
  <v-container>
    <v-card @keyup.enter.native="isModal = true">
      <v-card-title primary-title>
        <h3>Profile Settings</h3>
      </v-card-title>

      <v-flex padding>
        <v-text-field
          label="Email"
          v-model="userData.email">
        </v-text-field>

        <v-text-field
          label="Name"
          v-model="userData.displayName">
        </v-text-field>
      </v-flex>

       <v-card-actions>
         <v-btn @click="$router.push('/')">Back to Home</v-btn>
         <v-spacer></v-spacer>
         <v-btn color="success" @click="isModal = true">Update</v-btn>
       </v-card-actions>
    </v-card>

    <v-dialog
      max-width="500px"
      v-model="isModal">
        <v-card>
          <v-card-title>
            <h3>Enter your password</h3>
            <v-spacer></v-spacer>
            <v-icon @click="isModal = false">close</v-icon>
          </v-card-title>

          <v-container>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              autofocus
              @keyup.enter.native="reauthenticate">
            </v-text-field>

            <v-flex d-flex>
              <v-btn color="success" @click="reauthenticate">Confirm</v-btn>
            </v-flex>
          </v-container>
        </v-card>
    </v-dialog>

    <loader v-if="isLoading"/>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import Loader from '@/components/Loader'

export default {
  name: 'ProfileSettings',
  components: {
    Loader
  },
  data () {
    return {
      currentUser: {},
      userData: {},
      password: '',
      isModal: false,
      isLoading: false
    }
  },
  created () {
    this.currentUser = firebase.auth().currentUser
    this.userData = Object.assign({}, 
      {
        email: this.currentUser.email,
        displayName: this.currentUser.displayName || ''
      }
    )
  },
  methods: {
    updateUser () {
      let dbUsers = firebase.database().ref('users/' + this.currentUser.uid)

      // Update current user name, also in database in Users.userId.userName
      if (this.userData.displayName !== this.currentUser.displayName) {
        this.updateName(dbUsers)
      } else {
        this.$noty.info('You entered same name')
      }

      // Update current user email, also in database in Users.userId.email
      if (this.userData.email !== this.currentUser.email) {
        this.updateEmail(dbUsers)
      } else {
        this.$noty.info('You entered same email')
      }

      this.password = ''
      this.isLoading = false
      this.isModal = false
    },
    reauthenticate () {
      if (this.password.length === 0) {
        this.$noty.error('Password is required')
        return
      }
      this.isLoading = true

      // get credential
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email, 
        this.password
      )

      // Need to log in again in order to change email
      this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
        this.updateUser()
      }).catch(error => {
        this.$noty.error(error.message)
        this.isLoading = false
      })
    },
    updateName (database) {
      this.currentUser.updateProfile({displayName: this.userData.displayName}).then(() => {
        database.update({
          userName: this.userData.displayName
        })
        this.$noty.success('Name Updated')
      }).catch(err => {
        this.$noty.error(err.message)
      })
    },
    updateEmail (database) {
      this.currentUser.updateEmail(this.userData.email).then(() => {
        database.update({
          email: this.userData.email
        })
        this.$noty.success('Email updated, verification sended to new email')
      }).catch(err => {
        this.$noty.error(err.message)
      })
    }
  }
}
</script>

<style scoped>
.padding {
  padding: 15px;
}

i {
  cursor: pointer;
}
</style>
