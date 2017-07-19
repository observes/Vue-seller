<template>
    <div id="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" :alt="seller.name" width="64" height="64">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="supports" v-if="seller.supports">
            <icon-Type size="12" :text="seller.supports[0].description" :iconType="seller.supports[0].type"></icon-Type>
          </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class="bulletin-img"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right" @click="showDetail" ></i>
      </div>
      <div class="bg-header" >
          <img :src="seller.avatar" :alt="seller.name">
      </div>
      <transition name="seller-fade">
        <div class="seller-detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <div class="seller-name">{{seller.name}}</div>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <head-Line message="优惠信息"></head-Line>
            <ul class="supports" v-if="seller.supports">
              <li v-for="(support,index) in seller.supports">
                <icon-Type size="16" :text="support.description" :iconType="support.type"></icon-Type>
              </li>
            </ul>
            <head-Line message="商家公告"></head-Line>
            <div class="seller-introduce">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close">
            <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
      </transition>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  @import "heade.less";
</style>
<script type="text/ecmascript-6">
  import Star from  '../star/star.vue';
  import headLine from  '../common/line.vue';
  import iconType from  '../iconTip/iconTip.vue';
  export default{
        data(){
            return {
              detailShow:false
            }
        },
        props: {
          seller:{
            type:Object
          }
        },
        created(){
          this.classMap=['decrease','discount','special','invoice','guarantee']
        },
        components:{Star,headLine,iconType},
        methods:{
          showDetail(){
            this.detailShow=true;
          },
          hideDetail(){
            this.detailShow=false;
          }
        }
    }
</script>
