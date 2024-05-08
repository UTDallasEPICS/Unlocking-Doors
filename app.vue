<template lang="pug">
.h-svh
  .relative.text-theme-primary.flex.gap-12.px-8.py-4
    img(src='~/assets/logo.png' width='150')
    .absolute.top-0.right-0.rounded-bl-3xl.flex.bg-gray-300.py-3.px-4
      a.text-black.no-underline.cursor-pointer(@click="navigateTo('/addUser')") My Account
      img.h-6.w-6(src='~/assets/account.png')
    .flex.flex-col.gap-2
      .text-theme-primary.font-bold.text-3xl Contact Database
      .flex.gap-6
        NavLink(to='/') Search Page
        NavLink(v-if='isEditor || isAdmin' to='/editContact/?id=0') Add New Contact
        NavLink(v-if='isAdmin' to='/admin') Admin Page
        NavLink(v-if='isAdmin' to='/manageTags') Manage Tags
        a.no-underline(href='/api/logout') Logout
  NuxtPage.h-full.px-8
</template>

<script setup lang="ts">
const runtime = useRuntimeConfig();
const router = useRouter();
const routes = ref(router.getRoutes());
const route = useRoute();
const cvCookie = useCookie('cvtoken');
const cvuser = useCookie('cvuser');
const isSearch = computed(() => route.path == "/Search/");

if (!cvCookie.value) {
  await navigateTo('/api/login');
}

const id_info = computed(() => cvuser.value?.id);
const id = id_info.value as number;

const isViewer = computed(() => cvuser.value?.permission == "VIEWER");
const isEditor = computed(() => cvuser.value?.permission == "EDITOR");
const isAdmin = computed(() => cvuser.value?.permission == "ADMIN");

</script>
<style></style>