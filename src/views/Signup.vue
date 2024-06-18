<template>
    <div id="container">
        <div class="wrapper">
            <div style="display: flex; align-items: center; column-gap: 46px">
                <div class="signup-left">
                    <h1>Sign up</h1>
                    <div class="signup-form">
                        <div class="input-group">
                            <div class="input-group-icon">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <input
                                type="text"
                                v-model="authInfo.name"
                                placeholder="Your Name"
                                id="name-input"
                            />
                        </div>
                        <div class="input-group">
                            <div class="input-group-icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <input
                                type="email"
                                v-model="authInfo.userName"
                                placeholder="Your Username"
                                id="email-input"
                            />
                        </div>
                        <div class="input-group">
                            <div class="input-group-icon">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <input
                                type="password"
                                v-model="authInfo.password"
                                placeholder="Password"
                                id="password-input"
                            />
                        </div>
                        <div class="input-group">
                            <div class="input-group-icon">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <input
                                type="password"
                                placeholder="Repeat your password"
                                id="confirm-password-input"
                            />
                        </div>
                        <div class="accept-block">
                            <input type="checkbox" name="" id="agree-term" />
                            <span
                                >I agree all statements in
                                <a href="">Term of service</a></span
                            >
                        </div>
                        <button class="signup-btn" @click="moveToSecondStep">
                            Register
                        </button>
                    </div>
                </div>
                <div class="signup-right" style="width: 50%">
                    <img
                        src="../assets/images/diet_blog1.jpg"
                        alt=""
                        style="width: 100%; height: 100%"
                    />
                    <router-link to="/login">
                        <p>I am already a member</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { apiPost, apiGet } from "../api/api";
import { ref } from "vue";
import router from "../router";

const authInfo = ref({
    userName: "",
    password: "",
    name: "",
    email: "",
    roleId: null,
});
const moveToSecondStep = async () => {
    try {
        let res = await apiPost("/auth/create", authInfo.value);
        let userObj = await apiGet("/auth");
        localStorage.setItem("userInfo", JSON.stringify(userObj));
        // Create user goal for this user
        let res2 = await apiPost(`/userGoals/create`, {
            userId: userObj.id,
            Description: "",
            sex: true,
            age: 18,
            height: 170,
            weight: 60,
            exercise: "EXTRA_ACTIVE",
            conditionIds: [],
        });
        console.log(res);
        console.log(res2);
        localStorage.setItem("userGoalId", JSON.stringify(res2.id));
        router.push("/");
        ElNotification({
            title: "Notice",
            message: "Create account Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        router.push("/");
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Create account Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
};
</script>
<style scoped>
#container {
    background-color: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
}
.wrapper {
    border-radius: 24px;
    padding: 60px 24px;
    background-color: #fff;
    width: 900px;
    box-shadow: 0 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 46px;
}
.input-group {
    display: flex;
    align-items: center;
    column-gap: 12px;
    border-bottom: 1px solid #999;
    margin: 24px 0;
}
.input-group input {
    border: none;
    outline: none;
    padding: 6px 0;
}
.accept-block {
    display: flex;
    align-items: center;
    column-gap: 12px;
}
.accept-block input {
    transform: scale(1.6);
}
.accept-block * {
    color: #222;
    font-size: 13px;
}
.signup-btn {
    background: #6dabe4;
    color: #fff;
    border: none;
    padding: 15px 39px;
    border-radius: 5px;
    margin-top: 25px;
    cursor: pointer;
    width: 100%;
}
.signup-left {
    width: 50%;
}
.signup-left > h1 {
    font-size: 30px;
}
.signup-right p {
    display: block;
    text-align: center;
    color: #222;
    margin-top: 36px;
    font-size: 14px;
    text-decoration: underline;
}
</style>
