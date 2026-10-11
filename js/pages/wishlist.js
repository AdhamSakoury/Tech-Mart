import * as productService from "../services/productService.js";
import { getWishlist, removeFromWishlist } from "../services/userService.js";

export async function init() {
  const list = document.getElementById("wishlist-items");
  const emptyState = document.getElementById("wishlist-empty");
  const count = document.getElementById("wishlist-count");
  if (!list || !emptyState || !count) {
    throw new Error("Wishlist page elements are missing");
  }

  const productIds = getWishlist().map(String);
  const products = await productService.getAllProducts();
  const wishlistProducts = productIds
    .map((id) => products.find((product) => String(product.id) === id))
    .filter(Boolean);

  count.textContent = String(wishlistProducts.length);
  list.replaceChildren();
  emptyState.classList.toggle("hidden", wishlistProducts.length > 0);

  wishlistProducts.forEach((product) => {
    const item = document.createElement("article");
    item.className = "wishlist-item";

    const image = document.createElement("img");
    image.src = product.thumbnail || product.images?.[0] || "";
    image.alt = product.name;

    const details = document.createElement("div");
    details.className = "wishlist-item__details";

    const name = document.createElement("h2");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "wishlist-item__price";
    price.textContent = `$${Number(product.price).toFixed(2)}`;

    const actions = document.createElement("div");
    actions.className = "wishlist-item__actions";

    const viewLink = document.createElement("a");
    viewLink.href = `/pages/single-product.html?productId=${encodeURIComponent(product.id)}`;
    viewLink.className = "btn btn-primary";
    viewLink.textContent = "View product";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "btn btn-secondary";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      const result = removeFromWishlist(product.id);
      if (!result.success) {
        console.error("Could not remove wishlist item:", result.message);
        return;
      }
      item.remove();
      const remainingCount = list.children.length;
      count.textContent = String(remainingCount);
      emptyState.classList.toggle("hidden", remainingCount > 0);
    });

    details.append(name, price);
    actions.append(viewLink, removeButton);
    item.append(image, details, actions);
    list.append(item);
  });
}
