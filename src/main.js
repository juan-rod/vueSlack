import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import firebase from 'firebase'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Tchat from './pages/Tchat.vue'
import store from './store'


Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/',
		component: Tchat,
		beforeEnter: (to, from, next) => {
			if(!firebase.auth().currentUser){
				next('/login');
			}else{
				next();
			}
		}
	}
]
const router = new VueRouter({routes})
//Initialize Firebase

  let config = {
    apiKey: "AIzaSyCiD0rA6zm3SMmeW5JUipid0gHC5P9nrWo",
    authDomain: "tutslack.firebaseapp.com",
    databaseURL: "https://tutslack.firebaseio.com",
    projectId: "tutslack",
    storageBucket: "tutslack.appspot.com",
    messagingSenderId: "669190684811"
  };
  firebase.initializeApp(config);

  window.firebase = firebase;

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
	store.dispatch('setUser',user);

	new Vue({
	  el: '#app',
	  router,
	  store,
	  render: h => h(App)
	})
	
})

