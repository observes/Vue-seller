<template>
  <div class="line-title">
    <div class="line border-1px"></div>
    <div class="title-text">{{message}}</div>
    <div class="line border-1px"></div>
  </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  @import "../../../static/less/mixin.less";
  .line-title{
    display: flex;
    margin:0 36px 0 36px;
    padding:30px 0 24px 0;
    .line{
      flex: 1;
      position: relative;
      top: -6px;
    .border-1px(bottom,rgba(255,255,255,.2));
    }
    .title-text{
      padding: 0 12px;
      font-size: 14px;
      font-weight:700;
    }
  }
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
