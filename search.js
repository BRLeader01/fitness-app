const searchFood = (query) => {
  query = query.toLowerCase();
  return foodData.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.keywords.some(keyword => keyword.toLowerCase().includes(query))
  );
};
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("foodItem");
  const suggestionsBox = document.getElementById("suggestions");

  input.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (query.length === 0) return;

    const matches = foodData.filter(food =>
      food.name.toLowerCase().includes(query)
    );

    matches.slice(0, 10).forEach(food => {
      const div = document.createElement("div");
      div.textContent = food.name;
      div.addEventListener("click", () => {
        input.value = food.name;
        suggestionsBox.innerHTML = "";
      });
      suggestionsBox.appendChild(div);
    });
  });

  document.addEventListener("click", (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== input) {
      suggestionsBox.innerHTML = "";
    }
  });
});
