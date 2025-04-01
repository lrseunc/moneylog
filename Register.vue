<template>
    <div class="register-bg">
        <div class="container">
            <div class="login-container">
                <div class="login-form">
                <form @submit.prevent="registerUser">
                    <div class="login-form-items">
                        <span class="login-label">REGISTER</span>
                        <div class="text-input-container">
                        <label class="form-label">USERNAME</label>
                                <input type="text" name="username" class="text-style" required>
                        <label class="form-label">EMAIL</label>
                                <input type="email" name="email" class="text-style" required>
                        <label class="form-label">PASSWORD</label>
                                <input type="password" name="password" class="text-style" required>
                        <label class="form-label">AGE</label>
                                <input type="number" name="age" class="text-style" required>
    
                        </div>
                        <button class="login-btn">SIGN UP</button>
                        <router-link to="/login" class="login-btn1">LOG IN</router-link>
                    </div>
                </form>    
            </div>
        <div class="login-deco-container">
        <div class="login-deco">
        <span class="penny">MONEY <br> LOG</span>
            <img src="/LOGO.png" alt="Logo Image" class="deco-image">  
        </div>
        </div>
        </div>
        </div>
    </div>
    </template>
    
    <script>
    </script>
    
    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
    
    body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Lato', sans-serif;
    }
    
    .register-bg {
        background-image: url("/circle.png");
        background-size: cover; /* Makes sure it covers the whole screen */
        background-position: center; /* Centers the image */
        background-repeat: no-repeat; /* Prevents tiling */
    }
    
    .container {
        width: 100vw;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .login-container {
        width: 80%;
        height: auto;
        max-width: 800px; 
        background: rgba(255, 255, 255, 0.5); /* White with 30% transparency */
        backdrop-filter: blur(10px); /* Adds a blur effect */
        border-radius: 20px;
        display: flex;
        justify-content: space-between; 
        flex-direction: row;
        padding: 30px;
    }
    
    .login-form {
        width: 50%;
        height: auto;
        display: flex;
        margin: 0 auto; /* Centers it */
        flex-direction: column;
        text-align: center;
        align-items: center;
        margin-top: -10px;
        margin-left: 30px;
    }
    
    .login-deco-container {
        width: 45%;
        height: 500px;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .login-form-items {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 15px;
        margin-top: 25px;
    }
    
    span.login-label {
        color: black;
        font-weight: 900;
        font-size: 50px;
        letter-spacing: 2px;
        margin-bottom: 20px;
        margin-top: -5px;
        white-space: nowrap;
        margin-left: 23px;
    }
    
    .text-input-container {
        width: 250px;
        display: flex;
        flex-direction: column;
    }
    
    .text-input-container input {
        width: 100%; /* Ensures inputs are full width */
        padding: 4px; /* Makes typing easier */
        font-size: 14px;
        margin-bottom: 10px; 
    }
    .success{
        color: green;
    }
    
    .invalid{
        color: red;
        font-size: 0.9em;
    }
    .form-label{
        color: black;
        font-weight: 350;
        font-size: 17px;
        margin-bottom: 5px;
        margin-left: 15px;
        
    }
    
    .form-label a{
        color: white;
    }
    
    input.text-style {
        border-radius: 20px;
        height: 20px;
        background: none;
        border: 2px solid rgb(51, 47, 47);
        padding-left: 10px;
        color: black;
    }
    
    button.login-btn {
        width: 200px;
        background: #D6EFD8;
        border-radius: 20px;
        border: none;
        padding: 15px 0;
        color: black;
        font-weight: 790;
        font-size: 15px;
        letter-spacing: 2px;
        margin-bottom: 10px;
        cursor: pointer;
        box-shadow: 0 8px 10px 0 rgba(0,0,0,0.25);
        margin-top: 15px;
        margin-left: 20px;
    }
    
    button.login-btn:hover{
        background-color: #80AF81;
    }
    
    .login-btn1 {
        width: 200px;
        background: #D6EFD8;
        border-radius: 20px;
        border: none;
        padding: 15px 0;
        color: black;
        font-weight: 705;
        font-size: 15px;
        letter-spacing: 2px;
        margin-bottom: 10px;
        cursor: pointer;
        box-shadow: 0 8px 10px 0 rgba(0,0,0,0.25);
        margin-top: 10px;
        margin-left: 20px;
        text-decoration: none;
    }
    
    .login-btn1:hover{
        background-color: #80AF81;
    }
    
    
    .penny {
       position: absolute;
       top: 0;
       left: 50%;
       bottom: 15px;
       transform: translateX(-50%);
       color: #f6f8d5;
       font-weight: bold;
       font-size: 55px; 
       letter-spacing: 2px;
       padding-top: 10px; 
       text-align: center;
       font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    
    input:focus {
        outline: none;
    }
    
    .login-deco {
        position: relative; 
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center; 
        align-items: center; 
    }
    
    .deco-image {
        width: 380px;
        height: auto;
        margin-top: 110px; 
        margin-left: 30px;
        display: block;
    }
    
    @media (max-width: 1024px) {
        .login-container {
            flex-direction: column;
            width: 80%;
            max-width: 500px;
            padding: 20px;
        }
    
        .login-deco-container {
            display: none;
        }
    
        .deco-image {
            width: 200px;
        }
    
        .penny {
            font-size: 18px;
        }
    
        .login-form {
            margin-left: 130px;
            align-items: center;
        }
    
        .login-btn {
            margin-left: 10px;
        }
    
        .login-btn1 {
            margin-left: 10px;
        }
    }
    
    @media (max-width: 768px) {
        .login-container {
            width: 90%;
            padding: 15px;
        }
    
        .login-form-items {
            width: 90%;
        }
    
        .text-input-container input,
        .login-btn {
            width: 100%;
        }
    
        .login-label {
            font-size: 1.5em;
        }
    
        .penny {
            font-size: 16px;
        }
    }
    
    @media (max-width: 480px) {
        .login-container {
            width: 95%;
            padding: 10px;
        }
    
        .login-label {
            font-size: 1.2em;
        }
    
        .deco-image {
            width: 150px;
        }
    
        .penny {
            font-size: 14px;
        }
    
    }
    </style>
