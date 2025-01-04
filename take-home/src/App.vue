<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Filters from './components/Filters.vue'
  import Search from './components/Search.vue'
  import './assets/main.scss'
  
</script>

<template>
  <header>
        <h1>Shop</h1>
        <Filters></Filters>
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
