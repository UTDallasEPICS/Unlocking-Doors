<template lang="pug">
div
  .rounded-lg.p-8.bg-zinc-400.w-full
    .rounded-lg.p-8.flex.flex-col.gap-5
      .rounded-lg.flex.justify-between.bg-white.p-4
        .text-2xl.font-bold.self-center USERS
        NavLink.bg-theme-primary.text-white.rounded-md.text-md.p-4.w-min.h-min.whitespace-nowrap(to='/addUser' class="hover:bg-blue-600 hover:text-white") Add User
      table.w-full.flex.flex-col.gap-2
        thead
          tr.grid.grid-cols-3.bg-white.rounded-lg.py-2
            th Email
            th Role
            th Actions
        tbody.flex.flex-col.gap-2
          tr.grid.grid-cols-3.bg-white.rounded-lg.py-4(v-for='user in users' :key='user.id' @click='isEditor || isAdmin ? editContact(user): null')
            p.text-center.align-center {{ user.username }}
            p.text-center.align-center {{ user.permission}}
            .flex.gap-5.justify-center
              //img.cursor-pointer.w-6.h-6(src='~/assets/edit-icon.png' alt='Edit Contact' @click="editContact(user)")
              img.cursor-pointer.w-6.h-6(src='~/assets/remove.png' alt='Remove' @click="confirmAction(user, 'delete')")
</template>
<script setup>
const { data: users } = await useFetch('/api/user', {
  method: 'GET',
  default() {
    return [];
  },
});

const confirmDeleteUser = (username) => {
  const confirmed = confirm(`Are you sure you want to delete the user ${username}?`);
  if (confirmed) {
    deleteUser(username);
  }
};

const deleteUser = async (username) => {
  const params = new URLSearchParams();
  params.append('username', username);

  const response = await fetch('/api/user/?' + params.toString(), { method: 'DELETE' });
};

const cvuser = useCookie('cvuser');
const isViewer = computed(() => cvuser.value?.permission == "VIEWER");
const isEditor = computed(() => cvuser.value?.permission == "EDITOR");
const isAdmin = computed(() => cvuser.value?.permission == "ADMIN");

</script>


<style scoped></style>