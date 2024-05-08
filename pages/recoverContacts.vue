<template lang="pug">
.container
  .search-column
    .search-through
.body
  .search-container
    .search-bar
      input(type='text' placeholder='Search...' v-model='searchQuery')
      button(@click='contacts = search(searchQuery)') Search
    table
      tbody
        tr(v-for='contact in searchResults' :key='contact.id')
          td.center-text #[strong {{ (contact.firstName &amp;&amp; contact.lastName) ? (contact.firstName + &apos; &apos; + contact.lastName) : (contact.firstName || contact.lastName || &apos;&apos;) }} ] 
          td #[strong EMAIL] 
            br
            br
            |{{ contact.emailAddress ? contact.emailAddress : &apos;&apos; }}
          td #[strong PHONE] 
            br
            br
            |{{ contact.mainPhone ? contact.mainPhone : &apos;&apos; }}
          td {{ contact.company ? contact.company : &apos;&apos; }}
          .actions-container
            img(src='~/assets/recover.png' alt='Recover' @click="confirmAction(contact, 'recover')")
            img(src='~/assets/delete.png' alt='Delete' @click="deleteContact(contact)")
</template>

<script lang='ts' setup>
import type { User } from '@/types.d';
const contact = ref([]);
const searchQuery = ref('');
const tagFilter = ref([]);
const selectedContact = ref(null);
const router = useRouter();

const deleteContact = async (contact: any) => {
  const confirmDelete = confirm(`Are you sure you want to permanently delete ${contact.firstName} ${contact.lastName}?`);

  if (confirmDelete) {
    const response = await $fetch(`/api/contact?contactId=${contact.id}`, {
      method: 'DELETE',
    });

    router.push('/');
  }

};

const confirmAction = async (contact: any, action: string) => {
  let confirmMessage;

  confirmMessage = `Are you sure you want to recover ${contact.firstName} ${contact.lastName}?`;

  const confirmActionDialog = confirm(confirmMessage);

  if (confirmActionDialog) {

    const response = await $fetch(`/api/contactStatusChanger?contactId=${contact.id}&action=${action}`, {
      method: 'PUT',
    });
    router.push('/'); // Redirect to the homepage after successful action
  }

};

const { data: searchResults, refresh: search } = await useFetch('/api/contacts', {
  method: 'GET',
  params: {
    searchQuery,
    tag: tagFilter,
    showRemoved: true,
  }
});

</script>
