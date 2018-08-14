<template>
    <article class="card bg-light text-left">
        <template v-if="editable == false && config.firstTime == false">
          <div class="card-body">
            <span class="badge" :class="[config.badge.class]">{{ capitalize(config.badge.label) }}</span>
            <h2 class="h4 card-title mt-1">{{ config.title }}</h2>
            <p class="card-text">{{ config.text }}</p>
          </div>
          <div class="card-header text-right">
            <button class="btn btn-primary" @click="editCard()">Edit card</button>
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
                <label for="color">Badge</label>
                <select id="color" class="form-control" v-model="config.badge">
                  <option v-for="badge in badges" :value="badge.label + ' ' +badge.class" :key="badge.label">{{ badge.label }}</option>
                </select>
              </div>
            </div>

            <div class="card-footer text-right">
              <button class="btn btn-light" @click="removeCard(config.id)">Delete</button>
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
      isChanged: false,
      badges: []
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
          'badge.label': this.config.badge.split(' ')[0],
          'badge.class': this.config.badge.split(' ')[1],
        });

        this.isChanged = false;
      } 
      this.editable = false;
    },
    editCard () {
      this.editable = true;
    },
    capitalize: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  firestore () {
    return {
      badges: db.collection('badges')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
