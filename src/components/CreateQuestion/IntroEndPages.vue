<template>
  <div>
    <div class="display-1">Intro Page</div>

    <v-layout row wrap>
      <v-flex xs12 md2>
        <h3 class="heading pre-input-text">Background image:</h3>
      </v-flex>

      <v-flex xs12 md10>
        <v-checkbox
          label="Background for intro page"
          color="primary"
          v-model="qInfo.intro.bg"
        ></v-checkbox>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md2>
        <h3 class="heading pre-input-text">Intro Text:</h3>
      </v-flex>

      <v-flex xs12 md10>
        <v-textarea
          hint="Description of this question set"
          v-model="qInfo.intro.text"
          solo
          label="Intro page text">
        </v-textarea>
      </v-flex>
    </v-layout>

    <v-divider class="my-3"/>

    <div class="display-1">Final Page</div>

    <v-layout row wrap>
      <v-flex xs12 md2>
        <h3 class="heading pre-input-text">Background image:</h3>
      </v-flex>

      <v-flex xs12 md10>
        <v-checkbox
          label="Background for final page"
          v-model="qInfo.endPage.bg"
          color="primary"
        ></v-checkbox>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md2>
        <h3 class="heading pre-input-text">Summarize Text:</h3>
      </v-flex>

      <v-flex xs12 md10>
        <v-textarea
          hint="Summarize of this question set"
          v-model="qInfo.endPage.text"
          solo
          label="Final page text">
        </v-textarea>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'IntroEndPages',
  props: {
    questionData: {
      required: true,
      type: Object
    } 
  },
  computed: {
    qInfo () {
      return this.questionData
    }
  },
}
</script>
