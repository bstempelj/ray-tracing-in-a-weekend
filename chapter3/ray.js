class ray {
  constructor(a, b) {
    this.A = a;
    this.B = b;
  }

  origin() { return this.A; }
  direction() { return this.B; }
  pt(t) { return vec3.add(this.A, vec3.mul(this.B, t)); }
}

function test_ray() {
  const r = new ray(
    new vec3(0, 0, 0),
    new vec3(0, 0, -1)
  );
  console.log('origin:', r.origin().str());
  console.log('direction:', r.direction().str());

  console.log('pt(1):', r.pt(1).str());
  console.log('pt(1):', r.pt(2).str());
}