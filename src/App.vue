<template>
  <div id="app">
    <nav-bar></nav-bar>

    <calculator-box></calculator-box>

    <disclaimer-box></disclaimer-box>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import CalculatorBox from './components/CalculatorBox.vue'
  import DisclaimerBox from './components/DisclaimerBox.vue'

  export default {
    components: {
      'nav-bar': NavBar,
      'calculator-box': CalculatorBox,
      'disclaimer-box': DisclaimerBox,
    },
  }
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
