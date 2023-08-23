const items = [
    { name: "Jeans", price: 10, image: "item1.jpg" },
    { name: "Nike AF1 Low", price: 15, image: "item2.jpg" },
    { name: "High Fashion", price: 20, image: "item3.jpg" }
];

const itemList = document.getElementById("item-list");
const totalElement = document.getElementById("total");

let cart = [];

function updateCart() {
    itemList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
            <div class="item-controls">
                <span>${item.price}$</span>
                <button class="heart ${item.liked ? "liked" : ""}">&hearts;</button>
                <button class="minus">-</button>
                <span>${item.quantity}</span>
                <button class="plus">+</button>
                <button class="delete">Delete</button>
            </div>
        `;

        const plusBtn = itemElement.querySelector(".plus");
        plusBtn.addEventListener("click", () => {
            item.quantity++;
            updateCart();
        });

        const minusBtn = itemElement.querySelector(".minus");
        minusBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        });

        const deleteBtn = itemElement.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            cart = cart.filter(cartItem => cartItem !== item);
            updateCart();
        });

        const heartBtn = itemElement.querySelector(".heart");
        heartBtn.addEventListener("click", () => {
            item.liked = !item.liked;
            updateCart();
        });

        totalPrice += item.price * item.quantity;
        itemList.appendChild(itemElement);
    });

    totalElement.textContent = `Total: $${totalPrice}`;
}

// Initialize the cart with preselected items
cart = items.map(item => ({ ...item, quantity: 1, liked: false }));
updateCart();
