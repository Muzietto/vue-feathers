<template>
  <div>
    <main>
    <my-header :userName="userName"></my-header>
    <h1>Here will come the products</h1>
    </main>
  </div>
</template>

<script>
import MyHeader from './Header.vue';
export default {
  name: 'imain',
  data () {
    return {
      userName: 'Giggino',
      products: {},
      cart: []
    }
  },
  components: {
    MyHeader,
  },
  methods: {
  },
  computed: {
  },
  filters: {
  },
  created: function() {
//    window.restClient
//      .get('products.json'/*, {$limit: 2}*/)
  }
}
</script>

<style scoped>
</style>
