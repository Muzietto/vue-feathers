<template>
    <div>
        <ul class="nav nav-pills">
            <li class="nav-item">
                <router-link to="/" class="nav-link" active-class="active" exact style="cursor: pointer">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/page-one" class="nav-link" active-class="active" style="cursor: pointer">Page One</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/page-two" class="nav-link" active-class="active" style="cursor: pointer">Page Two</router-link>
            </li>
        </ul>
        <hr>
    </div>
</template>

<style>
  a { color: blue; }
  a:hover { color: #DDDDDD; }
</style>
