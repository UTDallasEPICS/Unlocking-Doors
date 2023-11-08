<template lang="pug">
div
    .logo
        img(src='~/assets/logo.png')
    .button-container
        a.login-button(@click="login") Login 
</template>
  
  
<script setup lang="ts">
  import { useAuth0 } from '@auth0/auth0-vue';

  const runtime = useRuntimeConfig()

  console.log('Runtime config:', runtime)
  if (process.server) {
    console.log('API secret:', runtime.apiSecret)
  }

  const auth0 = useAuth0();

  const login = () => {
    auth0.loginWithRedirect();
  };
</script>

  
  <style scoped>
    body {
      background-color: #BCC6D1;
    }
  
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70vh;
    }
  
    img {
      max-width: 50%;
      max-height: 50vh;
    }
  
    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1vh;
    }
  
    .login-button {
      display: inline-block;
      background-color: #0066CC;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      transition: background-color 0.3s ease;
      cursor: pointer;
    }
  
    .login-button:hover {
      background-color: #0052A3;
    }
  
  </style>