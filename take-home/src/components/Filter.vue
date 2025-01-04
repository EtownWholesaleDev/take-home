<script setup>
const props = defineProps({
  category: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    required: false,
    default: false
  }
});
const emit = defineEmits(["select"])

const onSelect = (e) => {
  emit("select", props.category);
};
</script>

<template>
  <input type="button" class="filter" :value="category" @click="onSelect"/>
</template>

<style scoped lang="scss">
input.filter {
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
</style>
