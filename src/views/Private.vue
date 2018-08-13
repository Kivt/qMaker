<template>
  <div v-if="$root.currentUser">
    <toolbar />

    <v-content>
      <transition name="slide" mode="out-in">
        <router-view class="full-height"></router-view>
      </transition>
    </v-content>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar' 

export default {
  name: 'Private',
  components: {
    Toolbar
  }
}
</script>

<style scoped>
.full-height {
  min-height: calc(100vh - 65px);
}
</style>
