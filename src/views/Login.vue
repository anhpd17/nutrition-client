<template>
    <div id="container">
        <div class="wrapper">
            <div class="img-block">
                <img
                    src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
                    alt=""
                />
                <h2>Create an account</h2>
            </div>
            <div class="info-block">
                <h1 class="form-title">Sign up</h1>
                <div class="input-group">
                    <label for="username-input">Username</label>
                    <input type="text" id="username-input" />
                </div>
                <div class="input-group">
                    <label for="password-input">Password</label>
                    <input type="password" id="password-input" />
                </div>
                <div class="box-group">
                    <input type="checkbox" name="" id="tick" />
                    <label for="tick">Remember me</label>
                </div>
                <button class="login-btn">Log in</button>
            </div>
        </div>
    </div>
</template>
<script></script>
<style scoped>
#container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(239, 239, 239);
    background-position: center;
    background-size: cover;
}
.wrapper {
    background-color: white;
    padding: 40px;
    border-radius: 24px;
    width: 800px;
    height: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-title {
    text-align: left;
    margin: 0 0 33px;
    font-size: 40px;
    color: black;
}
.input-group {
    margin-bottom: 24px;
}
.input-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 24px;
    color: black;
    font-weight: lighter;
}
.input-group input {
    display: block;
    padding: 8px 12px;
    border: 0;
    border-bottom: 1px solid #999;
    outline: none;
    width: calc(100% - 24px);
}

.login-btn {
    display: block;
    width: 40%;
    padding: 15px 39px;
    background-color: #6dabe4;
    font-size: 15px;
    color: white;
    border-radius: 5px;
    border: none;
    outline: none;
    margin: 40px 0;
    cursor: pointer;
}
.img-block {
    width: 45%;
    display: inline-block;
    margin: 0 0 0 40px;
}

.info-block {
    width: 40%;
    display: inline-block;
    margin: 0 40px 0 0;
}

.box-group {
    margin: 20px 0;
}

.img-block h2 {
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    font-weight: 350;
    text-decoration: underline;
    cursor: pointer;
}
</style>
