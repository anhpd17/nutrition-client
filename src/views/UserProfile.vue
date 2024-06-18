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
                        <el-form-item label="Description">
                            <el-input
                                v-model.number="userGoal.Description"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Age">
                            <el-input v-model.number="userGoal.age"></el-input>
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
                                    value="LITTLE_OR_NO_EXERCISE"
                                ></el-option>
                                <el-option
                                    label="Vận động nhẹ"
                                    value="LIGHT_ACTIVITY"
                                ></el-option>
                                <el-option
                                    label="Vận động trung bình"
                                    value="MODERATE_ACTIVITY"
                                ></el-option>
                                <el-option
                                    label="Vận động nhiều"
                                    value="VERY_ACTIVE"
                                ></el-option>
                                <el-option
                                    label="Vận động cường độ cao"
                                    value="EXTRA_ACTIVE"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="width: 50%">
                        <el-form-item label="Height">
                            <el-input
                                v-model.number="userGoal.height"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Weight">
                            <el-input
                                v-model.number="userGoal.weight"
                                placeholder="Kg"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Condition">
                            <el-select
                                v-model="userGoal.conditionIds"
                                collapse-tags
                                multiple
                                placeholder="Select Conditions"
                            >
                                <el-option
                                    v-for="item in lstCondition"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item style="float: right; margin-right: 12px">
                            <el-button
                                type="success"
                                @click="() => (nutriView = true)"
                                >Nutritions & Statistic</el-button
                            >
                            <el-button type="primary" @click="submitForm"
                                >Save</el-button
                            >
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </template>
    </MainLayout>
    <!-- ADD MEAL -->
    <el-dialog v-model="nutriView" title="Statistic" width="600">
        <el-form :model="userGoal" :label-width="150" label-position="left">
            <el-form-item label="BMI">
                <el-input
                    v-model="userGoal.BMI"
                    autocomplete="off"
                    :readonly="true"
                />
            </el-form-item>
            <el-form-item label="BMR">
                <el-input
                    v-model="userGoal.BMR"
                    autocomplete="off"
                    :readonly="true"
                />
            </el-form-item>
            <el-form-item label="TDEE">
                <el-input
                    v-model="userGoal.TDEE"
                    autocomplete="off"
                    :readonly="true"
                />
            </el-form-item>
            <el-form-item label="TEE">
                <el-input
                    v-model="userGoal.TEE"
                    autocomplete="off"
                    :readonly="true"
                />
            </el-form-item>
            <h3>Nutritions</h3>
            <div
                style="
                    display: flex;
                    align-items: center;
                    column-gap: 12px;
                    margin-top: 8px;
                "
                v-for="(item, index) in userGoal.nutrients"
                :key="index"
            >
                <el-input
                    v-model="item.name"
                    autocomplete="off"
                    placeholder="Name"
                    :readonly="true"
                />
                <el-input
                    v-model="item.amount"
                    autocomplete="off"
                    placeholder="Amount"
                    :readonly="true"
                />
                <el-input
                    v-model="item.unit"
                    autocomplete="off"
                    placeholder="Unit"
                    :readonly="true"
                />
            </div>
        </el-form>
        <template #footer>
            <el-button type="success" @click="() => (nutriView = false)"
                >Okay</el-button
            >
        </template>
    </el-dialog>
</template>
<script>
import MainLayout from "../layouts/MainLayout.vue";
import avatarGenerate from "../utils/avatarGenerator.js";
import { apiGet, apiPatch } from "../api/api.js";

export default {
    components: {
        MainLayout,
    },
    async created() {
        this.userGoal = await apiGet(`/userGoals/findOne/${this.userGoalId}`);
        this.lstCondition = await apiGet("/conditions/findAll?isActive=true");
    },
    data() {
        return {
            nutriView: false,
            userGoalId: JSON.parse(localStorage.getItem("userGoalId")) || 1,
            userInfoName: JSON.parse(localStorage.getItem("userInfo"))?.name,
            avatarGenerate: avatarGenerate,
            userGoal: {
                userId: JSON.parse(localStorage.getItem("userInfo"))?.id,
                sex: false,
                age: 0,
                weight: 0,
                height: 0,
                exercise: "LITTLE_OR_NO_EXERCISE",
                Description: null,
                conditionIds: [],
            },
            lstCondition: [],
        };
    },
    methods: {
        showNutri() {},
        logout() {
            localStorage.removeItem("tokenAuth");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userGoalId");
            this.$router.push("/login");
        },
        async submitForm() {
            try {
                await apiPatch(`/userGoals/update/${this.userGoalId}`, {
                    userId: this.userGoal.userId,
                    Description: this.userGoal.Description,
                    sex: this.userGoal.sex,
                    age: this.userGoal.age,
                    height: this.userGoal.height,
                    weight: this.userGoal.weight,
                    exercise: this.userGoal.exercise,
                    conditionIds: this.userGoal.conditionIds,
                });
                this.$message({
                    type: "success",
                    message: "Update success",
                });
            } catch (error) {
                console.log(error);
                this.$message({
                    type: "error",
                    message: "Update failed",
                });
            }
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
