import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../firebase";
//import { db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //////////////////// Testing carousel ////////////////////
    loadedLesions: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Lesion in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Lesion in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
    //////////////////// Testing carousel ////////////////////
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedLesions (state, payload) {
      state.loadedLesions = payload
    },
    createLesion (state, payload) {
      state.loadedLesions.push(payload)
    },
    updateLesions (state, payload) {
      const lesion = state.loadedLesions.find(lesion => {
        return lesion.id === payload.id
      })
      if (payload.title) {
        lesion.title = payload.title
      }
      if (payload.description) {
        lesion.description = payload.description
      }
      if (payload.date) {
        lesion.date = payload.date
      }
    },
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
    // loadLesions ({commit}) {
    //   commit('setLoading', true)
    //   db.collection('users')
    //   firebase.database().ref('lesions').once('value')
    //     .then((data) => {
    //       const lesions = []
    //       const obj = data.val()
    //       for (let key in obj) {
    //         lesions.push({
    //           id: key,
    //           title: obj[key].title,
    //           description: obj[key].description,
    //           imageUrl: obj[key].imageUrl,
    //           date: obj[key].date,
    //           location: obj[key].location,
    //           creatorId: obj[key].creatorId
    //         })
    //       }
    //       commit('setLoadedLesions', lesions)
    //       commit('setLoading', false)
    //     })
    //     .catch(
    //       (error) => {
    //         console.log(error)
    //         commit('setLoading', false)
    //       }
    //     )
    // },
    registerUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredLesions: []
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
              registeredLesions: []
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
      commit('setUser', {id: payload.uid, registeredLesions: []})
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
    loadedLesions (state) {
      return state.loadedLesions.sort((lesionA, lesionB) => {
        return lesionA.date > lesionB.date
      })
    },
    featuredLesions (state, getters) {
      return getters.loadedLesions.slice(0, 5)
    },
    loadedLesion (state) {
      return (lesionId) => {
        return state.loadedLesions.find((lesion) => {
          return lesion.id === lesionId
        })
      }
    },
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
