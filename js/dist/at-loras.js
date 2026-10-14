//#region ../node_modules/@vue/shared/dist/shared.esm-bundler.js
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
}, A = (e) => {
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
	for (let r = 0; n && r < e.length; r++) n = M(e[r], t[r]);
	return n;
}
function M(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ge(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !M(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function _e(e, t) {
	return e.findIndex((e) => M(e, t));
}
var ve = (e) => !!(e && e.__v_isRef === !0), N = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? ve(e) ? N(e.value) : JSON.stringify(e, ye, 2) : String(e), ye = (e, t) => ve(t) ? ye(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[be(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => be(e)) } : _(t) ? be(t) : v(t) && !d(t) && !C(t) ? String(t) : t, be = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, P, xe = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && P && (P.active ? (this.parent = P, this.index = (P.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = P;
			try {
				return P = this, e();
			} finally {
				P = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = P, P = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (P === this) P = this.prevScope;
			else {
				let e = P;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
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
function Se(e) {
	return new xe(e);
}
function Ce() {
	return P;
}
function we(e, t = !1) {
	P && P.cleanups.push(e);
}
var F, I = /* @__PURE__ */ new WeakSet(), Te = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, P && (P.active ? P.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, I.has(this) && (I.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ke(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, He(this), Me(this);
		let e = F, t = Re;
		F = this, Re = !0;
		try {
			return this.fn();
		} finally {
			Ne(this), F = e, Re = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Ie(e);
			this.deps = this.depsTail = void 0, He(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? I.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Pe(this) && this.run();
	}
	get dirty() {
		return Pe(this);
	}
}, Ee = 0, De, Oe;
function ke(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Oe, Oe = e;
		return;
	}
	e.next = De, De = e;
}
function Ae() {
	Ee++;
}
function je() {
	if (--Ee > 0) return;
	if (Oe) {
		let e = Oe;
		for (Oe = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; De;) {
		let t = De;
		for (De = void 0; t;) {
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
function Me(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ne(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Ie(r), Le(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Pe(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Fe(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Fe(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ue) || (e.globalVersion = Ue, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Pe(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = F, r = Re;
	F = e, Re = !0;
	try {
		Me(e);
		let n = e.fn(e._value);
		(t.version === 0 || O(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		F = n, Re = r, Ne(e), e.flags &= -3;
	}
}
function Ie(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Ie(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Le(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Re = !0, ze = [];
function Be() {
	ze.push(Re), Re = !1;
}
function Ve() {
	let e = ze.pop();
	Re = e === void 0 ? !0 : e;
}
function He(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = F;
		F = void 0;
		try {
			t();
		} finally {
			F = e;
		}
	}
}
var Ue = 0, We = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Ge = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!F || !Re || F === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== F) t = this.activeLink = new We(F, this), F.deps ? (t.prevDep = F.depsTail, F.depsTail.nextDep = t, F.depsTail = t) : F.deps = F.depsTail = t, Ke(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = F.depsTail, t.nextDep = void 0, F.depsTail.nextDep = t, F.depsTail = t, F.deps === t && (F.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ue++, this.notify(e);
	}
	notify(e) {
		Ae();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			je();
		}
	}
};
function Ke(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ke(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var qe = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ Symbol(""), Ye = /* @__PURE__ */ Symbol(""), Xe = /* @__PURE__ */ Symbol("");
function L(e, t, n) {
	if (Re && F) {
		let t = qe.get(e);
		t || qe.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ge()), r.map = t, r.key = n), r.track();
	}
}
function Ze(e, t, n, r, i, a) {
	let o = qe.get(e);
	if (!o) {
		Ue++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Ae(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Xe || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Xe)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Je)), f(e) && s(o.get(Ye)));
				break;
			case "delete":
				i || (s(o.get(Je)), f(e) && s(o.get(Ye)));
				break;
			case "set":
				f(e) && s(o.get(Je));
				break;
		}
	}
	je();
}
function Qe(e, t) {
	let n = qe.get(e);
	return n && n.get(t);
}
function $e(e) {
	let t = /* @__PURE__ */ R(e);
	return t === e ? t : (L(t, "iterate", Xe), /* @__PURE__ */ zt(e) ? t : t.map(Ht));
}
function et(e) {
	return L(e = /* @__PURE__ */ R(e), "iterate", Xe), e;
}
function tt(e, t) {
	return /* @__PURE__ */ Rt(e) ? Ut(/* @__PURE__ */ Lt(e) ? Ht(t) : t) : Ht(t);
}
var nt = {
	__proto__: null,
	[Symbol.iterator]() {
		return rt(this, Symbol.iterator, (e) => tt(this, e));
	},
	concat(...e) {
		return $e(this).concat(...e.map((e) => d(e) ? $e(e) : e));
	},
	entries() {
		return rt(this, "entries", (e) => (e[1] = tt(this, e[1]), e));
	},
	every(e, t) {
		return at(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return at(this, "filter", e, t, (e) => e.map((e) => tt(this, e)), arguments);
	},
	find(e, t) {
		return at(this, "find", e, t, (e) => tt(this, e), arguments);
	},
	findIndex(e, t) {
		return at(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return at(this, "findLast", e, t, (e) => tt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return at(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return at(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return st(this, "includes", e);
	},
	indexOf(...e) {
		return st(this, "indexOf", e);
	},
	join(e) {
		return $e(this).join(e);
	},
	lastIndexOf(...e) {
		return st(this, "lastIndexOf", e);
	},
	map(e, t) {
		return at(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ct(this, "pop");
	},
	push(...e) {
		return ct(this, "push", e);
	},
	reduce(e, ...t) {
		return ot(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ot(this, "reduceRight", e, t);
	},
	shift() {
		return ct(this, "shift");
	},
	some(e, t) {
		return at(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ct(this, "splice", e);
	},
	toReversed() {
		return $e(this).toReversed();
	},
	toSorted(e) {
		return $e(this).toSorted(e);
	},
	toSpliced(...e) {
		return $e(this).toSpliced(...e);
	},
	unshift(...e) {
		return ct(this, "unshift", e);
	},
	values() {
		return rt(this, "values", (e) => tt(this, e));
	}
};
function rt(e, t, n) {
	let r = et(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ zt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var it = Array.prototype;
function at(e, t, n, r, i, a) {
	let o = et(e), s = o !== e && !/* @__PURE__ */ zt(e), c = o[t];
	if (c !== it[t]) {
		let t = c.apply(e, a);
		return s ? Ht(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, tt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ot(e, t, n, r) {
	let i = et(e), a = i !== e && !/* @__PURE__ */ zt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = tt(e, t)), n.call(this, t, tt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? tt(e, c) : c;
}
function st(e, t, n) {
	let r = /* @__PURE__ */ R(e);
	L(r, "iterate", Xe);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Bt(n[0]) ? (n[0] = /* @__PURE__ */ R(n[0]), r[t](...n)) : i;
}
function ct(e, t, n = []) {
	Be(), Ae();
	let r = (/* @__PURE__ */ R(e))[t].apply(e, n);
	return je(), Ve(), r;
}
var lt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), ut = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function dt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ R(this);
	return L(t, "has", e), t.hasOwnProperty(e);
}
var ft = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? At : kt : i ? Ot : Dt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = nt[t])) return e;
			if (t === "hasOwnProperty") return dt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ z(e) ? e : n);
		if ((_(t) ? ut.has(t) : lt(t)) || (r || L(e, "get", t), i)) return o;
		if (/* @__PURE__ */ z(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Ft(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Ft(o) : /* @__PURE__ */ Nt(o) : o;
	}
}, pt = class extends ft {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Rt(i);
			if (!/* @__PURE__ */ zt(n) && !/* @__PURE__ */ Rt(n) && (i = /* @__PURE__ */ R(i), n = /* @__PURE__ */ R(n)), !a && /* @__PURE__ */ z(i) && !/* @__PURE__ */ z(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ z(e) ? e : r);
		return e === /* @__PURE__ */ R(r) && (o ? O(n, i) && Ze(e, "set", t, n, i) : Ze(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Ze(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !ut.has(t)) && L(e, "has", t), n;
	}
	ownKeys(e) {
		return L(e, "iterate", d(e) ? "length" : Je), Reflect.ownKeys(e);
	}
}, mt = class extends ft {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, ht = /* @__PURE__ */ new pt(), gt = /* @__PURE__ */ new mt(), _t = /* @__PURE__ */ new pt(!0), vt = (e) => e, yt = (e) => Reflect.getPrototypeOf(e);
function bt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ R(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? vt : t ? Ut : Ht;
		return !t && L(a, "iterate", l ? Ye : Je), s(Object.create(u), { next() {
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
function xt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function St(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ R(r), a = /* @__PURE__ */ R(n);
			e || (O(n, a) && L(i, "get", n), L(i, "get", a));
			let { has: o } = yt(i), s = t ? vt : e ? Ut : Ht;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && L(/* @__PURE__ */ R(t), "iterate", Je), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ R(n), i = /* @__PURE__ */ R(t);
			return e || (O(t, i) && L(r, "has", t), L(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ R(a), s = t ? vt : e ? Ut : Ht;
			return !e && L(o, "iterate", Je), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: xt("add"),
		set: xt("set"),
		delete: xt("delete"),
		clear: xt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ R(this), r = yt(n), i = /* @__PURE__ */ R(e), a = !t && !/* @__PURE__ */ zt(e) && !/* @__PURE__ */ Rt(e) ? i : e;
			return r.has.call(n, a) || O(e, a) && r.has.call(n, e) || O(i, a) && r.has.call(n, i) || (n.add(a), Ze(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ zt(n) && !/* @__PURE__ */ Rt(n) && (n = /* @__PURE__ */ R(n));
			let r = /* @__PURE__ */ R(this), { has: i, get: a } = yt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ R(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? O(n, s) && Ze(r, "set", e, n, s) : Ze(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ R(this), { has: n, get: r } = yt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ R(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Ze(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ R(this), t = e.size !== 0, n = e.clear();
			return t && Ze(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = bt(r, e, t);
	}), n;
}
function Ct(e, t) {
	let n = St(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var wt = { get: /* @__PURE__ */ Ct(!1, !1) }, Tt = { get: /* @__PURE__ */ Ct(!1, !0) }, Et = { get: /* @__PURE__ */ Ct(!0, !1) }, Dt = /* @__PURE__ */ new WeakMap(), Ot = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap();
function jt(e) {
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
function Mt(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : jt(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Nt(e) {
	return /* @__PURE__ */ Rt(e) ? e : It(e, !1, ht, wt, Dt);
}
/* @__NO_SIDE_EFFECTS__ */
function Pt(e) {
	return It(e, !1, _t, Tt, Ot);
}
/* @__NO_SIDE_EFFECTS__ */
function Ft(e) {
	return It(e, !0, gt, Et, kt);
}
function It(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = Mt(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e) {
	return /* @__PURE__ */ Rt(e) ? /* @__PURE__ */ Lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function Rt(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function zt(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Bt(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function R(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ R(t) : e;
}
function Vt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && k(e, "__v_skip", !0), e;
}
var Ht = (e) => v(e) ? /* @__PURE__ */ Nt(e) : e, Ut = (e) => v(e) ? /* @__PURE__ */ Ft(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function z(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function B(e) {
	return Wt(e, !1);
}
function Wt(e, t) {
	return /* @__PURE__ */ z(e) ? e : new Gt(e, t);
}
var Gt = class {
	constructor(e, t) {
		this.dep = new Ge(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ R(e), this._value = t ? e : Ht(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ zt(e) || /* @__PURE__ */ Rt(e);
		e = n ? e : /* @__PURE__ */ R(e), O(e, t) && (this._rawValue = e, this._value = n ? e : Ht(e), this.dep.trigger());
	}
};
function V(e) {
	return /* @__PURE__ */ z(e) ? e.value : e;
}
var Kt = {
	get: (e, t, n) => t === "__v_raw" ? e : V(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ z(i) && !/* @__PURE__ */ z(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function qt(e) {
	return /* @__PURE__ */ Lt(e) ? e : new Proxy(e, Kt);
}
/* @__NO_SIDE_EFFECTS__ */
function Jt(e) {
	let t = d(e) ? Array(e.length) : {};
	for (let n in e) t[n] = Qt(e, n);
	return t;
}
var Yt = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = _(t) ? t : String(t), this._raw = /* @__PURE__ */ R(e);
		let r = !0, i = e;
		if (!d(e) || _(this._key) || !w(this._key)) do
			r = !/* @__PURE__ */ Bt(i) || /* @__PURE__ */ zt(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = V(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ z(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ z(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return Qe(this._raw, this._key);
	}
}, Xt = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
/* @__NO_SIDE_EFFECTS__ */
function Zt(e, t, n) {
	return /* @__PURE__ */ z(e) ? e : h(e) ? new Xt(e) : v(e) && arguments.length > 1 ? Qt(e, t, n) : /* @__PURE__ */ B(e);
}
function Qt(e, t, n) {
	return new Yt(e, t, n);
}
var $t = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ge(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ue - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && F !== this) return ke(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Fe(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function en(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new $t(r, i, n);
}
var tn = {}, nn = /* @__PURE__ */ new WeakMap(), rn = void 0;
function an(e, t = !1, n = rn) {
	if (n) {
		let t = nn.get(n);
		t || nn.set(n, t = []), t.push(e);
	}
}
function on(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ zt(e) || o === !1 || o === 0 ? sn(e, 1) : sn(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ z(e) ? (g = () => e.value, y = /* @__PURE__ */ zt(e)) : /* @__PURE__ */ Lt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Lt(e) || /* @__PURE__ */ zt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ z(e)) return e.value;
		if (/* @__PURE__ */ Lt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Be();
			try {
				_();
			} finally {
				Ve();
			}
		}
		let t = rn;
		rn = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			rn = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => sn(e(), t);
	}
	let x = Ce(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(tn) : tn, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => O(e, C[t])) : O(e, C))) {
				_ && _();
				let t = rn;
				rn = m;
				try {
					let t = [
						e,
						C === tn ? void 0 : b && C[0] === tn ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					rn = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Te(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => an(e, !1, m), _ = m.onStop = () => {
		let e = nn.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			nn.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function sn(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ z(e)) sn(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) sn(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		sn(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) sn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && sn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region ../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function cn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		un(e, t, n);
	}
}
function ln(e, t, n, r) {
	if (h(e)) {
		let i = cn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			un(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(ln(e[a], t, n, r));
		return i;
	}
}
function un(e, n, r, i = !0) {
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
			Be(), cn(o, null, 10, [
				e,
				i,
				a
			]), Ve();
			return;
		}
	}
	dn(e, r, a, i, s);
}
function dn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var H = [], fn = -1, pn = [], mn = null, hn = 0, gn = /* @__PURE__ */ Promise.resolve(), _n = null;
function vn(e) {
	let t = _n || gn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function yn(e) {
	let t = fn + 1, n = H.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = H[r], a = Tn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function bn(e) {
	if (!(e.flags & 1)) {
		let t = Tn(e), n = H[H.length - 1];
		!n || !(e.flags & 2) && t >= Tn(n) ? H.push(e) : H.splice(yn(t), 0, e), e.flags |= 1, xn();
	}
}
function xn() {
	_n ||= gn.then(En);
}
function Sn(e) {
	d(e) ? pn.push(...e) : mn && e.id === -1 ? mn.splice(hn + 1, 0, e) : e.flags & 1 || (pn.push(e), e.flags |= 1), xn();
}
function Cn(e, t, n = fn + 1) {
	for (; n < H.length; n++) {
		let t = H[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			H.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function wn(e) {
	if (pn.length) {
		let e = [...new Set(pn)].sort((e, t) => Tn(e) - Tn(t));
		if (pn.length = 0, mn) {
			mn.push(...e);
			return;
		}
		for (mn = e, hn = 0; hn < mn.length; hn++) {
			let e = mn[hn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		mn = null, hn = 0;
	}
}
var Tn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function En(e) {
	try {
		for (fn = 0; fn < H.length; fn++) {
			let e = H[fn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), cn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; fn < H.length; fn++) {
			let e = H[fn];
			e && (e.flags &= -2);
		}
		fn = -1, H.length = 0, wn(e), _n = null, (H.length || pn.length) && En(e);
	}
}
var Dn = null, On = null;
function kn(e) {
	let t = Dn;
	return Dn = e, On = e && e.type.__scopeId || null, t;
}
function An(e, t = Dn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Ji(-1);
		let i = kn(t), a;
		try {
			a = e(...n);
		} finally {
			kn(i), r._d && Ji(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function jn(e, n) {
	if (Dn === null) return e;
	let r = Da(Dn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && sn(o), i.push({
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
function Mn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Be(), ln(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ve());
	}
}
function Nn(e, t) {
	if (Q) {
		let n = Q.provides, r = Q.parent && Q.parent.provides;
		r === n && (n = Q.provides = Object.create(r)), n[e] = t;
	}
}
function Pn(e, t, n = !1) {
	let r = fa();
	if (r || Qr) {
		let i = Qr ? Qr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function Fn() {
	return !!(fa() || Qr);
}
var In = /* @__PURE__ */ Symbol.for("v-scx"), Ln = () => Pn(In);
function Rn(e, t, n) {
	return zn(e, t, n);
}
function zn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (va) {
		if (c === "sync") {
			let e = Ln();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Q;
	u.call = (e, t, n) => ln(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		W(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : bn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = on(e, n, u);
	return va && (f ? f.push(h) : d && h()), h;
}
function Bn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Vn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ha(this), s = zn(i, a.bind(r), n);
	return o(), s;
}
function Vn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Hn = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ Symbol("_vte"), Wn = (e) => e.__isTeleport, Gn = (e) => e && (e.disabled || e.disabled === ""), Kn = (e) => e && (e.defer || e.defer === ""), qn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Jn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Yn = (e, t) => {
	let n = e && e.to;
	return g(n) ? t ? t(n) : null : n;
}, Xn = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = Gn(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = Gn(e.props), r = e.target = Yn(e.props, m), a = tr(r, e, h, p);
			r && (o !== "svg" && qn(r) ? o = "svg" : o !== "mathml" && Jn(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), er(e, !1)));
		}, S = (e) => {
			let t = () => {
				Hn.get(e) === t && (Hn.delete(e), Gn(e.props) && (b(e, _(e.el) || n, e.anchor), er(e, !0)), x(e));
			};
			Hn.set(e, t), W(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Kn(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), er(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Hn.get(e);
			if (u) {
				u.flags |= 8, Hn.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = Gn(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || qn(p) ? o = "svg" : (o === "mathml" || Jn(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Pi(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Zn(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = t.target = Yn(t.props, m);
				e && Zn(t, e, null, l, 0);
			} else g && Zn(t, p, h, l, 1);
			er(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = a || !Gn(f), m = Hn.get(e);
		if (m && (m.flags |= 8, Hn.delete(e), p = !1), d && (i(l), i(u)), a && i(c), o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, p, !!i.dynamicChildren);
		}
	},
	move: Zn,
	hydrate: Qn
};
function Zn(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Hn.has(e) && (!d || Gn(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Qn(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
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
	let m = t.target = Yn(t.props, c), h = Gn(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || tr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || tr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), er(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var $n = Xn;
function er(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function tr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Un] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var nr = /* @__PURE__ */ Symbol("_leaveCb");
function rr(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, rr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/* @__NO_SIDE_EFFECTS__ */
function ir(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function ar(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function or(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var sr = /* @__PURE__ */ new WeakMap();
function cr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => cr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (ur(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && cr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? Da(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ R(v), b = v === t ? i : (e) => or(_, e) ? !1 : u(y, e), x = (e, t) => !(t && or(_, t));
	if (m != null && m !== p) {
		if (lr(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ z(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) cn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ z(p);
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
					i(), sr.delete(e);
				};
				t.id = -1, sr.set(e, t), W(t, r);
			} else lr(e), i();
		}
	}
}
function lr(e) {
	let t = sr.get(e);
	t && (t.flags |= 8, sr.delete(e));
}
se().requestIdleCallback, se().cancelIdleCallback;
var ur = (e) => !!e.type.__asyncLoader, dr = (e) => e.type.__isKeepAlive;
function fr(e, t) {
	mr(e, "a", t);
}
function pr(e, t) {
	mr(e, "da", t);
}
function mr(e, t, n = Q) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (gr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) dr(e.parent.vnode) && hr(r, t, n, e), e = e.parent;
	}
}
function hr(e, t, n, r) {
	let i = gr(t, e, r, !0);
	Cr(() => {
		c(r[t], i);
	}, n);
}
function gr(e, t, n = Q, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Be();
			let i = ha(n), a = ln(t, n, e, r);
			return i(), Ve(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var _r = (e) => (t, n = Q) => {
	(!va || e === "sp") && gr(e, (...e) => t(...e), n);
}, vr = _r("bm"), yr = _r("m"), br = _r("bu"), xr = _r("u"), Sr = _r("bum"), Cr = _r("um"), wr = _r("sp"), Tr = _r("rtg"), Er = _r("rtc");
function Dr(e, t = Q) {
	gr("ec", e, t);
}
var Or = /* @__PURE__ */ Symbol.for("v-ndc");
function kr(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Lt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ zt(e), s = /* @__PURE__ */ Rt(e), e = et(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Ut(Ht(e[n])) : Ht(e[n]) : e[n], n, void 0, a && a[n]);
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
		bn(e.update);
	},
	$nextTick: (e) => e.n ||= vn.bind(e.proxy),
	$watch: (e) => Bn.bind(e)
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
		if (d) return n === "$attrs" && L(e.attrs, "get", ""), d(e);
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
		v(t) && (e.data = /* @__PURE__ */ Nt(t));
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
			Nn(t, e[t]);
		});
	}
	f && Rr(f, e, "c");
	function k(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (k(vr, p), k(yr, m), k(br, g), k(xr, _), k(fr, y), k(pr, b), k(Dr, E), k(Er, ee), k(Tr, te), k(Sr, S), k(Cr, w), k(wr, ne), d(D)) if (D.length) {
		let t = e.exposed ||= {};
		D.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === r && (e.render = T), re != null && (e.inheritAttrs = re), ie && (e.components = ie), O && (e.directives = O), ne && ar(e);
}
function Lr(e, t, n = r) {
	d(e) && (e = Gr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? Pn(r.from || n, r.default, !0) : Pn(r.from || n) : Pn(r), /* @__PURE__ */ z(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Rr(e, t, n) {
	ln(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function zr(e, t, n, r) {
	let i = r.includes(".") ? Vn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Rn(i, n);
	} else if (h(e)) Rn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => zr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && Rn(i, r, e);
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
					let u = l._ceVNode || Y(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Da(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (ln(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
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
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(A)));
	let c, l = i[c = ie(n)] || i[c = ie(E(n))];
	!l && o && (l = i[c = ie(D(n))]), l && ln(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, ln(u, e, 6, a);
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
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = kn(e), v, y;
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
		Wi.length = 0, un(t, e, 1), v = Y(Hi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = oi(y, a)), b = ra(b, y, !1, !0));
	}
	return n.dirs && (b = ra(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && rr(b, n.transition), v = b, kn(_), v;
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
	return n === "style" && v(r) && v(i) ? !M(r, i) : r !== i;
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
	n ? e.props = r ? i : /* @__PURE__ */ Pt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function hi(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ R(i), [c] = e.propsOptions, l = !1;
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
	l && Ze(e.attrs, "set", "");
}
function gi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = E(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : ri(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ R(r), i = c || t;
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
	let r = An((...e) => Si(t(...e)), n);
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
	let a = se();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Qi(e, t) && (r = M(e), j(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
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
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? O(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, N);
		}
		u != null && i ? cr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && cr(e.ref, null, a, e, !0);
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
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && E(e.children, d, null, r, i, ji(e, a), s, u), _ && Mn(e, null, r, "created"), te(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ca(f, r, e);
		}
		_ && Mn(e, null, r, "beforeMount");
		let v = Ni(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && W(() => {
			try {
				f && ca(f, r, e), v && g.enter(d), _ && Mn(e, null, r, "mounted");
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
		if (r && Mi(r, !1), (g = h.onVnodeBeforeUpdate) && ca(g, r, n, e), f && Mn(n, e, r, "beforeUpdate"), r && Mi(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? D(e.dynamicChildren, d, l, r, i, ji(n, a), o) : s || le(e, n, l, null, r, i, ji(n, a), o, !1), u > 0) {
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
			g && ca(g, r, n, e), f && Mn(n, e, r, "updated");
		}, i);
	}, D = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === G || !Qi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
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
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), E(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (D(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Pi(e, t, !0)) : le(e, t, n, f, i, a, s, c, l);
	}, O = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : k(t, n, r, i, a, o, c) : A(e, t, c);
	}, k = (e, t, n, r, i, a, o) => {
		let s = e.component = da(e, r, i);
		if (dr(e) && (s.ctx.renderer = N), ya(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, oe, o), !e.el) {
				let r = s.subTree = Y(Hi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else oe(s, e, t, n, i, a, o);
	}, A = (e, t, n) => {
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
				Mi(e, !1), t ? (t.el = c.el, ce(e, t, o)) : t = c, n && ae(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ca(d, s, t, c), Mi(e, !0);
				let f = ii(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), M(p), e, i, a), t.el = f.el, u === null && ui(e, f.el), r && W(r, i), (d = t.props && t.props.onVnodeUpdated) && W(() => ca(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = ur(t);
				if (Mi(e, !1), l && ae(l), !m && (o = c && c.onVnodeBeforeMount) && ca(o, d, t), Mi(e, !0), s && be) {
					let t = () => {
						e.subTree = ii(e), be(s, e.subTree, e, i, null);
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
				(t.shapeFlag & 256 || d && ur(d.vnode) && d.vnode.shapeFlag & 256) && e.a && W(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Te(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => bn(u), Mi(e, !0), l();
	}, ce = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, hi(e, t.props, r, n), Oi(e, t.children, n), Be(), Cn(e), Ve();
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
		m & 8 ? (u & 16 && ge(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? de(l, d, n, r, i, a, o, s, c) : ge(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && E(d, n, r, i, a, o, s, c));
	}, ue = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? aa(t[p]) : ia(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ge(e, a, o, !0, !1, f) : E(t, r, i, a, o, s, c, l, f);
	}, de = (e, t, r, i, a, o, s, c, l) => {
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
		} else if (u > p) for (; u <= f;) j(e[u], a, o, !0), u++;
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
			c.move(e, t, n, N);
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
				a._isLeaving && a[nr](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, j = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Be(), cr(s, null, n, e, !0), Ve()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !ur(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ca(_, t, e), u & 6) he(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Mn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, N, r) : l && !l.hasOnce && (a !== G || d > 0 && d & 64) ? ge(l, t, n, !1, !0) : (a === G && d & 384 || !i && u & 16) && ge(c, t, n), r && pe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && W(() => {
			_ && ca(_, t, e), h && Mn(e, null, t, "unmounted"), v && (e.el = null);
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
		Li(c), Li(l), r && ae(r), i.stop(), a && (a.flags |= 8, j(o, e, t, n)), s && W(s, t), W(() => {
			e.isUnmounted = !0;
		}, t);
	}, ge = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) j(e[o], t, n, r, i);
	}, M = (e) => {
		if (e.shapeFlag & 6) return M(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Un];
		return n ? h(n) : t;
	}, _e = !1, ve = (e, t, n) => {
		let r;
		e == null ? t._vnode && (j(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, _e ||= (_e = !0, Cn(r), wn(), !1);
	}, N = {
		p: v,
		um: j,
		m: fe,
		r: pe,
		mt: k,
		mc: E,
		pc: le,
		pbc: D,
		n: M,
		o: e
	}, ye, be;
	return i && ([ye, be] = i(N)), {
		render: ve,
		hydrate: ye,
		createApp: Zr(ve, ye)
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
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Sn(e);
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
	return Yi(Y(e, t, n, r, i, !0));
}
function Zi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Qi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var $i = ({ key: e }) => e ?? null, ea = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ z(e) || h(e) ? {
	i: Dn,
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
		scopeId: On,
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
		ctx: Dn
	};
	return s ? (oa(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), qi > 0 && !o && Gi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Gi.push(c), c;
}
var Y = ta;
function ta(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Or) && (e = Hi), Zi(e)) {
		let r = ra(e, t, !0);
		return n && oa(r, n), qi > 0 && !a && Gi && (r.shapeFlag & 6 ? Gi[Gi.indexOf(e)] = r : Gi.push(r)), r.patchFlag = -2, r;
	}
	if (Oa(e) && (e = e.__vccOpts), t) {
		t = na(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = j(e)), v(n) && (/* @__PURE__ */ Bt(n) && !d(n) && (n = s({}, n)), t.style = ce(n));
	}
	let o = g(e) ? 1 : zi(e) ? 128 : Wn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return J(e, t, n, r, i, o, a, !0);
}
function na(e) {
	return e ? /* @__PURE__ */ Bt(e) || pi(e) ? s({}, e) : e : null;
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
		patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
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
	return c && r && rr(u, c.clone(u)), u;
}
function X(e = " ", t = 0) {
	return Y(Vi, null, e, t);
}
function Z(e = "", t = !1) {
	return t ? (K(), Xi(Hi, null, e)) : Y(Hi, null, e);
}
function ia(e) {
	return e == null || typeof e == "boolean" ? Y(Hi) : d(e) ? Y(G, null, e.slice()) : Zi(e) ? aa(e) : Y(Vi, null, String(e));
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
		!r && !pi(t) ? t._ctx = Dn : r === 3 && Dn && (Dn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: Dn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [X(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function sa(...e) {
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
function ca(e, t, n, r = null) {
	ln(e, t, 7, [n, r]);
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
		scope: new xe(!0),
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
var Q = null, fa = () => Q || Dn, pa, ma;
{
	let e = se(), t = (t, n) => {
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
		Be();
		let n = e.setupContext = r.length > 1 ? Ea(e) : null, i = ha(e), a = cn(r, e, 0, [e.props, n]), o = y(a);
		if (Ve(), i(), (o || e.sp) && !ur(e) && ar(e), o) {
			if (a.then(ga, ga), t) return a.then((n) => {
				xa(e, n, t);
			}).catch((t) => {
				un(t, e, 0);
			});
			e.asyncDep = a;
		} else xa(e, a, t);
	} else wa(e, t);
}
function xa(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = qt(t)), wa(e, n);
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
		Be();
		try {
			Ir(e);
		} finally {
			Ve(), t();
		}
	}
}
var Ta = { get(e, t) {
	return L(e, "get", ""), e[t];
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
	return e.exposed ? e.exposeProxy ||= new Proxy(qt(Vt(e.exposed)), {
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
var $ = (e, t) => /* @__PURE__ */ en(e, t, va), ka = "3.5.34", Aa = void 0, ja = typeof window < "u" && window.trustedTypes;
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
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Ka(r, i, "") : Xa(e, i, !g(t) && t ? t[i] : void 0, o) || Ka(r, i, o);
		}
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
function Xa(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var Za = "http://www.w3.org/1999/xlink";
function Qa(e, t, n, r, i, a = me(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Za, t.slice(6, t.length)) : e.setAttributeNS(Za, t, n) : n == null || a && !he(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function $a(e, t, n, r, i) {
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
		r === "boolean" ? n = he(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function eo(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function to(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var no = /* @__PURE__ */ Symbol("_vei");
function ro(e, t, n, r, i = null) {
	let a = e[no] || (e[no] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = ao(t);
		r ? eo(e, n, a[t] = lo(r, i), s) : o && (to(e, n, o, s), a[t] = void 0);
	}
}
var io = /(?:Once|Passive|Capture)$/;
function ao(e) {
	let t;
	if (io.test(e)) {
		t = {};
		let n;
		for (; n = e.match(io);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : D(e.slice(2)), t];
}
var oo = 0, so = /* @__PURE__ */ Promise.resolve(), co = () => oo ||= (so.then(() => oo = 0), Date.now());
function lo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		ln(uo(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = co(), n;
}
function uo(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var fo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, po = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? za(e, r, c) : t === "style" ? Wa(e, n, r) : a(t) ? o(t) || ro(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : mo(e, t, r, c)) ? ($a(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Qa(e, t, r, c, s, t !== "value")) : e._isVueCE && (ho(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? $a(e, E(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Qa(e, t, r, c));
};
function mo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && fo(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return fo(t) && g(n) ? !1 : t in e;
}
function ho(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = E(t);
	return Array.isArray(n) ? n.some((e) => E(e) === r) : Object.keys(n).some((e) => E(e) === r);
}
var go = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ae(t, e) : t;
};
function _o(e) {
	e.target.composing = !0;
}
function vo(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var yo = /* @__PURE__ */ Symbol("_assign");
function bo(e, t, n) {
	return t && (e = e.trim()), n && (e = A(e)), e;
}
var xo = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[yo] = go(i);
		let a = r || i.props && i.props.type === "number";
		eo(e, t ? "change" : "input", (t) => {
			t.target.composing || e[yo](bo(e.value, n, a));
		}), (n || a) && eo(e, "change", () => {
			e.value = bo(e.value, n, a);
		}), t || (eo(e, "compositionstart", _o), eo(e, "compositionend", vo), eo(e, "change", vo));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[yo] = go(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? A(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, So = {
	deep: !0,
	created(e, t, n) {
		e[yo] = go(n), eo(e, "change", () => {
			let t = e._modelValue, n = Eo(e), r = e.checked, i = e[yo];
			if (d(t)) {
				let e = _e(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (p(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Do(e, r));
		});
	},
	mounted: Co,
	beforeUpdate(e, t, n) {
		e[yo] = go(n), Co(e, t, n);
	}
};
function Co(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (d(t)) i = _e(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = M(t, Do(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var wo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		eo(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? A(Eo(e)) : Eo(e));
			e[yo](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, vn(() => {
				e._assigning = !1;
			});
		}), e[yo] = go(r);
	},
	mounted(e, { value: t }) {
		To(e, t);
	},
	beforeUpdate(e, t, n) {
		e[yo] = go(n);
	},
	updated(e, { value: t }) {
		e._assigning || To(e, t);
	}
};
function To(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Eo(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = _e(t, o) > -1;
			} else a.selected = t.has(o);
			else if (M(Eo(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Eo(e) {
	return "_value" in e ? e._value : e.value;
}
function Do(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Oo = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], ko = {
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
	exact: (e, t) => Oo.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ao = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = ko[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, jo = /* @__PURE__ */ s({ patchProp: po }, La), Mo;
function No() {
	return Mo ||= ki(jo);
}
var Po = ((...e) => {
	let t = No().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Io(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Fo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Fo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Io(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region ../node_modules/pinia/dist/pinia.mjs
var Lo = typeof window < "u", Ro, zo = (e) => Ro = e, Bo = Symbol();
function Vo(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ho;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ho ||= {});
var Uo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Wo(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function Go(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		Xo(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Ko(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function qo(e) {
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
var Jo = typeof navigator == "object" ? navigator : { userAgent: "" }, Yo = /Macintosh/.test(Jo.userAgent) && /AppleWebKit/.test(Jo.userAgent) && !/Safari/.test(Jo.userAgent), Xo = Lo ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Yo ? Zo : "msSaveOrOpenBlob" in Jo ? Qo : $o : () => {};
function Zo(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? qo(r) : Ko(r.href) ? Go(e, t, n) : (r.target = "_blank", qo(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		qo(r);
	}, 0));
}
function Qo(e, t = "download", n) {
	if (typeof e == "string") if (Ko(e)) Go(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			qo(t);
		});
	}
	else navigator.msSaveOrOpenBlob(Wo(e, n), t);
}
function $o(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return Go(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(Uo.HTMLElement)) || "safari" in Uo, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || Yo) && typeof FileReader < "u") {
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
var { assign: es } = Object;
function ts() {
	let e = Se(!0), t = e.run(() => /* @__PURE__ */ B({})), n = [], r = [], i = Vt({
		install(e) {
			zo(i), i._a = e, e.provide(Bo, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
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
var ns = () => {};
function rs(e, t, n, r = ns) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && Ce() && we(i), i;
}
function is(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var as = (e) => e(), os = Symbol(), ss = Symbol();
function cs(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		Vo(i) && Vo(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ z(r) && !/* @__PURE__ */ Lt(r) ? e[n] = cs(i, r) : e[n] = r;
	}
	return e;
}
var ls = Symbol();
function us(e) {
	return !Vo(e) || !Object.prototype.hasOwnProperty.call(e, ls);
}
var { assign: ds } = Object;
function fs(e) {
	return !!(/* @__PURE__ */ z(e) && e.effect);
}
function ps(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), ds(/* @__PURE__ */ Jt(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Vt($(() => {
			zo(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = ms(e, l, t, n, r, !0), c;
}
function ms(e, t, n = {}, r, i, a) {
	let o, s = ds({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: Ho.patchFunction,
			storeId: e,
			events: void 0
		}) : (cs(r.state.value[e], t), n = {
			type: Ho.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		vn().then(() => {
			m === i && (l = !0);
		}), u = !0, is(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			ds(e, t);
		});
	} : ns;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (os in t) return t[ss] = n, t;
		let i = function() {
			zo(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			is(f, {
				args: n,
				name: i[ss],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw is(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (is(a, e), e)).catch((e) => (is(o, e), Promise.reject(e))) : (is(a, l), l);
		};
		return i[os] = !0, i[ss] = n, i;
	}, y = /* @__PURE__ */ Nt({
		_p: r,
		$id: e,
		$onAction: rs.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = rs(d, t, n.detached, () => a()), a = o.run(() => Rn(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: Ho.direct,
					events: void 0
				}, r);
			}, ds({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let b = (r._a && r._a.runWithContext || as)(() => r._e.run(() => (o = Se()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ z(n) && !fs(n) || /* @__PURE__ */ Lt(n) ? a || (p && us(n) && (/* @__PURE__ */ z(n) ? n.value = p[t] : cs(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return ds(y, b), ds(/* @__PURE__ */ R(y), b), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				ds(t, e);
			});
		}
	}), r._p.forEach((e) => {
		ds(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function hs(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = Fn();
		return n ||= o ? Pn(Bo, null) : null, n && zo(n), n = Ro, n._s.has(e) || (i ? ms(e, t, r, n) : ps(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
function gs(e) {
	let t = /* @__PURE__ */ R(e), n = {};
	for (let r in t) {
		let i = t[r];
		i.effect ? n[r] = $({
			get: () => e[r],
			set(t) {
				e[r] = t;
			}
		}) : (/* @__PURE__ */ z(i) || /* @__PURE__ */ Lt(i)) && (n[r] = /* @__PURE__ */ Zt(e, r));
	}
	return n;
}
//#endregion
//#region ../web_shared/media.ts
function _s(e) {
	let t = e.trim();
	return t ? t.startsWith("http://") || t.startsWith("https://") || t.startsWith("//") : !1;
}
function vs(e, t, n) {
	if (e == null) return null;
	let r = String(e).trim();
	return !r || !n && _s(r) ? null : r.startsWith("http://") || r.startsWith("https://") || r.startsWith("//") ? r : `${t.replace(/\/$/, "")}${r.startsWith("/") ? "" : "/"}${r}`;
}
//#endregion
//#region src/api.ts
var ys = "at_assetthingie_url", bs = "http://127.0.0.1:8188", xs = 15e3;
function Ss() {
	if (typeof localStorage > "u") return bs;
	let e = localStorage.getItem("at_assetthingie_url") || "http://127.0.0.1:8188";
	return String(e).replace(/\/$/, "");
}
function Cs() {
	return "/at";
}
function ws() {
	return typeof window < "u" && window.location?.origin && window.location.protocol !== "file:" ? window.location.origin.replace(/\/$/, "") : Ss();
}
function Ts(e) {
	localStorage.setItem(ys, e.replace(/\/$/, ""));
}
async function Es(e, t) {
	let n = `${ws()}${e}`;
	if (t?.params) {
		let e = new URLSearchParams();
		for (let [n, r] of Object.entries(t.params)) r === void 0 || r === "" || e.set(n, String(r));
		let r = e.toString();
		r && (n += `?${r}`);
	}
	let r = { ...t ?? {} };
	delete r.params;
	let i = new AbortController(), a = setTimeout(() => i.abort(), xs), o;
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
async function Ds() {
	return Es(`${Cs()}/health`);
}
async function Os(e, t, n) {
	let r = new URLSearchParams();
	if (e && r.set("content_type", e), t && r.set("family", t), n?.length) for (let e of n) {
		let t = e.trim();
		t && r.append("tag", t);
	}
	let i = ws(), a = r.toString(), o = `${i}${Cs()}/filters${a ? `?${a}` : ""}`, s = new AbortController(), c = setTimeout(() => s.abort(), xs);
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
async function ks(e, t = "lora") {
	let n = { family: t };
	return e && (n.parent = e), Es(`${Cs()}/subfolders`, { params: n });
}
async function As(e) {
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
	let r = `${ws()}${Cs()}/assets?${n.toString()}`, i = new AbortController(), a = setTimeout(() => i.abort(), xs);
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
function js(e, t) {
	return vs(e, ws(), t);
}
async function Ms(e) {
	return Es(`${Cs()}/assets/${e}`);
}
async function Ns() {
	return Es(`${Cs()}/library/clean-preview`);
}
async function Ps() {
	return Es(`${Cs()}/library/clean`, { method: "POST" });
}
async function Fs(e) {
	return Es(`${Cs()}/assets/${e}/re-enrich`, { method: "POST" });
}
async function Is(e) {
	return Es(`${Cs()}/assets/batch/re-enrich`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ asset_ids: e })
	});
}
//#endregion
//#region src/stores/assets.ts
var Ls = "at_loras_view_mode", Rs = "at_loras_grid_columns", zs = "at_loras_use_remote_images", Bs = 2, Vs = 1, Hs = 20, Us = 40;
function Ws(e) {
	return Number.isFinite(e) ? Math.min(Hs, Math.max(Vs, Math.round(e))) : Bs;
}
var Gs = hs("at-loras-assets", () => {
	let e = /* @__PURE__ */ B(!1), t = /* @__PURE__ */ B([]), n = /* @__PURE__ */ B(0), r = /* @__PURE__ */ B(0), i = /* @__PURE__ */ B(Us), a = /* @__PURE__ */ B(!1), o = /* @__PURE__ */ B(!1), s = /* @__PURE__ */ B(null), c = 0, l = 0, u = /* @__PURE__ */ B(""), d = /* @__PURE__ */ B(""), f = null;
	Rn(u, (e) => {
		f && clearTimeout(f), f = setTimeout(() => {
			d.value = e, f = null, I(!0);
		}, 300);
	});
	let p = /* @__PURE__ */ B(""), m = /* @__PURE__ */ B(null), h = /* @__PURE__ */ B(""), g = /* @__PURE__ */ B(""), _ = /* @__PURE__ */ B(""), v = /* @__PURE__ */ B([]), y = /* @__PURE__ */ B([]), b = /* @__PURE__ */ B(""), x = /* @__PURE__ */ B(""), S = /* @__PURE__ */ B(""), C = /* @__PURE__ */ B("grid"), w = /* @__PURE__ */ B(Bs), T = /* @__PURE__ */ B(!1), ee = /* @__PURE__ */ B(Ss()), te = /* @__PURE__ */ B(null), E = /* @__PURE__ */ B(null), ne = /* @__PURE__ */ B(null), D = /* @__PURE__ */ B(!1), re = /* @__PURE__ */ B([]), ie = /* @__PURE__ */ B(/* @__PURE__ */ new Set()), O = /* @__PURE__ */ B(!1), ae = /* @__PURE__ */ B(null), k = /* @__PURE__ */ B(!1), A = /* @__PURE__ */ B(/* @__PURE__ */ new Set()), oe = /* @__PURE__ */ B(!0);
	try {
		let e = localStorage.getItem(Ls);
		(e === "list" || e === "grid") && (C.value = e);
		let t = localStorage.getItem(Rs);
		t != null && (w.value = Ws(parseInt(t, 10))), localStorage.getItem(zs) === "false" && (oe.value = !1);
	} catch {}
	Rn(oe, (e) => {
		try {
			localStorage.setItem(zs, e ? "true" : "false");
		} catch {}
	});
	let se = $(() => t.value.length < n.value), ce = $(() => ie.value), le = $(() => A.value.size);
	function ue(e) {
		return A.value.has(e);
	}
	function de(e) {
		let t = new Set(A.value);
		t.has(e) ? t.delete(e) : t.add(e), A.value = t;
	}
	function fe() {
		A.value = /* @__PURE__ */ new Set();
	}
	function j() {
		k.value = !k.value, k.value || fe();
	}
	function pe() {
		let e = new Set(A.value);
		for (let n of t.value) e.add(n.asset_id);
		A.value = e;
	}
	async function me() {
		let e = [...A.value];
		if (!e.length) {
			ke("No assets selected");
			return;
		}
		try {
			let t = await Is(e);
			ke(`Re-enrich: ${t.processed} ok${t.failed ? `, ${t.failed} failed` : ""}`), fe(), k.value = !1, await I(!0);
		} catch (e) {
			ke(e instanceof Error ? e.message : "Batch re-enrich failed");
		}
	}
	function he() {
		re.value = [], ie.value = /* @__PURE__ */ new Set();
	}
	async function ge() {
		try {
			e.value = !!(await Ds()).ok, s.value = null;
		} catch (t) {
			e.value = !1, s.value = t instanceof Error ? t.message : "Connection failed";
		}
	}
	async function M() {
		try {
			m.value = await Os(void 0, "lora", y.value.length > 0 ? [...y.value] : void 0);
		} catch {
			m.value = null;
		}
	}
	async function _e() {
		if (e.value) try {
			let e = await ks(h.value || void 0, "lora");
			v.value = e.folders, g.value = e.parent_path, _.value ||= e.parent_path;
		} catch {
			v.value = [];
		}
	}
	function ve(e) {
		x.value = x.value === e ? "" : e, x.value === "folder" ? _e() : x.value === "tag" && M();
	}
	function N(e) {
		h.value = `${g.value.replace(/\/$/, "")}/${e}`, _e(), I(!0);
	}
	function ye(e) {
		h.value = e, _e(), I(!0);
	}
	function be() {
		h.value = "", _e(), I(!0);
	}
	function P(e) {
		let t = e.trim();
		if (!t) return;
		let n = y.value, r = n.indexOf(t);
		r >= 0 ? y.value = n.filter((e, t) => t !== r) : y.value = [...n, t], I(!0), M();
	}
	function xe() {
		y.value = [], S.value = "", I(!0), M();
	}
	function Se(e) {
		let t = e.trim();
		b.value === t ? b.value = "" : b.value = t, I(!0);
	}
	function Ce() {
		b.value = "", I(!0);
	}
	function we() {
		let e = d.value.trim();
		if (!e) return;
		let t = /^(name|trigger|category|tag):$/i;
		return e.split(",").some((e) => {
			let n = e.trim();
			return n !== "" && !t.test(n);
		}) ? e : void 0;
	}
	function F() {
		let e = y.value.length > 0 ? [...y.value] : void 0;
		return {
			q: we(),
			family: "lora",
			base_model: p.value.trim() || void 0,
			category: b.value.trim() || void 0,
			path_prefix: h.value.trim() || void 0,
			tag: e,
			sort: "path",
			limit: i.value
		};
	}
	async function I(i) {
		if (!e.value && i && (await ge(), !e.value)) return;
		let l;
		if (i) l = ++c, r.value = 0, t.value = [];
		else {
			if (a.value || o.value) return;
			l = c;
		}
		a.value = !0, s.value = null;
		try {
			let e = await As({
				...F(),
				offset: r.value
			});
			if (l !== c) return;
			n.value = e.total, i ? t.value = e.items : t.value = [...t.value, ...e.items], he();
		} catch (e) {
			if (l !== c) return;
			s.value = e instanceof Error ? e.message : "Load failed", i && (t.value = []);
		} finally {
			l === c && (a.value = !1);
		}
	}
	async function Te() {
		if (!se.value || a.value || o.value) return;
		let e = c;
		o.value = !0, r.value = t.value.length;
		try {
			let i = await As({
				...F(),
				offset: r.value
			});
			if (e !== c) return;
			n.value = i.total, t.value = [...t.value, ...i.items], he();
		} catch (t) {
			if (e !== c) return;
			s.value = t instanceof Error ? t.message : "Load failed";
		} finally {
			e === c && (o.value = !1);
		}
	}
	function Ee() {
		u.value = "", d.value = "", f &&= (clearTimeout(f), null), p.value = "", h.value = "", g.value = "", _.value = "", v.value = [], y.value = [], b.value = "", x.value = "", S.value = "", I(!0), e.value && (_e(), M());
	}
	function De(e) {
		C.value = e;
		try {
			localStorage.setItem(Ls, e);
		} catch {}
	}
	function Oe(e) {
		let t = Ws(e);
		w.value = t;
		try {
			localStorage.setItem(Rs, String(t));
		} catch {}
	}
	function ke(e) {
		te.value = e, setTimeout(() => {
			te.value = null;
		}, 2e3);
	}
	function Ae() {
		Ts(ee.value), Le();
	}
	function je(e) {
		if (!e.comfy_lora_name?.trim()) {
			ke("No Comfy LoRA name for this asset");
			return;
		}
		ke("LoRA Stack shortcut is not available in at_comfy v1.");
	}
	function Me() {
		O.value = !1, ae.value = null;
	}
	function Ne() {
		O.value = !1, ae.value = null;
	}
	function Pe(e) {
		E.value = e, ne.value = null, Ie();
	}
	function Fe() {
		E.value = null, ne.value = null;
	}
	async function Ie() {
		let e = E.value;
		if (e == null) return;
		let t = ++l;
		D.value = !0;
		try {
			let n = await Ms(e);
			if (t !== l || e !== E.value) return;
			ne.value = n, he();
		} catch (e) {
			if (t !== l) return;
			ke(e instanceof Error ? e.message : "Detail load failed"), ne.value = null;
		} finally {
			t === l && (D.value = !1);
		}
	}
	async function Le() {
		ee.value = Ss(), await ge(), e.value && (await M(), he(), await _e(), await I(!0));
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
		searchQuery: u,
		baseModel: p,
		filterOptions: m,
		folderPath: h,
		browseParentPath: g,
		libraryRootPath: _,
		subfolders: v,
		selectedTags: y,
		selectedCategory: b,
		openFilterSection: x,
		tagFilterText: S,
		viewMode: C,
		gridColumnCount: w,
		settingsOpen: T,
		baseUrlInput: ee,
		toast: te,
		hasMore: se,
		selectedAssetId: E,
		detail: ne,
		detailLoading: D,
		stackNodes: re,
		lorasInStack: ce,
		stackPickerOpen: O,
		stackPickerItem: ae,
		selectionMode: k,
		selectedIds: A,
		useRemoteImages: oe,
		selectedCount: le,
		isAssetSelected: ue,
		toggleAssetSelect: de,
		clearAssetSelection: fe,
		toggleSelectionMode: j,
		selectAllVisibleAssets: pe,
		batchReEnrichSelected: me,
		checkHealth: ge,
		loadFilters: M,
		loadSubfolders: _e,
		toggleFilterSection: ve,
		drillFolder: N,
		navigateFolderToAbsolute: ye,
		resetFolderPath: be,
		toggleTag: P,
		resetSelectedTags: xe,
		setCategory: Se,
		resetCategory: Ce,
		loadAssets: I,
		loadMore: Te,
		resetFilters: Ee,
		setViewMode: De,
		setGridColumnCount: Oe,
		showToast: ke,
		saveSettingsUrl: Ae,
		bootstrap: Le,
		refreshStackState: he,
		requestAddToStack: je,
		confirmStackPicker: Me,
		cancelStackPicker: Ne,
		openDetail: Pe,
		closeDetail: Fe,
		loadDetail: Ie
	};
}), Ks = { class: "at-filters" }, qs = { class: "at-filters__row" }, Js = { class: "at-filters__field" }, Ys = ["value"], Xs = {
	class: "at-filter-modes",
	role: "tablist",
	"aria-label": "Filter by folder, tag, or category"
}, Zs = ["aria-pressed"], Qs = {
	key: 0,
	class: "at-mode-btn__dot",
	"aria-hidden": "true"
}, $s = ["aria-pressed"], ec = {
	key: 0,
	class: "at-mode-btn__dot",
	"aria-hidden": "true"
}, tc = ["aria-pressed"], nc = {
	key: 0,
	class: "at-mode-btn__dot",
	"aria-hidden": "true"
}, rc = {
	key: 0,
	class: "at-filter-section"
}, ic = { class: "at-folder-nav" }, ac = { class: "at-breadcrumb" }, oc = {
	key: 0,
	class: "at-breadcrumb__sep"
}, sc = ["onClick"], cc = {
	key: 0,
	class: "at-folder-chips"
}, lc = ["onClick"], uc = {
	key: 1,
	class: "at-folder-empty"
}, dc = {
	key: 1,
	class: "at-filter-section"
}, fc = { class: "at-tag-panel" }, pc = { class: "at-tag-panel__top" }, mc = { class: "at-tag-chips" }, hc = ["onClick"], gc = { class: "at-tag-chip__count" }, _c = {
	key: 2,
	class: "at-filter-section"
}, vc = { class: "at-category-panel" }, yc = {
	key: 0,
	class: "at-category-chips"
}, bc = ["onClick"], xc = {
	key: 1,
	class: "at-folder-empty"
}, Sc = /* @__PURE__ */ ir({
	__name: "FilterPanel",
	setup(e) {
		let t = Gs(), { baseModel: n, filterOptions: r, folderPath: i, libraryRootPath: a, subfolders: o, selectedTags: s, selectedCategory: c, openFilterSection: l, tagFilterText: u } = gs(t);
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
		return (e, i) => (K(), q("div", Ks, [
			J("div", qs, [J("label", Js, [i[8] ||= J("span", null, "Base model", -1), jn(J("select", {
				"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ z(n) ? n.value = e : null,
				class: "at-select",
				onChange: d
			}, [i[7] ||= J("option", { value: "" }, "Any", -1), (K(!0), q(G, null, kr(V(r)?.base_models ?? [], (e) => (K(), q("option", {
				key: e,
				value: e
			}, N(e), 9, Ys))), 128))], 544), [[wo, V(n)]])])]),
			J("div", Xs, [
				J("button", {
					type: "button",
					class: j(["at-mode-btn", { "at-mode-btn--on": V(l) === "folder" }]),
					title: "Browse folders",
					"aria-pressed": V(l) === "folder",
					onClick: i[1] ||= (e) => V(t).toggleFilterSection("folder")
				}, [i[9] ||= J("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "📁", -1), f.value ? (K(), q("span", Qs)) : Z("", !0)], 10, Zs),
				J("button", {
					type: "button",
					class: j(["at-mode-btn", { "at-mode-btn--on": V(l) === "tag" }]),
					title: "Filter by tags",
					"aria-pressed": V(l) === "tag",
					onClick: i[2] ||= (e) => V(t).toggleFilterSection("tag")
				}, [i[10] ||= J("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "🏷", -1), p.value ? (K(), q("span", ec)) : Z("", !0)], 10, $s),
				J("button", {
					type: "button",
					class: j(["at-mode-btn", { "at-mode-btn--on": V(l) === "category" }]),
					title: "Filter by category",
					"aria-pressed": V(l) === "category",
					onClick: i[3] ||= (e) => V(t).toggleFilterSection("category")
				}, [i[11] ||= J("span", {
					class: "at-mode-btn__icon",
					"aria-hidden": "true"
				}, "📂", -1), m.value ? (K(), q("span", nc)) : Z("", !0)], 10, tc)
			]),
			V(l) === "folder" ? (K(), q("div", rc, [J("div", ic, [J("div", ac, [(K(!0), q(G, null, kr(h.value, (e, n) => (K(), q(G, { key: e.path + n }, [n > 0 ? (K(), q("span", oc, "›")) : Z("", !0), J("button", {
				type: "button",
				class: "at-breadcrumb__seg",
				onClick: (n) => V(t).navigateFolderToAbsolute(e.path)
			}, N(e.label), 9, sc)], 64))), 128))]), V(o).length ? (K(), q("div", cc, [(K(!0), q(G, null, kr(V(o), (e) => (K(), q("button", {
				key: e,
				type: "button",
				class: "at-folder-chip",
				onClick: (n) => V(t).drillFolder(e)
			}, N(e), 9, lc))), 128))])) : (K(), q("p", uc, "No subfolders here"))])])) : V(l) === "tag" ? (K(), q("div", dc, [J("div", fc, [
				J("div", pc, [jn(J("input", {
					"onUpdate:modelValue": i[4] ||= (e) => /* @__PURE__ */ z(u) ? u.value = e : null,
					type: "search",
					class: "at-tag-search",
					placeholder: "Filter tag list…",
					autocomplete: "off"
				}, null, 512), [[xo, V(u)]]), J("button", {
					type: "button",
					class: "at-folder-reset",
					onClick: i[5] ||= (e) => V(t).resetSelectedTags()
				}, "Reset")]),
				i[12] ||= J("p", { class: "at-tag-hint" }, "All selected tags must match (AND).", -1),
				J("div", mc, [(K(!0), q(G, null, kr(g.value, (e) => (K(), q("button", {
					key: e.tag_id,
					type: "button",
					class: j(["at-tag-chip", { "at-tag-chip--selected": _(e.name) }]),
					onClick: (n) => V(t).toggleTag(e.name)
				}, [X(N(e.name) + " ", 1), J("span", gc, N(e.count), 1)], 10, hc))), 128))])
			])])) : V(l) === "category" ? (K(), q("div", _c, [J("div", vc, [J("button", {
				type: "button",
				class: "at-folder-reset",
				onClick: i[6] ||= (e) => V(t).resetCategory()
			}, "Reset"), (V(r)?.categories ?? []).length ? (K(), q("div", yc, [(K(!0), q(G, null, kr(V(r)?.categories ?? [], (e) => (K(), q("button", {
				key: e,
				type: "button",
				class: j(["at-category-chip", { "at-category-chip--selected": V(c) === e }]),
				onClick: (n) => V(t).setCategory(e)
			}, N(e), 11, bc))), 128))])) : (K(), q("p", xc, "No categories in index"))])])) : Z("", !0)
		]));
	}
}), Cc = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, wc = /* @__PURE__ */ Cc(Sc, [["__scopeId", "data-v-2ff6bcd0"]]), Tc = { class: "at-toolbar" }, Ec = {
	key: 0,
	class: "at-toolbar__row at-toolbar__row--select"
}, Dc = { class: "at-toolbar__sel-label" }, Oc = { class: "at-toolbar__row at-toolbar__row--search" }, kc = ["aria-pressed"], Ac = ["aria-pressed"], jc = ["aria-pressed"], Mc = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "Toolbar",
	setup(e) {
		let t = Gs();
		return (e, n) => (K(), q("div", Tc, [
			V(t).selectionMode ? (K(), q("div", Ec, [
				J("span", Dc, N(V(t).selectedCount) + " selected", 1),
				J("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[0] ||= (...e) => V(t).selectAllVisibleAssets && V(t).selectAllVisibleAssets(...e)
				}, " All visible "),
				J("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[1] ||= (...e) => V(t).clearAssetSelection && V(t).clearAssetSelection(...e)
				}, " Clear "),
				J("button", {
					type: "button",
					class: "at-toolbar__chip at-toolbar__chip--primary",
					onClick: n[2] ||= (...e) => V(t).batchReEnrichSelected && V(t).batchReEnrichSelected(...e)
				}, " Re-enrich selected "),
				J("button", {
					type: "button",
					class: "at-toolbar__chip",
					onClick: n[3] ||= (...e) => V(t).toggleSelectionMode && V(t).toggleSelectionMode(...e)
				}, "Done")
			])) : Z("", !0),
			J("div", Oc, [
				jn(J("input", {
					"onUpdate:modelValue": n[4] ||= (e) => V(t).searchQuery = e,
					type: "search",
					class: "at-toolbar__search",
					placeholder: "name:, trigger:, category:, tag: or free text",
					autocomplete: "off"
				}, null, 512), [[xo, V(t).searchQuery]]),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Grid view",
					"aria-pressed": V(t).viewMode === "grid",
					onClick: n[5] ||= (e) => V(t).setViewMode("grid")
				}, " ▦ ", 8, kc),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "List view",
					"aria-pressed": V(t).viewMode === "list",
					onClick: n[6] ||= (e) => V(t).setViewMode("list")
				}, " ≡ ", 8, Ac),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Select assets",
					"aria-pressed": V(t).selectionMode,
					onClick: n[7] ||= (...e) => V(t).toggleSelectionMode && V(t).toggleSelectionMode(...e)
				}, " ☑ ", 8, jc),
				J("button", {
					type: "button",
					class: "at-icon-btn",
					title: "Settings",
					onClick: n[8] ||= (e) => V(t).settingsOpen = !0
				}, " ⚙ "),
				J("button", {
					type: "button",
					class: "at-reset",
					onClick: n[9] ||= (e) => V(t).resetFilters()
				}, " Reset ")
			]),
			Y(wc)
		]));
	}
}), [["__scopeId", "data-v-a02de5ed"]]), Nc = { class: "at-status" }, Pc = ["title"], Fc = { class: "at-status__text" }, Ic = {
	key: 3,
	class: "at-status__more"
}, Lc = {
	key: 1,
	class: "at-status__toast"
}, Rc = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "StatusBar",
	setup(e) {
		let t = Gs(), { connected: n, total: r, items: i, loading: a, loadingMore: o, error: s, toast: c } = gs(t);
		return (e, l) => (K(), q("div", Nc, [
			J("span", {
				class: j(["at-status__dot", V(n) ? "at-status__dot--ok" : "at-status__dot--bad"]),
				title: V(n) ? "Connected" : "Disconnected"
			}, null, 10, Pc),
			J("span", Fc, [V(a) && !V(i).length ? (K(), q(G, { key: 0 }, [X("Loading…")], 64)) : V(s) ? (K(), q(G, { key: 1 }, [X(N(V(s)), 1)], 64)) : (K(), q(G, { key: 2 }, [X("Showing " + N(V(i).length) + " / " + N(V(r)), 1)], 64)), V(o) ? (K(), q("span", Ic, " · More…")) : Z("", !0)]),
			!V(n) || V(s) ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-status__retry",
				onClick: l[0] ||= (e) => V(t).bootstrap()
			}, " Retry ")) : Z("", !0),
			V(c) ? (K(), q("span", Lc, N(V(c)), 1)) : Z("", !0)
		]));
	}
}), [["__scopeId", "data-v-336fed4b"]]);
//#endregion
//#region src/composables/useClipboard.ts
async function zc(e) {
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
var Bc = ["checked"], Vc = ["src"], Hc = ["src"], Uc = ["src"], Wc = {
	key: 2,
	class: "at-card__placeholder"
}, Gc = {
	key: 3,
	class: "at-card__cat"
}, Kc = {
	key: 4,
	class: "at-card__fav",
	title: "Favorite",
	"aria-hidden": "true"
}, qc = {
	key: 5,
	class: "at-card__in-stack",
	title: "In stack"
}, Jc = { class: "at-card__body" }, Yc = { class: "at-card__title-row" }, Xc = ["title"], Zc = {
	key: 0,
	class: "at-card__strength"
}, Qc = {
	key: 0,
	class: "at-card__bm"
}, $c = {
	key: 1,
	class: "at-card__tw"
}, el = {
	key: 2,
	class: "at-card__usage"
}, tl = { class: "at-card__actions" }, nl = ["disabled"], rl = ["disabled"], il = ["title"], al = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "AssetCard",
	props: {
		item: {},
		compact: { type: Boolean }
	},
	setup(e) {
		let t = e, n = Gs(), r = $(() => js(t.item.cover_url, n.useRemoteImages)), i = $(() => js(t.item.cover_playback_url, n.useRemoteImages)), a = $(() => (t.item.cover_media_type || "").toLowerCase() === "video" && !!i.value);
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
			let e = t.item.default_strength;
			return e == null || Number(e) === 1 ? "" : String(e);
		}), u = $(() => {
			let e = t.item.usage_count, n = t.item.last_used_at;
			if (!e && !n) return "";
			let r = [];
			return e && r.push(`uses: ${e}`), n && r.push(n.replace("T", " ").slice(0, 16)), r.join(" · ");
		}), d = $(() => {
			let e = t.item.comfy_lora_name;
			return e ? n.lorasInStack.has(e) : !1;
		});
		function f(e) {
			let n = t.item.comfy_lora_name?.trim();
			if (!n || !e.dataTransfer) return;
			let r = t.item.default_strength == null ? 1 : Number(t.item.default_strength);
			e.dataTransfer.setData("application/x-at-lora", JSON.stringify({
				lora_name: n,
				strength_model: r,
				strength_clip: r,
				trigger_words: t.item.trigger_words ?? [],
				display_name: t.item.display_name
			})), e.dataTransfer.effectAllowed = "copy";
		}
		async function p(e) {
			e.stopPropagation();
			let r = t.item.lora_syntax?.trim();
			if (!r) return;
			let i = await zc(r);
			n.showToast(i ? "Copied" : "Copy failed");
		}
		function m(e) {
			e.stopPropagation(), n.requestAddToStack(t.item);
		}
		function h(e) {
			if (!e.target.closest("button, .at-card__drag, a, .at-card__select, .at-card__select input")) {
				if (n.selectionMode) {
					n.toggleAssetSelect(t.item.asset_id);
					return;
				}
				n.openDetail(t.item.asset_id);
			}
		}
		return (t, g) => (K(), q("article", {
			class: j(["at-card", {
				"at-card--compact": e.compact,
				"at-card--selected": V(n).selectionMode && V(n).isAssetSelected(e.item.asset_id)
			}]),
			onClick: h
		}, [
			V(n).selectionMode ? (K(), q("label", {
				key: 0,
				class: "at-card__select",
				onClick: g[1] ||= Ao(() => {}, ["stop"])
			}, [J("input", {
				type: "checkbox",
				checked: V(n).isAssetSelected(e.item.asset_id),
				onChange: g[0] ||= Ao((t) => V(n).toggleAssetSelect(e.item.asset_id), ["stop"])
			}, null, 40, Bc)])) : Z("", !0),
			J("div", {
				class: "at-card__media",
				onMouseenter: o,
				onMouseleave: s
			}, [
				a.value && i.value ? (K(), q(G, { key: 0 }, [J("video", {
					class: "at-card__img at-card__vid",
					src: i.value,
					muted: "",
					loop: "",
					playsinline: "",
					preload: "metadata"
				}, null, 8, Vc), r.value ? (K(), q("img", {
					key: 0,
					src: r.value,
					loading: "lazy",
					alt: "",
					class: "at-card__img at-card__img--freeze"
				}, null, 8, Hc)) : Z("", !0)], 64)) : r.value ? (K(), q("img", {
					key: 1,
					src: r.value,
					loading: "lazy",
					alt: "",
					class: "at-card__img"
				}, null, 8, Uc)) : (K(), q("div", Wc, "No image")),
				e.item.category ? (K(), q("span", Gc, N(e.item.category), 1)) : Z("", !0),
				e.item.is_favorite ? (K(), q("span", Kc, "★")) : Z("", !0),
				d.value ? (K(), q("span", qc, "✓")) : Z("", !0)
			], 32),
			J("div", Jc, [
				J("div", Yc, [J("span", {
					class: "at-card__title",
					title: e.item.display_name || e.item.filename
				}, N(e.item.display_name || e.item.filename), 9, Xc), l.value ? (K(), q("span", Zc, N(l.value), 1)) : Z("", !0)]),
				e.item.base_model && !e.compact ? (K(), q("div", Qc, N(e.item.base_model), 1)) : Z("", !0),
				c.value ? (K(), q("div", $c, N(c.value), 1)) : Z("", !0),
				e.compact && u.value ? (K(), q("div", el, N(u.value), 1)) : Z("", !0),
				J("div", { class: j(["at-card__actions-row", { "at-card__actions-row--compact": e.compact }]) }, [J("div", tl, [J("button", {
					type: "button",
					class: "at-card__btn at-card__btn--primary",
					disabled: !e.item.lora_syntax,
					onClick: Ao(p, ["stop"])
				}, " Copy LoRA ", 8, nl), J("button", {
					type: "button",
					class: "at-card__btn",
					disabled: !e.item.comfy_lora_name,
					title: "Add to LM LoRA Stack",
					onClick: Ao(m, ["stop"])
				}, " + Stack ", 8, rl)]), e.item.base_model && e.compact ? (K(), q("span", {
					key: 0,
					class: "at-card__bm-compact",
					title: e.item.base_model
				}, N(e.item.base_model), 9, il)) : Z("", !0)], 2)
			]),
			J("button", {
				type: "button",
				class: "at-card__drag",
				title: "Drag to LM LoRA Stack node",
				draggable: "true",
				onDragstart: f,
				onClick: g[2] ||= Ao(() => {}, ["stop"])
			}, " ⠿ ", 32)
		], 2));
	}
}), [["__scopeId", "data-v-682d5395"]]), ol = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "AssetGrid",
	setup(e) {
		let { items: t, gridColumnCount: n } = gs(Gs());
		return (e, r) => (K(), q("div", {
			class: "at-grid",
			style: ce({ "--at-grid-cols": V(n) })
		}, [(K(!0), q(G, null, kr(V(t), (e) => (K(), Xi(al, {
			key: e.asset_id,
			item: e
		}, null, 8, ["item"]))), 128))], 4));
	}
}), [["__scopeId", "data-v-9b6dfc6f"]]), sl = { class: "at-list" }, cl = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "AssetList",
	setup(e) {
		let { items: t } = gs(Gs());
		return (e, n) => (K(), q("div", sl, [(K(!0), q(G, null, kr(V(t), (e) => (K(), Xi(al, {
			key: e.asset_id,
			item: e,
			compact: ""
		}, null, 8, ["item"]))), 128))]));
	}
}), [["__scopeId", "data-v-f4befc85"]]), ll = {
	class: "at-settings",
	role: "dialog",
	"aria-label": "AssetThingie settings"
}, ul = { class: "at-settings__label" }, dl = { class: "at-settings__label at-settings__label--mt" }, fl = { class: "at-settings__slider-row" }, pl = ["value"], ml = {
	class: "at-settings__slider-value",
	"aria-live": "polite"
}, hl = { class: "at-settings__label at-settings__label--row at-settings__label--mt" }, gl = { class: "at-settings__section" }, _l = { class: "at-settings__row" }, vl = ["disabled"], yl = {
	key: 0,
	class: "at-settings__err"
}, bl = {
	key: 0,
	class: "at-settings__ok"
}, xl = {
	key: 1,
	class: "at-settings__warn"
}, Sl = {
	key: 2,
	class: "at-settings__stale-list"
}, Cl = { class: "at-settings__stale-name" }, wl = { key: 0 }, Tl = ["disabled"], El = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "SettingsPanel",
	setup(e) {
		let t = Gs(), n = /* @__PURE__ */ B(null), r = /* @__PURE__ */ B(!1), i = /* @__PURE__ */ B(!1), a = /* @__PURE__ */ B(null);
		function o(e) {
			return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
		}
		async function s() {
			a.value = null, r.value = !0;
			try {
				n.value = await Ns();
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
					let e = await Ps();
					t.showToast(`Removed ${e.removed} stale entr${e.removed === 1 ? "y" : "ies"}`), n.value = await Ns(), await t.loadAssets(!0);
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
			onClick: Ao(l, ["self"])
		}, [J("div", ll, [
			d[8] ||= J("h2", { class: "at-settings__title" }, "AssetThingie", -1),
			J("label", ul, [d[3] ||= X(" Server URL ", -1), jn(J("input", {
				"onUpdate:modelValue": d[0] ||= (e) => V(t).baseUrlInput = e,
				type: "url",
				class: "at-settings__input"
			}, null, 512), [[xo, V(t).baseUrlInput]])]),
			d[9] ||= J("p", { class: "at-settings__hint" }, [X(" AssetThingie URL. Default "), J("code", null, "http://127.0.0.1:8188")], -1),
			J("label", dl, [d[4] ||= X(" Grid columns (card view) ", -1), J("div", fl, [J("input", {
				type: "range",
				class: "at-settings__range",
				min: "1",
				max: "20",
				step: "1",
				value: V(t).gridColumnCount,
				onInput: d[1] ||= (e) => V(t).setGridColumnCount(Number(e.target.value))
			}, null, 40, pl), J("span", ml, N(V(t).gridColumnCount), 1)])]),
			d[10] ||= J("p", { class: "at-settings__hint" }, " 1–20 columns when the toolbar is in grid mode. Very narrow sidebars still use one column. ", -1),
			J("label", hl, [jn(J("input", {
				"onUpdate:modelValue": d[2] ||= (e) => V(t).useRemoteImages = e,
				type: "checkbox",
				class: "at-settings__checkbox"
			}, null, 512), [[So, V(t).useRemoteImages]]), d[5] ||= X(" Use remote images ", -1)]),
			d[11] ||= J("p", { class: "at-settings__hint" }, [
				X(" When enabled, covers and example gallery may load HTTPS URLs from Civitai when an item is not fully cached. When disabled, only images served from this Comfy instance ("),
				J("code", null, "/at/cache/…"),
				X(") are shown. ")
			], -1),
			J("div", gl, [
				d[6] ||= J("h3", { class: "at-settings__subtitle" }, "Library maintenance", -1),
				d[7] ||= J("p", { class: "at-settings__hint" }, " Remove database entries for model files that are no longer on disk, and delete their cached cover/example images. ", -1),
				J("div", _l, [J("button", {
					type: "button",
					class: "at-settings__btn",
					disabled: r.value,
					onClick: s
				}, N(r.value ? "Checking…" : "Check for missing files"), 9, vl)]),
				a.value ? (K(), q("p", yl, N(a.value), 1)) : n.value ? (K(), q(G, { key: 1 }, [
					n.value.stale_count === 0 ? (K(), q("p", bl, " Library is clean — no missing models found. ")) : (K(), q("p", xl, N(n.value.stale_count) + " model" + N(n.value.stale_count === 1 ? "" : "s") + " missing from disk. Cached images: ~" + N(o(n.value.orphan_cache_bytes)) + ". ", 1)),
					n.value.stale_count > 0 ? (K(), q("ul", Sl, [(K(!0), q(G, null, kr(n.value.stale_assets.slice(0, 12), (e) => (K(), q("li", { key: e.asset_id }, [J("span", Cl, N(e.display_name || e.path), 1)]))), 128)), n.value.stale_assets.length > 12 ? (K(), q("li", wl, "…")) : Z("", !0)])) : Z("", !0),
					J("button", {
						type: "button",
						class: "at-settings__btn at-settings__btn--danger",
						disabled: n.value.stale_count === 0 || i.value,
						onClick: c
					}, N(i.value ? "Removing…" : "Confirm removal"), 9, Tl)
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
}), [["__scopeId", "data-v-9d3942ee"]]), Dl = ["src", "poster"], Ol = ["src"], kl = {
	key: 2,
	class: "at-imlb__meta"
}, Al = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
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
		return (t, i) => (K(), Xi($n, { to: "body" }, [r.value ? (K(), q("div", {
			key: 0,
			class: "at-imlb",
			onClick: i[2] ||= Ao((e) => t.$emit("close"), ["self"])
		}, [J("div", {
			class: "at-imlb__inner",
			onClick: i[1] ||= Ao((e) => t.$emit("close"), ["self"])
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
			}, null, 8, Dl)) : e.imageUrl ? (K(), q("img", {
				key: 1,
				src: e.imageUrl,
				alt: "Preview"
			}, null, 8, Ol)) : Z("", !0),
			e.meta && Object.keys(e.meta).length ? (K(), q("pre", kl, N(JSON.stringify(e.meta, null, 2)), 1)) : Z("", !0)
		])])) : Z("", !0)]));
	}
}), [["__scopeId", "data-v-da67729f"]]), jl = { class: "at-detail__head" }, Ml = {
	key: 0,
	class: "at-detail__loading"
}, Nl = {
	key: 1,
	class: "at-detail__scroll"
}, Pl = ["src"], Fl = ["src"], Il = ["src"], Ll = { class: "at-detail__name" }, Rl = {
	key: 1,
	class: "at-detail__meta"
}, zl = {
	key: 2,
	class: "at-detail__meta"
}, Bl = { class: "at-detail__syntax" }, Vl = { class: "at-detail__code" }, Hl = {
	key: 3,
	class: "at-detail__meta"
}, Ul = {
	key: 4,
	class: "at-detail__section"
}, Wl = { class: "at-detail__notes" }, Gl = { class: "at-detail__section" }, Kl = { class: "at-detail__sec-head" }, ql = {
	key: 0,
	class: "at-detail__tw-list"
}, Jl = {
	key: 1,
	class: "at-detail__tw-empty"
}, Yl = {
	key: 5,
	class: "at-detail__section"
}, Xl = { class: "at-detail__tags" }, Zl = {
	key: 6,
	class: "at-detail__meta"
}, Ql = ["href"], $l = { class: "at-detail__row-actions" }, eu = ["disabled"], tu = {
	key: 8,
	class: "at-detail__meta"
}, nu = {
	key: 9,
	class: "at-detail__section"
}, ru = ["innerHTML"], iu = {
	key: 10,
	class: "at-detail__section"
}, au = { class: "at-detail__gallery" }, ou = ["onMouseenter", "onMouseleave"], su = ["onClick"], cu = ["src"], lu = ["src"], uu = ["src"], du = ["src"], fu = {
	key: 11,
	class: "at-detail__section"
}, pu = { class: "at-detail__path-line" }, mu = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "DetailPanel",
	setup(e) {
		let t = Gs(), { detail: n, detailLoading: r, useRemoteImages: i } = gs(t), a = $(() => n.value ? js(n.value.cover_url_full || n.value.cover_url, i.value) : null), o = $(() => n.value ? js(n.value.cover_playback_url, i.value) : null), s = $(() => (n.value?.cover_media_type || "").toLowerCase() === "video" && !!o.value), c = $(() => {
			let e = n.value?.trigger_words;
			return e && Array.isArray(e) ? e.map((e) => String(e).trim()).filter(Boolean) : [];
		}), l = $(() => c.value.join(", ")), u = $(() => {
			let e = n.value;
			if (!e) return "";
			let t = (e.path ?? "").trim(), r = (e.comfy_lora_name ?? "").trim();
			if (!t && !r) return "";
			if (!r) return t;
			if (!t) return r;
			let i = t.includes("\\") ? "\\" : "/", a = t.replace(/[/\\]+$/, "");
			return a.endsWith(r) || t.endsWith(r) ? t : `${a}${i}${r}`;
		});
		async function d(e, n) {
			let r = (n ?? "").trim();
			if (!r) return;
			let i = await zc(r);
			t.showToast(i ? `Copied ${e}` : "Copy failed");
		}
		let f = /* @__PURE__ */ B(null), p = /* @__PURE__ */ B(null), m = /* @__PURE__ */ B(null), h = /* @__PURE__ */ B(null), g = /* @__PURE__ */ B(null);
		function _() {
			f.value = null, p.value = null, m.value = null, h.value = null, g.value = null;
		}
		function v(e) {
			let t = (e.media_type || "image").toLowerCase(), n = i.value, r = e.playback_url ? js(e.playback_url, n) : null, a = js(e.poster_url || e.thumbnail_url, n);
			if (t === "video" && r) h.value = "video", p.value = r, m.value = a, f.value = a || r;
			else if (t === "video") {
				h.value = "image", p.value = null, m.value = null;
				let t = a || js(e.url || e.thumbnail_url, n);
				if (!t) return;
				f.value = t;
			} else {
				p.value = null, m.value = null;
				let t = js(e.url || e.thumbnail_url, n);
				if (!t) return;
				f.value = t;
			}
			let o = e.generation_params;
			o && typeof o == "object" && Object.keys(o).length ? g.value = { ...o } : (e.caption ?? "").trim() ? g.value = { caption: e.caption } : g.value = null;
		}
		function y(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function b(e) {
			let t = e.currentTarget?.querySelector("video");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		function x(e) {
			let t = e.currentTarget?.querySelector("video.at-detail__cover--vid");
			t instanceof HTMLVideoElement && t.play().catch(() => {});
		}
		function S(e) {
			let t = e.currentTarget?.querySelector("video.at-detail__cover--vid");
			t instanceof HTMLVideoElement && (t.pause(), t.currentTime = 0);
		}
		Rn(() => n.value?.asset_id, () => {
			_();
		});
		let C = /* @__PURE__ */ B(!1);
		async function w() {
			let e = n.value?.asset_id;
			if (e != null) {
				C.value = !0;
				try {
					await Fs(e), t.showToast("Metadata refreshed"), await t.loadDetail();
				} catch (e) {
					t.showToast(e instanceof Error ? e.message : "Refresh failed");
				} finally {
					C.value = !1;
				}
			}
		}
		return (e, T) => (K(), q("div", {
			class: "at-detail",
			onClick: T[5] ||= Ao((e) => V(t).closeDetail(), ["self"])
		}, [J("div", {
			class: "at-detail__panel",
			onClick: T[4] ||= Ao(() => {}, ["stop"])
		}, [J("div", jl, [T[6] ||= J("h2", { class: "at-detail__h" }, "Details", -1), J("button", {
			type: "button",
			class: "at-detail__close",
			onClick: T[0] ||= (e) => V(t).closeDetail()
		}, "×")]), V(r) ? (K(), q("div", Ml, "Loading…")) : V(n) ? (K(), q("div", Nl, [
			a.value || s.value ? (K(), q("div", {
				key: 0,
				class: "at-detail__cover-wrap",
				onMouseenter: T[1] ||= (e) => s.value && x(e),
				onMouseleave: T[2] ||= (e) => s.value && S(e)
			}, [s.value && o.value ? (K(), q(G, { key: 0 }, [J("video", {
				class: "at-detail__cover at-detail__cover--vid",
				src: o.value,
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, Pl), a.value ? (K(), q("img", {
				key: 0,
				src: a.value,
				alt: "",
				class: "at-detail__cover at-detail__cover--freeze",
				loading: "lazy"
			}, null, 8, Fl)) : Z("", !0)], 64)) : a.value ? (K(), q("img", {
				key: 1,
				src: a.value,
				alt: "",
				class: "at-detail__cover",
				loading: "lazy"
			}, null, 8, Il)) : Z("", !0)], 32)) : Z("", !0),
			J("p", Ll, N(V(n).display_name || V(n).filename), 1),
			V(n).base_model ? (K(), q("p", Rl, "Base: " + N(V(n).base_model), 1)) : Z("", !0),
			V(n).default_strength != null && Number(V(n).default_strength) !== 1 ? (K(), q("p", zl, " Default strength: " + N(V(n).default_strength), 1)) : Z("", !0),
			J("div", Bl, [J("code", Vl, N(V(n).lora_syntax || "—"), 1)]),
			V(n).category || V(n).subcategory ? (K(), q("p", Hl, N([V(n).category, V(n).subcategory].filter(Boolean).join(" / ")), 1)) : Z("", !0),
			V(n).notes ? (K(), q("section", Ul, [T[7] ||= J("div", { class: "at-detail__sec-title" }, "Notes", -1), J("p", Wl, N(V(n).notes), 1)])) : Z("", !0),
			J("section", Gl, [J("div", Kl, [T[8] ||= J("span", { class: "at-detail__sec-title" }, "Triggers", -1), c.value.length ? (K(), q("button", {
				key: 0,
				type: "button",
				class: "at-detail__mini",
				onClick: T[3] ||= (e) => d("triggers", l.value)
			}, " Copy ")) : Z("", !0)]), c.value.length ? (K(), q("ul", ql, [(K(!0), q(G, null, kr(c.value, (e, t) => (K(), q("li", {
				key: `${t}-${e}`,
				class: "at-detail__tw-item"
			}, [J("code", null, N(e), 1)]))), 128))])) : (K(), q("p", Jl, "—"))]),
			(V(n).tags ?? []).length ? (K(), q("section", Yl, [T[9] ||= J("div", { class: "at-detail__sec-title" }, "Tags", -1), J("div", Xl, [(K(!0), q(G, null, kr(V(n).tags, (e) => (K(), q("span", {
				key: e,
				class: "at-detail__tag"
			}, N(e), 1))), 128))])])) : Z("", !0),
			V(n).source_creator_name ? (K(), q("p", Zl, " By " + N(V(n).source_creator_name), 1)) : Z("", !0),
			V(n).source_url ? (K(), q("a", {
				key: 7,
				href: V(n).source_url,
				target: "_blank",
				rel: "noopener noreferrer",
				class: "at-detail__link"
			}, "Source", 8, Ql)) : Z("", !0),
			J("div", $l, [J("button", {
				type: "button",
				class: "at-detail__mini",
				disabled: C.value,
				onClick: w
			}, N(C.value ? "Refreshing…" : "Refresh from Civitai"), 9, eu)]),
			V(n).usage_count || V(n).last_used_at ? (K(), q("p", tu, [X(" Uses: " + N(V(n).usage_count), 1), V(n).last_used_at ? (K(), q(G, { key: 0 }, [X(" · " + N(V(n).last_used_at.replace("T", " ").slice(0, 19)), 1)], 64)) : Z("", !0)])) : Z("", !0),
			V(n).description_html ? (K(), q("section", nu, [T[10] ||= J("div", { class: "at-detail__sec-title" }, "Description", -1), J("div", {
				class: "at-detail__html",
				innerHTML: V(n).description_html
			}, null, 8, ru)])) : Z("", !0),
			V(n).example_media.length ? (K(), q("section", iu, [T[11] ||= J("div", { class: "at-detail__sec-title" }, "Examples", -1), J("div", au, [(K(!0), q(G, null, kr(V(n).example_media, (e) => (K(), q("div", {
				key: e.media_id,
				class: "at-detail__ex-wrap",
				onMouseenter: (t) => (e.media_type || "").toLowerCase() === "video" && e.playback_url ? y(t) : void 0,
				onMouseleave: (t) => (e.media_type || "").toLowerCase() === "video" && e.playback_url ? b(t) : void 0
			}, [J("button", {
				type: "button",
				class: "at-detail__ex",
				onClick: (t) => v(e)
			}, [(e.media_type || "").toLowerCase() === "video" && e.playback_url ? (K(), q(G, { key: 0 }, [J("video", {
				class: "at-detail__ex-vid",
				src: js(e.playback_url, V(i)) || "",
				muted: "",
				loop: "",
				playsinline: "",
				preload: "metadata"
			}, null, 8, cu), e.thumbnail_url || e.poster_url ? (K(), q("img", {
				key: 0,
				src: js(e.thumbnail_url || e.poster_url || e.url, V(i)) || "",
				alt: "",
				class: "at-detail__ex-img at-detail__ex-img--freeze",
				loading: "lazy"
			}, null, 8, lu)) : Z("", !0)], 64)) : (e.media_type || "").toLowerCase() === "video" ? (K(), q("img", {
				key: 1,
				src: js(e.thumbnail_url || e.poster_url || e.url, V(i)) || "",
				alt: "",
				class: "at-detail__ex-img",
				loading: "lazy"
			}, null, 8, uu)) : e.thumbnail_url || e.url ? (K(), q("img", {
				key: 2,
				src: js(e.thumbnail_url || e.url, V(i)) || "",
				alt: "",
				class: "at-detail__ex-img",
				loading: "lazy"
			}, null, 8, du)) : Z("", !0)], 8, su)], 40, ou))), 128))])])) : Z("", !0),
			u.value ? (K(), q("section", fu, [T[12] ||= J("div", { class: "at-detail__sec-title" }, "Path", -1), J("p", pu, N(u.value), 1)])) : Z("", !0)
		])) : Z("", !0)]), Y(Al, {
			"image-url": f.value,
			"playback-url": p.value,
			"poster-url": m.value,
			"media-type": h.value,
			meta: g.value,
			onClose: _
		}, null, 8, [
			"image-url",
			"playback-url",
			"poster-url",
			"media-type",
			"meta"
		])]));
	}
}), [["__scopeId", "data-v-b31b29c9"]]), hu = { class: "at-app" }, gu = {
	key: 0,
	class: "at-main-column"
}, _u = { class: "at-empty at-empty--fill" }, vu = {
	key: 1,
	class: "at-main-column"
}, yu = { class: "at-chrome" }, bu = {
	key: 0,
	class: "at-empty at-empty--fill"
}, xu = 160, Su = /* @__PURE__ */ Cc(/* @__PURE__ */ ir({
	__name: "App",
	setup(e) {
		let t = Gs(), { connected: n, items: r, loading: i, loadingMore: a, viewMode: o, settingsOpen: s, selectedAssetId: c } = gs(t), l = /* @__PURE__ */ B(null);
		function u(e) {
			return e.scrollHeight - e.scrollTop - e.clientHeight <= xu;
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
		return Rn(() => l.value, (e, t) => {
			t && t.removeEventListener("scroll", p), e && (e.addEventListener("scroll", p, { passive: !0 }), requestAnimationFrame(() => d()));
		}, {
			flush: "post",
			immediate: !0
		}), Rn([
			r,
			i,
			a,
			n
		], () => {
			requestAnimationFrame(() => d());
		}, { flush: "post" }), yr(() => {
			t.bootstrap();
		}), Cr(() => {
			let e = l.value;
			e && e.removeEventListener("scroll", p);
		}), (e, i) => (K(), q("div", hu, [
			V(n) ? (K(), q("div", vu, [J("div", yu, [Y(Mc), Y(Rc)]), !V(t).loading && !V(r).length && !V(t).error ? (K(), q("div", bu, [i[6] ||= J("p", null, "No LoRAs in the index for this filter.", -1), J("button", {
				type: "button",
				class: "at-empty__btn",
				onClick: i[2] ||= (e) => V(t).resetFilters()
			}, " Reset filters ")])) : (K(), q("div", {
				key: 1,
				ref_key: "scrollRoot",
				ref: l,
				class: "at-scroll"
			}, [V(o) === "grid" ? (K(), Xi(ol, { key: 0 })) : (K(), Xi(cl, { key: 1 }))], 512))])) : (K(), q("div", gu, [
				Y(Mc),
				Y(Rc),
				J("div", _u, [
					J("p", null, [
						i[3] ||= X("Could not connect to AssetThingie at ", -1),
						J("code", null, N(V(t).baseUrlInput), 1),
						i[4] ||= X(".", -1)
					]),
					i[5] ||= J("p", { class: "at-empty__sub" }, "Start the app or open settings to change the URL.", -1),
					J("button", {
						type: "button",
						class: "at-empty__btn",
						onClick: i[0] ||= (e) => V(t).settingsOpen = !0
					}, " Settings "),
					J("button", {
						type: "button",
						class: "at-empty__btn",
						onClick: i[1] ||= (e) => V(t).bootstrap()
					}, "Retry")
				])
			])),
			V(s) ? (K(), Xi(El, { key: 2 })) : Z("", !0),
			V(c) == null ? Z("", !0) : (K(), Xi(mu, { key: 3 }))
		]));
	}
}), [["__scopeId", "data-v-598d831a"]]);
//#endregion
//#region src/main.ts
function Cu(e) {
	let t = ts(), n = Po(Su);
	return n.use(t), n.mount(e), n;
}
//#endregion
export { Cu as mount };
