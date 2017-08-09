<template>
	<div v-if="flag === 1">
		<div class="usercenter">
			<div class="user-style">
				<div class="userimg-style">
					<img v-bind:src="'../../static/images/' + user.icon"/>
				</div>
				<div class="username-plus">
					<span>{{user.name}}</span>
				</div>
				<div class="btn-update">
					<span v-on:click="flag = 2">修改</span>
				</div>
			</div>
			<div class="mymess">
				<i class="fa fa-mars-stroke" aria-hidden="true"></i>
				&nbsp;&nbsp;性别<span>{{user.sex}}</span>
			</div>
			<div class="mymess">
				<i class="fa fa-phone" aria-hidden="true"></i>
				&nbsp;&nbsp;电话<span>{{user.tel}}</span>
			</div>
			<div class="mymess">
				<i class="fa fa-envelope-o" aria-hidden="true"></i>
				&nbsp;&nbsp;邮箱<span>{{user.email}}</span>
			</div>
		</div>
	</div>
	<div v-else-if="flag === 2" class="form">
		<div class="usercenter">
			<div class="user-style">
				<div class="userimg-style"><img v-bind:src="'../../static/images/' + user.icon"/></div>
				<div class="username-plus"><span>{{user.name}}</span></div>
				<div class="btn-update"><span v-on:click="flag = 1">取消</span></div>
			</div>
		</div>
		<div class="input-control" style="margin-top:80px">
      		<input type="text" name="username" v-model="name" placeholder="昵称" />
    	</div>
    	<div class="input-control">
      		<input type="text" name="username" v-model="sex" placeholder="性别" />
    	</div>
    	<div class="input-control">
      		<input type="text" name="username" v-model="tel" placeholder="电话" />
    	</div>
    	<div class="input-control">
      		<input type="text" name="username" v-model="email" placeholder="邮箱" />
    	</div>
    	<div class="button-control">
      	<input type="button" name="submit" value="提交" v-on:click="submit"/>
    </div>
	</div>

</template>

<script>
	export default {
		name: 'usercenter',
		data () {
			return {
				user: {},
				url: 'http://localhost:3000/usercenter',
				flag: 1,
				name: '',
				sex: '',
				tel: '',
				email: ''
			}
		},

		mounted: function (){
			this.$http.get(this.url,{
				withCredentials: true
			}).then( res => {
				this.user = res.body.user;
				this.$store.state.totalmess = res.body.totalmess;
				this.name = this.user.name;
				this.sex = this.user.sex;
				this.tel = this.user.tel;
				this.email = this.user.email;
				this.$store.state.title = '个人信息';
			}).catch( error => {
				console.log(error);
			});
		},

		methods: {
			submit: function (){
				let url = 'http://localhost:3000/updateUsermess';
				let obj = {
					'username': this.name,
					'usersex': this.sex,
					'usertel': this.tel,
					'useremail': this.email
				};
				this.$http.post(url, obj, {
					withCredentials: true
				}).then( res => {
					this.user = res.body.user;
					this.totalmess = res.body.totalmess;
					this.name = this.user.name;
					this.sex = this.user.sex;
					this.tel = this.user.tel;
					this.email = this.user.email;
					this.flag = 1;
				}).catch( error => {

				});
			}
		}
	}
</script>

<style>

@import '../../static/css/mymess.css'

</style>
