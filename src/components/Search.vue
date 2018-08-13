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
      msg: this.$route.query.key,
      cards: []
    };
  },
  components: {
    Nav,
    Card
  },
  methods: {
    search: function(src) {
      this.$router.replace({
        path: "search",
        query: {
          key: src.key
        }
      });
    }
  },
  mounted: function() {
    db
      .collection("cards")
      .where("title", ">", this.$route.query.key)
      .get()
      .then(query => {
          query.forEach((doc) => {
              if ( doc.data().title.includes(this.$route.query.key) ) {
                  let card = doc.data();
                  card.id = doc.id;
                  this.cards.push(card);
              }
          })
      });
  },
  watch: {
    "$route.query": function() {
      this.cards = [];
      db
        .collection("cards")
        .where("title", ">", this.$route.query.key)
        .get()
        .then(query => {
          query.forEach((doc) => {
              if ( doc.data().title.includes(this.$route.query.key) ) {
                  let card = doc.data();
                  card.id = doc.id;
                  this.cards.push(card);
              }
          })
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
