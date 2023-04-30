<template>
    <div class="container">
      <div class="sidebar">
        <div class="logo">
          <img src="~/assets/logo.png" width="150" height="auto" />
        </div>
        <div class="search-through">
          <strong>Search Through</strong>
          <select>
            <option value="all">Groups</option>
            <option value="posts">Board Members</option>
            <option value="comments">Donors</option>
            <option value="users">Providers</option>
          </select>
        </div>
        <div class="search-through">
            <strong>Search Through</strong>
            <select>
              <option value="all">Tags</option>
              <option value="posts">Board Members</option>
              <option value="comments">Donors</option>
              <option value="users">Providers</option>
            </select>
          </div>
      </div>
      <div class="search-container">
        <div class="search-bar">
          <input type="text" placeholder="Search...">
        </div>
      </div>
    </div>
  </template>

  <script>

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
  
    .search-container {
      margin: 50px 0 0 50px;
      flex-grow: 1;
    }
  
    .search-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 50px;
    }
  
    .search-bar input {
      width: 70%;
      padding: 20px;
      font-size: 24px;
      border: none;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  
    .search-results {
      display: flex;
      flex-direction: column;
    }
  

  </style>
  