<template lang="pug">
  
.container
        .sidebar
          .logo
            img(src='~/assets/logo.png' width='150')
          .search-column
            .search-through
        .body
          .top-bar
            .account-bar
              a.logout-link(href='/api/logout') Logout
              img(src='~/assets/account.png')
            .title
              strong Removed Contacts
            a.search-page-button(@click="navigateTo('/')") Search Page
            a.text |
            a.recover-title Recover Contacts
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
                    img.edit-contact-icon(src='~/assets/recover.png' alt='Recover' @click="confirmAction(contact, 'recover')")
                    img.delete-button(src='~/assets/delete.png' alt='Delete' @click="deleteContact(contact)")

            
</template>
    
    
   <script lang='ts' setup>
   import type { User } from '@/types.d'
   import { ref } from "vue";
  
   import { useFetch } from "nuxt/app"
   const contact = ref([]);
   const searchQuery = ref('');
   const tagFilter = ref([]);
   const selectedContact = ref(null);
   import { useRouter } from 'vue-router';
   const router = useRouter();

  const deleteContact = async (contact:any) => {
    const confirmDelete = confirm(`Are you sure you want to permanently delete ${contact.firstName} ${contact.lastName}?`);

    if (confirmDelete) {
      const response = await $fetch(`/api/contacts?contactId=${contact.id}`, {
        method: 'DELETE',
      });

      router.push('/');
    }

};


  const confirmAction = async (contact:any, action:String) => {
  let confirmMessage;

  confirmMessage = `Are you sure you want to recover ${contact.firstName} ${contact.lastName}?`;

  const confirmActionDialog = confirm(confirmMessage);

  if (confirmActionDialog) {

      const response = await $fetch(`/api/recover-contact?contactId=${contact.id}&action=${action}`, {
        method: 'PUT',
      });
        router.push('/'); // Redirect to the homepage after successful action
      }
   
};




    const { data: searchResults, refresh:search } = await useFetch('/api/contacts', {
    method: 'GET',
    params: {
      searchQuery,
      tag: tagFilter,
      showRemoved: true,
    }
  });

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
      
    }

    .top-bar > .recover-title{
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

    .actions-container {
  position: absolute;
  right: 50px; 
    }

  .edit-contact-icon{
    margin-top: 15px;
    width: 40px;
    height: 40px;
    cursor:pointer;
    margin-right: 15px;
    transition: background-color 0.3s ease;
    border-radius: 50%;
     }

  .edit-contact-icon:hover {
  background-color: #cecdcd; 
    }

  .delete-button{
    width: 40px;
    height: 40px;
    cursor:pointer;
    transition: background-color 0.3s ease;
    border-radius: 50%;
  }

  .delete-button:hover {
    background-color: #cecdcd; 
  }
  </style>