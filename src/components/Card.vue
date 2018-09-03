<template>
    <div class="card-wrapper" @click="cancelEdit(config.id)">
      <template>
        <article class="card bg-light text-left" @click.stop>
          <div class="card-body">
            <span 
            class="badge text-light mr-2" 
            v-for="badge in cardBadges"
            :class='[badge.class]'
            :key="badge.id">
                  {{ badge.label }}
            </span>
            <h2 class="h4 card-title my-2">{{ config.title }}</h2>
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
                      <input :id="badge.id" type="checkbox" v-model="cat" :value="badge.id">
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
                    <button class="btn btn-link" @click.prevent="cancelEdit()" v-if="!config.firstTime">Cancel</button>
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
      cat: [],
    };
  },
  methods: {
    // método para deletar um card
    removeCard (id) {
      if (id) {
        this.resp = false; //inicia o load
        db //firestore
        .collection("cards") // coleção 'cards'
        .doc(id) // documento dentro da coleção que possui o id desse componente
        .delete() // exclui
        .then(() => { // callback
          setTimeout(() => { // timeout para haver fluidez de tela
            this.$emit('deleted'); // emite um evento avisando que o card foi deletado
            this.editable = false;
            this.resp = null; // termina o load
          }, 1000)
        });
      } else {
        this.$emit('canceled');
      }
    },

    saveChanges (id) {
      this.resp = false; // inicia o load
      if (id) { // verifica se o cartao tem um id
        db
        .collection('cards')
        .doc(id)
        .update({ // se sim, faz o update das informações do cartao
          firstTime: false,
          title: this.config.title,
          text: this.config.text,
          badgesId: this.selectedBadges,
        }).then(docRef => {
          setTimeout(() => {
            this.$emit('saved'); // emite um evento que indica que o cartao foi salvo
            this.editable = false; 
            this.resp = null;
          }, 1000)
        }).catch(error => {
          console.log(error);
        });
      } else {
        db.collection('cards').add({ // se não, adiciona um novo no firestore
          firstTime: false,
          title: this.config.title,
          text: this.config.text,
          badgesId: this.selectedBadges,
          createdAt: this.config.createdAt
        }).then(docRef => {
          setTimeout(() => {
            this.$emit('saved');
            this.editable = false;
            this.resp = null;
          }, 1000)
        }).catch(error => {
          console.log(error);
        });
      }
    },

    editCard () { // função para editar o cartão
      this.editable = true; // altera a variável de controle do modal de edição do cartão
    },

    cancelEdit () {
      this.editable = false;
    }
  },
  mounted () {
    this.cat = this.config.badgesId;
  },
  computed: {
    // descobrir quais badges foram selecionadas
    selectedBadges: function() {
      let aux = [];
      this.badges.forEach( badge => {
        this.cat.forEach( cat => {
          badge.id == cat ? aux.push(cat) : ''
        });
      });
      return aux;
    },

    // pega as badgesIds e tras as badges completas correspondentes
    cardBadges: function () {
      let aux = []; // variavel auxiliar
      this.badges.forEach( badge => { // percorre o array badge
        this.cat.forEach( cat  => { // percorre o array cat que possui os badgesIds do cartao
          badge.id == cat ? aux.push(badge) : '' // se badge.id == cat insere o badge no array auxiliar
        });
      });
      return aux; // retorna o array aux
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
