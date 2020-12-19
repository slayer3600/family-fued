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
            <div>
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
            <div>
              <v-btn
                color="primary"
                @click="revealAnswerByIndex(index, !response.revealed)"
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

  data() {
    return {
      testValue: "Hello Jeremy",
      revealValue: true,
      receivedMessage: this.$pnGetMessage("familyfeud", this.receptor)
    };
  },

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
    },
    revealAnswerByIndex(index, revealed) {
      // console.log(index);
      // this.Question.responses[index].revealed = revealed;
      this.$pnPublish({
        channel: "familyfeud",
        message: {
          index: index,
          revealed: revealed
        }
      });
    },
    receptor(msg) {
      console.log(msg.message);
      this.Question.responses[msg.message.index].revealed = msg.message.revealed;
    }
  },

  mounted() {
    this.$pnSubscribe({
      channels: ["familyfeud"],
      withPresence: true
    });
  }
};
</script>

<style scoped>
.blocked {
  visibility: hidden;
}
</style>
