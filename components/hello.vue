<template>
    <div>
        <p>{{words}}</p>
        <span style="color: #000">123</span>
        <img src="/commercial/assets/admin/commercial_logo.png" alt="">
        <img src="http://www.careagle.com/commercial/assets/admin/commercial_logo.png" alt="">
        <img :src="url" alt="">
        <div class="test"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                words: "hello233333",
                url: "/commercial/assets/appRecommend/image_page1.jpg",
            }
        },
        created() {
            this.say();
        },
        methods: {
            say() {
                console.log(this.words);
            },
        }
    }
</script>

<style>
    .test {
        width: 100px;
        height: 100px;
        background: url('/commercial/assets/appRecommend/image_page1.jpg') center;
    }
</style>
