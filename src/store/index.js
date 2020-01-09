import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
var firebase = require ("firebase/app")


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:'',
    error:''
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    },
    setError(state,payload){
      state.error = payload
    }
  },
  actions: {
    createUser({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.pass).then(res=>{
        commit('setUser',{email:res.user.email,uid:res.user.uid})
        router.push({name: 'inicio'})
      })
      .catch(err=>{
        commit('setError', err.message)
      })

    },
    loginUsers({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass).then(res=>{
        commit('setUser',{email:res.user.email,uid:res.user.uid})
        router.push({name: 'inicio'})
      })
      .catch(err=>{
        commit('setError', err.message)
      })
    },
    detectUser({commit},payload){
      if(payload != null){
        commit('setUser',{email:payload.email, uid:payload.uid})
      }else{
        commit('setUser',null)
      }
      
    },
    logoutUsers({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
      router.push({name: 'ingreso'})
    }

  },
  modules: {
  }
})