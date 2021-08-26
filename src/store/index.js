import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../firebase";
import { db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //////////////////// Testing carousel ////////////////////
    loadedLesions: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        //timestamp: new Date(),
        timestamp: '14 July 2021 at 14:08:00 UTC+1', 
        risk_result: 0.04,
        location: 'Left shoulder',
        description: 'Dark mole on left shoulder'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        //timestamp: new Date(),
        timestamp: '28 April 2021 at 07:34:00 UTC+1',
        risk_result: 0.12,
        location: 'Upper back',
        description: 'Asymmetrical lesion on upper back'
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
      if (payload.timestamp) {
        lesion.timestamp = payload.timestamp
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
    loadLesions ({commit, getters}) {
       commit('setLoading', true)
       db.collection('users').doc(getters.user.id).collection('lesions')
        .onSnapshot((querySnapshot) => {
          var lesions = []
          querySnapshot.forEach((doc) => {
            lesions.push({
              id: doc.id,
              location: doc.data().location,
              risk_result: doc.data().risk_result,
              timestamp: doc.data().timestamp,
              url: doc.data().url,
            })
          })
          commit('setLoadedLesions', lesions)
          commit('setLoading', false)
        })    
      //  firebase.database().ref('files').once('value')
      //    .then((data) => {
      //      const lesions = []
      //      const obj = data.val()
      //      for (let key in obj) {
      //        lesions.push({
      //          id: key,
      //          title: obj[key].title,
      //          description: obj[key].description,
      //          imageUrl: obj[key].imageUrl,
      //          date: obj[key].date,
      //          location: obj[key].location,
      //        })
      //      }
      //      commit('setLoadedLesions', lesions)
      //      commit('setLoading', false)
      //    })
         .catch(
           (error) => {
             console.log(error)
             commit('setLoading', false)
           }
         )
     },
    registerUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              lesions: []
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
              lesions: [],
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
      commit('setUser', {id: payload.uid, lesions: []})
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
        return lesionA.timestamp > lesionB.timestamp
      })
    },
    /////////Maybe redundant////////////
    featuredLesions (state, getters) {
       return getters.loadedLesions.slice(0, 5)
    },
    ///////////////
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
