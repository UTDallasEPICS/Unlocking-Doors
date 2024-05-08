<template lang="pug">
div
  .rounded-lg.p-8.bg-zinc-400.w-full
    .bg-white.rounded-lg.p-8
      form(@submit.prevent='createUser')
        .form-group
          label(for='username') Username:
          input(name='username' v-model='username')
        .form-group
          label(for='permission') Permission:
          input(name='permission' v-model='permission')
        br
        br
        button(type='submit' @click="navigateTo('/admin')") Create User
</template>

<script setup>
const username = ref('');
const permission = ref('');


const createUser = async () => {
  const { data } = await useFetch('/api/user', {
    method: 'POST',
    body: {
      username: username,
      permission: permission
    }
  });
};
</script>

<style scoped></style>