<template>
  <div class="hello">
    <div class="container">
      <h1>{{ msg }}</h1>
      <hr class="my-5">
      <div class="row justify-content-center">
        <div class="col-auto" v-for="(card, i) in cards" :key="i">
          <card config="card"></card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { db } from '../main'

export default {
  name: 'Cards',
  data () {
    return {
      msg: 'Welcome to Ceep',
      cards: [],
      editable: false,
    }
  },
  methods: {
    removeCard (id) {
      db.collection('cards').doc(id).delete();
    }
  },
  firestore () {
    return {
      cards: db.collection('cards')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
