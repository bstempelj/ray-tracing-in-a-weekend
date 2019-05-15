function chapter2() {
  function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  const canvas = document.getElementById('chapter2');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;

  // j = 199..0
  for (let j = ny-1; j >= 0; j--) {
    // i = 0..299
    for (let i = 0; i < nx; i++) {
      const col = new vec3(
        i / nx, // 0..1
        j / ny, // 1..0
        0.2
      );

      ctx.fillStyle = rgb(
        col.x() * 255,
        col.y() * 255,
        col.z() * 255
      );
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter2();