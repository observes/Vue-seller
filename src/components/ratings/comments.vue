<template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore" class="star-item"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore" class="star-item"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="rating-title border-1px">
          <rating-select
            @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
            :ratings="ratings"></rating-select>
        </div>
        <div class="rating-wrapper">
          <ul>
            <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
              <div class="avatar">
                <img  :src="rating.avatar">
              </div>
              <div class="content">
                <div class="user-message">
                  <div class="name">{{rating.username}}</div>
                  <div class="time">
                    {{rating.rateTime | formatDate}}
                  </div>
                </div>
                <div class="star-wrapper">
                  <div class="star-ratings">
                      <star :size="24" :score="rating.score"></star>
                  </div>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">{{rating.text}}</div>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up icon-recommend"></span>
                  <span class="recommend-text" v-for="item in rating.recommend">{{item}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from '../star/star.vue';
    import split from '../split/split.vue';
    import ratingSelect from '../ratingselect/ratingselect.vue';
    import BScroll from 'better-scroll';
    import {formatDate} from '../../assets/data/forData.js';
    const HTTP_OK=0;
    const ALL=2;
    const COUNTENT_FLAG=false;
    export default{
      data(){
          return {
            ratings: [],
            selectType: ALL,
            onlyContent: COUNTENT_FLAG
          }
      },
      props:{
        seller:{
          type:Object
        }
      },
      components: {star,split,ratingSelect},
      created() {
        this.$http.get('/api/ratings').then((response) => {
          response = response.body;
          if (response.succeed === HTTP_OK) {
            this.ratings = response.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            });
          }
        });
      },
      methods:{
        needShow(type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        },
        needShow(type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        },
        selectRating(type) {
          this.selectType = type;
          this.$nextTick(() => {
            console.log(this.scroll);
            this.scroll.refresh();
          });
        },
        toggleContent() {
          this.onlyContent = !this.onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "comments.less";
</style>
