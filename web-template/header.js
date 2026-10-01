fetch("header-template.html")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Could not load header-template.html");
    }

    return response.text();
  })
  .then(function (data) {
    document.querySelector("#header-placeholder").innerHTML = data;

    // Update cart number
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.querySelector("#cart-count");

    if (cartCount) {
      const totalItems = cart.reduce(function (total, item) {
        return total + item.quantity;
      }, 0);

      cartCount.textContent = totalItems;
    }
  })
  .catch(function (error) {
    console.error("Header loading error:", error);
  });