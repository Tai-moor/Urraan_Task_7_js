function showTask(n) {
  document
    .querySelectorAll(".task")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById("task" + n).classList.add("active");
}

function showResult(id, message) {
  let el = document.getElementById(id);
  el.textContent = message;
  el.classList.add("show");
}
function isPositiveNumber(value) {
  return !isNaN(value) && value > 0;
}

// Task 1: Convert Age to Days
function convertAgeToDays() {
  let years = document.getElementById("age").value.trim();
  if (!isPositiveNumber(years)) {
    showResult("ageResult", "Please enter a valid positive age.");
    return;
  }
  showResult("ageResult", `${years} years = ${years * 365} days`);
}

// Task 2: Convert Hours to Seconds
function convertHoursToSeconds() {
  let hrs = document.getElementById("hours").value.trim();
  if (!isPositiveNumber(hrs)) {
    showResult("hoursResult", "Please enter valid positive hours.");
    return;
  }
  showResult("hoursResult", `${hrs} hours = ${hrs * 3600} seconds`);
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

  if (!arrStr || !targetStr)
    return showResult("arrayResult", "Enter array and target.");

  let arr = arrStr.split(",").map((n) => n.trim());
  if (arr.some((n) => n === "" || isNaN(n)))
    return showResult("arrayResult", "Only numbers allowed in array.");

  arr = arr.map(Number);
  let target = Number(targetStr);
  if (isNaN(target))
    return showResult("arrayResult", "Target must be a number.");

  let idx = arr.indexOf(target);
  if (idx === -1) return showResult("arrayResult", "Target not found.");
  if (idx === arr.length - 1)
    return showResult("arrayResult", "Target is last number.");

  showResult("arrayResult", `Next number after ${target} is ${arr[idx + 1]}`);
}

// Task 3: Single Number Finder( scenario 2 )
function findNextNumber() {
  let input = document.getElementById("singleNumberInput").value.trim();

  if (!input) return showResult("singleResult", "Please enter a number.");

  let num = Number(input);

  if (isNaN(num))
    return showResult("singleResult", "Only valid numbers are allowed.");

  if (Number.isInteger(num)) {

    showResult(
      "singleResult",
      `Next number after ${num} is ${num + 1} (Integer)`
    );
  } else {
  
    let decimalPlaces = (input.split(".")[1] || "").length;
    let increment = Math.pow(10, -decimalPlaces);
    let nextNum = (num + increment).toFixed(decimalPlaces);
    showResult(
      "singleResult",
      `Next number after ${num} is ${nextNum} (Float)`
    );
  }
}
// Task 4: Name Capitalization
function capitalizeName() {
  let name = document.getElementById("nameLower").value.trim();

  if (!name) return showResult("nameResult", "Enter a name.");
  if (!/^[A-Za-z\s]+$/.test(name))
    return showResult("nameResult", "Only letters and spaces allowed.");

  let cap = name
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  showResult("nameResult", cap);
}

// Task 5: BMI Calculator
function calculateBMI() {
  let w = parseFloat(document.getElementById("weight").value);
  let h = parseFloat(document.getElementById("height").value);

  if (!isPositiveNumber(w) || !isPositiveNumber(h)) {
    showResult("bmiResult", "Enter valid positive weight and height.");
    return;
  }

  let bmi = (w / (h * h)).toFixed(2);
  showResult("bmiResult", `Your BMI is ${bmi}`);
}

// Task 6: Array Operations
function generateArray() {
  let length = Math.floor(Math.random() * 2) + 5;
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }
  document.getElementById("arrayOutput").textContent = arr.join(", ");
  document.getElementById("firstElement").textContent = arr[0];
  document.getElementById("lastElement").textContent = arr[arr.length - 1];
}

// Task 7: Sum of Two Numbers
document.addEventListener("DOMContentLoaded", function () {
  let num1 = document.getElementById("num1");
  let num2 = document.getElementById("num2");
  let sum = document.getElementById("sum");

  function updateSum() {
    if (
      num1.value.trim() === "" ||
      num2.value.trim() === "" ||
      isNaN(num1.value) ||
      isNaN(num2.value)
    ) {
      sum.value = "NaN";
      return;
    }
    sum.value = parseFloat(num1.value) + parseFloat(num2.value);
  }

  num1.addEventListener("input", updateSum);
  num2.addEventListener("input", updateSum);
});
