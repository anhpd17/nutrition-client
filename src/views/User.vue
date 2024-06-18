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
                        Users
                    </h1>
                </div>
                <div class="content-page" style="padding: 24px 124px">
                    <el-table
                        v-loading="isLoadingTable"
                        :data="filterTableData"
                        style="width: 100%"
                        height="460"
                    >
                        <el-table-column label="Name" prop="name" />
                        <el-table-column label="Username" prop="userName" />
                        <el-table-column label="Role" prop="roleId" />
                        <el-table-column label="Email" prop="email" />
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

    <!-- EDIT -->
    <el-dialog v-model="detailVisible" title="Edit User" width="600">
        <el-form :model="detailUser" :label-width="150" label-position="left">
            <el-form-item label="Name">
                <el-input v-model="detailUser.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Username">
                <el-input v-model="detailUser.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="detailUser.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Role">
                <el-select
                    v-model="detailUser.roleId"
                    placeholder="Select role"
                >
                    <el-option label="Admin" :value="1"> </el-option>
                    <el-option label="User" :value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="detailVisible = false">Cancel</el-button>
                <el-button type="success" @click="updateUser">Save</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { apiGet, apiDeleteMany, apiPatch } from "../api/api";
import { computed, ref, onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";

const search = ref("");
const tableData = ref([]);
const isLoadingTable = ref(false);
const detailVisible = ref(false);
const detailUser = ref(null);

onMounted(async () => {
    isLoadingTable.value = true;
    let res = await apiGet("/auth/getAll?take=10&page=1");
    tableData.value = res;
    isLoadingTable.value = false;
});
const handleDelete = async (index, row) => {
    try {
        await apiDeleteMany(`/auth/delete`, {
            id: [row.id.toString()],
        });
        ElNotification({
            title: "Notice",
            message: "Delete Successfully",
            duration: 3000,
            type: "success",
            position: "bottom-right",
        });
    } catch (error) {
        console.log(error);
        ElNotification({
            title: "Notice",
            message: "Delete Failed",
            duration: 3000,
            type: "error",
            position: "bottom-right",
        });
    }
    tableData.value = tableData.value.filter((data) => data.id !== row.id);
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
    detailUser.value = row;
    detailVisible.value = true;
};
const updateUser = async () => {
    try {
        await apiPatch(`/auth/update/${detailUser.value.id}`, {
            email: detailUser.value.email,
            userName: detailUser.value.userName,
            name: detailUser.value.name,
            roleId: detailUser.value.roleId,
        });
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
    detailVisible.value = false;
};
</script>
<style>
.search-input input {
    padding: 20px 6px;
}
</style>
