function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(produto) {
  let cart = getCart();
  cart.push(produto);
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();
