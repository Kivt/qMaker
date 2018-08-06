<template>
  <v-layout row wrap>
    <v-flex class="headers mb-3">
      <h3 class="title text-center mb-2">{{questionInfo.question}}</h3>
      <h3 class="subheading text-center indigo--text text--lighten-2">{{ questionInfo.answerType }}</h3>
    </v-flex>

    <v-flex
      xs12
      v-for="(answer, index) in questionInfo.answers"
      :key="index">
      <v-layout row wrap>
        <v-flex xs10 md11 >
          {{ `${index + 1}. ${answer.answer || index + 1}` }}
        </v-flex>

        <v-flex xs2 md1 class="text-right">
          {{ answer.timesSelected }}
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'SingleQuestionStatistics',
  props: {
    questionInfo: {
      type: Object,
      default: () => ({}),
      required: true,
    }
  }
}
</script>

<style scoped>
  div {
    width: 100%;
  }

  .subheading {
    text-transform: capitalize;
  }
</style>
