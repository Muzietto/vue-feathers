<template>
  <div>
    <h1>Single User</h1>
    <div class="row">
      <h1> This is the id {{ $route.params.id}}</h1>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      user: '',
    }
  },
  created: function() {
      const self = this;
//      window.restClient
//        .get('products.json')
  }
}
</script>

<style scoped>
</style>

