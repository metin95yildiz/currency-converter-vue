<template>
  <h1>Currency Converter</h1>
  <CurrencyConverter />
</template>

<script>
import CurrencyConverter from "./components/CurrencyConverter.vue";

export default {
  name: 'App',
  components: {
    CurrencyConverter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 4rem;
}
</style>
