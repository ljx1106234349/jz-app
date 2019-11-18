<template>
  <div class="order">
    <van-tabs v-model="active" :swipe-threshold="5">
      <van-tab title="全部订单">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-panel v-for="item in orders" :key="item.a">
            <van-cell>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="send-gift-o" />
                </van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4">
                  <span style="color:red">{{item.status}}</span>
                </van-col>
              </van-row>
              <!-- <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="clock-o" />
                </van-col>
                <van-col :span="20">订单内容： {{item.orderLines}}</van-col>
              </van-row>-->
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="clock-o" />
                </van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="gold-coin-o" />
                </van-col>
                <van-col :span="20">
                  金额：
                  <span style="color:red">{{item.total}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="logistics" />
                </van-col>
                <van-col
                  :span="20"
                >地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
              <div v-show="item.status == '待确认'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="danger" @click="confirmHandler(item.id)">确认收货</van-button>&nbsp;
              </div>
            </van-cell>
          </van-panel>
        </van-list>
        <br />
        <br />
      </van-tab>
      <van-tab title="待发货">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-panel v-for="item in orderStatusFilter('待派单')" :key="item.a">
            <van-cell>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="send-gift-o" />
                </van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4">
                  <span style="color:red">{{item.status}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="clock-o" />
                </van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="gold-coin-o" />
                </van-col>
                <van-col :span="20">
                  金额：
                  <span style="color:red">{{item.total}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="logistics" />
                </van-col>
                <van-col
                  :span="20"
                >地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
            </van-cell>
          </van-panel>
        </van-list>
        <br />
        <br />
      </van-tab>
      <van-tab title="待配送">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-panel v-for="item in orderStatusFilter('待服务')" :key="item.a">
            <van-cell>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="send-gift-o" />
                </van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4">
                  <span style="color:red">{{item.status}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="clock-o" />
                </van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="gold-coin-o" />
                </van-col>
                <van-col :span="20">
                  金额：
                  <span style="color:red">{{item.total}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="logistics" />
                </van-col>
                <van-col
                  :span="20"
                >地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
            </van-cell>
          </van-panel>
        </van-list>
        <br />
        <br />
      </van-tab>
      <van-tab title="待确认">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-panel v-for="item in orderStatusFilter('待确认')" :key="item.a">
            <van-cell>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="send-gift-o" />
                </van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4">
                  <span style="color:red">{{item.status}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="clock-o" />
                </van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="gold-coin-o" />
                </van-col>
                <van-col :span="20">
                  金额：
                  <span style="color:red">{{item.total}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="logistics" />
                </van-col>
                <van-col
                  :span="20"
                >地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
              <div v-show="item.status == '待确认'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="danger" @click="confirmHandler(item.id)">确认收货</van-button>&nbsp;
              </div>
            </van-cell>
          </van-panel>
        </van-list>
        <br />
        <br />
      </van-tab>
      <van-tab title="订单完成">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-panel v-for="item in orderStatusFilter('已完成')" :key="item.a">
            <van-cell>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="send-gift-o" />
                </van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4">
                  <span style="color:red">{{item.status}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="clock-o" />
                </van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="gold-coin-o" />
                </van-col>
                <van-col :span="20">
                  金额：
                  <span style="color:red">{{item.total}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;">
                  <van-icon name="logistics" />
                </van-col>
                <van-col
                  :span="20"
                >地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
            </van-cell>
          </van-panel>
        </van-list>
        <br />
        <br />
      </van-tab>
    </van-tabs>
    <!-- {{orders}} -->
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  created() {
    this.findAllOrders()
  },
  computed: {
    ...mapState('order', ['orders']),
    ...mapGetters('order', ['orderStatusFilter'])
  },

  methods: {
    ...mapActions('order', ['findAllOrders', 'confirmOrder']),
    confirmHandler(id) {
      //console.log(id);
      this.confirmOrder(id)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>
