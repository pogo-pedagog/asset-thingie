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
var B = null, An = null;
function jn(e) {
	let t = B;
	return B = e, An = e && e.type.__scopeId || null, t;
}
function Mn(e, t = B, n) {
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
function Nn(e, n) {
	if (B === null) return e;
	let r = Da(B), i = e.dirs ||= [];
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
	if (Q) {
		let n = Q.provides, r = Q.parent && Q.parent.provides;
		r === n && (n = Q.provides = Object.create(r)), n[e] = t;
	}
}
function In(e, t, n = !1) {
	let r = fa();
	if (r || $r) {
		let i = $r ? $r._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function Ln() {
	return !!(fa() || $r);
}
var Rn = /* @__PURE__ */ Symbol.for("v-scx"), zn = () => In(Rn);
function Bn(e, t, n) {
	return Vn(e, t, n);
}
function Vn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (va) {
		if (c === "sync") {
			let e = zn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Q;
	u.call = (e, t, n) => fn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		U(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Cn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = ln(e, n, u);
	return va && (f ? f.push(h) : d && h()), h;
}
function Hn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Un(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ha(this), s = Vn(i, a.bind(r), n);
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
			Wn.set(e, t), U(t, a);
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
			if (o === "svg" || Yn(p) ? o = "svg" : (o === "mathml" || Xn(p)) && (o = "mathml"), v ? (f(e.dynamicChildren, v, y, i, a, o, s), Fi(e, t, !0)) : c || d(e, t, y, b, i, a, o, s, !1), _) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : $n(t, n, r, l, 1);
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
	let s = a.shapeFlag & 4 ? Da(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ F(v), b = v === t ? i : (e) => cr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && cr(_, t));
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
				t.id = -1, lr.set(e, t), U(t, r);
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
function gr(e, t, n = Q) {
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
function vr(e, t, n = Q, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			We();
			let i = ha(n), a = fn(t, n, e, r);
			return i(), Ge(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var yr = (e) => (t, n = Q) => {
	(!va || e === "sp") && vr(e, (...e) => t(...e), n);
}, br = yr("bm"), xr = yr("m"), Sr = yr("bu"), Cr = yr("u"), wr = yr("bum"), Tr = yr("um"), Er = yr("sp"), Dr = yr("rtg"), Or = yr("rtc");
function kr(e, t = Q) {
	vr("ec", e, t);
}
var Ar = /* @__PURE__ */ Symbol.for("v-ndc");
function V(e, t, n, r) {
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
var jr = (e) => e ? _a(e) ? Da(e) : jr(e.parent) : null, Mr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
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
		Cn(e.update);
	},
	$nextTick: (e) => e.n ||= xn.bind(e.proxy),
	$watch: (e) => Hn.bind(e)
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
		if (d) return n === "$attrs" && N(e.attrs, "get", ""), d(e);
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
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: te, renderTriggered: ne, errorCaptured: T, serverPrefetch: re, expose: E, inheritAttrs: ie, components: ae, directives: D, filters: oe } = t;
	if (u && Rr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Lt(t));
	}
	if (Ir = !0, o) for (let e in o) {
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
	if (c) for (let e in c) Br(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Fn(t, e[t]);
		});
	}
	f && zr(f, e, "c");
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
function Rr(e, t, n = r) {
	d(e) && (e = Kr(e));
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
function zr(e, t, n) {
	fn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Br(e, t, n, r) {
	let i = r.includes(".") ? Un(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Bn(i, n);
	} else if (h(e)) Bn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Br(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && Bn(i, r, e);
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
					let u = l._ceVNode || Y(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Da(u.component);
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
var $r = null, ei = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${E(t)}Modifiers`];
function ti(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && ei(i, n.slice(7));
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
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, E(t)) || u(e, t));
}
function ai(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = jn(e), v, y;
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
			}) : e(f, null)), y = t.props ? c : oi(c);
		}
	} catch (t) {
		Gi.length = 0, pn(t, e, 1), v = Y(Ui);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = si(y, a)), b = ra(b, y, !1, !0));
	}
	return n.dirs && (b = ra(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ar(b, n.transition), v = b, jn(_), v;
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
	return n === "style" && v(r) && v(i) ? !ye(r, i) : r !== i;
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
	n ? e.props = r ? i : /* @__PURE__ */ Rt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function gi(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ F(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ii(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = T(o);
					i[t] = vi(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		_i(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = E(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = vi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && tt(e.attrs, "set", "");
}
function _i(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : ii(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ F(r), i = c || t;
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
					let o = ha(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === E(n)) && (r = !0));
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
		let n = T(c[e]);
		xi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
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
	return e[0] !== "$" && !ee(e);
}
var Si = (e) => e === "_" || e === "_ctx" || e === "$stable", Ci = (e) => d(e) ? e.map(ia) : [ia(e)], wi = (e, t, n) => {
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
		e ? (Di(r, t, n), n && O(r, "_", e, !0)) : Ti(t, r);
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
	let a = le();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Qi(e, t) && (r = ye(e), k(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
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
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, Mi(e, a), s, u), _ && Pn(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ca(f, r, e);
		}
		_ && Pn(e, null, r, "beforeMount");
		let v = Pi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && U(() => {
			try {
				f && ca(f, r, e), v && g.enter(d), _ && Pn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Bi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? aa(e[l]) : ia(e[l]), t, n, r, i, a, o, s);
	}, re = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Ni(r, !1), (g = h.onVnodeBeforeUpdate) && ca(g, r, n, e), f && Pn(n, e, r, "beforeUpdate"), r && Ni(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? E(e.dynamicChildren, d, l, r, i, Mi(n, a), o) : s || de(e, n, l, null, r, i, Mi(n, a), o, !1), u > 0) {
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
		((g = h.onVnodeUpdated) || f) && U(() => {
			g && ca(g, r, n, e), f && Pn(n, e, r, "updated");
		}, i);
	}, E = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === W || !Qi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
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
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (E(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Fi(e, t, !0)) : de(e, t, n, f, i, a, s, c, l);
	}, D = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : O(t, n, r, i, a, o, c) : se(e, t, c);
	}, O = (e, t, n, r, i, a, o) => {
		let s = e.component = da(e, r, i);
		if (pr(e) && (s.ctx.renderer = A), ya(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ce, o), !e.el) {
				let r = s.subTree = Y(Ui);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ce(s, e, t, n, i, a, o);
	}, se = (e, t, n) => {
		let r = t.component = e.component;
		if (ci(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			ue(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ce = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Li(e);
					if (n) {
						t && (t.el = c.el, ue(e, t, o)), n.asyncDep.then(() => {
							U(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ni(e, !1), t ? (t.el = c.el, ue(e, t, o)) : t = c, n && oe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ca(d, s, t, c), Ni(e, !0);
				let f = ai(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ye(p), e, i, a), t.el = f.el, u === null && di(e, f.el), r && U(r, i), (d = t.props && t.props.onVnodeUpdated) && U(() => ca(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = fr(t);
				if (Ni(e, !1), l && oe(l), !m && (o = c && c.onVnodeBeforeMount) && ca(o, d, t), Ni(e, !0), s && Ce) {
					let t = () => {
						e.subTree = ai(e), Ce(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ai(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && U(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					U(() => ca(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && fr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && U(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new ke(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Cn(u), Ni(e, !0), l();
	}, ue = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, gi(e, t.props, r, n), ki(e, t.children, n), We(), En(e), Ge();
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
			let n = t[p] = l ? aa(t[p]) : ia(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ve(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, pe = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? aa(t[u]) : ia(t[u]);
			if (Qi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? aa(t[p]) : ia(t[p]);
			if (Qi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? aa(t[u]) : ia(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) k(e[u], a, o, !0), u++;
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
					k(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Qi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? k(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ii(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || zi(f) : i;
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
		if (c === W) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) me(u[e], t, n, r);
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
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ca(_, t, e), u & 6) _e(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Pn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, A, r) : l && !l.hasOnce && (a !== W || d > 0 && d & 64) ? ve(l, t, n, !1, !0) : (a === W && d & 384 || !i && u & 16) && ve(c, t, n), r && he(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && U(() => {
			_ && ca(_, t, e), h && Pn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, he = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === W) {
			ge(n, r);
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
	}, ge = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, _e = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ri(c), Ri(l), r && oe(r), i.stop(), a && (a.flags |= 8, k(o, e, t, n)), s && U(s, t), U(() => {
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
		createApp: Qr(xe, Se)
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
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = aa(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Fi(t, a)), a.type === Hi && (a.patchFlag === -1 && (a = i[e] = aa(a)), a.el = t.el), a.type === Ui && !a.el && (a.el = t.el);
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
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Tn(e);
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
	return Yi(Y(e, t, n, r, i, !0));
}
function Zi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Qi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var $i = ({ key: e }) => e ?? null, ea = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ I(e) || h(e) ? {
	i: B,
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
		ctx: B
	};
	return s ? (oa(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), qi > 0 && !o && G && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && G.push(c), c;
}
var Y = ta;
function ta(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Ar) && (e = Ui), Zi(e)) {
		let r = ra(e, t, !0);
		return n && oa(r, n), qi > 0 && !a && G && (r.shapeFlag & 6 ? G[G.indexOf(e)] = r : G.push(r)), r.patchFlag = -2, r;
	}
	if (Oa(e) && (e = e.__vccOpts), t) {
		t = na(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = k(e)), v(n) && (/* @__PURE__ */ Ut(n) && !d(n) && (n = s({}, n)), t.style = ue(n));
	}
	let o = g(e) ? 1 : Bi(e) ? 128 : Kn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return J(e, t, n, r, i, o, a, !0);
}
function na(e) {
	return e ? /* @__PURE__ */ Ut(e) || mi(e) ? s({}, e) : e : null;
}
function ra(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? sa(i || {}, t) : i, u = {
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
		ssContent: e.ssContent && ra(e.ssContent),
		ssFallback: e.ssFallback && ra(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ar(u, c.clone(u)), u;
}
function X(e = " ", t = 0) {
	return Y(Hi, null, e, t);
}
function Z(e = "", t = !1) {
	return t ? (K(), Xi(Ui, null, e)) : Y(Ui, null, e);
}
function ia(e) {
	return e == null || typeof e == "boolean" ? Y(Ui) : d(e) ? Y(W, null, e.slice()) : Zi(e) ? aa(e) : Y(Hi, null, String(e));
}
function aa(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : ra(e);
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
		!r && !mi(t) ? t._ctx = B : r === 3 && B && (B.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: B
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [X(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function sa(...e) {
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
function ca(e, t, n, r = null) {
	fn(e, t, 7, [n, r]);
}
var la = Xr(), ua = 0;
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
var Q = null, fa = () => Q || B, pa, ma;
{
	let e = le(), t = (t, n) => {
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
	hi(e, r, a, t), Oi(e, i, n || t);
	let o = a ? ba(e, t) : void 0;
	return t && ma(!1), o;
}
function ba(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Pr);
	let { setup: r } = n;
	if (r) {
		We();
		let n = e.setupContext = r.length > 1 ? Ea(e) : null, i = ha(e), a = dn(r, e, 0, [e.props, n]), o = y(a);
		if (Ge(), i(), (o || e.sp) && !fr(e) && sr(e), o) {
			if (a.then(ga, ga), t) return a.then((n) => {
				xa(e, n, t);
			}).catch((t) => {
				pn(t, e, 0);
			});
			e.asyncDep = a;
		} else xa(e, a, t);
	} else wa(e, t);
}
function xa(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Xt(t)), wa(e, n);
}
var Sa, Ca;
function wa(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && Sa && !i.render) {
			let t = i.template || Vr(e).template;
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
		We();
		try {
			Lr(e);
		} finally {
			Ge(), t();
		}
	}
}
var Ta = { get(e, t) {
	return N(e, "get", ""), e[t];
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
	return e.exposed ? e.exposeProxy ||= new Proxy(Xt(Wt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Mr) return Mr[n](e);
		},
		has(e, t) {
			return t in e || t in Mr;
		}
	}) : e.proxy;
}
function Oa(e) {
	return h(e) && "__vccOpts" in e;
}
var $ = (e, t) => /* @__PURE__ */ rn(e, t, va), ka = "3.5.32", Aa = void 0, ja = typeof window < "u" && window.trustedTypes;
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
		Ga.test(n) ? e.setProperty(E(r), n.replace(Ga, ""), "important") : e[r] = n;
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
	let r = T(t);
	if (r !== "filter" && r in e) return Ja[t] = r;
	r = ie(r);
	for (let n = 0; n < qa.length; n++) {
		let i = qa[n] + r;
		if (i in e) return Ja[t] = i;
	}
	return t;
}
var Xa = "http://www.w3.org/1999/xlink";
function Za(e, t, n, r, i, a = ge(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Xa, t.slice(6, t.length)) : e.setAttributeNS(Xa, t, n) : n == null || a && !_e(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
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
		r === "boolean" ? n = _e(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
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
	return [e[2] === ":" ? e.slice(3) : E(e.slice(2)), t];
}
var ao = 0, oo = /* @__PURE__ */ Promise.resolve(), so = () => ao ||= (oo.then(() => ao = 0), Date.now());
function co(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		fn(lo(e, n.value), t, 5, [e]);
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
	t === "class" ? za(e, r, c) : t === "style" ? Wa(e, n, r) : a(t) ? o(t) || no(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : po(e, t, r, c)) ? (Qa(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Za(e, t, r, c, s, t !== "value")) : e._isVueCE && (mo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? Qa(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Za(e, t, r, c));
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
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var ho = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => oe(t, e) : t;
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
	return t && (e = e.trim()), n && (e = se(e)), e;
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
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? se(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, xo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		$a(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? se(Co(e)) : Co(e));
			e[vo](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, xn(() => {
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
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = be(t, o) > -1;
			} else a.selected = t.has(o);
			else if (ye(Co(a), t)) {
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
	return Oo ||= Ai(Do);
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
	let e = Te(!0), t = e.run(() => /* @__PURE__ */ L({})), n = [], r = [], i = Wt({
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
	return !n && Ee() && De(i), i;
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
		Lo(i) && Lo(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ I(r) && !/* @__PURE__ */ Vt(r) ? e[n] = is(i, r) : e[n] = r;
	}
	return e;
}
var as = Symbol();
function os(e) {
	return !Lo(e) || !Object.prototype.hasOwnProperty.call(e, as);
}
var { assign: ss } = Object;
function cs(e) {
	return !!(/* @__PURE__ */ I(e) && e.effect);
}
function ls(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), ss(/* @__PURE__ */ Zt(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Wt($(() => {
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
		xn().then(() => {
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
	}, y = /* @__PURE__ */ Lt({
		_p: r,
		$id: e,
		$onAction: $o.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = $o(d, t, n.detached, () => a()), a = o.run(() => Bn(() => r.state.value[e], (r) => {
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
	let b = (r._a && r._a.runWithContext || ts)(() => r._e.run(() => (o = Te()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ I(n) && !cs(n) || /* @__PURE__ */ Vt(n) ? a || (p && os(n) && (/* @__PURE__ */ I(n) ? n.value = p[t] : is(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return ss(y, b), ss(/* @__PURE__ */ F(y), b), Object.defineProperty(y, "$state", {
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
		let o = Ln();
		return n ||= o ? In(Io, null) : null, n && Fo(n), n = Po, n._s.has(e) || (i ? us(e, t, r, n) : ls(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
function fs(e) {
	let t = /* @__PURE__ */ F(e), n = {};
	for (let r in t) {
		let i = t[r];
		i.effect ? n[r] = $({
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
	let e = /* @__PURE__ */ L(!1), t = /* @__PURE__ */ L([]), n = /* @__PURE__ */ L(0), r = /* @__PURE__ */ L(0), i = /* @__PURE__ */ L(Is), a = /* @__PURE__ */ L(!1), o = /* @__PURE__ */ L(!1), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(""), l = /* @__PURE__ */ L(""), u = null;
	Bn(c, (e) => {
		u && clearTimeout(u), u = setTimeout(() => {
			l.value = e, u = null, A(!0);
		}, 300);
	});
	let d = /* @__PURE__ */ L(""), f = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(""), m = /* @__PURE__ */ L(""), h = /* @__PURE__ */ L(""), g = /* @__PURE__ */ L([]), _ = /* @__PURE__ */ L([]), v = /* @__PURE__ */ L(""), y = /* @__PURE__ */ L(""), b = /* @__PURE__ */ L(""), x = /* @__PURE__ */ L("grid"), S = /* @__PURE__ */ L(Ns), C = /* @__PURE__ */ L(!1), w = /* @__PURE__ */ L(gs()), ee = /* @__PURE__ */ L(null), te = /* @__PURE__ */ L(null), ne = /* @__PURE__ */ L(null), T = /* @__PURE__ */ L(!1), re = /* @__PURE__ */ L(!1), E = /* @__PURE__ */ L(/* @__PURE__ */ new Set());
	try {
		let e = localStorage.getItem(js);
		(e === "list" || e === "grid") && (x.value = e);
		let t = localStorage.getItem(Ms);
		t != null && (S.value = Ls(parseInt(t, 10)));
	} catch {}
	let ie = $(() => t.value.length < n.value), ae = $(() => E.value.size);
	function D(e) {
		return E.value.has(e);
	}
	function oe(e) {
		let t = new Set(E.value);
		t.has(e) ? t.delete(e) : t.add(e), E.value = t;
	}
	function O() {
		E.value = /* @__PURE__ */ new Set();
	}
	function se() {
		re.value = !re.value, re.value || O();
	}
	function ce() {
		let e = new Set(E.value);
		for (let n of t.value) e.add(n.asset_id);
		E.value = e;
	}
	async function le() {
		let e = [...E.value];
		if (!e.length) {
			Te("No assets selected");
			return;
		}
		try {
			let t = await As(e);
			Te(`Re-enrich: ${t.processed} ok${t.failed ? `, ${t.failed} failed` : ""}`), O(), re.value = !1, await A(!0);
		} catch (e) {
			Te(e instanceof Error ? e.message : "Batch re-enrich failed");
		}
	}
	async function ue() {
		try {
			e.value = !!(await xs()).ok, s.value = null;
		} catch (t) {
			e.value = !1, s.value = t instanceof Error ? t.message : "Connection failed";
		}
	}
	async function de() {
		try {
			f.value = await Ss("Checkpoint", void 0, _.value.length > 0 ? [..._.value] : void 0);
		} catch {
			f.value = null;
		}
	}
	async function fe() {
		if (e.value) try {
			let e = await Cs(p.value || void 0, "checkpoint");
			g.value = e.folders, m.value = e.parent_path, h.value ||= e.parent_path;
		} catch {
			g.value = [];
		}
	}
	function pe(e) {
		y.value = y.value === e ? "" : e, y.value === "folder" ? fe() : y.value === "tag" && de();
	}
	function me(e) {
		p.value = `${m.value.replace(/\/$/, "")}/${e}`, fe(), A(!0);
	}
	function k(e) {
		p.value = e, fe(), A(!0);
	}
	function he() {
		p.value = "", fe(), A(!0);
	}
	function ge(e) {
		let t = e.trim();
		if (!t) return;
		let n = _.value, r = n.indexOf(t);
		r >= 0 ? _.value = n.filter((e, t) => t !== r) : _.value = [...n, t], A(!0), de();
	}
	function _e() {
		_.value = [], b.value = "", A(!0), de();
	}
	function ve(e) {
		let t = e.trim();
		v.value === t ? v.value = "" : v.value = t, A(!0);
	}
	function ye() {
		v.value = "", A(!0);
	}
	function be() {
		let e = l.value.trim();
		if (!e) return;
		let t = /^(name|trigger|category|tag):$/i;
		return e.split(",").some((e) => {
			let n = e.trim();
			return n !== "" && !t.test(n);
		}) ? e : void 0;
	}
	function xe() {
		let e = _.value.length > 0 ? [..._.value] : void 0;
		return {
			q: be(),
			content_type: "Checkpoint",
			base_model: d.value.trim() || void 0,
			category: v.value.trim() || void 0,
			path_prefix: p.value.trim() || void 0,
			tag: e,
			sort: "path",
			limit: i.value
		};
	}
	async function A(i) {
		if (!(!e.value && i && (await ue(), !e.value)) && (i && (r.value = 0, t.value = []), !(a.value || o.value))) {
			a.value = !0, s.value = null;
			try {
				let e = await ws({
					...xe(),
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
	async function Se() {
		if (!(!ie.value || a.value || o.value)) {
			o.value = !0, r.value = t.value.length;
			try {
				let e = await ws({
					...xe(),
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
	function Ce() {
		c.value = "", l.value = "", u &&= (clearTimeout(u), null), d.value = "", p.value = "", m.value = "", h.value = "", g.value = [], _.value = [], v.value = "", y.value = "", b.value = "", A(!0), e.value && (fe(), de());
	}
	function j(e) {
		x.value = e;
		try {
			localStorage.setItem(js, e);
		} catch {}
	}
	function we(e) {
		let t = Ls(e);
		S.value = t;
		try {
			localStorage.setItem(Ms, String(t));
		} catch {}
	}
	function Te(e) {
		ee.value = e, setTimeout(() => {
			ee.value = null;
		}, 2e3);
	}
	function Ee() {
		ys(w.value), ke();
	}
	function De(e) {
		te.value = e, ne.value = null, Oe();
	}
	function M() {
		te.value = null, ne.value = null;
	}
	async function Oe() {
		let e = te.value;
		if (e != null) {
			T.value = !0;
			try {
				ne.value = await Es(e);
			} catch (e) {
				Te(e instanceof Error ? e.message : "Detail load failed"), ne.value = null;
			} finally {
				T.value = !1;
			}
		}
	}
	async function ke() {
		w.value = gs(), await ue(), e.value && (await de(), await fe(), await A(!0));
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
		toast: ee,
		hasMore: ie,
		selectedAssetId: te,
		detail: ne,
		detailLoading: T,
		selectionMode: re,
		selectedIds: E,
		selectedCount: ae,
		isAssetSelected: D,
		toggleAssetSelect: oe,
		clearAssetSelection: O,
		toggleSelectionMode: se,
		selectAllVisibleAssets: ce,
		batchReEnrichSelected: le,
		checkHealth: ue,
		loadFilters: de,
		loadSubfolders: fe,
		toggleFilterSection: pe,
		drillFolder: me,
		navigateFolderToAbsolute: k,
		resetFolderPath: he,
		toggleTag: ge,
		resetSelectedTags: _e,
		setCategory: ve,
		resetCategory: ye,
		loadAssets: A,
		loadMore: Se,
		resetFilters: Ce,
		setViewMode: j,
		setGridColumnCount: we,
		showToast: Te,
		saveSettingsUrl: Ee,
		bootstrap: ke,
		openDetail: De,
		closeDetail: M,
		loadDetail: Oe
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
}, hc = /* @__PURE__ */ or({
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
		return (e, i) => (K(), q("div", zs, [
			J("div", Bs, [J("label", Vs, [i[8] ||= J("span", null, "Base model", -1), Nn(J("select", {
				"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ I(n) ? n.value = e : null,
				class: "at-select",
				onChange: d
			}, [i[7] ||= J("option", { value: "" }, "Any", -1), (K(!0), q(W, null, V(R(r)?.base_models ?? [], (e) => (K(), q("option", {
				key: e,
				value: e
			}, A(e), 9, Hs))), 128))], 544), [[xo, R(n)]])])]),
			J("div", Us, [
				J("button", {
					type: "button",
					class: k(["at-mode-btn", { "at-mode-btn--on": R(l) === "folder" }]),
					title: "Browse folders",
					"aria-pressed": R(l) === "folder",
					onClick: i[1] ||= (e) => R(t).toggleFilterSection("folder")
				}, [i[9] ||= J("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "📁", -1), f.value ? (K(), q("span", Gs)) : Z("", !0)], 10, Ws),
				J("button", {
					type: "button",
					class: k(["at-mode-btn", { "at-mode-btn--on": R(l) === "tag" }]),
					title: "Filter by tags",
					"aria-pressed": R(l) === "tag",
					onClick: i[2] ||= (e) => R(t).toggleFilterSection("tag")
				}, [i[10] ||= J("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "🏷", -1), p.value ? (K(), q("span", qs)) : Z("", !0)], 10, Ks),
				J("button", {
					type: "button",
					class: k(["at-mode-btn", { "at-mode-btn--on": R(l) === "category" }]),
					title: "Filter by category",
					"aria-pressed": R(l) === "category",
					onClick: i[3] ||= (e) => R(t).toggleFilterSection("category")
				}, [i[11] ||= J("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "📂", -1), m.value ? (K(), q("span", Ys)) : Z("", !0)], 10, Js)
			]),
			R(l) === "folder" ? (K(), q("div", Xs, [J("div", Zs, [J("div", Qs, [(K(!0), q(W, null, V(h.value, (e, n) => (K(), q(W, { key: e.path + n }, [n > 0 ? (K(), q("span", $s, "›")) : Z("", !0), J("button", {
				type: "button",
				class: "at-breadcrumb__seg",
				onClick: (n) => R(t).navigateFolderToAbsolute(e.path)
			}, A(e.label), 9, ec)], 64))), 128))]), R(o).length ? (K(), q("div", tc, [(K(!0), q(W, null, V(R(o), (e) => (K(), q("button", {
				key: e,
				type: "button",
				class: "at-folder-chip",
				onClick: (n) => R(t).drillFolder(e)
			}, A(e), 9, nc))), 128))])) : (K(), q("p", rc, "No subfolders here"))])])) : R(l) === "tag" ? (K(), q("div", ic, [J("div", ac, [
				J("div", oc, [Nn(J("input", {
					"onUpdate:modelValue": i[4] ||= (e) => /* @__PURE__ */ I(u) ? u.value = e : null,
					type: "search",
					class: "at-tag-search",
					placeholder: "Filter tag list…",
					autocomplete: "off"
				}, null, 512), [[bo, R(u)]]), J("button", {
					type: "button",
					class: "at-folder-reset",
					onClick: i[5] ||= (e) => R(t).resetSelectedTags()
				}, "Reset")]),
				i[12] ||= J("p", { class: "at-tag-hint" }, "All selected tags must match (AND).", -1),
				J("div", sc, [(K(!0), q(W, null, V(g.value, (e) => (K(), q("button", {
					key: e.tag_id,
					type: "button",
					class: k(["at-tag-chip", { "at-tag-chip--selected": _(e.name) }]),
					onClick: (n) => R(t).toggleTag(e.name)
				}, [X(A(e.name) + " ", 1), J("span", lc, A(e.count), 1)], 10, cc))), 128))])
			])])) : R(l) === "category" ? (K(), q("div", uc, [J("div", dc, [J("button", {
				type: "button",
				class: "at-folder-reset",
				onClick: i[6] ||= (e) => R(t).resetCategory()
			}, "Reset"), (R(r)?.categories ?? []).length ? (K(), q("div", fc, [(K(!0), q(W, null, V(R(r)?.categories ?? [], (e) => (K(), q("button", {
				key: e,
				type: "button",
				class: k(["at-category-chip", { "at-category-chip--selected": R(c) === e }]),
				onClick: (n) => R(t).setCategory(e)
			}, A(e), 11, pc))), 128))])) : (K(), q("p", mc, "No categories in index"))])])) : Z("", !0)
		]));
	}
}), gc = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, _c = /* @__PURE__ */ gc(hc, [["__scopeId", "data-v-01975e22"]]), vc = { class: "at-toolbar" }, yc = {
	key: 0,
	class: "at-toolbar__row at-toolbar__row--select"
}, bc = { class: "at-toolbar__sel-label" }, xc = { class: "at-toolbar__row at-toolbar__row--search" }, Sc = ["aria-pressed"], Cc = ["aria-pressed"], wc = ["aria-pressed"], Tc = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "Toolbar",
	setup(e) {
		let t = Rs();
		return (e, n) => (K(), q("div", vc, [
			R(t).selectionMode ? (K(), q("div", yc, [
				J("span", bc, A(R(t).selectedCount) + " selected", 1),
				J("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[0] ||= (...e) => R(t).selectAllVisibleAssets && R(t).selectAllVisibleAssets(...e)
				}, " All visible "),
				J("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[1] ||= (...e) => R(t).clearAssetSelection && R(t).clearAssetSelection(...e)
				}, " Clear "),
				J("button", {
					type: "button",
					class: "at-toolbar__chip at-toolbar__chip--primary",
					onClick: n[2] ||= (...e) => R(t).batchReEnrichSelected && R(t).batchReEnrichSelected(...e)
				}, " Re-enrich selected "),
				J("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[3] ||= (...e) => R(t).toggleSelectionMode && R(t).toggleSelectionMode(...e)
				}, "Done")
			])) : Z("", !0),
			J("div", xc, [
				Nn(J("input", {
					"onUpdate:modelValue": n[4] ||= (e) => R(t).searchQuery = e,
					type: "search",
					class: "at-toolbar__search",
					placeholder: "name:, trigger:, category:, tag: or free text",
					autocomplete: "off"
				}, null, 512), [[bo, R(t).searchQuery]]),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Grid view",
					"aria-pressed": R(t).viewMode === "grid",
					onClick: n[5] ||= (e) => R(t).setViewMode("grid")
				}, " ▦ ", 8, Sc),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "List view",
					"aria-pressed": R(t).viewMode === "list",
					onClick: n[6] ||= (e) => R(t).setViewMode("list")
				}, " ≡ ", 8, Cc),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Select assets",
					"aria-pressed": R(t).selectionMode,
					onClick: n[7] ||= (...e) => R(t).toggleSelectionMode && R(t).toggleSelectionMode(...e)
				}, " ☑ ", 8, wc),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Settings",
					onClick: n[8] ||= (e) => R(t).settingsOpen = !0
				}, " ⚙ "),
				J("button", {
					type: "button",
					class: "at-reset",
					onClick: n[9] ||= (e) => R(t).resetFilters()
				}, " Reset ")
			]),
			Y(_c)
		]));
	}
}), [["__scopeId", "data-v-7e27da26"]]), Ec = { class: "at-status" }, Dc = ["title"], Oc = { class: "at-status__text" }, kc = {
	key: 3,
	class: "at-status__more"
}, Ac = {
	key: 1,
	class: "at-status__toast"
}, jc = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "StatusBar",
	setup(e) {
		let t = Rs(), { connected: n, total: r, items: i, loading: a, loadingMore: o, error: s, toast: c } = fs(t);
		return (e, l) => (K(), q("div", Ec, [
			J("span", {
				class: k(["at-status__dot", R(n) ? "at-status__dot--ok" : "at-status__dot--bad"]),
				title: R(n) ? "Connected" : "Disconnected"
			}, null, 10, Dc),
			J("span", Oc, [R(a) && !R(i).length ? (K(), q(W, { key: 0 }, [X("Loading…")], 64)) : R(s) ? (K(), q(W, { key: 1 }, [X(A(R(s)), 1)], 64)) : (K(), q(W, { key: 2 }, [X("Showing " + A(R(i).length) + " / " + A(R(r)), 1)], 64)), R(o) ? (K(), q("span", kc, " · More…")) : Z("", !0)]),
			!R(n) || R(s) ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-status__retry",
				onClick: l[0] ||= (e) => R(t).bootstrap()
			}, " Retry ")) : Z("", !0),
			R(c) ? (K(), q("span", Ac, A(R(c)), 1)) : Z("", !0)
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
var Nc = ["checked"], Pc = { class: "at-card__media" }, Fc = ["src"], Ic = {
	key: 1,
	class: "at-card__placeholder"
}, Lc = {
	key: 2,
	class: "at-card__cat"
}, Rc = {
	key: 3,
	class: "at-card__fav",
	title: "Favorite",
	"aria-hidden": "true"
}, zc = ["title"], Bc = { class: "at-card__body" }, Vc = { class: "at-card__title-row" }, Hc = ["title"], Uc = {
	key: 0,
	class: "at-card__bm"
}, Wc = {
	key: 1,
	class: "at-card__tw"
}, Gc = {
	key: 2,
	class: "at-card__usage"
}, Kc = { class: "at-card__actions" }, qc = ["disabled"], Jc = ["title"], Yc = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "AssetCard",
	props: {
		item: {},
		compact: { type: Boolean }
	},
	setup(e) {
		let t = e, n = Rs(), r = $(() => Ts(t.item.cover_url)), i = $(() => {
			let e = t.item.trigger_words || [];
			if (!e.length) return "";
			let n = e.slice(0, 3).join(", ");
			return e.length > 3 ? `${n}…` : n;
		}), a = $(() => {
			let e = t.item.usage_count, n = t.item.last_used_at;
			if (!e && !n) return "";
			let r = [];
			return e && r.push(`uses: ${e}`), n && r.push(n.replace("T", " ").slice(0, 16)), r.join(" · ");
		}), o = $(() => {
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
		function s(e) {
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
		async function c(e) {
			e.stopPropagation();
			let r = t.item.comfy_checkpoint_name?.trim();
			if (!r) return;
			let i = await Mc(r);
			n.showToast(i ? "Copied" : "Copy failed");
		}
		function l(e) {
			if (!e.target.closest("button, .at-card__drag, a, .at-card__select, .at-card__select input")) {
				if (n.selectionMode) {
					n.toggleAssetSelect(t.item.asset_id);
					return;
				}
				n.openDetail(t.item.asset_id);
			}
		}
		return (t, u) => (K(), q("article", {
			class: k(["at-card", {
				"at-card--compact": e.compact,
				"at-card--selected": R(n).selectionMode && R(n).isAssetSelected(e.item.asset_id)
			}]),
			onClick: l
		}, [
			R(n).selectionMode ? (K(), q("label", {
				key: 0,
				class: "at-card__select",
				onClick: u[1] ||= Eo(() => {}, ["stop"])
			}, [J("input", {
				type: "checkbox",
				checked: R(n).isAssetSelected(e.item.asset_id),
				onChange: u[0] ||= Eo((t) => R(n).toggleAssetSelect(e.item.asset_id), ["stop"])
			}, null, 40, Nc)])) : Z("", !0),
			J("div", Pc, [
				r.value ? (K(), q("img", {
					key: 0,
					src: r.value,
					loading: "lazy",
					alt: "",
					class: "at-card__img"
				}, null, 8, Fc)) : (K(), q("div", Ic, "No image")),
				e.item.category ? (K(), q("span", Lc, A(e.item.category), 1)) : Z("", !0),
				e.item.is_favorite ? (K(), q("span", Rc, "★")) : Z("", !0),
				o.value.text && !e.compact ? (K(), q("div", {
					key: 4,
					class: "at-card__rec-strip",
					title: o.value.title || "Recommended parameters"
				}, A(o.value.text), 9, zc)) : Z("", !0)
			]),
			J("div", Bc, [
				J("div", Vc, [J("span", {
					class: "at-card__title",
					title: e.item.display_name || e.item.filename
				}, A(e.item.display_name || e.item.filename), 9, Hc)]),
				e.item.base_model && !e.compact ? (K(), q("div", Uc, A(e.item.base_model), 1)) : Z("", !0),
				i.value ? (K(), q("div", Wc, A(i.value), 1)) : Z("", !0),
				e.compact && a.value ? (K(), q("div", Gc, A(a.value), 1)) : Z("", !0),
				J("div", { class: k(["at-card__actions-row", { "at-card__actions-row--compact": e.compact }]) }, [J("div", Kc, [J("button", {
					type: "button",
					class: "at-card__btn at-card__btn--primary",
					disabled: !e.item.comfy_checkpoint_name,
					onClick: Eo(c, ["stop"])
				}, " Copy name ", 8, qc)]), e.item.base_model && e.compact ? (K(), q("span", {
					key: 0,
					class: "at-card__bm-compact",
					title: e.item.base_model
				}, A(e.item.base_model), 9, Jc)) : Z("", !0)], 2)
			]),
			J("button", {
				type: "button",
				class: "at-card__drag",
				title: "Drag to LM Checkpoint Loader",
				draggable: "true",
				onDragstart: s,
				onClick: u[2] ||= Eo(() => {}, ["stop"])
			}, " ⠿ ", 32)
		], 2));
	}
}), [["__scopeId", "data-v-ad0bd791"]]), Xc = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "AssetGrid",
	setup(e) {
		let { items: t, gridColumnCount: n } = fs(Rs());
		return (e, r) => (K(), q("div", {
			class: "at-grid",
			style: ue({ "--at-grid-cols": R(n) })
		}, [(K(!0), q(W, null, V(R(t), (e) => (K(), Xi(Yc, {
			key: e.asset_id,
			item: e
		}, null, 8, ["item"]))), 128))], 4));
	}
}), [["__scopeId", "data-v-abb9b4c7"]]), Zc = { class: "at-list" }, Qc = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "AssetList",
	setup(e) {
		let { items: t } = fs(Rs());
		return (e, n) => (K(), q("div", Zc, [(K(!0), q(W, null, V(R(t), (e) => (K(), Xi(Yc, {
			key: e.asset_id,
			item: e,
			compact: ""
		}, null, 8, ["item"]))), 128))]));
	}
}), [["__scopeId", "data-v-d1d6175a"]]), $c = {
	class: "at-settings",
	role: "dialog",
	"aria-label": "Checkpoint library settings"
}, el = { class: "at-settings__label" }, tl = { class: "at-settings__label at-settings__label--mt" }, nl = { class: "at-settings__slider-row" }, rl = ["value"], il = {
	class: "at-settings__slider-value",
	"aria-live": "polite"
}, al = { class: "at-settings__section" }, ol = { class: "at-settings__row" }, sl = ["disabled"], cl = {
	key: 0,
	class: "at-settings__err"
}, ll = {
	key: 0,
	class: "at-settings__ok"
}, ul = {
	key: 1,
	class: "at-settings__warn"
}, dl = {
	key: 2,
	class: "at-settings__stale-list"
}, fl = { class: "at-settings__stale-name" }, pl = { key: 0 }, ml = ["disabled"], hl = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "SettingsPanel",
	setup(e) {
		let t = Rs(), n = /* @__PURE__ */ L(null), r = /* @__PURE__ */ L(!1), i = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L(null);
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
		return (e, d) => (K(), q("div", {
			class: "at-settings-backdrop",
			onClick: Eo(l, ["self"])
		}, [J("div", $c, [
			d[6] ||= J("h2", { class: "at-settings__title" }, "AssetThingie — Checkpoints", -1),
			J("label", el, [d[2] ||= X(" Server URL ", -1), Nn(J("input", {
				"onUpdate:modelValue": d[0] ||= (e) => R(t).baseUrlInput = e,
				type: "url",
				class: "at-settings__input"
			}, null, 512), [[bo, R(t).baseUrlInput]])]),
			d[7] ||= J("p", { class: "at-settings__hint" }, [X(" AssetThingie URL. Default "), J("code", null, "http://127.0.0.1:8188")], -1),
			J("label", tl, [d[3] ||= X(" Grid columns (card view) ", -1), J("div", nl, [J("input", {
				type: "range",
				class: "at-settings__range",
				min: "1",
				max: "20",
				step: "1",
				value: R(t).gridColumnCount,
				onInput: d[1] ||= (e) => R(t).setGridColumnCount(Number(e.target.value))
			}, null, 40, rl), J("span", il, A(R(t).gridColumnCount), 1)])]),
			d[8] ||= J("p", { class: "at-settings__hint" }, " 1–20 columns when the toolbar is in grid mode. Very narrow sidebars still use one column. ", -1),
			J("div", al, [
				d[4] ||= J("h3", { class: "at-settings__subtitle" }, "Library maintenance", -1),
				d[5] ||= J("p", { class: "at-settings__hint" }, " Remove database entries for model files that are no longer on disk, and delete their cached cover/example images. ", -1),
				J("div", ol, [J("button", {
					type: "button",
					class: "at-settings__btn",
					disabled: r.value,
					onClick: s
				}, A(r.value ? "Checking…" : "Check for missing files"), 9, sl)]),
				a.value ? (K(), q("p", cl, A(a.value), 1)) : n.value ? (K(), q(W, { key: 1 }, [
					n.value.stale_count === 0 ? (K(), q("p", ll, " Library is clean — no missing models found. ")) : (K(), q("p", ul, A(n.value.stale_count) + " model" + A(n.value.stale_count === 1 ? "" : "s") + " missing from disk. Cached images: ~" + A(o(n.value.orphan_cache_bytes)) + ". ", 1)),
					n.value.stale_count > 0 ? (K(), q("ul", dl, [(K(!0), q(W, null, V(n.value.stale_assets.slice(0, 12), (e) => (K(), q("li", { key: e.asset_id }, [J("span", fl, A(e.display_name || e.path), 1)]))), 128)), n.value.stale_assets.length > 12 ? (K(), q("li", pl, "…")) : Z("", !0)])) : Z("", !0),
					J("button", {
						type: "button",
						class: "at-settings__btn at-settings__btn--danger",
						disabled: n.value.stale_count === 0 || i.value,
						onClick: c
					}, A(i.value ? "Removing…" : "Confirm removal"), 9, ml)
				], 64)) : Z("", !0)
			]),
			J("div", { class: "at-settings__actions" }, [J("button", {
				type: "button",
				class: "at-settings__btn",
				onClick: l
			}, "Cancel"), J("button", {
				type: "button",
				class: "at-settings__btn at-settings__btn--primary",
				onClick: u
			}, " Save & reconnect ")])
		])]));
	}
}), [["__scopeId", "data-v-1961c363"]]), gl = ["src"], _l = {
	key: 0,
	class: "at-imlb__meta"
}, vl = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "ImageMetaLightbox",
	props: {
		imageUrl: {},
		meta: {}
	},
	emits: ["close"],
	setup(e) {
		return (t, n) => (K(), Xi(tr, { to: "body" }, [e.imageUrl ? (K(), q("div", {
			key: 0,
			class: "at-imlb",
			onClick: n[2] ||= Eo((e) => t.$emit("close"), ["self"])
		}, [J("div", {
			class: "at-imlb__inner",
			onClick: n[1] ||= Eo((e) => t.$emit("close"), ["self"])
		}, [
			J("button", {
				type: "button",
				class: "at-imlb__x",
				onClick: n[0] ||= (e) => t.$emit("close")
			}, "×"),
			J("img", {
				src: e.imageUrl,
				alt: "Preview"
			}, null, 8, gl),
			e.meta && Object.keys(e.meta).length ? (K(), q("pre", _l, A(JSON.stringify(e.meta, null, 2)), 1)) : Z("", !0)
		])])) : Z("", !0)]));
	}
}), [["__scopeId", "data-v-a7eb6085"]]), yl = { class: "at-detail__head" }, bl = {
	key: 0,
	class: "at-detail__loading"
}, xl = {
	key: 1,
	class: "at-detail__scroll"
}, Sl = {
	key: 0,
	class: "at-detail__cover-wrap"
}, Cl = ["src"], wl = { class: "at-detail__name" }, Tl = {
	key: 1,
	class: "at-detail__meta"
}, El = {
	key: 2,
	class: "at-detail__meta"
}, Dl = { class: "at-detail__syntax" }, Ol = { class: "at-detail__sec-head" }, kl = { class: "at-detail__code" }, Al = {
	key: 3,
	class: "at-detail__section"
}, jl = { class: "at-detail__rec-list" }, Ml = {
	key: 4,
	class: "at-detail__meta"
}, Nl = {
	key: 5,
	class: "at-detail__section"
}, Pl = { class: "at-detail__notes" }, Fl = { class: "at-detail__section" }, Il = { class: "at-detail__sec-head" }, Ll = {
	key: 0,
	class: "at-detail__tw-list"
}, Rl = {
	key: 1,
	class: "at-detail__tw-empty"
}, zl = {
	key: 6,
	class: "at-detail__section"
}, Bl = { class: "at-detail__tags" }, Vl = {
	key: 7,
	class: "at-detail__meta"
}, Hl = ["href"], Ul = { class: "at-detail__row-actions" }, Wl = ["disabled"], Gl = {
	key: 9,
	class: "at-detail__meta"
}, Kl = {
	key: 10,
	class: "at-detail__section"
}, ql = ["innerHTML"], Jl = {
	key: 11,
	class: "at-detail__section"
}, Yl = { class: "at-detail__gallery" }, Xl = ["onClick"], Zl = ["src"], Ql = {
	key: 12,
	class: "at-detail__section"
}, $l = { class: "at-detail__path-line" }, eu = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "DetailPanel",
	setup(e) {
		let t = Rs(), { detail: n, detailLoading: r } = fs(t), i = $(() => n.value ? Ts(n.value.cover_url_full || n.value.cover_url) : null), a = $(() => {
			let e = n.value?.trigger_words;
			return e && Array.isArray(e) ? e.map((e) => String(e).trim()).filter(Boolean) : [];
		}), o = $(() => a.value.join(", ")), s = $(() => {
			let e = n.value;
			if (!e) return "";
			let t = (e.path ?? "").trim(), r = (e.comfy_checkpoint_name ?? "").trim();
			if (!t && !r) return "";
			if (!r) return t;
			if (!t) return r;
			let i = t.includes("\\") ? "\\" : "/", a = t.replace(/[/\\]+$/, "");
			return a.endsWith(r) || t.endsWith(r) ? t : `${a}${i}${r}`;
		}), c = {
			recommended_sampler: "Sampler",
			recommended_scheduler: "Scheduler",
			recommended_steps: "Steps",
			recommended_cfg: "CFG",
			recommended_clip_skip: "CLIP skip",
			recommended_prompt: "Prompt",
			recommended_negative_prompt: "Negative prompt"
		}, l = $(() => {
			let e = n.value?.system_fields;
			if (!e || typeof e != "object") return [];
			let t = [];
			for (let n of Object.keys(c)) n in e && e[n] != null && e[n] !== "" && t.push([n, c[n]]);
			return t;
		});
		function u(e) {
			return e == null ? "—" : String(e);
		}
		async function d(e, n) {
			let r = (n ?? "").trim();
			if (!r) return;
			let i = await Mc(r);
			t.showToast(i ? `Copied ${e}` : "Copy failed");
		}
		let f = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(null);
		function m() {
			f.value = null, p.value = null;
		}
		function h(e) {
			let t = Ts(e.url || e.thumbnail_url);
			if (!t) return;
			f.value = t;
			let n = e.generation_params;
			n && typeof n == "object" && Object.keys(n).length ? p.value = { ...n } : (e.caption ?? "").trim() ? p.value = { caption: e.caption } : p.value = null;
		}
		Bn(() => n.value?.asset_id, () => {
			m();
		});
		let g = /* @__PURE__ */ L(!1);
		async function _() {
			let e = n.value?.asset_id;
			if (e != null) {
				g.value = !0;
				try {
					await ks(e), t.showToast("Metadata refreshed"), await t.loadDetail();
				} catch (e) {
					t.showToast(e instanceof Error ? e.message : "Refresh failed");
				} finally {
					g.value = !1;
				}
			}
		}
		return (e, c) => (K(), q("div", {
			class: "at-detail",
			onClick: c[4] ||= Eo((e) => R(t).closeDetail(), ["self"])
		}, [J("div", {
			class: "at-detail__panel",
			onClick: c[3] ||= Eo(() => {}, ["stop"])
		}, [J("div", yl, [c[5] ||= J("h2", { class: "at-detail__h" }, "Details", -1), J("button", {
			type: "button",
			class: "at-detail__close",
			onClick: c[0] ||= (e) => R(t).closeDetail()
		}, "×")]), R(r) ? (K(), q("div", bl, "Loading…")) : R(n) ? (K(), q("div", xl, [
			i.value ? (K(), q("div", Sl, [J("img", {
				src: i.value,
				alt: "",
				class: "at-detail__cover",
				loading: "lazy"
			}, null, 8, Cl)])) : Z("", !0),
			J("p", wl, A(R(n).display_name || R(n).filename), 1),
			R(n).base_model ? (K(), q("p", Tl, "Base: " + A(R(n).base_model), 1)) : Z("", !0),
			R(n).default_strength != null && Number(R(n).default_strength) !== 1 ? (K(), q("p", El, " Default strength: " + A(R(n).default_strength), 1)) : Z("", !0),
			J("div", Dl, [J("div", Ol, [c[6] ||= J("span", { class: "at-detail__mini-label" }, "Comfy checkpoint", -1), R(n).comfy_checkpoint_name ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-detail__mini",
				onClick: c[1] ||= (e) => d("checkpoint name", R(n).comfy_checkpoint_name)
			}, " Copy ")) : Z("", !0)]), J("code", kl, A(R(n).comfy_checkpoint_name || "—"), 1)]),
			l.value.length ? (K(), q("section", Al, [c[7] ||= J("div", { class: "at-detail__sec-title" }, "Checkpoint recommendations", -1), J("dl", jl, [(K(!0), q(W, null, V(l.value, ([e, t]) => (K(), q(W, { key: e }, [J("dt", null, A(t), 1), J("dd", null, A(u(R(n).system_fields?.[e])), 1)], 64))), 128))])])) : Z("", !0),
			R(n).category || R(n).subcategory ? (K(), q("p", Ml, A([R(n).category, R(n).subcategory].filter(Boolean).join(" / ")), 1)) : Z("", !0),
			R(n).notes ? (K(), q("section", Nl, [c[8] ||= J("div", { class: "at-detail__sec-title" }, "Notes", -1), J("p", Pl, A(R(n).notes), 1)])) : Z("", !0),
			J("section", Fl, [J("div", Il, [c[9] ||= J("span", { class: "at-detail__sec-title" }, "Triggers", -1), a.value.length ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-detail__mini",
				onClick: c[2] ||= (e) => d("triggers", o.value)
			}, " Copy ")) : Z("", !0)]), a.value.length ? (K(), q("ul", Ll, [(K(!0), q(W, null, V(a.value, (e, t) => (K(), q("li", {
				key: `${t}-${e}`,
				class: "at-detail__tw-item"
			}, [J("code", null, A(e), 1)]))), 128))])) : (K(), q("p", Rl, "—"))]),
			(R(n).tags ?? []).length ? (K(), q("section", zl, [c[10] ||= J("div", { class: "at-detail__sec-title" }, "Tags", -1), J("div", Bl, [(K(!0), q(W, null, V(R(n).tags, (e) => (K(), q("span", {
				key: e,
				class: "at-detail__tag"
			}, A(e), 1))), 128))])])) : Z("", !0),
			R(n).source_creator_name ? (K(), q("p", Vl, " By " + A(R(n).source_creator_name), 1)) : Z("", !0),
			R(n).source_url ? (K(), q("a", {
				key: 8,
				href: R(n).source_url,
				target: "_blank",
				rel: "noopener noreferrer",
				class: "at-detail__link"
			}, "Source", 8, Hl)) : Z("", !0),
			J("div", Ul, [J("button", {
				type: "button",
				class: "at-detail__mini",
				disabled: g.value,
				onClick: _
			}, A(g.value ? "Refreshing…" : "Refresh from Civitai"), 9, Wl)]),
			R(n).usage_count || R(n).last_used_at ? (K(), q("p", Gl, [X(" Uses: " + A(R(n).usage_count), 1), R(n).last_used_at ? (K(), q(W, { key: 0 }, [X(" · " + A(R(n).last_used_at.replace("T", " ").slice(0, 19)), 1)], 64)) : Z("", !0)])) : Z("", !0),
			R(n).description_html ? (K(), q("section", Kl, [c[11] ||= J("div", { class: "at-detail__sec-title" }, "Description", -1), J("div", {
				class: "at-detail__html",
				innerHTML: R(n).description_html
			}, null, 8, ql)])) : Z("", !0),
			R(n).example_media.length ? (K(), q("section", Jl, [c[12] ||= J("div", { class: "at-detail__sec-title" }, "Examples", -1), J("div", Yl, [(K(!0), q(W, null, V(R(n).example_media, (e) => (K(), q("div", {
				key: e.media_id,
				class: "at-detail__ex-wrap"
			}, [J("button", {
				type: "button",
				class: "at-detail__ex",
				onClick: (t) => h(e)
			}, [e.thumbnail_url || e.url ? (K(), q("img", {
				key: 0,
				src: Ts(e.thumbnail_url || e.url) || "",
				alt: "",
				class: "at-detail__ex-img",
				loading: "lazy"
			}, null, 8, Zl)) : Z("", !0)], 8, Xl)]))), 128))])])) : Z("", !0),
			s.value ? (K(), q("section", Ql, [c[13] ||= J("div", { class: "at-detail__sec-title" }, "Path", -1), J("p", $l, A(s.value), 1)])) : Z("", !0)
		])) : Z("", !0)]), Y(vl, {
			"image-url": f.value,
			meta: p.value,
			onClose: m
		}, null, 8, ["image-url", "meta"])]));
	}
}), [["__scopeId", "data-v-1e25987e"]]), tu = { class: "at-app" }, nu = {
	key: 0,
	class: "at-main-column"
}, ru = { class: "at-empty at-empty--fill" }, iu = {
	key: 1,
	class: "at-main-column"
}, au = { class: "at-chrome" }, ou = {
	key: 0,
	class: "at-empty at-empty--fill"
}, su = 160, cu = /* @__PURE__ */ gc(/* @__PURE__ */ or({
	__name: "App",
	setup(e) {
		let t = Rs(), { connected: n, items: r, loading: i, loadingMore: a, viewMode: o, settingsOpen: s, selectedAssetId: c } = fs(t), l = /* @__PURE__ */ L(null);
		function u(e) {
			return e.scrollHeight - e.scrollTop - e.clientHeight <= su;
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
		return Bn(() => l.value, (e, t) => {
			t && t.removeEventListener("scroll", p), e && (e.addEventListener("scroll", p, { passive: !0 }), requestAnimationFrame(() => d()));
		}, {
			flush: "post",
			immediate: !0
		}), Bn([
			r,
			i,
			a,
			n
		], () => {
			requestAnimationFrame(() => d());
		}, { flush: "post" }), xr(() => {
			t.bootstrap();
		}), Tr(() => {
			let e = l.value;
			e && e.removeEventListener("scroll", p);
		}), (e, i) => (K(), q("div", tu, [
			R(n) ? (K(), q("div", iu, [J("div", au, [Y(Tc), Y(jc)]), !R(t).loading && !R(r).length && !R(t).error ? (K(), q("div", ou, [i[6] ||= J("p", null, "No checkpoints in the index for this filter.", -1), J("button", {
				type: "button",
				class: "at-empty__btn",
				onClick: i[2] ||= (e) => R(t).resetFilters()
			}, " Reset filters ")])) : (K(), q("div", {
				key: 1,
				ref_key: "scrollRoot",
				ref: l,
				class: "at-scroll"
			}, [R(o) === "grid" ? (K(), Xi(Xc, { key: 0 })) : (K(), Xi(Qc, { key: 1 }))], 512))])) : (K(), q("div", nu, [
				Y(Tc),
				Y(jc),
				J("div", ru, [
					J("p", null, [
						i[3] ||= X("Could not connect to AssetThingie at ", -1),
						J("code", null, A(R(t).baseUrlInput), 1),
						i[4] ||= X(".", -1)
					]),
					i[5] ||= J("p", { class: "at-empty__sub" }, "Start the app or open settings to change the URL.", -1),
					J("button", {
						type: "button",
						class: "at-empty__btn",
						onClick: i[0] ||= (e) => R(t).settingsOpen = !0
					}, " Settings "),
					J("button", {
						type: "button",
						class: "at-empty__btn",
						onClick: i[1] ||= (e) => R(t).bootstrap()
					}, "Retry")
				])
			])),
			R(s) ? (K(), Xi(hl, { key: 2 })) : Z("", !0),
			R(c) == null ? Z("", !0) : (K(), Xi(eu, { key: 3 }))
		]));
	}
}), [["__scopeId", "data-v-b919f05e"]]);
//#endregion
//#region src/main.ts
function lu(e) {
	let t = Zo(), n = Ao(cu);
	return n.use(t), n.mount(e), n;
}
//#endregion
export { lu as mount };
