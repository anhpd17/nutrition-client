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
                        Ingredient
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
                        <el-table-column align="right" width="200">
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
    <el-dialog v-model="addNewVisible" title="New Ingredient" width="600">
        <el-form :model="newIngre" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="newIngre.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="calorie">
                <el-input
                    v-model.number="newIngre.calorie"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="protein">
                <el-input
                    v-model.number="newIngre.protein"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="carbs">
                <el-input v-model.number="newIngre.carbs" autocomplete="off" />
            </el-form-item>
            <el-form-item label="fat">
                <el-input v-model.number="newIngre.fat" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addNewVisible = false">Cancel</el-button>
                <el-button type="success" @click="addnewIngre">Save</el-button>
            </div>
        </template>
    </el-dialog>
    <!-- <el-dialog v-model="detailVisible" title="Edit Ingredient" width="600">
        <el-form :model="detailIngre" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="detailIngre.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="calorie">
                <el-input
                    v-model.number="detailIngre.calorie"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="protein">
                <el-input
                    v-model.number="detailIngre.protein"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="carbs">
                <el-input
                    v-model.number="detailIngre.carbs"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="fat">
                <el-input v-model.number="detailIngre.fat" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="detailVisible = false">Cancel</el-button>
                <el-button type="success" @click="updateDish">Save</el-button>
            </div>
        </template>
    </el-dialog> -->
</template>
<script setup>
import { apiGet, apiDeleteMany } from "../api/api";
import { computed, ref, onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";

const addNewVisible = ref(false);
const detailVisible = ref(false);
const search = ref("");
const tableData = ref([]);
const isLoadingTable = ref(false);
const detailIngre = ref(null);
const newIngre = ref({
    name: "",
    calorie: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
});

const resetFormNew = () => {
    newDish.value = {
        name: "",
        calorie: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    };
};

onMounted(async () => {
    isLoadingTable.value = true;
    let res = await apiGet("/ingredient/findAll?take=10&page=1");
    tableData.value = res;
    isLoadingTable.value = false;
});

const addnewIngre = async () => {
    isLoadingTable.value = true;
    let newIgreObj = {
        name: newIngre.value.name,
        calorie: newIngre.value.calorie,
        protein: newIngre.value.protein,
        carbs: newIngre.value.carbs,
        fat: newIngre.value.fat,
    };
    try {
        await apiPost("/dishes/create", newIgreObj);
        ElNotification({
            title: "Notice",
            message: "Create Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet("/ingredient/findAll");
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

const filterTableData = computed(() =>
    tableData.value.filter((data) => {
        return (
            !search.value ||
            data.name?.toLowerCase().includes(search.value.toLowerCase())
        );
    })
);
const handleEdit = (index, row) => {
    // detailIngre.value = row;
    // detailVisible.value = true;
};
const handleDelete = async (index, row) => {
    isLoadingTable.value = true;
    try {
        await apiDeleteMany("/ingredient/delete", {
            id: [row.id.toString()],
        });
        ElNotification({
            title: "Notice",
            message: "Remove Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet("/ingredient/findAll");
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
</style>
