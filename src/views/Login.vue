<template>
    <div id="container">
        <div class="wrapper">
            <div class="img-block">
                <img
                    src="../assets/images/diet_blog1.jpg"
                    alt=""
                    style="width: 100%; height: 100%"
                />
                <router-link to="/signup">
                    <h2>Create an account</h2>
                </router-link>
            </div>
            <div class="info-block">
                <h1 class="form-title">Log in</h1>
                <div class="input-group">
                    <label for="username-input">Username</label>
                    <input ref="username" type="text" id="username-input" />
                </div>
                <div class="input-group">
                    <label for="password-input">Password</label>
                    <input ref="password" type="password" id="password-input" />
                </div>
                <div class="box-group">
                    <input type="checkbox" name="" id="tick" />
                    <label for="tick">Remember me</label>
                </div>
                <button class="login-btn" @click="handleLogin">Log in</button>
            </div>
        </div>
    </div>
</template>
<script>
import { apiPost } from "../api/api";
export default {
    methods: {
        async handleLogin() {
            try {
                let res = await apiPost("/auth/login", {
                    userName: this.$refs.username.value,
                    password: this.$refs.password.value,
                });
                localStorage.setItem(
                    "tokenAuth",
                    JSON.stringify({
                        token: res,
                        userName: this.$refs.username.value,
                    })
                );
                this.$notify({
                    title: "Notice",
                    message: "Login Successfully",
                    duration: 3000,
                    type: "success",
                    position: "bottom-right",
                });
                this.$router.push("/");
            } catch (error) {
                this.$notify({
                    title: "Notice",
                    message: "Login Failed! Please check your account",
                    duration: 3000,
                    type: "error",
                    position: "bottom-right",
                });
            }
        },
    },
};
</script>
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
    column-gap: 46px;
    justify-content: space-between;
    align-items: center;
}
.form-title {
    text-align: center;
    margin-bottom: 33px;
    font-size: 40px;
    color: black;
}
.input-group {
    margin-bottom: 24px;
}
.input-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: black;
}
.input-group input {
    width: 100%;
    padding: 8px 12px;
    border: 0;
    border-bottom: 1px solid #999;
    outline: none;
}

.login-btn {
    display: block;
    width: 100%;
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
.info-block {
    width: 50%;
}

.box-group {
    margin: 20px 0;
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-size: 14px;
}
.img-block {
    width: 50%;
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
