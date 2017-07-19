<template>
  <div class="split border-1px"></div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  @import "../../../static/less/mixin.less";
  @import "../../../static/less/base.less";
  .split{
    width: 100%;
    height: 16px;
    .border-1px(top,rgba(7, 17, 27, 0.1));
    .border-1px(bottom,rgba(7, 17, 27, 0.1));
    background: #f3f5f7;
  }
</style>
<script type="text/ecmascript-6">
    export default{};
</script>
