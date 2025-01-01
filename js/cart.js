
// Display current cart on page load
export function setupCartPage() {   
    document.addEventListener('DOMContentLoaded', () => {
        displayCart()
        listenForCartChanges()
    })
}

// Save new cart to Local Storage
export function setCartLocalStorage(cart) {
    const cartValid = isValidCart(cart)
    if (cartValid) localStorage.setItem('ShoppingCart', JSON.stringify(cart))
    else localStorage.setItem('ShoppingCart', '[]')
}

// Get cart from Local Storage
export function getCartLocalStorage() {
    const localCart = JSON.parse(localStorage.getItem('ShoppingCart'))
    if (!localCart) {
        setCartLocalStorage([])
        return []
    }

    const cartValid = isValidCart(localCart)
    if (cartValid) return localCart
    else {
        setCartLocalStorage([])
        return []
    }
}

// update cart if it changes in another tab
function listenForCartChanges() {
    window.addEventListener('storage', e => {
        if (e.key === 'ShoppingCart') displayCart()
    })
}

// Display all items in the cart
function displayCart() {
    const cart = getCartLocalStorage()
    const cartItems = document.querySelector('.cart-items')
    cartItems.innerHTML = ''
    let cartTotal = 0
    cart.forEach(item => {
        const cartElement = createCartElement(item)
        cartItems.appendChild(cartElement)
        cartTotal += item.price * item.quantity
    })

    const cartTotalElement = document.querySelector('.cart-total')
    if (cartTotal > 0) cartTotalElement.innerHTML = `Total: $${cartTotal.toFixed(2)}`
    else cartTotalElement.innerHTML = ''
}

// Function to build each cart element
function createCartElement(item) {
    const itemElement = document.createElement('article')
    itemElement.classList.add('cart-item')
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-info">
            <h4>${item.title}</h4>
            <p>$${item.price}</p>
            <div class="cart-item-btns">
                <div class="quantity">
                    <p class="quantity-minus">-</p>
                    <p class="quantity-number">${item.quantity}</p>
                    <p class="quantity-plus">+</p>
                </div>
                <button class="remove-from-cart"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/></svg></button>
            </div>
        </div>
    `
    itemElement.querySelector('.remove-from-cart').addEventListener('click', () => {
        removeCartItem(item)
        displayCart()
    })
    itemElement.querySelector('.quantity-minus').addEventListener('click', () => {
        decreaseItemQuantity(item)
        displayCart()
    })
    itemElement.querySelector('.quantity-plus').addEventListener('click', () => {
        increaseItemQuantity(item)
        displayCart()
    })
    
    return itemElement
}

// Check if object is a valid cart object
function isValidCartItem(cartItem) {
    const template = {
        id: 'number',
        title: 'string',
        price: 'number',
        description: 'string',
        category: 'string',
        image: 'string',
        quantity: 'number'
    }

    if (typeof cartItem !== 'object' || cartItem === null) return false

    for (const key in template) {
        if (!cartItem.hasOwnProperty(key) || typeof cartItem[key] !== template[key]) return false
    }

    return true
}

// Check if Cart is valid
function isValidCart(cart) {
    if (!Array.isArray(cart)) return false
    return cart.every(isValidCartItem)
}

// Remove item from cart
function removeCartItem(item) {
    const cart = getCartLocalStorage()
    const index = cart.findIndex(cartItem => cartItem.id === item.id)
    if (index !== -1) cart.splice(index, 1)
    setCartLocalStorage(cart)
}

// Increase item quantity by 1
function increaseItemQuantity(item) {
    const cart = getCartLocalStorage()
    const cartItem = cart.find(cartItem => cartItem.id === item.id)
    if (cartItem) cartItem.quantity += 1
    setCartLocalStorage(cart)
}

// Increase decrease quantity by 1
function decreaseItemQuantity(item) {
    const cart = getCartLocalStorage()
    const cartItem = cart.find(cartItem => cartItem.id === item.id)
    if (cartItem && cartItem.quantity > 1) cartItem.quantity -= 1
    setCartLocalStorage(cart)
}