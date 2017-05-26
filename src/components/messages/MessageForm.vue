<template>
  <div class="messages_form">
  	<div class="ui inverted form">
  		<div class="two fields">
  			<div class="field">
  				<textarea name="message" 
  							id="message" 
  							v-model="message"
  							rows="3"
  							placeholder="Message">
  				</textarea>
  			</div>
  			<div class="field">
  				<button class="ui green button" @click.prevent="sendMessage">Send</button>
  				<button class="ui labeled icon button">
  					<i class="cloud upload icon"></i>
  					File
  				</button>
  			</div>
  		</div>
  	</div>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	name: 'message-form',
	data () {
		return {
			message :''
		}
	},
	computed: {
		...mapGetters(['currentChannel','currentUser'])
	},
	methods:{
		sendMessage () {
			console.log("message:", this.message);
			let newMessage = {
				content: this.message,
				timeStamp: firebase.database.ServerValue.TIMESTAMP,
				user: {
					name: this.currentUser.displayName,
					avatar: true,
					id: this.currentUser.uid
				}
			}
			console.log("this.currentChannel.id:",this.currentChannel.id);
			console.log("newMessage:",newMessage);
			console.log("this.$parent.messageRef",this.$parent.messageRef);
			console.log("this.$parent.messageRef.child(this.currentChannel.id)",this.$parent.messageRef.child(this.currentChannel.id));
			this.$parent.messageRef.child(this.currentChannel.id).push().set(newMessage).then( () => {

			}).catch( error => {
				this.errors.push(error.message);
			})

			this.message = "";
		}
	}
}
</script>

<style scoped>
	.messages_form{
		position: fixed;
		bottom:0;
		background-color: #232323;
		padding:10px;
		padding-top: 20px;
		height: 210px;
		left: 300px;
		right: 0;
	}
	.messages_form .big{
		height: 350px;
	}
	.shortcut{
		color:white;
	}
</style>
