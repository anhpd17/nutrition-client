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
                        :disabled="!isAdmin"
                        >Add New</el-button
                    >
                </div>
                <div class="content-page" style="padding: 24px 124px">
                    <el-table
                        v-loading="isLoadingTable"
                        :data="tableData"
                        style="width: 100%"
                        height="460"
                    >
                        <el-table-column label="Name" prop="name" />
                        <el-table-column label="Image" #default="scope">
                            <img
                                :src="`https://img.spoonacular.com/ingredients_100x100/${scope.row.image}`"
                            />
                        </el-table-column>
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
                                    :disabled="!isAdmin"
                                >
                                    Delete
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-button
                    type="success"
                    @click="getNextPage"
                    style="width: 100%; margin: 21px 0"
                    >Next page</el-button
                >
            </div>
        </template>
    </MainLayout>
    <el-dialog v-model="addNewVisible" title="New Ingredient" width="600">
        <el-form :model="newIngre" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="newIngre.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Code">
                <el-input v-model="newIngre.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Original">
                <el-input v-model="newIngre.original" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Original name">
                <el-input v-model="newIngre.originalName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Nutritions">
                <div
                    style="
                        display: flex;
                        align-items: center;
                        width: 100%;
                        column-gap: 12px;
                        margin-bottom: 12px;
                    "
                    v-for="(item1, index1) in newIngre.nutrition"
                    :key="index1"
                >
                    <el-select
                        v-model="item1.name"
                        collapse-tags
                        placeholder="Select nutrition"
                        filterable
                    >
                        <el-option
                            v-for="(item, index) in lstNutritions"
                            :key="index"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        v-model.number="item1.amount"
                        autocomplete="off"
                    />
                    <el-input
                        v-model.number="item1.unit"
                        autocomplete="off"
                        placeholder="Mg"
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
            <el-form-item
                label="Weight Per Serving"
                style="display: flex; align-items: center; column-gap: 12px"
            >
                <div
                    style="display: flex; align-items: center; column-gap: 12px"
                >
                    <el-input
                        v-model.number="newIngre.weightPerServing.amount"
                        autocomplete="off"
                        placeholder="100"
                    />
                    <el-input
                        v-model="newIngre.weightPerServing.unit"
                        autocomplete="off"
                        placeholder="mg"
                    />
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addNewVisible = false">Cancel</el-button>
                <el-button type="success" @click="addnewIngre">Save</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="detailVisible" title="Edit Ingredient" width="600">
        <el-form :model="detailIngre" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="detailIngre.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Code">
                <el-input v-model="detailIngre.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Original">
                <el-input v-model="detailIngre.original" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Original name">
                <el-input
                    v-model="detailIngre.originalName"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="Nutritions">
                <div
                    style="
                        display: flex;
                        align-items: center;
                        width: 100%;
                        column-gap: 12px;
                        margin-bottom: 12px;
                    "
                    v-for="(item1, index1) in detailIngre.nutrients"
                    :key="index1"
                >
                    <el-select
                        v-model="item1.name"
                        collapse-tags
                        placeholder="Select nutrition"
                        filterable
                    >
                        <el-option
                            v-for="(item, index) in lstNutritions"
                            :key="index"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        v-model.number="item1.amount"
                        autocomplete="off"
                    />
                    <el-input
                        v-model.number="item1.unit"
                        autocomplete="off"
                        placeholder="Mg"
                    />
                </div>
                <el-button
                    size="small"
                    style="padding: 20px 24px; margin-top: 12px"
                    @click="addMoreSaveIngreDetail"
                >
                    Add more
                </el-button>
            </el-form-item>
            <el-form-item
                label="Weight Per Serving"
                style="display: flex; align-items: center; column-gap: 12px"
            >
                <div
                    style="display: flex; align-items: center; column-gap: 12px"
                >
                    <el-input
                        v-model.number="detailIngre.weightPerServing.amount"
                        autocomplete="off"
                        placeholder="100"
                    />
                    <el-input
                        v-model="detailIngre.weightPerServing.unit"
                        autocomplete="off"
                        placeholder="mg"
                    />
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="detailVisible = false">Cancel</el-button>
                <el-button
                    type="success"
                    @click="saveIngre"
                    :disabled="!isAdmin"
                    >Save</el-button
                >
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { apiGet, apiDeleteMany, apiPost, apiPatch } from "../api/api";
import { computed, ref, onMounted, watch } from "vue";
import { isAdminRole } from "../utils/permission";
import MainLayout from "../layouts/MainLayout.vue";

const isAdmin = isAdminRole();
const addNewVisible = ref(false);
const search = ref("");
const tableData = ref([]);
const currentPage = ref(1);
const isLoadingTable = ref(false);
const lstNutritions = ref([]);
const newIngre = ref({
    name: "",
    code: "",
    image: "",
    original: "",
    originalName: "",
    nutrition: [],
    weightPerServing: {
        amount: 0,
        unit: "",
    },
});
const detailIngre = ref(null);
const detailVisible = ref(false);

watch(search, async (newQuestion, oldQuestion) => {
    isLoadingTable.value = true;
    tableData.value = await apiGet(
        `/ingredient/findAll?name=${newQuestion}&take=10&page=1`
    );
    isLoadingTable.value = false;
});
const addMoreIngreDetail = () => {
    newIngre.value.nutrition.push({
        name: "",
        amount: 0,
        unit: "",
    });
};
const addMoreSaveIngreDetail = () => {
    detailIngre.value.nutrition.push({
        name: "",
        amount: 0,
        unit: "",
    });
};
const getNextPage = async () => {
    isLoadingTable.value = true;
    let res = await apiGet(
        `/ingredient/findAll?take=10&page=${currentPage.value + 1}`
    );
    currentPage.value = currentPage.value + 1;
    tableData.value = res;
    isLoadingTable.value = false;
};

onMounted(async () => {
    isLoadingTable.value = true;
    let res = await apiGet("/ingredient/findAll?take=10&page=1");
    lstNutritions.value = await apiGet("/ingredient/getName");
    tableData.value = res;
    isLoadingTable.value = false;
});

const addnewIngre = async () => {
    isLoadingTable.value = true;
    try {
        await apiPost("/ingredient/create", newIngre.value);
        ElNotification({
            title: "Notice",
            message: "Create Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet("/ingredient/findAll?take=10&page=1");
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

const saveIngre = async () => {
    isLoadingTable.value = true;
    try {
        await apiPatch(`/ingredient/update/${detailIngre.value.id}`, {
            name: detailIngre.value.name,
            code: detailIngre.value.code,
            image: detailIngre.value.image,
            original: detailIngre.value.original,
            originalName: detailIngre.value.originalName,
            nutrition: detailIngre.value.nutrients,
            weightPerServing: detailIngre.value.weightPerServing,
        });
        ElNotification({
            title: "Notice",
            message: "update Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
        tableData.value = await apiGet("/ingredient/findAll?take=10&page=1");
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "update Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
    detailVisible.value = false;
    isLoadingTable.value = false;
};

const handleEdit = (index, row) => {
    detailIngre.value = row;
    detailVisible.value = true;
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
        tableData.value = await apiGet("/ingredient/findAll?take=10&page=1");
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
