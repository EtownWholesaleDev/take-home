/**
 * You are welcome to change and update any code within this file as part of your solution
 */


// State object
const appStates = {
    products: {
        value: [],
        filters: {
            contains: ""
        },
        display: function() {
            if (this.filters.contains) {
                const filteredProducts = this.value.filter(
                    product => product.title.toLowerCase().includes(this.filters.contains.toLowerCase())
                );
                displayProducts(filteredProducts)
            } else {
                displayProducts(this.value);
            }
        }
    }
};

// Fetch products from the API and display them on the page
document.addEventListener("DOMContentLoaded", async () => {
    [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
    displayFilters(categories);
    displayProducts(products);

    //Setup search button
    const searchElement = document.querySelector(".search");
    const searchTextElement = searchElement.querySelector("input[type=\"text\"");
    const searchButtonElement = searchElement.querySelector("button");
    const onSearch = () => {
        const searchText = searchTextElement.value;
        appStates.products.filters.contains = searchText;
        appStates.products.display();
    };
    searchButtonElement.addEventListener("click", onSearch);
    searchTextElement.addEventListener("keyup", e => {
        if (e.key === "Enter") {
            onSearch();
        }
    });
});

// Fetch products from the API
async function fetchProducts(category) {
    let requestUrl = "https://fakestoreapi.com/products";
    if (category) {
        requestUrl += `/category/${category}`;
    }
    return fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            appStates.products.value = data;
            return data;
        })
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
    const filtersElement = document.querySelector(".filters");
    categoriesWithAll.forEach(category => {
        const filterElement = createFilterElement(category);
        filterElement.addEventListener("click", () => {
            filtersElement.dataset.category = category;
            //Visually deselect filter buttons
            [...filtersElement.children].forEach(child => {
                delete child.dataset.selected;
            });

            filterElement.dataset.selected = "";

            fetchProducts(category === "all" ? null : category)
                .then(products => {
                    appStates.products.display();
                });
        });

        filtersElement.appendChild(filterElement);
    });
}

// Function to build each filter button element
function createFilterElement(category) {
    const filterElement = document.createElement("input");
    filterElement.setAttribute("type", "button");
    filterElement.setAttribute("value", category);
    filterElement.classList.add("filter");

    if (category === "all") {
        filterElement.dataset.selected = "";
    }

    return filterElement;
}