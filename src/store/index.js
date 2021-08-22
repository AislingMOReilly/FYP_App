import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //////////////////// Testing carousel ////////////////////
    // loadedMeetups: [
    //   {
    //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
    //     id: 'afajfjadfaadfa323',
    //     title: 'Meetup in New York',
    //     //date: new Date(),
    //     location: 'Upper Back',
    //     description: 'Darker around edges '
    //   },
    //   {
    //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
    //     id: 'aadsfhbkhlk1241',
    //     title: 'Meetup in Paris',
    //     //date: new Date(),
    //     location: 'Left Shoulder',
    //     description: 'Raised surface'
    //   }
    // ],
    //////////////////// Testing carousel ////////////////////
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    registerUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          },
          alert("Successfully registered")
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    loginUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      auth.signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  modules: {}
});
