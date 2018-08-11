<template>
    <article class="card text-left" :style="{'background-color': config.color}">
        <div class="card-body">
          <template v-if="editable == false">
            <h2 class="card-title">{{ config.title }}</h2>
            <p class="card-text">{{ config.text }}</p>

            <button class="btn btn-primary" @click="editCard()">Edit</button>
            <button class="btn btn-danger" @click="removeCard(config.id)">Remove</button>
          </template>

          <form @submit.prevent="saveChanges(config.id)" v-else>
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" v-model="config.title">
            </div>

            <div class="form-group">
              <label for="desc">Description</label>
              <textarea v-model="config.text" id='desc' class="form-control"></textarea>
            </div>

            <div class="form-group">
              <label for="color">Color</label>
              <input type="text" class="form-control" id="color" v-model="config.color">              
            </div>

            <button class="btn btn-success" type="submit">Save</button>
            <button class="btn btn-danger" @click="removeCard(config.id)">Remove</button>
          </form>
          
        </div>
    </article>
</template>

<script>
import { db } from "../main";

export default {
  name: "Card",
  props: ['config'],
  data() {
    return {
      editable: false
    };
  },
  methods: {
    removeCard (id) {
      db.collection("cards").doc(id).delete();
    },
    saveChanges (id) {
      db.collection('cards').doc(id).update({
        title: this.config.title,
        text: this.config.text,
        color: this.config.color,
      });
      this.editable = false;
    },
    editCard () {
      this.editable = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
