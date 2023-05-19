<template>
  <h1 class="te">{{ msg }}</h1>
  <img src="@img/loc/leftarrow.png" alt="">
  <div class="card">
    <button type="button" @click="changeCount">count is {{ count }}</button>
  </div>
  <hr>
  <div @click="updatePcount">{{ pCount }}----{{ updateCount }}</div>
</template>

<script setup>
  import { ref } from 'vue'
  import { usePinia } from '@/pinia/pinia'
  import { storeToRefs } from 'pinia'

  const pinia = usePinia()

  // 直接解构会失去响应
  // let { pCount } = pinia
  // storeToRefs解构出来具有响应式
  const { pCount, updateCount } = storeToRefs(pinia)

  defineProps({
    msg: {
      type: String,
      default: ''
    }
  })

  const count = ref(150)

  const changeCount = () => {
    count.value++
  }
  const updatePcount = () => {
    pinia.pCount ++
  }

</script>

<style lang="scss" scoped>
.te{
  border: 1px solid $bd-color;
}
</style>
