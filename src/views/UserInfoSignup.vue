<template>
    <div class="info-form" style="width: 100%">
        <div class="title" style="text-align: center">
            <h1 style="font-size: 28px">Chào bạn</h1>
            <p style="font-size: 20px">Hãy điền một số thông tin nhé</p>
        </div>
        <el-form
            label-position="left"
            label-width="130px"
            style="
                display: flex;
                align-items: flex-start;
                column-gap: 24px;
                margin-top: 24px;
            "
        >
            <div style="width: 50%">
                <el-form-item label="Name">
                    <el-input v-model="userInfo.Name"></el-input>
                </el-form-item>
                <el-form-item label="Full Name">
                    <el-input v-model="userInfo.fullName"></el-input>
                </el-form-item>
                <el-form-item label="Gender">
                    <el-radio-group v-model="userInfo.gender">
                        <el-radio
                            label="Male"
                            value="1"
                            style="margin-right: 16px"
                        ></el-radio>
                        <el-radio
                            label="Female"
                            value="2"
                            style="margin-right: 16px"
                        ></el-radio>
                        <el-radio
                            label="Other"
                            value="3"
                            style="margin-right: 16px"
                        ></el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div style="width: 50%">
                <el-form-item label="Date of birth">
                    <el-date-picker
                        type="date"
                        placeholder="Pick a date"
                        v-model="userInfo.DateOfBirth"
                        style="width: 100%"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="Weight">
                    <el-input
                        v-model.number="userInfo.Weight"
                        placeholder="Kg"
                    ></el-input>
                </el-form-item>
                <el-form-item label="Height">
                    <el-input
                        v-model.number="userInfo.Height"
                        placeholder="Cm"
                    ></el-input>
                </el-form-item>
                <el-form-item style="float: right; margin-right: 12px">
                    <el-button type="primary" @click="submitForm"
                        >Create</el-button
                    >
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    methods: {
        submitForm() {
            console.log(this.userInfo);

            this.$notify({
                title: "Notice",
                message: "SignUp Successfully",
                duration: 3000,
            });
        },
    },
    props: {
        userInfo: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style scoped></style>
