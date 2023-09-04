<template lang="pug">
.container
  .sidebar
    .logo
      img(src='~/assets/logo.png' alt='Logo' width='150' height='auto')
    .action-buttons
      NuxtLink.button.add-user-button(to='addUser') Add a User
      br
      br
      NuxtLink.button.back-button(to='search') Search Page
  .main-content
    h1 Users
    ul.user-list
      li.user-item(v-for='user in users' :key='user.id')
        .user-info
          span.username {{ user.username }}
          span.permission {{ user.permission }}
        button.delete-button(@click='confirmDeleteUser(user.username)') Delete
    br
    br
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      usernameToDelete: '',
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await axios.get('http://localhost:5000/user');
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    confirmDeleteUser(username) {
      const confirmed = confirm(`Are you sure you want to delete the user ${username}?`);
      if (confirmed) {
        this.deleteUser(username);
      }
    },
    async deleteUser(username) {
      try {
        await axios.delete(`http://localhost:5000/user/${username}`);
        this.fetchUsers(); // Refresh the user list after deletion
        console.log(`User with username ${username} has been deleted.`);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
}
</script>

<style>
body {
  background-color: #f7f7f7;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  font-size: 18px;
}

.permission {
  color: #666;
  font-size: 14px;
}

.delete-button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  opacity: 0.8;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-user-button {
  background-color: #4caf50;
  color: #ffffff;
  margin-left: 50px;
}

.back-button {
  background-color: #1f609c;
  color: #ffffff;
  margin-left: 50px;
}

.add-user-button:hover,
.back-button:hover {
  opacity: 0.8;
}

</style>