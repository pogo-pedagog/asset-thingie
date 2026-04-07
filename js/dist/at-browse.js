/**
* @vue/shared v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function En(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const ae = {}, Pt = [], Ye = () => {
}, Uo = () => !1, ks = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Is = (e) => e.startsWith("onUpdate:"), ve = Object.assign, Mn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, rr = Object.prototype.hasOwnProperty, le = (e, t) => rr.call(e, t), B = Array.isArray, kt = (e) => as(e) === "[object Map]", Ut = (e) => as(e) === "[object Set]", Qn = (e) => as(e) === "[object Date]", K = (e) => typeof e == "function", he = (e) => typeof e == "string", Re = (e) => typeof e == "symbol", ie = (e) => e !== null && typeof e == "object", Vo = (e) => (ie(e) || K(e)) && K(e.then) && K(e.catch), jo = Object.prototype.toString, as = (e) => jo.call(e), ir = (e) => as(e).slice(8, -1), Bo = (e) => as(e) === "[object Object]", Rs = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jt = /* @__PURE__ */ En(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ds = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, cr = /-\w/g, De = Ds(
  (e) => e.replace(cr, (t) => t.slice(1).toUpperCase())
), ar = /\B([A-Z])/g, pt = Ds(
  (e) => e.replace(ar, "-$1").toLowerCase()
), Ho = Ds((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xs = Ds(
  (e) => e ? `on${Ho(e)}` : ""
), Ge = (e, t) => !Object.is(e, t), ys = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Wo = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Fs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Xn;
const Ls = () => Xn || (Xn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ns(e) {
  if (B(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = he(n) ? hr(n) : Ns(n);
      if (o)
        for (const l in o)
          t[l] = o[l];
    }
    return t;
  } else if (he(e) || ie(e))
    return e;
}
const ur = /;(?![^(]*\))/g, fr = /:([^]+)/, dr = /\/\*[^]*?\*\//g;
function hr(e) {
  const t = {};
  return e.replace(dr, "").split(ur).forEach((s) => {
    if (s) {
      const n = s.split(fr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ot(e) {
  let t = "";
  if (he(e))
    t = e;
  else if (B(e))
    for (let s = 0; s < e.length; s++) {
      const n = ot(e[s]);
      n && (t += n + " ");
    }
  else if (ie(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const pr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gr = /* @__PURE__ */ En(pr);
function Ko(e) {
  return !!e || e === "";
}
function _r(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = ft(e[n], t[n]);
  return s;
}
function ft(e, t) {
  if (e === t) return !0;
  let s = Qn(e), n = Qn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Re(e), n = Re(t), s || n)
    return e === t;
  if (s = B(e), n = B(t), s || n)
    return s && n ? _r(e, t) : !1;
  if (s = ie(e), n = ie(t), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(e).length, l = Object.keys(t).length;
    if (o !== l)
      return !1;
    for (const r in e) {
      const i = e.hasOwnProperty(r), c = t.hasOwnProperty(r);
      if (i && !c || !i && c || !ft(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function On(e, t) {
  return e.findIndex((s) => ft(s, t));
}
const qo = (e) => !!(e && e.__v_isRef === !0), re = (e) => he(e) ? e : e == null ? "" : B(e) || ie(e) && (e.toString === jo || !K(e.toString)) ? qo(e) ? re(e.value) : JSON.stringify(e, Go, 2) : String(e), Go = (e, t) => qo(t) ? Go(e, t.value) : kt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], l) => (s[Zs(n, l) + " =>"] = o, s),
    {}
  )
} : Ut(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Zs(s))
} : Re(t) ? Zs(t) : ie(t) && !B(t) && !Bo(t) ? String(t) : t, Zs = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Re(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let we;
class Jo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = we, !t && we && (this.index = (we.scopes || (we.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = we;
      try {
        return we = this, t();
      } finally {
        we = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = we, we = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (we = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
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
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Yo(e) {
  return new Jo(e);
}
function zo() {
  return we;
}
function mr(e, t = !1) {
  we && we.cleanups.push(e);
}
let de;
const en = /* @__PURE__ */ new WeakSet();
class Qo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, we && we.active && we.effects.push(this);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Zo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Zn(this), el(this);
    const t = de, s = Fe;
    de = this, Fe = !0;
    try {
      return this.fn();
    } finally {
      tl(this), de = t, Fe = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        kn(t);
      this.deps = this.depsTail = void 0, Zn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? en.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    dn(this) && this.run();
  }
  get dirty() {
    return dn(this);
  }
}
let Xo = 0, Yt, zt;
function Zo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = zt, zt = e;
    return;
  }
  e.next = Yt, Yt = e;
}
function An() {
  Xo++;
}
function Pn() {
  if (--Xo > 0)
    return;
  if (zt) {
    let t = zt;
    for (zt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Yt; ) {
    let t = Yt;
    for (Yt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function el(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function tl(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), kn(n), br(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function dn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (sl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function sl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ns) || (e.globalVersion = ns, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !dn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = de, n = Fe;
  de = e, Fe = !0;
  try {
    el(e);
    const o = e.fn(e._value);
    (t.version === 0 || Ge(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    de = s, Fe = n, tl(e), e.flags &= -3;
  }
}
function kn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let l = s.computed.deps; l; l = l.nextDep)
      kn(l, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function br(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Fe = !0;
const nl = [];
function lt() {
  nl.push(Fe), Fe = !1;
}
function rt() {
  const e = nl.pop();
  Fe = e === void 0 ? !0 : e;
}
function Zn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = de;
    de = void 0;
    try {
      t();
    } finally {
      de = s;
    }
  }
}
let ns = 0;
class yr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class In {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!de || !Fe || de === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== de)
      s = this.activeLink = new yr(de, this), de.deps ? (s.prevDep = de.depsTail, de.depsTail.nextDep = s, de.depsTail = s) : de.deps = de.depsTail = s, ol(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = de.depsTail, s.nextDep = void 0, de.depsTail.nextDep = s, de.depsTail = s, de.deps === s && (de.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, ns++, this.notify(t);
  }
  notify(t) {
    An();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Pn();
    }
  }
}
function ol(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        ol(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const xs = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ Symbol(
  ""
), hn = /* @__PURE__ */ Symbol(
  ""
), os = /* @__PURE__ */ Symbol(
  ""
);
function Se(e, t, s) {
  if (Fe && de) {
    let n = xs.get(e);
    n || xs.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new In()), o.map = n, o.key = s), o.track();
  }
}
function tt(e, t, s, n, o, l) {
  const r = xs.get(e);
  if (!r) {
    ns++;
    return;
  }
  const i = (c) => {
    c && c.trigger();
  };
  if (An(), t === "clear")
    r.forEach(i);
  else {
    const c = B(e), f = c && Rs(s);
    if (c && s === "length") {
      const u = Number(n);
      r.forEach((h, v) => {
        (v === "length" || v === os || !Re(v) && v >= u) && i(h);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && i(r.get(s)), f && i(r.get(os)), t) {
        case "add":
          c ? f && i(r.get("length")) : (i(r.get(xt)), kt(e) && i(r.get(hn)));
          break;
        case "delete":
          c || (i(r.get(xt)), kt(e) && i(r.get(hn)));
          break;
        case "set":
          kt(e) && i(r.get(xt));
          break;
      }
  }
  Pn();
}
function vr(e, t) {
  const s = xs.get(e);
  return s && s.get(t);
}
function Mt(e) {
  const t = /* @__PURE__ */ Z(e);
  return t === e ? t : (Se(t, "iterate", os), /* @__PURE__ */ Ae(e) ? t : t.map(Le));
}
function Us(e) {
  return Se(e = /* @__PURE__ */ Z(e), "iterate", os), e;
}
function Ke(e, t) {
  return /* @__PURE__ */ it(e) ? Ft(/* @__PURE__ */ ze(e) ? Le(t) : t) : Le(t);
}
const wr = {
  __proto__: null,
  [Symbol.iterator]() {
    return tn(this, Symbol.iterator, (e) => Ke(this, e));
  },
  concat(...e) {
    return Mt(this).concat(
      ...e.map((t) => B(t) ? Mt(t) : t)
    );
  },
  entries() {
    return tn(this, "entries", (e) => (e[1] = Ke(this, e[1]), e));
  },
  every(e, t) {
    return Xe(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Xe(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => Ke(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Xe(
      this,
      "find",
      e,
      t,
      (s) => Ke(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Xe(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Xe(
      this,
      "findLast",
      e,
      t,
      (s) => Ke(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Xe(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Xe(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return sn(this, "includes", e);
  },
  indexOf(...e) {
    return sn(this, "indexOf", e);
  },
  join(e) {
    return Mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return sn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Xe(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ht(this, "pop");
  },
  push(...e) {
    return Ht(this, "push", e);
  },
  reduce(e, ...t) {
    return eo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return eo(this, "reduceRight", e, t);
  },
  shift() {
    return Ht(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Xe(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ht(this, "splice", e);
  },
  toReversed() {
    return Mt(this).toReversed();
  },
  toSorted(e) {
    return Mt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Mt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ht(this, "unshift", e);
  },
  values() {
    return tn(this, "values", (e) => Ke(this, e));
  }
};
function tn(e, t, s) {
  const n = Us(e), o = n[t]();
  return n !== e && !/* @__PURE__ */ Ae(e) && (o._next = o.next, o.next = () => {
    const l = o._next();
    return l.done || (l.value = s(l.value)), l;
  }), o;
}
const Sr = Array.prototype;
function Xe(e, t, s, n, o, l) {
  const r = Us(e), i = r !== e && !/* @__PURE__ */ Ae(e), c = r[t];
  if (c !== Sr[t]) {
    const h = c.apply(e, l);
    return i ? Le(h) : h;
  }
  let f = s;
  r !== e && (i ? f = function(h, v) {
    return s.call(this, Ke(e, h), v, e);
  } : s.length > 2 && (f = function(h, v) {
    return s.call(this, h, v, e);
  }));
  const u = c.call(r, f, n);
  return i && o ? o(u) : u;
}
function eo(e, t, s, n) {
  const o = Us(e), l = o !== e && !/* @__PURE__ */ Ae(e);
  let r = s, i = !1;
  o !== e && (l ? (i = n.length === 0, r = function(f, u, h) {
    return i && (i = !1, f = Ke(e, f)), s.call(this, f, Ke(e, u), h, e);
  }) : s.length > 3 && (r = function(f, u, h) {
    return s.call(this, f, u, h, e);
  }));
  const c = o[t](r, ...n);
  return i ? Ke(e, c) : c;
}
function sn(e, t, s) {
  const n = /* @__PURE__ */ Z(e);
  Se(n, "iterate", os);
  const o = n[t](...s);
  return (o === -1 || o === !1) && /* @__PURE__ */ js(s[0]) ? (s[0] = /* @__PURE__ */ Z(s[0]), n[t](...s)) : o;
}
function Ht(e, t, s = []) {
  lt(), An();
  const n = (/* @__PURE__ */ Z(e))[t].apply(e, s);
  return Pn(), rt(), n;
}
const xr = /* @__PURE__ */ En("__proto__,__v_isRef,__isVue"), ll = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Re)
);
function Cr(e) {
  Re(e) || (e = String(e));
  const t = /* @__PURE__ */ Z(this);
  return Se(t, "has", e), t.hasOwnProperty(e);
}
class rl {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, l = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return l;
    if (s === "__v_raw")
      return n === (o ? l ? Rr : ul : l ? al : cl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const r = B(t);
    if (!o) {
      let c;
      if (r && (c = wr[s]))
        return c;
      if (s === "hasOwnProperty")
        return Cr;
    }
    const i = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ se(t) ? t : n
    );
    if ((Re(s) ? ll.has(s) : xr(s)) || (o || Se(t, "get", s), l))
      return i;
    if (/* @__PURE__ */ se(i)) {
      const c = r && Rs(s) ? i : i.value;
      return o && ie(c) ? /* @__PURE__ */ gn(c) : c;
    }
    return ie(i) ? o ? /* @__PURE__ */ gn(i) : /* @__PURE__ */ Vs(i) : i;
  }
}
class il extends rl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let l = t[s];
    const r = B(t) && Rs(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ it(l);
      if (!/* @__PURE__ */ Ae(n) && !/* @__PURE__ */ it(n) && (l = /* @__PURE__ */ Z(l), n = /* @__PURE__ */ Z(n)), !r && /* @__PURE__ */ se(l) && !/* @__PURE__ */ se(n))
        return f || (l.value = n), !0;
    }
    const i = r ? Number(s) < t.length : le(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ se(t) ? t : o
    );
    return t === /* @__PURE__ */ Z(o) && (i ? Ge(n, l) && tt(t, "set", s, n) : tt(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = le(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && tt(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Re(s) || !ll.has(s)) && Se(t, "has", s), n;
  }
  ownKeys(t) {
    return Se(
      t,
      "iterate",
      B(t) ? "length" : xt
    ), Reflect.ownKeys(t);
  }
}
class Tr extends rl {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const $r = /* @__PURE__ */ new il(), Er = /* @__PURE__ */ new Tr(), Mr = /* @__PURE__ */ new il(!0);
const pn = (e) => e, gs = (e) => Reflect.getPrototypeOf(e);
function Or(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, l = /* @__PURE__ */ Z(o), r = kt(l), i = e === "entries" || e === Symbol.iterator && r, c = e === "keys" && r, f = o[e](...n), u = s ? pn : t ? Ft : Le;
    return !t && Se(
      l,
      "iterate",
      c ? hn : xt
    ), ve(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: v } = f.next();
          return v ? { value: h, done: v } : {
            value: i ? [u(h[0]), u(h[1])] : u(h),
            done: v
          };
        }
      }
    );
  };
}
function _s(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ar(e, t) {
  const s = {
    get(o) {
      const l = this.__v_raw, r = /* @__PURE__ */ Z(l), i = /* @__PURE__ */ Z(o);
      e || (Ge(o, i) && Se(r, "get", o), Se(r, "get", i));
      const { has: c } = gs(r), f = t ? pn : e ? Ft : Le;
      if (c.call(r, o))
        return f(l.get(o));
      if (c.call(r, i))
        return f(l.get(i));
      l !== r && l.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Se(/* @__PURE__ */ Z(o), "iterate", xt), o.size;
    },
    has(o) {
      const l = this.__v_raw, r = /* @__PURE__ */ Z(l), i = /* @__PURE__ */ Z(o);
      return e || (Ge(o, i) && Se(r, "has", o), Se(r, "has", i)), o === i ? l.has(o) : l.has(o) || l.has(i);
    },
    forEach(o, l) {
      const r = this, i = r.__v_raw, c = /* @__PURE__ */ Z(i), f = t ? pn : e ? Ft : Le;
      return !e && Se(c, "iterate", xt), i.forEach((u, h) => o.call(l, f(u), f(h), r));
    }
  };
  return ve(
    s,
    e ? {
      add: _s("add"),
      set: _s("set"),
      delete: _s("delete"),
      clear: _s("clear")
    } : {
      add(o) {
        const l = /* @__PURE__ */ Z(this), r = gs(l), i = /* @__PURE__ */ Z(o), c = !t && !/* @__PURE__ */ Ae(o) && !/* @__PURE__ */ it(o) ? i : o;
        return r.has.call(l, c) || Ge(o, c) && r.has.call(l, o) || Ge(i, c) && r.has.call(l, i) || (l.add(c), tt(l, "add", c, c)), this;
      },
      set(o, l) {
        !t && !/* @__PURE__ */ Ae(l) && !/* @__PURE__ */ it(l) && (l = /* @__PURE__ */ Z(l));
        const r = /* @__PURE__ */ Z(this), { has: i, get: c } = gs(r);
        let f = i.call(r, o);
        f || (o = /* @__PURE__ */ Z(o), f = i.call(r, o));
        const u = c.call(r, o);
        return r.set(o, l), f ? Ge(l, u) && tt(r, "set", o, l) : tt(r, "add", o, l), this;
      },
      delete(o) {
        const l = /* @__PURE__ */ Z(this), { has: r, get: i } = gs(l);
        let c = r.call(l, o);
        c || (o = /* @__PURE__ */ Z(o), c = r.call(l, o)), i && i.call(l, o);
        const f = l.delete(o);
        return c && tt(l, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ Z(this), l = o.size !== 0, r = o.clear();
        return l && tt(
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
    s[o] = Or(o, e, t);
  }), s;
}
function Rn(e, t) {
  const s = Ar(e, t);
  return (n, o, l) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    le(s, o) && o in n ? s : n,
    o,
    l
  );
}
const Pr = {
  get: /* @__PURE__ */ Rn(!1, !1)
}, kr = {
  get: /* @__PURE__ */ Rn(!1, !0)
}, Ir = {
  get: /* @__PURE__ */ Rn(!0, !1)
};
const cl = /* @__PURE__ */ new WeakMap(), al = /* @__PURE__ */ new WeakMap(), ul = /* @__PURE__ */ new WeakMap(), Rr = /* @__PURE__ */ new WeakMap();
function Dr(e) {
  switch (e) {
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
function Fr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Dr(ir(e));
}
// @__NO_SIDE_EFFECTS__
function Vs(e) {
  return /* @__PURE__ */ it(e) ? e : Dn(
    e,
    !1,
    $r,
    Pr,
    cl
  );
}
// @__NO_SIDE_EFFECTS__
function Lr(e) {
  return Dn(
    e,
    !1,
    Mr,
    kr,
    al
  );
}
// @__NO_SIDE_EFFECTS__
function gn(e) {
  return Dn(
    e,
    !0,
    Er,
    Ir,
    ul
  );
}
function Dn(e, t, s, n, o) {
  if (!ie(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const l = Fr(e);
  if (l === 0)
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = new Proxy(
    e,
    l === 2 ? n : s
  );
  return o.set(e, i), i;
}
// @__NO_SIDE_EFFECTS__
function ze(e) {
  return /* @__PURE__ */ it(e) ? /* @__PURE__ */ ze(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function it(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ae(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function js(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Z(t) : e;
}
function Fn(e) {
  return !le(e, "__v_skip") && Object.isExtensible(e) && Wo(e, "__v_skip", !0), e;
}
const Le = (e) => ie(e) ? /* @__PURE__ */ Vs(e) : e, Ft = (e) => ie(e) ? /* @__PURE__ */ gn(e) : e;
// @__NO_SIDE_EFFECTS__
function se(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function J(e) {
  return Nr(e, !1);
}
function Nr(e, t) {
  return /* @__PURE__ */ se(e) ? e : new Ur(e, t);
}
class Ur {
  constructor(t, s) {
    this.dep = new In(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ Z(t), this._value = s ? t : Le(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ae(t) || /* @__PURE__ */ it(t);
    t = n ? t : /* @__PURE__ */ Z(t), Ge(t, s) && (this._rawValue = t, this._value = n ? t : Le(t), this.dep.trigger());
  }
}
function N(e) {
  return /* @__PURE__ */ se(e) ? e.value : e;
}
const Vr = {
  get: (e, t, s) => t === "__v_raw" ? e : N(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return /* @__PURE__ */ se(o) && !/* @__PURE__ */ se(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function fl(e) {
  return /* @__PURE__ */ ze(e) ? e : new Proxy(e, Vr);
}
// @__NO_SIDE_EFFECTS__
function jr(e) {
  const t = B(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = dl(e, s);
  return t;
}
class Br {
  constructor(t, s, n) {
    this._object = t, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = Re(s) ? s : String(s), this._raw = /* @__PURE__ */ Z(t);
    let o = !0, l = t;
    if (!B(t) || Re(this._key) || !Rs(this._key))
      do
        o = !/* @__PURE__ */ js(l) || /* @__PURE__ */ Ae(l);
      while (o && (l = l.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = N(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ se(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ se(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return vr(this._raw, this._key);
  }
}
class Hr {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Wr(e, t, s) {
  return /* @__PURE__ */ se(e) ? e : K(e) ? new Hr(e) : ie(e) && arguments.length > 1 ? dl(e, t, s) : /* @__PURE__ */ J(e);
}
function dl(e, t, s) {
  return new Br(e, t, s);
}
class Kr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new In(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ns - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    de !== this)
      return Zo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return sl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function qr(e, t, s = !1) {
  let n, o;
  return K(e) ? n = e : (n = e.get, o = e.set), new Kr(n, o, s);
}
const ms = {}, Cs = /* @__PURE__ */ new WeakMap();
let vt;
function Gr(e, t = !1, s = vt) {
  if (s) {
    let n = Cs.get(s);
    n || Cs.set(s, n = []), n.push(e);
  }
}
function Jr(e, t, s = ae) {
  const { immediate: n, deep: o, once: l, scheduler: r, augmentJob: i, call: c } = s, f = (U) => o ? U : /* @__PURE__ */ Ae(U) || o === !1 || o === 0 ? st(U, 1) : st(U);
  let u, h, v, m, y = !1, _ = !1;
  if (/* @__PURE__ */ se(e) ? (h = () => e.value, y = /* @__PURE__ */ Ae(e)) : /* @__PURE__ */ ze(e) ? (h = () => f(e), y = !0) : B(e) ? (_ = !0, y = e.some((U) => /* @__PURE__ */ ze(U) || /* @__PURE__ */ Ae(U)), h = () => e.map((U) => {
    if (/* @__PURE__ */ se(U))
      return U.value;
    if (/* @__PURE__ */ ze(U))
      return f(U);
    if (K(U))
      return c ? c(U, 2) : U();
  })) : K(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (v) {
      lt();
      try {
        v();
      } finally {
        rt();
      }
    }
    const U = vt;
    vt = u;
    try {
      return c ? c(e, 3, [m]) : e(m);
    } finally {
      vt = U;
    }
  } : h = Ye, t && o) {
    const U = h, Y = o === !0 ? 1 / 0 : o;
    h = () => st(U(), Y);
  }
  const R = zo(), b = () => {
    u.stop(), R && R.active && Mn(R.effects, u);
  };
  if (l && t) {
    const U = t;
    t = (...Y) => {
      U(...Y), b();
    };
  }
  let O = _ ? new Array(e.length).fill(ms) : ms;
  const G = (U) => {
    if (!(!(u.flags & 1) || !u.dirty && !U))
      if (t) {
        const Y = u.run();
        if (o || y || (_ ? Y.some((z, X) => Ge(z, O[X])) : Ge(Y, O))) {
          v && v();
          const z = vt;
          vt = u;
          try {
            const X = [
              Y,
              // pass undefined as the old value when it's changed for the first time
              O === ms ? void 0 : _ && O[0] === ms ? [] : O,
              m
            ];
            O = Y, c ? c(t, 3, X) : (
              // @ts-expect-error
              t(...X)
            );
          } finally {
            vt = z;
          }
        }
      } else
        u.run();
  };
  return i && i(G), u = new Qo(h), u.scheduler = r ? () => r(G, !1) : G, m = (U) => Gr(U, !1, u), v = u.onStop = () => {
    const U = Cs.get(u);
    if (U) {
      if (c)
        c(U, 4);
      else
        for (const Y of U) Y();
      Cs.delete(u);
    }
  }, t ? n ? G(!0) : O = u.run() : r ? r(G.bind(null, !0), !0) : u.run(), b.pause = u.pause.bind(u), b.resume = u.resume.bind(u), b.stop = b, b;
}
function st(e, t = 1 / 0, s) {
  if (t <= 0 || !ie(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ se(e))
    st(e.value, t, s);
  else if (B(e))
    for (let n = 0; n < e.length; n++)
      st(e[n], t, s);
  else if (Ut(e) || kt(e))
    e.forEach((n) => {
      st(n, t, s);
    });
  else if (Bo(e)) {
    for (const n in e)
      st(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && st(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function us(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    Bs(o, t, s);
  }
}
function Qe(e, t, s, n) {
  if (K(e)) {
    const o = us(e, t, s, n);
    return o && Vo(o) && o.catch((l) => {
      Bs(l, t, s);
    }), o;
  }
  if (B(e)) {
    const o = [];
    for (let l = 0; l < e.length; l++)
      o.push(Qe(e[l], t, s, n));
    return o;
  }
}
function Bs(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: r } = t && t.appContext.config || ae;
  if (t) {
    let i = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let h = 0; h < u.length; h++)
          if (u[h](e, c, f) === !1)
            return;
      }
      i = i.parent;
    }
    if (l) {
      lt(), us(l, null, 10, [
        e,
        c,
        f
      ]), rt();
      return;
    }
  }
  Yr(e, s, o, n, r);
}
function Yr(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const $e = [];
let He = -1;
const It = [];
let ut = null, At = 0;
const hl = /* @__PURE__ */ Promise.resolve();
let Ts = null;
function Ln(e) {
  const t = Ts || hl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zr(e) {
  let t = He + 1, s = $e.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = $e[n], l = ls(o);
    l < e || l === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function Nn(e) {
  if (!(e.flags & 1)) {
    const t = ls(e), s = $e[$e.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ls(s) ? $e.push(e) : $e.splice(zr(t), 0, e), e.flags |= 1, pl();
  }
}
function pl() {
  Ts || (Ts = hl.then(_l));
}
function Qr(e) {
  B(e) ? It.push(...e) : ut && e.id === -1 ? ut.splice(At + 1, 0, e) : e.flags & 1 || (It.push(e), e.flags |= 1), pl();
}
function to(e, t, s = He + 1) {
  for (; s < $e.length; s++) {
    const n = $e[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      $e.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function gl(e) {
  if (It.length) {
    const t = [...new Set(It)].sort(
      (s, n) => ls(s) - ls(n)
    );
    if (It.length = 0, ut) {
      ut.push(...t);
      return;
    }
    for (ut = t, At = 0; At < ut.length; At++) {
      const s = ut[At];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    ut = null, At = 0;
  }
}
const ls = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function _l(e) {
  try {
    for (He = 0; He < $e.length; He++) {
      const t = $e[He];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), us(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; He < $e.length; He++) {
      const t = $e[He];
      t && (t.flags &= -2);
    }
    He = -1, $e.length = 0, gl(), Ts = null, ($e.length || It.length) && _l();
  }
}
let ke = null, ml = null;
function $s(e) {
  const t = ke;
  return ke = e, ml = e && e.type.__scopeId || null, t;
}
function Xr(e, t = ke, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && go(-1);
    const l = $s(t);
    let r;
    try {
      r = e(...o);
    } finally {
      $s(l), n._d && go(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function ge(e, t) {
  if (ke === null)
    return e;
  const s = Js(ke), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [l, r, i, c = ae] = t[o];
    l && (K(l) && (l = {
      mounted: l,
      updated: l
    }), l.deep && st(r), n.push({
      dir: l,
      instance: s,
      value: r,
      oldValue: void 0,
      arg: i,
      modifiers: c
    }));
  }
  return e;
}
function mt(e, t, s, n) {
  const o = e.dirs, l = t && t.dirs;
  for (let r = 0; r < o.length; r++) {
    const i = o[r];
    l && (i.oldValue = l[r].value);
    let c = i.dir[n];
    c && (lt(), Qe(c, s, 8, [
      e.el,
      i,
      e,
      t
    ]), rt());
  }
}
function Zr(e, t) {
  if (Ee) {
    let s = Ee.provides;
    const n = Ee.parent && Ee.parent.provides;
    n === s && (s = Ee.provides = Object.create(n)), s[e] = t;
  }
}
function Qt(e, t, s = !1) {
  const n = Hl();
  if (n || Tt) {
    let o = Tt ? Tt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && K(t) ? t.call(n && n.proxy) : t;
  }
}
function ei() {
  return !!(Hl() || Tt);
}
const ti = /* @__PURE__ */ Symbol.for("v-scx"), si = () => Qt(ti);
function Ct(e, t, s) {
  return bl(e, t, s);
}
function bl(e, t, s = ae) {
  const { immediate: n, deep: o, flush: l, once: r } = s, i = ve({}, s), c = t && n || !t && l !== "post";
  let f;
  if (is) {
    if (l === "sync") {
      const m = si();
      f = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {
      };
      return m.stop = Ye, m.resume = Ye, m.pause = Ye, m;
    }
  }
  const u = Ee;
  i.call = (m, y, _) => Qe(m, u, y, _);
  let h = !1;
  l === "post" ? i.scheduler = (m) => {
    Te(m, u && u.suspense);
  } : l !== "sync" && (h = !0, i.scheduler = (m, y) => {
    y ? m() : Nn(m);
  }), i.augmentJob = (m) => {
    t && (m.flags |= 4), h && (m.flags |= 2, u && (m.id = u.uid, m.i = u));
  };
  const v = Jr(e, t, i);
  return is && (f ? f.push(v) : c && v()), v;
}
function ni(e, t, s) {
  const n = this.proxy, o = he(e) ? e.includes(".") ? yl(n, e) : () => n[e] : e.bind(n, n);
  let l;
  K(t) ? l = t : (l = t.handler, s = t);
  const r = fs(this), i = bl(o, l.bind(n), s);
  return r(), i;
}
function yl(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const bt = /* @__PURE__ */ new WeakMap(), vl = /* @__PURE__ */ Symbol("_vte"), oi = (e) => e.__isTeleport, wt = (e) => e && (e.disabled || e.disabled === ""), li = (e) => e && (e.defer || e.defer === ""), so = (e) => typeof SVGElement < "u" && e instanceof SVGElement, no = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, _n = (e, t) => {
  const s = e && e.to;
  return he(s) ? t ? t(s) : null : s;
}, ri = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, s, n, o, l, r, i, c, f) {
    const {
      mc: u,
      pc: h,
      pbc: v,
      o: { insert: m, querySelector: y, createText: _, createComment: R }
    } = f, b = wt(t.props);
    let { dynamicChildren: O } = t;
    const G = (z, X, L) => {
      z.shapeFlag & 16 && u(
        z.children,
        X,
        L,
        o,
        l,
        r,
        i,
        c
      );
    }, U = (z = t) => {
      const X = wt(z.props), L = z.target = _n(z.props, y), H = mn(L, z, _, m);
      L && (r !== "svg" && so(L) ? r = "svg" : r !== "mathml" && no(L) && (r = "mathml"), o && o.isCE && (o.ce._teleportTargets || (o.ce._teleportTargets = /* @__PURE__ */ new Set())).add(L), X || (G(z, L, H), qt(z, !1)));
    }, Y = (z) => {
      const X = () => {
        bt.get(z) === X && (bt.delete(z), wt(z.props) && (G(z, s, z.anchor), qt(z, !0)), U(z));
      };
      bt.set(z, X), Te(X, l);
    };
    if (e == null) {
      const z = t.el = _(""), X = t.anchor = _("");
      if (m(z, s, n), m(X, s, n), li(t.props) || l && l.pendingBranch) {
        Y(t);
        return;
      }
      b && (G(t, s, X), qt(t, !0)), U();
    } else {
      t.el = e.el;
      const z = t.anchor = e.anchor, X = bt.get(e);
      if (X) {
        X.flags |= 8, bt.delete(e), Y(t);
        return;
      }
      t.targetStart = e.targetStart;
      const L = t.target = e.target, H = t.targetAnchor = e.targetAnchor, E = wt(e.props), T = E ? s : L, ee = E ? z : H;
      if (r === "svg" || so(L) ? r = "svg" : (r === "mathml" || no(L)) && (r = "mathml"), O ? (v(
        e.dynamicChildren,
        O,
        T,
        o,
        l,
        r,
        i
      ), Hn(e, t, !0)) : c || h(
        e,
        t,
        T,
        ee,
        o,
        l,
        r,
        i,
        !1
      ), b)
        E ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : bs(
          t,
          s,
          z,
          f,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const A = t.target = _n(
          t.props,
          y
        );
        A && bs(
          t,
          A,
          null,
          f,
          0
        );
      } else E && bs(
        t,
        L,
        H,
        f,
        1
      );
      qt(t, b);
    }
  },
  remove(e, t, s, { um: n, o: { remove: o } }, l) {
    const {
      shapeFlag: r,
      children: i,
      anchor: c,
      targetStart: f,
      targetAnchor: u,
      target: h,
      props: v
    } = e;
    let m = l || !wt(v);
    const y = bt.get(e);
    if (y && (y.flags |= 8, bt.delete(e), m = !1), h && (o(f), o(u)), l && o(c), r & 16)
      for (let _ = 0; _ < i.length; _++) {
        const R = i[_];
        n(
          R,
          t,
          s,
          m,
          !!R.dynamicChildren
        );
      }
  },
  move: bs,
  hydrate: ii
};
function bs(e, t, s, { o: { insert: n }, m: o }, l = 2) {
  l === 0 && n(e.targetAnchor, t, s);
  const { el: r, anchor: i, shapeFlag: c, children: f, props: u } = e, h = l === 2;
  if (h && n(r, t, s), (!h || wt(u)) && c & 16)
    for (let v = 0; v < f.length; v++)
      o(
        f[v],
        t,
        s,
        2
      );
  h && n(i, t, s);
}
function ii(e, t, s, n, o, l, {
  o: { nextSibling: r, parentNode: i, querySelector: c, insert: f, createText: u }
}, h) {
  function v(R, b) {
    let O = b;
    for (; O; ) {
      if (O && O.nodeType === 8) {
        if (O.data === "teleport start anchor")
          t.targetStart = O;
        else if (O.data === "teleport anchor") {
          t.targetAnchor = O, R._lpa = t.targetAnchor && r(t.targetAnchor);
          break;
        }
      }
      O = r(O);
    }
  }
  function m(R, b) {
    b.anchor = h(
      r(R),
      b,
      i(R),
      s,
      n,
      o,
      l
    );
  }
  const y = t.target = _n(
    t.props,
    c
  ), _ = wt(t.props);
  if (y) {
    const R = y._lpa || y.firstChild;
    t.shapeFlag & 16 && (_ ? (m(e, t), v(y, R), t.targetAnchor || mn(
      y,
      t,
      u,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      i(e) === y ? e : null
    )) : (t.anchor = r(e), v(y, R), t.targetAnchor || mn(y, t, u, f), h(
      R && r(R),
      t,
      y,
      s,
      n,
      o,
      l
    ))), qt(t, _);
  } else _ && t.shapeFlag & 16 && (m(e, t), t.targetStart = e, t.targetAnchor = r(e));
  return t.anchor && r(t.anchor);
}
const ci = ri;
function qt(e, t) {
  const s = e.ctx;
  if (s && s.ut) {
    let n, o;
    for (t ? (n = e.el, o = e.anchor) : (n = e.targetStart, o = e.targetAnchor); n && n !== o; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function mn(e, t, s, n, o = null) {
  const l = t.targetStart = s(""), r = t.targetAnchor = s("");
  return l[vl] = r, e && (n(l, e, o), n(r, e, o)), r;
}
const ai = /* @__PURE__ */ Symbol("_leaveCb");
function Un(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Un(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function $t(e, t) {
  return K(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ve({ name: e.name }, t, { setup: e })
  ) : e;
}
function wl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function oo(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const Es = /* @__PURE__ */ new WeakMap();
function Xt(e, t, s, n, o = !1) {
  if (B(e)) {
    e.forEach(
      (_, R) => Xt(
        _,
        t && (B(t) ? t[R] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Zt(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Xt(e, t, s, n.component.subTree);
    return;
  }
  const l = n.shapeFlag & 4 ? Js(n.component) : n.el, r = o ? null : l, { i, r: c } = e, f = t && t.r, u = i.refs === ae ? i.refs = {} : i.refs, h = i.setupState, v = /* @__PURE__ */ Z(h), m = h === ae ? Uo : (_) => oo(u, _) ? !1 : le(v, _), y = (_, R) => !(R && oo(u, R));
  if (f != null && f !== c) {
    if (lo(t), he(f))
      u[f] = null, m(f) && (h[f] = null);
    else if (/* @__PURE__ */ se(f)) {
      const _ = t;
      y(f, _.k) && (f.value = null), _.k && (u[_.k] = null);
    }
  }
  if (K(c))
    us(c, i, 12, [r, u]);
  else {
    const _ = he(c), R = /* @__PURE__ */ se(c);
    if (_ || R) {
      const b = () => {
        if (e.f) {
          const O = _ ? m(c) ? h[c] : u[c] : y() || !e.k ? c.value : u[e.k];
          if (o)
            B(O) && Mn(O, l);
          else if (B(O))
            O.includes(l) || O.push(l);
          else if (_)
            u[c] = [l], m(c) && (h[c] = u[c]);
          else {
            const G = [l];
            y(c, e.k) && (c.value = G), e.k && (u[e.k] = G);
          }
        } else _ ? (u[c] = r, m(c) && (h[c] = r)) : R && (y(c, e.k) && (c.value = r), e.k && (u[e.k] = r));
      };
      if (r) {
        const O = () => {
          b(), Es.delete(e);
        };
        O.id = -1, Es.set(e, O), Te(O, s);
      } else
        lo(e), b();
    }
  }
}
function lo(e) {
  const t = Es.get(e);
  t && (t.flags |= 8, Es.delete(e));
}
Ls().requestIdleCallback;
Ls().cancelIdleCallback;
const Zt = (e) => !!e.type.__asyncLoader, Sl = (e) => e.type.__isKeepAlive;
function ui(e, t) {
  xl(e, "a", t);
}
function fi(e, t) {
  xl(e, "da", t);
}
function xl(e, t, s = Ee) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Hs(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      Sl(o.parent.vnode) && di(n, t, s, o), o = o.parent;
  }
}
function di(e, t, s, n) {
  const o = Hs(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Ws(() => {
    Mn(n[t], o);
  }, s);
}
function Hs(e, t, s = Ee, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), l = t.__weh || (t.__weh = (...r) => {
      lt();
      const i = fs(s), c = Qe(t, s, e, r);
      return i(), rt(), c;
    });
    return n ? o.unshift(l) : o.push(l), l;
  }
}
const ct = (e) => (t, s = Ee) => {
  (!is || e === "sp") && Hs(e, (...n) => t(...n), s);
}, hi = ct("bm"), Vn = ct("m"), pi = ct(
  "bu"
), gi = ct("u"), _i = ct(
  "bum"
), Ws = ct("um"), mi = ct(
  "sp"
), bi = ct("rtg"), yi = ct("rtc");
function vi(e, t = Ee) {
  Hs("ec", e, t);
}
const wi = /* @__PURE__ */ Symbol.for("v-ndc");
function Je(e, t, s, n) {
  let o;
  const l = s, r = B(e);
  if (r || he(e)) {
    const i = r && /* @__PURE__ */ ze(e);
    let c = !1, f = !1;
    i && (c = !/* @__PURE__ */ Ae(e), f = /* @__PURE__ */ it(e), e = Us(e)), o = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      o[u] = t(
        c ? f ? Ft(Le(e[u])) : Le(e[u]) : e[u],
        u,
        void 0,
        l
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++)
      o[i] = t(i + 1, i, void 0, l);
  } else if (ie(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (i, c) => t(i, c, void 0, l)
      );
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let c = 0, f = i.length; c < f; c++) {
        const u = i[c];
        o[c] = t(e[u], u, c, l);
      }
    }
  else
    o = [];
  return o;
}
const bn = (e) => e ? Wl(e) ? Js(e) : bn(e.parent) : null, es = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ve(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => bn(e.parent),
    $root: (e) => bn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Tl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Nn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ln.bind(e.proxy)),
    $watch: (e) => ni.bind(e)
  })
), nn = (e, t) => e !== ae && !e.__isScriptSetup && le(e, t), Si = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: l, accessCache: r, type: i, appContext: c } = e;
    if (t[0] !== "$") {
      const v = r[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return s[t];
          case 3:
            return l[t];
        }
      else {
        if (nn(n, t))
          return r[t] = 1, n[t];
        if (o !== ae && le(o, t))
          return r[t] = 2, o[t];
        if (le(l, t))
          return r[t] = 3, l[t];
        if (s !== ae && le(s, t))
          return r[t] = 4, s[t];
        yn && (r[t] = 0);
      }
    }
    const f = es[t];
    let u, h;
    if (f)
      return t === "$attrs" && Se(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (u = i.__cssModules) && (u = u[t])
    )
      return u;
    if (s !== ae && le(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      h = c.config.globalProperties, le(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: l } = e;
    return nn(o, t) ? (o[t] = s, !0) : n !== ae && le(n, t) ? (n[t] = s, !0) : le(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (l[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, props: l, type: r }
  }, i) {
    let c;
    return !!(s[i] || e !== ae && i[0] !== "$" && le(e, i) || nn(t, i) || le(l, i) || le(n, i) || le(es, i) || le(o.config.globalProperties, i) || (c = r.__cssModules) && c[i]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : le(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function ro(e) {
  return B(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let yn = !0;
function xi(e) {
  const t = Tl(e), s = e.proxy, n = e.ctx;
  yn = !1, t.beforeCreate && io(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: l,
    methods: r,
    watch: i,
    provide: c,
    inject: f,
    // lifecycle
    created: u,
    beforeMount: h,
    mounted: v,
    beforeUpdate: m,
    updated: y,
    activated: _,
    deactivated: R,
    beforeDestroy: b,
    beforeUnmount: O,
    destroyed: G,
    unmounted: U,
    render: Y,
    renderTracked: z,
    renderTriggered: X,
    errorCaptured: L,
    serverPrefetch: H,
    // public API
    expose: E,
    inheritAttrs: T,
    // assets
    components: ee,
    directives: A,
    filters: D
  } = t;
  if (f && Ci(f, n, null), r)
    for (const Q in r) {
      const ue = r[Q];
      K(ue) && (n[Q] = ue.bind(s));
    }
  if (o) {
    const Q = o.call(s, s);
    ie(Q) && (e.data = /* @__PURE__ */ Vs(Q));
  }
  if (yn = !0, l)
    for (const Q in l) {
      const ue = l[Q], gt = K(ue) ? ue.bind(s, s) : K(ue.get) ? ue.get.bind(s, s) : Ye, hs = !K(ue) && K(ue.set) ? ue.set.bind(s) : Ye, _t = We({
        get: gt,
        set: hs
      });
      Object.defineProperty(n, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => _t.value,
        set: (Ne) => _t.value = Ne
      });
    }
  if (i)
    for (const Q in i)
      Cl(i[Q], n, s, Q);
  if (c) {
    const Q = K(c) ? c.call(s) : c;
    Reflect.ownKeys(Q).forEach((ue) => {
      Zr(ue, Q[ue]);
    });
  }
  u && io(u, e, "c");
  function oe(Q, ue) {
    B(ue) ? ue.forEach((gt) => Q(gt.bind(s))) : ue && Q(ue.bind(s));
  }
  if (oe(hi, h), oe(Vn, v), oe(pi, m), oe(gi, y), oe(ui, _), oe(fi, R), oe(vi, L), oe(yi, z), oe(bi, X), oe(_i, O), oe(Ws, U), oe(mi, H), B(E))
    if (E.length) {
      const Q = e.exposed || (e.exposed = {});
      E.forEach((ue) => {
        Object.defineProperty(Q, ue, {
          get: () => s[ue],
          set: (gt) => s[ue] = gt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === Ye && (e.render = Y), T != null && (e.inheritAttrs = T), ee && (e.components = ee), A && (e.directives = A), H && wl(e);
}
function Ci(e, t, s = Ye) {
  B(e) && (e = vn(e));
  for (const n in e) {
    const o = e[n];
    let l;
    ie(o) ? "default" in o ? l = Qt(
      o.from || n,
      o.default,
      !0
    ) : l = Qt(o.from || n) : l = Qt(o), /* @__PURE__ */ se(l) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => l.value,
      set: (r) => l.value = r
    }) : t[n] = l;
  }
}
function io(e, t, s) {
  Qe(
    B(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Cl(e, t, s, n) {
  let o = n.includes(".") ? yl(s, n) : () => s[n];
  if (he(e)) {
    const l = t[e];
    K(l) && Ct(o, l);
  } else if (K(e))
    Ct(o, e.bind(s));
  else if (ie(e))
    if (B(e))
      e.forEach((l) => Cl(l, t, s, n));
    else {
      const l = K(e.handler) ? e.handler.bind(s) : t[e.handler];
      K(l) && Ct(o, l, e);
    }
}
function Tl(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: l,
    config: { optionMergeStrategies: r }
  } = e.appContext, i = l.get(t);
  let c;
  return i ? c = i : !o.length && !s && !n ? c = t : (c = {}, o.length && o.forEach(
    (f) => Ms(c, f, r, !0)
  ), Ms(c, t, r)), ie(t) && l.set(t, c), c;
}
function Ms(e, t, s, n = !1) {
  const { mixins: o, extends: l } = t;
  l && Ms(e, l, s, !0), o && o.forEach(
    (r) => Ms(e, r, s, !0)
  );
  for (const r in t)
    if (!(n && r === "expose")) {
      const i = Ti[r] || s && s[r];
      e[r] = i ? i(e[r], t[r]) : t[r];
    }
  return e;
}
const Ti = {
  data: co,
  props: ao,
  emits: ao,
  // objects
  methods: Gt,
  computed: Gt,
  // lifecycle
  beforeCreate: Ce,
  created: Ce,
  beforeMount: Ce,
  mounted: Ce,
  beforeUpdate: Ce,
  updated: Ce,
  beforeDestroy: Ce,
  beforeUnmount: Ce,
  destroyed: Ce,
  unmounted: Ce,
  activated: Ce,
  deactivated: Ce,
  errorCaptured: Ce,
  serverPrefetch: Ce,
  // assets
  components: Gt,
  directives: Gt,
  // watch
  watch: Ei,
  // provide / inject
  provide: co,
  inject: $i
};
function co(e, t) {
  return t ? e ? function() {
    return ve(
      K(e) ? e.call(this, this) : e,
      K(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function $i(e, t) {
  return Gt(vn(e), vn(t));
}
function vn(e) {
  if (B(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Gt(e, t) {
  return e ? ve(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ao(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ve(
    /* @__PURE__ */ Object.create(null),
    ro(e),
    ro(t ?? {})
  ) : t;
}
function Ei(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ve(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Ce(e[n], t[n]);
  return s;
}
function $l() {
  return {
    app: null,
    config: {
      isNativeTag: Uo,
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
let Mi = 0;
function Oi(e, t) {
  return function(n, o = null) {
    K(n) || (n = ve({}, n)), o != null && !ie(o) && (o = null);
    const l = $l(), r = /* @__PURE__ */ new WeakSet(), i = [];
    let c = !1;
    const f = l.app = {
      _uid: Mi++,
      _component: n,
      _props: o,
      _container: null,
      _context: l,
      _instance: null,
      version: rc,
      get config() {
        return l.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return r.has(u) || (u && K(u.install) ? (r.add(u), u.install(f, ...h)) : K(u) && (r.add(u), u(f, ...h))), f;
      },
      mixin(u) {
        return l.mixins.includes(u) || l.mixins.push(u), f;
      },
      component(u, h) {
        return h ? (l.components[u] = h, f) : l.components[u];
      },
      directive(u, h) {
        return h ? (l.directives[u] = h, f) : l.directives[u];
      },
      mount(u, h, v) {
        if (!c) {
          const m = f._ceVNode || Pe(n, o);
          return m.appContext = l, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(m, u, v), c = !0, f._container = u, u.__vue_app__ = f, Js(m.component);
        }
      },
      onUnmount(u) {
        i.push(u);
      },
      unmount() {
        c && (Qe(
          i,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(u, h) {
        return l.provides[u] = h, f;
      },
      runWithContext(u) {
        const h = Tt;
        Tt = f;
        try {
          return u();
        } finally {
          Tt = h;
        }
      }
    };
    return f;
  };
}
let Tt = null;
const Ai = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${De(t)}Modifiers`] || e[`${pt(t)}Modifiers`];
function Pi(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ae;
  let o = s;
  const l = t.startsWith("update:"), r = l && Ai(n, t.slice(7));
  r && (r.trim && (o = s.map((u) => he(u) ? u.trim() : u)), r.number && (o = s.map(Fs)));
  let i, c = n[i = Xs(t)] || // also try camelCase event handler (#2249)
  n[i = Xs(De(t))];
  !c && l && (c = n[i = Xs(pt(t))]), c && Qe(
    c,
    e,
    6,
    o
  );
  const f = n[i + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[i])
      return;
    e.emitted[i] = !0, Qe(
      f,
      e,
      6,
      o
    );
  }
}
const ki = /* @__PURE__ */ new WeakMap();
function El(e, t, s = !1) {
  const n = s ? ki : t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const l = e.emits;
  let r = {}, i = !1;
  if (!K(e)) {
    const c = (f) => {
      const u = El(f, t, !0);
      u && (i = !0, ve(r, u));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !l && !i ? (ie(e) && n.set(e, null), null) : (B(l) ? l.forEach((c) => r[c] = null) : ve(r, l), ie(e) && n.set(e, r), r);
}
function Ks(e, t) {
  return !e || !ks(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), le(e, t[0].toLowerCase() + t.slice(1)) || le(e, pt(t)) || le(e, t));
}
function uo(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [l],
    slots: r,
    attrs: i,
    emit: c,
    render: f,
    renderCache: u,
    props: h,
    data: v,
    setupState: m,
    ctx: y,
    inheritAttrs: _
  } = e, R = $s(e);
  let b, O;
  try {
    if (s.shapeFlag & 4) {
      const U = o || n, Y = U;
      b = qe(
        f.call(
          Y,
          U,
          u,
          h,
          m,
          v,
          y
        )
      ), O = i;
    } else {
      const U = t;
      b = qe(
        U.length > 1 ? U(
          h,
          { attrs: i, slots: r, emit: c }
        ) : U(
          h,
          null
        )
      ), O = t.props ? i : Ii(i);
    }
  } catch (U) {
    ts.length = 0, Bs(U, e, 1), b = Pe(dt);
  }
  let G = b;
  if (O && _ !== !1) {
    const U = Object.keys(O), { shapeFlag: Y } = G;
    U.length && Y & 7 && (l && U.some(Is) && (O = Ri(
      O,
      l
    )), G = Lt(G, O, !1, !0));
  }
  return s.dirs && (G = Lt(G, null, !1, !0), G.dirs = G.dirs ? G.dirs.concat(s.dirs) : s.dirs), s.transition && Un(G, s.transition), b = G, $s(R), b;
}
const Ii = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || ks(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Ri = (e, t) => {
  const s = {};
  for (const n in e)
    (!Is(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Di(e, t, s) {
  const { props: n, children: o, component: l } = e, { props: r, children: i, patchFlag: c } = t, f = l.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? fo(n, r, f) : !!r;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const v = u[h];
        if (Ml(r, n, v) && !Ks(f, v))
          return !0;
      }
    }
  } else
    return (o || i) && (!i || !i.$stable) ? !0 : n === r ? !1 : n ? r ? fo(n, r, f) : !0 : !!r;
  return !1;
}
function fo(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const l = n[o];
    if (Ml(t, e, l) && !Ks(s, l))
      return !0;
  }
  return !1;
}
function Ml(e, t, s) {
  const n = e[s], o = t[s];
  return s === "style" && ie(n) && ie(o) ? !ft(n, o) : n !== o;
}
function Fi({ vnode: e, parent: t, suspense: s }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = n, e = o), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  s && s.activeBranch === e && (s.vnode.el = n);
}
const Ol = {}, Al = () => Object.create(Ol), Pl = (e) => Object.getPrototypeOf(e) === Ol;
function Li(e, t, s, n = !1) {
  const o = {}, l = Al();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), kl(e, t, o, l);
  for (const r in e.propsOptions[0])
    r in o || (o[r] = void 0);
  s ? e.props = n ? o : /* @__PURE__ */ Lr(o) : e.type.props ? e.props = o : e.props = l, e.attrs = l;
}
function Ni(e, t, s, n) {
  const {
    props: o,
    attrs: l,
    vnode: { patchFlag: r }
  } = e, i = /* @__PURE__ */ Z(o), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let v = u[h];
        if (Ks(e.emitsOptions, v))
          continue;
        const m = t[v];
        if (c)
          if (le(l, v))
            m !== l[v] && (l[v] = m, f = !0);
          else {
            const y = De(v);
            o[y] = wn(
              c,
              i,
              y,
              m,
              e,
              !1
            );
          }
        else
          m !== l[v] && (l[v] = m, f = !0);
      }
    }
  } else {
    kl(e, t, o, l) && (f = !0);
    let u;
    for (const h in i)
      (!t || // for camelCase
      !le(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = pt(h)) === h || !le(t, u))) && (c ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[u] !== void 0) && (o[h] = wn(
        c,
        i,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (l !== i)
      for (const h in l)
        (!t || !le(t, h)) && (delete l[h], f = !0);
  }
  f && tt(e.attrs, "set", "");
}
function kl(e, t, s, n) {
  const [o, l] = e.propsOptions;
  let r = !1, i;
  if (t)
    for (let c in t) {
      if (Jt(c))
        continue;
      const f = t[c];
      let u;
      o && le(o, u = De(c)) ? !l || !l.includes(u) ? s[u] = f : (i || (i = {}))[u] = f : Ks(e.emitsOptions, c) || (!(c in n) || f !== n[c]) && (n[c] = f, r = !0);
    }
  if (l) {
    const c = /* @__PURE__ */ Z(s), f = i || ae;
    for (let u = 0; u < l.length; u++) {
      const h = l[u];
      s[h] = wn(
        o,
        c,
        h,
        f[h],
        e,
        !le(f, h)
      );
    }
  }
  return r;
}
function wn(e, t, s, n, o, l) {
  const r = e[s];
  if (r != null) {
    const i = le(r, "default");
    if (i && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && K(c)) {
        const { propsDefaults: f } = o;
        if (s in f)
          n = f[s];
        else {
          const u = fs(o);
          n = f[s] = c.call(
            null,
            t
          ), u();
        }
      } else
        n = c;
      o.ce && o.ce._setProp(s, n);
    }
    r[
      0
      /* shouldCast */
    ] && (l && !i ? n = !1 : r[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === pt(s)) && (n = !0));
  }
  return n;
}
const Ui = /* @__PURE__ */ new WeakMap();
function Il(e, t, s = !1) {
  const n = s ? Ui : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const l = e.props, r = {}, i = [];
  let c = !1;
  if (!K(e)) {
    const u = (h) => {
      c = !0;
      const [v, m] = Il(h, t, !0);
      ve(r, v), m && i.push(...m);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!l && !c)
    return ie(e) && n.set(e, Pt), Pt;
  if (B(l))
    for (let u = 0; u < l.length; u++) {
      const h = De(l[u]);
      ho(h) && (r[h] = ae);
    }
  else if (l)
    for (const u in l) {
      const h = De(u);
      if (ho(h)) {
        const v = l[u], m = r[h] = B(v) || K(v) ? { type: v } : ve({}, v), y = m.type;
        let _ = !1, R = !0;
        if (B(y))
          for (let b = 0; b < y.length; ++b) {
            const O = y[b], G = K(O) && O.name;
            if (G === "Boolean") {
              _ = !0;
              break;
            } else G === "String" && (R = !1);
          }
        else
          _ = K(y) && y.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = _, m[
          1
          /* shouldCastTrue */
        ] = R, (_ || le(m, "default")) && i.push(h);
      }
    }
  const f = [r, i];
  return ie(e) && n.set(e, f), f;
}
function ho(e) {
  return e[0] !== "$" && !Jt(e);
}
const jn = (e) => e === "_" || e === "_ctx" || e === "$stable", Bn = (e) => B(e) ? e.map(qe) : [qe(e)], Vi = (e, t, s) => {
  if (t._n)
    return t;
  const n = Xr((...o) => Bn(t(...o)), s);
  return n._c = !1, n;
}, Rl = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (jn(o)) continue;
    const l = e[o];
    if (K(l))
      t[o] = Vi(o, l, n);
    else if (l != null) {
      const r = Bn(l);
      t[o] = () => r;
    }
  }
}, Dl = (e, t) => {
  const s = Bn(t);
  e.slots.default = () => s;
}, Fl = (e, t, s) => {
  for (const n in t)
    (s || !jn(n)) && (e[n] = t[n]);
}, ji = (e, t, s) => {
  const n = e.slots = Al();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Fl(n, t, s), s && Wo(n, "_", o, !0)) : Rl(t, n);
  } else t && Dl(e, t);
}, Bi = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let l = !0, r = ae;
  if (n.shapeFlag & 32) {
    const i = t._;
    i ? s && i === 1 ? l = !1 : Fl(o, t, s) : (l = !t.$stable, Rl(t, o)), r = t;
  } else t && (Dl(e, t), r = { default: 1 });
  if (l)
    for (const i in o)
      !jn(i) && r[i] == null && delete o[i];
}, Te = Gi;
function Hi(e) {
  return Wi(e);
}
function Wi(e, t) {
  const s = Ls();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: l,
    createElement: r,
    createText: i,
    createComment: c,
    setText: f,
    setElementText: u,
    parentNode: h,
    nextSibling: v,
    setScopeId: m = Ye,
    insertStaticContent: y
  } = e, _ = (a, d, p, C = null, w = null, S = null, P = void 0, M = null, $ = !!d.dynamicChildren) => {
    if (a === d)
      return;
    a && !Wt(a, d) && (C = ps(a), Ne(a, w, S, !0), a = null), d.patchFlag === -2 && ($ = !1, d.dynamicChildren = null);
    const { type: x, ref: j, shapeFlag: k } = d;
    switch (x) {
      case qs:
        R(a, d, p, C);
        break;
      case dt:
        b(a, d, p, C);
        break;
      case ln:
        a == null && O(d, p, C, P);
        break;
      case _e:
        ee(
          a,
          d,
          p,
          C,
          w,
          S,
          P,
          M,
          $
        );
        break;
      default:
        k & 1 ? Y(
          a,
          d,
          p,
          C,
          w,
          S,
          P,
          M,
          $
        ) : k & 6 ? A(
          a,
          d,
          p,
          C,
          w,
          S,
          P,
          M,
          $
        ) : (k & 64 || k & 128) && x.process(
          a,
          d,
          p,
          C,
          w,
          S,
          P,
          M,
          $,
          jt
        );
    }
    j != null && w ? Xt(j, a && a.ref, S, d || a, !d) : j == null && a && a.ref != null && Xt(a.ref, null, S, a, !0);
  }, R = (a, d, p, C) => {
    if (a == null)
      n(
        d.el = i(d.children),
        p,
        C
      );
    else {
      const w = d.el = a.el;
      d.children !== a.children && f(w, d.children);
    }
  }, b = (a, d, p, C) => {
    a == null ? n(
      d.el = c(d.children || ""),
      p,
      C
    ) : d.el = a.el;
  }, O = (a, d, p, C) => {
    [a.el, a.anchor] = y(
      a.children,
      d,
      p,
      C,
      a.el,
      a.anchor
    );
  }, G = ({ el: a, anchor: d }, p, C) => {
    let w;
    for (; a && a !== d; )
      w = v(a), n(a, p, C), a = w;
    n(d, p, C);
  }, U = ({ el: a, anchor: d }) => {
    let p;
    for (; a && a !== d; )
      p = v(a), o(a), a = p;
    o(d);
  }, Y = (a, d, p, C, w, S, P, M, $) => {
    if (d.type === "svg" ? P = "svg" : d.type === "math" && (P = "mathml"), a == null)
      z(
        d,
        p,
        C,
        w,
        S,
        P,
        M,
        $
      );
    else {
      const x = a.el && a.el._isVueCE ? a.el : null;
      try {
        x && x._beginPatch(), H(
          a,
          d,
          w,
          S,
          P,
          M,
          $
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, z = (a, d, p, C, w, S, P, M) => {
    let $, x;
    const { props: j, shapeFlag: k, transition: V, dirs: W } = a;
    if ($ = a.el = r(
      a.type,
      S,
      j && j.is,
      j
    ), k & 8 ? u($, a.children) : k & 16 && L(
      a.children,
      $,
      null,
      C,
      w,
      on(a, S),
      P,
      M
    ), W && mt(a, null, C, "created"), X($, a, a.scopeId, P, C), j) {
      for (const ce in j)
        ce !== "value" && !Jt(ce) && l($, ce, null, j[ce], S, C);
      "value" in j && l($, "value", null, j.value, S), (x = j.onVnodeBeforeMount) && Be(x, C, a);
    }
    W && mt(a, null, C, "beforeMount");
    const te = Ki(w, V);
    te && V.beforeEnter($), n($, d, p), ((x = j && j.onVnodeMounted) || te || W) && Te(() => {
      try {
        x && Be(x, C, a), te && V.enter($), W && mt(a, null, C, "mounted");
      } finally {
      }
    }, w);
  }, X = (a, d, p, C, w) => {
    if (p && m(a, p), C)
      for (let S = 0; S < C.length; S++)
        m(a, C[S]);
    if (w) {
      let S = w.subTree;
      if (d === S || Ul(S.type) && (S.ssContent === d || S.ssFallback === d)) {
        const P = w.vnode;
        X(
          a,
          P,
          P.scopeId,
          P.slotScopeIds,
          w.parent
        );
      }
    }
  }, L = (a, d, p, C, w, S, P, M, $ = 0) => {
    for (let x = $; x < a.length; x++) {
      const j = a[x] = M ? et(a[x]) : qe(a[x]);
      _(
        null,
        j,
        d,
        p,
        C,
        w,
        S,
        P,
        M
      );
    }
  }, H = (a, d, p, C, w, S, P) => {
    const M = d.el = a.el;
    let { patchFlag: $, dynamicChildren: x, dirs: j } = d;
    $ |= a.patchFlag & 16;
    const k = a.props || ae, V = d.props || ae;
    let W;
    if (p && yt(p, !1), (W = V.onVnodeBeforeUpdate) && Be(W, p, d, a), j && mt(d, a, p, "beforeUpdate"), p && yt(p, !0), (k.innerHTML && V.innerHTML == null || k.textContent && V.textContent == null) && u(M, ""), x ? E(
      a.dynamicChildren,
      x,
      M,
      p,
      C,
      on(d, w),
      S
    ) : P || ue(
      a,
      d,
      M,
      null,
      p,
      C,
      on(d, w),
      S,
      !1
    ), $ > 0) {
      if ($ & 16)
        T(M, k, V, p, w);
      else if ($ & 2 && k.class !== V.class && l(M, "class", null, V.class, w), $ & 4 && l(M, "style", k.style, V.style, w), $ & 8) {
        const te = d.dynamicProps;
        for (let ce = 0; ce < te.length; ce++) {
          const fe = te[ce], pe = k[fe], ye = V[fe];
          (ye !== pe || fe === "value") && l(M, fe, pe, ye, w, p);
        }
      }
      $ & 1 && a.children !== d.children && u(M, d.children);
    } else !P && x == null && T(M, k, V, p, w);
    ((W = V.onVnodeUpdated) || j) && Te(() => {
      W && Be(W, p, d, a), j && mt(d, a, p, "updated");
    }, C);
  }, E = (a, d, p, C, w, S, P) => {
    for (let M = 0; M < d.length; M++) {
      const $ = a[M], x = d[M], j = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        $.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        ($.type === _e || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt($, x) || // - In the case of a component, it could contain anything.
        $.shapeFlag & 198) ? h($.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      _(
        $,
        x,
        j,
        null,
        C,
        w,
        S,
        P,
        !0
      );
    }
  }, T = (a, d, p, C, w) => {
    if (d !== p) {
      if (d !== ae)
        for (const S in d)
          !Jt(S) && !(S in p) && l(
            a,
            S,
            d[S],
            null,
            w,
            C
          );
      for (const S in p) {
        if (Jt(S)) continue;
        const P = p[S], M = d[S];
        P !== M && S !== "value" && l(a, S, M, P, w, C);
      }
      "value" in p && l(a, "value", d.value, p.value, w);
    }
  }, ee = (a, d, p, C, w, S, P, M, $) => {
    const x = d.el = a ? a.el : i(""), j = d.anchor = a ? a.anchor : i("");
    let { patchFlag: k, dynamicChildren: V, slotScopeIds: W } = d;
    W && (M = M ? M.concat(W) : W), a == null ? (n(x, p, C), n(j, p, C), L(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      p,
      j,
      w,
      S,
      P,
      M,
      $
    )) : k > 0 && k & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren && a.dynamicChildren.length === V.length ? (E(
      a.dynamicChildren,
      V,
      p,
      w,
      S,
      P,
      M
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || w && d === w.subTree) && Hn(
      a,
      d,
      !0
      /* shallow */
    )) : ue(
      a,
      d,
      p,
      j,
      w,
      S,
      P,
      M,
      $
    );
  }, A = (a, d, p, C, w, S, P, M, $) => {
    d.slotScopeIds = M, a == null ? d.shapeFlag & 512 ? w.ctx.activate(
      d,
      p,
      C,
      P,
      $
    ) : D(
      d,
      p,
      C,
      w,
      S,
      P,
      $
    ) : q(a, d, $);
  }, D = (a, d, p, C, w, S, P) => {
    const M = a.component = ec(
      a,
      C,
      w
    );
    if (Sl(a) && (M.ctx.renderer = jt), tc(M, !1, P), M.asyncDep) {
      if (w && w.registerDep(M, oe, P), !a.el) {
        const $ = M.subTree = Pe(dt);
        b(null, $, d, p), a.placeholder = $.el;
      }
    } else
      oe(
        M,
        a,
        d,
        p,
        w,
        S,
        P
      );
  }, q = (a, d, p) => {
    const C = d.component = a.component;
    if (Di(a, d, p))
      if (C.asyncDep && !C.asyncResolved) {
        Q(C, d, p);
        return;
      } else
        C.next = d, C.update();
    else
      d.el = a.el, C.vnode = d;
  }, oe = (a, d, p, C, w, S, P) => {
    const M = () => {
      if (a.isMounted) {
        let { next: k, bu: V, u: W, parent: te, vnode: ce } = a;
        {
          const Ve = Ll(a);
          if (Ve) {
            k && (k.el = ce.el, Q(a, k, P)), Ve.asyncDep.then(() => {
              Te(() => {
                a.isUnmounted || x();
              }, w);
            });
            return;
          }
        }
        let fe = k, pe;
        yt(a, !1), k ? (k.el = ce.el, Q(a, k, P)) : k = ce, V && ys(V), (pe = k.props && k.props.onVnodeBeforeUpdate) && Be(pe, te, k, ce), yt(a, !0);
        const ye = uo(a), Ue = a.subTree;
        a.subTree = ye, _(
          Ue,
          ye,
          // parent may have changed if it's in a teleport
          h(Ue.el),
          // anchor may have changed if it's in a fragment
          ps(Ue),
          a,
          w,
          S
        ), k.el = ye.el, fe === null && Fi(a, ye.el), W && Te(W, w), (pe = k.props && k.props.onVnodeUpdated) && Te(
          () => Be(pe, te, k, ce),
          w
        );
      } else {
        let k;
        const { el: V, props: W } = d, { bm: te, m: ce, parent: fe, root: pe, type: ye } = a, Ue = Zt(d);
        yt(a, !1), te && ys(te), !Ue && (k = W && W.onVnodeBeforeMount) && Be(k, fe, d), yt(a, !0);
        {
          pe.ce && pe.ce._hasShadowRoot() && pe.ce._injectChildStyle(
            ye,
            a.parent ? a.parent.type : void 0
          );
          const Ve = a.subTree = uo(a);
          _(
            null,
            Ve,
            p,
            C,
            a,
            w,
            S
          ), d.el = Ve.el;
        }
        if (ce && Te(ce, w), !Ue && (k = W && W.onVnodeMounted)) {
          const Ve = d;
          Te(
            () => Be(k, fe, Ve),
            w
          );
        }
        (d.shapeFlag & 256 || fe && Zt(fe.vnode) && fe.vnode.shapeFlag & 256) && a.a && Te(a.a, w), a.isMounted = !0, d = p = C = null;
      }
    };
    a.scope.on();
    const $ = a.effect = new Qo(M);
    a.scope.off();
    const x = a.update = $.run.bind($), j = a.job = $.runIfDirty.bind($);
    j.i = a, j.id = a.uid, $.scheduler = () => Nn(j), yt(a, !0), x();
  }, Q = (a, d, p) => {
    d.component = a;
    const C = a.vnode.props;
    a.vnode = d, a.next = null, Ni(a, d.props, C, p), Bi(a, d.children, p), lt(), to(a), rt();
  }, ue = (a, d, p, C, w, S, P, M, $ = !1) => {
    const x = a && a.children, j = a ? a.shapeFlag : 0, k = d.children, { patchFlag: V, shapeFlag: W } = d;
    if (V > 0) {
      if (V & 128) {
        hs(
          x,
          k,
          p,
          C,
          w,
          S,
          P,
          M,
          $
        );
        return;
      } else if (V & 256) {
        gt(
          x,
          k,
          p,
          C,
          w,
          S,
          P,
          M,
          $
        );
        return;
      }
    }
    W & 8 ? (j & 16 && Vt(x, w, S), k !== x && u(p, k)) : j & 16 ? W & 16 ? hs(
      x,
      k,
      p,
      C,
      w,
      S,
      P,
      M,
      $
    ) : Vt(x, w, S, !0) : (j & 8 && u(p, ""), W & 16 && L(
      k,
      p,
      C,
      w,
      S,
      P,
      M,
      $
    ));
  }, gt = (a, d, p, C, w, S, P, M, $) => {
    a = a || Pt, d = d || Pt;
    const x = a.length, j = d.length, k = Math.min(x, j);
    let V;
    for (V = 0; V < k; V++) {
      const W = d[V] = $ ? et(d[V]) : qe(d[V]);
      _(
        a[V],
        W,
        p,
        null,
        w,
        S,
        P,
        M,
        $
      );
    }
    x > j ? Vt(
      a,
      w,
      S,
      !0,
      !1,
      k
    ) : L(
      d,
      p,
      C,
      w,
      S,
      P,
      M,
      $,
      k
    );
  }, hs = (a, d, p, C, w, S, P, M, $) => {
    let x = 0;
    const j = d.length;
    let k = a.length - 1, V = j - 1;
    for (; x <= k && x <= V; ) {
      const W = a[x], te = d[x] = $ ? et(d[x]) : qe(d[x]);
      if (Wt(W, te))
        _(
          W,
          te,
          p,
          null,
          w,
          S,
          P,
          M,
          $
        );
      else
        break;
      x++;
    }
    for (; x <= k && x <= V; ) {
      const W = a[k], te = d[V] = $ ? et(d[V]) : qe(d[V]);
      if (Wt(W, te))
        _(
          W,
          te,
          p,
          null,
          w,
          S,
          P,
          M,
          $
        );
      else
        break;
      k--, V--;
    }
    if (x > k) {
      if (x <= V) {
        const W = V + 1, te = W < j ? d[W].el : C;
        for (; x <= V; )
          _(
            null,
            d[x] = $ ? et(d[x]) : qe(d[x]),
            p,
            te,
            w,
            S,
            P,
            M,
            $
          ), x++;
      }
    } else if (x > V)
      for (; x <= k; )
        Ne(a[x], w, S, !0), x++;
    else {
      const W = x, te = x, ce = /* @__PURE__ */ new Map();
      for (x = te; x <= V; x++) {
        const Me = d[x] = $ ? et(d[x]) : qe(d[x]);
        Me.key != null && ce.set(Me.key, x);
      }
      let fe, pe = 0;
      const ye = V - te + 1;
      let Ue = !1, Ve = 0;
      const Bt = new Array(ye);
      for (x = 0; x < ye; x++) Bt[x] = 0;
      for (x = W; x <= k; x++) {
        const Me = a[x];
        if (pe >= ye) {
          Ne(Me, w, S, !0);
          continue;
        }
        let je;
        if (Me.key != null)
          je = ce.get(Me.key);
        else
          for (fe = te; fe <= V; fe++)
            if (Bt[fe - te] === 0 && Wt(Me, d[fe])) {
              je = fe;
              break;
            }
        je === void 0 ? Ne(Me, w, S, !0) : (Bt[je - te] = x + 1, je >= Ve ? Ve = je : Ue = !0, _(
          Me,
          d[je],
          p,
          null,
          w,
          S,
          P,
          M,
          $
        ), pe++);
      }
      const Jn = Ue ? qi(Bt) : Pt;
      for (fe = Jn.length - 1, x = ye - 1; x >= 0; x--) {
        const Me = te + x, je = d[Me], Yn = d[Me + 1], zn = Me + 1 < j ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Yn.el || Nl(Yn)
        ) : C;
        Bt[x] === 0 ? _(
          null,
          je,
          p,
          zn,
          w,
          S,
          P,
          M,
          $
        ) : Ue && (fe < 0 || x !== Jn[fe] ? _t(je, p, zn, 2) : fe--);
      }
    }
  }, _t = (a, d, p, C, w = null) => {
    const { el: S, type: P, transition: M, children: $, shapeFlag: x } = a;
    if (x & 6) {
      _t(a.component.subTree, d, p, C);
      return;
    }
    if (x & 128) {
      a.suspense.move(d, p, C);
      return;
    }
    if (x & 64) {
      P.move(a, d, p, jt);
      return;
    }
    if (P === _e) {
      n(S, d, p);
      for (let k = 0; k < $.length; k++)
        _t($[k], d, p, C);
      n(a.anchor, d, p);
      return;
    }
    if (P === ln) {
      G(a, d, p);
      return;
    }
    if (C !== 2 && x & 1 && M)
      if (C === 0)
        M.beforeEnter(S), n(S, d, p), Te(() => M.enter(S), w);
      else {
        const { leave: k, delayLeave: V, afterLeave: W } = M, te = () => {
          a.ctx.isUnmounted ? o(S) : n(S, d, p);
        }, ce = () => {
          S._isLeaving && S[ai](
            !0
            /* cancelled */
          ), k(S, () => {
            te(), W && W();
          });
        };
        V ? V(S, te, ce) : ce();
      }
    else
      n(S, d, p);
  }, Ne = (a, d, p, C = !1, w = !1) => {
    const {
      type: S,
      props: P,
      ref: M,
      children: $,
      dynamicChildren: x,
      shapeFlag: j,
      patchFlag: k,
      dirs: V,
      cacheIndex: W,
      memo: te
    } = a;
    if (k === -2 && (w = !1), M != null && (lt(), Xt(M, null, p, a, !0), rt()), W != null && (d.renderCache[W] = void 0), j & 256) {
      d.ctx.deactivate(a);
      return;
    }
    const ce = j & 1 && V, fe = !Zt(a);
    let pe;
    if (fe && (pe = P && P.onVnodeBeforeUnmount) && Be(pe, d, a), j & 6)
      lr(a.component, p, C);
    else {
      if (j & 128) {
        a.suspense.unmount(p, C);
        return;
      }
      ce && mt(a, null, d, "beforeUnmount"), j & 64 ? a.type.remove(
        a,
        d,
        p,
        jt,
        C
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== _e || k > 0 && k & 64) ? Vt(
        x,
        d,
        p,
        !1,
        !0
      ) : (S === _e && k & 384 || !w && j & 16) && Vt($, d, p), C && qn(a);
    }
    const ye = te != null && W == null;
    (fe && (pe = P && P.onVnodeUnmounted) || ce || ye) && Te(() => {
      pe && Be(pe, d, a), ce && mt(a, null, d, "unmounted"), ye && (a.el = null);
    }, p);
  }, qn = (a) => {
    const { type: d, el: p, anchor: C, transition: w } = a;
    if (d === _e) {
      or(p, C);
      return;
    }
    if (d === ln) {
      U(a);
      return;
    }
    const S = () => {
      o(p), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if (a.shapeFlag & 1 && w && !w.persisted) {
      const { leave: P, delayLeave: M } = w, $ = () => P(p, S);
      M ? M(a.el, S, $) : $();
    } else
      S();
  }, or = (a, d) => {
    let p;
    for (; a !== d; )
      p = v(a), o(a), a = p;
    o(d);
  }, lr = (a, d, p) => {
    const { bum: C, scope: w, job: S, subTree: P, um: M, m: $, a: x } = a;
    po($), po(x), C && ys(C), w.stop(), S && (S.flags |= 8, Ne(P, a, d, p)), M && Te(M, d), Te(() => {
      a.isUnmounted = !0;
    }, d);
  }, Vt = (a, d, p, C = !1, w = !1, S = 0) => {
    for (let P = S; P < a.length; P++)
      Ne(a[P], d, p, C, w);
  }, ps = (a) => {
    if (a.shapeFlag & 6)
      return ps(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const d = v(a.anchor || a.el), p = d && d[vl];
    return p ? v(p) : d;
  };
  let Qs = !1;
  const Gn = (a, d, p) => {
    let C;
    a == null ? d._vnode && (Ne(d._vnode, null, null, !0), C = d._vnode.component) : _(
      d._vnode || null,
      a,
      d,
      null,
      null,
      null,
      p
    ), d._vnode = a, Qs || (Qs = !0, to(C), gl(), Qs = !1);
  }, jt = {
    p: _,
    um: Ne,
    m: _t,
    r: qn,
    mt: D,
    mc: L,
    pc: ue,
    pbc: E,
    n: ps,
    o: e
  };
  return {
    render: Gn,
    hydrate: void 0,
    createApp: Oi(Gn)
  };
}
function on({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function yt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ki(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Hn(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (B(n) && B(o))
    for (let l = 0; l < n.length; l++) {
      const r = n[l];
      let i = o[l];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = o[l] = et(o[l]), i.el = r.el), !s && i.patchFlag !== -2 && Hn(r, i)), i.type === qs && (i.patchFlag === -1 && (i = o[l] = et(i)), i.el = r.el), i.type === dt && !i.el && (i.el = r.el);
    }
}
function qi(e) {
  const t = e.slice(), s = [0];
  let n, o, l, r, i;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const f = e[n];
    if (f !== 0) {
      if (o = s[s.length - 1], e[o] < f) {
        t[n] = o, s.push(n);
        continue;
      }
      for (l = 0, r = s.length - 1; l < r; )
        i = l + r >> 1, e[s[i]] < f ? l = i + 1 : r = i;
      f < e[s[l]] && (l > 0 && (t[n] = s[l - 1]), s[l] = n);
    }
  }
  for (l = s.length, r = s[l - 1]; l-- > 0; )
    s[l] = r, r = t[r];
  return s;
}
function Ll(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ll(t);
}
function po(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Nl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Nl(t.subTree) : null;
}
const Ul = (e) => e.__isSuspense;
function Gi(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : Qr(e);
}
const _e = /* @__PURE__ */ Symbol.for("v-fgt"), qs = /* @__PURE__ */ Symbol.for("v-txt"), dt = /* @__PURE__ */ Symbol.for("v-cmt"), ln = /* @__PURE__ */ Symbol.for("v-stc"), ts = [];
let Oe = null;
function I(e = !1) {
  ts.push(Oe = e ? null : []);
}
function Ji() {
  ts.pop(), Oe = ts[ts.length - 1] || null;
}
let rs = 1;
function go(e, t = !1) {
  rs += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function Vl(e) {
  return e.dynamicChildren = rs > 0 ? Oe || Pt : null, Ji(), rs > 0 && Oe && Oe.push(e), e;
}
function F(e, t, s, n, o, l) {
  return Vl(
    g(
      e,
      t,
      s,
      n,
      o,
      l,
      !0
    )
  );
}
function Gs(e, t, s, n, o) {
  return Vl(
    Pe(
      e,
      t,
      s,
      n,
      o,
      !0
    )
  );
}
function jl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Bl = ({ key: e }) => e ?? null, vs = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? he(e) || /* @__PURE__ */ se(e) || K(e) ? { i: ke, r: e, k: t, f: !!s } : e : null);
function g(e, t = null, s = null, n = 0, o = null, l = e === _e ? 0 : 1, r = !1, i = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Bl(t),
    ref: t && vs(t),
    scopeId: ml,
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
    shapeFlag: l,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: ke
  };
  return i ? (Wn(c, s), l & 128 && e.normalize(c)) : s && (c.shapeFlag |= he(s) ? 8 : 16), rs > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || l & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Oe.push(c), c;
}
const Pe = Yi;
function Yi(e, t = null, s = null, n = 0, o = null, l = !1) {
  if ((!e || e === wi) && (e = dt), jl(e)) {
    const i = Lt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Wn(i, s), rs > 0 && !l && Oe && (i.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = i : Oe.push(i)), i.patchFlag = -2, i;
  }
  if (lc(e) && (e = e.__vccOpts), t) {
    t = zi(t);
    let { class: i, style: c } = t;
    i && !he(i) && (t.class = ot(i)), ie(c) && (/* @__PURE__ */ js(c) && !B(c) && (c = ve({}, c)), t.style = Ns(c));
  }
  const r = he(e) ? 1 : Ul(e) ? 128 : oi(e) ? 64 : ie(e) ? 4 : K(e) ? 2 : 0;
  return g(
    e,
    t,
    s,
    n,
    o,
    r,
    l,
    !0
  );
}
function zi(e) {
  return e ? /* @__PURE__ */ js(e) || Pl(e) ? ve({}, e) : e : null;
}
function Lt(e, t, s = !1, n = !1) {
  const { props: o, ref: l, patchFlag: r, children: i, transition: c } = e, f = t ? Qi(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Bl(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && l ? B(l) ? l.concat(vs(t)) : [l, vs(t)] : vs(t)
    ) : l,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== _e ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Lt(e.ssContent),
    ssFallback: e.ssFallback && Lt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && Un(
    u,
    c.clone(u)
  ), u;
}
function me(e = " ", t = 0) {
  return Pe(qs, null, e, t);
}
function ne(e = "", t = !1) {
  return t ? (I(), Gs(dt, null, e)) : Pe(dt, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? Pe(dt) : B(e) ? Pe(
    _e,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : jl(e) ? et(e) : Pe(qs, null, String(e));
}
function et(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Lt(e);
}
function Wn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (B(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Wn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !Pl(t) ? t._ctx = ke : o === 3 && ke && (ke.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else K(t) ? (t = { default: t, _ctx: ke }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [me(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Qi(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = ot([t.class, n.class]));
      else if (o === "style")
        t.style = Ns([t.style, n.style]);
      else if (ks(o)) {
        const l = t[o], r = n[o];
        r && l !== r && !(B(l) && l.includes(r)) ? t[o] = l ? [].concat(l, r) : r : r == null && l == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Is(o) && (t[o] = r);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Be(e, t, s, n = null) {
  Qe(e, t, 7, [
    s,
    n
  ]);
}
const Xi = $l();
let Zi = 0;
function ec(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || Xi, l = {
    uid: Zi++,
    vnode: e,
    type: n,
    parent: t,
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
    scope: new Jo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Il(n, o),
    emitsOptions: El(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ae,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: ae,
    data: ae,
    props: ae,
    attrs: ae,
    slots: ae,
    refs: ae,
    setupState: ae,
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
  return l.ctx = { _: l }, l.root = t ? t.root : l, l.emit = Pi.bind(null, l), e.ce && e.ce(l), l;
}
let Ee = null;
const Hl = () => Ee || ke;
let Os, Sn;
{
  const e = Ls(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (l) => {
      o.length > 1 ? o.forEach((r) => r(l)) : o[0](l);
    };
  };
  Os = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Ee = s
  ), Sn = t(
    "__VUE_SSR_SETTERS__",
    (s) => is = s
  );
}
const fs = (e) => {
  const t = Ee;
  return Os(e), e.scope.on(), () => {
    e.scope.off(), Os(t);
  };
}, _o = () => {
  Ee && Ee.scope.off(), Os(null);
};
function Wl(e) {
  return e.vnode.shapeFlag & 4;
}
let is = !1;
function tc(e, t = !1, s = !1) {
  t && Sn(t);
  const { props: n, children: o } = e.vnode, l = Wl(e);
  Li(e, n, l, t), ji(e, o, s || t);
  const r = l ? sc(e, t) : void 0;
  return t && Sn(!1), r;
}
function sc(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Si);
  const { setup: n } = s;
  if (n) {
    lt();
    const o = e.setupContext = n.length > 1 ? oc(e) : null, l = fs(e), r = us(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), i = Vo(r);
    if (rt(), l(), (i || e.sp) && !Zt(e) && wl(e), i) {
      if (r.then(_o, _o), t)
        return r.then((c) => {
          mo(e, c);
        }).catch((c) => {
          Bs(c, e, 0);
        });
      e.asyncDep = r;
    } else
      mo(e, r);
  } else
    Kl(e);
}
function mo(e, t, s) {
  K(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ie(t) && (e.setupState = fl(t)), Kl(e);
}
function Kl(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Ye);
  {
    const o = fs(e);
    lt();
    try {
      xi(e);
    } finally {
      rt(), o();
    }
  }
}
const nc = {
  get(e, t) {
    return Se(e, "get", ""), e[t];
  }
};
function oc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, nc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Js(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(fl(Fn(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in es)
        return es[s](e);
    },
    has(t, s) {
      return s in t || s in es;
    }
  })) : e.proxy;
}
function lc(e) {
  return K(e) && "__vccOpts" in e;
}
const We = (e, t) => /* @__PURE__ */ qr(e, t, is), rc = "3.5.32";
/**
* @vue/runtime-dom v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xn;
const bo = typeof window < "u" && window.trustedTypes;
if (bo)
  try {
    xn = /* @__PURE__ */ bo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ql = xn ? (e) => xn.createHTML(e) : (e) => e, ic = "http://www.w3.org/2000/svg", cc = "http://www.w3.org/1998/Math/MathML", Ze = typeof document < "u" ? document : null, yo = Ze && /* @__PURE__ */ Ze.createElement("template"), ac = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? Ze.createElementNS(ic, e) : t === "mathml" ? Ze.createElementNS(cc, e) : s ? Ze.createElement(e, { is: s }) : Ze.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => Ze.createTextNode(e),
  createComment: (e) => Ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ze.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, o, l) {
    const r = s ? s.previousSibling : t.lastChild;
    if (o && (o === l || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), s), !(o === l || !(o = o.nextSibling)); )
        ;
    else {
      yo.innerHTML = ql(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const i = yo.content;
      if (n === "svg" || n === "mathml") {
        const c = i.firstChild;
        for (; c.firstChild; )
          i.appendChild(c.firstChild);
        i.removeChild(c);
      }
      t.insertBefore(i, s);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, uc = /* @__PURE__ */ Symbol("_vtc");
function fc(e, t, s) {
  const n = e[uc];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const As = /* @__PURE__ */ Symbol("_vod"), Gl = /* @__PURE__ */ Symbol("_vsh"), dc = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: s }) {
    e[As] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : Kt(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), Kt(e, !0), n.enter(e)) : n.leave(e, () => {
      Kt(e, !1);
    }) : Kt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Kt(e, t);
  }
};
function Kt(e, t) {
  e.style.display = t ? e[As] : "none", e[Gl] = !t;
}
const hc = /* @__PURE__ */ Symbol(""), pc = /(?:^|;)\s*display\s*:/;
function gc(e, t, s) {
  const n = e.style, o = he(s);
  let l = !1;
  if (s && !o) {
    if (t)
      if (he(t))
        for (const r of t.split(";")) {
          const i = r.slice(0, r.indexOf(":")).trim();
          s[i] == null && ws(n, i, "");
        }
      else
        for (const r in t)
          s[r] == null && ws(n, r, "");
    for (const r in s)
      r === "display" && (l = !0), ws(n, r, s[r]);
  } else if (o) {
    if (t !== s) {
      const r = n[hc];
      r && (s += ";" + r), n.cssText = s, l = pc.test(s);
    }
  } else t && e.removeAttribute("style");
  As in e && (e[As] = l ? n.display : "", e[Gl] && (n.display = "none"));
}
const vo = /\s*!important$/;
function ws(e, t, s) {
  if (B(s))
    s.forEach((n) => ws(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = _c(e, t);
    vo.test(s) ? e.setProperty(
      pt(n),
      s.replace(vo, ""),
      "important"
    ) : e[n] = s;
  }
}
const wo = ["Webkit", "Moz", "ms"], rn = {};
function _c(e, t) {
  const s = rn[t];
  if (s)
    return s;
  let n = De(t);
  if (n !== "filter" && n in e)
    return rn[t] = n;
  n = Ho(n);
  for (let o = 0; o < wo.length; o++) {
    const l = wo[o] + n;
    if (l in e)
      return rn[t] = l;
  }
  return t;
}
const So = "http://www.w3.org/1999/xlink";
function xo(e, t, s, n, o, l = gr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(So, t.slice(6, t.length)) : e.setAttributeNS(So, t, s) : s == null || l && !Ko(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    l ? "" : Re(s) ? String(s) : s
  );
}
function Co(e, t, s, n, o) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? ql(s) : s);
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    const i = l === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (i !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let r = !1;
  if (s === "" || s == null) {
    const i = typeof e[t];
    i === "boolean" ? s = Ko(s) : s == null && i === "string" ? (s = "", r = !0) : i === "number" && (s = 0, r = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  r && e.removeAttribute(o || t);
}
function nt(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function mc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const To = /* @__PURE__ */ Symbol("_vei");
function bc(e, t, s, n, o = null) {
  const l = e[To] || (e[To] = {}), r = l[t];
  if (n && r)
    r.value = n;
  else {
    const [i, c] = yc(t);
    if (n) {
      const f = l[t] = Sc(
        n,
        o
      );
      nt(e, i, f, c);
    } else r && (mc(e, i, r, c), l[t] = void 0);
  }
}
const $o = /(?:Once|Passive|Capture)$/;
function yc(e) {
  let t;
  if ($o.test(e)) {
    t = {};
    let n;
    for (; n = e.match($o); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : pt(e.slice(2)), t];
}
let cn = 0;
const vc = /* @__PURE__ */ Promise.resolve(), wc = () => cn || (vc.then(() => cn = 0), cn = Date.now());
function Sc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Qe(
      xc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = wc(), s;
}
function xc(e, t) {
  if (B(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const Eo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Cc = (e, t, s, n, o, l) => {
  const r = o === "svg";
  t === "class" ? fc(e, n, r) : t === "style" ? gc(e, s, n) : ks(t) ? Is(t) || bc(e, t, s, n, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Tc(e, t, n, r)) ? (Co(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && xo(e, t, n, r, l, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  ($c(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !he(n))) ? Co(e, De(t), n, l, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), xo(e, t, n, r));
};
function Tc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Eo(t) && K(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Eo(t) && he(s) ? !1 : t in e;
}
function $c(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = De(t);
  return Array.isArray(s) ? s.some((o) => De(o) === n) : Object.keys(s).some((o) => De(o) === n);
}
const ht = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return B(t) ? (s) => ys(t, s) : t;
};
function Ec(e) {
  e.target.composing = !0;
}
function Mo(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ie = /* @__PURE__ */ Symbol("_assign");
function Oo(e, t, s) {
  return t && (e = e.trim()), s && (e = Fs(e)), e;
}
const St = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
    e[Ie] = ht(o);
    const l = n || o.props && o.props.type === "number";
    nt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Ie](Oo(e.value, s, l));
    }), (s || l) && nt(e, "change", () => {
      e.value = Oo(e.value, s, l);
    }), t || (nt(e, "compositionstart", Ec), nt(e, "compositionend", Mo), nt(e, "change", Mo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: o, number: l } }, r) {
    if (e[Ie] = ht(r), e.composing) return;
    const i = (l || e.type === "number") && !/^0\d/.test(e.value) ? Fs(e.value) : e.value, c = t ?? "";
    if (i === c)
      return;
    const f = e.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === e && e.type !== "range" && (n && t === s || o && e.value.trim() === c) || (e.value = c);
  }
}, Ss = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, s) {
    e[Ie] = ht(s), nt(e, "change", () => {
      const n = e._modelValue, o = Nt(e), l = e.checked, r = e[Ie];
      if (B(n)) {
        const i = On(n, o), c = i !== -1;
        if (l && !c)
          r(n.concat(o));
        else if (!l && c) {
          const f = [...n];
          f.splice(i, 1), r(f);
        }
      } else if (Ut(n)) {
        const i = new Set(n);
        l ? i.add(o) : i.delete(o), r(i);
      } else
        r(Jl(e, l));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Ao,
  beforeUpdate(e, t, s) {
    e[Ie] = ht(s), Ao(e, t, s);
  }
};
function Ao(e, { value: t, oldValue: s }, n) {
  e._modelValue = t;
  let o;
  if (B(t))
    o = On(t, n.props.value) > -1;
  else if (Ut(t))
    o = t.has(n.props.value);
  else {
    if (t === s) return;
    o = ft(t, Jl(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
const Po = {
  created(e, { value: t }, s) {
    e.checked = ft(t, s.props.value), e[Ie] = ht(s), nt(e, "change", () => {
      e[Ie](Nt(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: s }, n) {
    e[Ie] = ht(n), t !== s && (e.checked = ft(t, n.props.value));
  }
}, Rt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const o = Ut(t);
    nt(e, "change", () => {
      const l = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => s ? Fs(Nt(r)) : Nt(r)
      );
      e[Ie](
        e.multiple ? o ? new Set(l) : l : l[0]
      ), e._assigning = !0, Ln(() => {
        e._assigning = !1;
      });
    }), e[Ie] = ht(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    ko(e, t);
  },
  beforeUpdate(e, t, s) {
    e[Ie] = ht(s);
  },
  updated(e, { value: t }) {
    e._assigning || ko(e, t);
  }
};
function ko(e, t) {
  const s = e.multiple, n = B(t);
  if (!(s && !n && !Ut(t))) {
    for (let o = 0, l = e.options.length; o < l; o++) {
      const r = e.options[o], i = Nt(r);
      if (s)
        if (n) {
          const c = typeof i;
          c === "string" || c === "number" ? r.selected = t.some((f) => String(f) === String(i)) : r.selected = On(t, i) > -1;
        } else
          r.selected = t.has(i);
      else if (ft(Nt(r), t)) {
        e.selectedIndex !== o && (e.selectedIndex = o);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Nt(e) {
  return "_value" in e ? e._value : e.value;
}
function Jl(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
const Mc = ["ctrl", "shift", "alt", "meta"], Oc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Mc.some((s) => e[`${s}Key`] && !t.includes(s))
}, Yl = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((o, ...l) => {
    for (let r = 0; r < t.length; r++) {
      const i = Oc[t[r]];
      if (i && i(o, t)) return;
    }
    return e(o, ...l);
  }));
}, Ac = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Pc = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return s[n] || (s[n] = ((o) => {
    if (!("key" in o))
      return;
    const l = pt(o.key);
    if (t.some(
      (r) => r === l || Ac[r] === l
    ))
      return e(o);
  }));
}, kc = /* @__PURE__ */ ve({ patchProp: Cc }, ac);
let Io;
function Ic() {
  return Io || (Io = Hi(kc));
}
const Rc = ((...e) => {
  const t = Ic().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = Fc(n);
    if (!o) return;
    const l = t._component;
    !K(l) && !l.render && !l.template && (l.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = s(o, !1, Dc(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, t;
});
function Dc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Fc(e) {
  return he(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let zl;
const Ys = (e) => zl = e, Ql = (
  /* istanbul ignore next */
  Symbol()
);
function Cn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ss;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ss || (ss = {}));
function Lc() {
  const e = Yo(!0), t = e.run(() => /* @__PURE__ */ J({}));
  let s = [], n = [];
  const o = Fn({
    install(l) {
      Ys(o), o._a = l, l.provide(Ql, o), l.config.globalProperties.$pinia = o, n.forEach((r) => s.push(r)), n = [];
    },
    use(l) {
      return this._a ? s.push(l) : n.push(l), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return o;
}
const Xl = () => {
};
function Ro(e, t, s, n = Xl) {
  e.push(t);
  const o = () => {
    const l = e.indexOf(t);
    l > -1 && (e.splice(l, 1), n());
  };
  return !s && zo() && mr(o), o;
}
function Ot(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const Nc = (e) => e(), Do = Symbol(), an = Symbol();
function Tn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, n) => e.set(n, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const n = t[s], o = e[s];
    Cn(o) && Cn(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ se(n) && !/* @__PURE__ */ ze(n) ? e[s] = Tn(o, n) : e[s] = n;
  }
  return e;
}
const Uc = (
  /* istanbul ignore next */
  Symbol()
);
function Vc(e) {
  return !Cn(e) || !e.hasOwnProperty(Uc);
}
const { assign: at } = Object;
function jc(e) {
  return !!(/* @__PURE__ */ se(e) && e.effect);
}
function Bc(e, t, s, n) {
  const { state: o, actions: l, getters: r } = t, i = s.state.value[e];
  let c;
  function f() {
    i || (s.state.value[e] = o ? o() : {});
    const u = /* @__PURE__ */ jr(s.state.value[e]);
    return at(u, l, Object.keys(r || {}).reduce((h, v) => (h[v] = Fn(We(() => {
      Ys(s);
      const m = s._s.get(e);
      return r[v].call(m, m);
    })), h), {}));
  }
  return c = Zl(e, f, t, s, n, !0), c;
}
function Zl(e, t, s = {}, n, o, l) {
  let r;
  const i = at({ actions: {} }, s), c = { deep: !0 };
  let f, u, h = [], v = [], m;
  const y = n.state.value[e];
  !l && !y && (n.state.value[e] = {});
  let _;
  function R(L) {
    let H;
    f = u = !1, typeof L == "function" ? (L(n.state.value[e]), H = {
      type: ss.patchFunction,
      storeId: e,
      events: m
    }) : (Tn(n.state.value[e], L), H = {
      type: ss.patchObject,
      payload: L,
      storeId: e,
      events: m
    });
    const E = _ = Symbol();
    Ln().then(() => {
      _ === E && (f = !0);
    }), u = !0, Ot(h, H, n.state.value[e]);
  }
  const b = l ? function() {
    const { state: H } = s, E = H ? H() : {};
    this.$patch((T) => {
      at(T, E);
    });
  } : (
    /* istanbul ignore next */
    Xl
  );
  function O() {
    r.stop(), h = [], v = [], n._s.delete(e);
  }
  const G = (L, H = "") => {
    if (Do in L)
      return L[an] = H, L;
    const E = function() {
      Ys(n);
      const T = Array.from(arguments), ee = [], A = [];
      function D(Q) {
        ee.push(Q);
      }
      function q(Q) {
        A.push(Q);
      }
      Ot(v, {
        args: T,
        name: E[an],
        store: Y,
        after: D,
        onError: q
      });
      let oe;
      try {
        oe = L.apply(this && this.$id === e ? this : Y, T);
      } catch (Q) {
        throw Ot(A, Q), Q;
      }
      return oe instanceof Promise ? oe.then((Q) => (Ot(ee, Q), Q)).catch((Q) => (Ot(A, Q), Promise.reject(Q))) : (Ot(ee, oe), oe);
    };
    return E[Do] = !0, E[an] = H, E;
  }, U = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: Ro.bind(null, v),
    $patch: R,
    $reset: b,
    $subscribe(L, H = {}) {
      const E = Ro(h, L, H.detached, () => T()), T = r.run(() => Ct(() => n.state.value[e], (ee) => {
        (H.flush === "sync" ? u : f) && L({
          storeId: e,
          type: ss.direct,
          events: m
        }, ee);
      }, at({}, c, H)));
      return E;
    },
    $dispose: O
  }, Y = /* @__PURE__ */ Vs(U);
  n._s.set(e, Y);
  const X = (n._a && n._a.runWithContext || Nc)(() => n._e.run(() => (r = Yo()).run(() => t({ action: G }))));
  for (const L in X) {
    const H = X[L];
    if (/* @__PURE__ */ se(H) && !jc(H) || /* @__PURE__ */ ze(H))
      l || (y && Vc(H) && (/* @__PURE__ */ se(H) ? H.value = y[L] : Tn(H, y[L])), n.state.value[e][L] = H);
    else if (typeof H == "function") {
      const E = G(H, L);
      X[L] = E, i.actions[L] = H;
    }
  }
  return at(Y, X), at(/* @__PURE__ */ Z(Y), X), Object.defineProperty(Y, "$state", {
    get: () => n.state.value[e],
    set: (L) => {
      R((H) => {
        at(H, L);
      });
    }
  }), n._p.forEach((L) => {
    at(Y, r.run(() => L({
      store: Y,
      app: n._a,
      pinia: n,
      options: i
    })));
  }), y && l && s.hydrate && s.hydrate(Y.$state, y), f = !0, u = !0, Y;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function er(e, t, s) {
  let n, o;
  const l = typeof t == "function";
  typeof e == "string" ? (n = e, o = l ? s : t) : (o = e, n = e.id);
  function r(i, c) {
    const f = ei();
    return i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    i || (f ? Qt(Ql, null) : null), i && Ys(i), i = zl, i._s.has(n) || (l ? Zl(n, t, o, i) : Bc(n, o, i)), i._s.get(n);
  }
  return r.$id = n, r;
}
function cs(e) {
  {
    const t = /* @__PURE__ */ Z(e), s = {};
    for (const n in t) {
      const o = t[n];
      o.effect ? s[n] = // ...
      We({
        get: () => e[n],
        set(l) {
          e[n] = l;
        }
      }) : (/* @__PURE__ */ se(o) || /* @__PURE__ */ ze(o)) && (s[n] = // ---
      /* @__PURE__ */ Wr(e, n));
    }
    return s;
  }
}
const tr = "at_assetthingie_url", $n = "http://127.0.0.1:8188", Hc = 2e4;
function Dt() {
  if (typeof localStorage > "u") return $n;
  const e = localStorage.getItem(tr) || $n;
  return String(e).replace(/\/$/, "");
}
function be() {
  const e = Dt();
  try {
    if (new URL(e).port === "8188") return "/at";
  } catch {
  }
  return "/api/comfy";
}
function Kn() {
  var e;
  return be() !== "/at" ? Dt() : typeof window < "u" && ((e = window.location) != null && e.origin) && window.location.protocol !== "file:" ? window.location.origin.replace(/\/$/, "") : Dt();
}
function Wc(e) {
  localStorage.setItem(tr, e.replace(/\/$/, ""));
}
async function xe(e, t) {
  const s = `${Kn()}${e}`, n = new AbortController(), o = setTimeout(() => n.abort(), Hc);
  try {
    const l = await fetch(s, {
      ...t,
      signal: n.signal,
      headers: { Accept: "application/json", ...(t == null ? void 0 : t.headers) ?? {} }
    }), r = await l.text();
    if (!l.ok) throw new Error(`HTTP ${l.status}: ${r.slice(0, 240)}`);
    return JSON.parse(r);
  } finally {
    clearTimeout(o);
  }
}
function Kc(e) {
  var s;
  const t = new URLSearchParams();
  (s = e.q) != null && s.trim() && t.set("q", e.q.trim()), e.search_type && t.set("search_type", e.search_type);
  for (const n of e.content_types ?? [])
    n && t.append("content_types", n);
  for (const n of e.base_models ?? [])
    n && t.append("base_models", n);
  return e.sort && t.set("sort", e.sort), e.period && t.set("period", e.period), e.nsfw && t.set("nsfw", "true"), t.set("limit", String(e.limit ?? 20)), t;
}
async function qc(e) {
  const t = Kc(e).toString();
  return xe(`${be()}/browse/search${t ? `?${t}` : ""}`);
}
async function Gc(e) {
  const t = encodeURIComponent(e);
  return xe(`${be()}/browse/page?url=${t}`);
}
async function Jc(e, t = !1) {
  const s = t ? "?nsfw=true" : "";
  return xe(`${be()}/browse/model/${e}${s}`);
}
async function Yc(e) {
  const t = new URLSearchParams();
  e != null && e.family && t.set("family", e.family);
  const s = t.toString();
  return xe(`${be()}/filters${s ? `?${s}` : ""}`);
}
async function zc(e) {
  return xe(`${be()}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  });
}
async function sr(e, t) {
  return xe(`${be()}/download/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: e, duplicate_resolution: t ?? "skip" })
  });
}
async function Qc() {
  return xe(`${be()}/downloads`);
}
function zs(e) {
  return encodeURIComponent(e);
}
async function Xc(e) {
  await xe(`${be()}/downloads/${zs(e)}/cancel`, { method: "POST" });
}
async function Zc(e) {
  await xe(`${be()}/downloads/${zs(e)}/retry`, { method: "POST" });
}
async function ea(e) {
  await xe(`${be()}/downloads/${zs(e)}/pause`, { method: "POST" });
}
async function ta(e) {
  await fetch(`${Kn()}${be()}/downloads/${zs(e)}`, { method: "DELETE" });
}
async function sa() {
  return xe(`${be()}/config`);
}
async function na(e) {
  return xe(`${be()}/config`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  });
}
async function oa() {
  return xe(`${be()}/scan`, { method: "POST" });
}
async function un() {
  return xe(`${be()}/scan/status`);
}
async function la() {
  return xe(`${be()}/enrich`, { method: "POST" });
}
async function fn() {
  return xe(`${be()}/enrich/status`);
}
function Fo(e) {
  if (!e) return null;
  const t = e.trim();
  return t.startsWith("http://") || t.startsWith("https://") ? t : `${Kn()}${t.startsWith("/") ? "" : "/"}${t}`;
}
const ds = /* @__PURE__ */ er("at-browse", () => {
  const e = /* @__PURE__ */ J(""), t = /* @__PURE__ */ J("model_name"), s = /* @__PURE__ */ J([]), n = /* @__PURE__ */ J([]), o = /* @__PURE__ */ J("Most Downloaded"), l = /* @__PURE__ */ J("All Time"), r = /* @__PURE__ */ J(!1), i = /* @__PURE__ */ J(!1), c = /* @__PURE__ */ J(!1), f = /* @__PURE__ */ J(null), u = /* @__PURE__ */ J([]), h = /* @__PURE__ */ J(null), v = /* @__PURE__ */ J(null), m = /* @__PURE__ */ J(!1), y = /* @__PURE__ */ J("General"), _ = /* @__PURE__ */ J("skip"), R = /* @__PURE__ */ J(!1), b = /* @__PURE__ */ J(/* @__PURE__ */ new Set());
  function O() {
    return {
      q: e.value,
      search_type: t.value,
      content_types: [...s.value],
      base_models: [...n.value],
      sort: o.value,
      period: l.value,
      nsfw: i.value ? !1 : r.value,
      limit: 20
    };
  }
  async function G(E) {
    c.value = !0, f.value = null;
    try {
      const T = await qc(O());
      u.value = E ? T.items : [...u.value, ...T.items], h.value = T.next_page ?? null;
    } catch (T) {
      f.value = T instanceof Error ? T.message : "Search failed", E && (u.value = []);
    } finally {
      c.value = !1;
    }
  }
  async function U() {
    if (!(!h.value || c.value)) {
      c.value = !0, f.value = null;
      try {
        const E = await Gc(h.value);
        u.value = [...u.value, ...E.items], h.value = E.next_page ?? null;
      } catch (E) {
        f.value = E instanceof Error ? E.message : "Load more failed";
      } finally {
        c.value = !1;
      }
    }
  }
  async function Y(E) {
    m.value = !0, v.value = null;
    try {
      const T = await Jc(E, i.value ? !1 : r.value);
      v.value = T;
    } catch (T) {
      f.value = T instanceof Error ? T.message : "Detail failed";
    } finally {
      m.value = !1;
    }
  }
  function z() {
    v.value = null;
  }
  function X(E) {
    const T = new Set(b.value);
    T.has(E) ? T.delete(E) : T.add(E), b.value = T;
  }
  function L() {
    b.value = /* @__PURE__ */ new Set();
  }
  function H(E) {
    R.value = E, E || L();
  }
  return {
    q: e,
    searchType: t,
    contentTypes: s,
    baseModels: n,
    sort: o,
    period: l,
    nsfw: r,
    hideNsfwLocked: i,
    loading: c,
    error: f,
    items: u,
    nextPage: h,
    selected: v,
    detailLoading: m,
    category: y,
    duplicateResolution: _,
    batchMode: R,
    batchIds: b,
    search: G,
    loadMore: U,
    openModel: Y,
    closeDetail: z,
    toggleBatchId: X,
    clearBatch: L,
    setBatchMode: H,
    searchParams: O
  };
}), ra = 1500, ia = 1e4;
function ca(e) {
  const t = e.toLowerCase();
  return t === "queued" || t === "downloading" || t === "verifying";
}
function Lo(e, t = 3500) {
  const s = document.createElement("div");
  s.textContent = e, s.style.cssText = [
    "position:fixed",
    "bottom:1rem",
    "right:1rem",
    "z-index:99999",
    "background:var(--comfy-menu-bg,#353535)",
    "color:var(--fg-color,#ddd)",
    "padding:0.75rem 1.25rem",
    "border-radius:8px",
    "font-size:0.85rem",
    "box-shadow:0 4px 12px rgba(0,0,0,0.4)",
    "opacity:0",
    "transition:opacity 0.2s ease"
  ].join(";"), document.body.appendChild(s), requestAnimationFrame(() => {
    s.style.opacity = "1";
  }), setTimeout(() => {
    s.style.opacity = "0", setTimeout(() => s.remove(), 220);
  }, t);
}
const aa = /* @__PURE__ */ er("at-downloads", () => {
  const e = /* @__PURE__ */ J([]), t = /* @__PURE__ */ J(!1), s = /* @__PURE__ */ J(null), n = /* @__PURE__ */ J("browse");
  function o(m) {
    n.value = m;
  }
  let l = null;
  const r = /* @__PURE__ */ J(/* @__PURE__ */ new Set());
  function i() {
    return e.value.some((m) => ca(m.state));
  }
  function c() {
    l != null && (clearTimeout(l), l = null);
    const m = i() ? ra : ia;
    l = setTimeout(() => {
      f();
    }, m);
  }
  async function f() {
    if (typeof document < "u" && document.visibilityState === "hidden") {
      c();
      return;
    }
    await u({ forPoll: !0 }), c();
  }
  async function u(m) {
    const y = (m == null ? void 0 : m.forPoll) === !0;
    y || (t.value = !0), s.value = null;
    try {
      const _ = await Qc();
      e.value = _.tasks;
      for (const R of _.completed_since_last_poll ?? [])
        if (!r.value.has(R)) {
          r.value.add(R);
          const b = _.tasks.find((G) => G.id === R), O = (b == null ? void 0 : b.filename) ?? R.slice(0, 8);
          n.value !== "downloads" && Lo(`Download completed: ${O}`);
        }
    } catch (_) {
      s.value = _ instanceof Error ? _.message : "Queue load failed";
    } finally {
      y || (t.value = !1);
    }
  }
  function h() {
    l == null && u({ forPoll: !0 }).finally(() => c());
  }
  function v() {
    l != null && (clearTimeout(l), l = null);
  }
  return {
    tasks: e,
    loading: t,
    error: s,
    activeTab: n,
    setTab: o,
    refresh: u,
    startPolling: h,
    stopPolling: v,
    showToast: Lo
  };
}), ua = [
  "LORA",
  "Checkpoint",
  "LoCon",
  "DoRA",
  "TextualInversion",
  "VAE",
  "Controlnet",
  "Hypernetwork",
  "Upscaler",
  "MotionModule",
  "Other"
], fa = [
  "SD 1.5",
  "SD 2.1",
  "SDXL 1.0",
  "SDXL Turbo",
  "Pony",
  "Flux.1 D",
  "Flux.1 S",
  "SD 3.5",
  "SD 3.5 Large"
], da = [
  { value: "Most Downloaded", label: "Most downloaded" },
  { value: "Highest Rated", label: "Highest rated" },
  { value: "Newest", label: "Newest" },
  { value: "Most Liked", label: "Most liked" },
  { value: "Most Buzz", label: "Most buzz" },
  { value: "Most Discussed", label: "Most discussed" },
  { value: "Most Collected", label: "Most collected" },
  { value: "Most Images", label: "Most images" },
  { value: "Oldest", label: "Oldest" }
], ha = [
  { value: "All Time", label: "All time" },
  { value: "Year", label: "Year" },
  { value: "Month", label: "Month" },
  { value: "Week", label: "Week" },
  { value: "Day", label: "Day" }
], pa = { class: "browse-filters" }, ga = { class: "browse-filters__body" }, _a = { class: "browse-filters__row" }, ma = { class: "browse-filters__section" }, ba = { class: "browse-filters__chips" }, ya = ["checked", "onChange"], va = { class: "browse-filters__section" }, wa = { class: "browse-filters__chips" }, Sa = ["checked", "onChange"], xa = { class: "browse-filters__row" }, Ca = ["value"], Ta = { class: "browse-filters__row" }, $a = ["value"], Ea = {
  key: 0,
  class: "browse-filters__row browse-filters__row--chk"
}, Ma = {
  key: 1,
  class: "browse-filters__hint"
}, Oa = /* @__PURE__ */ $t({
  __name: "BrowseFilters",
  setup(e) {
    const {
      searchType: t,
      contentTypes: s,
      baseModels: n,
      sort: o,
      period: l,
      nsfw: r,
      hideNsfwLocked: i
    } = cs(ds()), c = /* @__PURE__ */ J(!1);
    function f(m) {
      const y = s.value.slice(), _ = y.indexOf(m);
      _ >= 0 ? y.splice(_, 1) : y.push(m), s.value = y;
    }
    function u(m) {
      return s.value.includes(m);
    }
    function h(m) {
      const y = n.value.slice(), _ = y.indexOf(m);
      _ >= 0 ? y.splice(_, 1) : y.push(m), n.value = y;
    }
    function v(m) {
      return n.value.includes(m);
    }
    return (m, y) => (I(), F("div", pa, [
      g("button", {
        type: "button",
        class: "browse-filters__toggle",
        onClick: y[0] || (y[0] = (_) => c.value = !c.value)
      }, re(c.value ? "▼" : "▶") + " Filters ", 1),
      ge(g("div", ga, [
        g("label", _a, [
          y[6] || (y[6] = g("span", null, "Search type", -1)),
          ge(g("select", {
            "onUpdate:modelValue": y[1] || (y[1] = (_) => /* @__PURE__ */ se(t) ? t.value = _ : null),
            class: "at-input at-input--sm"
          }, [...y[5] || (y[5] = [
            g("option", { value: "model_name" }, "Model name", -1),
            g("option", { value: "username" }, "Username", -1),
            g("option", { value: "tag" }, "Tag", -1)
          ])], 512), [
            [Rt, N(t)]
          ])
        ]),
        g("div", ma, [
          y[7] || (y[7] = g("span", { class: "browse-filters__label" }, "Content types", -1)),
          g("div", ba, [
            (I(!0), F(_e, null, Je(N(ua), (_) => (I(), F("label", {
              key: _,
              class: "browse-filters__chk"
            }, [
              g("input", {
                type: "checkbox",
                checked: u(_),
                onChange: (R) => f(_)
              }, null, 40, ya),
              me(" " + re(_), 1)
            ]))), 128))
          ])
        ]),
        g("div", va, [
          y[8] || (y[8] = g("span", { class: "browse-filters__label" }, "Base models", -1)),
          g("div", wa, [
            (I(!0), F(_e, null, Je(N(fa), (_) => (I(), F("label", {
              key: _,
              class: "browse-filters__chk"
            }, [
              g("input", {
                type: "checkbox",
                checked: v(_),
                onChange: (R) => h(_)
              }, null, 40, Sa),
              me(" " + re(_), 1)
            ]))), 128))
          ])
        ]),
        g("label", xa, [
          y[9] || (y[9] = g("span", null, "Sort", -1)),
          ge(g("select", {
            "onUpdate:modelValue": y[2] || (y[2] = (_) => /* @__PURE__ */ se(o) ? o.value = _ : null),
            class: "at-input at-input--sm"
          }, [
            (I(!0), F(_e, null, Je(N(da), (_) => (I(), F("option", {
              key: _.value,
              value: _.value
            }, re(_.label), 9, Ca))), 128))
          ], 512), [
            [Rt, N(o)]
          ])
        ]),
        g("label", Ta, [
          y[10] || (y[10] = g("span", null, "Period", -1)),
          ge(g("select", {
            "onUpdate:modelValue": y[3] || (y[3] = (_) => /* @__PURE__ */ se(l) ? l.value = _ : null),
            class: "at-input at-input--sm"
          }, [
            (I(!0), F(_e, null, Je(N(ha), (_) => (I(), F("option", {
              key: _.value,
              value: _.value
            }, re(_.label), 9, $a))), 128))
          ], 512), [
            [Rt, N(l)]
          ])
        ]),
        N(i) ? (I(), F("p", Ma, "NSFW hidden (server config).")) : (I(), F("label", Ea, [
          ge(g("input", {
            "onUpdate:modelValue": y[4] || (y[4] = (_) => /* @__PURE__ */ se(r) ? r.value = _ : null),
            type: "checkbox"
          }, null, 512), [
            [Ss, N(r)]
          ]),
          y[11] || (y[11] = g("span", null, "Include NSFW", -1))
        ]))
      ], 512), [
        [dc, c.value]
      ])
    ]));
  }
}), Et = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, Aa = /* @__PURE__ */ Et(Oa, [["__scopeId", "data-v-7f11791d"]]);
function Ps(e) {
  var s;
  const t = (s = e.creator) == null ? void 0 : s.username;
  return t ? String(t) : e.creator_username ? String(e.creator_username) : null;
}
function No(e) {
  var s;
  const t = e.modelVersions;
  if (!(t != null && t.length)) return null;
  for (const n of t) {
    const o = n.images;
    if (o != null && o.length) {
      for (const l of o)
        if ((l.type || "image").toLowerCase() !== "video" && l.url)
          return l.url;
      if ((s = o[0]) != null && s.url) return o[0].url;
    }
  }
  return null;
}
function nr(e) {
  const t = e.trim();
  return t;
}
const Pa = ["checked"], ka = { class: "result-card__thumb" }, Ia = ["src", "alt"], Ra = {
  key: 1,
  class: "result-card__placeholder"
}, Da = { class: "result-card__meta" }, Fa = { class: "result-card__name" }, La = { class: "result-card__type" }, Na = {
  key: 0,
  class: "result-card__creator"
}, Ua = {
  key: 1,
  class: "result-card__stats"
}, Va = /* @__PURE__ */ $t({
  __name: "BrowseResultCard",
  props: {
    item: {},
    batchMode: { type: Boolean },
    batchSelected: { type: Boolean }
  },
  emits: ["open", "toggleBatch"],
  setup(e, { emit: t }) {
    const s = e, n = t;
    function o(i) {
      const c = i.stats;
      if (!c) return "";
      const f = [], u = c.downloadCount ?? c.download_count;
      u != null && f.push(`${u} dl`), c.rating != null && f.push(`★ ${c.rating}`);
      const h = c.thumbsUpCount ?? c.thumbs_up_count;
      return h != null && f.push(`${h} 👍`), f.join(" · ");
    }
    function l(i) {
      if (s.batchMode) {
        i.stopPropagation(), n("toggleBatch");
        return;
      }
      n("open");
    }
    function r(i) {
      i.stopPropagation(), n("toggleBatch");
    }
    return (i, c) => (I(), F("div", {
      class: ot(["result-card", { "result-card--batch": e.batchMode, "result-card--selected": e.batchSelected }]),
      onClick: l
    }, [
      e.batchMode ? (I(), F("div", {
        key: 0,
        class: "result-card__cb",
        onClick: Yl(r, ["stop"])
      }, [
        g("input", {
          type: "checkbox",
          checked: e.batchSelected,
          tabindex: "-1",
          readonly: ""
        }, null, 8, Pa)
      ])) : ne("", !0),
      g("div", ka, [
        N(No)(e.item) ? (I(), F("img", {
          key: 0,
          src: N(nr)(N(No)(e.item)),
          alt: e.item.name,
          loading: "lazy"
        }, null, 8, Ia)) : (I(), F("div", Ra, "No preview"))
      ]),
      g("div", Da, [
        g("span", Fa, re(e.item.name), 1),
        g("span", La, re(e.item.type), 1),
        N(Ps)(e.item) ? (I(), F("span", Na, "by " + re(N(Ps)(e.item)), 1)) : ne("", !0),
        o(e.item) ? (I(), F("span", Ua, re(o(e.item)), 1)) : ne("", !0)
      ])
    ], 2));
  }
}), ja = /* @__PURE__ */ Et(Va, [["__scopeId", "data-v-ae3da52e"]]), Ba = { class: "result-grid" }, Ha = /* @__PURE__ */ $t({
  __name: "BrowseResultGrid",
  setup(e) {
    const t = ds(), { items: s, batchMode: n, batchIds: o } = cs(t);
    return (l, r) => (I(), F("div", Ba, [
      (I(!0), F(_e, null, Je(N(s), (i) => (I(), Gs(ja, {
        key: i.id,
        item: i,
        "batch-mode": N(n),
        "batch-selected": N(o).has(i.id),
        onOpen: (c) => N(t).openModel(i.id),
        onToggleBatch: (c) => N(t).toggleBatchId(i.id)
      }, null, 8, ["item", "batch-mode", "batch-selected", "onOpen", "onToggleBatch"]))), 128))
    ]));
  }
}), Wa = /* @__PURE__ */ Et(Ha, [["__scopeId", "data-v-9a10aff0"]]);
function Ka(e) {
  const t = (e ?? "").trim().toLowerCase();
  if (t === "checkpoint") return "checkpoint";
  if (t)
    return "lora";
}
const qa = { class: "at-imlb__inner" }, Ga = ["src"], Ja = {
  key: 0,
  class: "at-imlb__meta"
}, Ya = /* @__PURE__ */ $t({
  __name: "ImageMetaLightbox",
  props: {
    imageUrl: {},
    meta: {}
  },
  emits: ["close"],
  setup(e) {
    return (t, s) => (I(), Gs(ci, { to: "body" }, [
      e.imageUrl ? (I(), F("div", {
        key: 0,
        class: "at-imlb",
        onClick: s[1] || (s[1] = Yl((n) => t.$emit("close"), ["self"]))
      }, [
        g("div", qa, [
          g("button", {
            type: "button",
            class: "at-imlb__x",
            onClick: s[0] || (s[0] = (n) => t.$emit("close"))
          }, "×"),
          g("img", {
            src: e.imageUrl,
            alt: "Preview"
          }, null, 8, Ga),
          e.meta && Object.keys(e.meta).length ? (I(), F("pre", Ja, re(JSON.stringify(e.meta, null, 2)), 1)) : ne("", !0)
        ])
      ])) : ne("", !0)
    ]));
  }
}), za = /* @__PURE__ */ Et(Ya, [["__scopeId", "data-v-b698c59a"]]), Qa = { class: "model-detail" }, Xa = { class: "model-detail__hdr" }, Za = { class: "model-detail__sub" }, eu = { class: "pill" }, tu = { key: 0 }, su = { key: 1 }, nu = {
  key: 0,
  class: "model-detail__controls"
}, ou = { class: "at-label" }, lu = ["value"], ru = {
  key: 0,
  class: "at-label"
}, iu = ["value"], cu = {
  key: 1,
  class: "model-detail__desc"
}, au = ["innerHTML"], uu = {
  key: 2,
  class: "model-detail__tw"
}, fu = { class: "model-detail__tw-row" }, du = { class: "model-detail__tw-text" }, hu = {
  key: 3,
  class: "model-detail__gallery"
}, pu = { class: "model-detail__thumbs" }, gu = ["onClick"], _u = ["src", "alt"], mu = {
  key: 1,
  class: "model-detail__vid"
}, bu = { class: "model-detail__dl" }, yu = { class: "at-label" }, vu = {
  key: 0,
  class: "model-detail__cats-hint"
}, wu = ["list"], Su = ["id"], xu = ["value"], Cu = { class: "model-detail__dup" }, Tu = { class: "model-detail__dl-btns" }, $u = /* @__PURE__ */ $t({
  __name: "BrowseModelDetail",
  props: {
    model: {}
  },
  emits: ["close", "downloaded", "error"],
  setup(e, { emit: t }) {
    const s = e, n = t, { category: o, duplicateResolution: l } = cs(ds()), r = /* @__PURE__ */ J(0), i = /* @__PURE__ */ J(0), c = /* @__PURE__ */ J(!1), f = /* @__PURE__ */ J(null), u = /* @__PURE__ */ J(null), h = We(() => s.model.modelVersions ?? []);
    Ct(
      () => s.model.id,
      () => {
        r.value = 0, i.value = 0, c.value = !1, f.value = null, u.value = null;
      }
    );
    const v = We(() => h.value[r.value] ?? null), m = We(() => {
      var E;
      return ((E = v.value) == null ? void 0 : E.files) ?? [];
    });
    Ct(v, (E) => {
      var T;
      if (i.value = 0, (T = E == null ? void 0 : E.files) != null && T.length) {
        const ee = E.files.findIndex((A) => A.primary);
        ee >= 0 && (i.value = ee);
      }
    });
    const y = We(() => {
      var E;
      return ((E = v.value) == null ? void 0 : E.images) ?? [];
    }), _ = /* @__PURE__ */ J([]), R = /* @__PURE__ */ J(!1), b = We(() => `at-browse-cats-${s.model.id}`);
    Ct(
      () => [s.model.id, s.model.type],
      async ([E, T]) => {
        R.value = !0;
        try {
          const ee = Ka(T), A = await Yc(ee ? { family: ee } : {});
          _.value = A.categories ?? [];
        } catch {
          _.value = [];
        } finally {
          R.value = !1;
        }
      },
      { immediate: !0 }
    );
    const O = We(() => {
      var T;
      const E = (T = v.value) == null ? void 0 : T.trainedWords;
      return Array.isArray(E) ? E : [];
    });
    async function G(E) {
      try {
        await navigator.clipboard.writeText(E);
      } catch {
        n("error", "Copy failed");
      }
    }
    function U() {
      const E = v.value, T = m.value;
      if (!E || !T.length) return null;
      const ee = T[i.value] ?? T[0];
      return ee != null && ee.id ? { versionId: E.id, fileId: ee.id } : null;
    }
    async function Y() {
      const E = U();
      if (!E) {
        n("error", "No file on this version");
        return;
      }
      try {
        await zc({
          civitai_model_id: s.model.id,
          version_id: E.versionId,
          file_id: E.fileId,
          category: o.value.trim() || "General",
          duplicate_resolution: l.value
        }), n("downloaded");
      } catch (T) {
        n("error", T instanceof Error ? T.message : "Download failed");
      }
    }
    async function z() {
      const E = [];
      for (const T of h.value) {
        const ee = T.files ?? [];
        if (!ee.length) continue;
        const A = ee.findIndex((q) => q.primary), D = ee[A >= 0 ? A : 0];
        D != null && D.id && E.push({
          civitai_model_id: s.model.id,
          version_id: T.id,
          file_id: D.id,
          category: o.value.trim() || "General"
        });
      }
      if (!E.length) {
        n("error", "No downloadable files");
        return;
      }
      try {
        await sr(E, l.value), n("downloaded");
      } catch (T) {
        n("error", T instanceof Error ? T.message : "Batch download failed");
      }
    }
    function X(E, T) {
      f.value = E, u.value = T;
    }
    function L() {
      f.value = null, u.value = null;
    }
    const H = We(() => {
      var E;
      return ((E = s.model.description) == null ? void 0 : E.trim()) || "";
    });
    return (E, T) => {
      var ee;
      return I(), F("div", Qa, [
        g("div", Xa, [
          g("h3", null, re(e.model.name), 1),
          g("button", {
            type: "button",
            class: "at-btn",
            onClick: T[0] || (T[0] = (A) => n("close"))
          }, "Close")
        ]),
        g("p", Za, [
          g("span", eu, re(e.model.type), 1),
          N(Ps)(e.model) ? (I(), F("span", tu, " · " + re(N(Ps)(e.model)), 1)) : ne("", !0),
          (ee = v.value) != null && ee.baseModel ? (I(), F("span", su, " · " + re(v.value.baseModel), 1)) : ne("", !0)
        ]),
        h.value.length ? (I(), F("div", nu, [
          g("label", ou, [
            T[8] || (T[8] = me(" Version ", -1)),
            ge(g("select", {
              "onUpdate:modelValue": T[1] || (T[1] = (A) => r.value = A),
              class: "at-input"
            }, [
              (I(!0), F(_e, null, Je(h.value, (A, D) => (I(), F("option", {
                key: A.id,
                value: D
              }, re(A.name || `v${A.id}`), 9, lu))), 128))
            ], 512), [
              [
                Rt,
                r.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          m.value.length > 1 ? (I(), F("label", ru, [
            T[9] || (T[9] = me(" File ", -1)),
            ge(g("select", {
              "onUpdate:modelValue": T[2] || (T[2] = (A) => i.value = A),
              class: "at-input"
            }, [
              (I(!0), F(_e, null, Je(m.value, (A, D) => (I(), F("option", {
                key: A.id,
                value: D
              }, re(A.name) + " " + re(A.primary ? "(primary)" : ""), 9, iu))), 128))
            ], 512), [
              [
                Rt,
                i.value,
                void 0,
                { number: !0 }
              ]
            ])
          ])) : ne("", !0)
        ])) : ne("", !0),
        H.value ? (I(), F("div", cu, [
          g("div", {
            class: ot(["model-detail__desc-inner", { "model-detail__desc-inner--collapsed": !c.value && H.value.length > 400 }]),
            innerHTML: H.value
          }, null, 10, au),
          H.value.length > 400 ? (I(), F("button", {
            key: 0,
            type: "button",
            class: "at-btn at-btn--link",
            onClick: T[3] || (T[3] = (A) => c.value = !c.value)
          }, re(c.value ? "Show less" : "Show more"), 1)) : ne("", !0)
        ])) : ne("", !0),
        O.value.length ? (I(), F("div", uu, [
          T[10] || (T[10] = g("span", { class: "model-detail__tw-label" }, "Trigger words", -1)),
          g("div", fu, [
            g("code", du, re(O.value.join(", ")), 1),
            g("button", {
              type: "button",
              class: "at-btn at-btn--sm",
              onClick: T[4] || (T[4] = (A) => G(O.value.join(", ")))
            }, "Copy")
          ])
        ])) : ne("", !0),
        y.value.length ? (I(), F("div", hu, [
          T[11] || (T[11] = g("span", { class: "model-detail__tw-label" }, "Gallery", -1)),
          g("div", pu, [
            (I(!0), F(_e, null, Je(y.value, (A, D) => (I(), F("button", {
              key: D,
              type: "button",
              class: "model-detail__thumb",
              onClick: (q) => X(A.url, A.meta ?? null)
            }, [
              (A.type || "image").toLowerCase() !== "video" ? (I(), F("img", {
                key: 0,
                src: N(nr)(A.url),
                alt: `Image ${D}`,
                loading: "lazy"
              }, null, 8, _u)) : (I(), F("span", mu, "Video"))
            ], 8, gu))), 128))
          ])
        ])) : ne("", !0),
        g("div", bu, [
          g("label", yu, [
            T[12] || (T[12] = me(" Category folder ", -1)),
            R.value ? (I(), F("span", vu, "Loading folders…")) : ne("", !0),
            ge(g("input", {
              "onUpdate:modelValue": T[5] || (T[5] = (A) => /* @__PURE__ */ se(o) ? o.value = A : null),
              class: "at-input model-detail__category-combo",
              list: b.value,
              placeholder: "Pick from list or type a folder name (e.g. General)",
              autocomplete: "off",
              "aria-autocomplete": "list"
            }, null, 8, wu), [
              [St, N(o)]
            ]),
            g("datalist", { id: b.value }, [
              (I(!0), F(_e, null, Je(_.value, (A) => (I(), F("option", {
                key: "dl-" + A,
                value: A
              }, null, 8, xu))), 128))
            ], 8, Su)
          ]),
          g("fieldset", Cu, [
            T[15] || (T[15] = g("legend", null, "Duplicate file", -1)),
            g("label", null, [
              ge(g("input", {
                "onUpdate:modelValue": T[6] || (T[6] = (A) => /* @__PURE__ */ se(l) ? l.value = A : null),
                type: "radio",
                value: "skip"
              }, null, 512), [
                [Po, N(l)]
              ]),
              T[13] || (T[13] = me(" Skip if exists", -1))
            ]),
            g("label", null, [
              ge(g("input", {
                "onUpdate:modelValue": T[7] || (T[7] = (A) => /* @__PURE__ */ se(l) ? l.value = A : null),
                type: "radio",
                value: "replace"
              }, null, 512), [
                [Po, N(l)]
              ]),
              T[14] || (T[14] = me(" Replace", -1))
            ])
          ]),
          g("div", Tu, [
            g("button", {
              type: "button",
              class: "at-btn",
              onClick: Y
            }, "Download"),
            h.value.length > 1 ? (I(), F("button", {
              key: 0,
              type: "button",
              class: "at-btn",
              onClick: z
            }, "Download all versions")) : ne("", !0)
          ])
        ]),
        Pe(za, {
          "image-url": f.value,
          meta: u.value,
          onClose: L
        }, null, 8, ["image-url", "meta"])
      ]);
    };
  }
}), Eu = /* @__PURE__ */ Et($u, [["__scopeId", "data-v-5a5f922b"]]), Mu = { class: "config-panel" }, Ou = {
  key: 0,
  class: "at-err"
}, Au = {
  key: 1,
  class: "at-muted"
}, Pu = { class: "at-label" }, ku = { class: "at-label" }, Iu = ["placeholder"], Ru = { class: "at-label at-label--row" }, Du = { class: "at-label" }, Fu = { class: "at-label" }, Lu = { class: "at-label" }, Nu = { class: "at-label" }, Uu = { class: "at-label at-label--row" }, Vu = { class: "at-label at-label--row" }, ju = { class: "config-panel__actions" }, Bu = ["disabled"], Hu = { class: "config-panel__status" }, Wu = { class: "config-panel__pre" }, Ku = { class: "config-panel__pre" }, qu = /* @__PURE__ */ $t({
  __name: "ConfigPanel",
  setup(e) {
    const t = ds(), s = /* @__PURE__ */ J(!1), n = /* @__PURE__ */ J(null), o = /* @__PURE__ */ J(null), l = /* @__PURE__ */ J(Dt()), r = /* @__PURE__ */ J(""), i = /* @__PURE__ */ J(null), c = /* @__PURE__ */ J(null);
    let f = null;
    async function u() {
      var R;
      s.value = !0, n.value = null;
      try {
        o.value = await sa(), l.value = Dt(), r.value = "", t.hideNsfwLocked = !!((R = o.value) != null && R.hide_nsfw), t.hideNsfwLocked && (t.nsfw = !1), i.value = await un(), c.value = await fn();
      } catch (b) {
        n.value = b instanceof Error ? b.message : "Load failed";
      } finally {
        s.value = !1;
      }
    }
    function h() {
      Wc(l.value || $n), l.value = Dt();
    }
    async function v() {
      var R;
      if (o.value) {
        s.value = !0, n.value = null;
        try {
          const b = {
            scan_on_startup: o.value.scan_on_startup,
            enrichment_mode: o.value.enrichment_mode,
            enrichment_rate_limit_ms: o.value.enrichment_rate_limit_ms,
            max_parallel_downloads: o.value.max_parallel_downloads,
            download_subpath_template: o.value.download_subpath_template,
            hide_early_access: o.value.hide_early_access,
            hide_nsfw: o.value.hide_nsfw
          };
          r.value.trim() && (b.civitai_api_key = r.value.trim()), o.value = await na(b), r.value = "", t.hideNsfwLocked = !!((R = o.value) != null && R.hide_nsfw), t.hideNsfwLocked && (t.nsfw = !1);
        } catch (b) {
          n.value = b instanceof Error ? b.message : "Save failed";
        } finally {
          s.value = !1;
        }
      }
    }
    async function m() {
      try {
        await oa(), i.value = await un();
      } catch (R) {
        n.value = R instanceof Error ? R.message : "Scan failed";
      }
    }
    async function y() {
      try {
        await la(), c.value = await fn();
      } catch (R) {
        n.value = R instanceof Error ? R.message : "Enrich failed";
      }
    }
    async function _() {
      try {
        i.value = await un(), c.value = await fn();
      } catch {
      }
    }
    return Vn(() => {
      u(), f = setInterval(() => void _(), 4e3);
    }), Ws(() => {
      f && clearInterval(f);
    }), (R, b) => (I(), F("div", Mu, [
      n.value ? (I(), F("p", Ou, re(n.value), 1)) : ne("", !0),
      s.value && !o.value ? (I(), F("p", Au, "Loading…")) : ne("", !0),
      o.value ? (I(), F(_e, { key: 2 }, [
        g("label", Pu, [
          b[9] || (b[9] = me(" Server URL ", -1)),
          ge(g("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (O) => l.value = O),
            class: "at-input",
            type: "url",
            autocomplete: "off"
          }, null, 512), [
            [St, l.value]
          ])
        ]),
        b[21] || (b[21] = g("p", { class: "at-hint" }, [
          me(" ComfyUI: "),
          g("code", null, "http://127.0.0.1:8188"),
          me(" (API on this tab). AssetThingie app: "),
          g("code", null, "http://127.0.0.1:8080")
        ], -1)),
        g("button", {
          type: "button",
          class: "at-btn at-btn--ghost",
          onClick: h
        }, "Apply server URL"),
        g("label", ku, [
          b[10] || (b[10] = me(" Civitai API key ", -1)),
          ge(g("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (O) => r.value = O),
            class: "at-input",
            type: "password",
            autocomplete: "off",
            placeholder: o.value.civitai_api_key_set ? "(unchanged — enter new key to replace)" : "Optional"
          }, null, 8, Iu), [
            [St, r.value]
          ])
        ]),
        g("label", Ru, [
          ge(g("input", {
            "onUpdate:modelValue": b[2] || (b[2] = (O) => o.value.scan_on_startup = O),
            type: "checkbox"
          }, null, 512), [
            [Ss, o.value.scan_on_startup]
          ]),
          b[11] || (b[11] = me(" Scan library on startup ", -1))
        ]),
        g("label", Du, [
          b[13] || (b[13] = me(" Enrichment mode ", -1)),
          ge(g("select", {
            "onUpdate:modelValue": b[3] || (b[3] = (O) => o.value.enrichment_mode = O),
            class: "at-input"
          }, [...b[12] || (b[12] = [
            g("option", { value: "auto" }, "Auto (during scan)", -1),
            g("option", { value: "background" }, "Background (after scan)", -1),
            g("option", { value: "manual" }, "Manual only", -1)
          ])], 512), [
            [Rt, o.value.enrichment_mode]
          ])
        ]),
        g("label", Fu, [
          b[14] || (b[14] = me(" Enrichment rate limit (ms) ", -1)),
          ge(g("input", {
            "onUpdate:modelValue": b[4] || (b[4] = (O) => o.value.enrichment_rate_limit_ms = O),
            class: "at-input",
            type: "number",
            min: "200",
            step: "100"
          }, null, 512), [
            [
              St,
              o.value.enrichment_rate_limit_ms,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        g("label", Lu, [
          b[15] || (b[15] = me(" Max parallel downloads ", -1)),
          ge(g("input", {
            "onUpdate:modelValue": b[5] || (b[5] = (O) => o.value.max_parallel_downloads = O),
            class: "at-input",
            type: "number",
            min: "1",
            max: "8"
          }, null, 512), [
            [
              St,
              o.value.max_parallel_downloads,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        g("label", Nu, [
          b[16] || (b[16] = me(" Download subpath template ", -1)),
          ge(g("input", {
            "onUpdate:modelValue": b[6] || (b[6] = (O) => o.value.download_subpath_template = O),
            class: "at-input",
            placeholder: "{category}"
          }, null, 512), [
            [St, o.value.download_subpath_template]
          ])
        ]),
        g("label", Uu, [
          ge(g("input", {
            "onUpdate:modelValue": b[7] || (b[7] = (O) => o.value.hide_early_access = O),
            type: "checkbox"
          }, null, 512), [
            [Ss, o.value.hide_early_access]
          ]),
          b[17] || (b[17] = me(" Hide early-access versions (Civitai) ", -1))
        ]),
        g("label", Vu, [
          ge(g("input", {
            "onUpdate:modelValue": b[8] || (b[8] = (O) => o.value.hide_nsfw = O),
            type: "checkbox"
          }, null, 512), [
            [Ss, o.value.hide_nsfw]
          ]),
          b[18] || (b[18] = me(" Hide NSFW from Civitai browse ", -1))
        ]),
        g("div", ju, [
          g("button", {
            type: "button",
            class: "at-btn",
            disabled: s.value,
            onClick: v
          }, "Save settings", 8, Bu),
          g("button", {
            type: "button",
            class: "at-btn",
            onClick: m
          }, "Scan now"),
          g("button", {
            type: "button",
            class: "at-btn",
            onClick: y
          }, "Enrich now"),
          g("button", {
            type: "button",
            class: "at-btn at-btn--ghost",
            onClick: u
          }, "Reload")
        ]),
        g("div", Hu, [
          b[19] || (b[19] = g("h4", null, "Scan", -1)),
          g("pre", Wu, re(JSON.stringify(i.value, null, 2)), 1),
          b[20] || (b[20] = g("h4", null, "Enrichment", -1)),
          g("pre", Ku, re(JSON.stringify(c.value, null, 2)), 1)
        ])
      ], 64)) : ne("", !0)
    ]));
  }
}), Gu = /* @__PURE__ */ Et(qu, [["__scopeId", "data-v-b9b0e54d"]]);
function Ju(e) {
  const t = e.modelVersions;
  if (!(t != null && t.length)) return null;
  const s = t[0], n = s.files ?? [];
  if (!n.length) return null;
  const o = n.findIndex((r) => r.primary), l = n[o >= 0 ? o : 0];
  return l != null && l.id ? { modelId: e.id, versionId: s.id, fileId: l.id } : null;
}
const Yu = { class: "at-browse-app" }, zu = { class: "at-browse-app__tabs" }, Qu = {
  key: 0,
  class: "at-browse-app__panel at-browse-app__panel--browse"
}, Xu = { class: "at-browse-app__browse-chrome" }, Zu = { class: "at-browse-app__search" }, ef = ["disabled"], tf = {
  key: "browse-batch-bar",
  class: "at-batch-bar"
}, sf = {
  key: "browse-search-error",
  class: "at-err"
}, nf = {
  key: "browse-detail-panel",
  class: "at-browse-app__detail-panel"
}, of = {
  key: 0,
  class: "at-muted"
}, lf = { class: "at-browse-app__browse-scroll" }, rf = ["disabled"], cf = {
  key: 1,
  class: "at-browse-app__panel"
}, af = {
  key: 0,
  class: "at-err"
}, uf = { class: "at-dl-list" }, ff = { class: "at-dl__row" }, df = ["src"], hf = { class: "at-dl__main" }, pf = { class: "at-dl__title" }, gf = {
  key: 0,
  class: "at-dl__err"
}, _f = {
  key: 1,
  class: "at-dl__bar"
}, mf = { class: "at-dl__actions" }, bf = ["onClick"], yf = ["onClick"], vf = ["onClick"], wf = ["onClick"], Sf = {
  key: 2,
  class: "at-browse-app__panel at-browse-app__panel--scroll"
}, xf = /* @__PURE__ */ $t({
  __name: "App",
  setup(e) {
    const t = ds(), s = aa(), {
      items: n,
      loading: o,
      error: l,
      q: r,
      selected: i,
      detailLoading: c,
      batchMode: f,
      batchIds: u,
      duplicateResolution: h,
      nextPage: v
    } = cs(t), { tasks: m, activeTab: y } = cs(s);
    Vn(() => {
      s.startPolling(), t.search(!0);
    }), Ws(() => {
      s.stopPolling();
    });
    async function _() {
      await t.search(!0);
    }
    function R(A) {
      s.setTab(A), A === "downloads" && s.refresh();
    }
    async function b() {
      s.showToast("Download queued"), s.refresh();
    }
    function O(A) {
      s.showToast(A);
    }
    async function G() {
      const A = [];
      for (const D of u.value) {
        const q = n.value.find((Q) => Q.id === D);
        if (!q) continue;
        const oe = Ju(q);
        oe && A.push({
          civitai_model_id: oe.modelId,
          version_id: oe.versionId,
          file_id: oe.fileId,
          category: t.category.trim() || "General"
        });
      }
      if (!A.length) {
        s.showToast("No downloadable files in selection");
        return;
      }
      try {
        await sr(A, h.value), s.showToast(`Queued ${A.length} download(s)`), s.refresh(), t.clearBatch();
      } catch (D) {
        s.showToast(D instanceof Error ? D.message : "Batch failed");
      }
    }
    function U(A) {
      const D = A.toLowerCase();
      return D === "queued" || D === "downloading" || D === "verifying";
    }
    function Y(A) {
      const D = A.toLowerCase();
      return D === "downloading" || D === "verifying";
    }
    function z(A) {
      return A.toLowerCase() === "failed";
    }
    function X(A) {
      const D = A.toLowerCase();
      return D === "completed" || D === "failed" || D === "cancelled" || D === "skipped" || D === "paused";
    }
    function L(A) {
      s.$patch({ error: A });
    }
    async function H(A) {
      try {
        await ea(A), s.refresh();
      } catch (D) {
        L(D instanceof Error ? D.message : "Pause failed");
      }
    }
    async function E(A) {
      try {
        await Xc(A), s.refresh();
      } catch (D) {
        L(D instanceof Error ? D.message : "Cancel failed");
      }
    }
    async function T(A) {
      try {
        await Zc(A), s.refresh();
      } catch (D) {
        L(D instanceof Error ? D.message : "Retry failed");
      }
    }
    async function ee(A) {
      try {
        await ta(A), s.refresh();
      } catch (D) {
        L(D instanceof Error ? D.message : "Remove failed");
      }
    }
    return (A, D) => (I(), F("div", Yu, [
      g("header", zu, [
        g("button", {
          type: "button",
          class: ot({ active: N(y) === "browse" }),
          onClick: D[0] || (D[0] = (q) => R("browse"))
        }, "Browse", 2),
        g("button", {
          type: "button",
          class: ot({ active: N(y) === "downloads" }),
          onClick: D[1] || (D[1] = (q) => R("downloads"))
        }, "Downloads", 2),
        g("button", {
          type: "button",
          class: ot(["at-browse-app__tabs-settings", { active: N(y) === "settings" }]),
          title: "Settings",
          "aria-label": "Settings",
          onClick: D[2] || (D[2] = (q) => R("settings"))
        }, " ⚙ ", 2)
      ]),
      N(y) === "browse" ? (I(), F("div", Qu, [
        g("div", Xu, [
          g("div", Zu, [
            ge(g("input", {
              "onUpdate:modelValue": D[3] || (D[3] = (q) => /* @__PURE__ */ se(r) ? r.value = q : null),
              class: "at-input",
              placeholder: "Search Civitai…",
              onKeyup: Pc(_, ["enter"])
            }, null, 544), [
              [St, N(r)]
            ]),
            g("button", {
              type: "button",
              class: "at-btn",
              disabled: N(o),
              onClick: _
            }, "Search", 8, ef),
            g("button", {
              type: "button",
              class: ot(["at-btn", { "at-btn--on": N(f) }]),
              onClick: D[4] || (D[4] = (q) => N(t).setBatchMode(!N(f)))
            }, re(N(f) ? "Exit batch" : "Batch select"), 3)
          ]),
          Pe(Aa),
          N(f) && N(u).size ? (I(), F("div", tf, [
            g("span", null, re(N(u).size) + " selected", 1),
            g("button", {
              type: "button",
              class: "at-btn at-btn--sm",
              onClick: G
            }, "Download selected"),
            g("button", {
              type: "button",
              class: "at-btn at-btn--sm at-btn--ghost",
              onClick: D[5] || (D[5] = //@ts-ignore
              (...q) => N(t).clearBatch && N(t).clearBatch(...q))
            }, "Clear")
          ])) : ne("", !0),
          N(l) ? (I(), F("p", sf, re(N(l)), 1)) : ne("", !0)
        ]),
        N(c) || N(i) ? (I(), F("div", nf, [
          N(c) ? (I(), F("p", of, "Loading model…")) : N(i) ? (I(), Gs(Eu, {
            key: 1,
            model: N(i),
            onClose: D[6] || (D[6] = (q) => N(t).closeDetail()),
            onDownloaded: D[7] || (D[7] = (q) => b()),
            onError: O
          }, null, 8, ["model"])) : ne("", !0)
        ])) : ne("", !0),
        g("div", lf, [
          Pe(Wa),
          N(v) ? (I(), F("button", {
            key: 0,
            type: "button",
            class: "at-btn at-btn--block",
            disabled: N(o),
            onClick: D[8] || (D[8] = (q) => N(t).loadMore())
          }, " Load more ", 8, rf)) : ne("", !0)
        ])
      ])) : N(y) === "downloads" ? (I(), F("div", cf, [
        N(s).error ? (I(), F("p", af, re(N(s).error), 1)) : ne("", !0),
        g("ul", uf, [
          (I(!0), F(_e, null, Je(N(m), (q) => (I(), F("li", {
            key: q.id,
            class: "at-dl"
          }, [
            g("div", ff, [
              Fo(q.cover_thumb_url) ? (I(), F("img", {
                key: 0,
                class: "at-dl__thumb",
                src: Fo(q.cover_thumb_url),
                alt: ""
              }, null, 8, df)) : ne("", !0),
              g("div", hf, [
                g("div", pf, re(q.display_name || q.filename) + " — " + re(q.state), 1),
                q.error_message ? (I(), F("div", gf, re(q.error_message), 1)) : ne("", !0),
                q.total_bytes ? (I(), F("div", _f, [
                  g("div", {
                    class: "at-dl__fill",
                    style: Ns({ width: `${Math.min(100, Math.round(100 * q.bytes_done / (q.total_bytes || 1)))}%` })
                  }, null, 4)
                ])) : ne("", !0)
              ])
            ]),
            g("div", mf, [
              U(q.state) ? (I(), F("button", {
                key: 0,
                type: "button",
                class: "at-btn at-btn--sm",
                onClick: (oe) => E(q.id)
              }, "Cancel", 8, bf)) : ne("", !0),
              Y(q.state) ? (I(), F("button", {
                key: 1,
                type: "button",
                class: "at-btn at-btn--sm",
                onClick: (oe) => H(q.id)
              }, "Pause", 8, yf)) : ne("", !0),
              z(q.state) ? (I(), F("button", {
                key: 2,
                type: "button",
                class: "at-btn at-btn--sm",
                onClick: (oe) => T(q.id)
              }, "Retry", 8, vf)) : ne("", !0),
              X(q.state) ? (I(), F("button", {
                key: 3,
                type: "button",
                class: "at-btn at-btn--sm",
                onClick: (oe) => ee(q.id)
              }, "Remove", 8, wf)) : ne("", !0)
            ])
          ]))), 128))
        ])
      ])) : (I(), F("div", Sf, [
        Pe(Gu)
      ]))
    ]));
  }
}), Cf = /* @__PURE__ */ Et(xf, [["__scopeId", "data-v-74cefd3e"]]);
function $f(e) {
  const t = Lc(), s = Rc(Cf);
  return s.use(t), s.mount(e), s;
}
export {
  $f as mount
};
