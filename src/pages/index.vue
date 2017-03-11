<template>
  <div class="index">
    <vheader class="vheader"></vheader>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class='bottom'>
      
    </div>
  </div>
</template>

<script>
import vheader from '../components/header';

export default {
  name: 'index',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    vheader,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 
</style>
