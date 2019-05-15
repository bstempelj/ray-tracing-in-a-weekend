function chapter3() {
  function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  function color(r) {
    const unit_direction = vec3.unit(r.direction());
    const t = 0.5*(unit_direction.y() + 1.0);
    const result = vec3.add(
      vec3.mul(new vec3(1, 1, 1), (1 - t)),
      vec3.mul(new vec3(0.5, 0.7, 1), t)
    );
    return result;
  }

  const canvas = document.getElementById('chapter3');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;

  const lower_left_corner = new vec3(-3, -1.5, -1);
  const horizontal = new vec3(6, 0, 0);
  const vertical = new vec3(0, 3, 0);
  const origin = new vec3(0, 0, 0);

  let u, v, r, col;

  // j = 199..0
  for (let j = ny-1; j >= 0; j--) {
    // i = 0..299
    for (let i = 0; i < nx; i++) {
      u = i / nx;
      v = j / ny;

      r = new ray(
        origin,
        vec3.add(
          lower_left_corner,
          vec3.add(vec3.mul(horizontal, u), vec3.mul(vertical, v))
        )
      );
      col = color(r);

      ctx.fillStyle = rgb(
        col.r() * 255,
        col.g() * 255,
        col.b() * 255
      );
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter3();