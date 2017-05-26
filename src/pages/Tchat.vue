<template>
  <div class="tchat__container">
  	<sidebar></sidebar>
  	<messages></messages>
  </div>
</template>

<script>
import Sidebar from "../components/sidebar/Sidebar.vue";
import Messages from "../components/messages/Messages.vue";
export default {
	name: 'tchat',
	components: {Sidebar, Messages},
	data () {
		return {
		}
	}
}
</script>

<style scoped>
	.tchat__container{
		height: 100%;
	}
</style>
