<template>
  <div class="user">
    <van-nav-bar title="个人信息" />
    <van-row>
      <div class="user-photo" style="text-align:center">
        <img src="../../assets/images/1.jpg" alt />
      </div>
    </van-row>
    <van-row class="user-name">
      <p class="hello">
        欢迎您，尊敬的
        <span class="user">{{info.name}}</span>！
      </p>
    </van-row>
    <!-- <p>{{info}}</p>  -->
    <!-- <p>token:{{token}}</p>  -->
    <van-divider />
    <van-row @click="toAdd">
      <van-col :span="8" style="text-align:center;color:#4d5050">常用地址</van-col>
      <van-col :span="14" style="text-align:right;font-size:18px;color:#4d5050">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <van-divider />
    <van-row>
      <van-col :span="8" style="text-align:center;color:#4d5050">个人信息</van-col>
      <van-col :span="14" style="text-align:right;font-size:18px;color:#4d5050">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <van-divider />
    <!-- {{addresses}} -->
    <!-- {{orders}} -->

    <van-row>
      <div class="tuichu">
        <a href @click.prevent="logoutHandler">退出</a>
      </div>
    </van-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    this.findAllAddresses()
  },
  computed: {
    ...mapState('user', ['info', 'token']),
    ...mapState('address', ['addresses'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapActions('address', ['findAllAddresses']),

    logoutHandler() {
      //1、退出
      this.logout().then(() => {
        //2、跳转到登录
        this.$router.push({ path: '/' })
      })
    },

    toAdd() {
      // alert(1);
      //1、跳转到地址添加页面
      this.$router.push({ path: '/AddAddress' })
    }
  }
}
</script>
<style>
.user-photo > img {
  height: 120px;
  width: 120px;
  border: 1px solid teal;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 30px;
}
.user-name {
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
}
.hello {
  color: rgb(71, 71, 71);
}
.user {
  color: rgb(255, 102, 0);
}
.tuichu {
  font-size: 20px;
  text-align: center;
  margin-top: 80px;
}
a {
  color: teal;
}
</style>
