<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-toolbar-title>Family Fued</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="this.getIsLoggedIn">
        <v-btn
          color="indigo lighten-5 black--text"
          @click="$refs.child.nextQuestion()"
        >
          Next Question
        </v-btn>
        <v-btn @click="updateIsSettingsVisible(!getIsSettingsVisible)" icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </div>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Help
          </v-card-title>

          <v-card-text>
            By default, the game is loaded as a "Player" with a random question
            and ready to play. To be the "Host", click on the the settings cog
            to change your role to a host and see the answers. You can also
            share the question ID with the host so you are viewing the same
            question.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <v-container>
        <!-- <Logon />
        <FaimlyFuedViewer /> -->
        <component :is="getActiveComponent" ref="child"></component>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import FaimlyFuedViewer from "@/components/FaimlyFuedViewer";
import Logon from "@/components/Logon";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    FaimlyFuedViewer,
    Logon
  },

  data: () => ({
    dialog: false
  }),

  computed: {
    ...mapGetters([
      "getIsSettingsVisible",
      "getActiveComponent",
      "getIsLoggedIn"
    ])
  },

  methods: {
    ...mapActions(["updateIsSettingsVisible", "updateRandomQuestion"])
  }
};
</script>
