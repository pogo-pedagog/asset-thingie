/**
* @vue/shared v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function wn(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const s of t.split(",")) e[s] = 1;
  return (s) => s in e;
}
const it = {}, Fe = [], Kt = () => {
}, Lo = () => !1, Ps = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Rs = (t) => t.startsWith("onUpdate:"), gt = Object.assign, xn = (t, e) => {
  const s = t.indexOf(e);
  s > -1 && t.splice(s, 1);
}, Xi = Object.prototype.hasOwnProperty, st = (t, e) => Xi.call(t, e), B = Array.isArray, Le = (t) => as(t) === "[object Map]", Is = (t) => as(t) === "[object Set]", qn = (t) => as(t) === "[object Date]", G = (t) => typeof t == "function", ft = (t) => typeof t == "string", Ot = (t) => typeof t == "symbol", nt = (t) => t !== null && typeof t == "object", Do = (t) => (nt(t) || G(t)) && G(t.then) && G(t.catch), jo = Object.prototype.toString, as = (t) => jo.call(t), Zi = (t) => as(t).slice(8, -1), No = (t) => as(t) === "[object Object]", Fs = (t) => ft(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Je = /* @__PURE__ */ wn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ls = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return ((s) => e[s] || (e[s] = t(s)));
}, tr = /-\w/g, Pt = Ls(
  (t) => t.replace(tr, (e) => e.slice(1).toUpperCase())
), er = /\B([A-Z])/g, Ae = Ls(
  (t) => t.replace(er, "-$1").toLowerCase()
), Ho = Ls((t) => t.charAt(0).toUpperCase() + t.slice(1)), Qs = Ls(
  (t) => t ? `on${Ho(t)}` : ""
), Bt = (t, e) => !Object.is(t, e), vs = (t, ...e) => {
  for (let s = 0; s < t.length; s++)
    t[s](...e);
}, Vo = (t, e, s, n = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Ds = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Gn;
const js = () => Gn || (Gn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Cn(t) {
  if (B(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++) {
      const n = t[s], o = ft(n) ? ir(n) : Cn(n);
      if (o)
        for (const i in o)
          e[i] = o[i];
    }
    return e;
  } else if (ft(t) || nt(t))
    return t;
}
const sr = /;(?![^(]*\))/g, nr = /:([^]+)/, or = /\/\*[^]*?\*\//g;
function ir(t) {
  const e = {};
  return t.replace(or, "").split(sr).forEach((s) => {
    if (s) {
      const n = s.split(nr);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function Mt(t) {
  let e = "";
  if (ft(t))
    e = t;
  else if (B(t))
    for (let s = 0; s < t.length; s++) {
      const n = Mt(t[s]);
      n && (e += n + " ");
    }
  else if (nt(t))
    for (const s in t)
      t[s] && (e += s + " ");
  return e.trim();
}
const rr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", lr = /* @__PURE__ */ wn(rr);
function Uo(t) {
  return !!t || t === "";
}
function cr(t, e) {
  if (t.length !== e.length) return !1;
  let s = !0;
  for (let n = 0; s && n < t.length; n++)
    s = us(t[n], e[n]);
  return s;
}
function us(t, e) {
  if (t === e) return !0;
  let s = qn(t), n = qn(e);
  if (s || n)
    return s && n ? t.getTime() === e.getTime() : !1;
  if (s = Ot(t), n = Ot(e), s || n)
    return t === e;
  if (s = B(t), n = B(e), s || n)
    return s && n ? cr(t, e) : !1;
  if (s = nt(t), n = nt(e), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(t).length, i = Object.keys(e).length;
    if (o !== i)
      return !1;
    for (const r in t) {
      const l = t.hasOwnProperty(r), c = e.hasOwnProperty(r);
      if (l && !c || !l && c || !us(t[r], e[r]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function ar(t, e) {
  return t.findIndex((s) => us(s, e));
}
const Bo = (t) => !!(t && t.__v_isRef === !0), q = (t) => ft(t) ? t : t == null ? "" : B(t) || nt(t) && (t.toString === jo || !G(t.toString)) ? Bo(t) ? q(t.value) : JSON.stringify(t, Ko, 2) : String(t), Ko = (t, e) => Bo(e) ? Ko(t, e.value) : Le(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (s, [n, o], i) => (s[zs(n, i) + " =>"] = o, s),
    {}
  )
} : Is(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((s) => zs(s))
} : Ot(e) ? zs(e) : nt(e) && !B(e) && !No(e) ? String(e) : e, zs = (t, e = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ot(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t
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
function Go() {
  return mt;
}
function ur(t, e = !1) {
  mt && mt.cleanups.push(t);
}
let rt;
const Xs = /* @__PURE__ */ new WeakSet();
class Jo {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, mt && mt.active && mt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Xs.has(this) && (Xs.delete(this), this.trigger()));
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
    this.flags |= 2, Jn(this), zo(this);
    const e = rt, s = Rt;
    rt = this, Rt = !0;
    try {
      return this.fn();
    } finally {
      Xo(this), rt = e, Rt = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        An(e);
      this.deps = this.depsTail = void 0, Jn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Xs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    cn(this) && this.run();
  }
  get dirty() {
    return cn(this);
  }
}
let Yo = 0, Ye, Qe;
function Qo(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Qe, Qe = t;
    return;
  }
  t.next = Ye, Ye = t;
}
function $n() {
  Yo++;
}
function Tn() {
  if (--Yo > 0)
    return;
  if (Qe) {
    let e = Qe;
    for (Qe = void 0; e; ) {
      const s = e.next;
      e.next = void 0, e.flags &= -9, e = s;
    }
  }
  let t;
  for (; Ye; ) {
    let e = Ye;
    for (Ye = void 0; e; ) {
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
    n.version === -1 ? (n === s && (s = o), An(n), fr(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  t.deps = e, t.depsTail = s;
}
function cn(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Zo(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Zo(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === ns) || (t.globalVersion = ns, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !cn(t))))
    return;
  t.flags |= 2;
  const e = t.dep, s = rt, n = Rt;
  rt = t, Rt = !0;
  try {
    zo(t);
    const o = t.fn(t._value);
    (e.version === 0 || Bt(o, t._value)) && (t.flags |= 128, t._value = o, e.version++);
  } catch (o) {
    throw e.version++, o;
  } finally {
    rt = s, Rt = n, Xo(t), t.flags &= -3;
  }
}
function An(t, e = !1) {
  const { dep: s, prevSub: n, nextSub: o } = t;
  if (n && (n.nextSub = o, t.prevSub = void 0), o && (o.prevSub = n, t.nextSub = void 0), s.subs === t && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      An(i, !0);
  }
  !e && !--s.sc && s.map && s.map.delete(s.key);
}
function fr(t) {
  const { prevDep: e, nextDep: s } = t;
  e && (e.nextDep = s, t.prevDep = void 0), s && (s.prevDep = e, t.nextDep = void 0);
}
let Rt = !0;
const ti = [];
function ie() {
  ti.push(Rt), Rt = !1;
}
function re() {
  const t = ti.pop();
  Rt = t === void 0 ? !0 : t;
}
function Jn(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const s = rt;
    rt = void 0;
    try {
      e();
    } finally {
      rt = s;
    }
  }
}
let ns = 0;
class dr {
  constructor(e, s) {
    this.sub = e, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class En {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!rt || !Rt || rt === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== rt)
      s = this.activeLink = new dr(rt, this), rt.deps ? (s.prevDep = rt.depsTail, rt.depsTail.nextDep = s, rt.depsTail = s) : rt.deps = rt.depsTail = s, ei(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = rt.depsTail, s.nextDep = void 0, rt.depsTail.nextDep = s, rt.depsTail = s, rt.deps === s && (rt.deps = n);
    }
    return s;
  }
  trigger(e) {
    this.version++, ns++, this.notify(e);
  }
  notify(e) {
    $n();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Tn();
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
const ws = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ Symbol(
  ""
), an = /* @__PURE__ */ Symbol(
  ""
), os = /* @__PURE__ */ Symbol(
  ""
);
function vt(t, e, s) {
  if (Rt && rt) {
    let n = ws.get(t);
    n || ws.set(t, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new En()), o.map = n, o.key = s), o.track();
  }
}
function ne(t, e, s, n, o, i) {
  const r = ws.get(t);
  if (!r) {
    ns++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ($n(), e === "clear")
    r.forEach(l);
  else {
    const c = B(t), f = c && Fs(s);
    if (c && s === "length") {
      const a = Number(n);
      r.forEach((h, p) => {
        (p === "length" || p === os || !Ot(p) && p >= a) && l(h);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), f && l(r.get(os)), e) {
        case "add":
          c ? f && l(r.get("length")) : (l(r.get($e)), Le(t) && l(r.get(an)));
          break;
        case "delete":
          c || (l(r.get($e)), Le(t) && l(r.get(an)));
          break;
        case "set":
          Le(t) && l(r.get($e));
          break;
      }
  }
  Tn();
}
function hr(t, e) {
  const s = ws.get(t);
  return s && s.get(e);
}
function Pe(t) {
  const e = /* @__PURE__ */ z(t);
  return e === t ? e : (vt(e, "iterate", os), /* @__PURE__ */ At(t) ? e : e.map(Ft));
}
function Ns(t) {
  return vt(t = /* @__PURE__ */ z(t), "iterate", os), t;
}
function Vt(t, e) {
  return /* @__PURE__ */ le(t) ? Ne(/* @__PURE__ */ Wt(t) ? Ft(e) : e) : Ft(e);
}
const pr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Zs(this, Symbol.iterator, (t) => Vt(this, t));
  },
  concat(...t) {
    return Pe(this).concat(
      ...t.map((e) => B(e) ? Pe(e) : e)
    );
  },
  entries() {
    return Zs(this, "entries", (t) => (t[1] = Vt(this, t[1]), t));
  },
  every(t, e) {
    return te(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return te(
      this,
      "filter",
      t,
      e,
      (s) => s.map((n) => Vt(this, n)),
      arguments
    );
  },
  find(t, e) {
    return te(
      this,
      "find",
      t,
      e,
      (s) => Vt(this, s),
      arguments
    );
  },
  findIndex(t, e) {
    return te(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return te(
      this,
      "findLast",
      t,
      e,
      (s) => Vt(this, s),
      arguments
    );
  },
  findLastIndex(t, e) {
    return te(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return te(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return tn(this, "includes", t);
  },
  indexOf(...t) {
    return tn(this, "indexOf", t);
  },
  join(t) {
    return Pe(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return tn(this, "lastIndexOf", t);
  },
  map(t, e) {
    return te(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Ke(this, "pop");
  },
  push(...t) {
    return Ke(this, "push", t);
  },
  reduce(t, ...e) {
    return Yn(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Yn(this, "reduceRight", t, e);
  },
  shift() {
    return Ke(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return te(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Ke(this, "splice", t);
  },
  toReversed() {
    return Pe(this).toReversed();
  },
  toSorted(t) {
    return Pe(this).toSorted(t);
  },
  toSpliced(...t) {
    return Pe(this).toSpliced(...t);
  },
  unshift(...t) {
    return Ke(this, "unshift", t);
  },
  values() {
    return Zs(this, "values", (t) => Vt(this, t));
  }
};
function Zs(t, e, s) {
  const n = Ns(t), o = n[e]();
  return n !== t && !/* @__PURE__ */ At(t) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = s(i.value)), i;
  }), o;
}
const _r = Array.prototype;
function te(t, e, s, n, o, i) {
  const r = Ns(t), l = r !== t && !/* @__PURE__ */ At(t), c = r[e];
  if (c !== _r[e]) {
    const h = c.apply(t, i);
    return l ? Ft(h) : h;
  }
  let f = s;
  r !== t && (l ? f = function(h, p) {
    return s.call(this, Vt(t, h), p, t);
  } : s.length > 2 && (f = function(h, p) {
    return s.call(this, h, p, t);
  }));
  const a = c.call(r, f, n);
  return l && o ? o(a) : a;
}
function Yn(t, e, s, n) {
  const o = Ns(t), i = o !== t && !/* @__PURE__ */ At(t);
  let r = s, l = !1;
  o !== t && (i ? (l = n.length === 0, r = function(f, a, h) {
    return l && (l = !1, f = Vt(t, f)), s.call(this, f, Vt(t, a), h, t);
  }) : s.length > 3 && (r = function(f, a, h) {
    return s.call(this, f, a, h, t);
  }));
  const c = o[e](r, ...n);
  return l ? Vt(t, c) : c;
}
function tn(t, e, s) {
  const n = /* @__PURE__ */ z(t);
  vt(n, "iterate", os);
  const o = n[e](...s);
  return (o === -1 || o === !1) && /* @__PURE__ */ Vs(s[0]) ? (s[0] = /* @__PURE__ */ z(s[0]), n[e](...s)) : o;
}
function Ke(t, e, s = []) {
  ie(), $n();
  const n = (/* @__PURE__ */ z(t))[e].apply(t, s);
  return Tn(), re(), n;
}
const gr = /* @__PURE__ */ wn("__proto__,__v_isRef,__isVue"), si = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Ot)
);
function mr(t) {
  Ot(t) || (t = String(t));
  const e = /* @__PURE__ */ z(this);
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
      return n === (o ? i ? Ar : li : i ? ri : ii).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    const r = B(e);
    if (!o) {
      let c;
      if (r && (c = pr[s]))
        return c;
      if (s === "hasOwnProperty")
        return mr;
    }
    const l = Reflect.get(
      e,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ lt(e) ? e : n
    );
    if ((Ot(s) ? si.has(s) : gr(s)) || (o || vt(e, "get", s), i))
      return l;
    if (/* @__PURE__ */ lt(l)) {
      const c = r && Fs(s) ? l : l.value;
      return o && nt(c) ? /* @__PURE__ */ fn(c) : c;
    }
    return nt(l) ? o ? /* @__PURE__ */ fn(l) : /* @__PURE__ */ Hs(l) : l;
  }
}
class oi extends ni {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, o) {
    let i = e[s];
    const r = B(e) && Fs(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ le(i);
      if (!/* @__PURE__ */ At(n) && !/* @__PURE__ */ le(n) && (i = /* @__PURE__ */ z(i), n = /* @__PURE__ */ z(n)), !r && /* @__PURE__ */ lt(i) && !/* @__PURE__ */ lt(n))
        return f || (i.value = n), !0;
    }
    const l = r ? Number(s) < e.length : st(e, s), c = Reflect.set(
      e,
      s,
      n,
      /* @__PURE__ */ lt(e) ? e : o
    );
    return e === /* @__PURE__ */ z(o) && (l ? Bt(n, i) && ne(e, "set", s, n) : ne(e, "add", s, n)), c;
  }
  deleteProperty(e, s) {
    const n = st(e, s);
    e[s];
    const o = Reflect.deleteProperty(e, s);
    return o && n && ne(e, "delete", s, void 0), o;
  }
  has(e, s) {
    const n = Reflect.has(e, s);
    return (!Ot(s) || !si.has(s)) && vt(e, "has", s), n;
  }
  ownKeys(e) {
    return vt(
      e,
      "iterate",
      B(e) ? "length" : $e
    ), Reflect.ownKeys(e);
  }
}
class vr extends ni {
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
const yr = /* @__PURE__ */ new oi(), br = /* @__PURE__ */ new vr(), Sr = /* @__PURE__ */ new oi(!0);
const un = (t) => t, ps = (t) => Reflect.getPrototypeOf(t);
function wr(t, e, s) {
  return function(...n) {
    const o = this.__v_raw, i = /* @__PURE__ */ z(o), r = Le(i), l = t === "entries" || t === Symbol.iterator && r, c = t === "keys" && r, f = o[t](...n), a = s ? un : e ? Ne : Ft;
    return !e && vt(
      i,
      "iterate",
      c ? an : $e
    ), gt(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: p } = f.next();
          return p ? { value: h, done: p } : {
            value: l ? [a(h[0]), a(h[1])] : a(h),
            done: p
          };
        }
      }
    );
  };
}
function _s(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function xr(t, e) {
  const s = {
    get(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ z(i), l = /* @__PURE__ */ z(o);
      t || (Bt(o, l) && vt(r, "get", o), vt(r, "get", l));
      const { has: c } = ps(r), f = e ? un : t ? Ne : Ft;
      if (c.call(r, o))
        return f(i.get(o));
      if (c.call(r, l))
        return f(i.get(l));
      i !== r && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !t && vt(/* @__PURE__ */ z(o), "iterate", $e), o.size;
    },
    has(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ z(i), l = /* @__PURE__ */ z(o);
      return t || (Bt(o, l) && vt(r, "has", o), vt(r, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
    },
    forEach(o, i) {
      const r = this, l = r.__v_raw, c = /* @__PURE__ */ z(l), f = e ? un : t ? Ne : Ft;
      return !t && vt(c, "iterate", $e), l.forEach((a, h) => o.call(i, f(a), f(h), r));
    }
  };
  return gt(
    s,
    t ? {
      add: _s("add"),
      set: _s("set"),
      delete: _s("delete"),
      clear: _s("clear")
    } : {
      add(o) {
        const i = /* @__PURE__ */ z(this), r = ps(i), l = /* @__PURE__ */ z(o), c = !e && !/* @__PURE__ */ At(o) && !/* @__PURE__ */ le(o) ? l : o;
        return r.has.call(i, c) || Bt(o, c) && r.has.call(i, o) || Bt(l, c) && r.has.call(i, l) || (i.add(c), ne(i, "add", c, c)), this;
      },
      set(o, i) {
        !e && !/* @__PURE__ */ At(i) && !/* @__PURE__ */ le(i) && (i = /* @__PURE__ */ z(i));
        const r = /* @__PURE__ */ z(this), { has: l, get: c } = ps(r);
        let f = l.call(r, o);
        f || (o = /* @__PURE__ */ z(o), f = l.call(r, o));
        const a = c.call(r, o);
        return r.set(o, i), f ? Bt(i, a) && ne(r, "set", o, i) : ne(r, "add", o, i), this;
      },
      delete(o) {
        const i = /* @__PURE__ */ z(this), { has: r, get: l } = ps(i);
        let c = r.call(i, o);
        c || (o = /* @__PURE__ */ z(o), c = r.call(i, o)), l && l.call(i, o);
        const f = i.delete(o);
        return c && ne(i, "delete", o, void 0), f;
      },
      clear() {
        const o = /* @__PURE__ */ z(this), i = o.size !== 0, r = o.clear();
        return i && ne(
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
    s[o] = wr(o, t, e);
  }), s;
}
function kn(t, e) {
  const s = xr(t, e);
  return (n, o, i) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? n : Reflect.get(
    st(s, o) && o in n ? s : n,
    o,
    i
  );
}
const Cr = {
  get: /* @__PURE__ */ kn(!1, !1)
}, $r = {
  get: /* @__PURE__ */ kn(!1, !0)
}, Tr = {
  get: /* @__PURE__ */ kn(!0, !1)
};
const ii = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), Ar = /* @__PURE__ */ new WeakMap();
function Er(t) {
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
function kr(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Er(Zi(t));
}
// @__NO_SIDE_EFFECTS__
function Hs(t) {
  return /* @__PURE__ */ le(t) ? t : On(
    t,
    !1,
    yr,
    Cr,
    ii
  );
}
// @__NO_SIDE_EFFECTS__
function Or(t) {
  return On(
    t,
    !1,
    Sr,
    $r,
    ri
  );
}
// @__NO_SIDE_EFFECTS__
function fn(t) {
  return On(
    t,
    !0,
    br,
    Tr,
    li
  );
}
function On(t, e, s, n, o) {
  if (!nt(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = kr(t);
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
function Wt(t) {
  return /* @__PURE__ */ le(t) ? /* @__PURE__ */ Wt(t.__v_raw) : !!(t && t.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function le(t) {
  return !!(t && t.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function At(t) {
  return !!(t && t.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Vs(t) {
  return t ? !!t.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function z(t) {
  const e = t && t.__v_raw;
  return e ? /* @__PURE__ */ z(e) : t;
}
function Mn(t) {
  return !st(t, "__v_skip") && Object.isExtensible(t) && Vo(t, "__v_skip", !0), t;
}
const Ft = (t) => nt(t) ? /* @__PURE__ */ Hs(t) : t, Ne = (t) => nt(t) ? /* @__PURE__ */ fn(t) : t;
// @__NO_SIDE_EFFECTS__
function lt(t) {
  return t ? t.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(t) {
  return Mr(t, !1);
}
function Mr(t, e) {
  return /* @__PURE__ */ lt(t) ? t : new Pr(t, e);
}
class Pr {
  constructor(e, s) {
    this.dep = new En(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? e : /* @__PURE__ */ z(e), this._value = s ? e : Ft(e), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ At(e) || /* @__PURE__ */ le(e);
    e = n ? e : /* @__PURE__ */ z(e), Bt(e, s) && (this._rawValue = e, this._value = n ? e : Ft(e), this.dep.trigger());
  }
}
function m(t) {
  return /* @__PURE__ */ lt(t) ? t.value : t;
}
const Rr = {
  get: (t, e, s) => e === "__v_raw" ? t : m(Reflect.get(t, e, s)),
  set: (t, e, s, n) => {
    const o = t[e];
    return /* @__PURE__ */ lt(o) && !/* @__PURE__ */ lt(s) ? (o.value = s, !0) : Reflect.set(t, e, s, n);
  }
};
function ci(t) {
  return /* @__PURE__ */ Wt(t) ? t : new Proxy(t, Rr);
}
// @__NO_SIDE_EFFECTS__
function Ir(t) {
  const e = B(t) ? new Array(t.length) : {};
  for (const s in t)
    e[s] = ai(t, s);
  return e;
}
class Fr {
  constructor(e, s, n) {
    this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = Ot(s) ? s : String(s), this._raw = /* @__PURE__ */ z(e);
    let o = !0, i = e;
    if (!B(e) || Ot(this._key) || !Fs(this._key))
      do
        o = !/* @__PURE__ */ Vs(i) || /* @__PURE__ */ At(i);
      while (o && (i = i.__v_raw));
    this._shallow = o;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = m(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && /* @__PURE__ */ lt(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ lt(s)) {
        s.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    return hr(this._raw, this._key);
  }
}
class Lr {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Dr(t, e, s) {
  return /* @__PURE__ */ lt(t) ? t : G(t) ? new Lr(t) : nt(t) && arguments.length > 1 ? ai(t, e, s) : /* @__PURE__ */ Y(t);
}
function ai(t, e, s) {
  return new Fr(t, e, s);
}
class jr {
  constructor(e, s, n) {
    this.fn = e, this.setter = s, this._value = void 0, this.dep = new En(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ns - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    rt !== this)
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
function Nr(t, e, s = !1) {
  let n, o;
  return G(t) ? n = t : (n = t.get, o = t.set), new jr(n, o, s);
}
const gs = {}, xs = /* @__PURE__ */ new WeakMap();
let we;
function Hr(t, e = !1, s = we) {
  if (s) {
    let n = xs.get(s);
    n || xs.set(s, n = []), n.push(t);
  }
}
function Vr(t, e, s = it) {
  const { immediate: n, deep: o, once: i, scheduler: r, augmentJob: l, call: c } = s, f = (y) => o ? y : /* @__PURE__ */ At(y) || o === !1 || o === 0 ? oe(y, 1) : oe(y);
  let a, h, p, w, P = !1, E = !1;
  if (/* @__PURE__ */ lt(t) ? (h = () => t.value, P = /* @__PURE__ */ At(t)) : /* @__PURE__ */ Wt(t) ? (h = () => f(t), P = !0) : B(t) ? (E = !0, P = t.some((y) => /* @__PURE__ */ Wt(y) || /* @__PURE__ */ At(y)), h = () => t.map((y) => {
    if (/* @__PURE__ */ lt(y))
      return y.value;
    if (/* @__PURE__ */ Wt(y))
      return f(y);
    if (G(y))
      return c ? c(y, 2) : y();
  })) : G(t) ? e ? h = c ? () => c(t, 2) : t : h = () => {
    if (p) {
      ie();
      try {
        p();
      } finally {
        re();
      }
    }
    const y = we;
    we = a;
    try {
      return c ? c(t, 3, [w]) : t(w);
    } finally {
      we = y;
    }
  } : h = Kt, e && o) {
    const y = h, j = o === !0 ? 1 / 0 : o;
    h = () => oe(y(), j);
  }
  const N = Go(), V = () => {
    a.stop(), N && N.active && xn(N.effects, a);
  };
  if (i && e) {
    const y = e;
    e = (...j) => {
      y(...j), V();
    };
  }
  let x = E ? new Array(t.length).fill(gs) : gs;
  const g = (y) => {
    if (!(!(a.flags & 1) || !a.dirty && !y))
      if (e) {
        const j = a.run();
        if (o || P || (E ? j.some((K, F) => Bt(K, x[F])) : Bt(j, x))) {
          p && p();
          const K = we;
          we = a;
          try {
            const F = [
              j,
              // pass undefined as the old value when it's changed for the first time
              x === gs ? void 0 : E && x[0] === gs ? [] : x,
              w
            ];
            x = j, c ? c(e, 3, F) : (
              // @ts-expect-error
              e(...F)
            );
          } finally {
            we = K;
          }
        }
      } else
        a.run();
  };
  return l && l(g), a = new Jo(h), a.scheduler = r ? () => r(g, !1) : g, w = (y) => Hr(y, !1, a), p = a.onStop = () => {
    const y = xs.get(a);
    if (y) {
      if (c)
        c(y, 4);
      else
        for (const j of y) j();
      xs.delete(a);
    }
  }, e ? n ? g(!0) : x = a.run() : r ? r(g.bind(null, !0), !0) : a.run(), V.pause = a.pause.bind(a), V.resume = a.resume.bind(a), V.stop = V, V;
}
function oe(t, e = 1 / 0, s) {
  if (e <= 0 || !nt(t) || t.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(t) || 0) >= e))
    return t;
  if (s.set(t, e), e--, /* @__PURE__ */ lt(t))
    oe(t.value, e, s);
  else if (B(t))
    for (let n = 0; n < t.length; n++)
      oe(t[n], e, s);
  else if (Is(t) || Le(t))
    t.forEach((n) => {
      oe(n, e, s);
    });
  else if (No(t)) {
    for (const n in t)
      oe(t[n], e, s);
    for (const n of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, n) && oe(t[n], e, s);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function fs(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (o) {
    Us(o, e, s);
  }
}
function qt(t, e, s, n) {
  if (G(t)) {
    const o = fs(t, e, s, n);
    return o && Do(o) && o.catch((i) => {
      Us(i, e, s);
    }), o;
  }
  if (B(t)) {
    const o = [];
    for (let i = 0; i < t.length; i++)
      o.push(qt(t[i], e, s, n));
    return o;
  }
}
function Us(t, e, s, n = !0) {
  const o = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = e && e.appContext.config || it;
  if (e) {
    let l = e.parent;
    const c = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](t, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      ie(), fs(i, null, 10, [
        t,
        c,
        f
      ]), re();
      return;
    }
  }
  Ur(t, s, o, n, r);
}
function Ur(t, e, s, n = !0, o = !1) {
  if (o)
    throw t;
  console.error(t);
}
const St = [];
let Ht = -1;
const De = [];
let de = null, Ie = 0;
const ui = /* @__PURE__ */ Promise.resolve();
let Cs = null;
function Pn(t) {
  const e = Cs || ui;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Br(t) {
  let e = Ht + 1, s = St.length;
  for (; e < s; ) {
    const n = e + s >>> 1, o = St[n], i = is(o);
    i < t || i === t && o.flags & 2 ? e = n + 1 : s = n;
  }
  return e;
}
function Rn(t) {
  if (!(t.flags & 1)) {
    const e = is(t), s = St[St.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= is(s) ? St.push(t) : St.splice(Br(e), 0, t), t.flags |= 1, fi();
  }
}
function fi() {
  Cs || (Cs = ui.then(hi));
}
function Kr(t) {
  B(t) ? De.push(...t) : de && t.id === -1 ? de.splice(Ie + 1, 0, t) : t.flags & 1 || (De.push(t), t.flags |= 1), fi();
}
function Qn(t, e, s = Ht + 1) {
  for (; s < St.length; s++) {
    const n = St[s];
    if (n && n.flags & 2) {
      if (t && n.id !== t.uid)
        continue;
      St.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function di(t) {
  if (De.length) {
    const e = [...new Set(De)].sort(
      (s, n) => is(s) - is(n)
    );
    if (De.length = 0, de) {
      de.push(...e);
      return;
    }
    for (de = e, Ie = 0; Ie < de.length; Ie++) {
      const s = de[Ie];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    de = null, Ie = 0;
  }
}
const is = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function hi(t) {
  try {
    for (Ht = 0; Ht < St.length; Ht++) {
      const e = St[Ht];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), fs(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Ht < St.length; Ht++) {
      const e = St[Ht];
      e && (e.flags &= -2);
    }
    Ht = -1, St.length = 0, di(), Cs = null, (St.length || De.length) && hi();
  }
}
let kt = null, pi = null;
function $s(t) {
  const e = kt;
  return kt = t, pi = t && t.type.__scopeId || null, e;
}
function Wr(t, e = kt, s) {
  if (!e || t._n)
    return t;
  const n = (...o) => {
    n._d && ao(-1);
    const i = $s(e);
    let r;
    try {
      r = t(...o);
    } finally {
      $s(i), n._d && ao(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Ts(t, e) {
  if (kt === null)
    return t;
  const s = qs(kt), n = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [i, r, l, c = it] = e[o];
    i && (G(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && oe(r), n.push({
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
function ye(t, e, s, n) {
  const o = t.dirs, i = e && e.dirs;
  for (let r = 0; r < o.length; r++) {
    const l = o[r];
    i && (l.oldValue = i[r].value);
    let c = l.dir[n];
    c && (ie(), qt(c, s, 8, [
      t.el,
      l,
      t,
      e
    ]), re());
  }
}
function qr(t, e) {
  if (wt) {
    let s = wt.provides;
    const n = wt.parent && wt.parent.provides;
    n === s && (s = wt.provides = Object.create(n)), s[t] = e;
  }
}
function ze(t, e, s = !1) {
  const n = Vi();
  if (n || Te) {
    let o = Te ? Te._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && t in o)
      return o[t];
    if (arguments.length > 1)
      return s && G(e) ? e.call(n && n.proxy) : e;
  }
}
function Gr() {
  return !!(Vi() || Te);
}
const Jr = /* @__PURE__ */ Symbol.for("v-scx"), Yr = () => ze(Jr);
function _e(t, e, s) {
  return _i(t, e, s);
}
function _i(t, e, s = it) {
  const { immediate: n, deep: o, flush: i, once: r } = s, l = gt({}, s), c = e && n || !e && i !== "post";
  let f;
  if (ls) {
    if (i === "sync") {
      const w = Yr();
      f = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = Kt, w.resume = Kt, w.pause = Kt, w;
    }
  }
  const a = wt;
  l.call = (w, P, E) => qt(w, a, P, E);
  let h = !1;
  i === "post" ? l.scheduler = (w) => {
    bt(w, a && a.suspense);
  } : i !== "sync" && (h = !0, l.scheduler = (w, P) => {
    P ? w() : Rn(w);
  }), l.augmentJob = (w) => {
    e && (w.flags |= 4), h && (w.flags |= 2, a && (w.id = a.uid, w.i = a));
  };
  const p = Vr(t, e, l);
  return ls && (f ? f.push(p) : c && p()), p;
}
function Qr(t, e, s) {
  const n = this.proxy, o = ft(t) ? t.includes(".") ? gi(n, t) : () => n[t] : t.bind(n, n);
  let i;
  G(e) ? i = e : (i = e.handler, s = e);
  const r = ds(this), l = _i(o, i.bind(n), s);
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
const be = /* @__PURE__ */ new WeakMap(), mi = /* @__PURE__ */ Symbol("_vte"), zr = (t) => t.__isTeleport, xe = (t) => t && (t.disabled || t.disabled === ""), Xr = (t) => t && (t.defer || t.defer === ""), zn = (t) => typeof SVGElement < "u" && t instanceof SVGElement, Xn = (t) => typeof MathMLElement == "function" && t instanceof MathMLElement, dn = (t, e) => {
  const s = t && t.to;
  return ft(s) ? e ? e(s) : null : s;
}, Zr = {
  name: "Teleport",
  __isTeleport: !0,
  process(t, e, s, n, o, i, r, l, c, f) {
    const {
      mc: a,
      pc: h,
      pbc: p,
      o: { insert: w, querySelector: P, createText: E, createComment: N }
    } = f, V = xe(e.props);
    let { dynamicChildren: x } = e;
    const g = (K, F, D) => {
      K.shapeFlag & 16 && a(
        K.children,
        F,
        D,
        o,
        i,
        r,
        l,
        c
      );
    }, y = (K = e) => {
      const F = xe(K.props), D = K.target = dn(K.props, P), W = hn(D, K, E, w);
      D && (r !== "svg" && zn(D) ? r = "svg" : r !== "mathml" && Xn(D) && (r = "mathml"), o && o.isCE && (o.ce._teleportTargets || (o.ce._teleportTargets = /* @__PURE__ */ new Set())).add(D), F || (g(K, D, W), qe(K, !1)));
    }, j = (K) => {
      const F = () => {
        be.get(K) === F && (be.delete(K), xe(K.props) && (g(K, s, K.anchor), qe(K, !0)), y(K));
      };
      be.set(K, F), bt(F, i);
    };
    if (t == null) {
      const K = e.el = E(""), F = e.anchor = E("");
      if (w(K, s, n), w(F, s, n), Xr(e.props) || i && i.pendingBranch) {
        j(e);
        return;
      }
      V && (g(e, s, F), qe(e, !0)), y();
    } else {
      e.el = t.el;
      const K = e.anchor = t.anchor, F = be.get(t);
      if (F) {
        F.flags |= 8, be.delete(t), j(e);
        return;
      }
      e.targetStart = t.targetStart;
      const D = e.target = t.target, W = e.targetAnchor = t.targetAnchor, Z = xe(t.props), dt = Z ? s : D, _t = Z ? K : W;
      if (r === "svg" || zn(D) ? r = "svg" : (r === "mathml" || Xn(D)) && (r = "mathml"), x ? (p(
        t.dynamicChildren,
        x,
        dt,
        o,
        i,
        r,
        l
      ), jn(t, e, !0)) : c || h(
        t,
        e,
        dt,
        _t,
        o,
        i,
        r,
        l,
        !1
      ), V)
        Z ? e.props && t.props && e.props.to !== t.props.to && (e.props.to = t.props.to) : ms(
          e,
          s,
          K,
          f,
          1
        );
      else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
        const ut = e.target = dn(
          e.props,
          P
        );
        ut && ms(
          e,
          ut,
          null,
          f,
          0
        );
      } else Z && ms(
        e,
        D,
        W,
        f,
        1
      );
      qe(e, V);
    }
  },
  remove(t, e, s, { um: n, o: { remove: o } }, i) {
    const {
      shapeFlag: r,
      children: l,
      anchor: c,
      targetStart: f,
      targetAnchor: a,
      target: h,
      props: p
    } = t;
    let w = i || !xe(p);
    const P = be.get(t);
    if (P && (P.flags |= 8, be.delete(t), w = !1), h && (o(f), o(a)), i && o(c), r & 16)
      for (let E = 0; E < l.length; E++) {
        const N = l[E];
        n(
          N,
          e,
          s,
          w,
          !!N.dynamicChildren
        );
      }
  },
  move: ms,
  hydrate: tl
};
function ms(t, e, s, { o: { insert: n }, m: o }, i = 2) {
  i === 0 && n(t.targetAnchor, e, s);
  const { el: r, anchor: l, shapeFlag: c, children: f, props: a } = t, h = i === 2;
  if (h && n(r, e, s), (!h || xe(a)) && c & 16)
    for (let p = 0; p < f.length; p++)
      o(
        f[p],
        e,
        s,
        2
      );
  h && n(l, e, s);
}
function tl(t, e, s, n, o, i, {
  o: { nextSibling: r, parentNode: l, querySelector: c, insert: f, createText: a }
}, h) {
  function p(N, V) {
    let x = V;
    for (; x; ) {
      if (x && x.nodeType === 8) {
        if (x.data === "teleport start anchor")
          e.targetStart = x;
        else if (x.data === "teleport anchor") {
          e.targetAnchor = x, N._lpa = e.targetAnchor && r(e.targetAnchor);
          break;
        }
      }
      x = r(x);
    }
  }
  function w(N, V) {
    V.anchor = h(
      r(N),
      V,
      l(N),
      s,
      n,
      o,
      i
    );
  }
  const P = e.target = dn(
    e.props,
    c
  ), E = xe(e.props);
  if (P) {
    const N = P._lpa || P.firstChild;
    e.shapeFlag & 16 && (E ? (w(t, e), p(P, N), e.targetAnchor || hn(
      P,
      e,
      a,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(t) === P ? t : null
    )) : (e.anchor = r(t), p(P, N), e.targetAnchor || hn(P, e, a, f), h(
      N && r(N),
      e,
      P,
      s,
      n,
      o,
      i
    ))), qe(e, E);
  } else E && e.shapeFlag & 16 && (w(t, e), e.targetStart = t, e.targetAnchor = r(t));
  return e.anchor && r(e.anchor);
}
const el = Zr;
function qe(t, e) {
  const s = t.ctx;
  if (s && s.ut) {
    let n, o;
    for (e ? (n = t.el, o = t.anchor) : (n = t.targetStart, o = t.targetAnchor); n && n !== o; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function hn(t, e, s, n, o = null) {
  const i = e.targetStart = s(""), r = e.targetAnchor = s("");
  return i[mi] = r, t && (n(i, t, o), n(r, t, o)), r;
}
const sl = /* @__PURE__ */ Symbol("_leaveCb");
function In(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, In(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
// @__NO_SIDE_EFFECTS__
function Gt(t, e) {
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
const As = /* @__PURE__ */ new WeakMap();
function Xe(t, e, s, n, o = !1) {
  if (B(t)) {
    t.forEach(
      (E, N) => Xe(
        E,
        e && (B(e) ? e[N] : e),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Ze(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Xe(t, e, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? qs(n.component) : n.el, r = o ? null : i, { i: l, r: c } = t, f = e && e.r, a = l.refs === it ? l.refs = {} : l.refs, h = l.setupState, p = /* @__PURE__ */ z(h), w = h === it ? Lo : (E) => Zn(a, E) ? !1 : st(p, E), P = (E, N) => !(N && Zn(a, N));
  if (f != null && f !== c) {
    if (to(e), ft(f))
      a[f] = null, w(f) && (h[f] = null);
    else if (/* @__PURE__ */ lt(f)) {
      const E = e;
      P(f, E.k) && (f.value = null), E.k && (a[E.k] = null);
    }
  }
  if (G(c))
    fs(c, l, 12, [r, a]);
  else {
    const E = ft(c), N = /* @__PURE__ */ lt(c);
    if (E || N) {
      const V = () => {
        if (t.f) {
          const x = E ? w(c) ? h[c] : a[c] : P() || !t.k ? c.value : a[t.k];
          if (o)
            B(x) && xn(x, i);
          else if (B(x))
            x.includes(i) || x.push(i);
          else if (E)
            a[c] = [i], w(c) && (h[c] = a[c]);
          else {
            const g = [i];
            P(c, t.k) && (c.value = g), t.k && (a[t.k] = g);
          }
        } else E ? (a[c] = r, w(c) && (h[c] = r)) : N && (P(c, t.k) && (c.value = r), t.k && (a[t.k] = r));
      };
      if (r) {
        const x = () => {
          V(), As.delete(t);
        };
        x.id = -1, As.set(t, x), bt(x, s);
      } else
        to(t), V();
    }
  }
}
function to(t) {
  const e = As.get(t);
  e && (e.flags |= 8, As.delete(t));
}
js().requestIdleCallback;
js().cancelIdleCallback;
const Ze = (t) => !!t.type.__asyncLoader, yi = (t) => t.type.__isKeepAlive;
function nl(t, e) {
  bi(t, "a", e);
}
function ol(t, e) {
  bi(t, "da", e);
}
function bi(t, e, s = wt) {
  const n = t.__wdc || (t.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return t();
  });
  if (Bs(e, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      yi(o.parent.vnode) && il(n, e, s, o), o = o.parent;
  }
}
function il(t, e, s, n) {
  const o = Bs(
    e,
    t,
    n,
    !0
    /* prepend */
  );
  Fn(() => {
    xn(n[e], o);
  }, s);
}
function Bs(t, e, s = wt, n = !1) {
  if (s) {
    const o = s[t] || (s[t] = []), i = e.__weh || (e.__weh = (...r) => {
      ie();
      const l = ds(s), c = qt(e, s, t, r);
      return l(), re(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const ce = (t) => (e, s = wt) => {
  (!ls || t === "sp") && Bs(t, (...n) => e(...n), s);
}, rl = ce("bm"), Si = ce("m"), ll = ce(
  "bu"
), cl = ce("u"), al = ce(
  "bum"
), Fn = ce("um"), ul = ce(
  "sp"
), fl = ce("rtg"), dl = ce("rtc");
function hl(t, e = wt) {
  Bs("ec", t, e);
}
const pl = /* @__PURE__ */ Symbol.for("v-ndc");
function Et(t, e, s, n) {
  let o;
  const i = s, r = B(t);
  if (r || ft(t)) {
    const l = r && /* @__PURE__ */ Wt(t);
    let c = !1, f = !1;
    l && (c = !/* @__PURE__ */ At(t), f = /* @__PURE__ */ le(t), t = Ns(t)), o = new Array(t.length);
    for (let a = 0, h = t.length; a < h; a++)
      o[a] = e(
        c ? f ? Ne(Ft(t[a])) : Ft(t[a]) : t[a],
        a,
        void 0,
        i
      );
  } else if (typeof t == "number") {
    o = new Array(t);
    for (let l = 0; l < t; l++)
      o[l] = e(l + 1, l, void 0, i);
  } else if (nt(t))
    if (t[Symbol.iterator])
      o = Array.from(
        t,
        (l, c) => e(l, c, void 0, i)
      );
    else {
      const l = Object.keys(t);
      o = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const a = l[c];
        o[c] = e(t[a], a, c, i);
      }
    }
  else
    o = [];
  return o;
}
const pn = (t) => t ? Ui(t) ? qs(t) : pn(t.parent) : null, ts = (
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
    $parent: (t) => pn(t.parent),
    $root: (t) => pn(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => xi(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Rn(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Pn.bind(t.proxy)),
    $watch: (t) => Qr.bind(t)
  })
), en = (t, e) => t !== it && !t.__isScriptSetup && st(t, e), _l = {
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
        if (en(n, e))
          return r[e] = 1, n[e];
        if (o !== it && st(o, e))
          return r[e] = 2, o[e];
        if (st(i, e))
          return r[e] = 3, i[e];
        if (s !== it && st(s, e))
          return r[e] = 4, s[e];
        _n && (r[e] = 0);
      }
    }
    const f = ts[e];
    let a, h;
    if (f)
      return e === "$attrs" && vt(t.attrs, "get", ""), f(t);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[e])
    )
      return a;
    if (s !== it && st(s, e))
      return r[e] = 4, s[e];
    if (
      // global properties
      h = c.config.globalProperties, st(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, s) {
    const { data: n, setupState: o, ctx: i } = t;
    return en(o, e) ? (o[e] = s, !0) : n !== it && st(n, e) ? (n[e] = s, !0) : st(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = s, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: s, ctx: n, appContext: o, props: i, type: r }
  }, l) {
    let c;
    return !!(s[l] || t !== it && l[0] !== "$" && st(t, l) || en(e, l) || st(i, l) || st(n, l) || st(ts, l) || st(o.config.globalProperties, l) || (c = r.__cssModules) && c[l]);
  },
  defineProperty(t, e, s) {
    return s.get != null ? t._.accessCache[e] = 0 : st(s, "value") && this.set(t, e, s.value, null), Reflect.defineProperty(t, e, s);
  }
};
function eo(t) {
  return B(t) ? t.reduce(
    (e, s) => (e[s] = null, e),
    {}
  ) : t;
}
let _n = !0;
function gl(t) {
  const e = xi(t), s = t.proxy, n = t.ctx;
  _n = !1, e.beforeCreate && so(e.beforeCreate, t, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: r,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: a,
    beforeMount: h,
    mounted: p,
    beforeUpdate: w,
    updated: P,
    activated: E,
    deactivated: N,
    beforeDestroy: V,
    beforeUnmount: x,
    destroyed: g,
    unmounted: y,
    render: j,
    renderTracked: K,
    renderTriggered: F,
    errorCaptured: D,
    serverPrefetch: W,
    // public API
    expose: Z,
    inheritAttrs: dt,
    // assets
    components: _t,
    directives: ut,
    filters: ue
  } = e;
  if (f && ml(f, n, null), r)
    for (const Q in r) {
      const et = r[Q];
      G(et) && (n[Q] = et.bind(s));
    }
  if (o) {
    const Q = o.call(s, s);
    nt(Q) && (t.data = /* @__PURE__ */ Hs(Q));
  }
  if (_n = !0, i)
    for (const Q in i) {
      const et = i[Q], Qt = G(et) ? et.bind(s, s) : G(et.get) ? et.get.bind(s, s) : Kt, Oe = !G(et) && G(et.set) ? et.set.bind(s) : Kt, zt = pt({
        get: Qt,
        set: Oe
      });
      Object.defineProperty(n, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => zt.value,
        set: (Ct) => zt.value = Ct
      });
    }
  if (l)
    for (const Q in l)
      wi(l[Q], n, s, Q);
  if (c) {
    const Q = G(c) ? c.call(s) : c;
    Reflect.ownKeys(Q).forEach((et) => {
      qr(et, Q[et]);
    });
  }
  a && so(a, t, "c");
  function at(Q, et) {
    B(et) ? et.forEach((Qt) => Q(Qt.bind(s))) : et && Q(et.bind(s));
  }
  if (at(rl, h), at(Si, p), at(ll, w), at(cl, P), at(nl, E), at(ol, N), at(hl, D), at(dl, K), at(fl, F), at(al, x), at(Fn, y), at(ul, W), B(Z))
    if (Z.length) {
      const Q = t.exposed || (t.exposed = {});
      Z.forEach((et) => {
        Object.defineProperty(Q, et, {
          get: () => s[et],
          set: (Qt) => s[et] = Qt,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  j && t.render === Kt && (t.render = j), dt != null && (t.inheritAttrs = dt), _t && (t.components = _t), ut && (t.directives = ut), W && vi(t);
}
function ml(t, e, s = Kt) {
  B(t) && (t = gn(t));
  for (const n in t) {
    const o = t[n];
    let i;
    nt(o) ? "default" in o ? i = ze(
      o.from || n,
      o.default,
      !0
    ) : i = ze(o.from || n) : i = ze(o), /* @__PURE__ */ lt(i) ? Object.defineProperty(e, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : e[n] = i;
  }
}
function so(t, e, s) {
  qt(
    B(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy),
    e,
    s
  );
}
function wi(t, e, s, n) {
  let o = n.includes(".") ? gi(s, n) : () => s[n];
  if (ft(t)) {
    const i = e[t];
    G(i) && _e(o, i);
  } else if (G(t))
    _e(o, t.bind(s));
  else if (nt(t))
    if (B(t))
      t.forEach((i) => wi(i, e, s, n));
    else {
      const i = G(t.handler) ? t.handler.bind(s) : e[t.handler];
      G(i) && _e(o, i, t);
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
    (f) => Es(c, f, r, !0)
  ), Es(c, e, r)), nt(e) && i.set(e, c), c;
}
function Es(t, e, s, n = !1) {
  const { mixins: o, extends: i } = e;
  i && Es(t, i, s, !0), o && o.forEach(
    (r) => Es(t, r, s, !0)
  );
  for (const r in e)
    if (!(n && r === "expose")) {
      const l = vl[r] || s && s[r];
      t[r] = l ? l(t[r], e[r]) : e[r];
    }
  return t;
}
const vl = {
  data: no,
  props: oo,
  emits: oo,
  // objects
  methods: Ge,
  computed: Ge,
  // lifecycle
  beforeCreate: yt,
  created: yt,
  beforeMount: yt,
  mounted: yt,
  beforeUpdate: yt,
  updated: yt,
  beforeDestroy: yt,
  beforeUnmount: yt,
  destroyed: yt,
  unmounted: yt,
  activated: yt,
  deactivated: yt,
  errorCaptured: yt,
  serverPrefetch: yt,
  // assets
  components: Ge,
  directives: Ge,
  // watch
  watch: bl,
  // provide / inject
  provide: no,
  inject: yl
};
function no(t, e) {
  return e ? t ? function() {
    return gt(
      G(t) ? t.call(this, this) : t,
      G(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function yl(t, e) {
  return Ge(gn(t), gn(e));
}
function gn(t) {
  if (B(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++)
      e[t[s]] = t[s];
    return e;
  }
  return t;
}
function yt(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Ge(t, e) {
  return t ? gt(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function oo(t, e) {
  return t ? B(t) && B(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : gt(
    /* @__PURE__ */ Object.create(null),
    eo(t),
    eo(e ?? {})
  ) : e;
}
function bl(t, e) {
  if (!t) return e;
  if (!e) return t;
  const s = gt(/* @__PURE__ */ Object.create(null), t);
  for (const n in e)
    s[n] = yt(t[n], e[n]);
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
let Sl = 0;
function wl(t, e) {
  return function(n, o = null) {
    G(n) || (n = gt({}, n)), o != null && !nt(o) && (o = null);
    const i = Ci(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = i.app = {
      _uid: Sl++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Zl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...h) {
        return r.has(a) || (a && G(a.install) ? (r.add(a), a.install(f, ...h)) : G(a) && (r.add(a), a(f, ...h))), f;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), f;
      },
      component(a, h) {
        return h ? (i.components[a] = h, f) : i.components[a];
      },
      directive(a, h) {
        return h ? (i.directives[a] = h, f) : i.directives[a];
      },
      mount(a, h, p) {
        if (!c) {
          const w = f._ceVNode || xt(n, o);
          return w.appContext = i, p === !0 ? p = "svg" : p === !1 && (p = void 0), t(w, a, p), c = !0, f._container = a, a.__vue_app__ = f, qs(w.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (qt(
          l,
          f._instance,
          16
        ), t(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, h) {
        return i.provides[a] = h, f;
      },
      runWithContext(a) {
        const h = Te;
        Te = f;
        try {
          return a();
        } finally {
          Te = h;
        }
      }
    };
    return f;
  };
}
let Te = null;
const xl = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Pt(e)}Modifiers`] || t[`${Ae(e)}Modifiers`];
function Cl(t, e, ...s) {
  if (t.isUnmounted) return;
  const n = t.vnode.props || it;
  let o = s;
  const i = e.startsWith("update:"), r = i && xl(n, e.slice(7));
  r && (r.trim && (o = s.map((a) => ft(a) ? a.trim() : a)), r.number && (o = s.map(Ds)));
  let l, c = n[l = Qs(e)] || // also try camelCase event handler (#2249)
  n[l = Qs(Pt(e))];
  !c && i && (c = n[l = Qs(Ae(e))]), c && qt(
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
    t.emitted[l] = !0, qt(
      f,
      t,
      6,
      o
    );
  }
}
const $l = /* @__PURE__ */ new WeakMap();
function $i(t, e, s = !1) {
  const n = s ? $l : e.emitsCache, o = n.get(t);
  if (o !== void 0)
    return o;
  const i = t.emits;
  let r = {}, l = !1;
  if (!G(t)) {
    const c = (f) => {
      const a = $i(f, e, !0);
      a && (l = !0, gt(r, a));
    };
    !s && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  return !i && !l ? (nt(t) && n.set(t, null), null) : (B(i) ? i.forEach((c) => r[c] = null) : gt(r, i), nt(t) && n.set(t, r), r);
}
function Ks(t, e) {
  return !t || !Ps(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), st(t, e[0].toLowerCase() + e.slice(1)) || st(t, Ae(e)) || st(t, e));
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
    renderCache: a,
    props: h,
    data: p,
    setupState: w,
    ctx: P,
    inheritAttrs: E
  } = t, N = $s(t);
  let V, x;
  try {
    if (s.shapeFlag & 4) {
      const y = o || n, j = y;
      V = Ut(
        f.call(
          j,
          y,
          a,
          h,
          w,
          p,
          P
        )
      ), x = l;
    } else {
      const y = e;
      V = Ut(
        y.length > 1 ? y(
          h,
          { attrs: l, slots: r, emit: c }
        ) : y(
          h,
          null
        )
      ), x = e.props ? l : Tl(l);
    }
  } catch (y) {
    es.length = 0, Us(y, t, 1), V = xt(ge);
  }
  let g = V;
  if (x && E !== !1) {
    const y = Object.keys(x), { shapeFlag: j } = g;
    y.length && j & 7 && (i && y.some(Rs) && (x = Al(
      x,
      i
    )), g = He(g, x, !1, !0));
  }
  return s.dirs && (g = He(g, null, !1, !0), g.dirs = g.dirs ? g.dirs.concat(s.dirs) : s.dirs), s.transition && In(g, s.transition), V = g, $s(N), V;
}
const Tl = (t) => {
  let e;
  for (const s in t)
    (s === "class" || s === "style" || Ps(s)) && ((e || (e = {}))[s] = t[s]);
  return e;
}, Al = (t, e) => {
  const s = {};
  for (const n in t)
    (!Rs(n) || !(n.slice(9) in e)) && (s[n] = t[n]);
  return s;
};
function El(t, e, s) {
  const { props: n, children: o, component: i } = t, { props: r, children: l, patchFlag: c } = e, f = i.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? ro(n, r, f) : !!r;
    if (c & 8) {
      const a = e.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const p = a[h];
        if (Ti(r, n, p) && !Ks(f, p))
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
    if (Ti(e, t, i) && !Ks(s, i))
      return !0;
  }
  return !1;
}
function Ti(t, e, s) {
  const n = t[s], o = e[s];
  return s === "style" && nt(n) && nt(o) ? !us(n, o) : n !== o;
}
function kl({ vnode: t, parent: e, suspense: s }, n) {
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
function Ol(t, e, s, n = !1) {
  const o = {}, i = Ei();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Oi(t, e, o, i);
  for (const r in t.propsOptions[0])
    r in o || (o[r] = void 0);
  s ? t.props = n ? o : /* @__PURE__ */ Or(o) : t.type.props ? t.props = o : t.props = i, t.attrs = i;
}
function Ml(t, e, s, n) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: r }
  } = t, l = /* @__PURE__ */ z(o), [c] = t.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const a = t.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let p = a[h];
        if (Ks(t.emitsOptions, p))
          continue;
        const w = e[p];
        if (c)
          if (st(i, p))
            w !== i[p] && (i[p] = w, f = !0);
          else {
            const P = Pt(p);
            o[P] = mn(
              c,
              l,
              P,
              w,
              t,
              !1
            );
          }
        else
          w !== i[p] && (i[p] = w, f = !0);
      }
    }
  } else {
    Oi(t, e, o, i) && (f = !0);
    let a;
    for (const h in l)
      (!e || // for camelCase
      !st(e, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Ae(h)) === h || !st(e, a))) && (c ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[a] !== void 0) && (o[h] = mn(
        c,
        l,
        h,
        void 0,
        t,
        !0
      )) : delete o[h]);
    if (i !== l)
      for (const h in i)
        (!e || !st(e, h)) && (delete i[h], f = !0);
  }
  f && ne(t.attrs, "set", "");
}
function Oi(t, e, s, n) {
  const [o, i] = t.propsOptions;
  let r = !1, l;
  if (e)
    for (let c in e) {
      if (Je(c))
        continue;
      const f = e[c];
      let a;
      o && st(o, a = Pt(c)) ? !i || !i.includes(a) ? s[a] = f : (l || (l = {}))[a] = f : Ks(t.emitsOptions, c) || (!(c in n) || f !== n[c]) && (n[c] = f, r = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ z(s), f = l || it;
    for (let a = 0; a < i.length; a++) {
      const h = i[a];
      s[h] = mn(
        o,
        c,
        h,
        f[h],
        t,
        !st(f, h)
      );
    }
  }
  return r;
}
function mn(t, e, s, n, o, i) {
  const r = t[s];
  if (r != null) {
    const l = st(r, "default");
    if (l && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && G(c)) {
        const { propsDefaults: f } = o;
        if (s in f)
          n = f[s];
        else {
          const a = ds(o);
          n = f[s] = c.call(
            null,
            e
          ), a();
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
    ] && (n === "" || n === Ae(s)) && (n = !0));
  }
  return n;
}
const Pl = /* @__PURE__ */ new WeakMap();
function Mi(t, e, s = !1) {
  const n = s ? Pl : e.propsCache, o = n.get(t);
  if (o)
    return o;
  const i = t.props, r = {}, l = [];
  let c = !1;
  if (!G(t)) {
    const a = (h) => {
      c = !0;
      const [p, w] = Mi(h, e, !0);
      gt(r, p), w && l.push(...w);
    };
    !s && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  if (!i && !c)
    return nt(t) && n.set(t, Fe), Fe;
  if (B(i))
    for (let a = 0; a < i.length; a++) {
      const h = Pt(i[a]);
      lo(h) && (r[h] = it);
    }
  else if (i)
    for (const a in i) {
      const h = Pt(a);
      if (lo(h)) {
        const p = i[a], w = r[h] = B(p) || G(p) ? { type: p } : gt({}, p), P = w.type;
        let E = !1, N = !0;
        if (B(P))
          for (let V = 0; V < P.length; ++V) {
            const x = P[V], g = G(x) && x.name;
            if (g === "Boolean") {
              E = !0;
              break;
            } else g === "String" && (N = !1);
          }
        else
          E = G(P) && P.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = E, w[
          1
          /* shouldCastTrue */
        ] = N, (E || st(w, "default")) && l.push(h);
      }
    }
  const f = [r, l];
  return nt(t) && n.set(t, f), f;
}
function lo(t) {
  return t[0] !== "$" && !Je(t);
}
const Ln = (t) => t === "_" || t === "_ctx" || t === "$stable", Dn = (t) => B(t) ? t.map(Ut) : [Ut(t)], Rl = (t, e, s) => {
  if (e._n)
    return e;
  const n = Wr((...o) => Dn(e(...o)), s);
  return n._c = !1, n;
}, Pi = (t, e, s) => {
  const n = t._ctx;
  for (const o in t) {
    if (Ln(o)) continue;
    const i = t[o];
    if (G(i))
      e[o] = Rl(o, i, n);
    else if (i != null) {
      const r = Dn(i);
      e[o] = () => r;
    }
  }
}, Ri = (t, e) => {
  const s = Dn(e);
  t.slots.default = () => s;
}, Ii = (t, e, s) => {
  for (const n in e)
    (s || !Ln(n)) && (t[n] = e[n]);
}, Il = (t, e, s) => {
  const n = t.slots = Ei();
  if (t.vnode.shapeFlag & 32) {
    const o = e._;
    o ? (Ii(n, e, s), s && Vo(n, "_", o, !0)) : Pi(e, n);
  } else e && Ri(t, e);
}, Fl = (t, e, s) => {
  const { vnode: n, slots: o } = t;
  let i = !0, r = it;
  if (n.shapeFlag & 32) {
    const l = e._;
    l ? s && l === 1 ? i = !1 : Ii(o, e, s) : (i = !e.$stable, Pi(e, o)), r = e;
  } else e && (Ri(t, e), r = { default: 1 });
  if (i)
    for (const l in o)
      !Ln(l) && r[l] == null && delete o[l];
}, bt = Hl;
function Ll(t) {
  return Dl(t);
}
function Dl(t, e) {
  const s = js();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: i,
    createElement: r,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: a,
    parentNode: h,
    nextSibling: p,
    setScopeId: w = Kt,
    insertStaticContent: P
  } = t, E = (u, d, _, b = null, C = null, $ = null, R = void 0, O = null, M = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !We(u, d) && (b = Me(u), Ct(u, C, $, !0), u = null), d.patchFlag === -2 && (M = !1, d.dynamicChildren = null);
    const { type: T, ref: U, shapeFlag: I } = d;
    switch (T) {
      case Ws:
        N(u, d, _, b);
        break;
      case ge:
        V(u, d, _, b);
        break;
      case nn:
        u == null && x(d, _, b, R);
        break;
      case ot:
        _t(
          u,
          d,
          _,
          b,
          C,
          $,
          R,
          O,
          M
        );
        break;
      default:
        I & 1 ? j(
          u,
          d,
          _,
          b,
          C,
          $,
          R,
          O,
          M
        ) : I & 6 ? ut(
          u,
          d,
          _,
          b,
          C,
          $,
          R,
          O,
          M
        ) : (I & 64 || I & 128) && T.process(
          u,
          d,
          _,
          b,
          C,
          $,
          R,
          O,
          M,
          ve
        );
    }
    U != null && C ? Xe(U, u && u.ref, $, d || u, !d) : U == null && u && u.ref != null && Xe(u.ref, null, $, u, !0);
  }, N = (u, d, _, b) => {
    if (u == null)
      n(
        d.el = l(d.children),
        _,
        b
      );
    else {
      const C = d.el = u.el;
      d.children !== u.children && f(C, d.children);
    }
  }, V = (u, d, _, b) => {
    u == null ? n(
      d.el = c(d.children || ""),
      _,
      b
    ) : d.el = u.el;
  }, x = (u, d, _, b) => {
    [u.el, u.anchor] = P(
      u.children,
      d,
      _,
      b,
      u.el,
      u.anchor
    );
  }, g = ({ el: u, anchor: d }, _, b) => {
    let C;
    for (; u && u !== d; )
      C = p(u), n(u, _, b), u = C;
    n(d, _, b);
  }, y = ({ el: u, anchor: d }) => {
    let _;
    for (; u && u !== d; )
      _ = p(u), o(u), u = _;
    o(d);
  }, j = (u, d, _, b, C, $, R, O, M) => {
    if (d.type === "svg" ? R = "svg" : d.type === "math" && (R = "mathml"), u == null)
      K(
        d,
        _,
        b,
        C,
        $,
        R,
        O,
        M
      );
    else {
      const T = u.el && u.el._isVueCE ? u.el : null;
      try {
        T && T._beginPatch(), W(
          u,
          d,
          C,
          $,
          R,
          O,
          M
        );
      } finally {
        T && T._endPatch();
      }
    }
  }, K = (u, d, _, b, C, $, R, O) => {
    let M, T;
    const { props: U, shapeFlag: I, transition: H, dirs: v } = u;
    if (M = u.el = r(
      u.type,
      $,
      U && U.is,
      U
    ), I & 8 ? a(M, u.children) : I & 16 && D(
      u.children,
      M,
      null,
      b,
      C,
      sn(u, $),
      R,
      O
    ), v && ye(u, null, b, "created"), F(M, u, u.scopeId, R, b), U) {
      for (const X in U)
        X !== "value" && !Je(X) && i(M, X, null, U[X], $, b);
      "value" in U && i(M, "value", null, U.value, $), (T = U.onVnodeBeforeMount) && Nt(T, b, u);
    }
    v && ye(u, null, b, "beforeMount");
    const L = jl(C, H);
    L && H.beforeEnter(M), n(M, d, _), ((T = U && U.onVnodeMounted) || L || v) && bt(() => {
      try {
        T && Nt(T, b, u), L && H.enter(M), v && ye(u, null, b, "mounted");
      } finally {
      }
    }, C);
  }, F = (u, d, _, b, C) => {
    if (_ && w(u, _), b)
      for (let $ = 0; $ < b.length; $++)
        w(u, b[$]);
    if (C) {
      let $ = C.subTree;
      if (d === $ || Di($.type) && ($.ssContent === d || $.ssFallback === d)) {
        const R = C.vnode;
        F(
          u,
          R,
          R.scopeId,
          R.slotScopeIds,
          C.parent
        );
      }
    }
  }, D = (u, d, _, b, C, $, R, O, M = 0) => {
    for (let T = M; T < u.length; T++) {
      const U = u[T] = O ? se(u[T]) : Ut(u[T]);
      E(
        null,
        U,
        d,
        _,
        b,
        C,
        $,
        R,
        O
      );
    }
  }, W = (u, d, _, b, C, $, R) => {
    const O = d.el = u.el;
    let { patchFlag: M, dynamicChildren: T, dirs: U } = d;
    M |= u.patchFlag & 16;
    const I = u.props || it, H = d.props || it;
    let v;
    if (_ && Se(_, !1), (v = H.onVnodeBeforeUpdate) && Nt(v, _, d, u), U && ye(d, u, _, "beforeUpdate"), _ && Se(_, !0), (I.innerHTML && H.innerHTML == null || I.textContent && H.textContent == null) && a(O, ""), T ? Z(
      u.dynamicChildren,
      T,
      O,
      _,
      b,
      sn(d, C),
      $
    ) : R || et(
      u,
      d,
      O,
      null,
      _,
      b,
      sn(d, C),
      $,
      !1
    ), M > 0) {
      if (M & 16)
        dt(O, I, H, _, C);
      else if (M & 2 && I.class !== H.class && i(O, "class", null, H.class, C), M & 4 && i(O, "style", I.style, H.style, C), M & 8) {
        const L = d.dynamicProps;
        for (let X = 0; X < L.length; X++) {
          const tt = L[X], ct = I[tt], ht = H[tt];
          (ht !== ct || tt === "value") && i(O, tt, ct, ht, C, _);
        }
      }
      M & 1 && u.children !== d.children && a(O, d.children);
    } else !R && T == null && dt(O, I, H, _, C);
    ((v = H.onVnodeUpdated) || U) && bt(() => {
      v && Nt(v, _, d, u), U && ye(d, u, _, "updated");
    }, b);
  }, Z = (u, d, _, b, C, $, R) => {
    for (let O = 0; O < d.length; O++) {
      const M = u[O], T = d[O], U = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        M.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (M.type === ot || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !We(M, T) || // - In the case of a component, it could contain anything.
        M.shapeFlag & 198) ? h(M.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      E(
        M,
        T,
        U,
        null,
        b,
        C,
        $,
        R,
        !0
      );
    }
  }, dt = (u, d, _, b, C) => {
    if (d !== _) {
      if (d !== it)
        for (const $ in d)
          !Je($) && !($ in _) && i(
            u,
            $,
            d[$],
            null,
            C,
            b
          );
      for (const $ in _) {
        if (Je($)) continue;
        const R = _[$], O = d[$];
        R !== O && $ !== "value" && i(u, $, O, R, C, b);
      }
      "value" in _ && i(u, "value", d.value, _.value, C);
    }
  }, _t = (u, d, _, b, C, $, R, O, M) => {
    const T = d.el = u ? u.el : l(""), U = d.anchor = u ? u.anchor : l("");
    let { patchFlag: I, dynamicChildren: H, slotScopeIds: v } = d;
    v && (O = O ? O.concat(v) : v), u == null ? (n(T, _, b), n(U, _, b), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      _,
      U,
      C,
      $,
      R,
      O,
      M
    )) : I > 0 && I & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === H.length ? (Z(
      u.dynamicChildren,
      H,
      _,
      C,
      $,
      R,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || C && d === C.subTree) && jn(
      u,
      d,
      !0
      /* shallow */
    )) : et(
      u,
      d,
      _,
      U,
      C,
      $,
      R,
      O,
      M
    );
  }, ut = (u, d, _, b, C, $, R, O, M) => {
    d.slotScopeIds = O, u == null ? d.shapeFlag & 512 ? C.ctx.activate(
      d,
      _,
      b,
      R,
      M
    ) : ue(
      d,
      _,
      b,
      C,
      $,
      R,
      M
    ) : ke(u, d, M);
  }, ue = (u, d, _, b, C, $, R) => {
    const O = u.component = Gl(
      u,
      b,
      C
    );
    if (yi(u) && (O.ctx.renderer = ve), Jl(O, !1, R), O.asyncDep) {
      if (C && C.registerDep(O, at, R), !u.el) {
        const M = O.subTree = xt(ge);
        V(null, M, d, _), u.placeholder = M.el;
      }
    } else
      at(
        O,
        u,
        d,
        _,
        C,
        $,
        R
      );
  }, ke = (u, d, _) => {
    const b = d.component = u.component;
    if (El(u, d, _))
      if (b.asyncDep && !b.asyncResolved) {
        Q(b, d, _);
        return;
      } else
        b.next = d, b.update();
    else
      d.el = u.el, b.vnode = d;
  }, at = (u, d, _, b, C, $, R) => {
    const O = () => {
      if (u.isMounted) {
        let { next: I, bu: H, u: v, parent: L, vnode: X } = u;
        {
          const Dt = Fi(u);
          if (Dt) {
            I && (I.el = X.el, Q(u, I, R)), Dt.asyncDep.then(() => {
              bt(() => {
                u.isUnmounted || T();
              }, C);
            });
            return;
          }
        }
        let tt = I, ct;
        Se(u, !1), I ? (I.el = X.el, Q(u, I, R)) : I = X, H && vs(H), (ct = I.props && I.props.onVnodeBeforeUpdate) && Nt(ct, L, I, X), Se(u, !0);
        const ht = io(u), Lt = u.subTree;
        u.subTree = ht, E(
          Lt,
          ht,
          // parent may have changed if it's in a teleport
          h(Lt.el),
          // anchor may have changed if it's in a fragment
          Me(Lt),
          u,
          C,
          $
        ), I.el = ht.el, tt === null && kl(u, ht.el), v && bt(v, C), (ct = I.props && I.props.onVnodeUpdated) && bt(
          () => Nt(ct, L, I, X),
          C
        );
      } else {
        let I;
        const { el: H, props: v } = d, { bm: L, m: X, parent: tt, root: ct, type: ht } = u, Lt = Ze(d);
        Se(u, !1), L && vs(L), !Lt && (I = v && v.onVnodeBeforeMount) && Nt(I, tt, d), Se(u, !0);
        {
          ct.ce && ct.ce._hasShadowRoot() && ct.ce._injectChildStyle(
            ht,
            u.parent ? u.parent.type : void 0
          );
          const Dt = u.subTree = io(u);
          E(
            null,
            Dt,
            _,
            b,
            u,
            C,
            $
          ), d.el = Dt.el;
        }
        if (X && bt(X, C), !Lt && (I = v && v.onVnodeMounted)) {
          const Dt = d;
          bt(
            () => Nt(I, tt, Dt),
            C
          );
        }
        (d.shapeFlag & 256 || tt && Ze(tt.vnode) && tt.vnode.shapeFlag & 256) && u.a && bt(u.a, C), u.isMounted = !0, d = _ = b = null;
      }
    };
    u.scope.on();
    const M = u.effect = new Jo(O);
    u.scope.off();
    const T = u.update = M.run.bind(M), U = u.job = M.runIfDirty.bind(M);
    U.i = u, U.id = u.uid, M.scheduler = () => Rn(U), Se(u, !0), T();
  }, Q = (u, d, _) => {
    d.component = u;
    const b = u.vnode.props;
    u.vnode = d, u.next = null, Ml(u, d.props, b, _), Fl(u, d.children, _), ie(), Qn(u), re();
  }, et = (u, d, _, b, C, $, R, O, M = !1) => {
    const T = u && u.children, U = u ? u.shapeFlag : 0, I = d.children, { patchFlag: H, shapeFlag: v } = d;
    if (H > 0) {
      if (H & 128) {
        Oe(
          T,
          I,
          _,
          b,
          C,
          $,
          R,
          O,
          M
        );
        return;
      } else if (H & 256) {
        Qt(
          T,
          I,
          _,
          b,
          C,
          $,
          R,
          O,
          M
        );
        return;
      }
    }
    v & 8 ? (U & 16 && me(T, C, $), I !== T && a(_, I)) : U & 16 ? v & 16 ? Oe(
      T,
      I,
      _,
      b,
      C,
      $,
      R,
      O,
      M
    ) : me(T, C, $, !0) : (U & 8 && a(_, ""), v & 16 && D(
      I,
      _,
      b,
      C,
      $,
      R,
      O,
      M
    ));
  }, Qt = (u, d, _, b, C, $, R, O, M) => {
    u = u || Fe, d = d || Fe;
    const T = u.length, U = d.length, I = Math.min(T, U);
    let H;
    for (H = 0; H < I; H++) {
      const v = d[H] = M ? se(d[H]) : Ut(d[H]);
      E(
        u[H],
        v,
        _,
        null,
        C,
        $,
        R,
        O,
        M
      );
    }
    T > U ? me(
      u,
      C,
      $,
      !0,
      !1,
      I
    ) : D(
      d,
      _,
      b,
      C,
      $,
      R,
      O,
      M,
      I
    );
  }, Oe = (u, d, _, b, C, $, R, O, M) => {
    let T = 0;
    const U = d.length;
    let I = u.length - 1, H = U - 1;
    for (; T <= I && T <= H; ) {
      const v = u[T], L = d[T] = M ? se(d[T]) : Ut(d[T]);
      if (We(v, L))
        E(
          v,
          L,
          _,
          null,
          C,
          $,
          R,
          O,
          M
        );
      else
        break;
      T++;
    }
    for (; T <= I && T <= H; ) {
      const v = u[I], L = d[H] = M ? se(d[H]) : Ut(d[H]);
      if (We(v, L))
        E(
          v,
          L,
          _,
          null,
          C,
          $,
          R,
          O,
          M
        );
      else
        break;
      I--, H--;
    }
    if (T > I) {
      if (T <= H) {
        const v = H + 1, L = v < U ? d[v].el : b;
        for (; T <= H; )
          E(
            null,
            d[T] = M ? se(d[T]) : Ut(d[T]),
            _,
            L,
            C,
            $,
            R,
            O,
            M
          ), T++;
      }
    } else if (T > H)
      for (; T <= I; )
        Ct(u[T], C, $, !0), T++;
    else {
      const v = T, L = T, X = /* @__PURE__ */ new Map();
      for (T = L; T <= H; T++) {
        const $t = d[T] = M ? se(d[T]) : Ut(d[T]);
        $t.key != null && X.set($t.key, T);
      }
      let tt, ct = 0;
      const ht = H - L + 1;
      let Lt = !1, Dt = 0;
      const Be = new Array(ht);
      for (T = 0; T < ht; T++) Be[T] = 0;
      for (T = v; T <= I; T++) {
        const $t = u[T];
        if (ct >= ht) {
          Ct($t, C, $, !0);
          continue;
        }
        let jt;
        if ($t.key != null)
          jt = X.get($t.key);
        else
          for (tt = L; tt <= H; tt++)
            if (Be[tt - L] === 0 && We($t, d[tt])) {
              jt = tt;
              break;
            }
        jt === void 0 ? Ct($t, C, $, !0) : (Be[jt - L] = T + 1, jt >= Dt ? Dt = jt : Lt = !0, E(
          $t,
          d[jt],
          _,
          null,
          C,
          $,
          R,
          O,
          M
        ), ct++);
      }
      const Bn = Lt ? Nl(Be) : Fe;
      for (tt = Bn.length - 1, T = ht - 1; T >= 0; T--) {
        const $t = L + T, jt = d[$t], Kn = d[$t + 1], Wn = $t + 1 < U ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Kn.el || Li(Kn)
        ) : b;
        Be[T] === 0 ? E(
          null,
          jt,
          _,
          Wn,
          C,
          $,
          R,
          O,
          M
        ) : Lt && (tt < 0 || T !== Bn[tt] ? zt(jt, _, Wn, 2) : tt--);
      }
    }
  }, zt = (u, d, _, b, C = null) => {
    const { el: $, type: R, transition: O, children: M, shapeFlag: T } = u;
    if (T & 6) {
      zt(u.component.subTree, d, _, b);
      return;
    }
    if (T & 128) {
      u.suspense.move(d, _, b);
      return;
    }
    if (T & 64) {
      R.move(u, d, _, ve);
      return;
    }
    if (R === ot) {
      n($, d, _);
      for (let I = 0; I < M.length; I++)
        zt(M[I], d, _, b);
      n(u.anchor, d, _);
      return;
    }
    if (R === nn) {
      g(u, d, _);
      return;
    }
    if (b !== 2 && T & 1 && O)
      if (b === 0)
        O.beforeEnter($), n($, d, _), bt(() => O.enter($), C);
      else {
        const { leave: I, delayLeave: H, afterLeave: v } = O, L = () => {
          u.ctx.isUnmounted ? o($) : n($, d, _);
        }, X = () => {
          $._isLeaving && $[sl](
            !0
            /* cancelled */
          ), I($, () => {
            L(), v && v();
          });
        };
        H ? H($, L, X) : X();
      }
    else
      n($, d, _);
  }, Ct = (u, d, _, b = !1, C = !1) => {
    const {
      type: $,
      props: R,
      ref: O,
      children: M,
      dynamicChildren: T,
      shapeFlag: U,
      patchFlag: I,
      dirs: H,
      cacheIndex: v,
      memo: L
    } = u;
    if (I === -2 && (C = !1), O != null && (ie(), Xe(O, null, _, u, !0), re()), v != null && (d.renderCache[v] = void 0), U & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const X = U & 1 && H, tt = !Ze(u);
    let ct;
    if (tt && (ct = R && R.onVnodeBeforeUnmount) && Nt(ct, d, u), U & 6)
      Ys(u.component, _, b);
    else {
      if (U & 128) {
        u.suspense.unmount(_, b);
        return;
      }
      X && ye(u, null, d, "beforeUnmount"), U & 64 ? u.type.remove(
        u,
        d,
        _,
        ve,
        b
      ) : T && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !T.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      ($ !== ot || I > 0 && I & 64) ? me(
        T,
        d,
        _,
        !1,
        !0
      ) : ($ === ot && I & 384 || !C && U & 16) && me(M, d, _), b && Xt(u);
    }
    const ht = L != null && v == null;
    (tt && (ct = R && R.onVnodeUnmounted) || X || ht) && bt(() => {
      ct && Nt(ct, d, u), X && ye(u, null, d, "unmounted"), ht && (u.el = null);
    }, _);
  }, Xt = (u) => {
    const { type: d, el: _, anchor: b, transition: C } = u;
    if (d === ot) {
      Zt(_, b);
      return;
    }
    if (d === nn) {
      y(u);
      return;
    }
    const $ = () => {
      o(_), C && !C.persisted && C.afterLeave && C.afterLeave();
    };
    if (u.shapeFlag & 1 && C && !C.persisted) {
      const { leave: R, delayLeave: O } = C, M = () => R(_, $);
      O ? O(u.el, $, M) : M();
    } else
      $();
  }, Zt = (u, d) => {
    let _;
    for (; u !== d; )
      _ = p(u), o(u), u = _;
    o(d);
  }, Ys = (u, d, _) => {
    const { bum: b, scope: C, job: $, subTree: R, um: O, m: M, a: T } = u;
    co(M), co(T), b && vs(b), C.stop(), $ && ($.flags |= 8, Ct(R, u, d, _)), O && bt(O, d), bt(() => {
      u.isUnmounted = !0;
    }, d);
  }, me = (u, d, _, b = !1, C = !1, $ = 0) => {
    for (let R = $; R < u.length; R++)
      Ct(u[R], d, _, b, C);
  }, Me = (u) => {
    if (u.shapeFlag & 6)
      return Me(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = p(u.anchor || u.el), _ = d && d[mi];
    return _ ? p(_) : d;
  };
  let Ue = !1;
  const hs = (u, d, _) => {
    let b;
    u == null ? d._vnode && (Ct(d._vnode, null, null, !0), b = d._vnode.component) : E(
      d._vnode || null,
      u,
      d,
      null,
      null,
      null,
      _
    ), d._vnode = u, Ue || (Ue = !0, Qn(b), di(), Ue = !1);
  }, ve = {
    p: E,
    um: Ct,
    m: zt,
    r: Xt,
    mt: ue,
    mc: D,
    pc: et,
    pbc: Z,
    n: Me,
    o: t
  };
  return {
    render: hs,
    hydrate: void 0,
    createApp: wl(hs)
  };
}
function sn({ type: t, props: e }, s) {
  return s === "svg" && t === "foreignObject" || s === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : s;
}
function Se({ effect: t, job: e }, s) {
  s ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function jl(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function jn(t, e, s = !1) {
  const n = t.children, o = e.children;
  if (B(n) && B(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = se(o[i]), l.el = r.el), !s && l.patchFlag !== -2 && jn(r, l)), l.type === Ws && (l.patchFlag === -1 && (l = o[i] = se(l)), l.el = r.el), l.type === ge && !l.el && (l.el = r.el);
    }
}
function Nl(t) {
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
function Hl(t, e) {
  e && e.pendingBranch ? B(t) ? e.effects.push(...t) : e.effects.push(t) : Kr(t);
}
const ot = /* @__PURE__ */ Symbol.for("v-fgt"), Ws = /* @__PURE__ */ Symbol.for("v-txt"), ge = /* @__PURE__ */ Symbol.for("v-cmt"), nn = /* @__PURE__ */ Symbol.for("v-stc"), es = [];
let Tt = null;
function A(t = !1) {
  es.push(Tt = t ? null : []);
}
function Vl() {
  es.pop(), Tt = es[es.length - 1] || null;
}
let rs = 1;
function ao(t, e = !1) {
  rs += t, t < 0 && Tt && e && (Tt.hasOnce = !0);
}
function ji(t) {
  return t.dynamicChildren = rs > 0 ? Tt || Fe : null, Vl(), rs > 0 && Tt && Tt.push(t), t;
}
function k(t, e, s, n, o, i) {
  return ji(
    S(
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
function he(t, e, s, n, o) {
  return ji(
    xt(
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
function We(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Hi = ({ key: t }) => t ?? null, ys = ({
  ref: t,
  ref_key: e,
  ref_for: s
}) => (typeof t == "number" && (t = "" + t), t != null ? ft(t) || /* @__PURE__ */ lt(t) || G(t) ? { i: kt, r: t, k: e, f: !!s } : t : null);
function S(t, e = null, s = null, n = 0, o = null, i = t === ot ? 0 : 1, r = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Hi(e),
    ref: e && ys(e),
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
    ctx: kt
  };
  return l ? (Nn(c, s), i & 128 && t.normalize(c)) : s && (c.shapeFlag |= ft(s) ? 8 : 16), rs > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Tt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Tt.push(c), c;
}
const xt = Ul;
function Ul(t, e = null, s = null, n = 0, o = null, i = !1) {
  if ((!t || t === pl) && (t = ge), Ni(t)) {
    const l = He(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return s && Nn(l, s), rs > 0 && !i && Tt && (l.shapeFlag & 6 ? Tt[Tt.indexOf(t)] = l : Tt.push(l)), l.patchFlag = -2, l;
  }
  if (Xl(t) && (t = t.__vccOpts), e) {
    e = Bl(e);
    let { class: l, style: c } = e;
    l && !ft(l) && (e.class = Mt(l)), nt(c) && (/* @__PURE__ */ Vs(c) && !B(c) && (c = gt({}, c)), e.style = Cn(c));
  }
  const r = ft(t) ? 1 : Di(t) ? 128 : zr(t) ? 64 : nt(t) ? 4 : G(t) ? 2 : 0;
  return S(
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
function Bl(t) {
  return t ? /* @__PURE__ */ Vs(t) || ki(t) ? gt({}, t) : t : null;
}
function He(t, e, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: r, children: l, transition: c } = t, f = e ? Kl(o || {}, e) : o, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && Hi(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? B(i) ? i.concat(ys(e)) : [i, ys(e)] : ys(e)
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
    patchFlag: e && t.type !== ot ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: t.ssContent && He(t.ssContent),
    ssFallback: t.ssFallback && He(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return c && n && In(
    a,
    c.clone(a)
  ), a;
}
function It(t = " ", e = 0) {
  return xt(Ws, null, t, e);
}
function J(t = "", e = !1) {
  return e ? (A(), he(ge, null, t)) : xt(ge, null, t);
}
function Ut(t) {
  return t == null || typeof t == "boolean" ? xt(ge) : B(t) ? xt(
    ot,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Ni(t) ? se(t) : xt(Ws, null, String(t));
}
function se(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : He(t);
}
function Nn(t, e) {
  let s = 0;
  const { shapeFlag: n } = t;
  if (e == null)
    e = null;
  else if (B(e))
    s = 16;
  else if (typeof e == "object")
    if (n & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), Nn(t, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = e._;
      !o && !ki(e) ? e._ctx = kt : o === 3 && kt && (kt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else G(e) ? (e = { default: e, _ctx: kt }, s = 32) : (e = String(e), n & 64 ? (s = 16, e = [It(e)]) : s = 8);
  t.children = e, t.shapeFlag |= s;
}
function Kl(...t) {
  const e = {};
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    for (const o in n)
      if (o === "class")
        e.class !== n.class && (e.class = Mt([e.class, n.class]));
      else if (o === "style")
        e.style = Cn([e.style, n.style]);
      else if (Ps(o)) {
        const i = e[o], r = n[o];
        r && i !== r && !(B(i) && i.includes(r)) ? e[o] = i ? [].concat(i, r) : r : r == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Rs(o) && (e[o] = r);
      } else o !== "" && (e[o] = n[o]);
  }
  return e;
}
function Nt(t, e, s, n = null) {
  qt(t, e, 7, [
    s,
    n
  ]);
}
const Wl = Ci();
let ql = 0;
function Gl(t, e, s) {
  const n = t.type, o = (e ? e.appContext : t.appContext) || Wl, i = {
    uid: ql++,
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
    propsDefaults: it,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: it,
    data: it,
    props: it,
    attrs: it,
    slots: it,
    refs: it,
    setupState: it,
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
  return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = Cl.bind(null, i), t.ce && t.ce(i), i;
}
let wt = null;
const Vi = () => wt || kt;
let ks, vn;
{
  const t = js(), e = (s, n) => {
    let o;
    return (o = t[s]) || (o = t[s] = []), o.push(n), (i) => {
      o.length > 1 ? o.forEach((r) => r(i)) : o[0](i);
    };
  };
  ks = e(
    "__VUE_INSTANCE_SETTERS__",
    (s) => wt = s
  ), vn = e(
    "__VUE_SSR_SETTERS__",
    (s) => ls = s
  );
}
const ds = (t) => {
  const e = wt;
  return ks(t), t.scope.on(), () => {
    t.scope.off(), ks(e);
  };
}, uo = () => {
  wt && wt.scope.off(), ks(null);
};
function Ui(t) {
  return t.vnode.shapeFlag & 4;
}
let ls = !1;
function Jl(t, e = !1, s = !1) {
  e && vn(e);
  const { props: n, children: o } = t.vnode, i = Ui(t);
  Ol(t, n, i, e), Il(t, o, s || e);
  const r = i ? Yl(t, e) : void 0;
  return e && vn(!1), r;
}
function Yl(t, e) {
  const s = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, _l);
  const { setup: n } = s;
  if (n) {
    ie();
    const o = t.setupContext = n.length > 1 ? zl(t) : null, i = ds(t), r = fs(
      n,
      t,
      0,
      [
        t.props,
        o
      ]
    ), l = Do(r);
    if (re(), i(), (l || t.sp) && !Ze(t) && vi(t), l) {
      if (r.then(uo, uo), e)
        return r.then((c) => {
          fo(t, c);
        }).catch((c) => {
          Us(c, t, 0);
        });
      t.asyncDep = r;
    } else
      fo(t, r);
  } else
    Bi(t);
}
function fo(t, e, s) {
  G(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : nt(e) && (t.setupState = ci(e)), Bi(t);
}
function Bi(t, e, s) {
  const n = t.type;
  t.render || (t.render = n.render || Kt);
  {
    const o = ds(t);
    ie();
    try {
      gl(t);
    } finally {
      re(), o();
    }
  }
}
const Ql = {
  get(t, e) {
    return vt(t, "get", ""), t[e];
  }
};
function zl(t) {
  const e = (s) => {
    t.exposed = s || {};
  };
  return {
    attrs: new Proxy(t.attrs, Ql),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function qs(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(ci(Mn(t.exposed)), {
    get(e, s) {
      if (s in e)
        return e[s];
      if (s in ts)
        return ts[s](t);
    },
    has(e, s) {
      return s in e || s in ts;
    }
  })) : t.proxy;
}
function Xl(t) {
  return G(t) && "__vccOpts" in t;
}
const pt = (t, e) => /* @__PURE__ */ Nr(t, e, ls), Zl = "3.5.32";
/**
* @vue/runtime-dom v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let yn;
const ho = typeof window < "u" && window.trustedTypes;
if (ho)
  try {
    yn = /* @__PURE__ */ ho.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const Ki = yn ? (t) => yn.createHTML(t) : (t) => t, tc = "http://www.w3.org/2000/svg", ec = "http://www.w3.org/1998/Math/MathML", ee = typeof document < "u" ? document : null, po = ee && /* @__PURE__ */ ee.createElement("template"), sc = {
  insert: (t, e, s) => {
    e.insertBefore(t, s || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, s, n) => {
    const o = e === "svg" ? ee.createElementNS(tc, t) : e === "mathml" ? ee.createElementNS(ec, t) : s ? ee.createElement(t, { is: s }) : ee.createElement(t);
    return t === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (t) => ee.createTextNode(t),
  createComment: (t) => ee.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => ee.querySelector(t),
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
}, nc = /* @__PURE__ */ Symbol("_vtc");
function oc(t, e, s) {
  const n = t[nc];
  n && (e = (e ? [e, ...n] : [...n]).join(" ")), e == null ? t.removeAttribute("class") : s ? t.setAttribute("class", e) : t.className = e;
}
const _o = /* @__PURE__ */ Symbol("_vod"), ic = /* @__PURE__ */ Symbol("_vsh"), rc = /* @__PURE__ */ Symbol(""), lc = /(?:^|;)\s*display\s*:/;
function cc(t, e, s) {
  const n = t.style, o = ft(s);
  let i = !1;
  if (s && !o) {
    if (e)
      if (ft(e))
        for (const r of e.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          s[l] == null && bs(n, l, "");
        }
      else
        for (const r in e)
          s[r] == null && bs(n, r, "");
    for (const r in s)
      r === "display" && (i = !0), bs(n, r, s[r]);
  } else if (o) {
    if (e !== s) {
      const r = n[rc];
      r && (s += ";" + r), n.cssText = s, i = lc.test(s);
    }
  } else e && t.removeAttribute("style");
  _o in t && (t[_o] = i ? n.display : "", t[ic] && (n.display = "none"));
}
const go = /\s*!important$/;
function bs(t, e, s) {
  if (B(s))
    s.forEach((n) => bs(t, e, n));
  else if (s == null && (s = ""), e.startsWith("--"))
    t.setProperty(e, s);
  else {
    const n = ac(t, e);
    go.test(s) ? t.setProperty(
      Ae(n),
      s.replace(go, ""),
      "important"
    ) : t[n] = s;
  }
}
const mo = ["Webkit", "Moz", "ms"], on = {};
function ac(t, e) {
  const s = on[e];
  if (s)
    return s;
  let n = Pt(e);
  if (n !== "filter" && n in t)
    return on[e] = n;
  n = Ho(n);
  for (let o = 0; o < mo.length; o++) {
    const i = mo[o] + n;
    if (i in t)
      return on[e] = i;
  }
  return e;
}
const vo = "http://www.w3.org/1999/xlink";
function yo(t, e, s, n, o, i = lr(e)) {
  n && e.startsWith("xlink:") ? s == null ? t.removeAttributeNS(vo, e.slice(6, e.length)) : t.setAttributeNS(vo, e, s) : s == null || i && !Uo(s) ? t.removeAttribute(e) : t.setAttribute(
    e,
    i ? "" : Ot(s) ? String(s) : s
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
function Ce(t, e, s, n) {
  t.addEventListener(e, s, n);
}
function uc(t, e, s, n) {
  t.removeEventListener(e, s, n);
}
const So = /* @__PURE__ */ Symbol("_vei");
function fc(t, e, s, n, o = null) {
  const i = t[So] || (t[So] = {}), r = i[e];
  if (n && r)
    r.value = n;
  else {
    const [l, c] = dc(e);
    if (n) {
      const f = i[e] = _c(
        n,
        o
      );
      Ce(t, l, f, c);
    } else r && (uc(t, l, r, c), i[e] = void 0);
  }
}
const wo = /(?:Once|Passive|Capture)$/;
function dc(t) {
  let e;
  if (wo.test(t)) {
    e = {};
    let n;
    for (; n = t.match(wo); )
      t = t.slice(0, t.length - n[0].length), e[n[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Ae(t.slice(2)), e];
}
let rn = 0;
const hc = /* @__PURE__ */ Promise.resolve(), pc = () => rn || (hc.then(() => rn = 0), rn = Date.now());
function _c(t, e) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    qt(
      gc(n, s.value),
      e,
      5,
      [n]
    );
  };
  return s.value = t, s.attached = pc(), s;
}
function gc(t, e) {
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
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, mc = (t, e, s, n, o, i) => {
  const r = o === "svg";
  e === "class" ? oc(t, n, r) : e === "style" ? cc(t, s, n) : Ps(e) ? Rs(e) || fc(t, e, s, n, i) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : vc(t, e, n, r)) ? (bo(t, e, n), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && yo(t, e, n, r, i, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (yc(t, e) || // @ts-expect-error _def is private
  t._def.__asyncLoader && (/[A-Z]/.test(e) || !ft(n))) ? bo(t, Pt(e), n, i, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), yo(t, e, n, r));
};
function vc(t, e, s, n) {
  if (n)
    return !!(e === "innerHTML" || e === "textContent" || e in t && xo(e) && G(s));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const o = t.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return xo(e) && ft(s) ? !1 : e in t;
}
function yc(t, e) {
  const s = (
    // @ts-expect-error _def is private
    t._def.props
  );
  if (!s)
    return !1;
  const n = Pt(e);
  return Array.isArray(s) ? s.some((o) => Pt(o) === n) : Object.keys(s).some((o) => Pt(o) === n);
}
const Os = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return B(e) ? (s) => vs(e, s) : e;
};
function bc(t) {
  t.target.composing = !0;
}
function Co(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const je = /* @__PURE__ */ Symbol("_assign");
function $o(t, e, s) {
  return e && (t = t.trim()), s && (t = Ds(t)), t;
}
const Hn = {
  created(t, { modifiers: { lazy: e, trim: s, number: n } }, o) {
    t[je] = Os(o);
    const i = n || o.props && o.props.type === "number";
    Ce(t, e ? "change" : "input", (r) => {
      r.target.composing || t[je]($o(t.value, s, i));
    }), (s || i) && Ce(t, "change", () => {
      t.value = $o(t.value, s, i);
    }), e || (Ce(t, "compositionstart", bc), Ce(t, "compositionend", Co), Ce(t, "change", Co));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: n, trim: o, number: i } }, r) {
    if (t[je] = Os(r), t.composing) return;
    const l = (i || t.type === "number") && !/^0\d/.test(t.value) ? Ds(t.value) : t.value, c = e ?? "";
    if (l === c)
      return;
    const f = t.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === t && t.type !== "range" && (n && e === s || o && t.value.trim() === c) || (t.value = c);
  }
}, Sc = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(t, { value: e, modifiers: { number: s } }, n) {
    const o = Is(e);
    Ce(t, "change", () => {
      const i = Array.prototype.filter.call(t.options, (r) => r.selected).map(
        (r) => s ? Ds(Ms(r)) : Ms(r)
      );
      t[je](
        t.multiple ? o ? new Set(i) : i : i[0]
      ), t._assigning = !0, Pn(() => {
        t._assigning = !1;
      });
    }), t[je] = Os(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(t, { value: e }) {
    To(t, e);
  },
  beforeUpdate(t, e, s) {
    t[je] = Os(s);
  },
  updated(t, { value: e }) {
    t._assigning || To(t, e);
  }
};
function To(t, e) {
  const s = t.multiple, n = B(e);
  if (!(s && !n && !Is(e))) {
    for (let o = 0, i = t.options.length; o < i; o++) {
      const r = t.options[o], l = Ms(r);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? r.selected = e.some((f) => String(f) === String(l)) : r.selected = ar(e, l) > -1;
        } else
          r.selected = e.has(l);
      else if (us(Ms(r), e)) {
        t.selectedIndex !== o && (t.selectedIndex = o);
        return;
      }
    }
    !s && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function Ms(t) {
  return "_value" in t ? t._value : t.value;
}
const wc = ["ctrl", "shift", "alt", "meta"], xc = {
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
  exact: (t, e) => wc.some((s) => t[`${s}Key`] && !e.includes(s))
}, pe = (t, e) => {
  if (!t) return t;
  const s = t._withMods || (t._withMods = {}), n = e.join(".");
  return s[n] || (s[n] = ((o, ...i) => {
    for (let r = 0; r < e.length; r++) {
      const l = xc[e[r]];
      if (l && l(o, e)) return;
    }
    return t(o, ...i);
  }));
}, Cc = /* @__PURE__ */ gt({ patchProp: mc }, sc);
let Ao;
function $c() {
  return Ao || (Ao = Ll(Cc));
}
const Tc = ((...t) => {
  const e = $c().createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    const o = Ec(n);
    if (!o) return;
    const i = e._component;
    !G(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = s(o, !1, Ac(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, e;
});
function Ac(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function Ec(t) {
  return ft(t) ? document.querySelector(t) : t;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Wi;
const Gs = (t) => Wi = t, qi = (
  /* istanbul ignore next */
  Symbol()
);
function bn(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var ss;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(ss || (ss = {}));
function kc() {
  const t = qo(!0), e = t.run(() => /* @__PURE__ */ Y({}));
  let s = [], n = [];
  const o = Mn({
    install(i) {
      Gs(o), o._a = i, i.provide(qi, o), i.config.globalProperties.$pinia = o, n.forEach((r) => s.push(r)), n = [];
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
const Gi = () => {
};
function Eo(t, e, s, n = Gi) {
  t.push(e);
  const o = () => {
    const i = t.indexOf(e);
    i > -1 && (t.splice(i, 1), n());
  };
  return !s && Go() && ur(o), o;
}
function Re(t, ...e) {
  t.slice().forEach((s) => {
    s(...e);
  });
}
const Oc = (t) => t(), ko = Symbol(), ln = Symbol();
function Sn(t, e) {
  t instanceof Map && e instanceof Map ? e.forEach((s, n) => t.set(n, s)) : t instanceof Set && e instanceof Set && e.forEach(t.add, t);
  for (const s in e) {
    if (!e.hasOwnProperty(s))
      continue;
    const n = e[s], o = t[s];
    bn(o) && bn(n) && t.hasOwnProperty(s) && !/* @__PURE__ */ lt(n) && !/* @__PURE__ */ Wt(n) ? t[s] = Sn(o, n) : t[s] = n;
  }
  return t;
}
const Mc = (
  /* istanbul ignore next */
  Symbol()
);
function Pc(t) {
  return !bn(t) || !t.hasOwnProperty(Mc);
}
const { assign: fe } = Object;
function Rc(t) {
  return !!(/* @__PURE__ */ lt(t) && t.effect);
}
function Ic(t, e, s, n) {
  const { state: o, actions: i, getters: r } = e, l = s.state.value[t];
  let c;
  function f() {
    l || (s.state.value[t] = o ? o() : {});
    const a = /* @__PURE__ */ Ir(s.state.value[t]);
    return fe(a, i, Object.keys(r || {}).reduce((h, p) => (h[p] = Mn(pt(() => {
      Gs(s);
      const w = s._s.get(t);
      return r[p].call(w, w);
    })), h), {}));
  }
  return c = Ji(t, f, e, s, n, !0), c;
}
function Ji(t, e, s = {}, n, o, i) {
  let r;
  const l = fe({ actions: {} }, s), c = { deep: !0 };
  let f, a, h = [], p = [], w;
  const P = n.state.value[t];
  !i && !P && (n.state.value[t] = {});
  let E;
  function N(D) {
    let W;
    f = a = !1, typeof D == "function" ? (D(n.state.value[t]), W = {
      type: ss.patchFunction,
      storeId: t,
      events: w
    }) : (Sn(n.state.value[t], D), W = {
      type: ss.patchObject,
      payload: D,
      storeId: t,
      events: w
    });
    const Z = E = Symbol();
    Pn().then(() => {
      E === Z && (f = !0);
    }), a = !0, Re(h, W, n.state.value[t]);
  }
  const V = i ? function() {
    const { state: W } = s, Z = W ? W() : {};
    this.$patch((dt) => {
      fe(dt, Z);
    });
  } : (
    /* istanbul ignore next */
    Gi
  );
  function x() {
    r.stop(), h = [], p = [], n._s.delete(t);
  }
  const g = (D, W = "") => {
    if (ko in D)
      return D[ln] = W, D;
    const Z = function() {
      Gs(n);
      const dt = Array.from(arguments), _t = [], ut = [];
      function ue(Q) {
        _t.push(Q);
      }
      function ke(Q) {
        ut.push(Q);
      }
      Re(p, {
        args: dt,
        name: Z[ln],
        store: j,
        after: ue,
        onError: ke
      });
      let at;
      try {
        at = D.apply(this && this.$id === t ? this : j, dt);
      } catch (Q) {
        throw Re(ut, Q), Q;
      }
      return at instanceof Promise ? at.then((Q) => (Re(_t, Q), Q)).catch((Q) => (Re(ut, Q), Promise.reject(Q))) : (Re(_t, at), at);
    };
    return Z[ko] = !0, Z[ln] = W, Z;
  }, y = {
    _p: n,
    // _s: scope,
    $id: t,
    $onAction: Eo.bind(null, p),
    $patch: N,
    $reset: V,
    $subscribe(D, W = {}) {
      const Z = Eo(h, D, W.detached, () => dt()), dt = r.run(() => _e(() => n.state.value[t], (_t) => {
        (W.flush === "sync" ? a : f) && D({
          storeId: t,
          type: ss.direct,
          events: w
        }, _t);
      }, fe({}, c, W)));
      return Z;
    },
    $dispose: x
  }, j = /* @__PURE__ */ Hs(y);
  n._s.set(t, j);
  const F = (n._a && n._a.runWithContext || Oc)(() => n._e.run(() => (r = qo()).run(() => e({ action: g }))));
  for (const D in F) {
    const W = F[D];
    if (/* @__PURE__ */ lt(W) && !Rc(W) || /* @__PURE__ */ Wt(W))
      i || (P && Pc(W) && (/* @__PURE__ */ lt(W) ? W.value = P[D] : Sn(W, P[D])), n.state.value[t][D] = W);
    else if (typeof W == "function") {
      const Z = g(W, D);
      F[D] = Z, l.actions[D] = W;
    }
  }
  return fe(j, F), fe(/* @__PURE__ */ z(j), F), Object.defineProperty(j, "$state", {
    get: () => n.state.value[t],
    set: (D) => {
      N((W) => {
        fe(W, D);
      });
    }
  }), n._p.forEach((D) => {
    fe(j, r.run(() => D({
      store: j,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), P && i && s.hydrate && s.hydrate(j.$state, P), f = !0, a = !0, j;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Fc(t, e, s) {
  let n, o;
  const i = typeof e == "function";
  n = t, o = i ? s : e;
  function r(l, c) {
    const f = Gr();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (f ? ze(qi, null) : null), l && Gs(l), l = Wi, l._s.has(n) || (i ? Ji(n, e, o, l) : Ic(n, o, l)), l._s.get(n);
  }
  return r.$id = n, r;
}
function Ve(t) {
  {
    const e = /* @__PURE__ */ z(t), s = {};
    for (const n in e) {
      const o = e[n];
      o.effect ? s[n] = // ...
      pt({
        get: () => t[n],
        set(i) {
          t[n] = i;
        }
      }) : (/* @__PURE__ */ lt(o) || /* @__PURE__ */ Wt(o)) && (s[n] = // ---
      /* @__PURE__ */ Dr(t, n));
    }
    return s;
  }
}
const Yi = "at_assetthingie_url", Oo = "http://127.0.0.1:8080", Vn = 15e3;
function cs() {
  if (typeof localStorage > "u")
    return Oo;
  const t = localStorage.getItem(Yi) || Oo;
  return String(t).replace(/\/$/, "");
}
function Jt() {
  const t = cs();
  try {
    if (new URL(t).port === "8188") return "/at";
  } catch {
  }
  return "/api/comfy";
}
function Js() {
  var t;
  return Jt() !== "/at" ? cs() : typeof window < "u" && ((t = window.location) != null && t.origin) && window.location.protocol !== "file:" ? window.location.origin.replace(/\/$/, "") : cs();
}
function Lc(t) {
  localStorage.setItem(Yi, t.replace(/\/$/, ""));
}
async function Ee(t, e) {
  let n = `${Js()}${t}`;
  if (e != null && e.params) {
    const f = new URLSearchParams();
    for (const [h, p] of Object.entries(e.params))
      p === void 0 || p === "" || f.set(h, String(p));
    const a = f.toString();
    a && (n += `?${a}`);
  }
  const o = { ...e ?? {} };
  delete o.params;
  const i = new AbortController(), r = setTimeout(() => i.abort(), Vn);
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
async function Dc() {
  return Ee(`${Jt()}/health`);
}
async function jc(t = "Checkpoint", e, s) {
  const n = new URLSearchParams();
  if (t && n.set("content_type", t), s != null && s.length)
    for (const f of s) {
      const a = f.trim();
      a && n.append("tag", a);
    }
  const o = Js(), i = n.toString(), r = `${o}${Jt()}/filters${i ? `?${i}` : ""}`, l = new AbortController(), c = setTimeout(() => l.abort(), Vn);
  try {
    const f = await fetch(r, {
      signal: l.signal,
      headers: { Accept: "application/json" }
    }), a = await f.text();
    if (!f.ok)
      throw new Error(`HTTP ${f.status}: ${a.slice(0, 240)}`);
    return JSON.parse(a);
  } finally {
    clearTimeout(c);
  }
}
async function Nc(t, e = "checkpoint") {
  const s = { family: e };
  return t && (s.parent = t), Ee(`${Jt()}/subfolders`, { params: s });
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
  const o = `${Js()}${Jt()}/assets?${s.toString()}`, i = new AbortController(), r = setTimeout(() => i.abort(), Vn);
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
function Ss(t) {
  return t ? t.startsWith("http://") || t.startsWith("https://") ? t : `${Js()}${t.startsWith("/") ? "" : "/"}${t}` : null;
}
async function Hc(t) {
  return Ee(`${Jt()}/assets/${t}`);
}
async function Po() {
  return Ee(`${Jt()}/library/clean-preview`);
}
async function Vc() {
  return Ee(`${Jt()}/library/clean`, { method: "POST" });
}
async function Uc(t) {
  return Ee(`${Jt()}/assets/${t}/re-enrich`, {
    method: "POST"
  });
}
async function Bc(t) {
  return Ee(`${Jt()}/assets/batch/re-enrich`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ asset_ids: t })
  });
}
const Ro = "at_checkpoints_view_mode", Kc = 40, ae = /* @__PURE__ */ Fc("at-checkpoints-assets", () => {
  const t = /* @__PURE__ */ Y(!1), e = /* @__PURE__ */ Y([]), s = /* @__PURE__ */ Y(0), n = /* @__PURE__ */ Y(0), o = /* @__PURE__ */ Y(Kc), i = /* @__PURE__ */ Y(!1), r = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(null), c = /* @__PURE__ */ Y(""), f = /* @__PURE__ */ Y("");
  let a = null;
  _e(c, (v) => {
    a && clearTimeout(a), a = setTimeout(() => {
      f.value = v, a = null, b(!0);
    }, 300);
  });
  const h = /* @__PURE__ */ Y(""), p = /* @__PURE__ */ Y(null), w = /* @__PURE__ */ Y(""), P = /* @__PURE__ */ Y(""), E = /* @__PURE__ */ Y(""), N = /* @__PURE__ */ Y([]), V = /* @__PURE__ */ Y([]), x = /* @__PURE__ */ Y(""), g = /* @__PURE__ */ Y(""), y = /* @__PURE__ */ Y(""), j = /* @__PURE__ */ Y("grid"), K = /* @__PURE__ */ Y(!1), F = /* @__PURE__ */ Y(cs()), D = /* @__PURE__ */ Y(null), W = /* @__PURE__ */ Y(null), Z = /* @__PURE__ */ Y(null), dt = /* @__PURE__ */ Y(!1), _t = /* @__PURE__ */ Y(!1), ut = /* @__PURE__ */ Y(/* @__PURE__ */ new Set());
  try {
    const v = localStorage.getItem(Ro);
    (v === "list" || v === "grid") && (j.value = v);
  } catch {
  }
  const ue = pt(() => e.value.length < s.value), ke = pt(() => ut.value.size);
  function at(v) {
    return ut.value.has(v);
  }
  function Q(v) {
    const L = new Set(ut.value);
    L.has(v) ? L.delete(v) : L.add(v), ut.value = L;
  }
  function et() {
    ut.value = /* @__PURE__ */ new Set();
  }
  function Qt() {
    _t.value = !_t.value, _t.value || et();
  }
  function Oe() {
    const v = new Set(ut.value);
    for (const L of e.value) v.add(L.asset_id);
    ut.value = v;
  }
  async function zt() {
    const v = [...ut.value];
    if (!v.length) {
      O("No assets selected");
      return;
    }
    try {
      const L = await Bc(v);
      O(`Re-enrich: ${L.processed} ok${L.failed ? `, ${L.failed} failed` : ""}`), et(), _t.value = !1, await b(!0);
    } catch (L) {
      O(L instanceof Error ? L.message : "Batch re-enrich failed");
    }
  }
  async function Ct() {
    try {
      const v = await Dc();
      t.value = !!v.ok, l.value = null;
    } catch (v) {
      t.value = !1, l.value = v instanceof Error ? v.message : "Connection failed";
    }
  }
  async function Xt() {
    try {
      const v = V.value.length > 0 ? [...V.value] : void 0;
      p.value = await jc("Checkpoint", void 0, v);
    } catch {
      p.value = null;
    }
  }
  async function Zt() {
    if (t.value)
      try {
        const v = await Nc(w.value || void 0, "checkpoint");
        N.value = v.folders, P.value = v.parent_path, E.value || (E.value = v.parent_path);
      } catch {
        N.value = [];
      }
  }
  function Ys(v) {
    g.value = g.value === v ? "" : v, g.value === "folder" ? Zt() : g.value === "tag" && Xt();
  }
  function me(v) {
    const L = P.value.replace(/\/$/, "");
    w.value = `${L}/${v}`, Zt(), b(!0);
  }
  function Me(v) {
    w.value = v, Zt(), b(!0);
  }
  function Ue() {
    w.value = "", Zt(), b(!0);
  }
  function hs(v) {
    const L = v.trim();
    if (!L) return;
    const X = V.value, tt = X.indexOf(L);
    tt >= 0 ? V.value = X.filter((ct, ht) => ht !== tt) : V.value = [...X, L], b(!0), Xt();
  }
  function ve() {
    V.value = [], y.value = "", b(!0), Xt();
  }
  function Un(v) {
    const L = v.trim();
    x.value === L ? x.value = "" : x.value = L, b(!0);
  }
  function u() {
    x.value = "", b(!0);
  }
  function d() {
    const v = f.value.trim();
    if (!v) return;
    const L = /^(name|trigger|category|tag):$/i;
    return v.split(",").some((tt) => {
      const ct = tt.trim();
      return ct !== "" && !L.test(ct);
    }) ? v : void 0;
  }
  function _() {
    const v = V.value.length > 0 ? [...V.value] : void 0;
    return {
      q: d(),
      content_type: "Checkpoint",
      base_model: h.value.trim() || void 0,
      category: x.value.trim() || void 0,
      path_prefix: w.value.trim() || void 0,
      tag: v,
      sort: "path",
      limit: o.value
    };
  }
  async function b(v) {
    if (!(!t.value && v && (await Ct(), !t.value)) && (v && (n.value = 0, e.value = []), !(i.value || r.value))) {
      i.value = !0, l.value = null;
      try {
        const L = await Mo({
          ..._(),
          offset: n.value
        });
        s.value = L.total, v ? e.value = L.items : e.value = [...e.value, ...L.items];
      } catch (L) {
        l.value = L instanceof Error ? L.message : "Load failed", v && (e.value = []);
      } finally {
        i.value = !1;
      }
    }
  }
  async function C() {
    if (!(!ue.value || i.value || r.value)) {
      r.value = !0, n.value = e.value.length;
      try {
        const v = await Mo({
          ..._(),
          offset: n.value
        });
        s.value = v.total, e.value = [...e.value, ...v.items];
      } catch (v) {
        l.value = v instanceof Error ? v.message : "Load failed";
      } finally {
        r.value = !1;
      }
    }
  }
  function $() {
    c.value = "", f.value = "", a && (clearTimeout(a), a = null), h.value = "", w.value = "", P.value = "", E.value = "", N.value = [], V.value = [], x.value = "", g.value = "", y.value = "", b(!0), t.value && (Zt(), Xt());
  }
  function R(v) {
    j.value = v;
    try {
      localStorage.setItem(Ro, v);
    } catch {
    }
  }
  function O(v) {
    D.value = v, setTimeout(() => {
      D.value = null;
    }, 2e3);
  }
  function M() {
    Lc(F.value), H();
  }
  function T(v) {
    W.value = v, Z.value = null, I();
  }
  function U() {
    W.value = null, Z.value = null;
  }
  async function I() {
    const v = W.value;
    if (v != null) {
      dt.value = !0;
      try {
        Z.value = await Hc(v);
      } catch (L) {
        O(L instanceof Error ? L.message : "Detail load failed"), Z.value = null;
      } finally {
        dt.value = !1;
      }
    }
  }
  async function H() {
    F.value = cs(), await Ct(), t.value && (await Xt(), await Zt(), await b(!0));
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
    folderPath: w,
    browseParentPath: P,
    libraryRootPath: E,
    subfolders: N,
    selectedTags: V,
    selectedCategory: x,
    openFilterSection: g,
    tagFilterText: y,
    viewMode: j,
    settingsOpen: K,
    baseUrlInput: F,
    toast: D,
    hasMore: ue,
    selectedAssetId: W,
    detail: Z,
    detailLoading: dt,
    selectionMode: _t,
    selectedIds: ut,
    selectedCount: ke,
    isAssetSelected: at,
    toggleAssetSelect: Q,
    clearAssetSelection: et,
    toggleSelectionMode: Qt,
    selectAllVisibleAssets: Oe,
    batchReEnrichSelected: zt,
    checkHealth: Ct,
    loadFilters: Xt,
    loadSubfolders: Zt,
    toggleFilterSection: Ys,
    drillFolder: me,
    navigateFolderToAbsolute: Me,
    resetFolderPath: Ue,
    toggleTag: hs,
    resetSelectedTags: ve,
    setCategory: Un,
    resetCategory: u,
    loadAssets: b,
    loadMore: C,
    resetFilters: $,
    setViewMode: R,
    showToast: O,
    saveSettingsUrl: M,
    bootstrap: H,
    openDetail: T,
    closeDetail: U,
    loadDetail: I
  };
}), Wc = { class: "at-filters" }, qc = { class: "at-filters__row" }, Gc = { class: "at-filters__field" }, Jc = ["value"], Yc = {
  class: "at-filter-modes",
  role: "tablist",
  "aria-label": "Filter by folder, tag, or category"
}, Qc = ["aria-pressed"], zc = {
  key: 0,
  class: "at-mode-btn__dot",
  "aria-hidden": "true"
}, Xc = ["aria-pressed"], Zc = {
  key: 0,
  class: "at-mode-btn__dot",
  "aria-hidden": "true"
}, ta = ["aria-pressed"], ea = {
  key: 0,
  class: "at-mode-btn__dot",
  "aria-hidden": "true"
}, sa = {
  key: 0,
  class: "at-filter-section"
}, na = { class: "at-folder-nav" }, oa = { class: "at-breadcrumb" }, ia = {
  key: 0,
  class: "at-breadcrumb__sep"
}, ra = ["onClick"], la = {
  key: 0,
  class: "at-folder-chips"
}, ca = ["onClick"], aa = {
  key: 1,
  class: "at-folder-empty"
}, ua = {
  key: 1,
  class: "at-filter-section"
}, fa = { class: "at-tag-panel" }, da = { class: "at-tag-panel__top" }, ha = { class: "at-tag-chips" }, pa = ["onClick"], _a = { class: "at-tag-chip__count" }, ga = {
  key: 2,
  class: "at-filter-section"
}, ma = { class: "at-category-panel" }, va = {
  key: 0,
  class: "at-category-chips"
}, ya = ["onClick"], ba = {
  key: 1,
  class: "at-folder-empty"
}, Sa = /* @__PURE__ */ Gt({
  __name: "FilterPanel",
  setup(t) {
    const e = ae(), {
      baseModel: s,
      filterOptions: n,
      folderPath: o,
      libraryRootPath: i,
      subfolders: r,
      selectedTags: l,
      selectedCategory: c,
      openFilterSection: f,
      tagFilterText: a
    } = Ve(e);
    function h() {
      e.loadAssets(!0);
    }
    const p = pt(() => !!o.value), w = pt(() => l.value.length > 0), P = pt(() => !!c.value), E = pt(() => {
      const x = i.value, g = o.value, y = [{ label: "Library", path: "" }];
      if (!g || !x || !g.startsWith(x)) return y;
      const j = g.slice(x.length).replace(/^\//, "");
      if (!j) return y;
      const K = j.split("/").filter(Boolean);
      let F = x.replace(/\/$/, "");
      for (const D of K)
        F = `${F}/${D}`, y.push({ label: D, path: F });
      return y;
    }), N = pt(() => {
      var y;
      const x = ((y = n.value) == null ? void 0 : y.tags) ?? [], g = a.value.trim().toLowerCase();
      return g ? x.filter((j) => j.name.toLowerCase().includes(g)) : x;
    });
    function V(x) {
      return l.value.includes(x);
    }
    return (x, g) => {
      var y, j, K;
      return A(), k("div", Wc, [
        S("div", qc, [
          S("label", Gc, [
            g[8] || (g[8] = S("span", null, "Base model", -1)),
            Ts(S("select", {
              "onUpdate:modelValue": g[0] || (g[0] = (F) => /* @__PURE__ */ lt(s) ? s.value = F : null),
              class: "at-select",
              onChange: h
            }, [
              g[7] || (g[7] = S("option", { value: "" }, "Any", -1)),
              (A(!0), k(ot, null, Et(((y = m(n)) == null ? void 0 : y.base_models) ?? [], (F) => (A(), k("option", {
                key: F,
                value: F
              }, q(F), 9, Jc))), 128))
            ], 544), [
              [Sc, m(s)]
            ])
          ])
        ]),
        S("div", Yc, [
          S("button", {
            type: "button",
            class: Mt(["at-mode-btn", { "at-mode-btn--on": m(f) === "folder" }]),
            title: "Browse folders",
            "aria-pressed": m(f) === "folder",
            onClick: g[1] || (g[1] = (F) => m(e).toggleFilterSection("folder"))
          }, [
            g[9] || (g[9] = S("span", {
              class: "at-mode-btn__icon",
              "aria-hidden": "true"
            }, "📁", -1)),
            p.value ? (A(), k("span", zc)) : J("", !0)
          ], 10, Qc),
          S("button", {
            type: "button",
            class: Mt(["at-mode-btn", { "at-mode-btn--on": m(f) === "tag" }]),
            title: "Filter by tags",
            "aria-pressed": m(f) === "tag",
            onClick: g[2] || (g[2] = (F) => m(e).toggleFilterSection("tag"))
          }, [
            g[10] || (g[10] = S("span", {
              class: "at-mode-btn__icon",
              "aria-hidden": "true"
            }, "🏷", -1)),
            w.value ? (A(), k("span", Zc)) : J("", !0)
          ], 10, Xc),
          S("button", {
            type: "button",
            class: Mt(["at-mode-btn", { "at-mode-btn--on": m(f) === "category" }]),
            title: "Filter by category",
            "aria-pressed": m(f) === "category",
            onClick: g[3] || (g[3] = (F) => m(e).toggleFilterSection("category"))
          }, [
            g[11] || (g[11] = S("span", {
              class: "at-mode-btn__icon",
              "aria-hidden": "true"
            }, "📂", -1)),
            P.value ? (A(), k("span", ea)) : J("", !0)
          ], 10, ta)
        ]),
        m(f) === "folder" ? (A(), k("div", sa, [
          S("div", na, [
            S("div", oa, [
              (A(!0), k(ot, null, Et(E.value, (F, D) => (A(), k(ot, {
                key: F.path + D
              }, [
                D > 0 ? (A(), k("span", ia, "›")) : J("", !0),
                S("button", {
                  type: "button",
                  class: "at-breadcrumb__seg",
                  onClick: (W) => m(e).navigateFolderToAbsolute(F.path)
                }, q(F.label), 9, ra)
              ], 64))), 128))
            ]),
            m(r).length ? (A(), k("div", la, [
              (A(!0), k(ot, null, Et(m(r), (F) => (A(), k("button", {
                key: F,
                type: "button",
                class: "at-folder-chip",
                onClick: (D) => m(e).drillFolder(F)
              }, q(F), 9, ca))), 128))
            ])) : (A(), k("p", aa, "No subfolders here"))
          ])
        ])) : m(f) === "tag" ? (A(), k("div", ua, [
          S("div", fa, [
            S("div", da, [
              Ts(S("input", {
                "onUpdate:modelValue": g[4] || (g[4] = (F) => /* @__PURE__ */ lt(a) ? a.value = F : null),
                type: "search",
                class: "at-tag-search",
                placeholder: "Filter tag list…",
                autocomplete: "off"
              }, null, 512), [
                [Hn, m(a)]
              ]),
              S("button", {
                type: "button",
                class: "at-folder-reset",
                onClick: g[5] || (g[5] = (F) => m(e).resetSelectedTags())
              }, "Reset")
            ]),
            g[12] || (g[12] = S("p", { class: "at-tag-hint" }, "All selected tags must match (AND).", -1)),
            S("div", ha, [
              (A(!0), k(ot, null, Et(N.value, (F) => (A(), k("button", {
                key: F.tag_id,
                type: "button",
                class: Mt(["at-tag-chip", { "at-tag-chip--selected": V(F.name) }]),
                onClick: (D) => m(e).toggleTag(F.name)
              }, [
                It(q(F.name) + " ", 1),
                S("span", _a, q(F.count), 1)
              ], 10, pa))), 128))
            ])
          ])
        ])) : m(f) === "category" ? (A(), k("div", ga, [
          S("div", ma, [
            S("button", {
              type: "button",
              class: "at-folder-reset",
              onClick: g[6] || (g[6] = (F) => m(e).resetCategory())
            }, "Reset"),
            (((j = m(n)) == null ? void 0 : j.categories) ?? []).length ? (A(), k("div", va, [
              (A(!0), k(ot, null, Et(((K = m(n)) == null ? void 0 : K.categories) ?? [], (F) => (A(), k("button", {
                key: F,
                type: "button",
                class: Mt(["at-category-chip", { "at-category-chip--selected": m(c) === F }]),
                onClick: (D) => m(e).setCategory(F)
              }, q(F), 11, ya))), 128))
            ])) : (A(), k("p", ba, "No categories in index"))
          ])
        ])) : J("", !0)
      ]);
    };
  }
}), Yt = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, o] of e)
    s[n] = o;
  return s;
}, wa = /* @__PURE__ */ Yt(Sa, [["__scopeId", "data-v-01975e22"]]), xa = { class: "at-toolbar" }, Ca = {
  key: 0,
  class: "at-toolbar__row at-toolbar__row--select"
}, $a = { class: "at-toolbar__sel-label" }, Ta = { class: "at-toolbar__row at-toolbar__row--search" }, Aa = ["aria-pressed"], Ea = ["aria-pressed"], ka = ["aria-pressed"], Oa = /* @__PURE__ */ Gt({
  __name: "Toolbar",
  setup(t) {
    const e = ae();
    return (s, n) => (A(), k("div", xa, [
      m(e).selectionMode ? (A(), k("div", Ca, [
        S("span", $a, q(m(e).selectedCount) + " selected", 1),
        S("button", {
          type: "button",
          class: "at-toolbar__chip",
          onClick: n[0] || (n[0] = //@ts-ignore
          (...o) => m(e).selectAllVisibleAssets && m(e).selectAllVisibleAssets(...o))
        }, " All visible "),
        S("button", {
          type: "button",
          class: "at-toolbar__chip",
          onClick: n[1] || (n[1] = //@ts-ignore
          (...o) => m(e).clearAssetSelection && m(e).clearAssetSelection(...o))
        }, " Clear "),
        S("button", {
          type: "button",
          class: "at-toolbar__chip at-toolbar__chip--primary",
          onClick: n[2] || (n[2] = //@ts-ignore
          (...o) => m(e).batchReEnrichSelected && m(e).batchReEnrichSelected(...o))
        }, " Re-enrich selected "),
        S("button", {
          type: "button",
          class: "at-toolbar__chip",
          onClick: n[3] || (n[3] = //@ts-ignore
          (...o) => m(e).toggleSelectionMode && m(e).toggleSelectionMode(...o))
        }, "Done")
      ])) : J("", !0),
      S("div", Ta, [
        Ts(S("input", {
          "onUpdate:modelValue": n[4] || (n[4] = (o) => m(e).searchQuery = o),
          type: "search",
          class: "at-toolbar__search",
          placeholder: "name:, trigger:, category:, tag: or free text",
          autocomplete: "off"
        }, null, 512), [
          [Hn, m(e).searchQuery]
        ]),
        S("button", {
          type: "button",
          class: "at-icon-btn",
          title: "Grid view",
          "aria-pressed": m(e).viewMode === "grid",
          onClick: n[5] || (n[5] = (o) => m(e).setViewMode("grid"))
        }, " ▦ ", 8, Aa),
        S("button", {
          type: "button",
          class: "at-icon-btn",
          title: "List view",
          "aria-pressed": m(e).viewMode === "list",
          onClick: n[6] || (n[6] = (o) => m(e).setViewMode("list"))
        }, " ≡ ", 8, Ea),
        S("button", {
          type: "button",
          class: "at-icon-btn",
          title: "Select assets",
          "aria-pressed": m(e).selectionMode,
          onClick: n[7] || (n[7] = //@ts-ignore
          (...o) => m(e).toggleSelectionMode && m(e).toggleSelectionMode(...o))
        }, " ☑ ", 8, ka),
        S("button", {
          type: "button",
          class: "at-icon-btn",
          title: "Settings",
          onClick: n[8] || (n[8] = (o) => m(e).settingsOpen = !0)
        }, " ⚙ "),
        S("button", {
          type: "button",
          class: "at-reset",
          onClick: n[9] || (n[9] = (o) => m(e).resetFilters())
        }, " Reset ")
      ]),
      xt(wa)
    ]));
  }
}), Io = /* @__PURE__ */ Yt(Oa, [["__scopeId", "data-v-7e27da26"]]), Ma = { class: "at-status" }, Pa = ["title"], Ra = { class: "at-status__text" }, Ia = {
  key: 3,
  class: "at-status__more"
}, Fa = {
  key: 1,
  class: "at-status__toast"
}, La = /* @__PURE__ */ Gt({
  __name: "StatusBar",
  setup(t) {
    const e = ae(), { connected: s, total: n, items: o, loading: i, loadingMore: r, error: l, toast: c } = Ve(e);
    return (f, a) => (A(), k("div", Ma, [
      S("span", {
        class: Mt(["at-status__dot", m(s) ? "at-status__dot--ok" : "at-status__dot--bad"]),
        title: m(s) ? "Connected" : "Disconnected"
      }, null, 10, Pa),
      S("span", Ra, [
        m(i) && !m(o).length ? (A(), k(ot, { key: 0 }, [
          It("Loading…")
        ], 64)) : m(l) ? (A(), k(ot, { key: 1 }, [
          It(q(m(l)), 1)
        ], 64)) : (A(), k(ot, { key: 2 }, [
          It("Showing " + q(m(o).length) + " / " + q(m(n)), 1)
        ], 64)),
        m(r) ? (A(), k("span", Ia, " · More…")) : J("", !0)
      ]),
      !m(s) || m(l) ? (A(), k("button", {
        key: 0,
        type: "button",
        class: "at-status__retry",
        onClick: a[0] || (a[0] = (h) => m(e).bootstrap())
      }, " Retry ")) : J("", !0),
      m(c) ? (A(), k("span", Fa, q(m(c)), 1)) : J("", !0)
    ]));
  }
}), Fo = /* @__PURE__ */ Yt(La, [["__scopeId", "data-v-6f3959bc"]]);
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
const Da = ["checked"], ja = { class: "at-card__media" }, Na = ["src"], Ha = {
  key: 1,
  class: "at-card__placeholder"
}, Va = {
  key: 2,
  class: "at-card__cat"
}, Ua = {
  key: 3,
  class: "at-card__fav",
  title: "Favorite",
  "aria-hidden": "true"
}, Ba = ["title"], Ka = { class: "at-card__body" }, Wa = { class: "at-card__title-row" }, qa = ["title"], Ga = {
  key: 0,
  class: "at-card__bm"
}, Ja = {
  key: 1,
  class: "at-card__tw"
}, Ya = {
  key: 2,
  class: "at-card__usage"
}, Qa = { class: "at-card__actions" }, za = ["disabled"], Xa = ["title"], Za = /* @__PURE__ */ Gt({
  __name: "AssetCard",
  props: {
    item: {},
    compact: { type: Boolean }
  },
  setup(t) {
    const e = t, s = ae(), n = pt(() => Ss(e.item.cover_url)), o = pt(() => {
      const a = e.item.trigger_words || [];
      if (!a.length) return "";
      const h = a.slice(0, 3).join(", ");
      return a.length > 3 ? `${h}…` : h;
    }), i = pt(() => {
      const a = e.item.usage_count, h = e.item.last_used_at;
      if (!a && !h) return "";
      const p = [];
      return a && p.push(`uses: ${a}`), h && p.push(h.replace("T", " ").slice(0, 16)), p.join(" · ");
    }), r = pt(() => {
      const a = e.item.checkpoint_meta;
      if (!a) return { text: "", title: "" };
      const h = [], p = [], w = a.recommended_cfg;
      w != null && (h.push(`CFG ${w}`), p.push(`CFG ${w}`));
      const P = a.recommended_steps;
      P != null && (h.push(`${P} steps`), p.push(`${P} steps`));
      const E = (a.recommended_sampler ?? "").trim();
      if (E) {
        const x = E.length > 22 ? `${E.slice(0, 21)}…` : E;
        h.push(x), p.push(`Sampler: ${E}`);
      }
      const N = (a.recommended_scheduler ?? "").trim();
      if (N) {
        const x = N.length > 18 ? `${N.slice(0, 17)}…` : N;
        h.push(x), p.push(`Scheduler: ${N}`);
      }
      const V = a.recommended_clip_skip;
      return V != null && (h.push(`CLIP ${V}`), p.push(`CLIP skip: ${V}`)), { text: h.join(" · "), title: p.join(`
`) };
    });
    function l(a) {
      var w;
      const h = (w = e.item.comfy_checkpoint_name) == null ? void 0 : w.trim();
      if (!h || !a.dataTransfer) return;
      const p = e.item.checkpoint_meta;
      a.dataTransfer.setData(
        "application/x-at-checkpoint",
        JSON.stringify({
          comfy_checkpoint_name: h,
          display_name: e.item.display_name,
          base_model: e.item.base_model,
          recommended_clip_skip: (p == null ? void 0 : p.recommended_clip_skip) ?? null
        })
      ), a.dataTransfer.effectAllowed = "copy";
    }
    async function c(a) {
      var w;
      a.stopPropagation();
      const h = (w = e.item.comfy_checkpoint_name) == null ? void 0 : w.trim();
      if (!h) return;
      const p = await Qi(h);
      s.showToast(p ? "Copied" : "Copy failed");
    }
    function f(a) {
      if (!a.target.closest(
        "button, .at-card__drag, a, .at-card__select, .at-card__select input"
      )) {
        if (s.selectionMode) {
          s.toggleAssetSelect(e.item.asset_id);
          return;
        }
        s.openDetail(e.item.asset_id);
      }
    }
    return (a, h) => (A(), k("article", {
      class: Mt(["at-card", {
        "at-card--compact": t.compact,
        "at-card--selected": m(s).selectionMode && m(s).isAssetSelected(t.item.asset_id)
      }]),
      onClick: f
    }, [
      m(s).selectionMode ? (A(), k("label", {
        key: 0,
        class: "at-card__select",
        onClick: h[1] || (h[1] = pe(() => {
        }, ["stop"]))
      }, [
        S("input", {
          type: "checkbox",
          checked: m(s).isAssetSelected(t.item.asset_id),
          onChange: h[0] || (h[0] = pe((p) => m(s).toggleAssetSelect(t.item.asset_id), ["stop"]))
        }, null, 40, Da)
      ])) : J("", !0),
      S("div", ja, [
        n.value ? (A(), k("img", {
          key: 0,
          src: n.value,
          loading: "lazy",
          alt: "",
          class: "at-card__img"
        }, null, 8, Na)) : (A(), k("div", Ha, "No image")),
        t.item.category ? (A(), k("span", Va, q(t.item.category), 1)) : J("", !0),
        t.item.is_favorite ? (A(), k("span", Ua, "★")) : J("", !0),
        r.value.text && !t.compact ? (A(), k("div", {
          key: 4,
          class: "at-card__rec-strip",
          title: r.value.title || "Recommended parameters"
        }, q(r.value.text), 9, Ba)) : J("", !0)
      ]),
      S("div", Ka, [
        S("div", Wa, [
          S("span", {
            class: "at-card__title",
            title: t.item.display_name || t.item.filename
          }, q(t.item.display_name || t.item.filename), 9, qa)
        ]),
        t.item.base_model && !t.compact ? (A(), k("div", Ga, q(t.item.base_model), 1)) : J("", !0),
        o.value ? (A(), k("div", Ja, q(o.value), 1)) : J("", !0),
        t.compact && i.value ? (A(), k("div", Ya, q(i.value), 1)) : J("", !0),
        S("div", {
          class: Mt(["at-card__actions-row", { "at-card__actions-row--compact": t.compact }])
        }, [
          S("div", Qa, [
            S("button", {
              type: "button",
              class: "at-card__btn at-card__btn--primary",
              disabled: !t.item.comfy_checkpoint_name,
              onClick: pe(c, ["stop"])
            }, " Copy name ", 8, za)
          ]),
          t.item.base_model && t.compact ? (A(), k("span", {
            key: 0,
            class: "at-card__bm-compact",
            title: t.item.base_model
          }, q(t.item.base_model), 9, Xa)) : J("", !0)
        ], 2)
      ]),
      S("button", {
        type: "button",
        class: "at-card__drag",
        title: "Drag to LM Checkpoint Loader",
        draggable: "true",
        onDragstart: l,
        onClick: h[2] || (h[2] = pe(() => {
        }, ["stop"]))
      }, " ⠿ ", 32)
    ], 2));
  }
}), zi = /* @__PURE__ */ Yt(Za, [["__scopeId", "data-v-ad0bd791"]]), tu = { class: "at-grid" }, eu = /* @__PURE__ */ Gt({
  __name: "AssetGrid",
  setup(t) {
    const e = ae(), { items: s } = Ve(e);
    return (n, o) => (A(), k("div", tu, [
      (A(!0), k(ot, null, Et(m(s), (i) => (A(), he(zi, {
        key: i.asset_id,
        item: i
      }, null, 8, ["item"]))), 128))
    ]));
  }
}), su = /* @__PURE__ */ Yt(eu, [["__scopeId", "data-v-bc27028f"]]), nu = { class: "at-list" }, ou = /* @__PURE__ */ Gt({
  __name: "AssetList",
  setup(t) {
    const e = ae(), { items: s } = Ve(e);
    return (n, o) => (A(), k("div", nu, [
      (A(!0), k(ot, null, Et(m(s), (i) => (A(), he(zi, {
        key: i.asset_id,
        item: i,
        compact: ""
      }, null, 8, ["item"]))), 128))
    ]));
  }
}), iu = /* @__PURE__ */ Yt(ou, [["__scopeId", "data-v-d1d6175a"]]), ru = {
  class: "at-settings",
  role: "dialog",
  "aria-label": "Checkpoint library settings"
}, lu = { class: "at-settings__label" }, cu = { class: "at-settings__section" }, au = { class: "at-settings__row" }, uu = ["disabled"], fu = {
  key: 0,
  class: "at-settings__err"
}, du = {
  key: 0,
  class: "at-settings__ok"
}, hu = {
  key: 1,
  class: "at-settings__warn"
}, pu = {
  key: 2,
  class: "at-settings__stale-list"
}, _u = { class: "at-settings__stale-name" }, gu = { key: 0 }, mu = ["disabled"], vu = /* @__PURE__ */ Gt({
  __name: "SettingsPanel",
  setup(t) {
    const e = ae(), s = /* @__PURE__ */ Y(null), n = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(!1), i = /* @__PURE__ */ Y(null);
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
          const p = await Vc();
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
    function a() {
      e.saveSettingsUrl(), e.settingsOpen = !1;
    }
    return (h, p) => (A(), k("div", {
      class: "at-settings-backdrop",
      onClick: pe(f, ["self"])
    }, [
      S("div", ru, [
        p[4] || (p[4] = S("h2", { class: "at-settings__title" }, "AssetThingie — Checkpoints", -1)),
        S("label", lu, [
          p[1] || (p[1] = It(" Server URL ", -1)),
          Ts(S("input", {
            "onUpdate:modelValue": p[0] || (p[0] = (w) => m(e).baseUrlInput = w),
            type: "url",
            class: "at-settings__input"
          }, null, 512), [
            [Hn, m(e).baseUrlInput]
          ])
        ]),
        p[5] || (p[5] = S("p", { class: "at-settings__hint" }, [
          It(" AssetThingie URL. Default "),
          S("code", null, "http://127.0.0.1:8080")
        ], -1)),
        S("div", cu, [
          p[2] || (p[2] = S("h3", { class: "at-settings__subtitle" }, "Library maintenance", -1)),
          p[3] || (p[3] = S("p", { class: "at-settings__hint" }, " Remove database entries for model files that are no longer on disk, and delete their cached cover/example images. ", -1)),
          S("div", au, [
            S("button", {
              type: "button",
              class: "at-settings__btn",
              disabled: n.value,
              onClick: l
            }, q(n.value ? "Checking…" : "Check for missing files"), 9, uu)
          ]),
          i.value ? (A(), k("p", fu, q(i.value), 1)) : s.value ? (A(), k(ot, { key: 1 }, [
            s.value.stale_count === 0 ? (A(), k("p", du, " Library is clean — no missing models found. ")) : (A(), k("p", hu, q(s.value.stale_count) + " model" + q(s.value.stale_count === 1 ? "" : "s") + " missing from disk. Cached images: ~" + q(r(s.value.orphan_cache_bytes)) + ". ", 1)),
            s.value.stale_count > 0 ? (A(), k("ul", pu, [
              (A(!0), k(ot, null, Et(s.value.stale_assets.slice(0, 12), (w) => (A(), k("li", {
                key: w.asset_id
              }, [
                S("span", _u, q(w.display_name || w.path), 1)
              ]))), 128)),
              s.value.stale_assets.length > 12 ? (A(), k("li", gu, "…")) : J("", !0)
            ])) : J("", !0),
            S("button", {
              type: "button",
              class: "at-settings__btn at-settings__btn--danger",
              disabled: s.value.stale_count === 0 || o.value,
              onClick: c
            }, q(o.value ? "Removing…" : "Confirm removal"), 9, mu)
          ], 64)) : J("", !0)
        ]),
        S("div", { class: "at-settings__actions" }, [
          S("button", {
            type: "button",
            class: "at-settings__btn",
            onClick: f
          }, "Cancel"),
          S("button", {
            type: "button",
            class: "at-settings__btn at-settings__btn--primary",
            onClick: a
          }, " Save & reconnect ")
        ])
      ])
    ]));
  }
}), yu = /* @__PURE__ */ Yt(vu, [["__scopeId", "data-v-1bcc70bd"]]), bu = { class: "at-imlb__inner" }, Su = ["src"], wu = {
  key: 0,
  class: "at-imlb__meta"
}, xu = /* @__PURE__ */ Gt({
  __name: "ImageMetaLightbox",
  props: {
    imageUrl: {},
    meta: {}
  },
  emits: ["close"],
  setup(t) {
    return (e, s) => (A(), he(el, { to: "body" }, [
      t.imageUrl ? (A(), k("div", {
        key: 0,
        class: "at-imlb",
        onClick: s[1] || (s[1] = pe((n) => e.$emit("close"), ["self"]))
      }, [
        S("div", bu, [
          S("button", {
            type: "button",
            class: "at-imlb__x",
            onClick: s[0] || (s[0] = (n) => e.$emit("close"))
          }, "×"),
          S("img", {
            src: t.imageUrl,
            alt: "Preview"
          }, null, 8, Su),
          t.meta && Object.keys(t.meta).length ? (A(), k("pre", wu, q(JSON.stringify(t.meta, null, 2)), 1)) : J("", !0)
        ])
      ])) : J("", !0)
    ]));
  }
}), Cu = /* @__PURE__ */ Yt(xu, [["__scopeId", "data-v-b698c59a"]]), $u = { class: "at-detail__head" }, Tu = {
  key: 0,
  class: "at-detail__loading"
}, Au = {
  key: 1,
  class: "at-detail__scroll"
}, Eu = {
  key: 0,
  class: "at-detail__cover-wrap"
}, ku = ["src"], Ou = { class: "at-detail__name" }, Mu = {
  key: 1,
  class: "at-detail__meta"
}, Pu = {
  key: 2,
  class: "at-detail__meta"
}, Ru = { class: "at-detail__syntax" }, Iu = { class: "at-detail__sec-head" }, Fu = { class: "at-detail__code" }, Lu = {
  key: 3,
  class: "at-detail__section"
}, Du = { class: "at-detail__rec-list" }, ju = {
  key: 4,
  class: "at-detail__meta"
}, Nu = {
  key: 5,
  class: "at-detail__section"
}, Hu = { class: "at-detail__notes" }, Vu = { class: "at-detail__section" }, Uu = { class: "at-detail__sec-head" }, Bu = {
  key: 0,
  class: "at-detail__tw-list"
}, Ku = {
  key: 1,
  class: "at-detail__tw-empty"
}, Wu = {
  key: 6,
  class: "at-detail__section"
}, qu = { class: "at-detail__tags" }, Gu = {
  key: 7,
  class: "at-detail__meta"
}, Ju = ["href"], Yu = { class: "at-detail__row-actions" }, Qu = ["disabled"], zu = {
  key: 9,
  class: "at-detail__meta"
}, Xu = {
  key: 10,
  class: "at-detail__section"
}, Zu = ["innerHTML"], tf = {
  key: 11,
  class: "at-detail__section"
}, ef = { class: "at-detail__gallery" }, sf = ["onClick"], nf = ["src"], of = {
  key: 12,
  class: "at-detail__section"
}, rf = { class: "at-detail__path-line" }, lf = /* @__PURE__ */ Gt({
  __name: "DetailPanel",
  setup(t) {
    const e = ae(), { detail: s, detailLoading: n } = Ve(e), o = pt(
      () => s.value ? Ss(s.value.cover_url_full || s.value.cover_url) : null
    ), i = pt(() => {
      var g;
      const x = (g = s.value) == null ? void 0 : g.trigger_words;
      return x ? Array.isArray(x) ? x.map((y) => String(y).trim()).filter(Boolean) : [] : [];
    }), r = pt(() => i.value.join(", ")), l = pt(() => {
      const x = s.value;
      if (!x) return "";
      const g = (x.path ?? "").trim(), y = (x.comfy_checkpoint_name ?? "").trim();
      if (!g && !y) return "";
      if (!y) return g;
      if (!g) return y;
      const j = g.includes("\\") ? "\\" : "/", K = g.replace(/[/\\]+$/, "");
      return K.endsWith(y) || g.endsWith(y) ? g : `${K}${j}${y}`;
    }), c = {
      recommended_sampler: "Sampler",
      recommended_scheduler: "Scheduler",
      recommended_steps: "Steps",
      recommended_cfg: "CFG",
      recommended_clip_skip: "CLIP skip",
      recommended_prompt: "Prompt",
      recommended_negative_prompt: "Negative prompt"
    }, f = pt(() => {
      var y;
      const x = (y = s.value) == null ? void 0 : y.system_fields;
      if (!x || typeof x != "object") return [];
      const g = [];
      for (const j of Object.keys(c))
        j in x && x[j] != null && x[j] !== "" && g.push([j, c[j]]);
      return g;
    });
    function a(x) {
      return x == null ? "—" : String(x);
    }
    async function h(x, g) {
      const y = (g ?? "").trim();
      if (!y) return;
      const j = await Qi(y);
      e.showToast(j ? `Copied ${x}` : "Copy failed");
    }
    const p = /* @__PURE__ */ Y(null), w = /* @__PURE__ */ Y(null);
    function P() {
      p.value = null, w.value = null;
    }
    function E(x) {
      const g = Ss(x.url || x.thumbnail_url);
      if (!g) return;
      p.value = g;
      const y = x.generation_params;
      y && typeof y == "object" && Object.keys(y).length ? w.value = { ...y } : (x.caption ?? "").trim() ? w.value = { caption: x.caption } : w.value = null;
    }
    _e(
      () => {
        var x;
        return (x = s.value) == null ? void 0 : x.asset_id;
      },
      () => {
        P();
      }
    );
    const N = /* @__PURE__ */ Y(!1);
    async function V() {
      var g;
      const x = (g = s.value) == null ? void 0 : g.asset_id;
      if (x != null) {
        N.value = !0;
        try {
          await Uc(x), e.showToast("Metadata refreshed"), await e.loadDetail();
        } catch (y) {
          e.showToast(y instanceof Error ? y.message : "Refresh failed");
        } finally {
          N.value = !1;
        }
      }
    }
    return (x, g) => (A(), k("div", {
      class: "at-detail",
      onClick: g[4] || (g[4] = pe((y) => m(e).closeDetail(), ["self"]))
    }, [
      S("div", {
        class: "at-detail__panel",
        onClick: g[3] || (g[3] = pe(() => {
        }, ["stop"]))
      }, [
        S("div", $u, [
          g[5] || (g[5] = S("h2", { class: "at-detail__h" }, "Details", -1)),
          S("button", {
            type: "button",
            class: "at-detail__close",
            onClick: g[0] || (g[0] = (y) => m(e).closeDetail())
          }, "×")
        ]),
        m(n) ? (A(), k("div", Tu, "Loading…")) : m(s) ? (A(), k("div", Au, [
          o.value ? (A(), k("div", Eu, [
            S("img", {
              src: o.value,
              alt: "",
              class: "at-detail__cover",
              loading: "lazy"
            }, null, 8, ku)
          ])) : J("", !0),
          S("p", Ou, q(m(s).display_name || m(s).filename), 1),
          m(s).base_model ? (A(), k("p", Mu, "Base: " + q(m(s).base_model), 1)) : J("", !0),
          m(s).default_strength != null && Number(m(s).default_strength) !== 1 ? (A(), k("p", Pu, " Default strength: " + q(m(s).default_strength), 1)) : J("", !0),
          S("div", Ru, [
            S("div", Iu, [
              g[6] || (g[6] = S("span", { class: "at-detail__mini-label" }, "Comfy checkpoint", -1)),
              m(s).comfy_checkpoint_name ? (A(), k("button", {
                key: 0,
                type: "button",
                class: "at-detail__mini",
                onClick: g[1] || (g[1] = (y) => h("checkpoint name", m(s).comfy_checkpoint_name))
              }, " Copy ")) : J("", !0)
            ]),
            S("code", Fu, q(m(s).comfy_checkpoint_name || "—"), 1)
          ]),
          f.value.length ? (A(), k("section", Lu, [
            g[7] || (g[7] = S("div", { class: "at-detail__sec-title" }, "Checkpoint recommendations", -1)),
            S("dl", Du, [
              (A(!0), k(ot, null, Et(f.value, ([y, j]) => {
                var K;
                return A(), k(ot, { key: y }, [
                  S("dt", null, q(j), 1),
                  S("dd", null, q(a((K = m(s).system_fields) == null ? void 0 : K[y])), 1)
                ], 64);
              }), 128))
            ])
          ])) : J("", !0),
          m(s).category || m(s).subcategory ? (A(), k("p", ju, q([m(s).category, m(s).subcategory].filter(Boolean).join(" / ")), 1)) : J("", !0),
          m(s).notes ? (A(), k("section", Nu, [
            g[8] || (g[8] = S("div", { class: "at-detail__sec-title" }, "Notes", -1)),
            S("p", Hu, q(m(s).notes), 1)
          ])) : J("", !0),
          S("section", Vu, [
            S("div", Uu, [
              g[9] || (g[9] = S("span", { class: "at-detail__sec-title" }, "Triggers", -1)),
              i.value.length ? (A(), k("button", {
                key: 0,
                type: "button",
                class: "at-detail__mini",
                onClick: g[2] || (g[2] = (y) => h("triggers", r.value))
              }, " Copy ")) : J("", !0)
            ]),
            i.value.length ? (A(), k("ul", Bu, [
              (A(!0), k(ot, null, Et(i.value, (y, j) => (A(), k("li", {
                key: `${j}-${y}`,
                class: "at-detail__tw-item"
              }, [
                S("code", null, q(y), 1)
              ]))), 128))
            ])) : (A(), k("p", Ku, "—"))
          ]),
          (m(s).tags ?? []).length ? (A(), k("section", Wu, [
            g[10] || (g[10] = S("div", { class: "at-detail__sec-title" }, "Tags", -1)),
            S("div", qu, [
              (A(!0), k(ot, null, Et(m(s).tags, (y) => (A(), k("span", {
                key: y,
                class: "at-detail__tag"
              }, q(y), 1))), 128))
            ])
          ])) : J("", !0),
          m(s).source_creator_name ? (A(), k("p", Gu, " By " + q(m(s).source_creator_name), 1)) : J("", !0),
          m(s).source_url ? (A(), k("a", {
            key: 8,
            href: m(s).source_url,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "at-detail__link"
          }, "Source", 8, Ju)) : J("", !0),
          S("div", Yu, [
            S("button", {
              type: "button",
              class: "at-detail__mini",
              disabled: N.value,
              onClick: V
            }, q(N.value ? "Refreshing…" : "Refresh from Civitai"), 9, Qu)
          ]),
          m(s).usage_count || m(s).last_used_at ? (A(), k("p", zu, [
            It(" Uses: " + q(m(s).usage_count), 1),
            m(s).last_used_at ? (A(), k(ot, { key: 0 }, [
              It(" · " + q(m(s).last_used_at.replace("T", " ").slice(0, 19)), 1)
            ], 64)) : J("", !0)
          ])) : J("", !0),
          m(s).description_html ? (A(), k("section", Xu, [
            g[11] || (g[11] = S("div", { class: "at-detail__sec-title" }, "Description", -1)),
            S("div", {
              class: "at-detail__html",
              innerHTML: m(s).description_html
            }, null, 8, Zu)
          ])) : J("", !0),
          m(s).example_media.length ? (A(), k("section", tf, [
            g[12] || (g[12] = S("div", { class: "at-detail__sec-title" }, "Examples", -1)),
            S("div", ef, [
              (A(!0), k(ot, null, Et(m(s).example_media, (y) => (A(), k("div", {
                key: y.media_id,
                class: "at-detail__ex-wrap"
              }, [
                S("button", {
                  type: "button",
                  class: "at-detail__ex",
                  onClick: (j) => E(y)
                }, [
                  y.thumbnail_url || y.url ? (A(), k("img", {
                    key: 0,
                    src: Ss(y.thumbnail_url || y.url) || "",
                    alt: "",
                    class: "at-detail__ex-img",
                    loading: "lazy"
                  }, null, 8, nf)) : J("", !0)
                ], 8, sf)
              ]))), 128))
            ])
          ])) : J("", !0),
          l.value ? (A(), k("section", of, [
            g[13] || (g[13] = S("div", { class: "at-detail__sec-title" }, "Path", -1)),
            S("p", rf, q(l.value), 1)
          ])) : J("", !0)
        ])) : J("", !0)
      ]),
      xt(Cu, {
        "image-url": p.value,
        meta: w.value,
        onClose: P
      }, null, 8, ["image-url", "meta"])
    ]));
  }
}), cf = /* @__PURE__ */ Yt(lf, [["__scopeId", "data-v-1e25987e"]]), af = { class: "at-app" }, uf = {
  key: 0,
  class: "at-main-column"
}, ff = { class: "at-empty at-empty--fill" }, df = {
  key: 1,
  class: "at-main-column"
}, hf = { class: "at-chrome" }, pf = {
  key: 0,
  class: "at-empty at-empty--fill"
}, _f = 160, gf = /* @__PURE__ */ Gt({
  __name: "App",
  setup(t) {
    const e = ae(), { connected: s, items: n, loading: o, loadingMore: i, viewMode: r, settingsOpen: l, selectedAssetId: c } = Ve(e), f = /* @__PURE__ */ Y(null);
    function a(P) {
      return P.scrollHeight - P.scrollTop - P.clientHeight <= _f;
    }
    function h() {
      const P = f.value;
      !P || !e.hasMore || e.loading || e.loadingMore || a(P) && e.loadMore();
    }
    let p = 0;
    function w() {
      p || (p = requestAnimationFrame(() => {
        p = 0, h();
      }));
    }
    return _e(
      () => f.value,
      (P, E) => {
        E && E.removeEventListener("scroll", w), P && (P.addEventListener("scroll", w, { passive: !0 }), requestAnimationFrame(() => h()));
      },
      { flush: "post", immediate: !0 }
    ), _e(
      [n, o, i, s],
      () => {
        requestAnimationFrame(() => h());
      },
      { flush: "post" }
    ), Si(() => {
      e.bootstrap();
    }), Fn(() => {
      const P = f.value;
      P && P.removeEventListener("scroll", w);
    }), (P, E) => (A(), k("div", af, [
      m(s) ? (A(), k("div", df, [
        S("div", hf, [
          xt(Io),
          xt(Fo)
        ]),
        !m(e).loading && !m(n).length && !m(e).error ? (A(), k("div", pf, [
          E[6] || (E[6] = S("p", null, "No checkpoints in the index for this filter.", -1)),
          S("button", {
            type: "button",
            class: "at-empty__btn",
            onClick: E[2] || (E[2] = (N) => m(e).resetFilters())
          }, " Reset filters ")
        ])) : (A(), k("div", {
          key: 1,
          ref_key: "scrollRoot",
          ref: f,
          class: "at-scroll"
        }, [
          m(r) === "grid" ? (A(), he(su, { key: 0 })) : (A(), he(iu, { key: 1 }))
        ], 512))
      ])) : (A(), k("div", uf, [
        xt(Io),
        xt(Fo),
        S("div", ff, [
          S("p", null, [
            E[3] || (E[3] = It("Could not connect to AssetThingie at ", -1)),
            S("code", null, q(m(e).baseUrlInput), 1),
            E[4] || (E[4] = It(".", -1))
          ]),
          E[5] || (E[5] = S("p", { class: "at-empty__sub" }, "Start the app or open settings to change the URL.", -1)),
          S("button", {
            type: "button",
            class: "at-empty__btn",
            onClick: E[0] || (E[0] = (N) => m(e).settingsOpen = !0)
          }, " Settings "),
          S("button", {
            type: "button",
            class: "at-empty__btn",
            onClick: E[1] || (E[1] = (N) => m(e).bootstrap())
          }, "Retry")
        ])
      ])),
      m(l) ? (A(), he(yu, { key: 2 })) : J("", !0),
      m(c) != null ? (A(), he(cf, { key: 3 })) : J("", !0)
    ]));
  }
}), mf = /* @__PURE__ */ Yt(gf, [["__scopeId", "data-v-b919f05e"]]);
function vf(t) {
  const e = kc(), s = Tc(mf);
  return s.use(e), s.mount(t), s;
}
export {
  vf as mount
};
