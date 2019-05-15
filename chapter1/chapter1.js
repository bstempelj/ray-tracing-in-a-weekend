function chapter1() {
  function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  const canvas = document.getElementById('chapter1');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;

  for (let j = ny-1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      let r = i / nx;
      let g = 1 - (j / ny);
      let b = 0.2;

      ctx.fillStyle = rgb(
        r * 255.99,
        g * 255.99,
        b * 255.99
      );
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter1();