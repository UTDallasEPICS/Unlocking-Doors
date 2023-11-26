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
          input(v-model='state.prefix')
        .form-group
          label(for='firstName') First Name:
          input(name='firstName' v-model='state.firstName')
        .form-group
          label(for='lastName') Last Name:
          input(v-model='state.lastName')
        .form-group
          label(for='suffix') Suffix:
          input(v-model='state.suffix')
        .form-group
          label(for='salutation') Salutation:
          input(v-model='state.salutation')
        .form-group
          label(for='professionalTitle') Professional Title:
          input(v-model='state.professionalTitle')
        .form-group
          label(for='address') Address:
          input(v-model='state.address')
        .form-group
          label(for='city') City:
          input(v-model='state.city')
        .form-group
          label(for='state') State:
          input(v-model='state.state')
        .form-group
          label(for='zipCode') Zip Code:
          input(v-model='state.zipCode')
        .form-group
          label(for='country') Country:
          input(v-model='state.country')
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
          input(v-model='state.narrative')
        .form-group
          label(for='company') Company:
          input(v-model='state.company')
        VueMultiselect(
          v-if="availablePrivateCategories",
          :multiple="true", v-model="state.content.PrivateCategory",
          :close-on-select="false", open-direction="bottom",
          :taggable="true",
          :options="availablePrivateCategories",
          @tag="addPrivateCategory")
        br
        br
        button(type='submit') Create Contact
</template>
    
   <script setup>
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
     company: '',
     tags: [],
     existingTags: [],
   });



   //Function to add new tag
   const addNewTag = (newTag) => {
    tags.value.push(newTag);
   };

  

   const createContact = async () => {
    const { data } = await useFetch('/api/contact', {
      method: 'POST',
      body: state.value
    })
    router.push('/');
   }


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