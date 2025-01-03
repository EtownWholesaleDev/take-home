<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Search from './components/Search.vue'
  import './assets/main.scss'
  
</script>

<template>
  <header>
        <h1>Shop</h1>
        <div class="filters"></div>
        <Search></Search>
    </header>
    <main>
        <RouterView></RouterView>
    </main>
    <footer>
        <p>&copy; 2023 My Simple Site</p>
    </footer>
</template>

<style scoped>
  
</style>
