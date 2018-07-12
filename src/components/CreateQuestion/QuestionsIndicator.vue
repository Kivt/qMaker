<template>
  <v-flex >
    <v-btn
      v-for="(item, index) in amount"
      :key="index"
      @click="selectItem(index)"
      :color="index === active ? 'primary' : 'grey lighten-4'"
      small
      fab >
      {{ item }}
    </v-btn>

    <v-btn
      fab
      dark
      small
      v-if="isCreateButton"
      @click="createClick"
      color="success">
      <v-icon dark>add</v-icon>
    </v-btn>
  </v-flex>
</template>

<script>
export default {
  name: 'Indicator',
  props: {
    amount: {
      type: Number,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    isCreateButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem (index) {
      this.$emit('select', index)
    },
    createClick () {
      this.$emit('create')
    }
  }
}
</script>
