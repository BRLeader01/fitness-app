document.getElementById("calorieForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const resultBox = document.getElementById("result");

  if (!age || !gender || !height || !weight || !activity) {
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = "⚠️ Please fill all fields correctly.";
    return;
  }

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const maintenance = Math.round(bmr * activity);
  const loseWeight = maintenance - 500;
  const gainWeight = maintenance + 500;

  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    🔥 <strong>Maintenance Calories:</strong> ${maintenance} kcal/day<br>
    ➖ To Lose Weight: ${loseWeight} kcal/day<br>
    ➕ To Gain Weight: ${gainWeight} kcal/day
  `;
});
// Load food data from external file
// Paste this if you're not using separate JS file
// Or add <script src="foodData.js"></script> in HTML before script.js

document.getElementById("nutritionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const foodInput = document.getElementById("foodItem").value.trim().toLowerCase();
  const grams = parseFloat(document.getElementById("foodGrams").value);
  const resultBox = document.getElementById("nutritionResult");

  if (!foodInput || isNaN(grams) || grams <= 0) {
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = "⚠️ Please enter valid food and grams.";
    return;
  }

  const food = foodData.find(item => item.name.toLowerCase() === foodInput);

  if (!food) {
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = "❌ Food item not found in database.";
    return;
  }

  const multiplier = grams / 100;
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    ✅ <strong>${food.name}</strong> (${grams}g):<br>
    🔥 Calories: ${(food.calories * multiplier).toFixed(1)} kcal<br>
    🥩 Protein: ${(food.protein * multiplier).toFixed(1)} g<br>
    🍞 Carbs: ${(food.carbs * multiplier).toFixed(1)} g<br>
    🧈 Fat: ${(food.fat * multiplier).toFixed(1)} g<br>
    🌾 Fiber: ${(food.fiber * multiplier).toFixed(1)} g
  `;
});
