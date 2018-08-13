<template>
  <div class="hello">
    <Nav @search="search"></Nav>
    <div class="container">
      <div class="row justify-content-center mb-4">
        <h1 class="sr-only">{{ msg }}</h1>
      </div>
      <div class="row justify-content-start">
        <div class="col-12 col-md-8 col-lg-4 my-3" v-for="(card, i) in cards" :key="i">
          <Card :config="card"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Card from "@/components/Card";
import { db } from "../main";

export default {
  name: "Painel",
  data() {
    return {
      msg: "Welcome to Ceep",
      cards: [],
      auxCards: [],
    };
  },
  components: {
    Nav,
    Card
  },
  methods: {
    search: function(src) {
      this.$router.replace({
        path: 'search',
        query: {
          key: src.key
        }
      });
    }
  },
  firestore() {
    return {
      cards: db.collection("cards").orderBy("createdAt", "desc")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
