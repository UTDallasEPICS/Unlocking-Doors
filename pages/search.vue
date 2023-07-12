<template>
  <div class="container">
    <div class="sidebar">
      <div class="logo">
        <img src="~/assets/logo.png" width="150" height="auto" />
      </div>
      <div class="search-through">
        <strong>Groups</strong>
        <select>
          <option >Board Members</option>
          <option >Donors</option>
          <option >Providers</option>
        </select>
      </div>
      <div class="search-through">
        <strong>Tags</strong>
        <select>
          <option>Options</option>
        </select>
      </div>

      <br>
      <br>
      <br>

      <NuxtLink to="addContact" class="add-contact-button">Add Contact</NuxtLink> <br><br>
      <NuxtLink to="admin" class="admin-button">Admin Page</NuxtLink>
    </div>
    <div class="search-container">
      <div class="search-bar">
        <input type="text" placeholder="Search..." v-model="searchQuery">
      </div>
      <table> 
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in filteredContacts" :key="contact.id" @click="showContactDetails(contact)">
            <td>{{ contact.lastName }}</td>
            <td>{{ contact.firstName }}</td>
            <td>{{ contact.mainPhone }}</td>
            <td>{{ contact.emailAddress }}</td>
            <td>{{ contact.company }}</td>
            <td>
              </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-controls">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <div class="card-overlay" v-if="selectedContact">
      <div class="card">
        <h2>{{ selectedContact.firstName }} {{ selectedContact.lastName }}</h2>
        <p>Company: <input v-model="selectedContact.company"></p>
        <p>Prefix: <input v-model="selectedContact.prefix"></p>
        <p>Suffix: <input v-model="selectedContact.suffix"></p>
        <p>Salutation: <input v-model="selectedContact.salutation"></p>
        <p>Professional Title: <input v-model="selectedContact.professionalTitle"></p>
        <p>Address: <input v-model="selectedContact.address"></p>
        <p>City: <input v-model="selectedContact.city"></p>
        <p>State: <input v-model="selectedContact.state"></p>
        <p>Zip Code: <input v-model="selectedContact.zipCode"></p>
        <p>Country: <input v-model="selectedContact.country"></p>
        <p>Main Phone: <input v-model="selectedContact.mainPhone"></p>
        <p>Direct Phone: <input v-model="selectedContact.directPhone"></p>
        <p>Mobile Phone: <input v-model="selectedContact.mobilePhone"></p>
        <p>Email: <input v-model="selectedContact.emailAddress"></p>
        <p>Narrative: <textarea v-model="selectedContact.narrative"></textarea></p>
        <button @click="updateContact">Save</button>
        <button @click="selectedContact = null">Close</button>
        <button @click="confirmDeleteContact(selectedContact.id)">Delete</button>
      </div>      
    </div>
  </div>
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
        const { data } = await axios.get('http://localhost:5000/contact');
        this.contacts = data;
      } catch (error) {
        console.error(error);
      }
    },
    search() {
      axios.get('http://localhost:5000/contact/searchByName', {
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
      axios.put(`http://localhost:5000/contact/${this.selectedContact.id}`, this.selectedContact)
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
      axios.delete(`http://localhost:5000/contact/${contactId}`)
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


  <style>

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
  