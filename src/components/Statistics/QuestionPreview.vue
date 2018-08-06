<template>
  <v-layout row wrap>
    <v-flex
      xs12 md6
      v-for="(question, index) in questions"
      :key="index">
      <v-card
        @click.native="$emit('click', index)"
        :class="{'active': currentQuestion === index}"
        class="pa-2 mb-3 wrapper">
        <div
          :title="question.question"
          class="preview">
          {{ question.question }}
        </div>

        <div class="text-right indigo--text text--lighten-1">
          {{ question.answerType }}
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'QuestionPreview',
  props: {
    questions: {
      type: Array,
      default: () => ([]),
    },
    currentQuestion: {
      type: Number,
      default: 0,
    }
  },
}
</script>

<style scoped>
.wrapper {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: 37px;
  transition: all .35s ease;
}

.wrapper > div:last-child {
  text-transform: capitalize;
}

.preview {
  max-width: 80%;
  width: 80%;
  flex-basis: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.active {
  box-shadow:
    0 0px 8px -1px rgba(3,169,244,.5),
    0 0px 8px 0 rgba(3,169,244,.5),
    0 1px 8px 0 rgba(3,169,244,.5);
}
</style>
