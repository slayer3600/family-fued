import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from "axios";

export default new Vuex.Store({
  state: {
    score: 52,
    questions: [],
    currentQuestion: {
      questionkey: -1,
      question: "",
      responses: []
    },
    isSettingsVisible: false,
    channelName: "",
    UUID: "",
    activeComponent: "Logon",
    isLoggedIn: false
  },
  getters: {
    getScore: state => {
      return state.score * 3;
    },
    getDoubleScore: state => {
      return state.score * 2;
    },
    getQuestions: state => {
      return state.questions;
    },
    getRandomQuestion: state => {
      return state.currentQuestion;
    },
    getCurrentQuestionKey: state => {
      return state.currentQuestion.questionkey;
    },
    getIsSettingsVisible: state => {
      return state.isSettingsVisible;
    },
    getChannelName: state => {
      return state.channelName;
    },
    getUUID: state => {
      return state.UUID;
    },
    getActiveComponent: state => {
      return state.activeComponent;
    },
    getIsLoggedIn: state => {
      return state.isLoggedIn;
    }
  },
  mutations: {
    CHANGE_PRIVATE_SCORE: (state, payload) => {
      state.score = payload;
    },
    SET_QUESTION_DATA: (state, payload) => {
      state.questions = payload;
    },
    UPDATE_QUESTION_BY_ID: (state, payload) => {
      console.log("UPDATE_QUESTION_BY_ID_Vuex");
      let key = Object.keys(state.questions)[payload];
      state.currentQuestion.questionkey = payload;
      state.currentQuestion.question = key;

      state.currentQuestion.responses = [];
      state.questions[key].forEach(item => {
        state.currentQuestion.responses.push({
          response: item[0],
          score: item[1],
          revealed: false
        });
      });
    },
    SET_IS_SETTINGS_VISIBLE: (state, payload) => {
      state.isSettingsVisible = payload;
    },
    SET_CHANNEL_NAME: (state, payload) => {
      state.channelName = payload;
    },
    SET_UUID: (state, payload) => {
      state.UUID = payload;
    },
    SET_ACTIVE_COMPONENT: (state, payload) => {
      state.activeComponent = payload;
    },
    SET_IS_LOGGED_IN: (state, payload) => {
      state.isLoggedIn = payload;
    }
  },
  actions: {
    updateIsSettingsVisible: (context, payload) => {
      context.commit("SET_IS_SETTINGS_VISIBLE", payload);
    },
    getQuestionData: async context => {
      const data = await axios.get("./FamilyFued.json");
      context.commit("SET_QUESTION_DATA", data.data);
    },
    updateQuestionById: (context, payload) => {
      console.log("updateQuestionById_Vuex");
      context.commit("UPDATE_QUESTION_BY_ID", payload);
    },
    updateIsLoggedIn: (context, payload) => {
      console.log("updateIsLoggedIn_Vuex");
      context.commit("SET_IS_LOGGED_IN", payload);
    }
  }
});
