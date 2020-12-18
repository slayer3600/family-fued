<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Family Fued</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="updateIsSettingsVisible(!getIsSettingsVisible)" icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <FaimlyFuedViewer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import FaimlyFuedViewer from "@/components/FaimlyFuedViewer";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    FaimlyFuedViewer
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters(["getIsSettingsVisible"])
  },

  methods: {
    ...mapActions(["updateIsSettingsVisible"])
  }
};
</script>
