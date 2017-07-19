<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,key,index) in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  @import "star.less";
</style >
<script type="text/ecmascript-6">
  const STAR_LENGTH=5;
  const STAR_ON='on';
  const STAR_OFF='off';
  const STAR_HALF='half';
  export default{
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    computed:{
      starType(){
        return 'star-'+this.size;
      },
      itemClasses(){
          let result=[];
          let score =Math.floor(this.score*2)/2;
          let hasDecimal= score%1 !==0;
          let intNum= Math.floor(score);
          for (let i=0; i<intNum;i++){
            result.push(STAR_ON);
          }
          if(hasDecimal){
            result.push(STAR_HALF);
          }
          while (result.length<STAR_LENGTH){
            result.push(STAR_OFF);
          }
          return result;
      }
    }
  }
</script>
