<template>
<header>
  <div class="navbar navbar-default">
    <div class="navbar-header">
      <h1>
        <router-link :to="{name: 'iMain'}">{{sitename}}</router-link>
      </h1>
    </div>
    <div class="nav navbar-nav navbar-right cart">
        <login-form :registerCurrentUser="registerCurrentUser" v-show="!currentUser"></login-form>
        <div v-show="currentUser">
          <label>LOGGED</label>
          <button type="button" class="btn btn-default btn-lg" v-on:click="logout">
            <span class="glyphicon glyphicon-shopping-cart">LOG OUT</span>
          </button>
        </div>
    </div>
  </div>
</header>
</template>

<script>
  import LoginForm from './LoginForm.vue';
  export default {
    name: 'my-header',
    components: {LoginForm},
    data () {
      return {
        sitename: "Vue.js Final Trial",
        currentUser: '',
      };
    },
    computed: {
    },
    props: [],
    methods: {
      logout() { 
        window.feathersClient
          .logout().then(data => {
            window.feathersClient.set('user', undefined);
            this.currentUser = '';
          });
      },
      registerCurrentUser(newUser) { 
        this.currentUser = newUser;
      },
    },
  };
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }
</style>

