<template>
  <div id="app">
    <header-sell :seller ='seller'></header-sell>
    <div class="tab border-1px">
      <router-link to="/goods" tag="div" class="tab-item">商品</router-link>
      <router-link to="/comments" tag="div" class="tab-item" >评价</router-link>
      <router-link to="/seller" tag="div" class="tab-item" >商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
  import headerSell from './components/header/header.vue';
  import {urlParse} from './assets/util/util';
  const OK_HTTP =0;
  export default{
    data() {
      return{
        seller:{
          id:(()=>{
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    created(){
      this.$http.get('/api/seller?id='+this.seller.id).then((res)=>{
        if(res.body.succeed==OK_HTTP){
            this.seller = Object.assign({}, this.seller, res.body.data);
        }
      },(err)=>{
         throw  err;
      })
    },
    components:{headerSell}
  }
</script>
<style lang="less" scoped>
  @import 'App.less';
</style>
