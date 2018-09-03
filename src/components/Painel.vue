<template>
  <div class="painel">
    <Nav @search="search" :btn-new="query.length !== 0" @addCard="addNew"></Nav>

    <transition name="fade" mode="out-in">

      <template v-if="fire">
        <p class="load-content mt-5">
          <span class="spinner">
            <span class="bounce bounce1"></span>
            <span class="bounce bounce2"></span>
            <span class="bounce bounce3"></span>
          </span> 
          <span class="sr-only">Loading...</span>
        </p>
      </template>

      <template v-else-if="!fire">
        <div class="container">
          <div class="row justify-content-center mb-4">
            <h1 class="sr-only">{{ msg }}</h1>
          </div>
          <div class="row justify-content-start">
            <div class="col-12 col-md-8 col-lg-4 my-3" v-for="(card, i) in searchCards" :key="i">
              <Card 
              :config="card" 
              :badges="badges" 
              :key="card.id" 
              @saved="updateData" 
              @deleted="updateData" 
              @canceled="removeLastCard"
              />
            </div>
          </div>
        </div>
      </template>

    </transition>

  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Card from "@/components/Card";
import { db } from "../main";
import { auth } from "../main";

export default {
  name: "Painel",
  data() {
    return {
      msg: "Welcome do Ceep",
      cards: [],
      query: '',
      fire: true,
      badges: [],
    };
  },
  components: {
    Nav,
    Card
  },
  methods: {
    addNew: function () {
      const createdAt = new Date();
      this.cards.unshift({
          firstTime: true,
          title: "Novo cartão",
          text: "Edite o titulo e adicione uma nova descrição",
          badgesId: [],
          createdAt
      })
    },
    search: function(src) {
      this.query = src.key;
    },
    updateData: function () {
      this.fire = true;
      this.cards = [];

      db
      .collection("cards")
      .orderBy("createdAt", "desc")
      .get()
      .then((docRef) => {
        docRef.forEach((doc) => {
          let card = doc.data();
          card.id = doc.id
          this.cards.push(card);
        });
        this.fire = false;
      })
      .catch( () => {
        
      });
    },
    removeLastCard: function() {
      this.cards.shift();
    }
  },
  mounted () {
    auth.signInAnonymously().catch( error => {
      console.log(error);
      return;
    });

    auth.onAuthStateChanged( user => {
      if (user) {
        this.updateData();
        console.log(user);
      }
    });

    db
    .collection('badges')
    .get()
    .then(docRef => {
      docRef.forEach(doc => {
        let badge = doc.data();
        badge.id = doc.id;
        this.badges.push(badge);
      })
    });
  },
  computed: {
    searchCards: function () {
      return this.cards.filter((item) => {
        return item.title.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1;
      })
    },
  },
  // firestore() {
  //   return {
  //     //cards: db.collection("cards").orderBy("createdAt", "desc"),
  //     //badges: db.collection('badges')
  //   };
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
