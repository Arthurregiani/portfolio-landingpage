// ===============================
// 1. Remover "loading" após carregar
// ===============================
window.addEventListener("load", () => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
});

// ===============================
// 2. Matrix Effect (com limite)
// ===============================
const matrix = document.getElementById("matrix");
const matrixChars = 40; // antes era muito maior
if (matrix) {
    for (let i = 0; i < matrixChars; i++) {
        const char = document.createElement("div");
        char.className = "matrix-char";
        char.innerText = Math.random() > 0.5 ? "0" : "1";
        char.style.left = Math.random() * window.innerWidth + "px";
        char.style.animationDuration = (6 + Math.random() * 6) + "s";
        matrix.appendChild(char);
    }
}

// ===============================
// 3. Particles Effect (com limite)
// ===============================
const particles = document.getElementById("particles");
const particleCount = 20; // reduzido
if (particles) {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        const size = Math.random() * 5 + 2;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.animationDuration = (12 + Math.random() * 10) + "s";
        particles.appendChild(particle);
    }
}

// ===============================
// 4. Pausar animações fora da tela
// ===============================
const animatedElements = document.querySelectorAll(".matrix-char, .particle");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
    });
});
animatedElements.forEach(el => observer.observe(el));

// ===============================
// 5. Performance extra: resize handler
// Recalcula posições se a tela mudar
// ===============================
window.addEventListener("resize", () => {
    document.querySelectorAll(".matrix-char").forEach(char => {
        char.style.left = Math.random() * window.innerWidth + "px";
    });
    document.querySelectorAll(".particle").forEach(particle => {
        particle.style.left = Math.random() * window.innerWidth + "px";
    });
});

