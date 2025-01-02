/**
 * You are welcome to change and update any code within this file as part of your solution
 */

// Fetch products from the API and display them on the page
document.addEventListener("DOMContentLoaded", async () => {
    [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
    displayFilters(categories);
    displayProducts(products);
});

// Fetch products from the API
async function fetchProducts(category) {
    let requestUrl = "https://fakestoreapi.com/products";
    if (category) {
        requestUrl += `/category/${category}`;
    }
    return fetch(requestUrl)
        .then(response => response.json())
        .catch(error => console.error("Error fetching products:", error));
}

// Fetch categories from the API, checking sessionStorage first
async function fetchCategories() {
    const categories = sessionStorage.getItem("productCategories");
    if (categories) return JSON.parse(categories);

    return fetch("https://fakestoreapi.com/products/categories")
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem("productCategories", JSON.stringify(data));
            return data;
        })
        .catch(error => console.error("Error fetching categories:", error));
}

// Display all products on the page based on the given data
function displayProducts(products) {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";
    products.forEach(product => {
        const productElement = createProductElement(product);
        productGrid.appendChild(productElement);
    });
}

// Function to build each product card element
function createProductElement(product) {
    const productElement = document.createElement("article");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h2 class="title">${product.title}</h2>
        <p class="price">$${product.price}</p>
        <div></div>
    `;
    return productElement;
}

// Display all category filter buttons
function displayFilters(categories) {
    let categoriesWithAll = ["all", ...categories];
    const filters = document.querySelector(".filters");
    categoriesWithAll.forEach(category => {
        const filterElement = createFilterElement(category);
        filters.appendChild(filterElement);
    });
}

// Function to build each filter button element
function createFilterElement(category) {
    const filterElement = document.createElement("input");
    filterElement.setAttribute("type", "button");
    filterElement.setAttribute("value", category);
    filterElement.classList.add("filter");
    return filterElement;
}