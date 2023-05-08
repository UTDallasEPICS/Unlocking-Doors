<template>
    <div class="container">
      <div class="sidebar">
        <div class="logo">
          <img src="~/assets/logo.png" width="150" height="auto" />
        </div>
      </div>
      <div class="add-container">
        <form @submit.prevent="createUser">
            <div class="form-group">
                <label for="username">Username:</label>
                <input name="username" v-model="username" />
              </div>
              <div class="form-group">
                <label for="permission">Permission:</label>
                <input name="permission" v-model="permission" />
              </div>
            
            <br>
            <br>
            <button type="submit">Create User</button>              
        </form>

        <br><br><NuxtLink to="admin">back</NuxtLink>

      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      permission: ''
    };
  },
  methods: {
    async createUser() {
      try {
        const response = await axios.post('/api/user', {
          username: this.username,
          permission: this.permission
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