<template lang="pug">
div
  .rounded-lg.p-8.bg-zinc-400.w-full
    .rounded-lg.p-8.flex.flex-col.gap-5
      .rounded-lg.flex.justify-between.bg-white.p-4
        .text-2xl.font-bold.self-center TAGS
      table.w-full.flex.flex-col.gap-2
        thead
          tr.grid.grid-cols-2.bg-white.rounded-lg.py-2
            th Name
            th Actions
        tbody.flex.flex-col.gap-2
          tr.grid.grid-cols-2.bg-white.rounded-lg.py-4(v-for='(tag, i) in tags' :key='tag.id')
            .flex.gap-4.px-4(v-if="editIndex == i")
              input.border.border-gray-400.rounded-2xl.p-2(
                type="text",
                v-model="tags[i].name",
                @keydown.enter="saveTag(tags[i])",
                @keydown.esc="cancelEdit(i)"
              )
              button.bg-theme-primary.text-white.rounded-md.text-md.p-2.w-min.h-min(@click="saveTag(tags[i])") Save
              button.bg-slate-400.text-white.rounded-md.text-md.p-2.w-min.h-min(@click="cancelEdit()") Cancel
            p.text-center.align-center(v-else)  {{ tag.name }}
            .flex.gap-5.justify-center
              img.cursor-pointer.w-6.h-6(src='~/assets/edit-icon.png' alt='Edit Contact' @click="editTag(i)")
              img.cursor-pointer.w-6.h-6(src='~/assets/remove.png' alt='Remove' @click="deleteTag(tag)")
</template>

<script lang="ts" setup>
import type { User, Tag } from '@/types.d';

const editIndex = ref<number | null>(null);

const { data: tags, refresh } = await useFetch('/api/tags');

const editTag = (index: number) => {
  editIndex.value = index;
};

const saveTag = async (tag: Tag) => {
  try {
    await useFetch(`/api/tag/?id=${tag.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: tag.name }),
      headers: { 'Content-Type': 'application/json' },
    });
    editIndex.value = null;
  } catch (error) {
    console.error('Error updating tag:', error);
  }
  refresh();
};

const cancelEdit = () => {
  editIndex.value = null;
};

const deleteTag = async (tag: Tag) => {
  if (confirm(`Are you sure you want to delete the tag "${tag.name}"?`)) {
    try {
      await useFetch(`/api/tag/?id=${tag.id}`, {
        method: 'DELETE',
      });
      refresh();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  }
};
</script>
