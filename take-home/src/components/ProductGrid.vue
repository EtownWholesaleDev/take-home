<script setup>
  import SearchIcon from './icons/IconSearch.vue'
</script>

<template>
  <section class="product-grid">
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
