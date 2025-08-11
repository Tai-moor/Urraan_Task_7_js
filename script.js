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

// Task 1: Convert Age to Days
function convertAgeToDays() {
  var years = document.getElementById("age").value;
  if (years) {
    showResult("ageResult", years + " years = " + years * 365 + " days");
  } else {
    showResult("ageResult", "Enter age.");
  }
}

// Task 2 Convert Hours to Seconds
function convertHoursToSeconds() {
  var hrs = document.getElementById("hours").value;
  if (hrs) {
    showResult("hoursResult", hrs + " hours = " + hrs * 3600 + " seconds");
  } else {
    showResult("hoursResult", "Enter hours.");
  }
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
  const arrayInput = document.getElementById("arrayInput").value.trim();
  const targetInput = document.getElementById("targetInput").value.trim();

  const array = arrayInput.split(",").map(function (n) {
    return parseFloat(n.trim());
  });
  const target = parseFloat(targetInput);
  const index = array.indexOf(target);

  let message = "";

  if (!arrayInput || !targetInput) {
    message = "Please enter both array and target number.";
  } else if (index === -1) {
    message = "Target number not found in the array.";
  } else if (index === array.length - 1) {
    message = "Target is the last number. No next number.";
  } else {
    message = "Next number after " + target + " is " + array[index + 1];
  }

  showResult("arrayResult", message);
}

function findNextNumber() {
  const input = document.getElementById("singleNumberInput").value.trim();
  const num = parseFloat(input);

  let message = "";

  if (isNaN(num)) {
    message = "Please enter a valid number.";
  } else if (Number.isInteger(num)) {
    message = "Next number after " + num + " is " + (num + 1) + " (Integer)";
  } else {
    const decimalPlaces = (input.split(".")[1] || "").length;
    const increment = Math.pow(10, -decimalPlaces);
    const nextNum = (num + increment).toFixed(decimalPlaces);
    message = "Next number after " + num + " is " + nextNum + " (Float)";
  }

  showResult("singleResult", message);
}




// Task 4: Name Capitalization
function capitalizeName() {
  let name = document.getElementById("nameLower").value.trim();
  let cap;

  if (name) {
    cap = name
      .split(/\s+/)
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  } else {
    cap = "Enter name.";
  }

  showResult("nameResult", cap);
}



// Task 5: BMI Calculator
function calculateBMI() {
  let w = parseFloat(document.getElementById("weight").value);
  let h = parseFloat(document.getElementById("height").value);
  if (w > 0 && h > 0) {
    let bmi = (w / (h * h)).toFixed(2);
    showResult("bmiResult", `Your BMI is ${bmi}`);
  } else {
    showResult("bmiResult", "Enter valid weight and height.");
  }
}

// Task 6: Array Operations
function generateArray() {
  let length = Math.floor(Math.random() * 6) + 5;
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
    if (num1.value === "" || num2.value === "") {
      sum.value = NaN;
    } else {
      sum.value = parseInt(num1.value) + parseInt(num2.value);
    }
  }

  num1.addEventListener("input", updateSum);
  num2.addEventListener("input", updateSum);
});
