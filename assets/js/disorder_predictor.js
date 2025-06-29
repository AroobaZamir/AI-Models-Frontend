const questions = [
  "Do you often feel anxious?",
  "Have you had sudden panic attacks?",
  "Do you breathe rapidly under stress?",
  "Do you sweat a lot when anxious?",
  "Do you struggle to focus?",
  "Do you have trouble sleeping?",
  "Do you find daily tasks hard to manage?",
  "Do you feel hopeless about the future?",
  "Do you often feel irritable?",
  "Do you feel distant from others?",
  "Do you have sudden mood swings?",
  "Do you often feel tired?",
  "Do you struggle with decision-making?",
  "Do you avoid social gatherings?",
  "Do you no longer enjoy past hobbies?",
  "Do you often feel restless?",
  "Has your appetite changed?",
  "Do you frequently feel guilty?",
  "Have you seen or heard things that aren't there?",
  "Do you engage in repetitive rituals?",
  "Does your mood change with seasons?",
  "Do you get bursts of high energy?",
  "Do you have frequent nightmares?",
  "Do you avoid things you once enjoyed?",
  "Do you have intrusive negative thoughts?",
  "Do you find it hard to focus?",
  "Do you blame yourself often?",
];

let currentIndex = 0;
const questionsPerPage = 4;
const answers = {}; // Store user responses

const questionContainer = document.getElementById("question-container");
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
const printButton = document.getElementById("print-button");
const predictButton = document.getElementById("predict-button");
const predictionSection = document.querySelector(".prediction-section");

function renderQuestions() {
  questionContainer.innerHTML = "";

  for (let i = 0; i < questionsPerPage; i++) {
    const questionIndex = currentIndex + i;
    if (questionIndex >= questions.length) break;

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Retrieve previously selected value if exists
    const storedAnswer = answers[questionIndex] || "";

    questionDiv.innerHTML = `
        <p>${questionIndex + 1}. ${questions[questionIndex]}</p>
        <div class="options">
          <label>
            <input type="radio" name="q${questionIndex}" value="yes" ${
      storedAnswer === "yes" ? "checked" : ""
    }/> Yes
          </label>
          <label>
            <input type="radio" name="q${questionIndex}" value="no" ${
      storedAnswer === "no" ? "checked" : ""
    }/> No
          </label>
        </div>
      `;

    // Store answer when user selects an option
    questionDiv.querySelectorAll("input[type='radio']").forEach((input) => {
      input.addEventListener("change", (e) => {
        answers[questionIndex] = e.target.value;
      });
    });

    questionContainer.appendChild(questionDiv);
  }

  // Show or hide back button
  backButton.style.visibility = currentIndex === 0 ? "hidden" : "visible";

  // If on last page, show "Print" and "Predict" sections
  if (currentIndex + questionsPerPage >= questions.length) {
    nextButton.style.display = "none";
    printButton.style.display = "inline-block";
    predictionSection.style.display = "block"; // Show predict button and text area
  } else {
    nextButton.style.display = "inline-block";
    printButton.style.display = "none";
    predictionSection.style.display = "none"; // Hide predict button on previous pages
  }
}

// Event Listeners
nextButton.addEventListener("click", () => {
  currentIndex += questionsPerPage;
  renderQuestions();
});

backButton.addEventListener("click", () => {
  currentIndex -= questionsPerPage;
  renderQuestions();
});

// Print functionality
printButton.addEventListener("click", () => {
  window.print();
});

// Initial rendering
renderQuestions();
