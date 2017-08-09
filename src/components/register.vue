<template>
  <div class="register">
    <h1>注册</h1>
    <div class="input-control">
      <input type="text" name="username" v-model="username" placeholder="用户名" />
    </div>
    <div class="input-control">
      <input type="password" name="userpass" v-model="userpass" placeholder="密码" />
    </div>
    <div class="input-control">
      <input type="password" name="userpass" v-model="reuserpass" placeholder="确认密码" />
    </div>
    <div class="button-control">
      <input type="button" name="submit" value="注册" v-on:click="submit"/>
    </div>
    <div>{{error}}</div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      userpass: '',
      reuserpass: '',
      error: '',
      url: 'http://localhost:3000/doRegister'
    }
  },
  methods: {
    submit: function (){
      this.$http.post(this.url,
      {
        username: this.username, 
        userpass: this.userpass
      },
       { 
        withCredentials: true
       }).then( res => {
        if (res.body.result == 'ok'){
          this.$router.push({path: '/'});
        }
      }).catch( error => {
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import '../../static/css/login.css'

</style>
