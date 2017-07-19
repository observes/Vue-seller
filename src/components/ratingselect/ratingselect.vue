<template>
    <div class="ratingSelect">
      <div class="ratingType border-1px">
        <span :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<i class="count">{{ratings.length}}</i></span>
        <span :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<i class="count">{{positives.length}}</i></span>
       <span  :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<i class="count">{{negatives.length}}</i></span>
      </div>
      <div class="ratingSwitch"  @click="toggleContent">
        <span class="icon-check_circle" :class="{'present':onlyContent}"></span>
        <span class="text">只看内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;
    export default{
        data(){
            return {
              onlyTrue:false
            }
        },
        props:{
          ratings:{
            type:Array,
            default(){
              return []
            }
          },
          selectType:{
            type:Number,
            default:ALL
          },
          onlyContent:{
            type:Boolean,
            default:false
          },
          desc:{
            type:Object,
            default(){
              return {
                all:'全部',
                positive:"满意",
                negative:"不满意"
              }
            }
          }
        },
        created(){
          //console.log(this.selectType);
          //console.log(this.onlyContent);
        },
        components: {},
        methods:{
          select(type,event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('select', type);
          },
          toggleContent(event) {
            if (!event._constructed) {
              return;
            }
            this.$emit('toggle');
          }
        },
        computed: {
          positives() {
            return this.ratings.filter((rating) => {
              return rating.rateType === POSITIVE;
            });
          },
          negatives() {
            return this.ratings.filter((rating) => {
              return rating.rateType === NEGATIVE;
            });
          }
        }
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "ratings.less";
</style>
