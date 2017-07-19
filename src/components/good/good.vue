<template>
    <div class="goods">
        <div class="menu-wrapper"  ref="menuWrapper">
          <ul>
            <li v-for="(good,index) in goods" :class="{'active':currentIndex===index}" @click="selectMenu(index,$event)">
              <span class="good-text border-1px">
                  <span class="icon" v-if="(good.type>0)" :class="classMap[good.type]"></span>{{good.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="item in goods" class="food-list" ref="foodList">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="food in item.foods" class="foods-item border-1px" @click="selectFood(food,$event)">
                   <div class="icon">
                     <img :src="food.icon" :alt="food.name">
                   </div>
                   <div class="content">
                       <h2 class="name">{{food.name}}</h2>
                       <p class="desc">{{food.description}}</p>
                       <div class="extra">
                         <span class="sell">月售{{food.sellCount}}分</span>
                         <span class="comment">好评率{{food.rating}}%</span>
                       </div>
                       <div class="price">
                          <span class="newPrice">￥{{food.price}}</span>
                          <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                       </div>
                       <div class="control-wrapper">
                         <control :food="food"  @add="addFood"></control>
                       </div>
                     </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <shop-cart
          :delivery-price="seller.deliveryPrice"
          :min-price="seller.minPrice"
          :select-foods='selectFoods' ref="shopcart">
        </shop-cart>
        <food :food="selectedFood" @add="addFood" ref="food"></food>
    </div>
</template>
<script type="text/ecmascript-6">
    const OK_HTTP =0;
    import BScroll from 'better-scroll';
    import shopCart from '../shopcart/shopcart.vue';
    import  control from '../cartcontrol/cartcontrol.vue';
    import food from '../food/food.vue';
    export default{
        data(){
            return {
              goods:[],
              listHeight: [],
              scrollY:0,
              selectedFood:{}
            }
        },
        components: {shopCart,control,food},
        computed: {
          currentIndex() {
            for(let i=0;i<this.listHeight.length;i++){
                let height = this.listHeight[i];
                let heightNext = this.listHeight[i+1];
                if(!heightNext ||(this.scrollY>=height&&this.scrollY< heightNext)){
                      return i
                }
            }
            return 0;
          },
          selectFoods(){
            let foods=[];
            this.goods.forEach((good)=>{
                 good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food)
                    }
                 });
            });
            return foods
          }
        },
        props:{
          seller:{
            type:Object,
            default(){
              return {}
            }
          }
        },
        created(){
          this.classMap=['decrease','discount','special','invoice','guarantee'];
          this.$http.get('/api/goods').then((res)=>{
            if(res.body.succeed==OK_HTTP){
              this.goods=[...this.goods,...res.body.data];
              this.$nextTick(() => {
                  this._initScroll();
                  this._calculateHeight();
              });
            }
          },(err)=>{
              throw  err;
          })
        },
        methods:{
          selectFood(food,event){
            if (!event._constructed) {
              return;
            }
            this.selectedFood =food;
            this.$refs.food.show();
          },
          selectMenu(index, event){
            if (!event._constructed) {
              return;
            }
            let foodList = this.$refs.foodList;
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
          },
          _initScroll(){
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
              click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
              click: true,
              probeType: 3
            });
            this.foodsScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y));
            });
          },
          _calculateHeight(arr){
            let _this =this;
            let foodList = this.$refs.foodList;
            let height = 0;
            this.listHeight.push(height);
            foodList.forEach(function(food){
                height += food.clientHeight;
                _this.listHeight.push(height);
            })
          },
          addFood(target){
            this._drop(target);
          },
          _drop(target){
            this.$nextTick(() => {
              this.$refs.shopcart.drop(target);
            });
          }
        }
    }
</script>
<style lang="less" scoped rel="stylesheet/less" >
  @import "good.less";
</style>
