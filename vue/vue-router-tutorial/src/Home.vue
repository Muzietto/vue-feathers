<template>
    <div class="jumbotron">
        <h1 class="display-4">Vue Router Home!</h1>
        <p class="lead">You are on the home page of the Vue application</p>
        <hr class="my-4">
        <p>This text is not important, but thanks for reading it.</p>
        <a class="btn btn-primary btn-lg" role="button"><router-link to="/page-one/cippirimerlo">Click for Page 1</router-link></a>
        <a class="btn btn-secondary btn-lg" role="button"><router-link to="/page-two?status=awesome">Click for Page 2</router-link></a>
    </div>
</template>
 
<script>
    export default {}
</script>

<style>
  a { color: #BBBBBB; }
  a:hover { color: #BBBBBB; }
</style>
