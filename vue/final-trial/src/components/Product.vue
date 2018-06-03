<template>
  <div>
    <my-header></my-header>
    <h1> This is the id {{ $route.params.id}}</h1>
    <div class="row">
      <div class="col-md-5 col-md-offset-0">
        <figure>
         <img class="product" v-bind:src="product.image" >
        </figure>
      </div>
      <div class="col-md-6 col-md-offset-0 description">
        <h1>{{product.title}}</h1>
        <p v-html="product.description"></p>
        <p class="price">
        {{product.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {  },
  data() {
    return {
      product: ''
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
