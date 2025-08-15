function showTask(n) {
  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });
  event.currentTarget.classList.add("active");

  // Hide all task containers
  document.querySelectorAll(".task-container").forEach((container) => {
    container.style.display = "none";
  });

  // Show selected task
  document.getElementById(`task${n}`).style.display = "block";
}

function showResult(id, message, isSuccess = true) {
  let el = document.getElementById(id);
  el.textContent = message;
  el.className = isSuccess ? "result show success" : "result show error";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    el.classList.remove("show");
  }, 5000);
}

function isPositiveNumber(value) {
  return !isNaN(value) && value > 0;
}

// Age conversion history
let ageHistory = [];

// Task 1: Convert Age to Days
function convertAgeToDays() {
  let years = document.getElementById("age").value.trim();
  if (!isPositiveNumber(years)) {
    showResult("ageResult", "Please enter a valid positive age.", false);
    return;
  }

  years = parseFloat(years);
  const days = Math.round(years * 365.25); // Account for leap years
  const message = `${years} years = ${days} days (including leap years)`;
  showResult("ageResult", message);

  // Add to history
  ageHistory.unshift({
    years: years,
    days: days,
    date: new Date().toLocaleString(),
  });

  // Keep only last 5 items
  if (ageHistory.length > 5) {
    ageHistory.pop();
  }

  // Update history display
  updateAgeHistory();
}

function updateAgeHistory() {
  const historyContainer = document.getElementById("ageHistory");
  historyContainer.innerHTML =
    '<div class="history-title">Conversion History</div>';

  if (ageHistory.length === 0) {
    historyContainer.innerHTML +=
      '<div class="history-item">No conversions yet</div>';
    return;
  }

  ageHistory.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.textContent = `${item.years} years → ${item.days} days (${item.date})`;
    historyContainer.appendChild(historyItem);
  });
}

// Task 2: Convert Time
function convertTime() {
  let hrs = document.getElementById("hours").value.trim();
  const unit = document.getElementById("timeUnit").value;

  if (!isPositiveNumber(hrs)) {
    showResult("hoursResult", "Please enter valid positive hours.", false);
    return;
  }

  hrs = parseFloat(hrs);
  let result, unitName;

  switch (unit) {
    case "seconds":
      result = hrs * 3600;
      unitName = "seconds";
      break;
    case "minutes":
      result = hrs * 60;
      unitName = "minutes";
      break;
    case "days":
      result = hrs / 24;
      unitName = "days";
      break;
    default:
      result = hrs * 3600;
      unitName = "seconds";
  }

  showResult("hoursResult", `${hrs} hours = ${result.toFixed(2)} ${unitName}`);
}

// Task 3: Number Finder
function showScenario(num) {
  document.getElementById("scenario1").style.display = "none";
  document.getElementById("scenario2").style.display = "none";
  document.getElementById("scenario" + num).style.display = "block";
  document.getElementById("btn1").classList.remove("active");
  document.getElementById("btn2").classList.remove("active");
  document.getElementById("btn" + num).classList.add("active");
}

function findNextInArray() {
  let arrStr = document.getElementById("arrayInput").value.trim();
  let targetStr = document.getElementById("targetInput").value.trim();

  if (!arrStr || !targetStr) {
    showResult("arrayResult", "Please enter both array and target.", false);
    return;
  }

  let arr = arrStr.split(",").map((n) => n.trim());
  if (arr.some((n) => n === "" || isNaN(n))) {
    showResult("arrayResult", "Only numbers allowed in array.", false);
    return;
  }

  arr = arr.map(Number);
  let target = Number(targetStr);
  if (isNaN(target)) {
    showResult("arrayResult", "Target must be a number.", false);
    return;
  }

  let idx = arr.indexOf(target);
  if (idx === -1) {
    showResult("arrayResult", `Target ${target} not found in array.`, false);
    return;
  }
  if (idx === arr.length - 1) {
    showResult(
      "arrayResult",
      `Target ${target} is the last number in array.`,
      false
    );
    return;
  }

  showResult(
    "arrayResult",
    `Next number after ${target} is ${arr[idx + 1]} (at position ${idx + 1})`
  );
}

// Task 3: Single Number Finder (scenario 2)
function findNextNumber() {
  let input = document.getElementById("singleNumberInput").value.trim();

  if (!input) {
    showResult("singleResult", "Please enter a number.", false);
    return;
  }

  let num = Number(input);

  if (isNaN(num)) {
    showResult("singleResult", "Only valid numbers are allowed.", false);
    return;
  }

  if (Number.isInteger(num)) {
    showResult("singleResult", `Next integer after ${num} is ${num + 1}`);
  } else {
    let decimalPlaces = (input.split(".")[1] || "").length;
    let increment = Math.pow(10, -decimalPlaces);
    let nextNum = (num + increment).toFixed(decimalPlaces);
    showResult("singleResult", `Next number after ${num} is ${nextNum}`);
  }
}

// Task 4: Name Formatter
function formatName() {
  let name = document.getElementById("nameLower").value.trim();
  const format = document.getElementById("nameFormat").value;

  if (!name) {
    showResult("nameResult", "Please enter a name.", false);
    return;
  }
  if (!/^[A-Za-z\s\-']+$/.test(name)) {
    showResult(
      "nameResult",
      "Only letters, spaces, hyphens and apostrophes allowed.",
      false
    );
    return;
  }

  let formatted;
  switch (format) {
    case "capitalize":
      formatted = name
        .replace(/\s+/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
      break;
    case "uppercase":
      formatted = name.toUpperCase();
      break;
    case "lowercase":
      formatted = name.toLowerCase();
      break;
    case "initials":
      formatted = name
        .replace(/\s+/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + ".")
        .join(" ");
      break;
    default:
      formatted = name;
  }

  showResult("nameResult", formatted);
}

// Task 5: BMI Calculator
function calculateBMI() {
  let w = parseFloat(document.getElementById("weight").value);
  let h = parseFloat(document.getElementById("height").value);

  if (!isPositiveNumber(w) || !isPositiveNumber(h)) {
    showResult(
      "bmiResult",
      "Please enter valid positive weight and height.",
      false
    );
    return;
  }

  let bmi = (w / (h * h)).toFixed(2);
  let category;

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  showResult("bmiResult", `Your BMI is ${bmi} (${category})`);
}

// Task 6: Array Operations
function generateArray() {
  const size = parseInt(document.getElementById("arraySize").value) || 10;
  const min = parseInt(document.getElementById("minNum").value) || 1;
  const max = parseInt(document.getElementById("maxNum").value) || 100;

  if (min >= max) {
    alert("Minimum value must be less than maximum value");
    return;
  }

  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  // Display basic info
  document.getElementById("arrayOutput").textContent = arr.join(", ");
  document.getElementById("firstElement").textContent = arr[0];
  document.getElementById("lastElement").textContent = arr[arr.length - 1];
  document.getElementById("sortedArray").textContent = [...arr]
    .sort((a, b) => a - b)
    .join(", ");

  // Calculate and display stats
  document.getElementById("arrayLength").textContent = arr.length;
  document.getElementById("arrayMin").textContent = Math.min(...arr);
  document.getElementById("arrayMax").textContent = Math.max(...arr);
  document.getElementById("arrayAvg").textContent = (
    arr.reduce((a, b) => a + b, 0) / arr.length
  ).toFixed(2);
}

// Task 7: Calculator
document.addEventListener("DOMContentLoaded", function () {
  const num1 = document.getElementById("num1");
  const num2 = document.getElementById("num2");
  const operation = document.getElementById("operation");
  const sum = document.getElementById("sum");

  function calculate() {
    const val1 = parseFloat(num1.value) || 0;
    const val2 = parseFloat(num2.value) || 0;
    let result;

    switch (operation.value) {
      case "add":
        result = val1 + val2;
        break;
      case "subtract":
        result = val1 - val2;
        break;
      case "multiply":
        result = val1 * val2;
        break;
      case "divide":
        result = val2 !== 0 ? val1 / val2 : "∞";
        break;
      case "power":
        result = Math.pow(val1, val2);
        break;
      default:
        result = val1 + val2;
    }

    sum.value = typeof result === "number" ? result.toFixed(2) : result;
  }

  num1.addEventListener("input", calculate);
  num2.addEventListener("input", calculate);
  operation.addEventListener("change", calculate);
});
