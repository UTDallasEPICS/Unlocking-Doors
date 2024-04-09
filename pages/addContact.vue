<template lang="pug">
.container
      .sidebar
        .logo
          img(src='~/assets/logo.png' width='150' height='auto')
        .search-column
          .search-through
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
          NuxtLink.admin-page-button(v-if='isAdmin' to='admin') Admin Page
        .add-container-bg
          .add-container
            .add-container-contents
              strong Add New Contact
              form(@submit.prevent='createContact' @keydown.enter.prevent)
                .columns
                  .first-column
                    .form-group
                      label(for='prefix') Prefix:
                      input(v-model='state.prefix')
                    .form-group
                      label(for='firstName') First Name:
                      input(name='firstName' v-model='state.firstName')
                    .form-group
                      label(for='middleName') Middle Name:
                      input(v-model='state.middleName')
                    .form-group
                      label(for='lastName') Last Name:
                      input(v-model='state.lastName')
                    .form-group
                      label(for='suffix') Suffix:
                      input(v-model='state.suffix')
                    .form-group
                      label(for='professionalTitle') Professional Title:
                      input(v-model='state.professionalTitle')
                    .form-group
                      label(for='company') Company:
                      input(v-model='state.company')
                  .second-column
                    .form-group
                      label(for='address1') Address 1:
                      input(v-model='state.address1')
                    .form-group
                      label(for='city') City:
                      input(v-model='state.city1')
                    .form-group
                      label(for='state') State:
                      input(v-model='state.state1')
                    .form-group
                      label(for='zipCode') Zip Code:
                      input(v-model='state.zipCode1')
                    .form-group
                      label(for='address1Type') Address Type:
                      input(v-model='state.address1Type')
                    .form-group
                      label(for='address2') Address 2:
                      input(v-model='state.address2')
                    .form-group
                      label(for='city2') City:
                      input(v-model='state.city2')
                    .form-group
                      label(for='state2') State:
                      input(v-model='state.state2')
                    .form-group
                      label(for='zipCode2') Zip Code:
                      input(v-model='state.zipCode2')
                    .form-group
                      label(for='address2Type') Address Type:
                      input(v-model='state.address2Type')
                  .third-column
                    .form-group
                      label(for='mainPhone') Main Phone:
                      input(v-model='state.mainPhone')
                    .form-group
                      label(for='directPhone') Direct Phone:
                      input(v-model='state.directPhone')
                    .form-group
                      label(for='mobilePhone') Mobile Phone:
                      input(v-model='state.mobilePhone')
                    .form-group
                      label(for='emailAddress') Email Address:
                      input(v-model='state.emailAddress')
                    .form-group.narrative
                      label(for='narrative') Narrative:
                      textarea(v-model='state.narrative')
                    .form-group
                      Multiselect(
                        placeholder="Search or add a tag"
                        tag-placeholder="Add this as new tag"
                        :multiple="true" 
                        v-model="state.tag" 
                        :close-on-select="false" 
                        open-direction="bottom" 
                        :taggable="true" 
                        :options="tags" 
                        @tag="addNewTag"
                        )
                  br
                  br
                  .create-contact-button
                    button(type='submit') Create Contact
</template>
    
<script lang='ts' setup>
import "vue-multiselect/dist/vue-multiselect.css";

import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect';
const router = useRouter();

import type { User } from '@/types.d'
  const user = useCookie<User>('cvuser');
  const id_info = computed(() => user.value?.id)
  const id = id_info.value as number
  const isViewer = computed(() => user.value?.permission == "VIEWER")
  const isEditor = computed(() => user.value?.permission == "EDITOR")
  const isAdmin = computed(() => user.value?.permission == "ADMIN")

  const state = ref({
    prefix : '',
    firstName : '',
    middleName : '',
    lastName : '',
    suffix : '',
    professionalTitle : '',
    address1 : '',
    city1 : '',
    state1 : '',
    zipCode1 : '',
    address1Type : '',
    address2 : '',
    city2 : '',
    state2 : '',
    zipCode2 : '',
    address2Type : '',
    mainPhone : '',
    directPhone : '',
    mobilePhone : '',
    emailAddress : '',
    narrative : '',
    company : '',
    tag : [] as string[],
    existingTags : [] as string[],
    date : new Date()
  });

const createContact = async () => {

  if (!state.value.firstName || !state.value.lastName) {
    alert('Both First Name and Last Name are required.');
    return;
  }

  console.log("Current tags:", state.value.tag);

  if (!state.value.tag || state.value.tag.length === 0) {
    alert('Please assign at least one tag to the contact.');
    return; // Stop the function from proceeding further
  }

  console.log("Entered create contact");
  const { data } = await useFetch('/api/contact', {
    method: 'POST',
    body: state.value
  });
  console.log("Entered passed create contact");
  router.push('/');
};


const { data: tags} = await useFetch('/api/tag', {
  method: 'GET',
});


const addNewTag = (tagName: any) => {
  tags.value = [...(tags.value || []), tagName];
  state.value.tag = [...(state.value.tag || []), tagName];
};


</script>
    
<style scoped>

  @font-face {
    font-family: 'AccidentalPresidency';
    src: url('assets/fonts/AccidentalPresidency.ttf');
  }

  .body {
    background-color: white;
    width: 80%;
    position: relative;
  }

  .container {
    display: flex;
    min-width: 1280px;
    max-width: 1280px;
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
    font-family: 'AccidentalPresidency';
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
    font-family: 'AccidentalPresidency';
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

  .top-bar > .add-contact-button {
    text-decoration: underline;
    cursor: pointer;
  }

  .top-bar > .search-page-button,
  .top-bar > .admin-page-button {
    cursor: pointer;
    text-decoration: none;
    color: #034EA2;
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
    font-family: 'AccidentalPresidency';
  }
  
  .search-through select {
    margin-top: 10px;
    font: 16px 'AccidentalPresidency';
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
    font: 300 15px 'AccidentalPresidency';
    padding-left: 10px;
  }

  .selected-filters {
    display: flex;
    flex-direction: column;
    padding: 20px 10px 0 15px;
    font: bold 17px 'AccidentalPresidency';
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
    font: bold 20px 'AccidentalPresidency';
  }

  .add-container-contents > form {
    padding-top: 10px;
  }

  .create-contact-button > button {
    position: absolute;
    bottom: 5%;
    right: 10%;
    background-color: #034EA2;
    color: white;
    font: 600 14px 'AccidentalPresidency';
    padding: 5px 50px;
    border: 2px solid;
    border-radius: 20px;
    cursor: pointer;
  }

  .form-group {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
  }

  .form-group > label {
    width: 100%;
    padding-right: 10px;
    font: 15px 'AccidentalPresidency';
    text-align: left;
  }

  .form-group > input,
  .form-group > textarea {
    padding: 3px 7px;
    border: 2px solid #D9D9D9;
    border-radius: 20px;
    font-family: 'AccidentalPresidency';
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
