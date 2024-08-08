<template>
  <div>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Counter',
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    return { count, increment };
  },
});
</script>
