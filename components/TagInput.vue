<template>
  <div>
    <vue-multiselect
      v-if="availablePrivateCategories"
      :multiple="true"
      v-model="content.PrivateCategory"
      :close-on-select="false"
      open-direction="bottom"
      :taggable="true"
      :options="availablePrivateCategories"
      @tag="addPrivateCategory"
    ></vue-multiselect>
  </div>
</template>

<script setup>
  import VueMultiselect from 'vue-multiselect';

  const props = defineProps({
    availablePrivateCategories: Array,
    content: Object,
  });

  const emit = defineEmits();

  const addPrivateCategory = (e) => {
    content.value.PrivateCategory = [...(content.value.PrivateCategory || []), e];
  };
</script>

<style scoped>
  /* Add your custom styles here if needed */
</style>
