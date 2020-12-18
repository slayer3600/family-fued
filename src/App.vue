<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Family Fued
      </div>
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

export default {
  name: "App",

  components: {
    FaimlyFuedViewer
  },

  data: () => ({
    //
  })
};
</script>
