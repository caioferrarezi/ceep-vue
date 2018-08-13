<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between align-items-center mb-4">
        <router-link to="/" class="navbar-brand">Ceep</router-link>

        <div class="d-flex align-items-center">
        <form class="form-inline text-white my-2 my-lg-0" @input.prevent="sendSearch">
            <label for="search">Type your search:</label>
            <input class="form-control ml-sm-2" v-model="search" type="search" placeholder="Search" aria-label="Search">
        </form>
        <button class="btn btn-light ml-5" @click.prevent="addNew" :disabled="btnNew">Add new card</button>
        </div>
    </nav>
</template>

<script>
import { db } from '../main'

export default {
    name: 'Nav',
    props: {
        btnNew: Boolean
    },
    data () {
        return {
            title: "",
            text: "",
            color: "",
            search: this.$route.query.key
        }
    },
    methods: {
        addNew () {
            const createdAt = new Date();
            db.collection('cards').add({
                firstTime: true,
                title: this.title,
                text: this.text,
                color: this.color,
                createdAt
            });
        },
        sendSearch: function () {
            this.$emit('search', {key: this.search})
        }
    }
}
</script>

<style>
    
</style>