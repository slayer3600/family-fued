<template>
  <div>
    <div v-show="getIsSettingsVisible">
      <v-row>
        <v-col>
          <v-card min-height="165">
            <v-card-title class="grey lighten-2">
              Display Type
            </v-card-title>
            <v-card-text class="pa-2">
              If you are a host, all answers will be revealed.
            </v-card-text>
            <v-radio-group class="pl-2" mandatory v-model="isHost" row>
              <v-radio label="Player" :value="false"></v-radio>
              <v-radio label="Host" :value="true"></v-radio>
            </v-radio-group>
          </v-card>
        </v-col>
        <v-col>
          <v-card min-height="165">
            <v-card-title class="grey lighten-2">
              New Game Options
            </v-card-title>
            <v-card-text class="pa-2">
              Current Question ID: {{ getCurrentQuestionKey }}
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="nextQuestion()"
                >Next Question</v-btn
              >
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                :overlay="false"
                max-width="300px"
                transition="dialog-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Find Question by ID
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    Find Question
                  </v-card-title>

                  <v-card-text>
                    <v-text-field
                      name="name"
                      label="Enter Question ID"
                      id="id"
                      v-model="questionIdLookup"
                      autofocus
                    ></v-text-field>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="findQuestion(true)">
                      Load Question
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-dialog
        v-model="incorrectAnswerDialog"
        persistent
        transition="dialog-transition"
        max-width="250px"
      >
        <v-card>
          <v-card-title class="text-h1 red--text justify-center">
            {{ incorrectSymbol }}
          </v-card-title>
        </v-card>
      </v-dialog>
    </div>
    <v-row>
      <v-col cols="2">
        <pre>Room Code: {{ this.getChannelName }}</pre>
        <v-card>
          <v-card-title class="grey lighten-2">Players</v-card-title>
          <v-list dense>
            <v-list-item v-for="(user, i) in currentUsers" :key="i">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ user }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
        <br />
        <v-card v-if="isHost" min-height="165">
          <v-card-title class="grey lighten-2">
            Host Options
          </v-card-title>
          <v-card-text>
            Strikes:
            <div class="red--text font-weight-bold">
              {{ incorrectSymbol }}
            </div></v-card-text
          >
          <v-card-actions>
            <v-btn
              color="red white--text"
              @click="sendPubNubMessage('incorrectAnswer')"
              >Strike
              <v-icon dark right>
                mdi-alpha-x-box-outline
              </v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <QuestionViewer
          v-if="!isLoading"
          :Question="getRandomQuestion"
          :Host="isHost"
          ref="child"
        ></QuestionViewer>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import QuestionViewer from "@/components/QuestionViewer";

export default {
  name: "FamilyFuedViewer",

  components: {
    QuestionViewer
  },

  data() {
    return {
      isLoading: true,
      isHost: false,
      questionIdLookup: null,
      dialog: false,
      incorrectAnswerDialog: false,
      incorrectSymbol: "",
      currentUsers: []
    };
  },

  methods: {
    ...mapMutations(["CHANGE_PRIVATE_SCORE"]),
    ...mapActions([
      "getQuestionData",
      "updateRandomQuestion",
      "updateQuestionById"
    ]),
    changeMyScore() {
      // this.$store.commit("changeScore");
    },
    changeScoreLocally() {
      console.log("local change");
    },
    findQuestion(shoulbBePublished = false) {
      this.updateQuestionById(this.questionIdLookup);
      this.dialog = false;

      if (shoulbBePublished) {
        this.$pnPublish({
          channel: this.getChannelName,
          message: {
            messageType: "updateQuestion",
            questionId: this.questionIdLookup
          }
        });
      }
    },
    nextQuestion() {
      let min = Math.ceil(0);
      let max = Math.floor(Object.keys(this.getQuestions).length);
      let randomValue = Math.floor(Math.random() * (max - min) + min);
      this.questionIdLookup = randomValue;
      this.findQuestion(true);
    },
    receptor(msg) {
      console.log(msg.message);
      switch (msg.message.messageType) {
        case "revealAnswers":
          this.$refs.child.toggleRevealed(
            msg.message.index,
            msg.message.revealed
          );
          break;
        case "updateQuestion":
          this.incorrectSymbol = "";
          this.updateQuestionById(msg.message.questionId);
          break;
        case "correctAnswer":
          this.$refs.child.correctAnswer();
          break;
        case "incorrectAnswer":
          this.incorrectAnswer();
          break;
        default:
          console.log("No action taken");
          break;
      }
    },
    playSound() {
      console.log("Playing sound");
      var audio = new Audio(require("@/assets/sounds/answer-incorrect.mp3"));
      audio.play();
    },
    incorrectAnswer() {
      this.incorrectAnswerDialog = true;
      if (this.incorrectSymbol.length < 3) {
        this.incorrectSymbol += "X";
      }

      var audio = new Audio(require("@/assets/sounds/answer-incorrect.mp3"));
      audio.play();
      setTimeout(() => {
        this.incorrectAnswerDialog = false;
      }, 1000);
    },
    sendPubNubMessage(messageType) {
      console.log("sendPubNubMessage");
      switch (messageType) {
        case "correctAnswer":
          this.$pnPublish({
            channel: this.getChannelName,
            message: {
              messageType: messageType
            }
          });
          break;
        case "incorrectAnswer":
          this.$pnPublish({
            channel: this.getChannelName,
            message: {
              messageType: messageType
            }
          });
          break;
        default:
          break;
      }
    },
    getPubNubPresence(ps) {
      console.log(ps);
      const instance = this.$pnGetInstance();
      const that = this;
      instance.hereNow(
        {
          channels: [this.getChannelName],
          includeUUIDs: true,
          includeState: true
        },
        function(status, response) {
          console.log(response);
          if (status.statusCode == 200) {
            // console.log(response.channels[ps.channel].occupants);
            that.currentUsers = [];
            response.channels[ps.channel].occupants.forEach(item => {
              that.currentUsers.push(item.uuid);
            });
          }
        }
      );
    }
  },

  computed: {
    ...mapGetters([
      "getScore",
      "getDoubleScore",
      "getQuestions",
      "getRandomQuestion",
      "getCurrentQuestionKey",
      "getIsSettingsVisible",
      "getChannelName",
      "getUUID"
    ]),
    scoreViaState() {
      return this.$store.state.score;
    }
  },

  watch: {
    dialog: function(visible) {
      //cannot be an arrow function
      if (visible) {
        this.questionIdLookup = null;
      }
    }
  },

  async mounted() {
    // console.log("mounted");
    // this.$store.dispatch("getQuestionData");
    await this.getQuestionData();

    // instead of doing this, should put an option to wait for all players to enter
    this.nextQuestion();

    const instance = this.$pnGetInstance();
    instance.setUUID(this.getUUID);

    this.$pnSubscribe({
      channels: [this.getChannelName],
      withPresence: true
    });

    this.receivedMessage = this.$pnGetMessage(
      this.getChannelName,
      this.receptor
    );

    this.$pnGetPresence(this.getChannelName, this.getPubNubPresence);

    this.isLoading = false;
  }
};
</script>

<style></style>
