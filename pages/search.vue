<template lang="pug">
.container
    .sidebar
      .logo
        img(src='~/assets/logo.png' width='150' height='auto')
      .search-through
        strong Groups
        select
          option Board Members
          option Donors
          option Providers
      .search-through
        strong Tags
        select
          option Options
      br
      br
      br
      NuxtLink.add-contact-button(v-if='isEditor' || 'isAdmin' to='addContact') Add Contact
      br
      br
      NuxtLink.admin-button(v-if='isAdmin' to='admin') Admin Page
    .search-container
      .search-bar
        input(type='text' placeholder='Search...' v-model='searchQuery')
        button(@click='contacts = search(searchQuery)') Search
      table
        thead
          tr
            th Last Name
            th First Name
            th Phone
            th Email
            th Company
        tbody
          tr(v-for='contact in contacts' :key='contact.id' @click='showContactDetails(contact)')
            td {{ contact.lastName }}
            td {{ contact.firstName }}
            td {{ contact.mainPhone }}
            td {{ contact.emailAddress }}
            td {{ contact.company }}
            td
    .card-overlay(v-if='selectedContact' && ('isEditor' || 'isAdmin'))
      .card
        h2 {{ selectedContact.firstName }} {{ selectedContact.lastName }}
        p
          | Company: 
          input(v-model='selectedContact.company')
        p
          | Prefix: 
          input(v-model='selectedContact.prefix')
        p
          | Suffix: 
          input(v-model='selectedContact.suffix')
        p
          | Salutation: 
          input(v-model='selectedContact.salutation')
        p
          | Professional Title: 
          input(v-model='selectedContact.professionalTitle')
        p
          | Address: 
          input(v-model='selectedContact.address')
        p
          | City: 
          input(v-model='selectedContact.city')
        p
          | State: 
          input(v-model='selectedContact.state')
        p
          | Zip Code: 
          input(v-model='selectedContact.zipCode')
        p
          | Country: 
          input(v-model='selectedContact.country')
        p
          | Main Phone: 
          input(v-model='selectedContact.mainPhone')
        p
          | Direct Phone: 
          input(v-model='selectedContact.directPhone')
        p
          | Mobile Phone: 
          input(v-model='selectedContact.mobilePhone')
        p
          | Email: 
          input(v-model='selectedContact.emailAddress')
        p
          | Narrative: 
          textarea(v-model='selectedContact.narrative')
        button(@click='updateContact') Save
        button(@click='selectedContact = null') Close
        button(@click='confirmDeleteContact(selectedContact.id)') Delete
</template>
  
  
 <script lang="ts" setup>
 //import { axios } from 'axios';
 import { ref } from "vue";
 import type { User } from '@/types.d.ts'

 const contact = ref([]);
 const searchQuery = ref('');
 const selectedContact = ref(null);
 //isDeleting = false;
 //currentPage = 1;
 //pageSize = 10;

 //const ref

 const user = useCookie<User>('user');
 const id_info = computed(() => user.value?.id)
 const id = id_info.value as number
 const isViewer = computed(() => user.value?.permission == "VIEWER")
 const isEditor = computed(() => user.value?.permission == "EDITOR")
 const isAdmin = computed(() => user.value?.permission == "ADMIN")


 // add query here
  const { data: contacts } = await useFetch('/api/contact', {
      method: 'GET',
      //qeury property
      //pass in search queury ref
      default () {
        return []
      },
  });
  
 const search = async (searchQuery: any) => {
  const { data: searchResults } = await useFetch('/api/contactField', {
    method: 'GET',
    params: {
      firstName: searchQuery,
      lastName: searchQuery,
      company: searchQuery,
    }
  });

  console.log('API response:', searchResults);
  return searchResults
 }

 /*
 const search = () => {
   axios.get('http://localhost:5000/contact/searchByName', {
     params: {
       firstName: searchQuery,
       lastName: searchQuery,
       company: searchQuery
     }
   })
     .then(response => {
       this.contacts = response.data;
     })
     .catch(error => {
       console.error(error);
     });
 };
 */

 let showContactDetails = (contact: any) => {
   selectedContact.value = contact;
 };

 // $fetch instead of search fetch
 // query parameters intead of search parameters

 //?id = $

 //MAKE AYSNC FUNCTIONS
 ///await $fetch

 const updateContact = async () => {
  const contact = selectedContact?.value as unknown as {id: string} | undefined;
  if (contact) {
    try {
      /*axios.put(`http://localhost:5000/contact/${contact.id}`, contact)
      .await((response: any) => {
        console.log('Contact updated successfully:', response.data);
      })
      .catch((error: any) => {
        console.error('Error updating contact:', error);
      });*/
      const response = await fetch(`http://localhost:5000/contact/${contact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application.json',
        },
        body: JSON.stringify(contact),
      });
      
      if (!response.ok) {
        throw new Error('Error! ${response.status}');
      }

      const data = await response.json();
      console.log('Contact updated successfully:', data);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };
 }
 const confirmDeleteContact = (contactId: any) => {
   if (confirm("Are you sure you want to delete this contact?")) {
     //(this as unknown as { deleteContact?: (contact: any) => void })?.deleteContact?.(contactId);
     //const deleteContact = (contact as { deleteContact?: (contact: any) => void})?.deleteContact;
     deleteContact?.(contactId);
   }
 };
 const deleteContact = async (contactId: any) => {
   /*axios.delete(`http://localhost:5000/contact/${contactId}`)
     .await((response: any) => {
       console.log('Contact deleted successfully:', response.data);
       //this.fetchContacts(); // Refresh the contact list after deletion
        //(this as unknown as { fetchContacts: () => void }).fetchContacts();
     })
     .catch((error: any) => {
       console.error('Error deleting contact:', error);
     });*/
     try {
      const response = await fetch(`http://localhost:5000/contact/${contactId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error! ${response.status}');
      }

      const data = await response.json();
      console.log('Contact deleted successfully:', data);
     } catch (error) {
      console.error('Error deleting contact:', error);
     }
 };

 /*
  const filteredContacts = computed( () => {
        let filteredContacts = contacts;

  if (searchQuery) {
    filteredContacts = filteredContacts.filter(contact => {
      return (
        contact.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
     })
    };
   })
   */


 </script>
  
  
    <style scoped>
  
      body {
        background-color: white;
        margin: 0;
      }
    
      .container {
        display: flex;
      }
    
      .sidebar {
        height: 100vh;
        width: 250px;
        background-color: #f0f0f0;
      }
    
      .logo {
        padding: 25px 0 50px 50px;
      }
    
      .search-through {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        font-size: 20px;
        font-weight: bold;
      }
      
      .search-through select {
        margin-top: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px;
      }
    
      .search-container {
        margin: 50px 0 0 50px;
        flex-grow: 1;
      }
    
      .search-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 50px;
      }
    
      .search-bar input {
        width: 70%;
        padding: 20px;
        font-size: 24px;
        border: none;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
    
      .search-results {
        display: flex;
        flex-direction: column;
      }
  
    table {
      border-collapse: collapse;
      width: 90%;
    }
  
    th, td {
      text-align: left;
      padding: 8px;
    }
  
    th {
      background-color: #ddd;
    }
  
    tbody tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  
    tbody tr:hover {
      background-color: #ddd;
    }
  
    .add-contact-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-left: 50px;
    }
    
    .admin-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-left: 50px;
    }
    
    .add-contact-button:hover,
    .admin-button:hover {
      opacity: 0.8;
    }
  
    .card-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .card {
      width: 400px;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      overflow: auto;
    }
  
    </style>
    