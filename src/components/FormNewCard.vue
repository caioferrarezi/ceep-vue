<template>
    <form @submit.prevent="addCard" class="text-left">
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="title">
        </div>

        <div class="form-group">
            <label for="desc">Description</label>
            <textarea v-model="text" id='desc' class="form-control"></textarea>
        </div>

        <div class="form-group">
            <label for="color">Color</label>
            <input type="text" class="form-control" id="color" v-model="color">              
        </div>

        <button class="btn btn-success" type="submit">Save</button>
    </form>
</template>

<script>
import { db } from '../main'

export default {
    name: 'FormNewCard',
    data () {
        return {
            title: '',
            text: '',
            color: '',
        }
    },
    methods: {
        addCard () {
            const createdAt = new Date();
            db.collection('cards').add({
                title: this.title,
                text: this.text,
                color: this.color,
                createdAt
            });
            this.reset();
        },
        reset () {
            this.title = '';
            this.text = '';
            this.color = '';
        }
    }
}
</script>

<style>
    
</style>