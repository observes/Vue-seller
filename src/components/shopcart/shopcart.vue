<template>
  <div>
      <div class="cart">
        <div class="content" @click="toggleList">
          <div class="content-left">
            <div class="logo-wrapper">
              <div class="logo" :class="{'logoActive':totalCount>0}">
                  <i class="icon-shopping_cart"></i>
              </div>
              <div class="foods-num" v-if="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price border-1px" :class="{'priceActive':totalCount>0}">{{totalPrice}}元</div>
            <div class="desc">另需配送费{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
            <span class="send-basic" v-if="totalPrice===0">￥{{minPrice}}起送</span>
            <span class="send-basic" v-if="totalPrice>0&&totalPrice<minPrice">还差￥{{minPrice-totalPrice}}起送</span>
            <div class="go-pay" v-if="totalPrice>=minPrice" @click.stop.prevent="pay">去结算</div>
          </div>
        </div>
        <div class="ball-container">
          <div v-for="(ball,index) in balls">
            <transition name="drop"  @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
              <div  v-if="ball.show" class="ball">
                <div class="inner inner-hook"></div>
              </div>
            </transition>
          </div>
        </div>
        <transition name="fold">
          <div class="shopping-list" v-show="listShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <div class="empty" @click="empty">清空</div>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li v-for="(food,index) in selectFoods" class="food">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <div class="total">￥{{food.price*food.count}}</div>
                    <div class="control">
                      <control :food="food"></control>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div class="list-mask" @click="hideList" v-show="listShow"></div>
      </transition>
  </div>
</template>
<script type="text/ecmascript-6">
    import  control from '../cartcontrol/cartcontrol.vue';
    import BScroll from 'better-scroll';
    export default{
        data(){
            return {
              balls:[
                {
                  show:false
                },
                {
                  show:false
                },
                {
                  show:false
                },
                {
                  show:false
                },

              ],
              dropBalls: [],
              fold:true
            }
        },
        computed:{
            listShow(){
                if (!this.totalCount) {
                  this.fold = true;
                  return false;
                }
                let show = !this.fold;
                if (show) {
                  this.$nextTick(() => {
                    if (!this.scroll) {
                      this.scroll = new BScroll(this.$refs.listContent, {
                        click: true
                      });
                    } else {
                      this.scroll.refresh();
                    }
                  });
                }
                return show;
            },
            totalPrice(){
              let total =0;
              this.selectFoods.forEach(function(food){
                total+= food.price*food.count;
              });
              return total
            },
            totalCount(){
              let conut =0;
              this.selectFoods.forEach(function(food){
                conut+= food.count;
              });
              return conut;
            }
        },
        components: {control},
        props:{
          deliveryPrice:{
            type:Number,
            default:0
          },
          minPrice:{
            type:Number,
            default:0
          },
          selectFoods:{
            type:Array,
            default(){
              return [];
            }
          }
        },
        methods:{
          pay() {
            if (this.totalPrice < this.minPrice) {
              return;
            }
            window.alert(`支付${this.totalPrice}元`);
          },
          hideList() {
            this.fold = true;
          },
          empty(){
            this.selectFoods.forEach((food)=>{
                food.count=0;
            })
          },
          toggleList(){
              if(!this.totalCount){
                return;
              }
              this.fold= !this.fold;
          },
          drop(el){
            for(let i=0;i<this.balls.length;i++){

              let  ball = this.balls[i];
              if(!ball.show){
                  ball.show=true;
                  ball.el=el;
                  this.dropBalls.push(ball);
                  return;
              }
            }
          },
          beforeDrop(el) {
            let count = this.balls.length;
            while (count--) {
              let ball = this.balls[count];
              if (ball.show) {
                let rect = ball.el.getBoundingClientRect();
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22);
                el.style.display = '';
                el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                el.style.transform = `translate3d(0,${y}px,0)`;
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                inner.style.transform = `translate3d(${x}px,0,0)`;
              }
            }
          },
          dropping(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0,0,0)';
              el.style.transform = 'translate3d(0,0,0)';
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = 'translate3d(0,0,0)';
              inner.style.transform = 'translate3d(0,0,0)';
              el.addEventListener('transitionend', done);
            });
          },
          afterDrop(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
              ball.show = false;
              el.style.display = 'none';
            }
          }
        }
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "shopcart.less";
</style>
