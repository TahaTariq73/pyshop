let cart = {};
if (localStorage.getItem("cart") == undefined) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
cart = JSON.parse(localStorage.getItem("cart"));

const cartItems = document.querySelector("#cart-items");
if (Object.entries(cart).length == 0) {
    cartItems.innerHTML = "<p> There is no item in card. </p>";
} else {
    cartItems.innerHTML = "";
}

for (let [key, value] of Object.entries(cart)) {
    let cartItem = document.createElement("li");
    cartItem.className = "py-1 px-2 border-b w-full flex justify-between";
    let cartItemQuantity = document.createElement("span");
    cartItemQuantity.className = "bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 rounded";
    cartItemQuantity.innerText = `${value}x`;
    cartItem.innerHTML = `${key}`;
    cartItem.append(cartItemQuantity);
    cartItems.append(cartItem);
}

const clearCart = document.querySelector("#clear-cart");
clearCart.addEventListener("click", () => {
    cartItems.innerHTML = "<p> There is no item in card. </p>";
    cart = {};
    localStorage.setItem("cart", JSON.stringify(cart));
})