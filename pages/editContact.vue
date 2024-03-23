<template lang="pug">
.container
        .sidebar
          .logo
            img(src='~/assets/logo.png' width='150' height='auto')
          .search-column
            .search-through
              strong Search Through
            .search-through
              select
                option(value='all') Tags
                option(value='posts') Board Members
                option(value='comments') Donors
                option(value='users') Providers
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
          .add-container-bg
            .add-container
              .add-container-contents
                strong Edit Contact
                form(@submit.prevent='updateContact' @keydown.enter.prevent)
                  .columns
                    .first-column
                      .form-group
                        label(for='firstName') First Name:
                        input(v-model='contact.firstName')
                      .form-group
                        label(for='lastName') Last Name:
                        input(v-model='contact.lastName')
                      .form-group
                        label(for='company') Company:
                        input(v-model='contact.company')
                      .form-group
                        label(for='prefix') Prefix:
                        input(v-model='contact.prefix')
                      .form-group
                        label(for='suffix') Suffix:
                        input(v-model='contact.suffix')
                      .form-group
                        label(for='salutation') Salutation:
                        input(v-model='contact.salutation')
                      .form-group
                        label(for='professionalTitle') Professional Title:
                        input(v-model='contact.professionalTitle')
                    .second-column
                      .form-group
                        label(for='address') Address:
                        input(v-model='contact.address')
                      .form-group
                        label(for='city') City:
                        input(v-model='contact.city')
                      .form-group
                        label(for='state') State:
                        input(v-model='contact.state')
                      .form-group
                        label(for='zipCode') Zip Code:
                        input(v-model='contact.zipCode')
                      .form-group
                        label(for='country') Country:
                        input(v-model='contact.country')
                      .form-group
                        label(for='mainPhone') Main Phone:
                        input(v-model='contact.mainPhone')
                      .form-group
                        label(for='directPhone') Direct Phone:
                        input(v-model='contact.directPhone')
                      .form-group
                        label(for='mobilePhone') Mobile Phone:
                        input(v-model='contact.mobilePhone')
                      .form-group
                        label(for='emailAddress') Email Address:
                        input(v-model='contact.emailAddress')
                    .third-column
                      .form-group.narrative
                        label(for='narrative') Narrative:
                        textarea(v-model='contact.narrative')
                      .form-group.tag
                    br
                    br
                    .buttons
                        button(type='submit') Save
                        a.cancel-button(@click="cancelEdit") Cancel
</template>
        
       <script setup>
       import { ref, onMounted } from 'vue';
       import { useRouter, useRoute } from 'vue-router';
       const router = useRouter();
       const route = useRoute();
       const prefix = ref('');
       const firstName = ref('');
       const lastName = ref('');
       const suffix = ref('');
       const salutation = ref('');
       const professionalTitle = ref('');
       const address = ref('');
       const city = ref('');
       const state = ref('');
       const zipCode = ref('');
       const country = ref('');
       const mainPhone = ref('');
       const directPhone = ref('');
       const mobilePhone = ref('');
       const emailAddress = ref('');
       const narrative = ref('');
       const company = ref('');
       const tag = ref([]);
      
const {data: contact } = await useFetch(`/api/contact/?id=${route.query.id}`) 

    const updateContact = async () => {
        const data = await $fetch('/api/contact', {
            method: 'PUT',
            body: contact,
            params: {
                contactId: contact.id
            }
        })
        router.push('/');
    };
    
    const cancelEdit = () => {
      router.push('/');
    };
    
    
       </script>
        
<style scoped>

  .body {
    background-color: white;
    width: 83.7%;
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

  .top-bar {
    position: relative;
    height: 20%;
    font-family: "Poppins";
    color: #034EA2;
  }

  .top-bar > .account-bar {
    padding: 7px 30px;
    position: absolute;
    top: -8%;
    right: -1%;
    border-radius: 0 0 0 20px;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: row;
  }

  .top-bar > .account-bar > a.my-account-button {
    font-family: "Poppins";
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
    padding: 25px 0 10px 35px;
  }

  .search-through {
    display: flex;
    flex-direction: column;
    padding: 15px 13px 0 15px;
    font-size: 17px;
    font-weight: bold;
    font-family: 'Poppins';
  }
  
  .search-through select {
    margin-top: 10px;
    font: 16px 'Poppins';
    border: transparent;
    border-radius: 10px;
    padding: 5px;
    background-color: #D9D9D9;
  }

  .checkbox {
    display: flex;
    flex-direction: row;
    padding: 6px 0;
  }

  .checkbox > input {
    cursor: pointer;
    height: 15px;
  }

  .checkbox-label {
    font: 300 15px 'Poppins';
    padding-left: 10px;
  }

  .selected-filters {
    display: flex;
    flex-direction: column;
    padding: 20px 10px 0 15px;
    font: bold 17px 'Poppins';
    flex-grow: 1;
  }

  .filters {
    margin-top: 8px;
    height: 250px;
    border-radius: 10px;
    background-color: #D9D9D9;
  }

  .add-container-bg {
    background-color: #D9D9D9;
    margin-left: 10px;
    border-radius: 20px 0 0 0;
    box-shadow: inset 0 0 15px #717171;
    height: 83%;
    width: 100%;
    position: absolute;
    bottom: -1%;
    right: -1%;
  }

  .add-container {
    position: relative;
    height: 91%;
    width: 95%;
    margin: 25px 0 0 30px;
    border-radius: 20px;
    background-color: white;
  }

  .add-container-contents {
    padding: 20px 40px 0;
  }

  .add-container-contents > strong {
    font: bold 20px 'Poppins';
  }

  .add-container-contents > form {
    padding-top: 10px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    text-align: center;
  }

  .buttons > button,
  .buttons > a {
    position: absolute;
    bottom: 5%;
    font: 600 14px 'Poppins';
    padding: 5px;
    border: 2px solid;
    border-radius: 20px;
    cursor: pointer;
    width: 15%;
  }

  .buttons > button {
    left: 32%;
    background-color: #034EA2;
    color: white;
  }

  .buttons > a {
    right: 32%;
    background-color: #848484;
    color: white;
  }

  .form-group {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
  }

  .form-group > label {
    width: 100%;
    padding-right: 10px;
    font: 15px 'Poppins';
    text-align: left;
  }

  .form-group > input,
  .form-group > textarea {
    padding: 3px 7px;
    border: 2px solid #D9D9D9;
    border-radius: 20px;
    font-family: 'Poppins';
  }

  .form-group > textarea {
    width: 200px;
    resize: none;
  }

  .columns {
    display: flex;
    flex-direction: row;
  }

  .second-column {
    padding: 0 30px;
  }

  .narrative {
    height: 100px;
  }

  .narrative > label {
    margin-right: -30px;
  }

</style>

