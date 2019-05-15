class camera {
  constructor() {
    this.lower_left_corner = new vec3(3, 1.5, -1);
    this.horizontal = new vec3(-6, 0, 0);
    this.vertical = new vec3(0, -3, 0);
    this.origin = new vec3(0, 0, 0);
  }

  ray(u, v) {
    return new ray(
      this.origin,
      vec3.add(
        this.lower_left_corner,
        vec3.add(vec3.mul(this.horizontal, u), vec3.mul(this.vertical, v))
      )
    );
  }
}