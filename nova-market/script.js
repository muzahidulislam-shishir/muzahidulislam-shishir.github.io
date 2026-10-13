
const products = [
  {
    id: 1,
    name: "Studio Wireless Headphones",
    category: "Tech",
    price: 79.99,
    rating: 4.8,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Everyday Classic Sneakers",
    category: "Style",
    price: 64.50,
    rating: 4.7,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Minimal Travel Backpack",
    category: "Accessories",
    price: 49.00,
    rating: 4.6,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Smart Everyday Watch",
    category: "Tech",
    price: 99.00,
    rating: 4.9,
    badge: "TOP RATED",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Modern Sunglasses",
    category: "Style",
    price: 29.99,
    rating: 4.5,
    badge: "",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Compact Digital Camera",
    category: "Tech",
    price: 119.00,
    rating: 4.8,
    badge: "FEATURED",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Daily Carry Tote",
    category: "Accessories",
    price: 34.00,
    rating: 4.4,
    badge: "",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Essential Running Shoes",
    category: "Style",
    price: 72.00,
    rating: 4.7,
    badge: "JUST IN",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80"
  }
];

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("product-search");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");
const cartCount = document.getElementById("cart-count");
const toast = document.getElementById("toast");

let activeCategory = "All";
let cart = [];
let toastTimer;

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x500/f0eee8/20211f?text=NOVA+MARKET'"
        >
        ${product.badge
          ? `<span class="product-badge">${product.badge}</span>`
          : ""}
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <div class="product-rating">★ ${product.rating} / 5</div>

        <div class="product-bottom">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="add-button" data-add="${product.id}">
            Add to cart +
          </button>
        </div>
      </div>
    </article>
  `).join("");

  resultCount.textContent =
    `Showing ${filteredProducts.length} of ${products.length} products`;

  emptyMessage.hidden = filteredProducts.length !== 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function updateCart() {
  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity, 0
  );
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const productId = Number(button.dataset.add);
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  showToast(`${product.name} added to your cart!`);
});

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    document.querySelectorAll(".category-card").forEach((card) => {
      card.classList.toggle("active", card === button);
    });

    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

document.getElementById("search-toggle").addEventListener("click", () => {
  searchInput.focus();
  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("cart-button").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add a product to get started!");
    return;
  }

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  showToast(`Cart: ${itemCount} item(s) · Subtotal: $${subtotal.toFixed(2)}`);
});

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("newsletter-email");
  const message = document.getElementById("newsletter-message");

  message.textContent =
    `Thanks! The demo form accepted ${emailInput.value}.`;
  emailInput.value = "";
});

document.getElementById("current-year").textContent =
  new Date().getFullYear();

renderProducts();
updateCart();
