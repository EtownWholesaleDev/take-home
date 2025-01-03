/**
 * You are welcome to change and update any code within this file as part of your solution
 */

// Fetch products from the API and display them on the page
document.addEventListener("DOMContentLoaded", () => {
    fetchAllProducts();
});

// Fetch products from the API
async function fetchAllProducts() {
    try {
        // Fetch all products
        const response = await fetch("https://fakestoreapi.com/products");

        // Throw an error if fetch fails
        if (!response.ok)
            throw new Error(
                `Failed to fetch products. HTTP Status code: ${response.status}. Message: ${response.statusText}`
            );

        // Parse data and pass to helper functions
        const data = await response.json();
        displayProducts(data);
        displayCategories(data, getAllCategories(data));
    } catch (error) {
        // Handle and display error
        console.log(error);
        alert(error);
    }
}

// Get unique product categories from data returned by FetchAllProducts
function getAllCategories(products) {
    // Return an array of unique categories
    return [...new Set(products.map((product) => product.category))];
}

// Create button element for each category
function createButtonElement(category) {
    const button = document.createElement("button");
    // Set button data attribute and text to the category passed in
    button.dataset.category = category;
    button.textContent = category;
    return button;
}

// Display category buttons on the page
function displayCategories(data, categories) {
    // Get container element
    const categoryContainer = document.querySelector(".categories-container");

    // Create a button for each unique category and append to container
    categories.forEach((category) => {
        const button = createButtonElement(category);
        categoryContainer.appendChild(button);
    });

    // Handle click events
    handleClicks(data);
}

// Handle category button clicks and update product grid
function handleClicks(data) {
    // Get all category buttons
    const buttons = document.querySelectorAll("button[data-category]");

    // Setup click event for each button
    buttons.forEach((button) =>
        button.addEventListener("click", (e) => {
            // Get category from target element data attribute
            const selectedCategory = e.target.dataset.category;

            if (selectedCategory === "all") {
                displayProducts(data);
            } else {
                const relevantProducts = data.filter((product) => product.category === category);
                displayProducts(relevantProducts);
            }
        })
    );
}

// Display all products on the page based on the given data
function displayProducts(products) {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";
    products.forEach((product) => {
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
