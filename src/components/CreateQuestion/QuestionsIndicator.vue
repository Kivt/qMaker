<template>
  <v-flex >
    <v-btn
      v-for="(item, index) in amount"
      :key="index"
      :class="{'red-shadow': errors.indexOf(index) > -1}"
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
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
    errors: {
      type: Array,
      default: () => ([]),
    },
    isCreateButton: {
      type: Boolean,
      default: false,
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

<style scoped>
  .red-shadow {
    box-shadow:
      0 3px 5px -1px rgba(255, 8, 0, .5),
      0 6px 10px 0 rgba(255, 8, 0, .5),
      0 1px 18px 0 rgba(255, 8, 0, .5);
  }
</style>
