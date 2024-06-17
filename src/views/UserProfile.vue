<template>
    <MainLayout>
        <template #main-layout-content>
            <div
                style="
                    margin-top: 86px;
                    display: flex;
                    align-items: center;
                    column-gap: 60px;
                    padding: 12px 120px;
                "
            >
                <div
                    class="avatar"
                    :style="{
                        'background-color':
                            avatarGenerate.generateColorByString(userInfoName),
                    }"
                >
                    {{ avatarGenerate.getFirstLetterOfName(userInfoName) }}
                </div>
                <div>
                    <h1 style="font-size: 30px">{{ userInfoName }}</h1>
                    <el-button @click="logout">Logout</el-button>
                </div>
            </div>
            <div class="user-goal">
                <el-form
                    label-position="left"
                    label-width="130px"
                    style="
                        display: flex;
                        align-items: flex-start;
                        column-gap: 24px;
                        margin-top: 24px;
                        padding: 12px 120px;
                    "
                >
                    <div style="width: 50%">
                        <el-form-item label="Age">
                            <el-input v-model.number="userGoal.age"></el-input>
                        </el-form-item>
                        <el-form-item label="BMR">
                            <el-input v-model.number="userGoal.TEE"></el-input>
                        </el-form-item>
                        <el-form-item label="BMR">
                            <el-input v-model.number="userGoal.TDEE"></el-input>
                        </el-form-item>
                        <el-form-item label="Sex">
                            <el-radio-group v-model="userGoal.sex">
                                <el-radio
                                    label="Male"
                                    :value="true"
                                    style="margin-right: 16px"
                                ></el-radio>
                                <el-radio
                                    label="Female"
                                    :value="false"
                                    style="margin-right: 16px"
                                ></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="Exercise">
                            <el-select
                                v-model="userGoal.exercise"
                                placeholder="Your exercise"
                            >
                                <el-option
                                    label="Ít vận động"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="Vận động nhiều"
                                    value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="width: 50%">
                        <el-form-item label="BMR">
                            <el-input v-model.number="userGoal.BMR"></el-input>
                        </el-form-item>
                        <el-form-item label="BMI">
                            <el-input v-model.number="userGoal.BMI"></el-input>
                        </el-form-item>
                        <el-form-item label="Weight">
                            <el-input
                                v-model.number="userGoal.weight"
                                placeholder="Kg"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Pregnant">
                            <el-radio-group
                                v-model="userGoal.possiblePregnancy"
                            >
                                <el-radio
                                    label="Yes"
                                    :value="true"
                                    style="margin-right: 16px"
                                ></el-radio>
                                <el-radio
                                    label="No"
                                    :value="false"
                                    style="margin-right: 16px"
                                ></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item style="float: right; margin-right: 12px">
                            <el-button type="primary" @click="submitForm"
                                >Save</el-button
                            >
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </template>
    </MainLayout>
</template>
<script>
import MainLayout from "../layouts/MainLayout.vue";
import avatarGenerate from "../utils/avatarGenerator.js";
import { apiGet } from "../api/api.js";

export default {
    components: {
        MainLayout,
    },
    async created() {
        this.userGoal = await apiGet("/userGoals/findOne/1");
    },
    data() {
        return {
            userInfoName: JSON.parse(localStorage.getItem("userInfo"))?.name,
            avatarGenerate: avatarGenerate,
            userGoal: {
                userId: 0,
                BMR: 0,
                sex: false,
                age: 0,
                weight: 0,
                possiblePregnancy: null,
                TEE: 0,
                TDEE: 0,
                exercise: "LITTLE_OR_NO_EXERCI",
                BMI: 0,
                Description: null,
                nutrients: [],
            },
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("tokenAuth");
            localStorage.removeItem("userInfo");
            this.$router.push("/login");
        },
    },
};
</script>
<style scoped>
.avatar {
    width: 140px;
    height: 140px;
    font-size: 50px;
}
</style>
