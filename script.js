//Task 1: Show/Hide Tasks
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

// Task 2: Convert Units
function convertAgeToDays() {
  let years = document.getElementById("age").value;
  showResult(
    "ageResult",
    years ? `${years} years = ${years * 365} days` : "Enter age."
  );
}

function convertHoursToSeconds() {
  let hrs = document.getElementById("hours").value;
  showResult(
    "hoursResult",
    hrs ? `${hrs} hours = ${hrs * 3600} seconds` : "Enter hours."
  );
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
  const arrayInput = document.getElementById("arrayInput").value;
  const targetInput = document.getElementById("targetInput").value;
  const array = arrayInput.split(",").map((n) => parseFloat(n.trim()));
  const target = parseFloat(targetInput);
  const index = array.indexOf(target);
  let message;

  if (arrayInput.trim() === "" || targetInput.trim() === "") {
    message = "Please enter both array and target number.";
  } else if (index === -1) {
    message = "Target number not found in the array.";
  } else if (index === array.length - 1) {
    message = "Target is the last number. No next number.";
  } else {
    message = `Next number after ${target} is ${array[index + 1]}`;
  }
  showResult("arrayResult", message);
}

function findNextNumber() {
  const input = document.getElementById("singleNumberInput").value;
  const num = parseFloat(input);
  let message;

  if (isNaN(num)) {
    message = "Please enter a valid number.";
  } else if (Number.isInteger(num)) {
    message = `Next number after ${num} is ${num + 1} (Integer)`;
  } else {
    const decimalPlaces = (input.split(".")[1] || "").length;
    const increment = Math.pow(10, -decimalPlaces);
    const nextNum = (num + increment).toFixed(decimalPlaces);
    message = `Next number after ${num} is ${nextNum} (Float)`;
  }
  showResult("singleResult", message);
}
