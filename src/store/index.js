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
    isSettingsVisible: false
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
      console.log("getRandomQuestion_Vuex");
      return state.currentQuestion;
    },
    getCurrentQuestionKey: state => {
      return state.currentQuestion.questionkey;
    },
    getIsSettingsVisible: state => {
      return state.isSettingsVisible;
    }
  },
  mutations: {
    CHANGE_PRIVATE_SCORE: (state, payload) => {
      state.score = payload;
    },
    SET_QUESTION_DATA: (state, payload) => {
      state.questions = payload;
    },
    UPDATE_RANDOM_QUESTION: state => {
      console.log("UPDATE_RANDOM_QUESTION_Vuex");
      let min = Math.ceil(0);
      let max = Math.floor(Object.keys(state.questions).length);
      let randomValue = Math.floor(Math.random() * (max - min) + min);
      let key = Object.keys(state.questions)[randomValue];
      // let key = Object.keys(state.questions)[30];
      state.currentQuestion.questionkey = randomValue;
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
    updateRandomQuestion: context => {
      console.log("updateRandomQuestion_Vuex");
      context.commit("UPDATE_RANDOM_QUESTION");
    },
    updateQuestionById: (context, payload) => {
      console.log("updateQuestionById_Vuex");
      context.commit("UPDATE_QUESTION_BY_ID", payload);
    }
  }
});
