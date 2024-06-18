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
                        Dish
                    </h1>
                    <el-button
                        type="success"
                        style="padding: 24px"
                        @click="() => (addNewVisible = true)"
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
                        <el-table-column align="right" width="360">
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
                                        handleNutritions(
                                            scope.$index,
                                            scope.row
                                        )
                                    "
                                    style="padding: 20px 24px"
                                >
                                    Nutritions
                                </el-button>
                                <el-button
                                    size="small"
                                    @click="handleEdit(scope.$index, scope.row)"
                                    style="padding: 20px 24px"
                                >
                                    Edit
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
    <el-dialog v-model="addNewVisible" title="New Dish" width="600">
        <el-form :model="newDish" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="newDish.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="newDish.Description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Ingredients">
                <div
                    style="
                        display: flex;
                        align-items: center;
                        width: 100%;
                        column-gap: 12px;
                        margin-bottom: 12px;
                    "
                    v-for="(item1, index1) in newDish.ingredients"
                    :key="index1"
                >
                    <el-select
                        v-model="item1.ingredientId"
                        collapse-tags
                        filterable
                        remote
                        reserve-keyword
                        remote-show-suffix
                        placeholder="Select ingredients"
                        :remote-method="remoteMethod"
                    >
                        <el-option
                            v-for="item in lstIngredients"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        v-model.number="item1.quantity"
                        autocomplete="off"
                        placeholder="Mg"
                    />
                </div>
                <el-button
                    size="small"
                    style="padding: 20px 24px; margin-top: 12px"
                    @click="addMoreIngre"
                >
                    Add more
                </el-button>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addNewVisible = false">Cancel</el-button>
                <el-button type="success" @click="addnewDish">Save</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="detailVisible" title="Edit Dish" width="600">
        <el-form :model="detailDish" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="detailDish.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="detailDish.Description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Ingredients">
                <div
                    style="
                        display: flex;
                        align-items: center;
                        width: 100%;
                        column-gap: 12px;
                        margin-bottom: 12px;
                    "
                    v-for="(item1, index1) in detailDish.dishIngredients"
                    :key="index1"
                >
                    <el-select
                        v-model="item1.IngredientID"
                        collapse-tags
                        placeholder="Select ingredients"
                        filterable
                        remote
                        reserve-keyword
                        remote-show-suffix
                        :remote-method="remoteMethod"
                    >
                        <el-option
                            v-for="item in lstIngredients"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        v-model.number="item1.Quantity"
                        autocomplete="off"
                    />
                </div>
                <el-button
                    size="small"
                    style="padding: 20px 24px; margin-top: 12px"
                    @click="addMoreIngreDetail"
                >
                    Add more
                </el-button>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="detailVisible = false">Cancel</el-button>
                <el-button type="success" @click="updateDish">Save</el-button>
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
import MainLayout from "../layouts/MainLayout.vue";
import { computed, ref, onMounted } from "vue";
import { apiGet, apiPost, apiPatch, apiDeleteMany } from "../api/api";

const search = ref("");
const tableData = ref([]);
const addNewVisible = ref(false);
const detailVisible = ref(false);
const lstIngredients = ref([]);
const isLoadingTable = ref(false);
const detailNutrient = ref(null);
const detailDish = ref(null);
const visibleNutrient = ref(false);
const newDish = ref({
    name: "",
    isAll: false,
    Description: "",
    userId: JSON.parse(localStorage.getItem("userInfo")).id,
    ingredients: [
        {
            ingredientId: null,
            quantity: null,
        },
    ],
});

const handleNutritions = (index, row) => {
    detailNutrient.value = row.nutrients;
    visibleNutrient.value = true;
};

const remoteMethod = async (query) => {
    if (query) {
        lstIngredients.value = await apiGet(
            `/ingredient/findAll?name=${query}&take=10&page=1`
        );
    }
};
const addMoreIngreDetail = () => {
    detailDish.value.dishIngredients.push({
        IngredientID: null,
        Quantity: null,
    });
};

const addMoreIngre = () => {
    newDish.value.ingredients.push({
        ingredientId: null,
        quantity: null,
    });
};

const resetFormNew = () => {
    newDish.value = {
        name: "",
        isAll: false,
        Description: "",
        userId: JSON.parse(localStorage.getItem("userInfo")).id,
        ingredients: [],
    };
};

const addnewDish = async () => {
    isLoadingTable.value = true;
    try {
        await apiPost("/dishes/create", newDish.value);
        ElNotification({
            title: "Notice",
            message: "Create Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet("/dishes/findAll");
        resetFormNew();
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Create Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
    addNewVisible.value = false;
    isLoadingTable.value = false;
};
const updateDish = async () => {
    isLoadingTable.value = true;
    const objectCopy2 = {
        name: detailDish.value.name,
        isAll: detailDish.value.isAll,
        Description: detailDish.value.Description,
        userId: detailDish.value.userID,
        ingredients: detailDish.value.dishIngredients.map((item) => {
            return {
                ingredientId: item.IngredientID,
                quantity: Number.parseInt(item.Quantity),
            };
        }),
    };
    try {
        await apiPatch(`/dishes/update/${detailDish.value.id}`, objectCopy2);
        ElNotification({
            title: "Notice",
            message: "Update Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet("/dishes/findAll");
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Update Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
    detailVisible.value = false;
    isLoadingTable.value = false;
};
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
);
const handleEdit = (index, row) => {
    detailDish.value = row;
    detailVisible.value = true;
};
const handleDelete = async (index, row) => {
    isLoadingTable.value = true;
    try {
        await apiDeleteMany("/dishes/delete", {
            id: [row.id.toString()],
        });
        ElNotification({
            title: "Notice",
            message: "Remove Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet("/dishes/findAll");
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

onMounted(async () => {
    isLoadingTable.value = true;
    try {
        tableData.value = await apiGet("/dishes/findAll");
    } catch (error) {
        console.log(error);
    }
    isLoadingTable.value = false;
    lstIngredients.value = await apiGet("/ingredient/findAll?take=10&page=1");
});
</script>
<style>
.search-input input {
    padding: 20px 6px;
}
</style>
