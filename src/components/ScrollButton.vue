<template>
  <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="true"
      transition="scale"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
  name: 'ScrollButton',
  props: {
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: true
    },
    left: {
      type: Boolean,
      default: false
    },
    scrollToElement: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: 'top'
    }
  },
  data: () => ({
    fab: false
  })
}
</script>

