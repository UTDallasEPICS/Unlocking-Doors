<template lang="pug">
div
  .rounded-lg.p-8.bg-zinc-400.w-full
    .bg-white.rounded-lg.p-8
      .text-2xl.font-bold {{route.query.id != '0' ? 'Edit Contact' : 'Add New Contact'}}
      form.flex.flex-col.mt-2(@submit.prevent='updateContact' @keydown.enter.prevent) 
        .grid.grid-cols-1.gap-5(class="lg:grid-cols-2")
          .flex.flex-col.gap-2
            p.text-xl.font-semibold Info
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='prefix') Prefix:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.prefix')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='firstName') First Name:
              input.rounded-2xl.p-2.border.border-gray-400(name='firstName' v-model='contact.firstName')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='middleName') Middle Name:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.middleName')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='lastName') Last Name:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.lastName')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='suffix') Suffix:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.suffix')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='professionalTitle') Professional Title:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.professionalTitle')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='company') Company:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.company')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='mainPhone') Main Phone:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.mainPhone')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='directPhone') Direct Phone:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.directPhone')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='mobilePhone') Mobile Phone:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.mobilePhone')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='emailAddress') Email Address:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.emailAddress')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='narrative') Narrative:
              textarea.w-max.border.border-gray-400.p-2(v-model='contact.narrative')
          .flex.flex-col.gap-2
            p.text-xl.font-semibold Address One
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='address1') Street Address:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.address1')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='address1Type') Address Type:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.address1Type')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='city') City:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.city1')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='contact') State:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.state1')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='zipCode') Zip Code:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.zipCode1')
            p.text-xl.font-semibold Address Two
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='address2') Street Address:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.address2')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='address2Type') Address Type:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.address2Type')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='city2') City:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.city2')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='state2') State:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.state2')
            .flex.flex-col.justify-between(class="sm:flex-row")
              label.whitespace-nowrap.self-center(for='zipCode2') Zip Code:
              input.rounded-2xl.p-2.border.border-gray-400(v-model='contact.zipCode2')
            
            .flex.flex-col.justify-between
              Multiselect(
                placeholder="Search or add a tag"
                tag-placeholder="Add this as new tag"
                :multiple="true" 
                v-model="contact.tag" 
                :close-on-select="false" 
                open-direction="bottom" 
                :taggable="true" 
                :options="tags" 
                @tag="addNewTag"
              )
        button.self-end.bg-theme-primary.text-white.rounded-md.text-md.p-4.w-min.h-min.whitespace-nowrap(type='submit' class="hover:bg-blue-600 hover:text-white") {{route.query.id != '0' ? 'Update' : 'Create'}} Contact
</template>

<script setup lang="ts">
import Multiselect from 'vue-multiselect';
const router = useRouter();
const route = useRoute();

const { data: tags } = await useFetch('/api/tags', {
  default: () => [],
  transform: (data: Tag[]) => data.map(tag => (tag.name))
});
const { data: contact } = await useFetch(`/api/contact/`, {
  query: {
    id: route.query.id
  },
  default: () => ({ tag: [] }),
  transform: (data: any) => ({ ...data, tag: data.tag.map(({ name }) => name) })
});
const updateContact = async () => {
  try {
    const data = await $fetch('/api/contact', {
      method: route.query.id == '0' ? 'POST' : 'PUT',
      body: contact.value,
    });
    router.push('/');
  } catch (error) {
    console.error('Failed to update contact:', error);
  }
};

const cancelEdit = () => {
  router.push('/');
};

const addNewTag = (t: string) => { contact.value.tag.push(t); };
</script>

<style scoped></style>
