<template>
  <div class="messages_container">
  	<div class="messages_content">
  		<h2 class="ui inverted center aligned header"> # Channel Name</h2>
  		<div class="ui segment">
  			<div class="ui comments">

  			</div>
  		</div>
  	</div>

  	<message-form></message-form>

  </div>
</template>

<script>
import MessageForm from "./MessageForm.vue";

export default {
	name: 'messages',
	components: { MessageForm },
	data () {
		return {
			messageRef: firebase.database().ref('messages')
		}
	}
}
</script>

<style scoped>
	.messages_container{
		position: relative;
		background-color: #2a2a2e;
		padding: 10px 30px 210px 30px;
		margin-left: 300px;
		min-height: 100%;
	}
	.messages_containter .comments {
		font-size: 1.2em;
	}
</style>
