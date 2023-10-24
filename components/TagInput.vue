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
    </div>
</template>
  
<script>
import { ref, computed, watch } from 'vue';

export default {
    props: {
        modelValue: Array
    },

    setup(props, { emit }) {
        const tags = ref([]);
        const currentTag = ref('');

        const addTag = () => {
            if (currentTag.value) {
                tags.value.push({ id: Date.now(), text: currentTag.value });
                currentTag.value = '';
                emit('update:modelValue', tags.value.map(tag => tag.text));
            }
        };

        const removeTag = (id) => {
            tags.value = tags.value.filter((tag) => tag.id !== id);
            emit('update:modelValue', tags.value.map(tag => tag.text));
        };

        // Create a computed property to extract and store the text values only
        const tag = computed(() => tags.value.map(tag => tag.text));

        // log changes to the tag array
        watch(tag, (newVal) => {
            console.log(newVal);
        });

        return {
            tags,
            currentTag,
            addTag,
            removeTag,
            tag,
        };
    }
}
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
  </style>
  