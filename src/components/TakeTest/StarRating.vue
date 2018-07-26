<template>
  <v-layout :justify-center="centered">
    <v-icon
      class="mx-3"
      x-large
      color="amber darken-2"
      v-for="(star, index) in maxRating"
      @click=" starClick(index)"
      :key="index">
      {{ index > selecterStar ? 'star_border' : 'star' }}
    </v-icon>
  </v-layout>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    centered: {
      type: Boolean,
      default: true,
    },
    maxRating: {
      type: Number,
      default: 3,
    }
  },
  data: () => ({
    selecterStar: -1,
  }),
  methods: {
    starClick(index) {
      this.$emit('starClick', index)
      this.selecterStar = index
    }
  },
}
</script>

<style scoped>
i {
  cursor: pointer;
}
</style>
