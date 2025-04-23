<template>
    <navigation />
  
    <div class="content-wrapper">
      <div class="profile-container">
        <h2>PROFILE INFORMATION</h2>
        <p><strong>Username:</strong></p>
        <p><strong>Email:</strong></p>
        <p><strong>Age:</strong></p>
        <p><strong>Group Budget:</strong></p>
        <p><strong>Group Expenses:</strong></p>
        <p><strong>Personal Budget:</strong></p>
        <p><strong>Personal Expenses:</strong></p>
  
        <router-link to="/login" class="logout">Logout</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import Navigation from "./navigation.vue";
  
  export default {
    components: { Navigation },
  };
  </script>
  
<style scoped>

  * {
    box-sizing: border-box;
  }

  
  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 70px; 
    min-height: 82vh;
    width: 100%;
    overflow-x: hidden;
  }
  
  .profile-container {
    margin-top: 100px;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 20px 15px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .profile-container h2 {
    font-family: 'Poppins', sans-serif;
    font-style: italic;
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .profile-container p {
    margin: 10px 0;
    font-family: 'Poppins', sans-serif;
    font-style: italic;
    font-size: 16px;
    margin-bottom: 16px;
  }
  
  .logout {
    display: inline-block;
    padding: 10px 30px;
    background-color: #2a4935;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: white !important;
    transition: background-color 0.3s ease;
  }
  
  .logout:hover {
    background-color: #bde0bd;
  }
  
  /* Responsive Design */
  @media screen and (max-width: 1048px) {
    .content-wrapper {
      padding-top: 70px;
      padding-left: 20px;
      padding-right: 20px;
    }
  
    .profile-container h2 {
      font-size: 24px;
    }
  
    .profile-container p {
      font-size: 15px;
    }
  
    .logout {
      font-size: 15px;
      padding: 10px 25px;
    }
  }
  
  @media screen and (max-width: 768px) {
    .content-wrapper {
      padding-top: 60px;
      padding-left: 10px;
      padding-right: 10px;
    }
  
    .profile-container {
      padding: 16px 12px;
    }
  
    .profile-container h2 {
      font-size: 20px;
    }
  
    .profile-container p {
      font-size: 14px;
    }
  
    .logout {
      font-size: 14px;
      padding: 8px 22px;
    }
  }
  
  @media screen and (max-width: 480px) {
    .content-wrapper {
      padding-top: 60px;
      padding-left: 5px;
      padding-right: 5px;
    }
  
    .profile-container {
      padding: 12px 10px;
    }
  
    .profile-container h2 {
      font-size: 18px;
    }
  
    .profile-container p {
      font-size: 13px;
    }
  
    .logout {
      font-size: 13px;
      padding: 8px 18px;
    }
  }
  </style>
