<template>
  <v-layout :justify-center="centered">
    <v-icon
      class="mx-3"
      :class="{'transparent': index <= hoveredItem }"
      x-large
      color="amber darken-2"
      @mouseover="hoveredItem = index"
      @mouseleave="hoveredItem = -1"
      v-for="(star, index) in maxRating"
      @click=" starClick(index)"
      :key="index">
      {{ index > selectedStar ? 'star_border' : 'star' }}
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
    },
    selectedStar: {
      type: Number,
    },
  },
  data: () => ({
    hoveredItem: -1,
  }),
  methods: {
    starClick(index) {
      this.$bus.$emit('starClick', { position: 0 , newValue: index })
    },
  },
}
</script>

<style scoped>
i {
  cursor: pointer;
}

i.transparent {
  opacity: .6;
}
</style>
