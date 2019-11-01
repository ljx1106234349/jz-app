<template>
  <div class="confirm">
    <van-nav-bar
      title="订单确认"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
     
    
    <van-row>
      <van-col :span="6">顾客信息</van-col>
      <van-col :span="17">{{info}}</van-col>
    </van-row>
  <van-divider />
    <van-row>
      <van-col :span="6">地址信息</van-col>
      <van-col :span="17">{{addresses}}</van-col>
    </van-row>
  <van-divider />
    <van-row>
      <van-col :span="6">订单详情</van-col>
      <van-col :span="17" v-for="item in orderLines.values()" :key="item.c">
        {{item}}
      </van-col>
    </van-row>
  <van-divider />

    <div class="aaa">
      <van-button type="primary" size="large" @click="onSubmit">确认订单</van-button>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  data(){
    return {

    }
  },
  created(){
    this.findAllAddresses();
  },
  computed:{
    ...mapState('user',['info','token']),
    ...mapState('address',['addresses']),
    ...mapState('shop_car',['orderLines']),
    ...mapMutations('shop_car','clearShopCar')
  },
  methods:{
    ...mapActions('address',['findAllAddresses']),
    ...mapActions('order',['saveOrder']),
    onClickLeft(){
      this.$router.go(-1)
      // this.clearShopCar();
    },
    // 确认订单
    onSubmit(){
      this.saveOrder()
      .then((response)=>{
        this.$notify({ 
          type: 'success', 
          message: response.statusText 
        });
        this.$router.push({path:'/manager/order'})
      })
    }
  }
}
</script>
<style scoped>
  .aaa {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>