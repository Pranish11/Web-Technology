const menuData = [
    {
        id: 1,
        name: "Toasted Bread with Gravy",
        price: 12,
        category: "Appetizers",
        description: "Crispy bread topped with rich, savory gravy.",
        image: "images/toastedBread.jpg"
    },
    {
        id: 2,
        name: "Baked Chicken Legs",
        price: 22,
        category: "Mains",
        description: "Juicy chicken legs roasted with herbs and spices.",
        image: "images/Baked_chicken_legs.jpg"
    },
    {
        id: 3,
        name: "Chicken Dumplings",
        price: 10,
        category: "Appetizers",
        description: "Steamed dumplings filled with seasoned chicken.",
        image: "images/chickenDumpling.jpg"
    },
    {
        id: 4,
        name: "Chocolate Cake",
        price: 8,
        category: "Desserts",
        description: "Rich chocolate cake with creamy frosting.",
        image: "images/choclate_cake.jpg"
    },
    {
        id: 5,
        name: "Signature Cocktail",
        price: 14,
        category: "Drinks",
        description: "House‑crafted seasonal cocktail.",
        image: "images/cocktails.jpg"
    },
    {
        id: 6,
        name: "Orange Juice",
        price: 5,
        category: "Drinks",
        description: "Freshly squeezed orange juice.",
        image: "images/orange-juice.jpg"
    },
    {
        id: 7,
        name: "Pudding",
        price: 6,
        category: "Desserts",
        description: "Creamy pudding topped with caramel.",
        image: "images/Pudding.jpg"
    },
    {
        id: 8,
        name: "Taco",
        price: 9,
        category: "Mains",
        description: "Spiced beef taco with fresh toppings.",
        image: "images/Taco.webp"
    }
];

const menuContainer = document.getElementById("menu-container");
const cartSidebar = document.getElementById("cart-sidebar");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = [];

function renderMenu(items) {
    menuContainer.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="price">$${item.price.toFixed(2)}</div>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        menuContainer.appendChild(div);
    });
}

function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    const existing = cart.find(i => i.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                $${item.price.toFixed(2)} x ${item.quantity}
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <button onclick="changeQty(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})">x</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;
        if (category === "All") {
            renderMenu(menuData);
        } else {
            renderMenu(menuData.filter(item => item.category === category));
        }
    });
});

document.getElementById("cart-toggle").addEventListener("click", () => {
    cartSidebar.classList.add("open");
    overlay.classList.add("show");
});

document.getElementById("close-cart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function closeCart() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("show");
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) return;
    alert("Thank you for your order!");
    cart = [];
    updateCart();
    closeCart();
});

renderMenu(menuData);
