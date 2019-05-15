function chapter1() {
  function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  const canvas = document.getElementById('chapter1');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;

  // j = 199..0
  for (let j = ny-1; j >= 0; j--) {
    // i = 0..299
    for (let i = 0; i < nx; i++) {
      let r = i / nx; // r = 0..1
      let g = j / ny; // g = 1..0
      let b = 0.2;

      ctx.fillStyle = rgb(r * 255, g * 255, b * 255);
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter1();