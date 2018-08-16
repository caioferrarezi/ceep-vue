<template>
    <article class="card bg-light text-left">
      
        <template v-if="editable == false && config.firstTime == false">
          <div class="card-body">
            <span class="badge text-light" :class="[config.badge.class]">{{ config.badge.label | capitalize }}</span>
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
                <div class="d-inline-block custom-radio mr-2" v-for="badge in badges" :key="badge.label">
                  <input :id="badge.label" type="radio" v-model="cat" :value="badge.label">
                  <label :for="badge.label" class="badge text-light" :class="badge.class">{{ badge.label | capitalize }}</label>
                </div>
              </div>

              <div class="form-group">
                <label for="title">Title</label>
                <input v-validate="required" type="text" class="form-control" id="title" v-model="config.title">
              </div>

              <div class="form-group">
                <label for="desc">Description</label>
                <textarea v-model="config.text" id='desc' class="form-control"></textarea>
              </div>

            </div>

            <div class="card-footer text-right">
              <button class="btn btn-link" @click="removeCard(config.id)">Delete</button>
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
  props: [
    'config', 
    'searched',
    'badges'
  ],
  data() {
    return {
      editable: false,
      badges: [],
      cat: '',
    };
  },
  methods: {
    removeCard (id) {
      db.collection("cards").doc(id).delete();
    },
    saveChanges (id) {
      db.collection('cards').doc(id).update({
        firstTime: false,
        title: this.config.title,
        text: this.config.text,
        badge: this.computedBadge[0],
      });

      this.editable = false;
    },
    editCard () {
      this.editable = true;
    },
  },
  mounted () {
    this.cat = this.config.badge.label;
  },
  computed: {
    computedBadge: function() {
      return this.badges.filter((badge) => {
        return badge.label == this.cat;
      });
    }
  },
  filters: {
    capitalize: function (string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.custom-radio {
    position: relative;
}
.custom-radio input {
    opacity: 0;
    position: absolute;
}
.custom-radio .badge {
    cursor: pointer;
    padding: 4px 6px;
    transition: all .15s ease;
}
.custom-radio input:checked ~ .badge,
.custom-radio .badge:hover {
    box-shadow: inset 0 0 0 20px rgba(0, 0, 0, 0.3);
}

</style>
