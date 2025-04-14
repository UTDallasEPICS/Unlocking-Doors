<template lang="pug">
div
  .rounded-lg.p-8.bg-zinc-400.w-full
    .bg-white.rounded-lg.p-8
      form.flex.flex-col.mt-2.mx-auto(class="w-1/2" @submit.prevent='createUser' @keydown.enter.prevent)
        .flex.flex-col.justify-between(class="sm:flex-row")
          label.whitespace-nowrap.self-center(for='prefix') Email:
          input.rounded-2xl.p-2.border.border-gray-400(v-model='user.username')
        .flex.flex-col.justify-between(class="sm:flex-row")
          label.whitespace-nowrap.self-center(for='prefix') Role:
          select.mt-2.rounded-lg.p-5.bg-white(v-model="user.permission")
            option(value="VIEWER") VIEWER
            option(value="EDITOR") EDITOR
            option(value="ADMIN") ADMIN
        button.self-end.bg-theme-primary.text-white.rounded-md.text-md.p-4.w-min.h-min.whitespace-nowrap(type='submit') Create User
</template>

<script setup>
const user = ref({ permission: "VIEWER" });

const createUser = async () => {
  const response = await $fetch('/api/user', {
    method: 'POST',
    body: user.value
  });
  router.navigate('/admin');
};
</script>

<style scoped></style>