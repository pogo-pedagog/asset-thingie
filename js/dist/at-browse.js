//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
/* @__NO_SIDE_EFFECTS__ */
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ee = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, te = /-\w/g, E = ee((e) => e.replace(te, (e) => e.slice(1).toUpperCase())), ne = /\B([A-Z])/g, D = ee((e) => e.replace(ne, "-$1").toLowerCase()), re = ee((e) => e.charAt(0).toUpperCase() + e.slice(1)), ie = ee((e) => e ? `on${re(e)}` : ""), O = (e, t) => !Object.is(e, t), ae = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, k = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, oe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, se, ce = () => se ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function le(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? pe(r) : le(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var ue = /;(?![^(]*\))/g, de = /:([^]+)/, fe = /\/\*[^]*?\*\//g;
function pe(e) {
	let t = {};
	return e.replace(fe, "").split(ue).forEach((e) => {
		if (e) {
			let n = e.split(de);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function A(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = A(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var me = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", he = /* @__PURE__ */ e(me);
me + "";
function ge(e) {
	return !!e || e === "";
}
function _e(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = ve(e[r], t[r]);
	return n;
}
function ve(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? _e(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !ve(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function ye(e, t) {
	return e.findIndex((e) => ve(e, t));
}
var be = (e) => !!(e && e.__v_isRef === !0), j = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? be(e) ? j(e.value) : JSON.stringify(e, xe, 2) : String(e), xe = (e, t) => be(t) ? xe(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Se(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Se(e)) } : _(t) ? Se(t) : v(t) && !d(t) && !C(t) ? String(t) : t, Se = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, M, Ce = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = M, !e && M && (this.index = (M.scopes ||= []).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = M;
			try {
				return M = this, e();
			} finally {
				M = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = M, M = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (M = this.prevScope, this.prevScope = void 0);
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function we(e) {
	return new Ce(e);
}
function Te() {
	return M;
}
function Ee(e, t = !1) {
	M && M.cleanups.push(e);
}
var N, De = /* @__PURE__ */ new WeakSet(), Oe = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, M && M.active && M.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, De.has(this) && (De.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Me(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ge(this), Fe(this);
		let e = N, t = Ve;
		N = this, Ve = !0;
		try {
			return this.fn();
		} finally {
			Ie(this), N = e, Ve = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) ze(e);
			this.deps = this.depsTail = void 0, Ge(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? De.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Le(this) && this.run();
	}
	get dirty() {
		return Le(this);
	}
}, ke = 0, Ae, je;
function Me(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = je, je = e;
		return;
	}
	e.next = Ae, Ae = e;
}
function Ne() {
	ke++;
}
function Pe() {
	if (--ke > 0) return;
	if (je) {
		let e = je;
		for (je = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Ae;) {
		let t = Ae;
		for (Ae = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Fe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ie(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), ze(r), Be(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Le(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Re(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Re(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ke) || (e.globalVersion = Ke, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Le(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = N, r = Ve;
	N = e, Ve = !0;
	try {
		Fe(e);
		let n = e.fn(e._value);
		(t.version === 0 || O(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		N = n, Ve = r, Ie(e), e.flags &= -3;
	}
}
function ze(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) ze(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Be(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Ve = !0, He = [];
function Ue() {
	He.push(Ve), Ve = !1;
}
function We() {
	let e = He.pop();
	Ve = e === void 0 ? !0 : e;
}
function Ge(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = N;
		N = void 0;
		try {
			t();
		} finally {
			N = e;
		}
	}
}
var Ke = 0, qe = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Je = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!N || !Ve || N === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== N) t = this.activeLink = new qe(N, this), N.deps ? (t.prevDep = N.depsTail, N.depsTail.nextDep = t, N.depsTail = t) : N.deps = N.depsTail = t, Ye(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = N.depsTail, t.nextDep = void 0, N.depsTail.nextDep = t, N.depsTail = t, N.deps === t && (N.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ke++, this.notify(e);
	}
	notify(e) {
		Ne();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Pe();
		}
	}
};
function Ye(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ye(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Xe = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ Symbol(""), Qe = /* @__PURE__ */ Symbol(""), $e = /* @__PURE__ */ Symbol("");
function P(e, t, n) {
	if (Ve && N) {
		let t = Xe.get(e);
		t || Xe.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Je()), r.map = t, r.key = n), r.track();
	}
}
function et(e, t, n, r, i, a) {
	let o = Xe.get(e);
	if (!o) {
		Ke++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Ne(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === $e || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get($e)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "delete":
				i || (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "set":
				f(e) && s(o.get(Ze));
				break;
		}
	}
	Pe();
}
function tt(e, t) {
	let n = Xe.get(e);
	return n && n.get(t);
}
function nt(e) {
	let t = /* @__PURE__ */ I(e);
	return t === e ? t : (P(t, "iterate", $e), /* @__PURE__ */ F(e) ? t : t.map(Wt));
}
function rt(e) {
	return P(e = /* @__PURE__ */ I(e), "iterate", $e), e;
}
function it(e, t) {
	return /* @__PURE__ */ Vt(e) ? Gt(/* @__PURE__ */ Bt(e) ? Wt(t) : t) : Wt(t);
}
var at = {
	__proto__: null,
	[Symbol.iterator]() {
		return ot(this, Symbol.iterator, (e) => it(this, e));
	},
	concat(...e) {
		return nt(this).concat(...e.map((e) => d(e) ? nt(e) : e));
	},
	entries() {
		return ot(this, "entries", (e) => (e[1] = it(this, e[1]), e));
	},
	every(e, t) {
		return ct(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return ct(this, "filter", e, t, (e) => e.map((e) => it(this, e)), arguments);
	},
	find(e, t) {
		return ct(this, "find", e, t, (e) => it(this, e), arguments);
	},
	findIndex(e, t) {
		return ct(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return ct(this, "findLast", e, t, (e) => it(this, e), arguments);
	},
	findLastIndex(e, t) {
		return ct(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return ct(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return ut(this, "includes", e);
	},
	indexOf(...e) {
		return ut(this, "indexOf", e);
	},
	join(e) {
		return nt(this).join(e);
	},
	lastIndexOf(...e) {
		return ut(this, "lastIndexOf", e);
	},
	map(e, t) {
		return ct(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return dt(this, "pop");
	},
	push(...e) {
		return dt(this, "push", e);
	},
	reduce(e, ...t) {
		return lt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return lt(this, "reduceRight", e, t);
	},
	shift() {
		return dt(this, "shift");
	},
	some(e, t) {
		return ct(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return dt(this, "splice", e);
	},
	toReversed() {
		return nt(this).toReversed();
	},
	toSorted(e) {
		return nt(this).toSorted(e);
	},
	toSpliced(...e) {
		return nt(this).toSpliced(...e);
	},
	unshift(...e) {
		return dt(this, "unshift", e);
	},
	values() {
		return ot(this, "values", (e) => it(this, e));
	}
};
function ot(e, t, n) {
	let r = rt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ F(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var st = Array.prototype;
function ct(e, t, n, r, i, a) {
	let o = rt(e), s = o !== e && !/* @__PURE__ */ F(e), c = o[t];
	if (c !== st[t]) {
		let t = c.apply(e, a);
		return s ? Wt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, it(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function lt(e, t, n, r) {
	let i = rt(e), a = i !== e && !/* @__PURE__ */ F(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = it(e, t)), n.call(this, t, it(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? it(e, c) : c;
}
function ut(e, t, n) {
	let r = /* @__PURE__ */ I(e);
	P(r, "iterate", $e);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ht(n[0]) ? (n[0] = /* @__PURE__ */ I(n[0]), r[t](...n)) : i;
}
function dt(e, t, n = []) {
	Ue(), Ne();
	let r = (/* @__PURE__ */ I(e))[t].apply(e, n);
	return Pe(), We(), r;
}
var ft = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), pt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function mt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ I(this);
	return P(t, "has", e), t.hasOwnProperty(e);
}
var ht = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Nt : Mt : i ? jt : At).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = at[t])) return e;
			if (t === "hasOwnProperty") return mt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ L(e) ? e : n);
		if ((_(t) ? pt.has(t) : ft(t)) || (r || P(e, "get", t), i)) return o;
		if (/* @__PURE__ */ L(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Rt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Rt(o) : /* @__PURE__ */ It(o) : o;
	}
}, gt = class extends ht {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Vt(i);
			if (!/* @__PURE__ */ F(n) && !/* @__PURE__ */ Vt(n) && (i = /* @__PURE__ */ I(i), n = /* @__PURE__ */ I(n)), !a && /* @__PURE__ */ L(i) && !/* @__PURE__ */ L(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ L(e) ? e : r);
		return e === /* @__PURE__ */ I(r) && (o ? O(n, i) && et(e, "set", t, n, i) : et(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && et(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !pt.has(t)) && P(e, "has", t), n;
	}
	ownKeys(e) {
		return P(e, "iterate", d(e) ? "length" : Ze), Reflect.ownKeys(e);
	}
}, _t = class extends ht {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, vt = /* @__PURE__ */ new gt(), yt = /* @__PURE__ */ new _t(), bt = /* @__PURE__ */ new gt(!0), xt = (e) => e, St = (e) => Reflect.getPrototypeOf(e);
function Ct(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ I(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? xt : t ? Gt : Wt;
		return !t && P(a, "iterate", l ? Qe : Ze), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function wt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Tt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ I(r), a = /* @__PURE__ */ I(n);
			e || (O(n, a) && P(i, "get", n), P(i, "get", a));
			let { has: o } = St(i), s = t ? xt : e ? Gt : Wt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && P(/* @__PURE__ */ I(t), "iterate", Ze), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ I(n), i = /* @__PURE__ */ I(t);
			return e || (O(t, i) && P(r, "has", t), P(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ I(a), s = t ? xt : e ? Gt : Wt;
			return !e && P(o, "iterate", Ze), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: wt("add"),
		set: wt("set"),
		delete: wt("delete"),
		clear: wt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ I(this), r = St(n), i = /* @__PURE__ */ I(e), a = !t && !/* @__PURE__ */ F(e) && !/* @__PURE__ */ Vt(e) ? i : e;
			return r.has.call(n, a) || O(e, a) && r.has.call(n, e) || O(i, a) && r.has.call(n, i) || (n.add(a), et(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ F(n) && !/* @__PURE__ */ Vt(n) && (n = /* @__PURE__ */ I(n));
			let r = /* @__PURE__ */ I(this), { has: i, get: a } = St(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ I(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? O(n, s) && et(r, "set", e, n, s) : et(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ I(this), { has: n, get: r } = St(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ I(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && et(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ I(this), t = e.size !== 0, n = e.clear();
			return t && et(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Ct(r, e, t);
	}), n;
}
function Et(e, t) {
	let n = Tt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Dt = { get: /* @__PURE__ */ Et(!1, !1) }, Ot = { get: /* @__PURE__ */ Et(!1, !0) }, kt = { get: /* @__PURE__ */ Et(!0, !1) }, At = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap();
function Pt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
function Ft(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Pt(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function It(e) {
	return /* @__PURE__ */ Vt(e) ? e : zt(e, !1, vt, Dt, At);
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e) {
	return zt(e, !1, bt, Ot, jt);
}
/* @__NO_SIDE_EFFECTS__ */
function Rt(e) {
	return zt(e, !0, yt, kt, Mt);
}
function zt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = Ft(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function Bt(e) {
	return /* @__PURE__ */ Vt(e) ? /* @__PURE__ */ Bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function Vt(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function F(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Ht(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function I(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ I(t) : e;
}
function Ut(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && k(e, "__v_skip", !0), e;
}
var Wt = (e) => v(e) ? /* @__PURE__ */ It(e) : e, Gt = (e) => v(e) ? /* @__PURE__ */ Rt(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function L(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function R(e) {
	return Kt(e, !1);
}
function Kt(e, t) {
	return /* @__PURE__ */ L(e) ? e : new qt(e, t);
}
var qt = class {
	constructor(e, t) {
		this.dep = new Je(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ I(e), this._value = t ? e : Wt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ F(e) || /* @__PURE__ */ Vt(e);
		e = n ? e : /* @__PURE__ */ I(e), O(e, t) && (this._rawValue = e, this._value = n ? e : Wt(e), this.dep.trigger());
	}
};
function z(e) {
	return /* @__PURE__ */ L(e) ? e.value : e;
}
var Jt = {
	get: (e, t, n) => t === "__v_raw" ? e : z(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ L(i) && !/* @__PURE__ */ L(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Yt(e) {
	return /* @__PURE__ */ Bt(e) ? e : new Proxy(e, Jt);
}
/* @__NO_SIDE_EFFECTS__ */
function Xt(e) {
	let t = d(e) ? Array(e.length) : {};
	for (let n in e) t[n] = en(e, n);
	return t;
}
var Zt = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = _(t) ? t : String(t), this._raw = /* @__PURE__ */ I(e);
		let r = !0, i = e;
		if (!d(e) || _(this._key) || !w(this._key)) do
			r = !/* @__PURE__ */ Ht(i) || /* @__PURE__ */ F(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = z(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ L(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ L(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return tt(this._raw, this._key);
	}
}, Qt = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
/* @__NO_SIDE_EFFECTS__ */
function $t(e, t, n) {
	return /* @__PURE__ */ L(e) ? e : h(e) ? new Qt(e) : v(e) && arguments.length > 1 ? en(e, t, n) : /* @__PURE__ */ R(e);
}
function en(e, t, n) {
	return new Zt(e, t, n);
}
var tn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Je(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ke - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && N !== this) return Me(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Re(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function nn(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new tn(r, i, n);
}
var rn = {}, an = /* @__PURE__ */ new WeakMap(), on = void 0;
function sn(e, t = !1, n = on) {
	if (n) {
		let t = an.get(n);
		t || an.set(n, t = []), t.push(e);
	}
}
function cn(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ F(e) || o === !1 || o === 0 ? ln(e, 1) : ln(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ L(e) ? (g = () => e.value, y = /* @__PURE__ */ F(e)) : /* @__PURE__ */ Bt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Bt(e) || /* @__PURE__ */ F(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ L(e)) return e.value;
		if (/* @__PURE__ */ Bt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Ue();
			try {
				_();
			} finally {
				We();
			}
		}
		let t = on;
		on = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			on = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => ln(e(), t);
	}
	let x = Te(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(rn) : rn, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => O(e, C[t])) : O(e, C))) {
				_ && _();
				let t = on;
				on = m;
				try {
					let t = [
						e,
						C === rn ? void 0 : b && C[0] === rn ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					on = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Oe(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => sn(e, !1, m), _ = m.onStop = () => {
		let e = an.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			an.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function ln(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ L(e)) ln(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) ln(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		ln(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) ln(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && ln(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function un(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		fn(e, t, n);
	}
}
function dn(e, t, n, r) {
	if (h(e)) {
		let i = un(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			fn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(dn(e[a], t, n, r));
		return i;
	}
}
function fn(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			Ue(), un(o, null, 10, [
				e,
				i,
				a
			]), We();
			return;
		}
	}
	pn(e, r, a, i, s);
}
function pn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var B = [], mn = -1, hn = [], gn = null, _n = 0, vn = /* @__PURE__ */ Promise.resolve(), yn = null;
function bn(e) {
	let t = yn || vn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function xn(e) {
	let t = mn + 1, n = B.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = B[r], a = Dn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Sn(e) {
	if (!(e.flags & 1)) {
		let t = Dn(e), n = B[B.length - 1];
		!n || !(e.flags & 2) && t >= Dn(n) ? B.push(e) : B.splice(xn(t), 0, e), e.flags |= 1, Cn();
	}
}
function Cn() {
	yn ||= vn.then(On);
}
function wn(e) {
	d(e) ? hn.push(...e) : gn && e.id === -1 ? gn.splice(_n + 1, 0, e) : e.flags & 1 || (hn.push(e), e.flags |= 1), Cn();
}
function Tn(e, t, n = mn + 1) {
	for (; n < B.length; n++) {
		let t = B[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			B.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function En(e) {
	if (hn.length) {
		let e = [...new Set(hn)].sort((e, t) => Dn(e) - Dn(t));
		if (hn.length = 0, gn) {
			gn.push(...e);
			return;
		}
		for (gn = e, _n = 0; _n < gn.length; _n++) {
			let e = gn[_n];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		gn = null, _n = 0;
	}
}
var Dn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function On(e) {
	try {
		for (mn = 0; mn < B.length; mn++) {
			let e = B[mn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), un(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; mn < B.length; mn++) {
			let e = B[mn];
			e && (e.flags &= -2);
		}
		mn = -1, B.length = 0, En(e), yn = null, (B.length || hn.length) && On(e);
	}
}
var kn = null, An = null;
function jn(e) {
	let t = kn;
	return kn = e, An = e && e.type.__scopeId || null, t;
}
function Mn(e, t = kn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Ji(-1);
		let i = jn(t), a;
		try {
			a = e(...n);
		} finally {
			jn(i), r._d && Ji(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function V(e, n) {
	if (kn === null) return e;
	let r = Oa(kn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && ln(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function Nn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Ue(), dn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), We());
	}
}
function Pn(e, t) {
	if (Z) {
		let n = Z.provides, r = Z.parent && Z.parent.provides;
		r === n && (n = Z.provides = Object.create(r)), n[e] = t;
	}
}
function Fn(e, t, n = !1) {
	let r = pa();
	if (r || $r) {
		let i = $r ? $r._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function In() {
	return !!(pa() || $r);
}
var Ln = /* @__PURE__ */ Symbol.for("v-scx"), Rn = () => Fn(Ln);
function zn(e, t, n) {
	return Bn(e, t, n);
}
function Bn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (ya) {
		if (c === "sync") {
			let e = Rn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Z;
	u.call = (e, t, n) => dn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		U(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Sn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = cn(e, n, u);
	return ya && (f ? f.push(h) : d && h()), h;
}
function Vn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Hn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ga(this), s = Bn(i, a.bind(r), n);
	return o(), s;
}
function Hn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Un = /* @__PURE__ */ new WeakMap(), Wn = /* @__PURE__ */ Symbol("_vte"), Gn = (e) => e.__isTeleport, Kn = (e) => e && (e.disabled || e.disabled === ""), qn = (e) => e && (e.defer || e.defer === ""), Jn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Yn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Xn = (e, t) => {
	let n = e && e.to;
	return g(n) ? t ? t(n) : null : n;
}, Zn = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g } } = l, _ = Kn(t.props), { dynamicChildren: v } = t, y = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, b = (e = t) => {
			let n = Kn(e.props), r = e.target = Xn(e.props, m), a = nr(r, e, h, p);
			r && (o !== "svg" && Jn(r) ? o = "svg" : o !== "mathml" && Yn(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (y(e, r, a), tr(e, !1)));
		}, x = (e) => {
			let t = () => {
				Un.get(e) === t && (Un.delete(e), Kn(e.props) && (y(e, n, e.anchor), tr(e, !0)), b(e));
			};
			Un.set(e, t), U(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), qn(t.props) || a && a.pendingBranch) {
				x(t);
				return;
			}
			_ && (y(t, n, i), tr(t, !0)), b();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Un.get(e);
			if (u) {
				u.flags |= 8, Un.delete(e), x(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = Kn(e.props), y = g ? n : p, b = g ? r : h;
			if (o === "svg" || Jn(p) ? o = "svg" : (o === "mathml" || Yn(p)) && (o = "mathml"), v ? (f(e.dynamicChildren, v, y, i, a, o, s), Fi(e, t, !0)) : c || d(e, t, y, b, i, a, o, s, !1), _) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Qn(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = t.target = Xn(t.props, m);
				e && Qn(t, e, null, l, 0);
			} else g && Qn(t, p, h, l, 1);
			tr(t, _);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = a || !Kn(f), m = Un.get(e);
		if (m && (m.flags |= 8, Un.delete(e), p = !1), d && (i(l), i(u)), a && i(c), o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, p, !!i.dynamicChildren);
		}
	},
	move: Qn,
	hydrate: $n
};
function Qn(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), (!d || Kn(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function $n(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Xn(t.props, c), h = Kn(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || nr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || nr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), tr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var er = Zn;
function tr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function nr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Wn] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var rr = /* @__PURE__ */ Symbol("_leaveCb");
function ir(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ir(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/* @__NO_SIDE_EFFECTS__ */
function ar(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function or(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function sr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var cr = /* @__PURE__ */ new WeakMap();
function lr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => lr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (dr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && lr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? Oa(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ I(v), b = v === t ? i : (e) => sr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && sr(_, t));
	if (m != null && m !== p) {
		if (ur(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ L(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) un(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ L(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), cr.delete(e);
				};
				t.id = -1, cr.set(e, t), U(t, r);
			} else ur(e), i();
		}
	}
}
function ur(e) {
	let t = cr.get(e);
	t && (t.flags |= 8, cr.delete(e));
}
ce().requestIdleCallback, ce().cancelIdleCallback;
var dr = (e) => !!e.type.__asyncLoader, fr = (e) => e.type.__isKeepAlive;
function pr(e, t) {
	hr(e, "a", t);
}
function mr(e, t) {
	hr(e, "da", t);
}
function hr(e, t, n = Z) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (_r(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) fr(e.parent.vnode) && gr(r, t, n, e), e = e.parent;
	}
}
function gr(e, t, n, r) {
	let i = _r(t, e, r, !0);
	wr(() => {
		c(r[t], i);
	}, n);
}
function _r(e, t, n = Z, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Ue();
			let i = ga(n), a = dn(t, n, e, r);
			return i(), We(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var vr = (e) => (t, n = Z) => {
	(!ya || e === "sp") && _r(e, (...e) => t(...e), n);
}, yr = vr("bm"), br = vr("m"), xr = vr("bu"), Sr = vr("u"), Cr = vr("bum"), wr = vr("um"), Tr = vr("sp"), Er = vr("rtg"), Dr = vr("rtc");
function Or(e, t = Z) {
	_r("ec", e, t);
}
var kr = /* @__PURE__ */ Symbol.for("v-ndc");
function Ar(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Bt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ F(e), s = /* @__PURE__ */ Vt(e), e = rt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Gt(Wt(e[n])) : Wt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var jr = (e) => e ? va(e) ? Oa(e) : jr(e.parent) : null, Mr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => jr(e.parent),
	$root: (e) => jr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Vr(e),
	$forceUpdate: (e) => e.f ||= () => {
		Sn(e.update);
	},
	$nextTick: (e) => e.n ||= bn.bind(e.proxy),
	$watch: (e) => Vn.bind(e)
}), Nr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Pr = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Nr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Ir && (s[n] = 0);
		}
		let d = Mr[n], f, p;
		if (d) return n === "$attrs" && P(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Nr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Nr(n, c) || u(o, c) || u(i, c) || u(Mr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Fr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Ir = !0;
function Lr(e) {
	let t = Vr(e), n = e.proxy, i = e.ctx;
	Ir = !1, t.beforeCreate && zr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: ee, renderTriggered: te, errorCaptured: E, serverPrefetch: ne, expose: D, inheritAttrs: re, components: ie, directives: O, filters: ae } = t;
	if (u && Rr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ It(t));
	}
	if (Ir = !0, o) for (let e in o) {
		let t = o[e], a = Aa({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Br(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Pn(t, e[t]);
		});
	}
	f && zr(f, e, "c");
	function k(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (k(yr, p), k(br, m), k(xr, g), k(Sr, _), k(pr, y), k(mr, b), k(Or, E), k(Dr, ee), k(Er, te), k(Cr, S), k(wr, w), k(Tr, ne), d(D)) if (D.length) {
		let t = e.exposed ||= {};
		D.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === r && (e.render = T), re != null && (e.inheritAttrs = re), ie && (e.components = ie), O && (e.directives = O), ne && or(e);
}
function Rr(e, t, n = r) {
	d(e) && (e = Kr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? Fn(r.from || n, r.default, !0) : Fn(r.from || n) : Fn(r), /* @__PURE__ */ L(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function zr(e, t, n) {
	dn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Br(e, t, n, r) {
	let i = r.includes(".") ? Hn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && zn(i, n);
	} else if (h(e)) zn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Br(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && zn(i, r, e);
	}
}
function Vr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Hr(c, e, o, !0)), Hr(c, t, o)), v(t) && a.set(t, c), c;
}
function Hr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Hr(e, a, n, !0), i && i.forEach((t) => Hr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ur[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ur = {
	data: Wr,
	props: Jr,
	emits: Jr,
	methods: qr,
	computed: qr,
	beforeCreate: H,
	created: H,
	beforeMount: H,
	mounted: H,
	beforeUpdate: H,
	updated: H,
	beforeDestroy: H,
	beforeUnmount: H,
	destroyed: H,
	unmounted: H,
	activated: H,
	deactivated: H,
	errorCaptured: H,
	serverPrefetch: H,
	components: qr,
	directives: qr,
	watch: Yr,
	provide: Wr,
	inject: Gr
};
function Wr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Gr(e, t) {
	return qr(Kr(e), Kr(t));
}
function Kr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function H(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function qr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Jr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Fr(e), Fr(t ?? {})) : t;
}
function Yr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = H(e[r], t[r]);
	return n;
}
function Xr() {
	return {
		app: null,
		config: {
			isNativeTag: i,
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
var Zr = 0;
function Qr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Xr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Zr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: ja,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || ta(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Oa(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (dn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = $r;
				$r = l;
				try {
					return e();
				} finally {
					$r = t;
				}
			}
		};
		return l;
	};
}
var $r = null, ei = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${E(t)}Modifiers`] || e[`${D(t)}Modifiers`];
function ti(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && ei(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(oe)));
	let c, l = i[c = ie(n)] || i[c = ie(E(n))];
	!l && o && (l = i[c = ie(D(n))]), l && dn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, dn(u, e, 6, a);
	}
}
var ni = /* @__PURE__ */ new WeakMap();
function ri(e, t, n = !1) {
	let r = n ? ni : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = ri(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function ii(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, D(t)) || u(e, t));
}
function ai(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = jn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = aa(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = aa(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : oi(c);
		}
	} catch (t) {
		Gi.length = 0, fn(t, e, 1), v = ta(Ui);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = si(y, a)), b = ia(b, y, !1, !0));
	}
	return n.dirs && (b = ia(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ir(b, n.transition), v = b, jn(_), v;
}
var oi = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, si = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function ci(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? li(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ui(o, r, n) && !ii(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? li(r, o, l) : !0 : !!o;
	return !1;
}
function li(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (ui(t, e, a) && !ii(n, a)) return !0;
	}
	return !1;
}
function ui(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !ve(r, i) : r !== i;
}
function di({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var fi = {}, pi = () => Object.create(fi), mi = (e) => Object.getPrototypeOf(e) === fi;
function hi(e, t, n, r = !1) {
	let i = {}, a = pi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), _i(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Lt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function gi(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ I(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ii(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = E(o);
					i[t] = vi(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		_i(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = D(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = vi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && et(e.attrs, "set", "");
}
function _i(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = E(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : ii(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ I(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = vi(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function vi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ga(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === D(n)) && (r = !0));
	}
	return r;
}
var yi = /* @__PURE__ */ new WeakMap();
function bi(e, r, i = !1) {
	let a = i ? yi : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = bi(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = E(c[e]);
		xi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = E(e);
		if (xi(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				} else n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function xi(e) {
	return e[0] !== "$" && !T(e);
}
var Si = (e) => e === "_" || e === "_ctx" || e === "$stable", Ci = (e) => d(e) ? e.map(aa) : [aa(e)], wi = (e, t, n) => {
	if (t._n) return t;
	let r = Mn((...e) => Ci(t(...e)), n);
	return r._c = !1, r;
}, Ti = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Si(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = wi(n, i, r);
		else if (i != null) {
			let e = Ci(i);
			t[n] = () => e;
		}
	}
}, Ei = (e, t) => {
	let n = Ci(t);
	e.slots.default = () => n;
}, Di = (e, t, n) => {
	for (let r in t) (n || !Si(r)) && (e[r] = t[r]);
}, Oi = (e, t, n) => {
	let r = e.slots = pi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Di(r, t, n), n && k(r, "_", e, !0)) : Ti(t, r);
	} else t && Ei(e, t);
}, ki = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Di(a, n, r) : (o = !n.$stable, Ti(n, a)), s = n;
	} else n && (Ei(e, n), s = { default: 1 });
	if (o) for (let e in a) !Si(e) && s[e] == null && delete a[e];
}, U = Vi;
function Ai(e) {
	return ji(e);
}
function ji(e, i) {
	let a = ce();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Qi(e, t) && (r = ve(e), A(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Hi:
				y(e, t, n, r);
				break;
			case Ui:
				b(e, t, n, r);
				break;
			case Wi:
				e ?? x(t, n, r, o);
				break;
			case W:
				ie(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? O(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, j);
		}
		u != null && i ? lr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && lr(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) ee(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ne(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, ee = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && E(e.children, d, null, r, i, Mi(e, a), s, u), _ && Nn(e, null, r, "created"), te(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && la(f, r, e);
		}
		_ && Nn(e, null, r, "beforeMount");
		let v = Pi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && U(() => {
			try {
				f && la(f, r, e), v && g.enter(d), _ && Nn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, te = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Bi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				te(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? oa(e[l]) : aa(e[l]), t, n, r, i, a, o, s);
	}, ne = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Ni(r, !1), (g = h.onVnodeBeforeUpdate) && la(g, r, n, e), f && Nn(n, e, r, "beforeUpdate"), r && Ni(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? D(e.dynamicChildren, d, l, r, i, Mi(n, a), o) : s || ue(e, n, l, null, r, i, Mi(n, a), o, !1), u > 0) {
			if (u & 16) re(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && re(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && U(() => {
			g && la(g, r, n, e), f && Nn(n, e, r, "updated");
		}, i);
	}, D = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === W || !Qi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, re = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ie = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), E(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (D(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Fi(e, t, !0)) : ue(e, t, n, f, i, a, s, c, l);
	}, O = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : k(t, n, r, i, a, o, c) : oe(e, t, c);
	}, k = (e, t, n, r, i, a, o) => {
		let s = e.component = fa(e, r, i);
		if (fr(e) && (s.ctx.renderer = j), ba(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, se, o), !e.el) {
				let r = s.subTree = ta(Ui);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else se(s, e, t, n, i, a, o);
	}, oe = (e, t, n) => {
		let r = t.component = e.component;
		if (ci(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			le(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, se = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Li(e);
					if (n) {
						t && (t.el = c.el, le(e, t, o)), n.asyncDep.then(() => {
							U(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ni(e, !1), t ? (t.el = c.el, le(e, t, o)) : t = c, n && ae(n), (d = t.props && t.props.onVnodeBeforeUpdate) && la(d, s, t, c), Ni(e, !0);
				let f = ai(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ve(p), e, i, a), t.el = f.el, u === null && di(e, f.el), r && U(r, i), (d = t.props && t.props.onVnodeUpdated) && U(() => la(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = dr(t);
				if (Ni(e, !1), l && ae(l), !m && (o = c && c.onVnodeBeforeMount) && la(o, d, t), Ni(e, !0), s && Se) {
					let t = () => {
						e.subTree = ai(e), Se(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ai(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && U(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					U(() => la(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && dr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && U(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Oe(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Sn(u), Ni(e, !0), l();
	}, le = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, gi(e, t.props, r, n), ki(e, t.children, n), Ue(), Tn(e), We();
	}, ue = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				fe(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				de(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && _e(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? fe(l, d, n, r, i, a, o, s, c) : _e(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && E(d, n, r, i, a, o, s, c));
	}, de = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? oa(t[p]) : aa(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? _e(e, a, o, !0, !1, f) : E(t, r, i, a, o, s, c, l, f);
	}, fe = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? oa(t[u]) : aa(t[u]);
			if (Qi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? oa(t[p]) : aa(t[p]);
			if (Qi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? oa(t[u]) : aa(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) A(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? oa(t[u]) : aa(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					A(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Qi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? A(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ii(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || zi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? pe(n, r, p, 2) : _--);
			}
		}
	}, pe = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			pe(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, j);
			return;
		}
		if (c === W) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) pe(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Wi) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), U(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[rr](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, A = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Ue(), lr(s, null, n, e, !0), We()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !dr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && la(_, t, e), u & 6) ge(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Nn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, j, r) : l && !l.hasOnce && (a !== W || d > 0 && d & 64) ? _e(l, t, n, !1, !0) : (a === W && d & 384 || !i && u & 16) && _e(c, t, n), r && me(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && U(() => {
			_ && la(_, t, e), h && Nn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, me = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === W) {
			he(n, r);
			return;
		}
		if (t === Wi) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, he = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, ge = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ri(c), Ri(l), r && ae(r), i.stop(), a && (a.flags |= 8, A(o, e, t, n)), s && U(s, t), U(() => {
			e.isUnmounted = !0;
		}, t);
	}, _e = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) A(e[o], t, n, r, i);
	}, ve = (e) => {
		if (e.shapeFlag & 6) return ve(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Wn];
		return n ? h(n) : t;
	}, ye = !1, be = (e, t, n) => {
		let r;
		e == null ? t._vnode && (A(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ye ||= (ye = !0, Tn(r), En(), !1);
	}, j = {
		p: v,
		um: A,
		m: pe,
		r: me,
		mt: k,
		mc: E,
		pc: ue,
		pbc: D,
		n: ve,
		o: e
	}, xe, Se;
	return i && ([xe, Se] = i(j)), {
		render: be,
		hydrate: xe,
		createApp: Qr(be, xe)
	};
}
function Mi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ni({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Pi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Fi(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = oa(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Fi(t, a)), a.type === Hi && (a.patchFlag === -1 && (a = i[e] = oa(a)), a.el = t.el), a.type === Ui && !a.el && (a.el = t.el);
	}
}
function Ii(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Li(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Li(t);
}
function Ri(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function zi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? zi(t.subTree) : null;
}
var Bi = (e) => e.__isSuspense;
function Vi(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : wn(e);
}
var W = /* @__PURE__ */ Symbol.for("v-fgt"), Hi = /* @__PURE__ */ Symbol.for("v-txt"), Ui = /* @__PURE__ */ Symbol.for("v-cmt"), Wi = /* @__PURE__ */ Symbol.for("v-stc"), Gi = [], G = null;
function K(e = !1) {
	Gi.push(G = e ? null : []);
}
function Ki() {
	Gi.pop(), G = Gi[Gi.length - 1] || null;
}
var qi = 1;
function Ji(e, t = !1) {
	qi += e, e < 0 && G && t && (G.hasOnce = !0);
}
function Yi(e) {
	return e.dynamicChildren = qi > 0 ? G || n : null, Ki(), qi > 0 && G && G.push(e), e;
}
function q(e, t, n, r, i, a) {
	return Yi(J(e, t, n, r, i, a, !0));
}
function Xi(e, t, n, r, i) {
	return Yi(ta(e, t, n, r, i, !0));
}
function Zi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Qi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var $i = ({ key: e }) => e ?? null, ea = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ L(e) || h(e) ? {
	i: kn,
	r: e,
	k: t,
	f: !!n
} : e);
function J(e, t = null, n = null, r = 0, i = null, a = e === W ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && $i(t),
		ref: t && ea(t),
		scopeId: An,
		slotScopeIds: null,
		children: n,
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
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: kn
	};
	return s ? (sa(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), qi > 0 && !o && G && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && G.push(c), c;
}
var ta = na;
function na(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === kr) && (e = Ui), Zi(e)) {
		let r = ia(e, t, !0);
		return n && sa(r, n), qi > 0 && !a && G && (r.shapeFlag & 6 ? G[G.indexOf(e)] = r : G.push(r)), r.patchFlag = -2, r;
	}
	if (ka(e) && (e = e.__vccOpts), t) {
		t = ra(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = A(e)), v(n) && (/* @__PURE__ */ Ht(n) && !d(n) && (n = s({}, n)), t.style = le(n));
	}
	let o = g(e) ? 1 : Bi(e) ? 128 : Gn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return J(e, t, n, r, i, o, a, !0);
}
function ra(e) {
	return e ? /* @__PURE__ */ Ht(e) || mi(e) ? s({}, e) : e : null;
}
function ia(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ca(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && $i(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(ea(t)) : [a, ea(t)] : ea(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== W ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && ia(e.ssContent),
		ssFallback: e.ssFallback && ia(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ir(u, c.clone(u)), u;
}
function Y(e = " ", t = 0) {
	return ta(Hi, null, e, t);
}
function X(e = "", t = !1) {
	return t ? (K(), Xi(Ui, null, e)) : ta(Ui, null, e);
}
function aa(e) {
	return e == null || typeof e == "boolean" ? ta(Ui) : d(e) ? ta(W, null, e.slice()) : Zi(e) ? oa(e) : ta(Hi, null, String(e));
}
function oa(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : ia(e);
}
function sa(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), sa(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !mi(t) ? t._ctx = kn : r === 3 && kn && (kn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: kn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Y(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function ca(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = A([t.class, r.class]));
		else if (e === "style") t.style = le([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function la(e, t, n, r = null) {
	dn(e, t, 7, [n, r]);
}
var ua = Xr(), da = 0;
function fa(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || ua, o = {
		uid: da++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Ce(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: bi(i, a),
		emitsOptions: ri(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = ti.bind(null, o), e.ce && e.ce(o), o;
}
var Z = null, pa = () => Z || kn, ma, ha;
{
	let e = ce(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	ma = t("__VUE_INSTANCE_SETTERS__", (e) => Z = e), ha = t("__VUE_SSR_SETTERS__", (e) => ya = e);
}
var ga = (e) => {
	let t = Z;
	return ma(e), e.scope.on(), () => {
		e.scope.off(), ma(t);
	};
}, _a = () => {
	Z && Z.scope.off(), ma(null);
};
function va(e) {
	return e.vnode.shapeFlag & 4;
}
var ya = !1;
function ba(e, t = !1, n = !1) {
	t && ha(t);
	let { props: r, children: i } = e.vnode, a = va(e);
	hi(e, r, a, t), Oi(e, i, n || t);
	let o = a ? xa(e, t) : void 0;
	return t && ha(!1), o;
}
function xa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Pr);
	let { setup: r } = n;
	if (r) {
		Ue();
		let n = e.setupContext = r.length > 1 ? Da(e) : null, i = ga(e), a = un(r, e, 0, [e.props, n]), o = y(a);
		if (We(), i(), (o || e.sp) && !dr(e) && or(e), o) {
			if (a.then(_a, _a), t) return a.then((n) => {
				Sa(e, n, t);
			}).catch((t) => {
				fn(t, e, 0);
			});
			e.asyncDep = a;
		} else Sa(e, a, t);
	} else Ta(e, t);
}
function Sa(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Yt(t)), Ta(e, n);
}
var Ca, wa;
function Ta(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && Ca && !i.render) {
			let t = i.template || Vr(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = Ca(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, wa && wa(e);
	}
	{
		let t = ga(e);
		Ue();
		try {
			Lr(e);
		} finally {
			We(), t();
		}
	}
}
var Ea = { get(e, t) {
	return P(e, "get", ""), e[t];
} };
function Da(e) {
	return {
		attrs: new Proxy(e.attrs, Ea),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Oa(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Yt(Ut(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Mr) return Mr[n](e);
		},
		has(e, t) {
			return t in e || t in Mr;
		}
	}) : e.proxy;
}
function ka(e) {
	return h(e) && "__vccOpts" in e;
}
var Aa = (e, t) => /* @__PURE__ */ nn(e, t, ya), ja = "3.5.32", Ma = void 0, Na = typeof window < "u" && window.trustedTypes;
if (Na) try {
	Ma = /* @__PURE__ */ Na.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Pa = Ma ? (e) => Ma.createHTML(e) : (e) => e, Fa = "http://www.w3.org/2000/svg", Ia = "http://www.w3.org/1998/Math/MathML", La = typeof document < "u" ? document : null, Ra = La && /* @__PURE__ */ La.createElement("template"), za = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? La.createElementNS(Fa, e) : t === "mathml" ? La.createElementNS(Ia, e) : n ? La.createElement(e, { is: n }) : La.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => La.createTextNode(e),
	createComment: (e) => La.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => La.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Ra.innerHTML = Pa(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ra.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ba = /* @__PURE__ */ Symbol("_vtc");
function Va(e, t, n) {
	let r = e[Ba];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Ha = /* @__PURE__ */ Symbol("_vod"), Ua = /* @__PURE__ */ Symbol("_vsh"), Wa = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[Ha] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ga(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), Ga(e, !0), r.enter(e)) : r.leave(e, () => {
			Ga(e, !1);
		}) : Ga(e, t));
	},
	beforeUnmount(e, { value: t }) {
		Ga(e, t);
	}
};
function Ga(e, t) {
	e.style.display = t ? e[Ha] : "none", e[Ua] = !t;
}
var Ka = /* @__PURE__ */ Symbol(""), qa = /(?:^|;)\s*display\s*:/;
function Ja(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Xa(r, t, "");
		}
		else for (let e in t) n[e] ?? Xa(r, e, "");
		for (let e in n) e === "display" && (a = !0), Xa(r, e, n[e]);
	} else if (i) {
		if (t !== n) {
			let e = r[Ka];
			e && (n += ";" + e), r.cssText = n, a = qa.test(n);
		}
	} else t && e.removeAttribute("style");
	Ha in e && (e[Ha] = a ? r.display : "", e[Ua] && (r.display = "none"));
}
var Ya = /\s*!important$/;
function Xa(e, t, n) {
	if (d(n)) n.forEach((n) => Xa(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = $a(e, t);
		Ya.test(n) ? e.setProperty(D(r), n.replace(Ya, ""), "important") : e[r] = n;
	}
}
var Za = [
	"Webkit",
	"Moz",
	"ms"
], Qa = {};
function $a(e, t) {
	let n = Qa[t];
	if (n) return n;
	let r = E(t);
	if (r !== "filter" && r in e) return Qa[t] = r;
	r = re(r);
	for (let n = 0; n < Za.length; n++) {
		let i = Za[n] + r;
		if (i in e) return Qa[t] = i;
	}
	return t;
}
var eo = "http://www.w3.org/1999/xlink";
function to(e, t, n, r, i, a = he(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(eo, t.slice(6, t.length)) : e.setAttributeNS(eo, t, n) : n == null || a && !ge(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function no(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Pa(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ge(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function ro(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function io(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var ao = /* @__PURE__ */ Symbol("_vei");
function oo(e, t, n, r, i = null) {
	let a = e[ao] || (e[ao] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = co(t);
		r ? ro(e, n, a[t] = po(r, i), s) : o && (io(e, n, o, s), a[t] = void 0);
	}
}
var so = /(?:Once|Passive|Capture)$/;
function co(e) {
	let t;
	if (so.test(e)) {
		t = {};
		let n;
		for (; n = e.match(so);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : D(e.slice(2)), t];
}
var lo = 0, uo = /* @__PURE__ */ Promise.resolve(), fo = () => lo ||= (uo.then(() => lo = 0), Date.now());
function po(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		dn(mo(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = fo(), n;
}
function mo(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var ho = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, go = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? Va(e, r, c) : t === "style" ? Ja(e, n, r) : a(t) ? o(t) || oo(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _o(e, t, r, c)) ? (no(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && to(e, t, r, c, s, t !== "value")) : e._isVueCE && (vo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? no(e, E(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), to(e, t, r, c));
};
function _o(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ho(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return ho(t) && g(n) ? !1 : t in e;
}
function vo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = E(t);
	return Array.isArray(n) ? n.some((e) => E(e) === r) : Object.keys(n).some((e) => E(e) === r);
}
var yo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ae(t, e) : t;
};
function bo(e) {
	e.target.composing = !0;
}
function xo(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var So = /* @__PURE__ */ Symbol("_assign");
function Co(e, t, n) {
	return t && (e = e.trim()), n && (e = oe(e)), e;
}
var wo = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[So] = yo(i);
		let a = r || i.props && i.props.type === "number";
		ro(e, t ? "change" : "input", (t) => {
			t.target.composing || e[So](Co(e.value, n, a));
		}), (n || a) && ro(e, "change", () => {
			e.value = Co(e.value, n, a);
		}), t || (ro(e, "compositionstart", bo), ro(e, "compositionend", xo), ro(e, "change", xo));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[So] = yo(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? oe(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, To = {
	deep: !0,
	created(e, t, n) {
		e[So] = yo(n), ro(e, "change", () => {
			let t = e._modelValue, n = Ao(e), r = e.checked, i = e[So];
			if (d(t)) {
				let e = ye(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (p(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(jo(e, r));
		});
	},
	mounted: Eo,
	beforeUpdate(e, t, n) {
		e[So] = yo(n), Eo(e, t, n);
	}
};
function Eo(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (d(t)) i = ye(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = ve(t, jo(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Do = {
	created(e, { value: t }, n) {
		e.checked = ve(t, n.props.value), e[So] = yo(n), ro(e, "change", () => {
			e[So](Ao(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[So] = yo(r), t !== n && (e.checked = ve(t, r.props.value));
	}
}, Oo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		ro(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? oe(Ao(e)) : Ao(e));
			e[So](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, bn(() => {
				e._assigning = !1;
			});
		}), e[So] = yo(r);
	},
	mounted(e, { value: t }) {
		ko(e, t);
	},
	beforeUpdate(e, t, n) {
		e[So] = yo(n);
	},
	updated(e, { value: t }) {
		e._assigning || ko(e, t);
	}
};
function ko(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ao(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = ye(t, o) > -1;
			} else a.selected = t.has(o);
			else if (ve(Ao(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ao(e) {
	return "_value" in e ? e._value : e.value;
}
function jo(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Mo = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], No = {
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
	exact: (e, t) => Mo.some((n) => e[`${n}Key`] && !t.includes(n))
}, Po = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = No[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Fo = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, Io = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = D(n.key);
		if (t.some((e) => e === r || Fo[e] === r)) return e(n);
	}));
}, Lo = /* @__PURE__ */ s({ patchProp: go }, za), Ro;
function zo() {
	return Ro ||= Ai(Lo);
}
var Bo = ((...e) => {
	let t = zo().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Ho(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Vo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Vo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Ho(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var Uo = typeof window < "u", Wo, Go = (e) => Wo = e, Ko = Symbol();
function qo(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Jo;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Jo ||= {});
var Yo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Xo(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function Zo(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		ns(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Qo(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function $o(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(t);
	}
}
var es = typeof navigator == "object" ? navigator : { userAgent: "" }, ts = /Macintosh/.test(es.userAgent) && /AppleWebKit/.test(es.userAgent) && !/Safari/.test(es.userAgent), ns = Uo ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ts ? rs : "msSaveOrOpenBlob" in es ? is : as : () => {};
function rs(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? $o(r) : Qo(r.href) ? Zo(e, t, n) : (r.target = "_blank", $o(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		$o(r);
	}, 0));
}
function is(e, t = "download", n) {
	if (typeof e == "string") if (Qo(e)) Zo(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			$o(t);
		});
	}
	else navigator.msSaveOrOpenBlob(Xo(e, n), t);
}
function as(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return Zo(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(Yo.HTMLElement)) || "safari" in Yo, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || ts) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: os } = Object;
function ss() {
	let e = we(!0), t = e.run(() => /* @__PURE__ */ R({})), n = [], r = [], i = Ut({
		install(e) {
			Go(i), i._a = e, e.provide(Ko, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
		},
		use(e) {
			return this._a ? n.push(e) : r.push(e), this;
		},
		_p: n,
		_a: null,
		_e: e,
		_s: /* @__PURE__ */ new Map(),
		state: t
	});
	return i;
}
var cs = () => {};
function ls(e, t, n, r = cs) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && Te() && Ee(i), i;
}
function us(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var ds = (e) => e(), fs = Symbol(), ps = Symbol();
function ms(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		qo(i) && qo(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ L(r) && !/* @__PURE__ */ Bt(r) ? e[n] = ms(i, r) : e[n] = r;
	}
	return e;
}
var hs = Symbol();
function gs(e) {
	return !qo(e) || !Object.prototype.hasOwnProperty.call(e, hs);
}
var { assign: _s } = Object;
function vs(e) {
	return !!(/* @__PURE__ */ L(e) && e.effect);
}
function ys(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), _s(/* @__PURE__ */ Xt(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Ut(Aa(() => {
			Go(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = bs(e, l, t, n, r, !0), c;
}
function bs(e, t, n = {}, r, i, a) {
	let o, s = _s({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: Jo.patchFunction,
			storeId: e,
			events: void 0
		}) : (ms(r.state.value[e], t), n = {
			type: Jo.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		bn().then(() => {
			m === i && (l = !0);
		}), u = !0, us(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			_s(e, t);
		});
	} : cs;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (fs in t) return t[ps] = n, t;
		let i = function() {
			Go(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			us(f, {
				args: n,
				name: i[ps],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw us(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (us(a, e), e)).catch((e) => (us(o, e), Promise.reject(e))) : (us(a, l), l);
		};
		return i[fs] = !0, i[ps] = n, i;
	}, y = /* @__PURE__ */ It({
		_p: r,
		$id: e,
		$onAction: ls.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = ls(d, t, n.detached, () => a()), a = o.run(() => zn(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: Jo.direct,
					events: void 0
				}, r);
			}, _s({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let b = (r._a && r._a.runWithContext || ds)(() => r._e.run(() => (o = we()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ L(n) && !vs(n) || /* @__PURE__ */ Bt(n) ? a || (p && gs(n) && (/* @__PURE__ */ L(n) ? n.value = p[t] : ms(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return _s(y, b), _s(/* @__PURE__ */ I(y), b), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				_s(t, e);
			});
		}
	}), r._p.forEach((e) => {
		_s(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function xs(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = In();
		return n ||= o ? Fn(Ko, null) : null, n && Go(n), n = Wo, n._s.has(e) || (i ? bs(e, t, r, n) : ys(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
function Ss(e) {
	let t = /* @__PURE__ */ I(e), n = {};
	for (let r in t) {
		let i = t[r];
		i.effect ? n[r] = Aa({
			get: () => e[r],
			set(t) {
				e[r] = t;
			}
		}) : (/* @__PURE__ */ L(i) || /* @__PURE__ */ Bt(i)) && (n[r] = /* @__PURE__ */ $t(e, r));
	}
	return n;
}
//#endregion
//#region src/api.ts
var Cs = "at_assetthingie_url", ws = "http://127.0.0.1:8188", Ts = 2e4;
function Es() {
	if (typeof localStorage > "u") return ws;
	let e = localStorage.getItem("at_assetthingie_url") || "http://127.0.0.1:8188";
	return String(e).replace(/\/$/, "");
}
function Q() {
	return "/at";
}
function Ds() {
	return typeof window < "u" && window.location?.origin && window.location.protocol !== "file:" ? window.location.origin.replace(/\/$/, "") : Es();
}
function Os(e) {
	localStorage.setItem(Cs, e.replace(/\/$/, ""));
}
async function $(e, t) {
	let n = `${Ds()}${e}`, r = new AbortController(), i = setTimeout(() => r.abort(), Ts);
	try {
		let e = await fetch(n, {
			...t,
			signal: r.signal,
			headers: {
				Accept: "application/json",
				...t?.headers ?? {}
			}
		}), i = await e.text();
		if (!e.ok) throw Error(`HTTP ${e.status}: ${i.slice(0, 240)}`);
		return JSON.parse(i);
	} finally {
		clearTimeout(i);
	}
}
function ks(e) {
	let t = new URLSearchParams();
	e.q?.trim() && t.set("q", e.q.trim()), e.search_type && t.set("search_type", e.search_type);
	for (let n of e.content_types ?? []) n && t.append("content_types", n);
	for (let n of e.base_models ?? []) n && t.append("base_models", n);
	return e.sort && t.set("sort", e.sort), e.period && t.set("period", e.period), e.nsfw && t.set("nsfw", "true"), t;
}
async function As(e) {
	let t = ks(e).toString();
	return $(`${Q()}/browse/search${t ? `?${t}` : ""}`);
}
async function js(e, t) {
	let n = ks(t);
	return n.set("url", e), $(`${Q()}/browse/page?${n.toString()}`);
}
async function Ms(e, t = !1) {
	let n = t ? "?nsfw=true" : "";
	return $(`${Q()}/browse/model/${e}${n}`);
}
async function Ns(e) {
	let t = new URLSearchParams();
	e?.family && t.set("family", e.family);
	let n = t.toString();
	return $(`${Q()}/filters${n ? `?${n}` : ""}`);
}
async function Ps(e) {
	return $(`${Q()}/download`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(e)
	});
}
async function Fs(e, t) {
	return $(`${Q()}/download/batch`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			items: e,
			duplicate_resolution: t ?? "skip"
		})
	});
}
async function Is() {
	return $(`${Q()}/downloads`);
}
function Ls(e) {
	return encodeURIComponent(e);
}
async function Rs(e) {
	await $(`${Q()}/downloads/${Ls(e)}/cancel`, { method: "POST" });
}
async function zs(e) {
	await $(`${Q()}/downloads/${Ls(e)}/retry`, { method: "POST" });
}
async function Bs(e) {
	await $(`${Q()}/downloads/${Ls(e)}/pause`, { method: "POST" });
}
async function Vs(e) {
	await fetch(`${Ds()}${Q()}/downloads/${Ls(e)}`, { method: "DELETE" });
}
async function Hs() {
	return $(`${Q()}/config`);
}
async function Us(e) {
	return $(`${Q()}/config`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(e)
	});
}
async function Ws() {
	return $(`${Q()}/scan`, { method: "POST" });
}
async function Gs() {
	return $(`${Q()}/scan/status`);
}
async function Ks() {
	return $(`${Q()}/enrich`, { method: "POST" });
}
async function qs() {
	return $(`${Q()}/enrich/status`);
}
function Js(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("http://") || t.startsWith("https://") ? t : `${Ds()}${t.startsWith("/") ? "" : "/"}${t}`;
}
//#endregion
//#region src/stores/browse.ts
var Ys = 25, Xs = 15;
function Zs(e) {
	return e.replace(/[^a-z0-9]+/gi, "").toLowerCase();
}
function Qs(e) {
	let { requestedPageUrl: t, returnedNextUrl: n, returnedItemIds: r, lastPageItemIds: i } = e;
	return r.length === 0 ? {
		nextUrl: null,
		discardPage: !0,
		stopReason: "Civitai returned an empty page; stopping pagination."
	} : i !== null && r.length === i.length && r.every((e, t) => e === i[t]) ? {
		nextUrl: null,
		discardPage: !0,
		stopReason: "Civitai repeated the same page; stopping pagination."
	} : t && n && t === n ? {
		nextUrl: null,
		discardPage: !1,
		stopReason: "Civitai repeated the same next-page token; stopping pagination."
	} : {
		nextUrl: n,
		discardPage: !1,
		stopReason: null
	};
}
function $s(e, t, n) {
	if (e !== "model_name") return null;
	let r = Zs(t.trim());
	if (!r) return null;
	for (let e of n) {
		let t = e.creator_username ?? (e.creator && typeof e.creator == "object" ? e.creator.username : null) ?? "";
		if ([
			e.name ?? "",
			String(t),
			...e.tags ?? []
		].some((e) => Zs(String(e)).includes(r))) return null;
	}
	return "Civitai returned unrelated tail results; stopping pagination.";
}
var ec = xs("at-browse", () => {
	let e = /* @__PURE__ */ R(""), t = /* @__PURE__ */ R("model_name"), n = /* @__PURE__ */ R([]), r = /* @__PURE__ */ R([]), i = /* @__PURE__ */ R("Most Downloaded"), a = /* @__PURE__ */ R("All Time"), o = /* @__PURE__ */ R(!0), s = /* @__PURE__ */ R(!1), c = /* @__PURE__ */ R(!1), l = /* @__PURE__ */ R(null), u = 0, d = /* @__PURE__ */ R([]), f = /* @__PURE__ */ R([]), p = /* @__PURE__ */ R(null), m = /* @__PURE__ */ R([]), h = /* @__PURE__ */ R(null), g = Aa(() => (f.value.length > 0 || !!p.value) && !s.value), _ = /* @__PURE__ */ R(null), v = /* @__PURE__ */ R(!1), y = /* @__PURE__ */ R("General"), b = /* @__PURE__ */ R("skip"), x = /* @__PURE__ */ R(!1), S = /* @__PURE__ */ R(/* @__PURE__ */ new Set());
	function C() {
		return {
			q: e.value,
			search_type: t.value,
			content_types: [...n.value],
			base_models: [...r.value],
			sort: i.value,
			period: a.value,
			nsfw: !o.value
		};
	}
	function w(n, r, i) {
		let a = n.map((e) => e.id), o = Qs({
			requestedPageUrl: r,
			returnedNextUrl: i,
			returnedItemIds: a,
			lastPageItemIds: m.value.length ? [...m.value] : null
		});
		if (r) {
			let r = $s(t.value, e.value, n);
			r && (o = {
				nextUrl: null,
				discardPage: !0,
				stopReason: r
			});
		}
		return o.discardPage ? (p.value = null, h.value = o.stopReason, !1) : (f.value = [...f.value, ...n], p.value = o.nextUrl, m.value = a, h.value = o.stopReason, !0);
	}
	function T() {
		c.value || !p.value || f.value.length >= Xs || ee();
	}
	async function ee() {
		if (c.value || !p.value) return;
		let e = u, t = p.value;
		c.value = !0;
		try {
			let n = await js(t, C());
			if (e !== u) return;
			w(n.items, t, n.next_page ?? null);
		} catch (t) {
			if (e !== u) return;
			l.value = t instanceof Error ? t.message : "Load more failed";
		} finally {
			e === u && (c.value = !1);
		}
	}
	function te() {
		if (f.value.length === 0) return 0;
		let e = f.value.slice(0, Ys);
		return f.value = f.value.slice(Ys), d.value = [...d.value, ...e], T(), e.length;
	}
	async function E(e) {
		let t = ++u;
		s.value = !0, l.value = null, e && (h.value = null, m.value = [], f.value = []);
		try {
			let n = await As(C());
			if (t !== u) return;
			e && (d.value = [], f.value = [], m.value = []), w(n.items, null, n.next_page ?? null), te();
		} catch (n) {
			if (t !== u) return;
			l.value = n instanceof Error ? n.message : "Search failed", e && (d.value = [], f.value = []);
		} finally {
			t === u && (s.value = !1);
		}
	}
	async function ne() {
		if (!s.value) {
			if (f.value.length > 0) {
				te();
				return;
			}
			!p.value || c.value || (await ee(), te());
		}
	}
	async function D(e) {
		v.value = !0, _.value = null;
		try {
			_.value = await Ms(e, !o.value);
		} catch (e) {
			l.value = e instanceof Error ? e.message : "Detail failed";
		} finally {
			v.value = !1;
		}
	}
	function re() {
		_.value = null;
	}
	function ie(e) {
		let t = new Set(S.value);
		t.has(e) ? t.delete(e) : t.add(e), S.value = t;
	}
	function O() {
		S.value = /* @__PURE__ */ new Set();
	}
	function ae(e) {
		x.value = e, e || O();
	}
	return {
		q: e,
		searchType: t,
		contentTypes: n,
		baseModels: r,
		sort: i,
		period: a,
		hideNsfwFromConfig: o,
		loading: s,
		fetching: c,
		error: l,
		items: d,
		buffer: f,
		nextPage: p,
		lastPageItemIds: m,
		stoppedReason: h,
		hasMore: g,
		selected: _,
		detailLoading: v,
		category: y,
		duplicateResolution: b,
		batchMode: x,
		batchIds: S,
		search: E,
		loadMore: ne,
		drainBuffer: te,
		openModel: D,
		closeDetail: re,
		toggleBatchId: ie,
		clearBatch: O,
		setBatchMode: ae,
		searchParams: C
	};
}), tc = 1500, nc = 1e4;
function rc(e) {
	let t = e.toLowerCase();
	return t === "queued" || t === "downloading" || t === "verifying";
}
function ic(e, t = 3500) {
	let n = document.createElement("div");
	n.textContent = e, n.style.cssText = [
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
	].join(";"), document.body.appendChild(n), requestAnimationFrame(() => {
		n.style.opacity = "1";
	}), setTimeout(() => {
		n.style.opacity = "0", setTimeout(() => n.remove(), 220);
	}, t);
}
var ac = xs("at-downloads", () => {
	let e = /* @__PURE__ */ R([]), t = /* @__PURE__ */ R(!1), n = /* @__PURE__ */ R(null), r = /* @__PURE__ */ R("browse");
	function i(e) {
		r.value = e;
	}
	let a = null, o = /* @__PURE__ */ R(/* @__PURE__ */ new Set());
	function s() {
		return e.value.some((e) => rc(e.state));
	}
	function c() {
		a != null && (clearTimeout(a), a = null);
		let e = s() ? tc : nc;
		a = setTimeout(() => {
			l();
		}, e);
	}
	async function l() {
		if (typeof document < "u" && document.visibilityState === "hidden") {
			c();
			return;
		}
		await u({ forPoll: !0 }), c();
	}
	async function u(i) {
		let a = i?.forPoll === !0;
		a || (t.value = !0), n.value = null;
		try {
			let t = await Is();
			e.value = t.tasks;
			for (let e of t.completed_since_last_poll ?? []) if (!o.value.has(e)) {
				o.value.add(e);
				let n = t.tasks.find((t) => t.id === e)?.filename ?? e.slice(0, 8);
				r.value !== "downloads" && ic(`Download completed: ${n}`);
			}
		} catch (e) {
			n.value = e instanceof Error ? e.message : "Queue load failed";
		} finally {
			a || (t.value = !1);
		}
	}
	function d() {
		a ?? u({ forPoll: !0 }).finally(() => c());
	}
	function f() {
		a != null && (clearTimeout(a), a = null);
	}
	return {
		tasks: e,
		loading: t,
		error: n,
		activeTab: r,
		setTab: i,
		refresh: u,
		startPolling: d,
		stopPolling: f,
		showToast: ic
	};
}), oc = [
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
], sc = [
	"SD 1.5",
	"SD 2.1",
	"SDXL 1.0",
	"SDXL Turbo",
	"Pony",
	"Flux.1 D",
	"Flux.1 S",
	"SD 3.5",
	"SD 3.5 Large"
], cc = [
	{
		value: "Most Downloaded",
		label: "Most downloaded"
	},
	{
		value: "Highest Rated",
		label: "Highest rated"
	},
	{
		value: "Newest",
		label: "Newest"
	},
	{
		value: "Most Liked",
		label: "Most liked"
	},
	{
		value: "Most Buzz",
		label: "Most buzz"
	},
	{
		value: "Most Discussed",
		label: "Most discussed"
	},
	{
		value: "Most Collected",
		label: "Most collected"
	},
	{
		value: "Most Images",
		label: "Most images"
	},
	{
		value: "Oldest",
		label: "Oldest"
	}
], lc = [
	{
		value: "All Time",
		label: "All time"
	},
	{
		value: "Year",
		label: "Year"
	},
	{
		value: "Month",
		label: "Month"
	},
	{
		value: "Week",
		label: "Week"
	},
	{
		value: "Day",
		label: "Day"
	}
], uc = { class: "browse-filters" }, dc = { class: "browse-filters__body" }, fc = { class: "browse-filters__row" }, pc = { class: "browse-filters__section" }, mc = { class: "browse-filters__chips" }, hc = ["checked", "onChange"], gc = { class: "browse-filters__section" }, _c = { class: "browse-filters__chips" }, vc = ["checked", "onChange"], yc = { class: "browse-filters__row" }, bc = ["value"], xc = { class: "browse-filters__row" }, Sc = ["value"], Cc = /* @__PURE__ */ ar({
	__name: "BrowseFilters",
	setup(e) {
		let { searchType: t, contentTypes: n, baseModels: r, sort: i, period: a } = Ss(ec()), o = /* @__PURE__ */ R(!1);
		function s(e) {
			let t = n.value.slice(), r = t.indexOf(e);
			r >= 0 ? t.splice(r, 1) : t.push(e), n.value = t;
		}
		function c(e) {
			return n.value.includes(e);
		}
		function l(e) {
			let t = r.value.slice(), n = t.indexOf(e);
			n >= 0 ? t.splice(n, 1) : t.push(e), r.value = t;
		}
		function u(e) {
			return r.value.includes(e);
		}
		return (e, n) => (K(), q("div", uc, [J("button", {
			type: "button",
			class: "browse-filters__toggle",
			onClick: n[0] ||= (e) => o.value = !o.value
		}, j(o.value ? "▼" : "▶") + " Filters ", 1), V(J("div", dc, [
			J("label", fc, [n[5] ||= J("span", null, "Search type", -1), V(J("select", {
				"onUpdate:modelValue": n[1] ||= (e) => /* @__PURE__ */ L(t) ? t.value = e : null,
				class: "at-input at-input--sm"
			}, [...n[4] ||= [
				J("option", { value: "model_name" }, "Model name", -1),
				J("option", { value: "username" }, "Username", -1),
				J("option", { value: "tag" }, "Tag", -1)
			]], 512), [[Oo, z(t)]])]),
			J("div", pc, [n[6] ||= J("span", { class: "browse-filters__label" }, "Content types", -1), J("div", mc, [(K(!0), q(W, null, Ar(z(oc), (e) => (K(), q("label", {
				key: e,
				class: "browse-filters__chk"
			}, [J("input", {
				type: "checkbox",
				checked: c(e),
				onChange: (t) => s(e)
			}, null, 40, hc), Y(" " + j(e), 1)]))), 128))])]),
			J("div", gc, [n[7] ||= J("span", { class: "browse-filters__label" }, "Base models", -1), J("div", _c, [(K(!0), q(W, null, Ar(z(sc), (e) => (K(), q("label", {
				key: e,
				class: "browse-filters__chk"
			}, [J("input", {
				type: "checkbox",
				checked: u(e),
				onChange: (t) => l(e)
			}, null, 40, vc), Y(" " + j(e), 1)]))), 128))])]),
			J("label", yc, [n[8] ||= J("span", null, "Sort", -1), V(J("select", {
				"onUpdate:modelValue": n[2] ||= (e) => /* @__PURE__ */ L(i) ? i.value = e : null,
				class: "at-input at-input--sm"
			}, [(K(!0), q(W, null, Ar(z(cc), (e) => (K(), q("option", {
				key: e.value,
				value: e.value
			}, j(e.label), 9, bc))), 128))], 512), [[Oo, z(i)]])]),
			J("label", xc, [n[9] ||= J("span", null, "Period", -1), V(J("select", {
				"onUpdate:modelValue": n[3] ||= (e) => /* @__PURE__ */ L(a) ? a.value = e : null,
				class: "at-input at-input--sm"
			}, [(K(!0), q(W, null, Ar(z(lc), (e) => (K(), q("option", {
				key: e.value,
				value: e.value
			}, j(e.label), 9, Sc))), 128))], 512), [[Oo, z(a)]])])
		], 512), [[Wa, o.value]])]));
	}
}), wc = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Tc = /* @__PURE__ */ wc(Cc, [["__scopeId", "data-v-97f2d9aa"]]);
//#endregion
//#region src/utils/civitaiDisplay.ts
function Ec(e) {
	let t = e.creator?.username;
	return t ? String(t) : e.creator_username ? String(e.creator_username) : null;
}
function Dc(e) {
	let t = e.modelVersions;
	if (!t?.length) return null;
	for (let e of t) {
		let t = e.images;
		if (t?.length) {
			for (let e of t) if ((e.type || "image").toLowerCase() !== "video" && e.url) return e.url;
			if (t[0]?.url) return t[0].url;
		}
	}
	return null;
}
function Oc(e) {
	let t = e.trim();
	return t || t;
}
//#endregion
//#region src/components/BrowseResultCard.vue?vue&type=script&setup=true&lang.ts
var kc = ["checked"], Ac = { class: "result-card__thumb" }, jc = ["src", "alt"], Mc = {
	key: 1,
	class: "result-card__placeholder"
}, Nc = { class: "result-card__meta" }, Pc = { class: "result-card__name" }, Fc = { class: "result-card__type" }, Ic = {
	key: 0,
	class: "result-card__creator"
}, Lc = {
	key: 1,
	class: "result-card__stats"
}, Rc = /* @__PURE__ */ wc(/* @__PURE__ */ ar({
	__name: "BrowseResultCard",
	props: {
		item: {},
		batchMode: { type: Boolean },
		batchSelected: { type: Boolean }
	},
	emits: ["open", "toggleBatch"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i(e) {
			let t = e.stats;
			if (!t) return "";
			let n = [], r = t.downloadCount ?? t.download_count;
			r != null && n.push(`${r} dl`), t.rating != null && n.push(`★ ${t.rating}`);
			let i = t.thumbsUpCount ?? t.thumbs_up_count;
			return i != null && n.push(`${i} 👍`), n.join(" · ");
		}
		function a(e) {
			if (n.batchMode) {
				e.stopPropagation(), r("toggleBatch");
				return;
			}
			r("open");
		}
		function o(e) {
			e.stopPropagation(), r("toggleBatch");
		}
		return (t, n) => (K(), q("div", {
			class: A(["result-card", {
				"result-card--batch": e.batchMode,
				"result-card--selected": e.batchSelected
			}]),
			onClick: a
		}, [
			e.batchMode ? (K(), q("div", {
				key: 0,
				class: "result-card__cb",
				onClick: Po(o, ["stop"])
			}, [J("input", {
				type: "checkbox",
				checked: e.batchSelected,
				tabindex: "-1",
				readonly: ""
			}, null, 8, kc)])) : X("", !0),
			J("div", Ac, [z(Dc)(e.item) ? (K(), q("img", {
				key: 0,
				src: z(Oc)(z(Dc)(e.item)),
				alt: e.item.name,
				loading: "lazy"
			}, null, 8, jc)) : (K(), q("div", Mc, "No preview"))]),
			J("div", Nc, [
				J("span", Pc, j(e.item.name), 1),
				J("span", Fc, j(e.item.type), 1),
				z(Ec)(e.item) ? (K(), q("span", Ic, "by " + j(z(Ec)(e.item)), 1)) : X("", !0),
				i(e.item) ? (K(), q("span", Lc, j(i(e.item)), 1)) : X("", !0)
			])
		], 2));
	}
}), [["__scopeId", "data-v-ae3da52e"]]), zc = { class: "result-grid" }, Bc = /* @__PURE__ */ wc(/* @__PURE__ */ ar({
	__name: "BrowseResultGrid",
	setup(e) {
		let t = ec(), { items: n, batchMode: r, batchIds: i } = Ss(t);
		return (e, a) => (K(), q("div", zc, [(K(!0), q(W, null, Ar(z(n), (e) => (K(), Xi(Rc, {
			key: e.id,
			item: e,
			"batch-mode": z(r),
			"batch-selected": z(i).has(e.id),
			onOpen: (n) => z(t).openModel(e.id),
			onToggleBatch: (n) => z(t).toggleBatchId(e.id)
		}, null, 8, [
			"item",
			"batch-mode",
			"batch-selected",
			"onOpen",
			"onToggleBatch"
		]))), 128))]));
	}
}), [["__scopeId", "data-v-9a10aff0"]]);
//#endregion
//#region src/utils/filterFamilyForModelType.ts
function Vc(e) {
	let t = (e ?? "").trim().toLowerCase();
	if (t === "checkpoint") return "checkpoint";
	if (t) return "lora";
}
//#endregion
//#region ../web_shared/ImageMetaLightbox.vue?vue&type=script&setup=true&lang.ts
var Hc = ["src"], Uc = {
	key: 0,
	class: "at-imlb__meta"
}, Wc = /* @__PURE__ */ wc(/* @__PURE__ */ ar({
	__name: "ImageMetaLightbox",
	props: {
		imageUrl: {},
		meta: {}
	},
	emits: ["close"],
	setup(e) {
		return (t, n) => (K(), Xi(er, { to: "body" }, [e.imageUrl ? (K(), q("div", {
			key: 0,
			class: "at-imlb",
			onClick: n[2] ||= Po((e) => t.$emit("close"), ["self"])
		}, [J("div", {
			class: "at-imlb__inner",
			onClick: n[1] ||= Po((e) => t.$emit("close"), ["self"])
		}, [
			J("button", {
				type: "button",
				class: "at-imlb__x",
				onClick: n[0] ||= (e) => t.$emit("close")
			}, "×"),
			J("img", {
				src: e.imageUrl,
				alt: "Preview"
			}, null, 8, Hc),
			e.meta && Object.keys(e.meta).length ? (K(), q("pre", Uc, j(JSON.stringify(e.meta, null, 2)), 1)) : X("", !0)
		])])) : X("", !0)]));
	}
}), [["__scopeId", "data-v-a7eb6085"]]), Gc = { class: "model-detail" }, Kc = { class: "model-detail__hdr" }, qc = { class: "model-detail__sub" }, Jc = { class: "pill" }, Yc = { key: 0 }, Xc = { key: 1 }, Zc = {
	key: 0,
	class: "model-detail__controls"
}, Qc = { class: "at-label" }, $c = ["value"], el = {
	key: 0,
	class: "at-label"
}, tl = ["value"], nl = {
	key: 1,
	class: "model-detail__desc"
}, rl = ["innerHTML"], il = {
	key: 2,
	class: "model-detail__tw"
}, al = { class: "model-detail__tw-row" }, ol = { class: "model-detail__tw-text" }, sl = {
	key: 3,
	class: "model-detail__gallery"
}, cl = { class: "model-detail__thumbs" }, ll = ["onClick"], ul = ["src", "alt"], dl = {
	key: 1,
	class: "model-detail__vid"
}, fl = { class: "model-detail__dl" }, pl = { class: "at-label" }, ml = {
	key: 0,
	class: "model-detail__cats-hint"
}, hl = ["list"], gl = ["id"], _l = ["value"], vl = { class: "model-detail__dup" }, yl = { class: "model-detail__dl-btns" }, bl = /* @__PURE__ */ wc(/* @__PURE__ */ ar({
	__name: "BrowseModelDetail",
	props: { model: {} },
	emits: [
		"close",
		"downloaded",
		"error"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { category: i, duplicateResolution: a } = Ss(ec()), o = /* @__PURE__ */ R(0), s = /* @__PURE__ */ R(0), c = /* @__PURE__ */ R(!1), l = /* @__PURE__ */ R(null), u = /* @__PURE__ */ R(null), d = Aa(() => n.model.modelVersions ?? []);
		zn(() => n.model.id, () => {
			o.value = 0, s.value = 0, c.value = !1, l.value = null, u.value = null;
		});
		let f = Aa(() => d.value[o.value] ?? null), p = Aa(() => f.value?.files ?? []);
		zn(f, (e) => {
			if (s.value = 0, e?.files?.length) {
				let t = e.files.findIndex((e) => e.primary);
				t >= 0 && (s.value = t);
			}
		});
		let m = Aa(() => f.value?.images ?? []), h = /* @__PURE__ */ R([]), g = /* @__PURE__ */ R(!1), _ = Aa(() => `at-browse-cats-${n.model.id}`);
		zn(() => [n.model.id, n.model.type], async ([, e]) => {
			g.value = !0;
			try {
				let t = Vc(e);
				h.value = (await Ns(t ? { family: t } : {})).categories ?? [];
			} catch {
				h.value = [];
			} finally {
				g.value = !1;
			}
		}, { immediate: !0 });
		let v = Aa(() => {
			let e = f.value?.trainedWords;
			return Array.isArray(e) ? e : [];
		});
		async function y(e) {
			try {
				await navigator.clipboard.writeText(e);
			} catch {
				r("error", "Copy failed");
			}
		}
		function b() {
			let e = f.value, t = p.value;
			if (!e || !t.length) return null;
			let n = t[s.value] ?? t[0];
			return n?.id ? {
				versionId: e.id,
				fileId: n.id
			} : null;
		}
		async function x() {
			let e = b();
			if (!e) {
				r("error", "No file on this version");
				return;
			}
			try {
				await Ps({
					civitai_model_id: n.model.id,
					version_id: e.versionId,
					file_id: e.fileId,
					category: i.value.trim() || "General",
					duplicate_resolution: a.value
				}), r("downloaded");
			} catch (e) {
				r("error", e instanceof Error ? e.message : "Download failed");
			}
		}
		async function S() {
			let e = [];
			for (let t of d.value) {
				let r = t.files ?? [];
				if (!r.length) continue;
				let a = r.findIndex((e) => e.primary), o = r[a >= 0 ? a : 0];
				o?.id && e.push({
					civitai_model_id: n.model.id,
					version_id: t.id,
					file_id: o.id,
					category: i.value.trim() || "General"
				});
			}
			if (!e.length) {
				r("error", "No downloadable files");
				return;
			}
			try {
				await Fs(e, a.value), r("downloaded");
			} catch (e) {
				r("error", e instanceof Error ? e.message : "Batch download failed");
			}
		}
		function C(e, t) {
			l.value = e, u.value = t;
		}
		function w() {
			l.value = null, u.value = null;
		}
		let T = Aa(() => n.model.description?.trim() || "");
		return (t, n) => (K(), q("div", Gc, [
			J("div", Kc, [J("h3", null, j(e.model.name), 1), J("button", {
				type: "button",
				class: "at-btn",
				onClick: n[0] ||= (e) => r("close")
			}, "Close")]),
			J("p", qc, [
				J("span", Jc, j(e.model.type), 1),
				z(Ec)(e.model) ? (K(), q("span", Yc, " · " + j(z(Ec)(e.model)), 1)) : X("", !0),
				f.value?.baseModel ? (K(), q("span", Xc, " · " + j(f.value.baseModel), 1)) : X("", !0)
			]),
			d.value.length ? (K(), q("div", Zc, [J("label", Qc, [n[8] ||= Y(" Version ", -1), V(J("select", {
				"onUpdate:modelValue": n[1] ||= (e) => o.value = e,
				class: "at-input"
			}, [(K(!0), q(W, null, Ar(d.value, (e, t) => (K(), q("option", {
				key: e.id,
				value: t
			}, j(e.name || `v${e.id}`), 9, $c))), 128))], 512), [[
				Oo,
				o.value,
				void 0,
				{ number: !0 }
			]])]), p.value.length > 1 ? (K(), q("label", el, [n[9] ||= Y(" File ", -1), V(J("select", {
				"onUpdate:modelValue": n[2] ||= (e) => s.value = e,
				class: "at-input"
			}, [(K(!0), q(W, null, Ar(p.value, (e, t) => (K(), q("option", {
				key: e.id,
				value: t
			}, j(e.name) + " " + j(e.primary ? "(primary)" : ""), 9, tl))), 128))], 512), [[
				Oo,
				s.value,
				void 0,
				{ number: !0 }
			]])])) : X("", !0)])) : X("", !0),
			T.value ? (K(), q("div", nl, [J("div", {
				class: A(["model-detail__desc-inner", { "model-detail__desc-inner--collapsed": !c.value && T.value.length > 400 }]),
				innerHTML: T.value
			}, null, 10, rl), T.value.length > 400 ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-btn at-btn--link",
				onClick: n[3] ||= (e) => c.value = !c.value
			}, j(c.value ? "Show less" : "Show more"), 1)) : X("", !0)])) : X("", !0),
			v.value.length ? (K(), q("div", il, [n[10] ||= J("span", { class: "model-detail__tw-label" }, "Trigger words", -1), J("div", al, [J("code", ol, j(v.value.join(", ")), 1), J("button", {
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: n[4] ||= (e) => y(v.value.join(", "))
			}, "Copy")])])) : X("", !0),
			m.value.length ? (K(), q("div", sl, [n[11] ||= J("span", { class: "model-detail__tw-label" }, "Gallery", -1), J("div", cl, [(K(!0), q(W, null, Ar(m.value, (e, t) => (K(), q("button", {
				key: t,
				type: "button",
				class: "model-detail__thumb",
				onClick: (t) => C(e.url, e.meta ?? null)
			}, [(e.type || "image").toLowerCase() === "video" ? (K(), q("span", dl, "Video")) : (K(), q("img", {
				key: 0,
				src: z(Oc)(e.url),
				alt: `Image ${t}`,
				loading: "lazy"
			}, null, 8, ul))], 8, ll))), 128))])])) : X("", !0),
			J("div", fl, [
				J("label", pl, [
					n[12] ||= Y(" Category folder ", -1),
					g.value ? (K(), q("span", ml, "Loading folders…")) : X("", !0),
					V(J("input", {
						"onUpdate:modelValue": n[5] ||= (e) => /* @__PURE__ */ L(i) ? i.value = e : null,
						class: "at-input model-detail__category-combo",
						list: _.value,
						placeholder: "Pick from list or type a folder name (e.g. General)",
						autocomplete: "off",
						"aria-autocomplete": "list"
					}, null, 8, hl), [[wo, z(i)]]),
					J("datalist", { id: _.value }, [(K(!0), q(W, null, Ar(h.value, (e) => (K(), q("option", {
						key: "dl-" + e,
						value: e
					}, null, 8, _l))), 128))], 8, gl)
				]),
				J("fieldset", vl, [
					n[15] ||= J("legend", null, "Duplicate file", -1),
					J("label", null, [V(J("input", {
						"onUpdate:modelValue": n[6] ||= (e) => /* @__PURE__ */ L(a) ? a.value = e : null,
						type: "radio",
						value: "skip"
					}, null, 512), [[Do, z(a)]]), n[13] ||= Y(" Skip if exists", -1)]),
					J("label", null, [V(J("input", {
						"onUpdate:modelValue": n[7] ||= (e) => /* @__PURE__ */ L(a) ? a.value = e : null,
						type: "radio",
						value: "replace"
					}, null, 512), [[Do, z(a)]]), n[14] ||= Y(" Replace", -1)])
				]),
				J("div", yl, [J("button", {
					type: "button",
					class: "at-btn",
					onClick: x
				}, "Download"), d.value.length > 1 ? (K(), q("button", {
					key: 0,
					type: "button",
					class: "at-btn",
					onClick: S
				}, "Download all versions")) : X("", !0)])
			]),
			ta(Wc, {
				"image-url": l.value,
				meta: u.value,
				onClose: w
			}, null, 8, ["image-url", "meta"])
		]));
	}
}), [["__scopeId", "data-v-7ce530e9"]]), xl = { class: "config-panel" }, Sl = {
	key: 0,
	class: "at-err"
}, Cl = {
	key: 1,
	class: "at-muted"
}, wl = { class: "at-label" }, Tl = { class: "at-label" }, El = ["placeholder"], Dl = { class: "at-label at-label--row" }, Ol = { class: "at-label" }, kl = { class: "at-label" }, Al = { class: "at-label" }, jl = { class: "at-label" }, Ml = { class: "at-label at-label--row" }, Nl = { class: "at-label at-label--row" }, Pl = { class: "config-panel__actions" }, Fl = ["disabled"], Il = { class: "config-panel__status" }, Ll = { class: "config-panel__pre" }, Rl = { class: "config-panel__pre" }, zl = /* @__PURE__ */ wc(/* @__PURE__ */ ar({
	__name: "ConfigPanel",
	setup(e) {
		let t = ec(), n = /* @__PURE__ */ R(!1), r = /* @__PURE__ */ R(null), i = /* @__PURE__ */ R(null), a = /* @__PURE__ */ R(Es()), o = /* @__PURE__ */ R(""), s = /* @__PURE__ */ R(null), c = /* @__PURE__ */ R(null), l = null;
		async function u() {
			n.value = !0, r.value = null;
			try {
				i.value = await Hs(), a.value = Es(), o.value = "", t.hideNsfwFromConfig = !!i.value?.hide_nsfw, s.value = await Gs(), c.value = await qs();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Load failed";
			} finally {
				n.value = !1;
			}
		}
		function d() {
			Os(a.value || "http://127.0.0.1:8188"), a.value = Es();
		}
		async function f() {
			if (i.value) {
				n.value = !0, r.value = null;
				try {
					let e = {
						scan_on_startup: i.value.scan_on_startup,
						enrichment_mode: i.value.enrichment_mode,
						enrichment_rate_limit_ms: i.value.enrichment_rate_limit_ms,
						max_parallel_downloads: i.value.max_parallel_downloads,
						download_subpath_template: i.value.download_subpath_template,
						hide_early_access: i.value.hide_early_access,
						hide_nsfw: i.value.hide_nsfw
					};
					o.value.trim() && (e.civitai_api_key = o.value.trim()), i.value = await Us(e), o.value = "", t.hideNsfwFromConfig = !!i.value?.hide_nsfw;
				} catch (e) {
					r.value = e instanceof Error ? e.message : "Save failed";
				} finally {
					n.value = !1;
				}
			}
		}
		async function p() {
			try {
				await Ws(), s.value = await Gs();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Scan failed";
			}
		}
		async function m() {
			try {
				await Ks(), c.value = await qs();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Enrich failed";
			}
		}
		async function h() {
			try {
				s.value = await Gs(), c.value = await qs();
			} catch {}
		}
		return br(() => {
			u(), l = setInterval(() => void h(), 4e3);
		}), wr(() => {
			l && clearInterval(l);
		}), (e, t) => (K(), q("div", xl, [
			r.value ? (K(), q("p", Sl, j(r.value), 1)) : X("", !0),
			n.value && !i.value ? (K(), q("p", Cl, "Loading…")) : X("", !0),
			i.value ? (K(), q(W, { key: 2 }, [
				J("label", wl, [t[9] ||= Y(" Server URL ", -1), V(J("input", {
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					class: "at-input",
					type: "url",
					autocomplete: "off"
				}, null, 512), [[wo, a.value]])]),
				t[21] ||= J("p", { class: "at-hint" }, [Y(" Default: "), J("code", null, "http://127.0.0.1:8188")], -1),
				J("button", {
					type: "button",
					class: "at-btn at-btn--ghost",
					onClick: d
				}, "Apply server URL"),
				J("label", Tl, [t[10] ||= Y(" Civitai API key ", -1), V(J("input", {
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					class: "at-input",
					type: "password",
					autocomplete: "off",
					placeholder: i.value.civitai_api_key_set ? "(unchanged — enter new key to replace)" : "Optional"
				}, null, 8, El), [[wo, o.value]])]),
				J("label", Dl, [V(J("input", {
					"onUpdate:modelValue": t[2] ||= (e) => i.value.scan_on_startup = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.scan_on_startup]]), t[11] ||= Y(" Scan library on startup ", -1)]),
				J("label", Ol, [t[13] ||= Y(" Enrichment mode ", -1), V(J("select", {
					"onUpdate:modelValue": t[3] ||= (e) => i.value.enrichment_mode = e,
					class: "at-input"
				}, [...t[12] ||= [
					J("option", { value: "auto" }, "Auto (during scan)", -1),
					J("option", { value: "background" }, "Background (after scan)", -1),
					J("option", { value: "manual" }, "Manual only", -1)
				]], 512), [[Oo, i.value.enrichment_mode]])]),
				J("label", kl, [t[14] ||= Y(" Enrichment rate limit (ms) ", -1), V(J("input", {
					"onUpdate:modelValue": t[4] ||= (e) => i.value.enrichment_rate_limit_ms = e,
					class: "at-input",
					type: "number",
					min: "200",
					step: "100"
				}, null, 512), [[
					wo,
					i.value.enrichment_rate_limit_ms,
					void 0,
					{ number: !0 }
				]])]),
				J("label", Al, [t[15] ||= Y(" Max parallel downloads ", -1), V(J("input", {
					"onUpdate:modelValue": t[5] ||= (e) => i.value.max_parallel_downloads = e,
					class: "at-input",
					type: "number",
					min: "1",
					max: "8"
				}, null, 512), [[
					wo,
					i.value.max_parallel_downloads,
					void 0,
					{ number: !0 }
				]])]),
				J("label", jl, [t[16] ||= Y(" Download subpath template ", -1), V(J("input", {
					"onUpdate:modelValue": t[6] ||= (e) => i.value.download_subpath_template = e,
					class: "at-input",
					placeholder: "{category}"
				}, null, 512), [[wo, i.value.download_subpath_template]])]),
				J("label", Ml, [V(J("input", {
					"onUpdate:modelValue": t[7] ||= (e) => i.value.hide_early_access = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.hide_early_access]]), t[17] ||= Y(" Hide early-access versions (Civitai) ", -1)]),
				J("label", Nl, [V(J("input", {
					"onUpdate:modelValue": t[8] ||= (e) => i.value.hide_nsfw = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.hide_nsfw]]), t[18] ||= Y(" Hide NSFW from Civitai (browse search, detail, and related API calls) ", -1)]),
				J("div", Pl, [
					J("button", {
						type: "button",
						class: "at-btn",
						disabled: n.value,
						onClick: f
					}, "Save settings", 8, Fl),
					J("button", {
						type: "button",
						class: "at-btn",
						onClick: p
					}, "Scan now"),
					J("button", {
						type: "button",
						class: "at-btn",
						onClick: m
					}, "Enrich now"),
					J("button", {
						type: "button",
						class: "at-btn at-btn--ghost",
						onClick: u
					}, "Reload")
				]),
				J("div", Il, [
					t[19] ||= J("h4", null, "Scan", -1),
					J("pre", Ll, j(JSON.stringify(s.value, null, 2)), 1),
					t[20] ||= J("h4", null, "Enrichment", -1),
					J("pre", Rl, j(JSON.stringify(c.value, null, 2)), 1)
				])
			], 64)) : X("", !0)
		]));
	}
}), [["__scopeId", "data-v-4874b7c0"]]);
//#endregion
//#region src/utils/downloadSpec.ts
function Bl(e) {
	let t = e.modelVersions;
	if (!t?.length) return null;
	let n = t[0], r = n.files ?? [];
	if (!r.length) return null;
	let i = r.findIndex((e) => e.primary), a = r[i >= 0 ? i : 0];
	return a?.id ? {
		modelId: e.id,
		versionId: n.id,
		fileId: a.id
	} : null;
}
//#endregion
//#region src/App.vue?vue&type=script&setup=true&lang.ts
var Vl = { class: "at-browse-app" }, Hl = { class: "at-browse-app__tabs" }, Ul = {
	key: 0,
	class: "at-browse-app__panel at-browse-app__panel--browse"
}, Wl = { class: "at-browse-app__browse-chrome" }, Gl = { class: "at-browse-app__search" }, Kl = ["disabled"], ql = {
	key: "browse-batch-bar",
	class: "at-batch-bar"
}, Jl = {
	key: "browse-search-error",
	class: "at-err"
}, Yl = {
	key: "browse-detail-panel",
	class: "at-browse-app__detail-panel"
}, Xl = {
	key: 0,
	class: "at-muted"
}, Zl = {
	key: 0,
	class: "at-muted"
}, Ql = {
	key: 1,
	class: "at-muted"
}, $l = {
	key: 1,
	class: "at-browse-app__panel"
}, eu = {
	key: 0,
	class: "at-err"
}, tu = { class: "at-dl-list" }, nu = { class: "at-dl__row" }, ru = ["src"], iu = { class: "at-dl__main" }, au = { class: "at-dl__title" }, ou = {
	key: 0,
	class: "at-dl__err"
}, su = {
	key: 1,
	class: "at-dl__bar"
}, cu = { class: "at-dl__actions" }, lu = ["onClick"], uu = ["onClick"], du = ["onClick"], fu = ["onClick"], pu = {
	key: 2,
	class: "at-browse-app__panel at-browse-app__panel--scroll"
}, mu = 200, hu = /* @__PURE__ */ wc(/* @__PURE__ */ ar({
	__name: "App",
	setup(e) {
		let t = ec(), n = ac(), { items: r, loading: i, fetching: a, error: o, q: s, selected: c, detailLoading: l, batchMode: u, batchIds: d, duplicateResolution: f, hasMore: p, stoppedReason: m } = Ss(t), { tasks: h, activeTab: g } = Ss(n), _ = /* @__PURE__ */ R(null);
		function v(e) {
			return e.scrollHeight - e.scrollTop - e.clientHeight <= mu;
		}
		function y() {
			let e = _.value;
			!e || !p.value || i.value || v(e) && t.loadMore();
		}
		let b = 0;
		function x() {
			b ||= requestAnimationFrame(() => {
				b = 0, y();
			});
		}
		zn(() => _.value, (e, t) => {
			t && t.removeEventListener("scroll", x), e && (e.addEventListener("scroll", x, { passive: !0 }), requestAnimationFrame(() => y()));
		}, {
			flush: "post",
			immediate: !0
		}), zn([
			r,
			i,
			a
		], () => {
			requestAnimationFrame(() => y());
		}), br(async () => {
			n.startPolling();
			try {
				t.hideNsfwFromConfig = !!(await Hs()).hide_nsfw;
			} catch {}
			t.search(!0);
		}), wr(() => {
			let e = _.value;
			e && e.removeEventListener("scroll", x), n.stopPolling();
		});
		async function S() {
			await t.search(!0);
		}
		function C(e) {
			n.setTab(e), e === "downloads" && n.refresh();
		}
		async function w() {
			n.showToast("Download queued"), n.refresh();
		}
		function T(e) {
			n.showToast(e);
		}
		async function ee() {
			let e = [];
			for (let n of d.value) {
				let i = r.value.find((e) => e.id === n);
				if (!i) continue;
				let a = Bl(i);
				a && e.push({
					civitai_model_id: a.modelId,
					version_id: a.versionId,
					file_id: a.fileId,
					category: t.category.trim() || "General"
				});
			}
			if (!e.length) {
				n.showToast("No downloadable files in selection");
				return;
			}
			try {
				await Fs(e, f.value), n.showToast(`Queued ${e.length} download(s)`), n.refresh(), t.clearBatch();
			} catch (e) {
				n.showToast(e instanceof Error ? e.message : "Batch failed");
			}
		}
		function te(e) {
			let t = e.toLowerCase();
			return t === "queued" || t === "downloading" || t === "verifying";
		}
		function E(e) {
			let t = e.toLowerCase();
			return t === "downloading" || t === "verifying";
		}
		function ne(e) {
			return e.toLowerCase() === "failed";
		}
		function D(e) {
			let t = e.toLowerCase();
			return t === "completed" || t === "failed" || t === "cancelled" || t === "skipped" || t === "paused";
		}
		function re(e) {
			n.$patch({ error: e });
		}
		async function ie(e) {
			try {
				await Bs(e), n.refresh();
			} catch (e) {
				re(e instanceof Error ? e.message : "Pause failed");
			}
		}
		async function O(e) {
			try {
				await Rs(e), n.refresh();
			} catch (e) {
				re(e instanceof Error ? e.message : "Cancel failed");
			}
		}
		async function ae(e) {
			try {
				await zs(e), n.refresh();
			} catch (e) {
				re(e instanceof Error ? e.message : "Retry failed");
			}
		}
		async function k(e) {
			try {
				await Vs(e), n.refresh();
			} catch (e) {
				re(e instanceof Error ? e.message : "Remove failed");
			}
		}
		return (e, r) => (K(), q("div", Vl, [J("header", Hl, [
			J("button", {
				type: "button",
				class: A({ active: z(g) === "browse" }),
				onClick: r[0] ||= (e) => C("browse")
			}, "Browse", 2),
			J("button", {
				type: "button",
				class: A({ active: z(g) === "downloads" }),
				onClick: r[1] ||= (e) => C("downloads")
			}, "Downloads", 2),
			J("button", {
				type: "button",
				class: A(["at-browse-app__tabs-settings", { active: z(g) === "settings" }]),
				title: "Settings",
				"aria-label": "Settings",
				onClick: r[2] ||= (e) => C("settings")
			}, " ⚙ ", 2)
		]), z(g) === "browse" ? (K(), q("div", Ul, [
			J("div", Wl, [
				J("div", Gl, [
					V(J("input", {
						"onUpdate:modelValue": r[3] ||= (e) => /* @__PURE__ */ L(s) ? s.value = e : null,
						class: "at-input",
						placeholder: "Search Civitai…",
						onKeyup: Io(S, ["enter"])
					}, null, 544), [[wo, z(s)]]),
					J("button", {
						type: "button",
						class: "at-btn",
						disabled: z(i),
						onClick: S
					}, "Search", 8, Kl),
					J("button", {
						type: "button",
						class: A(["at-btn", { "at-btn--on": z(u) }]),
						onClick: r[4] ||= (e) => z(t).setBatchMode(!z(u))
					}, j(z(u) ? "Exit batch" : "Batch select"), 3)
				]),
				ta(Tc),
				z(u) && z(d).size ? (K(), q("div", ql, [
					J("span", null, j(z(d).size) + " selected", 1),
					J("button", {
						type: "button",
						class: "at-btn at-btn--sm",
						onClick: ee
					}, "Download selected"),
					J("button", {
						type: "button",
						class: "at-btn at-btn--sm at-btn--ghost",
						onClick: r[5] ||= (...e) => z(t).clearBatch && z(t).clearBatch(...e)
					}, "Clear")
				])) : X("", !0),
				z(o) ? (K(), q("p", Jl, j(z(o)), 1)) : X("", !0)
			]),
			z(l) || z(c) ? (K(), q("div", Yl, [z(l) ? (K(), q("p", Xl, "Loading model…")) : z(c) ? (K(), Xi(bl, {
				key: 1,
				model: z(c),
				onClose: r[6] ||= (e) => z(t).closeDetail(),
				onDownloaded: r[7] ||= (e) => w(),
				onError: T
			}, null, 8, ["model"])) : X("", !0)])) : X("", !0),
			J("div", {
				ref_key: "scrollRoot",
				ref: _,
				class: "at-browse-app__browse-scroll"
			}, [
				ta(Bc),
				z(a) ? (K(), q("p", Zl, "Loading more…")) : X("", !0),
				z(m) && !z(a) ? (K(), q("p", Ql, j(z(m)), 1)) : X("", !0)
			], 512)
		])) : z(g) === "downloads" ? (K(), q("div", $l, [z(n).error ? (K(), q("p", eu, j(z(n).error), 1)) : X("", !0), J("ul", tu, [(K(!0), q(W, null, Ar(z(h), (e) => (K(), q("li", {
			key: e.id,
			class: "at-dl"
		}, [J("div", nu, [Js(e.cover_thumb_url) ? (K(), q("img", {
			key: 0,
			class: "at-dl__thumb",
			src: Js(e.cover_thumb_url),
			alt: ""
		}, null, 8, ru)) : X("", !0), J("div", iu, [
			J("div", au, j(e.display_name || e.filename) + " — " + j(e.state), 1),
			e.error_message ? (K(), q("div", ou, j(e.error_message), 1)) : X("", !0),
			e.total_bytes ? (K(), q("div", su, [J("div", {
				class: "at-dl__fill",
				style: le({ width: `${Math.min(100, Math.round(100 * e.bytes_done / (e.total_bytes || 1)))}%` })
			}, null, 4)])) : X("", !0)
		])]), J("div", cu, [
			te(e.state) ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => O(e.id)
			}, "Cancel", 8, lu)) : X("", !0),
			E(e.state) ? (K(), q("button", {
				key: 1,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => ie(e.id)
			}, "Pause", 8, uu)) : X("", !0),
			ne(e.state) ? (K(), q("button", {
				key: 2,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => ae(e.id)
			}, "Retry", 8, du)) : X("", !0),
			D(e.state) ? (K(), q("button", {
				key: 3,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => k(e.id)
			}, "Remove", 8, fu)) : X("", !0)
		])]))), 128))])])) : (K(), q("div", pu, [ta(zl)]))]));
	}
}), [["__scopeId", "data-v-dc87358e"]]);
//#endregion
//#region src/main.ts
function gu(e) {
	let t = ss(), n = Bo(hu);
	return n.use(t), n.mount(e), n;
}
//#endregion
export { gu as mount };
