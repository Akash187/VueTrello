import Vue from 'vue'
import Vuex from 'vuex'
import { auth, firestore, googleProvider, firebase } from './config/firebaseConfig'
import uuidv4 from 'uuid'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    'uid': null,
    'initials': '',
    'submitting': false,
    'boards': [],
    'board': {},
    'activeId': '',
    'lists': [],
    boardsListener: undefined,
    boardListener: undefined,
    listListener: undefined
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
      state.submitting = false
      state.boards = []
      state.board = {}
      state.activeId = ''
      state.boardListener()
      state.boardListener()
      state.listListener()
    },
    addBoards(state, boards){
      state.boards = boards
    },
    setBoardListener(state, listener){
      state.boardListener = listener
    },
    setBoardsListener(state, listener){
      state.boardsListener = listener
    },
    setActiveId(state, id){
      state.activeId = id
    },
    addLists(state, lists){
      state.lists = lists;
    },
    setListListener(state, listener){
      state.listListener = listener
    },
    activeBoard(state, board) {
      state.board = board
    }
  },
  actions: {
    emailSignUp({commit}, {name, email, password}){
      commit('setSubmitting', true);
      return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
          .then(res => res.user.uid)
          .then((uid) => {
            let initials = ['', ...name.split(' ')]
              .reduce((accumulator, currentValue) => accumulator + currentValue[0])
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
    signOut({ commit }) {
      return new Promise((resolve, reject) => {
        auth.signOut().then(function() {
          resolve('success')
          commit('reset');
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
            localStorage.removeItem('authUser');
            reject('User Not authenticated')
          }
        });
      })
    },
    getBoards({ dispatch }) {
      dispatch('fetchBoards')
    },
    createBoard({ state }, name) {
      return new Promise((resolve, reject) => {
        firestore.collection('boards').add({
          name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lists: [],
          createdBy: state.uid
        }).then(() => {
          resolve('added')
        }).catch(err => {
          reject(err)
        })
      });
    },
    async fetchUserInfo({ commit }, uid) {
      try{
        let user = await firestore.collection('users').doc(uid).get();
        let data = user.data();
        commit('setInitials', data.initials);
      }catch(err){
        console.log(err)
      }
    },
    fetchBoards({ state, commit }) {
      let boardsListener = firestore.collection('boards')
        .where("createdBy", "==", state.uid)
        .orderBy("updatedAt", "desc")
        .onSnapshot(function(querySnapshot) {
          let boards = [];
          querySnapshot.forEach(function(doc) {
            boards.push({
              id: doc.id,
              name: doc.data().name
            });
          });
          commit('addBoards', boards)
        });
      commit('setBoardsListener', boardsListener)
    },
    async currentBoard({commit}, boardId){
      try{
        let boardListener = await firestore.collection('boards').doc(boardId)
          .onSnapshot(function(doc) {
          commit('activeBoard', doc.data())
        });
        commit('setBoardListener', boardListener)
      }catch (e) {
        console.log(e)
      }
    },
    async updateBoard(context, {boardId, newLists}){
      try{
        await firestore.collection('boards').doc(boardId).update({
          lists: newLists,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      }catch(e){
        console.log(e)
      }
    },
    addList(context, {title, boardId}){
      return new Promise((resolve, reject) => {
        firestore.collection('lists').add({
          title,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          cards: [],
          boardId
        }).then((res) => {
          return firestore.collection('boards').doc(boardId).update({
            lists: firebase.firestore.FieldValue.arrayUnion(res.id),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        }).then((res) => {
          resolve('added')
        }).catch(err => {
          reject(err)
        })
      });
    },
    fetchLists({ commit }, boardId) {
      let listListener = firestore.collection('lists')
        .where("boardId", "==", boardId)
        .onSnapshot(function(querySnapshot) {
          let lists = [];
          querySnapshot.forEach(function(doc) {
            lists.push({
              id: doc.id,
              ...doc.data()
            });
          });
          commit('addLists', lists)
        });
      commit('setListListener', listListener)
    },
    async deleteList(context, {listId, boardId}) {
      try{
        await firestore.collection('boards').doc(boardId).update({
          lists: firebase.firestore.FieldValue.arrayRemove(listId),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        await firestore.collection('lists').doc(listId).delete()
      } catch (e) {
        console.log(e)
      }
    },
    addCard(context, {listId, data}){
      firestore.collection('lists').doc(listId)
        .update({
          cards: firebase.firestore.FieldValue.arrayUnion({
            id: uuidv4(),
            info: data
          }),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => console.log('card added'))
        .catch((err) => console.log(err))
    },
    updateCard(context, {listId, cards}){
      firestore.collection('lists').doc(listId)
        .update({
          cards,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => console.log('card updated'))
        .catch((err) => console.log(err))
    }
  },
  getters: {
    orderedList: state => {
      if(state.board.lists && state.lists.length>0){
        return state.board.lists.map(id => {
          for(let list of state.lists){
            if(list && list.id === id){
              return list
            }
          }
        })
      }
    }
  }
})

export default store;