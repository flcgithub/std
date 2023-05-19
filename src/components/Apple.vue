<template>
  <div>
    {{ pCount }}==={{ updateCount }}
  </div>
</template>

<script setup>
  import { usePinia } from '@/pinia/pinia'
  import { storeToRefs } from 'pinia'

  const pinia = usePinia()

  const { pCount, updateCount } = storeToRefs(pinia)
</script>

<style lang="scss" scoped>

</style>