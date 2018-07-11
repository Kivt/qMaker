<template>
	<div class="spinner">
    <div class="spinner-background"></div>

    <v-layout
      align-center
      class="spinner-wrapper"
      justify-center>
      <orbit-spinner
        :animation-duration="duration"
        :size="spinnerSize"
        :color="spinnerColor"
      />
    </v-layout>
  </div>
</template>

<script>
import { OrbitSpinner } from 'epic-spinners'

export default {
  name: 'Loader',
  props: {
    spinnerColor: {
      type: String,
      default: '#ff1d5e'
    },
    spinnerSize: {
      type: Number,
      default: 65
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
	components: {
		OrbitSpinner
	}
}
</script>

<style scoped>

.spinner .spinner-wrapper {
  z-index: 100001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.spinner .spinner-background {
  z-index: 100000;
  background: rgba(0,0,0, .8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
