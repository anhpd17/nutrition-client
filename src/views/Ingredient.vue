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
                        <el-table-column label="Calories" prop="calorie" />
                        <el-table-column label="Carbs" prop="carbs" />
                        <el-table-column label="Fat" prop="fat" />
                        <el-table-column label="Protein" prop="protein" />
                        <el-table-column align="right">
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
</template>
<script setup>
import { apiGet } from "../api/api";
import { computed, ref, onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";

const search = ref("");
const tableData = ref([]);
const isLoadingTable = ref(false);

onMounted(async () => {
    isLoadingTable.value = true;
    let res = await apiGet("/ingredient/findAll?take=10&page=1");
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
const handleEdit = (index, row) => {
    console.log(index, row);
};
const handleDelete = (index, row) => {
    console.log(index, row);
};
</script>
<style>
.search-input input {
    padding: 20px 6px;
}
</style>
