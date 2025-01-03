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
.search {
  display: flex;
  align-items: center;
  border: solid 1px #313131;
  border-radius: 100px;

  & :focus-within {
    outline: solid 1px #000000;
  }

  & input {
    padding: 0.5em;
    border-radius: 5px;
    border: none;
    margin-right: 1em;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #313131;
    }
  } 

  & button {
    background-color: transparent;
    color: white;
    padding: 0.5em 1em;
    border: none;
    border-radius: 100px;
    cursor: pointer;
  }
}
</style>
