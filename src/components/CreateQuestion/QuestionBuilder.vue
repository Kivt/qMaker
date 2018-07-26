<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md6 order-xs2 order-md1>
        <v-textarea
          label="Question"
          auto-grow
          solo
          :hide-details="true"
          v-model="question.question">
        </v-textarea>
      </v-flex>

      <v-flex xs12 md6 order-xs1 odrer-md2>
        <v-layout row wrap>
          <v-flex xs6 pl-0>
            <v-select
              label="Type"
              solo
              :items="answerTypes"
              :hide-details="true"
              v-model="question.answerType">
            </v-select>
          </v-flex>

          <v-flex xs6 pr-0>
            <v-select
              label="Required"
              v-model="question.required"
              solo
              :items="['required', 'not required']"
              :hide-details="true">
            </v-select>
          </v-flex>

          <v-flex pl-0 xs6 v-if="question.answerType === 'rating'">
            <v-select
              label="Maximal Rating"
              v-model="question.maxRating"
              solo
              :items="[3,5,10]"
              :hide-details="true">
            </v-select>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout justify-space-between row wrap v-if="question.answerType === 'single' || question.answerType === 'multiple' ">
      <v-flex xs6 d-flex align-center headline mb-2>Answers:</v-flex>

      <v-flex xs-6 text-end mb-2>
        <v-btn
          @click="addAnswer"
          class="mx-0"
          color="success">
          add
        </v-btn>
      </v-flex>

      <v-flex xs12
        v-for="(answer, index) in question.answers"
        :key="index">
        <v-text-field
          solo
          v-model="answer.answer"
          :label="'Answer ' + (index + 1)" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import config from '@/settings/settings'

export default {
  name: 'QuestionBuilder',
  props: {
    questionData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    answerTypes: config.answerTypes,
  }),
  computed: {
    question () {
      return this.questionData
    }
  },
  methods: {
    addAnswer () {
      this.$emit('addAnswer')
    }
  }
}
</script>
