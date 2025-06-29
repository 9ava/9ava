// 후보 목록 (16강, images/1.jpg ~ 16.jpg)
const allCandidates = [
  { name: "귤", image: "images/귤.jpeg" },
  { name: "망고스틴", image: "images/망고스틴.jpeg" },
  { name: "멜론", image: "images/멜론.jpg" },
  { name: "무화과", image: "images/무화과.png" },
  { name: "바나나", image: "images/바나나.jpg" },
  { name: "배", image: "images/배.jpg" },
  { name: "복숭아", image: "images/복숭아.jpg" },
  { name: "사과", image: "images/사과.jpg" },
  { name: "수박", image: "images/수박.jpg" },
  { name: "애플망고", image: "images/애플망고.jpg" },
  { name: "자두", image: "images/자두.jpg" },
  { name: "자몽", image: "images/자몽.jpg" },
  { name: "파인애플", image: "images/파인애플.jpg" },
  { name: "파파야", image: "images/파파야.jpeg" },
  { name: "포도", image: "images/포도.jpg" },
  { name: "한라봉", image: "images/한라봉.jpg" }
];

let currentCandidates = [];
let nextRound = [];
let currentIndex = 0;
let round = 16;

let finalRunnerUp = null;
let semiFinalLosers = [];

const leftBox = document.getElementById("left");
const rightBox = document.getElementById("right");
const roundInfo = document.getElementById("round-info");
const finalWinner = document.getElementById("final-winner");
const winnerImg = document.getElementById("winner-img");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  currentCandidates = shuffle(allCandidates.slice());
  nextRound = [];
  currentIndex = 0;
  round = currentCandidates.length;
  finalRunnerUp = null;
  semiFinalLosers = [];

  document.getElementById("setup-area").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  document.getElementById("result").style.display = "none";

  showMatch();
}

function showMatch() {
  if (currentIndex >= currentCandidates.length) {
    if (nextRound.length === 1) {
      showResult(nextRound[0]);
      return;
    }

    currentCandidates = [...nextRound];
    nextRound = [];
    currentIndex = 0;
    round = currentCandidates.length;
  }

  roundInfo.innerText = `${round}강 - ${currentIndex / 2 + 1}번째 대결`;

  const left = currentCandidates[currentIndex];
  const right = currentCandidates[currentIndex + 1];

  leftBox.querySelector("img").src = left.image;
  leftBox.querySelector(".label").innerText = left.name;

  rightBox.querySelector("img").src = right.image;
  rightBox.querySelector(".label").innerText = right.name;

  leftBox.classList.remove("clicked");
  rightBox.classList.remove("clicked");
}

function selectCandidate(side) {
  const selected =
    side === "left"
      ? currentCandidates[currentIndex]
      : currentCandidates[currentIndex + 1];

  const eliminated =
    side === "left"
      ? currentCandidates[currentIndex + 1]
      : currentCandidates[currentIndex];

  if (round === 4) {
    semiFinalLosers.push(eliminated);
  }

  if (round === 2) {
    finalRunnerUp = eliminated;
  }

  document.getElementById(side).classList.add("clicked");

  setTimeout(() => {
    nextRound.push(selected);
    currentIndex += 2;
    showMatch();
  }, 300);
}

function showResult(winner) {
  document.getElementById("game-area").style.display = "none";
  document.getElementById("result").style.display = "block";

  finalWinner.innerText = winner.name;
  winnerImg.src = winner.image;

  const tbody = document.getElementById("ranking-body");
  tbody.innerHTML = "";

  function createRow(rank, person) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="padding:8px;">${rank}</td>
      <td style="padding:8px;">${person.name}</td>
      <td style="padding:8px;">
        <img src="${person.image}" alt="${person.name}" style="width: 60px; height: 60px; border-radius: 10px; object-fit: cover;">
      </td>
    `;
    tbody.appendChild(tr);
  }

  createRow("🥇 우승", winner);
  if (finalRunnerUp) createRow("🥈 준우승", finalRunnerUp);
  semiFinalLosers.forEach(p => createRow("🥉 공동 3위", p));
}

function restartGame() {
  location.reload();
}
