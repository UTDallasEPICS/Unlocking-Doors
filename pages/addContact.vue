<template lang="pug">
.container
    .sidebar
      .logo
        img(src='~/assets/logo.png' width='150' height='auto')
      .search-through
        strong Search Through
        select
          option(value='all') Groups
          option(value='posts') Board Members
          option(value='comments') Donors
          option(value='users') Providers
      .search-through
        strong Search Through
        select
          option(value='all') Tags
          option(value='posts') Board Members
          option(value='comments') Donors
          option(value='users') Providers
      .action-buttons
        br
        br
        NuxtLink.button.back-button(to='search') Search Page
    .add-container
      form(@submit.prevent='createContact' @keydown.enter.prevent)
        .form-group
          label(for='prefix') Prefix:
          input(v-model='prefix')
        .form-group
          label(for='firstName') First Name:
          input(name='firstName' v-model='firstName')
        .form-group
          label(for='middleName') Middle Name:
          input(v-model='middleName')
        .form-group
          label(for='lastName') Last Name:
          input(v-model='lastName')
        .form-group
          label(for='suffix') Suffix:
          input(v-model='suffix')
        .form-group
          label(for='professionalTitle') Professional Title:
          input(v-model='professionalTitle')
        .form-group
          label(for='address1') Address 1:
          input(v-model='address1')
        .form-group
          label(for='city1') City:
          input(v-model='city1')
        .form-group
          label(for='state1') State:
          input(v-model='state1')
        .form-group
          label(for='zipCode1') Zip Code:
          input(v-model='zipCode1')
        .form-group
          label(for='address1Type') Address Type:
          input(v-model='address1Type')
        .form-group
          label(for='address2') Address 2:
          input(v-model='address2')
        .form-group
          label(for='city2') City:
          input(v-model='city2')
        .form-group
          label(for='state2') State:
          input(v-model='state2')
        .form-group
          label(for='zipCode2') Zip Code:
          input(v-model='zipCode2')
        .form-group
          label(for='address2Type') Address Type:
          input(v-model='address2Type')
        .form-group
          label(for='mainPhone') Main Phone:
          input(v-model='mainPhone')
        .form-group
          label(for='directPhone') Direct Phone:
          input(v-model='directPhone')
        .form-group
          label(for='mobilePhone') Mobile Phone:
          input(v-model='mobilePhone')
        .form-group
          label(for='emailAddress') Email Address:
          input(v-model='emailAddress')
        .form-group.narrative
          label(for='narrative') Narrative:
          input(v-model='narrative')
        .form-group
          label(for='company') Company:
          input(v-model='company')
        TagInput(v-model='tag')
        br
        br
        button(type='submit') Create Contact
</template>
    
   <script setup>
   import axios from 'axios';
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';
   import VueMultiselect from 'vue-multiselect';
   const router = useRouter();

   const props = defineProps({
    availablePrivateCategories: Array,
    content: Object,
  });
  const emit = defineEmits();

  const addPrivateCategory = (e) => {
    content.value.PrivateCategory = [...(content.value.PrivateCategory || []), e];
  };

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
    tag : [],
    existingTags : [],
  });

   /*const prefix = ref('');
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
   const tag = ref([]);*/

  /*
   const state = ref({
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
   });

   */

   //Function to add new tag
   const addNewTag = (newTag) => {
    tags.value.push(newTag);
   };
   

   const createContact = async () => {
    const { data } = await useFetch('/api/contact', {
      method: 'POST',
      body: state.value
    })
    router.push('/search');
   }

   /*
   const createContact = async () => {
    const { data } = await useFetch('/api/contact', {
      method: 'POST',
      body: {
        prefix: prefix,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        suffix: suffix,
        professionalTitle: professionalTitle,
        address1: address1,
        city1: city1,
        state1: state1,
        zipCode1: zipCode1,
        address1Type: address1Type,
        address2: address2,
        city2: city2,
        state2: state2,
        zipCode2: zipCode2,
        address2Type: address2Type,
        mainPhone: mainPhone,
        directPhone: directPhone,
        mobilePhone: mobilePhone,
        emailAddress: emailAddress,
        narrative: narrative,
        company: company,
        tag: tag,
        
        prefix: prefix,
        firstName: firstName,
        lastName: lastName,
        suffix: suffix,
        saluation: salutation,
        professionalTitle: professionalTitle,
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
        mainPhone: mainPhone,
        directPhone: directPhone,
        mobilePhone: mobilePhone,
        emailAddress: emailAddress,
        narrative: narrative,
        company: company,
        tag: tag,
      }
    })
    console.log("This is what's in the tag: " + tag.value);
    router.push('/search');
   }
   */


   </script>
    
      <style scoped>
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
        
        .back-button {
          background-color: #1f609c;
          color: #ffffff;
          margin-left: 50px;
        }
  
        .back-button:hover {
          opacity: 0.8;
        }
      
      </style>