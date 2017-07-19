<template>
  <div class="line-title">
    <div class="line border-1px"></div>
    <div class="title-text">{{message}}</div>
    <div class="line border-1px"></div>
  </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "line.less";
</style>
<script type="text/ecmascript-6">
    export default{
      props:{
        message:{
          type:String
        }
      }
    }
</script>
