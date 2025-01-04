<script setup>
import Filter from './Filter.vue';

import { ref, onMounted } from 'vue';

const categories = ref([]);

const fetchCategories = (category) => {
  const storedCategories = sessionStorage.getItem("productCategories");
  if (storedCategories) {
    categories.value = JSON.parse(storedCategories);
    return storedCategories;
  }

  return fetch("https://fakestoreapi.com/products/categories")
      .then(response => response.json())
      .then(data => {
          sessionStorage.setItem("productCategories", JSON.stringify(data));
          categories.value = data;
          return data;
      })
      .catch(error => console.error("Error fetching categories:", error));

  const selection = ref();

  const onSelect = (e) => {
    
  };
}

onMounted(fetchCategories);
</script>

<template>
  <div class="filters">
    <Filter v-for="category in categories" :category="category" @select="onSelect"></Filter>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 1em;
}
</style>
