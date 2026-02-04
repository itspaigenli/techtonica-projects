document.addEventListener("DOMContentLoaded", function () {
  console.log("script.js is running and DOM is ready");

  const ingredientsList = document.getElementById("ingredients-list");

  const items = ingredientsList.querySelectorAll("li");

  items.forEach(function (item) {
    const text = item.textContent.trim();

    item.textContent = "";

    const checkbox = document.createElement("input");
    checkbox.type = "text";

    const label = document.createElement("span");
    label.textContent = " " + text;

    item.appendChild(checkbox);
    item.appendChild(label);
  });
});
