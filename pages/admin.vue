<template lang="pug">
.container
    .sidebar
      .logo
        img(src='~/assets/logo.png' alt='Logo' width='150')
      .left-column
        br
        br
        br
        br
        br
        br
        NuxtLink.button.add-user-button(@click="navigateTo('/addUser')") Add User
    .body
      .top-bar 
        .account-bar 
          a.my-account-button(@click="navigateTo('/addUser')") My Account
          img(src='~/assets/account.png')
        .title 
          strong Contact Database
        a.search-page-button(@click="navigateTo('/')") Search Page
        a.text |
        a.add-contact-button(@click="navigateTo('/addContact')") Add New Contact
        a.text |
        a.admin-page-button(@click="navigateTo('/admin')") Admin Page
      .admin-container-bg 
        .admin-container 
          .admin-container-contents 
            strong USERS
            ul.user-list
              li.user-item(v-for='user in users' :key='user.id')
                .user-container
                  .label USER
                  span.username {{ user.username }}
                  .label PRIVILEGE
                  span.permission {{ user.permission }}                  
                button.delete-button(@click='confirmDeleteUser(user.username)') 
            br
            br
</template>
    
    <script setup>
    //import axios from 'axios';
    import { ref, onMounted } from 'vue';
    
    
    //const users = ref([]);
    const usernameToDelete = ref('');
    
    /*
    const createUser = async () => {
          const { data } = await useFetch('/api/user', {
            method: 'POST',
            body: {
              username: username,
              permission: permission
            }
          })
        }
    
        const createUser = async () => {
          try {
            const response = await axios.post('http://localhost:5000/user', {
              username: this.username,
              permission: this.permission
            });
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
      
        */
    
      const { data: users } = await useFetch('/api/user', {
        method: 'GET',
        default () {
          return []
        },
      })
    
    /*
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/user');
        users.value = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    */
    const confirmDeleteUser = (username) => {
      const confirmed = confirm(`Are you sure you want to delete the user ${username}?`);
      if (confirmed) {
        deleteUser(username);
      }
    };
    
    const deleteUser = async (username) => {
      const params = new URLSearchParams();
      params.append('username', username);
    
      const response = await fetch('/api/user/?' + params.toString(), { method: 'DELETE' });
    };
    
    /*
    const deleteUser = async (username) => {
      try {
        await axios.delete(`http://localhost:5000/user/${username}`);
        //fetchUsers(); // Refresh the user list after deletion
        console.log(`User with username ${username} has been deleted.`);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
    */
    
    //await fetchUsers();
    // data() {
    //   return {
    //     users: [],
    //     usernameToDelete: '',
    //   }
    // },
    // created() {
    //   this.fetchUsers();
    // },
    // methods: {
    //   async fetchUsers() {
    //     try {
    //       const { data } = await axios.get('http://localhost:5000/user');
    //       this.users = data;
    //     } catch (error) {
    //       console.error('Error fetching users:', error);
    //     }
    //   },
    //   confirmDeleteUser(username) {
    //     const confirmed = confirm(`Are you sure you want to delete the user ${username}?`);
    //     if (confirmed) {
    //       this.deleteUser(username);
    //     }
    //   },
    //   async deleteUser(username) {
    //     try {
    //       await axios.delete(`http://localhost:5000/user/${username}`);
    //       this.fetchUsers(); // Refresh the user list after deletion
    //       console.log(`User with username ${username} has been deleted.`);
    //     } catch (error) {
    //       console.error('Error deleting user:', error);
    //     }
    //   },
    // },
    
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
  
    .left-column {
      padding: 70px 0;
      text-align: center;
      display: absolute;
      flex-direction: column;
      padding: 15px 13px 0 15px;
      font-size: 17px;
      font-weight: bold;
      font-family: 'AccidentalPresidency';
      color: #034EA2;
      cursor: pointer;
    }
  
    .top-bar {
      width: 100%;
      position: relative;
      height: 20%;
      font-family: "AccidentalPresidency";
      color: #034EA2;
    }
  
    .top-bar > .account-bar {
      padding: 7px 35px;
      position: absolute;
      top: -8%;
      right: -1%;
      border-radius: 0 0 0 20px;
      background-color: #D9D9D9;
      display: flex;
      flex-direction: row;
    }
  
    .top-bar > .account-bar > a.my-account-button {
      font-family: "AccidentalPresidency";
      color: black !important;
      margin-right: 20px;
      cursor: pointer;
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
  
    .top-bar > .add-contact-button,
    .top-bar > .search-page-button,
    .top-bar > .admin-page-button {
      cursor: pointer;
    }
  
    .logo {
      padding: 25px 0px 10px 35px;
    }
  
    .admin-container-bg {
      background-color:#D9D9D9;
      margin-left: 10px;
      border-radius: 20px 0 0 0;
      box-shadow: inset 0 0 15px #717171;
      height: 83%;
      width: 100%;
      position: relative;
      bottom: -1%;
      right: -1%;
    }
  
    .admin-container-contents {
      padding: 20px 40px 0;
    }
  
    .admin-container-contents > strong {
      font: bold 20px 'AccidentalPresidency';
    }
  
    .user-item {
      list-style-type: none;
      justify-content: space-between;
      display: flex;
      height: 91%;
      width: 90%;
      margin: 25px 0 0 30px;
      border-radius: 20px;
      background-color: white;
    }
  
    .user-container {
      display: flex;
    }
  
    .label {
      position: relative;
      width: 30ch;
      text-align: center;
      margin-right: 10px;
      font: bold 15px 'AccidentalPresidency';
    }
  
    span {
      position: relative;
      width: 10ch;
      font-family: 'AccidentalPresidency';
    }
  
    button.delete-button {
      background-image: url('~/assets/bin.png');
      transition: background-color 0.3s;
    }
  
    button.delete-button:hover {
      background-color: red;
    }
  
  </style>
  