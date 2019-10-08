import Vue from 'vue'
import Vuex from 'vuex'
import { auth, firestore, googleProvider } from './config/firebaseConfig'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    'uid': null,
    'initials': '',
    'submitting': false
  },
  mutations: {
    setUid(state, uid){
      state.uid = uid;
    },
    setInitials(state, initials){
      state.initials = initials;
    },
    setSubmitting(state, value){
      state.submitting = value
    },
    reset(state){
      state.uid = null
      state.initials = ''
    }
  },
  actions: {
    emailSignUp({commit}, {name, email, password}){
      commit('setSubmitting', true);
      return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
          .then(res => res.user.uid)
          .then((uid) => {
            let initials = ['', ...name.split(' ')].reduce((accumulator, currentValue) => accumulator + currentValue[0])
            firestore.collection('users').doc(uid).set({
              name,
              initials
            })
        })
          .then((res) => {
            commit('setSubmitting', false);
            resolve(res)
          })
          .catch(function(error) {
            commit('setSubmitting', false);
            reject(error.message);
          });
      });
    },
    emailSignIn({commit}, {email, password}){
      commit('setSubmitting', true);
      return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
          .then((res) => {
            commit('setSubmitting', false);
            resolve(res)
          })
          .catch(function(error) {
            commit('setSubmitting', false);
            reject(error.message)
        });
      })
    },
    googleOAuth(){
      return new Promise((resolve, reject) => {
        auth.signInWithPopup(googleProvider)
          .then((result) => result)
          .then((result) => {
            let name = result.additionalUserInfo.profile.name;
            //extracting max two word initials from name
            let initials = ['', ...name.split(' ')].reduce((accumulator, currentValue) => accumulator + currentValue[0]).substring(0,2)
            if(result.additionalUserInfo.isNewUser){
              firestore.collection('users').doc(result.user.uid).set({
                name,
                initials
              });
            }
            resolve();
          })
          .catch(function(error) {
          reject(error.message)
        });
      })
    },
    signOut() {
      return new Promise((resolve, reject) => {
        auth.signOut().then(function() {
          resolve('success')
        }).catch(function(error) {
          reject(error)
        });
      })
    },
    checkIsAuthenticated({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(function(user) {
          if (user) {
            let uid = user.uid;
            commit('setUid', uid);
            dispatch('fetchUserInfo', uid);
            localStorage.setItem('authUser', JSON.stringify({authenticated : true}));
            resolve()
          } else {
            commit('reset');
            localStorage.removeItem('authUser');
            reject()
          }
        });
      })
    },
    async fetchUserInfo({ commit }, uid) {
      try{
        let user = await firestore.collection('users').doc(uid).get();
        let data = user.data();
        commit('setInitials', data.initials);
      }catch(err){
        console.log(err)
      }
    }
  },
  getters: {

  }
})

export default store;