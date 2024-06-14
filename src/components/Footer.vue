<template>
    <div>
        <!-- newsletter section starts -->

        <section class="newsletter">
            <div class="content">
                <h1 class="heading">subscribe now</h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quam et labore nobis ducimus consequuntur qui eos fugit
                    expedita veniam maxime delectus, fugiat necessitatibus,
                    dolorum nesciunt quidem at reprehenderit? Inventore,
                    molestiae?
                </p>
                <form action="">
                    <input
                        type="email"
                        placeholder="enter your email"
                        class="email"
                    />
                    <input type="submit" value="subscribe" class="btn" />
                </form>
            </div>
        </section>

        <!-- newsletter section ends -->

        <!-- footer section starts -->

        <section class="footer">
            <div class="box-container">
                <div class="box">
                    <h3>quick links</h3>
                    <a href="#home"> <i class="fas fa-arrow-right"></i>home</a>
                    <a href="#about">
                        <i class="fas fa-arrow-right"></i>about</a
                    >
                    <a href="#services">
                        <i class="fas fa-arrow-right"></i>services</a
                    >
                    <a href="#diet"> <i class="fas fa-arrow-right"></i>diet</a>
                    <a href="#blog"> <i class="fas fa-arrow-right"></i>blog</a>
                    <a href="#reviews">
                        <i class="fas fa-arrow-right"></i>reviews</a
                    >
                </div>

                <div class="box">
                    <h3>extra links</h3>
                    <a href="#">
                        <i class="fas fa-arrow-right"></i>my account</a
                    >
                    <a href="#"> <i class="fas fa-arrow-right"></i>my order</a>
                    <a href="#">
                        <i class="fas fa-arrow-right"></i>my wishlist</a
                    >
                    <a href="#">
                        <i class="fas fa-arrow-right"></i>ask questions</a
                    >
                    <a href="#">
                        <i class="fas fa-arrow-right"></i>terms of use</a
                    >
                    <a href="#">
                        <i class="fas fa-arrow-right"></i>privacy policy</a
                    >
                </div>

                <div class="box">
                    <h3>contact info</h3>
                    <a href="#"> <i class="fas fa-phone"></i>+123-456-7890</a>
                    <a href="#"> <i class="fas fa-phone"></i>+123-765-2568</a>
                    <a href="#">
                        <i class="fas fa-envelope"></i>anhpd17@gmail.com</a
                    >
                    <a href="#">
                        <i class="fas fa-map"></i>karachi, Pak -12233</a
                    >
                </div>

                <div class="box">
                    <h3>follow us</h3>
                    <a href="#"> <i class="fab fa-facebook-f"></i>facebook</a>
                    <a href="#"> <i class="fab fa-twitter"></i>twitter</a>
                    <a href="#"> <i class="fab fa-instagram"></i>instagram</a>
                    <a href="#"> <i class="fab fa-linkedin"></i>linkedin</a>
                    <a href="#"> <i class="fab fa-github"></i>github</a>
                </div>
            </div>

            <div class="credit">
                created by <span>anhpd17</span> | all rights are reserved!
            </div>
        </section>
    </div>
</template>
<script></script>
<style scoped>
/* newsletter */

.newsletter {
    background: url(../assets/images/newsletter.jpg) no-repeat;
    background-position: center;
    background-size: cover;
}

.newsletter .content {
    max-width: 70rem;
    margin: 1rem auto;
    text-align: center;
}

.newsletter .content p {
    font-size: 1.5rem;
    line-height: 2;
    color: var(--light-black);
}

.newsletter .content form {
    margin-top: 2rem;
    background: var(--white);
    border-radius: 0.5rem;
    border: 0.2rem solid var(--main-color);
    padding: 0.8rem;
    display: flex;
}

.newsletter .content form .email {
    width: 100%;
    font-size: 1.6rem;
    color: var(--main-color);
    padding: 0 1.3rem;
    text-transform: capitalize;
}

.newsletter .content form .btn {
    margin-top: 0;
    background: none;
}

.newsletter .content form .btn:hover {
    background: var(--main-color);
}

/* end */

/* footer */

.footer .box-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
}

.footer .box-container .box h3 {
    font-size: 2rem;
    padding: 1.5rem 0;
    color: var(--main-color);
}

.footer .box-container .box a {
    display: block;
    font-size: 1.4rem;
    color: var(--black);
    padding: 1rem 0;
}

.footer .box-container .box a i {
    color: var(--main-color);
    padding-right: 0.5rem;
}

.footer .box-container .box a:hover i {
    padding-right: 2rem;
}

.footer .credit {
    text-align: center;
    margin-top: 2.5rem;
    padding: 1rem;
    padding-top: 2.5rem;
    font-size: 2rem;
    color: var(--black);
}

.footer .credit span {
    color: var(--main-color);
}

/* end */
</style>
