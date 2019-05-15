function chapter2() {
  function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  const canvas = document.getElementById('chapter2');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;

  for (let j = ny-1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      const col = new vec3(
        i / nx,
        1 - (j / ny),
        0.2
      );

      ctx.fillStyle = rgb(
        col.x() * 255.99,
        col.y() * 255.99,
        col.z() * 255.99
      );
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter2();