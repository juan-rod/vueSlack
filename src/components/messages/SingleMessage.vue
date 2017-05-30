<template>
	<div class="comment comment_container">
		<a class="avatar">
			<img Lsrc="message.user.avatar">
		</a>
		<div class="content" :class="{'comment_self': selfMessage(message.user)}">
			<a class="author">{{message.user.name}}</a>
			<div class="metadata">
				<span class="date comment_date">{{message.timestamp | fromNow}}</span>
			</div>
			<div class="text">
				{{message.content}}
			</div>
		</div>
	</div>

</template>
<script>
	import {mapGetters} from 'vuex'
	import moment from 'moment'

	export default {
		name: "single-message",
		props: ['message'],
		computed: {
			...mapGetters(['currentUser'])
		},
		methods: {
			selfMessage(user){
				return user.id === this.currentUser.uid
			}
		},
		filters: {
			fromNow(value) {
				return moment(value).fromNow()
			}
		}
	}
</script>
<style scoped>
	.comment_container pre{
		font-size: 0.9em;
		background: #232323;
		box-shadow: 3px 6px 9px 0px #a2a2a2;
	}
	.comment_self{
		border-left: 10px solid orange;
		padding-left: 8px;
	}
	.comment_image {
		min-height: 100px;
		margin-top: 16px;
	}
	.comment_date{
		color:767676;
	}




</style>