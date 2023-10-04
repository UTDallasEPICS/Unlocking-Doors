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
      NuxtLink.add-contact-button(to='addContact') Add Contact
      br
      br
      NuxtLink.admin-button(to='admin') Admin Page
    .search-container
      .search-bar
        input(type='text' placeholder='Search...' v-model='searchQuery')
      table
        thead
          tr
            th Last Name
            th First Name
            th Phone
            th Email
            th Company
        tbody
          tr(v-for='contact in filteredContacts' :key='contact.id' @click='showContactDetails(contact)')
            td {{ contact.lastName }}
            td {{ contact.firstName }}
            td {{ contact.mainPhone }}
            td {{ contact.emailAddress }}
            td {{ contact.company }}
            td
      .pagination-controls
        button(@click='previousPage' :disabled='currentPage === 1') Previous
        span {{ currentPage }} / {{ totalPages }}
        button(@click='nextPage' :disabled='currentPage === totalPages') Next
    .card-overlay(v-if='selectedContact')
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
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        contacts: [],
        searchQuery: '',
        selectedContact: null,
        isDeleting: false,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created() {
      this.fetchContacts();
    },
    methods: {
      async fetchContacts() {
        try {
          const { data } = await axios.get('http://localhost:3000/api/contactGet', {
            method: 'GET',
          });
          this.contacts = data;
        } catch (error) {
          console.error(error);
        }
      },
      search() {
        axios.get('http://localhost:3000/api/contactName', {method: 'GET'}, {
          params: {
            firstName: this.searchQuery,
            lastName: this.searchQuery,
            company: this.searchQuery
          }
        })
          .then(response => {
            this.contacts = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      showContactDetails(contact) {
        this.selectedContact = contact;
      },
      updateContact() {
        axios.put(`http://localhost:3000/api/contactPut/${this.selectedContact.id}`, {method: 'PUT'}, this.selectedContact)
          .then(response => {
            console.log('Contact updated successfully:', response.data);
          })
          .catch(error => {
            console.error('Error updating contact:', error);
          });
      },
      confirmDeleteContact(contactId) {
        if (confirm("Are you sure you want to delete this contact?")) {
          this.deleteContact(contactId);
        }
      },
      deleteContact(contactId) {
        axios.delete(`http://localhost:3000/api/contactDelete/${contactId}`, {method: 'DELETE'})
          .then(response => {
            console.log('Contact deleted successfully:', response.data);
            this.fetchContacts(); // Refresh the contact list after deletion
          })
          .catch(error => {
            console.error('Error deleting contact:', error);
          });
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
  
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
    },
    computed: {
    filteredContacts() {
      let filteredContacts = this.contacts;
  
      if (this.searchQuery) {
        filteredContacts = filteredContacts.filter(contact => {
          return (
            contact.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            contact.company.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      }
  
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return filteredContacts.slice(startIndex, endIndex);
    },
  
    totalPages() {
      return Math.ceil(this.contacts.length / this.pageSize);
    },
  }
  
  
  }
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
    