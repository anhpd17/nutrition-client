<template>
    <MainLayout>
        <template #main-layout-content>
            <div>
                <div
                    class="title-page"
                    style="
                        margin-top: 86px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 24px 124px;
                    "
                >
                    <h1 style="text-transform: uppercase; font-size: 32px">
                        Meal
                    </h1>
                    <div>
                        <el-button
                            type="success"
                            style="padding: 24px"
                            @click="openOverview"
                            >Overview</el-button
                        >
                        <el-button
                            type="success"
                            style="padding: 24px"
                            @click="() => (addNewVisible = true)"
                            >Add New</el-button
                        >
                    </div>
                </div>
                <div class="content-page" style="padding: 24px 124px">
                    <div
                        class="lst-date"
                        style="
                            display: flex;
                            align-items: center;
                            flex-wrap: nowrap;
                            overflow-x: auto;
                        "
                    >
                        <el-button
                            size="small"
                            style="padding: 16px 12px; margin-left: 6px"
                            :class="[{ active: selectedDate == 0 }]"
                            @click="
                                () => {
                                    selectedDate = 0;
                                }
                            "
                        >
                            All Date
                        </el-button>
                        <el-button
                            size="small"
                            style="padding: 16px 12px; margin-left: 6px"
                            v-for="(item, index) in lstDateMeal"
                            :key="index"
                            :class="[{ active: item == selectedDate }]"
                            @click="
                                () => {
                                    selectedDate = item;
                                }
                            "
                        >
                            {{ formatDate(item) }}
                        </el-button>
                    </div>
                    <el-table
                        v-loading="isLoadingTable"
                        :data="filterTableData"
                        style="width: 100%"
                        height="660"
                    >
                        <el-table-column type="expand">
                            <template #default="props">
                                <el-table
                                    :data="props.row.mealRecipe"
                                    style="width: 100%"
                                    height="260"
                                    show-summary
                                >
                                    <el-table-column
                                        label="Name"
                                        prop="dish.name"
                                    />
                                    <el-table-column
                                        label="Quantity"
                                        prop="Quantity"
                                    />
                                    <el-table-column
                                        label="Description"
                                        prop="dish.Description"
                                    />
                                </el-table>
                                <el-button
                                    type="success"
                                    style="width: 100%; margin-top: 4px"
                                    @click="
                                        () => {
                                            addDishVisible = true;
                                            itemDetailID = props.row.id;
                                        }
                                    "
                                >
                                    Add Dish To Meal
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="Name" prop="name" />
                        <el-table-column
                            label="Description"
                            prop="Description"
                        />
                        <el-table-column label="Date" prop="dateMeal">
                            <template #default="scope">
                                {{ formatDate(scope.row.dateMeal) }}
                            </template>
                        </el-table-column>
                        <el-table-column align="right" width="350">
                            <template #header>
                                <el-input
                                    v-model="search"
                                    size="small"
                                    placeholder="Type to search"
                                    class="search-input"
                                />
                            </template>
                            <template #default="scope">
                                <el-button
                                    size="small"
                                    @click="
                                        handleNutrient(scope.$index, scope.row)
                                    "
                                    style="padding: 20px 24px"
                                    type="success"
                                >
                                    Nutrients
                                </el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="
                                        handleDelete(scope.$index, scope.row)
                                    "
                                    style="padding: 20px 24px"
                                >
                                    Delete
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </template>
    </MainLayout>
    <!-- ADD DISH -->
    <el-dialog v-model="addDishVisible" title="New Dish" width="600">
        <el-form :model="newDish" :label-width="150" label-position="left">
            <el-form-item label="Quantity">
                <el-input
                    v-model.number="newDish.quantity"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="Dish">
                <el-select
                    v-model="newDish.Id"
                    collapse-tags
                    placeholder="Select Dish"
                >
                    <el-option
                        v-for="item in lstDishes"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addDishVisible = false">Cancel</el-button>
                <el-button type="success" @click="addDishToMeal">Add</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- ADD MEAL -->
    <el-dialog v-model="addNewVisible" title="New Meal" width="600">
        <el-form :model="newMeal" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="newMeal.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="newMeal.Description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Dish recipe">
                <el-select
                    v-model="newMeal.dishesRecipe"
                    multiple
                    collapse-tags
                    placeholder="Select Dish"
                >
                    <el-option
                        v-for="item in lstDishes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Date meal">
                <el-date-picker
                    type="date"
                    placeholder="Pick a date"
                    v-model="newMeal.dateMeal"
                    style="width: 100%"
                ></el-date-picker>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addNewVisible = false">Cancel</el-button>
                <el-button type="success" @click="addnewMeal">Save</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- FORM DETAIL NUTRIENT -->
    <el-dialog v-model="visibleNutrient" title="Nutrient" width="900">
        <el-table
            v-loading="isLoadingTable"
            :data="detailNutrient"
            style="width: 100%"
            height="460"
        >
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Amount" prop="amount" />
            <el-table-column label="Unit" prop="unit" />
            <el-table-column label="Daily Need" prop="percentOfDailyNeeds" />
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button
                    type="success"
                    @click="() => (visibleNutrient = false)"
                >
                    Okay
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- FORM OVERVIEW -->
    <el-dialog v-model="visibleOverview" title="Overview" width="900">
        <div
            class="lst-date"
            style="
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                overflow-x: auto;
                margin-bottom: 24px;
            "
        >
            <el-button
                size="small"
                style="padding: 16px 12px; margin-left: 6px"
                v-for="(item, index) in lstDateMeal"
                :key="index"
                :class="[{ active: item == selectedDate }]"
                @click="chooseOverview(item)"
            >
                {{ formatDate(item) }}
            </el-button>
        </div>
        <el-table
            v-loading="isLoadingTable"
            :data="overviewData"
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
                    <div v-if="scope.row.name == 'Calories'">
                        <span>{{ scope.row.amount }}</span
                        >/<b>{{ TDEE }}</b>
                    </div>
                    <div v-else>
                        <span>{{ scope.row.amount }}</span
                        >/<b>{{
                            userNeed.find((x) => x?.name == scope.row?.name)
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
                                    userNeed.find(
                                        (x) => x?.name == scope.row?.name
                                    )?.amount || 1;
                                let percent =
                                    (actual / expected) * 100 > 100
                                        ? 100
                                        : (actual / expected) * 100;
                                return percent || 0;
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
                <el-button
                    type="success"
                    @click="() => (visibleOverview = false)"
                >
                    Okay
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { apiGet, apiDeleteMany, apiPost } from "../api/api";
import { computed, ref, onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { ElNotification } from "element-plus";
import { formatDate } from "../utils/format";

const search = ref("");
const itemDetailID = ref(0);
const tableData = ref([]);
const isLoadingTable = ref(false);
const visibleNutrient = ref(false);
const addDishVisible = ref(false);
const addNewVisible = ref(false);
const detailNutrient = ref(null);
const visibleOverview = ref(false);
const overviewData = ref(null);
const lstDishes = ref([]);
const selectedDate = ref("");
const newDish = ref({
    Id: null,
    quantity: 1,
});
const TDEE = ref(0);
const userNeed = ref(null);
const newMeal = ref({
    name: "",
    Description: "",
    dishesRecipe: [],
    dateMeal: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0
    ),
});

const openOverview = async () => {
    visibleOverview.value = true;
    try {
        let res = await apiGet(
            `/userGoals/findOne/${
                JSON.parse(localStorage.getItem("userGoalId")) || 22
            }`
        );
        userNeed.value = res.nutrients;
    } catch (error) {
        console.log(error);
    }
};

const convertList = (obj) => {
    // Create an empty list to store the converted objects
    const convertedList = [];

    // Loop through each key-value pair in the original object
    for (const key in obj) {
        const nestedObj = obj[key];

        // Create a new object with "name" and spread properties
        const convertedObj = {
            name: key,
            ...nestedObj,
        };

        // Add the converted object to the list
        convertedList.push(convertedObj);
    }

    return convertedList;
};

const chooseOverview = async (item) => {
    selectedDate.value = item;
    try {
        let res = await apiPost(
            `/meals/get-nutrition-day/${
                JSON.parse(localStorage.getItem("userInfo")).id
            }`,
            {
                day: convertDate(selectedDate.value),
            }
        );
        overviewData.value = convertList(res?.nutritionalInfo);
        ElNotification({
            title: "Notice",
            message: "Get Data Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Get data Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
};
const convertDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        separator: "/",
    });

    return formattedDate;
};
const addnewMeal = async () => {
    isLoadingTable.value = true;
    try {
        await apiPost(`/meals/create`, {
            ...newMeal.value,
            dishesRecipe: newMeal.value.dishesRecipe.map((item) => {
                return {
                    Id: item,
                    quantity: 1,
                };
            }),
        });
        ElNotification({
            title: "Notice",
            message: "Add Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet(
            `/meals/findAll?userId=${
                JSON.parse(localStorage.getItem("userInfo")).id
            }`
        );
        addNewVisible.value = false;
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Add Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
    isLoadingTable.value = false;
};

const addDishToMeal = async () => {
    try {
        await apiPost(`/meals/add-dish/${itemDetailID.value}`, {
            dishesRecipe: [newDish.value],
        });
        ElNotification({
            title: "Notice",
            message: "Add Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet(
            `/meals/findAll?userId=${
                JSON.parse(localStorage.getItem("userInfo")).id
            }`
        );
        addDishVisible.value = false;
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Add Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
};
onMounted(async () => {
    isLoadingTable.value = true;
    tableData.value = await apiGet(
        `/meals/findAll?userId=${
            JSON.parse(localStorage.getItem("userInfo")).id
        }`
    );
    isLoadingTable.value = false;
    lstDishes.value = await apiGet("/dishes/findAll");
    let userGoal = await apiGet(
        `/userGoals/findOne/${
            JSON.parse(localStorage.getItem("userGoalId")) || 1
        }`
    );
    TDEE.value = userGoal?.TDEE;
});

const lstDateMeal = computed(() => {
    const lstDate = tableData.value
        .map((data) => data.dateMeal)
        .sort((a, b) => new Date(a) - new Date(b));
    return [...new Set(lstDate)];
});

const filterTableData = computed(() =>
    tableData.value.filter((data) => {
        if (selectedDate.value != 0 && search.value) {
            return (
                isSameDate(data.dateMeal, selectedDate.value) &&
                data.name?.toLowerCase().includes(search.value.toLowerCase())
            );
        } else if (selectedDate.value) {
            return isSameDate(data.dateMeal, selectedDate.value);
        } else if (selectedDate.value == null) {
            return data.dateMeal === null;
        } else {
            return data.name
                ?.toLowerCase()
                .includes(search.value.toLowerCase());
        }
    })
);

const isSameDate = (date1, date2) => {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};

const handleNutrient = (index, row) => {
    detailNutrient.value = row.nutrients;
    visibleNutrient.value = true;
};
const handleDelete = async (index, row) => {
    isLoadingTable.value = true;
    try {
        await apiDeleteMany("/meals/delete", {
            id: [row.id.toString()],
        });
        ElNotification({
            title: "Notice",
            message: "Remove Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet(
            `/meals/findAll?userId=${
                JSON.parse(localStorage.getItem("userInfo")).id
            }`
        );
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Remove Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
    isLoadingTable.value = false;
};
</script>
<style>
.search-input input {
    padding: 20px 6px;
}
.active {
    border: 1px solid green;
}
</style>
