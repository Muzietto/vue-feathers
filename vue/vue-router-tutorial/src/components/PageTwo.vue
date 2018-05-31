<template>
  <div>
    <h1>Hellobillo!
        <small class="text-muted">I am page 2 TWO!</small>
    </h1>
    <a class="btn btn-primary btn-lg" role="button"><router-link to="/">Bacco Tabacco</router-link></a>
    <p>An example of using this.$router.push()</p>
    <button @click="pushHome" class="btn">Go Home</button>
  </div>
</template>
 
<script>
  export default {
      methods: {
          pushHome() {
              this.$router.push('/');
          }
      }
  }
</script>
