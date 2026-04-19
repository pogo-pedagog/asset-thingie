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
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), E = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ee = /-\w/g, D = E((e) => e.replace(ee, (e) => e.slice(1).toUpperCase())), te = /\B([A-Z])/g, O = E((e) => e.replace(te, "-$1").toLowerCase()), ne = E((e) => e.charAt(0).toUpperCase() + e.slice(1)), re = E((e) => e ? `on${ne(e)}` : ""), k = (e, t) => !Object.is(e, t), ie = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, A = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, ae = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, oe, se = () => oe ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function ce(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? fe(r) : ce(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var le = /;(?![^(]*\))/g, ue = /:([^]+)/, de = /\/\*[^]*?\*\//g;
function fe(e) {
	let t = {};
	return e.replace(de, "").split(le).forEach((e) => {
		if (e) {
			let n = e.split(ue);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function j(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = j(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var pe = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", me = /* @__PURE__ */ e(pe);
pe + "";
function he(e) {
	return !!e || e === "";
}
function ge(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = _e(e[r], t[r]);
	return n;
}
function _e(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ge(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !_e(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function ve(e, t) {
	return e.findIndex((e) => _e(e, t));
}
var ye = (e) => !!(e && e.__v_isRef === !0), M = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? ye(e) ? M(e.value) : JSON.stringify(e, be, 2) : String(e), be = (e, t) => ye(t) ? be(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[xe(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => xe(e)) } : _(t) ? xe(t) : v(t) && !d(t) && !C(t) ? String(t) : t, xe = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, N, Se = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = N, !e && N && (this.index = (N.scopes ||= []).push(this) - 1);
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
			let t = N;
			try {
				return N = this, e();
			} finally {
				N = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = N, N = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (N = this.prevScope, this.prevScope = void 0);
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
function Ce(e) {
	return new Se(e);
}
function we() {
	return N;
}
function Te(e, t = !1) {
	N && N.cleanups.push(e);
}
var P, Ee = /* @__PURE__ */ new WeakSet(), De = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, N && N.active && N.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Ee.has(this) && (Ee.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || je(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, We(this), Pe(this);
		let e = P, t = Be;
		P = this, Be = !0;
		try {
			return this.fn();
		} finally {
			Fe(this), P = e, Be = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Re(e);
			this.deps = this.depsTail = void 0, We(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Ee.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ie(this) && this.run();
	}
	get dirty() {
		return Ie(this);
	}
}, Oe = 0, ke, Ae;
function je(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Ae, Ae = e;
		return;
	}
	e.next = ke, ke = e;
}
function Me() {
	Oe++;
}
function Ne() {
	if (--Oe > 0) return;
	if (Ae) {
		let e = Ae;
		for (Ae = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; ke;) {
		let t = ke;
		for (ke = void 0; t;) {
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
function Pe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Fe(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Re(r), ze(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ie(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Le(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Le(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ge) || (e.globalVersion = Ge, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ie(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = P, r = Be;
	P = e, Be = !0;
	try {
		Pe(e);
		let n = e.fn(e._value);
		(t.version === 0 || k(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		P = n, Be = r, Fe(e), e.flags &= -3;
	}
}
function Re(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Re(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function ze(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Be = !0, Ve = [];
function He() {
	Ve.push(Be), Be = !1;
}
function Ue() {
	let e = Ve.pop();
	Be = e === void 0 ? !0 : e;
}
function We(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = P;
		P = void 0;
		try {
			t();
		} finally {
			P = e;
		}
	}
}
var Ge = 0, Ke = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, qe = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!P || !Be || P === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== P) t = this.activeLink = new Ke(P, this), P.deps ? (t.prevDep = P.depsTail, P.depsTail.nextDep = t, P.depsTail = t) : P.deps = P.depsTail = t, Je(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = P.depsTail, t.nextDep = void 0, P.depsTail.nextDep = t, P.depsTail = t, P.deps === t && (P.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ge++, this.notify(e);
	}
	notify(e) {
		Me();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ne();
		}
	}
};
function Je(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Je(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Ye = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ Symbol(""), Ze = /* @__PURE__ */ Symbol(""), Qe = /* @__PURE__ */ Symbol("");
function F(e, t, n) {
	if (Be && P) {
		let t = Ye.get(e);
		t || Ye.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new qe()), r.map = t, r.key = n), r.track();
	}
}
function $e(e, t, n, r, i, a) {
	let o = Ye.get(e);
	if (!o) {
		Ge++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Me(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Qe || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Qe)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Xe)), f(e) && s(o.get(Ze)));
				break;
			case "delete":
				i || (s(o.get(Xe)), f(e) && s(o.get(Ze)));
				break;
			case "set":
				f(e) && s(o.get(Xe));
				break;
		}
	}
	Ne();
}
function et(e, t) {
	let n = Ye.get(e);
	return n && n.get(t);
}
function tt(e) {
	let t = /* @__PURE__ */ I(e);
	return t === e ? t : (F(t, "iterate", Qe), /* @__PURE__ */ Vt(e) ? t : t.map(Wt));
}
function nt(e) {
	return F(e = /* @__PURE__ */ I(e), "iterate", Qe), e;
}
function rt(e, t) {
	return /* @__PURE__ */ Bt(e) ? Gt(/* @__PURE__ */ zt(e) ? Wt(t) : t) : Wt(t);
}
var it = {
	__proto__: null,
	[Symbol.iterator]() {
		return at(this, Symbol.iterator, (e) => rt(this, e));
	},
	concat(...e) {
		return tt(this).concat(...e.map((e) => d(e) ? tt(e) : e));
	},
	entries() {
		return at(this, "entries", (e) => (e[1] = rt(this, e[1]), e));
	},
	every(e, t) {
		return st(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return st(this, "filter", e, t, (e) => e.map((e) => rt(this, e)), arguments);
	},
	find(e, t) {
		return st(this, "find", e, t, (e) => rt(this, e), arguments);
	},
	findIndex(e, t) {
		return st(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return st(this, "findLast", e, t, (e) => rt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return st(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return st(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return lt(this, "includes", e);
	},
	indexOf(...e) {
		return lt(this, "indexOf", e);
	},
	join(e) {
		return tt(this).join(e);
	},
	lastIndexOf(...e) {
		return lt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return st(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ut(this, "pop");
	},
	push(...e) {
		return ut(this, "push", e);
	},
	reduce(e, ...t) {
		return ct(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ct(this, "reduceRight", e, t);
	},
	shift() {
		return ut(this, "shift");
	},
	some(e, t) {
		return st(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ut(this, "splice", e);
	},
	toReversed() {
		return tt(this).toReversed();
	},
	toSorted(e) {
		return tt(this).toSorted(e);
	},
	toSpliced(...e) {
		return tt(this).toSpliced(...e);
	},
	unshift(...e) {
		return ut(this, "unshift", e);
	},
	values() {
		return at(this, "values", (e) => rt(this, e));
	}
};
function at(e, t, n) {
	let r = nt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Vt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var ot = Array.prototype;
function st(e, t, n, r, i, a) {
	let o = nt(e), s = o !== e && !/* @__PURE__ */ Vt(e), c = o[t];
	if (c !== ot[t]) {
		let t = c.apply(e, a);
		return s ? Wt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, rt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ct(e, t, n, r) {
	let i = nt(e), a = i !== e && !/* @__PURE__ */ Vt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = rt(e, t)), n.call(this, t, rt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? rt(e, c) : c;
}
function lt(e, t, n) {
	let r = /* @__PURE__ */ I(e);
	F(r, "iterate", Qe);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ht(n[0]) ? (n[0] = /* @__PURE__ */ I(n[0]), r[t](...n)) : i;
}
function ut(e, t, n = []) {
	He(), Me();
	let r = (/* @__PURE__ */ I(e))[t].apply(e, n);
	return Ne(), Ue(), r;
}
var dt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), ft = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function pt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ I(this);
	return F(t, "has", e), t.hasOwnProperty(e);
}
var mt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Mt : jt : i ? At : kt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = it[t])) return e;
			if (t === "hasOwnProperty") return pt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ L(e) ? e : n);
		if ((_(t) ? ft.has(t) : dt(t)) || (r || F(e, "get", t), i)) return o;
		if (/* @__PURE__ */ L(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Lt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Lt(o) : /* @__PURE__ */ Ft(o) : o;
	}
}, ht = class extends mt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Bt(i);
			if (!/* @__PURE__ */ Vt(n) && !/* @__PURE__ */ Bt(n) && (i = /* @__PURE__ */ I(i), n = /* @__PURE__ */ I(n)), !a && /* @__PURE__ */ L(i) && !/* @__PURE__ */ L(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ L(e) ? e : r);
		return e === /* @__PURE__ */ I(r) && (o ? k(n, i) && $e(e, "set", t, n, i) : $e(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && $e(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !ft.has(t)) && F(e, "has", t), n;
	}
	ownKeys(e) {
		return F(e, "iterate", d(e) ? "length" : Xe), Reflect.ownKeys(e);
	}
}, gt = class extends mt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, _t = /* @__PURE__ */ new ht(), vt = /* @__PURE__ */ new gt(), yt = /* @__PURE__ */ new ht(!0), bt = (e) => e, xt = (e) => Reflect.getPrototypeOf(e);
function St(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ I(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? bt : t ? Gt : Wt;
		return !t && F(a, "iterate", l ? Ze : Xe), s(Object.create(u), { next() {
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
function Ct(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function wt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ I(r), a = /* @__PURE__ */ I(n);
			e || (k(n, a) && F(i, "get", n), F(i, "get", a));
			let { has: o } = xt(i), s = t ? bt : e ? Gt : Wt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && F(/* @__PURE__ */ I(t), "iterate", Xe), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ I(n), i = /* @__PURE__ */ I(t);
			return e || (k(t, i) && F(r, "has", t), F(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ I(a), s = t ? bt : e ? Gt : Wt;
			return !e && F(o, "iterate", Xe), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: Ct("add"),
		set: Ct("set"),
		delete: Ct("delete"),
		clear: Ct("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ I(this), r = xt(n), i = /* @__PURE__ */ I(e), a = !t && !/* @__PURE__ */ Vt(e) && !/* @__PURE__ */ Bt(e) ? i : e;
			return r.has.call(n, a) || k(e, a) && r.has.call(n, e) || k(i, a) && r.has.call(n, i) || (n.add(a), $e(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Vt(n) && !/* @__PURE__ */ Bt(n) && (n = /* @__PURE__ */ I(n));
			let r = /* @__PURE__ */ I(this), { has: i, get: a } = xt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ I(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? k(n, s) && $e(r, "set", e, n, s) : $e(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ I(this), { has: n, get: r } = xt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ I(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && $e(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ I(this), t = e.size !== 0, n = e.clear();
			return t && $e(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = St(r, e, t);
	}), n;
}
function Tt(e, t) {
	let n = wt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Et = { get: /* @__PURE__ */ Tt(!1, !1) }, Dt = { get: /* @__PURE__ */ Tt(!1, !0) }, Ot = { get: /* @__PURE__ */ Tt(!0, !1) }, kt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap();
function Nt(e) {
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
function Pt(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Nt(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Ft(e) {
	return /* @__PURE__ */ Bt(e) ? e : Rt(e, !1, _t, Et, kt);
}
/* @__NO_SIDE_EFFECTS__ */
function It(e) {
	return Rt(e, !1, yt, Dt, At);
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e) {
	return Rt(e, !0, vt, Ot, jt);
}
function Rt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = Pt(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function zt(e) {
	return /* @__PURE__ */ Bt(e) ? /* @__PURE__ */ zt(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function Bt(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function Vt(e) {
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
	return !u(e, "__v_skip") && Object.isExtensible(e) && A(e, "__v_skip", !0), e;
}
var Wt = (e) => v(e) ? /* @__PURE__ */ Ft(e) : e, Gt = (e) => v(e) ? /* @__PURE__ */ Lt(e) : e;
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
		this.dep = new qe(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ I(e), this._value = t ? e : Wt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Vt(e) || /* @__PURE__ */ Bt(e);
		e = n ? e : /* @__PURE__ */ I(e), k(e, t) && (this._rawValue = e, this._value = n ? e : Wt(e), this.dep.trigger());
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
	return /* @__PURE__ */ zt(e) ? e : new Proxy(e, Jt);
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
			r = !/* @__PURE__ */ Ht(i) || /* @__PURE__ */ Vt(i);
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
		return et(this._raw, this._key);
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
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new qe(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ge - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && P !== this) return je(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Le(this), e && (e.version = this.dep.version), this._value;
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
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Vt(e) || o === !1 || o === 0 ? ln(e, 1) : ln(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ L(e) ? (g = () => e.value, y = /* @__PURE__ */ Vt(e)) : /* @__PURE__ */ zt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ zt(e) || /* @__PURE__ */ Vt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ L(e)) return e.value;
		if (/* @__PURE__ */ zt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			He();
			try {
				_();
			} finally {
				Ue();
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
	let x = we(), S = () => {
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
			if (o || y || (b ? e.some((e, t) => k(e, C[t])) : k(e, C))) {
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
	return u && u(w), m = new De(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => sn(e, !1, m), _ = m.onStop = () => {
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
			He(), un(o, null, 10, [
				e,
				i,
				a
			]), Ue();
			return;
		}
	}
	pn(e, r, a, i, s);
}
function pn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var mn = [], hn = -1, gn = [], _n = null, vn = 0, yn = /* @__PURE__ */ Promise.resolve(), bn = null;
function xn(e) {
	let t = bn || yn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sn(e) {
	let t = hn + 1, n = mn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = mn[r], a = On(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Cn(e) {
	if (!(e.flags & 1)) {
		let t = On(e), n = mn[mn.length - 1];
		!n || !(e.flags & 2) && t >= On(n) ? mn.push(e) : mn.splice(Sn(t), 0, e), e.flags |= 1, wn();
	}
}
function wn() {
	bn ||= yn.then(kn);
}
function Tn(e) {
	d(e) ? gn.push(...e) : _n && e.id === -1 ? _n.splice(vn + 1, 0, e) : e.flags & 1 || (gn.push(e), e.flags |= 1), wn();
}
function En(e, t, n = hn + 1) {
	for (; n < mn.length; n++) {
		let t = mn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			mn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Dn(e) {
	if (gn.length) {
		let e = [...new Set(gn)].sort((e, t) => On(e) - On(t));
		if (gn.length = 0, _n) {
			_n.push(...e);
			return;
		}
		for (_n = e, vn = 0; vn < _n.length; vn++) {
			let e = _n[vn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		_n = null, vn = 0;
	}
}
var On = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function kn(e) {
	try {
		for (hn = 0; hn < mn.length; hn++) {
			let e = mn[hn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), un(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; hn < mn.length; hn++) {
			let e = mn[hn];
			e && (e.flags &= -2);
		}
		hn = -1, mn.length = 0, Dn(e), bn = null, (mn.length || gn.length) && kn(e);
	}
}
var An = null, jn = null;
function Mn(e) {
	let t = An;
	return An = e, jn = e && e.type.__scopeId || null, t;
}
function Nn(e, t = An, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Ji(-1);
		let i = Mn(t), a;
		try {
			a = e(...n);
		} finally {
			Mn(i), r._d && Ji(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function B(e, n) {
	if (An === null) return e;
	let r = ka(An), i = e.dirs ||= [];
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
function Pn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (He(), dn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ue());
	}
}
function Fn(e, t) {
	if (pa) {
		let n = pa.provides, r = pa.parent && pa.parent.provides;
		r === n && (n = pa.provides = Object.create(r)), n[e] = t;
	}
}
function In(e, t, n = !1) {
	let r = ma();
	if (r || Qr) {
		let i = Qr ? Qr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function Ln() {
	return !!(ma() || Qr);
}
var Rn = /* @__PURE__ */ Symbol.for("v-scx"), zn = () => In(Rn);
function V(e, t, n) {
	return Bn(e, t, n);
}
function Bn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (ba) {
		if (c === "sync") {
			let e = zn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = pa;
	u.call = (e, t, n) => dn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		W(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Cn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = cn(e, n, u);
	return ba && (f ? f.push(h) : d && h()), h;
}
function Vn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Hn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = _a(this), s = Bn(i, a.bind(r), n);
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
	let s = a.shapeFlag & 4 ? ka(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ I(v), b = v === t ? i : (e) => sr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && sr(_, t));
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
se().requestIdleCallback, se().cancelIdleCallback;
var dr = (e) => !!e.type.__asyncLoader, fr = (e) => e.type.__isKeepAlive;
function pr(e, t) {
	hr(e, "a", t);
}
function mr(e, t) {
	hr(e, "da", t);
}
function hr(e, t, n = pa) {
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
function _r(e, t, n = pa, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			He();
			let i = _a(n), a = dn(t, n, e, r);
			return i(), Ue(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var vr = (e) => (t, n = pa) => {
	(!ba || e === "sp") && _r(e, (...e) => t(...e), n);
}, yr = vr("bm"), br = vr("m"), xr = vr("bu"), Sr = vr("u"), Cr = vr("bum"), wr = vr("um"), Tr = vr("sp"), Er = vr("rtg"), Dr = vr("rtc");
function Or(e, t = pa) {
	_r("ec", e, t);
}
var kr = /* @__PURE__ */ Symbol.for("v-ndc");
function H(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ zt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Vt(e), s = /* @__PURE__ */ Bt(e), e = nt(e)), i = Array(e.length);
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
var Ar = (e) => e ? ya(e) ? ka(e) : Ar(e.parent) : null, jr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
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
		Cn(e.update);
	},
	$nextTick: (e) => e.n ||= xn.bind(e.proxy),
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
		if (d) return n === "$attrs" && F(e.attrs, "get", ""), d(e);
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
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: ee, errorCaptured: D, serverPrefetch: te, expose: O, inheritAttrs: ne, components: re, directives: k, filters: ie } = t;
	if (u && Lr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Ft(t));
	}
	if (Fr = !0, o) for (let e in o) {
		let t = o[e], a = Z({
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
			Fn(t, e[t]);
		});
	}
	f && Rr(f, e, "c");
	function A(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (A(yr, p), A(br, m), A(xr, g), A(Sr, _), A(pr, y), A(mr, b), A(Or, D), A(Dr, E), A(Er, ee), A(Cr, S), A(wr, w), A(Tr, te), d(O)) if (O.length) {
		let t = e.exposed ||= {};
		O.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === r && (e.render = T), ne != null && (e.inheritAttrs = ne), re && (e.components = re), k && (e.directives = k), te && or(e);
}
function Lr(e, t, n = r) {
	d(e) && (e = Gr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? In(r.from || n, r.default, !0) : In(r.from || n) : In(r), /* @__PURE__ */ L(i) ? Object.defineProperty(t, n, {
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
		h(n) && V(i, n);
	} else if (h(e)) V(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => zr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && V(i, r, e);
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
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, ka(u.component);
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
var Qr = null, $r = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${D(t)}Modifiers`] || e[`${O(t)}Modifiers`];
function ei(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && $r(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(ae)));
	let c, l = i[c = re(n)] || i[c = re(D(n))];
	!l && o && (l = i[c = re(O(n))]), l && dn(l, e, 6, a);
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
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, O(t)) || u(e, t));
}
function ii(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Mn(e), v, y;
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
			}) : e(f, null)), y = t.props ? c : ai(c);
		}
	} catch (t) {
		Wi.length = 0, fn(t, e, 1), v = ta(Hi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = oi(y, a)), b = ia(b, y, !1, !0));
	}
	return n.dirs && (b = ia(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ir(b, n.transition), v = b, Mn(_), v;
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
	return n === "style" && v(r) && v(i) ? !_e(r, i) : r !== i;
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
	n ? e.props = r ? i : /* @__PURE__ */ It(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
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
					let t = D(o);
					i[t] = _i(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		gi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = O(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = _i(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && $e(e.attrs, "set", "");
}
function gi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = D(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : ri(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
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
					let o = _a(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === O(n)) && (r = !0));
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
		let n = D(c[e]);
		bi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = D(e);
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
var xi = (e) => e === "_" || e === "_ctx" || e === "$stable", Si = (e) => d(e) ? e.map(aa) : [aa(e)], Ci = (e, t, n) => {
	if (t._n) return t;
	let r = Nn((...e) => Si(t(...e)), n);
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
		e ? (Ei(r, t, n), n && A(r, "_", e, !0)) : wi(t, r);
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
	let a = se();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Qi(e, t) && (r = _e(e), j(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
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
				re(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? k(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, M);
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
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) E(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), te(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, E = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, r, i, ji(e, a), s, u), _ && Pn(e, null, r, "created"), ee(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && la(f, r, e);
		}
		_ && Pn(e, null, r, "beforeMount");
		let v = Ni(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && W(() => {
			try {
				f && la(f, r, e), v && g.enter(d), _ && Pn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ee = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || zi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ee(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? oa(e[l]) : aa(e[l]), t, n, r, i, a, o, s);
	}, te = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Mi(r, !1), (g = h.onVnodeBeforeUpdate) && la(g, r, n, e), f && Pn(n, e, r, "beforeUpdate"), r && Mi(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? O(e.dynamicChildren, d, l, r, i, ji(n, a), o) : s || le(e, n, l, null, r, i, ji(n, a), o, !1), u > 0) {
			if (u & 16) ne(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ne(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && W(() => {
			g && la(g, r, n, e), f && Pn(n, e, r, "updated");
		}, i);
	}, O = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === G || !Qi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, ne = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, re = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), D(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (O(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Pi(e, t, !0)) : le(e, t, n, f, i, a, s, c, l);
	}, k = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : A(t, n, r, i, a, o, c) : ae(e, t, c);
	}, A = (e, t, n, r, i, a, o) => {
		let s = e.component = fa(e, r, i);
		if (fr(e) && (s.ctx.renderer = M), xa(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, oe, o), !e.el) {
				let r = s.subTree = ta(Hi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else oe(s, e, t, n, i, a, o);
	}, ae = (e, t, n) => {
		let r = t.component = e.component;
		if (si(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			ce(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, oe = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Ii(e);
					if (n) {
						t && (t.el = c.el, ce(e, t, o)), n.asyncDep.then(() => {
							W(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Mi(e, !1), t ? (t.el = c.el, ce(e, t, o)) : t = c, n && ie(n), (d = t.props && t.props.onVnodeBeforeUpdate) && la(d, s, t, c), Mi(e, !0);
				let f = ii(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), _e(p), e, i, a), t.el = f.el, u === null && ui(e, f.el), r && W(r, i), (d = t.props && t.props.onVnodeUpdated) && W(() => la(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = dr(t);
				if (Mi(e, !1), l && ie(l), !m && (o = c && c.onVnodeBeforeMount) && la(o, d, t), Mi(e, !0), s && xe) {
					let t = () => {
						e.subTree = ii(e), xe(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ii(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && W(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					W(() => la(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && dr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && W(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new De(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Cn(u), Mi(e, !0), l();
	}, ce = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, hi(e, t.props, r, n), Oi(e, t.children, n), He(), En(e), Ue();
	}, le = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				de(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ge(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? de(l, d, n, r, i, a, o, s, c) : ge(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, ue = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? oa(t[p]) : aa(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ge(e, a, o, !0, !1, f) : D(t, r, i, a, o, s, c, l, f);
	}, de = (e, t, r, i, a, o, s, c, l) => {
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
		} else if (u > p) for (; u <= f;) j(e[u], a, o, !0), u++;
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
					j(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Qi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? j(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Fi(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Ri(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? fe(n, r, p, 2) : _--);
			}
		}
	}, fe = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			fe(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, M);
			return;
		}
		if (c === G) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) fe(u[e], t, n, r);
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
	}, j = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (He(), lr(s, null, n, e, !0), Ue()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !dr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && la(_, t, e), u & 6) he(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Pn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, M, r) : l && !l.hasOnce && (a !== G || d > 0 && d & 64) ? ge(l, t, n, !1, !0) : (a === G && d & 384 || !i && u & 16) && ge(c, t, n), r && pe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && W(() => {
			_ && la(_, t, e), h && Pn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, pe = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === G) {
			me(n, r);
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
	}, me = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, he = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Li(c), Li(l), r && ie(r), i.stop(), a && (a.flags |= 8, j(o, e, t, n)), s && W(s, t), W(() => {
			e.isUnmounted = !0;
		}, t);
	}, ge = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) j(e[o], t, n, r, i);
	}, _e = (e) => {
		if (e.shapeFlag & 6) return _e(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Wn];
		return n ? h(n) : t;
	}, ve = !1, ye = (e, t, n) => {
		let r;
		e == null ? t._vnode && (j(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ve ||= (ve = !0, En(r), Dn(), !1);
	}, M = {
		p: v,
		um: j,
		m: fe,
		r: pe,
		mt: A,
		mc: D,
		pc: le,
		pbc: O,
		n: _e,
		o: e
	}, be, xe;
	return i && ([be, xe] = i(M)), {
		render: ye,
		hydrate: be,
		createApp: Zr(ye, be)
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
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = oa(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Pi(t, a)), a.type === Vi && (a.patchFlag === -1 && (a = i[e] = oa(a)), a.el = t.el), a.type === Hi && !a.el && (a.el = t.el);
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
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Tn(e);
}
var G = /* @__PURE__ */ Symbol.for("v-fgt"), Vi = /* @__PURE__ */ Symbol.for("v-txt"), Hi = /* @__PURE__ */ Symbol.for("v-cmt"), Ui = /* @__PURE__ */ Symbol.for("v-stc"), Wi = [], Gi = null;
function K(e = !1) {
	Wi.push(Gi = e ? null : []);
}
function Ki() {
	Wi.pop(), Gi = Wi[Wi.length - 1] || null;
}
var qi = 1;
function Ji(e, t = !1) {
	qi += e, e < 0 && Gi && t && (Gi.hasOnce = !0);
}
function Yi(e) {
	return e.dynamicChildren = qi > 0 ? Gi || n : null, Ki(), qi > 0 && Gi && Gi.push(e), e;
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
	i: An,
	r: e,
	k: t,
	f: !!n
} : e);
function J(e, t = null, n = null, r = 0, i = null, a = e === G ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && $i(t),
		ref: t && ea(t),
		scopeId: jn,
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
		ctx: An
	};
	return s ? (sa(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), qi > 0 && !o && Gi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Gi.push(c), c;
}
var ta = na;
function na(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === kr) && (e = Hi), Zi(e)) {
		let r = ia(e, t, !0);
		return n && sa(r, n), qi > 0 && !a && Gi && (r.shapeFlag & 6 ? Gi[Gi.indexOf(e)] = r : Gi.push(r)), r.patchFlag = -2, r;
	}
	if (Aa(e) && (e = e.__vccOpts), t) {
		t = ra(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = j(e)), v(n) && (/* @__PURE__ */ Ht(n) && !d(n) && (n = s({}, n)), t.style = ce(n));
	}
	let o = g(e) ? 1 : zi(e) ? 128 : Gn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return J(e, t, n, r, i, o, a, !0);
}
function ra(e) {
	return e ? /* @__PURE__ */ Ht(e) || pi(e) ? s({}, e) : e : null;
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
		patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
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
	return ta(Vi, null, e, t);
}
function X(e = "", t = !1) {
	return t ? (K(), Xi(Hi, null, e)) : ta(Hi, null, e);
}
function aa(e) {
	return e == null || typeof e == "boolean" ? ta(Hi) : d(e) ? ta(G, null, e.slice()) : Zi(e) ? oa(e) : ta(Vi, null, String(e));
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
		!r && !pi(t) ? t._ctx = An : r === 3 && An && (An.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: An
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Y(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function ca(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = j([t.class, r.class]));
		else if (e === "style") t.style = ce([t.style, r.style]);
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
var ua = Yr(), da = 0;
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
		scope: new Se(!0),
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
var pa = null, ma = () => pa || An, ha, ga;
{
	let e = se(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	ha = t("__VUE_INSTANCE_SETTERS__", (e) => pa = e), ga = t("__VUE_SSR_SETTERS__", (e) => ba = e);
}
var _a = (e) => {
	let t = pa;
	return ha(e), e.scope.on(), () => {
		e.scope.off(), ha(t);
	};
}, va = () => {
	pa && pa.scope.off(), ha(null);
};
function ya(e) {
	return e.vnode.shapeFlag & 4;
}
var ba = !1;
function xa(e, t = !1, n = !1) {
	t && ga(t);
	let { props: r, children: i } = e.vnode, a = ya(e);
	mi(e, r, a, t), Di(e, i, n || t);
	let o = a ? Sa(e, t) : void 0;
	return t && ga(!1), o;
}
function Sa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Nr);
	let { setup: r } = n;
	if (r) {
		He();
		let n = e.setupContext = r.length > 1 ? Oa(e) : null, i = _a(e), a = un(r, e, 0, [e.props, n]), o = y(a);
		if (Ue(), i(), (o || e.sp) && !dr(e) && or(e), o) {
			if (a.then(va, va), t) return a.then((n) => {
				Ca(e, n, t);
			}).catch((t) => {
				fn(t, e, 0);
			});
			e.asyncDep = a;
		} else Ca(e, a, t);
	} else Ea(e, t);
}
function Ca(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Yt(t)), Ea(e, n);
}
var wa, Ta;
function Ea(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && wa && !i.render) {
			let t = i.template || Br(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = wa(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, Ta && Ta(e);
	}
	{
		let t = _a(e);
		He();
		try {
			Ir(e);
		} finally {
			Ue(), t();
		}
	}
}
var Da = { get(e, t) {
	return F(e, "get", ""), e[t];
} };
function Oa(e) {
	return {
		attrs: new Proxy(e.attrs, Da),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function ka(e) {
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
function Aa(e) {
	return h(e) && "__vccOpts" in e;
}
var Z = (e, t) => /* @__PURE__ */ nn(e, t, ba), ja = "3.5.32", Ma = void 0, Na = typeof window < "u" && window.trustedTypes;
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
		Ya.test(n) ? e.setProperty(O(r), n.replace(Ya, ""), "important") : e[r] = n;
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
	let r = D(t);
	if (r !== "filter" && r in e) return Qa[t] = r;
	r = ne(r);
	for (let n = 0; n < Za.length; n++) {
		let i = Za[n] + r;
		if (i in e) return Qa[t] = i;
	}
	return t;
}
var eo = "http://www.w3.org/1999/xlink";
function to(e, t, n, r, i, a = me(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(eo, t.slice(6, t.length)) : e.setAttributeNS(eo, t, n) : n == null || a && !he(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
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
		r === "boolean" ? n = he(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
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
	return [e[2] === ":" ? e.slice(3) : O(e.slice(2)), t];
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
	t === "class" ? Va(e, r, c) : t === "style" ? Ja(e, n, r) : a(t) ? o(t) || oo(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _o(e, t, r, c)) ? (no(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && to(e, t, r, c, s, t !== "value")) : e._isVueCE && (vo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? no(e, D(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), to(e, t, r, c));
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
	let r = D(t);
	return Array.isArray(n) ? n.some((e) => D(e) === r) : Object.keys(n).some((e) => D(e) === r);
}
var yo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ie(t, e) : t;
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
	return t && (e = e.trim()), n && (e = ae(e)), e;
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
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? ae(e.value) : e.value, c = t ?? "";
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
				let e = ve(t, n), a = e !== -1;
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
	if (d(t)) i = ve(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = _e(t, jo(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Do = {
	created(e, { value: t }, n) {
		e.checked = _e(t, n.props.value), e[So] = yo(n), ro(e, "change", () => {
			e[So](Ao(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[So] = yo(r), t !== n && (e.checked = _e(t, r.props.value));
	}
}, Oo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		ro(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? ae(Ao(e)) : Ao(e));
			e[So](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, xn(() => {
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
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = ve(t, o) > -1;
			} else a.selected = t.has(o);
			else if (_e(Ao(a), t)) {
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
		let r = O(n.key);
		if (t.some((e) => e === r || Fo[e] === r)) return e(n);
	}));
}, Lo = /* @__PURE__ */ s({ patchProp: go }, za), Ro;
function zo() {
	return Ro ||= ki(Lo);
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
	let e = Ce(!0), t = e.run(() => /* @__PURE__ */ R({})), n = [], r = [], i = Ut({
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
	return !n && we() && Te(i), i;
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
		qo(i) && qo(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ L(r) && !/* @__PURE__ */ zt(r) ? e[n] = ms(i, r) : e[n] = r;
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
		return s || (n.state.value[e] = i ? i() : {}), _s(/* @__PURE__ */ Xt(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Ut(Z(() => {
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
		xn().then(() => {
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
	}, y = /* @__PURE__ */ Ft({
		_p: r,
		$id: e,
		$onAction: ls.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = ls(d, t, n.detached, () => a()), a = o.run(() => V(() => r.state.value[e], (r) => {
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
	let b = (r._a && r._a.runWithContext || ds)(() => r._e.run(() => (o = Ce()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ L(n) && !vs(n) || /* @__PURE__ */ zt(n) ? a || (p && gs(n) && (/* @__PURE__ */ L(n) ? n.value = p[t] : ms(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
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
		let o = Ln();
		return n ||= o ? In(Ko, null) : null, n && Go(n), n = Wo, n._s.has(e) || (i ? bs(e, t, r, n) : ys(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
function Ss(e) {
	let t = /* @__PURE__ */ I(e), n = {};
	for (let r in t) {
		let i = t[r];
		i.effect ? n[r] = Z({
			get: () => e[r],
			set(t) {
				e[r] = t;
			}
		}) : (/* @__PURE__ */ L(i) || /* @__PURE__ */ zt(i)) && (n[r] = /* @__PURE__ */ $t(e, r));
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
	e.sort && t.set("sort", e.sort), e.period && t.set("period", e.period), e.nsfw && t.set("nsfw", "true"), e.kind?.trim() && t.set("kind", e.kind.trim()), e.page != null && String(e.page).trim() !== "" && t.set("page", String(e.page)), e.civarchive_sort?.trim() && t.set("civarchive_sort", e.civarchive_sort.trim()), e.civarchive_type?.trim() && t.set("civarchive_type", e.civarchive_type.trim());
	for (let n of e.civarchive_base_models ?? []) {
		let e = String(n).trim();
		e && t.append("civarchive_base_model", e);
	}
	return e.civarchive_tags?.trim() && t.set("civarchive_tags", e.civarchive_tags.trim()), e.civarchive_deleted_only && t.set("civarchive_deleted_only", "1"), e.civarchive_nsfw && t.set("civarchive_nsfw", e.civarchive_nsfw), t;
}
async function As(e, t) {
	let n = ks(t).toString();
	return $(`${Q()}/browse/${e}/search${n ? `?${n}` : ""}`);
}
async function js(e, t, n) {
	let r = ks(n);
	return r.set("url", t), $(`${Q()}/browse/${e}/page?${r.toString()}`);
}
async function Ms() {
	return $(`${Q()}/browse/civarchive/base-models`);
}
async function Ns() {
	return $(`${Q()}/browse/civarchive/base-models/reset`, { method: "POST" });
}
async function Ps() {
	return $(`${Q()}/browse/civitai/base-models`);
}
async function Fs() {
	return $(`${Q()}/browse/civitai/base-models/reset`, { method: "POST" });
}
async function Is(e, t, n = !1) {
	let r = encodeURIComponent(t), i = n ? "?nsfw=true" : "";
	return $(`${Q()}/browse/${e}/detail/${r}${i}`);
}
async function Ls(e) {
	let t = new URLSearchParams();
	e?.family && t.set("family", e.family);
	let n = t.toString();
	return $(`${Q()}/filters${n ? `?${n}` : ""}`);
}
async function Rs(e) {
	return $(`${Q()}/download`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(e)
	});
}
async function zs(e, t) {
	return $(`${Q()}/download/batch`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			items: e,
			duplicate_resolution: t ?? "skip"
		})
	});
}
async function Bs(e) {
	return $(`${Q()}/library/presence`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ items: e })
	});
}
async function Vs() {
	return $(`${Q()}/downloads`);
}
function Hs(e) {
	return encodeURIComponent(e);
}
async function Us(e) {
	await $(`${Q()}/downloads/${Hs(e)}/cancel`, { method: "POST" });
}
async function Ws(e) {
	await $(`${Q()}/downloads/${Hs(e)}/retry`, { method: "POST" });
}
async function Gs(e) {
	await $(`${Q()}/downloads/${Hs(e)}/pause`, { method: "POST" });
}
async function Ks(e) {
	await fetch(`${Ds()}${Q()}/downloads/${Hs(e)}`, { method: "DELETE" });
}
async function qs(e) {
	if (!(await $(`${Q()}/downloads/${Hs(e)}/resume`, { method: "POST" })).ok) throw Error("Could not resume: task is not paused or no longer exists.");
}
async function Js(e) {
	if (!(await $(`${Q()}/downloads/${Hs(e)}/move-to-top`, { method: "POST" })).ok) throw Error("Could not move to top: task is not queued or could not be reordered.");
}
async function Ys() {
	return $(`${Q()}/downloads/bulk/pause`, { method: "POST" });
}
async function Xs() {
	return $(`${Q()}/downloads/bulk/resume`, { method: "POST" });
}
async function Zs() {
	return $(`${Q()}/downloads/bulk/retry-failed`, { method: "POST" });
}
async function Qs() {
	return $(`${Q()}/downloads/bulk/clear-finished`, { method: "POST" });
}
async function $s() {
	return $(`${Q()}/downloads/bulk/clear-done`, { method: "POST" });
}
async function ec() {
	return $(`${Q()}/config`);
}
async function tc(e) {
	return $(`${Q()}/config`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(e)
	});
}
async function nc() {
	return $(`${Q()}/scan`, { method: "POST" });
}
async function rc() {
	return $(`${Q()}/scan/status`);
}
async function ic() {
	return $(`${Q()}/enrich`, { method: "POST" });
}
async function ac() {
	return $(`${Q()}/enrich/status`);
}
function oc(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("http://") || t.startsWith("https://") ? t : `${Ds()}${t.startsWith("/") ? "" : "/"}${t}`;
}
//#endregion
//#region src/stores/browse.ts
var sc = 25, cc = 15;
function lc(e) {
	return e.replace(/[^a-z0-9]+/gi, "").toLowerCase();
}
function uc(e) {
	let { requestedPageUrl: t, returnedNextUrl: n, returnedItemIds: r, lastPageItemIds: i } = e, a = r.map((e) => String(e)), o = i?.map((e) => String(e)) ?? null;
	return o !== null && a.length === o.length && a.every((e, t) => e === o[t]) ? {
		nextUrl: null,
		discardPage: !0,
		stopReason: "Civitai repeated the same page; stopping pagination."
	} : t && n && t === n ? {
		nextUrl: null,
		discardPage: !1,
		stopReason: "Civitai repeated the same next-page token; stopping pagination."
	} : r.length === 0 ? {
		nextUrl: null,
		discardPage: !0,
		stopReason: "Civitai returned an empty page; stopping pagination."
	} : {
		nextUrl: n,
		discardPage: !1,
		stopReason: null
	};
}
function dc(e, t, n) {
	if (e !== "model_name") return null;
	let r = lc(t.trim());
	if (!r) return null;
	for (let e of n) {
		let t = e.creator_username ?? (e.creator && typeof e.creator == "object" ? e.creator.username : null) ?? "";
		if ([
			e.name ?? "",
			String(t),
			...e.tags ?? []
		].some((e) => lc(String(e)).includes(r))) return null;
	}
	return "Civitai returned unrelated tail results; stopping pagination.";
}
function fc() {
	return {
		q: "",
		searchType: "model_name",
		contentTypes: [],
		baseModels: [],
		sort: "Most Downloaded",
		period: "All Time",
		civarchiveKind: "version",
		civarchivePage: 1,
		civarchiveSort: "newest",
		civarchiveType: "",
		civarchiveBaseModels: [],
		civarchiveTags: "",
		civarchiveDeletedOnly: !1,
		civarchiveNsfw: "all",
		items: [],
		buffer: [],
		nextPage: null,
		lastPageItemIds: [],
		stoppedReason: null,
		selected: null,
		batchIds: /* @__PURE__ */ new Set()
	};
}
var pc = xs("at-browse", () => {
	let e = /* @__PURE__ */ R("civitai"), t = /* @__PURE__ */ Ft({
		civitai: fc(),
		civarchive: fc()
	});
	function n() {
		return t[e.value];
	}
	let r = Z({
		get: () => n().q,
		set: (e) => {
			n().q = e;
		}
	}), i = Z({
		get: () => n().searchType,
		set: (e) => {
			n().searchType = e;
		}
	}), a = Z({
		get: () => n().contentTypes,
		set: (e) => {
			n().contentTypes = e;
		}
	}), o = Z({
		get: () => n().baseModels,
		set: (e) => {
			n().baseModels = e;
		}
	}), s = Z({
		get: () => n().sort,
		set: (e) => {
			n().sort = e;
		}
	}), c = Z({
		get: () => n().period,
		set: (e) => {
			n().period = e;
		}
	}), l = Z({
		get: () => n().civarchiveKind,
		set: (e) => {
			n().civarchiveKind = e;
		}
	}), u = Z({
		get: () => n().civarchivePage,
		set: (e) => {
			n().civarchivePage = e;
		}
	}), d = Z({
		get: () => n().civarchiveSort,
		set: (e) => {
			n().civarchiveSort = e;
		}
	}), f = Z({
		get: () => n().civarchiveType,
		set: (e) => {
			n().civarchiveType = e;
		}
	}), p = Z({
		get: () => n().civarchiveBaseModels,
		set: (e) => {
			n().civarchiveBaseModels = e;
		}
	}), m = Z({
		get: () => n().civarchiveTags,
		set: (e) => {
			n().civarchiveTags = e;
		}
	}), h = Z({
		get: () => n().civarchiveDeletedOnly,
		set: (e) => {
			n().civarchiveDeletedOnly = e;
		}
	}), g = Z({
		get: () => n().civarchiveNsfw,
		set: (e) => {
			n().civarchiveNsfw = e;
		}
	}), _ = /* @__PURE__ */ R(!0), v = /* @__PURE__ */ R(!0), y = /* @__PURE__ */ R(!1), b = /* @__PURE__ */ R(!1), x = /* @__PURE__ */ R(null), S = /* @__PURE__ */ Ft({
		civitai: 0,
		civarchive: 0
	}), C = Z({
		get: () => n().items,
		set: (e) => {
			n().items = e;
		}
	}), w = Z({
		get: () => n().buffer,
		set: (e) => {
			n().buffer = e;
		}
	}), T = Z({
		get: () => n().nextPage,
		set: (e) => {
			n().nextPage = e;
		}
	}), E = Z({
		get: () => n().lastPageItemIds,
		set: (e) => {
			n().lastPageItemIds = e.map((e) => String(e));
		}
	}), ee = Z({
		get: () => n().stoppedReason,
		set: (e) => {
			n().stoppedReason = e;
		}
	}), D = Z(() => (w.value.length > 0 || !!T.value) && !y.value), te = Z({
		get: () => n().selected,
		set: (e) => {
			n().selected = e;
		}
	}), O = /* @__PURE__ */ R(!1), ne = /* @__PURE__ */ R("General"), re = /* @__PURE__ */ R("skip"), k = /* @__PURE__ */ R(!1), ie = Z({
		get: () => n().batchIds,
		set: (e) => {
			n().batchIds = e;
		}
	});
	function A(t) {
		e.value = t;
	}
	function ae() {
		let t = n();
		if (e.value === "civarchive") {
			let e = t.civarchiveSort.trim() || "newest", n = {
				q: t.q,
				nsfw: !_.value,
				kind: t.civarchiveKind,
				page: t.civarchivePage,
				civarchive_sort: e
			}, r = t.civarchiveType.trim();
			r && (n.civarchive_type = r);
			let i = t.civarchiveBaseModels.map((e) => e.trim()).filter(Boolean);
			i.length && (n.civarchive_base_models = i);
			let a = t.civarchiveTags.trim();
			return a && (n.civarchive_tags = a), t.civarchiveDeletedOnly && (n.civarchive_deleted_only = !0), _.value || (n.civarchive_nsfw = t.civarchiveNsfw), n;
		}
		return {
			q: t.q,
			search_type: t.searchType,
			content_types: [...t.contentTypes],
			base_models: [...t.baseModels],
			sort: t.sort,
			period: t.period,
			nsfw: !_.value
		};
	}
	function oe(t, r, i) {
		let a = n(), o = t.map((e) => String(e.id)), s = uc({
			requestedPageUrl: r,
			returnedNextUrl: i,
			returnedItemIds: o,
			lastPageItemIds: a.lastPageItemIds.length ? [...a.lastPageItemIds] : null
		});
		if (r && e.value === "civitai") {
			let e = dc(a.searchType, a.q, t);
			e && (s = {
				nextUrl: null,
				discardPage: !0,
				stopReason: e
			});
		}
		return s.discardPage ? (a.nextPage = null, a.stoppedReason = s.stopReason, !1) : (a.buffer = [...a.buffer, ...t], a.nextPage = s.nextUrl, a.lastPageItemIds = o, a.stoppedReason = s.stopReason, !0);
	}
	function se() {
		let e = n();
		b.value || !e.nextPage || e.buffer.length >= cc || ce();
	}
	async function ce() {
		let t = e.value, r = n();
		if (b.value || !r.nextPage) return;
		let i = S[t], a = r.nextPage;
		b.value = !0;
		try {
			let e = await js(t, a, ae());
			if (i !== S[t]) return;
			oe(e.items, a, e.next_page ?? null);
		} catch (e) {
			if (i !== S[t]) return;
			x.value = e instanceof Error ? e.message : "Load more failed";
		} finally {
			b.value = !1;
		}
	}
	function le() {
		let e = n();
		if (e.buffer.length === 0) return 0;
		let t = e.buffer.slice(0, sc);
		return e.buffer = e.buffer.slice(sc), e.items = [...e.items, ...t], se(), t.length;
	}
	async function ue(t) {
		let r = e.value, i = n(), a = ++S[r];
		y.value = !0, x.value = null, t && (i.stoppedReason = null, i.nextPage = null, i.buffer = [], r === "civarchive" && (i.civarchivePage = 1));
		try {
			let e = await As(r, ae());
			if (a !== S[r]) return;
			t && (i.items = [], i.buffer = [], i.lastPageItemIds = []), oe(e.items, null, e.next_page ?? null), le();
		} catch (e) {
			if (a !== S[r]) return;
			x.value = e instanceof Error ? e.message : "Search failed", t && (i.items = [], i.buffer = []);
		} finally {
			a === S[r] && (y.value = !1);
		}
	}
	async function de() {
		let e = n();
		if (!y.value) {
			if (e.buffer.length > 0) {
				le();
				return;
			}
			!e.nextPage || b.value || (await ce(), le());
		}
	}
	async function fe(t) {
		let r = e.value, i = String(t);
		x.value = null, O.value = !0, n().selected = null;
		try {
			let e = await Is(r, i, !_.value);
			n().selected = e, x.value = null;
		} catch (e) {
			x.value = e instanceof Error ? e.message : "Detail failed";
		} finally {
			O.value = !1;
		}
	}
	async function j(t) {
		if (e.value === "civarchive" && (t.civarchiveHitKind === "user" || String(t.id).startsWith("user:"))) {
			let e = String(t.id).replace(/^user:/i, "").trim(), r = (t.creator_username ?? "").trim() || (t.creator && typeof t.creator == "object" ? String(t.creator.username ?? "").trim() : "") || e;
			n().q = r, n().civarchiveKind = "version", pe(), await ue(!0);
			return;
		}
		await fe(t.id);
	}
	function pe() {
		n().selected = null;
	}
	function me(e) {
		let t = n(), r = String(e), i = new Set(t.batchIds);
		i.has(r) ? i.delete(r) : i.add(r), t.batchIds = i;
	}
	function he() {
		n().batchIds = /* @__PURE__ */ new Set();
	}
	function ge(e) {
		k.value = e, e || he();
	}
	return {
		activeSource: e,
		setActiveSource: A,
		slices: t,
		q: r,
		searchType: i,
		contentTypes: a,
		baseModels: o,
		sort: s,
		period: c,
		civarchiveKind: l,
		civarchivePage: u,
		civarchiveSort: d,
		civarchiveType: f,
		civarchiveBaseModels: p,
		civarchiveTags: m,
		civarchiveDeletedOnly: h,
		civarchiveNsfw: g,
		hideNsfwFromConfig: _,
		hideEarlyAccessFromConfig: v,
		loading: y,
		fetching: b,
		error: x,
		items: C,
		buffer: w,
		nextPage: T,
		lastPageItemIds: E,
		stoppedReason: ee,
		hasMore: D,
		selected: te,
		detailLoading: O,
		category: ne,
		duplicateResolution: re,
		batchMode: k,
		batchIds: ie,
		search: ue,
		loadMore: de,
		drainBuffer: le,
		openModel: fe,
		openResult: j,
		closeDetail: pe,
		toggleBatchId: me,
		clearBatch: he,
		setBatchMode: ge,
		searchParams: ae
	};
}), mc = 1500, hc = 1e4;
function gc(e) {
	let t = e.toLowerCase();
	return t === "queued" || t === "downloading" || t === "verifying";
}
function _c(e, t) {
	let n = Math.max(0, Math.floor(e)), r = n === 1 ? "1 download added" : `${n} downloads added`;
	return t != null && t > 0 ? `${r} (${t} skipped)` : r;
}
function vc(e, t = 3500) {
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
var yc = xs("at-downloads", () => {
	let e = /* @__PURE__ */ R([]), t = /* @__PURE__ */ R(!1), n = /* @__PURE__ */ R(null), r = /* @__PURE__ */ R("browse");
	function i(e) {
		r.value = e;
	}
	let a = null, o = /* @__PURE__ */ R(/* @__PURE__ */ new Set());
	function s() {
		return e.value.some((e) => gc(e.state));
	}
	function c() {
		a != null && (clearTimeout(a), a = null);
		let e = s() ? mc : hc;
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
			let t = await Vs();
			e.value = t.tasks;
			for (let e of t.completed_since_last_poll ?? []) if (!o.value.has(e)) {
				o.value.add(e);
				let n = t.tasks.find((t) => t.id === e)?.filename ?? e.slice(0, 8);
				r.value !== "downloads" && vc(`Download completed: ${n}`);
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
	function p(e) {
		return String(e.state || "").toLowerCase();
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
		showToast: vc,
		numBulkPause: Z(() => e.value.filter((e) => [
			"queued",
			"downloading",
			"verifying"
		].includes(p(e))).length),
		numPaused: Z(() => e.value.filter((e) => p(e) === "paused").length),
		numFailed: Z(() => e.value.filter((e) => p(e) === "failed").length),
		numCompleted: Z(() => e.value.filter((e) => p(e) === "completed").length),
		numTerminal: Z(() => e.value.filter((e) => [
			"completed",
			"failed",
			"cancelled",
			"skipped"
		].includes(p(e))).length)
	};
}), bc = [
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
], xc = /* @__PURE__ */ "Anima,Chroma,Flux.1 D,Flux.1 Krea,Flux.1 S,Flux.2 D,Flux.2 Klein 4B,Flux.2 Klein 4B-base,Flux.2 Klein 9B,Flux.2 Klein 9B-base,HiDream,Hunyuan 1,Hunyuan Video,Illustrious,Kling,LTXV 2.3,LTXV2,NoobAI,Other,PixArt E,Pony,Qwen,SD 1.4,SD 1.5,SD 1.5 Hyper,SD 1.5 LCM,SD 2.0,SD 2.0 768,SD 2.1,SD 2.1 768,SD 3,SD 3.5,SD 3.5 Large,SD 3.5 Large Turbo,SD 3.5 Medium,SDXL 0.9,SDXL 1.0,SDXL 1.0 LCM,SDXL Hyper,SDXL Lightning,SDXL Turbo,Wan Image 2.7,Wan Video,Wan Video 1.3B t2v,Wan Video 14B i2v 480p,Wan Video 14B i2v 720p,Wan Video 14B t2v,Wan Video 2.2 I2V-A14B,Wan Video 2.2 TI2V-5B,ZImageBase,ZImageTurbo".split(","), Sc = /* @__PURE__ */ "Anima,Flux.1 D,Flux.1 S,Flux.2 Klein 4B,Flux.2 Klein 4B-base,Flux.2 Klein 9B,Flux.2 Klein 9B-base,Hunyuan 1,Hunyuan Video,Illustrious,Kling,LTXV 2.3,LTXV2,NoobAI,Other,PixArt E,Pony,Qwen,SD 1.5,SD 2.0 768,SD 2.1,SD 3,SD 3.5,SD 3.5 Large,SD 3.5 Large Turbo,SD 3.5 Medium,SDXL 1.0,SDXL Turbo,Wan Image 2.7,Wan Video,Wan Video 14B i2v 480p,Wan Video 2.2 I2V-A14B,ZImageBase,ZImageTurbo".split(","), Cc = [
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
], wc = [
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
], Tc = [
	{
		value: "newest",
		label: "Newest"
	},
	{
		value: "oldest",
		label: "Oldest"
	},
	{
		value: "downloads",
		label: "Most downloaded"
	},
	{
		value: "relevance",
		label: "Relevance"
	},
	{
		value: "popular",
		label: "Popular"
	},
	{
		value: "trending",
		label: "Trending"
	},
	{
		value: "name",
		label: "Name"
	},
	{
		value: "created",
		label: "Created"
	},
	{
		value: "deleted_newest",
		label: "Recently deleted"
	},
	{
		value: "deleted_oldest",
		label: "Oldest deletion"
	}
], Ec = { class: "browse-filters" }, Dc = { class: "browse-filters__body" }, Oc = { class: "browse-filters__row" }, kc = { class: "browse-filters__row" }, Ac = ["value"], jc = { class: "browse-filters__row" }, Mc = ["value"], Nc = { class: "browse-filters__row browse-filters__multiselect" }, Pc = ["aria-expanded"], Fc = { class: "browse-filters__dd-trigger-text" }, Ic = {
	class: "browse-filters__dd-chevron",
	"aria-hidden": "true"
}, Lc = {
	key: 0,
	class: "browse-filters__row"
}, Rc = { class: "browse-filters__row browse-filters__row--row" }, zc = { class: "browse-filters__row" }, Bc = { class: "browse-filters__row" }, Vc = { class: "browse-filters__section" }, Hc = { class: "browse-filters__chips" }, Uc = ["checked", "onChange"], Wc = { class: "browse-filters__row browse-filters__multiselect" }, Gc = ["aria-expanded"], Kc = { class: "browse-filters__dd-trigger-text" }, qc = {
	class: "browse-filters__dd-chevron",
	"aria-hidden": "true"
}, Jc = { class: "browse-filters__row" }, Yc = ["value"], Xc = { class: "browse-filters__row" }, Zc = ["value"], Qc = { class: "browse-filters__dd-scroll" }, $c = ["checked", "onChange"], el = {
	key: 0,
	class: "browse-filters__dd-empty"
}, tl = { class: "browse-filters__dd-scroll" }, nl = ["checked", "onChange"], rl = {
	key: 0,
	class: "browse-filters__dd-empty"
}, il = "▲", al = "▼", ol = /* @__PURE__ */ ar({
	__name: "BrowseFilters",
	setup(e) {
		let { searchType: t, contentTypes: n, baseModels: r, sort: i, period: a, activeSource: o, hideNsfwFromConfig: s, civarchiveKind: c, civarchiveSort: l, civarchiveType: u, civarchiveBaseModels: d, civarchiveTags: f, civarchiveDeletedOnly: p, civarchiveNsfw: m } = Ss(pc()), h = /* @__PURE__ */ R(!1), g = /* @__PURE__ */ R([...Sc]), _ = /* @__PURE__ */ R(!1), v = /* @__PURE__ */ R(""), y = /* @__PURE__ */ R(null), b = /* @__PURE__ */ R(null), x = /* @__PURE__ */ R({}), S = /* @__PURE__ */ R([...xc]), C = /* @__PURE__ */ R(!1), w = /* @__PURE__ */ R(""), T = /* @__PURE__ */ R(null), E = /* @__PURE__ */ R(null), ee = /* @__PURE__ */ R({}), D = Z(() => {
			let e = d.value;
			return e.length ? e.length === 1 ? e[0] : `${e.length} selected` : "Any";
		}), te = Z(() => {
			let e = r.value;
			return e.length ? e.length === 1 ? e[0] : `${e.length} selected` : "Any";
		}), O = Z(() => {
			let e = v.value.trim().toLowerCase(), t = g.value;
			return e ? t.filter((t) => t.toLowerCase().includes(e)) : t;
		}), ne = Z(() => {
			let e = w.value.trim().toLowerCase(), t = S.value;
			return e ? t.filter((t) => t.toLowerCase().includes(e)) : t;
		});
		function re() {
			let e = y.value;
			if (!e) return;
			let t = e.getBoundingClientRect();
			x.value = {
				position: "fixed",
				top: `${Math.round(t.bottom + 4)}px`,
				left: `${Math.round(t.left)}px`,
				width: `${Math.round(t.width)}px`,
				"max-width": "calc(100vw - 16px)",
				"z-index": "10000"
			};
		}
		function k() {
			let e = T.value;
			if (!e) return;
			let t = e.getBoundingClientRect();
			ee.value = {
				position: "fixed",
				top: `${Math.round(t.bottom + 4)}px`,
				left: `${Math.round(t.left)}px`,
				width: `${Math.round(t.width)}px`,
				"max-width": "calc(100vw - 16px)",
				"z-index": "10000"
			};
		}
		function ie(e) {
			let t = e.target;
			if (t instanceof Node) {
				if (_.value) {
					let e = y.value, n = b.value;
					if (e?.contains(t) || n?.contains(t)) return;
					_.value = !1;
				}
				if (C.value) {
					let e = T.value, n = E.value;
					if (e?.contains(t) || n?.contains(t)) return;
					C.value = !1;
				}
			}
		}
		function A() {
			_.value && re(), C.value && k();
		}
		br(() => {
			document.addEventListener("pointerdown", ie, !0), window.addEventListener("resize", A), window.addEventListener("scroll", A, !0);
		}), wr(() => {
			document.removeEventListener("pointerdown", ie, !0), window.removeEventListener("resize", A), window.removeEventListener("scroll", A, !0);
		});
		async function ae() {
			if (o.value === "civarchive") try {
				let e = await Ms();
				Array.isArray(e.base_models) && e.base_models.length && (g.value = e.base_models);
			} catch {}
		}
		async function oe() {
			if (o.value === "civitai") try {
				let e = await Ps();
				Array.isArray(e.base_models) && e.base_models.length && (S.value = e.base_models);
			} catch {}
		}
		V(h, (e) => {
			e ? o.value === "civarchive" ? ae() : oe() : (_.value = !1, C.value = !1);
		}), V(o, () => {
			_.value = !1, C.value = !1, h.value && (o.value === "civarchive" ? ae() : oe());
		}), V(_, (e) => {
			if (!e) {
				v.value = "";
				return;
			}
			xn(() => {
				re();
			});
		}), V(C, (e) => {
			if (!e) {
				w.value = "";
				return;
			}
			xn(() => {
				k();
			});
		});
		function se(e) {
			let t = n.value.slice(), r = t.indexOf(e);
			r >= 0 ? t.splice(r, 1) : t.push(e), n.value = t;
		}
		function le(e) {
			return n.value.includes(e);
		}
		function ue(e) {
			let t = r.value.slice(), n = t.indexOf(e);
			n >= 0 ? t.splice(n, 1) : t.push(e), r.value = t;
		}
		function de(e) {
			return r.value.includes(e);
		}
		function fe(e) {
			let t = d.value.slice(), n = t.indexOf(e);
			n >= 0 ? t.splice(n, 1) : t.push(e), d.value = t;
		}
		function j(e) {
			return d.value.includes(e);
		}
		return (e, n) => (K(), q("div", Ec, [
			J("button", {
				type: "button",
				class: "browse-filters__toggle",
				onClick: n[0] ||= (e) => h.value = !h.value
			}, M(h.value ? "▼" : "▶") + " Filters ", 1),
			B(J("div", Dc, [z(o) === "civarchive" ? (K(), q(G, { key: 0 }, [
				J("label", Oc, [n[19] ||= J("span", null, "Result kind", -1), B(J("select", {
					"onUpdate:modelValue": n[1] ||= (e) => /* @__PURE__ */ L(c) ? c.value = e : null,
					class: "at-input at-input--sm"
				}, [...n[18] ||= [
					J("option", { value: "version" }, "Version", -1),
					J("option", { value: "file" }, "File", -1),
					J("option", { value: "user" }, "User", -1)
				]], 512), [[Oo, z(c)]])]),
				J("label", kc, [n[20] ||= J("span", null, "Sort", -1), B(J("select", {
					"onUpdate:modelValue": n[2] ||= (e) => /* @__PURE__ */ L(l) ? l.value = e : null,
					class: "at-input at-input--sm"
				}, [(K(!0), q(G, null, H(z(Tc), (e) => (K(), q("option", {
					key: e.value,
					value: e.value
				}, M(e.label), 9, Ac))), 128))], 512), [[Oo, z(l)]])]),
				J("label", jc, [n[22] ||= J("span", null, "Type", -1), B(J("select", {
					"onUpdate:modelValue": n[3] ||= (e) => /* @__PURE__ */ L(u) ? u.value = e : null,
					class: "at-input at-input--sm"
				}, [n[21] ||= J("option", { value: "" }, "Any", -1), (K(!0), q(G, null, H(z(bc), (e) => (K(), q("option", {
					key: e,
					value: e
				}, M(e), 9, Mc))), 128))], 512), [[Oo, z(u)]])]),
				J("div", Nc, [n[23] ||= J("span", { class: "browse-filters__label" }, "Base models", -1), J("button", {
					ref_key: "civarchiveBaseTriggerRef",
					ref: y,
					type: "button",
					class: "at-input at-input--sm browse-filters__dd-trigger",
					"aria-expanded": _.value,
					"aria-haspopup": "listbox",
					onClick: n[4] ||= (e) => _.value = !_.value
				}, [J("span", Fc, M(D.value), 1), J("span", Ic, M(_.value ? il : al), 1)], 8, Pc)]),
				z(s) ? X("", !0) : (K(), q("label", Lc, [n[25] ||= J("span", null, "NSFW (CivArchive)", -1), B(J("select", {
					"onUpdate:modelValue": n[5] ||= (e) => /* @__PURE__ */ L(m) ? m.value = e : null,
					class: "at-input at-input--sm"
				}, [...n[24] ||= [
					J("option", { value: "all" }, "All", -1),
					J("option", { value: "sfw" }, "SFW only", -1),
					J("option", { value: "nsfw" }, "NSFW only", -1)
				]], 512), [[Oo, z(m)]])])),
				J("label", Rc, [n[26] ||= J("span", { class: "browse-filters__label-inline" }, "Deleted only", -1), B(J("input", {
					"onUpdate:modelValue": n[6] ||= (e) => /* @__PURE__ */ L(p) ? p.value = e : null,
					type: "checkbox"
				}, null, 512), [[To, z(p)]])]),
				J("label", zc, [n[27] ||= J("span", null, "Tags", -1), B(J("input", {
					"onUpdate:modelValue": n[7] ||= (e) => /* @__PURE__ */ L(f) ? f.value = e : null,
					type: "text",
					class: "at-input at-input--sm",
					placeholder: "Optional (API tags=)"
				}, null, 512), [[wo, z(f)]])])
			], 64)) : (K(), q(G, { key: 1 }, [
				J("label", Bc, [n[29] ||= J("span", null, "Search type", -1), B(J("select", {
					"onUpdate:modelValue": n[8] ||= (e) => /* @__PURE__ */ L(t) ? t.value = e : null,
					class: "at-input at-input--sm"
				}, [...n[28] ||= [
					J("option", { value: "model_name" }, "Model name", -1),
					J("option", { value: "username" }, "Username", -1),
					J("option", { value: "tag" }, "Tag", -1)
				]], 512), [[Oo, z(t)]])]),
				J("div", Vc, [n[30] ||= J("span", { class: "browse-filters__label" }, "Content types", -1), J("div", Hc, [(K(!0), q(G, null, H(z(bc), (e) => (K(), q("label", {
					key: e,
					class: "browse-filters__chk"
				}, [J("input", {
					type: "checkbox",
					checked: le(e),
					onChange: (t) => se(e)
				}, null, 40, Uc), Y(" " + M(e), 1)]))), 128))])]),
				J("div", Wc, [n[31] ||= J("span", { class: "browse-filters__label" }, "Base models", -1), J("button", {
					ref_key: "civitaiBaseTriggerRef",
					ref: T,
					type: "button",
					class: "at-input at-input--sm browse-filters__dd-trigger",
					"aria-expanded": C.value,
					"aria-haspopup": "listbox",
					onClick: n[9] ||= (e) => C.value = !C.value
				}, [J("span", Kc, M(te.value), 1), J("span", qc, M(C.value ? il : al), 1)], 8, Gc)]),
				J("label", Jc, [n[32] ||= J("span", null, "Sort", -1), B(J("select", {
					"onUpdate:modelValue": n[10] ||= (e) => /* @__PURE__ */ L(i) ? i.value = e : null,
					class: "at-input at-input--sm"
				}, [(K(!0), q(G, null, H(z(Cc), (e) => (K(), q("option", {
					key: e.value,
					value: e.value
				}, M(e.label), 9, Yc))), 128))], 512), [[Oo, z(i)]])]),
				J("label", Xc, [n[33] ||= J("span", null, "Period", -1), B(J("select", {
					"onUpdate:modelValue": n[11] ||= (e) => /* @__PURE__ */ L(a) ? a.value = e : null,
					class: "at-input at-input--sm"
				}, [(K(!0), q(G, null, H(z(wc), (e) => (K(), q("option", {
					key: e.value,
					value: e.value
				}, M(e.label), 9, Zc))), 128))], 512), [[Oo, z(a)]])])
			], 64))], 512), [[Wa, h.value]]),
			(K(), Xi(er, { to: "body" }, [B(J("div", {
				ref_key: "civarchiveBasePortalRef",
				ref: b,
				class: "browse-filters__dd-panel browse-filters__dd-panel--portal",
				style: ce(x.value),
				role: "listbox",
				onClick: n[14] ||= Po(() => {}, ["stop"])
			}, [B(J("input", {
				"onUpdate:modelValue": n[12] ||= (e) => v.value = e,
				type: "search",
				class: "at-input at-input--sm browse-filters__dd-filter",
				placeholder: "Filter list…",
				autocomplete: "off",
				onKeydown: n[13] ||= Io(Po((e) => _.value = !1, ["stop"]), ["escape"])
			}, null, 544), [[wo, v.value]]), J("div", Qc, [(K(!0), q(G, null, H(O.value, (e) => (K(), q("label", {
				key: e,
				class: "browse-filters__dd-item"
			}, [J("input", {
				type: "checkbox",
				checked: j(e),
				onChange: (t) => fe(e)
			}, null, 40, $c), J("span", null, M(e), 1)]))), 128)), O.value.length ? X("", !0) : (K(), q("p", el, "No matches"))])], 4), [[Wa, z(o) === "civarchive" && h.value && _.value]])])),
			(K(), Xi(er, { to: "body" }, [B(J("div", {
				ref_key: "civitaiBasePortalRef",
				ref: E,
				class: "browse-filters__dd-panel browse-filters__dd-panel--portal",
				style: ce(ee.value),
				role: "listbox",
				onClick: n[17] ||= Po(() => {}, ["stop"])
			}, [B(J("input", {
				"onUpdate:modelValue": n[15] ||= (e) => w.value = e,
				type: "search",
				class: "at-input at-input--sm browse-filters__dd-filter",
				placeholder: "Filter list…",
				autocomplete: "off",
				onKeydown: n[16] ||= Io(Po((e) => C.value = !1, ["stop"]), ["escape"])
			}, null, 544), [[wo, w.value]]), J("div", tl, [(K(!0), q(G, null, H(ne.value, (e) => (K(), q("label", {
				key: e,
				class: "browse-filters__dd-item"
			}, [J("input", {
				type: "checkbox",
				checked: de(e),
				onChange: (t) => ue(e)
			}, null, 40, nl), J("span", null, M(e), 1)]))), 128)), ne.value.length ? X("", !0) : (K(), q("p", rl, "No matches"))])], 4), [[Wa, z(o) === "civitai" && h.value && C.value]])]))
		]));
	}
}), sl = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, cl = /* @__PURE__ */ sl(ol, [["__scopeId", "data-v-0306e4d2"]]);
//#endregion
//#region src/utils/civitaiDisplay.ts
function ll(e) {
	let t = e.trim();
	return !t || t.startsWith("http://") || t.startsWith("https://") ? t : t.startsWith("//") ? `https:${t}` : t.startsWith("/") ? `https://civarchive.com${t}` : t;
}
function ul(e, t) {
	let n = (e ?? "").trim();
	return n ? t === "civarchive" ? ll(n) : pl(n) : "";
}
function dl(e) {
	let t = e.creator?.username;
	return t ? String(t) : e.creator_username ? String(e.creator_username) : null;
}
function fl(e) {
	let t = e.image_url;
	if (typeof t == "string" && t.trim()) return {
		url: t.trim(),
		type: "image"
	};
	let n = e.modelVersions;
	if (!n?.length) return null;
	for (let e of n) {
		let t = e.images;
		if (t?.length) {
			for (let e of t) if ((e.type || "image").toLowerCase() !== "video" && e.url) return e;
			if (t[0]?.url) return t[0];
		}
	}
	return null;
}
function pl(e) {
	let t = e.trim();
	return t || t;
}
//#endregion
//#region src/components/BrowseResultCard.vue?vue&type=script&setup=true&lang.ts
var ml = ["checked"], hl = { class: "result-card__thumb" }, gl = ["src"], _l = ["src", "alt"], vl = {
	key: 2,
	class: "result-card__video-badge"
}, yl = {
	key: 1,
	class: "result-card__placeholder"
}, bl = { class: "result-card__meta" }, xl = { class: "result-card__name" }, Sl = { class: "result-card__type" }, Cl = {
	key: 0,
	class: "result-card__creator"
}, wl = {
	key: 1,
	class: "result-card__stats"
}, Tl = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
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
		let s = Z(() => fl(n.item)), c = Z(() => (s.value?.type || "image").toLowerCase() === "video"), l = Z(() => s.value?.url ? ul(s.value.url, n.item.source) : "");
		function u(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function d(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		return (t, n) => (K(), q("div", {
			class: j(["result-card", {
				"result-card--batch": e.batchMode,
				"result-card--selected": e.batchSelected
			}]),
			onMouseenter: n[0] ||= (e) => c.value ? u(e) : void 0,
			onMouseleave: n[1] ||= (e) => c.value ? d(e) : void 0,
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
			}, null, 8, ml)])) : X("", !0),
			J("div", hl, [l.value ? (K(), q(G, { key: 0 }, [c.value ? (K(), q("video", {
				key: 0,
				class: "result-card__thumb-video",
				src: l.value,
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, gl)) : (K(), q("img", {
				key: 1,
				src: l.value,
				alt: e.item.name,
				loading: "lazy"
			}, null, 8, _l)), c.value ? (K(), q("span", vl, "Video")) : X("", !0)], 64)) : (K(), q("div", yl, "No preview"))]),
			J("div", bl, [
				J("span", xl, M(e.item.name), 1),
				J("span", Sl, M(e.item.type), 1),
				z(dl)(e.item) ? (K(), q("span", Cl, "by " + M(z(dl)(e.item)), 1)) : X("", !0),
				i(e.item) ? (K(), q("span", wl, M(i(e.item)), 1)) : X("", !0)
			])
		], 34));
	}
}), [["__scopeId", "data-v-8d944c04"]]), El = { class: "result-grid" }, Dl = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
	__name: "BrowseResultGrid",
	setup(e) {
		let t = pc(), { items: n, batchMode: r, batchIds: i } = Ss(t);
		return (e, a) => (K(), q("div", El, [(K(!0), q(G, null, H(z(n), (e) => (K(), Xi(Tl, {
			key: e.id,
			item: e,
			"batch-mode": z(r),
			"batch-selected": z(i).has(String(e.id)),
			onOpen: (n) => z(t).openResult(e),
			onToggleBatch: (n) => z(t).toggleBatchId(String(e.id))
		}, null, 8, [
			"item",
			"batch-mode",
			"batch-selected",
			"onOpen",
			"onToggleBatch"
		]))), 128))]));
	}
}), [["__scopeId", "data-v-86afd081"]]);
//#endregion
//#region src/utils/filterFamilyForModelType.ts
function Ol(e) {
	let t = (e ?? "").trim().toLowerCase();
	if (t === "checkpoint") return "checkpoint";
	if (t) return "lora";
}
//#endregion
//#region ../web_shared/ImageMetaLightbox.vue?vue&type=script&setup=true&lang.ts
var kl = ["src", "poster"], Al = ["src"], jl = {
	key: 2,
	class: "at-imlb__meta"
}, Ml = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
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
		let t = e, n = Z(() => (t.mediaType || "").toLowerCase() === "video" && !!t.playbackUrl), r = Z(() => !!(t.imageUrl || t.playbackUrl));
		return (t, i) => (K(), Xi(er, { to: "body" }, [r.value ? (K(), q("div", {
			key: 0,
			class: "at-imlb",
			onClick: i[2] ||= Po((e) => t.$emit("close"), ["self"])
		}, [J("div", {
			class: "at-imlb__inner",
			onClick: i[1] ||= Po((e) => t.$emit("close"), ["self"])
		}, [
			J("button", {
				type: "button",
				class: "at-imlb__x",
				onClick: i[0] ||= (e) => t.$emit("close")
			}, "×"),
			n.value ? (K(), q("video", {
				key: e.playbackUrl || "",
				class: "at-imlb__video",
				src: e.playbackUrl || void 0,
				poster: e.posterUrl || e.imageUrl || void 0,
				controls: "",
				playsinline: ""
			}, null, 8, kl)) : e.imageUrl ? (K(), q("img", {
				key: 1,
				src: e.imageUrl,
				alt: "Preview"
			}, null, 8, Al)) : X("", !0),
			e.meta && Object.keys(e.meta).length ? (K(), q("pre", jl, M(JSON.stringify(e.meta, null, 2)), 1)) : X("", !0)
		])])) : X("", !0)]));
	}
}), [["__scopeId", "data-v-76f82a61"]]);
//#endregion
//#region src/composables/useDownloadGate.ts
function Nl(e, t, n) {
	return `${e}|${t}|${n}`;
}
function Pl(e) {
	let t = e.split("|");
	if (t.length !== 3) return null;
	let n = Number(t[1]), r = Number(t[2]);
	return !Number.isFinite(n) || !Number.isFinite(r) ? null : {
		source: t[0],
		versionId: n,
		fileId: r
	};
}
function Fl(e) {
	let t = e.toLowerCase();
	return [
		"queued",
		"downloading",
		"verifying",
		"paused"
	].includes(t);
}
function Il(e, t) {
	let n = e, r = t === "version_id" ? "versionId" : "fileId", i = n[t] ?? n[r];
	if (i == null || i === "") return null;
	let a = Number(i);
	return Number.isFinite(a) ? a : null;
}
function Ll(e) {
	return e.trim().toLowerCase().replace(/^.*[/\\]/, "");
}
function Rl(e, t, n) {
	let r = Pl(t);
	if (!r || (e.source || "civitai").toLowerCase() !== r.source.toLowerCase()) return !1;
	let i = Il(e, "version_id"), a = Il(e, "file_id");
	if (i != null && a != null) return i === r.versionId && a === r.fileId;
	let o = n?.expectedBasename?.trim();
	return o && e.filename ? Ll(o) === Ll(e.filename) : !1;
}
function zl(e) {
	let t = /* @__PURE__ */ R(/* @__PURE__ */ new Set()), n = /* @__PURE__ */ R(/* @__PURE__ */ new Set()), r = /* @__PURE__ */ R(/* @__PURE__ */ new Map());
	async function i() {
		let n = e.effectiveSource.value, r = e.versions.value.filter((t) => e.hideEarlyAccess.value && t.isEarlyAccess ? !1 : !!t.files?.length).map((e) => {
			let t = e.files ?? [], r = t.findIndex((e) => e.primary), i = t[r >= 0 ? r : 0];
			return {
				source: n,
				version_id: e.id,
				file_id: i?.id ?? null
			};
		});
		if (!r.length) {
			t.value = /* @__PURE__ */ new Set();
			return;
		}
		try {
			let e = await Bs(r), i = /* @__PURE__ */ new Set();
			for (let t of e.present) {
				let e = r[t];
				e && i.add(`${n}:${e.version_id}`);
			}
			t.value = i;
		} catch {
			t.value = /* @__PURE__ */ new Set();
		}
	}
	V([
		e.effectiveSource,
		e.versions,
		e.hideEarlyAccess
	], () => {
		i();
	}, {
		deep: !0,
		immediate: !0
	}), V(() => e.tasks.value, (e) => {
		let t = new Set(n.value), i = new Map(r.value), a = !1;
		for (let n of t) {
			let r = i.get(n);
			e.some((e) => Rl(e, n, { expectedBasename: r }) && Fl(e.state)) && (t.delete(n), i.delete(n), a = !0);
		}
		a && (n.value = t, r.value = i);
	}, { deep: !0 });
	let a = Z(() => {
		let t = e.pickVersionAndFileIds();
		return t ? Nl(e.effectiveSource.value, t.versionId, t.fileId) : null;
	}), o = Z(() => {
		let n = e.pickVersionAndFileIds();
		if (!n) return !1;
		let r = e.effectiveSource.value, i = n.versionId;
		return t.value.has(`${r}:${i}`) || t.value.has(`${r}:${String(i)}`);
	}), s = Z(() => {
		let t = e.pickVersionAndFileIds(), n = a.value;
		return !n || !t ? !1 : e.tasks.value.some((e) => Rl(e, n, { expectedBasename: t.basename }) && Fl(e.state));
	}), c = Z(() => {
		let e = a.value;
		return e ? n.value.has(e) : !1;
	}), l = Z(() => o.value || s.value || c.value), u = Z(() => o.value ? "Already in library" : s.value ? "Already in queue" : c.value ? "Queued — refreshing…" : "");
	function d() {
		let t = a.value, i = e.pickVersionAndFileIds();
		if (!t || !i) return;
		let o = new Set(n.value);
		o.add(t), n.value = o;
		let s = new Map(r.value);
		s.set(t, i.basename), r.value = s;
	}
	function f() {
		let e = a.value;
		if (!e) return;
		let t = new Set(n.value);
		t.delete(e), n.value = t;
		let i = new Map(r.value);
		i.delete(e), r.value = i;
	}
	return {
		libraryPresent: t,
		refreshLibraryPresence: i,
		downloadDisabled: l,
		downloadDisabledTitle: u,
		markJustQueued: d,
		clearJustQueued: f,
		newVersionCountForAll: Z(() => {
			let n = e.effectiveSource.value, r = 0;
			for (let i of e.versions.value) e.hideEarlyAccess.value && i.isEarlyAccess || i.files?.length && (t.value.has(`${n}:${i.id}`) || (r += 1));
			return r;
		})
	};
}
//#endregion
//#region src/components/BrowseModelDetail.vue?vue&type=script&setup=true&lang.ts
var Bl = { class: "model-detail" }, Vl = { class: "model-detail__hdr" }, Hl = { class: "model-detail__sub" }, Ul = { class: "pill" }, Wl = { key: 0 }, Gl = { key: 1 }, Kl = {
	key: 0,
	class: "model-detail__controls"
}, ql = { class: "at-label" }, Jl = ["value"], Yl = {
	key: 0,
	class: "at-label"
}, Xl = ["value"], Zl = {
	key: 1,
	class: "at-label"
}, Ql = ["value"], $l = {
	key: 1,
	class: "model-detail__desc"
}, eu = ["innerHTML"], tu = {
	key: 2,
	class: "model-detail__tw"
}, nu = { class: "model-detail__tw-row" }, ru = { class: "model-detail__tw-text" }, iu = {
	key: 3,
	class: "model-detail__gallery"
}, au = { class: "model-detail__thumbs" }, ou = [
	"onMouseenter",
	"onMouseleave",
	"onClick"
], su = ["src"], cu = ["src", "alt"], lu = { class: "model-detail__dl" }, uu = { class: "at-label" }, du = {
	key: 0,
	class: "model-detail__cats-hint"
}, fu = ["list"], pu = ["id"], mu = ["value"], hu = { class: "model-detail__dup" }, gu = {
	key: 0,
	class: "model-detail__ea-dl-msg",
	role: "status"
}, _u = { class: "model-detail__dl-btns" }, vu = ["disabled", "title"], yu = ["title"], bu = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
	__name: "BrowseModelDetail",
	props: { model: {} },
	emits: [
		"close",
		"downloaded",
		"error"
	],
	setup(e, { emit: t }) {
		let n = e;
		function r(e, t) {
			if (!t) return 0;
			let n = e.findIndex((e) => !e.isEarlyAccess);
			return n >= 0 ? n : 0;
		}
		function i(e) {
			let t = e.name?.trim() || `v${e.id}`;
			return e.isEarlyAccess ? `${t} (ea.)` : t;
		}
		function a(e) {
			return e == null || !Number.isFinite(e) || e < 0 ? "" : e >= 1048576 ? `${(e / 1048576).toFixed(1)} GB` : e >= 1024 ? `${(e / 1024).toFixed(1)} MB` : `${Math.round(e)} KB`;
		}
		function o(e) {
			let t = e.metadata, n = t && typeof t == "object" && "size" in t ? t.size : null, r = t && typeof t == "object" && "fp" in t ? t.fp : null, i = typeof n == "string" ? n.trim().toLowerCase() : "", a = typeof r == "string" ? r.trim() : "", o = e.type?.trim() || "";
			return i === "pruned" ? a ? `Pruned Model · ${a}` : "Pruned Model" : i === "full" ? a ? `Full Model · ${a}` : "Full Model" : o || "Model";
		}
		function s(e) {
			let t = `${e.name?.trim() || `file #${e.id}`} (${o(e)})`, n = a(e.sizeKB);
			return n && (t = `${t} · ${n}`), e.primary && (t = `${t} *`), t;
		}
		let c = t, { category: l, duplicateResolution: u, hideEarlyAccessFromConfig: d } = Ss(pc()), { tasks: f } = Ss(yc()), p = /* @__PURE__ */ R(0), m = /* @__PURE__ */ R(0), h = /* @__PURE__ */ R(!1), g = /* @__PURE__ */ R(""), _ = /* @__PURE__ */ R(null), v = /* @__PURE__ */ R(null), y = /* @__PURE__ */ R(null), b = /* @__PURE__ */ R(null), x = /* @__PURE__ */ R(null), S = Z(() => n.model.modelVersions ?? []), C = Z(() => {
			let e = d.value;
			return S.value.filter((t) => e && t.isEarlyAccess ? !1 : !!t.files?.length).length;
		});
		V(() => [n.model.id, d.value], () => {
			p.value = r(n.model.modelVersions ?? [], d.value), m.value = 0, g.value = "", h.value = !1, _.value = null, v.value = null, y.value = null, b.value = null, x.value = null;
		});
		let w = Z(() => S.value[p.value] ?? null), T = Z(() => d.value && !!w.value?.isEarlyAccess), E = Z(() => w.value?.files ?? []), ee = Z(() => {
			if (n.model.source !== "civarchive") return [];
			let e = E.value, t = e[m.value] ?? e[0];
			if (!t) return [];
			let r = [{
				value: "",
				label: "Auto (worker order)"
			}], i = /* @__PURE__ */ new Set(), a = (e, t) => {
				!e || i.has(e) || (i.add(e), r.push({
					value: e,
					label: t
				}));
			}, o = ll(t.downloadUrl ? String(t.downloadUrl) : "");
			o && a(o, "Primary URL");
			for (let e of t.mirrors ?? []) {
				let t = ll(e.url ? String(e.url) : "");
				t && a(t, `${(e.source ?? "").trim() || "mirror"}: ${t.length > 56 ? `${t.slice(0, 56)}…` : t}`);
			}
			return r;
		});
		V(w, (e) => {
			if (m.value = 0, g.value = "", e?.files?.length) {
				let t = e.files.findIndex((e) => e.primary);
				t >= 0 && (m.value = t);
			}
		}), V(m, () => {
			g.value = "";
		});
		let D = Z(() => w.value?.images ?? []), te = /* @__PURE__ */ R([]), O = /* @__PURE__ */ R(!1), ne = Z(() => `at-browse-cats-${n.model.id}`);
		V(() => [n.model.id, n.model.type], async ([, e]) => {
			O.value = !0;
			try {
				let t = Ol(e);
				te.value = (await Ls(t ? { family: t } : {})).categories ?? [];
			} catch {
				te.value = [];
			} finally {
				O.value = !1;
			}
		}, { immediate: !0 });
		let re = Z(() => {
			let e = w.value?.trainedWords;
			return Array.isArray(e) ? e : [];
		});
		async function k(e) {
			try {
				await navigator.clipboard.writeText(e);
			} catch {
				c("error", "Copy failed");
			}
		}
		function ie() {
			let e = w.value, t = E.value;
			if (!e || !t.length) return null;
			let n = t[m.value] ?? t[0];
			if (!n?.id) return null;
			let r = (n.name?.trim() || `file_${n.id}`).trim();
			return {
				versionId: e.id,
				fileId: n.id,
				basename: r
			};
		}
		let { downloadDisabled: A, downloadDisabledTitle: ae, markJustQueued: oe, clearJustQueued: se, newVersionCountForAll: ce } = zl({
			effectiveSource: Z(() => n.model.source === "civarchive" ? "civarchive" : "civitai"),
			versions: S,
			hideEarlyAccess: d,
			tasks: f,
			pickVersionAndFileIds: ie
		});
		async function le() {
			if (T.value) return;
			let e = ie();
			if (!e) {
				c("error", "No file on this version");
				return;
			}
			oe();
			try {
				if (n.model.source === "civarchive") {
					let t = {
						source: "civarchive",
						civarchive_model_id: typeof n.model.id == "number" ? n.model.id : Number(n.model.id),
						civarchive_version_id: e.versionId,
						civarchive_file_id: e.fileId,
						category: l.value.trim() || "General",
						duplicate_resolution: u.value
					}, r = g.value.trim();
					r && (t.civarchive_preferred_download_url = r), await Rs(t);
				} else await Rs({
					civitai_model_id: n.model.id,
					version_id: e.versionId,
					file_id: e.fileId,
					category: l.value.trim() || "General",
					duplicate_resolution: u.value
				});
				c("downloaded", { count: 1 });
			} catch (e) {
				se(), c("error", e instanceof Error ? e.message : "Download failed");
			}
		}
		async function ue() {
			let e = [], t = d.value;
			for (let r of S.value) {
				if (t && r.isEarlyAccess) continue;
				let i = r.files ?? [];
				if (!i.length) continue;
				let a = i.findIndex((e) => e.primary), o = i[a >= 0 ? a : 0];
				if (o?.id) if (n.model.source === "civarchive") {
					let t = typeof n.model.id == "number" ? n.model.id : Number(n.model.id);
					e.push({
						source: "civarchive",
						civarchive_model_id: t,
						civarchive_version_id: r.id,
						civarchive_file_id: o.id,
						category: l.value.trim() || "General"
					});
				} else e.push({
					civitai_model_id: n.model.id,
					version_id: r.id,
					file_id: o.id,
					category: l.value.trim() || "General"
				});
			}
			if (!e.length) {
				c("error", "No downloadable files");
				return;
			}
			try {
				await zs(e, u.value), c("downloaded", { count: e.length });
			} catch (e) {
				c("error", e instanceof Error ? e.message : "Batch download failed");
			}
		}
		function de(e) {
			let t = (e.type || "image").toLowerCase();
			b.value = t;
			let r = ul(e.url, n.model.source);
			t === "video" ? (v.value = r, y.value = null, _.value = null) : (v.value = null, y.value = null, _.value = r);
			let i = e.meta;
			x.value = i && typeof i == "object" && Object.keys(i).length ? i : null;
		}
		function fe(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function pe(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		function me() {
			_.value = null, v.value = null, y.value = null, b.value = null, x.value = null;
		}
		let he = Z(() => n.model.description?.trim() || "");
		return (t, n) => (K(), q("div", Bl, [
			J("div", Vl, [J("h3", null, M(e.model.name), 1), J("button", {
				type: "button",
				class: "at-btn",
				onClick: n[0] ||= (e) => c("close")
			}, "Close")]),
			J("p", Hl, [
				J("span", Ul, M(e.model.type), 1),
				z(dl)(e.model) ? (K(), q("span", Wl, " · " + M(z(dl)(e.model)), 1)) : X("", !0),
				w.value?.baseModel ? (K(), q("span", Gl, " · " + M(w.value.baseModel), 1)) : X("", !0)
			]),
			S.value.length ? (K(), q("div", Kl, [
				J("label", ql, [n[9] ||= Y(" Version ", -1), B(J("select", {
					"onUpdate:modelValue": n[1] ||= (e) => p.value = e,
					class: "at-input"
				}, [(K(!0), q(G, null, H(S.value, (e, t) => (K(), q("option", {
					key: e.id,
					value: t
				}, M(i(e)), 9, Jl))), 128))], 512), [[
					Oo,
					p.value,
					void 0,
					{ number: !0 }
				]])]),
				E.value.length > 1 ? (K(), q("label", Yl, [n[10] ||= Y(" File ", -1), B(J("select", {
					"onUpdate:modelValue": n[2] ||= (e) => m.value = e,
					class: "at-input"
				}, [(K(!0), q(G, null, H(E.value, (e, t) => (K(), q("option", {
					key: e.id,
					value: t
				}, M(s(e)), 9, Xl))), 128))], 512), [[
					Oo,
					m.value,
					void 0,
					{ number: !0 }
				]])])) : X("", !0),
				e.model.source === "civarchive" && ee.value.length > 1 ? (K(), q("label", Zl, [n[11] ||= Y(" Download mirror ", -1), B(J("select", {
					"onUpdate:modelValue": n[3] ||= (e) => g.value = e,
					class: "at-input"
				}, [(K(!0), q(G, null, H(ee.value, (e) => (K(), q("option", {
					key: e.value || "auto",
					value: e.value
				}, M(e.label), 9, Ql))), 128))], 512), [[Oo, g.value]])])) : X("", !0)
			])) : X("", !0),
			he.value ? (K(), q("div", $l, [J("div", {
				class: j(["model-detail__desc-inner", { "model-detail__desc-inner--collapsed": !h.value && he.value.length > 400 }]),
				innerHTML: he.value
			}, null, 10, eu), he.value.length > 400 ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-btn at-btn--link",
				onClick: n[4] ||= (e) => h.value = !h.value
			}, M(h.value ? "Show less" : "Show more"), 1)) : X("", !0)])) : X("", !0),
			re.value.length ? (K(), q("div", tu, [n[12] ||= J("span", { class: "model-detail__tw-label" }, "Trigger words", -1), J("div", nu, [J("code", ru, M(re.value.join(", ")), 1), J("button", {
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: n[5] ||= (e) => k(re.value.join(", "))
			}, "Copy")])])) : X("", !0),
			D.value.length ? (K(), q("div", iu, [n[14] ||= J("span", { class: "model-detail__tw-label" }, "Gallery", -1), J("div", au, [(K(!0), q(G, null, H(D.value, (t, r) => (K(), q("button", {
				key: r,
				type: "button",
				class: "model-detail__thumb",
				onMouseenter: (e) => (t.type || "image").toLowerCase() === "video" ? fe(e) : void 0,
				onMouseleave: (e) => (t.type || "image").toLowerCase() === "video" ? pe(e) : void 0,
				onClick: (e) => de(t)
			}, [(t.type || "image").toLowerCase() === "video" ? (K(), q(G, { key: 0 }, [J("video", {
				class: "model-detail__thumb-vid",
				src: z(ul)(t.url, e.model.source),
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, su), n[13] ||= J("span", { class: "model-detail__vid" }, "Video", -1)], 64)) : (K(), q("img", {
				key: 1,
				src: z(ul)(t.url, e.model.source),
				alt: `Image ${r}`,
				loading: "lazy"
			}, null, 8, cu))], 40, ou))), 128))])])) : X("", !0),
			J("div", lu, [
				J("label", uu, [
					n[15] ||= Y(" Category folder ", -1),
					O.value ? (K(), q("span", du, "Loading folders…")) : X("", !0),
					B(J("input", {
						"onUpdate:modelValue": n[6] ||= (e) => /* @__PURE__ */ L(l) ? l.value = e : null,
						class: "at-input model-detail__category-combo",
						list: ne.value,
						placeholder: "Pick from list or type a folder name (e.g. General)",
						autocomplete: "off",
						"aria-autocomplete": "list"
					}, null, 8, fu), [[wo, z(l)]]),
					J("datalist", { id: ne.value }, [(K(!0), q(G, null, H(te.value, (e) => (K(), q("option", {
						key: "dl-" + e,
						value: e
					}, null, 8, mu))), 128))], 8, pu)
				]),
				J("fieldset", hu, [
					n[18] ||= J("legend", null, "Duplicate file", -1),
					J("label", null, [B(J("input", {
						"onUpdate:modelValue": n[7] ||= (e) => /* @__PURE__ */ L(u) ? u.value = e : null,
						type: "radio",
						value: "skip"
					}, null, 512), [[Do, z(u)]]), n[16] ||= Y(" Skip if exists", -1)]),
					J("label", null, [B(J("input", {
						"onUpdate:modelValue": n[8] ||= (e) => /* @__PURE__ */ L(u) ? u.value = e : null,
						type: "radio",
						value: "replace"
					}, null, 512), [[Do, z(u)]]), n[17] ||= Y(" Replace", -1)])
				]),
				T.value ? (K(), q("p", gu, " Early-access version — not downloadable here. ")) : X("", !0),
				J("div", _u, [T.value ? X("", !0) : (K(), q("button", {
					key: 0,
					type: "button",
					class: "at-btn",
					disabled: z(A),
					title: z(A) ? z(ae) : "",
					onClick: le
				}, " Download ", 8, vu)), C.value > 1 ? (K(), q("button", {
					key: 1,
					type: "button",
					class: "at-btn",
					title: `Queues one file per version; about ${z(ce)} not already in the library (duplicates may be skipped by the server)`,
					onClick: ue
				}, " Download all versions ", 8, yu)) : X("", !0)])
			]),
			ta(Ml, {
				"image-url": _.value,
				"playback-url": v.value,
				"poster-url": y.value,
				"media-type": b.value,
				meta: x.value,
				onClose: me
			}, null, 8, [
				"image-url",
				"playback-url",
				"poster-url",
				"media-type",
				"meta"
			])
		]));
	}
}), [["__scopeId", "data-v-0f1354b8"]]), xu = { class: "browse-detail-host" }, Su = {
	key: 0,
	class: "browse-detail-host__extra"
}, Cu = { class: "browse-detail-host__sha" }, wu = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
	__name: "BrowseDetailHost",
	props: { model: {} },
	emits: [
		"close",
		"downloaded",
		"error"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		return (e, t) => (K(), q("div", xu, [ta(bu, {
			model: n.model,
			onClose: t[0] ||= (e) => r("close"),
			onDownloaded: t[1] ||= (e) => r("downloaded", e),
			onError: t[2] ||= (e) => r("error", e)
		}, null, 8, ["model"]), n.model.source === "civarchive" && n.model.sourceSections?.sha256 ? (K(), q("section", Su, [J("p", Cu, [t[3] ||= J("span", { class: "browse-detail-host__sha-label" }, "SHA256 (primary file)", -1), J("code", null, M(n.model.sourceSections.sha256), 1)]), t[4] ||= J("p", { class: "browse-detail-host__hint" }, "Pick a mirror in the detail form above; the worker still tries fallbacks if the preferred URL fails.", -1)])) : X("", !0)]));
	}
}), [["__scopeId", "data-v-96110710"]]), Tu = { class: "config-panel" }, Eu = {
	key: 0,
	class: "at-err"
}, Du = {
	key: 1,
	class: "at-muted"
}, Ou = { class: "at-label" }, ku = { class: "at-label" }, Au = ["placeholder"], ju = { class: "at-label at-label--row" }, Mu = { class: "at-label" }, Nu = { class: "at-label" }, Pu = { class: "at-label at-label--row" }, Fu = { class: "at-label" }, Iu = { class: "at-label" }, Lu = { class: "at-label" }, Ru = { class: "at-label at-label--row" }, zu = { class: "at-label at-label--row" }, Bu = { class: "at-label at-label--row" }, Vu = { class: "at-label at-label--row" }, Hu = { class: "config-panel__actions" }, Uu = ["disabled"], Wu = { class: "config-panel__status" }, Gu = { class: "config-panel__pre" }, Ku = { class: "config-panel__pre" }, qu = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
	__name: "ConfigPanel",
	setup(e) {
		let t = pc(), n = /* @__PURE__ */ R(!1), r = /* @__PURE__ */ R(null), i = /* @__PURE__ */ R(null), a = /* @__PURE__ */ R(Es()), o = /* @__PURE__ */ R(""), s = /* @__PURE__ */ R(null), c = /* @__PURE__ */ R(null), l = null;
		async function u() {
			n.value = !0, r.value = null;
			try {
				i.value = await ec(), i.value && (typeof i.value.download_example_videos != "boolean" && (i.value.download_example_videos = !1), typeof i.value.generate_video_posters != "boolean" && (i.value.generate_video_posters = !0), typeof i.value.enrichment_civarchive_fallback != "boolean" && (i.value.enrichment_civarchive_fallback = !0), (typeof i.value.max_example_images != "number" || !Number.isFinite(i.value.max_example_images)) && (i.value.max_example_images = 20)), a.value = Es(), o.value = "", t.hideNsfwFromConfig = !!i.value?.hide_nsfw, t.hideEarlyAccessFromConfig = i.value?.hide_early_access !== !1, s.value = await rc(), c.value = await ac();
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
						max_example_images: i.value.max_example_images,
						max_parallel_downloads: i.value.max_parallel_downloads,
						download_subpath_template: i.value.download_subpath_template,
						hide_early_access: i.value.hide_early_access,
						hide_nsfw: i.value.hide_nsfw,
						download_example_videos: i.value.download_example_videos,
						generate_video_posters: i.value.generate_video_posters,
						enrichment_civarchive_fallback: i.value.enrichment_civarchive_fallback
					};
					o.value.trim() && (e.civitai_api_key = o.value.trim()), i.value = await tc(e), o.value = "", t.hideNsfwFromConfig = !!i.value?.hide_nsfw, t.hideEarlyAccessFromConfig = i.value?.hide_early_access !== !1;
				} catch (e) {
					r.value = e instanceof Error ? e.message : "Save failed";
				} finally {
					n.value = !1;
				}
			}
		}
		async function p() {
			try {
				await nc(), s.value = await rc();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Scan failed";
			}
		}
		async function m() {
			try {
				await ic(), c.value = await ac();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Enrich failed";
			}
		}
		async function h() {
			if (confirm("Clear the CivArchive base model list learned from search? The dropdown will fall back to defaults until new searches add names again.")) try {
				await Ns();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Reset failed";
			}
		}
		async function g() {
			if (confirm("Clear the Civitai base model list learned from browse? The dropdown will fall back to defaults until new searches add names again.")) try {
				await Fs();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Reset failed";
			}
		}
		async function _() {
			try {
				s.value = await rc(), c.value = await ac();
			} catch {}
		}
		return br(() => {
			u(), l = setInterval(() => void _(), 4e3);
		}), wr(() => {
			l && clearInterval(l);
		}), (e, t) => (K(), q("div", Tu, [
			r.value ? (K(), q("p", Eu, M(r.value), 1)) : X("", !0),
			n.value && !i.value ? (K(), q("p", Du, "Loading…")) : X("", !0),
			i.value ? (K(), q(G, { key: 2 }, [
				J("label", Ou, [t[13] ||= Y(" Server URL ", -1), B(J("input", {
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					class: "at-input",
					type: "url",
					autocomplete: "off"
				}, null, 512), [[wo, a.value]])]),
				t[29] ||= J("p", { class: "at-hint" }, [Y(" Default: "), J("code", null, "http://127.0.0.1:8188")], -1),
				J("button", {
					type: "button",
					class: "at-btn at-btn--ghost",
					onClick: d
				}, "Apply server URL"),
				J("label", ku, [t[14] ||= Y(" Civitai API key ", -1), B(J("input", {
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					class: "at-input",
					type: "password",
					autocomplete: "off",
					placeholder: i.value.civitai_api_key_set ? "(unchanged — enter new key to replace)" : "Optional"
				}, null, 8, Au), [[wo, o.value]])]),
				J("label", ju, [B(J("input", {
					"onUpdate:modelValue": t[2] ||= (e) => i.value.scan_on_startup = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.scan_on_startup]]), t[15] ||= Y(" Scan library on startup ", -1)]),
				J("label", Mu, [t[17] ||= Y(" Enrichment mode ", -1), B(J("select", {
					"onUpdate:modelValue": t[3] ||= (e) => i.value.enrichment_mode = e,
					class: "at-input"
				}, [...t[16] ||= [
					J("option", { value: "auto" }, "Auto (during scan)", -1),
					J("option", { value: "background" }, "Background (after scan)", -1),
					J("option", { value: "manual" }, "Manual only", -1)
				]], 512), [[Oo, i.value.enrichment_mode]])]),
				J("label", Nu, [t[18] ||= Y(" Enrichment rate limit (ms) ", -1), B(J("input", {
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
				J("label", Pu, [B(J("input", {
					"onUpdate:modelValue": t[5] ||= (e) => i.value.enrichment_civarchive_fallback = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.enrichment_civarchive_fallback]]), t[19] ||= Y(" When Civitai hash lookup misses, try CivArchive (SHA index) ", -1)]),
				J("label", Fu, [t[20] ||= Y(" Max example images per asset ", -1), B(J("input", {
					"onUpdate:modelValue": t[6] ||= (e) => i.value.max_example_images = e,
					class: "at-input",
					type: "number",
					min: "1",
					max: "200",
					step: "1"
				}, null, 512), [[
					wo,
					i.value.max_example_images,
					void 0,
					{ number: !0 }
				]])]),
				t[30] ||= J("p", { class: "at-hint" }, " Gallery stills (and video slots) to download during enrichment or after a Civitai download. Range 1–200. ", -1),
				J("label", Iu, [t[21] ||= Y(" Max parallel downloads ", -1), B(J("input", {
					"onUpdate:modelValue": t[7] ||= (e) => i.value.max_parallel_downloads = e,
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
				J("label", Lu, [t[22] ||= Y(" Download subpath template ", -1), B(J("input", {
					"onUpdate:modelValue": t[8] ||= (e) => i.value.download_subpath_template = e,
					class: "at-input",
					placeholder: "{category}"
				}, null, 512), [[wo, i.value.download_subpath_template]])]),
				J("label", Ru, [B(J("input", {
					"onUpdate:modelValue": t[9] ||= (e) => i.value.hide_early_access = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.hide_early_access]]), t[23] ||= Y(" Skip early-access downloads (Civitai) ", -1)]),
				J("label", zu, [B(J("input", {
					"onUpdate:modelValue": t[10] ||= (e) => i.value.hide_nsfw = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.hide_nsfw]]), t[24] ||= Y(" Hide NSFW from Civitai (browse search, detail, and related API calls) ", -1)]),
				t[31] ||= J("p", { class: "at-hint" }, [
					Y(" Browse accumulates "),
					J("strong", null, "base model"),
					Y(" strings from Civitai / CivArchive search results into SQLite. Use reset if a dropdown grows stale. ")
				], -1),
				J("button", {
					type: "button",
					class: "at-btn at-btn--ghost",
					onClick: h
				}, " Reset CivArchive base model list "),
				J("button", {
					type: "button",
					class: "at-btn at-btn--ghost",
					onClick: g
				}, " Reset Civitai base model list "),
				J("label", Bu, [B(J("input", {
					"onUpdate:modelValue": t[11] ||= (e) => i.value.download_example_videos = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.download_example_videos]]), t[25] ||= Y(" Download gallery video samples during enrichment (uses more disk; enables offline video in sidebars) ", -1)]),
				J("label", Vu, [B(J("input", {
					"onUpdate:modelValue": t[12] ||= (e) => i.value.generate_video_posters = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.generate_video_posters]]), t[26] ||= Y(" Generate JPEG poster frames for video samples (uses ffmpeg when available; still images work without it) ", -1)]),
				J("div", Hu, [
					J("button", {
						type: "button",
						class: "at-btn",
						disabled: n.value,
						onClick: f
					}, "Save settings", 8, Uu),
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
				J("div", Wu, [
					t[27] ||= J("h4", null, "Scan", -1),
					J("pre", Gu, M(JSON.stringify(s.value, null, 2)), 1),
					t[28] ||= J("h4", null, "Enrichment", -1),
					J("pre", Ku, M(JSON.stringify(c.value, null, 2)), 1)
				])
			], 64)) : X("", !0)
		]));
	}
}), [["__scopeId", "data-v-49817112"]]), Ju = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB"
];
function Yu(e) {
	if (e == null || !Number.isFinite(e) || e < 0) return "";
	if (e === 0) return "0 B";
	let t = e, n = 0;
	for (; t >= 1024 && n < Ju.length - 1;) t /= 1024, n += 1;
	return `${t >= 10 || n === 0 ? Math.round(t).toString() : t.toFixed(1)} ${Ju[n]}`;
}
function Xu(e) {
	if (e == null || !Number.isFinite(e) || e <= 0) return "";
	let t = Yu(e);
	return t ? `${t}/s` : "";
}
function Zu(e, t, n, r) {
	let i = String(e || "").toLowerCase(), a = n != null && n > 0, o = Yu(t), s = a ? Yu(n) : "", c = i === "downloading" ? Xu(r) : "";
	if (!a && (!Number.isFinite(t) || t <= 0)) return "";
	if (i === "completed" && a) return s;
	if (!a) return o;
	let l = `${o} / ${s}`;
	return i === "downloading" && c ? `${l} · ${c}` : l;
}
//#endregion
//#region src/components/DownloadsTab.vue?vue&type=script&setup=true&lang.ts
var Qu = { class: "at-downloads-tab" }, $u = {
	key: 0,
	class: "at-err"
}, ed = {
	key: 1,
	class: "at-dl-bulk"
}, td = { class: "at-dl-list" }, nd = { class: "at-dl__row" }, rd = ["src"], id = { class: "at-dl__main" }, ad = { class: "at-dl__title" }, od = {
	key: 0,
	class: "at-dl__meter"
}, sd = {
	key: 1,
	class: "at-dl__err"
}, cd = {
	key: 2,
	class: "at-dl__bar"
}, ld = { class: "at-dl__actions" }, ud = ["onClick"], dd = ["onClick"], fd = ["onClick"], pd = ["onClick"], md = ["onClick"], hd = ["aria-expanded", "onClick"], gd = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
	__name: "DownloadsTab",
	setup(e) {
		let t = yc(), { tasks: n, error: r, numBulkPause: i, numPaused: a, numFailed: o, numCompleted: s, numTerminal: c } = Ss(t);
		function l(e) {
			t.$patch({ error: e });
		}
		function u(e) {
			return String(e || "").toLowerCase();
		}
		function d(e) {
			let t = u(e);
			return t === "queued" || t === "downloading" || t === "verifying";
		}
		function f(e) {
			return u(e) === "paused";
		}
		function p(e) {
			let t = u(e);
			return t === "failed" || t === "cancelled";
		}
		function m(e) {
			return [
				"completed",
				"failed",
				"cancelled",
				"skipped"
			].includes(u(e));
		}
		function h(e) {
			return u(e) === "completed" || u(e) === "skipped";
		}
		function g(e) {
			return u(e) === "queued";
		}
		function _(e) {
			let t = u(e.state);
			return t === "queued" || t === "downloading" || t === "verifying" || t === "paused" || t === "failed" || t === "cancelled";
		}
		function v(e) {
			let t = u(e.state);
			return t === "queued" || t === "downloading" || t === "verifying";
		}
		function y(e) {
			return Zu(e.state, e.bytes_done, e.total_bytes, e.rate_bps ?? null);
		}
		let b = /* @__PURE__ */ R(null), x = /* @__PURE__ */ R({
			top: "0px",
			left: "0px",
			minWidth: "168px"
		}), S = /* @__PURE__ */ R(null), C = Z(() => n.value.find((e) => e.id === b.value) ?? null);
		function w() {
			b.value = null;
		}
		function T(e, t) {
			if (t.preventDefault(), t.stopPropagation(), b.value === e.id) {
				b.value = null;
				return;
			}
			let n = t.currentTarget.getBoundingClientRect(), r = Math.min(window.innerWidth - 168 - 8, Math.max(8, n.right - 168));
			x.value = {
				top: `${n.bottom + 4}px`,
				left: `${r}px`,
				minWidth: "168px"
			}, b.value = e.id;
		}
		function E(e) {
			if (!b.value) return;
			let t = e.target;
			S.value?.contains(t) || e.target?.closest?.(".at-dl-menu-trigger") || w();
		}
		function ee(e) {
			e.key === "Escape" && b.value && w();
		}
		V(b, (e) => {
			document.removeEventListener("mousedown", E, !0), document.removeEventListener("keydown", ee), window.removeEventListener("resize", w), window.removeEventListener("scroll", w, !0), e && (document.addEventListener("mousedown", E, !0), document.addEventListener("keydown", ee), window.addEventListener("resize", w), window.addEventListener("scroll", w, !0));
		}), wr(() => {
			document.removeEventListener("mousedown", E, !0), document.removeEventListener("keydown", ee), window.removeEventListener("resize", w), window.removeEventListener("scroll", w, !0);
		});
		async function D(e) {
			try {
				await Gs(e), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Pause failed");
			}
		}
		async function te(e) {
			try {
				await qs(e), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Resume failed");
			}
		}
		async function O(e) {
			try {
				await Us(e), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Cancel failed");
			}
		}
		async function ne(e) {
			try {
				await Ws(e), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Retry failed");
			}
		}
		async function re(e) {
			try {
				await Ks(e), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Clear failed");
			}
		}
		async function k(e) {
			try {
				await Js(e), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Move failed");
			}
		}
		async function ie(e) {
			w(), await O(e.id);
		}
		async function A(e) {
			w(), await k(e.id);
		}
		async function ae(e) {
			w(), await re(e.id);
		}
		async function oe() {
			try {
				await Ys(), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Bulk pause failed");
			}
		}
		async function se() {
			try {
				await Xs(), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Bulk resume failed");
			}
		}
		async function le() {
			try {
				await Zs(), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Bulk retry failed");
			}
		}
		async function ue() {
			try {
				await Qs(), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Clear finished failed");
			}
		}
		async function de() {
			try {
				await $s(), t.refresh();
			} catch (e) {
				l(e instanceof Error ? e.message : "Clear inactive failed");
			}
		}
		return (e, t) => (K(), q("div", Qu, [
			z(r) ? (K(), q("p", $u, M(z(r)), 1)) : X("", !0),
			z(i) + z(a) + z(o) + z(s) + z(c) > 0 ? (K(), q("div", ed, [
				z(i) > 0 ? (K(), q("button", {
					key: 0,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: oe
				}, "Pause all")) : X("", !0),
				z(a) > 0 ? (K(), q("button", {
					key: 1,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: se
				}, "Resume all")) : X("", !0),
				z(o) > 0 ? (K(), q("button", {
					key: 2,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: le
				}, "Retry all failed")) : X("", !0),
				z(s) > 0 ? (K(), q("button", {
					key: 3,
					type: "button",
					class: "at-btn at-btn--sm",
					title: "Remove completed downloads from the list only",
					onClick: ue
				}, " Clear finished ")) : X("", !0),
				z(c) > 0 ? (K(), q("button", {
					key: 4,
					type: "button",
					class: "at-btn at-btn--sm",
					title: "Remove completed, failed, cancelled, and skipped rows from the list",
					onClick: de
				}, " Clear inactive ")) : X("", !0)
			])) : X("", !0),
			J("ul", td, [(K(!0), q(G, null, H(z(n), (e) => (K(), q("li", {
				key: e.id,
				class: "at-dl"
			}, [J("div", nd, [oc(e.cover_thumb_url) ? (K(), q("img", {
				key: 0,
				class: "at-dl__thumb",
				src: oc(e.cover_thumb_url),
				alt: ""
			}, null, 8, rd)) : X("", !0), J("div", id, [
				J("div", ad, M(e.display_name || e.filename) + " — " + M(e.state), 1),
				y(e) ? (K(), q("div", od, M(y(e)), 1)) : X("", !0),
				e.error_message ? (K(), q("div", sd, M(e.error_message), 1)) : X("", !0),
				e.total_bytes || e.bytes_done ? (K(), q("div", cd, [J("div", {
					class: "at-dl__fill",
					style: ce({ width: `${Math.min(100, Math.round(100 * e.bytes_done / (e.total_bytes || 1)))}%` })
				}, null, 4)])) : X("", !0)
			])]), J("div", ld, [
				d(e.state) ? (K(), q("button", {
					key: 0,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: (t) => D(e.id)
				}, "Pause", 8, ud)) : X("", !0),
				g(e.state) ? (K(), q("button", {
					key: 1,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: (t) => k(e.id)
				}, " Move to top ", 8, dd)) : X("", !0),
				f(e.state) ? (K(), q("button", {
					key: 2,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: (t) => te(e.id)
				}, "Resume", 8, fd)) : X("", !0),
				p(e.state) ? (K(), q("button", {
					key: 3,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: (t) => ne(e.id)
				}, "Retry", 8, pd)) : X("", !0),
				m(e.state) && h(e.state) ? (K(), q("button", {
					key: 4,
					type: "button",
					class: "at-btn at-btn--sm",
					onClick: (t) => re(e.id)
				}, " Clear ", 8, md)) : X("", !0),
				_(e) ? (K(), q("button", {
					key: 5,
					type: "button",
					class: "at-btn at-btn--sm at-dl-menu-trigger",
					"aria-expanded": b.value === e.id,
					"aria-haspopup": "menu",
					"aria-label": "More actions",
					onClick: (t) => T(e, t)
				}, " ⋯ ", 8, hd)) : X("", !0)
			])]))), 128))]),
			(K(), Xi(er, { to: "body" }, [b.value && C.value ? (K(), q("div", {
				key: 0,
				ref_key: "menuPopoverEl",
				ref: S,
				class: "at-dl-menu-flyout",
				style: ce({
					top: x.value.top,
					left: x.value.left,
					minWidth: x.value.minWidth
				}),
				role: "menu",
				onMousedown: t[4] ||= Po(() => {}, ["stop"])
			}, [
				C.value && v(C.value) ? (K(), q("button", {
					key: 0,
					type: "button",
					class: "at-dl-menu-flyout__item",
					role: "menuitem",
					onClick: t[0] ||= (e) => ie(C.value)
				}, " Cancel ")) : X("", !0),
				C.value && u(C.value.state) === "paused" ? (K(), q(G, { key: 1 }, [J("button", {
					type: "button",
					class: "at-dl-menu-flyout__item",
					role: "menuitem",
					onClick: t[1] ||= (e) => A(C.value)
				}, " Move to top "), J("button", {
					type: "button",
					class: "at-dl-menu-flyout__item",
					role: "menuitem",
					onClick: t[2] ||= (e) => ie(C.value)
				}, " Cancel ")], 64)) : X("", !0),
				C.value && (u(C.value.state) === "failed" || u(C.value.state) === "cancelled") ? (K(), q("button", {
					key: 2,
					type: "button",
					class: "at-dl-menu-flyout__item",
					role: "menuitem",
					onClick: t[3] ||= (e) => ae(C.value)
				}, " Clear ")) : X("", !0)
			], 36)) : X("", !0)]))
		]));
	}
}), [["__scopeId", "data-v-08c4ad8f"]]), _d = {
	id: "civarchive",
	label: "CivArchive",
	defaultSearchState: {
		q: "",
		kind: "version",
		page: 1
	},
	filterSchema: [{
		id: "kind",
		type: "select",
		options: [
			"version",
			"file",
			"user"
		]
	}]
}, vd = [{
	id: "civitai",
	label: "Civitai"
}, {
	id: _d.id,
	label: _d.label
}];
//#endregion
//#region src/utils/downloadSpec.ts
function yd(e, t) {
	let n = t?.skipEarlyAccessDownloads !== !1;
	if (typeof e.id != "number") return null;
	let r = e.modelVersions;
	if (!r?.length) return null;
	let i = n ? r.find((e) => !e.isEarlyAccess) : r[0];
	if (!i) return null;
	let a = i.files ?? [];
	if (!a.length) return null;
	let o = a.findIndex((e) => e.primary), s = a[o >= 0 ? o : 0];
	return s?.id ? {
		modelId: e.id,
		versionId: i.id,
		fileId: s.id
	} : null;
}
//#endregion
//#region src/App.vue?vue&type=script&setup=true&lang.ts
var bd = { class: "at-browse-app" }, xd = { class: "at-browse-app__tabs" }, Sd = {
	key: 0,
	class: "at-browse-app__panel at-browse-app__panel--browse"
}, Cd = { class: "at-browse-app__browse-chrome" }, wd = { class: "at-browse-app__search" }, Td = ["value"], Ed = ["value"], Dd = ["placeholder"], Od = ["disabled"], kd = {
	key: "browse-batch-bar",
	class: "at-batch-bar"
}, Ad = {
	key: "browse-search-error",
	class: "at-err"
}, jd = {
	key: "browse-detail-panel",
	class: "at-browse-app__detail-panel"
}, Md = {
	key: 0,
	class: "at-muted"
}, Nd = {
	key: 0,
	class: "at-muted"
}, Pd = {
	key: 1,
	class: "at-muted"
}, Fd = {
	key: 1,
	class: "at-browse-app__panel"
}, Id = {
	key: 2,
	class: "at-browse-app__panel at-browse-app__panel--scroll"
}, Ld = 200, Rd = /* @__PURE__ */ sl(/* @__PURE__ */ ar({
	__name: "App",
	setup(e) {
		let t = pc(), n = yc(), { items: r, loading: i, fetching: a, error: o, q: s, selected: c, detailLoading: l, batchMode: u, batchIds: d, duplicateResolution: f, hasMore: p, stoppedReason: m } = Ss(t), { activeTab: h } = Ss(n), g = /* @__PURE__ */ R(null);
		function _(e) {
			return e.scrollHeight - e.scrollTop - e.clientHeight <= Ld;
		}
		function v() {
			let e = g.value;
			!e || !p.value || i.value || _(e) && t.loadMore();
		}
		let y = 0;
		function b() {
			y ||= requestAnimationFrame(() => {
				y = 0, v();
			});
		}
		function x() {
			b();
		}
		V(() => g.value, (e, t) => {
			t && t.removeEventListener("scroll", x), e && (e.addEventListener("scroll", x, { passive: !0 }), b());
		}, { flush: "post" }), V([
			r,
			i,
			a
		], () => {
			b();
		});
		let S = /* @__PURE__ */ R(!1);
		V(() => t.hideNsfwFromConfig, () => {
			S.value && t.search(!0);
		}), br(async () => {
			n.startPolling();
			try {
				let e = await ec();
				t.hideNsfwFromConfig = !!e.hide_nsfw, t.hideEarlyAccessFromConfig = e.hide_early_access !== !1;
			} catch {}
			t.search(!0).finally(() => {
				S.value = !0;
			});
		}), wr(() => {
			let e = g.value;
			e && e.removeEventListener("scroll", x), n.stopPolling();
		});
		async function C() {
			await t.search(!0);
		}
		function w(e) {
			n.setTab(e), e === "downloads" && n.refresh();
		}
		async function T(e) {
			n.showToast(_c(e.count)), n.refresh();
		}
		function E(e) {
			n.showToast(e);
		}
		let ee = Z(() => t.activeSource === "civitai" ? "Search Civitai…" : "Search CivArchive…");
		function D(e) {
			let n = e.target.value;
			t.setActiveSource(n), t.search(!0);
		}
		async function te() {
			let e = [];
			for (let n of d.value) {
				let i = r.value.find((e) => String(e.id) === n);
				if (!i) continue;
				let a = yd(i, { skipEarlyAccessDownloads: t.hideEarlyAccessFromConfig });
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
				let r = await zs(e, f.value);
				n.showToast(_c(r.task_ids.length, r.skipped.length)), n.refresh(), t.clearBatch();
			} catch (e) {
				n.showToast(e instanceof Error ? e.message : "Batch failed");
			}
		}
		return (e, n) => (K(), q("div", bd, [J("header", xd, [
			J("button", {
				type: "button",
				class: j({ active: z(h) === "browse" }),
				onClick: n[0] ||= (e) => w("browse")
			}, "Browse", 2),
			J("button", {
				type: "button",
				class: j({ active: z(h) === "downloads" }),
				onClick: n[1] ||= (e) => w("downloads")
			}, "Downloads", 2),
			J("button", {
				type: "button",
				class: j(["at-browse-app__tabs-settings", { active: z(h) === "settings" }]),
				title: "Settings",
				"aria-label": "Settings",
				onClick: n[2] ||= (e) => w("settings")
			}, " ⚙ ", 2)
		]), z(h) === "browse" ? (K(), q("div", Sd, [
			J("div", Cd, [
				J("div", wd, [
					J("select", {
						class: "at-input at-browse-app__source-select",
						"aria-label": "Browse source",
						value: z(t).activeSource,
						onChange: D
					}, [(K(!0), q(G, null, H(z(vd), (e) => (K(), q("option", {
						key: e.id,
						value: e.id
					}, M(e.label), 9, Ed))), 128))], 40, Td),
					B(J("input", {
						"onUpdate:modelValue": n[3] ||= (e) => /* @__PURE__ */ L(s) ? s.value = e : null,
						class: "at-input",
						placeholder: ee.value,
						onKeyup: Io(C, ["enter"])
					}, null, 40, Dd), [[wo, z(s)]]),
					J("button", {
						type: "button",
						class: "at-btn",
						disabled: z(i),
						onClick: C
					}, "Search", 8, Od),
					J("button", {
						type: "button",
						class: j(["at-btn", { "at-btn--on": z(u) }]),
						onClick: n[4] ||= (e) => z(t).setBatchMode(!z(u))
					}, M(z(u) ? "Exit batch" : "Batch select"), 3)
				]),
				ta(cl),
				z(u) && z(d).size ? (K(), q("div", kd, [
					J("span", null, M(z(d).size) + " selected", 1),
					J("button", {
						type: "button",
						class: "at-btn at-btn--sm",
						onClick: te
					}, "Download selected"),
					J("button", {
						type: "button",
						class: "at-btn at-btn--sm at-btn--ghost",
						onClick: n[5] ||= (...e) => z(t).clearBatch && z(t).clearBatch(...e)
					}, "Clear")
				])) : X("", !0),
				z(o) ? (K(), q("p", Ad, M(z(o)), 1)) : X("", !0)
			]),
			z(l) || z(c) ? (K(), q("div", jd, [z(l) ? (K(), q("p", Md, "Loading model…")) : z(c) ? (K(), Xi(wu, {
				key: 1,
				model: z(c),
				onClose: n[6] ||= (e) => z(t).closeDetail(),
				onDownloaded: n[7] ||= (e) => T(e),
				onError: E
			}, null, 8, ["model"])) : X("", !0)])) : X("", !0),
			J("div", {
				ref_key: "scrollRoot",
				ref: g,
				class: "at-browse-app__browse-scroll"
			}, [
				ta(Dl),
				z(a) ? (K(), q("p", Nd, "Loading more…")) : X("", !0),
				z(m) && !z(a) ? (K(), q("p", Pd, M(z(m)), 1)) : X("", !0)
			], 512)
		])) : z(h) === "downloads" ? (K(), q("div", Fd, [ta(gd)])) : (K(), q("div", Id, [ta(qu)]))]));
	}
}), [["__scopeId", "data-v-925a5a22"]]);
//#endregion
//#region src/main.ts
function zd(e) {
	let t = ss(), n = Bo(Rd);
	return n.use(t), n.mount(e), n;
}
//#endregion
export { zd as mount };
