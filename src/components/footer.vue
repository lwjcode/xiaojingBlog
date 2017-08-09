<template>
  <!--页脚-->
	<footer class="choice-box">
		<div class="home-btn">
		<a @click="toList">
			<div class="icon-style" :class="{green: 1===currentindex}"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></div>
			<div class="text-style" :class="{green: 1===currentindex}">发现</div>
        </a>
		</div>
		<div class="talk-btn">
			<a @click="toWrite">
            写文章
        	</a>
		</div>
		<div class="user-btn">
			<a @click="toMy">
			<div class="icon-style" :class="{green: 2===currentindex}">
            	<i class="fa fa-user-circle" aria-hidden="true"></i>
	            <span v-if=" this.$store.state.totalmess > 0 ">
	            	<i class="fa fa-circle" aria-hidden="true" style="color:red; font-size:0.5rem"></i>
	            </span>
            </div>
            <div class="text-style" :class="{green: 2===currentindex}">我的</div>
        	</a>
		</div>
	</footer>
</template>

<script>

export default {
	name: 'footer',
	data() {
		return {
			totalmess: 0,
			currentindex: 1
		}
	},

	methods: {
		toMy: function (){
			this.currentindex = 2;
			this.$router.push({path: '/usercenter'});
		},

		toList: function (){
			this.currentindex = 1;
			this.$router.push({path: '/list'});
		},

		toWrite: function (){
			this.currentindex = 0;
			this.$router.push({path: '/writeblog'});
		}
	}
}
	
</script>

<style scoped>

@import '../../static/css/footer.css'

</style>