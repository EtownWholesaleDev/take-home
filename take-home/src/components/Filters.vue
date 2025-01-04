<script setup>
import Filter from './Filter.vue';

import { ref, onMounted, computed } from 'vue';

const categories = ref([]);

const formatCategories = (categories) => {
  return categories.map((category) => {
    return {
      title: category,
      selected: false
    }
  }); 
}

const getSelected = (categoryName) => {
  return categories.value.find((c) => c.title === categoryName).selected;
}

const fetchCategories = (category) => {
  const storedCategories = sessionStorage.getItem("productCategories");
  if (storedCategories) {
    categories.value = formatCategories(JSON.parse(storedCategories));
    return storedCategories;
  }

  return fetch("https://fakestoreapi.com/products/categories")
      .then(response => response.json())
      .then(data => {
          sessionStorage.setItem("productCategories", JSON.stringify(data));
          categories.value = formatCategories(data);
          return data;
      })
      .catch(error => console.error("Error fetching categories:", error));
}

const selection = ref();
const onSelect = (category) => {
  console.log(category);
};

onMounted(fetchCategories);
</script>

<template>
  <div class="filters">
    <Filter v-for="category in categories" :category="category.title" :selected="getSelected(category.title)" @select="onSelect"></Filter>
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
