<template>
  <div class="home">
    <van-swipe :autoplay="2000">
      <van-swipe-item>
        <img src="../../assets/images/timg44.jpg" width="100%" height="100%" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/timg4.jpg" width="100%" height="100%" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/timg55.jpg" width="100%" height="100%" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/timg2.jpg" width="100%" height="100%" alt />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      text="荣誉源于实力，信赖源自专业！      ———平台可提供白天/全天选购服务。我们已为您精心筛选，严格检查，物美价廉"
      left-icon="volume-o"
      mode="closeable"
    />
    <van-row>
      <!-- {{categories}} -->
      <van-grid :column-num="4">
        <van-grid-item
          v-for="(item,index) in categories"
          :key="item.id"
          :icon="item.icon"
          :text="item.name"
          @click="GridChangeHandler(item.id,index)"
        />
      </van-grid>
    </van-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  created() {
    this.findAllcategory()
  },
  computed: {
    // ...mapState("user",["info"]),
    ...mapState('category', ['categories'])
  },
  methods: {
    ...mapActions('category', ['findAllcategory']),
    GridChangeHandler(categoryId, activeKey) {
      // console.log("categoryId",categoryId);
      this.$router.push({
        path: '/List',
        query: { categoryId, activeKey }
      })
    }
  }
}
</script> 