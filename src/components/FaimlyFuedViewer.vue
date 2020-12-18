<template>
  <div>
    <!-- <p>Directly from Store state: {{ scoreViaState }}</p>
    <p>Inderiectly from Store getter: {{ getScore }}</p>
    <p>Inderiectly from Store getter: {{ getDoubleScore }}</p> -->

    <!-- <pre>{{ Object.keys(getQuestions).length }}</pre>
    <pre v-if="!isLoading">{{ currentQuestion }}</pre>
    <pre>{{ getQuestions }}</pre> -->
    <v-row>
      <v-col>
        <v-card height="150">
          <v-card-title class="grey lighten-2">
            Display Type
          </v-card-title>
          <v-card-text class="pa-2">
            If you are a host, the answers will be automatically revealed.
          </v-card-text>
          <v-radio-group class="pl-2" mandatory v-model="isHost" row>
            <v-radio label="Player" :value="false"></v-radio>
            <v-radio label="Host" :value="true"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="150">
          <v-card-title class="grey lighten-2">
            New Game Options
          </v-card-title>
          <v-card-text class="pa-2">
            Current Question ID: {{ getCurrentQuestionKey }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updateRandomQuestion"
              >New Random Question</v-btn
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
                  ></v-text-field>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="findQuestion">
                    Load Question
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <QuestionViewer
      v-if="!isLoading"
      :Question="getRandomQuestion"
      :Host="isHost"
    ></QuestionViewer>
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

  data: () => ({
    isLoading: true,
    isHost: false,
    questionIdLookup: 0,
    dialog: false
  }),

  methods: {
    ...mapMutations(["CHANGE_PRIVATE_SCORE"]),
    ...mapActions([
      "changeScore",
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
    findQuestion() {
      this.updateQuestionById(this.questionIdLookup);
      this.dialog = false;
    }
  },

  computed: {
    ...mapGetters([
      "getScore",
      "getDoubleScore",
      "getQuestions",
      "getRandomQuestion",
      "getCurrentQuestionKey"
    ]),
    scoreViaState() {
      return this.$store.state.score;
    }
  },

  async mounted() {
    console.log("mounted");
    // this.$store.dispatch("getQuestionData");
    await this.getQuestionData();
    this.updateRandomQuestion();
    this.isLoading = false;
  }
};
</script>

<style></style>
