<template>
    <div class="login-bg">
        <div class="container">
            <div class="login-container">
                <div class="login-form">
                <form @submit.prevent="login">
                    <div class="login-form-items">
                        <span class="login-label">LOG IN</span>
                        <div class="text-input-container">
                        <label class="form-label">USERNAME</label>
                            <input type="text" name="username" class="text-style" required>
                        <label class="form-label">PASSWORD</label>
                            <input type="password" name="password" class="text-style" required>
                        </div>
                        <router-link to="/home" class="login-btn">LOG IN</router-link>
                        <router-link to="/register" class="login-btn">SIGN UP</router-link>
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
    
    <script setup>
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

.login-bg {
    background-image: url("/circle.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    width: 90%;
    max-width: 650px;
    height: auto;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 30px;
    gap: 20px;
    box-sizing: border-box;
}

.login-form {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 10px;
}

.login-form-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

span.login-label {
    color: black;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 2px;
    margin-bottom: 30px;
    white-space: nowrap;
}

.text-input-container {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text-input-container input {
    width: 100%;
    padding: 4px;
    font-size: 14px;
    margin-bottom: 20px;
}

input.text-style {
    border-radius: 10px;
    width: 100%;
    height: 10px;
    padding: 10px 12px;
    font-size: 14px;
    background: none;
    border: 2px solid rgb(51, 47, 47);
    color: black;
    box-sizing: border-box;
}

input:focus {
    outline: none;
}

.form-label {
    color: black;
    font-weight: 350;
    font-size: 15px;
    margin-bottom: 5px;
}

.login-btn {
    width: 200px;
    background: #D6EFD8;
    border-radius: 20px;
    border: none;
    padding: 10px 0;
    color: black;
    font-weight: 705;
    font-size: 15px;
    letter-spacing: 2px;
    margin-bottom: 10px;
    margin-top: 10px;
    cursor: pointer;
    box-shadow: 0 8px 10px 0 rgba(0,0,0,0.25);
    text-decoration: none;
    text-align: center;
}

.login-btn:hover {
    background-color: #80AF81;
}

.login-deco-container {
    width: 50%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
}

.login-deco {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.deco-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-top: 100px;
}

.penny {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #f6f8d5;
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 2px;
    padding-top: 10px;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.success {
    color: green;
}

.invalid {
    color: red;
    font-size: 0.9em;
}

/* Responsive adjustments without stacking */

@media (max-width: 1024px) {
    .login-container {
        padding: 20px;
        gap: 10px;
    }

    .login-form,
    .login-deco-container {
        width: 48%;
    }

    .deco-image {
        max-width: 260px;
        margin-top: 80px;
    }

    .penny {
        font-size: 32px;
    }

    .login-label {
        font-size: 28px;
    }
}

@media (max-width: 768px) {
    .login-container {
        padding: 15px;
    }

    .login-form,
    .login-deco-container {
        width: 48%;
    }

    .deco-image {
        max-width: 200px;
    }

    .penny {
        font-size: 26px;
    }

    .login-label {
        font-size: 24px;
    }

    .login-btn {
        font-size: 14px;
        padding: 8px 0;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 10px;
        gap: 5px;
    }

    .login-form,
    .login-deco-container {
        width: 48%;
    }

    .deco-image {
        max-width: 150px;
    }

    .penny {
        font-size: 18px;
    }

    .login-label {
        font-size: 20px;
    }

    .login-btn {
        font-size: 13px;
        padding: 6px 0;
    }
}
</style>
