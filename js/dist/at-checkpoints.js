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
var V = null, kn = null;
function An(e) {
	let t = V;
	return V = e, kn = e && e.type.__scopeId || null, t;
}
function jn(e, t = V, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && qi(-1);
		let i = An(t), a;
		try {
			a = e(...n);
		} finally {
			An(i), r._d && qi(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Mn(e, n) {
	if (V === null) return e;
	let r = Da(V), i = e.dirs ||= [];
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
	if (Q) {
		let n = Q.provides, r = Q.parent && Q.parent.provides;
		r === n && (n = Q.provides = Object.create(r)), n[e] = t;
	}
}
function Fn(e, t, n = !1) {
	let r = fa();
	if (r || Qr) {
		let i = Qr ? Qr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function In() {
	return !!(fa() || Qr);
}
var Ln = /* @__PURE__ */ Symbol.for("v-scx"), Rn = () => Fn(Ln);
function zn(e, t, n) {
	return Bn(e, t, n);
}
function Bn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (va) {
		if (c === "sync") {
			let e = Rn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Q;
	u.call = (e, t, n) => dn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		W(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Sn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = cn(e, n, u);
	return va && (f ? f.push(h) : d && h()), h;
}
function Vn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Hn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ha(this), s = Bn(i, a.bind(r), n);
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
			Un.set(e, t), W(t, a);
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
			if (o === "svg" || Jn(p) ? o = "svg" : (o === "mathml" || Yn(p)) && (o = "mathml"), v ? (f(e.dynamicChildren, v, y, i, a, o, s), Pi(e, t, !0)) : c || d(e, t, y, b, i, a, o, s, !1), _) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Qn(t, n, r, l, 1);
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
	let s = a.shapeFlag & 4 ? Da(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ I(v), b = v === t ? i : (e) => sr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && sr(_, t));
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
				t.id = -1, cr.set(e, t), W(t, r);
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
function hr(e, t, n = Q) {
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
function _r(e, t, n = Q, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Ue();
			let i = ha(n), a = dn(t, n, e, r);
			return i(), We(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var vr = (e) => (t, n = Q) => {
	(!va || e === "sp") && _r(e, (...e) => t(...e), n);
}, yr = vr("bm"), br = vr("m"), xr = vr("bu"), Sr = vr("u"), Cr = vr("bum"), wr = vr("um"), Tr = vr("sp"), Er = vr("rtg"), Dr = vr("rtc");
function Or(e, t = Q) {
	_r("ec", e, t);
}
var kr = /* @__PURE__ */ Symbol.for("v-ndc");
function H(e, t, n, r) {
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
var Ar = (e) => e ? _a(e) ? Da(e) : Ar(e.parent) : null, jr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Ar(e.parent),
	$root: (e) => Ar(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Br(e),
	$forceUpdate: (e) => e.f ||= () => {
		Sn(e.update);
	},
	$nextTick: (e) => e.n ||= bn.bind(e.proxy),
	$watch: (e) => Vn.bind(e)
}), Mr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Nr = {
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
			else if (Mr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Fr && (s[n] = 0);
		}
		let d = jr[n], f, p;
		if (d) return n === "$attrs" && P(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Mr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Mr(n, c) || u(o, c) || u(i, c) || u(jr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Pr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Fr = !0;
function Ir(e) {
	let t = Br(e), n = e.proxy, i = e.ctx;
	Fr = !1, t.beforeCreate && Rr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: ee, renderTriggered: te, errorCaptured: E, serverPrefetch: ne, expose: D, inheritAttrs: re, components: ie, directives: O, filters: ae } = t;
	if (u && Lr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ It(t));
	}
	if (Fr = !0, o) for (let e in o) {
		let t = o[e], a = $({
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
	if (c) for (let e in c) zr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Pn(t, e[t]);
		});
	}
	f && Rr(f, e, "c");
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
function Lr(e, t, n = r) {
	d(e) && (e = Gr(e));
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
function Rr(e, t, n) {
	dn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function zr(e, t, n, r) {
	let i = r.includes(".") ? Hn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && zn(i, n);
	} else if (h(e)) zn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => zr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && zn(i, r, e);
	}
}
function Br(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Vr(c, e, o, !0)), Vr(c, t, o)), v(t) && a.set(t, c), c;
}
function Vr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Vr(e, a, n, !0), i && i.forEach((t) => Vr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Hr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Hr = {
	data: Ur,
	props: qr,
	emits: qr,
	methods: Kr,
	computed: Kr,
	beforeCreate: U,
	created: U,
	beforeMount: U,
	mounted: U,
	beforeUpdate: U,
	updated: U,
	beforeDestroy: U,
	beforeUnmount: U,
	destroyed: U,
	unmounted: U,
	activated: U,
	deactivated: U,
	errorCaptured: U,
	serverPrefetch: U,
	components: Kr,
	directives: Kr,
	watch: Jr,
	provide: Ur,
	inject: Wr
};
function Ur(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Wr(e, t) {
	return Kr(Gr(e), Gr(t));
}
function Gr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function U(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Kr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function qr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Pr(e), Pr(t ?? {})) : t;
}
function Jr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = U(e[r], t[r]);
	return n;
}
function Yr() {
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
var Xr = 0;
function Zr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Yr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Xr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: ka,
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
					let u = l._ceVNode || X(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Da(u.component);
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
				let t = Qr;
				Qr = l;
				try {
					return e();
				} finally {
					Qr = t;
				}
			}
		};
		return l;
	};
}
var Qr = null, $r = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${E(t)}Modifiers`] || e[`${D(t)}Modifiers`];
function ei(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && $r(i, n.slice(7));
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
var ti = /* @__PURE__ */ new WeakMap();
function ni(e, t, n = !1) {
	let r = n ? ti : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = ni(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function ri(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, D(t)) || u(e, t));
}
function ii(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = An(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = ia(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = ia(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : ai(c);
		}
	} catch (t) {
		Wi.length = 0, fn(t, e, 1), v = X(Hi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = oi(y, a)), b = na(b, y, !1, !0));
	}
	return n.dirs && (b = na(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ir(b, n.transition), v = b, An(_), v;
}
var ai = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, oi = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function si(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? ci(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (li(o, r, n) && !ri(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? ci(r, o, l) : !0 : !!o;
	return !1;
}
function ci(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (li(t, e, a) && !ri(n, a)) return !0;
	}
	return !1;
}
function li(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !ve(r, i) : r !== i;
}
function ui({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var di = {}, fi = () => Object.create(di), pi = (e) => Object.getPrototypeOf(e) === di;
function mi(e, t, n, r = !1) {
	let i = {}, a = fi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), gi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Lt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function hi(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ I(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ri(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = E(o);
					i[t] = _i(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		gi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = D(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = _i(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && et(e.attrs, "set", "");
}
function gi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = E(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : ri(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ I(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = _i(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function _i(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ha(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === D(n)) && (r = !0));
	}
	return r;
}
var vi = /* @__PURE__ */ new WeakMap();
function yi(e, r, i = !1) {
	let a = i ? vi : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = yi(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = E(c[e]);
		bi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = E(e);
		if (bi(t)) {
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
function bi(e) {
	return e[0] !== "$" && !T(e);
}
var xi = (e) => e === "_" || e === "_ctx" || e === "$stable", Si = (e) => d(e) ? e.map(ia) : [ia(e)], Ci = (e, t, n) => {
	if (t._n) return t;
	let r = jn((...e) => Si(t(...e)), n);
	return r._c = !1, r;
}, wi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (xi(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = Ci(n, i, r);
		else if (i != null) {
			let e = Si(i);
			t[n] = () => e;
		}
	}
}, Ti = (e, t) => {
	let n = Si(t);
	e.slots.default = () => n;
}, Ei = (e, t, n) => {
	for (let r in t) (n || !xi(r)) && (e[r] = t[r]);
}, Di = (e, t, n) => {
	let r = e.slots = fi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ei(r, t, n), n && k(r, "_", e, !0)) : wi(t, r);
	} else t && Ti(e, t);
}, Oi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Ei(a, n, r) : (o = !n.$stable, wi(n, a)), s = n;
	} else n && (Ti(e, n), s = { default: 1 });
	if (o) for (let e in a) !xi(e) && s[e] == null && delete a[e];
}, W = Bi;
function ki(e) {
	return Ai(e);
}
function Ai(e, i) {
	let a = ce();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Zi(e, t) && (r = ve(e), A(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Vi:
				y(e, t, n, r);
				break;
			case Hi:
				b(e, t, n, r);
				break;
			case Ui:
				e ?? x(t, n, r, o);
				break;
			case G:
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
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && E(e.children, d, null, r, i, ji(e, a), s, u), _ && Nn(e, null, r, "created"), te(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ca(f, r, e);
		}
		_ && Nn(e, null, r, "beforeMount");
		let v = Ni(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && W(() => {
			try {
				f && ca(f, r, e), v && g.enter(d), _ && Nn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, te = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || zi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				te(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? aa(e[l]) : ia(e[l]), t, n, r, i, a, o, s);
	}, ne = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Mi(r, !1), (g = h.onVnodeBeforeUpdate) && ca(g, r, n, e), f && Nn(n, e, r, "beforeUpdate"), r && Mi(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? D(e.dynamicChildren, d, l, r, i, ji(n, a), o) : s || ue(e, n, l, null, r, i, ji(n, a), o, !1), u > 0) {
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
		((g = h.onVnodeUpdated) || f) && W(() => {
			g && ca(g, r, n, e), f && Nn(n, e, r, "updated");
		}, i);
	}, D = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === G || !Zi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
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
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), E(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (D(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Pi(e, t, !0)) : ue(e, t, n, f, i, a, s, c, l);
	}, O = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : k(t, n, r, i, a, o, c) : oe(e, t, c);
	}, k = (e, t, n, r, i, a, o) => {
		let s = e.component = da(e, r, i);
		if (fr(e) && (s.ctx.renderer = j), ya(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, se, o), !e.el) {
				let r = s.subTree = X(Hi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else se(s, e, t, n, i, a, o);
	}, oe = (e, t, n) => {
		let r = t.component = e.component;
		if (si(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			le(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, se = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Ii(e);
					if (n) {
						t && (t.el = c.el, le(e, t, o)), n.asyncDep.then(() => {
							W(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Mi(e, !1), t ? (t.el = c.el, le(e, t, o)) : t = c, n && ae(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ca(d, s, t, c), Mi(e, !0);
				let f = ii(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ve(p), e, i, a), t.el = f.el, u === null && ui(e, f.el), r && W(r, i), (d = t.props && t.props.onVnodeUpdated) && W(() => ca(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = dr(t);
				if (Mi(e, !1), l && ae(l), !m && (o = c && c.onVnodeBeforeMount) && ca(o, d, t), Mi(e, !0), s && Se) {
					let t = () => {
						e.subTree = ii(e), Se(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ii(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && W(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					W(() => ca(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && dr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && W(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Oe(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Sn(u), Mi(e, !0), l();
	}, le = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, hi(e, t.props, r, n), Oi(e, t.children, n), Ue(), Tn(e), We();
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
			let n = t[p] = l ? aa(t[p]) : ia(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? _e(e, a, o, !0, !1, f) : E(t, r, i, a, o, s, c, l, f);
	}, fe = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? aa(t[u]) : ia(t[u]);
			if (Zi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? aa(t[p]) : ia(t[p]);
			if (Zi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? aa(t[u]) : ia(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) A(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? aa(t[u]) : ia(t[u]);
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
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Zi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? A(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Fi(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Ri(f) : i;
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
		if (c === G) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) pe(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Ui) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), W(() => l.enter(a), i);
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
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ca(_, t, e), u & 6) ge(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Nn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, j, r) : l && !l.hasOnce && (a !== G || d > 0 && d & 64) ? _e(l, t, n, !1, !0) : (a === G && d & 384 || !i && u & 16) && _e(c, t, n), r && me(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && W(() => {
			_ && ca(_, t, e), h && Nn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, me = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === G) {
			he(n, r);
			return;
		}
		if (t === Ui) {
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
		Li(c), Li(l), r && ae(r), i.stop(), a && (a.flags |= 8, A(o, e, t, n)), s && W(s, t), W(() => {
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
		createApp: Zr(be, xe)
	};
}
function ji({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Mi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ni(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Pi(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = aa(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Pi(t, a)), a.type === Vi && (a.patchFlag === -1 && (a = i[e] = aa(a)), a.el = t.el), a.type === Hi && !a.el && (a.el = t.el);
	}
}
function Fi(e) {
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
function Ii(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Ii(t);
}
function Li(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ri(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Ri(t.subTree) : null;
}
var zi = (e) => e.__isSuspense;
function Bi(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : wn(e);
}
var G = /* @__PURE__ */ Symbol.for("v-fgt"), Vi = /* @__PURE__ */ Symbol.for("v-txt"), Hi = /* @__PURE__ */ Symbol.for("v-cmt"), Ui = /* @__PURE__ */ Symbol.for("v-stc"), Wi = [], K = null;
function q(e = !1) {
	Wi.push(K = e ? null : []);
}
function Gi() {
	Wi.pop(), K = Wi[Wi.length - 1] || null;
}
var Ki = 1;
function qi(e, t = !1) {
	Ki += e, e < 0 && K && t && (K.hasOnce = !0);
}
function Ji(e) {
	return e.dynamicChildren = Ki > 0 ? K || n : null, Gi(), Ki > 0 && K && K.push(e), e;
}
function J(e, t, n, r, i, a) {
	return Ji(Y(e, t, n, r, i, a, !0));
}
function Yi(e, t, n, r, i) {
	return Ji(X(e, t, n, r, i, !0));
}
function Xi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Zi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Qi = ({ key: e }) => e ?? null, $i = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ L(e) || h(e) ? {
	i: V,
	r: e,
	k: t,
	f: !!n
} : e);
function Y(e, t = null, n = null, r = 0, i = null, a = e === G ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Qi(t),
		ref: t && $i(t),
		scopeId: kn,
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
		ctx: V
	};
	return s ? (oa(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Ki > 0 && !o && K && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && K.push(c), c;
}
var X = ea;
function ea(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === kr) && (e = Hi), Xi(e)) {
		let r = na(e, t, !0);
		return n && oa(r, n), Ki > 0 && !a && K && (r.shapeFlag & 6 ? K[K.indexOf(e)] = r : K.push(r)), r.patchFlag = -2, r;
	}
	if (Oa(e) && (e = e.__vccOpts), t) {
		t = ta(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = A(e)), v(n) && (/* @__PURE__ */ Ht(n) && !d(n) && (n = s({}, n)), t.style = le(n));
	}
	let o = g(e) ? 1 : zi(e) ? 128 : Gn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return Y(e, t, n, r, i, o, a, !0);
}
function ta(e) {
	return e ? /* @__PURE__ */ Ht(e) || pi(e) ? s({}, e) : e : null;
}
function na(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? sa(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Qi(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat($i(t)) : [a, $i(t)] : $i(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && na(e.ssContent),
		ssFallback: e.ssFallback && na(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ir(u, c.clone(u)), u;
}
function ra(e = " ", t = 0) {
	return X(Vi, null, e, t);
}
function Z(e = "", t = !1) {
	return t ? (q(), Yi(Hi, null, e)) : X(Hi, null, e);
}
function ia(e) {
	return e == null || typeof e == "boolean" ? X(Hi) : d(e) ? X(G, null, e.slice()) : Xi(e) ? aa(e) : X(Vi, null, String(e));
}
function aa(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : na(e);
}
function oa(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), oa(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !pi(t) ? t._ctx = V : r === 3 && V && (V.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: V
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ra(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function sa(...e) {
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
function ca(e, t, n, r = null) {
	dn(e, t, 7, [n, r]);
}
var la = Yr(), ua = 0;
function da(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || la, o = {
		uid: ua++,
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
		propsOptions: yi(i, a),
		emitsOptions: ni(i, a),
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = ei.bind(null, o), e.ce && e.ce(o), o;
}
var Q = null, fa = () => Q || V, pa, ma;
{
	let e = ce(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	pa = t("__VUE_INSTANCE_SETTERS__", (e) => Q = e), ma = t("__VUE_SSR_SETTERS__", (e) => va = e);
}
var ha = (e) => {
	let t = Q;
	return pa(e), e.scope.on(), () => {
		e.scope.off(), pa(t);
	};
}, ga = () => {
	Q && Q.scope.off(), pa(null);
};
function _a(e) {
	return e.vnode.shapeFlag & 4;
}
var va = !1;
function ya(e, t = !1, n = !1) {
	t && ma(t);
	let { props: r, children: i } = e.vnode, a = _a(e);
	mi(e, r, a, t), Di(e, i, n || t);
	let o = a ? ba(e, t) : void 0;
	return t && ma(!1), o;
}
function ba(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Nr);
	let { setup: r } = n;
	if (r) {
		Ue();
		let n = e.setupContext = r.length > 1 ? Ea(e) : null, i = ha(e), a = un(r, e, 0, [e.props, n]), o = y(a);
		if (We(), i(), (o || e.sp) && !dr(e) && or(e), o) {
			if (a.then(ga, ga), t) return a.then((n) => {
				xa(e, n, t);
			}).catch((t) => {
				fn(t, e, 0);
			});
			e.asyncDep = a;
		} else xa(e, a, t);
	} else wa(e, t);
}
function xa(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Yt(t)), wa(e, n);
}
var Sa, Ca;
function wa(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && Sa && !i.render) {
			let t = i.template || Br(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = Sa(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, Ca && Ca(e);
	}
	{
		let t = ha(e);
		Ue();
		try {
			Ir(e);
		} finally {
			We(), t();
		}
	}
}
var Ta = { get(e, t) {
	return P(e, "get", ""), e[t];
} };
function Ea(e) {
	return {
		attrs: new Proxy(e.attrs, Ta),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Da(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Yt(Ut(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in jr) return jr[n](e);
		},
		has(e, t) {
			return t in e || t in jr;
		}
	}) : e.proxy;
}
function Oa(e) {
	return h(e) && "__vccOpts" in e;
}
var $ = (e, t) => /* @__PURE__ */ nn(e, t, va), ka = "3.5.32", Aa = void 0, ja = typeof window < "u" && window.trustedTypes;
if (ja) try {
	Aa = /* @__PURE__ */ ja.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ma = Aa ? (e) => Aa.createHTML(e) : (e) => e, Na = "http://www.w3.org/2000/svg", Pa = "http://www.w3.org/1998/Math/MathML", Fa = typeof document < "u" ? document : null, Ia = Fa && /* @__PURE__ */ Fa.createElement("template"), La = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Fa.createElementNS(Na, e) : t === "mathml" ? Fa.createElementNS(Pa, e) : n ? Fa.createElement(e, { is: n }) : Fa.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Fa.createTextNode(e),
	createComment: (e) => Fa.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Fa.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Ia.innerHTML = Ma(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ia.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ra = /* @__PURE__ */ Symbol("_vtc");
function za(e, t, n) {
	let r = e[Ra];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Ba = /* @__PURE__ */ Symbol("_vod"), Va = /* @__PURE__ */ Symbol("_vsh"), Ha = /* @__PURE__ */ Symbol(""), Ua = /(?:^|;)\s*display\s*:/;
function Wa(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Ka(r, t, "");
		}
		else for (let e in t) n[e] ?? Ka(r, e, "");
		for (let e in n) e === "display" && (a = !0), Ka(r, e, n[e]);
	} else if (i) {
		if (t !== n) {
			let e = r[Ha];
			e && (n += ";" + e), r.cssText = n, a = Ua.test(n);
		}
	} else t && e.removeAttribute("style");
	Ba in e && (e[Ba] = a ? r.display : "", e[Va] && (r.display = "none"));
}
var Ga = /\s*!important$/;
function Ka(e, t, n) {
	if (d(n)) n.forEach((n) => Ka(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = Ya(e, t);
		Ga.test(n) ? e.setProperty(D(r), n.replace(Ga, ""), "important") : e[r] = n;
	}
}
var qa = [
	"Webkit",
	"Moz",
	"ms"
], Ja = {};
function Ya(e, t) {
	let n = Ja[t];
	if (n) return n;
	let r = E(t);
	if (r !== "filter" && r in e) return Ja[t] = r;
	r = re(r);
	for (let n = 0; n < qa.length; n++) {
		let i = qa[n] + r;
		if (i in e) return Ja[t] = i;
	}
	return t;
}
var Xa = "http://www.w3.org/1999/xlink";
function Za(e, t, n, r, i, a = he(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Xa, t.slice(6, t.length)) : e.setAttributeNS(Xa, t, n) : n == null || a && !ge(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function Qa(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ma(n) : n);
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
function $a(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function eo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var to = /* @__PURE__ */ Symbol("_vei");
function no(e, t, n, r, i = null) {
	let a = e[to] || (e[to] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = io(t);
		r ? $a(e, n, a[t] = co(r, i), s) : o && (eo(e, n, o, s), a[t] = void 0);
	}
}
var ro = /(?:Once|Passive|Capture)$/;
function io(e) {
	let t;
	if (ro.test(e)) {
		t = {};
		let n;
		for (; n = e.match(ro);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : D(e.slice(2)), t];
}
var ao = 0, oo = /* @__PURE__ */ Promise.resolve(), so = () => ao ||= (oo.then(() => ao = 0), Date.now());
function co(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		dn(lo(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = so(), n;
}
function lo(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var uo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, fo = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? za(e, r, c) : t === "style" ? Wa(e, n, r) : a(t) ? o(t) || no(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : po(e, t, r, c)) ? (Qa(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Za(e, t, r, c, s, t !== "value")) : e._isVueCE && (mo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? Qa(e, E(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Za(e, t, r, c));
};
function po(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && uo(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return uo(t) && g(n) ? !1 : t in e;
}
function mo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = E(t);
	return Array.isArray(n) ? n.some((e) => E(e) === r) : Object.keys(n).some((e) => E(e) === r);
}
var ho = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ae(t, e) : t;
};
function go(e) {
	e.target.composing = !0;
}
function _o(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var vo = /* @__PURE__ */ Symbol("_assign");
function yo(e, t, n) {
	return t && (e = e.trim()), n && (e = oe(e)), e;
}
var bo = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[vo] = ho(i);
		let a = r || i.props && i.props.type === "number";
		$a(e, t ? "change" : "input", (t) => {
			t.target.composing || e[vo](yo(e.value, n, a));
		}), (n || a) && $a(e, "change", () => {
			e.value = yo(e.value, n, a);
		}), t || ($a(e, "compositionstart", go), $a(e, "compositionend", _o), $a(e, "change", _o));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[vo] = ho(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? oe(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, xo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		$a(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? oe(Co(e)) : Co(e));
			e[vo](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, bn(() => {
				e._assigning = !1;
			});
		}), e[vo] = ho(r);
	},
	mounted(e, { value: t }) {
		So(e, t);
	},
	beforeUpdate(e, t, n) {
		e[vo] = ho(n);
	},
	updated(e, { value: t }) {
		e._assigning || So(e, t);
	}
};
function So(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Co(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = ye(t, o) > -1;
			} else a.selected = t.has(o);
			else if (ve(Co(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Co(e) {
	return "_value" in e ? e._value : e.value;
}
var wo = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], To = {
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
	exact: (e, t) => wo.some((n) => e[`${n}Key`] && !t.includes(n))
}, Eo = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = To[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Do = /* @__PURE__ */ s({ patchProp: fo }, La), Oo;
function ko() {
	return Oo ||= ki(Do);
}
var Ao = ((...e) => {
	let t = ko().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Mo(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, jo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function jo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Mo(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var No = typeof window < "u", Po, Fo = (e) => Po = e, Io = Symbol();
function Lo(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ro;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ro ||= {});
var zo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Bo(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function Vo(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		Ko(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Ho(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function Uo(e) {
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
var Wo = typeof navigator == "object" ? navigator : { userAgent: "" }, Go = /Macintosh/.test(Wo.userAgent) && /AppleWebKit/.test(Wo.userAgent) && !/Safari/.test(Wo.userAgent), Ko = No ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Go ? qo : "msSaveOrOpenBlob" in Wo ? Jo : Yo : () => {};
function qo(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? Uo(r) : Ho(r.href) ? Vo(e, t, n) : (r.target = "_blank", Uo(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		Uo(r);
	}, 0));
}
function Jo(e, t = "download", n) {
	if (typeof e == "string") if (Ho(e)) Vo(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			Uo(t);
		});
	}
	else navigator.msSaveOrOpenBlob(Bo(e, n), t);
}
function Yo(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return Vo(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(zo.HTMLElement)) || "safari" in zo, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || Go) && typeof FileReader < "u") {
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
var { assign: Xo } = Object;
function Zo() {
	let e = we(!0), t = e.run(() => /* @__PURE__ */ R({})), n = [], r = [], i = Ut({
		install(e) {
			Fo(i), i._a = e, e.provide(Io, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
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
var Qo = () => {};
function $o(e, t, n, r = Qo) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && Te() && Ee(i), i;
}
function es(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var ts = (e) => e(), ns = Symbol(), rs = Symbol();
function is(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		Lo(i) && Lo(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ L(r) && !/* @__PURE__ */ Bt(r) ? e[n] = is(i, r) : e[n] = r;
	}
	return e;
}
var as = Symbol();
function os(e) {
	return !Lo(e) || !Object.prototype.hasOwnProperty.call(e, as);
}
var { assign: ss } = Object;
function cs(e) {
	return !!(/* @__PURE__ */ L(e) && e.effect);
}
function ls(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), ss(/* @__PURE__ */ Xt(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Ut($(() => {
			Fo(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = us(e, l, t, n, r, !0), c;
}
function us(e, t, n = {}, r, i, a) {
	let o, s = ss({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: Ro.patchFunction,
			storeId: e,
			events: void 0
		}) : (is(r.state.value[e], t), n = {
			type: Ro.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		bn().then(() => {
			m === i && (l = !0);
		}), u = !0, es(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			ss(e, t);
		});
	} : Qo;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (ns in t) return t[rs] = n, t;
		let i = function() {
			Fo(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			es(f, {
				args: n,
				name: i[rs],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw es(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (es(a, e), e)).catch((e) => (es(o, e), Promise.reject(e))) : (es(a, l), l);
		};
		return i[ns] = !0, i[rs] = n, i;
	}, y = /* @__PURE__ */ It({
		_p: r,
		$id: e,
		$onAction: $o.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = $o(d, t, n.detached, () => a()), a = o.run(() => zn(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: Ro.direct,
					events: void 0
				}, r);
			}, ss({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let b = (r._a && r._a.runWithContext || ts)(() => r._e.run(() => (o = we()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ L(n) && !cs(n) || /* @__PURE__ */ Bt(n) ? a || (p && os(n) && (/* @__PURE__ */ L(n) ? n.value = p[t] : is(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return ss(y, b), ss(/* @__PURE__ */ I(y), b), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				ss(t, e);
			});
		}
	}), r._p.forEach((e) => {
		ss(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function ds(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = In();
		return n ||= o ? Fn(Io, null) : null, n && Fo(n), n = Po, n._s.has(e) || (i ? us(e, t, r, n) : ls(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
function fs(e) {
	let t = /* @__PURE__ */ I(e), n = {};
	for (let r in t) {
		let i = t[r];
		i.effect ? n[r] = $({
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
var ps = "at_assetthingie_url", ms = "http://127.0.0.1:8188", hs = 15e3;
function gs() {
	if (typeof localStorage > "u") return ms;
	let e = localStorage.getItem("at_assetthingie_url") || "http://127.0.0.1:8188";
	return String(e).replace(/\/$/, "");
}
function _s() {
	return "/at";
}
function vs() {
	return typeof window < "u" && window.location?.origin && window.location.protocol !== "file:" ? window.location.origin.replace(/\/$/, "") : gs();
}
function ys(e) {
	localStorage.setItem(ps, e.replace(/\/$/, ""));
}
async function bs(e, t) {
	let n = `${vs()}${e}`;
	if (t?.params) {
		let e = new URLSearchParams();
		for (let [n, r] of Object.entries(t.params)) r === void 0 || r === "" || e.set(n, String(r));
		let r = e.toString();
		r && (n += `?${r}`);
	}
	let r = { ...t ?? {} };
	delete r.params;
	let i = new AbortController(), a = setTimeout(() => i.abort(), hs), o;
	try {
		o = await fetch(n, {
			...r,
			signal: i.signal,
			headers: {
				Accept: "application/json",
				...r.headers
			}
		});
	} finally {
		clearTimeout(a);
	}
	let s = await o.text();
	if (!o.ok) throw Error(`HTTP ${o.status}: ${s.slice(0, 240)}`);
	try {
		return JSON.parse(s);
	} catch {
		throw Error("Invalid JSON from AssetThingie");
	}
}
async function xs() {
	return bs(`${_s()}/health`);
}
async function Ss(e = "Checkpoint", t, n) {
	let r = new URLSearchParams();
	if (e && r.set("content_type", e), t && r.set("family", t), n?.length) for (let e of n) {
		let t = e.trim();
		t && r.append("tag", t);
	}
	let i = vs(), a = r.toString(), o = `${i}${_s()}/filters${a ? `?${a}` : ""}`, s = new AbortController(), c = setTimeout(() => s.abort(), hs);
	try {
		let e = await fetch(o, {
			signal: s.signal,
			headers: { Accept: "application/json" }
		}), t = await e.text();
		if (!e.ok) throw Error(`HTTP ${e.status}: ${t.slice(0, 240)}`);
		return JSON.parse(t);
	} finally {
		clearTimeout(c);
	}
}
async function Cs(e, t = "checkpoint") {
	let n = { family: t };
	return e && (n.parent = e), bs(`${_s()}/subfolders`, { params: n });
}
async function ws(e) {
	let t = {
		q: e.q,
		content_type: e.content_type,
		base_model: e.base_model,
		category: e.category,
		path_prefix: e.path_prefix,
		sort: e.sort,
		limit: e.limit,
		offset: e.offset,
		family: e.family
	}, n = new URLSearchParams();
	for (let [e, r] of Object.entries(t)) r === void 0 || r === "" || n.set(e, String(r));
	if (e.tag?.length) for (let t of e.tag) t && n.append("tag", t);
	let r = `${vs()}${_s()}/assets?${n.toString()}`, i = new AbortController(), a = setTimeout(() => i.abort(), hs);
	try {
		let e = await fetch(r, {
			signal: i.signal,
			headers: { Accept: "application/json" }
		}), t = await e.text();
		if (!e.ok) throw Error(`HTTP ${e.status}: ${t.slice(0, 240)}`);
		return JSON.parse(t);
	} finally {
		clearTimeout(a);
	}
}
function Ts(e) {
	return e ? e.startsWith("http://") || e.startsWith("https://") ? e : `${vs()}${e.startsWith("/") ? "" : "/"}${e}` : null;
}
async function Es(e) {
	return bs(`${_s()}/assets/${e}`);
}
async function Ds() {
	return bs(`${_s()}/library/clean-preview`);
}
async function Os() {
	return bs(`${_s()}/library/clean`, { method: "POST" });
}
async function ks(e) {
	return bs(`${_s()}/assets/${e}/re-enrich`, { method: "POST" });
}
async function As(e) {
	return bs(`${_s()}/assets/batch/re-enrich`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ asset_ids: e })
	});
}
//#endregion
//#region src/stores/assets.ts
var js = "at_checkpoints_view_mode", Ms = "at_checkpoints_grid_columns", Ns = 2, Ps = 1, Fs = 20, Is = 40;
function Ls(e) {
	return Number.isFinite(e) ? Math.min(Fs, Math.max(Ps, Math.round(e))) : Ns;
}
var Rs = ds("at-checkpoints-assets", () => {
	let e = /* @__PURE__ */ R(!1), t = /* @__PURE__ */ R([]), n = /* @__PURE__ */ R(0), r = /* @__PURE__ */ R(0), i = /* @__PURE__ */ R(Is), a = /* @__PURE__ */ R(!1), o = /* @__PURE__ */ R(!1), s = /* @__PURE__ */ R(null), c = /* @__PURE__ */ R(""), l = /* @__PURE__ */ R(""), u = null;
	zn(c, (e) => {
		u && clearTimeout(u), u = setTimeout(() => {
			l.value = e, u = null, j(!0);
		}, 300);
	});
	let d = /* @__PURE__ */ R(""), f = /* @__PURE__ */ R(null), p = /* @__PURE__ */ R(""), m = /* @__PURE__ */ R(""), h = /* @__PURE__ */ R(""), g = /* @__PURE__ */ R([]), _ = /* @__PURE__ */ R([]), v = /* @__PURE__ */ R(""), y = /* @__PURE__ */ R(""), b = /* @__PURE__ */ R(""), x = /* @__PURE__ */ R("grid"), S = /* @__PURE__ */ R(Ns), C = /* @__PURE__ */ R(!1), w = /* @__PURE__ */ R(gs()), T = /* @__PURE__ */ R(null), ee = /* @__PURE__ */ R(null), te = /* @__PURE__ */ R(null), E = /* @__PURE__ */ R(!1), ne = /* @__PURE__ */ R(!1), D = /* @__PURE__ */ R(/* @__PURE__ */ new Set());
	try {
		let e = localStorage.getItem(js);
		(e === "list" || e === "grid") && (x.value = e);
		let t = localStorage.getItem(Ms);
		t != null && (S.value = Ls(parseInt(t, 10)));
	} catch {}
	let re = $(() => t.value.length < n.value), ie = $(() => D.value.size);
	function O(e) {
		return D.value.has(e);
	}
	function ae(e) {
		let t = new Set(D.value);
		t.has(e) ? t.delete(e) : t.add(e), D.value = t;
	}
	function k() {
		D.value = /* @__PURE__ */ new Set();
	}
	function oe() {
		ne.value = !ne.value, ne.value || k();
	}
	function se() {
		let e = new Set(D.value);
		for (let n of t.value) e.add(n.asset_id);
		D.value = e;
	}
	async function ce() {
		let e = [...D.value];
		if (!e.length) {
			we("No assets selected");
			return;
		}
		try {
			let t = await As(e);
			we(`Re-enrich: ${t.processed} ok${t.failed ? `, ${t.failed} failed` : ""}`), k(), ne.value = !1, await j(!0);
		} catch (e) {
			we(e instanceof Error ? e.message : "Batch re-enrich failed");
		}
	}
	async function le() {
		try {
			e.value = !!(await xs()).ok, s.value = null;
		} catch (t) {
			e.value = !1, s.value = t instanceof Error ? t.message : "Connection failed";
		}
	}
	async function ue() {
		try {
			f.value = await Ss("Checkpoint", void 0, _.value.length > 0 ? [..._.value] : void 0);
		} catch {
			f.value = null;
		}
	}
	async function de() {
		if (e.value) try {
			let e = await Cs(p.value || void 0, "checkpoint");
			g.value = e.folders, m.value = e.parent_path, h.value ||= e.parent_path;
		} catch {
			g.value = [];
		}
	}
	function fe(e) {
		y.value = y.value === e ? "" : e, y.value === "folder" ? de() : y.value === "tag" && ue();
	}
	function pe(e) {
		p.value = `${m.value.replace(/\/$/, "")}/${e}`, de(), j(!0);
	}
	function A(e) {
		p.value = e, de(), j(!0);
	}
	function me() {
		p.value = "", de(), j(!0);
	}
	function he(e) {
		let t = e.trim();
		if (!t) return;
		let n = _.value, r = n.indexOf(t);
		r >= 0 ? _.value = n.filter((e, t) => t !== r) : _.value = [...n, t], j(!0), ue();
	}
	function ge() {
		_.value = [], b.value = "", j(!0), ue();
	}
	function _e(e) {
		let t = e.trim();
		v.value === t ? v.value = "" : v.value = t, j(!0);
	}
	function ve() {
		v.value = "", j(!0);
	}
	function ye() {
		let e = l.value.trim();
		if (!e) return;
		let t = /^(name|trigger|category|tag):$/i;
		return e.split(",").some((e) => {
			let n = e.trim();
			return n !== "" && !t.test(n);
		}) ? e : void 0;
	}
	function be() {
		let e = _.value.length > 0 ? [..._.value] : void 0;
		return {
			q: ye(),
			content_type: "Checkpoint",
			base_model: d.value.trim() || void 0,
			category: v.value.trim() || void 0,
			path_prefix: p.value.trim() || void 0,
			tag: e,
			sort: "path",
			limit: i.value
		};
	}
	async function j(i) {
		if (!(!e.value && i && (await le(), !e.value)) && (i && (r.value = 0, t.value = []), !(a.value || o.value))) {
			a.value = !0, s.value = null;
			try {
				let e = await ws({
					...be(),
					offset: r.value
				});
				n.value = e.total, i ? t.value = e.items : t.value = [...t.value, ...e.items];
			} catch (e) {
				s.value = e instanceof Error ? e.message : "Load failed", i && (t.value = []);
			} finally {
				a.value = !1;
			}
		}
	}
	async function xe() {
		if (!(!re.value || a.value || o.value)) {
			o.value = !0, r.value = t.value.length;
			try {
				let e = await ws({
					...be(),
					offset: r.value
				});
				n.value = e.total, t.value = [...t.value, ...e.items];
			} catch (e) {
				s.value = e instanceof Error ? e.message : "Load failed";
			} finally {
				o.value = !1;
			}
		}
	}
	function Se() {
		c.value = "", l.value = "", u &&= (clearTimeout(u), null), d.value = "", p.value = "", m.value = "", h.value = "", g.value = [], _.value = [], v.value = "", y.value = "", b.value = "", j(!0), e.value && (de(), ue());
	}
	function M(e) {
		x.value = e;
		try {
			localStorage.setItem(js, e);
		} catch {}
	}
	function Ce(e) {
		let t = Ls(e);
		S.value = t;
		try {
			localStorage.setItem(Ms, String(t));
		} catch {}
	}
	function we(e) {
		T.value = e, setTimeout(() => {
			T.value = null;
		}, 2e3);
	}
	function Te() {
		ys(w.value), Oe();
	}
	function Ee(e) {
		ee.value = e, te.value = null, De();
	}
	function N() {
		ee.value = null, te.value = null;
	}
	async function De() {
		let e = ee.value;
		if (e != null) {
			E.value = !0;
			try {
				te.value = await Es(e);
			} catch (e) {
				we(e instanceof Error ? e.message : "Detail load failed"), te.value = null;
			} finally {
				E.value = !1;
			}
		}
	}
	async function Oe() {
		w.value = gs(), await le(), e.value && (await ue(), await de(), await j(!0));
	}
	return {
		connected: e,
		items: t,
		total: n,
		offset: r,
		limit: i,
		loading: a,
		loadingMore: o,
		error: s,
		searchQuery: c,
		baseModel: d,
		filterOptions: f,
		folderPath: p,
		browseParentPath: m,
		libraryRootPath: h,
		subfolders: g,
		selectedTags: _,
		selectedCategory: v,
		openFilterSection: y,
		tagFilterText: b,
		viewMode: x,
		gridColumnCount: S,
		settingsOpen: C,
		baseUrlInput: w,
		toast: T,
		hasMore: re,
		selectedAssetId: ee,
		detail: te,
		detailLoading: E,
		selectionMode: ne,
		selectedIds: D,
		selectedCount: ie,
		isAssetSelected: O,
		toggleAssetSelect: ae,
		clearAssetSelection: k,
		toggleSelectionMode: oe,
		selectAllVisibleAssets: se,
		batchReEnrichSelected: ce,
		checkHealth: le,
		loadFilters: ue,
		loadSubfolders: de,
		toggleFilterSection: fe,
		drillFolder: pe,
		navigateFolderToAbsolute: A,
		resetFolderPath: me,
		toggleTag: he,
		resetSelectedTags: ge,
		setCategory: _e,
		resetCategory: ve,
		loadAssets: j,
		loadMore: xe,
		resetFilters: Se,
		setViewMode: M,
		setGridColumnCount: Ce,
		showToast: we,
		saveSettingsUrl: Te,
		bootstrap: Oe,
		openDetail: Ee,
		closeDetail: N,
		loadDetail: De
	};
}), zs = { class: "at-filters" }, Bs = { class: "at-filters__row" }, Vs = { class: "at-filters__field" }, Hs = ["value"], Us = {
	class: "at-filter-modes",
	role: "tablist",
	"aria-label": "Filter by folder, tag, or category"
}, Ws = ["aria-pressed"], Gs = {
	key: 0,
	class: "at-mode-btn__dot",
	"aria-hidden": "true"
}, Ks = ["aria-pressed"], qs = {
	key: 0,
	class: "at-mode-btn__dot",
	"aria-hidden": "true"
}, Js = ["aria-pressed"], Ys = {
	key: 0,
	class: "at-mode-btn__dot",
	"aria-hidden": "true"
}, Xs = {
	key: 0,
	class: "at-filter-section"
}, Zs = { class: "at-folder-nav" }, Qs = { class: "at-breadcrumb" }, $s = {
	key: 0,
	class: "at-breadcrumb__sep"
}, ec = ["onClick"], tc = {
	key: 0,
	class: "at-folder-chips"
}, nc = ["onClick"], rc = {
	key: 1,
	class: "at-folder-empty"
}, ic = {
	key: 1,
	class: "at-filter-section"
}, ac = { class: "at-tag-panel" }, oc = { class: "at-tag-panel__top" }, sc = { class: "at-tag-chips" }, cc = ["onClick"], lc = { class: "at-tag-chip__count" }, uc = {
	key: 2,
	class: "at-filter-section"
}, dc = { class: "at-category-panel" }, fc = {
	key: 0,
	class: "at-category-chips"
}, pc = ["onClick"], mc = {
	key: 1,
	class: "at-folder-empty"
}, hc = /* @__PURE__ */ ar({
	__name: "FilterPanel",
	setup(e) {
		let t = Rs(), { baseModel: n, filterOptions: r, folderPath: i, libraryRootPath: a, subfolders: o, selectedTags: s, selectedCategory: c, openFilterSection: l, tagFilterText: u } = fs(t);
		function d() {
			t.loadAssets(!0);
		}
		let f = $(() => !!i.value), p = $(() => s.value.length > 0), m = $(() => !!c.value), h = $(() => {
			let e = a.value, t = i.value, n = [{
				label: "Library",
				path: ""
			}];
			if (!t || !e || !t.startsWith(e)) return n;
			let r = t.slice(e.length).replace(/^\//, "");
			if (!r) return n;
			let o = r.split("/").filter(Boolean), s = e.replace(/\/$/, "");
			for (let e of o) s = `${s}/${e}`, n.push({
				label: e,
				path: s
			});
			return n;
		}), g = $(() => {
			let e = r.value?.tags ?? [], t = u.value.trim().toLowerCase();
			return t ? e.filter((e) => e.name.toLowerCase().includes(t)) : e;
		});
		function _(e) {
			return s.value.includes(e);
		}
		return (e, i) => (q(), J("div", zs, [
			Y("div", Bs, [Y("label", Vs, [i[8] ||= Y("span", null, "Base model", -1), Mn(Y("select", {
				"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ L(n) ? n.value = e : null,
				class: "at-select",
				onChange: d
			}, [i[7] ||= Y("option", { value: "" }, "Any", -1), (q(!0), J(G, null, H(z(r)?.base_models ?? [], (e) => (q(), J("option", {
				key: e,
				value: e
			}, j(e), 9, Hs))), 128))], 544), [[xo, z(n)]])])]),
			Y("div", Us, [
				Y("button", {
					type: "button",
					class: A(["at-mode-btn", { "at-mode-btn--on": z(l) === "folder" }]),
					title: "Browse folders",
					"aria-pressed": z(l) === "folder",
					onClick: i[1] ||= (e) => z(t).toggleFilterSection("folder")
				}, [i[9] ||= Y("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "📁", -1), f.value ? (q(), J("span", Gs)) : Z("", !0)], 10, Ws),
				Y("button", {
					type: "button",
					class: A(["at-mode-btn", { "at-mode-btn--on": z(l) === "tag" }]),
					title: "Filter by tags",
					"aria-pressed": z(l) === "tag",
					onClick: i[2] ||= (e) => z(t).toggleFilterSection("tag")
				}, [i[10] ||= Y("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "🏷", -1), p.value ? (q(), J("span", qs)) : Z("", !0)], 10, Ks),
				Y("button", {
					type: "button",
					class: A(["at-mode-btn", { "at-mode-btn--on": z(l) === "category" }]),
					title: "Filter by category",
					"aria-pressed": z(l) === "category",
					onClick: i[3] ||= (e) => z(t).toggleFilterSection("category")
				}, [i[11] ||= Y("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "📂", -1), m.value ? (q(), J("span", Ys)) : Z("", !0)], 10, Js)
			]),
			z(l) === "folder" ? (q(), J("div", Xs, [Y("div", Zs, [Y("div", Qs, [(q(!0), J(G, null, H(h.value, (e, n) => (q(), J(G, { key: e.path + n }, [n > 0 ? (q(), J("span", $s, "›")) : Z("", !0), Y("button", {
				type: "button",
				class: "at-breadcrumb__seg",
				onClick: (n) => z(t).navigateFolderToAbsolute(e.path)
			}, j(e.label), 9, ec)], 64))), 128))]), z(o).length ? (q(), J("div", tc, [(q(!0), J(G, null, H(z(o), (e) => (q(), J("button", {
				key: e,
				type: "button",
				class: "at-folder-chip",
				onClick: (n) => z(t).drillFolder(e)
			}, j(e), 9, nc))), 128))])) : (q(), J("p", rc, "No subfolders here"))])])) : z(l) === "tag" ? (q(), J("div", ic, [Y("div", ac, [
				Y("div", oc, [Mn(Y("input", {
					"onUpdate:modelValue": i[4] ||= (e) => /* @__PURE__ */ L(u) ? u.value = e : null,
					type: "search",
					class: "at-tag-search",
					placeholder: "Filter tag list…",
					autocomplete: "off"
				}, null, 512), [[bo, z(u)]]), Y("button", {
					type: "button",
					class: "at-folder-reset",
					onClick: i[5] ||= (e) => z(t).resetSelectedTags()
				}, "Reset")]),
				i[12] ||= Y("p", { class: "at-tag-hint" }, "All selected tags must match (AND).", -1),
				Y("div", sc, [(q(!0), J(G, null, H(g.value, (e) => (q(), J("button", {
					key: e.tag_id,
					type: "button",
					class: A(["at-tag-chip", { "at-tag-chip--selected": _(e.name) }]),
					onClick: (n) => z(t).toggleTag(e.name)
				}, [ra(j(e.name) + " ", 1), Y("span", lc, j(e.count), 1)], 10, cc))), 128))])
			])])) : z(l) === "category" ? (q(), J("div", uc, [Y("div", dc, [Y("button", {
				type: "button",
				class: "at-folder-reset",
				onClick: i[6] ||= (e) => z(t).resetCategory()
			}, "Reset"), (z(r)?.categories ?? []).length ? (q(), J("div", fc, [(q(!0), J(G, null, H(z(r)?.categories ?? [], (e) => (q(), J("button", {
				key: e,
				type: "button",
				class: A(["at-category-chip", { "at-category-chip--selected": z(c) === e }]),
				onClick: (n) => z(t).setCategory(e)
			}, j(e), 11, pc))), 128))])) : (q(), J("p", mc, "No categories in index"))])])) : Z("", !0)
		]));
	}
}), gc = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, _c = /* @__PURE__ */ gc(hc, [["__scopeId", "data-v-01975e22"]]), vc = { class: "at-toolbar" }, yc = {
	key: 0,
	class: "at-toolbar__row at-toolbar__row--select"
}, bc = { class: "at-toolbar__sel-label" }, xc = { class: "at-toolbar__row at-toolbar__row--search" }, Sc = ["aria-pressed"], Cc = ["aria-pressed"], wc = ["aria-pressed"], Tc = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "Toolbar",
	setup(e) {
		let t = Rs();
		return (e, n) => (q(), J("div", vc, [
			z(t).selectionMode ? (q(), J("div", yc, [
				Y("span", bc, j(z(t).selectedCount) + " selected", 1),
				Y("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[0] ||= (...e) => z(t).selectAllVisibleAssets && z(t).selectAllVisibleAssets(...e)
				}, " All visible "),
				Y("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[1] ||= (...e) => z(t).clearAssetSelection && z(t).clearAssetSelection(...e)
				}, " Clear "),
				Y("button", {
					type: "button",
					class: "at-toolbar__chip at-toolbar__chip--primary",
					onClick: n[2] ||= (...e) => z(t).batchReEnrichSelected && z(t).batchReEnrichSelected(...e)
				}, " Re-enrich selected "),
				Y("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[3] ||= (...e) => z(t).toggleSelectionMode && z(t).toggleSelectionMode(...e)
				}, "Done")
			])) : Z("", !0),
			Y("div", xc, [
				Mn(Y("input", {
					"onUpdate:modelValue": n[4] ||= (e) => z(t).searchQuery = e,
					type: "search",
					class: "at-toolbar__search",
					placeholder: "name:, trigger:, category:, tag: or free text",
					autocomplete: "off"
				}, null, 512), [[bo, z(t).searchQuery]]),
				Y("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Grid view",
					"aria-pressed": z(t).viewMode === "grid",
					onClick: n[5] ||= (e) => z(t).setViewMode("grid")
				}, " ▦ ", 8, Sc),
				Y("button", {
					type: "button",
					class: "at-icon-btn",
					title: "List view",
					"aria-pressed": z(t).viewMode === "list",
					onClick: n[6] ||= (e) => z(t).setViewMode("list")
				}, " ≡ ", 8, Cc),
				Y("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Select assets",
					"aria-pressed": z(t).selectionMode,
					onClick: n[7] ||= (...e) => z(t).toggleSelectionMode && z(t).toggleSelectionMode(...e)
				}, " ☑ ", 8, wc),
				Y("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Settings",
					onClick: n[8] ||= (e) => z(t).settingsOpen = !0
				}, " ⚙ "),
				Y("button", {
					type: "button",
					class: "at-reset",
					onClick: n[9] ||= (e) => z(t).resetFilters()
				}, " Reset ")
			]),
			X(_c)
		]));
	}
}), [["__scopeId", "data-v-7e27da26"]]), Ec = { class: "at-status" }, Dc = ["title"], Oc = { class: "at-status__text" }, kc = {
	key: 3,
	class: "at-status__more"
}, Ac = {
	key: 1,
	class: "at-status__toast"
}, jc = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "StatusBar",
	setup(e) {
		let t = Rs(), { connected: n, total: r, items: i, loading: a, loadingMore: o, error: s, toast: c } = fs(t);
		return (e, l) => (q(), J("div", Ec, [
			Y("span", {
				class: A(["at-status__dot", z(n) ? "at-status__dot--ok" : "at-status__dot--bad"]),
				title: z(n) ? "Connected" : "Disconnected"
			}, null, 10, Dc),
			Y("span", Oc, [z(a) && !z(i).length ? (q(), J(G, { key: 0 }, [ra("Loading…")], 64)) : z(s) ? (q(), J(G, { key: 1 }, [ra(j(z(s)), 1)], 64)) : (q(), J(G, { key: 2 }, [ra("Showing " + j(z(i).length) + " / " + j(z(r)), 1)], 64)), z(o) ? (q(), J("span", kc, " · More…")) : Z("", !0)]),
			!z(n) || z(s) ? (q(), J("button", {
				key: 0,
				type: "button",
				class: "at-status__retry",
				onClick: l[0] ||= (e) => z(t).bootstrap()
			}, " Retry ")) : Z("", !0),
			z(c) ? (q(), J("span", Ac, j(z(c)), 1)) : Z("", !0)
		]));
	}
}), [["__scopeId", "data-v-6f3959bc"]]);
//#endregion
//#region src/composables/useClipboard.ts
async function Mc(e) {
	let t = (e ?? "").trim();
	if (!t) return !1;
	try {
		return await navigator.clipboard.writeText(t), !0;
	} catch {
		try {
			let e = document.createElement("textarea");
			e.value = t, e.style.position = "fixed", e.style.left = "-9999px", document.body.appendChild(e), e.select();
			let n = document.execCommand("copy");
			return document.body.removeChild(e), n;
		} catch {
			return !1;
		}
	}
}
//#endregion
//#region src/components/AssetCard.vue?vue&type=script&setup=true&lang.ts
var Nc = ["checked"], Pc = ["src"], Fc = ["src"], Ic = ["src"], Lc = {
	key: 2,
	class: "at-card__placeholder"
}, Rc = {
	key: 3,
	class: "at-card__cat"
}, zc = {
	key: 4,
	class: "at-card__fav",
	title: "Favorite",
	"aria-hidden": "true"
}, Bc = ["title"], Vc = { class: "at-card__body" }, Hc = { class: "at-card__title-row" }, Uc = ["title"], Wc = {
	key: 0,
	class: "at-card__bm"
}, Gc = {
	key: 1,
	class: "at-card__tw"
}, Kc = {
	key: 2,
	class: "at-card__usage"
}, qc = { class: "at-card__actions" }, Jc = ["disabled"], Yc = ["title"], Xc = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "AssetCard",
	props: {
		item: {},
		compact: { type: Boolean }
	},
	setup(e) {
		let t = e, n = Rs(), r = $(() => Ts(t.item.cover_url)), i = $(() => Ts(t.item.cover_playback_url)), a = $(() => (t.item.cover_media_type || "").toLowerCase() === "video" && !!i.value);
		function o(e) {
			if (!a.value) return;
			let t = e.currentTarget?.querySelector("video.at-card__vid");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function s(e) {
			if (!a.value) return;
			let t = e.currentTarget?.querySelector("video.at-card__vid");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		let c = $(() => {
			let e = t.item.trigger_words || [];
			if (!e.length) return "";
			let n = e.slice(0, 3).join(", ");
			return e.length > 3 ? `${n}…` : n;
		}), l = $(() => {
			let e = t.item.usage_count, n = t.item.last_used_at;
			if (!e && !n) return "";
			let r = [];
			return e && r.push(`uses: ${e}`), n && r.push(n.replace("T", " ").slice(0, 16)), r.join(" · ");
		}), u = $(() => {
			let e = t.item.checkpoint_meta;
			if (!e) return {
				text: "",
				title: ""
			};
			let n = [], r = [], i = e.recommended_cfg;
			i != null && (n.push(`CFG ${i}`), r.push(`CFG ${i}`));
			let a = e.recommended_steps;
			a != null && (n.push(`${a} steps`), r.push(`${a} steps`));
			let o = (e.recommended_sampler ?? "").trim();
			if (o) {
				let e = o.length > 22 ? `${o.slice(0, 21)}…` : o;
				n.push(e), r.push(`Sampler: ${o}`);
			}
			let s = (e.recommended_scheduler ?? "").trim();
			if (s) {
				let e = s.length > 18 ? `${s.slice(0, 17)}…` : s;
				n.push(e), r.push(`Scheduler: ${s}`);
			}
			let c = e.recommended_clip_skip;
			return c != null && (n.push(`CLIP ${c}`), r.push(`CLIP skip: ${c}`)), {
				text: n.join(" · "),
				title: r.join("\n")
			};
		});
		function d(e) {
			let n = t.item.comfy_checkpoint_name?.trim();
			if (!n || !e.dataTransfer) return;
			let r = t.item.checkpoint_meta;
			e.dataTransfer.setData("application/x-at-checkpoint", JSON.stringify({
				comfy_checkpoint_name: n,
				display_name: t.item.display_name,
				base_model: t.item.base_model,
				recommended_clip_skip: r?.recommended_clip_skip ?? null
			})), e.dataTransfer.effectAllowed = "copy";
		}
		async function f(e) {
			e.stopPropagation();
			let r = t.item.comfy_checkpoint_name?.trim();
			if (!r) return;
			let i = await Mc(r);
			n.showToast(i ? "Copied" : "Copy failed");
		}
		function p(e) {
			if (!e.target.closest("button, .at-card__drag, a, .at-card__select, .at-card__select input")) {
				if (n.selectionMode) {
					n.toggleAssetSelect(t.item.asset_id);
					return;
				}
				n.openDetail(t.item.asset_id);
			}
		}
		return (t, m) => (q(), J("article", {
			class: A(["at-card", {
				"at-card--compact": e.compact,
				"at-card--selected": z(n).selectionMode && z(n).isAssetSelected(e.item.asset_id)
			}]),
			onClick: p
		}, [
			z(n).selectionMode ? (q(), J("label", {
				key: 0,
				class: "at-card__select",
				onClick: m[1] ||= Eo(() => {}, ["stop"])
			}, [Y("input", {
				type: "checkbox",
				checked: z(n).isAssetSelected(e.item.asset_id),
				onChange: m[0] ||= Eo((t) => z(n).toggleAssetSelect(e.item.asset_id), ["stop"])
			}, null, 40, Nc)])) : Z("", !0),
			Y("div", {
				class: "at-card__media",
				onMouseenter: o,
				onMouseleave: s
			}, [
				a.value && i.value ? (q(), J(G, { key: 0 }, [Y("video", {
					class: "at-card__img at-card__vid",
					src: i.value,
					muted: "",
					loop: "",
					playsinline: "",
					preload: "metadata"
				}, null, 8, Pc), r.value ? (q(), J("img", {
					key: 0,
					src: r.value,
					loading: "lazy",
					alt: "",
					class: "at-card__img at-card__img--freeze"
				}, null, 8, Fc)) : Z("", !0)], 64)) : r.value ? (q(), J("img", {
					key: 1,
					src: r.value,
					loading: "lazy",
					alt: "",
					class: "at-card__img"
				}, null, 8, Ic)) : (q(), J("div", Lc, "No image")),
				e.item.category ? (q(), J("span", Rc, j(e.item.category), 1)) : Z("", !0),
				e.item.is_favorite ? (q(), J("span", zc, "★")) : Z("", !0),
				u.value.text && !e.compact ? (q(), J("div", {
					key: 5,
					class: "at-card__rec-strip",
					title: u.value.title || "Recommended parameters"
				}, j(u.value.text), 9, Bc)) : Z("", !0)
			], 32),
			Y("div", Vc, [
				Y("div", Hc, [Y("span", {
					class: "at-card__title",
					title: e.item.display_name || e.item.filename
				}, j(e.item.display_name || e.item.filename), 9, Uc)]),
				e.item.base_model && !e.compact ? (q(), J("div", Wc, j(e.item.base_model), 1)) : Z("", !0),
				c.value ? (q(), J("div", Gc, j(c.value), 1)) : Z("", !0),
				e.compact && l.value ? (q(), J("div", Kc, j(l.value), 1)) : Z("", !0),
				Y("div", { class: A(["at-card__actions-row", { "at-card__actions-row--compact": e.compact }]) }, [Y("div", qc, [Y("button", {
					type: "button",
					class: "at-card__btn at-card__btn--primary",
					disabled: !e.item.comfy_checkpoint_name,
					onClick: Eo(f, ["stop"])
				}, " Copy name ", 8, Jc)]), e.item.base_model && e.compact ? (q(), J("span", {
					key: 0,
					class: "at-card__bm-compact",
					title: e.item.base_model
				}, j(e.item.base_model), 9, Yc)) : Z("", !0)], 2)
			]),
			Y("button", {
				type: "button",
				class: "at-card__drag",
				title: "Drag to LM Checkpoint Loader",
				draggable: "true",
				onDragstart: d,
				onClick: m[2] ||= Eo(() => {}, ["stop"])
			}, " ⠿ ", 32)
		], 2));
	}
}), [["__scopeId", "data-v-3a119e2c"]]), Zc = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "AssetGrid",
	setup(e) {
		let { items: t, gridColumnCount: n } = fs(Rs());
		return (e, r) => (q(), J("div", {
			class: "at-grid",
			style: le({ "--at-grid-cols": z(n) })
		}, [(q(!0), J(G, null, H(z(t), (e) => (q(), Yi(Xc, {
			key: e.asset_id,
			item: e
		}, null, 8, ["item"]))), 128))], 4));
	}
}), [["__scopeId", "data-v-abb9b4c7"]]), Qc = { class: "at-list" }, $c = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "AssetList",
	setup(e) {
		let { items: t } = fs(Rs());
		return (e, n) => (q(), J("div", Qc, [(q(!0), J(G, null, H(z(t), (e) => (q(), Yi(Xc, {
			key: e.asset_id,
			item: e,
			compact: ""
		}, null, 8, ["item"]))), 128))]));
	}
}), [["__scopeId", "data-v-d1d6175a"]]), el = {
	class: "at-settings",
	role: "dialog",
	"aria-label": "Checkpoint library settings"
}, tl = { class: "at-settings__label" }, nl = { class: "at-settings__label at-settings__label--mt" }, rl = { class: "at-settings__slider-row" }, il = ["value"], al = {
	class: "at-settings__slider-value",
	"aria-live": "polite"
}, ol = { class: "at-settings__section" }, sl = { class: "at-settings__row" }, cl = ["disabled"], ll = {
	key: 0,
	class: "at-settings__err"
}, ul = {
	key: 0,
	class: "at-settings__ok"
}, dl = {
	key: 1,
	class: "at-settings__warn"
}, fl = {
	key: 2,
	class: "at-settings__stale-list"
}, pl = { class: "at-settings__stale-name" }, ml = { key: 0 }, hl = ["disabled"], gl = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "SettingsPanel",
	setup(e) {
		let t = Rs(), n = /* @__PURE__ */ R(null), r = /* @__PURE__ */ R(!1), i = /* @__PURE__ */ R(!1), a = /* @__PURE__ */ R(null);
		function o(e) {
			return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
		}
		async function s() {
			a.value = null, r.value = !0;
			try {
				n.value = await Ds();
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Preview failed", n.value = null;
			} finally {
				r.value = !1;
			}
		}
		async function c() {
			if (n.value?.stale_count) {
				i.value = !0;
				try {
					let e = await Os();
					t.showToast(`Removed ${e.removed} stale entr${e.removed === 1 ? "y" : "ies"}`), n.value = await Ds(), await t.loadAssets(!0);
				} catch (e) {
					t.showToast(e instanceof Error ? e.message : "Clean failed");
				} finally {
					i.value = !1;
				}
			}
		}
		function l() {
			t.settingsOpen = !1;
		}
		function u() {
			t.saveSettingsUrl(), t.settingsOpen = !1;
		}
		return (e, d) => (q(), J("div", {
			class: "at-settings-backdrop",
			onClick: Eo(l, ["self"])
		}, [Y("div", el, [
			d[6] ||= Y("h2", { class: "at-settings__title" }, "AssetThingie — Checkpoints", -1),
			Y("label", tl, [d[2] ||= ra(" Server URL ", -1), Mn(Y("input", {
				"onUpdate:modelValue": d[0] ||= (e) => z(t).baseUrlInput = e,
				type: "url",
				class: "at-settings__input"
			}, null, 512), [[bo, z(t).baseUrlInput]])]),
			d[7] ||= Y("p", { class: "at-settings__hint" }, [ra(" AssetThingie URL. Default "), Y("code", null, "http://127.0.0.1:8188")], -1),
			Y("label", nl, [d[3] ||= ra(" Grid columns (card view) ", -1), Y("div", rl, [Y("input", {
				type: "range",
				class: "at-settings__range",
				min: "1",
				max: "20",
				step: "1",
				value: z(t).gridColumnCount,
				onInput: d[1] ||= (e) => z(t).setGridColumnCount(Number(e.target.value))
			}, null, 40, il), Y("span", al, j(z(t).gridColumnCount), 1)])]),
			d[8] ||= Y("p", { class: "at-settings__hint" }, " 1–20 columns when the toolbar is in grid mode. Very narrow sidebars still use one column. ", -1),
			Y("div", ol, [
				d[4] ||= Y("h3", { class: "at-settings__subtitle" }, "Library maintenance", -1),
				d[5] ||= Y("p", { class: "at-settings__hint" }, " Remove database entries for model files that are no longer on disk, and delete their cached cover/example images. ", -1),
				Y("div", sl, [Y("button", {
					type: "button",
					class: "at-settings__btn",
					disabled: r.value,
					onClick: s
				}, j(r.value ? "Checking…" : "Check for missing files"), 9, cl)]),
				a.value ? (q(), J("p", ll, j(a.value), 1)) : n.value ? (q(), J(G, { key: 1 }, [
					n.value.stale_count === 0 ? (q(), J("p", ul, " Library is clean — no missing models found. ")) : (q(), J("p", dl, j(n.value.stale_count) + " model" + j(n.value.stale_count === 1 ? "" : "s") + " missing from disk. Cached images: ~" + j(o(n.value.orphan_cache_bytes)) + ". ", 1)),
					n.value.stale_count > 0 ? (q(), J("ul", fl, [(q(!0), J(G, null, H(n.value.stale_assets.slice(0, 12), (e) => (q(), J("li", { key: e.asset_id }, [Y("span", pl, j(e.display_name || e.path), 1)]))), 128)), n.value.stale_assets.length > 12 ? (q(), J("li", ml, "…")) : Z("", !0)])) : Z("", !0),
					Y("button", {
						type: "button",
						class: "at-settings__btn at-settings__btn--danger",
						disabled: n.value.stale_count === 0 || i.value,
						onClick: c
					}, j(i.value ? "Removing…" : "Confirm removal"), 9, hl)
				], 64)) : Z("", !0)
			]),
			Y("div", { class: "at-settings__actions" }, [Y("button", {
				type: "button",
				class: "at-settings__btn",
				onClick: l
			}, "Cancel"), Y("button", {
				type: "button",
				class: "at-settings__btn at-settings__btn--primary",
				onClick: u
			}, " Save & reconnect ")])
		])]));
	}
}), [["__scopeId", "data-v-1961c363"]]), _l = ["src", "poster"], vl = ["src"], yl = {
	key: 2,
	class: "at-imlb__meta"
}, bl = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "ImageMetaLightbox",
	props: {
		imageUrl: {},
		playbackUrl: {},
		posterUrl: {},
		mediaType: {},
		meta: {}
	},
	emits: ["close"],
	setup(e) {
		let t = e, n = $(() => (t.mediaType || "").toLowerCase() === "video" && !!t.playbackUrl), r = $(() => !!(t.imageUrl || t.playbackUrl));
		return (t, i) => (q(), Yi(er, { to: "body" }, [r.value ? (q(), J("div", {
			key: 0,
			class: "at-imlb",
			onClick: i[2] ||= Eo((e) => t.$emit("close"), ["self"])
		}, [Y("div", {
			class: "at-imlb__inner",
			onClick: i[1] ||= Eo((e) => t.$emit("close"), ["self"])
		}, [
			Y("button", {
				type: "button",
				class: "at-imlb__x",
				onClick: i[0] ||= (e) => t.$emit("close")
			}, "×"),
			n.value ? (q(), J("video", {
				key: e.playbackUrl || "",
				class: "at-imlb__video",
				src: e.playbackUrl || void 0,
				poster: e.posterUrl || e.imageUrl || void 0,
				controls: "",
				playsinline: ""
			}, null, 8, _l)) : e.imageUrl ? (q(), J("img", {
				key: 1,
				src: e.imageUrl,
				alt: "Preview"
			}, null, 8, vl)) : Z("", !0),
			e.meta && Object.keys(e.meta).length ? (q(), J("pre", yl, j(JSON.stringify(e.meta, null, 2)), 1)) : Z("", !0)
		])])) : Z("", !0)]));
	}
}), [["__scopeId", "data-v-76f82a61"]]), xl = { class: "at-detail__head" }, Sl = {
	key: 0,
	class: "at-detail__loading"
}, Cl = {
	key: 1,
	class: "at-detail__scroll"
}, wl = ["src"], Tl = ["src"], El = ["src"], Dl = { class: "at-detail__name" }, Ol = {
	key: 1,
	class: "at-detail__meta"
}, kl = {
	key: 2,
	class: "at-detail__meta"
}, Al = { class: "at-detail__syntax" }, jl = { class: "at-detail__sec-head" }, Ml = { class: "at-detail__code" }, Nl = {
	key: 3,
	class: "at-detail__section"
}, Pl = { class: "at-detail__rec-list" }, Fl = {
	key: 4,
	class: "at-detail__meta"
}, Il = {
	key: 5,
	class: "at-detail__section"
}, Ll = { class: "at-detail__notes" }, Rl = { class: "at-detail__section" }, zl = { class: "at-detail__sec-head" }, Bl = {
	key: 0,
	class: "at-detail__tw-list"
}, Vl = {
	key: 1,
	class: "at-detail__tw-empty"
}, Hl = {
	key: 6,
	class: "at-detail__section"
}, Ul = { class: "at-detail__tags" }, Wl = {
	key: 7,
	class: "at-detail__meta"
}, Gl = ["href"], Kl = { class: "at-detail__row-actions" }, ql = ["disabled"], Jl = {
	key: 9,
	class: "at-detail__meta"
}, Yl = {
	key: 10,
	class: "at-detail__section"
}, Xl = ["innerHTML"], Zl = {
	key: 11,
	class: "at-detail__section"
}, Ql = { class: "at-detail__gallery" }, $l = ["onMouseenter", "onMouseleave"], eu = ["onClick"], tu = ["src"], nu = ["src"], ru = ["src"], iu = ["src"], au = {
	key: 12,
	class: "at-detail__section"
}, ou = { class: "at-detail__path-line" }, su = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "DetailPanel",
	setup(e) {
		let t = Rs(), { detail: n, detailLoading: r } = fs(t), i = $(() => n.value ? Ts(n.value.cover_url_full || n.value.cover_url) : null), a = $(() => n.value ? Ts(n.value.cover_playback_url) : null), o = $(() => (n.value?.cover_media_type || "").toLowerCase() === "video" && !!a.value), s = $(() => {
			let e = n.value?.trigger_words;
			return e && Array.isArray(e) ? e.map((e) => String(e).trim()).filter(Boolean) : [];
		}), c = $(() => s.value.join(", ")), l = $(() => {
			let e = n.value;
			if (!e) return "";
			let t = (e.path ?? "").trim(), r = (e.comfy_checkpoint_name ?? "").trim();
			if (!t && !r) return "";
			if (!r) return t;
			if (!t) return r;
			let i = t.includes("\\") ? "\\" : "/", a = t.replace(/[/\\]+$/, "");
			return a.endsWith(r) || t.endsWith(r) ? t : `${a}${i}${r}`;
		}), u = {
			recommended_sampler: "Sampler",
			recommended_scheduler: "Scheduler",
			recommended_steps: "Steps",
			recommended_cfg: "CFG",
			recommended_clip_skip: "CLIP skip",
			recommended_prompt: "Prompt",
			recommended_negative_prompt: "Negative prompt"
		}, d = $(() => {
			let e = n.value?.system_fields;
			if (!e || typeof e != "object") return [];
			let t = [];
			for (let n of Object.keys(u)) n in e && e[n] != null && e[n] !== "" && t.push([n, u[n]]);
			return t;
		});
		function f(e) {
			return e == null ? "—" : String(e);
		}
		async function p(e, n) {
			let r = (n ?? "").trim();
			if (!r) return;
			let i = await Mc(r);
			t.showToast(i ? `Copied ${e}` : "Copy failed");
		}
		let m = /* @__PURE__ */ R(null), h = /* @__PURE__ */ R(null), g = /* @__PURE__ */ R(null), _ = /* @__PURE__ */ R(null), v = /* @__PURE__ */ R(null);
		function y() {
			m.value = null, h.value = null, g.value = null, _.value = null, v.value = null;
		}
		function b(e) {
			let t = (e.media_type || "image").toLowerCase(), n = e.playback_url ? Ts(e.playback_url) : null, r = Ts(e.poster_url || e.thumbnail_url);
			if (t === "video" && n) _.value = "video", h.value = n, g.value = r, m.value = r || n;
			else if (t === "video") {
				_.value = "image", h.value = null, g.value = null;
				let t = r || Ts(e.url || e.thumbnail_url);
				if (!t) return;
				m.value = t;
			} else {
				h.value = null, g.value = null;
				let t = Ts(e.url || e.thumbnail_url);
				if (!t) return;
				m.value = t;
			}
			let i = e.generation_params;
			i && typeof i == "object" && Object.keys(i).length ? v.value = { ...i } : (e.caption ?? "").trim() ? v.value = { caption: e.caption } : v.value = null;
		}
		function x(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function S(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		function C(e) {
			let t = e.currentTarget?.querySelector("video.at-detail__cover--vid");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function w(e) {
			let t = e.currentTarget?.querySelector("video.at-detail__cover--vid");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		zn(() => n.value?.asset_id, () => {
			y();
		});
		let T = /* @__PURE__ */ R(!1);
		async function ee() {
			let e = n.value?.asset_id;
			if (e != null) {
				T.value = !0;
				try {
					await ks(e), t.showToast("Metadata refreshed"), await t.loadDetail();
				} catch (e) {
					t.showToast(e instanceof Error ? e.message : "Refresh failed");
				} finally {
					T.value = !1;
				}
			}
		}
		return (e, u) => (q(), J("div", {
			class: "at-detail",
			onClick: u[6] ||= Eo((e) => z(t).closeDetail(), ["self"])
		}, [Y("div", {
			class: "at-detail__panel",
			onClick: u[5] ||= Eo(() => {}, ["stop"])
		}, [Y("div", xl, [u[7] ||= Y("h2", { class: "at-detail__h" }, "Details", -1), Y("button", {
			type: "button",
			class: "at-detail__close",
			onClick: u[0] ||= (e) => z(t).closeDetail()
		}, "×")]), z(r) ? (q(), J("div", Sl, "Loading…")) : z(n) ? (q(), J("div", Cl, [
			i.value || o.value ? (q(), J("div", {
				key: 0,
				class: "at-detail__cover-wrap",
				onMouseenter: u[1] ||= (e) => o.value && C(e),
				onMouseleave: u[2] ||= (e) => o.value && w(e)
			}, [o.value && a.value ? (q(), J(G, { key: 0 }, [Y("video", {
				class: "at-detail__cover at-detail__cover--vid",
				src: a.value,
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, wl), i.value ? (q(), J("img", {
				key: 0,
				src: i.value,
				alt: "",
				class: "at-detail__cover at-detail__cover--freeze",
				loading: "lazy"
			}, null, 8, Tl)) : Z("", !0)], 64)) : i.value ? (q(), J("img", {
				key: 1,
				src: i.value,
				alt: "",
				class: "at-detail__cover",
				loading: "lazy"
			}, null, 8, El)) : Z("", !0)], 32)) : Z("", !0),
			Y("p", Dl, j(z(n).display_name || z(n).filename), 1),
			z(n).base_model ? (q(), J("p", Ol, "Base: " + j(z(n).base_model), 1)) : Z("", !0),
			z(n).default_strength != null && Number(z(n).default_strength) !== 1 ? (q(), J("p", kl, " Default strength: " + j(z(n).default_strength), 1)) : Z("", !0),
			Y("div", Al, [Y("div", jl, [u[8] ||= Y("span", { class: "at-detail__mini-label" }, "Comfy checkpoint", -1), z(n).comfy_checkpoint_name ? (q(), J("button", {
				key: 0,
				type: "button",
				class: "at-detail__mini",
				onClick: u[3] ||= (e) => p("checkpoint name", z(n).comfy_checkpoint_name)
			}, " Copy ")) : Z("", !0)]), Y("code", Ml, j(z(n).comfy_checkpoint_name || "—"), 1)]),
			d.value.length ? (q(), J("section", Nl, [u[9] ||= Y("div", { class: "at-detail__sec-title" }, "Checkpoint recommendations", -1), Y("dl", Pl, [(q(!0), J(G, null, H(d.value, ([e, t]) => (q(), J(G, { key: e }, [Y("dt", null, j(t), 1), Y("dd", null, j(f(z(n).system_fields?.[e])), 1)], 64))), 128))])])) : Z("", !0),
			z(n).category || z(n).subcategory ? (q(), J("p", Fl, j([z(n).category, z(n).subcategory].filter(Boolean).join(" / ")), 1)) : Z("", !0),
			z(n).notes ? (q(), J("section", Il, [u[10] ||= Y("div", { class: "at-detail__sec-title" }, "Notes", -1), Y("p", Ll, j(z(n).notes), 1)])) : Z("", !0),
			Y("section", Rl, [Y("div", zl, [u[11] ||= Y("span", { class: "at-detail__sec-title" }, "Triggers", -1), s.value.length ? (q(), J("button", {
				key: 0,
				type: "button",
				class: "at-detail__mini",
				onClick: u[4] ||= (e) => p("triggers", c.value)
			}, " Copy ")) : Z("", !0)]), s.value.length ? (q(), J("ul", Bl, [(q(!0), J(G, null, H(s.value, (e, t) => (q(), J("li", {
				key: `${t}-${e}`,
				class: "at-detail__tw-item"
			}, [Y("code", null, j(e), 1)]))), 128))])) : (q(), J("p", Vl, "—"))]),
			(z(n).tags ?? []).length ? (q(), J("section", Hl, [u[12] ||= Y("div", { class: "at-detail__sec-title" }, "Tags", -1), Y("div", Ul, [(q(!0), J(G, null, H(z(n).tags, (e) => (q(), J("span", {
				key: e,
				class: "at-detail__tag"
			}, j(e), 1))), 128))])])) : Z("", !0),
			z(n).source_creator_name ? (q(), J("p", Wl, " By " + j(z(n).source_creator_name), 1)) : Z("", !0),
			z(n).source_url ? (q(), J("a", {
				key: 8,
				href: z(n).source_url,
				target: "_blank",
				rel: "noopener noreferrer",
				class: "at-detail__link"
			}, "Source", 8, Gl)) : Z("", !0),
			Y("div", Kl, [Y("button", {
				type: "button",
				class: "at-detail__mini",
				disabled: T.value,
				onClick: ee
			}, j(T.value ? "Refreshing…" : "Refresh from Civitai"), 9, ql)]),
			z(n).usage_count || z(n).last_used_at ? (q(), J("p", Jl, [ra(" Uses: " + j(z(n).usage_count), 1), z(n).last_used_at ? (q(), J(G, { key: 0 }, [ra(" · " + j(z(n).last_used_at.replace("T", " ").slice(0, 19)), 1)], 64)) : Z("", !0)])) : Z("", !0),
			z(n).description_html ? (q(), J("section", Yl, [u[13] ||= Y("div", { class: "at-detail__sec-title" }, "Description", -1), Y("div", {
				class: "at-detail__html",
				innerHTML: z(n).description_html
			}, null, 8, Xl)])) : Z("", !0),
			z(n).example_media.length ? (q(), J("section", Zl, [u[14] ||= Y("div", { class: "at-detail__sec-title" }, "Examples", -1), Y("div", Ql, [(q(!0), J(G, null, H(z(n).example_media, (e) => (q(), J("div", {
				key: e.media_id,
				class: "at-detail__ex-wrap",
				onMouseenter: (t) => (e.media_type || "").toLowerCase() === "video" && e.playback_url ? x(t) : void 0,
				onMouseleave: (t) => (e.media_type || "").toLowerCase() === "video" && e.playback_url ? S(t) : void 0
			}, [Y("button", {
				type: "button",
				class: "at-detail__ex",
				onClick: (t) => b(e)
			}, [(e.media_type || "").toLowerCase() === "video" && e.playback_url ? (q(), J(G, { key: 0 }, [Y("video", {
				class: "at-detail__ex-vid",
				src: Ts(e.playback_url) || "",
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, tu), e.thumbnail_url || e.poster_url ? (q(), J("img", {
				key: 0,
				src: Ts(e.thumbnail_url || e.poster_url || e.url) || "",
				alt: "",
				class: "at-detail__ex-img at-detail__ex-img--freeze",
				loading: "lazy"
			}, null, 8, nu)) : Z("", !0)], 64)) : (e.media_type || "").toLowerCase() === "video" ? (q(), J("img", {
				key: 1,
				src: Ts(e.thumbnail_url || e.poster_url || e.url) || "",
				alt: "",
				class: "at-detail__ex-img",
				loading: "lazy"
			}, null, 8, ru)) : e.thumbnail_url || e.url ? (q(), J("img", {
				key: 2,
				src: Ts(e.thumbnail_url || e.url) || "",
				alt: "",
				class: "at-detail__ex-img",
				loading: "lazy"
			}, null, 8, iu)) : Z("", !0)], 8, eu)], 40, $l))), 128))])])) : Z("", !0),
			l.value ? (q(), J("section", au, [u[15] ||= Y("div", { class: "at-detail__sec-title" }, "Path", -1), Y("p", ou, j(l.value), 1)])) : Z("", !0)
		])) : Z("", !0)]), X(bl, {
			"image-url": m.value,
			"playback-url": h.value,
			"poster-url": g.value,
			"media-type": _.value,
			meta: v.value,
			onClose: y
		}, null, 8, [
			"image-url",
			"playback-url",
			"poster-url",
			"media-type",
			"meta"
		])]));
	}
}), [["__scopeId", "data-v-3e7dffcb"]]), cu = { class: "at-app" }, lu = {
	key: 0,
	class: "at-main-column"
}, uu = { class: "at-empty at-empty--fill" }, du = {
	key: 1,
	class: "at-main-column"
}, fu = { class: "at-chrome" }, pu = {
	key: 0,
	class: "at-empty at-empty--fill"
}, mu = 160, hu = /* @__PURE__ */ gc(/* @__PURE__ */ ar({
	__name: "App",
	setup(e) {
		let t = Rs(), { connected: n, items: r, loading: i, loadingMore: a, viewMode: o, settingsOpen: s, selectedAssetId: c } = fs(t), l = /* @__PURE__ */ R(null);
		function u(e) {
			return e.scrollHeight - e.scrollTop - e.clientHeight <= mu;
		}
		function d() {
			let e = l.value;
			!e || !t.hasMore || t.loading || t.loadingMore || u(e) && t.loadMore();
		}
		let f = 0;
		function p() {
			f ||= requestAnimationFrame(() => {
				f = 0, d();
			});
		}
		return zn(() => l.value, (e, t) => {
			t && t.removeEventListener("scroll", p), e && (e.addEventListener("scroll", p, { passive: !0 }), requestAnimationFrame(() => d()));
		}, {
			flush: "post",
			immediate: !0
		}), zn([
			r,
			i,
			a,
			n
		], () => {
			requestAnimationFrame(() => d());
		}, { flush: "post" }), br(() => {
			t.bootstrap();
		}), wr(() => {
			let e = l.value;
			e && e.removeEventListener("scroll", p);
		}), (e, i) => (q(), J("div", cu, [
			z(n) ? (q(), J("div", du, [Y("div", fu, [X(Tc), X(jc)]), !z(t).loading && !z(r).length && !z(t).error ? (q(), J("div", pu, [i[6] ||= Y("p", null, "No checkpoints in the index for this filter.", -1), Y("button", {
				type: "button",
				class: "at-empty__btn",
				onClick: i[2] ||= (e) => z(t).resetFilters()
			}, " Reset filters ")])) : (q(), J("div", {
				key: 1,
				ref_key: "scrollRoot",
				ref: l,
				class: "at-scroll"
			}, [z(o) === "grid" ? (q(), Yi(Zc, { key: 0 })) : (q(), Yi($c, { key: 1 }))], 512))])) : (q(), J("div", lu, [
				X(Tc),
				X(jc),
				Y("div", uu, [
					Y("p", null, [
						i[3] ||= ra("Could not connect to AssetThingie at ", -1),
						Y("code", null, j(z(t).baseUrlInput), 1),
						i[4] ||= ra(".", -1)
					]),
					i[5] ||= Y("p", { class: "at-empty__sub" }, "Start the app or open settings to change the URL.", -1),
					Y("button", {
						type: "button",
						class: "at-empty__btn",
						onClick: i[0] ||= (e) => z(t).settingsOpen = !0
					}, " Settings "),
					Y("button", {
						type: "button",
						class: "at-empty__btn",
						onClick: i[1] ||= (e) => z(t).bootstrap()
					}, "Retry")
				])
			])),
			z(s) ? (q(), Yi(gl, { key: 2 })) : Z("", !0),
			z(c) == null ? Z("", !0) : (q(), Yi(su, { key: 3 }))
		]));
	}
}), [["__scopeId", "data-v-b919f05e"]]);
//#endregion
//#region src/main.ts
function gu(e) {
	let t = Zo(), n = Ao(hu);
	return n.use(t), n.mount(e), n;
}
//#endregion
export { gu as mount };
