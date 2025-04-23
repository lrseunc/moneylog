<template>
  <header :class="{ 'scrolled-nav': scrolledNav}">
  <nav>
    <div class="branding">
      <img src="/LOGO.png" alt="Money Log Logo"/>
    </div>
  <ul v-show="!mobile" class="navigation">
    <li><router-link class="link" to="/personal">PERSONAL</router-link></li>
    <li><router-link class="link" to="/group">GROUP</router-link></li>
    <li><router-link class="link" to="/view">VIEW</router-link></li>
    <li><router-link class="link" to="/about">ABOUT</router-link></li>     
    <router-link to="/profile" class="profile-trigger" aria-label="Profile">
      <i class="fas fa-user-circle" style="font-size: 30px; cursor: pointer;"></i>
  </router-link>

  </ul>
  <div class="icon">
      <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active': mobileNav }"></i>
  </div>
  <transition name="mobile-nav">
    <ul v-show="mobileNav" class="dropdown-nav">
    <li><router-link class="link" to="/personal">PERSONAL</router-link></li>
    <li><router-link class="link" to="/group">GROUP</router-link></li>
    <li><router-link class="link" to="/view">VIEW</router-link></li>
    <li><router-link class="link" to="/about">ABOUT</router-link></li>   
    <router-link to="/profile" class="user" aria-label="Profile">
      <i class="fas fa-user-circle" style="font-size: 30px; cursor: pointer;"></i>
    </router-link>


  </ul>
  </transition>
  </nav>
  </header>

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
</template>



<script scoped>
export default {
  name: "navigation",
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowwidth: null,

      // 👇 Add for protected data
      userInfo: null,
      error: null
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);

    // 🔐 Call protected API
    fetch('http://localhost:3000/api/users/', { // Changed port from 8000 to 3000
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jsontoken'), // Changed from authToken
      'Accept': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      this.userInfo = data;
    })
    .catch(err => {
      console.error("API Error:", err);
      this.error = "Failed to load user data";
    });
},
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        return;
      }
      this.scrolledNav = false;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
  },
};
</script>



<style>
header {
background-color: #2a4935;
z-index: 99;
width: 102%;
position: fixed;
transition: .5s ease all;
height: 120px;
margin-left: -10px;
}

nav {
font-family: 'Poppins', sans-serif;
position: relative;
display: flex;
flex-direction: row;
padding: 8px 0;
transition: .5s ease all;
width: 90%;
margin: 0 auto;

ul, 
.link {
font-weight: 500;
color: #ffffff;
list-style: none;
text-decoration: none;
}

.user {
font-weight: 500;
color: #ffffff;
list-style: none;
text-decoration: none;
}


li {
text-transform: uppercase;
padding: 14px;
margin-left: 15px;
}

.link {
font-size: 18px;
transition: .5s ease all;
padding-bottom: 1px;
border-bottom: 2px solid transparent;

&:hover {
  color: black;
  border-color: black;
}
}

.branding {
display: flex;
align-items: center;

img {
  width: 110px;
  height: auto;
  transition: .5s ease all;
  margin-left: -10px;
  margin-top: 2px;
}
}

.navigation {
display: flex;
align-items: end;
flex: 1;
justify-content: flex-end;
margin-top: 35px;
font-family: Arial, Helvetica, sans-serif;
}

.icon {
display: flex;
align-items: center;
position: absolute;
top: 0;
right: 24px;
height: 100%;
color: #ffffff;

i {
  cursor: pointer;
  font-size: 24px;
  transition: .8s ease all;
}
}

.icon-active {
transform: rotate(180deg);
}

.dropdown-nav {
display: flex;
flex-direction: column;
position: fixed;
width: 100%;
max-width: 200px;
height: 100vh;
background-color: rgb(10, 140, 10);
margin-top: 0;
left: 0;


li {
  margin-left: 0;
  margin-top: 10px;
}
  .link {
    color: white;
}

  .user {
    color: white;
    margin-left: 15px;
    margin-top: 10px;
}
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition:  1s ease all;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}

.mobile-nav-enter-to{
  transform: translateX(0);
}
}

.scrolled-nav {
background-color: #000;
box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba (0, 0, 0, 0.6);

nav {
  padding: 18px 0;

  .branding {
    img {
      width: 40px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba (0, 0, 0, 0.6);
    }
  }
}
}


.profile-trigger {
font-size: 30px;
color: white; 
transition: color 0.3s ease, transform 0.3s ease;
margin-left: 10px;
cursor: pointer;
display: flex;
align-items: center;
position: relative;
right: -20px; /* Move right */
bottom: 10px;
text-decoration: none; /* Removes underline */

&:hover {
  color: black;
  border-color: black;
}
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


body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: #fcffed;
  overflow-x: hidden; /* Prevents horizontal scrolling */
  overflow-y: auto; /* Allows vertical scrolling */
}


.profile-trigger {
  font-size: 30px;
  color: #ffffff; 
  transition: color 0.3s ease, transform 0.3s ease;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  right: -20px; /* Move right */
  bottom: 10px;
  text-decoration: none; /* Removes underline */

&:hover {
    color: black;
    border-color: black;
  }
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

.container {
  display: flex;
  flex-direction: row; /* horizontal layout */
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 0 80px;
  gap: 50px;
  margin-top: -10px;
}


.logo {
  width: 550px; /* Adjust size */
  height: 550px;
  margin-top: 70px;
  margin-left: 20px;
}

.content {
  display: flex;
  flex: 1; 
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
  color: black; 
  font-size: 20px;
}

.content h2 {
  font-size: 3em; 
  font-weight: bold;
  text-align: center;
}

.content p {
  font-style: italic;
  text-align: justify;
}

/* RESPONSIVE DESIGN */

@media only screen and (max-width: 1440px) {
  .logo {
    margin-top: 50px;
    margin-left: -10px;
    margin-bottom: -30px;
    width: 480px;
    height: 480px;
  }
  .content {
    align-items: center;
    margin-top: 120px;
    text-align: center;
    padding: 0;
  }
  .content h2 {
    font-size: 46px;
    margin: 0;
    margin-bottom: 30px;
  }
  .content p {
    font-size: 1em;
    margin: 0;
  }
}

@media only screen and (max-width: 1280px) {
  .logo {
    margin-top: 50px;
    margin-left: -10px;
    margin-bottom: -30px;
    width: 420px;
    height: 420px;
  }

  .content {
    align-items: center;
    text-align: center;
    margin-top: 100px;
    margin-right: 10px;
    padding: 0;
  }
  .content h2 {
    font-size: 2em;
    margin: 0;
    margin-bottom: 20px;
  }
  .content p {
    font-size: 1em;
    margin: 0;
  }
}

@media only screen and (max-width: 1120px) {
  .logo {
    margin-top: 50px;
    margin-left: -10px;
    margin-bottom: -30px;
    width: 400px;
    height: 400px;
  }
  .content {
    align-items: center;
    text-align: center;
    margin-top: 100px;
    margin-right: 10px;
    padding: 0;
  }
  .content h2 {
    font-size: 2em;
    margin: 0;
    margin-bottom: 20px;
  }
  .content p {
    font-size: 0.9em;
    margin: 0;
  }
}

@media only screen and (max-width: 1000px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .logo {
    margin-top: 150px;
    width: 380px;
    height: 380px;
  }
  .content{
    margin: 0;
  }
  .content h2 {
    margin-top: 10px;
    font-size: 1.8em;
  }
  .content p {
    font-size: 1em;
    margin-bottom: 20px;
  }
}

@media only screen and (max-width: 480px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .logo {
    width: 330px;
    height: 330px;
  }
  .content{
    margin: 0;
  }
  .content h2 {
    margin-top: 10px;
    font-size: 1.5em;
  }
  .content p {
    font-size: 1em;
    margin-bottom: 20px;
  }
}

</style>
