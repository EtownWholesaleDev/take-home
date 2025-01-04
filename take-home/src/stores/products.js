import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    filterContains: "",
    filterCategory: ""
  }),
  getters: {
    allProducts: (state) => {
      return state.products;
    },
    filteredProducts: (state) => {
      let copy = state.products;
      if (state.filterCategory) {
        copy = copy.filter(
          product => product.category === state.filterCategory
        );
      }
      if (state.filterContains) {
        copy = copy.filter(
          product => product.title.toLowerCase().includes(state.filterContains.toLowerCase())
        )
      }
      
      return copy;
    },
    category: (state) => {
      return state.filterCategory;
    },
    contains: (state) => {
      return state.filterContains;
    }
  },
  actions: {
    setProducts(products) {
      this.products = products;
    },
    setFilterCategory(category) {
      this.filterCategory = category;
    },
    setFilterContains(contains) {
      this.filterContains = contains;
    }
  }
});