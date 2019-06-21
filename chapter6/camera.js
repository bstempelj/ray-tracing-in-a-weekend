class camera {
  constructor(vfov, aspect) {
    let theta = vfov * Math.PI/180;
    let half_height = Math.tan(theta / 2);
    let half_width = aspect * half_height;

    this.org = new vec3(0, 0, 0);                       // origin
    this.llc = new vec3(-half_width, -half_height, -1); // lower left corner
    this.hz = new vec3(2 * half_width, 0, 0);           // horizontal
    this.vt = new vec3(0, 2 * half_height, 0);          // vertical
  }

  ray(u, v) {
    let vvto = vec3.sub(vec3.mul(this.vt, v), this.org);
    let uhz = vec3.mul(this.hz, u);
    return new ray(
      this.org, vec3.add(this.llc, vec3.add(vvto, uhz))
    );
  }
}

function calcLLC(origin, front, right, up, half_width, half_height) {
  right = vec3.mul(right, half_width);
  up = vec3.mul(up, half_height);
  return vec3.sub(vec3.sub(vec3.sub(origin, right), up), front);
}

class camera2 {
  constructor(lookfrom, lookat, vup, vfov, aspect) {
    let u, v, w;
    let theta = vfov * Math.PI/180; // to rad
    let half_height = Math.tan(theta/2);
    let half_width = aspect * half_height;

    w = vec3.unit(vec3.sub(lookfrom, lookat));  // forward
    u = vec3.unit(vec3.cross(vup, w));          // right
    v = vec3.cross(w, u);                       // up

    let uhw = vec3.mul(u, half_width);
    let vhh = vec3.mul(v, half_height);

    this.org = lookfrom;
    this.llc = calcLLC(this.org, w, u, v, Math.round(half_width), Math.round(half_height));
    this.hz  = vec3.mul(uhw, 2);  // horizontal
    this.vt  = vec3.mul(vhh, 2);  // vertical
  }

  ray(s, t) {
    let shz = vec3.mul(this.hz, s);
    let vtt = vec3.mul(this.vt, t);
    let A = this.org;
    let B = vec3.sub(vec3.add(this.llc, vec3.add(shz, vtt)), this.org);
    
    return new ray(A, B);
  }
}