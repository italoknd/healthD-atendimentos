<template>
  <div :style="{ background: background }">
    <p>{{ mensagem }}</p>
  </div>
</template>

<script>
export default {
  name: 'Aviso',
  props: {
    mensagem: String,
    background: String
  }
}
</script>

<style scoped>
div {
  padding: 1.2em 1em;
  color: white;
  border-radius: 0.4em;
  max-width: 240px;
  margin: 2em auto;
  box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.322);
  animation: fadeOut 4s;
}

p {
  text-align: center;
  margin: auto;
  font-weight: 600;
}

@keyframes fadeOut {
  25% {
    opacity: 1;
    margin: 2em auto;
  }
  50% {
    opacity: 1;
    margin: 2em auto;
  }
  75% {
    opacity: 0;
    margin: 2em auto;
  }
  100% {
    opacity: 0;
    margin: -2.7em auto;
  }
}
</style>
