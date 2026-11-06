// This is your blank canvas! Add any interactivity here —
// e.g. a button that reveals a message, a slideshow of artwork,
// a little animation, confetti on load, etc.

console.log("Happy birthday site loaded 🎂");

const eggy = document.getElementById("eggy");
const colors = ["#d47291", "#f5c04a", "#7ec8a9", "#6ba8e8", "#e8a0b4", "#f7a35c"];
let eggyClicks = 0;

function burstConfetti(x, y) {
  const pieceCount = 30;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * 360;
    const distance = 80 + Math.random() * 120;
    const driftX = Math.cos((angle * Math.PI) / 180) * distance;
    const driftY = Math.sin((angle * Math.PI) / 180) * distance - 60;
    const rotation = Math.random() * 720 - 360;
    const duration = 0.8 + Math.random() * 0.6;

    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.background = color;
    piece.style.setProperty("--drift-x", `${driftX}px`);
    piece.style.setProperty("--drift-y", `${driftY}px`);
    piece.style.setProperty("--rotation", `${rotation}deg`);
    piece.style.animationDuration = `${duration}s`;

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000);
  }
}

if (eggy) {
  eggy.style.cursor = "pointer";
  eggy.addEventListener("click", (e) => {
    burstConfetti(e.clientX, e.clientY);

    eggyClicks++;
    if (eggyClicks >= 5) {
      setTimeout(() => {
        window.location.href = "game.html";
      }, 400); // small delay so the last confetti burst is visible first
    }
  });
}
