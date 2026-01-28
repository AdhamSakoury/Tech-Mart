// load header and footer partials
import { loadPartial } from "./core/utils.js";
import {
  initHeader
} from "./components/header.js";


document.addEventListener("DOMContentLoaded", async () => {
  loadPartial("header", "../pages/partials/header.html");
  loadPartial("footer", "../pages/partials/footer.html");
  await loadPageModule(document.body.dataset.page);
  console.log(document.body.dataset.page);
  initHeader();
});

// Dynamically load page-specific module
const loadPageModule = async (pageName) => {
  try {
    switch (pageName) {
      case "index":
        const page = await import("./pages/index.js");
        await page.init();
        break;

      case "products":
        const { initProductsPage } = await import("./pages/products.js");
        await initProductsPage();
        break;

      case "product-detail":
        const { initProductDetailPage } =
          await import("./pages/productDetail.js");
        await initProductDetailPage();
        break;

      case "cart":
        const { initCartPage } = await import("./pages/cart.js");
        initCartPage();
        break;

      case "checkout":
        const { initCheckoutPage } = await import("./pages/checkout.js");
        initCheckoutPage();
        break;

      default:
        console.log(`No specific initialization for page: ${pageName}`);
    }
  } catch (error) {
    console.error(`Error loading page module for ${pageName}:`, error);
  }
};
