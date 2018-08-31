<template>
    <div class="card-wrapper" @click="cancelEdit(config.id)">
      <template>
        <article class="card bg-light text-left" @click.stop>
          <div class="card-body">
            <span class="badge text-light" :class="[config.badge.class]">{{ config.badge.label }}</span>
            <h2 class="h4 card-title mt-1">{{ config.title }}</h2>
            <p class="card-text">{{ config.text }}</p>
          </div>
          <div class="card-footer text-right">
            <button class="btn btn-primary" @click="editCard()">Edit card</button>
          </div>
        </article>
      </template>

      <transition name="fade">
        <template v-if="editable == true || config.firstTime == true">
          <div class="card-modal">
            <div class="card bg-light text-left" @click.stop>
              <form @submit.prevent="saveChanges(config.id)" @input="isChanged = true">
                <div class="card-body">

                  <div class="form-group">
                    <div class="d-inline-block custom-radio mr-2" v-for="badge in badges" :key="badge.id">
                      <input :id="badge.id" type="radio" v-model="cat" :value="badge.id">
                      <label :for="badge.id" class="badge text-light" :class="badge.class">{{ badge.label }}</label>
                    </div>
                  </div>

                  <div class="form-group h4">
                    <span class="sr-only"><label for="title sr-only">Title</label></span>
                    <input type="text" class="form-control form-control-custom" id="title" v-model="config.title">
                  </div>

                  <div class="form-group">
                    <span class="sr-only"><label for="desc">Description</label></span>
                    <textarea v-model="config.text" id='desc' class="form-control form-control-custom"></textarea>
                  </div>

                </div>

                <div class="card-footer d-flex justify-content-between">
                  <div class="col-auto p-0">
                    <button class="btn btn-link text-danger" @click.prevent="removeCard(config.id)">Delete</button>
                  </div>
                  <div class="col-auto p-0">
                    <button class="btn btn-link" @click.prevent="cancelEdit()">Cancel</button>
                    <button class="btn btn-primary" type="submit">Save card</button>
                  </div>
                </div>

                <p class="load-content m-0" v-if="resp === false">
                  <span class="spinner">
                    <span class="bounce bounce1"></span>
                    <span class="bounce bounce2"></span>
                    <span class="bounce bounce3"></span>
                  </span> 
                  <span class="sr-only">Loading...</span>
                </p>
              </form>
            </div>
          </div>
        </template>
      </transition>
    </div>
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
      resp: null,
      cat: '',
    };
  },
  methods: {
    removeCard (id) {
      db.collection("cards").doc(id).delete().then(() => {

        this.$emit('deleted');
        this.editable = false;
        
      });
    },
    saveChanges (id) {
      this.resp = false;

      db.collection('cards').doc(id).update({

        firstTime: false,
        title: this.config.title,
        text: this.config.text,
        badge: this.computedBadge[0],

      }).then(docRef => {

        setTimeout(() => {

          this.$emit('saved');
          this.editable = false;
          this.resp = null;

        }, 1000)

      }).catch(error => {

        console.log(error);

      });
    },
    editCard () {
      this.editable = true;
    },
    cancelEdit () {
      this.editable = false;
    }
  },
  mounted () {
    this.cat = this.config.badge.id;
  },
  computed: {
    computedBadge: function() {
      return this.badges.filter((badge) => {
        return badge.label == this.cat;
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .load-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>


<style>

.card-modal {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.card-modal .card {
  width: 100%;
  max-width: 576px;
}

.form-control.form-control-custom {
  background-color: transparent;
  border-color: transparent;
  font-size: inherit;
}

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
