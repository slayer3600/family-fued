<template>
  <div>
    <v-row>
      <v-col>
        <v-form v-model="newGameValid" ref="newGameForm">
          <v-card>
            <v-card-title>New Game</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="userName"
                label="Username"
                :rules="validationRules.notBlank"
                @keydown.enter.prevent="startGame(true)"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="startGame(true)"
                :disabled="!newGameValid"
              >
                Start New Game
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col>
        <v-form v-model="existingGameValid" ref="existingGameForm">
          <v-card>
            <v-card-title>Join Game</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="userName"
                label="Username"
                :rules="validationRules.notBlank"
              ></v-text-field>
              <v-text-field
                v-model="roomName"
                :counter="5"
                :rules="validationRules.lessThanFiveChars"
                label="Room Code"
                maxlength="5"
                @keydown.enter.prevent="startGame(false)"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="startGame(false)"
                :disabled="!existingGameValid"
              >
                Join Game
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Logon",

  data: () => ({
    userName: "",
    roomName: "",
    newGameValid: false,
    existingGameValid: false,
    validationRules: {
      notBlank: [v => !!v || "Cannot be blank."],
      lessThanFiveChars: [
        v => v.length == 5 || "Must be exactly five characters."
      ]
    }
  }),

  methods: {
    ...mapMutations([
      "SET_ACTIVE_COMPONENT",
      "SET_UUID",
      "SET_CHANNEL_NAME",
      "SET_IS_LOGGED_IN"
    ]),
    startGame(isNewGame) {
      console.log("Start Game");

      if (isNewGame) {
        if (!this.$refs.newGameForm.validate()) return;
      } else {
        if (!this.$refs.existingGameForm.validate()) return;
      }

      if (this.roomName === "") {
        this.roomName = this.generateNewRoomNumber(5);
      }
      this.SET_CHANNEL_NAME(this.roomName);
      this.SET_UUID(this.userName);
      this.SET_IS_LOGGED_IN(true);
      this.SET_ACTIVE_COMPONENT("FaimlyFuedViewer");
    },
    generateNewRoomNumber(length) {
      let result = "";
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
  }
};
</script>
