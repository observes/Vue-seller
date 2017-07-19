<template>
    <div class="icon clearfix" :class="sizeNum">
      <span class="type" :class="classMap[iconType]"></span>
      <span class="text">{{text}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
      data(){
        return{
          classMap:['decrease','discount','special','invoice','guarantee']
        }
      },
      props: {
        iconType:{
          type:Number
        },
        size:{
          type:String
        },
        text:{
          type:String
        }
      },
      computed:{
        sizeNum(){
          return 'icon-'+this.size
        }
      }
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
    @import "iconTip.less";
</style>
