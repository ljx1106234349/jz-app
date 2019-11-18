<template>
  <div class="confirm">
    <van-nav-bar
      title="订单确认"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-notice-bar
      color="#1989fa" background="#ecf9ff" left-icon="info-o">
      请您尽快确认订单哦 ^_^
    </van-notice-bar>
     
    <van-panel>
       
      <van-cell>
        <van-row>
          <van-col :span="3">
            <van-icon name="friends-o" size="25px" />
          </van-col>
          <van-col :span="10" >
            <strong>顾客信息</strong>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="4"></van-col>
          <van-col :span="17">
            <div>顾客ID：{{info.id}}</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="4"></van-col>
          <van-col :span="17">
            <div>姓名：{{info.name}}</div>
          </van-col>
        </van-row>
      </van-cell>
    </van-panel>
    
    <van-cell>
      <van-row>
        <van-col :span="3">
          <van-icon name="location-o"  size="25px" />
        </van-col>
        <van-col :span="17">
          <strong>地址信息</strong>
          <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="value"  :options="addresses"  @change="toSelectHandler"/>
          </van-dropdown-menu>
        </van-col>
        <!-- <van-col :span="17" offset="6" v-for="item in addresses" :key="item.a">
          <div>{{item.province+" "+item.city+" "+item.area}}</div>
          <div>{{item.address}}</div>
        </van-col> -->
      </van-row>
    </van-cell>
 
    <van-panel>
      <van-cell>
        <van-row >
          <van-col :span="3">
            <van-icon name="todo-list-o"  size="25px" />
          </van-col>
          <van-col :span="17">
            <strong>订单详情</strong>
          </van-col>
        </van-row >
        <van-row >
          <van-col :span="21" v-for="item in orderLines.values()" :key="item.c">
            <div style="margin-left:65px">产品：{{item.productName}}</div>
            <div style="margin-left:65px">
              <span>价格：<span class="num">{{item.price}} 元 </span></span>
              <span class="number">数量：<span class="num">x {{item.number}}</span></span>
            </div>
            <br>
          </van-col>
        </van-row>
      </van-cell>
    </van-panel>
    <!-- {{info}} -->
    <!-- {{addresses}} -->

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
      chosenAddressId: '1',
      value:2228,
      id:2228
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
      this.saveOrder(this.id)
      .then((response)=>{
        // this.$notify({ 
        //   type: 'success', 
        //   message: response.statusText 
        // });
        this.$toast({
          icon: 'success',
          message: '下单成功'
          
        });
        this.$router.push({path:'/manager/order'})
      })
    },
    
    toSelectHandler(value){
      // console.log(value);
      this.id = value;
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
  .number{
    margin-left: 40px; 
  }
  .num{   
    font-weight:bold;  
    color:#ff9955;

  }
  
</style>