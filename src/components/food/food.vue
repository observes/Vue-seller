<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="foodBox">
       <div class="food-content">
          <div class="image-header">
            <img :src="food.image" :alt="food.name">
            <div class="go-back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="newPrice">￥{{food.price}}</span>
              <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="add-cart">
              <control :food="food" @add="addFood"></control>
            </div>
          </div>
          <div v-if="food.info">
             <split v-if="food.info"></split>
             <div class="food-info" >
               <div class="title">商品介绍</div>
               <p class="info">{{food.info}}</p>
             </div>
           </div>
          <div v-if="food.ratings">
              <split></split>
              <div class="ratings border-1px">
                  <div class="title">商品评价</div>
                  <rating-select
                    :selectType="selectType"
                    :onlyContent="onlyContent"
                    :desc="desc"
                    :ratings="food.ratings"
                    @select="changeSelectRating"
                    @toggle="toggleContent"
                  ></rating-select>
              </div>
              <div class="ratings-wrapper">
                <ul v-if="food.ratings&&food.ratings.length" class="rating-ul">
                    <li v-for="(rating,index) in food.ratings" class="rating-item border-1px"
                    v-show="needShow(rating.rateType,rating.text)" >
                        <div>
                          <div class="rating-information">
                    <div class="time">{{rating.rateTime | formatDate}}</div>
                    <div class="user">
                      <span class="name">{{rating.username}}</span>
                      <img class="avatar" :src="rating.avatar">
                    </div>
                  </div>
                           <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                  </p>
                        </div>
                    </li>
                </ul>
                <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
              </div>
          </div>
       </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import control from '../cartcontrol/cartcontrol.vue';
    import  ratingSelect from '../ratingselect/ratingselect.vue';
    import split from '../split/split.vue';
    import BScroll from 'better-scroll';
    import {formatDate} from '../../assets/data/forData.js';
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;
    const COUNTENT_FLAg=false;
    export default{
        data(){
            return {
              showFlag:false,
              selectType:ALL,
              onlyContent:COUNTENT_FLAg,
              desc:{
                all:'全部',
                positive:"推荐",
                negative:"吐槽"
              }
            }
        },
        props:{
          food:{
            type:Object,
            default:{}
          }
        },
        filters: {
          formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
        },
        components: {
          control,
          split,
          ratingSelect
        },
        methods:{
          needShow(type,text){
            if (this.onlyContent && !text) {
              return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
              return type === this.selectType;
            }
          },
          changeSelectRating(type){
            this.selectType = type;
//            更新滚动
            this.$nextTick(() => {
                this.scroll.refresh();
            });
          },
          toggleContent(){
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
          },
          addFood(target) {
            this.$emit('add', target);
          },
          show(){
            this.showFlag=true;
            this.selectType=ALL;
            this.onlyContent=COUNTENT_FLAg;
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.foodBox, {
                  click: true
                });
              } else {
                this.scroll.refresh();
              }
            });
          },
          hide(){
            this.showFlag=false;
          }
        }
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "food.less";
</style>
