<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between align-items-center mb-4">
        <router-link to="/" class="navbar-brand">Ceep</router-link>

        <div class="d-flex align-items-center">
        <form class="form-inline my-2 my-lg-0" @submit.prevent="sendSearch">
            <input class="form-control mr-sm-2" v-model="search" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button class="btn btn-dark ml-5" @click.prevent="addNew">Add new card</button>
        </div>
    </nav>
</template>

<script>
import { db } from '../main'

export default {
    name: 'Nav',
    data () {
        return {
            title: "",
            text: "",
            color: "",
            search: ""
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