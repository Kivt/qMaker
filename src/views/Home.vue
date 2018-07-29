<template>
  <v-container fluid home-wrapper v-if="$root.currentUser">
    <alert type="warning" v-if="!$root.currentUser.emailVerified" :isOpen="true" />

    <div v-if="$root.currentUser.emailVerified">
      <v-layout row wrap>
        <v-flex xs12 md6 lg3 mb-3>
          <v-card>
            <v-card-title primary-title>
              <h3>Your questions list</h3>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="$router.push({name: 'Create-questions'})">
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-title>

            <v-list>
              <v-list-tile
                v-for="(question, index) in myQuestionList"
                @click="goToQuestionDetails"
                :key="index">
                <v-list-tile-content>
                  <v-list-tile-title>{{ question.name }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-content>
                  <v-list-tile-sub-title
                    :class="(question.type === 'private' ? 'red' : 'green') + '--text'">
                    {{ question.type }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                 <v-list-tile-action>
                   <v-btn icon ripple>
                     <v-icon>chevron_right</v-icon>
                   </v-btn>
                 </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>

        <v-flex xs-12 md6 lg3 mb-3>
          <v-card>
            <v-card-title primary-title>
              <h3>Available Question Sets</h3>
            </v-card-title>

            <v-list>
              <v-list-tile
                v-for="(key, value, index) in questionList"
                @click="goToTest(value)"
                :key="index">
                <v-list-tile-content>
                  <v-list-tile-title>{{ key.name }}</v-list-tile-title>
                </v-list-tile-content>

                 <v-list-tile-action>
                   <v-btn icon ripple>
                     <v-icon>chevron_right</v-icon>
                   </v-btn>
                 </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import Alert from '@/components/Alert'
import firebase from 'firebase'

export default {
  name: 'Home',
  components: {
    Alert
  },
  data: () => ({
    questionList: {},
    myQuestionList: {},
  }),
  created () {
    firebase.database().ref('question_sets').on('value', (snapshot) => {
      this.updateQuestionList(snapshot.val())
      this.updateMyQuestionList()
    })
  },
  methods: {
    updateQuestionList (value) {
      this.questionList = value
    },
    updateMyQuestionList() {
      this.myQuestionList = Object.keys(this.questionList).reduce((obj, key) => {
        if (this.questionList[key].author === this.$root.currentUser.uid) {
          obj[key] = this.questionList[key]
        }
        return obj
      }, {})
    },
    goToQuestionDetails () {
      // TODO
    },
    goToTest(testId) {
      this.$router.push(`/test/${testId}`)
    }
  },
}
</script>
