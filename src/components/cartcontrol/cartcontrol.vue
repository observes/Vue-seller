<template>
    <div class="control">
      <transition name="decreaseBtn">
        <div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart($event)"></div>
      </transition>
      <div class="count" v-show="food.count>0">{{food.count}}</div>
      <div class="add icon-add_circle" @click.stop="addCart($event)"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import vue from 'vue';
    export default{
        data(){
            return {}
        },
         props:{
           food:{
             type:Object,
             default:{}
           }
         },
        components: {},
        methods:{
          addCart(event){
            if(!event._constructed){
              return;
            }
            if(!this.food.count){
              vue.set(this.food,'count',1);
            }else {
              this.food.count++
            }
            this.$emit('add', event.target);
          },
          decreaseCart(event){
            if(!event._constructed){
              return;
            }
            if(this.food.count){
              this.food.count--;
            }
          }
        }
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "cartcontrol.less";
</style>
