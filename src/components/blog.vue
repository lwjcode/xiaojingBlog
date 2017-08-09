<template>
  <div class="blog">
    <div class="blog-title">
    <p class="title">{{blog.title}}</p>
  </div>
  <div class="user-warp-plus">
    <div class="user-img">
      <a href="#"><img :src="'../../static/images/' + author.icon" /></a>
    </div>
    <div class="user-warp-item-plus">
      <div class="user-date">
        <div><a href="#">{{author.name}}</a></div>
        <div>{{blog.date}}</div>
      </div>
      <div>
        <div><i class="fa fa-eye" aria-hidden="true"></i>{{blog.look_num}}</div>
        <div v-on:click="likeit(blog._id)" style="cursor: pointer;"><i class="fa fa-heart" aria-hidden="true"></i><span id="like">{{blog.like_num}}</span></div>
        <div id="review"><i class="fa fa-comment" aria-hidden="true"></i>{{blog.review_num}}</div>
      </div>
    </div>
  </div>
  <div>
    <p style="line-height: 30px">{{blog.content}}</p>
  </div>
  <hr>
  <div class="review-container">
    <textarea class="form-control" rows="5" placeholder="写下你的评论..." v-model="maintext">
      
    </textarea>
    <br>
    <input type="button" name="btn-send" class="btn-submit" id="btn-send" value="发送" v-on:click="submitReview">
  </div>

      <div class="reviewlist">
      <div class="itemit" v-for="(review, index) in reviewlist">
        <div class="usermess">
          <div class="user-img"><a href="#"><img :src="'../../static/images/' + review.hosticon" /></a></div>
          <div class="user-name" id="review._id">
            <a href="#">{{review.hostname}}</a>
          </div>
          <div class="date">{{review.date}}</div>
        </div>
        <div class="reviewcontent">
          <span>{{review.hostcontent}}</span>
          <span class="btn-reply" v-on:click="showReplyDialog(review.hostname,index, review.hostid)">回复</span>
        </div>
        
        <div class="eachother" v-for="item in review.reviewitem">
          <a href="#">{{item.reusername}}</a>
          <span>@</span>
          <a href="#">{{item.username}}</a>: 
          <span>{{item.content}}</span>
          <span class="btn-reply" v-on:click="showReplyDialog(item.reusername, index, item.reuserid)">回复</span>
          <div>{{item.date}}</div>
        </div>
        <div  v-if="index === currentindex">
          <textarea name="reviewdialog"  class="form-control" rows="3" placeholder="写下你的评论..." v-model="text">
            
          </textarea><br>
          <input type="button" name="btn-send" id="btn-send" class="btn-submit" value="发送" v-on:click="reply(index,  
          review._id)">
        </div>
        <hr/>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
      msg: 'Welcome to xiongjingBlog',
      url: 'http://localhost:3000/blog/',
      blog: {},
      reviewlist: [],
      author: {},
      error: '',
      maintext: '',
      currentindex: -1,
      text: '',
      hostid: '',
      hostname: ''
    }
  },

  mounted: function (){
    let url = this.url + this.$route.params.id;
    this.$http.get(url, { 
        withCredentials: true  //打开cookie
      }).then( res => {
        this.blog = res.body.blog;
        this.author = res.body.author;
        this.reviewlist = res.body.reviewlist;
        this.error = error;
        this.$store.state.totalmess = res.body.totalmess;
        this.$store.state.title = '文章';
        alert(this.$store.state.title);
        for (let i = 0; i < this.reviewlist.length; i++){
          this.dialogFlag[i] = false;
        }
      }).catch( error => {
        // console.log(error);
      });
  },

  methods: {
    likeit: function (blogid){
      let url = 'http://localhost:3000/updateLike?blogid=' + blogid;
      this.$http.get(url, { 
        withCredentials: true  //打开cookie
      }).then( res => {
        this.blog = res.body.blog;
      }).catch( error => {

      }) ;
    },

    submitReview: function (){
      let url = 'http://localhost:3000/submitReview';
      let obj = {
        blogid: this.blog._id,
        reviewContent: this.maintext
      };
      this.maintext = '';
      this.$http.post(url, obj, {
        withCredentials: true  //打开cookie
      }).then( res => {
        this.blog = res.body.blog;
        console.log(this.blog);
        this.reviewlist = res.body.reviewlist;
      }).catch( error => {
        console.log(error);
      });
    },

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

    reply: function (index, reviewhostid){
      let url = 'http://localhost:3000/submitReply';
      let content = this.text.split('：');
      content.shift();
      content.join('：');
      this.text = '';
      this.currentindex = -1;
      var obj = {
        'blogid': this.blog._id,
        'reviewhostid': reviewhostid,
        'userid': this.hostid,
        'username': this.hostname, 
        'content': content
      }
      this.$http.post(url, obj, { 
        withCredentials: true  //打开cookie
      }).then( res => {
        this.blog = res.body.blog;
        this.reviewlist = res.body.reviewlist;
      }).catch( res => {
        console.log(res);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import '../../static/css/blog.css' 

</style>
