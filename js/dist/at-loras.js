/**
* @vue/shared v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function $n(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const s of t.split(",")) e[s] = 1;
  return (s) => s in e;
}
const lt = {}, He = [], Jt = () => {
}, Lo = () => !1, Is = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Fs = (t) => t.startsWith("onUpdate:"), gt = Object.assign, Tn = (t, e) => {
  const s = t.indexOf(e);
  s > -1 && t.splice(s, 1);
}, Zi = Object.prototype.hasOwnProperty, et = (t, e) => Zi.call(t, e), B = Array.isArray, Ve = (t) => ds(t) === "[object Map]", Ls = (t) => ds(t) === "[object Set]", qn = (t) => ds(t) === "[object Date]", G = (t) => typeof t == "function", dt = (t) => typeof t == "string", It = (t) => typeof t == "symbol", ot = (t) => t !== null && typeof t == "object", Do = (t) => (ot(t) || G(t)) && G(t.then) && G(t.catch), jo = Object.prototype.toString, ds = (t) => jo.call(t), tr = (t) => ds(t).slice(8, -1), No = (t) => ds(t) === "[object Object]", Ds = (t) => dt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, ze = /* @__PURE__ */ $n(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), js = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return ((s) => e[s] || (e[s] = t(s)));
}, er = /-\w/g, Dt = js(
  (t) => t.replace(er, (e) => e.slice(1).toUpperCase())
), sr = /\B([A-Z])/g, Pe = js(
  (t) => t.replace(sr, "-$1").toLowerCase()
), Ho = js((t) => t.charAt(0).toUpperCase() + t.slice(1)), Zs = js(
  (t) => t ? `on${Ho(t)}` : ""
), qt = (t, e) => !Object.is(t, e), bs = (t, ...e) => {
  for (let s = 0; s < t.length; s++)
    t[s](...e);
}, Vo = (t, e, s, n = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Ns = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Jn;
const Hs = () => Jn || (Jn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function An(t) {
  if (B(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++) {
      const n = t[s], o = dt(n) ? rr(n) : An(n);
      if (o)
        for (const i in o)
          e[i] = o[i];
    }
    return e;
  } else if (dt(t) || ot(t))
    return t;
}
const nr = /;(?![^(]*\))/g, or = /:([^]+)/, ir = /\/\*[^]*?\*\//g;
function rr(t) {
  const e = {};
  return t.replace(ir, "").split(nr).forEach((s) => {
    if (s) {
      const n = s.split(or);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function Ft(t) {
  let e = "";
  if (dt(t))
    e = t;
  else if (B(t))
    for (let s = 0; s < t.length; s++) {
      const n = Ft(t[s]);
      n && (e += n + " ");
    }
  else if (ot(t))
    for (const s in t)
      t[s] && (e += s + " ");
  return e.trim();
}
const lr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", cr = /* @__PURE__ */ $n(lr);
function Uo(t) {
  return !!t || t === "";
}
function ar(t, e) {
  if (t.length !== e.length) return !1;
  let s = !0;
  for (let n = 0; s && n < t.length; n++)
    s = hs(t[n], e[n]);
  return s;
}
function hs(t, e) {
  if (t === e) return !0;
  let s = qn(t), n = qn(e);
  if (s || n)
    return s && n ? t.getTime() === e.getTime() : !1;
  if (s = It(t), n = It(e), s || n)
    return t === e;
  if (s = B(t), n = B(e), s || n)
    return s && n ? ar(t, e) : !1;
  if (s = ot(t), n = ot(e), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(t).length, i = Object.keys(e).length;
    if (o !== i)
      return !1;
    for (const r in t) {
      const l = t.hasOwnProperty(r), c = e.hasOwnProperty(r);
      if (l && !c || !l && c || !hs(t[r], e[r]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function ur(t, e) {
  return t.findIndex((s) => hs(s, e));
}
const Bo = (t) => !!(t && t.__v_isRef === !0), Q = (t) => dt(t) ? t : t == null ? "" : B(t) || ot(t) && (t.toString === jo || !G(t.toString)) ? Bo(t) ? Q(t.value) : JSON.stringify(t, Ko, 2) : String(t), Ko = (t, e) => Bo(e) ? Ko(t, e.value) : Ve(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (s, [n, o], i) => (s[tn(n, i) + " =>"] = o, s),
    {}
  )
} : Ls(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((s) => tn(s))
} : It(e) ? tn(e) : ot(e) && !B(e) && !No(e) ? String(e) : e, tn = (t, e = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    It(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t
  );
};
/**
* @vue/reactivity v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let mt;
class Wo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = mt, !e && mt && (this.index = (mt.scopes || (mt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, s;
      if (this.scopes)
        for (e = 0, s = this.scopes.length; e < s; e++)
          this.scopes[e].pause();
      for (e = 0, s = this.effects.length; e < s; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, s;
      if (this.scopes)
        for (e = 0, s = this.scopes.length; e < s; e++)
          this.scopes[e].resume();
      for (e = 0, s = this.effects.length; e < s; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const s = mt;
      try {
        return mt = this, e();
      } finally {
        mt = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = mt, mt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (mt = this.prevScope, this.prevScope = void 0);
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function qo(t) {
  return new Wo(t);
}
function Jo() {
  return mt;
}
function fr(t, e = !1) {
  mt && mt.cleanups.push(t);
}
let ct;
const en = /* @__PURE__ */ new WeakSet();
class Go {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, mt && mt.active && mt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, en.has(this) && (en.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Gn(this), zo(this);
    const e = ct, s = jt;
    ct = this, jt = !0;
    try {
      return this.fn();
    } finally {
      Xo(this), ct = e, jt = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        On(e);
      this.deps = this.depsTail = void 0, Gn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? en.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    fn(this) && this.run();
  }
  get dirty() {
    return fn(this);
  }
}
let Yo = 0, Xe, Ze;
function Qo(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Ze, Ze = t;
    return;
  }
  t.next = Xe, Xe = t;
}
function En() {
  Yo++;
}
function kn() {
  if (--Yo > 0)
    return;
  if (Ze) {
    let e = Ze;
    for (Ze = void 0; e; ) {
      const s = e.next;
      e.next = void 0, e.flags &= -9, e = s;
    }
  }
  let t;
  for (; Xe; ) {
    let e = Xe;
    for (Xe = void 0; e; ) {
      const s = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (n) {
          t || (t = n);
        }
      e = s;
    }
  }
  if (t) throw t;
}
function zo(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Xo(t) {
  let e, s = t.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), On(n), dr(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  t.deps = e, t.depsTail = s;
}
function fn(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Zo(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Zo(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === rs) || (t.globalVersion = rs, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !fn(t))))
    return;
  t.flags |= 2;
  const e = t.dep, s = ct, n = jt;
  ct = t, jt = !0;
  try {
    zo(t);
    const o = t.fn(t._value);
    (e.version === 0 || qt(o, t._value)) && (t.flags |= 128, t._value = o, e.version++);
  } catch (o) {
    throw e.version++, o;
  } finally {
    ct = s, jt = n, Xo(t), t.flags &= -3;
  }
}
function On(t, e = !1) {
  const { dep: s, prevSub: n, nextSub: o } = t;
  if (n && (n.nextSub = o, t.prevSub = void 0), o && (o.prevSub = n, t.nextSub = void 0), s.subs === t && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      On(i, !0);
  }
  !e && !--s.sc && s.map && s.map.delete(s.key);
}
function dr(t) {
  const { prevDep: e, nextDep: s } = t;
  e && (e.nextDep = s, t.prevDep = void 0), s && (s.prevDep = e, t.nextDep = void 0);
}
let jt = !0;
const ti = [];
function ae() {
  ti.push(jt), jt = !1;
}
function ue() {
  const t = ti.pop();
  jt = t === void 0 ? !0 : t;
}
function Gn(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const s = ct;
    ct = void 0;
    try {
      e();
    } finally {
      ct = s;
    }
  }
}
let rs = 0;
class hr {
  constructor(e, s) {
    this.sub = e, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Mn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!ct || !jt || ct === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== ct)
      s = this.activeLink = new hr(ct, this), ct.deps ? (s.prevDep = ct.depsTail, ct.depsTail.nextDep = s, ct.depsTail = s) : ct.deps = ct.depsTail = s, ei(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = ct.depsTail, s.nextDep = void 0, ct.depsTail.nextDep = s, ct.depsTail = s, ct.deps === s && (ct.deps = n);
    }
    return s;
  }
  trigger(e) {
    this.version++, rs++, this.notify(e);
  }
  notify(e) {
    En();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      kn();
    }
  }
}
function ei(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let n = e.deps; n; n = n.nextDep)
        ei(n);
    }
    const s = t.dep.subs;
    s !== t && (t.prevSub = s, s && (s.nextSub = t)), t.dep.subs = t;
  }
}
const Cs = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ Symbol(
  ""
), dn = /* @__PURE__ */ Symbol(
  ""
), ls = /* @__PURE__ */ Symbol(
  ""
);
function vt(t, e, s) {
  if (jt && ct) {
    let n = Cs.get(t);
    n || Cs.set(t, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new Mn()), o.map = n, o.key = s), o.track();
  }
}
function re(t, e, s, n, o, i) {
  const r = Cs.get(t);
  if (!r) {
    rs++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (En(), e === "clear")
    r.forEach(l);
  else {
    const c = B(t), f = c && Ds(s);
    if (c && s === "length") {
      const u = Number(n);
      r.forEach((h, p) => {
        (p === "length" || p === ls || !It(p) && p >= u) && l(h);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), f && l(r.get(ls)), e) {
        case "add":
          c ? f && l(r.get("length")) : (l(r.get(Oe)), Ve(t) && l(r.get(dn)));
          break;
        case "delete":
          c || (l(r.get(Oe)), Ve(t) && l(r.get(dn)));
          break;
        case "set":
          Ve(t) && l(r.get(Oe));
          break;
      }
  }
  kn();
}
function pr(t, e) {
  const s = Cs.get(t);
  return s && s.get(e);
}
function De(t) {
  const e = /* @__PURE__ */ Z(t);
  return e === t ? e : (vt(e, "iterate", ls), /* @__PURE__ */ Ot(t) ? e : e.map(Ht));
}
function Vs(t) {
  return vt(t = /* @__PURE__ */ Z(t), "iterate", ls), t;
}
function Kt(t, e) {
  return /* @__PURE__ */ fe(t) ? Ke(/* @__PURE__ */ Gt(t) ? Ht(e) : e) : Ht(e);
}
const _r = {
  __proto__: null,
  [Symbol.iterator]() {
    return sn(this, Symbol.iterator, (t) => Kt(this, t));
  },
  concat(...t) {
    return De(this).concat(
      ...t.map((e) => B(e) ? De(e) : e)
    );
  },
  entries() {
    return sn(this, "entries", (t) => (t[1] = Kt(this, t[1]), t));
  },
  every(t, e) {
    return ne(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return ne(
      this,
      "filter",
      t,
      e,
      (s) => s.map((n) => Kt(this, n)),
      arguments
    );
  },
  find(t, e) {
    return ne(
      this,
      "find",
      t,
      e,
      (s) => Kt(this, s),
      arguments
    );
  },
  findIndex(t, e) {
    return ne(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return ne(
      this,
      "findLast",
      t,
      e,
      (s) => Kt(this, s),
      arguments
    );
  },
  findLastIndex(t, e) {
    return ne(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return ne(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return nn(this, "includes", t);
  },
  indexOf(...t) {
    return nn(this, "indexOf", t);
  },
  join(t) {
    return De(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return nn(this, "lastIndexOf", t);
  },
  map(t, e) {
    return ne(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Je(this, "pop");
  },
  push(...t) {
    return Je(this, "push", t);
  },
  reduce(t, ...e) {
    return Yn(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Yn(this, "reduceRight", t, e);
  },
  shift() {
    return Je(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return ne(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Je(this, "splice", t);
  },
  toReversed() {
    return De(this).toReversed();
  },
  toSorted(t) {
    return De(this).toSorted(t);
  },
  toSpliced(...t) {
    return De(this).toSpliced(...t);
  },
  unshift(...t) {
    return Je(this, "unshift", t);
  },
  values() {
    return sn(this, "values", (t) => Kt(this, t));
  }
};
function sn(t, e, s) {
  const n = Vs(t), o = n[e]();
  return n !== t && !/* @__PURE__ */ Ot(t) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = s(i.value)), i;
  }), o;
}
const gr = Array.prototype;
function ne(t, e, s, n, o, i) {
  const r = Vs(t), l = r !== t && !/* @__PURE__ */ Ot(t), c = r[e];
  if (c !== gr[e]) {
    const h = c.apply(t, i);
    return l ? Ht(h) : h;
  }
  let f = s;
  r !== t && (l ? f = function(h, p) {
    return s.call(this, Kt(t, h), p, t);
  } : s.length > 2 && (f = function(h, p) {
    return s.call(this, h, p, t);
  }));
  const u = c.call(r, f, n);
  return l && o ? o(u) : u;
}
function Yn(t, e, s, n) {
  const o = Vs(t), i = o !== t && !/* @__PURE__ */ Ot(t);
  let r = s, l = !1;
  o !== t && (i ? (l = n.length === 0, r = function(f, u, h) {
    return l && (l = !1, f = Kt(t, f)), s.call(this, f, Kt(t, u), h, t);
  }) : s.length > 3 && (r = function(f, u, h) {
    return s.call(this, f, u, h, t);
  }));
  const c = o[e](r, ...n);
  return l ? Kt(t, c) : c;
}
function nn(t, e, s) {
  const n = /* @__PURE__ */ Z(t);
  vt(n, "iterate", ls);
  const o = n[e](...s);
  return (o === -1 || o === !1) && /* @__PURE__ */ Bs(s[0]) ? (s[0] = /* @__PURE__ */ Z(s[0]), n[e](...s)) : o;
}
function Je(t, e, s = []) {
  ae(), En();
  const n = (/* @__PURE__ */ Z(t))[e].apply(t, s);
  return kn(), ue(), n;
}
const mr = /* @__PURE__ */ $n("__proto__,__v_isRef,__isVue"), si = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(It)
);
function vr(t) {
  It(t) || (t = String(t));
  const e = /* @__PURE__ */ Z(this);
  return vt(e, "has", t), e.hasOwnProperty(t);
}
class ni {
  constructor(e = !1, s = !1) {
    this._isReadonly = e, this._isShallow = s;
  }
  get(e, s, n) {
    if (s === "__v_skip") return e.__v_skip;
    const o = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (o ? i ? Er : li : i ? ri : ii).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    const r = B(e);
    if (!o) {
      let c;
      if (r && (c = _r[s]))
        return c;
      if (s === "hasOwnProperty")
        return vr;
    }
    const l = Reflect.get(
      e,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ut(e) ? e : n
    );
    if ((It(s) ? si.has(s) : mr(s)) || (o || vt(e, "get", s), i))
      return l;
    if (/* @__PURE__ */ ut(l)) {
      const c = r && Ds(s) ? l : l.value;
      return o && ot(c) ? /* @__PURE__ */ pn(c) : c;
    }
    return ot(l) ? o ? /* @__PURE__ */ pn(l) : /* @__PURE__ */ Us(l) : l;
  }
}
class oi extends ni {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, o) {
    let i = e[s];
    const r = B(e) && Ds(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ fe(i);
      if (!/* @__PURE__ */ Ot(n) && !/* @__PURE__ */ fe(n) && (i = /* @__PURE__ */ Z(i), n = /* @__PURE__ */ Z(n)), !r && /* @__PURE__ */ ut(i) && !/* @__PURE__ */ ut(n))
        return f || (i.value = n), !0;
    }
    const l = r ? Number(s) < e.length : et(e, s), c = Reflect.set(
      e,
      s,
      n,
      /* @__PURE__ */ ut(e) ? e : o
    );
    return e === /* @__PURE__ */ Z(o) && (l ? qt(n, i) && re(e, "set", s, n) : re(e, "add", s, n)), c;
  }
  deleteProperty(e, s) {
    const n = et(e, s);
    e[s];
    const o = Reflect.deleteProperty(e, s);
    return o && n && re(e, "delete", s, void 0), o;
  }
  has(e, s) {
    const n = Reflect.has(e, s);
    return (!It(s) || !si.has(s)) && vt(e, "has", s), n;
  }
  ownKeys(e) {
    return vt(
      e,
      "iterate",
      B(e) ? "length" : Oe
    ), Reflect.ownKeys(e);
  }
}
class yr extends ni {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, s) {
    return !0;
  }
  deleteProperty(e, s) {
    return !0;
  }
}
const br = /* @__PURE__ */ new oi(), Sr = /* @__PURE__ */ new yr(), wr = /* @__PURE__ */ new oi(!0);
const hn = (t) => t, gs = (t) => Reflect.getPrototypeOf(t);
function xr(t, e, s) {
  return function(...n) {
    const o = this.__v_raw, i = /* @__PURE__ */ Z(o), r = Ve(i), l = t === "entries" || t === Symbol.iterator && r, c = t === "keys" && r, f = o[t](...n), u = s ? hn : e ? Ke : Ht;
    return !e && vt(
      i,
      "iterate",
      c ? dn : Oe
    ), gt(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: p } = f.next();
          return p ? { value: h, done: p } : {
            value: l ? [u(h[0]), u(h[1])] : u(h),
            done: p
          };
        }
      }
    );
  };
}
function ms(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Cr(t, e) {
  const s = {
    get(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ Z(i), l = /* @__PURE__ */ Z(o);
      t || (qt(o, l) && vt(r, "get", o), vt(r, "get", l));
      const { has: c } = gs(r), f = e ? hn : t ? Ke : Ht;
      if (c.call(r, o))
        return f(i.get(o));
      if (c.call(r, l))
        return f(i.get(l));
      i !== r && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !t && vt(/* @__PURE__ */ Z(o), "iterate", Oe), o.size;
    },
    has(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ Z(i), l = /* @__PURE__ */ Z(o);
      return t || (qt(o, l) && vt(r, "has", o), vt(r, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
    },
    forEach(o, i) {
      const r = this, l = r.__v_raw, c = /* @__PURE__ */ Z(l), f = e ? hn : t ? Ke : Ht;
      return !t && vt(c, "iterate", Oe), l.forEach((u, h) => o.call(i, f(u), f(h), r));
    }
  };
  return gt(
    s,
    t ? {
      add: ms("add"),
      set: ms("set"),
      delete: ms("delete"),
      clear: ms("clear")
    } : {
      add(o) {
        const i = /* @__PURE__ */ Z(this), r = gs(i), l = /* @__PURE__ */ Z(o), c = !e && !/* @__PURE__ */ Ot(o) && !/* @__PURE__ */ fe(o) ? l : o;
        return r.has.call(i, c) || qt(o, c) && r.has.call(i, o) || qt(l, c) && r.has.call(i, l) || (i.add(c), re(i, "add", c, c)), this;
      },
      set(o, i) {
        !e && !/* @__PURE__ */ Ot(i) && !/* @__PURE__ */ fe(i) && (i = /* @__PURE__ */ Z(i));
        const r = /* @__PURE__ */ Z(this), { has: l, get: c } = gs(r);
        let f = l.call(r, o);
        f || (o = /* @__PURE__ */ Z(o), f = l.call(r, o));
        const u = c.call(r, o);
        return r.set(o, i), f ? qt(i, u) && re(r, "set", o, i) : re(r, "add", o, i), this;
      },
      delete(o) {
        const i = /* @__PURE__ */ Z(this), { has: r, get: l } = gs(i);
        let c = r.call(i, o);
        c || (o = /* @__PURE__ */ Z(o), c = r.call(i, o)), l && l.call(i, o);
        const f = i.delete(o);
        return c && re(i, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ Z(this), i = o.size !== 0, r = o.clear();
        return i && re(
          o,
          "clear",
          void 0,
          void 0
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    s[o] = xr(o, t, e);
  }), s;
}
function Pn(t, e) {
  const s = Cr(t, e);
  return (n, o, i) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? n : Reflect.get(
    et(s, o) && o in n ? s : n,
    o,
    i
  );
}
const $r = {
  get: /* @__PURE__ */ Pn(!1, !1)
}, Tr = {
  get: /* @__PURE__ */ Pn(!1, !0)
}, Ar = {
  get: /* @__PURE__ */ Pn(!0, !1)
};
const ii = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap();
function kr(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Or(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : kr(tr(t));
}
// @__NO_SIDE_EFFECTS__
function Us(t) {
  return /* @__PURE__ */ fe(t) ? t : Rn(
    t,
    !1,
    br,
    $r,
    ii
  );
}
// @__NO_SIDE_EFFECTS__
function Mr(t) {
  return Rn(
    t,
    !1,
    wr,
    Tr,
    ri
  );
}
// @__NO_SIDE_EFFECTS__
function pn(t) {
  return Rn(
    t,
    !0,
    Sr,
    Ar,
    li
  );
}
function Rn(t, e, s, n, o) {
  if (!ot(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = Or(t);
  if (i === 0)
    return t;
  const r = o.get(t);
  if (r)
    return r;
  const l = new Proxy(
    t,
    i === 2 ? n : s
  );
  return o.set(t, l), l;
}
// @__NO_SIDE_EFFECTS__
function Gt(t) {
  return /* @__PURE__ */ fe(t) ? /* @__PURE__ */ Gt(t.__v_raw) : !!(t && t.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function fe(t) {
  return !!(t && t.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ot(t) {
  return !!(t && t.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Bs(t) {
  return t ? !!t.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(t) {
  const e = t && t.__v_raw;
  return e ? /* @__PURE__ */ Z(e) : t;
}
function In(t) {
  return !et(t, "__v_skip") && Object.isExtensible(t) && Vo(t, "__v_skip", !0), t;
}
const Ht = (t) => ot(t) ? /* @__PURE__ */ Us(t) : t, Ke = (t) => ot(t) ? /* @__PURE__ */ pn(t) : t;
// @__NO_SIDE_EFFECTS__
function ut(t) {
  return t ? t.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function J(t) {
  return Pr(t, !1);
}
function Pr(t, e) {
  return /* @__PURE__ */ ut(t) ? t : new Rr(t, e);
}
class Rr {
  constructor(e, s) {
    this.dep = new Mn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? e : /* @__PURE__ */ Z(e), this._value = s ? e : Ht(e), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ot(e) || /* @__PURE__ */ fe(e);
    e = n ? e : /* @__PURE__ */ Z(e), qt(e, s) && (this._rawValue = e, this._value = n ? e : Ht(e), this.dep.trigger());
  }
}
function m(t) {
  return /* @__PURE__ */ ut(t) ? t.value : t;
}
const Ir = {
  get: (t, e, s) => e === "__v_raw" ? t : m(Reflect.get(t, e, s)),
  set: (t, e, s, n) => {
    const o = t[e];
    return /* @__PURE__ */ ut(o) && !/* @__PURE__ */ ut(s) ? (o.value = s, !0) : Reflect.set(t, e, s, n);
  }
};
function ci(t) {
  return /* @__PURE__ */ Gt(t) ? t : new Proxy(t, Ir);
}
// @__NO_SIDE_EFFECTS__
function Fr(t) {
  const e = B(t) ? new Array(t.length) : {};
  for (const s in t)
    e[s] = ai(t, s);
  return e;
}
class Lr {
  constructor(e, s, n) {
    this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = It(s) ? s : String(s), this._raw = /* @__PURE__ */ Z(e);
    let o = !0, i = e;
    if (!B(e) || It(this._key) || !Ds(this._key))
      do
        o = !/* @__PURE__ */ Bs(i) || /* @__PURE__ */ Ot(i);
      while (o && (i = i.__v_raw));
    this._shallow = o;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = m(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && /* @__PURE__ */ ut(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ ut(s)) {
        s.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    return pr(this._raw, this._key);
  }
}
class Dr {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function jr(t, e, s) {
  return /* @__PURE__ */ ut(t) ? t : G(t) ? new Dr(t) : ot(t) && arguments.length > 1 ? ai(t, e, s) : /* @__PURE__ */ J(t);
}
function ai(t, e, s) {
  return new Lr(t, e, s);
}
class Nr {
  constructor(e, s, n) {
    this.fn = e, this.setter = s, this._value = void 0, this.dep = new Mn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rs - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ct !== this)
      return Qo(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Zo(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
// @__NO_SIDE_EFFECTS__
function Hr(t, e, s = !1) {
  let n, o;
  return G(t) ? n = t : (n = t.get, o = t.set), new Nr(n, o, s);
}
const vs = {}, $s = /* @__PURE__ */ new WeakMap();
let Ae;
function Vr(t, e = !1, s = Ae) {
  if (s) {
    let n = $s.get(s);
    n || $s.set(s, n = []), n.push(t);
  }
}
function Ur(t, e, s = lt) {
  const { immediate: n, deep: o, once: i, scheduler: r, augmentJob: l, call: c } = s, f = (D) => o ? D : /* @__PURE__ */ Ot(D) || o === !1 || o === 0 ? le(D, 1) : le(D);
  let u, h, p, g, A = !1, v = !1;
  if (/* @__PURE__ */ ut(t) ? (h = () => t.value, A = /* @__PURE__ */ Ot(t)) : /* @__PURE__ */ Gt(t) ? (h = () => f(t), A = !0) : B(t) ? (v = !0, A = t.some((D) => /* @__PURE__ */ Gt(D) || /* @__PURE__ */ Ot(D)), h = () => t.map((D) => {
    if (/* @__PURE__ */ ut(D))
      return D.value;
    if (/* @__PURE__ */ Gt(D))
      return f(D);
    if (G(D))
      return c ? c(D, 2) : D();
  })) : G(t) ? e ? h = c ? () => c(t, 2) : t : h = () => {
    if (p) {
      ae();
      try {
        p();
      } finally {
        ue();
      }
    }
    const D = Ae;
    Ae = u;
    try {
      return c ? c(t, 3, [g]) : t(g);
    } finally {
      Ae = D;
    }
  } : h = Jt, e && o) {
    const D = h, W = o === !0 ? 1 / 0 : o;
    h = () => le(D(), W);
  }
  const $ = Jo(), E = () => {
    u.stop(), $ && $.active && Tn($.effects, u);
  };
  if (i && e) {
    const D = e;
    e = (...W) => {
      D(...W), E();
    };
  }
  let R = v ? new Array(t.length).fill(vs) : vs;
  const M = (D) => {
    if (!(!(u.flags & 1) || !u.dirty && !D))
      if (e) {
        const W = u.run();
        if (o || A || (v ? W.some((z, L) => qt(z, R[L])) : qt(W, R))) {
          p && p();
          const z = Ae;
          Ae = u;
          try {
            const L = [
              W,
              // pass undefined as the old value when it's changed for the first time
              R === vs ? void 0 : v && R[0] === vs ? [] : R,
              g
            ];
            R = W, c ? c(e, 3, L) : (
              // @ts-expect-error
              e(...L)
            );
          } finally {
            Ae = z;
          }
        }
      } else
        u.run();
  };
  return l && l(M), u = new Go(h), u.scheduler = r ? () => r(M, !1) : M, g = (D) => Vr(D, !1, u), p = u.onStop = () => {
    const D = $s.get(u);
    if (D) {
      if (c)
        c(D, 4);
      else
        for (const W of D) W();
      $s.delete(u);
    }
  }, e ? n ? M(!0) : R = u.run() : r ? r(M.bind(null, !0), !0) : u.run(), E.pause = u.pause.bind(u), E.resume = u.resume.bind(u), E.stop = E, E;
}
function le(t, e = 1 / 0, s) {
  if (e <= 0 || !ot(t) || t.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(t) || 0) >= e))
    return t;
  if (s.set(t, e), e--, /* @__PURE__ */ ut(t))
    le(t.value, e, s);
  else if (B(t))
    for (let n = 0; n < t.length; n++)
      le(t[n], e, s);
  else if (Ls(t) || Ve(t))
    t.forEach((n) => {
      le(n, e, s);
    });
  else if (No(t)) {
    for (const n in t)
      le(t[n], e, s);
    for (const n of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, n) && le(t[n], e, s);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ps(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (o) {
    Ks(o, e, s);
  }
}
function Yt(t, e, s, n) {
  if (G(t)) {
    const o = ps(t, e, s, n);
    return o && Do(o) && o.catch((i) => {
      Ks(i, e, s);
    }), o;
  }
  if (B(t)) {
    const o = [];
    for (let i = 0; i < t.length; i++)
      o.push(Yt(t[i], e, s, n));
    return o;
  }
}
function Ks(t, e, s, n = !0) {
  const o = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = e && e.appContext.config || lt;
  if (e) {
    let l = e.parent;
    const c = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let h = 0; h < u.length; h++)
          if (u[h](t, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      ae(), ps(i, null, 10, [
        t,
        c,
        f
      ]), ue();
      return;
    }
  }
  Br(t, s, o, n, r);
}
function Br(t, e, s, n = !0, o = !1) {
  if (o)
    throw t;
  console.error(t);
}
const xt = [];
let Bt = -1;
const Ue = [];
let me = null, Ne = 0;
const ui = /* @__PURE__ */ Promise.resolve();
let Ts = null;
function Fn(t) {
  const e = Ts || ui;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Kr(t) {
  let e = Bt + 1, s = xt.length;
  for (; e < s; ) {
    const n = e + s >>> 1, o = xt[n], i = cs(o);
    i < t || i === t && o.flags & 2 ? e = n + 1 : s = n;
  }
  return e;
}
function Ln(t) {
  if (!(t.flags & 1)) {
    const e = cs(t), s = xt[xt.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= cs(s) ? xt.push(t) : xt.splice(Kr(e), 0, t), t.flags |= 1, fi();
  }
}
function fi() {
  Ts || (Ts = ui.then(hi));
}
function Wr(t) {
  B(t) ? Ue.push(...t) : me && t.id === -1 ? me.splice(Ne + 1, 0, t) : t.flags & 1 || (Ue.push(t), t.flags |= 1), fi();
}
function Qn(t, e, s = Bt + 1) {
  for (; s < xt.length; s++) {
    const n = xt[s];
    if (n && n.flags & 2) {
      if (t && n.id !== t.uid)
        continue;
      xt.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function di(t) {
  if (Ue.length) {
    const e = [...new Set(Ue)].sort(
      (s, n) => cs(s) - cs(n)
    );
    if (Ue.length = 0, me) {
      me.push(...e);
      return;
    }
    for (me = e, Ne = 0; Ne < me.length; Ne++) {
      const s = me[Ne];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    me = null, Ne = 0;
  }
}
const cs = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function hi(t) {
  try {
    for (Bt = 0; Bt < xt.length; Bt++) {
      const e = xt[Bt];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), ps(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Bt < xt.length; Bt++) {
      const e = xt[Bt];
      e && (e.flags &= -2);
    }
    Bt = -1, xt.length = 0, di(), Ts = null, (xt.length || Ue.length) && hi();
  }
}
let Rt = null, pi = null;
function As(t) {
  const e = Rt;
  return Rt = t, pi = t && t.type.__scopeId || null, e;
}
function qr(t, e = Rt, s) {
  if (!e || t._n)
    return t;
  const n = (...o) => {
    n._d && ao(-1);
    const i = As(e);
    let r;
    try {
      r = t(...o);
    } finally {
      As(i), n._d && ao(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Es(t, e) {
  if (Rt === null)
    return t;
  const s = Gs(Rt), n = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [i, r, l, c = lt] = e[o];
    i && (G(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && le(r), n.push({
      dir: i,
      instance: s,
      value: r,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return t;
}
function Ce(t, e, s, n) {
  const o = t.dirs, i = e && e.dirs;
  for (let r = 0; r < o.length; r++) {
    const l = o[r];
    i && (l.oldValue = i[r].value);
    let c = l.dir[n];
    c && (ae(), Yt(c, s, 8, [
      t.el,
      l,
      t,
      e
    ]), ue());
  }
}
function Jr(t, e) {
  if (Ct) {
    let s = Ct.provides;
    const n = Ct.parent && Ct.parent.provides;
    n === s && (s = Ct.provides = Object.create(n)), s[t] = e;
  }
}
function ts(t, e, s = !1) {
  const n = Vi();
  if (n || Me) {
    let o = Me ? Me._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && t in o)
      return o[t];
    if (arguments.length > 1)
      return s && G(e) ? e.call(n && n.proxy) : e;
  }
}
function Gr() {
  return !!(Vi() || Me);
}
const Yr = /* @__PURE__ */ Symbol.for("v-scx"), Qr = () => ts(Yr);
function ye(t, e, s) {
  return _i(t, e, s);
}
function _i(t, e, s = lt) {
  const { immediate: n, deep: o, flush: i, once: r } = s, l = gt({}, s), c = e && n || !e && i !== "post";
  let f;
  if (us) {
    if (i === "sync") {
      const g = Qr();
      f = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!c) {
      const g = () => {
      };
      return g.stop = Jt, g.resume = Jt, g.pause = Jt, g;
    }
  }
  const u = Ct;
  l.call = (g, A, v) => Yt(g, u, A, v);
  let h = !1;
  i === "post" ? l.scheduler = (g) => {
    wt(g, u && u.suspense);
  } : i !== "sync" && (h = !0, l.scheduler = (g, A) => {
    A ? g() : Ln(g);
  }), l.augmentJob = (g) => {
    e && (g.flags |= 4), h && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const p = Ur(t, e, l);
  return us && (f ? f.push(p) : c && p()), p;
}
function zr(t, e, s) {
  const n = this.proxy, o = dt(t) ? t.includes(".") ? gi(n, t) : () => n[t] : t.bind(n, n);
  let i;
  G(e) ? i = e : (i = e.handler, s = e);
  const r = _s(this), l = _i(o, i.bind(n), s);
  return r(), l;
}
function gi(t, e) {
  const s = e.split(".");
  return () => {
    let n = t;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const $e = /* @__PURE__ */ new WeakMap(), mi = /* @__PURE__ */ Symbol("_vte"), Xr = (t) => t.__isTeleport, Ee = (t) => t && (t.disabled || t.disabled === ""), Zr = (t) => t && (t.defer || t.defer === ""), zn = (t) => typeof SVGElement < "u" && t instanceof SVGElement, Xn = (t) => typeof MathMLElement == "function" && t instanceof MathMLElement, _n = (t, e) => {
  const s = t && t.to;
  return dt(s) ? e ? e(s) : null : s;
}, tl = {
  name: "Teleport",
  __isTeleport: !0,
  process(t, e, s, n, o, i, r, l, c, f) {
    const {
      mc: u,
      pc: h,
      pbc: p,
      o: { insert: g, querySelector: A, createText: v, createComment: $ }
    } = f, E = Ee(e.props);
    let { dynamicChildren: R } = e;
    const M = (z, L, j) => {
      z.shapeFlag & 16 && u(
        z.children,
        L,
        j,
        o,
        i,
        r,
        l,
        c
      );
    }, D = (z = e) => {
      const L = Ee(z.props), j = z.target = _n(z.props, A), q = gn(j, z, v, g);
      j && (r !== "svg" && zn(j) ? r = "svg" : r !== "mathml" && Xn(j) && (r = "mathml"), o && o.isCE && (o.ce._teleportTargets || (o.ce._teleportTargets = /* @__PURE__ */ new Set())).add(j), L || (M(z, j, q), Ye(z, !1)));
    }, W = (z) => {
      const L = () => {
        $e.get(z) === L && ($e.delete(z), Ee(z.props) && (M(z, s, z.anchor), Ye(z, !0)), D(z));
      };
      $e.set(z, L), wt(L, i);
    };
    if (t == null) {
      const z = e.el = v(""), L = e.anchor = v("");
      if (g(z, s, n), g(L, s, n), Zr(e.props) || i && i.pendingBranch) {
        W(e);
        return;
      }
      E && (M(e, s, L), Ye(e, !0)), D();
    } else {
      e.el = t.el;
      const z = e.anchor = t.anchor, L = $e.get(t);
      if (L) {
        L.flags |= 8, $e.delete(t), W(e);
        return;
      }
      e.targetStart = t.targetStart;
      const j = e.target = t.target, q = e.targetAnchor = t.targetAnchor, tt = Ee(t.props), pt = tt ? s : j, yt = tt ? z : q;
      if (r === "svg" || zn(j) ? r = "svg" : (r === "mathml" || Xn(j)) && (r = "mathml"), R ? (p(
        t.dynamicChildren,
        R,
        pt,
        o,
        i,
        r,
        l
      ), Vn(t, e, !0)) : c || h(
        t,
        e,
        pt,
        yt,
        o,
        i,
        r,
        l,
        !1
      ), E)
        tt ? e.props && t.props && e.props.to !== t.props.to && (e.props.to = t.props.to) : ys(
          e,
          s,
          z,
          f,
          1
        );
      else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
        const Tt = e.target = _n(
          e.props,
          A
        );
        Tt && ys(
          e,
          Tt,
          null,
          f,
          0
        );
      } else tt && ys(
        e,
        j,
        q,
        f,
        1
      );
      Ye(e, E);
    }
  },
  remove(t, e, s, { um: n, o: { remove: o } }, i) {
    const {
      shapeFlag: r,
      children: l,
      anchor: c,
      targetStart: f,
      targetAnchor: u,
      target: h,
      props: p
    } = t;
    let g = i || !Ee(p);
    const A = $e.get(t);
    if (A && (A.flags |= 8, $e.delete(t), g = !1), h && (o(f), o(u)), i && o(c), r & 16)
      for (let v = 0; v < l.length; v++) {
        const $ = l[v];
        n(
          $,
          e,
          s,
          g,
          !!$.dynamicChildren
        );
      }
  },
  move: ys,
  hydrate: el
};
function ys(t, e, s, { o: { insert: n }, m: o }, i = 2) {
  i === 0 && n(t.targetAnchor, e, s);
  const { el: r, anchor: l, shapeFlag: c, children: f, props: u } = t, h = i === 2;
  if (h && n(r, e, s), (!h || Ee(u)) && c & 16)
    for (let p = 0; p < f.length; p++)
      o(
        f[p],
        e,
        s,
        2
      );
  h && n(l, e, s);
}
function el(t, e, s, n, o, i, {
  o: { nextSibling: r, parentNode: l, querySelector: c, insert: f, createText: u }
}, h) {
  function p($, E) {
    let R = E;
    for (; R; ) {
      if (R && R.nodeType === 8) {
        if (R.data === "teleport start anchor")
          e.targetStart = R;
        else if (R.data === "teleport anchor") {
          e.targetAnchor = R, $._lpa = e.targetAnchor && r(e.targetAnchor);
          break;
        }
      }
      R = r(R);
    }
  }
  function g($, E) {
    E.anchor = h(
      r($),
      E,
      l($),
      s,
      n,
      o,
      i
    );
  }
  const A = e.target = _n(
    e.props,
    c
  ), v = Ee(e.props);
  if (A) {
    const $ = A._lpa || A.firstChild;
    e.shapeFlag & 16 && (v ? (g(t, e), p(A, $), e.targetAnchor || gn(
      A,
      e,
      u,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(t) === A ? t : null
    )) : (e.anchor = r(t), p(A, $), e.targetAnchor || gn(A, e, u, f), h(
      $ && r($),
      e,
      A,
      s,
      n,
      o,
      i
    ))), Ye(e, v);
  } else v && e.shapeFlag & 16 && (g(t, e), e.targetStart = t, e.targetAnchor = r(t));
  return e.anchor && r(e.anchor);
}
const sl = tl;
function Ye(t, e) {
  const s = t.ctx;
  if (s && s.ut) {
    let n, o;
    for (e ? (n = t.el, o = t.anchor) : (n = t.targetStart, o = t.targetAnchor); n && n !== o; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function gn(t, e, s, n, o = null) {
  const i = e.targetStart = s(""), r = e.targetAnchor = s("");
  return i[mi] = r, t && (n(i, t, o), n(r, t, o)), r;
}
const nl = /* @__PURE__ */ Symbol("_leaveCb");
function Dn(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Dn(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
// @__NO_SIDE_EFFECTS__
function Qt(t, e) {
  return G(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    gt({ name: t.name }, e, { setup: t })
  ) : t;
}
function vi(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Zn(t, e) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(t, e)) && !s.configurable);
}
const ks = /* @__PURE__ */ new WeakMap();
function es(t, e, s, n, o = !1) {
  if (B(t)) {
    t.forEach(
      (v, $) => es(
        v,
        e && (B(e) ? e[$] : e),
        s,
        n,
        o
      )
    );
    return;
  }
  if (ss(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && es(t, e, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? Gs(n.component) : n.el, r = o ? null : i, { i: l, r: c } = t, f = e && e.r, u = l.refs === lt ? l.refs = {} : l.refs, h = l.setupState, p = /* @__PURE__ */ Z(h), g = h === lt ? Lo : (v) => Zn(u, v) ? !1 : et(p, v), A = (v, $) => !($ && Zn(u, $));
  if (f != null && f !== c) {
    if (to(e), dt(f))
      u[f] = null, g(f) && (h[f] = null);
    else if (/* @__PURE__ */ ut(f)) {
      const v = e;
      A(f, v.k) && (f.value = null), v.k && (u[v.k] = null);
    }
  }
  if (G(c))
    ps(c, l, 12, [r, u]);
  else {
    const v = dt(c), $ = /* @__PURE__ */ ut(c);
    if (v || $) {
      const E = () => {
        if (t.f) {
          const R = v ? g(c) ? h[c] : u[c] : A() || !t.k ? c.value : u[t.k];
          if (o)
            B(R) && Tn(R, i);
          else if (B(R))
            R.includes(i) || R.push(i);
          else if (v)
            u[c] = [i], g(c) && (h[c] = u[c]);
          else {
            const M = [i];
            A(c, t.k) && (c.value = M), t.k && (u[t.k] = M);
          }
        } else v ? (u[c] = r, g(c) && (h[c] = r)) : $ && (A(c, t.k) && (c.value = r), t.k && (u[t.k] = r));
      };
      if (r) {
        const R = () => {
          E(), ks.delete(t);
        };
        R.id = -1, ks.set(t, R), wt(R, s);
      } else
        to(t), E();
    }
  }
}
function to(t) {
  const e = ks.get(t);
  e && (e.flags |= 8, ks.delete(t));
}
Hs().requestIdleCallback;
Hs().cancelIdleCallback;
const ss = (t) => !!t.type.__asyncLoader, yi = (t) => t.type.__isKeepAlive;
function ol(t, e) {
  bi(t, "a", e);
}
function il(t, e) {
  bi(t, "da", e);
}
function bi(t, e, s = Ct) {
  const n = t.__wdc || (t.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return t();
  });
  if (Ws(e, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      yi(o.parent.vnode) && rl(n, e, s, o), o = o.parent;
  }
}
function rl(t, e, s, n) {
  const o = Ws(
    e,
    t,
    n,
    !0
    /* prepend */
  );
  jn(() => {
    Tn(n[e], o);
  }, s);
}
function Ws(t, e, s = Ct, n = !1) {
  if (s) {
    const o = s[t] || (s[t] = []), i = e.__weh || (e.__weh = (...r) => {
      ae();
      const l = _s(s), c = Yt(e, s, t, r);
      return l(), ue(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const de = (t) => (e, s = Ct) => {
  (!us || t === "sp") && Ws(t, (...n) => e(...n), s);
}, ll = de("bm"), Si = de("m"), cl = de(
  "bu"
), al = de("u"), ul = de(
  "bum"
), jn = de("um"), fl = de(
  "sp"
), dl = de("rtg"), hl = de("rtc");
function pl(t, e = Ct) {
  Ws("ec", t, e);
}
const _l = /* @__PURE__ */ Symbol.for("v-ndc");
function Lt(t, e, s, n) {
  let o;
  const i = s, r = B(t);
  if (r || dt(t)) {
    const l = r && /* @__PURE__ */ Gt(t);
    let c = !1, f = !1;
    l && (c = !/* @__PURE__ */ Ot(t), f = /* @__PURE__ */ fe(t), t = Vs(t)), o = new Array(t.length);
    for (let u = 0, h = t.length; u < h; u++)
      o[u] = e(
        c ? f ? Ke(Ht(t[u])) : Ht(t[u]) : t[u],
        u,
        void 0,
        i
      );
  } else if (typeof t == "number") {
    o = new Array(t);
    for (let l = 0; l < t; l++)
      o[l] = e(l + 1, l, void 0, i);
  } else if (ot(t))
    if (t[Symbol.iterator])
      o = Array.from(
        t,
        (l, c) => e(l, c, void 0, i)
      );
    else {
      const l = Object.keys(t);
      o = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const u = l[c];
        o[c] = e(t[u], u, c, i);
      }
    }
  else
    o = [];
  return o;
}
const mn = (t) => t ? Ui(t) ? Gs(t) : mn(t.parent) : null, ns = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ gt(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => mn(t.parent),
    $root: (t) => mn(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => xi(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Ln(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Fn.bind(t.proxy)),
    $watch: (t) => zr.bind(t)
  })
), on = (t, e) => t !== lt && !t.__isScriptSetup && et(t, e), gl = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: i, accessCache: r, type: l, appContext: c } = t;
    if (e[0] !== "$") {
      const p = r[e];
      if (p !== void 0)
        switch (p) {
          case 1:
            return n[e];
          case 2:
            return o[e];
          case 4:
            return s[e];
          case 3:
            return i[e];
        }
      else {
        if (on(n, e))
          return r[e] = 1, n[e];
        if (o !== lt && et(o, e))
          return r[e] = 2, o[e];
        if (et(i, e))
          return r[e] = 3, i[e];
        if (s !== lt && et(s, e))
          return r[e] = 4, s[e];
        vn && (r[e] = 0);
      }
    }
    const f = ns[e];
    let u, h;
    if (f)
      return e === "$attrs" && vt(t.attrs, "get", ""), f(t);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[e])
    )
      return u;
    if (s !== lt && et(s, e))
      return r[e] = 4, s[e];
    if (
      // global properties
      h = c.config.globalProperties, et(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, s) {
    const { data: n, setupState: o, ctx: i } = t;
    return on(o, e) ? (o[e] = s, !0) : n !== lt && et(n, e) ? (n[e] = s, !0) : et(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = s, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: s, ctx: n, appContext: o, props: i, type: r }
  }, l) {
    let c;
    return !!(s[l] || t !== lt && l[0] !== "$" && et(t, l) || on(e, l) || et(i, l) || et(n, l) || et(ns, l) || et(o.config.globalProperties, l) || (c = r.__cssModules) && c[l]);
  },
  defineProperty(t, e, s) {
    return s.get != null ? t._.accessCache[e] = 0 : et(s, "value") && this.set(t, e, s.value, null), Reflect.defineProperty(t, e, s);
  }
};
function eo(t) {
  return B(t) ? t.reduce(
    (e, s) => (e[s] = null, e),
    {}
  ) : t;
}
let vn = !0;
function ml(t) {
  const e = xi(t), s = t.proxy, n = t.ctx;
  vn = !1, e.beforeCreate && so(e.beforeCreate, t, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: r,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: u,
    beforeMount: h,
    mounted: p,
    beforeUpdate: g,
    updated: A,
    activated: v,
    deactivated: $,
    beforeDestroy: E,
    beforeUnmount: R,
    destroyed: M,
    unmounted: D,
    render: W,
    renderTracked: z,
    renderTriggered: L,
    errorCaptured: j,
    serverPrefetch: q,
    // public API
    expose: tt,
    inheritAttrs: pt,
    // assets
    components: yt,
    directives: Tt,
    filters: Zt
  } = e;
  if (f && vl(f, n, null), r)
    for (const K in r) {
      const st = r[K];
      G(st) && (n[K] = st.bind(s));
    }
  if (o) {
    const K = o.call(s, s);
    ot(K) && (t.data = /* @__PURE__ */ Us(K));
  }
  if (vn = !0, i)
    for (const K in i) {
      const st = i[K], te = G(st) ? st.bind(s, s) : G(st.get) ? st.get.bind(s, s) : Jt, Ie = !G(st) && G(st.set) ? st.set.bind(s) : Jt, ee = ht({
        get: te,
        set: Ie
      });
      Object.defineProperty(n, K, {
        enumerable: !0,
        configurable: !0,
        get: () => ee.value,
        set: (Mt) => ee.value = Mt
      });
    }
  if (l)
    for (const K in l)
      wi(l[K], n, s, K);
  if (c) {
    const K = G(c) ? c.call(s) : c;
    Reflect.ownKeys(K).forEach((st) => {
      Jr(st, K[st]);
    });
  }
  u && so(u, t, "c");
  function rt(K, st) {
    B(st) ? st.forEach((te) => K(te.bind(s))) : st && K(st.bind(s));
  }
  if (rt(ll, h), rt(Si, p), rt(cl, g), rt(al, A), rt(ol, v), rt(il, $), rt(pl, j), rt(hl, z), rt(dl, L), rt(ul, R), rt(jn, D), rt(fl, q), B(tt))
    if (tt.length) {
      const K = t.exposed || (t.exposed = {});
      tt.forEach((st) => {
        Object.defineProperty(K, st, {
          get: () => s[st],
          set: (te) => s[st] = te,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  W && t.render === Jt && (t.render = W), pt != null && (t.inheritAttrs = pt), yt && (t.components = yt), Tt && (t.directives = Tt), q && vi(t);
}
function vl(t, e, s = Jt) {
  B(t) && (t = yn(t));
  for (const n in t) {
    const o = t[n];
    let i;
    ot(o) ? "default" in o ? i = ts(
      o.from || n,
      o.default,
      !0
    ) : i = ts(o.from || n) : i = ts(o), /* @__PURE__ */ ut(i) ? Object.defineProperty(e, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : e[n] = i;
  }
}
function so(t, e, s) {
  Yt(
    B(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy),
    e,
    s
  );
}
function wi(t, e, s, n) {
  let o = n.includes(".") ? gi(s, n) : () => s[n];
  if (dt(t)) {
    const i = e[t];
    G(i) && ye(o, i);
  } else if (G(t))
    ye(o, t.bind(s));
  else if (ot(t))
    if (B(t))
      t.forEach((i) => wi(i, e, s, n));
    else {
      const i = G(t.handler) ? t.handler.bind(s) : e[t.handler];
      G(i) && ye(o, i, t);
    }
}
function xi(t) {
  const e = t.type, { mixins: s, extends: n } = e, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: r }
  } = t.appContext, l = i.get(e);
  let c;
  return l ? c = l : !o.length && !s && !n ? c = e : (c = {}, o.length && o.forEach(
    (f) => Os(c, f, r, !0)
  ), Os(c, e, r)), ot(e) && i.set(e, c), c;
}
function Os(t, e, s, n = !1) {
  const { mixins: o, extends: i } = e;
  i && Os(t, i, s, !0), o && o.forEach(
    (r) => Os(t, r, s, !0)
  );
  for (const r in e)
    if (!(n && r === "expose")) {
      const l = yl[r] || s && s[r];
      t[r] = l ? l(t[r], e[r]) : e[r];
    }
  return t;
}
const yl = {
  data: no,
  props: oo,
  emits: oo,
  // objects
  methods: Qe,
  computed: Qe,
  // lifecycle
  beforeCreate: St,
  created: St,
  beforeMount: St,
  mounted: St,
  beforeUpdate: St,
  updated: St,
  beforeDestroy: St,
  beforeUnmount: St,
  destroyed: St,
  unmounted: St,
  activated: St,
  deactivated: St,
  errorCaptured: St,
  serverPrefetch: St,
  // assets
  components: Qe,
  directives: Qe,
  // watch
  watch: Sl,
  // provide / inject
  provide: no,
  inject: bl
};
function no(t, e) {
  return e ? t ? function() {
    return gt(
      G(t) ? t.call(this, this) : t,
      G(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function bl(t, e) {
  return Qe(yn(t), yn(e));
}
function yn(t) {
  if (B(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++)
      e[t[s]] = t[s];
    return e;
  }
  return t;
}
function St(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Qe(t, e) {
  return t ? gt(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function oo(t, e) {
  return t ? B(t) && B(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : gt(
    /* @__PURE__ */ Object.create(null),
    eo(t),
    eo(e ?? {})
  ) : e;
}
function Sl(t, e) {
  if (!t) return e;
  if (!e) return t;
  const s = gt(/* @__PURE__ */ Object.create(null), t);
  for (const n in e)
    s[n] = St(t[n], e[n]);
  return s;
}
function Ci() {
  return {
    app: null,
    config: {
      isNativeTag: Lo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let wl = 0;
function xl(t, e) {
  return function(n, o = null) {
    G(n) || (n = gt({}, n)), o != null && !ot(o) && (o = null);
    const i = Ci(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = i.app = {
      _uid: wl++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: tc,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return r.has(u) || (u && G(u.install) ? (r.add(u), u.install(f, ...h)) : G(u) && (r.add(u), u(f, ...h))), f;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), f;
      },
      component(u, h) {
        return h ? (i.components[u] = h, f) : i.components[u];
      },
      directive(u, h) {
        return h ? (i.directives[u] = h, f) : i.directives[u];
      },
      mount(u, h, p) {
        if (!c) {
          const g = f._ceVNode || $t(n, o);
          return g.appContext = i, p === !0 ? p = "svg" : p === !1 && (p = void 0), t(g, u, p), c = !0, f._container = u, u.__vue_app__ = f, Gs(g.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && (Yt(
          l,
          f._instance,
          16
        ), t(null, f._container), delete f._container.__vue_app__);
      },
      provide(u, h) {
        return i.provides[u] = h, f;
      },
      runWithContext(u) {
        const h = Me;
        Me = f;
        try {
          return u();
        } finally {
          Me = h;
        }
      }
    };
    return f;
  };
}
let Me = null;
const Cl = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Dt(e)}Modifiers`] || t[`${Pe(e)}Modifiers`];
function $l(t, e, ...s) {
  if (t.isUnmounted) return;
  const n = t.vnode.props || lt;
  let o = s;
  const i = e.startsWith("update:"), r = i && Cl(n, e.slice(7));
  r && (r.trim && (o = s.map((u) => dt(u) ? u.trim() : u)), r.number && (o = s.map(Ns)));
  let l, c = n[l = Zs(e)] || // also try camelCase event handler (#2249)
  n[l = Zs(Dt(e))];
  !c && i && (c = n[l = Zs(Pe(e))]), c && Yt(
    c,
    t,
    6,
    o
  );
  const f = n[l + "Once"];
  if (f) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, Yt(
      f,
      t,
      6,
      o
    );
  }
}
const Tl = /* @__PURE__ */ new WeakMap();
function $i(t, e, s = !1) {
  const n = s ? Tl : e.emitsCache, o = n.get(t);
  if (o !== void 0)
    return o;
  const i = t.emits;
  let r = {}, l = !1;
  if (!G(t)) {
    const c = (f) => {
      const u = $i(f, e, !0);
      u && (l = !0, gt(r, u));
    };
    !s && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  return !i && !l ? (ot(t) && n.set(t, null), null) : (B(i) ? i.forEach((c) => r[c] = null) : gt(r, i), ot(t) && n.set(t, r), r);
}
function qs(t, e) {
  return !t || !Is(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), et(t, e[0].toLowerCase() + e.slice(1)) || et(t, Pe(e)) || et(t, e));
}
function io(t) {
  const {
    type: e,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [i],
    slots: r,
    attrs: l,
    emit: c,
    render: f,
    renderCache: u,
    props: h,
    data: p,
    setupState: g,
    ctx: A,
    inheritAttrs: v
  } = t, $ = As(t);
  let E, R;
  try {
    if (s.shapeFlag & 4) {
      const D = o || n, W = D;
      E = Wt(
        f.call(
          W,
          D,
          u,
          h,
          g,
          p,
          A
        )
      ), R = l;
    } else {
      const D = e;
      E = Wt(
        D.length > 1 ? D(
          h,
          { attrs: l, slots: r, emit: c }
        ) : D(
          h,
          null
        )
      ), R = e.props ? l : Al(l);
    }
  } catch (D) {
    os.length = 0, Ks(D, t, 1), E = $t(be);
  }
  let M = E;
  if (R && v !== !1) {
    const D = Object.keys(R), { shapeFlag: W } = M;
    D.length && W & 7 && (i && D.some(Fs) && (R = El(
      R,
      i
    )), M = We(M, R, !1, !0));
  }
  return s.dirs && (M = We(M, null, !1, !0), M.dirs = M.dirs ? M.dirs.concat(s.dirs) : s.dirs), s.transition && Dn(M, s.transition), E = M, As($), E;
}
const Al = (t) => {
  let e;
  for (const s in t)
    (s === "class" || s === "style" || Is(s)) && ((e || (e = {}))[s] = t[s]);
  return e;
}, El = (t, e) => {
  const s = {};
  for (const n in t)
    (!Fs(n) || !(n.slice(9) in e)) && (s[n] = t[n]);
  return s;
};
function kl(t, e, s) {
  const { props: n, children: o, component: i } = t, { props: r, children: l, patchFlag: c } = e, f = i.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? ro(n, r, f) : !!r;
    if (c & 8) {
      const u = e.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const p = u[h];
        if (Ti(r, n, p) && !qs(f, p))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? ro(n, r, f) : !0 : !!r;
  return !1;
}
function ro(t, e, s) {
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (Ti(e, t, i) && !qs(s, i))
      return !0;
  }
  return !1;
}
function Ti(t, e, s) {
  const n = t[s], o = e[s];
  return s === "style" && ot(n) && ot(o) ? !hs(n, o) : n !== o;
}
function Ol({ vnode: t, parent: e, suspense: s }, n) {
  for (; e; ) {
    const o = e.subTree;
    if (o.suspense && o.suspense.activeBranch === t && (o.suspense.vnode.el = o.el = n, t = o), o === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
  s && s.activeBranch === t && (s.vnode.el = n);
}
const Ai = {}, Ei = () => Object.create(Ai), ki = (t) => Object.getPrototypeOf(t) === Ai;
function Ml(t, e, s, n = !1) {
  const o = {}, i = Ei();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Oi(t, e, o, i);
  for (const r in t.propsOptions[0])
    r in o || (o[r] = void 0);
  s ? t.props = n ? o : /* @__PURE__ */ Mr(o) : t.type.props ? t.props = o : t.props = i, t.attrs = i;
}
function Pl(t, e, s, n) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: r }
  } = t, l = /* @__PURE__ */ Z(o), [c] = t.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const u = t.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let p = u[h];
        if (qs(t.emitsOptions, p))
          continue;
        const g = e[p];
        if (c)
          if (et(i, p))
            g !== i[p] && (i[p] = g, f = !0);
          else {
            const A = Dt(p);
            o[A] = bn(
              c,
              l,
              A,
              g,
              t,
              !1
            );
          }
        else
          g !== i[p] && (i[p] = g, f = !0);
      }
    }
  } else {
    Oi(t, e, o, i) && (f = !0);
    let u;
    for (const h in l)
      (!e || // for camelCase
      !et(e, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Pe(h)) === h || !et(e, u))) && (c ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[u] !== void 0) && (o[h] = bn(
        c,
        l,
        h,
        void 0,
        t,
        !0
      )) : delete o[h]);
    if (i !== l)
      for (const h in i)
        (!e || !et(e, h)) && (delete i[h], f = !0);
  }
  f && re(t.attrs, "set", "");
}
function Oi(t, e, s, n) {
  const [o, i] = t.propsOptions;
  let r = !1, l;
  if (e)
    for (let c in e) {
      if (ze(c))
        continue;
      const f = e[c];
      let u;
      o && et(o, u = Dt(c)) ? !i || !i.includes(u) ? s[u] = f : (l || (l = {}))[u] = f : qs(t.emitsOptions, c) || (!(c in n) || f !== n[c]) && (n[c] = f, r = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ Z(s), f = l || lt;
    for (let u = 0; u < i.length; u++) {
      const h = i[u];
      s[h] = bn(
        o,
        c,
        h,
        f[h],
        t,
        !et(f, h)
      );
    }
  }
  return r;
}
function bn(t, e, s, n, o, i) {
  const r = t[s];
  if (r != null) {
    const l = et(r, "default");
    if (l && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && G(c)) {
        const { propsDefaults: f } = o;
        if (s in f)
          n = f[s];
        else {
          const u = _s(o);
          n = f[s] = c.call(
            null,
            e
          ), u();
        }
      } else
        n = c;
      o.ce && o.ce._setProp(s, n);
    }
    r[
      0
      /* shouldCast */
    ] && (i && !l ? n = !1 : r[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Pe(s)) && (n = !0));
  }
  return n;
}
const Rl = /* @__PURE__ */ new WeakMap();
function Mi(t, e, s = !1) {
  const n = s ? Rl : e.propsCache, o = n.get(t);
  if (o)
    return o;
  const i = t.props, r = {}, l = [];
  let c = !1;
  if (!G(t)) {
    const u = (h) => {
      c = !0;
      const [p, g] = Mi(h, e, !0);
      gt(r, p), g && l.push(...g);
    };
    !s && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  if (!i && !c)
    return ot(t) && n.set(t, He), He;
  if (B(i))
    for (let u = 0; u < i.length; u++) {
      const h = Dt(i[u]);
      lo(h) && (r[h] = lt);
    }
  else if (i)
    for (const u in i) {
      const h = Dt(u);
      if (lo(h)) {
        const p = i[u], g = r[h] = B(p) || G(p) ? { type: p } : gt({}, p), A = g.type;
        let v = !1, $ = !0;
        if (B(A))
          for (let E = 0; E < A.length; ++E) {
            const R = A[E], M = G(R) && R.name;
            if (M === "Boolean") {
              v = !0;
              break;
            } else M === "String" && ($ = !1);
          }
        else
          v = G(A) && A.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = v, g[
          1
          /* shouldCastTrue */
        ] = $, (v || et(g, "default")) && l.push(h);
      }
    }
  const f = [r, l];
  return ot(t) && n.set(t, f), f;
}
function lo(t) {
  return t[0] !== "$" && !ze(t);
}
const Nn = (t) => t === "_" || t === "_ctx" || t === "$stable", Hn = (t) => B(t) ? t.map(Wt) : [Wt(t)], Il = (t, e, s) => {
  if (e._n)
    return e;
  const n = qr((...o) => Hn(e(...o)), s);
  return n._c = !1, n;
}, Pi = (t, e, s) => {
  const n = t._ctx;
  for (const o in t) {
    if (Nn(o)) continue;
    const i = t[o];
    if (G(i))
      e[o] = Il(o, i, n);
    else if (i != null) {
      const r = Hn(i);
      e[o] = () => r;
    }
  }
}, Ri = (t, e) => {
  const s = Hn(e);
  t.slots.default = () => s;
}, Ii = (t, e, s) => {
  for (const n in e)
    (s || !Nn(n)) && (t[n] = e[n]);
}, Fl = (t, e, s) => {
  const n = t.slots = Ei();
  if (t.vnode.shapeFlag & 32) {
    const o = e._;
    o ? (Ii(n, e, s), s && Vo(n, "_", o, !0)) : Pi(e, n);
  } else e && Ri(t, e);
}, Ll = (t, e, s) => {
  const { vnode: n, slots: o } = t;
  let i = !0, r = lt;
  if (n.shapeFlag & 32) {
    const l = e._;
    l ? s && l === 1 ? i = !1 : Ii(o, e, s) : (i = !e.$stable, Pi(e, o)), r = e;
  } else e && (Ri(t, e), r = { default: 1 });
  if (i)
    for (const l in o)
      !Nn(l) && r[l] == null && delete o[l];
}, wt = Vl;
function Dl(t) {
  return jl(t);
}
function jl(t, e) {
  const s = Hs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: i,
    createElement: r,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: u,
    parentNode: h,
    nextSibling: p,
    setScopeId: g = Jt,
    insertStaticContent: A
  } = t, v = (a, d, _, x = null, S = null, w = null, P = void 0, O = null, k = !!d.dynamicChildren) => {
    if (a === d)
      return;
    a && !Ge(a, d) && (x = Vt(a), Mt(a, S, w, !0), a = null), d.patchFlag === -2 && (k = !1, d.dynamicChildren = null);
    const { type: y, ref: V, shapeFlag: I } = d;
    switch (y) {
      case Js:
        $(a, d, _, x);
        break;
      case be:
        E(a, d, _, x);
        break;
      case ln:
        a == null && R(d, _, x, P);
        break;
      case at:
        yt(
          a,
          d,
          _,
          x,
          S,
          w,
          P,
          O,
          k
        );
        break;
      default:
        I & 1 ? W(
          a,
          d,
          _,
          x,
          S,
          w,
          P,
          O,
          k
        ) : I & 6 ? Tt(
          a,
          d,
          _,
          x,
          S,
          w,
          P,
          O,
          k
        ) : (I & 64 || I & 128) && y.process(
          a,
          d,
          _,
          x,
          S,
          w,
          P,
          O,
          k,
          At
        );
    }
    V != null && S ? es(V, a && a.ref, w, d || a, !d) : V == null && a && a.ref != null && es(a.ref, null, w, a, !0);
  }, $ = (a, d, _, x) => {
    if (a == null)
      n(
        d.el = l(d.children),
        _,
        x
      );
    else {
      const S = d.el = a.el;
      d.children !== a.children && f(S, d.children);
    }
  }, E = (a, d, _, x) => {
    a == null ? n(
      d.el = c(d.children || ""),
      _,
      x
    ) : d.el = a.el;
  }, R = (a, d, _, x) => {
    [a.el, a.anchor] = A(
      a.children,
      d,
      _,
      x,
      a.el,
      a.anchor
    );
  }, M = ({ el: a, anchor: d }, _, x) => {
    let S;
    for (; a && a !== d; )
      S = p(a), n(a, _, x), a = S;
    n(d, _, x);
  }, D = ({ el: a, anchor: d }) => {
    let _;
    for (; a && a !== d; )
      _ = p(a), o(a), a = _;
    o(d);
  }, W = (a, d, _, x, S, w, P, O, k) => {
    if (d.type === "svg" ? P = "svg" : d.type === "math" && (P = "mathml"), a == null)
      z(
        d,
        _,
        x,
        S,
        w,
        P,
        O,
        k
      );
    else {
      const y = a.el && a.el._isVueCE ? a.el : null;
      try {
        y && y._beginPatch(), q(
          a,
          d,
          S,
          w,
          P,
          O,
          k
        );
      } finally {
        y && y._endPatch();
      }
    }
  }, z = (a, d, _, x, S, w, P, O) => {
    let k, y;
    const { props: V, shapeFlag: I, transition: N, dirs: H } = a;
    if (k = a.el = r(
      a.type,
      w,
      V && V.is,
      V
    ), I & 8 ? u(k, a.children) : I & 16 && j(
      a.children,
      k,
      null,
      x,
      S,
      rn(a, w),
      P,
      O
    ), H && Ce(a, null, x, "created"), L(k, a, a.scopeId, P, x), V) {
      for (const nt in V)
        nt !== "value" && !ze(nt) && i(k, nt, null, V[nt], w, x);
      "value" in V && i(k, "value", null, V.value, w), (y = V.onVnodeBeforeMount) && Ut(y, x, a);
    }
    H && Ce(a, null, x, "beforeMount");
    const X = Nl(S, N);
    X && N.beforeEnter(k), n(k, d, _), ((y = V && V.onVnodeMounted) || X || H) && wt(() => {
      try {
        y && Ut(y, x, a), X && N.enter(k), H && Ce(a, null, x, "mounted");
      } finally {
      }
    }, S);
  }, L = (a, d, _, x, S) => {
    if (_ && g(a, _), x)
      for (let w = 0; w < x.length; w++)
        g(a, x[w]);
    if (S) {
      let w = S.subTree;
      if (d === w || Di(w.type) && (w.ssContent === d || w.ssFallback === d)) {
        const P = S.vnode;
        L(
          a,
          P,
          P.scopeId,
          P.slotScopeIds,
          S.parent
        );
      }
    }
  }, j = (a, d, _, x, S, w, P, O, k = 0) => {
    for (let y = k; y < a.length; y++) {
      const V = a[y] = O ? ie(a[y]) : Wt(a[y]);
      v(
        null,
        V,
        d,
        _,
        x,
        S,
        w,
        P,
        O
      );
    }
  }, q = (a, d, _, x, S, w, P) => {
    const O = d.el = a.el;
    let { patchFlag: k, dynamicChildren: y, dirs: V } = d;
    k |= a.patchFlag & 16;
    const I = a.props || lt, N = d.props || lt;
    let H;
    if (_ && Te(_, !1), (H = N.onVnodeBeforeUpdate) && Ut(H, _, d, a), V && Ce(d, a, _, "beforeUpdate"), _ && Te(_, !0), (I.innerHTML && N.innerHTML == null || I.textContent && N.textContent == null) && u(O, ""), y ? tt(
      a.dynamicChildren,
      y,
      O,
      _,
      x,
      rn(d, S),
      w
    ) : P || st(
      a,
      d,
      O,
      null,
      _,
      x,
      rn(d, S),
      w,
      !1
    ), k > 0) {
      if (k & 16)
        pt(O, I, N, _, S);
      else if (k & 2 && I.class !== N.class && i(O, "class", null, N.class, S), k & 4 && i(O, "style", I.style, N.style, S), k & 8) {
        const X = d.dynamicProps;
        for (let nt = 0; nt < X.length; nt++) {
          const it = X[nt], ft = I[it], _t = N[it];
          (_t !== ft || it === "value") && i(O, it, ft, _t, S, _);
        }
      }
      k & 1 && a.children !== d.children && u(O, d.children);
    } else !P && y == null && pt(O, I, N, _, S);
    ((H = N.onVnodeUpdated) || V) && wt(() => {
      H && Ut(H, _, d, a), V && Ce(d, a, _, "updated");
    }, x);
  }, tt = (a, d, _, x, S, w, P) => {
    for (let O = 0; O < d.length; O++) {
      const k = a[O], y = d[O], V = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        k.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (k.type === at || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ge(k, y) || // - In the case of a component, it could contain anything.
        k.shapeFlag & 198) ? h(k.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      v(
        k,
        y,
        V,
        null,
        x,
        S,
        w,
        P,
        !0
      );
    }
  }, pt = (a, d, _, x, S) => {
    if (d !== _) {
      if (d !== lt)
        for (const w in d)
          !ze(w) && !(w in _) && i(
            a,
            w,
            d[w],
            null,
            S,
            x
          );
      for (const w in _) {
        if (ze(w)) continue;
        const P = _[w], O = d[w];
        P !== O && w !== "value" && i(a, w, O, P, S, x);
      }
      "value" in _ && i(a, "value", d.value, _.value, S);
    }
  }, yt = (a, d, _, x, S, w, P, O, k) => {
    const y = d.el = a ? a.el : l(""), V = d.anchor = a ? a.anchor : l("");
    let { patchFlag: I, dynamicChildren: N, slotScopeIds: H } = d;
    H && (O = O ? O.concat(H) : H), a == null ? (n(y, _, x), n(V, _, x), j(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      _,
      V,
      S,
      w,
      P,
      O,
      k
    )) : I > 0 && I & 64 && N && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren && a.dynamicChildren.length === N.length ? (tt(
      a.dynamicChildren,
      N,
      _,
      S,
      w,
      P,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || S && d === S.subTree) && Vn(
      a,
      d,
      !0
      /* shallow */
    )) : st(
      a,
      d,
      _,
      V,
      S,
      w,
      P,
      O,
      k
    );
  }, Tt = (a, d, _, x, S, w, P, O, k) => {
    d.slotScopeIds = O, a == null ? d.shapeFlag & 512 ? S.ctx.activate(
      d,
      _,
      x,
      P,
      k
    ) : Zt(
      d,
      _,
      x,
      S,
      w,
      P,
      k
    ) : pe(a, d, k);
  }, Zt = (a, d, _, x, S, w, P) => {
    const O = a.component = Gl(
      a,
      x,
      S
    );
    if (yi(a) && (O.ctx.renderer = At), Yl(O, !1, P), O.asyncDep) {
      if (S && S.registerDep(O, rt, P), !a.el) {
        const k = O.subTree = $t(be);
        E(null, k, d, _), a.placeholder = k.el;
      }
    } else
      rt(
        O,
        a,
        d,
        _,
        S,
        w,
        P
      );
  }, pe = (a, d, _) => {
    const x = d.component = a.component;
    if (kl(a, d, _))
      if (x.asyncDep && !x.asyncResolved) {
        K(x, d, _);
        return;
      } else
        x.next = d, x.update();
    else
      d.el = a.el, x.vnode = d;
  }, rt = (a, d, _, x, S, w, P) => {
    const O = () => {
      if (a.isMounted) {
        let { next: I, bu: N, u: H, parent: X, vnode: nt } = a;
        {
          const Et = Fi(a);
          if (Et) {
            I && (I.el = nt.el, K(a, I, P)), Et.asyncDep.then(() => {
              wt(() => {
                a.isUnmounted || y();
              }, S);
            });
            return;
          }
        }
        let it = I, ft;
        Te(a, !1), I ? (I.el = nt.el, K(a, I, P)) : I = nt, N && bs(N), (ft = I.props && I.props.onVnodeBeforeUpdate) && Ut(ft, X, I, nt), Te(a, !0);
        const _t = io(a), Pt = a.subTree;
        a.subTree = _t, v(
          Pt,
          _t,
          // parent may have changed if it's in a teleport
          h(Pt.el),
          // anchor may have changed if it's in a fragment
          Vt(Pt),
          a,
          S,
          w
        ), I.el = _t.el, it === null && Ol(a, _t.el), H && wt(H, S), (ft = I.props && I.props.onVnodeUpdated) && wt(
          () => Ut(ft, X, I, nt),
          S
        );
      } else {
        let I;
        const { el: N, props: H } = d, { bm: X, m: nt, parent: it, root: ft, type: _t } = a, Pt = ss(d);
        Te(a, !1), X && bs(X), !Pt && (I = H && H.onVnodeBeforeMount) && Ut(I, it, d), Te(a, !0);
        {
          ft.ce && ft.ce._hasShadowRoot() && ft.ce._injectChildStyle(
            _t,
            a.parent ? a.parent.type : void 0
          );
          const Et = a.subTree = io(a);
          v(
            null,
            Et,
            _,
            x,
            a,
            S,
            w
          ), d.el = Et.el;
        }
        if (nt && wt(nt, S), !Pt && (I = H && H.onVnodeMounted)) {
          const Et = d;
          wt(
            () => Ut(I, it, Et),
            S
          );
        }
        (d.shapeFlag & 256 || it && ss(it.vnode) && it.vnode.shapeFlag & 256) && a.a && wt(a.a, S), a.isMounted = !0, d = _ = x = null;
      }
    };
    a.scope.on();
    const k = a.effect = new Go(O);
    a.scope.off();
    const y = a.update = k.run.bind(k), V = a.job = k.runIfDirty.bind(k);
    V.i = a, V.id = a.uid, k.scheduler = () => Ln(V), Te(a, !0), y();
  }, K = (a, d, _) => {
    d.component = a;
    const x = a.vnode.props;
    a.vnode = d, a.next = null, Pl(a, d.props, x, _), Ll(a, d.children, _), ae(), Qn(a), ue();
  }, st = (a, d, _, x, S, w, P, O, k = !1) => {
    const y = a && a.children, V = a ? a.shapeFlag : 0, I = d.children, { patchFlag: N, shapeFlag: H } = d;
    if (N > 0) {
      if (N & 128) {
        Ie(
          y,
          I,
          _,
          x,
          S,
          w,
          P,
          O,
          k
        );
        return;
      } else if (N & 256) {
        te(
          y,
          I,
          _,
          x,
          S,
          w,
          P,
          O,
          k
        );
        return;
      }
    }
    H & 8 ? (V & 16 && Se(y, S, w), I !== y && u(_, I)) : V & 16 ? H & 16 ? Ie(
      y,
      I,
      _,
      x,
      S,
      w,
      P,
      O,
      k
    ) : Se(y, S, w, !0) : (V & 8 && u(_, ""), H & 16 && j(
      I,
      _,
      x,
      S,
      w,
      P,
      O,
      k
    ));
  }, te = (a, d, _, x, S, w, P, O, k) => {
    a = a || He, d = d || He;
    const y = a.length, V = d.length, I = Math.min(y, V);
    let N;
    for (N = 0; N < I; N++) {
      const H = d[N] = k ? ie(d[N]) : Wt(d[N]);
      v(
        a[N],
        H,
        _,
        null,
        S,
        w,
        P,
        O,
        k
      );
    }
    y > V ? Se(
      a,
      S,
      w,
      !0,
      !1,
      I
    ) : j(
      d,
      _,
      x,
      S,
      w,
      P,
      O,
      k,
      I
    );
  }, Ie = (a, d, _, x, S, w, P, O, k) => {
    let y = 0;
    const V = d.length;
    let I = a.length - 1, N = V - 1;
    for (; y <= I && y <= N; ) {
      const H = a[y], X = d[y] = k ? ie(d[y]) : Wt(d[y]);
      if (Ge(H, X))
        v(
          H,
          X,
          _,
          null,
          S,
          w,
          P,
          O,
          k
        );
      else
        break;
      y++;
    }
    for (; y <= I && y <= N; ) {
      const H = a[I], X = d[N] = k ? ie(d[N]) : Wt(d[N]);
      if (Ge(H, X))
        v(
          H,
          X,
          _,
          null,
          S,
          w,
          P,
          O,
          k
        );
      else
        break;
      I--, N--;
    }
    if (y > I) {
      if (y <= N) {
        const H = N + 1, X = H < V ? d[H].el : x;
        for (; y <= N; )
          v(
            null,
            d[y] = k ? ie(d[y]) : Wt(d[y]),
            _,
            X,
            S,
            w,
            P,
            O,
            k
          ), y++;
      }
    } else if (y > N)
      for (; y <= I; )
        Mt(a[y], S, w, !0), y++;
    else {
      const H = y, X = y, nt = /* @__PURE__ */ new Map();
      for (y = X; y <= N; y++) {
        const U = d[y] = k ? ie(d[y]) : Wt(d[y]);
        U.key != null && nt.set(U.key, y);
      }
      let it, ft = 0;
      const _t = N - X + 1;
      let Pt = !1, Et = 0;
      const _e = new Array(_t);
      for (y = 0; y < _t; y++) _e[y] = 0;
      for (y = H; y <= I; y++) {
        const U = a[y];
        if (ft >= _t) {
          Mt(U, S, w, !0);
          continue;
        }
        let bt;
        if (U.key != null)
          bt = nt.get(U.key);
        else
          for (it = X; it <= N; it++)
            if (_e[it - X] === 0 && Ge(U, d[it])) {
              bt = it;
              break;
            }
        bt === void 0 ? Mt(U, S, w, !0) : (_e[bt - X] = y + 1, bt >= Et ? Et = bt : Pt = !0, v(
          U,
          d[bt],
          _,
          null,
          S,
          w,
          P,
          O,
          k
        ), ft++);
      }
      const F = Pt ? Hl(_e) : He;
      for (it = F.length - 1, y = _t - 1; y >= 0; y--) {
        const U = X + y, bt = d[U], xe = d[U + 1], Le = U + 1 < V ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          xe.el || Li(xe)
        ) : x;
        _e[y] === 0 ? v(
          null,
          bt,
          _,
          Le,
          S,
          w,
          P,
          O,
          k
        ) : Pt && (it < 0 || y !== F[it] ? ee(bt, _, Le, 2) : it--);
      }
    }
  }, ee = (a, d, _, x, S = null) => {
    const { el: w, type: P, transition: O, children: k, shapeFlag: y } = a;
    if (y & 6) {
      ee(a.component.subTree, d, _, x);
      return;
    }
    if (y & 128) {
      a.suspense.move(d, _, x);
      return;
    }
    if (y & 64) {
      P.move(a, d, _, At);
      return;
    }
    if (P === at) {
      n(w, d, _);
      for (let I = 0; I < k.length; I++)
        ee(k[I], d, _, x);
      n(a.anchor, d, _);
      return;
    }
    if (P === ln) {
      M(a, d, _);
      return;
    }
    if (x !== 2 && y & 1 && O)
      if (x === 0)
        O.beforeEnter(w), n(w, d, _), wt(() => O.enter(w), S);
      else {
        const { leave: I, delayLeave: N, afterLeave: H } = O, X = () => {
          a.ctx.isUnmounted ? o(w) : n(w, d, _);
        }, nt = () => {
          w._isLeaving && w[nl](
            !0
            /* cancelled */
          ), I(w, () => {
            X(), H && H();
          });
        };
        N ? N(w, X, nt) : nt();
      }
    else
      n(w, d, _);
  }, Mt = (a, d, _, x = !1, S = !1) => {
    const {
      type: w,
      props: P,
      ref: O,
      children: k,
      dynamicChildren: y,
      shapeFlag: V,
      patchFlag: I,
      dirs: N,
      cacheIndex: H,
      memo: X
    } = a;
    if (I === -2 && (S = !1), O != null && (ae(), es(O, null, _, a, !0), ue()), H != null && (d.renderCache[H] = void 0), V & 256) {
      d.ctx.deactivate(a);
      return;
    }
    const nt = V & 1 && N, it = !ss(a);
    let ft;
    if (it && (ft = P && P.onVnodeBeforeUnmount) && Ut(ft, d, a), V & 6)
      Xs(a.component, _, x);
    else {
      if (V & 128) {
        a.suspense.unmount(_, x);
        return;
      }
      nt && Ce(a, null, d, "beforeUnmount"), V & 64 ? a.type.remove(
        a,
        d,
        _,
        At,
        x
      ) : y && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !y.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== at || I > 0 && I & 64) ? Se(
        y,
        d,
        _,
        !1,
        !0
      ) : (w === at && I & 384 || !S && V & 16) && Se(k, d, _), x && Fe(a);
    }
    const _t = X != null && H == null;
    (it && (ft = P && P.onVnodeUnmounted) || nt || _t) && wt(() => {
      ft && Ut(ft, d, a), nt && Ce(a, null, d, "unmounted"), _t && (a.el = null);
    }, _);
  }, Fe = (a) => {
    const { type: d, el: _, anchor: x, transition: S } = a;
    if (d === at) {
      zs(_, x);
      return;
    }
    if (d === ln) {
      D(a);
      return;
    }
    const w = () => {
      o(_), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (a.shapeFlag & 1 && S && !S.persisted) {
      const { leave: P, delayLeave: O } = S, k = () => P(_, w);
      O ? O(a.el, w, k) : k();
    } else
      w();
  }, zs = (a, d) => {
    let _;
    for (; a !== d; )
      _ = p(a), o(a), a = _;
    o(d);
  }, Xs = (a, d, _) => {
    const { bum: x, scope: S, job: w, subTree: P, um: O, m: k, a: y } = a;
    co(k), co(y), x && bs(x), S.stop(), w && (w.flags |= 8, Mt(P, a, d, _)), O && wt(O, d), wt(() => {
      a.isUnmounted = !0;
    }, d);
  }, Se = (a, d, _, x = !1, S = !1, w = 0) => {
    for (let P = w; P < a.length; P++)
      Mt(a[P], d, _, x, S);
  }, Vt = (a) => {
    if (a.shapeFlag & 6)
      return Vt(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const d = p(a.anchor || a.el), _ = d && d[mi];
    return _ ? p(_) : d;
  };
  let we = !1;
  const se = (a, d, _) => {
    let x;
    a == null ? d._vnode && (Mt(d._vnode, null, null, !0), x = d._vnode.component) : v(
      d._vnode || null,
      a,
      d,
      null,
      null,
      null,
      _
    ), d._vnode = a, we || (we = !0, Qn(x), di(), we = !1);
  }, At = {
    p: v,
    um: Mt,
    m: ee,
    r: Fe,
    mt: Zt,
    mc: j,
    pc: st,
    pbc: tt,
    n: Vt,
    o: t
  };
  return {
    render: se,
    hydrate: void 0,
    createApp: xl(se)
  };
}
function rn({ type: t, props: e }, s) {
  return s === "svg" && t === "foreignObject" || s === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : s;
}
function Te({ effect: t, job: e }, s) {
  s ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function Nl(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Vn(t, e, s = !1) {
  const n = t.children, o = e.children;
  if (B(n) && B(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = ie(o[i]), l.el = r.el), !s && l.patchFlag !== -2 && Vn(r, l)), l.type === Js && (l.patchFlag === -1 && (l = o[i] = ie(l)), l.el = r.el), l.type === be && !l.el && (l.el = r.el);
    }
}
function Hl(t) {
  const e = t.slice(), s = [0];
  let n, o, i, r, l;
  const c = t.length;
  for (n = 0; n < c; n++) {
    const f = t[n];
    if (f !== 0) {
      if (o = s[s.length - 1], t[o] < f) {
        e[n] = o, s.push(n);
        continue;
      }
      for (i = 0, r = s.length - 1; i < r; )
        l = i + r >> 1, t[s[l]] < f ? i = l + 1 : r = l;
      f < t[s[i]] && (i > 0 && (e[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, r = s[i - 1]; i-- > 0; )
    s[i] = r, r = e[r];
  return s;
}
function Fi(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Fi(e);
}
function co(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
function Li(t) {
  if (t.placeholder)
    return t.placeholder;
  const e = t.component;
  return e ? Li(e.subTree) : null;
}
const Di = (t) => t.__isSuspense;
function Vl(t, e) {
  e && e.pendingBranch ? B(t) ? e.effects.push(...t) : e.effects.push(t) : Wr(t);
}
const at = /* @__PURE__ */ Symbol.for("v-fgt"), Js = /* @__PURE__ */ Symbol.for("v-txt"), be = /* @__PURE__ */ Symbol.for("v-cmt"), ln = /* @__PURE__ */ Symbol.for("v-stc"), os = [];
let kt = null;
function C(t = !1) {
  os.push(kt = t ? null : []);
}
function Ul() {
  os.pop(), kt = os[os.length - 1] || null;
}
let as = 1;
function ao(t, e = !1) {
  as += t, t < 0 && kt && e && (kt.hasOnce = !0);
}
function ji(t) {
  return t.dynamicChildren = as > 0 ? kt || He : null, Ul(), as > 0 && kt && kt.push(t), t;
}
function T(t, e, s, n, o, i) {
  return ji(
    b(
      t,
      e,
      s,
      n,
      o,
      i,
      !0
    )
  );
}
function ve(t, e, s, n, o) {
  return ji(
    $t(
      t,
      e,
      s,
      n,
      o,
      !0
    )
  );
}
function Ni(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Ge(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Hi = ({ key: t }) => t ?? null, Ss = ({
  ref: t,
  ref_key: e,
  ref_for: s
}) => (typeof t == "number" && (t = "" + t), t != null ? dt(t) || /* @__PURE__ */ ut(t) || G(t) ? { i: Rt, r: t, k: e, f: !!s } : t : null);
function b(t, e = null, s = null, n = 0, o = null, i = t === at ? 0 : 1, r = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Hi(e),
    ref: e && Ss(e),
    scopeId: pi,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Rt
  };
  return l ? (Un(c, s), i & 128 && t.normalize(c)) : s && (c.shapeFlag |= dt(s) ? 8 : 16), as > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  kt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && kt.push(c), c;
}
const $t = Bl;
function Bl(t, e = null, s = null, n = 0, o = null, i = !1) {
  if ((!t || t === _l) && (t = be), Ni(t)) {
    const l = We(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return s && Un(l, s), as > 0 && !i && kt && (l.shapeFlag & 6 ? kt[kt.indexOf(t)] = l : kt.push(l)), l.patchFlag = -2, l;
  }
  if (Zl(t) && (t = t.__vccOpts), e) {
    e = Kl(e);
    let { class: l, style: c } = e;
    l && !dt(l) && (e.class = Ft(l)), ot(c) && (/* @__PURE__ */ Bs(c) && !B(c) && (c = gt({}, c)), e.style = An(c));
  }
  const r = dt(t) ? 1 : Di(t) ? 128 : Xr(t) ? 64 : ot(t) ? 4 : G(t) ? 2 : 0;
  return b(
    t,
    e,
    s,
    n,
    o,
    r,
    i,
    !0
  );
}
function Kl(t) {
  return t ? /* @__PURE__ */ Bs(t) || ki(t) ? gt({}, t) : t : null;
}
function We(t, e, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: r, children: l, transition: c } = t, f = e ? Wl(o || {}, e) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && Hi(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? B(i) ? i.concat(Ss(e)) : [i, Ss(e)] : Ss(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== at ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && We(t.ssContent),
    ssFallback: t.ssFallback && We(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return c && n && Dn(
    u,
    c.clone(u)
  ), u;
}
function Nt(t = " ", e = 0) {
  return $t(Js, null, t, e);
}
function Y(t = "", e = !1) {
  return e ? (C(), ve(be, null, t)) : $t(be, null, t);
}
function Wt(t) {
  return t == null || typeof t == "boolean" ? $t(be) : B(t) ? $t(
    at,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Ni(t) ? ie(t) : $t(Js, null, String(t));
}
function ie(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : We(t);
}
function Un(t, e) {
  let s = 0;
  const { shapeFlag: n } = t;
  if (e == null)
    e = null;
  else if (B(e))
    s = 16;
  else if (typeof e == "object")
    if (n & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), Un(t, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = e._;
      !o && !ki(e) ? e._ctx = Rt : o === 3 && Rt && (Rt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else G(e) ? (e = { default: e, _ctx: Rt }, s = 32) : (e = String(e), n & 64 ? (s = 16, e = [Nt(e)]) : s = 8);
  t.children = e, t.shapeFlag |= s;
}
function Wl(...t) {
  const e = {};
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    for (const o in n)
      if (o === "class")
        e.class !== n.class && (e.class = Ft([e.class, n.class]));
      else if (o === "style")
        e.style = An([e.style, n.style]);
      else if (Is(o)) {
        const i = e[o], r = n[o];
        r && i !== r && !(B(i) && i.includes(r)) ? e[o] = i ? [].concat(i, r) : r : r == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Fs(o) && (e[o] = r);
      } else o !== "" && (e[o] = n[o]);
  }
  return e;
}
function Ut(t, e, s, n = null) {
  Yt(t, e, 7, [
    s,
    n
  ]);
}
const ql = Ci();
let Jl = 0;
function Gl(t, e, s) {
  const n = t.type, o = (e ? e.appContext : t.appContext) || ql, i = {
    uid: Jl++,
    vnode: t,
    type: n,
    parent: e,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Wo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(o.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Mi(n, o),
    emitsOptions: $i(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: lt,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: lt,
    data: lt,
    props: lt,
    attrs: lt,
    slots: lt,
    refs: lt,
    setupState: lt,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = $l.bind(null, i), t.ce && t.ce(i), i;
}
let Ct = null;
const Vi = () => Ct || Rt;
let Ms, Sn;
{
  const t = Hs(), e = (s, n) => {
    let o;
    return (o = t[s]) || (o = t[s] = []), o.push(n), (i) => {
      o.length > 1 ? o.forEach((r) => r(i)) : o[0](i);
    };
  };
  Ms = e(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Ct = s
  ), Sn = e(
    "__VUE_SSR_SETTERS__",
    (s) => us = s
  );
}
const _s = (t) => {
  const e = Ct;
  return Ms(t), t.scope.on(), () => {
    t.scope.off(), Ms(e);
  };
}, uo = () => {
  Ct && Ct.scope.off(), Ms(null);
};
function Ui(t) {
  return t.vnode.shapeFlag & 4;
}
let us = !1;
function Yl(t, e = !1, s = !1) {
  e && Sn(e);
  const { props: n, children: o } = t.vnode, i = Ui(t);
  Ml(t, n, i, e), Fl(t, o, s || e);
  const r = i ? Ql(t, e) : void 0;
  return e && Sn(!1), r;
}
function Ql(t, e) {
  const s = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, gl);
  const { setup: n } = s;
  if (n) {
    ae();
    const o = t.setupContext = n.length > 1 ? Xl(t) : null, i = _s(t), r = ps(
      n,
      t,
      0,
      [
        t.props,
        o
      ]
    ), l = Do(r);
    if (ue(), i(), (l || t.sp) && !ss(t) && vi(t), l) {
      if (r.then(uo, uo), e)
        return r.then((c) => {
          fo(t, c);
        }).catch((c) => {
          Ks(c, t, 0);
        });
      t.asyncDep = r;
    } else
      fo(t, r);
  } else
    Bi(t);
}
function fo(t, e, s) {
  G(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : ot(e) && (t.setupState = ci(e)), Bi(t);
}
function Bi(t, e, s) {
  const n = t.type;
  t.render || (t.render = n.render || Jt);
  {
    const o = _s(t);
    ae();
    try {
      ml(t);
    } finally {
      ue(), o();
    }
  }
}
const zl = {
  get(t, e) {
    return vt(t, "get", ""), t[e];
  }
};
function Xl(t) {
  const e = (s) => {
    t.exposed = s || {};
  };
  return {
    attrs: new Proxy(t.attrs, zl),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function Gs(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(ci(In(t.exposed)), {
    get(e, s) {
      if (s in e)
        return e[s];
      if (s in ns)
        return ns[s](t);
    },
    has(e, s) {
      return s in e || s in ns;
    }
  })) : t.proxy;
}
function Zl(t) {
  return G(t) && "__vccOpts" in t;
}
const ht = (t, e) => /* @__PURE__ */ Hr(t, e, us), tc = "3.5.32";
/**
* @vue/runtime-dom v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let wn;
const ho = typeof window < "u" && window.trustedTypes;
if (ho)
  try {
    wn = /* @__PURE__ */ ho.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const Ki = wn ? (t) => wn.createHTML(t) : (t) => t, ec = "http://www.w3.org/2000/svg", sc = "http://www.w3.org/1998/Math/MathML", oe = typeof document < "u" ? document : null, po = oe && /* @__PURE__ */ oe.createElement("template"), nc = {
  insert: (t, e, s) => {
    e.insertBefore(t, s || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, s, n) => {
    const o = e === "svg" ? oe.createElementNS(ec, t) : e === "mathml" ? oe.createElementNS(sc, t) : s ? oe.createElement(t, { is: s }) : oe.createElement(t);
    return t === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (t) => oe.createTextNode(t),
  createComment: (t) => oe.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => oe.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, s, n, o, i) {
    const r = s ? s.previousSibling : e.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; e.insertBefore(o.cloneNode(!0), s), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      po.innerHTML = Ki(
        n === "svg" ? `<svg>${t}</svg>` : n === "mathml" ? `<math>${t}</math>` : t
      );
      const l = po.content;
      if (n === "svg" || n === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      e.insertBefore(l, s);
    }
    return [
      // first
      r ? r.nextSibling : e.firstChild,
      // last
      s ? s.previousSibling : e.lastChild
    ];
  }
}, oc = /* @__PURE__ */ Symbol("_vtc");
function ic(t, e, s) {
  const n = t[oc];
  n && (e = (e ? [e, ...n] : [...n]).join(" ")), e == null ? t.removeAttribute("class") : s ? t.setAttribute("class", e) : t.className = e;
}
const _o = /* @__PURE__ */ Symbol("_vod"), rc = /* @__PURE__ */ Symbol("_vsh"), lc = /* @__PURE__ */ Symbol(""), cc = /(?:^|;)\s*display\s*:/;
function ac(t, e, s) {
  const n = t.style, o = dt(s);
  let i = !1;
  if (s && !o) {
    if (e)
      if (dt(e))
        for (const r of e.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          s[l] == null && ws(n, l, "");
        }
      else
        for (const r in e)
          s[r] == null && ws(n, r, "");
    for (const r in s)
      r === "display" && (i = !0), ws(n, r, s[r]);
  } else if (o) {
    if (e !== s) {
      const r = n[lc];
      r && (s += ";" + r), n.cssText = s, i = cc.test(s);
    }
  } else e && t.removeAttribute("style");
  _o in t && (t[_o] = i ? n.display : "", t[rc] && (n.display = "none"));
}
const go = /\s*!important$/;
function ws(t, e, s) {
  if (B(s))
    s.forEach((n) => ws(t, e, n));
  else if (s == null && (s = ""), e.startsWith("--"))
    t.setProperty(e, s);
  else {
    const n = uc(t, e);
    go.test(s) ? t.setProperty(
      Pe(n),
      s.replace(go, ""),
      "important"
    ) : t[n] = s;
  }
}
const mo = ["Webkit", "Moz", "ms"], cn = {};
function uc(t, e) {
  const s = cn[e];
  if (s)
    return s;
  let n = Dt(e);
  if (n !== "filter" && n in t)
    return cn[e] = n;
  n = Ho(n);
  for (let o = 0; o < mo.length; o++) {
    const i = mo[o] + n;
    if (i in t)
      return cn[e] = i;
  }
  return e;
}
const vo = "http://www.w3.org/1999/xlink";
function yo(t, e, s, n, o, i = cr(e)) {
  n && e.startsWith("xlink:") ? s == null ? t.removeAttributeNS(vo, e.slice(6, e.length)) : t.setAttributeNS(vo, e, s) : s == null || i && !Uo(s) ? t.removeAttribute(e) : t.setAttribute(
    e,
    i ? "" : It(s) ? String(s) : s
  );
}
function bo(t, e, s, n, o) {
  if (e === "innerHTML" || e === "textContent") {
    s != null && (t[e] = e === "innerHTML" ? Ki(s) : s);
    return;
  }
  const i = t.tagName;
  if (e === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? t.getAttribute("value") || "" : t.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in t)) && (t.value = c), s == null && t.removeAttribute(e), t._value = s;
    return;
  }
  let r = !1;
  if (s === "" || s == null) {
    const l = typeof t[e];
    l === "boolean" ? s = Uo(s) : s == null && l === "string" ? (s = "", r = !0) : l === "number" && (s = 0, r = !0);
  }
  try {
    t[e] = s;
  } catch {
  }
  r && t.removeAttribute(o || e);
}
function ke(t, e, s, n) {
  t.addEventListener(e, s, n);
}
function fc(t, e, s, n) {
  t.removeEventListener(e, s, n);
}
const So = /* @__PURE__ */ Symbol("_vei");
function dc(t, e, s, n, o = null) {
  const i = t[So] || (t[So] = {}), r = i[e];
  if (n && r)
    r.value = n;
  else {
    const [l, c] = hc(e);
    if (n) {
      const f = i[e] = gc(
        n,
        o
      );
      ke(t, l, f, c);
    } else r && (fc(t, l, r, c), i[e] = void 0);
  }
}
const wo = /(?:Once|Passive|Capture)$/;
function hc(t) {
  let e;
  if (wo.test(t)) {
    e = {};
    let n;
    for (; n = t.match(wo); )
      t = t.slice(0, t.length - n[0].length), e[n[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Pe(t.slice(2)), e];
}
let an = 0;
const pc = /* @__PURE__ */ Promise.resolve(), _c = () => an || (pc.then(() => an = 0), an = Date.now());
function gc(t, e) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Yt(
      mc(n, s.value),
      e,
      5,
      [n]
    );
  };
  return s.value = t, s.attached = _c(), s;
}
function mc(t, e) {
  if (B(e)) {
    const s = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      s.call(t), t._stopped = !0;
    }, e.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return e;
}
const xo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, vc = (t, e, s, n, o, i) => {
  const r = o === "svg";
  e === "class" ? ic(t, n, r) : e === "style" ? ac(t, s, n) : Is(e) ? Fs(e) || dc(t, e, s, n, i) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : yc(t, e, n, r)) ? (bo(t, e, n), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && yo(t, e, n, r, i, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (bc(t, e) || // @ts-expect-error _def is private
  t._def.__asyncLoader && (/[A-Z]/.test(e) || !dt(n))) ? bo(t, Dt(e), n, i, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), yo(t, e, n, r));
};
function yc(t, e, s, n) {
  if (n)
    return !!(e === "innerHTML" || e === "textContent" || e in t && xo(e) && G(s));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const o = t.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return xo(e) && dt(s) ? !1 : e in t;
}
function bc(t, e) {
  const s = (
    // @ts-expect-error _def is private
    t._def.props
  );
  if (!s)
    return !1;
  const n = Dt(e);
  return Array.isArray(s) ? s.some((o) => Dt(o) === n) : Object.keys(s).some((o) => Dt(o) === n);
}
const Ps = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return B(e) ? (s) => bs(e, s) : e;
};
function Sc(t) {
  t.target.composing = !0;
}
function Co(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Be = /* @__PURE__ */ Symbol("_assign");
function $o(t, e, s) {
  return e && (t = t.trim()), s && (t = Ns(t)), t;
}
const Bn = {
  created(t, { modifiers: { lazy: e, trim: s, number: n } }, o) {
    t[Be] = Ps(o);
    const i = n || o.props && o.props.type === "number";
    ke(t, e ? "change" : "input", (r) => {
      r.target.composing || t[Be]($o(t.value, s, i));
    }), (s || i) && ke(t, "change", () => {
      t.value = $o(t.value, s, i);
    }), e || (ke(t, "compositionstart", Sc), ke(t, "compositionend", Co), ke(t, "change", Co));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: n, trim: o, number: i } }, r) {
    if (t[Be] = Ps(r), t.composing) return;
    const l = (i || t.type === "number") && !/^0\d/.test(t.value) ? Ns(t.value) : t.value, c = e ?? "";
    if (l === c)
      return;
    const f = t.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === t && t.type !== "range" && (n && e === s || o && t.value.trim() === c) || (t.value = c);
  }
}, wc = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(t, { value: e, modifiers: { number: s } }, n) {
    const o = Ls(e);
    ke(t, "change", () => {
      const i = Array.prototype.filter.call(t.options, (r) => r.selected).map(
        (r) => s ? Ns(Rs(r)) : Rs(r)
      );
      t[Be](
        t.multiple ? o ? new Set(i) : i : i[0]
      ), t._assigning = !0, Fn(() => {
        t._assigning = !1;
      });
    }), t[Be] = Ps(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(t, { value: e }) {
    To(t, e);
  },
  beforeUpdate(t, e, s) {
    t[Be] = Ps(s);
  },
  updated(t, { value: e }) {
    t._assigning || To(t, e);
  }
};
function To(t, e) {
  const s = t.multiple, n = B(e);
  if (!(s && !n && !Ls(e))) {
    for (let o = 0, i = t.options.length; o < i; o++) {
      const r = t.options[o], l = Rs(r);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? r.selected = e.some((f) => String(f) === String(l)) : r.selected = ur(e, l) > -1;
        } else
          r.selected = e.has(l);
      else if (hs(Rs(r), e)) {
        t.selectedIndex !== o && (t.selectedIndex = o);
        return;
      }
    }
    !s && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function Rs(t) {
  return "_value" in t ? t._value : t.value;
}
const xc = ["ctrl", "shift", "alt", "meta"], Cc = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => xc.some((s) => t[`${s}Key`] && !e.includes(s))
}, ce = (t, e) => {
  if (!t) return t;
  const s = t._withMods || (t._withMods = {}), n = e.join(".");
  return s[n] || (s[n] = ((o, ...i) => {
    for (let r = 0; r < e.length; r++) {
      const l = Cc[e[r]];
      if (l && l(o, e)) return;
    }
    return t(o, ...i);
  }));
}, $c = /* @__PURE__ */ gt({ patchProp: vc }, nc);
let Ao;
function Tc() {
  return Ao || (Ao = Dl($c));
}
const Ac = ((...t) => {
  const e = Tc().createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    const o = kc(n);
    if (!o) return;
    const i = e._component;
    !G(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = s(o, !1, Ec(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, e;
});
function Ec(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function kc(t) {
  return dt(t) ? document.querySelector(t) : t;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Wi;
const Ys = (t) => Wi = t, qi = (
  /* istanbul ignore next */
  Symbol()
);
function xn(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var is;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(is || (is = {}));
function Oc() {
  const t = qo(!0), e = t.run(() => /* @__PURE__ */ J({}));
  let s = [], n = [];
  const o = In({
    install(i) {
      Ys(o), o._a = i, i.provide(qi, o), i.config.globalProperties.$pinia = o, n.forEach((r) => s.push(r)), n = [];
    },
    use(i) {
      return this._a ? s.push(i) : n.push(i), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: e
  });
  return o;
}
const Ji = () => {
};
function Eo(t, e, s, n = Ji) {
  t.push(e);
  const o = () => {
    const i = t.indexOf(e);
    i > -1 && (t.splice(i, 1), n());
  };
  return !s && Jo() && fr(o), o;
}
function je(t, ...e) {
  t.slice().forEach((s) => {
    s(...e);
  });
}
const Mc = (t) => t(), ko = Symbol(), un = Symbol();
function Cn(t, e) {
  t instanceof Map && e instanceof Map ? e.forEach((s, n) => t.set(n, s)) : t instanceof Set && e instanceof Set && e.forEach(t.add, t);
  for (const s in e) {
    if (!e.hasOwnProperty(s))
      continue;
    const n = e[s], o = t[s];
    xn(o) && xn(n) && t.hasOwnProperty(s) && !/* @__PURE__ */ ut(n) && !/* @__PURE__ */ Gt(n) ? t[s] = Cn(o, n) : t[s] = n;
  }
  return t;
}
const Pc = (
  /* istanbul ignore next */
  Symbol()
);
function Rc(t) {
  return !xn(t) || !t.hasOwnProperty(Pc);
}
const { assign: ge } = Object;
function Ic(t) {
  return !!(/* @__PURE__ */ ut(t) && t.effect);
}
function Fc(t, e, s, n) {
  const { state: o, actions: i, getters: r } = e, l = s.state.value[t];
  let c;
  function f() {
    l || (s.state.value[t] = o ? o() : {});
    const u = /* @__PURE__ */ Fr(s.state.value[t]);
    return ge(u, i, Object.keys(r || {}).reduce((h, p) => (h[p] = In(ht(() => {
      Ys(s);
      const g = s._s.get(t);
      return r[p].call(g, g);
    })), h), {}));
  }
  return c = Gi(t, f, e, s, n, !0), c;
}
function Gi(t, e, s = {}, n, o, i) {
  let r;
  const l = ge({ actions: {} }, s), c = { deep: !0 };
  let f, u, h = [], p = [], g;
  const A = n.state.value[t];
  !i && !A && (n.state.value[t] = {});
  let v;
  function $(j) {
    let q;
    f = u = !1, typeof j == "function" ? (j(n.state.value[t]), q = {
      type: is.patchFunction,
      storeId: t,
      events: g
    }) : (Cn(n.state.value[t], j), q = {
      type: is.patchObject,
      payload: j,
      storeId: t,
      events: g
    });
    const tt = v = Symbol();
    Fn().then(() => {
      v === tt && (f = !0);
    }), u = !0, je(h, q, n.state.value[t]);
  }
  const E = i ? function() {
    const { state: q } = s, tt = q ? q() : {};
    this.$patch((pt) => {
      ge(pt, tt);
    });
  } : (
    /* istanbul ignore next */
    Ji
  );
  function R() {
    r.stop(), h = [], p = [], n._s.delete(t);
  }
  const M = (j, q = "") => {
    if (ko in j)
      return j[un] = q, j;
    const tt = function() {
      Ys(n);
      const pt = Array.from(arguments), yt = [], Tt = [];
      function Zt(K) {
        yt.push(K);
      }
      function pe(K) {
        Tt.push(K);
      }
      je(p, {
        args: pt,
        name: tt[un],
        store: W,
        after: Zt,
        onError: pe
      });
      let rt;
      try {
        rt = j.apply(this && this.$id === t ? this : W, pt);
      } catch (K) {
        throw je(Tt, K), K;
      }
      return rt instanceof Promise ? rt.then((K) => (je(yt, K), K)).catch((K) => (je(Tt, K), Promise.reject(K))) : (je(yt, rt), rt);
    };
    return tt[ko] = !0, tt[un] = q, tt;
  }, D = {
    _p: n,
    // _s: scope,
    $id: t,
    $onAction: Eo.bind(null, p),
    $patch: $,
    $reset: E,
    $subscribe(j, q = {}) {
      const tt = Eo(h, j, q.detached, () => pt()), pt = r.run(() => ye(() => n.state.value[t], (yt) => {
        (q.flush === "sync" ? u : f) && j({
          storeId: t,
          type: is.direct,
          events: g
        }, yt);
      }, ge({}, c, q)));
      return tt;
    },
    $dispose: R
  }, W = /* @__PURE__ */ Us(D);
  n._s.set(t, W);
  const L = (n._a && n._a.runWithContext || Mc)(() => n._e.run(() => (r = qo()).run(() => e({ action: M }))));
  for (const j in L) {
    const q = L[j];
    if (/* @__PURE__ */ ut(q) && !Ic(q) || /* @__PURE__ */ Gt(q))
      i || (A && Rc(q) && (/* @__PURE__ */ ut(q) ? q.value = A[j] : Cn(q, A[j])), n.state.value[t][j] = q);
    else if (typeof q == "function") {
      const tt = M(q, j);
      L[j] = tt, l.actions[j] = q;
    }
  }
  return ge(W, L), ge(/* @__PURE__ */ Z(W), L), Object.defineProperty(W, "$state", {
    get: () => n.state.value[t],
    set: (j) => {
      $((q) => {
        ge(q, j);
      });
    }
  }), n._p.forEach((j) => {
    ge(W, r.run(() => j({
      store: W,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), A && i && s.hydrate && s.hydrate(W.$state, A), f = !0, u = !0, W;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Lc(t, e, s) {
  let n, o;
  const i = typeof e == "function";
  n = t, o = i ? s : e;
  function r(l, c) {
    const f = Gr();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (f ? ts(qi, null) : null), l && Ys(l), l = Wi, l._s.has(n) || (i ? Gi(n, e, o, l) : Fc(n, o, l)), l._s.get(n);
  }
  return r.$id = n, r;
}
function qe(t) {
  {
    const e = /* @__PURE__ */ Z(t), s = {};
    for (const n in e) {
      const o = e[n];
      o.effect ? s[n] = // ...
      ht({
        get: () => t[n],
        set(i) {
          t[n] = i;
        }
      }) : (/* @__PURE__ */ ut(o) || /* @__PURE__ */ Gt(o)) && (s[n] = // ---
      /* @__PURE__ */ jr(t, n));
    }
    return s;
  }
}
const Yi = "at_assetthingie_url", Oo = "http://127.0.0.1:8080", Kn = 15e3;
function fs() {
  if (typeof localStorage > "u")
    return Oo;
  const t = localStorage.getItem(Yi) || Oo;
  return String(t).replace(/\/$/, "");
}
function zt() {
  const t = fs();
  try {
    if (new URL(t).port === "8188") return "/at";
  } catch {
  }
  return "/api/comfy";
}
function Qs() {
  var t;
  return zt() !== "/at" ? fs() : typeof window < "u" && ((t = window.location) != null && t.origin) && window.location.protocol !== "file:" ? window.location.origin.replace(/\/$/, "") : fs();
}
function Dc(t) {
  localStorage.setItem(Yi, t.replace(/\/$/, ""));
}
async function Re(t, e) {
  let n = `${Qs()}${t}`;
  if (e != null && e.params) {
    const f = new URLSearchParams();
    for (const [h, p] of Object.entries(e.params))
      p === void 0 || p === "" || f.set(h, String(p));
    const u = f.toString();
    u && (n += `?${u}`);
  }
  const o = { ...e ?? {} };
  delete o.params;
  const i = new AbortController(), r = setTimeout(() => i.abort(), Kn);
  let l;
  try {
    l = await fetch(n, {
      ...o,
      signal: i.signal,
      headers: { Accept: "application/json", ...o.headers }
    });
  } finally {
    clearTimeout(r);
  }
  const c = await l.text();
  if (!l.ok)
    throw new Error(`HTTP ${l.status}: ${c.slice(0, 240)}`);
  try {
    return JSON.parse(c);
  } catch {
    throw new Error("Invalid JSON from AssetThingie");
  }
}
async function jc() {
  return Re(`${zt()}/health`);
}
async function Nc(t, e, s) {
  const n = new URLSearchParams();
  if (n.set("family", e), s != null && s.length)
    for (const f of s) {
      const u = f.trim();
      u && n.append("tag", u);
    }
  const o = Qs(), i = n.toString(), r = `${o}${zt()}/filters${i ? `?${i}` : ""}`, l = new AbortController(), c = setTimeout(() => l.abort(), Kn);
  try {
    const f = await fetch(r, {
      signal: l.signal,
      headers: { Accept: "application/json" }
    }), u = await f.text();
    if (!f.ok)
      throw new Error(`HTTP ${f.status}: ${u.slice(0, 240)}`);
    return JSON.parse(u);
  } finally {
    clearTimeout(c);
  }
}
async function Hc(t, e = "lora") {
  const s = { family: e };
  return t && (s.parent = t), Re(`${zt()}/subfolders`, { params: s });
}
async function Mo(t) {
  var l;
  const e = {
    q: t.q,
    content_type: t.content_type,
    base_model: t.base_model,
    category: t.category,
    path_prefix: t.path_prefix,
    sort: t.sort,
    limit: t.limit,
    offset: t.offset,
    family: t.family
  }, s = new URLSearchParams();
  for (const [c, f] of Object.entries(e))
    f === void 0 || f === "" || s.set(c, String(f));
  if ((l = t.tag) != null && l.length)
    for (const c of t.tag)
      c && s.append("tag", c);
  const o = `${Qs()}${zt()}/assets?${s.toString()}`, i = new AbortController(), r = setTimeout(() => i.abort(), Kn);
  try {
    const c = await fetch(o, {
      signal: i.signal,
      headers: { Accept: "application/json" }
    }), f = await c.text();
    if (!c.ok)
      throw new Error(`HTTP ${c.status}: ${f.slice(0, 240)}`);
    return JSON.parse(f);
  } finally {
    clearTimeout(r);
  }
}
function xs(t) {
  return t ? t.startsWith("http://") || t.startsWith("https://") ? t : `${Qs()}${t.startsWith("/") ? "" : "/"}${t}` : null;
}
async function Vc(t) {
  return Re(`${zt()}/assets/${t}`);
}
async function Po() {
  return Re(`${zt()}/library/clean-preview`);
}
async function Uc() {
  return Re(`${zt()}/library/clean`, { method: "POST" });
}
async function Bc(t) {
  return Re(`${zt()}/assets/${t}/re-enrich`, {
    method: "POST"
  });
}
async function Kc(t) {
  return Re(`${zt()}/assets/batch/re-enrich`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ asset_ids: t })
  });
}
const Ro = "at_loras_view_mode", Wc = 40, he = /* @__PURE__ */ Lc("at-loras-assets", () => {
  const t = /* @__PURE__ */ J(!1), e = /* @__PURE__ */ J([]), s = /* @__PURE__ */ J(0), n = /* @__PURE__ */ J(0), o = /* @__PURE__ */ J(Wc), i = /* @__PURE__ */ J(!1), r = /* @__PURE__ */ J(!1), l = /* @__PURE__ */ J(null), c = /* @__PURE__ */ J(""), f = /* @__PURE__ */ J("");
  let u = null;
  ye(c, (F) => {
    u && clearTimeout(u), u = setTimeout(() => {
      f.value = F, u = null, y(!0);
    }, 300);
  });
  const h = /* @__PURE__ */ J(""), p = /* @__PURE__ */ J(null), g = /* @__PURE__ */ J(""), A = /* @__PURE__ */ J(""), v = /* @__PURE__ */ J(""), $ = /* @__PURE__ */ J([]), E = /* @__PURE__ */ J([]), R = /* @__PURE__ */ J(""), M = /* @__PURE__ */ J(""), D = /* @__PURE__ */ J(""), W = /* @__PURE__ */ J("grid"), z = /* @__PURE__ */ J(!1), L = /* @__PURE__ */ J(fs()), j = /* @__PURE__ */ J(null), q = /* @__PURE__ */ J(null), tt = /* @__PURE__ */ J(null), pt = /* @__PURE__ */ J(!1), yt = /* @__PURE__ */ J([]), Tt = /* @__PURE__ */ J(/* @__PURE__ */ new Set()), Zt = /* @__PURE__ */ J(!1), pe = /* @__PURE__ */ J(null), rt = /* @__PURE__ */ J(!1), K = /* @__PURE__ */ J(/* @__PURE__ */ new Set());
  try {
    const F = localStorage.getItem(Ro);
    (F === "list" || F === "grid") && (W.value = F);
  } catch {
  }
  const st = ht(() => e.value.length < s.value), te = ht(() => Tt.value), Ie = ht(() => K.value.size);
  function ee(F) {
    return K.value.has(F);
  }
  function Mt(F) {
    const U = new Set(K.value);
    U.has(F) ? U.delete(F) : U.add(F), K.value = U;
  }
  function Fe() {
    K.value = /* @__PURE__ */ new Set();
  }
  function zs() {
    rt.value = !rt.value, rt.value || Fe();
  }
  function Xs() {
    const F = new Set(K.value);
    for (const U of e.value) F.add(U.asset_id);
    K.value = F;
  }
  async function Se() {
    const F = [...K.value];
    if (!F.length) {
      H("No assets selected");
      return;
    }
    try {
      const U = await Kc(F);
      H(`Re-enrich: ${U.processed} ok${U.failed ? `, ${U.failed} failed` : ""}`), Fe(), rt.value = !1, await y(!0);
    } catch (U) {
      H(U instanceof Error ? U.message : "Batch re-enrich failed");
    }
  }
  function Vt() {
    yt.value = [], Tt.value = /* @__PURE__ */ new Set();
  }
  async function we() {
    try {
      const F = await jc();
      t.value = !!F.ok, l.value = null;
    } catch (F) {
      t.value = !1, l.value = F instanceof Error ? F.message : "Connection failed";
    }
  }
  async function se() {
    try {
      const F = E.value.length > 0 ? [...E.value] : void 0;
      p.value = await Nc(void 0, "lora", F);
    } catch {
      p.value = null;
    }
  }
  async function At() {
    if (t.value)
      try {
        const F = await Hc(g.value || void 0, "lora");
        $.value = F.folders, A.value = F.parent_path, v.value || (v.value = F.parent_path);
      } catch {
        $.value = [];
      }
  }
  function Wn(F) {
    M.value = M.value === F ? "" : F, M.value === "folder" ? At() : M.value === "tag" && se();
  }
  function a(F) {
    const U = A.value.replace(/\/$/, "");
    g.value = `${U}/${F}`, At(), y(!0);
  }
  function d(F) {
    g.value = F, At(), y(!0);
  }
  function _() {
    g.value = "", At(), y(!0);
  }
  function x(F) {
    const U = F.trim();
    if (!U) return;
    const bt = E.value, xe = bt.indexOf(U);
    xe >= 0 ? E.value = bt.filter((Le, Xi) => Xi !== xe) : E.value = [...bt, U], y(!0), se();
  }
  function S() {
    E.value = [], D.value = "", y(!0), se();
  }
  function w(F) {
    const U = F.trim();
    R.value === U ? R.value = "" : R.value = U, y(!0);
  }
  function P() {
    R.value = "", y(!0);
  }
  function O() {
    const F = f.value.trim();
    if (!F) return;
    const U = /^(name|trigger|category|tag):$/i;
    return F.split(",").some((xe) => {
      const Le = xe.trim();
      return Le !== "" && !U.test(Le);
    }) ? F : void 0;
  }
  function k() {
    const F = E.value.length > 0 ? [...E.value] : void 0;
    return {
      q: O(),
      family: "lora",
      base_model: h.value.trim() || void 0,
      category: R.value.trim() || void 0,
      path_prefix: g.value.trim() || void 0,
      tag: F,
      sort: "path",
      limit: o.value
    };
  }
  async function y(F) {
    if (!(!t.value && F && (await we(), !t.value)) && (F && (n.value = 0, e.value = []), !(i.value || r.value))) {
      i.value = !0, l.value = null;
      try {
        const U = await Mo({
          ...k(),
          offset: n.value
        });
        s.value = U.total, F ? e.value = U.items : e.value = [...e.value, ...U.items], Vt();
      } catch (U) {
        l.value = U instanceof Error ? U.message : "Load failed", F && (e.value = []);
      } finally {
        i.value = !1;
      }
    }
  }
  async function V() {
    if (!(!st.value || i.value || r.value)) {
      r.value = !0, n.value = e.value.length;
      try {
        const F = await Mo({
          ...k(),
          offset: n.value
        });
        s.value = F.total, e.value = [...e.value, ...F.items], Vt();
      } catch (F) {
        l.value = F instanceof Error ? F.message : "Load failed";
      } finally {
        r.value = !1;
      }
    }
  }
  function I() {
    c.value = "", f.value = "", u && (clearTimeout(u), u = null), h.value = "", g.value = "", A.value = "", v.value = "", $.value = [], E.value = [], R.value = "", M.value = "", D.value = "", y(!0), t.value && (At(), se());
  }
  function N(F) {
    W.value = F;
    try {
      localStorage.setItem(Ro, F);
    } catch {
    }
  }
  function H(F) {
    j.value = F, setTimeout(() => {
      j.value = null;
    }, 2e3);
  }
  function X() {
    Dc(L.value), _e();
  }
  function nt(F) {
    var U;
    if (!((U = F.comfy_lora_name) != null && U.trim())) {
      H("No Comfy LoRA name for this asset");
      return;
    }
    H("LoRA Stack shortcut is not available in at_comfy v1.");
  }
  function it() {
    Zt.value = !1, pe.value = null;
  }
  function ft() {
    Zt.value = !1, pe.value = null;
  }
  function _t(F) {
    q.value = F, tt.value = null, Et();
  }
  function Pt() {
    q.value = null, tt.value = null;
  }
  async function Et() {
    const F = q.value;
    if (F != null) {
      pt.value = !0;
      try {
        tt.value = await Vc(F), Vt();
      } catch (U) {
        H(U instanceof Error ? U.message : "Detail load failed"), tt.value = null;
      } finally {
        pt.value = !1;
      }
    }
  }
  async function _e() {
    L.value = fs(), await we(), t.value && (await se(), Vt(), await At(), await y(!0));
  }
  return {
    connected: t,
    items: e,
    total: s,
    offset: n,
    limit: o,
    loading: i,
    loadingMore: r,
    error: l,
    searchQuery: c,
    baseModel: h,
    filterOptions: p,
    folderPath: g,
    browseParentPath: A,
    libraryRootPath: v,
    subfolders: $,
    selectedTags: E,
    selectedCategory: R,
    openFilterSection: M,
    tagFilterText: D,
    viewMode: W,
    settingsOpen: z,
    baseUrlInput: L,
    toast: j,
    hasMore: st,
    selectedAssetId: q,
    detail: tt,
    detailLoading: pt,
    stackNodes: yt,
    lorasInStack: te,
    stackPickerOpen: Zt,
    stackPickerItem: pe,
    selectionMode: rt,
    selectedIds: K,
    selectedCount: Ie,
    isAssetSelected: ee,
    toggleAssetSelect: Mt,
    clearAssetSelection: Fe,
    toggleSelectionMode: zs,
    selectAllVisibleAssets: Xs,
    batchReEnrichSelected: Se,
    checkHealth: we,
    loadFilters: se,
    loadSubfolders: At,
    toggleFilterSection: Wn,
    drillFolder: a,
    navigateFolderToAbsolute: d,
    resetFolderPath: _,
    toggleTag: x,
    resetSelectedTags: S,
    setCategory: w,
    resetCategory: P,
    loadAssets: y,
    loadMore: V,
    resetFilters: I,
    setViewMode: N,
    showToast: H,
    saveSettingsUrl: X,
    bootstrap: _e,
    refreshStackState: Vt,
    requestAddToStack: nt,
    confirmStackPicker: it,
    cancelStackPicker: ft,
    openDetail: _t,
    closeDetail: Pt,
    loadDetail: Et
  };
}), qc = { class: "at-filters" }, Jc = { class: "at-filters__row" }, Gc = { class: "at-filters__field" }, Yc = ["value"], Qc = {
  class: "at-filter-modes",
  role: "tablist",
  "aria-label": "Filter by folder, tag, or category"
}, zc = ["aria-pressed"], Xc = {
  key: 0,
  class: "at-mode-btn__dot",
  "aria-hidden": "true"
}, Zc = ["aria-pressed"], ta = {
  key: 0,
  class: "at-mode-btn__dot",
  "aria-hidden": "true"
}, ea = ["aria-pressed"], sa = {
  key: 0,
  class: "at-mode-btn__dot",
  "aria-hidden": "true"
}, na = {
  key: 0,
  class: "at-filter-section"
}, oa = { class: "at-folder-nav" }, ia = { class: "at-breadcrumb" }, ra = {
  key: 0,
  class: "at-breadcrumb__sep"
}, la = ["onClick"], ca = {
  key: 0,
  class: "at-folder-chips"
}, aa = ["onClick"], ua = {
  key: 1,
  class: "at-folder-empty"
}, fa = {
  key: 1,
  class: "at-filter-section"
}, da = { class: "at-tag-panel" }, ha = { class: "at-tag-panel__top" }, pa = { class: "at-tag-chips" }, _a = ["onClick"], ga = { class: "at-tag-chip__count" }, ma = {
  key: 2,
  class: "at-filter-section"
}, va = { class: "at-category-panel" }, ya = {
  key: 0,
  class: "at-category-chips"
}, ba = ["onClick"], Sa = {
  key: 1,
  class: "at-folder-empty"
}, wa = /* @__PURE__ */ Qt({
  __name: "FilterPanel",
  setup(t) {
    const e = he(), {
      baseModel: s,
      filterOptions: n,
      folderPath: o,
      libraryRootPath: i,
      subfolders: r,
      selectedTags: l,
      selectedCategory: c,
      openFilterSection: f,
      tagFilterText: u
    } = qe(e);
    function h() {
      e.loadAssets(!0);
    }
    const p = ht(() => !!o.value), g = ht(() => l.value.length > 0), A = ht(() => !!c.value), v = ht(() => {
      const R = i.value, M = o.value, D = [{ label: "Library", path: "" }];
      if (!M || !R || !M.startsWith(R)) return D;
      const W = M.slice(R.length).replace(/^\//, "");
      if (!W) return D;
      const z = W.split("/").filter(Boolean);
      let L = R.replace(/\/$/, "");
      for (const j of z)
        L = `${L}/${j}`, D.push({ label: j, path: L });
      return D;
    }), $ = ht(() => {
      var D;
      const R = ((D = n.value) == null ? void 0 : D.tags) ?? [], M = u.value.trim().toLowerCase();
      return M ? R.filter((W) => W.name.toLowerCase().includes(M)) : R;
    });
    function E(R) {
      return l.value.includes(R);
    }
    return (R, M) => {
      var D, W, z;
      return C(), T("div", qc, [
        b("div", Jc, [
          b("label", Gc, [
            M[8] || (M[8] = b("span", null, "Base model", -1)),
            Es(b("select", {
              "onUpdate:modelValue": M[0] || (M[0] = (L) => /* @__PURE__ */ ut(s) ? s.value = L : null),
              class: "at-select",
              onChange: h
            }, [
              M[7] || (M[7] = b("option", { value: "" }, "Any", -1)),
              (C(!0), T(at, null, Lt(((D = m(n)) == null ? void 0 : D.base_models) ?? [], (L) => (C(), T("option", {
                key: L,
                value: L
              }, Q(L), 9, Yc))), 128))
            ], 544), [
              [wc, m(s)]
            ])
          ])
        ]),
        b("div", Qc, [
          b("button", {
            type: "button",
            class: Ft(["at-mode-btn", { "at-mode-btn--on": m(f) === "folder" }]),
            title: "Browse folders",
            "aria-pressed": m(f) === "folder",
            onClick: M[1] || (M[1] = (L) => m(e).toggleFilterSection("folder"))
          }, [
            M[9] || (M[9] = b("span", {
              class: "at-mode-btn__icon",
              "aria-hidden": "true"
            }, "📁", -1)),
            p.value ? (C(), T("span", Xc)) : Y("", !0)
          ], 10, zc),
          b("button", {
            type: "button",
            class: Ft(["at-mode-btn", { "at-mode-btn--on": m(f) === "tag" }]),
            title: "Filter by tags",
            "aria-pressed": m(f) === "tag",
            onClick: M[2] || (M[2] = (L) => m(e).toggleFilterSection("tag"))
          }, [
            M[10] || (M[10] = b("span", {
              class: "at-mode-btn__icon",
              "aria-hidden": "true"
            }, "🏷", -1)),
            g.value ? (C(), T("span", ta)) : Y("", !0)
          ], 10, Zc),
          b("button", {
            type: "button",
            class: Ft(["at-mode-btn", { "at-mode-btn--on": m(f) === "category" }]),
            title: "Filter by category",
            "aria-pressed": m(f) === "category",
            onClick: M[3] || (M[3] = (L) => m(e).toggleFilterSection("category"))
          }, [
            M[11] || (M[11] = b("span", {
              class: "at-mode-btn__icon",
              "aria-hidden": "true"
            }, "📂", -1)),
            A.value ? (C(), T("span", sa)) : Y("", !0)
          ], 10, ea)
        ]),
        m(f) === "folder" ? (C(), T("div", na, [
          b("div", oa, [
            b("div", ia, [
              (C(!0), T(at, null, Lt(v.value, (L, j) => (C(), T(at, {
                key: L.path + j
              }, [
                j > 0 ? (C(), T("span", ra, "›")) : Y("", !0),
                b("button", {
                  type: "button",
                  class: "at-breadcrumb__seg",
                  onClick: (q) => m(e).navigateFolderToAbsolute(L.path)
                }, Q(L.label), 9, la)
              ], 64))), 128))
            ]),
            m(r).length ? (C(), T("div", ca, [
              (C(!0), T(at, null, Lt(m(r), (L) => (C(), T("button", {
                key: L,
                type: "button",
                class: "at-folder-chip",
                onClick: (j) => m(e).drillFolder(L)
              }, Q(L), 9, aa))), 128))
            ])) : (C(), T("p", ua, "No subfolders here"))
          ])
        ])) : m(f) === "tag" ? (C(), T("div", fa, [
          b("div", da, [
            b("div", ha, [
              Es(b("input", {
                "onUpdate:modelValue": M[4] || (M[4] = (L) => /* @__PURE__ */ ut(u) ? u.value = L : null),
                type: "search",
                class: "at-tag-search",
                placeholder: "Filter tag list…",
                autocomplete: "off"
              }, null, 512), [
                [Bn, m(u)]
              ]),
              b("button", {
                type: "button",
                class: "at-folder-reset",
                onClick: M[5] || (M[5] = (L) => m(e).resetSelectedTags())
              }, "Reset")
            ]),
            M[12] || (M[12] = b("p", { class: "at-tag-hint" }, "All selected tags must match (AND).", -1)),
            b("div", pa, [
              (C(!0), T(at, null, Lt($.value, (L) => (C(), T("button", {
                key: L.tag_id,
                type: "button",
                class: Ft(["at-tag-chip", { "at-tag-chip--selected": E(L.name) }]),
                onClick: (j) => m(e).toggleTag(L.name)
              }, [
                Nt(Q(L.name) + " ", 1),
                b("span", ga, Q(L.count), 1)
              ], 10, _a))), 128))
            ])
          ])
        ])) : m(f) === "category" ? (C(), T("div", ma, [
          b("div", va, [
            b("button", {
              type: "button",
              class: "at-folder-reset",
              onClick: M[6] || (M[6] = (L) => m(e).resetCategory())
            }, "Reset"),
            (((W = m(n)) == null ? void 0 : W.categories) ?? []).length ? (C(), T("div", ya, [
              (C(!0), T(at, null, Lt(((z = m(n)) == null ? void 0 : z.categories) ?? [], (L) => (C(), T("button", {
                key: L,
                type: "button",
                class: Ft(["at-category-chip", { "at-category-chip--selected": m(c) === L }]),
                onClick: (j) => m(e).setCategory(L)
              }, Q(L), 11, ba))), 128))
            ])) : (C(), T("p", Sa, "No categories in index"))
          ])
        ])) : Y("", !0)
      ]);
    };
  }
}), Xt = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, o] of e)
    s[n] = o;
  return s;
}, xa = /* @__PURE__ */ Xt(wa, [["__scopeId", "data-v-01975e22"]]), Ca = { class: "at-toolbar" }, $a = {
  key: 0,
  class: "at-toolbar__row at-toolbar__row--select"
}, Ta = { class: "at-toolbar__sel-label" }, Aa = { class: "at-toolbar__row at-toolbar__row--search" }, Ea = ["aria-pressed"], ka = ["aria-pressed"], Oa = ["aria-pressed"], Ma = /* @__PURE__ */ Qt({
  __name: "Toolbar",
  setup(t) {
    const e = he();
    return (s, n) => (C(), T("div", Ca, [
      m(e).selectionMode ? (C(), T("div", $a, [
        b("span", Ta, Q(m(e).selectedCount) + " selected", 1),
        b("button", {
          type: "button",
          class: "at-toolbar__chip",
          onClick: n[0] || (n[0] = //@ts-ignore
          (...o) => m(e).selectAllVisibleAssets && m(e).selectAllVisibleAssets(...o))
        }, " All visible "),
        b("button", {
          type: "button",
          class: "at-toolbar__chip",
          onClick: n[1] || (n[1] = //@ts-ignore
          (...o) => m(e).clearAssetSelection && m(e).clearAssetSelection(...o))
        }, " Clear "),
        b("button", {
          type: "button",
          class: "at-toolbar__chip at-toolbar__chip--primary",
          onClick: n[2] || (n[2] = //@ts-ignore
          (...o) => m(e).batchReEnrichSelected && m(e).batchReEnrichSelected(...o))
        }, " Re-enrich selected "),
        b("button", {
          type: "button",
          class: "at-toolbar__chip",
          onClick: n[3] || (n[3] = //@ts-ignore
          (...o) => m(e).toggleSelectionMode && m(e).toggleSelectionMode(...o))
        }, "Done")
      ])) : Y("", !0),
      b("div", Aa, [
        Es(b("input", {
          "onUpdate:modelValue": n[4] || (n[4] = (o) => m(e).searchQuery = o),
          type: "search",
          class: "at-toolbar__search",
          placeholder: "name:, trigger:, category:, tag: or free text",
          autocomplete: "off"
        }, null, 512), [
          [Bn, m(e).searchQuery]
        ]),
        b("button", {
          type: "button",
          class: "at-icon-btn",
          title: "Grid view",
          "aria-pressed": m(e).viewMode === "grid",
          onClick: n[5] || (n[5] = (o) => m(e).setViewMode("grid"))
        }, " ▦ ", 8, Ea),
        b("button", {
          type: "button",
          class: "at-icon-btn",
          title: "List view",
          "aria-pressed": m(e).viewMode === "list",
          onClick: n[6] || (n[6] = (o) => m(e).setViewMode("list"))
        }, " ≡ ", 8, ka),
        b("button", {
          type: "button",
          class: "at-icon-btn",
          title: "Select assets",
          "aria-pressed": m(e).selectionMode,
          onClick: n[7] || (n[7] = //@ts-ignore
          (...o) => m(e).toggleSelectionMode && m(e).toggleSelectionMode(...o))
        }, " ☑ ", 8, Oa),
        b("button", {
          type: "button",
          class: "at-icon-btn",
          title: "Settings",
          onClick: n[8] || (n[8] = (o) => m(e).settingsOpen = !0)
        }, " ⚙ "),
        b("button", {
          type: "button",
          class: "at-reset",
          onClick: n[9] || (n[9] = (o) => m(e).resetFilters())
        }, " Reset ")
      ]),
      $t(xa)
    ]));
  }
}), Io = /* @__PURE__ */ Xt(Ma, [["__scopeId", "data-v-7e27da26"]]), Pa = { class: "at-status" }, Ra = ["title"], Ia = { class: "at-status__text" }, Fa = {
  key: 3,
  class: "at-status__more"
}, La = {
  key: 1,
  class: "at-status__toast"
}, Da = /* @__PURE__ */ Qt({
  __name: "StatusBar",
  setup(t) {
    const e = he(), { connected: s, total: n, items: o, loading: i, loadingMore: r, error: l, toast: c } = qe(e);
    return (f, u) => (C(), T("div", Pa, [
      b("span", {
        class: Ft(["at-status__dot", m(s) ? "at-status__dot--ok" : "at-status__dot--bad"]),
        title: m(s) ? "Connected" : "Disconnected"
      }, null, 10, Ra),
      b("span", Ia, [
        m(i) && !m(o).length ? (C(), T(at, { key: 0 }, [
          Nt("Loading…")
        ], 64)) : m(l) ? (C(), T(at, { key: 1 }, [
          Nt(Q(m(l)), 1)
        ], 64)) : (C(), T(at, { key: 2 }, [
          Nt("Showing " + Q(m(o).length) + " / " + Q(m(n)), 1)
        ], 64)),
        m(r) ? (C(), T("span", Fa, " · More…")) : Y("", !0)
      ]),
      !m(s) || m(l) ? (C(), T("button", {
        key: 0,
        type: "button",
        class: "at-status__retry",
        onClick: u[0] || (u[0] = (h) => m(e).bootstrap())
      }, " Retry ")) : Y("", !0),
      m(c) ? (C(), T("span", La, Q(m(c)), 1)) : Y("", !0)
    ]));
  }
}), Fo = /* @__PURE__ */ Xt(Da, [["__scopeId", "data-v-6f3959bc"]]);
async function Qi(t) {
  const e = (t ?? "").trim();
  if (!e) return !1;
  try {
    return await navigator.clipboard.writeText(e), !0;
  } catch {
    try {
      const s = document.createElement("textarea");
      s.value = e, s.style.position = "fixed", s.style.left = "-9999px", document.body.appendChild(s), s.select();
      const n = document.execCommand("copy");
      return document.body.removeChild(s), n;
    } catch {
      return !1;
    }
  }
}
const ja = ["checked"], Na = { class: "at-card__media" }, Ha = ["src"], Va = {
  key: 1,
  class: "at-card__placeholder"
}, Ua = {
  key: 2,
  class: "at-card__cat"
}, Ba = {
  key: 3,
  class: "at-card__fav",
  title: "Favorite",
  "aria-hidden": "true"
}, Ka = {
  key: 4,
  class: "at-card__in-stack",
  title: "In stack"
}, Wa = { class: "at-card__body" }, qa = { class: "at-card__title-row" }, Ja = ["title"], Ga = {
  key: 0,
  class: "at-card__strength"
}, Ya = {
  key: 0,
  class: "at-card__bm"
}, Qa = {
  key: 1,
  class: "at-card__tw"
}, za = {
  key: 2,
  class: "at-card__usage"
}, Xa = { class: "at-card__actions" }, Za = ["disabled"], tu = ["disabled"], eu = ["title"], su = /* @__PURE__ */ Qt({
  __name: "AssetCard",
  props: {
    item: {},
    compact: { type: Boolean }
  },
  setup(t) {
    const e = t, s = he(), n = ht(() => xs(e.item.cover_url)), o = ht(() => {
      const p = e.item.trigger_words || [];
      if (!p.length) return "";
      const g = p.slice(0, 3).join(", ");
      return p.length > 3 ? `${g}…` : g;
    }), i = ht(() => {
      const p = e.item.default_strength;
      return p == null || Number(p) === 1 ? "" : String(p);
    }), r = ht(() => {
      const p = e.item.usage_count, g = e.item.last_used_at;
      if (!p && !g) return "";
      const A = [];
      return p && A.push(`uses: ${p}`), g && A.push(g.replace("T", " ").slice(0, 16)), A.join(" · ");
    }), l = ht(() => {
      const p = e.item.comfy_lora_name;
      return p ? s.lorasInStack.has(p) : !1;
    });
    function c(p) {
      var v;
      const g = (v = e.item.comfy_lora_name) == null ? void 0 : v.trim();
      if (!g || !p.dataTransfer) return;
      const A = e.item.default_strength != null ? Number(e.item.default_strength) : 1;
      p.dataTransfer.setData(
        "application/x-at-lora",
        JSON.stringify({
          lora_name: g,
          strength_model: A,
          strength_clip: A,
          trigger_words: e.item.trigger_words ?? [],
          display_name: e.item.display_name
        })
      ), p.dataTransfer.effectAllowed = "copy";
    }
    async function f(p) {
      var v;
      p.stopPropagation();
      const g = (v = e.item.lora_syntax) == null ? void 0 : v.trim();
      if (!g) return;
      const A = await Qi(g);
      s.showToast(A ? "Copied" : "Copy failed");
    }
    function u(p) {
      p.stopPropagation(), s.requestAddToStack(e.item);
    }
    function h(p) {
      if (!p.target.closest(
        "button, .at-card__drag, a, .at-card__select, .at-card__select input"
      )) {
        if (s.selectionMode) {
          s.toggleAssetSelect(e.item.asset_id);
          return;
        }
        s.openDetail(e.item.asset_id);
      }
    }
    return (p, g) => (C(), T("article", {
      class: Ft(["at-card", {
        "at-card--compact": t.compact,
        "at-card--selected": m(s).selectionMode && m(s).isAssetSelected(t.item.asset_id)
      }]),
      onClick: h
    }, [
      m(s).selectionMode ? (C(), T("label", {
        key: 0,
        class: "at-card__select",
        onClick: g[1] || (g[1] = ce(() => {
        }, ["stop"]))
      }, [
        b("input", {
          type: "checkbox",
          checked: m(s).isAssetSelected(t.item.asset_id),
          onChange: g[0] || (g[0] = ce((A) => m(s).toggleAssetSelect(t.item.asset_id), ["stop"]))
        }, null, 40, ja)
      ])) : Y("", !0),
      b("div", Na, [
        n.value ? (C(), T("img", {
          key: 0,
          src: n.value,
          loading: "lazy",
          alt: "",
          class: "at-card__img"
        }, null, 8, Ha)) : (C(), T("div", Va, "No image")),
        t.item.category ? (C(), T("span", Ua, Q(t.item.category), 1)) : Y("", !0),
        t.item.is_favorite ? (C(), T("span", Ba, "★")) : Y("", !0),
        l.value ? (C(), T("span", Ka, "✓")) : Y("", !0)
      ]),
      b("div", Wa, [
        b("div", qa, [
          b("span", {
            class: "at-card__title",
            title: t.item.display_name || t.item.filename
          }, Q(t.item.display_name || t.item.filename), 9, Ja),
          i.value ? (C(), T("span", Ga, Q(i.value), 1)) : Y("", !0)
        ]),
        t.item.base_model && !t.compact ? (C(), T("div", Ya, Q(t.item.base_model), 1)) : Y("", !0),
        o.value ? (C(), T("div", Qa, Q(o.value), 1)) : Y("", !0),
        t.compact && r.value ? (C(), T("div", za, Q(r.value), 1)) : Y("", !0),
        b("div", {
          class: Ft(["at-card__actions-row", { "at-card__actions-row--compact": t.compact }])
        }, [
          b("div", Xa, [
            b("button", {
              type: "button",
              class: "at-card__btn at-card__btn--primary",
              disabled: !t.item.lora_syntax,
              onClick: ce(f, ["stop"])
            }, " Copy LoRA ", 8, Za),
            b("button", {
              type: "button",
              class: "at-card__btn",
              disabled: !t.item.comfy_lora_name,
              title: "Add to LM LoRA Stack",
              onClick: ce(u, ["stop"])
            }, " + Stack ", 8, tu)
          ]),
          t.item.base_model && t.compact ? (C(), T("span", {
            key: 0,
            class: "at-card__bm-compact",
            title: t.item.base_model
          }, Q(t.item.base_model), 9, eu)) : Y("", !0)
        ], 2)
      ]),
      b("button", {
        type: "button",
        class: "at-card__drag",
        title: "Drag to LM LoRA Stack node",
        draggable: "true",
        onDragstart: c,
        onClick: g[2] || (g[2] = ce(() => {
        }, ["stop"]))
      }, " ⠿ ", 32)
    ], 2));
  }
}), zi = /* @__PURE__ */ Xt(su, [["__scopeId", "data-v-5faebfa0"]]), nu = { class: "at-grid" }, ou = /* @__PURE__ */ Qt({
  __name: "AssetGrid",
  setup(t) {
    const e = he(), { items: s } = qe(e);
    return (n, o) => (C(), T("div", nu, [
      (C(!0), T(at, null, Lt(m(s), (i) => (C(), ve(zi, {
        key: i.asset_id,
        item: i
      }, null, 8, ["item"]))), 128))
    ]));
  }
}), iu = /* @__PURE__ */ Xt(ou, [["__scopeId", "data-v-bc27028f"]]), ru = { class: "at-list" }, lu = /* @__PURE__ */ Qt({
  __name: "AssetList",
  setup(t) {
    const e = he(), { items: s } = qe(e);
    return (n, o) => (C(), T("div", ru, [
      (C(!0), T(at, null, Lt(m(s), (i) => (C(), ve(zi, {
        key: i.asset_id,
        item: i,
        compact: ""
      }, null, 8, ["item"]))), 128))
    ]));
  }
}), cu = /* @__PURE__ */ Xt(lu, [["__scopeId", "data-v-d1d6175a"]]), au = {
  class: "at-settings",
  role: "dialog",
  "aria-label": "AssetThingie settings"
}, uu = { class: "at-settings__label" }, fu = { class: "at-settings__section" }, du = { class: "at-settings__row" }, hu = ["disabled"], pu = {
  key: 0,
  class: "at-settings__err"
}, _u = {
  key: 0,
  class: "at-settings__ok"
}, gu = {
  key: 1,
  class: "at-settings__warn"
}, mu = {
  key: 2,
  class: "at-settings__stale-list"
}, vu = { class: "at-settings__stale-name" }, yu = { key: 0 }, bu = ["disabled"], Su = /* @__PURE__ */ Qt({
  __name: "SettingsPanel",
  setup(t) {
    const e = he(), s = /* @__PURE__ */ J(null), n = /* @__PURE__ */ J(!1), o = /* @__PURE__ */ J(!1), i = /* @__PURE__ */ J(null);
    function r(h) {
      return h < 1024 ? `${h} B` : h < 1024 * 1024 ? `${(h / 1024).toFixed(1)} KB` : `${(h / (1024 * 1024)).toFixed(1)} MB`;
    }
    async function l() {
      i.value = null, n.value = !0;
      try {
        s.value = await Po();
      } catch (h) {
        i.value = h instanceof Error ? h.message : "Preview failed", s.value = null;
      } finally {
        n.value = !1;
      }
    }
    async function c() {
      var h;
      if ((h = s.value) != null && h.stale_count) {
        o.value = !0;
        try {
          const p = await Uc();
          e.showToast(`Removed ${p.removed} stale entr${p.removed === 1 ? "y" : "ies"}`), s.value = await Po(), await e.loadAssets(!0);
        } catch (p) {
          e.showToast(p instanceof Error ? p.message : "Clean failed");
        } finally {
          o.value = !1;
        }
      }
    }
    function f() {
      e.settingsOpen = !1;
    }
    function u() {
      e.saveSettingsUrl(), e.settingsOpen = !1;
    }
    return (h, p) => (C(), T("div", {
      class: "at-settings-backdrop",
      onClick: ce(f, ["self"])
    }, [
      b("div", au, [
        p[4] || (p[4] = b("h2", { class: "at-settings__title" }, "AssetThingie", -1)),
        b("label", uu, [
          p[1] || (p[1] = Nt(" Server URL ", -1)),
          Es(b("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (g) => m(e).baseUrlInput = g),
            type: "url",
            class: "at-settings__input"
          }, null, 512), [
            [Bn, m(e).baseUrlInput]
          ])
        ]),
        p[5] || (p[5] = b("p", { class: "at-settings__hint" }, [
          Nt(" AssetThingie URL. Default "),
          b("code", null, "http://127.0.0.1:8080")
        ], -1)),
        b("div", fu, [
          p[2] || (p[2] = b("h3", { class: "at-settings__subtitle" }, "Library maintenance", -1)),
          p[3] || (p[3] = b("p", { class: "at-settings__hint" }, " Remove database entries for model files that are no longer on disk, and delete their cached cover/example images. ", -1)),
          b("div", du, [
            b("button", {
              type: "button",
              class: "at-settings__btn",
              disabled: n.value,
              onClick: l
            }, Q(n.value ? "Checking…" : "Check for missing files"), 9, hu)
          ]),
          i.value ? (C(), T("p", pu, Q(i.value), 1)) : s.value ? (C(), T(at, { key: 1 }, [
            s.value.stale_count === 0 ? (C(), T("p", _u, " Library is clean — no missing models found. ")) : (C(), T("p", gu, Q(s.value.stale_count) + " model" + Q(s.value.stale_count === 1 ? "" : "s") + " missing from disk. Cached images: ~" + Q(r(s.value.orphan_cache_bytes)) + ". ", 1)),
            s.value.stale_count > 0 ? (C(), T("ul", mu, [
              (C(!0), T(at, null, Lt(s.value.stale_assets.slice(0, 12), (g) => (C(), T("li", {
                key: g.asset_id
              }, [
                b("span", vu, Q(g.display_name || g.path), 1)
              ]))), 128)),
              s.value.stale_assets.length > 12 ? (C(), T("li", yu, "…")) : Y("", !0)
            ])) : Y("", !0),
            b("button", {
              type: "button",
              class: "at-settings__btn at-settings__btn--danger",
              disabled: s.value.stale_count === 0 || o.value,
              onClick: c
            }, Q(o.value ? "Removing…" : "Confirm removal"), 9, bu)
          ], 64)) : Y("", !0)
        ]),
        b("div", { class: "at-settings__actions" }, [
          b("button", {
            type: "button",
            class: "at-settings__btn",
            onClick: f
          }, "Cancel"),
          b("button", {
            type: "button",
            class: "at-settings__btn at-settings__btn--primary",
            onClick: u
          }, " Save & reconnect ")
        ])
      ])
    ]));
  }
}), wu = /* @__PURE__ */ Xt(Su, [["__scopeId", "data-v-9d4d1a31"]]), xu = { class: "at-imlb__inner" }, Cu = ["src"], $u = {
  key: 0,
  class: "at-imlb__meta"
}, Tu = /* @__PURE__ */ Qt({
  __name: "ImageMetaLightbox",
  props: {
    imageUrl: {},
    meta: {}
  },
  emits: ["close"],
  setup(t) {
    return (e, s) => (C(), ve(sl, { to: "body" }, [
      t.imageUrl ? (C(), T("div", {
        key: 0,
        class: "at-imlb",
        onClick: s[1] || (s[1] = ce((n) => e.$emit("close"), ["self"]))
      }, [
        b("div", xu, [
          b("button", {
            type: "button",
            class: "at-imlb__x",
            onClick: s[0] || (s[0] = (n) => e.$emit("close"))
          }, "×"),
          b("img", {
            src: t.imageUrl,
            alt: "Preview"
          }, null, 8, Cu),
          t.meta && Object.keys(t.meta).length ? (C(), T("pre", $u, Q(JSON.stringify(t.meta, null, 2)), 1)) : Y("", !0)
        ])
      ])) : Y("", !0)
    ]));
  }
}), Au = /* @__PURE__ */ Xt(Tu, [["__scopeId", "data-v-b698c59a"]]), Eu = { class: "at-detail__head" }, ku = {
  key: 0,
  class: "at-detail__loading"
}, Ou = {
  key: 1,
  class: "at-detail__scroll"
}, Mu = {
  key: 0,
  class: "at-detail__cover-wrap"
}, Pu = ["src"], Ru = { class: "at-detail__name" }, Iu = {
  key: 1,
  class: "at-detail__meta"
}, Fu = {
  key: 2,
  class: "at-detail__meta"
}, Lu = { class: "at-detail__syntax" }, Du = { class: "at-detail__code" }, ju = {
  key: 3,
  class: "at-detail__meta"
}, Nu = {
  key: 4,
  class: "at-detail__section"
}, Hu = { class: "at-detail__notes" }, Vu = { class: "at-detail__section" }, Uu = { class: "at-detail__sec-head" }, Bu = {
  key: 0,
  class: "at-detail__tw-list"
}, Ku = {
  key: 1,
  class: "at-detail__tw-empty"
}, Wu = {
  key: 5,
  class: "at-detail__section"
}, qu = { class: "at-detail__tags" }, Ju = {
  key: 6,
  class: "at-detail__meta"
}, Gu = ["href"], Yu = { class: "at-detail__row-actions" }, Qu = ["disabled"], zu = {
  key: 8,
  class: "at-detail__meta"
}, Xu = {
  key: 9,
  class: "at-detail__section"
}, Zu = ["innerHTML"], tf = {
  key: 10,
  class: "at-detail__section"
}, ef = { class: "at-detail__gallery" }, sf = ["onClick"], nf = ["src"], of = {
  key: 11,
  class: "at-detail__section"
}, rf = { class: "at-detail__path-line" }, lf = /* @__PURE__ */ Qt({
  __name: "DetailPanel",
  setup(t) {
    const e = he(), { detail: s, detailLoading: n } = qe(e), o = ht(
      () => s.value ? xs(s.value.cover_url_full || s.value.cover_url) : null
    ), i = ht(() => {
      var $;
      const v = ($ = s.value) == null ? void 0 : $.trigger_words;
      return v ? Array.isArray(v) ? v.map((E) => String(E).trim()).filter(Boolean) : [] : [];
    }), r = ht(() => i.value.join(", ")), l = ht(() => {
      const v = s.value;
      if (!v) return "";
      const $ = (v.path ?? "").trim(), E = (v.comfy_lora_name ?? "").trim();
      if (!$ && !E) return "";
      if (!E) return $;
      if (!$) return E;
      const R = $.includes("\\") ? "\\" : "/", M = $.replace(/[/\\]+$/, "");
      return M.endsWith(E) || $.endsWith(E) ? $ : `${M}${R}${E}`;
    });
    async function c(v, $) {
      const E = ($ ?? "").trim();
      if (!E) return;
      const R = await Qi(E);
      e.showToast(R ? `Copied ${v}` : "Copy failed");
    }
    const f = /* @__PURE__ */ J(null), u = /* @__PURE__ */ J(null);
    function h() {
      f.value = null, u.value = null;
    }
    function p(v) {
      const $ = xs(v.url || v.thumbnail_url);
      if (!$) return;
      f.value = $;
      const E = v.generation_params;
      E && typeof E == "object" && Object.keys(E).length ? u.value = { ...E } : (v.caption ?? "").trim() ? u.value = { caption: v.caption } : u.value = null;
    }
    ye(
      () => {
        var v;
        return (v = s.value) == null ? void 0 : v.asset_id;
      },
      () => {
        h();
      }
    );
    const g = /* @__PURE__ */ J(!1);
    async function A() {
      var $;
      const v = ($ = s.value) == null ? void 0 : $.asset_id;
      if (v != null) {
        g.value = !0;
        try {
          await Bc(v), e.showToast("Metadata refreshed"), await e.loadDetail();
        } catch (E) {
          e.showToast(E instanceof Error ? E.message : "Refresh failed");
        } finally {
          g.value = !1;
        }
      }
    }
    return (v, $) => (C(), T("div", {
      class: "at-detail",
      onClick: $[3] || ($[3] = ce((E) => m(e).closeDetail(), ["self"]))
    }, [
      b("div", {
        class: "at-detail__panel",
        onClick: $[2] || ($[2] = ce(() => {
        }, ["stop"]))
      }, [
        b("div", Eu, [
          $[4] || ($[4] = b("h2", { class: "at-detail__h" }, "Details", -1)),
          b("button", {
            type: "button",
            class: "at-detail__close",
            onClick: $[0] || ($[0] = (E) => m(e).closeDetail())
          }, "×")
        ]),
        m(n) ? (C(), T("div", ku, "Loading…")) : m(s) ? (C(), T("div", Ou, [
          o.value ? (C(), T("div", Mu, [
            b("img", {
              src: o.value,
              alt: "",
              class: "at-detail__cover",
              loading: "lazy"
            }, null, 8, Pu)
          ])) : Y("", !0),
          b("p", Ru, Q(m(s).display_name || m(s).filename), 1),
          m(s).base_model ? (C(), T("p", Iu, "Base: " + Q(m(s).base_model), 1)) : Y("", !0),
          m(s).default_strength != null && Number(m(s).default_strength) !== 1 ? (C(), T("p", Fu, " Default strength: " + Q(m(s).default_strength), 1)) : Y("", !0),
          b("div", Lu, [
            b("code", Du, Q(m(s).lora_syntax || "—"), 1)
          ]),
          m(s).category || m(s).subcategory ? (C(), T("p", ju, Q([m(s).category, m(s).subcategory].filter(Boolean).join(" / ")), 1)) : Y("", !0),
          m(s).notes ? (C(), T("section", Nu, [
            $[5] || ($[5] = b("div", { class: "at-detail__sec-title" }, "Notes", -1)),
            b("p", Hu, Q(m(s).notes), 1)
          ])) : Y("", !0),
          b("section", Vu, [
            b("div", Uu, [
              $[6] || ($[6] = b("span", { class: "at-detail__sec-title" }, "Triggers", -1)),
              i.value.length ? (C(), T("button", {
                key: 0,
                type: "button",
                class: "at-detail__mini",
                onClick: $[1] || ($[1] = (E) => c("triggers", r.value))
              }, " Copy ")) : Y("", !0)
            ]),
            i.value.length ? (C(), T("ul", Bu, [
              (C(!0), T(at, null, Lt(i.value, (E, R) => (C(), T("li", {
                key: `${R}-${E}`,
                class: "at-detail__tw-item"
              }, [
                b("code", null, Q(E), 1)
              ]))), 128))
            ])) : (C(), T("p", Ku, "—"))
          ]),
          (m(s).tags ?? []).length ? (C(), T("section", Wu, [
            $[7] || ($[7] = b("div", { class: "at-detail__sec-title" }, "Tags", -1)),
            b("div", qu, [
              (C(!0), T(at, null, Lt(m(s).tags, (E) => (C(), T("span", {
                key: E,
                class: "at-detail__tag"
              }, Q(E), 1))), 128))
            ])
          ])) : Y("", !0),
          m(s).source_creator_name ? (C(), T("p", Ju, " By " + Q(m(s).source_creator_name), 1)) : Y("", !0),
          m(s).source_url ? (C(), T("a", {
            key: 7,
            href: m(s).source_url,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "at-detail__link"
          }, "Source", 8, Gu)) : Y("", !0),
          b("div", Yu, [
            b("button", {
              type: "button",
              class: "at-detail__mini",
              disabled: g.value,
              onClick: A
            }, Q(g.value ? "Refreshing…" : "Refresh from Civitai"), 9, Qu)
          ]),
          m(s).usage_count || m(s).last_used_at ? (C(), T("p", zu, [
            Nt(" Uses: " + Q(m(s).usage_count), 1),
            m(s).last_used_at ? (C(), T(at, { key: 0 }, [
              Nt(" · " + Q(m(s).last_used_at.replace("T", " ").slice(0, 19)), 1)
            ], 64)) : Y("", !0)
          ])) : Y("", !0),
          m(s).description_html ? (C(), T("section", Xu, [
            $[8] || ($[8] = b("div", { class: "at-detail__sec-title" }, "Description", -1)),
            b("div", {
              class: "at-detail__html",
              innerHTML: m(s).description_html
            }, null, 8, Zu)
          ])) : Y("", !0),
          m(s).example_media.length ? (C(), T("section", tf, [
            $[9] || ($[9] = b("div", { class: "at-detail__sec-title" }, "Examples", -1)),
            b("div", ef, [
              (C(!0), T(at, null, Lt(m(s).example_media, (E) => (C(), T("div", {
                key: E.media_id,
                class: "at-detail__ex-wrap"
              }, [
                b("button", {
                  type: "button",
                  class: "at-detail__ex",
                  onClick: (R) => p(E)
                }, [
                  E.thumbnail_url || E.url ? (C(), T("img", {
                    key: 0,
                    src: xs(E.thumbnail_url || E.url) || "",
                    alt: "",
                    class: "at-detail__ex-img",
                    loading: "lazy"
                  }, null, 8, nf)) : Y("", !0)
                ], 8, sf)
              ]))), 128))
            ])
          ])) : Y("", !0),
          l.value ? (C(), T("section", of, [
            $[10] || ($[10] = b("div", { class: "at-detail__sec-title" }, "Path", -1)),
            b("p", rf, Q(l.value), 1)
          ])) : Y("", !0)
        ])) : Y("", !0)
      ]),
      $t(Au, {
        "image-url": f.value,
        meta: u.value,
        onClose: h
      }, null, 8, ["image-url", "meta"])
    ]));
  }
}), cf = /* @__PURE__ */ Xt(lf, [["__scopeId", "data-v-5e178fbe"]]), af = { class: "at-app" }, uf = {
  key: 0,
  class: "at-main-column"
}, ff = { class: "at-empty at-empty--fill" }, df = {
  key: 1,
  class: "at-main-column"
}, hf = { class: "at-chrome" }, pf = {
  key: 0,
  class: "at-empty at-empty--fill"
}, _f = 160, gf = /* @__PURE__ */ Qt({
  __name: "App",
  setup(t) {
    const e = he(), { connected: s, items: n, loading: o, loadingMore: i, viewMode: r, settingsOpen: l, selectedAssetId: c } = qe(e), f = /* @__PURE__ */ J(null);
    function u(A) {
      return A.scrollHeight - A.scrollTop - A.clientHeight <= _f;
    }
    function h() {
      const A = f.value;
      !A || !e.hasMore || e.loading || e.loadingMore || u(A) && e.loadMore();
    }
    let p = 0;
    function g() {
      p || (p = requestAnimationFrame(() => {
        p = 0, h();
      }));
    }
    return ye(
      () => f.value,
      (A, v) => {
        v && v.removeEventListener("scroll", g), A && (A.addEventListener("scroll", g, { passive: !0 }), requestAnimationFrame(() => h()));
      },
      { flush: "post", immediate: !0 }
    ), ye(
      [n, o, i, s],
      () => {
        requestAnimationFrame(() => h());
      },
      { flush: "post" }
    ), Si(() => {
      e.bootstrap();
    }), jn(() => {
      const A = f.value;
      A && A.removeEventListener("scroll", g);
    }), (A, v) => (C(), T("div", af, [
      m(s) ? (C(), T("div", df, [
        b("div", hf, [
          $t(Io),
          $t(Fo)
        ]),
        !m(e).loading && !m(n).length && !m(e).error ? (C(), T("div", pf, [
          v[6] || (v[6] = b("p", null, "No LoRAs in the index for this filter.", -1)),
          b("button", {
            type: "button",
            class: "at-empty__btn",
            onClick: v[2] || (v[2] = ($) => m(e).resetFilters())
          }, " Reset filters ")
        ])) : (C(), T("div", {
          key: 1,
          ref_key: "scrollRoot",
          ref: f,
          class: "at-scroll"
        }, [
          m(r) === "grid" ? (C(), ve(iu, { key: 0 })) : (C(), ve(cu, { key: 1 }))
        ], 512))
      ])) : (C(), T("div", uf, [
        $t(Io),
        $t(Fo),
        b("div", ff, [
          b("p", null, [
            v[3] || (v[3] = Nt("Could not connect to AssetThingie at ", -1)),
            b("code", null, Q(m(e).baseUrlInput), 1),
            v[4] || (v[4] = Nt(".", -1))
          ]),
          v[5] || (v[5] = b("p", { class: "at-empty__sub" }, "Start the app or open settings to change the URL.", -1)),
          b("button", {
            type: "button",
            class: "at-empty__btn",
            onClick: v[0] || (v[0] = ($) => m(e).settingsOpen = !0)
          }, " Settings "),
          b("button", {
            type: "button",
            class: "at-empty__btn",
            onClick: v[1] || (v[1] = ($) => m(e).bootstrap())
          }, "Retry")
        ])
      ])),
      m(l) ? (C(), ve(wu, { key: 2 })) : Y("", !0),
      m(c) != null ? (C(), ve(cf, { key: 3 })) : Y("", !0)
    ]));
  }
}), mf = /* @__PURE__ */ Xt(gf, [["__scopeId", "data-v-4ffa4e62"]]);
function vf(t) {
  const e = Oc(), s = Ac(mf);
  return s.use(e), s.mount(t), s;
}
export {
  vf as mount
};
