<template>
    <div class="container">
        <h1>Vue Routing Example</h1>
        <navigation></navigation>
        <transition name="slide">
          <router-view></router-view>
        </transition>
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
 
<style>
    .slide-leave-active {
        transition: opacity 1s ease;
        opacity: 0;
        animation: slide-out 1s ease-out forwards;
    }
 
    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }
 
    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
    }

   @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }
 
    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }    
</style>
