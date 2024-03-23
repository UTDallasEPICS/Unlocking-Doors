<template lang="pug">
  
.container
      .sidebar
        .logo
          img(src='~/assets/logo.png' width='150')
        .search-column
          .search-through
            strong Tags
            select(v-model="tagFilter")
              option(value="None") None1
              option(v-for="tag in tags" :value="tag") {{ tag }}
      .body
        .top-bar
          .account-bar
            a.logout-link(href='/api/logout') Logout
            img(src='~/assets/account.png')
          .title
            strong Contact Database
          a.search-page-button(@click="navigateTo('/')") Search Page
          a.text |
          NuxtLink.add-contact-button(v-if='isEditor || isAdmin' to='addContact') Add New Contact
          a.text(v-if='isEditor || isAdmin') |
          NuxtLink.admin-page-button(v-if='isAdmin' to='admin') Admin Page
          button(@click="downloadContacts()") Download Contacts
        .search-container
          .search-bar
            input(type='text' placeholder='Search...' v-model='searchQuery')
            button(@click='contacts = search(searchQuery)') Search
          table
            tbody
              tr(v-for='contact in searchResults' :key='contact.id' @click='isEditor || isAdmin ? editContact(contact): null')
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
          .pagination
            button(@click="prevPage()") Previous
            span  Page {{ currentPage }} 
            button(@click="nextPage()") Next
          
</template>
  
  
 <script lang='ts' setup>
 import type { User } from '@/types.d'
 import { ref } from "vue";
 //import { useFetch } from "nuxt/app"
 const contact = ref([]);
 const searchQuery = ref('');
 const tagFilter = ref('None');
 const selectedContact = ref(null);
 import { useRouter } from 'vue-router';
 const router = useRouter();

  const user = useCookie<User>('cvuser');
  const id_info = computed(() => user.value?.id)
  const id = id_info.value as number
  const isViewer = computed(() => user.value?.permission == "VIEWER")
  const isEditor = computed(() => user.value?.permission == "EDITOR")
  const isAdmin = computed(() => user.value?.permission == "ADMIN")

  const currentPage = ref(1);
  const pageSize = ref(10);

  const cursors = ref([0]);
  const cursor = ref(0);

/*
  const prevPage = () => {
    const last = searchResults.value.length - 1; // would it be from cursors array
    const newCursor = searchResults.value[last]?.id;
    cursor.value = newCursor;
    refresh();
  };

  //update to which cursor?
const nextPage = () => {
  console.log("nextpage");
  refresh();
};
*/

const downloadContacts = () => {
  console.log("hi")
  
};

 

  const { data: tags} = await useFetch('/api/tag', {
    method: 'GET',
  });
  const { data: searchResults, refresh:search } = await useFetch('/api/contacts', {
    method: 'GET',
    params: {
      searchQuery,
      tag: tagFilter,
    }
  });

  const editContact = (contact: any) => {
    router.push({ path: `/editContact/`, query: {id: contact.id}} ); 
  };
 </script>
  
  
<style scoped>
  .body {
    background-color: white;
    width: 80%;
    position: relative;
  }

  .container {
    display: flex;
    min-width: 1280px;
  }

  .sidebar {
    height: 97.8vh;
    width: 16%;
    position: relative;
    top: 0;
    left: 0;
  }

  .top-bar {
    position: relative;
    height: 20%;
    font-family: "Poppins";
    color: #034EA2;
  }

  .top-bar > .account-bar {
    padding: 7px 30px;
    position: absolute;
    top: -8%;
    right: -1%;
    border-radius: 0 0 0 20px;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: row;
  }

  .top-bar > .account-bar > a.my-account-button {
    font-family: "Poppins";
    color: black !important;
    margin-right: 20px;
    cursor: pointer;
  }

  a.logout-link {
    color: #034EA2;
    text-decoration: none;
  }

  .top-bar > .account-bar > img {
    height: 25px;
    width: 25px;
  }

  .top-bar > .title {
    padding: 25px 0 0 30px;
    font-size: 28px;
  }

  .top-bar > a {
    margin-right: 20px;
  }

  .top-bar > .add-contact-button {
    cursor: pointer;
    text-decoration: none;
    color: #034EA2;
  }

  .top-bar > .search-page-button {
    padding-left: 30px;
    cursor: pointer;
    text-decoration: underline;
  }

  .top-bar > .admin-page-button {
    cursor: pointer;
    text-decoration: none;
    color: #034EA2;
  }

  .logo {
    padding: 25px 0 10px 35px;
  }

  .search-through {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 0 15px;
    font-size: 17px;
    font-weight: bold;
    font-family: 'Poppins';
  }
  
  .search-through select {
    margin-top: 10px;
    font: 16px 'Poppins';
    border: transparent;
    border-radius: 10px;
    padding: 5px;
    background-color: #D9D9D9;
  }

  .filter-communication {
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 15px;
    font: bold 17px 'Poppins';
  }

  .checkbox {
    display: flex;
    flex-direction: row;
    padding: 6px 0;
  }

  .checkbox > input {
    cursor: pointer;
    height: 15px;
  }

  .checkbox-label {
    font: 300 15px 'Poppins';
    padding-left: 10px;
  }

  .selected-filters {
    display: flex;
    flex-direction: column;
    padding: 20px 10px 0 15px;
    font: bold 17px 'Poppins';
    flex-grow: 1;
  }

  .filters {
    margin-top: 8px;
    height: 250px;
    border-radius: 10px;
    background-color: #D9D9D9;
  }
  
  .search-container {
    background-color: #D9D9D9;
    margin-left: 30px;
    border-radius: 20px 0 0 0;
    box-shadow: inset 0 0 15px #717171;
    height: 150%;
    width: 98%;
    position: absolute;
  }

  .search-bar {
    display: flex;
    margin-bottom: 25px;
    margin-top: 25px;
    margin-left: 25px;
    align-items: center;
  }

  .search-bar input {
    width: 85%;
    padding: 10px;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .search-bar button {
    height: 100%;
    margin-left: 10px; 
    padding: 10px;
    background-color: #3498db; 
    color: white;
    border: none;
    border-radius: 5px; 
    cursor: pointer;
    font-size: 16px; 
  }

  table {
    border-spacing: 0 10px;
    width: 95%;
    max-height: 80%;
    margin-left: 25px;
  }

  th, td {
    text-align: left;
    padding: 12px;
    height: 10px;
  }

  .center-text {
    text-align: center;
  }

  th {
    background-color: #ddd;
    border: 1px solid black;
  }

  td:first-child,
  th:first-child {
    border-radius: 10px 0 0 10px;
  }

  td:last-child,
  th:last-child {
    border-radius: 0 10px 10px 0;
  }

  tbody tr {
    border: 1px solid black;
    padding: 8px 0;
    background-color: white;
  }

  tbody tr:hover {
    background-color: #ddd;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .pagination button, .pagination span {
    padding: 8px 16px;
    margin: 0 5px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }

  .pagination button:hover {
    background-color: #f0f0f0;
  }

  .pagination span {
    background-color: #f0f0f0;
    cursor: default;
  }
</style>
