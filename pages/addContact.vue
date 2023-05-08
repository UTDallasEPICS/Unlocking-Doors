<template>
    <div class="container">
      <div class="sidebar">
        <div class="logo">
          <img src="~/assets/logo.png" width="150" height="auto" />
        </div>
        <div class="search-through">
          <strong>Search Through</strong>
          <select>
            <option value="all">Groups</option>
            <option value="posts">Board Members</option>
            <option value="comments">Donors</option>
            <option value="users">Providers</option>
          </select>
        </div>
        <div class="search-through">
          <strong>Search Through</strong>
          <select>
            <option value="all">Tags</option>
            <option value="posts">Board Members</option>
            <option value="comments">Donors</option>
            <option value="users">Providers</option>
          </select>
        </div>
      </div>
      <div class="add-container">
        <form @submit.prevent="createContact">
            <div class="form-group">
                <label for="prefix">Prefix:</label>
                <input v-model="prefix" />
              </div>
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input name="firstName" v-model="firstName" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input v-model="lastName" />
              </div>
              <div class="form-group">
                <label for="suffix">Suffix:</label>
                <input v-model="suffix" />
              </div>
              <div class="form-group">
                <label for="salutation">Salutation:</label>
                <input v-model="salutation" />
              </div>
              <div class="form-group">
                <label for="professionalTitle">Professional Title:</label>
                <input v-model="professionalTitle" />
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input v-model="address" />
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <input v-model="city" />
              </div>
              <div class="form-group">
                <label for="state">State:</label>
                <input v-model="state" />
              </div>
              <div class="form-group">
                <label for="zipCode">Zip Code:</label>
                <input v-model="zipCode" />
              </div>
              <div class="form-group">
                <label for="country">Country:</label>
                <input v-model="country" />
              </div>
              <div class="form-group">
                <label for="mainPhone">Main Phone:</label>
                <input v-model="mainPhone" />
              </div>
              <div class="form-group">
                <label for="directPhone">Direct Phone:</label>
                <input v-model="directPhone" />
              </div>
              <div class="form-group">
                <label for="mobilePhone">Mobile Phone:</label>
                <input v-model="mobilePhone" />
              </div>
              <div class="form-group">
                <label for="emailAddress">Email Address:</label>
                <input v-model="emailAddress" />
              </div>
              <div class="form-group narrative">
                <label for="narrative">Narrative:</label>
                <input v-model="narrative" />
              </div>
              <div class="form-group">
                <label for="company">Company:</label>
                <input v-model="company" />
              </div>
            
            <br>
            <br>
            <button type="submit">Create Contact</button>
        </form>

        <br>
        <NuxtLink to="search">back</NuxtLink>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      prefix: '',
      firstName: '',
      lastName: '',
      suffix: '',
      salutation: '',
      professionalTitle: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      mainPhone: '',
      directPhone: '',
      mobilePhone: '',
      emailAddress: '',
      narrative: '',
      company: ''
    };
  },
  methods: {
    async createContact() {
        console.log(this.firstName)
      try {
        const response = await axios.post('/api/contact', {
          prefix: this.prefix,
          firstName: this.firstName,
          lastName: this.lastName,
          suffix: this.suffix,
          salutation: this.salutation,
          professionalTitle: this.professionalTitle,
          address: this.address,
          city: this.city,
          state: this.state,
          zipCode: this.zipCode,
          country: this.country,
          mainPhone: this.mainPhone,
          directPhone: this.directPhone,
          mobilePhone: this.mobilePhone,
          emailAddress: this.emailAddress,
          narrative: this.narrative,
          company: this.company
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

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
    
      .add-container {
        margin: 50px 0 0 50px;
        flex-grow: 1;
      }

      .form-group {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
      }

      .narrative {
        height: 100px;
      }
      
      .form-group label {
        width: 150px;
        margin-right: 10px;
        text-align: right;
      }      
    
    </style>