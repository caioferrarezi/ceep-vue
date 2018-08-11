<template>
  <div class="hello">
    <div class="container">
     <div class="row justify-content-center">

      <div class="col-12 d-flex align-items-center justify-content-around mb-5">
        <h1>{{ msg }}</h1>
        <button v-if="newCard == false" class="btn btn-primary" @click.prevent="addNew">Add new card</button>
        <button v-else class="btn btn-danger" @click.prevent="cancel">Cancel</button>
      </div>

      <div v-if="newCard == true" class="col-12 col-md-8 col-md-6 col-lg-4 mb-5">
        <FormNewCard></FormNewCard>
      </div>
      
     </div>

      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-4" v-for="(card, i) in cards" :key="i">
          <Card :config="card"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormNewCard from '@/components/FormNewCard'
import Card from '@/components/Card'
import { db } from '../main'

export default {
  name: 'Painel',
  data () {
    return {
      msg: 'Welcome to Ceep',
      cards: [],
      newCard: false,
    }
  },
  components: {
    FormNewCard,
    Card,
  },
  methods: {
    addNew () {
      this.newCard = true;
    },
    cancel () {
      this.newCard = false;
    }
  },
  firestore () {
    return {
      cards: db.collection('cards').orderBy('createdAt', 'desc')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
