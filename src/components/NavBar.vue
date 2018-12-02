<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info fixed-top shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="">
        <img src="./../assets/logo.png" alt="" class="d-inline-block align-top" />

        <span class="text-light">{{ title }}</span>
      </a>
    </div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        title: document.title,
      }
    }
  }
</script>

<style lang="scss">
  $navbar-brand-height: 50px;

  nav.navbar {
    .navbar-brand {
      img {
        height: $navbar-brand-height;
      }

      span {
        line-height: $navbar-brand-height;
      }
    }
  }

  body {
    padding-top: $navbar-brand-height * 2;
  }
</style>
