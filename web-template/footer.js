fetch("footer-template.html")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Could not load footer-template.html");
    }
    return response.text();
  })
  .then(function (data) {
    document.querySelector("#footer-placeholder").innerHTML = data;
  })
  .catch(function (error) {
    console.error("Footer loading error:", error);
  });