document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});


function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            displayCategories(getAllCategories(data));
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = createProductElement(product);
        productGrid.appendChild(productElement);
    });
}

function createProductElement(product) {
    const productElement = document.createElement('article');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h2 class="title">${product.title}</h2>
        <p class="price">$${product.price}</p>
        <div></div>
    `;
    return productElement;
}

function getAllCategories(products) {
    const categories = products.map(product => product.category);
    return [...new Set(categories)];
}

function getProductsByCategory(category) {
    document.querySelector('.categories button.active')?.classList.remove('active');
    document.querySelector(`.categories button[name="${category.toLowerCase()}"]`)?.classList.add('active');
    if (category === 'all') {
        fetchProducts();
        return;
    }
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error fetching products:', error));
}

function displayCategories(categories) {
    const categoryList = document.querySelector('.categories');
    categoryList.innerHTML = '';
    const all = createCategoryElement('all');
    categoryList.appendChild(all);
    all.setAttribute('class', 'active');
    categories.forEach(category => {
        const categoryElement = createCategoryElement(category);
        categoryList.appendChild(categoryElement);
    });
}

function createCategoryElement(category) {
    const categoryElement = document.createElement('button');
    categoryElement.textContent = category;
    categoryElement.setAttribute('name', category.toLowerCase());   
    categoryElement.addEventListener('click', () => getProductsByCategory(category));
    return categoryElement;
}
