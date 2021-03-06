function chapter10() {
  function randomInUnitSphere() {
    let p = new vec3(0,0,0);
    do {
      p = new vec3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1);
    } while (p.length2() >= 1.0);

    return p;
  }

  class lambertian {
    constructor(a) {
      this.albedo = a;
    }

    scatter(ray, rec, attenuation, scattered) {
      const target = vec3.add(rec.p, vec3.add(rec.normal, randomInUnitSphere()));
      scattered = new ray(rec.p, vec3.sub(target, rec.p));
      attenuation = albedo;
      return true;
    }
  }

  class hitRecord {
    constructor(t, p, n, m) {
      this.t = t;
      this.p = p;
      this.normal = n;
      this.material = m;
    }
  }

  class hitList {
    constructor(l, n) {
      this.list = l;
      this.listSize = n;
    }

    hit(r, tMin, tMax, rec) {
      let tempRec = new hitRecord(0, new vec3(0, 0, 0), new vec3(0, 0, 0));
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
      const c = vec3.dot(oc, oc) - this.radius * this.radius;
      const discriminant = b * b - a * c;

      if (discriminant > 0) {
        let temp = (-b - Math.sqrt(b * b - a * c)) / a;
        if (temp < tMax && temp > tMin) {
          rec.t = temp;
          rec.p = r.pt(rec.t);
          rec.normal = vec3.div(vec3.sub(rec.p, this.center), this.radius);
          return true;
        }

        temp = (-b + Math.sqrt(b * b - a * c)) / a;
        if (temp < tMax && temp > tMin) {
          rec.t = temp;
          rec.p = r.pt(rec.t);
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

    if (world.hit(r, 0.001, Number.MAX_VALUE, rec)) {
      const target = vec3.add(rec.p, vec3.add(rec.normal, randomInUnitSphere()));
      return vec3.mul(color(new ray(rec.p, vec3.sub(target, rec.p)), world), 0.5);
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

  const canvas = document.getElementById('chapter10');
  const ctx = canvas.getContext('2d');

  const nx = 300;
  const ny = 150;
  const ns = 1;


  const R = Math.cos(Math.PI / 4);
  const list = [
    new sphere(new vec3(-R, 0, -1), R),
    new sphere(new vec3( R, 0, -1), R)
  ];

  const world = new hitList(list, 2);
  // const cam = new camera(90, nx/ny);
  const cam = new camera2(new vec3(-0.5,-0.5,1), new vec3(0,0,-1), new vec3(0,1,0), 90, nx/ny);

  let u, v, r, col;

  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      col = new vec3(0, 0, 0);

      for (let s = 0; s < ns; s++) {
        u = (i + Math.random()) / nx;
        v = (j + Math.random()) / ny;
        r = cam.ray(u, v);
        col = vec3.add(col, color(r, world));
      }

      col = vec3.div(col, ns);
      col = new vec3(Math.sqrt(col.x()), Math.sqrt(col.y()), Math.sqrt(col.z())); // gamma correction
      ctx.fillStyle = rgb(
        col.r() * 255.99,
        col.g() * 255.99,
        col.b() * 255.99
      );
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

chapter10();