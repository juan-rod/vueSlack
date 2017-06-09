<template>
  <div class="messages_form">
  	<div class="ui inverted form">
  		<div class="two fields">
  			<div class="field">
  				<textarea name="message" 
  							id="message" 
  							v-model.trim="message"
  							rows="3"
  							placeholder="Message">
  				</textarea>
  			</div>
  			<div class="field">
  				<button class="ui green button" @click.prevent="sendMessage">Send</button>
  				<button class="ui labeled icon button" @click.prevent="openFileModal">
  					<i class="cloud upload icon"></i>
  					File
  				</button>
  			</div>
  		</div>
  	</div>

<!-- progress bar upload file -->
	<div class="ui small orange inverted progress" data-total="100" id="uploadedFile">
		<div class="bar">
			<div class="progress">

			</div>
		</div>
		<div class="label"></div>
	</div>


<!-- File Modal -->
	<file-modal></file-modal>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import FileModal from './FileModal.vue'
import uuidV4 from 'uuid/V4'
export default {
	name: 'message-form',
	components: {FileModal},
	data () {
		return {
			message :'',
			errors: [],
			storageRef: firebase.storage().ref(),
			uploadTask: null,
			uploadState: null

		}
	},
	computed: {
		...mapGetters(['currentChannel','currentUser', 'isPrivate'])
	},
	methods:{
		sendMessage () {

			if(this.currentChannel !== null){

				if(this.message.length > 0) {
					this.$parent.getMessageRef().child(this.currentChannel.id).push().set(this.createMessage()).then( () => {

					}).catch( error => {
						this.errors.push(error.message);
					})
					
					this.message = "";
					
				}
			}
		},
		createMessage () {
			return {
				content: this.message,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
				user: {
					name: this.currentUser.displayName,
					avatar: true,
					id: this.currentUser.uid
				}
			}
		},
		uploadFile(file, metadata){
			if(file === null) return false

			let pathToUpload = this.currentChannel.id;
			let ref = this.$parent.getMessageRef();
			let filePath = this.getPath() + '/' + uuidV4() + '.jpg';

			 // Upload Files 
			 this.uploadTask = this.storageRef.child(filePath).put(file, metadata)
			 this.uploadState = 'uploading';

			 this.uploadTask.on('state_changed', snap => {
			 	// uploading
			 	let percent = (snap.bytesTransferred / snap.totalBytes)* 100;
			 	$('#uploadedFile').progress("set percent", percent)

			 }, error => {
			 	// error

			 }, () => {
			 	// upload finished

			 })



		},
		openFileModal () {
			$('#fileModal').modal('show')
		},
		getPath(){
			if(this.isPrivate) {
				return 'tchat/private/' + this.currentChannel.id
			}else {
				return 'tchat/public/'
			}
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
