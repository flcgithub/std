<template>
  <div id="map">
    
  </div>
  <HelloWorld :msg="msg" />
  <Apple />
</template>

<script setup>
  import HelloWorld from '@comp/HelloWorld.vue'
  import Apple from '@comp/Apple.vue'
  import { ref } from 'vue'

  const msg = ref('from map')

  msg.value = 'map from'

</script>

<style lang='scss' scoped>
  #map{
    width: 100%;
    height: inherit;
    position: absolute;
  }
</style>