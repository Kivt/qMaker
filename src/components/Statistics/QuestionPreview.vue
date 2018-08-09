<template>
  <v-layout row wrap>
    <v-flex
      xs12 md6
      v-for="(question, index) in questions"
      :key="index">
      <v-btn
        @click.native="$emit('click', index)"
        block
        :color="currentQuestion === index ? 'green' : 'default'"
        :outline="currentQuestion === index"
        :class="{'active-question': currentQuestion === index}"
        class="wrapper text-xs-left">
        <div
          :title="question.question"
          class="preview">
          {{ question.question }}
        </div>

        <v-spacer />

        <div
          class="text-right">
          {{ question.answerType }}
        </div>
      </v-btn>
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
.preview {
  max-width: 80%;
  width: 80%;
  flex-basis: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
