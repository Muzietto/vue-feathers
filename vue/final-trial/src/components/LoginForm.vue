<template>
  <div id="login">
    <form class="form-signin" @submit.prevent="login">
      <h1>Login</h1>
      <input type="text" name="email" v-model="input.email" placeholder="Email" />
      <input type="password" name="password" v-model="input.password" placeholder="Password" />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
  import LoginForm from './LoginForm.vue';
  export default {
    name: 'Login',
    props: ['registerCurrentUser'],
    data() {
      return {
        input: {
          email: '',
          password: '',
        },
      }
    },
    methods: {
      login() {
        const self = this;
        if(this.input.email != '' && this.input.password != '') {
          window.feathersClient.authenticate({
            strategy: 'local',
            email: this.input.email,
            password: this.input.password
          })
          .then(response => {
            console.log('Authenticated!', response);
            return feathersClient.passport.verifyJWT(response.accessToken);
          })
          .then(payload => {
            console.log('JWT Payload', payload);
            return feathersClient.service('users').get(payload.userId);
          })
          .then(user => {
            feathersClient.set('user', user);
            console.log('User', feathersClient.get('user'));
            self.registerCurrentUser(user);
          })
          .catch(function(error){
            console.error('Error authenticating!', error);
          });
        } else {
          console.log("email+password must be present");
        }
      }
    }
  };
</script>

<style scoped>
</style>

