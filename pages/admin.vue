<template>
    <div>
      <h1>All Users</h1>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.username }}: {{ user.permission }}</li>
      </ul>
      <br>
      <NuxtLink to="search">back</NuxtLink>

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
  