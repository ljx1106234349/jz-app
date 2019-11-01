<template>
   <div class="order">
      <van-tabs v-model="active">
          <van-tab title="全部订单">内容 1</van-tab>
          <van-tab title="待接单">内容 2</van-tab>
          <van-tab title="待服务">内容 3</van-tab>
          <van-tab title="待确认">内容 4</van-tab>
          <van-tab title="已完成">内容 4</van-tab>
      </van-tabs>
      {{orders}}
    </div> 
</template>
<script>
import { mapActions, mapState ,mapGetters} from 'vuex'
export default {
  data(){
    return {
      active:0
    }
  },
  computed:{
    ...mapState('order',['orders']),
    ...mapGetters('order',['ordersStatusFilter'])
  },
  created(){
    this.findAllOrders();
  },
  methods:{
    ...mapActions('order',['findAllOrders'])
  }
}
</script>