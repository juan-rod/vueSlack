<template>
  <div class="sidebar">
  	<h1 class="ui inverted center aligned header">#Tuto::Slack#</h1>
  	<connected-user></connected-user>
  	<channels></channels>
  	<div class="ui divider">
  		<user></user>
  	</div>
  </div>
</template>

<script>
import ConnectedUser from './ConnectedUser.vue'
import Channels from './Channels.vue'
import User from './User.vue'
export default {
	name: 'sidebar',
	components: {ConnectedUser, Channels, User},
	data () {
		return {

		}
	}
}
</script>

<style scoped>
	.sidebar{
		position: fixed;
		display: flex;
		flex-flow:	column nowrap;
		width: 300px;
		padding: 10px;
		top: 0;
		left: 0;
		bottom: 0;
		background-color: #eee;
		padding-top: 110px;
	}
</style>
