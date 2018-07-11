<template>
  <v-toolbar app>
		<v-toolbar-title @click="$router.push('/')">qMaker</v-toolbar-title>

    <v-spacer></v-spacer>
    <div>{{$root.currentUser.displayName || 'NoName'}}</div>
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition">
        <v-btn
          slot="activator"
          icon>
          <v-icon>more_vert</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile @click="$router.push('/profile')">
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logOut">
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Toolbar',
  methods: {
    logOut () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style>
.toolbar__title,
.toolbar__title:hover {
  cursor: pointer!important;
}
</style>
