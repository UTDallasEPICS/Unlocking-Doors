<template>
  <div class="container">
    <div class="sidebar">
      <div class="logo">
        <img src="~/assets/logo.png" alt="Logo" width="150" height="auto" />
      </div>
    </div>
    <div class="main-content">
      <h1>Users</h1>
      <ul class="user-list">
        <li v-for="user in users" :key="user.id" class="user-item">
          <span class="username">{{ user.username }}</span>
          <span class="permission">{{ user.permission }}</span>
        </li>
      </ul>

      <br>
      <br>
      <NuxtLink to="addUser">Add User</NuxtLink>
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
        users: [],
      }
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        const { data } = await axios.get('/api/user');
        this.users = data;
      }
    },
    computed: {

    }
  }
  </script>
  
  <style>
  body {
    background-color: white;
    margin: 0
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
  
  .main-content {
    flex: 1;
    margin: 20px;
  }
  
  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .user-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .user-item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .username {
    font-weight: bold;
    font-size: 18px;
  }
  
  .permission {
    color: #666;
    font-size: 14px;
  }
  </style>