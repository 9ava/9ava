// 후보 목록 (16강, images/1.jpg ~ 16.jpg)
// 전체 후보 과일 목록 (이상형 월드컵에 사용할)
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

// 현재 라운드의 후보들, 다음 라운드에 진출할 후보들, 현재 대결 인덱스, 라운드 크기
let currentCandidates = [];
let nextRound = [];
let currentIndex = 0;
let round = 16;

// 결승에서 진 최후의 2인, 4강에서 진 후보들
let finalRunnerUp = null;
let semiFinalLosers = [];

// HTML 요소들
const leftBox = document.getElementById("left");
const rightBox = document.getElementById("right");
const roundInfo = document.getElementById("round-info");
const finalWinner = document.getElementById("final-winner");
const winnerImg = document.getElementById("winner-img");

// 배열을 무작위로 섞는 함수 (Fisher-Yates Shuffle 알고리즘)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 게임을 시작할 때 실행되는 함수
function startGame() {
  currentCandidates = shuffle(allCandidates.slice()); // 원본 배열 복사 후 섞기
  nextRound = [];
  currentIndex = 0;
  round = currentCandidates.length;
  finalRunnerUp = null;
  semiFinalLosers = [];

  // 초기 화면 구성 변경
  document.getElementById("setup-area").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  document.getElementById("result").style.display = "none";

  showMatch();
}

// 현재 대결 쌍을 화면에 보여주는 함수
function showMatch() {
  // 현재 라운드가 모두 끝난 경우
  if (currentIndex >= currentCandidates.length) {
    // 최종 승자 결정
    if (nextRound.length === 1) {
      showResult(nextRound[0]);
      return;
    }
    // 다음 라운드로 이동
    currentCandidates = [...nextRound];
    nextRound = [];
    currentIndex = 0;
    round = currentCandidates.length;
  }

  // 라운드 및 대결 번호 표시
  roundInfo.innerText = `${round}강 - ${currentIndex / 2 + 1}번째 대결`;

  // 좌/우 후보 정보 설정
  const left = currentCandidates[currentIndex];
  const right = currentCandidates[currentIndex + 1];

  leftBox.querySelector("img").src = left.image;
  leftBox.querySelector(".label").innerText = left.name;

  rightBox.querySelector("img").src = right.image;
  rightBox.querySelector(".label").innerText = right.name;

  // 선택 효과 제거
  leftBox.classList.remove("clicked");
  rightBox.classList.remove("clicked");
}

// 사용자가 좌/우 중 하나를 선택했을 때 실행
function selectCandidate(side) {
  const selected = side === "left" ? currentCandidates[currentIndex] : currentCandidates[currentIndex + 1];
  const eliminated = side === "left" ? currentCandidates[currentIndex + 1] : currentCandidates[currentIndex];

  // 4강 탈락자 저장
  if (round === 4) {
    semiFinalLosers.push(eliminated);
  }

  // 결승 탈락자 저장
  if (round === 2) {
    finalRunnerUp = eliminated;
  }

  // 클릭한 쪽에 시각적 효과 추가
  document.getElementById(side).classList.add("clicked");

  // 0.3초 후 다음 대결로 넘어감
  setTimeout(() => {
    nextRound.push(selected);
    currentIndex += 2;
    showMatch();
  }, 300);
}

// 최종 결과 화면을 보여주는 함수
function showResult(winner) {
  document.getElementById("game-area").style.display = "none";
  document.getElementById("result").style.display = "block";

  // 우승자 표시
  finalWinner.innerText = winner.name;
  winnerImg.src = winner.image;

  // 랭킹 테이블 초기화 및 생성
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

// 게임 다시 시작 (페이지 새로고침)
function restartGame() {
  location.reload();
}
