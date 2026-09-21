fetch("header-template.html")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Could not load header-template.html");
    }
    return response.text();
  })
  .then(function (data) {
    document.querySelector("#header-placeholder").innerHTML = data;
  })
  .catch(function (error) {
    console.error("Header loading error:", error);
  });