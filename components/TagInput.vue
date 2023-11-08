<template>
  <div>
    <div v-for="tag in tags" :key="tag.id" class="tag">
      <span @click="removeTag(tag.id)" class="remove-tag">x</span>
      {{ tag.text }}
    </div>
    <input
      v-model="currentTag"
      @keyup.enter="addTag"
      class="tag-input"
      placeholder="Add a tag"
    />

    <div v-if="duplicateTag" class="error-popup">
      Tags must be unique. Please try again.
    </div>
  </div>
</template>
  

<script setup>
  import { ref, computed, watch, defineProps, defineEmits } from 'vue';

  // Props
  const props = defineProps({
    modelValue: Array,
  });

  //Emits
  const emit = defineEmits();

  // Data
  const tags = ref([]);
  const currentTag = ref('');
  const duplicateTag = ref(false);

  // Methods
  const addTag = () => {
    if (currentTag.value) {
      const lowercaseTag = currentTag.value.toLowerCase();
      if (!tags.value.some(tag => tag.text.toLowerCase() === lowercaseTag)) {
        tags.value.push({ id: lowercaseTag, text: lowercaseTag });
        currentTag.value = '';
        emit('update:modelValue', tags.value.map(tag => tag.text));
        duplicateTag.value = false;
      }
      else {
        duplicateTag.value = true;
      }
    }
  };

  const removeTag = (id) => {
    tags.value = tags.value.filter((tag) => tag.id !== id);
    emit('update:modelValue', tags.value.map(tag => tag.text));
  };

  // Computed property
  const tag = computed(() => tags.value.map(tag => tag.text));

  // Watcher
  watch(tag, (newVal) => {
    console.log(newVal);
  });
</script>
  
<style scoped>
.tag {
  display: inline-block;
  margin: 5px;
  padding: 5px;
  background-color: #ccc;
  border-radius: 5px;
  color: #000
}

.remove-tag {
  cursor: pointer;
  margin-right: 5px;
}

.tag-input {
  border: 1px solid #ccc;
  padding: 5px;
}

.error-popup {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
