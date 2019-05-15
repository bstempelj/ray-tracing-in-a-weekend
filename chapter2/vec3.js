class vec3 {
  constructor(e0, e1, e2) {
    this.e = [e0, e1, e2];
  }

  x() { return this.e[0]; }
  y() { return this.e[1]; }
  z() { return this.e[2]; }
  r() { return this.e[0]; }
  g() { return this.e[1]; }
  b() { return this.e[2]; }

  length() {
    return Math.hypot(this.e[0], this.e[1], this.e[2]);
  }

  str() {
    return `vec3(${this.x()}, ${this.y()}, ${this.z()})`;
  }

  static unit(v) {
    const len = v.length();
    return new vec3(
      v.e[0] / len,
      v.e[1] / len,
      v.e[2] / len
    );
  }

  static add(v, t) {
    if (typeof t == 'number') {
      return new vec3(
        v.x() + t,
        v.y() + t,
        v.z() + t
      );
    }
    return new vec3(
      v.x() + t.x(),
      v.y() + t.y(),
      v.z() + t.z()
    );
  }

  static sub(v, t) {
    if (typeof t == 'number') {
      return new vec3(
        v.x() - t,
        v.y() - t,
        v.z() - t
      );
    }
    return new vec3(
      v.x() - t.x(),
      v.y() - t.y(),
      v.z() - t.z()
    );
  }

  static mul(v, t) {
    if (typeof t == 'number') {
      return new vec3(
        v.x() * t,
        v.y() * t,
        v.z() * t
      );
    }
    return new vec3(
      v.x() * t.x(),
      v.y() * t.y(),
      v.z() * t.z()
    );
  }

  static div(v, t) {
    if (t !== 0) {
      if (typeof t == 'number') {
        return new vec3(
          v.x() / t,
          v.y() / t,
          v.z() / t
        );
      }
      return new vec3(
        v.x() / t.x(),
        v.y() / t.y(),
        v.z() / t.z()
      );
    }
  }

  static dot(v, u) {
    return v.x()*u.x() + v.y()*u.y() + v.z()*u.z();
  }

  static cross(v, u) {
    return new vec3(
      v.y()*u.z() - v.z()*u.y(),
      v.z()*u.x() - v.x()*u.z(),
      v.x()*u.y() - v.y()*u.x()
    );
  }
}

function vec3_test() {
  const v = new vec3(1,2,3);
  const u = new vec3(4,5,6);

  console.log('x:', v.x());
  console.log('y:', v.y());
  console.log('z:', v.z());

  console.log('length:', v.length());
  console.log('norm:', v.norm().str());

  console.log('addn:', vec3.add(v, 10).str());
  console.log('addv:', vec3.add(v, u).str());

  console.log('subn:', vec3.sub(v, 10).str());
  console.log('subv:', vec3.sub(v, u).str());

  console.log('muln:', vec3.mul(v, 10).str());
  console.log('mulv:', vec3.mul(v, u).str());

  console.log('divn:', vec3.div(v, 10).str());
  console.log('divv:', vec3.div(v, u).str());

  console.log('dot:', vec3.dot(v, u));
  console.log('cross:', vec3.cross(v, u).str());
}