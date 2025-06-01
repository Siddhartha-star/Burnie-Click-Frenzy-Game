const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");
    const timeDisplay = document.getElementById("time");
    let score = 0;
    let timeLeft = 30;
    let gameInterval, timerInterval;

    function getRandomPosition() {
      const x = Math.random() * (gameArea.clientWidth - 50);
      const y = Math.random() * (gameArea.clientHeight - 50);
      return { x, y };
    }

    function spawnTarget() {
      const { x, y } = getRandomPosition();
      const target = document.createElement("div");
      target.className = "target";
      target.innerText = "🔥";
      target.style.left = `${x}px`;
      target.style.top = `${y}px`;

      target.addEventListener("click", () => {
        score++;
        scoreDisplay.innerText = score;
        target.remove();
        spawnTarget();
      });

      gameArea.appendChild(target);

      setTimeout(() => {
        if (gameArea.contains(target)) {
          target.remove();
          spawnTarget();
        }
      }, 1200);
    }

    function startGame() {
      score = 0;
      timeLeft = 30;
      scoreDisplay.innerText = score;
      timeDisplay.innerText = timeLeft;
      gameArea.innerHTML = "";

      spawnTarget();

      timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          clearInterval(gameInterval);
          alert(`Game Over! Final Score: ${score}`);
        }
      }, 1000);
    }

    function resetGame() {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
      score = 0;
      timeLeft = 30;
      scoreDisplay.innerText = score;
      timeDisplay.innerText = timeLeft;
      gameArea.innerHTML = "";
    }