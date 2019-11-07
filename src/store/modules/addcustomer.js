import {post, post_json} from '../../http/axios'
export default {
  namespaced:true,
  state: {

  },
  getters:{
    
  },
  mutations: {
    
  },
  actions: {
    // 添加顾客信息
    async saveCustomer(context,form){
      // console.log(form);
      let response = await post('/customer/saveOrUpdate',form)
      return response;
      
    }
  }
}