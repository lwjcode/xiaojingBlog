<template>
	<div class="write-blog">
		<div class="form-group-plus">
		    <input type="text" class="form-control-plus" placeholder="请输入标题" v-model="blogtitle" autofocus="true" name="blogtitle">
		</div>
		<div class="form-group-plus">
		    <textarea class="form-control-plus" v-model="blogcontent" placeholder="请输入正文" rows="18"></textarea>
		</div>
		<div class="form-group-plus">
		    <input type="text" class="form-control-plus" placeholder="请输入标签" v-model="blogtag" name="blogtag">
		</div>
		<div>
			<input type="button" value="发表" v-on:click="publish">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'writeblog',
		data() {
			return {
				blogtitle: '',
				blogcontent: '',
				blogtag: '',
				url:'http://localhost:3000/submitBlog'
			}
		},
		mounted: function (){
			this.$store.state.title = '写文章';
		},
		methods: {
			publish: function (){
				let obj = {
					'blogtitle': this.blogtitle,
					'blogcontent': this.blogcontent,
					'blogtag': this.blogtag
				}
				this.$http.post(this.url, obj, { 
			        withCredentials: true  //打开cookie
			    }).then( res => {
			    	if (res.body.result == 'ok'){
			    		this.$router.push({path: '/list'});
			    	}
			    }).catch( error => {

			    });
			}
		}
	}
</script>

<style scoped>

@import '../../static/css/writeblog.css'

</style>