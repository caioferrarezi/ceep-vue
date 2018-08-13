<template>
    <article class="card text-left" :class="[config.color]">
        <template v-if="editable == false && config.firstTime == false">
          <div class="card-body">
            <h2 class="card-title">{{ config.title }}</h2>
            <p class="card-text">{{ config.text }}</p>
          </div>
          <div class="card-header text-right">
            <button class="btn btn-light" @click="editCard()">Edit card</button>
          </div>
        </template>
        <template v-else>
          <form @submit.prevent="saveChanges(config.id)" @input="isChanged = true">
            <div class="card-body">
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
                <select id="color" class="form-control" v-model="config.color">
                  <option value="bg-light">Light Gray</option>
                  <option value="bg-secondary text-white">Dark Gray</option>
                  <option value="bg-dark text-white">Black</option>
                  <option value="bg-primary text-white">Blue</option>
                  <option value="bg-success text-white">Green</option>
                  <option value="bg-info text-white">Light Green</option>
                  <option value="bg-danger text-white">Red</option>
                  <option value="bg-warning">Yellow</option>
                </select>
              </div>
            </div>

            <div class="card-footer text-right">
              <button class="btn btn-danger" @click="removeCard(config.id)">Delete</button>
              <button class="btn btn-primary" type="submit">Save card</button>
            </div>
          </form>
        </template>
    </article>
</template>

<script>
import { db } from "../main";

export default {
  name: "Card",
  props: ['config', 'searched'],
  data() {
    return {
      editable: false,
      isChanged: false
    };
  },
  methods: {
    removeCard (id) {
      db.collection("cards").doc(id).delete();
    },
    saveChanges (id) {
      if ( this.isChanged === true ) {
        db.collection('cards').doc(id).update({
          firstTime: false,
          title: this.config.title,
          text: this.config.text,
          color: this.config.color,
        });

        this.isChanged = false;
      } 
      this.editable = false;
    },
    editCard () {
      this.editable = true;
    },
    cancel () {
      this.editable = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
