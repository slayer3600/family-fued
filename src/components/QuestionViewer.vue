<template>
  <div>
    <p class="text-h3">{{ Question.question }}</p>
    <v-simple-table>
      <thead>
        <tr>
          <!-- <th class="text-left">
            Rank
          </th> -->
          <th class="text-left">
            Response
          </th>
          <th class="text-left">
            Score
          </th>
          <th class="text-left" v-if="Host">
            <div>
              Reveal
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(response, index) in Question.responses" :key="index">
          <!-- <td>{{ index + 1 }}</td> -->
          <td>
            <div>
              {{ isResultDisplayed(response.response, response.revealed) }}
            </div>
          </td>
          <td>{{ isResultDisplayed(response.score, response.revealed) }}</td>
          <td v-if="Host">
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
import { mapGetters } from "vuex";

export default {
  name: "QuestionViewer",

  data() {
    return {
      testValue: "Hello Jeremy",
      revealValue: true
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
        channel: this.getChannelName,
        message: {
          messageType: "revealAnswers",
          index: index,
          revealed: revealed
        }
      });
    },
    toggleRevealed(index, revealed) {
      console.log(index + " " + revealed);
      this.Question.responses[index].revealed = revealed;
      if (revealed) {
        this.correctAnswer();
      }
    },
    correctAnswer() {
      console.log("correctAnswer");
      var audio = new Audio("./static/answer-correct.mp3");
      audio.play();
    }
  },

  computed: {
    ...mapGetters(["getChannelName"])
  }
};
</script>

<style scoped>
.blocked {
  visibility: hidden;
}
</style>
