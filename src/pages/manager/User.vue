<template>
   <div class="user">我的
       <p>{{info}}</p> 
       <p>token:{{token}}</p> 
        <p>
            <a href="" @click.prevent="logoutHandler">退出</a>
        </p>   
    </div> 
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  computed:{
  ...mapState('user',['info','token'])
  },
  methods:{
  ...mapActions('user',['logout']),
  logoutHandler(){
      //1、退出
      this.logout()
      .then(()=>{
      //2、跳转到登录
        this.$router.push({path:"/"})
      })
    }  
  }
}
</script>
