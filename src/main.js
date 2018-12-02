import Vue from 'vue'
import App from './App.vue'

Vue.filter('currency', function (value) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2
  });
  return formatter.format(value);
});

Vue.filter('percent', function (value) {
  return (value * 100).toFixed(2) + '%';
});

new Vue({
  el: '#app',
  render: h => h(App)
});
