<script setup>
  import Product from './Product.vue'

  import { ref, onMounted } from 'vue';

  const products = ref([]);

  const fetchProducts = (category) => {
    let requestUrl = "https://fakestoreapi.com/products";
    if (category) {
        requestUrl += `/category/${category}`;
    }
    return fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            products.value = data;
            return data;
        })
        .catch(error => console.error("Error fetching products:", error));
  }

  onMounted(fetchProducts);
</script>

<template>
  <section class="product-grid">
    <Product v-for="product in products" :product-info="product"></Product>
  </section>
</template>

<style scoped lang="scss">
.product-grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 20px;
    padding: 1em;

    & article {
      border-radius: 5px;
      aspect-ratio: 3/4;
      height: 100%;
      overflow: hidden;

      & img {
        width: 100%;
        object-fit: contain;
        aspect-ratio: 1/1;
      }

      & div {
        height: 100%;
        overflow: hidden;
      }
    }
}
</style>
