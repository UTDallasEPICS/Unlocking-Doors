
<template lang="pug">
NuxtPage.grow
</template>
    
<script setup lang="ts">
const runtime = useRuntimeConfig()
const router = useRouter()
const routes = ref(router.getRoutes())
const route = useRoute()
const cvCookie = useCookie('cvtoken')
const cvuser = useCookie('cvuser')
const isSearch = computed(() => route.path == "/Search/")

if(!cvCookie.value)
{
    await navigateTo('/api/login')
}

</script>