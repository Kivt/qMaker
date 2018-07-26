<template>
  <div class="py-2">
    <v-layout mb-3>
      <v-flex>
        <v-card class="py-2">
          <indicator
            @select="activeQuestion = $event"
            :active="activeQuestion"
            :isCreateButton="false"
            :amount="questions.length" />
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-card class="px-2">
          <single-question
            :answer="answers[activeQuestion]"
            :questionData="questions[activeQuestion]" />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Indicator from '@/components/CreateQuestion/QuestionsIndicator'
import SingleQuestion from '@/components/TakeTest/SingleQuestion'

export default {
  name: 'TakeQuestions',
  components: {
    Indicator,
    SingleQuestion,
  },
  props: {
    questions: {
      type: Array,
      default: () => ([]),
    },
    answers: {
      type: Array,
      default: () => ([]),
    }
  },
  data: () => ({
    activeQuestion: 0
  }),
}
</script>

