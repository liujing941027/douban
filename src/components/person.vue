<template lang="html">
  <div class="header">
    {{mes}}
  </div>
</template>

<script>
export default {
  name: 'person',
  data() {
    return {
      mes: '我是我是个人中心',
    };
  },
};
</script>

<style scoped lang="scss">
    .header{}
</style>
