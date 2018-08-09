<template>
  <v-layout wrap class="single-question-statistics">
    <v-flex class="headers mb-3">
      <h3 class="title text-center mb-2">{{question.question}}</h3>
      <h3 class="subheading text-center">
        <span class="indigo--text text--lighten-2 ">{{ question.answerType }}</span>

        <div class="vertical-line mx-4"></div>

        <span
          :class="{'green--text': question.required !== 'required', 'red--text': question.required === 'required'}"
          class="text--lighten-2">
          {{ question.required }}
        </span>
      </h3>
    </v-flex>
    
    <v-data-table
      :headers="headers"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
      :items="question.answers">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.position }}</td>
        <td>{{ props.item.answer || props.item.position }}</td>
        <td class="text-xs-right">{{ props.item.timesSelected }}</td>
      </template>
    </v-data-table>

    <div class="text-xs-center pagination pt-2">
      <v-pagination
        v-show="pages > 1"
        v-model="pagination.page"
        :length="pages">
      </v-pagination>
    </div>
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
  },
  data: () => ({
    pagination: {},
    headers: [
      {
        text: 'Question',
        value: 'position',
        sortable: false
      },
      {
        text: 'Answer',
        value: 'answer',
        sortable: false
      },
      {
        text: 'Times selected',
        value: 'timesSelected',
        align: 'right'
      }
    ]
  }),
  computed: {
    question() {
      let qInfo = this.questionInfo

      qInfo.answers = qInfo.answers.map((el, index) => {
        el.position = index + 1
        return el
      })

      return qInfo
    },
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.question.answers.length / this.pagination.rowsPerPage)
    }
  }
}
</script>

<style scoped>
  .single-question-statistics {
    height: 100%;
  }

  div {
    width: 100%;
  }

  .vertical-line {
    width: 0px;
    border-right: 1px solid #ddd;
    height: 25px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
  }

  .subheading {
    text-transform: capitalize;
    display: flex;
    justify-content: center;
  }
</style>
