document.addEventListener("DOMContentLoaded", async () => {
  const lista = document.getElementById("product-list");
  const produtos = await getProdutos();

  produtos.forEach((p) => {
    lista.innerHTML += `
      <div class="card">
        <img src="${p.imagem}" width="100%">
        <h3>${p.nome}</h3>
        <p class="price">R$ ${p.preco}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>
        Comprar
        </button>
      </div>
    `;
  });
});

async function comprar(id) {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "baixar",
      id: id,
      qtd: 1,
    }),
  });

  alert("Produto adicionado!");
}
