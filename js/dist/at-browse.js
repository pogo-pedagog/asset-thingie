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
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ee = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), te = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ne = /-\w/g, T = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, E = te((e) => e.replace(re, "-$1").toLowerCase()), ie = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), ae = te((e) => e ? `on${ie(e)}` : ""), D = (e, t) => !Object.is(e, t), oe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, O = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, se = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ce, le = () => ce ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function ue(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? me(r) : ue(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var de = /;(?![^(]*\))/g, fe = /:([^]+)/, pe = /\/\*[^]*?\*\//g;
function me(e) {
	let t = {};
	return e.replace(pe, "").split(de).forEach((e) => {
		if (e) {
			let n = e.split(fe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function k(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = k(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var he = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ge = /* @__PURE__ */ e(he);
he + "";
function _e(e) {
	return !!e || e === "";
}
function ve(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = ye(e[r], t[r]);
	return n;
}
function ye(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ve(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !ye(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function be(e, t) {
	return e.findIndex((e) => ye(e, t));
}
var xe = (e) => !!(e && e.__v_isRef === !0), A = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? xe(e) ? A(e.value) : JSON.stringify(e, Se, 2) : String(e), Se = (e, t) => xe(t) ? Se(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Ce(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Ce(e)) } : _(t) ? Ce(t) : v(t) && !d(t) && !C(t) ? String(t) : t, Ce = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, j, we = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = j, !e && j && (this.index = (j.scopes ||= []).push(this) - 1);
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
			let t = j;
			try {
				return j = this, e();
			} finally {
				j = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = j, j = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (j = this.prevScope, this.prevScope = void 0);
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
function Te(e) {
	return new we(e);
}
function Ee() {
	return j;
}
function De(e, t = !1) {
	j && j.cleanups.push(e);
}
var M, Oe = /* @__PURE__ */ new WeakSet(), ke = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, j && j.active && j.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Oe.has(this) && (Oe.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ne(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ke(this), Ie(this);
		let e = M, t = He;
		M = this, He = !0;
		try {
			return this.fn();
		} finally {
			Le(this), M = e, He = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Be(e);
			this.deps = this.depsTail = void 0, Ke(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Oe.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Re(this) && this.run();
	}
	get dirty() {
		return Re(this);
	}
}, Ae = 0, je, Me;
function Ne(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Me, Me = e;
		return;
	}
	e.next = je, je = e;
}
function Pe() {
	Ae++;
}
function Fe() {
	if (--Ae > 0) return;
	if (Me) {
		let e = Me;
		for (Me = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; je;) {
		let t = je;
		for (je = void 0; t;) {
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
function Ie(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Le(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Be(r), Ve(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Re(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (ze(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function ze(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qe) || (e.globalVersion = qe, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Re(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = M, r = He;
	M = e, He = !0;
	try {
		Ie(e);
		let n = e.fn(e._value);
		(t.version === 0 || D(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		M = n, He = r, Le(e), e.flags &= -3;
	}
}
function Be(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Be(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ve(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var He = !0, Ue = [];
function We() {
	Ue.push(He), He = !1;
}
function Ge() {
	let e = Ue.pop();
	He = e === void 0 ? !0 : e;
}
function Ke(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = M;
		M = void 0;
		try {
			t();
		} finally {
			M = e;
		}
	}
}
var qe = 0, Je = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Ye = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!M || !He || M === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== M) t = this.activeLink = new Je(M, this), M.deps ? (t.prevDep = M.depsTail, M.depsTail.nextDep = t, M.depsTail = t) : M.deps = M.depsTail = t, Xe(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = M.depsTail, t.nextDep = void 0, M.depsTail.nextDep = t, M.depsTail = t, M.deps === t && (M.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, qe++, this.notify(e);
	}
	notify(e) {
		Pe();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Fe();
		}
	}
};
function Xe(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Xe(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Ze = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ Symbol(""), $e = /* @__PURE__ */ Symbol(""), et = /* @__PURE__ */ Symbol("");
function N(e, t, n) {
	if (He && M) {
		let t = Ze.get(e);
		t || Ze.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ye()), r.map = t, r.key = n), r.track();
	}
}
function tt(e, t, n, r, i, a) {
	let o = Ze.get(e);
	if (!o) {
		qe++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Pe(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === et || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(et)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Qe)), f(e) && s(o.get($e)));
				break;
			case "delete":
				i || (s(o.get(Qe)), f(e) && s(o.get($e)));
				break;
			case "set":
				f(e) && s(o.get(Qe));
				break;
		}
	}
	Fe();
}
function nt(e, t) {
	let n = Ze.get(e);
	return n && n.get(t);
}
function rt(e) {
	let t = /* @__PURE__ */ F(e);
	return t === e ? t : (N(t, "iterate", et), /* @__PURE__ */ P(e) ? t : t.map(Gt));
}
function it(e) {
	return N(e = /* @__PURE__ */ F(e), "iterate", et), e;
}
function at(e, t) {
	return /* @__PURE__ */ Ht(e) ? Kt(/* @__PURE__ */ Vt(e) ? Gt(t) : t) : Gt(t);
}
var ot = {
	__proto__: null,
	[Symbol.iterator]() {
		return st(this, Symbol.iterator, (e) => at(this, e));
	},
	concat(...e) {
		return rt(this).concat(...e.map((e) => d(e) ? rt(e) : e));
	},
	entries() {
		return st(this, "entries", (e) => (e[1] = at(this, e[1]), e));
	},
	every(e, t) {
		return lt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return lt(this, "filter", e, t, (e) => e.map((e) => at(this, e)), arguments);
	},
	find(e, t) {
		return lt(this, "find", e, t, (e) => at(this, e), arguments);
	},
	findIndex(e, t) {
		return lt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return lt(this, "findLast", e, t, (e) => at(this, e), arguments);
	},
	findLastIndex(e, t) {
		return lt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return lt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return dt(this, "includes", e);
	},
	indexOf(...e) {
		return dt(this, "indexOf", e);
	},
	join(e) {
		return rt(this).join(e);
	},
	lastIndexOf(...e) {
		return dt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return lt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ft(this, "pop");
	},
	push(...e) {
		return ft(this, "push", e);
	},
	reduce(e, ...t) {
		return ut(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ut(this, "reduceRight", e, t);
	},
	shift() {
		return ft(this, "shift");
	},
	some(e, t) {
		return lt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ft(this, "splice", e);
	},
	toReversed() {
		return rt(this).toReversed();
	},
	toSorted(e) {
		return rt(this).toSorted(e);
	},
	toSpliced(...e) {
		return rt(this).toSpliced(...e);
	},
	unshift(...e) {
		return ft(this, "unshift", e);
	},
	values() {
		return st(this, "values", (e) => at(this, e));
	}
};
function st(e, t, n) {
	let r = it(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ P(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var ct = Array.prototype;
function lt(e, t, n, r, i, a) {
	let o = it(e), s = o !== e && !/* @__PURE__ */ P(e), c = o[t];
	if (c !== ct[t]) {
		let t = c.apply(e, a);
		return s ? Gt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, at(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ut(e, t, n, r) {
	let i = it(e), a = i !== e && !/* @__PURE__ */ P(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = at(e, t)), n.call(this, t, at(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? at(e, c) : c;
}
function dt(e, t, n) {
	let r = /* @__PURE__ */ F(e);
	N(r, "iterate", et);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ut(n[0]) ? (n[0] = /* @__PURE__ */ F(n[0]), r[t](...n)) : i;
}
function ft(e, t, n = []) {
	We(), Pe();
	let r = (/* @__PURE__ */ F(e))[t].apply(e, n);
	return Fe(), Ge(), r;
}
var pt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), mt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function ht(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ F(this);
	return N(t, "has", e), t.hasOwnProperty(e);
}
var gt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Pt : Nt : i ? Mt : jt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = ot[t])) return e;
			if (t === "hasOwnProperty") return ht;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ I(e) ? e : n);
		if ((_(t) ? mt.has(t) : pt(t)) || (r || N(e, "get", t), i)) return o;
		if (/* @__PURE__ */ I(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ zt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ zt(o) : /* @__PURE__ */ Lt(o) : o;
	}
}, _t = class extends gt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Ht(i);
			if (!/* @__PURE__ */ P(n) && !/* @__PURE__ */ Ht(n) && (i = /* @__PURE__ */ F(i), n = /* @__PURE__ */ F(n)), !a && /* @__PURE__ */ I(i) && !/* @__PURE__ */ I(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ I(e) ? e : r);
		return e === /* @__PURE__ */ F(r) && (o ? D(n, i) && tt(e, "set", t, n, i) : tt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && tt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !mt.has(t)) && N(e, "has", t), n;
	}
	ownKeys(e) {
		return N(e, "iterate", d(e) ? "length" : Qe), Reflect.ownKeys(e);
	}
}, vt = class extends gt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, yt = /* @__PURE__ */ new _t(), bt = /* @__PURE__ */ new vt(), xt = /* @__PURE__ */ new _t(!0), St = (e) => e, Ct = (e) => Reflect.getPrototypeOf(e);
function wt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ F(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? St : t ? Kt : Gt;
		return !t && N(a, "iterate", l ? $e : Qe), s(Object.create(u), { next() {
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
function Tt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Et(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ F(r), a = /* @__PURE__ */ F(n);
			e || (D(n, a) && N(i, "get", n), N(i, "get", a));
			let { has: o } = Ct(i), s = t ? St : e ? Kt : Gt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && N(/* @__PURE__ */ F(t), "iterate", Qe), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ F(n), i = /* @__PURE__ */ F(t);
			return e || (D(t, i) && N(r, "has", t), N(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ F(a), s = t ? St : e ? Kt : Gt;
			return !e && N(o, "iterate", Qe), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: Tt("add"),
		set: Tt("set"),
		delete: Tt("delete"),
		clear: Tt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ F(this), r = Ct(n), i = /* @__PURE__ */ F(e), a = !t && !/* @__PURE__ */ P(e) && !/* @__PURE__ */ Ht(e) ? i : e;
			return r.has.call(n, a) || D(e, a) && r.has.call(n, e) || D(i, a) && r.has.call(n, i) || (n.add(a), tt(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ P(n) && !/* @__PURE__ */ Ht(n) && (n = /* @__PURE__ */ F(n));
			let r = /* @__PURE__ */ F(this), { has: i, get: a } = Ct(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ F(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? D(n, s) && tt(r, "set", e, n, s) : tt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ F(this), { has: n, get: r } = Ct(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ F(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && tt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ F(this), t = e.size !== 0, n = e.clear();
			return t && tt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = wt(r, e, t);
	}), n;
}
function Dt(e, t) {
	let n = Et(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Ot = { get: /* @__PURE__ */ Dt(!1, !1) }, kt = { get: /* @__PURE__ */ Dt(!1, !0) }, At = { get: /* @__PURE__ */ Dt(!0, !1) }, jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap();
function Ft(e) {
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
function It(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Ft(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e) {
	return /* @__PURE__ */ Ht(e) ? e : Bt(e, !1, yt, Ot, jt);
}
/* @__NO_SIDE_EFFECTS__ */
function Rt(e) {
	return Bt(e, !1, xt, kt, Mt);
}
/* @__NO_SIDE_EFFECTS__ */
function zt(e) {
	return Bt(e, !0, bt, At, Nt);
}
function Bt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = It(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function Vt(e) {
	return /* @__PURE__ */ Ht(e) ? /* @__PURE__ */ Vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function Ht(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function P(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Ut(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function F(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ F(t) : e;
}
function Wt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && O(e, "__v_skip", !0), e;
}
var Gt = (e) => v(e) ? /* @__PURE__ */ Lt(e) : e, Kt = (e) => v(e) ? /* @__PURE__ */ zt(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function I(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function L(e) {
	return qt(e, !1);
}
function qt(e, t) {
	return /* @__PURE__ */ I(e) ? e : new Jt(e, t);
}
var Jt = class {
	constructor(e, t) {
		this.dep = new Ye(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ F(e), this._value = t ? e : Gt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ P(e) || /* @__PURE__ */ Ht(e);
		e = n ? e : /* @__PURE__ */ F(e), D(e, t) && (this._rawValue = e, this._value = n ? e : Gt(e), this.dep.trigger());
	}
};
function R(e) {
	return /* @__PURE__ */ I(e) ? e.value : e;
}
var Yt = {
	get: (e, t, n) => t === "__v_raw" ? e : R(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ I(i) && !/* @__PURE__ */ I(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Xt(e) {
	return /* @__PURE__ */ Vt(e) ? e : new Proxy(e, Yt);
}
/* @__NO_SIDE_EFFECTS__ */
function Zt(e) {
	let t = d(e) ? Array(e.length) : {};
	for (let n in e) t[n] = tn(e, n);
	return t;
}
var Qt = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = _(t) ? t : String(t), this._raw = /* @__PURE__ */ F(e);
		let r = !0, i = e;
		if (!d(e) || _(this._key) || !w(this._key)) do
			r = !/* @__PURE__ */ Ut(i) || /* @__PURE__ */ P(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = R(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ I(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ I(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return nt(this._raw, this._key);
	}
}, $t = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
/* @__NO_SIDE_EFFECTS__ */
function en(e, t, n) {
	return /* @__PURE__ */ I(e) ? e : h(e) ? new $t(e) : v(e) && arguments.length > 1 ? tn(e, t, n) : /* @__PURE__ */ L(e);
}
function tn(e, t, n) {
	return new Qt(e, t, n);
}
var nn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ye(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && M !== this) return Ne(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return ze(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function rn(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new nn(r, i, n);
}
var an = {}, on = /* @__PURE__ */ new WeakMap(), sn = void 0;
function cn(e, t = !1, n = sn) {
	if (n) {
		let t = on.get(n);
		t || on.set(n, t = []), t.push(e);
	}
}
function ln(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ P(e) || o === !1 || o === 0 ? un(e, 1) : un(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ I(e) ? (g = () => e.value, y = /* @__PURE__ */ P(e)) : /* @__PURE__ */ Vt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Vt(e) || /* @__PURE__ */ P(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ I(e)) return e.value;
		if (/* @__PURE__ */ Vt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			We();
			try {
				_();
			} finally {
				Ge();
			}
		}
		let t = sn;
		sn = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			sn = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => un(e(), t);
	}
	let x = Ee(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(an) : an, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => D(e, C[t])) : D(e, C))) {
				_ && _();
				let t = sn;
				sn = m;
				try {
					let t = [
						e,
						C === an ? void 0 : b && C[0] === an ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					sn = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new ke(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => cn(e, !1, m), _ = m.onStop = () => {
		let e = on.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			on.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function un(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ I(e)) un(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) un(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		un(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) un(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && un(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function dn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		pn(e, t, n);
	}
}
function fn(e, t, n, r) {
	if (h(e)) {
		let i = dn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			pn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(fn(e[a], t, n, r));
		return i;
	}
}
function pn(e, n, r, i = !0) {
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
			We(), dn(o, null, 10, [
				e,
				i,
				a
			]), Ge();
			return;
		}
	}
	mn(e, r, a, i, s);
}
function mn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var z = [], hn = -1, gn = [], _n = null, vn = 0, yn = /* @__PURE__ */ Promise.resolve(), bn = null;
function xn(e) {
	let t = bn || yn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sn(e) {
	let t = hn + 1, n = z.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = z[r], a = On(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Cn(e) {
	if (!(e.flags & 1)) {
		let t = On(e), n = z[z.length - 1];
		!n || !(e.flags & 2) && t >= On(n) ? z.push(e) : z.splice(Sn(t), 0, e), e.flags |= 1, wn();
	}
}
function wn() {
	bn ||= yn.then(kn);
}
function Tn(e) {
	d(e) ? gn.push(...e) : _n && e.id === -1 ? _n.splice(vn + 1, 0, e) : e.flags & 1 || (gn.push(e), e.flags |= 1), wn();
}
function En(e, t, n = hn + 1) {
	for (; n < z.length; n++) {
		let t = z[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			z.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
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
		for (hn = 0; hn < z.length; hn++) {
			let e = z[hn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), dn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; hn < z.length; hn++) {
			let e = z[hn];
			e && (e.flags &= -2);
		}
		hn = -1, z.length = 0, Dn(e), bn = null, (z.length || gn.length) && kn(e);
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
		r._d && Xi(-1);
		let i = Mn(t), a;
		try {
			a = e(...n);
		} finally {
			Mn(i), r._d && Xi(1);
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
		}), a.deep && un(o), i.push({
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
		c && (We(), fn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ge());
	}
}
function Fn(e, t) {
	if (X) {
		let n = X.provides, r = X.parent && X.parent.provides;
		r === n && (n = X.provides = Object.create(r)), n[e] = t;
	}
}
function In(e, t, n = !1) {
	let r = ma();
	if (r || ei) {
		let i = ei ? ei._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function Ln() {
	return !!(ma() || ei);
}
var Rn = /* @__PURE__ */ Symbol.for("v-scx"), zn = () => In(Rn);
function Bn(e, t, n) {
	return Vn(e, t, n);
}
function Vn(e, n, i = t) {
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
	let p = X;
	u.call = (e, t, n) => fn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		H(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Cn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = ln(e, n, u);
	return ba && (f ? f.push(h) : d && h()), h;
}
function Hn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Un(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = _a(this), s = Vn(i, a.bind(r), n);
	return o(), s;
}
function Un(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Wn = /* @__PURE__ */ new WeakMap(), Gn = /* @__PURE__ */ Symbol("_vte"), Kn = (e) => e.__isTeleport, qn = (e) => e && (e.disabled || e.disabled === ""), Jn = (e) => e && (e.defer || e.defer === ""), Yn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Xn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Zn = (e, t) => {
	let n = e && e.to;
	return g(n) ? t ? t(n) : null : n;
}, Qn = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g } } = l, _ = qn(t.props), { dynamicChildren: v } = t, y = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, b = (e = t) => {
			let n = qn(e.props), r = e.target = Zn(e.props, m), a = rr(r, e, h, p);
			r && (o !== "svg" && Yn(r) ? o = "svg" : o !== "mathml" && Xn(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (y(e, r, a), nr(e, !1)));
		}, x = (e) => {
			let t = () => {
				Wn.get(e) === t && (Wn.delete(e), qn(e.props) && (y(e, n, e.anchor), nr(e, !0)), b(e));
			};
			Wn.set(e, t), H(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Jn(t.props) || a && a.pendingBranch) {
				x(t);
				return;
			}
			_ && (y(t, n, i), nr(t, !0)), b();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Wn.get(e);
			if (u) {
				u.flags |= 8, Wn.delete(e), x(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = qn(e.props), y = g ? n : p, b = g ? r : h;
			if (o === "svg" || Yn(p) ? o = "svg" : (o === "mathml" || Xn(p)) && (o = "mathml"), v ? (f(e.dynamicChildren, v, y, i, a, o, s), Ii(e, t, !0)) : c || d(e, t, y, b, i, a, o, s, !1), _) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : $n(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = t.target = Zn(t.props, m);
				e && $n(t, e, null, l, 0);
			} else g && $n(t, p, h, l, 1);
			nr(t, _);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = a || !qn(f), m = Wn.get(e);
		if (m && (m.flags |= 8, Wn.delete(e), p = !1), d && (i(l), i(u)), a && i(c), o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, p, !!i.dynamicChildren);
		}
	},
	move: $n,
	hydrate: er
};
function $n(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), (!d || qn(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function er(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
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
	let m = t.target = Zn(t.props, c), h = qn(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || rr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || rr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), nr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var tr = Qn;
function nr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function rr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Gn] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var ir = /* @__PURE__ */ Symbol("_leaveCb");
function ar(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ar(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/* @__NO_SIDE_EFFECTS__ */
function or(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function sr(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function cr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var lr = /* @__PURE__ */ new WeakMap();
function ur(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => ur(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (fr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && ur(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? ka(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ F(v), b = v === t ? i : (e) => cr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && cr(_, t));
	if (m != null && m !== p) {
		if (dr(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ I(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) dn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ I(p);
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
					i(), lr.delete(e);
				};
				t.id = -1, lr.set(e, t), H(t, r);
			} else dr(e), i();
		}
	}
}
function dr(e) {
	let t = lr.get(e);
	t && (t.flags |= 8, lr.delete(e));
}
le().requestIdleCallback, le().cancelIdleCallback;
var fr = (e) => !!e.type.__asyncLoader, pr = (e) => e.type.__isKeepAlive;
function mr(e, t) {
	gr(e, "a", t);
}
function hr(e, t) {
	gr(e, "da", t);
}
function gr(e, t, n = X) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (vr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) pr(e.parent.vnode) && _r(r, t, n, e), e = e.parent;
	}
}
function _r(e, t, n, r) {
	let i = vr(t, e, r, !0);
	Tr(() => {
		c(r[t], i);
	}, n);
}
function vr(e, t, n = X, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			We();
			let i = _a(n), a = fn(t, n, e, r);
			return i(), Ge(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var yr = (e) => (t, n = X) => {
	(!ba || e === "sp") && vr(e, (...e) => t(...e), n);
}, br = yr("bm"), xr = yr("m"), Sr = yr("bu"), Cr = yr("u"), wr = yr("bum"), Tr = yr("um"), Er = yr("sp"), Dr = yr("rtg"), Or = yr("rtc");
function kr(e, t = X) {
	vr("ec", e, t);
}
var Ar = /* @__PURE__ */ Symbol.for("v-ndc");
function jr(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Vt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ P(e), s = /* @__PURE__ */ Ht(e), e = it(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Kt(Gt(e[n])) : Gt(e[n]) : e[n], n, void 0, a && a[n]);
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
var Mr = (e) => e ? ya(e) ? ka(e) : Mr(e.parent) : null, Nr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Mr(e.parent),
	$root: (e) => Mr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Hr(e),
	$forceUpdate: (e) => e.f ||= () => {
		Cn(e.update);
	},
	$nextTick: (e) => e.n ||= xn.bind(e.proxy),
	$watch: (e) => Hn.bind(e)
}), Pr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Fr = {
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
			else if (Pr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Lr && (s[n] = 0);
		}
		let d = Nr[n], f, p;
		if (d) return n === "$attrs" && N(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Pr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Pr(n, c) || u(o, c) || u(i, c) || u(Nr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Ir(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Lr = !0;
function Rr(e) {
	let t = Hr(e), n = e.proxy, i = e.ctx;
	Lr = !1, t.beforeCreate && Br(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: te, renderTriggered: ne, errorCaptured: T, serverPrefetch: re, expose: E, inheritAttrs: ie, components: ae, directives: D, filters: oe } = t;
	if (u && zr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Lt(t));
	}
	if (Lr = !0, o) for (let e in o) {
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
	if (c) for (let e in c) Vr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Fn(t, e[t]);
		});
	}
	f && Br(f, e, "c");
	function O(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (O(br, p), O(xr, m), O(Sr, g), O(Cr, _), O(mr, y), O(hr, b), O(kr, T), O(Or, te), O(Dr, ne), O(wr, S), O(Tr, w), O(Er, re), d(E)) if (E.length) {
		let t = e.exposed ||= {};
		E.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	ee && e.render === r && (e.render = ee), ie != null && (e.inheritAttrs = ie), ae && (e.components = ae), D && (e.directives = D), re && sr(e);
}
function zr(e, t, n = r) {
	d(e) && (e = qr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? In(r.from || n, r.default, !0) : In(r.from || n) : In(r), /* @__PURE__ */ I(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Br(e, t, n) {
	fn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Vr(e, t, n, r) {
	let i = r.includes(".") ? Un(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Bn(i, n);
	} else if (h(e)) Bn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Vr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && Bn(i, r, e);
	}
}
function Hr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ur(c, e, o, !0)), Ur(c, t, o)), v(t) && a.set(t, c), c;
}
function Ur(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ur(e, a, n, !0), i && i.forEach((t) => Ur(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Wr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Wr = {
	data: Gr,
	props: Yr,
	emits: Yr,
	methods: Jr,
	computed: Jr,
	beforeCreate: V,
	created: V,
	beforeMount: V,
	mounted: V,
	beforeUpdate: V,
	updated: V,
	beforeDestroy: V,
	beforeUnmount: V,
	destroyed: V,
	unmounted: V,
	activated: V,
	deactivated: V,
	errorCaptured: V,
	serverPrefetch: V,
	components: Jr,
	directives: Jr,
	watch: Xr,
	provide: Gr,
	inject: Kr
};
function Gr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Kr(e, t) {
	return Jr(qr(e), qr(t));
}
function qr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function V(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Jr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Yr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Ir(e), Ir(t ?? {})) : t;
}
function Xr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = V(e[r], t[r]);
	return n;
}
function Zr() {
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
var Qr = 0;
function $r(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Zr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Qr++,
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
					let u = l._ceVNode || q(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, ka(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (fn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = ei;
				ei = l;
				try {
					return e();
				} finally {
					ei = t;
				}
			}
		};
		return l;
	};
}
var ei = null, ti = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${E(t)}Modifiers`];
function ni(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && ti(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(se)));
	let c, l = i[c = ae(n)] || i[c = ae(T(n))];
	!l && o && (l = i[c = ae(E(n))]), l && fn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, fn(u, e, 6, a);
	}
}
var ri = /* @__PURE__ */ new WeakMap();
function ii(e, t, n = !1) {
	let r = n ? ri : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = ii(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function ai(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, E(t)) || u(e, t));
}
function oi(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Mn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = oa(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = oa(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : si(c);
		}
	} catch (t) {
		Ki.length = 0, pn(t, e, 1), v = q(Wi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = ci(y, a)), b = aa(b, y, !1, !0));
	}
	return n.dirs && (b = aa(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ar(b, n.transition), v = b, Mn(_), v;
}
var si = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, ci = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function li(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? ui(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (di(o, r, n) && !ai(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? ui(r, o, l) : !0 : !!o;
	return !1;
}
function ui(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (di(t, e, a) && !ai(n, a)) return !0;
	}
	return !1;
}
function di(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !ye(r, i) : r !== i;
}
function fi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var pi = {}, mi = () => Object.create(pi), hi = (e) => Object.getPrototypeOf(e) === pi;
function gi(e, t, n, r = !1) {
	let i = {}, a = mi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), vi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Rt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function _i(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ F(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ai(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = T(o);
					i[t] = yi(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		vi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = E(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = yi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && tt(e.attrs, "set", "");
}
function vi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : ai(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ F(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = yi(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function yi(e, t, n, r, i, a) {
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
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === E(n)) && (r = !0));
	}
	return r;
}
var bi = /* @__PURE__ */ new WeakMap();
function xi(e, r, i = !1) {
	let a = i ? bi : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = xi(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = T(c[e]);
		Si(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
		if (Si(t)) {
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
function Si(e) {
	return e[0] !== "$" && !ee(e);
}
var Ci = (e) => e === "_" || e === "_ctx" || e === "$stable", wi = (e) => d(e) ? e.map(oa) : [oa(e)], Ti = (e, t, n) => {
	if (t._n) return t;
	let r = Nn((...e) => wi(t(...e)), n);
	return r._c = !1, r;
}, Ei = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Ci(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = Ti(n, i, r);
		else if (i != null) {
			let e = wi(i);
			t[n] = () => e;
		}
	}
}, Di = (e, t) => {
	let n = wi(t);
	e.slots.default = () => n;
}, Oi = (e, t, n) => {
	for (let r in t) (n || !Ci(r)) && (e[r] = t[r]);
}, ki = (e, t, n) => {
	let r = e.slots = mi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Oi(r, t, n), n && O(r, "_", e, !0)) : Ei(t, r);
	} else t && Di(e, t);
}, Ai = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Oi(a, n, r) : (o = !n.$stable, Ei(n, a)), s = n;
	} else n && (Di(e, n), s = { default: 1 });
	if (o) for (let e in a) !Ci(e) && s[e] == null && delete a[e];
}, H = Hi;
function ji(e) {
	return Mi(e);
}
function Mi(e, i) {
	let a = le();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ea(e, t) && (r = ye(e), k(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Ui:
				y(e, t, n, r);
				break;
			case Wi:
				b(e, t, n, r);
				break;
			case Gi:
				e ?? x(t, n, r, o);
				break;
			case U:
				ae(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? D(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, A);
		}
		u != null && i ? ur(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && ur(e.ref, null, a, e, !0);
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
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), re(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, Ni(e, a), s, u), _ && Pn(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ua(f, r, e);
		}
		_ && Pn(e, null, r, "beforeMount");
		let v = Fi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && H(() => {
			try {
				f && ua(f, r, e), v && g.enter(d), _ && Pn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Vi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? sa(e[l]) : oa(e[l]), t, n, r, i, a, o, s);
	}, re = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Pi(r, !1), (g = h.onVnodeBeforeUpdate) && ua(g, r, n, e), f && Pn(n, e, r, "beforeUpdate"), r && Pi(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? E(e.dynamicChildren, d, l, r, i, Ni(n, a), o) : s || de(e, n, l, null, r, i, Ni(n, a), o, !1), u > 0) {
			if (u & 16) ie(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ie(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && H(() => {
			g && ua(g, r, n, e), f && Pn(n, e, r, "updated");
		}, i);
	}, E = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === U || !ea(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, ie = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !ee(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (ee(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ae = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (E(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Ii(e, t, !0)) : de(e, t, n, f, i, a, s, c, l);
	}, D = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : O(t, n, r, i, a, o, c) : se(e, t, c);
	}, O = (e, t, n, r, i, a, o) => {
		let s = e.component = pa(e, r, i);
		if (pr(e) && (s.ctx.renderer = A), xa(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ce, o), !e.el) {
				let r = s.subTree = q(Wi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ce(s, e, t, n, i, a, o);
	}, se = (e, t, n) => {
		let r = t.component = e.component;
		if (li(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			ue(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ce = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Ri(e);
					if (n) {
						t && (t.el = c.el, ue(e, t, o)), n.asyncDep.then(() => {
							H(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Pi(e, !1), t ? (t.el = c.el, ue(e, t, o)) : t = c, n && oe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ua(d, s, t, c), Pi(e, !0);
				let f = oi(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ye(p), e, i, a), t.el = f.el, u === null && fi(e, f.el), r && H(r, i), (d = t.props && t.props.onVnodeUpdated) && H(() => ua(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = fr(t);
				if (Pi(e, !1), l && oe(l), !m && (o = c && c.onVnodeBeforeMount) && ua(o, d, t), Pi(e, !0), s && Ce) {
					let t = () => {
						e.subTree = oi(e), Ce(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = oi(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && H(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					H(() => ua(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && fr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && H(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new ke(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Cn(u), Pi(e, !0), l();
	}, ue = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, _i(e, t.props, r, n), Ai(e, t.children, n), We(), En(e), Ge();
	}, de = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				pe(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				fe(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ve(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? pe(l, d, n, r, i, a, o, s, c) : ve(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && T(d, n, r, i, a, o, s, c));
	}, fe = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? sa(t[p]) : oa(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ve(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, pe = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? sa(t[u]) : oa(t[u]);
			if (ea(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? sa(t[p]) : oa(t[p]);
			if (ea(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? sa(t[u]) : oa(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) k(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? sa(t[u]) : oa(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					k(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && ea(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? k(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Li(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Bi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? me(n, r, p, 2) : _--);
			}
		}
	}, me = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			me(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, A);
			return;
		}
		if (c === U) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) me(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Gi) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), H(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[ir](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, k = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (We(), ur(s, null, n, e, !0), Ge()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !fr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ua(_, t, e), u & 6) _e(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Pn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, A, r) : l && !l.hasOnce && (a !== U || d > 0 && d & 64) ? ve(l, t, n, !1, !0) : (a === U && d & 384 || !i && u & 16) && ve(c, t, n), r && he(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && H(() => {
			_ && ua(_, t, e), h && Pn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, he = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === U) {
			ge(n, r);
			return;
		}
		if (t === Gi) {
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
	}, ge = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, _e = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		zi(c), zi(l), r && oe(r), i.stop(), a && (a.flags |= 8, k(o, e, t, n)), s && H(s, t), H(() => {
			e.isUnmounted = !0;
		}, t);
	}, ve = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) k(e[o], t, n, r, i);
	}, ye = (e) => {
		if (e.shapeFlag & 6) return ye(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Gn];
		return n ? h(n) : t;
	}, be = !1, xe = (e, t, n) => {
		let r;
		e == null ? t._vnode && (k(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, be ||= (be = !0, En(r), Dn(), !1);
	}, A = {
		p: v,
		um: k,
		m: me,
		r: he,
		mt: O,
		mc: T,
		pc: de,
		pbc: E,
		n: ye,
		o: e
	}, Se, Ce;
	return i && ([Se, Ce] = i(A)), {
		render: xe,
		hydrate: Se,
		createApp: $r(xe, Se)
	};
}
function Ni({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Pi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Fi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ii(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = sa(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ii(t, a)), a.type === Ui && (a.patchFlag === -1 && (a = i[e] = sa(a)), a.el = t.el), a.type === Wi && !a.el && (a.el = t.el);
	}
}
function Li(e) {
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
function Ri(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Ri(t);
}
function zi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Bi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Bi(t.subTree) : null;
}
var Vi = (e) => e.__isSuspense;
function Hi(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Tn(e);
}
var U = /* @__PURE__ */ Symbol.for("v-fgt"), Ui = /* @__PURE__ */ Symbol.for("v-txt"), Wi = /* @__PURE__ */ Symbol.for("v-cmt"), Gi = /* @__PURE__ */ Symbol.for("v-stc"), Ki = [], qi = null;
function W(e = !1) {
	Ki.push(qi = e ? null : []);
}
function Ji() {
	Ki.pop(), qi = Ki[Ki.length - 1] || null;
}
var Yi = 1;
function Xi(e, t = !1) {
	Yi += e, e < 0 && qi && t && (qi.hasOnce = !0);
}
function Zi(e) {
	return e.dynamicChildren = Yi > 0 ? qi || n : null, Ji(), Yi > 0 && qi && qi.push(e), e;
}
function G(e, t, n, r, i, a) {
	return Zi(K(e, t, n, r, i, a, !0));
}
function Qi(e, t, n, r, i) {
	return Zi(q(e, t, n, r, i, !0));
}
function $i(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ea(e, t) {
	return e.type === t.type && e.key === t.key;
}
var ta = ({ key: e }) => e ?? null, na = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ I(e) || h(e) ? {
	i: An,
	r: e,
	k: t,
	f: !!n
} : e);
function K(e, t = null, n = null, r = 0, i = null, a = e === U ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && ta(t),
		ref: t && na(t),
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
	return s ? (ca(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Yi > 0 && !o && qi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && qi.push(c), c;
}
var q = ra;
function ra(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Ar) && (e = Wi), $i(e)) {
		let r = aa(e, t, !0);
		return n && ca(r, n), Yi > 0 && !a && qi && (r.shapeFlag & 6 ? qi[qi.indexOf(e)] = r : qi.push(r)), r.patchFlag = -2, r;
	}
	if (Aa(e) && (e = e.__vccOpts), t) {
		t = ia(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = k(e)), v(n) && (/* @__PURE__ */ Ut(n) && !d(n) && (n = s({}, n)), t.style = ue(n));
	}
	let o = g(e) ? 1 : Vi(e) ? 128 : Kn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return K(e, t, n, r, i, o, a, !0);
}
function ia(e) {
	return e ? /* @__PURE__ */ Ut(e) || hi(e) ? s({}, e) : e : null;
}
function aa(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? la(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ta(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(na(t)) : [a, na(t)] : na(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== U ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && aa(e.ssContent),
		ssFallback: e.ssFallback && aa(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ar(u, c.clone(u)), u;
}
function J(e = " ", t = 0) {
	return q(Ui, null, e, t);
}
function Y(e = "", t = !1) {
	return t ? (W(), Qi(Wi, null, e)) : q(Wi, null, e);
}
function oa(e) {
	return e == null || typeof e == "boolean" ? q(Wi) : d(e) ? q(U, null, e.slice()) : $i(e) ? sa(e) : q(Ui, null, String(e));
}
function sa(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : aa(e);
}
function ca(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), ca(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !hi(t) ? t._ctx = An : r === 3 && An && (An.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: An
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [J(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function la(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = k([t.class, r.class]));
		else if (e === "style") t.style = ue([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ua(e, t, n, r = null) {
	fn(e, t, 7, [n, r]);
}
var da = Zr(), fa = 0;
function pa(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || da, o = {
		uid: fa++,
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
		scope: new we(!0),
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
		propsOptions: xi(i, a),
		emitsOptions: ii(i, a),
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = ni.bind(null, o), e.ce && e.ce(o), o;
}
var X = null, ma = () => X || An, ha, ga;
{
	let e = le(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	ha = t("__VUE_INSTANCE_SETTERS__", (e) => X = e), ga = t("__VUE_SSR_SETTERS__", (e) => ba = e);
}
var _a = (e) => {
	let t = X;
	return ha(e), e.scope.on(), () => {
		e.scope.off(), ha(t);
	};
}, va = () => {
	X && X.scope.off(), ha(null);
};
function ya(e) {
	return e.vnode.shapeFlag & 4;
}
var ba = !1;
function xa(e, t = !1, n = !1) {
	t && ga(t);
	let { props: r, children: i } = e.vnode, a = ya(e);
	gi(e, r, a, t), ki(e, i, n || t);
	let o = a ? Sa(e, t) : void 0;
	return t && ga(!1), o;
}
function Sa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Fr);
	let { setup: r } = n;
	if (r) {
		We();
		let n = e.setupContext = r.length > 1 ? Oa(e) : null, i = _a(e), a = dn(r, e, 0, [e.props, n]), o = y(a);
		if (Ge(), i(), (o || e.sp) && !fr(e) && sr(e), o) {
			if (a.then(va, va), t) return a.then((n) => {
				Ca(e, n, t);
			}).catch((t) => {
				pn(t, e, 0);
			});
			e.asyncDep = a;
		} else Ca(e, a, t);
	} else Ea(e, t);
}
function Ca(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Xt(t)), Ea(e, n);
}
var wa, Ta;
function Ea(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && wa && !i.render) {
			let t = i.template || Hr(e).template;
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
		We();
		try {
			Rr(e);
		} finally {
			Ge(), t();
		}
	}
}
var Da = { get(e, t) {
	return N(e, "get", ""), e[t];
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
	return e.exposed ? e.exposeProxy ||= new Proxy(Xt(Wt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Nr) return Nr[n](e);
		},
		has(e, t) {
			return t in e || t in Nr;
		}
	}) : e.proxy;
}
function Aa(e) {
	return h(e) && "__vccOpts" in e;
}
var Z = (e, t) => /* @__PURE__ */ rn(e, t, ba), ja = "3.5.32", Ma = void 0, Na = typeof window < "u" && window.trustedTypes;
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
		Ya.test(n) ? e.setProperty(E(r), n.replace(Ya, ""), "important") : e[r] = n;
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
	let r = T(t);
	if (r !== "filter" && r in e) return Qa[t] = r;
	r = ie(r);
	for (let n = 0; n < Za.length; n++) {
		let i = Za[n] + r;
		if (i in e) return Qa[t] = i;
	}
	return t;
}
var eo = "http://www.w3.org/1999/xlink";
function to(e, t, n, r, i, a = ge(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(eo, t.slice(6, t.length)) : e.setAttributeNS(eo, t, n) : n == null || a && !_e(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
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
		r === "boolean" ? n = _e(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
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
	return [e[2] === ":" ? e.slice(3) : E(e.slice(2)), t];
}
var lo = 0, uo = /* @__PURE__ */ Promise.resolve(), fo = () => lo ||= (uo.then(() => lo = 0), Date.now());
function po(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		fn(mo(e, n.value), t, 5, [e]);
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
	t === "class" ? Va(e, r, c) : t === "style" ? Ja(e, n, r) : a(t) ? o(t) || oo(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _o(e, t, r, c)) ? (no(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && to(e, t, r, c, s, t !== "value")) : e._isVueCE && (vo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? no(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), to(e, t, r, c));
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
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var yo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => oe(t, e) : t;
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
	return t && (e = e.trim()), n && (e = se(e)), e;
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
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? se(e.value) : e.value, c = t ?? "";
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
				let e = be(t, n), a = e !== -1;
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
	if (d(t)) i = be(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = ye(t, jo(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Do = {
	created(e, { value: t }, n) {
		e.checked = ye(t, n.props.value), e[So] = yo(n), ro(e, "change", () => {
			e[So](Ao(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[So] = yo(r), t !== n && (e.checked = ye(t, r.props.value));
	}
}, Oo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		ro(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? se(Ao(e)) : Ao(e));
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
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = be(t, o) > -1;
			} else a.selected = t.has(o);
			else if (ye(Ao(a), t)) {
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
		let r = E(n.key);
		if (t.some((e) => e === r || Fo[e] === r)) return e(n);
	}));
}, Lo = /* @__PURE__ */ s({ patchProp: go }, za), Ro;
function zo() {
	return Ro ||= ji(Lo);
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
	let e = Te(!0), t = e.run(() => /* @__PURE__ */ L({})), n = [], r = [], i = Wt({
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
	return !n && Ee() && De(i), i;
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
		qo(i) && qo(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ I(r) && !/* @__PURE__ */ Vt(r) ? e[n] = ms(i, r) : e[n] = r;
	}
	return e;
}
var hs = Symbol();
function gs(e) {
	return !qo(e) || !Object.prototype.hasOwnProperty.call(e, hs);
}
var { assign: _s } = Object;
function vs(e) {
	return !!(/* @__PURE__ */ I(e) && e.effect);
}
function ys(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), _s(/* @__PURE__ */ Zt(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Wt(Z(() => {
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
	}, y = /* @__PURE__ */ Lt({
		_p: r,
		$id: e,
		$onAction: ls.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = ls(d, t, n.detached, () => a()), a = o.run(() => Bn(() => r.state.value[e], (r) => {
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
	let b = (r._a && r._a.runWithContext || ds)(() => r._e.run(() => (o = Te()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ I(n) && !vs(n) || /* @__PURE__ */ Vt(n) ? a || (p && gs(n) && (/* @__PURE__ */ I(n) ? n.value = p[t] : ms(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return _s(y, b), _s(/* @__PURE__ */ F(y), b), Object.defineProperty(y, "$state", {
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
	let t = /* @__PURE__ */ F(e), n = {};
	for (let r in t) {
		let i = t[r];
		i.effect ? n[r] = Z({
			get: () => e[r],
			set(t) {
				e[r] = t;
			}
		}) : (/* @__PURE__ */ I(i) || /* @__PURE__ */ Vt(i)) && (n[r] = /* @__PURE__ */ en(e, r));
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
	return e.sort && t.set("sort", e.sort), e.period && t.set("period", e.period), e.nsfw && t.set("nsfw", "true"), e.kind?.trim() && t.set("kind", e.kind.trim()), e.page != null && String(e.page).trim() !== "" && t.set("page", String(e.page)), t;
}
async function As(e, t) {
	let n = ks(t).toString();
	return $(`${Q()}/browse/${e}/search${n ? `?${n}` : ""}`);
}
async function js(e, t, n) {
	let r = ks(n);
	return r.set("url", t), $(`${Q()}/browse/${e}/page?${r.toString()}`);
}
async function Ms(e, t, n = !1) {
	let r = encodeURIComponent(t), i = n ? "?nsfw=true" : "";
	return $(`${Q()}/browse/${e}/detail/${r}${i}`);
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
function ec() {
	return {
		q: "",
		searchType: "model_name",
		contentTypes: [],
		baseModels: [],
		sort: "Most Downloaded",
		period: "All Time",
		civarchiveKind: "version",
		civarchivePage: 1,
		items: [],
		buffer: [],
		nextPage: null,
		lastPageItemIds: [],
		stoppedReason: null,
		selected: null,
		batchIds: /* @__PURE__ */ new Set()
	};
}
var tc = xs("at-browse", () => {
	let e = /* @__PURE__ */ L("civitai"), t = /* @__PURE__ */ Lt({
		civitai: ec(),
		civarchive: ec()
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
	}), d = /* @__PURE__ */ L(!0), f = /* @__PURE__ */ L(!0), p = /* @__PURE__ */ L(!1), m = /* @__PURE__ */ L(!1), h = /* @__PURE__ */ L(null), g = /* @__PURE__ */ Lt({
		civitai: 0,
		civarchive: 0
	}), _ = Z({
		get: () => n().items,
		set: (e) => {
			n().items = e;
		}
	}), v = Z({
		get: () => n().buffer,
		set: (e) => {
			n().buffer = e;
		}
	}), y = Z({
		get: () => n().nextPage,
		set: (e) => {
			n().nextPage = e;
		}
	}), b = Z({
		get: () => n().lastPageItemIds,
		set: (e) => {
			n().lastPageItemIds = e.map((e) => String(e));
		}
	}), x = Z({
		get: () => n().stoppedReason,
		set: (e) => {
			n().stoppedReason = e;
		}
	}), S = Z(() => (v.value.length > 0 || !!y.value) && !p.value), C = Z({
		get: () => n().selected,
		set: (e) => {
			n().selected = e;
		}
	}), w = /* @__PURE__ */ L(!1), ee = /* @__PURE__ */ L("General"), te = /* @__PURE__ */ L("skip"), ne = /* @__PURE__ */ L(!1), T = Z({
		get: () => n().batchIds,
		set: (e) => {
			n().batchIds = e;
		}
	});
	function re(t) {
		e.value = t;
	}
	function E() {
		let t = n(), r = {
			q: t.q,
			search_type: t.searchType,
			content_types: [...t.contentTypes],
			base_models: [...t.baseModels],
			sort: t.sort,
			period: t.period,
			nsfw: !d.value
		};
		return e.value === "civarchive" && (r.kind = t.civarchiveKind, r.page = t.civarchivePage), r;
	}
	function ie(t, r, i) {
		let a = n(), o = t.map((e) => String(e.id)), s = Qs({
			requestedPageUrl: r,
			returnedNextUrl: i,
			returnedItemIds: o,
			lastPageItemIds: a.lastPageItemIds.length ? [...a.lastPageItemIds] : null
		});
		if (r && e.value === "civitai") {
			let e = $s(a.searchType, a.q, t);
			e && (s = {
				nextUrl: null,
				discardPage: !0,
				stopReason: e
			});
		}
		return s.discardPage ? (a.nextPage = null, a.stoppedReason = s.stopReason, !1) : (a.buffer = [...a.buffer, ...t], a.nextPage = s.nextUrl, a.lastPageItemIds = o, a.stoppedReason = s.stopReason, !0);
	}
	function ae() {
		let e = n();
		m.value || !e.nextPage || e.buffer.length >= Xs || D();
	}
	async function D() {
		let t = e.value, r = n();
		if (m.value || !r.nextPage) return;
		let i = g[t], a = r.nextPage;
		m.value = !0;
		try {
			let e = await js(t, a, E());
			if (i !== g[t]) return;
			ie(e.items, a, e.next_page ?? null);
		} catch (e) {
			if (i !== g[t]) return;
			h.value = e instanceof Error ? e.message : "Load more failed";
		} finally {
			m.value = !1;
		}
	}
	function oe() {
		let e = n();
		if (e.buffer.length === 0) return 0;
		let t = e.buffer.slice(0, Ys);
		return e.buffer = e.buffer.slice(Ys), e.items = [...e.items, ...t], ae(), t.length;
	}
	async function O(t) {
		let r = e.value, i = n(), a = ++g[r];
		p.value = !0, h.value = null, t && (i.stoppedReason = null, i.nextPage = null, i.buffer = [], r === "civarchive" && (i.civarchivePage = 1));
		try {
			let e = await As(r, E());
			if (a !== g[r]) return;
			t && (i.items = [], i.buffer = [], i.lastPageItemIds = []), ie(e.items, null, e.next_page ?? null), oe();
		} catch (e) {
			if (a !== g[r]) return;
			h.value = e instanceof Error ? e.message : "Search failed", t && (i.items = [], i.buffer = []);
		} finally {
			a === g[r] && (p.value = !1);
		}
	}
	async function se() {
		let e = n();
		if (!p.value) {
			if (e.buffer.length > 0) {
				oe();
				return;
			}
			!e.nextPage || m.value || (await D(), oe());
		}
	}
	async function ce(t) {
		let r = e.value, i = String(t);
		w.value = !0, n().selected = null;
		try {
			let e = await Ms(r, i, !d.value);
			n().selected = e;
		} catch (e) {
			h.value = e instanceof Error ? e.message : "Detail failed";
		} finally {
			w.value = !1;
		}
	}
	function le() {
		n().selected = null;
	}
	function ue(e) {
		let t = n(), r = String(e), i = new Set(t.batchIds);
		i.has(r) ? i.delete(r) : i.add(r), t.batchIds = i;
	}
	function de() {
		n().batchIds = /* @__PURE__ */ new Set();
	}
	function fe(e) {
		ne.value = e, e || de();
	}
	return {
		activeSource: e,
		setActiveSource: re,
		slices: t,
		q: r,
		searchType: i,
		contentTypes: a,
		baseModels: o,
		sort: s,
		period: c,
		civarchiveKind: l,
		civarchivePage: u,
		hideNsfwFromConfig: d,
		hideEarlyAccessFromConfig: f,
		loading: p,
		fetching: m,
		error: h,
		items: _,
		buffer: v,
		nextPage: y,
		lastPageItemIds: b,
		stoppedReason: x,
		hasMore: S,
		selected: C,
		detailLoading: w,
		category: ee,
		duplicateResolution: te,
		batchMode: ne,
		batchIds: T,
		search: O,
		loadMore: se,
		drainBuffer: oe,
		openModel: ce,
		closeDetail: le,
		toggleBatchId: ue,
		clearBatch: de,
		setBatchMode: fe,
		searchParams: E
	};
}), nc = 1500, rc = 1e4;
function ic(e) {
	let t = e.toLowerCase();
	return t === "queued" || t === "downloading" || t === "verifying";
}
function ac(e, t = 3500) {
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
var oc = xs("at-downloads", () => {
	let e = /* @__PURE__ */ L([]), t = /* @__PURE__ */ L(!1), n = /* @__PURE__ */ L(null), r = /* @__PURE__ */ L("browse");
	function i(e) {
		r.value = e;
	}
	let a = null, o = /* @__PURE__ */ L(/* @__PURE__ */ new Set());
	function s() {
		return e.value.some((e) => ic(e.state));
	}
	function c() {
		a != null && (clearTimeout(a), a = null);
		let e = s() ? nc : rc;
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
				r.value !== "downloads" && ac(`Download completed: ${n}`);
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
		showToast: ac
	};
}), sc = [
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
], cc = [
	"SD 1.5",
	"SD 2.1",
	"SDXL 1.0",
	"SDXL Turbo",
	"Pony",
	"Flux.1 D",
	"Flux.1 S",
	"SD 3.5",
	"SD 3.5 Large"
], lc = [
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
], uc = [
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
], dc = { class: "browse-filters" }, fc = { class: "browse-filters__body" }, pc = { class: "browse-filters__row" }, mc = { class: "browse-filters__row" }, hc = { class: "browse-filters__section" }, gc = { class: "browse-filters__chips" }, _c = ["checked", "onChange"], vc = { class: "browse-filters__section" }, yc = { class: "browse-filters__chips" }, bc = ["checked", "onChange"], xc = { class: "browse-filters__row" }, Sc = ["value"], Cc = { class: "browse-filters__row" }, wc = ["value"], Tc = /* @__PURE__ */ or({
	__name: "BrowseFilters",
	setup(e) {
		let { searchType: t, contentTypes: n, baseModels: r, sort: i, period: a, activeSource: o, civarchiveKind: s } = Ss(tc()), c = /* @__PURE__ */ L(!1);
		function l(e) {
			let t = n.value.slice(), r = t.indexOf(e);
			r >= 0 ? t.splice(r, 1) : t.push(e), n.value = t;
		}
		function u(e) {
			return n.value.includes(e);
		}
		function d(e) {
			let t = r.value.slice(), n = t.indexOf(e);
			n >= 0 ? t.splice(n, 1) : t.push(e), r.value = t;
		}
		function f(e) {
			return r.value.includes(e);
		}
		return (e, n) => (W(), G("div", dc, [K("button", {
			type: "button",
			class: "browse-filters__toggle",
			onClick: n[0] ||= (e) => c.value = !c.value
		}, A(c.value ? "▼" : "▶") + " Filters ", 1), B(K("div", fc, [R(o) === "civarchive" ? (W(), G(U, { key: 0 }, [K("label", pc, [n[6] ||= K("span", null, "Result kind", -1), B(K("select", {
			"onUpdate:modelValue": n[1] ||= (e) => /* @__PURE__ */ I(s) ? s.value = e : null,
			class: "at-input at-input--sm"
		}, [...n[5] ||= [
			K("option", { value: "version" }, "Version", -1),
			K("option", { value: "file" }, "File", -1),
			K("option", { value: "user" }, "User", -1)
		]], 512), [[Oo, R(s)]])]), n[7] ||= K("p", { class: "browse-filters__note" }, "Civitai-only filters are hidden for CivArchive search.", -1)], 64)) : (W(), G(U, { key: 1 }, [
			K("label", mc, [n[9] ||= K("span", null, "Search type", -1), B(K("select", {
				"onUpdate:modelValue": n[2] ||= (e) => /* @__PURE__ */ I(t) ? t.value = e : null,
				class: "at-input at-input--sm"
			}, [...n[8] ||= [
				K("option", { value: "model_name" }, "Model name", -1),
				K("option", { value: "username" }, "Username", -1),
				K("option", { value: "tag" }, "Tag", -1)
			]], 512), [[Oo, R(t)]])]),
			K("div", hc, [n[10] ||= K("span", { class: "browse-filters__label" }, "Content types", -1), K("div", gc, [(W(!0), G(U, null, jr(R(sc), (e) => (W(), G("label", {
				key: e,
				class: "browse-filters__chk"
			}, [K("input", {
				type: "checkbox",
				checked: u(e),
				onChange: (t) => l(e)
			}, null, 40, _c), J(" " + A(e), 1)]))), 128))])]),
			K("div", vc, [n[11] ||= K("span", { class: "browse-filters__label" }, "Base models", -1), K("div", yc, [(W(!0), G(U, null, jr(R(cc), (e) => (W(), G("label", {
				key: e,
				class: "browse-filters__chk"
			}, [K("input", {
				type: "checkbox",
				checked: f(e),
				onChange: (t) => d(e)
			}, null, 40, bc), J(" " + A(e), 1)]))), 128))])]),
			K("label", xc, [n[12] ||= K("span", null, "Sort", -1), B(K("select", {
				"onUpdate:modelValue": n[3] ||= (e) => /* @__PURE__ */ I(i) ? i.value = e : null,
				class: "at-input at-input--sm"
			}, [(W(!0), G(U, null, jr(R(lc), (e) => (W(), G("option", {
				key: e.value,
				value: e.value
			}, A(e.label), 9, Sc))), 128))], 512), [[Oo, R(i)]])]),
			K("label", Cc, [n[13] ||= K("span", null, "Period", -1), B(K("select", {
				"onUpdate:modelValue": n[4] ||= (e) => /* @__PURE__ */ I(a) ? a.value = e : null,
				class: "at-input at-input--sm"
			}, [(W(!0), G(U, null, jr(R(uc), (e) => (W(), G("option", {
				key: e.value,
				value: e.value
			}, A(e.label), 9, wc))), 128))], 512), [[Oo, R(a)]])])
		], 64))], 512), [[Wa, c.value]])]));
	}
}), Ec = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Dc = /* @__PURE__ */ Ec(Tc, [["__scopeId", "data-v-1cc55b2d"]]);
//#endregion
//#region src/utils/civitaiDisplay.ts
function Oc(e) {
	let t = e.creator?.username;
	return t ? String(t) : e.creator_username ? String(e.creator_username) : null;
}
function kc(e) {
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
function Ac(e) {
	let t = e.trim();
	return t || t;
}
//#endregion
//#region src/components/BrowseResultCard.vue?vue&type=script&setup=true&lang.ts
var jc = ["checked"], Mc = { class: "result-card__thumb" }, Nc = ["src"], Pc = ["src", "alt"], Fc = {
	key: 2,
	class: "result-card__video-badge"
}, Ic = {
	key: 1,
	class: "result-card__placeholder"
}, Lc = { class: "result-card__meta" }, Rc = { class: "result-card__name" }, zc = { class: "result-card__type" }, Bc = {
	key: 0,
	class: "result-card__creator"
}, Vc = {
	key: 1,
	class: "result-card__stats"
}, Hc = /* @__PURE__ */ Ec(/* @__PURE__ */ or({
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
		let s = Z(() => kc(n.item)), c = Z(() => (s.value?.type || "image").toLowerCase() === "video");
		function l(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function u(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		return (t, n) => (W(), G("div", {
			class: k(["result-card", {
				"result-card--batch": e.batchMode,
				"result-card--selected": e.batchSelected
			}]),
			onMouseenter: n[0] ||= (e) => c.value ? l(e) : void 0,
			onMouseleave: n[1] ||= (e) => c.value ? u(e) : void 0,
			onClick: a
		}, [
			e.batchMode ? (W(), G("div", {
				key: 0,
				class: "result-card__cb",
				onClick: Po(o, ["stop"])
			}, [K("input", {
				type: "checkbox",
				checked: e.batchSelected,
				tabindex: "-1",
				readonly: ""
			}, null, 8, jc)])) : Y("", !0),
			K("div", Mc, [s.value?.url ? (W(), G(U, { key: 0 }, [c.value ? (W(), G("video", {
				key: 0,
				class: "result-card__thumb-video",
				src: s.value.url,
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, Nc)) : (W(), G("img", {
				key: 1,
				src: R(Ac)(s.value.url),
				alt: e.item.name,
				loading: "lazy"
			}, null, 8, Pc)), c.value ? (W(), G("span", Fc, "Video")) : Y("", !0)], 64)) : (W(), G("div", Ic, "No preview"))]),
			K("div", Lc, [
				K("span", Rc, A(e.item.name), 1),
				K("span", zc, A(e.item.type), 1),
				R(Oc)(e.item) ? (W(), G("span", Bc, "by " + A(R(Oc)(e.item)), 1)) : Y("", !0),
				i(e.item) ? (W(), G("span", Vc, A(i(e.item)), 1)) : Y("", !0)
			])
		], 34));
	}
}), [["__scopeId", "data-v-a1df77b8"]]), Uc = { class: "result-grid" }, Wc = /* @__PURE__ */ Ec(/* @__PURE__ */ or({
	__name: "BrowseResultGrid",
	setup(e) {
		let t = tc(), { items: n, batchMode: r, batchIds: i } = Ss(t);
		return (e, a) => (W(), G("div", Uc, [(W(!0), G(U, null, jr(R(n), (e) => (W(), Qi(Hc, {
			key: e.id,
			item: e,
			"batch-mode": R(r),
			"batch-selected": R(i).has(String(e.id)),
			onOpen: (n) => R(t).openModel(e.id),
			onToggleBatch: (n) => R(t).toggleBatchId(String(e.id))
		}, null, 8, [
			"item",
			"batch-mode",
			"batch-selected",
			"onOpen",
			"onToggleBatch"
		]))), 128))]));
	}
}), [["__scopeId", "data-v-122357e1"]]);
//#endregion
//#region src/utils/filterFamilyForModelType.ts
function Gc(e) {
	let t = (e ?? "").trim().toLowerCase();
	if (t === "checkpoint") return "checkpoint";
	if (t) return "lora";
}
//#endregion
//#region ../web_shared/ImageMetaLightbox.vue?vue&type=script&setup=true&lang.ts
var Kc = ["src", "poster"], qc = ["src"], Jc = {
	key: 2,
	class: "at-imlb__meta"
}, Yc = /* @__PURE__ */ Ec(/* @__PURE__ */ or({
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
		return (t, i) => (W(), Qi(tr, { to: "body" }, [r.value ? (W(), G("div", {
			key: 0,
			class: "at-imlb",
			onClick: i[2] ||= Po((e) => t.$emit("close"), ["self"])
		}, [K("div", {
			class: "at-imlb__inner",
			onClick: i[1] ||= Po((e) => t.$emit("close"), ["self"])
		}, [
			K("button", {
				type: "button",
				class: "at-imlb__x",
				onClick: i[0] ||= (e) => t.$emit("close")
			}, "×"),
			n.value ? (W(), G("video", {
				key: e.playbackUrl || "",
				class: "at-imlb__video",
				src: e.playbackUrl || void 0,
				poster: e.posterUrl || e.imageUrl || void 0,
				controls: "",
				playsinline: ""
			}, null, 8, Kc)) : e.imageUrl ? (W(), G("img", {
				key: 1,
				src: e.imageUrl,
				alt: "Preview"
			}, null, 8, qc)) : Y("", !0),
			e.meta && Object.keys(e.meta).length ? (W(), G("pre", Jc, A(JSON.stringify(e.meta, null, 2)), 1)) : Y("", !0)
		])])) : Y("", !0)]));
	}
}), [["__scopeId", "data-v-76f82a61"]]), Xc = { class: "model-detail" }, Zc = { class: "model-detail__hdr" }, Qc = { class: "model-detail__sub" }, $c = { class: "pill" }, el = { key: 0 }, tl = { key: 1 }, nl = {
	key: 0,
	class: "model-detail__controls"
}, rl = { class: "at-label" }, il = ["value"], al = {
	key: 0,
	class: "at-label"
}, ol = ["value"], sl = {
	key: 1,
	class: "model-detail__desc"
}, cl = ["innerHTML"], ll = {
	key: 2,
	class: "model-detail__tw"
}, ul = { class: "model-detail__tw-row" }, dl = { class: "model-detail__tw-text" }, fl = {
	key: 3,
	class: "model-detail__gallery"
}, pl = { class: "model-detail__thumbs" }, ml = [
	"onMouseenter",
	"onMouseleave",
	"onClick"
], hl = ["src"], gl = ["src", "alt"], _l = { class: "model-detail__dl" }, vl = { class: "at-label" }, yl = {
	key: 0,
	class: "model-detail__cats-hint"
}, bl = ["list"], xl = ["id"], Sl = ["value"], Cl = { class: "model-detail__dup" }, wl = {
	key: 0,
	class: "model-detail__ea-dl-msg",
	role: "status"
}, Tl = { class: "model-detail__dl-btns" }, El = /* @__PURE__ */ Ec(/* @__PURE__ */ or({
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
		let c = t, { category: l, duplicateResolution: u, hideEarlyAccessFromConfig: d } = Ss(tc()), f = /* @__PURE__ */ L(0), p = /* @__PURE__ */ L(0), m = /* @__PURE__ */ L(!1), h = /* @__PURE__ */ L(null), g = /* @__PURE__ */ L(null), _ = /* @__PURE__ */ L(null), v = /* @__PURE__ */ L(null), y = /* @__PURE__ */ L(null), b = Z(() => n.model.modelVersions ?? []), x = Z(() => {
			let e = d.value;
			return b.value.filter((t) => e && t.isEarlyAccess ? !1 : !!t.files?.length).length;
		});
		Bn(() => [n.model.id, d.value], () => {
			f.value = r(n.model.modelVersions ?? [], d.value), p.value = 0, m.value = !1, h.value = null, g.value = null, _.value = null, v.value = null, y.value = null;
		});
		let S = Z(() => b.value[f.value] ?? null), C = Z(() => d.value && !!S.value?.isEarlyAccess), w = Z(() => S.value?.files ?? []);
		Bn(S, (e) => {
			if (p.value = 0, e?.files?.length) {
				let t = e.files.findIndex((e) => e.primary);
				t >= 0 && (p.value = t);
			}
		});
		let ee = Z(() => S.value?.images ?? []), te = /* @__PURE__ */ L([]), ne = /* @__PURE__ */ L(!1), T = Z(() => `at-browse-cats-${n.model.id}`);
		Bn(() => [n.model.id, n.model.type], async ([, e]) => {
			ne.value = !0;
			try {
				let t = Gc(e);
				te.value = (await Ns(t ? { family: t } : {})).categories ?? [];
			} catch {
				te.value = [];
			} finally {
				ne.value = !1;
			}
		}, { immediate: !0 });
		let re = Z(() => {
			let e = S.value?.trainedWords;
			return Array.isArray(e) ? e : [];
		});
		async function E(e) {
			try {
				await navigator.clipboard.writeText(e);
			} catch {
				c("error", "Copy failed");
			}
		}
		function ie() {
			let e = S.value, t = w.value;
			if (!e || !t.length) return null;
			let n = t[p.value] ?? t[0];
			return n?.id ? {
				versionId: e.id,
				fileId: n.id
			} : null;
		}
		async function ae() {
			if (C.value) return;
			let e = ie();
			if (!e) {
				c("error", "No file on this version");
				return;
			}
			try {
				n.model.source === "civarchive" ? await Ps({
					source: "civarchive",
					civarchive_model_id: typeof n.model.id == "number" ? n.model.id : Number(n.model.id),
					civarchive_version_id: e.versionId,
					civarchive_file_id: e.fileId,
					category: l.value.trim() || "General",
					duplicate_resolution: u.value
				}) : await Ps({
					civitai_model_id: n.model.id,
					version_id: e.versionId,
					file_id: e.fileId,
					category: l.value.trim() || "General",
					duplicate_resolution: u.value
				}), c("downloaded");
			} catch (e) {
				c("error", e instanceof Error ? e.message : "Download failed");
			}
		}
		async function D() {
			let e = [], t = d.value;
			for (let r of b.value) {
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
				await Fs(e, u.value), c("downloaded");
			} catch (e) {
				c("error", e instanceof Error ? e.message : "Batch download failed");
			}
		}
		function oe(e) {
			let t = (e.type || "image").toLowerCase();
			v.value = t, t === "video" ? (g.value = e.url, _.value = null, h.value = null) : (g.value = null, _.value = null, h.value = Ac(e.url));
			let n = e.meta;
			y.value = n && typeof n == "object" && Object.keys(n).length ? n : null;
		}
		function O(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function se(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		function ce() {
			h.value = null, g.value = null, _.value = null, v.value = null, y.value = null;
		}
		let le = Z(() => n.model.description?.trim() || "");
		return (t, n) => (W(), G("div", Xc, [
			K("div", Zc, [K("h3", null, A(e.model.name), 1), K("button", {
				type: "button",
				class: "at-btn",
				onClick: n[0] ||= (e) => c("close")
			}, "Close")]),
			K("p", Qc, [
				K("span", $c, A(e.model.type), 1),
				R(Oc)(e.model) ? (W(), G("span", el, " · " + A(R(Oc)(e.model)), 1)) : Y("", !0),
				S.value?.baseModel ? (W(), G("span", tl, " · " + A(S.value.baseModel), 1)) : Y("", !0)
			]),
			b.value.length ? (W(), G("div", nl, [K("label", rl, [n[8] ||= J(" Version ", -1), B(K("select", {
				"onUpdate:modelValue": n[1] ||= (e) => f.value = e,
				class: "at-input"
			}, [(W(!0), G(U, null, jr(b.value, (e, t) => (W(), G("option", {
				key: e.id,
				value: t
			}, A(i(e)), 9, il))), 128))], 512), [[
				Oo,
				f.value,
				void 0,
				{ number: !0 }
			]])]), w.value.length > 1 ? (W(), G("label", al, [n[9] ||= J(" File ", -1), B(K("select", {
				"onUpdate:modelValue": n[2] ||= (e) => p.value = e,
				class: "at-input"
			}, [(W(!0), G(U, null, jr(w.value, (e, t) => (W(), G("option", {
				key: e.id,
				value: t
			}, A(s(e)), 9, ol))), 128))], 512), [[
				Oo,
				p.value,
				void 0,
				{ number: !0 }
			]])])) : Y("", !0)])) : Y("", !0),
			le.value ? (W(), G("div", sl, [K("div", {
				class: k(["model-detail__desc-inner", { "model-detail__desc-inner--collapsed": !m.value && le.value.length > 400 }]),
				innerHTML: le.value
			}, null, 10, cl), le.value.length > 400 ? (W(), G("button", {
				key: 0,
				type: "button",
				class: "at-btn at-btn--link",
				onClick: n[3] ||= (e) => m.value = !m.value
			}, A(m.value ? "Show less" : "Show more"), 1)) : Y("", !0)])) : Y("", !0),
			re.value.length ? (W(), G("div", ll, [n[10] ||= K("span", { class: "model-detail__tw-label" }, "Trigger words", -1), K("div", ul, [K("code", dl, A(re.value.join(", ")), 1), K("button", {
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: n[4] ||= (e) => E(re.value.join(", "))
			}, "Copy")])])) : Y("", !0),
			ee.value.length ? (W(), G("div", fl, [n[12] ||= K("span", { class: "model-detail__tw-label" }, "Gallery", -1), K("div", pl, [(W(!0), G(U, null, jr(ee.value, (e, t) => (W(), G("button", {
				key: t,
				type: "button",
				class: "model-detail__thumb",
				onMouseenter: (t) => (e.type || "image").toLowerCase() === "video" ? O(t) : void 0,
				onMouseleave: (t) => (e.type || "image").toLowerCase() === "video" ? se(t) : void 0,
				onClick: (t) => oe(e)
			}, [(e.type || "image").toLowerCase() === "video" ? (W(), G(U, { key: 0 }, [K("video", {
				class: "model-detail__thumb-vid",
				src: e.url,
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, hl), n[11] ||= K("span", { class: "model-detail__vid" }, "Video", -1)], 64)) : (W(), G("img", {
				key: 1,
				src: R(Ac)(e.url),
				alt: `Image ${t}`,
				loading: "lazy"
			}, null, 8, gl))], 40, ml))), 128))])])) : Y("", !0),
			K("div", _l, [
				K("label", vl, [
					n[13] ||= J(" Category folder ", -1),
					ne.value ? (W(), G("span", yl, "Loading folders…")) : Y("", !0),
					B(K("input", {
						"onUpdate:modelValue": n[5] ||= (e) => /* @__PURE__ */ I(l) ? l.value = e : null,
						class: "at-input model-detail__category-combo",
						list: T.value,
						placeholder: "Pick from list or type a folder name (e.g. General)",
						autocomplete: "off",
						"aria-autocomplete": "list"
					}, null, 8, bl), [[wo, R(l)]]),
					K("datalist", { id: T.value }, [(W(!0), G(U, null, jr(te.value, (e) => (W(), G("option", {
						key: "dl-" + e,
						value: e
					}, null, 8, Sl))), 128))], 8, xl)
				]),
				K("fieldset", Cl, [
					n[16] ||= K("legend", null, "Duplicate file", -1),
					K("label", null, [B(K("input", {
						"onUpdate:modelValue": n[6] ||= (e) => /* @__PURE__ */ I(u) ? u.value = e : null,
						type: "radio",
						value: "skip"
					}, null, 512), [[Do, R(u)]]), n[14] ||= J(" Skip if exists", -1)]),
					K("label", null, [B(K("input", {
						"onUpdate:modelValue": n[7] ||= (e) => /* @__PURE__ */ I(u) ? u.value = e : null,
						type: "radio",
						value: "replace"
					}, null, 512), [[Do, R(u)]]), n[15] ||= J(" Replace", -1)])
				]),
				C.value ? (W(), G("p", wl, " Early-access version — not downloadable here. ")) : Y("", !0),
				K("div", Tl, [C.value ? Y("", !0) : (W(), G("button", {
					key: 0,
					type: "button",
					class: "at-btn",
					onClick: ae
				}, " Download ")), x.value > 1 ? (W(), G("button", {
					key: 1,
					type: "button",
					class: "at-btn",
					onClick: D
				}, " Download all versions ")) : Y("", !0)])
			]),
			q(Yc, {
				"image-url": h.value,
				"playback-url": g.value,
				"poster-url": _.value,
				"media-type": v.value,
				meta: y.value,
				onClose: ce
			}, null, 8, [
				"image-url",
				"playback-url",
				"poster-url",
				"media-type",
				"meta"
			])
		]));
	}
}), [["__scopeId", "data-v-82f33ace"]]), Dl = { class: "browse-detail-host" }, Ol = {
	key: 0,
	class: "browse-detail-host__extra"
}, kl = {
	key: 0,
	class: "browse-detail-host__sha"
}, Al = { class: "browse-detail-host__tbl" }, jl = { class: "browse-detail-host__url" }, Ml = ["href"], Nl = { key: 1 }, Pl = {
	key: 0,
	class: "browse-detail-host__pill"
}, Fl = {
	key: 1,
	class: "browse-detail-host__pill"
}, Il = {
	key: 2,
	class: "browse-detail-host__pill"
}, Ll = { key: 3 }, Rl = /* @__PURE__ */ Ec(/* @__PURE__ */ or({
	__name: "BrowseDetailHost",
	props: { model: {} },
	emits: [
		"close",
		"downloaded",
		"error"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i(e) {
			let t = e.sourceSections?.mirrors;
			return Array.isArray(t) ? t : [];
		}
		function a(e) {
			let t = (e ?? "").trim();
			return t ? t.startsWith("http://") || t.startsWith("https://") ? t : t.startsWith("//") ? `https:${t}` : t.startsWith("/") ? `https://civarchive.com${t}` : t : "";
		}
		return (e, t) => (W(), G("div", Dl, [q(El, {
			model: n.model,
			onClose: t[0] ||= (e) => r("close"),
			onDownloaded: t[1] ||= (e) => r("downloaded"),
			onError: t[2] ||= (e) => r("error", e)
		}, null, 8, ["model"]), n.model.source === "civarchive" && (i(n.model).length || n.model.sourceSections?.sha256) ? (W(), G("section", Ol, [n.model.sourceSections?.sha256 ? (W(), G("p", kl, [t[3] ||= K("span", { class: "browse-detail-host__sha-label" }, "SHA256", -1), K("code", null, A(n.model.sourceSections.sha256), 1)])) : Y("", !0), i(n.model).length ? (W(), G(U, { key: 1 }, [t[5] ||= K("h4", { class: "browse-detail-host__h" }, "Mirrors", -1), K("table", Al, [t[4] ||= K("thead", null, [K("tr", null, [
			K("th", null, "Source"),
			K("th", null, "URL"),
			K("th", null, "Flags")
		])], -1), K("tbody", null, [(W(!0), G(U, null, jr(i(n.model), (e, t) => (W(), G("tr", { key: t }, [
			K("td", null, A(e.source ?? "—"), 1),
			K("td", jl, [a(e.url) ? (W(), G("a", {
				key: 0,
				href: a(e.url),
				target: "_blank",
				rel: "noreferrer"
			}, A(a(e.url)), 9, Ml)) : (W(), G("span", Nl, "—"))]),
			K("td", null, [
				e.is_gated ? (W(), G("span", Pl, "gated")) : Y("", !0),
				e.is_paid ? (W(), G("span", Fl, "paid")) : Y("", !0),
				e.deletedAt == null ? Y("", !0) : (W(), G("span", Il, "deleted")),
				!e.is_gated && !e.is_paid && e.deletedAt == null ? (W(), G("span", Ll, "—")) : Y("", !0)
			])
		]))), 128))])])], 64)) : Y("", !0)])) : Y("", !0)]));
	}
}), [["__scopeId", "data-v-9c3dcba3"]]), zl = { class: "config-panel" }, Bl = {
	key: 0,
	class: "at-err"
}, Vl = {
	key: 1,
	class: "at-muted"
}, Hl = { class: "at-label" }, Ul = { class: "at-label" }, Wl = ["placeholder"], Gl = { class: "at-label at-label--row" }, Kl = { class: "at-label" }, ql = { class: "at-label" }, Jl = { class: "at-label" }, Yl = { class: "at-label" }, Xl = { class: "at-label" }, Zl = { class: "at-label at-label--row" }, Ql = { class: "at-label at-label--row" }, $l = { class: "at-label at-label--row" }, eu = { class: "at-label at-label--row" }, tu = { class: "config-panel__actions" }, nu = ["disabled"], ru = { class: "config-panel__status" }, iu = { class: "config-panel__pre" }, au = { class: "config-panel__pre" }, ou = /* @__PURE__ */ Ec(/* @__PURE__ */ or({
	__name: "ConfigPanel",
	setup(e) {
		let t = tc(), n = /* @__PURE__ */ L(!1), r = /* @__PURE__ */ L(null), i = /* @__PURE__ */ L(null), a = /* @__PURE__ */ L(Es()), o = /* @__PURE__ */ L(""), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = null;
		async function u() {
			n.value = !0, r.value = null;
			try {
				i.value = await Hs(), i.value && (typeof i.value.download_example_videos != "boolean" && (i.value.download_example_videos = !1), typeof i.value.generate_video_posters != "boolean" && (i.value.generate_video_posters = !0), (typeof i.value.max_example_images != "number" || !Number.isFinite(i.value.max_example_images)) && (i.value.max_example_images = 20)), a.value = Es(), o.value = "", t.hideNsfwFromConfig = !!i.value?.hide_nsfw, t.hideEarlyAccessFromConfig = i.value?.hide_early_access !== !1, s.value = await Gs(), c.value = await qs();
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
						generate_video_posters: i.value.generate_video_posters
					};
					o.value.trim() && (e.civitai_api_key = o.value.trim()), i.value = await Us(e), o.value = "", t.hideNsfwFromConfig = !!i.value?.hide_nsfw, t.hideEarlyAccessFromConfig = i.value?.hide_early_access !== !1;
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
		return xr(() => {
			u(), l = setInterval(() => void h(), 4e3);
		}), Tr(() => {
			l && clearInterval(l);
		}), (e, t) => (W(), G("div", zl, [
			r.value ? (W(), G("p", Bl, A(r.value), 1)) : Y("", !0),
			n.value && !i.value ? (W(), G("p", Vl, "Loading…")) : Y("", !0),
			i.value ? (W(), G(U, { key: 2 }, [
				K("label", Hl, [t[12] ||= J(" Server URL ", -1), B(K("input", {
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					class: "at-input",
					type: "url",
					autocomplete: "off"
				}, null, 512), [[wo, a.value]])]),
				t[27] ||= K("p", { class: "at-hint" }, [J(" Default: "), K("code", null, "http://127.0.0.1:8188")], -1),
				K("button", {
					type: "button",
					class: "at-btn at-btn--ghost",
					onClick: d
				}, "Apply server URL"),
				K("label", Ul, [t[13] ||= J(" Civitai API key ", -1), B(K("input", {
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					class: "at-input",
					type: "password",
					autocomplete: "off",
					placeholder: i.value.civitai_api_key_set ? "(unchanged — enter new key to replace)" : "Optional"
				}, null, 8, Wl), [[wo, o.value]])]),
				K("label", Gl, [B(K("input", {
					"onUpdate:modelValue": t[2] ||= (e) => i.value.scan_on_startup = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.scan_on_startup]]), t[14] ||= J(" Scan library on startup ", -1)]),
				K("label", Kl, [t[16] ||= J(" Enrichment mode ", -1), B(K("select", {
					"onUpdate:modelValue": t[3] ||= (e) => i.value.enrichment_mode = e,
					class: "at-input"
				}, [...t[15] ||= [
					K("option", { value: "auto" }, "Auto (during scan)", -1),
					K("option", { value: "background" }, "Background (after scan)", -1),
					K("option", { value: "manual" }, "Manual only", -1)
				]], 512), [[Oo, i.value.enrichment_mode]])]),
				K("label", ql, [t[17] ||= J(" Enrichment rate limit (ms) ", -1), B(K("input", {
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
				K("label", Jl, [t[18] ||= J(" Max example images per asset ", -1), B(K("input", {
					"onUpdate:modelValue": t[5] ||= (e) => i.value.max_example_images = e,
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
				t[28] ||= K("p", { class: "at-hint" }, " Gallery stills (and video slots) to download during enrichment or after a Civitai download. Range 1–200. ", -1),
				K("label", Yl, [t[19] ||= J(" Max parallel downloads ", -1), B(K("input", {
					"onUpdate:modelValue": t[6] ||= (e) => i.value.max_parallel_downloads = e,
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
				K("label", Xl, [t[20] ||= J(" Download subpath template ", -1), B(K("input", {
					"onUpdate:modelValue": t[7] ||= (e) => i.value.download_subpath_template = e,
					class: "at-input",
					placeholder: "{category}"
				}, null, 512), [[wo, i.value.download_subpath_template]])]),
				K("label", Zl, [B(K("input", {
					"onUpdate:modelValue": t[8] ||= (e) => i.value.hide_early_access = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.hide_early_access]]), t[21] ||= J(" Skip early-access downloads (Civitai) ", -1)]),
				K("label", Ql, [B(K("input", {
					"onUpdate:modelValue": t[9] ||= (e) => i.value.hide_nsfw = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.hide_nsfw]]), t[22] ||= J(" Hide NSFW from Civitai (browse search, detail, and related API calls) ", -1)]),
				K("label", $l, [B(K("input", {
					"onUpdate:modelValue": t[10] ||= (e) => i.value.download_example_videos = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.download_example_videos]]), t[23] ||= J(" Download gallery video samples during enrichment (uses more disk; enables offline video in sidebars) ", -1)]),
				K("label", eu, [B(K("input", {
					"onUpdate:modelValue": t[11] ||= (e) => i.value.generate_video_posters = e,
					type: "checkbox"
				}, null, 512), [[To, i.value.generate_video_posters]]), t[24] ||= J(" Generate JPEG poster frames for video samples (uses ffmpeg when available; still images work without it) ", -1)]),
				K("div", tu, [
					K("button", {
						type: "button",
						class: "at-btn",
						disabled: n.value,
						onClick: f
					}, "Save settings", 8, nu),
					K("button", {
						type: "button",
						class: "at-btn",
						onClick: p
					}, "Scan now"),
					K("button", {
						type: "button",
						class: "at-btn",
						onClick: m
					}, "Enrich now"),
					K("button", {
						type: "button",
						class: "at-btn at-btn--ghost",
						onClick: u
					}, "Reload")
				]),
				K("div", ru, [
					t[25] ||= K("h4", null, "Scan", -1),
					K("pre", iu, A(JSON.stringify(s.value, null, 2)), 1),
					t[26] ||= K("h4", null, "Enrichment", -1),
					K("pre", au, A(JSON.stringify(c.value, null, 2)), 1)
				])
			], 64)) : Y("", !0)
		]));
	}
}), [["__scopeId", "data-v-0ed77095"]]), su = {
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
}, cu = [{
	id: "civitai",
	label: "Civitai"
}, {
	id: su.id,
	label: su.label
}];
//#endregion
//#region src/utils/downloadSpec.ts
function lu(e, t) {
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
var uu = { class: "at-browse-app" }, du = { class: "at-browse-app__tabs" }, fu = {
	key: 0,
	class: "at-browse-app__panel at-browse-app__panel--browse"
}, pu = { class: "at-browse-app__browse-chrome" }, mu = { class: "at-browse-app__search" }, hu = ["value"], gu = ["value"], _u = ["placeholder"], vu = ["disabled"], yu = {
	key: "browse-batch-bar",
	class: "at-batch-bar"
}, bu = {
	key: "browse-search-error",
	class: "at-err"
}, xu = {
	key: "browse-detail-panel",
	class: "at-browse-app__detail-panel"
}, Su = {
	key: 0,
	class: "at-muted"
}, Cu = {
	key: 0,
	class: "at-muted"
}, wu = {
	key: 1,
	class: "at-muted"
}, Tu = {
	key: 1,
	class: "at-browse-app__panel"
}, Eu = {
	key: 0,
	class: "at-err"
}, Du = { class: "at-dl-list" }, Ou = { class: "at-dl__row" }, ku = ["src"], Au = { class: "at-dl__main" }, ju = { class: "at-dl__title" }, Mu = {
	key: 0,
	class: "at-dl__err"
}, Nu = {
	key: 1,
	class: "at-dl__bar"
}, Pu = { class: "at-dl__actions" }, Fu = ["onClick"], Iu = ["onClick"], Lu = ["onClick"], Ru = ["onClick"], zu = {
	key: 2,
	class: "at-browse-app__panel at-browse-app__panel--scroll"
}, Bu = 200, Vu = /* @__PURE__ */ Ec(/* @__PURE__ */ or({
	__name: "App",
	setup(e) {
		let t = tc(), n = oc(), { items: r, loading: i, fetching: a, error: o, q: s, selected: c, detailLoading: l, batchMode: u, batchIds: d, duplicateResolution: f, hasMore: p, stoppedReason: m } = Ss(t), { tasks: h, activeTab: g } = Ss(n), _ = /* @__PURE__ */ L(null);
		function v(e) {
			return e.scrollHeight - e.scrollTop - e.clientHeight <= Bu;
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
		function S() {
			x();
		}
		Bn(() => _.value, (e, t) => {
			t && t.removeEventListener("scroll", S), e && (e.addEventListener("scroll", S, { passive: !0 }), x());
		}, { flush: "post" }), Bn([
			r,
			i,
			a
		], () => {
			x();
		});
		let C = /* @__PURE__ */ L(!1);
		Bn(() => t.hideNsfwFromConfig, () => {
			C.value && t.search(!0);
		}), xr(async () => {
			n.startPolling();
			try {
				let e = await Hs();
				t.hideNsfwFromConfig = !!e.hide_nsfw, t.hideEarlyAccessFromConfig = e.hide_early_access !== !1;
			} catch {}
			t.search(!0).finally(() => {
				C.value = !0;
			});
		}), Tr(() => {
			let e = _.value;
			e && e.removeEventListener("scroll", S), n.stopPolling();
		});
		async function w() {
			await t.search(!0);
		}
		function ee(e) {
			n.setTab(e), e === "downloads" && n.refresh();
		}
		async function te() {
			n.showToast("Download queued"), n.refresh();
		}
		function ne(e) {
			n.showToast(e);
		}
		let T = Z(() => t.activeSource === "civitai" ? "Search Civitai…" : "Search CivArchive…");
		function re(e) {
			let n = e.target.value;
			t.setActiveSource(n), t.search(!0);
		}
		async function E() {
			let e = [];
			for (let n of d.value) {
				let i = r.value.find((e) => String(e.id) === n);
				if (!i) continue;
				let a = lu(i, { skipEarlyAccessDownloads: t.hideEarlyAccessFromConfig });
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
		function ie(e) {
			let t = e.toLowerCase();
			return t === "queued" || t === "downloading" || t === "verifying";
		}
		function ae(e) {
			let t = e.toLowerCase();
			return t === "downloading" || t === "verifying";
		}
		function D(e) {
			return e.toLowerCase() === "failed";
		}
		function oe(e) {
			let t = e.toLowerCase();
			return t === "completed" || t === "failed" || t === "cancelled" || t === "skipped" || t === "paused";
		}
		function O(e) {
			n.$patch({ error: e });
		}
		async function se(e) {
			try {
				await Bs(e), n.refresh();
			} catch (e) {
				O(e instanceof Error ? e.message : "Pause failed");
			}
		}
		async function ce(e) {
			try {
				await Rs(e), n.refresh();
			} catch (e) {
				O(e instanceof Error ? e.message : "Cancel failed");
			}
		}
		async function le(e) {
			try {
				await zs(e), n.refresh();
			} catch (e) {
				O(e instanceof Error ? e.message : "Retry failed");
			}
		}
		async function de(e) {
			try {
				await Vs(e), n.refresh();
			} catch (e) {
				O(e instanceof Error ? e.message : "Remove failed");
			}
		}
		return (e, r) => (W(), G("div", uu, [K("header", du, [
			K("button", {
				type: "button",
				class: k({ active: R(g) === "browse" }),
				onClick: r[0] ||= (e) => ee("browse")
			}, "Browse", 2),
			K("button", {
				type: "button",
				class: k({ active: R(g) === "downloads" }),
				onClick: r[1] ||= (e) => ee("downloads")
			}, "Downloads", 2),
			K("button", {
				type: "button",
				class: k(["at-browse-app__tabs-settings", { active: R(g) === "settings" }]),
				title: "Settings",
				"aria-label": "Settings",
				onClick: r[2] ||= (e) => ee("settings")
			}, " ⚙ ", 2)
		]), R(g) === "browse" ? (W(), G("div", fu, [
			K("div", pu, [
				K("div", mu, [
					K("select", {
						class: "at-input at-browse-app__source-select",
						"aria-label": "Browse source",
						value: R(t).activeSource,
						onChange: re
					}, [(W(!0), G(U, null, jr(R(cu), (e) => (W(), G("option", {
						key: e.id,
						value: e.id
					}, A(e.label), 9, gu))), 128))], 40, hu),
					B(K("input", {
						"onUpdate:modelValue": r[3] ||= (e) => /* @__PURE__ */ I(s) ? s.value = e : null,
						class: "at-input",
						placeholder: T.value,
						onKeyup: Io(w, ["enter"])
					}, null, 40, _u), [[wo, R(s)]]),
					K("button", {
						type: "button",
						class: "at-btn",
						disabled: R(i),
						onClick: w
					}, "Search", 8, vu),
					K("button", {
						type: "button",
						class: k(["at-btn", { "at-btn--on": R(u) }]),
						onClick: r[4] ||= (e) => R(t).setBatchMode(!R(u))
					}, A(R(u) ? "Exit batch" : "Batch select"), 3)
				]),
				q(Dc),
				R(u) && R(d).size ? (W(), G("div", yu, [
					K("span", null, A(R(d).size) + " selected", 1),
					K("button", {
						type: "button",
						class: "at-btn at-btn--sm",
						onClick: E
					}, "Download selected"),
					K("button", {
						type: "button",
						class: "at-btn at-btn--sm at-btn--ghost",
						onClick: r[5] ||= (...e) => R(t).clearBatch && R(t).clearBatch(...e)
					}, "Clear")
				])) : Y("", !0),
				R(o) ? (W(), G("p", bu, A(R(o)), 1)) : Y("", !0)
			]),
			R(l) || R(c) ? (W(), G("div", xu, [R(l) ? (W(), G("p", Su, "Loading model…")) : R(c) ? (W(), Qi(Rl, {
				key: 1,
				model: R(c),
				onClose: r[6] ||= (e) => R(t).closeDetail(),
				onDownloaded: r[7] ||= (e) => te(),
				onError: ne
			}, null, 8, ["model"])) : Y("", !0)])) : Y("", !0),
			K("div", {
				ref_key: "scrollRoot",
				ref: _,
				class: "at-browse-app__browse-scroll"
			}, [
				q(Wc),
				R(a) ? (W(), G("p", Cu, "Loading more…")) : Y("", !0),
				R(m) && !R(a) ? (W(), G("p", wu, A(R(m)), 1)) : Y("", !0)
			], 512)
		])) : R(g) === "downloads" ? (W(), G("div", Tu, [R(n).error ? (W(), G("p", Eu, A(R(n).error), 1)) : Y("", !0), K("ul", Du, [(W(!0), G(U, null, jr(R(h), (e) => (W(), G("li", {
			key: e.id,
			class: "at-dl"
		}, [K("div", Ou, [Js(e.cover_thumb_url) ? (W(), G("img", {
			key: 0,
			class: "at-dl__thumb",
			src: Js(e.cover_thumb_url),
			alt: ""
		}, null, 8, ku)) : Y("", !0), K("div", Au, [
			K("div", ju, A(e.display_name || e.filename) + " — " + A(e.state), 1),
			e.error_message ? (W(), G("div", Mu, A(e.error_message), 1)) : Y("", !0),
			e.total_bytes ? (W(), G("div", Nu, [K("div", {
				class: "at-dl__fill",
				style: ue({ width: `${Math.min(100, Math.round(100 * e.bytes_done / (e.total_bytes || 1)))}%` })
			}, null, 4)])) : Y("", !0)
		])]), K("div", Pu, [
			ie(e.state) ? (W(), G("button", {
				key: 0,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => ce(e.id)
			}, "Cancel", 8, Fu)) : Y("", !0),
			ae(e.state) ? (W(), G("button", {
				key: 1,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => se(e.id)
			}, "Pause", 8, Iu)) : Y("", !0),
			D(e.state) ? (W(), G("button", {
				key: 2,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => le(e.id)
			}, "Retry", 8, Lu)) : Y("", !0),
			oe(e.state) ? (W(), G("button", {
				key: 3,
				type: "button",
				class: "at-btn at-btn--sm",
				onClick: (t) => de(e.id)
			}, "Remove", 8, Ru)) : Y("", !0)
		])]))), 128))])])) : (W(), G("div", zu, [q(ou)]))]));
	}
}), [["__scopeId", "data-v-2a6aa553"]]);
//#endregion
//#region src/main.ts
function Hu(e) {
	let t = ss(), n = Bo(Vu);
	return n.use(t), n.mount(e), n;
}
//#endregion
export { Hu as mount };
