<template>
  <div class="pt-5 px-2">
    <v-layout justify-center mb-5>
      <div class="q-title">
        {{ questionData.question }}
      </div>
    </v-layout>

    <div class="awesome-divider dark my-3"></div>

    <star-rating
      v-if="questionData.answerType === 'rating'"
      :selectedStar="typeof answer.selectedAnswers[0] === 'undefined' ? -1 : answer.selectedAnswers[0]"
      :maxRating="questionData.maxRating"/>

    <v-layout
      justify-center
      v-if="questionData.answerType === 'single'">
      <v-radio-group v-model="answer.selectedAnswers[0]">
        <v-radio
          v-for="(answer, index) in questionData.answers"
          :value="index"
          class="my-3"
          color="primary"
          :label="answer.answer"
          :key="index"></v-radio>
      </v-radio-group>
    </v-layout>

    <v-layout
      justify-center
      column
      v-if="questionData.answerType === 'multiple' && answer.selectedAnswers">
      <v-checkbox
        v-for="(answer, index) in questionData.answers"
        :value="index"
        v-model="selected"
        class="my-3"
        color="primary"
        :label="answer.answer"
        :key="index"></v-checkbox>
    </v-layout>
  </div>
</template>

<script>
import StarRating from '@/components/TakeTest/StarRating'

export default {
  name: 'SingleQuestion',
  components: {
    StarRating,
  },
  props: {
    questionData: {
      type: Object,
      default: () => ({}),
    },
    answer: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    selected: []
  }),
  watch: {
    selected(newVal) {
      this.$bus.$emit('multipleChange', newVal)
    },
    answer(data) {
      this.selected = data.selectedAnswers
    }
  }
}
</script>

<style scoped>
.q-title {
  max-width: 90%;
  font-size: 20px;
}

@media screen and (min-width: 768px) {
  .q-title {
    font-size: 34px;
  }
}
</style>
