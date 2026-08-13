<template lang="pug">
.h-svh
  .relative.text-theme-primary.flex.gap-12.px-8.py-4
    img(src='~/assets/logo.png' width='150')
    //.absolute.top-0.right-0.rounded-bl-3xl.flex.bg-gray-300.py-3.px-4
      a.text-black.no-underline.cursor-pointer(@click="navigateTo('/addUser')") My Account
      img.h-6.w-6(src='~/assets/account.png')
    .flex.flex-col.gap-2
      .text-theme-primary.font-bold.text-3xl Contact Database
      .flex.gap-6
        NavLink(class="hover:bg-blue-600 rounded-lg hover:text-white p-2" to='/') Search Page
        NavLink(class="hover:bg-blue-600 rounded-lg hover:text-white p-2" v-if='isEditor || isAdmin' to='/editContact/?id=0') Add New Contact
        NavLink(class="hover:bg-blue-600 rounded-lg hover:text-white p-2" v-if='isAdmin' to='/admin') Admin Page
        NavLink(class="hover:bg-blue-600 rounded-lg hover:text-white p-2" v-if='isAdmin' to='/manageTags') Manage Tags
        a.no-underline.cursor-pointer(v-if="isLoggedIn" @click="handleLogout" class="hover:bg-blue-600 rounded-lg hover:text-white p-2") Logout
  NuxtPage.h-full.px-8
  
</template>

<script setup lang="ts">
import { authClient } from '~/utils/auth-client';

const runtime = useRuntimeConfig();
const router = useRouter();
const routes = ref(router.getRoutes());
const route = useRoute();
const uduser = useCookie('uduser');
const isSearch = computed(() => route.path == "/Search/");

if (!uduser.value && route.path !== '/login') {
  await navigateTo('/login');
}

const handleLogout = async () => {
  await authClient.signOut();
  uduser.value = null; // Clear cookie
  await navigateTo('/login');
};

const id_info = computed(() => uduser.value?.id);
const id = id_info.value as string;

const isLoggedIn = computed(() => !!uduser.value);
const isViewer = computed(() => uduser.value?.permission == "VIEWER");
const isEditor = computed(() => uduser.value?.permission == "EDITOR");
const isAdmin = computed(() => uduser.value?.permission == "ADMIN");

</script>
<style></style>