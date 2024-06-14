<template>
    <div class="assessment">
        <Header />

        <div class="all-calories">
            <div class="loaded">
                <div class="calories-info">
                    <h1>Lượng dinh dưỡng</h1>
                    <h2>Đã nạp 123/456</h2>
                </div>
                <div class="chart">
                    <circle-progress :percent="40" :show-percent="true" />
                </div>
            </div>

            <div class="consumption">
                <div class="calories-info">
                    <h1>Lượng dinh dưỡng</h1>
                    <h2>Đã tiêu hao 123/456</h2>
                </div>
                <div class="chart">
                    <circle-progress :percent="40" :show-percent="true" />
                </div>
            </div>
        </div>

        <!-- WATER -->
        <div class="water">
            <div
                class="info"
                style="display: flex; align-items: center; column-gap: 60px"
            >
                <h1>Lượng nước đã nạp hôm nay</h1>
                <h2>123/125ml</h2>
            </div>
            <div class="percent">
                <h2>70%</h2>
            </div>
            <el-button type="success" style="padding: 24px"
                >Drink More</el-button
            >
        </div>

        <!-- DETAIL -->
        <div class="detail">
            <AssessmentCard />
            <AssessmentCard />
            <AssessmentCard />
        </div>
    </div>
</template>
<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import Header from "../components/Header.vue";
import AssessmentCard from "../components/AssessmentCard.vue";
</script>
<style scoped>
.loaded,
.consumption {
    display: flex;
    align-items: center;
    column-gap: 42px;
    color: white;
}
.assessment {
    margin-top: 74px;
    padding: 24px 120px;
}
.all-calories {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 120px;
    background-color: var(--main-color);
    border-radius: 12px;
}
.water {
    border-radius: 12px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--main-color);
    margin: 24px 0;
    box-shadow: 0 0 5px #eee;
}
</style>
