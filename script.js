let problems = [];

async function loadProblems() {
  const response = await fetch("problems.json");
  problems = await response.json();
}

function loadRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * problems.length);
  const problem = problems[randomIndex];

  document.getElementById("question").innerText = problem.question;
  document.getElementById("explanation").innerText = "";
  
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  problem.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => {
      const user = localStorage.getItem("kDNA_user") || "기록 없음";
      if (index === problem.answer) {
        document.getElementById("explanation").innerText = `✅ 정답입니다!\n\n📘 해설: ${problem.explanation}\n📚 출처: ${problem.source}`;
      } else {
        document.getElementById("explanation").innerText = `❌ 오답입니다.\n\n📘 해설: ${problem.explanation}\n📚 출처: ${problem.source}`;
      }
    };
    choicesDiv.appendChild(btn);
  });
}

function startQuiz(name) {
  localStorage.setItem("kDNA_user", name);
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("username").innerText = `👤 사용자: ${name}`;
  loadRandomQuestion();
}

window.onload = async function () {
  await loadProblems();
  const user = localStorage.getItem("kDNA_user");
  if (user) {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("username").innerText = `👤 사용자: ${user}`;
    loadRandomQuestion();
  }
};
