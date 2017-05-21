<template>
  <div class="connectedUser__container">
  	<div class="ui items">
  		<div class="item">
  			<div class="ui mini image">
  				<img src="" alt="">
  			</div>
  			<div class="middle aligned content">
  				<div class="ui container">
  					<div class="ui inverted header">
  						{{currentUser.displayName}}
  					</div>
  				</div>
  			</div>
  			<div class="extra">
  				<button class="ui circular icon right floated button" @click="logout">
  					<i class="icon sign out"></i>
  				</button>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'connected-user',
	data () {
		return {
		}
	},
	computed: {
		...mapGetters(['currentUser'])
	},
	methods: {
		logout() {
			firebase.auth().signOut()
			this.$store.dispatch("setUser", null)
			this.$router.push('/login')
		}
	}
}
</script>

<style scoped>
	.connectedUser__container{
		position:absolute;
		background-color: #000;
		top:0;
		right: 0;
		left: 0;
		bottom: 0;
		height: 90px;
		padding: 8px;
		box-shadow: -4px 1px 8px 3px #2b1d18;
	}
</style>
