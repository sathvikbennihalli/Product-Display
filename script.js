console.log("====================================");
console.log("Connected");
console.log("====================================");

const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".product-container");
  const tabs = document.querySelectorAll(".tab-button");

  const fetchAndDisplayProducts = async (category) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const categoryData = data.categories.find(
        (cat) => cat.category_name.toLowerCase() === category.toLowerCase()
      );
      const products = categoryData ? categoryData.category_products : [];

      productContainer.innerHTML = "";

      products.forEach((product) => {
        const discount =
          ((product.compare_at_price - product.price) /
            product.compare_at_price) *
          100;
        const badge = product.badge_text
          ? `<div class="badge">${product.badge_text}</div>`
          : "";
        const productCard = `
          <div class="product-card">
              ${badge}
              <img src="${product.image}" alt="${product.title}">
              <div class="title-vendor">
                  <span class="title">${
                    product.title
                  }</span><span class="dot"> &#8226; </span>
                  <span class="vendor">${product.vendor}</span>
              </div>
              <div class="price-line">
                  <p class="salePrice">Rs ${product.price} </p>
                  <p class="price"> Rs ${product.compare_at_price}</p>
                  <p class="discount">(${discount.toFixed(0)}% off)</p>
              </div>
              <button class="add-to-cart">Add to Cart</button>
          </div>
        `;
        productContainer.insertAdjacentHTML("beforeend", productCard);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchAndDisplayProducts("Men");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      fetchAndDisplayProducts(tab.dataset.category);
    });
  });
});
