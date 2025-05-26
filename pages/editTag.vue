<template lang="pug">
div
  .rounded-lg.p-8.bg-zinc-400.w-full
    .bg-white.rounded-lg.p-8
      .text-2xl.font-bold {{ route.query.id != '0' ? 'Edit Tag' : 'Add New Tag' }}
      form.flex.flex-col.mt-2(@submit.prevent='saveTag' @keydown.enter.prevent)
        .flex.flex-col.gap-2
          .flex.flex-col.justify-between(class="sm:flex-row")
            label.whitespace-nowrap.self-center(for='tagName') Tag Name:
            input.rounded-2xl.p-2.border.border-gray-400(name='tagName' v-model='tag.name' required)
        
        .flex.gap-4.mt-4.self-end
          button.bg-slate-400.text-white.rounded-md.text-md.p-4.w-min.h-min.whitespace-nowrap(type='button' @click="cancelEdit" class="hover:bg-slate-500") Cancel
          button.bg-theme-primary.text-white.rounded-md.text-md.p-4.w-min.h-min.whitespace-nowrap(type='submit' class="hover:bg-blue-600 hover:text-white") {{ route.query.id != '0' ? 'Update' : 'Create' }} Tag
</template>

<script setup lang="ts">
import type { Tag } from '@/types.d';

const router = useRouter();
const route = useRoute();

const { data: tag, error: fetchError } = await useFetch<Tag>(`/api/tag/`, {
  query: {
    id: route.query.id
  },
  immediate: route.query.id !== '0', // Only fetch if we are editing an existing tag
  default: () => ({ id: 0, name: '', removed: false, contacts: [] }), // Provide a default structure
});

if (fetchError.value && route.query.id !== '0') {
  console.error("Error fetching tag:", fetchError.value);
  // Optionally, redirect or show an error message to the user
  // router.push('/manageTags'); 
}


const saveTag = async () => {
  if (!tag.value?.name?.trim()) {
    alert('Tag name cannot be empty.');
    return;
  }
  try {
    const method = route.query.id === '0' ? 'POST' : 'PUT';
    const url = route.query.id === '0' ? '/api/tags' : `/api/tag?id=${tag.value.id}`;
    
    await $fetch(url, {
      method: method,
      body: { name: tag.value.name }, // Only send the name for POST, or name and id for PUT
    });
    router.push('/manageTags');
  } catch (error) {
    console.error('Failed to save tag:', error);
    // Handle error (e.g., show a notification to the user)
    alert('Failed to save tag. Please check the console for more details.');
  }
};

const cancelEdit = () => {
  router.push('/manageTags');
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
