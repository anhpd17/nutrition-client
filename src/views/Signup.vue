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
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <input
                                type="text"
                                v-model="authInfo.email"
                                placeholder="Your Email"
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
                                minlength="6"
                                type="password"
                                v-model="authInfo.password"
                                placeholder="Password"
                                id="password-input"
                                ref="passwordInput"
                            />
                        </div>
                        <div class="input-group">
                            <div class="input-group-icon">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <input
                                minlength="6"
                                type="password"
                                placeholder="Repeat your password"
                                id="confirm-password-input"
                                ref="confirmPasswordInput"
                            />
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

const passwordInput = ref(null);
const confirmPasswordInput = ref(null);

const authInfo = ref({
    userName: "",
    password: "",
    name: "",
    email: "",
    roleId: null,
});
const moveToSecondStep = async () => {
    console.log(passwordInput.value.value.length);
    if (passwordInput.value.value.length < 6) {
        ElNotification({
            title: "Notice",
            message: "Password has to be at least 6 characters",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
        return;
    }
    if (passwordInput.value.value != confirmPasswordInput.value.value) {
        ElNotification({
            title: "Notice",
            message: "Confirm password is not match",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
        return;
    }
    try {
        let token = await apiPost("/auth/create", authInfo.value);
        localStorage.setItem(
            "tokenAuth",
            JSON.stringify({
                token: token,
            })
        );

        // Cần khởi tạo lại đối tượng axios instance để reset token

        let userObj = null;
        const headers1 = {
            Authorization: `Bearer ${token}`,
        };

        await fetch("http://localhost:3001/auth", {
            headers: headers1,
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                // Process the fetched data here
                console.log(data);
                userObj = data;
                localStorage.setItem("userInfo", JSON.stringify(userObj));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        // Create user goal for this user
        const headers2 = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Optional, depending on your API requirements
        };

        await fetch("http://localhost:3001/userGoals/create", {
            method: "POST",
            headers: headers2,
            body: JSON.stringify({
                userId: userObj.id,
                Description: "",
                sex: true,
                age: 18,
                height: 170,
                weight: 60,
                exercise: "EXTRA_ACTIVE",
                conditionIds: [],
            }), // Convert data to JSON string for POST request
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                // Process the fetched data here
                console.log(data);
                localStorage.setItem("userGoalId", JSON.stringify(data.id));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        ElNotification({
            title: "Notice",
            message: "Create account Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        router.push("/");
        setTimeout(() => {
            location.reload();
        }, 0);
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
