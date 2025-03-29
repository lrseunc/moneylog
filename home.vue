<template>
    <v-app>
    <nav>
      <div>
        <p class="title">MoneyLog</p>
      </div>

      <ul>
        <li><router-link to="/home">HOME</router-link></li>
        <li><router-link to="/personal">PERSONAL</router-link></li>
        <li><router-link to="/group">GROUP</router-link></li>
        <li><router-link to="/view">VIEW</router-link></li>
        <li><router-link to="/about">ABOUT US</router-link></li>
        <li><router-link to="/profile"><img src="profile.jpg" alt=""></router-link></li>
      <!-- Corrected Vue.js event binding -->
      <li class="menu-button" @click="showSidebar">
        <i class="fa-solid fa-bars fa-lg"></i>
      </li>
      <div class="profile-trigger" aria-label="Profile" @click="toggleProfile">
        <i class="fas fa-user-circle" style="font-size: 30px; cursor: pointer;"></i>
      </div>
    </ul>

    <ul class="sidebar" :class="{ show: sidebarVisible }">
      <li @click="hideSidebar">
        <i class="fa-solid fa-arrow-left fa-lg"></i>
      </li>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/group">Expense</router-link></li>
        <li><router-link to="/view">View</router-link></li>
        <li><router-link to="/about">About us</router-link></li>
      </ul>
    </nav>
    <div class="profile-overlay" v-show="profileVisible" @click.self="toggleProfile">
      <div class="profile-modal" v-html="profileContent"></div>
    </div>
    <div class="home-bg">
    <div class="container">
      <div>
        <img src="/LOGO.png" alt="Logo Image" class="logo" />
      </div>
      <div class="content">
        <h2>Track with ease,<br /> spend with peace!</h2>
        <p>
          Money Log is a budget tracker website focused on helping users manage and track their expenses. This program allows users to record their expenses, categorize transactions, and follow their financial budget over time.
          Money Log also provides a group expense feature that allows families, roommates, and groups of friends to track their joint expenses. Users can form groups, add shared expenses and provide an overview of the group expenses.
          This feature ensures that managing personal and group finances is easy and convenient.
        </p>
      </div>
    </div>
    </div>
</v-app>
</template>
  


<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const profileVisible = ref(false);
    const profileContent = ref('');
    const sidebarVisible = ref(false);
    const backToTopBtn = ref(null);

    const toggleProfile = () => {
      profileVisible.value = !profileVisible.value;
      if (profileVisible.value) {
        fetch('profile.php')
          .then(response => response.text())
          .then(data => {
            profileContent.value = data;
          })
          .catch(error => console.error('Error loading profile:', error));
      }
    };

    const showSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value; // Toggle
};



    const hideSidebar = () => {
      console.log("Hiding sidebar");
      sidebarVisible.value = false;
    };

    onMounted(() => {
      window.addEventListener('scroll', () => {
        if (backToTopBtn.value) {
          backToTopBtn.value.style.display = window.scrollY > 200 ? 'block' : 'none';
        }
      });
    });

    return {
      profileVisible,  
      profileContent,  
      toggleProfile,
      sidebarVisible,  
      showSidebar,
      hideSidebar,
      backToTopBtn,
    };
  },
};
</script>

  

<style>

body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    height: 100vh;
}

.home-bg {
    background-image: url('/public/circle.png') !important;
    background-size: cover; /* Makes sure it covers the whole screen */
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents tiling */
    height: 100vh; /* Ensure it takes the full viewport height */
    width: 100vw; /* Ensure it takes the full viewport width */
}

nav {
    backdrop-filter: blur(10px); 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 50px;
    box-sizing: border-box;
    max-height: 120px; 
    background-color: #304939;
}

p.title {
    color: #f6f8d5;
    font-size: 50px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

nav ul {
    list-style-type: none; 
    padding: 0;
    margin: 0; 
    display: flex; 
    align-items: center; 
    flex-grow: 1; 
    justify-content: flex-end;
    padding-top: 50px;
    gap: 15px;
}
nav ul li a {
    color: white; 
    color: inherit;
    font-size: 20px;
    text-decoration: none;
    font-weight: 540;
    padding: 10px 15px;
    border-radius: 5px;
    transition: color 0.3s ease, color 0.3s ease;
    display: inline-block;
}

nav ul li img {
    width: 40px; /* Adjust size as needed */
    height: 40px; /* Maintain aspect ratio */
    border-radius: 50%; /* Makes it circular */
    object-fit: cover; /* Ensures the image fills the space properly */
}

nav ul li a:hover {
    background-color: rgba(255, 255, 255, 0.4); 
    
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60vh;
    padding: 0 50px; /* Adds space on both sides */
    gap: 50px; 
    flex-direction: row-reverse; /* Image on the right */
}

.logo {
    width: 500px;
    height: 500px;
    margin: 250px 20px 50px; /* Push image further right */
}

.content {
    flex: 1;
    text-align: left;
    padding-left: 50px;
    margin-top: 150px;
    max-width: 50%; 
}

.content h2 {
    font-size: 4em; 
    font-weight: bold;
    text-align: center;
    color: #f6f8d5;
    background-clip: text;
    color: rgb(9, 159, 31);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    padding: 20px;
    animation: fadeIn 2s ease-out;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.content p {
    font-size: 1.5em; 
    font-style: italic;
    text-align: justify;
}

.profile-trigger {
    font-size: 30px;
    color: #f6f8d5; 
    transition: color 0.3s ease, transform 0.3s ease;
    margin-left: 10px;
    cursor: pointer;
    
}
.profile-trigger:hover {
    transform: scale(1.1); 
    
}
.profile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 300px;
    width: 250px;
    background-color: white;
    box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5%;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}

.sidebar.show {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateX(0);
}



.sidebar li{
    width: 100%;
}
.sidebar a{
    width: 100%;
    color: black;
    
}
.sidebar li :hover{
    background-color: #f1f1f1;
    
}
.menu-button{
    display: none;
    margin-left: 250px; 
}
 @media(max-width: 1200px){
    .content h2 {
        font-size: 4em;
    }

    .content p {
        font-size: 1em;
    }
}
  @media(max-width: 768px){
    .hideOnMobile{
        display: none;
      }
    .menu-button{
        display: block;
      }
    
    .content h2 {
        font-size: 3em;
    }
    .content p {
        font-size: 0.9em;
    }
}
</style>
