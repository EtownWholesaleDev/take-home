/**
 * You are welcome to change and update any code within this file as part of your solution
 */

import { getCartLocalStorage, setCartLocalStorage } from "./cart.js";

// Fetch products from the API and display them on the page
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCategories()
    setActiveCategory('all')
})

// Fetch products from the API
function fetchProducts() {
    setProductsLoading()
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            endProductsLoading()
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Display all products on the page based on the given data
function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = createProductElement(product);
        productGrid.appendChild(productElement);
    });
}

// Function to build each product card element
function createProductElement(product) {
    const productElement = document.createElement('article');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <hr>
        <div>
            <h2 class="title">${product.title}</h2>
            <p class="price">$${product.price}</p>
        </div>
        <button class="add-to-cart">Add to Cart</button>
    `
    productElement.querySelector('.add-to-cart').addEventListener('click', e => addProductToCart(product, e.currentTarget))

    return productElement;
}

// Display Loading Spinner
function setProductsLoading() {
    const productGrid = document.querySelector('.product-grid')
    const productsLoader = document.querySelector('.products-loader')
    productGrid.style.display = 'none'
    productsLoader.style.display = 'flex'
}
// Hide Loading Spinner
function endProductsLoading() {
    const productGrid = document.querySelector('.product-grid')
    const productsLoader = document.querySelector('.products-loader')
    productGrid.style.display = 'grid'
    productsLoader.style.display = 'none'
}


// Update UI to selected category
function setActiveCategory(category) {
    fetchProductsFromCategory(category)

    const categoryElements = document.querySelectorAll(`.category`)
    categoryElements.forEach(element => element.classList.remove('selected-category'))

    const categoryElement = document.querySelector(`.category[data-category="${category}"]`)
    if (categoryElement) categoryElement.classList.add('selected-category')
}

// Fetch categories from the API
async function fetchCategories() {
    await fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(data => {
            displayCategories(data)
        })
        .catch(error => console.error('Error fetching categories:', error))
}

// Fetch products for category from the API
function fetchProductsFromCategory(category) {
    if (category === 'all') fetchProducts()
    else {
        setProductsLoading()
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                displayProducts(data)
                endProductsLoading()
            })
            .catch(error => console.error('Error fetching products:', error))
    }
}

// Display category buttons
function displayCategories(categories) {
    categories.unshift('all')
    const categoriesContainer = document.querySelector('.categories')
    categoriesContainer.innerHTML = ''
    categories.forEach(category => {
        const categoryElement = createCategoryElement(category)
        categoriesContainer.appendChild(categoryElement)
        categoryElement.addEventListener('click', () => setActiveCategory(category))
    })
}

// Function to build each category element
function createCategoryElement(category) {
    const categoryElement = document.createElement('button')
    categoryElement.classList.add('category')
    categoryElement.innerText = category
    categoryElement.setAttribute('data-category', category)
    return categoryElement
}

// Add an item to the cart
function addProductToCart(product, addToCartBtn) {
    addToCartBtn.setAttribute('disabled', '')
    addToCartBtn.innerText = 'Added'

    const cart = getCartLocalStorage()
    
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) existingItem.quantity += 1
    else cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        quantity: 1
    })
    
    setCartLocalStorage(cart)
    setTimeout(() => {
        addToCartBtn.innerText = 'Add to Cart'
        addToCartBtn.removeAttribute('disabled')
    }, 1000)
}