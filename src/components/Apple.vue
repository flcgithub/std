<template>
  <div id="apple">
    <span>apple</span>
    <span>flcT</span>
    {{ pCount }}==={{ updateCount }}
  </div>
</template>

<script setup>
  import { usePinia } from '@/pinia/pinia'
  import { storeToRefs } from 'pinia'

  const pinia = usePinia()

  console.log('why here')

  const { pCount, updateCount } = storeToRefs(pinia)
</script>

<style lang="scss" scoped>

</style>