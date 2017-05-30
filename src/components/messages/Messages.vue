<template>
  <div class="messages_container">
  	<div class="messages_content">
  		<h2 class="ui inverted center aligned header"> # Channel Name</h2>
  		<div class="ui segment">
  			<div class="ui comments">
  				<transition-group tag="div" name="list">
  					<single-message :message="message" v-for="message in messages" :key="message.id">
  					</single-message>
  				</transition-group>
  			</div>
  		</div>
  	</div>

  	<message-form></message-form>

  </div>
</template>

<script>
import MessageForm from "./MessageForm.vue";
import SingleMessage from "./SingleMessage.vue";
import {mapGetters} from 'vuex';

export default {
	name: 'messages',
	components: { MessageForm, SingleMessage },
	data () {
		return {
			messageRef: firebase.database().ref('messages'),
			messages: [],
			channel : null
		}
	},
	computed: {
		...mapGetters(['currentChannel','currentUser'])
	},
	watch: {
		currentChannel () {
			this.messages = [];

			this.detachListeners();

			this.addListeners();

			this.channel = this.currentChannel;
		}
	},
	methods: {
		addListeners(){
			// console.log("this.currentChannel.id:",this.currentChannel.id);
			this.messageRef.child(this.currentChannel.id).on('child_added', snap => {
				let message = snap.val()
				message['id']=snap.key
				this.messages.push(message)
			})
		},
		detachListeners () {
			if(this.channel !== null){
				this.messageRef.child(this.channel.id).off('child_added')
			}
		}
	},
	beforeDestroy () {
		this.detachListeners();
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
	.list-enter-active {
		transition: all 0.3s;
	}
	.list-enter, .list-leave-to{
		opacity: 0;
		transform: translateX(30px);
	}
</style>
