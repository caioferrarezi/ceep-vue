<template>
  <div class="hello">
    <Nav @search="search" :btn-new="query.length !== 0"></Nav>
    <div class="container">
      <div class="row justify-content-center mb-4">
        <h1 class="sr-only">{{ msg }}</h1>
      </div>
      <div class="row justify-content-start">
        <div class="col-12 col-md-8 col-lg-4 my-3" v-for="(card, i) in searchCards" :key="i">
            <Card :config="card" :badges="badges" :key="card.id"></Card>
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
      query: '',
    };
  },
  components: {
    Nav,
    Card
  },
  computed: {
    searchCards: function () {
      return this.cards.filter((item) => {
        return item.title.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1;
      })
    },
  },
  methods: {
    search: function(src) {
      this.query = src.key;
    },
  },
  firestore() {
    return {
      cards: db.collection("cards").orderBy("createdAt", "desc"),
      badges: db.collection('badges')
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.fadeUp-enter-active,
.fadeUp-leave-active {
    transition: all 0.5s;
}
.fadeUp-enter,
.fadeUp-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
