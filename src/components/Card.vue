<template>
    <div class="card-wrapper" @click="cancelEdit(config.id)">
      <template>
        <article class="card bg-light text-left" @click.stop>
          <div class="card-body">
            <span class="badge text-light" :class="[config.badge.class]">{{ config.badge.label | capitalize }}</span>
            <h2 class="h4 card-title mt-1">{{ config.title }}</h2>
            <p class="card-text">{{ config.text }}</p>
          </div>
          <div class="card-footer text-right">
            <button class="btn btn-primary" @click="editCard()">Edit card</button>
          </div>
        </article>
      </template>

      <transition name="show-card">
        <template v-if="editable == true || config.firstTime == true">
          <div class="card-modal">
            <div class="card bg-light text-left" @click.stop>
              <form @submit.prevent="saveChanges(config.id)" @input="isChanged = true">
                <div class="card-body">

                  <div class="form-group">
                    <div class="d-inline-block custom-radio mr-2" v-for="badge in badges" :key="badge.label">
                      <input :id="badge.label" type="radio" v-model="cat" :value="badge.label">
                      <label :for="badge.label" class="badge text-light" :class="badge.class">{{ badge.label | capitalize }}</label>
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
      title: '',
      text: '',
      cat: '',
    };
  },
  methods: {
    removeCard (id) {
      db.collection("cards").doc(id).delete();
      this.editable = false;
    },
    saveChanges (id) {
      db.collection('cards').doc(id).update({
        firstTime: false,
        title: this.config.title,
        text: this.config.text,
        badge: this.computedBadge[0],
      }).then(docRef => {
        alert('Card succesfully written')
      }).catch(error => {
        console.log(error);
      });
      this.editable = false;
    },
    editCard () {
      this.editable = true;
    },
    cancelEdit () {
      this.editable = false;
    }
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

.show-card-enter-active {
  animation: showCard 0.3s ease;
}
.show-card-leave-active {
  animation: showCard 0.3s ease reverse;
}

@keyframes showCard {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
