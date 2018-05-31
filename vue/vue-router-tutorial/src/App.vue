<template>
    <div class="container">
        <h1>Vue Routing Example</h1>
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>
 
<script>
    import Navigation from './Navigation';
    
    export default {
        components: {
            Navigation
        }
    }
</script>
 

