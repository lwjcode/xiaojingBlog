<template>
	<div class="messlist">
		<div class="warn" v-if="flag === 1">回复成功！</div>
		<div v-for="(messitem, index) in messlist">

			<!--如果是喜欢-->
			<div v-if="messitem.actiontype == 1" class="item">
				<div class="user-plus">
					<a href="#"><img :src="'../../static/images/' + messitem.reusericon" />
					</a>
					<a href="#" class="name">{{messitem.reusername}}</a>
				</div>
				<div class="message">
					<div class="action">
						喜欢了你的文章
						<router-link :to="{path: '/blog/'+ messitem.blogid}">《{{messitem.blogname}}》
						</router-link>
					</div>
					<div class="date">{{messitem.date}}</div>
				</div>
				<hr/>
			</div>
			
			<!--如果是评论-->
			<div v-else-if="messitem.actiontype == 2" class="item">
				<div class="user-plus">
					<a href="#"><img :src="'../../static/images/' + messitem.reusericon" />
					</a>
					<a href="#" class="name">{{messitem.reusername}}</a>
				</div>
				<div class="message">
					<div class="action">
						评论了你的文章
						<router-link  :to="{path:  '/blog/'+ messitem.blogid}">《{{ messitem.blogname}}》
						</router-link>
					</div>
					<div class="date">
					{{messitem.date}}
					<span v-on:click="showReplyDialog(messitem.reusername, index , messitem.reuserid)">回复</span>
					</div>
				</div>
				<div class="content">
					<span>{{messitem.content}}</span>
				</div>
				<hr/>
				<div v-if="currentindex === index">
					<textarea name="reply"  class="form-control" rows="3" v-model="text">
						
					</textarea>
					<button name="btn" v-on:click="reply(messitem.blogid, index, messitem.hostid)" class="btn btn-primary">发送
					</button>
				</div>
			</div>
	
			<!--如果是回复-->
			<div v-else class="item">
				<div class="user-plus">
					<a href="#"><img :src="'../../static/images/' + messitem.reusericon" />
					</a>
					<a href="#" class="name">{{messitem.reusername}}</a>
				</div>
				<div class="message">
					<div class="action">
						在文章
						<router-link :to="{path: '/blog/'+ messitem.blogid}">《{{messitem.blogname}}》
						</router-link>中回复了你
					</div>
					<div class="date">
						{{messitem.date}}
						<span v-on:click="showReplyDialog(messitem.reusername, index, messitem.reuserid)">回复</span>
					</div>
				</div>
				<div class="content">
					@<a href="#">{{user.name}}</a>:
					<span>{{messitem.content}}</span>
				</div>
				<hr/>
				<div v-if="currentindex === index">
					<textarea name="reply" class="form-control" rows="3" v-model="text">
						
					</textarea>
					<button name="btn" v-on:click="reply(messitem.blogid, index, messitem.hostid)" class="btn btn-primary">发送
					</button>
				</div>
			</div>
			
		</div>
		<div>{{error}}</div>
		
	</div>
</template>

<script>
	export default {
		name: 'message',
		data() {
			return {
				user: {},
				messlist: [],
				error: '',
				currentindex: -1,
				text: '',
				hostid: '',
				hostname: '',
				flag: 0
			}

		},
		mounted: function (){
			let url = 'http://localhost:3000/messlist';
			this.$http.get(url, {
				withCredentials: true
			}).then( res => {
				this.user = res.body.user;
				this.$store.state.totalmess = res.body.totalmess;
				this.messlist = res.body.messlist.reverse();
				this.error = res.body.error;
				this.$store.state.title = '消息';
			}).catch( error => {
				console.log(error);
			});
		},

		methods: {
			showReplyDialog: function (name, index, id){
				if (this.currentindex != index){
			      this.currentindex = index;
			      this.text = '@' + name + '：';
			      this.hostid = id;
			      this.hostname = name;
			  	}else{
			  		this.currentindex = -1;
			  	}
		    },

		    reply: function (blogid, index, reviewhostid){
		      let url = 'http://localhost:3000/submitReply';
		      let content = this.text.split('：');
		      content.shift();
		      content.join('：');
		      this.text = '';
		      this.currentindex = -1;
		      var obj = {
		        'blogid': blogid,
		        'reviewhostid': reviewhostid,
		        'userid': this.hostid,
		        'username': this.hostname, 
		        'content': content
		      }
		      this.$http.post(url, obj, { 
		        withCredentials: true  //打开cookie
		      }).then( res => {
		        if (res.body != null){
		        	this.flag = 1;
		        	setTimeout( () => {
		        		this.flag = 0;
		        	}, 2000);
		        }
		      }).catch( res => {
		        console.log(res);
		      });
		    }
		}
	}
</script>

<style scoped>

@import '../../static/css/messlist.css'

</style>