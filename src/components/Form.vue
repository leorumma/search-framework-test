<template>
  <div>
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="phone" placeholder="Phone" />
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Form',
  setup() {
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const submit = () => {
      console.log({ name: name.value, email: email.value, phone: phone.value });
    };
    return { name, email, phone, submit };
  },
});
</script>
