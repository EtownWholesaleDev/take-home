/**
 * You are welcome to change and update any code within this file as part of your solution
 */

// Fetch products from the API and display them on the page
    [products] = await Promise.all([fetchProducts()]);
document.addEventListener("DOMContentLoaded", async () => {
    displayProducts(products);
});

// Fetch products from the API
async function fetchProducts() {
    return fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .catch(error => console.error('Error fetching products:', error));
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

