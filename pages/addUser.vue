<template lang="pug">
.container
  .sidebar
    .logo
      img(src='~/assets/logo.png' width='150' height='auto')
    br
    br
    NuxtLink.admin-button(to='admin') Admin Page
  .add-container
    form(@submit.prevent='createUser')
      .form-group
        label(for='username') Username:
        input(name='username' v-model='username')
      .form-group
        label(for='permission') Permission:
        input(name='permission' v-model='permission')
      br
      br
      button(type='submit') Create User
  </template>
  
  <script setup>
import { axios } from 'axios';
import { ref } from "vue";

const username = ref('');
const permission = ref('');

const createUser = async() => {
  try {
    const response = await axios.post('http://localhost:5000/user', {
      username: this.username,
      permission: this.permission
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
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
      
      .admin-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin-left: 50px;
      }
    
    </style>