<template>
    <MainLayout>
        <template #main-layout-content>
            <!-- Profile -->
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
            <!-- Statistic -->
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
                                    label="LITTLE OR NO EXERCISE"
                                    value="LITTLE_OR_NO_EXERCISE"
                                ></el-option>
                                <el-option
                                    label="LIGHT ACTIVITY"
                                    value="LIGHT_ACTIVITY"
                                ></el-option>
                                <el-option
                                    label="MODERATE ACTIVITY"
                                    value="MODERATE_ACTIVITY"
                                ></el-option>
                                <el-option
                                    label="VERY ACTIVE"
                                    value="VERY_ACTIVE"
                                ></el-option>
                                <el-option
                                    label="EXTRA ACTIVE"
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
                                type="primary"
                                @click="handleOpenWeekCompare"
                                >Nutrition by week</el-button
                            >
                            <el-button
                                type="primary"
                                @click="() => (nutriChange = true)"
                                >Change Nutritions</el-button
                            >
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
    <!-- FORM OVERVIEW WEEK -->
    <el-dialog v-model="nutriweek" title="Overview" width="900">
        <!-- Week picker -->
        <el-date-picker
            v-model="weekSelected"
            type="week"
            format="[Week] ww"
            placeholder="Pick a week"
            style="margin-bottom: 12px"
            @change="onSelectWeek"
        />
        <!-- Table nutri compare -->
        <el-table
            v-loading="isLoadingTable"
            :data="userWeekActual"
            style="width: 100%"
            height="460"
        >
            <el-table-column label="Name" prop="name">
                <template #default="scope">
                    <b
                        v-if="
                            [
                                'Calories',
                                'Carbohydrates',
                                'Fat',
                                'Protein',
                            ].includes(scope.row.name)
                        "
                        >{{ scope.row.name }}</b
                    >
                    <span v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Amount" prop="amount">
                <template #default="scope">
                    <div>
                        <span>{{ scope.row.amount }}</span
                        >/<b>{{
                            userWeekNeed.find((x) => x?.name == scope.row?.name)
                                ?.amount || 0
                        }}</b>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Unit" prop="unit" />
            <el-table-column label="Progress">
                <template #default="scope">
                    <el-progress
                        :text-inside="true"
                        :stroke-width="24"
                        :percentage="
                            (() => {
                                let actual = scope.row.amount;
                                let expected =
                                    userWeekNeed.find(
                                        (x) => x?.name == scope.row?.name
                                    )?.amount || 1;
                                let percent =
                                    (actual / expected) * 100 > 100
                                        ? 100
                                        : (actual / expected) * 100;
                                return Number.parseInt(percent) || 0;
                            })()
                        "
                        status="success"
                        style="width: 200px"
                    />
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="success" @click="() => (nutriweek = false)">
                    Okay
                </el-button>
            </div>
        </template>
    </el-dialog>
    <!-- Nutrition Change -->
    <el-dialog v-model="nutriChange" title="Change Nutrition" width="600">
        <el-form :model="userGoal" :label-width="150" label-position="left">
            <el-form-item label="Fat">
                <el-slider
                    v-model="nutriChangeInfo.fatAmount"
                    :min="rangeValueNutrient.fatAmount.min"
                    :max="rangeValueNutrient.fatAmount.max"
                    @change="handleChangeNutri('fat')"
                />
            </el-form-item>
            <el-form-item label="Carbs">
                <el-slider
                    v-model="nutriChangeInfo.carbohydratesAmount"
                    :min="rangeValueNutrient.carbohydratesAmount.min"
                    :max="rangeValueNutrient.carbohydratesAmount.max"
                    @change="handleChangeNutri('carbs')"
                />
            </el-form-item>
            <el-form-item label="Protein">
                <el-slider
                    v-model="nutriChangeInfo.proteinAmount"
                    :min="rangeValueNutrient.proteinAmount.min"
                    :max="rangeValueNutrient.proteinAmount.max"
                    @change="handleChangeNutri('protein')"
                />
            </el-form-item>
        </el-form>
        <div
            style="
                display: flex;
                align-items: center;
                column-gap: 36px;
                margin-bottom: 24px;
                justify-content: space-between;
            "
            v-for="(item, index) in Object.keys(nutriChangeInfo)"
            :key="index"
        >
            <el-button>
                {{
                    (() => {
                        switch (item) {
                            case "proteinAmount":
                                return "Protein amount";
                            case "carbohydratesAmount":
                                return "Carbohydrates amount";
                            case "fatAmount":
                                return "Fat amount";
                            default:
                                return "Unknown value";
                        }
                    })()
                }}
            </el-button>
            <h3>
                {{ nutriChangeInfo[item] }} grams/day (Range:
                {{ rangeValueNutrient[item].min }} -
                {{ rangeValueNutrient[item].max }})
            </h3>
        </div>
        <template #footer>
            <el-button @click="() => (nutriChange = false)">Cancel</el-button>
            <el-button type="success" @click="saveChangeNutri">Save</el-button>
        </template>
    </el-dialog>
    <!-- Nutrition View -->
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
        if (!JSON.parse(localStorage.getItem("userGoalId"))) {
            let res = await apiGet(
                `/userGoals/findOneByUser/${
                    JSON.parse(localStorage.getItem("userInfo"))?.id
                }`
            );
            this.userGoalId = res.id;
            localStorage.setItem("userGoalId", JSON.stringify(res.id));
        }
        this.userGoal = await apiGet(`/userGoals/findOne/${this.userGoalId}`);
        this.userGoal.conditionIds = this.userGoal.userCondition.map(
            (x) => x.conditionId
        );
        this.lstCondition = await apiGet("/conditions/findAll?isActive=true");
        this.setDetailNutriInfo(this.userGoal.nutrients);
        this.calculateRangeNutri(this.userGoal.TDEE);
    },
    data() {
        return {
            isLoadingTable: false,
            weekSelected: null,
            nutriweek: false,
            userWeekNeed: null,
            userWeekActual: null,
            nutriChange: false,
            nutriChangeInfo: {
                proteinAmount: 0,
                carbohydratesAmount: 0,
                fatAmount: 0,
            },
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
            rangeValueNutrient: {
                fatAmount: {
                    max: 0,
                    min: 0,
                },
                carbohydratesAmount: {
                    max: 0,
                    min: 0,
                },
                proteinAmount: {
                    max: 0,
                    min: 0,
                },
            },
        };
    },
    methods: {
        addNameProperty(obj) {
            const newData = [];
            for (const key in obj) {
                newData.push({ ...obj[key], name: key }); // Spread operator to avoid mutation
            }
            return newData;
        },
        formatDateRange(dateString) {
            const date = new Date(dateString);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
            const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

            return `${year}-${month}-${day}`;
        },
        async onSelectWeek($event) {
            const startOfWeek = new Date($event.getTime());
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            const endOfWeek = new Date(startOfWeek.getTime());
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            let rangeWeek = {
                startDate: this.formatDateRange(startOfWeek),
                endDate: this.formatDateRange(endOfWeek),
            };
            let response = await apiGet(
                `/userGoals/get-nutrition-week?userId=${this.userGoal.userId}&startDate=${rangeWeek.startDate}&endDate=${rangeWeek.endDate}`
            );
            this.userWeekActual = this.addNameProperty(
                response.nutritionalInfo
            );
        },
        async handleOpenWeekCompare() {
            // Call API get UserWeekNeed & actual
            let response = await apiGet(
                `/userGoals/getWeekUser/${this.userGoal.userId}`
            );
            this.userWeekNeed = this.addNameProperty(response.nutritionalInfo);
            // Show popup
            this.nutriweek = true;
        },
        slideProtein(spVal) {
            let currentCarbVal = this.nutriChangeInfo.carbohydratesAmount;
            let currentFatVal = this.nutriChangeInfo.fatAmount;
            let spRemainingEnergy = this.userGoal.TDEE - spVal * 4;

            let newCarbVal =
                (spRemainingEnergy * currentCarbVal) /
                (currentCarbVal * 4 + currentFatVal * 9);
            let newFatVal =
                (spRemainingEnergy * currentFatVal) /
                (currentCarbVal * 4 + currentFatVal * 9);
            let newProteinVal = spVal;

            if (newFatVal < this.rangeValueNutrient.fatAmount.min) {
                newFatVal = this.rangeValueNutrient.fatAmount.min;
                newCarbVal = (spRemainingEnergy - newFatVal * 9) / 4;
            } else if (newFatVal > this.rangeValueNutrient.fatAmount.max) {
                newFatVal = this.rangeValueNutrient.fatAmount.max;
                newCarbVal = (spRemainingEnergy - newFatVal * 9) / 4;
            }

            if (newCarbVal < this.rangeValueNutrient.carbohydratesAmount.min) {
                newCarbVal = this.rangeValueNutrient.carbohydratesAmount.min;
                newFatVal = (spRemainingEnergy - newCarbVal * 4) / 9;
                if (newFatVal < this.rangeValueNutrient.fatAmount.min) {
                    newFatVal = this.rangeValueNutrient.fatAmount.min;
                    newProteinVal =
                        (this.userGoal.TDEE - newCarbVal * 4 - newFatVal * 9) /
                        4;
                    this.nutriChangeInfo.proteinAmount =
                        Math.round(newProteinVal);
                }
            } else if (
                newCarbVal > this.rangeValueNutrient.carbohydratesAmount.max
            ) {
                newCarbVal = this.rangeValueNutrient.carbohydratesAmount.max;
                newFatVal = (spRemainingEnergy - newCarbVal * 4) / 9;
                if (newFatVal > this.rangeValueNutrient.fatAmount.max) {
                    newFatVal = this.rangeValueNutrient.fatAmount.max;
                    newProteinVal =
                        (this.userGoal.TDEE -
                            newCarbVal * 3.75 -
                            newFatVal * 8.8) /
                        4.1;
                    this.nutriChangeInfo.proteinAmount =
                        Math.round(newProteinVal);
                }
            }
            this.nutriChangeInfo.proteinAmount = Math.round(newProteinVal);
            this.nutriChangeInfo.carbohydratesAmount = Math.round(newCarbVal);
            this.nutriChangeInfo.fatAmount = Math.round(newFatVal);
        },

        slideCarb(scVal) {
            let currentProteinVal = this.nutriChangeInfo.proteinAmount;
            let currentFatVal = this.nutriChangeInfo.fatAmount;
            let scRemainingEnergy = this.userGoal.TDEE - scVal * 4;

            let newFatVal = (scRemainingEnergy - currentProteinVal * 4) / 9;
            let newCarbVal = scVal;
            let newProteinVal = currentProteinVal;

            if (newFatVal < this.rangeValueNutrient.fatAmount.min) {
                newFatVal = this.rangeValueNutrient.fatAmount.min;
                newProteinVal = (scRemainingEnergy - newFatVal * 9) / 4;
                if (newProteinVal < this.rangeValueNutrient.proteinAmount.min) {
                    newProteinVal = this.rangeValueNutrient.proteinAmount.min;
                    newCarbVal =
                        (this.userGoal.TDEE -
                            newProteinVal * 4 -
                            newFatVal * 9) /
                        4;
                    this.nutriChangeInfo.carbohydratesAmount =
                        Math.round(newCarbVal);
                }
            } else if (newFatVal > this.rangeValueNutrient.fatAmount.maxValue) {
                newFatVal = this.rangeValueNutrient.fatAmount.max;
                newProteinVal = (scRemainingEnergy - newFatVal * 9) / 4;
                if (newProteinVal > this.rangeValueNutrient.proteinAmount.max) {
                    newProteinVal = this.rangeValueNutrient.proteinAmount.max;
                    newCarbVal =
                        (this.userGoal.TDEE -
                            newProteinVal * 4 -
                            newFatVal * 9) /
                        4;
                    this.nutriChangeInfo.carbohydratesAmount =
                        Math.round(newCarbVal);
                }
            }
            this.nutriChangeInfo.proteinAmount = Math.round(newProteinVal);
            this.nutriChangeInfo.carbohydratesAmount = Math.round(newCarbVal);
            this.nutriChangeInfo.fatAmount = Math.round(newFatVal);
        },

        slideFat(sfVal) {
            let currentCarbVal = this.nutriChangeInfo.carbohydratesAmount;
            let currentProteinVal = this.nutriChangeInfo.proteinAmount;
            let sfRemainingEnergy = this.userGoal.TDEE - sfVal * 9;

            let newCarbVal =
                (sfRemainingEnergy * currentCarbVal) /
                (currentCarbVal * 4 + currentProteinVal * 4);
            let newProteinVal =
                (sfRemainingEnergy * currentProteinVal) /
                (currentCarbVal * 4 + currentProteinVal * 4);
            let newFatVal = sfVal;

            if (newProteinVal < this.rangeValueNutrient.proteinAmount.min) {
                newProteinVal = this.rangeValueNutrient.proteinAmount.min;
                newCarbVal = (sfRemainingEnergy - newProteinVal * 4) / 4;
            } else if (
                newProteinVal > this.rangeValueNutrient.proteinAmount.max
            ) {
                newProteinVal = this.rangeValueNutrient.proteinAmount.max;
                newCarbVal = (sfRemainingEnergy - newProteinVal * 4) / 4;
            }

            if (newCarbVal < this.rangeValueNutrient.carbohydratesAmount.min) {
                newCarbVal = this.rangeValueNutrient.carbohydratesAmount.min;
                newProteinVal = (sfRemainingEnergy - newCarbVal * 4) / 4;
                if (newProteinVal < this.rangeValueNutrient.proteinAmount.min) {
                    newProteinVal = this.rangeValueNutrient.proteinAmount.min;
                    newFatVal =
                        (this.userGoal.TDEE -
                            newCarbVal * 4 -
                            newProteinVal * 4) /
                        9;
                    this.nutriChangeInfo.fatAmount = Math.round(newFatVal);
                }
            } else if (
                newCarbVal > this.rangeValueNutrient.carbohydratesAmount.max
            ) {
                newCarbVal = this.rangeValueNutrient.carbohydratesAmount.max;
                newProteinVal = (sfRemainingEnergy - newCarbVal * 4) / 4;
                if (newProteinVal > this.rangeValueNutrient.proteinAmount.max) {
                    newProteinVal = this.rangeValueNutrient.proteinAmount.max;
                    newFatVal =
                        (this.userGoal.TDEE -
                            newCarbVal * 4 -
                            newProteinVal * 4) /
                        9;
                    this.nutriChangeInfo.proteinAmount =
                        Math.round(newProteinVal);
                }
            }
            this.nutriChangeInfo.carbohydratesAmount = Math.round(newCarbVal);
            this.nutriChangeInfo.proteinAmount = Math.round(newProteinVal);
            this.nutriChangeInfo.fatAmount = Math.round(newFatVal);
        },

        handleChangeNutri(type) {
            switch (type) {
                case "fat":
                    this.slideFat(this.nutriChangeInfo.fatAmount);
                    break;
                case "protein":
                    this.slideProtein(this.nutriChangeInfo.proteinAmount);
                    break;
                case "carbs":
                    this.slideCarb(this.nutriChangeInfo.carbohydratesAmount);
                    break;
                default:
                    break;
            }
        },
        async saveChangeNutri() {
            try {
                await apiPatch(
                    `/userGoals/update-by-user/${this.userGoalId}`,
                    this.nutriChangeInfo
                );
                this.$message({
                    type: "success",
                    message: "Update success",
                });
                this.nutriChange = false;
            } catch (error) {
                console.log(error);
                this.$message({
                    type: "error",
                    message: "Update failed",
                });
            }
        },
        setDetailNutriInfo(nutrients) {
            this.nutriChangeInfo.fatAmount = Number.parseInt(
                nutrients?.find((x) => x.name == "Fat")?.amount
            );
            this.nutriChangeInfo.proteinAmount = Number.parseInt(
                nutrients?.find((x) => x.name == "Protein")?.amount
            );
            this.nutriChangeInfo.carbohydratesAmount = Number.parseInt(
                nutrients?.find((x) => x.name == "Carbohydrates")?.amount
            );
        },
        calculateRangeNutri(TDEE) {
            this.rangeValueNutrient.proteinAmount.min = Number.parseInt(
                (0.1 * TDEE) / 4
            );
            this.rangeValueNutrient.proteinAmount.max = Number.parseInt(
                (0.3 * TDEE) / 4
            );
            this.rangeValueNutrient.fatAmount.min = Number.parseInt(
                (0.2 * TDEE) / 9
            );
            this.rangeValueNutrient.fatAmount.max = Number.parseInt(
                (0.35 * TDEE) / 9
            );
            this.rangeValueNutrient.carbohydratesAmount.min = Number.parseInt(
                (0.45 * TDEE) / 4
            );
            this.rangeValueNutrient.carbohydratesAmount.max = Number.parseInt(
                (0.65 * TDEE) / 4
            );
        },
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
