import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Assessment from "../views/Assessment.vue";
import Ingredient from "../views/Ingredient.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Disease from "../views/Disease.vue";
import Dish from "../views/Dish.vue";
import Meal from "../views/Meal.vue";
import UserProfile from "../views/UserProfile.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Dashboard,
            name: "Dashboard",
        },
        {
            path: "/assessment",
            component: Assessment,
            name: "Assessment",
        },
        {
            path: "/meal",
            component: Meal,
            name: "Meal",
        },
        {
            path: "/ingredient",
            component: Ingredient,
            name: "Ingredient",
        },
        {
            path: "/disease",
            component: Disease,
            name: "Disease",
        },
        {
            path: "/dish",
            component: Dish,
            name: "Dish",
        },
        {
            path: "/login",
            component: Login,
            name: "Login",
        },
        {
            path: "/signup",
            component: Signup,
            name: "Signup",
        },
        {
            path: "/profile",
            component: UserProfile,
            name: "UserProfile",
        },
        // {
        //     path: "/leave/detail",
        //     component: LeaveDetails,
        //     name: "leave-detail",
        //     props: true,
        // },
    ],
});

export default router;
