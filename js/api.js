const API_URL =
  "https://script.google.com/macros/s/AKfycbyvX3EPb3gLhBCZiPFXKcyLX0McFXZBs4THr64TFa2juqnIMAGKsV5ilgzUGp4BSsvZyQ/exec";

async function getProdutos() {
  const res = await fetch(API_URL + "?action=produtos");
  return await res.json();
}
