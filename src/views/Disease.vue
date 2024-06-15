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
                        Disease
                    </h1>
                    <el-button
                        type="success"
                        style="padding: 24px"
                        :disabled="true"
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
                        <el-table-column label="VN Name" prop="name_vn" />
                        <el-table-column label="Active" prop="isActive" />
                        <el-table-column
                            label="Description"
                            prop="Description"
                        />
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
                                    :disabled="true"
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
    <el-dialog v-model="visibleDetail" title="Edit Disease" width="600">
        <el-form
            :model="detailDisease"
            :label-width="150"
            label-position="left"
        >
            <el-form-item label="Name">
                <el-input v-model="detailDisease.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Name VI">
                <el-input v-model="detailDisease.name_vn" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description">
                <el-input
                    v-model="detailDisease.Description"
                    autocomplete="off"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="visibleDetail = false">Cancel</el-button>
                <el-button type="primary" @click="saveDisease">
                    Save
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import MainLayout from "../layouts/MainLayout.vue";
import { computed, ref, onMounted } from "vue";
import { apiGet, apiPatch } from "../api/api";
import { ElNotification } from "element-plus";

const isLoadingTable = ref(false);
const tableData = ref([]);
const search = ref("");
const detailDisease = ref(null);
const visibleDetail = ref(false);

onMounted(async () => {
    isLoadingTable.value = true;
    let res = await apiGet("/conditions/findAll");
    tableData.value = res;
    isLoadingTable.value = false;
});
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.name?.toLowerCase().includes(search.value.toLowerCase())
    )
);
const handleEdit = (index, row) => {
    detailDisease.value = row;
    visibleDetail.value = true;
};
const handleDelete = (index, row) => {
    console.log(index, row);
};

const saveDisease = async () => {
    try {
        await apiPatch(
            `/conditions/update/${detailDisease.value.id}`,
            detailDisease.value
        );
        ElNotification({
            title: "Notice",
            message: "Update Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
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
    visibleDetail.value = false;
};
</script>
<style>
.search-input input {
    padding: 20px 6px;
}
</style>
