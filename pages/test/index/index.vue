<template>
    <div>
        <div>{{num}}</div>
        <p>{{name}}</p>
        <hello></hello>
    </div>
</template>

<script>
    import Hello from "components/hello"

    export default {
        data() {
            return {
                num: 123,
                name: "test",
            }
        },
        methods: {},
        components: {
            Hello,
        }
    }
</script>

<style lang="scss">
    div {
        p {
            font-size: 20px;
            color: #333;
            margin: 10px;
        }
    }
</style>
