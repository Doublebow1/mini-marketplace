async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    console.log(products);
    displayProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("products").innerHTML =
      "<p>Error loading products</p>";
  }
}

function displayProducts(products) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  const productsList = document.createElement("ul");
  productsList.className = "products-list";

  products.forEach((product, index) => {
    const productCard = document.createElement("li");
    if (index % 2 !== 0) {
      productCard.className = "product-card right";
    } else {
      productCard.className = "product-card left";
    }
    productCard.innerHTML = `
      <img src="${product.image}" alt="${
      product.title
    }" class="product-image" />
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" data-id="${
        product.id
      }" data-product="${JSON.stringify(product).replace(/"/g, "&quot;")}">
        Add to Cart
      </button>
    `;

    productsList.appendChild(productCard);
  });

  productsContainer.appendChild(productsList);

  // Добавляем слушатели для кнопок
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = JSON.parse(e.target.dataset.product);
      addToCart(product);
    });
  });
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
    console.log(cart);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  // Уведомляем React об обновлении
  window.dispatchEvent(new Event("cart-updated"));
}

// Загружаем товары при загрузке страницы
document.addEventListener("DOMContentLoaded", loadProducts);
