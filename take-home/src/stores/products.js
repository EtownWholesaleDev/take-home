import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
      products: [],
      filterContains: ""
  }),
  getters: {
      allProducts: (state) => {
          if (state.filterContains) {
              return state.products.filter(
                  product => product.title.toLowerCase().includes(state.filterContains.toLowerCase())
              );
          }
          return state.products;
      },
      filteredProducts: (state) => {
          if (state.filterContains) {
              return state.products.filter(
                  product => product.title.toLowerCase().includes(state.filterContains.toLowerCase())
              );
          }
          return state.products;
      }
  },
  actions: {
      setProducts(products) {
          this.products = products;
      },
      setFilterContains(filter) {
          this.filterContains = filter;
      }
  }
});