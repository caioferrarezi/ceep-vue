<template>
    <article class="card text-left" :style="{'background-color': config.color}">
        <div class="card-body">
            <h2 class="card-title">{{ config.title }}</h2>
            <p class="card-text">{{ config.text }}</p>
            <button class="btn btn-danger" @click="removeCard(config.id)">Remove</button>
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
    removeCard(id) {
      db.collection("cards").doc(id).delete();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
