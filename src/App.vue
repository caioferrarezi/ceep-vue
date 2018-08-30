<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.load-modal {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.spinner .bounce {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0 0.1rem;
  border-radius: 100px;
  background-color: #2c3e50;
  animation: upDown 1s ease-in-out infinite;
}
.spinner .bounce2 {
  animation-delay: 0.2s;
}
.spinner .bounce3 {
  animation-delay: 0.4s;
}

.fade-enter-active {
  animation: fade 0.15s ease;
}
.fade-leave-active {
  animation: fade 0.15s ease reverse;
}

@keyframes upDown {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(0.8);
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
