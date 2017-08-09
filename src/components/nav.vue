<template>
  <div class="nav">
  	<div class="header"><span>{{this.$store.state.title}}</span></div>
  	<div class="dialog"><input type="text" placeholder="搜索文章" v-model="blogname"></div>
  	<div class="btn-plus"><span style="font-size:1.4rem"><i class="fa fa-search" aria-hidden="true"></i></span></div>
  </div>
</template>

<script>

export default {
	name: 'nav',
	data() {
		return {
			blogname: ''
		}
	}
}
	
</script>

<style scoped>

@import '../../static/css/nav.css'

</style>