<template>
  <div>
    <div class="logo">
      <img src="~/assets/logo.png">
    </div>

    <div class="button-container">
      <a class="login-button" @click="navigateTo('/search')">Login</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(url) {
      window.location.href = url;
    }
  }
}
</script>

<style>
  body {
    background-color: #BCC6D1 !important;
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
  }

  .login-button:hover {
    background-color: #0052A3;
  }

</style>
