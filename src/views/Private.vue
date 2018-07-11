<template>
  <div v-if="$root.currentUser">
    <toolbar />

    <v-content>
      <router-view></router-view>
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
