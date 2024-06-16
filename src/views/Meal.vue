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
                    <el-button type="success" style="padding: 24px"
                        >Add New</el-button
                    >
                </div>
                <div class="content-page" style="padding: 24px 124px">
                    <el-table
                        v-loading="isLoadingTable"
                        :data="filterTableData"
                        style="width: 100%"
                        height="460"
                    >
                        <el-table-column label="Name" prop="name" />
                        <el-table-column
                            label="Description"
                            prop="Description"
                        />
                        <el-table-column label="Date" prop="dateMeal" />
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
                                        handleRecipe(scope.$index, scope.row)
                                    "
                                    style="padding: 20px 24px"
                                >
                                    Recipe
                                </el-button>
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
    <!-- FORM DETAIL RECIPE -->
    <el-dialog v-model="visibleRecipe" title="Recipe" width="900">
        <el-table
            v-loading="isLoadingTable"
            :data="detailRecipe"
            style="width: 100%"
            height="460"
        >
            <el-table-column label="Name" prop="dish.name" />
            <el-table-column label="Quantity" prop="Quantity" />
            <el-table-column label="Description" prop="dish.Description" />
            <el-table-column label="Calorie" prop="dish.calorie" />
            <el-table-column label="Carbs" prop="dish.carbs" />
            <el-table-column label="Fat" prop="dish.fat" />
            <el-table-column label="Protein" prop="dish.protein" />
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button
                    type="success"
                    @click="() => (visibleRecipe = false)"
                >
                    Okay
                </el-button>
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
</template>
<script setup>
import { apiGet, apiDeleteMany } from "../api/api";
import { computed, ref, onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { ElNotification } from "element-plus";

const search = ref("");
const tableData = ref([]);
const isLoadingTable = ref(false);
const visibleRecipe = ref(false);
const detailRecipe = ref(null);
const visibleNutrient = ref(false);
const detailNutrient = ref(null);

onMounted(async () => {
    isLoadingTable.value = true;
    let res = await apiGet("/meals/findAll");
    tableData.value = res;
    isLoadingTable.value = false;
});

const filterTableData = computed(() =>
    tableData.value.filter((data) => {
        return (
            !search.value ||
            data.name?.toLowerCase().includes(search.value.toLowerCase())
        );
    })
);
const handleRecipe = (index, row) => {
    detailRecipe.value = row.mealRecipe;
    visibleRecipe.value = true;
};
const handleNutrient = (index, row) => {
    console.log(index, row);
    detailNutrient.value = row.nutrients;
    visibleNutrient.value = true;
};
const handleDelete = async (index, row) => {
    console.log(index, row);
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
};
</script>
<style>
.search-input input {
    padding: 20px 6px;
}
</style>
