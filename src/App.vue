<template>
  <v-app class="main-body">
   <currency-app></currency-app>
  </v-app> 
</template>
<script>
import Currency from './components/currencyconverter.vue'
export default {
  components:{
   "currency-app": Currency
  },
  name: 'App', 
}
</script>
<style>
.main-navigation{
  margin-bottom:60px;
}
</style>
