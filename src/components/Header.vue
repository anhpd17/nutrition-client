<template>
    <header class="header">
        <router-link to="/">
            <div class="logo">Nutrition</div>
        </router-link>
        <nav class="navbar">
            <router-link to="/">
                <div>Home</div>
            </router-link>
            <router-link to="/meal">
                <div>Meals</div>
            </router-link>
            <router-link to="/ingredient">
                <div>Ingredients</div>
            </router-link>
            <!-- <router-link to="/assessment">
                <div>Assessment</div>
            </router-link> -->
            <router-link to="/disease">
                <div>Disease</div>
            </router-link>
            <router-link to="/dish">
                <div>Dish</div>
            </router-link>
            <div @click="toUser">Users</div>
            <router-link to="/profile">
                <div
                    class="avatar"
                    :style="{
                        'background-color':
                            avatarGenerate.generateColorByString(userInfoName),
                    }"
                >
                    {{ avatarGenerate.getFirstLetterOfName(userInfoName) }}
                </div>
            </router-link>
        </nav>
    </header>
</template>
<script setup>
import avatarGenerate from "../utils/avatarGenerator.js";
import router from "../router/index.js";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const isAdmin = userInfo?.roleId == 1;
const userInfoName = userInfo?.name;

const toUser = () => {
    if (isAdmin) {
        router.push("/users");
    } else {
        ElNotification({
            title: "Notice",
            message: "You are not allowed to view this",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
};
</script>
<style scoped>
/* header */

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 9%;
    background: var(--primary);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.header .logo {
    font-size: 2.2rem;
    font-weight: bolder;
    color: var(--main-color);
}
.navbar {
    display: flex;
    align-items: center;
}

.header .navbar div {
    font-size: 1.7rem;
    margin-left: 2rem;
    color: var(--black);
}

.header .navbar div:hover {
    color: var(--main-color);
}

/* end */
</style>
