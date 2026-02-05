/* =========================
   PAGE 1 – VALENTINE
========================= */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (noBtn) {
  const moveButton = () => {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
  };

  noBtn.addEventListener("mouseenter", moveButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveButton();
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    createHearts();
    setTimeout(() => {
      window.location.href = "coupons.html";
    }, 1200);
  });
}

function createHearts() {
  const container = document.getElementById("hearts-container");
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }
}

/* =========================
   PAGE 2 – COUPONS
========================= */

const couponsData = [
  { id: "massage", text: "💆‍♀️ Massagem de corpo inteiro" },
  { id: "kisses", text: "💋 Muitos beijinhos onde quiseres" },
  { id: "movie", text: "🎬 Ver um filme" },
  { id: "hot", text: "🔥 Levar com dois dedos🥵🥵" },
  { id: "snack", text: "🥪 Fazer um lanchinho" },
  { id: "skincare", text: "🧴 Fazer skin care" },
  { id: "dinner", text: "🍷 Jantar romântico" },
  { id: "breakfast", text: "☕ Pequeno-almoço na cama" },
  { id: "bath", text: "🛁 Banho relaxante juntos" }
];

const grid = document.getElementById("couponsGrid");

if (grid) {
  couponsData.forEach(coupon => {
    const div = document.createElement("div");
    div.className = "coupon";
    div.innerText = coupon.text;

    if (localStorage.getItem(coupon.id)) {
      div.classList.add("used");
    }

    div.addEventListener("click", () => {
      if (div.classList.contains("used")) return;

      const confirmUse = confirm("Tens a certeza que queres usar este cupão? 😏");
      if (confirmUse) {
        div.classList.add("used");
        localStorage.setItem(coupon.id, "used");
        checkAllUsed();
      }
    });

    grid.appendChild(div);
  });

  // Sex Time coupon
  const sexDiv = document.createElement("div");
  sexDiv.className = "coupon";
  sexDiv.innerHTML = "😏 Sex time (ilimitado) <span class='counter'></span>";

  let count = Number(localStorage.getItem("sexCount")) || 0;
  const counter = sexDiv.querySelector(".counter");
  counter.innerText = count > 0 ? `(x${count})` : "";

  sexDiv.addEventListener("click", () => {
    const confirmUse = confirm("Tens a certeza que queres usar este cupão? 😏");
    if (confirmUse) {
      count++;
      localStorage.setItem("sexCount", count);
      counter.innerText = `(x${count})`;
    }
  });

  grid.appendChild(sexDiv);
  checkAllUsed();
}

function checkAllUsed() {
  const allUsed = couponsData.every(c =>
    localStorage.getItem(c.id)
  );

  if (allUsed) {
    document.getElementById("finalMessage").classList.remove("hidden");
  }
}