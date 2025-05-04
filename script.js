let problems = [];

fetch("problems.json")
  .then((res) => res.json())
  .then((data) => {
    problems = data;
    loadRandomQuestion();
  });

function loadRandomQuestion() {
  const quiz = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const explanationEl = document.getElementById("explanation");

  explanationEl.textContent = "";
  choicesEl.innerHTML = "";

  const randomIndex = Math.floor(Math.random() * problems.length);
  const problem = problems[randomIndex];

  questionEl.textContent = `[문제 ${randomIndex + 1}] ${problem.question}`;

  problem.choices.forEach((choice, idx) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => {
      if (idx === problem.answer) {
        explanationEl.textContent = "✅ 정답입니다! " + problem.explanation;
        explanationEl.style.color = "green";
      } else {
        explanationEl.textContent = "❌ 오답입니다. " + problem.explanation;
        explanationEl.style.color = "crimson";
      }
    };
    choicesEl.appendChild(button);
  });
}
