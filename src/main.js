import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PubNubVue from "pubnub-vue";

Vue.config.productionTip = false;

Vue.use(PubNubVue, {
  subscribeKey: "sub-c-0d4aedde-b11d-11e8-96e7-b288138ed50a",
  publishKey: "pub-c-8e7632fd-bedd-4745-b0d3-b4e15527ec6d",
  uuid: "jeremy123",
  ssl: true
});

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
