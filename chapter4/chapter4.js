function chapter4() {
  function hitSphere(center, radius, r) {
    const oc = vec3.sub(r.origin(), center);
    const a = vec3.dot(r.direction(), r.direction());
    const b = 2 * vec3.dot(oc, r.direction());
    const c = vec3.dot(oc, oc) - radius*radius;
    const discriminant = b*b - 4*a*c;
    return (discriminant > 0);
  }

  function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  function color(r) {
    if (hitSphere(new vec3(0,0,-1), 0.5, r))
      return new vec3(1,0,0);
    const unit_direction = vec3.unit(r.direction());
    const t = 0.5*(unit_direction.y() + 1.0);
    return vec3.add(
      vec3.mul(new vec3(1, 1, 1), (1 - t)),
      vec3.mul(new vec3(0.5, 0.7, 1), t)
    );
  }

  const canvas = document.getElementById('chapter4');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;

  const lower_left_corner = new vec3(3, 1.5, -1);
  const horizontal = new vec3(-6, 0, 0);
  const vertical = new vec3(0, -3, 0);
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
        col.r() * 255.99,
        col.g() * 255.99,
        col.b() * 255.99
      );
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter4();