<template>
  <div>
    <p>{{ mensagem }}</p>
  </div>
</template>

<script>
export default {
  name: 'Aviso',
  props:{
    mensagem: String,
  }
}
</script>

<style scoped>
div{
  padding: 1.2em 1em;
  background: #ff1c28;
  color: white;
  border-radius: .4em;
  max-width: 240px;
  margin: auto;
  box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.322);
  animation: fadeOut 4s;
}

p{
  text-align: center;
  margin: auto;
  font-weight: 600;
}

@keyframes fadeOut {
  25%{
    opacity: 1;
  }50%{
    opacity: 1;
  }75%{
    opacity: .9;
  }100%{
    opacity: 0;
  }
}
</style>