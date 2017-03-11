<template lang="html">
  <div class="movie">
    <section class="sec">
      <header>
        <h2>影院热映</h2>
        <router-link to="/">更多</router-link>
      </header>
    </section>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      mes: '我是电影',
    };
  },
};
</script>

<style scoped lang="scss">
.movie{
  .sec{
    width:100%;
    height: 295px;
    background-color: #e9e9e9;
    h2{
      float:left;
    }
    a{
      float:right;
    }
  }
}
</style>
