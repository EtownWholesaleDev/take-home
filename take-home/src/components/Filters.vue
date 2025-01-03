<script setup>
  import SearchIcon from './icons/IconSearch.vue'
</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search">
    <button>
        <SearchIcon></SearchIcon>
    </button>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 1em;

  & input.filter {
    border-radius: 2em;

    padding: 0.4em 1em;
    background-color: transparent;

    line-height: normal;
    font-size: 1.3em;

    &[data-selected], &:hover {
      cursor: pointer;
      border-color: black;
      background-color: black;
      color: white;
      }
  }
}
</style>
