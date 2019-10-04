import Vue from 'vue'
import Vuex from 'vuex'
import { auth, firestore, googleProvider } from './config/firebaseConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    'userId': ''
  },
  mutations: {

  },
  actions: {
    emailSignUp(context, {name, email, password}){
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
          .then((res) => resolve(res))
          .catch(function(error) {
            reject(error.message);
          });
      });
    },
    emailSignIn(context, {email, password}){
      return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
          .then((res) => resolve(res))
          .catch(function(error) {
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
    }
  },
  getters: {

  }
})
