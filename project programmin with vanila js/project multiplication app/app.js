// Selector
const selectElement = (selector) => document.querySelector(selector);

const elements = {
  question: selectElement(".question"),
  answer: selectElement("input"),
  submitBtn: selectElement(".btn"),
  score: selectElement(".score"),
};

// Function
let multiply = "";

function randomQuestion() {
  const randomNum1 = Math.floor(Math.random() * 100) + 1; // 1-100
  const randomNum2 = Math.floor(Math.random() * 100) + 1; // 1-100
  elements.question.innerText = `What is ${randomNum1} multiplied by ${randomNum2}?`;
  multiply = randomNum1 * randomNum2;
}

randomQuestion();

let counter = JSON.parse(localStorage.getItem("score")) || 0;

// Event
elements.submitBtn.addEventListener("click", (e) => {
  if (multiply == elements.answer.value) {
    counter++;
    updateScore();
  } else {
    counter--;
    updateScore();
  }
});

function updateScore() {
  localStorage.setItem("score", JSON.stringify(counter));
}
elements.score.innerText = `Score: ${counter}`;
