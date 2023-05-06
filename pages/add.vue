<template>
    <div class = "container">
        <div class="sidebar">
            <div class="logo">
                <a href='/search'>
                    <img src="~/assets/logo.png" width="150" height="auto" />
                </a>
            </div>
            <div class="search-through">
                <strong>Groups</strong>
                <select>
                    <option value="all">Groups</option>
                    <option value="posts">Board Members</option>
                    <option value="comments">Donors</option>
                    <option value="users">Providers</option>
                </select>
            </div>
            <div class="search-through">
                <strong>Tags</strong>
                <select>
                    <option value="all">Tags</option>
                    <option value="posts">Board Members</option>
                    <option value="comments">Donors</option>
                    <option value="users">Providers</option>
                </select>
            </div>
        </div>
        <div class="form-container">
            <form>
                <a href="/search">
                    <button>Go Back</button>
                </a>
                <toplabel>Enter Fields of Information Here</toplabel>
                <inputgroup>
                    <div class="eachinput">
                        <label>Company</label>
                        <input type="company" required v-model="company">
                    </div>
                    <div class="eachinput">
                        <label>First Name</label>
                        <input type="firstname" required v-model="firstname">
                    </div>
                    <div class="eachinput">
                        <label>Last Name</label>
                        <input type="firstname" required v-model="lastname">
                    </div>
                    <div class="eachinput">
                        <label>Salutation</label>
                        <input type="salutation" required v-model="salutation">
                    </div>
                    <div class="eachinput">
                        <label>Main Phone</label>
                        <input type="mainphone" required v-model="mainphone">
                    </div>
                    <div class="eachinput">
                        <label>Direct Phone</label>
                        <input type="directphone" required v-model="directphone">
                    </div>
                    <div class="eachinput">
                        <label>Mobile Phone</label>
                        <input type="mobilephone" required v-model="mobilephone">
                    </div>
                    <div class="eachinput">
                        <label>Email Address</label>
                        <input type="email" required v-model="email">
                    </div>
                    <div class="eachinput">
                        <label>Professional Title</label>
                        <input type="title" required v-model="title">   
                    </div>
                </inputgroup>
                <addressInput>
                    <div class="eachinput">
                        <label>Address</label>
                        <input type="address" required v-model="address">
                    </div>
                    <div class="eachinput">
                        <label>City</label>
                        <input type="city" required v-model="city">
                    </div>
                    <div class="eachinput">
                        <label>State</label>
                        <input type="state" required v-model="state">
                    </div>
                    <div class="eachinput">
                        <label>Zip/Postal</label>
                        <input type="zip" required v-model="zip">
                    </div>
                    <div class="eachinput">
                        <label>Country</label>
                        <input type="country" required v-model="country">
                    </div>
                    <div class="eachinput">
                        <label>Address Type</label>
                        <input type="addresstype" required v-model="addresstype">
                    </div>
                </addressInput>
                <button @click.prevent="saveContact">Save Contact</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'Add Page',
        data () {
    return {
      contacts: [],
      company: '',
      firstname: '',
      lastname: '',
      salutation: '',
      mainphone: '',
      directphone: '',
      mobilephone: '',
      email: '',
      title: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      addresstype: ''
    }
  },
  methods: {
    async addUsers(){
      const { data } = await axios.post('api/contact')
      this.contacts = data;
    },
    async saveContact() {
      // Prepare contact data to be sent to the server
      const contactData = {
        firstname: this.firstname,
        lastname: this.lastname,
        salutation: this.salutation,
        mainphone: this.mainphone,
        directphone: this.directphone,
        mobilephone: this.mobilephone,
        email: this.email,
        title: this.title,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country,
        addresstype: this.addresstype
      };

      // Send contact data to the server
      await axios.post('api/contact', contactData);

      // Clear form fields
      this.company = '';
      this.firstname = '';
      this.lastname = '';
      this.salutation = '';
      this.mainphone = '';
      this.directphone = '';
      this.mobilephone = '';
      this.email = '';
      this.title = '';
      this.address = '';
      this.city = '';
      this.state = '';
      this.zip = '';
      this.country = '';
      this.addresstype = '';

      // Call addUsers method to refresh the contact list
      this.addUsers();
    }
  }

    }
    var address = new Array();

</script>

<style>
    body {
       
    }
    .container {
      display: flex;
    }
    .form-container {
        margin: 0px 0 0 50px;
        flex-grow: 1;
    }
    form {
        justify-content: left;
        background: #d9dcdd;
        
        padding: 40px;
        border-radius: 10px;
        width: 1250px;
        height: 825px;
        max-height: 825px;
    }
    .logo {
      padding: 25px 0 50px 50px;
    }
    toplabel {
        color: #FFFFFF;
        margin: 0px 0 1500px;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        padding-left: 100px;
        padding-right: 100px;
        width: 1000px;
    }
    label {
        color: #FFFFFF;
        margin: 0px 0 15px;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        font-size: 20px;
        float: inline-start;
    }
    inputgroup {
        max-width: 500px;
        row-gap: 10px;
        
    }
    addressInput {
        
        padding: 50px;
    }
    input {
        margin: 0px 0 15px;
        padding: 10px 6px;
        box-sizing: border-box;
        border: none;
        border-bottom: 3px solid #000000;
        width: 300px;
        height: 30px;
        float: inline-end;
        transform: translate(0, 0);
        transform-origin: 0 0;
        transition: transform 120ms ease-in;
    }
    
    .eachinput{
        display: flex;
        column-gap: 5px;
        row-gap: 10px;
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

    .sidebar {
        padding: 0;
        margin-right: auto;
        height: 100vh;
        width: 250px;
        max-width: 250px;
        background-color: #f0f0f0;
    }
    
</style>
