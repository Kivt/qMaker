<template>
  <v-speed-dial
    transition="slide-y-reverse-transition"
    :fixed="true"
    :top="false"
    :bottom="true"
    :left="false"
    :right="true"
    direction="top"
    v-model="isSettingsOpen">
    <v-btn
      slot="activator"
      v-model="isSettingsOpen"
      color="blue darken-2"
      dark
      fab>
      <v-icon>settings</v-icon>
      <v-icon>close</v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      small
      color="green">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      small
      color="indigo">
      <v-icon>add</v-icon>
    </v-btn>

    <v-tooltip left>
      <v-btn
        fab
        dark
        slot="activator"
        small
        @click="$emit('save')"
        color="red">
        <v-icon>save</v-icon>
      </v-btn>
      <span>Save questions set</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'FloatingButton',
  data: () => ({
    isSettingsOpen: false
  })
}
</script>
