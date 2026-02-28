const API_URL = "https://script.google.com/macros/s/AKfycbyvX3EPb3gLhBCZiPFXKcyLX0McFXZBs4THr64TFa2juqnIMAGKsV5ilgzUGp4BSsvZyQ/exec";
const MP_PUBLIC_KEY = "APP_USR-a6b65f4e-4923-4443-aaeb-dd31af6ddda0";

const mp = new MercadoPago(MP_PUBLIC_KEY);

let cart = [];
const productList = document.getElementById("product-list");

async function loadProducts(){
  const res = await fetch(API_URL);
  const products = await res.json();
  renderProducts(products);
}

function renderProducts(products){
  products.forEach(p=>{
    productList.innerHTML += `
      <div class="product">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p>R$ ${parseFloat(p.preco).toFixed(2)}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>
          Comprar
        </button>
      </div>
    `;
  });
}

function addToCart(product){
  product.qtd = 1;
  cart.push(product);
  updateCart();
}

function updateCart(){
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item=>{
    total += parseFloat(item.preco);
    cartItems.innerHTML += `
      <p>${item.nome} - R$ ${parseFloat(item.preco).toFixed(2)}</p>
    `;
  });

  cartTotal.innerText = total.toFixed(2);
  cartCount.innerText = cart.length;
  updateWhatsApp(total);
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("open");
}

function scrollCarousel(direction){
  productList.scrollBy({
    left: direction * 300,
    behavior: "smooth"
  });
}

function updateWhatsApp(total){
  let message = "Olá, quero comprar:\n";
  cart.forEach(item=>{
    message += `${item.nome} - R$ ${item.preco}\n`;
  });
  message += `Total: R$ ${total.toFixed(2)}`;

  document.getElementById("whatsapp-btn").href =
    `https://wa.me/5599999999999?text=${encodeURIComponent(message)}`;
}

function checkoutMP(){
  alert("Para Mercado Pago real, precisamos gerar preferência via backend seguro. Próximo passo é ativar isso com token privado.");
}

loadProducts();
