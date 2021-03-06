function chapter5_2() {
  class hitRecord {
    constructor(t, p, n) {
      this.t = t;
      this.p = p;
      this.normal = n;
    }
  }

  class hitList {
    constructor(l, n) {
      this.list = l;
      this.listSize = n;
    }

    hit(r, tMin, tMax, rec) {
      let tempRec = new hitRecord(0, new vec3(0,0,0), new vec3(0,0,0));
      let hitAnything = false;
      let closestSoFar = tMax;

      for (let i = 0; i < this.listSize; i++) {
        if (this.list[i].hit(r, tMin, closestSoFar, tempRec)) {
          hitAnything = true;
          closestSoFar = tempRec.t;
          rec.t = tempRec.t;
          rec.p = tempRec.p;
          rec.normal = tempRec.normal;
        }
      }

      return hitAnything;
    }
  }

  class sphere {
    constructor(cen, r) {
      this.center = cen;
      this.radius = r;
    }

    hit(r, tMin, tMax, rec) {
      const oc = vec3.sub(r.origin(), this.center);
      const a = vec3.dot(r.direction(), r.direction());
      const b = vec3.dot(oc, r.direction());
      const c = vec3.dot(oc, oc) - this.radius*this.radius;
      const discriminant = b*b - a*c;

      if (discriminant > 0) {
        let temp = (-b - Math.sqrt(b*b-a*c))/a;
        if (temp < tMax && temp > tMin) {
          rec.t = temp;
          rec.p = r.pt(rec.t);
          rec.normal = vec3.div(vec3.sub(rec.p, this.center), this.radius);
          return true;
        }

        temp = (-b + Math.sqrt(b*b-a*c)) / a;
        if (temp < tMax && temp > tMin) {
          rec.t = temp;
          rec.p = r.pt(rect.t);
          rec.normal = vec3.div(vec3.sub(rec.p, this.center), this.radius);
          return true;
        }
      }

      return false;
    }
  }

  function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  function color(r, world) {
    let rec = new hitRecord(0, new vec3(0, 0, 0), new vec3(0, 0, 0));

    if (world.hit(r, 0.0, Number.MAX_VALUE, rec)) {
      return vec3.mul(new vec3(
        rec.normal.x() + 1,
        rec.normal.y() + 1,
        rec.normal.z() + 1,
      ), 0.5);
    }
    else {
      const unit_direction = vec3.unit(r.direction());
      t = 0.5 * (unit_direction.y() + 1.0);
      return vec3.add(
        vec3.mul(new vec3(1, 1, 1), (1 - t)),
        vec3.mul(new vec3(0.5, 0.7, 1), t)
      );
    }
  }

  const canvas = document.getElementById('chapter5_2');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;

  const lower_left_corner = new vec3(3, 1.5, -1);
  const horizontal = new vec3(-6, 0, 0);
  const vertical = new vec3(0, -3, 0);
  const origin = new vec3(0, 0, 0);

  const list = [
    new sphere(new vec3(0,0,-1), 0.5),
    new sphere(new vec3(0,-100.5,-1), 100)
  ];

  const world = new hitList(list, 2);

  let u, v, r, col;

  // j = 199..0 => height
  for (let j = ny-1; j >= 0; j--) {
    // i = 0..299 => width
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
      col = color(r, world);

      ctx.fillStyle = rgb(
        col.r() * 255.99,
        col.g() * 255.99,
        col.b() * 255.99
      );
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter5_2();