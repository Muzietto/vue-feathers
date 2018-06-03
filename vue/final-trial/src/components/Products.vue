<template>
  <div>
    <main>
    <h1>Here will come the products</h1>
    </main>
  </div>
</template>

<script>
export default {
  name: 'imain',
  data () {
    return {
      products: {},
      cart: []
    }
  },
  components: {
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
