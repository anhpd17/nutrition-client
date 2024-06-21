<template>
    <MainLayout>
        <template #main-layout-content>
            <!-- home section starts -->
            <section class="home" id="home">
                <div class="content">
                    <h3 style="color: black; text-align: left">
                        WELCOME TO THE HEALTH CARE WEBSITE AND DIET MANAGEMENT
                    </h3>
                    <a
                        href="https://www.niehs.nih.gov/health/topics/nutrition"
                        class="btn"
                        style="float: left"
                    >
                        read more</a
                    >
                </div>
            </section>

            <!-- home section ends -->

            <!-- about section starts -->

            <section class="about" id="about">
                <h1 class="heading">about us</h1>

                <div class="row">
                    <div class="content">
                        <h3>
                            my mission is to give you a guideline for your
                            health.
                        </h3>
                        <p>
                            What we eat is considered an environmental factor
                            that influences health, in positive and negative
                            ways. Healthy diets with an optimal balance of
                            nutrients help people accomplish daily physical
                            activities and mental processes. Within your diet, a
                            deficiency or excess of certain nutrients can affect
                            health. The term diet refers to foods and beverages
                            consumed over time in all settings, such as
                            worksites, schools, restaurants, and the home. Diet
                            also often means a specific nutritional plan or
                            eating pattern. Nutrition is the process of
                            consuming, absorbing, and using nutrients from food
                            that are necessary for growth, development, and
                            maintenance of life.
                        </p>
                        <p>
                            What Are Nutrients? Nutrients give your body energy
                            and enable bodily functions. They are usually
                            classified in two major groups: Macronutrients, in
                            the form of protein, carbohydrate, or fat, primarily
                            provide energy to your body. The different
                            macronutrients serve different energy pathways and
                            functions in the body. Energy from macronutrients in
                            food is measured in units called calories.
                            Micronutrients, known as vitamins and minerals, are
                            required by the body in minute amounts. They protect
                            and promote various bodily functions, including
                            processing energy from macronutrients. Although
                            critical to health, micronutrients do not supply
                            energy.
                        </p>
                        <p>
                            More than half of U.S. adults – 129 million people –
                            have one or more preventable chronic diseases, such
                            as cardiovascular disease, high blood pressure, type
                            2 diabetes, and some cancers, which are often
                            related to diet and physical inactivity. Beyond
                            health effects, nutrition-related diseases create
                            strains on productivity, health care spending,
                            health disparities, and military readiness.
                            Addressing such issues requires understanding
                            interrelated biological and social environmental
                            determinants, and corresponding solutions. As a
                            scientific field, nutrition is integral to health
                            promotion and disease prevention. Information from
                            many disciplines, including anthropology, biology,
                            biochemistry, economics, epidemiology, food science
                            and technology, genetics, physiology, psychology,
                            and sociology, are applied in nutritional studies.
                            Scientists consider what people eat and drink, and
                            take as dietary supplements, during different life
                            stages and over time. They focus on interconnections
                            to build evidence for public policy, health system,
                            and environmental improvement strategies.
                        </p>
                        <a
                            href="https://www.niehs.nih.gov/health/topics/nutrition"
                            class="btn"
                        >
                            read more</a
                        >
                    </div>

                    <div class="image">
                        <img src="../assets/images/about.png" alt="" />
                    </div>
                </div>
            </section>

            <!-- about section ends -->

            <!-- services section starts -->

            <section class="services" id="services">
                <h1 class="heading">our services</h1>

                <div class="box-container">
                    <div class="box">
                        <div class="icon">
                            <img src="../assets/images/service-1.png" alt="" />
                        </div>
                        <div class="content">
                            <h3>Plan your meals</h3>
                            <div class="line"></div>
                            <p>
                                Plan your meals for the week using recipes or
                                even your own created dishes. Nutritional
                                information for meals is automatically
                                calculated and saved in history so you can
                                easily manage automatic calculations.
                            </p>
                        </div>
                    </div>

                    <div class="box">
                        <div class="icon">
                            <img src="../assets/images/service-2.png" alt="" />
                        </div>
                        <div class="content">
                            <h3>
                                dietary reference intake nutritional for you
                            </h3>
                            <div class="line"></div>
                            <p>
                                We tell you how much water, calories,
                                macronutrients and vitamins you should consume
                                daily - all estimates are based on your gender,
                                age, activity level, weight, and special
                                conditions your body.
                            </p>
                        </div>
                    </div>

                    <div class="box">
                        <div class="icon">
                            <img src="../assets/images/service-3.png" alt="" />
                        </div>
                        <div class="content">
                            <h3>statistics and comparison</h3>
                            <div class="line"></div>
                            <p>
                                We rely on information about the meals you have
                                eaten during the day, then synthesize and
                                analyze nutritional information to compare with
                                your recommended nutritional intake. Helps you
                                have the most overview of your diet
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- services section ends -->
        </template>
    </MainLayout>
</template>
<style scoped>
section {
    padding: 3rem 9%;
}

/* home */

.home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: url(../assets/images/slider1.jpg) no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: left;
    filter: brightness(0.8);
}

.home .content {
    max-width: 60rem;
    text-align: center;
}

.home .content h3 {
    font-size: 5rem;
    text-transform: uppercase;
    color: var(--white);
    padding-bottom: 3.5rem;
}

/* end */

/* about */

.about .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
}

.about .row .content {
    flex: 1 1 40rem;
}

.about .row .content h3 {
    font-size: 3.5rem;
    color: var(--black);
    text-transform: uppercase;
}

.about .row .content p {
    font-size: 1.6rem;
    color: var(--light-black);
    padding: 2rem 0;
    line-height: 2;
}

.about .row .image {
    flex: 1 1 40rem;
}

.about .row .image img {
    width: 100%;
}

/* end */

/* services */

.services {
    background: var(--bg);
}

.services .box-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    gap: 2rem;
    margin-top: 8rem;
}

.services .box-container .box {
    text-align: center;
    padding: 3rem;
    background: var(--white);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    margin-bottom: 8rem;
}

.services .box-container .box:hover,
.services .box-container .box:hover .icon {
    background: var(--primary);
}

.services .box-container .box .icon {
    width: 13rem;
    height: 13rem;
    line-height: 13rem;
    background: var(--white);
    border-radius: 50%;
    margin: -11rem auto 2rem;
    border: 1.8rem solid var(--bg);
}

.services .box-container .box .icon img {
    width: 5rem;
    margin-top: 2rem;
}

.services .box-container .box .content h3 {
    font-size: 2rem;
    padding: 1rem 0;
    color: var(--main-color);
}

.services .box-container .box .content .line {
    background: var(--main-color);
    width: 30%;
    height: 0.4rem;
    margin: 2rem auto;
    border-radius: 5rem;
}

.services .box-container .box .content p {
    font-size: 1.4rem;
    color: var(--black);
    line-height: 2;
}

.services .box-container .box .content ul {
    margin: 2rem 0;
    list-style: none;
}

.services .box-container .box .content ul li {
    padding: 0.5rem;
    font-size: 1.4rem;
    color: var(--black);
}

.services .box-container .box .content ul li i {
    font-size: 1.4rem;
    columns: var(--white);
    padding: 0.5rem;
    margin-right: 1rem;
    background: var(--main-color);
    border-radius: 50%;
}

/* end */

/* diet */

.diet .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
    list-style: none;
}

.diet .controls .buttons {
    padding: 3rem 2rem;
    background: var(--white);
    cursor: pointer;
    margin-bottom: 3rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    text-align: center;
    border-radius: 1rem;
}

.diet .controls .buttons img {
    height: 6rem;
}

.diet .controls .buttons h3 {
    font-size: 1.7rem;
    padding-top: 1rem;
    color: var(--light-black);
}

.diet .controls .buttons.active {
    background: var(--primary);
}

.diet .image-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    gap: 1.5rem;
}

.diet .image-container .box {
    background: var(--white);
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.diet .image-container .box:hover .image img {
    transform: scale(1.1);
}

.diet .image-container .box .image {
    height: 25rem;
    overflow: hidden;
    width: 100%;
}

.diet .image-container .box .image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.diet .image-container .box .content {
    padding: 2rem;
}

.diet .image-container .box .content .link {
    font-size: 2rem;
    color: var(--main-color);
}

.diet .image-container .box .content p {
    padding: 1rem 0;
    font-size: 1.4rem;
    color: var(--light-black);
    line-height: 2;
}

.diet .image-container .box .content .icon {
    padding-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.diet .image-container .box .content .icon a {
    font-size: 1.4rem;
    color: var(--light-black);
}

.diet .image-container .box .content .icon a:hover {
    color: var(--main-color);
}

.diet .image-container .box .content .icon a i {
    padding-right: 0.5rem;
    color: var(--main-color);
}

/* end */

/* pricing */

.pricing {
    background: var(--bg);
    padding-bottom: 8rem;
}

.pricing .box-container {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6rem;
}

.pricing .box-container .box {
    height: 52rem;
    width: 30rem;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: var(--white);
}

.pricing .box-container .active {
    background: var(--primary);
    transform: scale(1.1);
}

.pricing .box-container .title {
    margin: 3rem 0;
    font-size: 2.2rem;
    color: var(--black);
    text-transform: uppercase;
}

.pricing .box-container .box .price {
    color: var(--main-color);
    margin-bottom: 5rem;
}

.pricing .box-container .box .price .currency {
    font-size: 4rem;
    line-height: 3.5rem;
    font-weight: 300;
}

.pricing .box-container .box .price .amount {
    font-size: 5.8rem;
    line-height: 4.5rem;
    font-weight: 700;
}

.pricing .box-container .box .price .duration {
    font-size: 1.8rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
}

.pricing .box-container .box ul {
    margin: 0 auto 2.5rem;
}

.pricing .box-container .box ul li {
    text-align: left;
    font-size: 1.6rem;
    padding-left: 3rem;
    margin: 1rem auto;
    color: var(--light-black);
}

.pricing .box-container .box ul li i {
    color: var(--main-color);
    padding: 0 1rem;
}

.pricing .box-container .box p {
    font-size: 1.4rem;
    color: var(--light-black);
    margin: 2rem auto;
    text-align: left;
    padding-left: 3.8rem;
}

/* end */

/* review */

.reviews .slide p {
    padding: 2rem;
    font-size: 1.5rem;
    font-style: italic;
    background: var(--primary);
    border-radius: 0.5rem;
    color: var(--black);
    line-height: 2;
    position: relative;
    z-index: 0;
    margin-bottom: 3rem;
}

.reviews .slide p::before {
    content: "";
    position: absolute;
    bottom: -1.5rem;
    left: 0.7rem;
    height: 3rem;
    width: 3rem;
    background: var(--primary);
    transform: rotate(45deg);
}

.reviews .slide .user {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.reviews .slide .user img {
    height: 7rem;
    width: 7rem;
    border-radius: 50%;
}

.reviews .slide .user h3 {
    font-size: 2rem;
    color: var(--black);
}

.reviews .slide .user span {
    color: var(--main-color);
    font-size: 1.5rem;
}

/* end */

/* media query */

@media (max-width: 991px) {
    html {
        font-size: 55%;
    }

    .header {
        padding: 2rem 3rem;
    }

    section {
        padding: 3rem 5rem;
    }
}

@media (max-width: 768px) {
    #menu {
        display: inline-block;
    }

    .header .navbar {
        position: absolute;
        top: 99%;
        left: 0;
        right: 0;
        background: var(--primary);
        border-top: 0.1rem solid #aaa;
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }

    .header .navbar.active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    .header .navbar a {
        display: block;
        margin: 2rem;
        color: var(--light-black);
    }
}

@media (max-width: 500px) {
    html {
        font-size: 50%;
    }

    .newsletter .content {
        max-width: 100%;
    }
}
</style>
<script>
import MainLayout from "../layouts/MainLayout.vue";
import { apiGet } from "../api/api";
export default {
    components: {
        MainLayout,
    },
    async created() {
        let userInfo = JSON.parse(localStorage.getItem("tokenAuth"));
        if (!userInfo) {
            this.$router.push("/login");
        } else {
            try {
                let userObj = await apiGet("/auth");
                localStorage.setItem("userInfo", JSON.stringify(userObj));
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>
