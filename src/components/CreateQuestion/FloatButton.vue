<template>
  <v-btn
    fixed
    right
    bottom
    fab
    @click="$emit('save')"
    color="success">
    <v-tooltip left>
      <v-icon slot="activator">save</v-icon>
      <span>Save questions set</span>
    </v-tooltip>
  </v-btn>
</template>

<script>
export default {
  name: 'FloatingButton',
}
</script>
