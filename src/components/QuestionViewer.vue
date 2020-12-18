<template>
  <div>
    <!-- <pre>{{ Question }}</pre> -->
    <!-- <p>Question ID: {{ Question.questionkey }}</p> -->
    <p class="text-h3">{{ Question.question }}</p>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">
            Rank
          </th>
          <th class="text-left">
            Response
          </th>
          <th class="text-left">
            Score
          </th>
          <th class="text-left">
            <div v-if="!Host">
              Reveal
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(response, index) in Question.responses" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div>
              {{ isResultDisplayed(response.response, response.revealed) }}
            </div>
          </td>
          <td>{{ isResultDisplayed(response.score, response.revealed) }}</td>
          <td>
            <div v-if="!Host">
              <v-btn
                color="primary"
                @click="response.revealed = !response.revealed"
                icon
                ><div v-if="response.revealed">
                  <v-icon>mdi-eye-off</v-icon>
                </div>
                <div v-else>
                  <v-icon>mdi-eye</v-icon>
                </div>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "QuestionViewer",

  components: {},

  data: () => ({
    testValue: "Hello Jeremy",
    revealValue: true
  }),

  props: {
    Question: Object,
    Host: Boolean
  },

  methods: {
    isResultDisplayed(value, revealed) {
      if (this.Host) {
        return value;
      }

      if (!revealed) {
        return "???????????????";
      } else {
        return value;
      }
    }
  }
};
</script>

<style scoped>
.blocked {
  visibility: hidden;
}
</style>
