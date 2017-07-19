<template>
  <div id="app">
    <div class="tab">
      <div class="tab-item"><a href="">商品</a></div>
      <div class="tab-item"><a href="">评价</a></div>
      <div class="tab-item"><a href="">商家</a></div>
    </div>
  </div>
</template>
<style scoped>
  .tab{
    width: 100%;
    height: 40px;
    line-height:40px;
    font-size: 28px;
    border-bottom:1px solid rgba(7,17,27,.1);
    display: flex;
  }
  .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab-item a{
    display: block;
    width: 100%;
    height: 100%;
    color: rgba(77,85,93,1);
    font-size: 28px;
  }
  .tab-item.active a{
    color: rgba(240,20,20,1);
  }
</style>
<script>
  export default{
  }
</script>
