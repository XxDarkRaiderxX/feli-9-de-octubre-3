// =====================================
// Flores, pétalos y brillos animados
// =====================================

const petalsContainer = document.getElementById('petals');
const sparklesContainer = document.getElementById('sparkles');
const flowersContainer = document.getElementById('flowers');

// Pétalos bicolor que caen por toda la página
for (let i = 0; i < 26; i++) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.width = `${12 + Math.random() * 12}px`;
  petal.style.height = `${13 + Math.random() * 13}px`;
  petal.style.animationDuration = `${7 + Math.random() * 7}s`;
  petal.style.animationDelay = `${-Math.random() * 14}s`;
  petalsContainer.appendChild(petal);
}

// Destellos de luz en el fondo
for (let i = 0; i < 22; i++) {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.animationDelay = `${Math.random() * 4}s`;
  sparklesContainer.appendChild(sparkle);
}

// Dibuja un clavel morado y blanco en SVG.
// Los bordes ondulados de los pétalos le dan apariencia de clavel.
function drawCarnation(id) {
  const petalShape = `M 0 17
    C -12 5, -27 -5, -31 -26
    L -26 -29 L -32 -35 L -25 -37 L -28 -43
    L -19 -43 L -18 -49 L -10 -45 L -5 -51
    L 2 -46 L 9 -51 L 14 -44 L 22 -47
    L 24 -40 L 31 -39 L 28 -31 L 34 -27
    C 29 -6, 12 7, 0 17 Z`;

  let petals = '';
  for (let i = 0; i < 15; i++) {
    const angle = (i * 360) / 15;
    const scale = i % 2 === 0 ? 1.05 : 0.94;
    petals += `<path d="${petalShape}"
      transform="translate(100 104) rotate(${angle}) scale(${scale})"
      fill="url(#petal-${id})" stroke="#76319a" stroke-width="0.8"/>`;
  }
  // Centro de pétalos claros y rizados
  for (let i = 0; i < 9; i++) {
    petals += `<path d="${petalShape}"
      transform="translate(100 104) rotate(${i * 40 + 12}) scale(.55)"
      fill="url(#inner-${id})" stroke="#aa67ce" stroke-width=".6"/>`;
  }

  return `
  <svg class="flower" viewBox="0 0 200 320" role="img"
       aria-label="Clavel bicolor morado y blanco"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stem-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#71c882"/>
        <stop offset="100%" stop-color="#2d7944"/>
      </linearGradient>
      <linearGradient id="petal-${id}" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="37%" stop-color="#fcf7ff"/>
        <stop offset="72%" stop-color="#d6a0f0"/>
        <stop offset="100%" stop-color="#7f2cae"/>
      </linearGradient>
      <linearGradient id="inner-${id}" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="60%" stop-color="#f1e2ff"/>
        <stop offset="100%" stop-color="#aa5ed8"/>
      </linearGradient>
    </defs>

    <!-- Tallo y hojas verdes -->
    <path d="M100 125 Q97 210 103 308" stroke="url(#stem-${id})"
          stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M100 208 Q58 162 48 184 Q61 213 100 224 Z" fill="#459f60"/>
    <path d="M101 241 Q139 190 155 209 Q147 237 101 254 Z" fill="#4dac64"/>
    <path d="M100 215 L61 188 M101 249 L145 215"
          stroke="#87cd88" stroke-width="1.5" fill="none" opacity=".6"/>

    <!-- Cabeza de clavel: borde violeta y corazón blanco -->
    ${petals}
    <path d="M81 127 Q100 142 119 127 L110 149 Q100 155 90 149 Z"
          fill="#4a9956" stroke="#2d7944" stroke-width="1.5"/>
  </svg>`;
}

flowersContainer.innerHTML = [1, 2, 3].map(drawCarnation).join('');
