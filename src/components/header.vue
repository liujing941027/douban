<template lang="html">
  <div class="header">
    <router-link to="/index">
      <h1>豆瓣</h1>
    </router-link>
    <nav>
      <ul>
        <li><router-link to="/index" style="color: #2384E8;">电影</router-link></li>
        <li><router-link to="/index/book" style="color: #9F7860;">图书</router-link></li>
        <li><router-link to="/index/status" style="color: #E4A813;">广播</router-link></li>
        <li><router-link to="/index/group" style="color: #2AB8CC;">小组</router-link></li>
        <div></div>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      mes: '我的设备',
    };
  },
};
</script>

<style scoped lang="scss">
.header{
  display: flex;
  align-items: center;
  padding: 0px 18px;
  height: 47px;
  line-height: 47px;
  background:#fff;
  border-bottom:1px solid #f3f3f3;
  h1{
    float:left;
    color:#00b600;
    font-size:0;
    height: 22px;
    width: 46px;
    background:url('../assets/db.png') no-repeat;
    background-size:46px 22px;
  }
  nav{
    float:right;
    position:relative;
    top:0px;
    left:17px;
    ul{
      li{
        float:left;
        margin-right: 19px;
        font-size: 15px;
        a{
          text-decoration:none;
        }
      }
      div{
        float:right;
        margin-top:16px;
        font-size:0px;
        width: 24.57px;
        height:18.28px;
        background:url('../assets/search.png') no-repeat;
        background-size:24.57px 18.28px;
      }
    }
  }
}
</style>
