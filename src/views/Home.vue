<template>
  <v-container fluid home-wrapper v-if="$root.currentUser">
    <alert type="warning" v-if="!$root.currentUser.emailVerified" :isOpen="true" />

    <div v-if="$root.currentUser.emailVerified">
      <v-layout row wrap>
        <v-flex xs12 md6 mb-3>
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
                v-for="(key, value, index) in myQuestionList"
                :key="index">
                <v-list-tile-content>
                  <v-list-tile-title>{{ key.name }}</v-list-tile-title>
                </v-list-tile-content>

                 <v-list-tile-action>
                  <v-menu
                    bottom
                    origin="center center"
                    transition="scale-transition">
                    <v-btn
                      slot="activator"
                      icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>

                    <v-list>
                      <v-list-tile @click="goToQuestionDetails(value)">
                        <v-list-tile-title>
                          Statistics
                        </v-list-tile-title>
                      </v-list-tile>

                      <v-list-tile @click="copyToClipboard(getShareUrl(value))">
                        <v-list-tile-title>
                          Copy url to clipboard
                        </v-list-tile-title>
                      </v-list-tile>

                      <v-list-tile>
                        <v-menu
                          origin="center center"
                          :open-on-hover="true"
                          transition="scale-transition"
                          right>
                          <v-list-tile-title slot="activator">
                            Share
                          </v-list-tile-title>
                          
                          <social-sharing
                            :url="getShareUrl(value)"
                            title="question Maker"
                            description="You were invited to answer some questions ..."
                            quote="You were invited to answer some questions."
                            inline-template>
                            <v-list>
                              <network network="facebook">
                                <v-list-tile @click="() => {}">
                                  <v-list-tile-title>
                                    Facebook
                                  </v-list-tile-title>
                                </v-list-tile>
                              </network>

                              <network network="googleplus">
                                <v-list-tile @click="() => {}">
                                  <v-list-tile-title>
                                    Google+
                                  </v-list-tile-title>
                                </v-list-tile>
                              </network>

                              <network network="linkedin">
                                <v-list-tile @click="() => {}">
                                  <v-list-tile-title>
                                    LinkedIn
                                  </v-list-tile-title>
                                </v-list-tile>
                              </network>

                              <network network="telegram">
                                <v-list-tile @click="() => {}">
                                  <v-list-tile-title>
                                    Telegram
                                  </v-list-tile-title>
                                </v-list-tile>
                              </network>
                            </v-list>
                          </social-sharing>
                        </v-menu>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                 </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>

        <v-flex xs-12 md6 mb-3>
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
import Users from '@/mixins/Users'
import Helpers from '@/mixins/Helpers'

export default {
  name: 'Home',
  components: {
    Alert
  },
  mixins: [Users, Helpers],
  data: () => ({
    questionList: {},
    myQuestionList: {},
  }),
  created () {
    if (this.$root.currentUser.emailVerified) {
      firebase.database().ref('question_sets').on('value', (snapshot) => {
        this.updateQuestionList(snapshot.val() || {})
        this.updateMyQuestionList(snapshot.val() || {})
      })
    }
  },
  methods: {
    updateQuestionList (value) {
      this.questionList = value
    },
    getShareUrl(id) {
      return `${window.location.href}test/${id}`
      // return 'https://google.com/'
    },
    updateMyQuestionList(list) {
      this.getUserInfo(this.$root.currentUser.uid).then((snapshot) => {
        let questions = snapshot.val().questions
          if (questions) {
            questions.forEach((questionId) => {
            this.$set(this.myQuestionList, questionId, list[questionId])
          })
        }
      })
    },
    goToQuestionDetails (id) {
      this.$router.push(`/statistics/${id}`)
    },
    goToTest(testId) {
      this.$router.push(`/test/${testId}`)
    }
  },
}
</script>
