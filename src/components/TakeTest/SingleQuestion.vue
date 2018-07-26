<template>
  <div class="py-5">
    <v-layout justify-center mb-5>
      <h1 class="display-1 q-title">
        {{ questionData.question }}
      </h1>
    </v-layout>

    <star-rating
      v-if="questionData.answerType === 'rating'"
      @starClick="currentAnswer.selectedAnswers[0] = $event"
      :maxRating="questionData.maxRating"/>
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
  computed: {
    currentAnswer() {
      return this.answer
    }
  },
}
</script>

<style scoped>
.q-title {
  max-width: 90%;
}
</style>
