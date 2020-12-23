<template>
  <div>
    <v-row>
      <v-col>
        <v-form v-model="newGameValid">
          <v-card>
            <v-card-title>New Game</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="userName"
                label="Username"
                :rules="validationRules.notBlank"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="startGame"
                :disabled="!newGameValid"
              >
                Start New Game
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col>
        <v-form v-model="existingGameValid">
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
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="startGame"
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
      lessThanFiveChars: [v => v.length == 5 || "Must be exactly 5 characters."]
    }
  }),

  methods: {
    ...mapMutations([
      "SET_ACTIVE_COMPONENT",
      "SET_UUID",
      "SET_CHANNEL_NAME",
      "SET_IS_LOGGED_IN"
    ]),
    startGame() {
      console.log("Start Game");
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
