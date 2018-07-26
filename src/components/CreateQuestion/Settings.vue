<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md2>
        <h3 class="heading pre-input-text">Question set name:</h3>
      </v-flex>

      <v-flex xs12 md10>
        <v-text-field
          hint="Will be visible for others users"
          v-model="qInfo.name"
          solo
          label="Name">
        </v-text-field>
      </v-flex>
    </v-layout>
    
    <v-layout row wrap>
      <v-flex xs12 md6 px-0>
        <v-layout row wrap>
          <v-flex xs12 md4>
            <h3 class="heading pre-input-text">Select type:</h3>
          </v-flex>

          <v-flex xs12 md8>
            <v-select
              hint="Public visible for all users"
              v-model="qInfo.type"
              :items="['public', 'private']"
              solo
              label="Type">
            </v-select>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 md6 px-0>
        <v-layout row wrap>
          <v-flex xs12 md2>
            <h3 class="heading pre-input-text">Due to:</h3>
          </v-flex>

          <v-flex xs12 md10>
            <v-menu full-width>
              <v-text-field
                slot="activator"
                label="Due to"
                v-model="qInfo.dueTo"
                prepend-icon="event"
                clearable
                solo
                readonly>
              </v-text-field>

              <v-date-picker
                :min="formatDate(new Date)"
                v-model="qInfo.dueTo" />
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Settings',
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
  methods: {
    formatDate (date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()

      month = month.length < 2 ? '0' + month : month
      day = day.length < 2 ? '0' + day : day

      return [year, month, day].join('-');
    }
  }
}
</script>
