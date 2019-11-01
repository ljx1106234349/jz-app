import {get,post_obj_array} from '../../http/axios'


export default {
  namespaced:true,
  state:{
    orders:[]
  },
  getters:{
    orderStatusFilter(state){
      return (status)=>{
        return state.orders.filter(item=>item.status === status)
      }
    }
  },
  mutations:{
    refreshOrders(state, orders){
      state.orders = orders;
      // console.log(orders);
    }
  },
  actions:{
    // 查询当前用户的所有订单
    async findAllOrders({commit,rootState}){
      let customerId = rootState.user.info.id
      let response = await get('/order/query',{customerId});
      commit('refreshOrders',response.data)
    },
     // 保存订单信息
     async saveOrder({commit,rootState}){
      // 1. 组合数据
      let data = {
        customerId : rootState.user.info.id,
        addressId : rootState.address.addresses[0].id,
        orderLines : Array.from(rootState.shop_car.orderLines.values())
      }
      console.log(data);
      // 2. 调用后台接口完成保存
      let response = await post_obj_array('/order/save',data)
      // 3. 清空购物车(order ---> shop_car)
      commit('shop_car/clearShopCar',null,{root:true})//参考 Vuex官方文档中的Module中的全局命名空间
      return response;
    }
  }
}