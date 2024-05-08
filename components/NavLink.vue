<template lang="pug">
NuxtLink.no-underline.cursor-pointer.select-none(:to="to")
  slot
</template>

<script setup lang="ts">
defineProps<{ to: string; }>();
</script>