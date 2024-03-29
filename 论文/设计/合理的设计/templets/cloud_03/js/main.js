(function (e) {
	e.fn.hoverIntent = function (t, n, r) {
		var i = {
			interval: 100,
			sensitivity: 7,
			timeout: 0
		};
		if (typeof t === "object") {
			i = e.extend(i, t)
		} else if (e.isFunction(n)) {
			i = e.extend(i, {
				over: t,
				out: n,
				selector: r
			})
		} else {
			i = e.extend(i, {
				over: t,
				out: t,
				selector: n
			})
		}
		var s, o, u, a;
		var f = function (e) {
			s = e.pageX;
			o = e.pageY
		};
		var l = function (t, n) {
			n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
			if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
				e(n).off("mousemove.hoverIntent", f);
				n.hoverIntent_s = 1;
				return i.over.apply(n, [t])
			} else {
				u = s;
				a = o;
				n.hoverIntent_t = setTimeout(function () {
					l(t, n)
				}, i.interval)
			}
		};
		var c = function (e, t) {
			t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
			t.hoverIntent_s = 0;
			return i.out.apply(t, [e])
		};
		var h = function (t) {
			var n = jQuery.extend({}, t);
			var r = this;
			if (r.hoverIntent_t) {
				r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
			}
			if (t.type == "mouseenter") {
				u = n.pageX;
				a = n.pageY;
				e(r).on("mousemove.hoverIntent", f);
				if (r.hoverIntent_s != 1) {
					r.hoverIntent_t = setTimeout(function () {
						l(n, r)
					}, i.interval)
				}
			} else {
				e(r).off("mousemove.hoverIntent", f);
				if (r.hoverIntent_s == 1) {
					r.hoverIntent_t = setTimeout(function () {
						c(n, r)
					}, i.timeout)
				}
			}
		};
		return this.on({
			"mouseenter.hoverIntent": h,
			"mouseleave.hoverIntent": h
		}, i.selector)
	}
})(jQuery);
//imagesLoaded
(function () {
	function e() {}

	function t(e, t) {
		for (var n = e.length; n--;)
			if (e[n].listener === t) return n;
		return -1
	}

	function n(e) {
		return function () {
			return this[e].apply(this, arguments)
		}
	}
	var i = e.prototype,
		r = this,
		o = r.EventEmitter;
	i.getListeners = function (e) {
		var t, n, i = this._getEvents();
		if ("object" == typeof e) {
			t = {};
			for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
		} else t = i[e] || (i[e] = []);
		return t
	}, i.flattenListeners = function (e) {
		var t, n = [];
		for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
		return n
	}, i.getListenersAsObject = function (e) {
		var t, n = this.getListeners(e);
		return n instanceof Array && (t = {}, t[e] = n), t || n
	}, i.addListener = function (e, n) {
		var i, r = this.getListenersAsObject(e),
			o = "object" == typeof n;
		for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
			listener: n,
			once: !1
		});
		return this
	}, i.on = n("addListener"), i.addOnceListener = function (e, t) {
		return this.addListener(e, {
			listener: t,
			once: !0
		})
	}, i.once = n("addOnceListener"), i.defineEvent = function (e) {
		return this.getListeners(e), this
	}, i.defineEvents = function (e) {
		for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
		return this
	}, i.removeListener = function (e, n) {
		var i, r, o = this.getListenersAsObject(e);
		for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
		return this
	}, i.off = n("removeListener"), i.addListeners = function (e, t) {
		return this.manipulateListeners(!1, e, t)
	}, i.removeListeners = function (e, t) {
		return this.manipulateListeners(!0, e, t)
	}, i.manipulateListeners = function (e, t, n) {
		var i, r, o = e ? this.removeListener : this.addListener,
			s = e ? this.removeListeners : this.addListeners;
		if ("object" != typeof t || t instanceof RegExp)
			for (i = n.length; i--;) o.call(this, t, n[i]);
		else
			for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
		return this
	}, i.removeEvent = function (e) {
		var t, n = typeof e,
			i = this._getEvents();
		if ("string" === n) delete i[e];
		else if ("object" === n)
			for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
		else delete this._events;
		return this
	}, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
		var n, i, r, o, s = this.getListenersAsObject(e);
		for (r in s)
			if (s.hasOwnProperty(r))
				for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
		return this
	}, i.trigger = n("emitEvent"), i.emit = function (e) {
		var t = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(e, t)
	}, i.setOnceReturnValue = function (e) {
		return this._onceReturnValue = e, this
	}, i._getOnceReturnValue = function () {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, i._getEvents = function () {
		return this._events || (this._events = {})
	}, e.noConflict = function () {
		return r.EventEmitter = o, e
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
		return e
	}) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
	function (e) {
		function t(t) {
			var n = e.event;
			return n.target = n.target || n.srcElement || t, n
		}
		var n = document.documentElement,
			i = function () {};
		n.addEventListener ? i = function (e, t, n) {
			e.addEventListener(t, n, !1)
		} : n.attachEvent && (i = function (e, n, i) {
			e[n + i] = i.handleEvent ? function () {
				var n = t(e);
				i.handleEvent.call(i, n)
			} : function () {
				var n = t(e);
				i.call(e, n)
			}, e.attachEvent("on" + n, e[n + i])
		});
		var r = function () {};
		n.removeEventListener ? r = function (e, t, n) {
			e.removeEventListener(t, n, !1)
		} : n.detachEvent && (r = function (e, t, n) {
			e.detachEvent("on" + t, e[t + n]);
			try {
				delete e[t + n]
			} catch (i) {
				e[t + n] = void 0
			}
		});
		var o = {
			bind: i,
			unbind: r
		};
		"function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
	}(this),
	function (e, t) {
		"function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
			return t(e, n, i)
		}) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
	}(window, function (e, t, n) {
		function i(e, t) {
			for (var n in t) e[n] = t[n];
			return e
		}

		function r(e) {
			return "[object Array]" === d.call(e)
		}

		function o(e) {
			var t = [];
			if (r(e)) t = e;
			else if ("number" == typeof e.length)
				for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
			else t.push(e);
			return t
		}

		function s(e, t, n) {
			if (!(this instanceof s)) return new s(e, t);
			"string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
			var r = this;
			setTimeout(function () {
				r.check()
			})
		}

		function f(e) {
			this.img = e
		}

		function c(e) {
			this.src = e, v[e] = this
		}
		var a = e.jQuery,
			u = e.console,
			h = u !== void 0,
			d = Object.prototype.toString;
		s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
			this.images = [];
			for (var e = 0, t = this.elements.length; t > e; e++) {
				var n = this.elements[e];
				"IMG" === n.nodeName && this.addImage(n);
				var i = n.nodeType;
				if (i && (1 === i || 9 === i || 11 === i))
					for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
						var f = r[o];
						this.addImage(f)
					}
			}
		}, s.prototype.addImage = function (e) {
			var t = new f(e);
			this.images.push(t)
		}, s.prototype.check = function () {
			function e(e, r) {
				return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
			}
			var t = this,
				n = 0,
				i = this.images.length;
			if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
			for (var r = 0; i > r; r++) {
				var o = this.images[r];
				o.on("confirm", e), o.check()
			}
		}, s.prototype.progress = function (e) {
			this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
			var t = this;
			setTimeout(function () {
				t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
			})
		}, s.prototype.complete = function () {
			var e = this.hasAnyBroken ? "fail" : "done";
			this.isComplete = !0;
			var t = this;
			setTimeout(function () {
				if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
					var n = t.hasAnyBroken ? "reject" : "resolve";
					t.jqDeferred[n](t)
				}
			})
		}, a && (a.fn.imagesLoaded = function (e, t) {
			var n = new s(this, e, t);
			return n.jqDeferred.promise(a(this))
		}), f.prototype = new t, f.prototype.check = function () {
			var e = v[this.img.src] || new c(this.img.src);
			if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
			if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
			var t = this;
			e.on("confirm", function (e, n) {
				return t.confirm(e.isLoaded, n), !0
			}), e.check()
		}, f.prototype.confirm = function (e, t) {
			this.isLoaded = e, this.emit("confirm", this, t)
		};
		var v = {};
		return c.prototype = new t, c.prototype.check = function () {
			if (!this.isChecked) {
				var e = new Image;
				n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
			}
		}, c.prototype.handleEvent = function (e) {
			var t = "on" + e.type;
			this[t] && this[t](e)
		}, c.prototype.onload = function (e) {
			this.confirm(!0, "onload"), this.unbindProxyEvents(e)
		}, c.prototype.onerror = function (e) {
			this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
		}, c.prototype.confirm = function (e, t) {
			this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
		}, c.prototype.unbindProxyEvents = function (e) {
			n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
		}, s
	});


var _$_7106 = ["\x68\x65\x69\x67\x68\x74", "\x6C\x65\x6E\x67\x74\x68", "\x6C\x69\x2E\x77\x5F\x70\x63\x2E\x6F\x6E", "\x2E\x77\x65\x62\x5F\x73\x68\x6F\x77\x20\x69\x66\x72\x61\x6D\x65", "\x6D\x61\x72\x67\x69\x6E\x4C\x65\x66\x74", "\x63\x73\x73", "\x2E\x6E\x65\x77\x73\x5F\x69\x74\x65\x6D", "\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70", "\x6D\x61\x72\x67\x69\x6E\x2D\x62\x6F\x74\x74\x6F\x6D", "\x6D\x61\x72\x67\x69\x6E\x52\x69\x67\x68\x74", "\x2E\x62\x6F\x78", "\x68\x74\x6D\x6C", "\x6E\x61\x76", "\x73\x74\x79\x6C\x65", "\x72\x65\x6D\x6F\x76\x65\x41\x74\x74\x72", "\x2A", "\x66\x69\x6E\x64", "\x61\x70\x70\x65\x6E\x64", "\x2E\x6D\x5F\x6E\x61\x76", "\x74\x65\x78\x74", "\x2E\x6D\x5F\x6E\x61\x76\x20\x6C\x69\x2E\x6F\x6E\x3E\x61", "\x2E\x6E\x61\x76\x5F\x69\x63\x6F\x6E\x20\x73\x70\x61\x6E", "\x73\x6C\x69\x64\x65\x54\x6F\x67\x67\x6C\x65", "\x63\x6C\x69\x63\x6B", "\x2E\x6E\x61\x76\x5F\x69\x63\x6F\x6E", "\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x49\x6D\x61\x67\x65", "\x66\x6F\x6F\x74\x65\x72", "\x61\x62\x63\x6D\x6F\x62\x61\x6E", "\x69\x6E\x64\x65\x78\x4F\x66", "\x2E\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x5F\x6C\x69\x73\x74", "\x68\x72\x65\x66", "\x61\x74\x74\x72", "\x61\x2E\x71\x71", "\x68\x65\x61\x64\x65\x72\x5F\x68\x6F\x6D\x65", "\x61\x64\x64\x43\x6C\x61\x73\x73", "\x68\x65\x61\x64\x65\x72", "\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x61\x64\x22\x3E\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x22\x69\x6D\x61\x67\x65\x73\x2F\x61\x64\x2E\x70\x6E\x67\x22\x3E\x3C\x70\x3E\u8F7B\u677E\u8BBE\u8BA1\u81EA\u52A8\u9002\u914D\u4E8E\u684C\u9762\u53CA\u79FB\u52A8\u7AEF\u7684\u54CD\u5E94\u5F0F\u7F51\u7AD9\x3C\x2F\x70\x3E\x3C\x70\x3E\u914D\u5957\u4FBF\u6377\u7684\x48\x54\x4D\x4C\x35\u7BA1\u7406\u540E\u53F0\uFF0C\u8F7B\u677E\u5B9E\u73B0\u6279\u91CF\u4E0A\u4F20\uFF0C\u62D6\u653E\u6392\u5E8F\u7B49\u529F\u80FD\x3C\x2F\x70\x3E\x3C\x70\x3E\u91C7\u7528\u6807\u51C6\u7684\x48\x54\x4D\x4C\x35\u53CA\x43\x53\x53\x33\u89C4\u8303\u4FBF\u4E8E\u7EF4\u62A4\x3C\x2F\x70\x3E\x3C\x2F\x64\x69\x76\x3E\x3C\x61\x20\x63\x6C\x61\x73\x73\x3D\x22\x61\x70\x70\x6C\x79\x22\x20\x68\x72\x65\x66\x3D\x22\x23\x22\x3E\u7BA1\u7406\u540E\u53F0\u64CD\u4F5C\u4F53\u9A8C\x3C\x2F\x61\x3E\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x67\x5F\x76\x69\x64\x65\x6F\x22\x3E\x3C\x2F\x64\x69\x76\x3E", "\x74\x61\x72\x67\x65\x74", "\x5F\x62\x6C\x61\x6E\x6B", "\x68\x74\x74\x70\x3A\x2F\x2F\x66\x72\x65\x65\x64\x65\x6D\x6F\x2E\x61\x62\x63\x6D\x6F\x62\x61\x6E\x2E\x63\x6F\x6D\x2F\x70\x61\x6E\x65\x6C\x2F\x6C\x6F\x67\x69\x6E", "\x61\x2E\x61\x70\x70\x6C\x79", "\x64\x61\x74\x61\x2D\x70\x61\x72\x61\x6C\x6C\x61\x78\x2D\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x69\x6E\x65\x72\x74\x69\x61", "\x30\x2E\x33", "\x2E\x62\x67\x5F\x76\x69\x64\x65\x6F", "\x2E\x6E\x61\x76\x5F\x61\x62\x6F\x75\x74", "\x68\x65\x61\x64\x65\x72\x5F\x61\x62\x6F\x75\x74", "\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x61\x62\x6F\x75\x74\x5F\x61\x64\x22\x3E\x3C\x2F\x64\x69\x76\x3E\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x67\x5F\x76\x69\x64\x65\x6F\x22\x20\x64\x61\x74\x61\x2D\x70\x61\x72\x61\x6C\x6C\x61\x78\x2D\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x69\x6E\x65\x72\x74\x69\x61\x3D\x22\x30\x2E\x33\x22\x3E\x3C\x2F\x64\x69\x76\x3E", "\x2E\x6E\x61\x76\x5F\x63\x6C\x69\x65\x6E\x74", "\x68\x65\x61\x64\x65\x72\x5F\x63\x6C\x69\x65\x6E\x74", "\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x61\x64\x22\x3E\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x22\x69\x6D\x61\x67\x65\x73\x2F\x61\x64\x2E\x70\x6E\x67\x22\x3E\x3C\x70\x3E\u7AED\u8BDA\u4E3A\u7528\u6237\u63D0\u4F9B\u4F18\u8D28\u7684\u7B54\u7591\u4E0E\u5E2E\u52A9\x3C\x2F\x70\x3E\x3C\x70\x3E\u591A\u5E74\u5F00\u53D1\u7ECF\u9A8C\x2C\u4FDD\u8BC1\u7528\u6237\u7684\u9700\u6C42\u5F97\u5230\u4E13\u4E1A\u7684\u89E3\u51B3\x3C\x2F\x70\x3E\x3C\x70\x3E\u4E0E\u65B0\u8001\u7528\u6237\u5EFA\u7ACB\u957F\u4E45\u7684\u5408\u4F5C\u5173\u7CFB\uFF0C\u4E0D\u505A\u4E00\u9524\u5B50\u4E70\u5356\x3C\x2F\x70\x3E\x3C\x2F\x64\x69\x76\x3E\x3C\x61\x20\x63\x6C\x61\x73\x73\x3D\x22\x61\x70\x70\x6C\x79\x22\x20\x68\x72\x65\x66\x3D\x22\x23\x22\x3E\u7BA1\u7406\u540E\u53F0\u64CD\u4F5C\u4F53\u9A8C\x3C\x2F\x61\x3E\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x67\x5F\x76\x69\x64\x65\x6F\x22\x3E\x3C\x2F\x64\x69\x76\x3E", "\x77\x69\x64\x74\x68", "\x30", "\x61\x6E\x69\x6D\x61\x74\x65", "\x73\x70\x61\x6E", "\x2D\x32\x30\x70\x78", "\x64\x65\x6C\x61\x79", "\x64\x69\x76\x3E\x69\x6D\x67", "\x2D\x38\x38\x70\x78", "\x68\x6F\x76\x65\x72", "\x2E\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x5F\x6C\x69\x73\x74\x20\x2E\x62\x6F\x78", "\x4D\x53\x49\x45\x20\x38\x2E\x30", "\x75\x73\x65\x72\x41\x67\x65\x6E\x74", "\x63\x6F\x76\x65\x72", "\x2E\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x5F\x6C\x69\x73\x74\x20\x2E\x62\x6F\x78\x20\x61\x2C\x2E\x6F\x74\x68\x65\x72\x5F\x62\x6F\x78\x20\x61", "\x2E\x66\x69\x6C\x74\x65\x72", "\x74\x6F\x70", "\x6F\x66\x66\x73\x65\x74", "\x73\x63\x72\x6F\x6C\x6C\x54\x6F\x70", "\x66\x69\x6C\x74\x65\x72\x5F\x66\x69\x78", "\x6C\x69\x73\x74\x5F\x66\x69\x78", "\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73", "\x73\x63\x72\x6F\x6C\x6C", "\x2E\x63\x61\x73\x65\x5F\x6C\x69\x73\x74", "\x62\x6C\x61\x6E\x6B", "\x2E\x63\x61\x73\x65\x5F\x62\x6F\x78\x20\x61", "\x69\x6D\x67\x2E\x6E\x6F\x5F\x69\x6D\x67", "\x74\x68\x75\x6D\x62\x5F\x6E\x6F", "\x2E\x74\x68\x75\x6D\x62", "\x65\x61\x63\x68", "\x23\x6E\x65\x77\x73\x5F\x6C\x69\x73\x74", "\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72", "\x70\x72\x6F\x67\x72\x65\x73\x73", "\x69\x73\x4C\x6F\x61\x64\x65\x64", "\x6C\x6F\x61\x64\x65\x64", "\x62\x72\x6F\x6B\x65\x6E", "\x66\x61\x64\x65\x49\x6E", "\x63\x6C\x6F\x73\x65\x73\x74", "\x69\x6D\x67", "\x6C\x61\x79\x6F\x75\x74", "\x6F\x6E", "\x2E\x63\x74\x72\x6C\x5F\x62\x74\x6E\x20\x6C\x69", "\x2E\x77\x5F\x70\x61\x64\x2C\x2E\x77\x5F\x70\x63\x2C\x2E\x77\x5F\x70\x68\x6F\x6E\x65", "\x31\x30\x30\x25", "\x2E\x77\x5F\x70\x63", "\x31\x30\x32\x34\x70\x78", "\x36\x34\x30\x70\x78", "\x33\x30\x70\x78", "\x2E\x77\x5F\x70\x61\x64", "\x33\x32\x30\x70\x78", "\x35\x34\x30\x70\x78", "\x2E\x77\x5F\x70\x68\x6F\x6E\x65", "\x66\x61\x64\x65\x54\x6F\x67\x67\x6C\x65", "\x23\x6F\x75\x74\x70\x75\x74", "\x2E\x71\x72\x5F\x63\x6F\x64\x65\x2C\x23\x6F\x75\x74\x70\x75\x74\x20\x70", "\u79FB\u9664\u8BE5\u680F", "\x70\x72\x65\x70\x65\x6E\x64", "\x2E\x63\x6C\x6F\x73\x65\x20\x61", "\x63\x73\x73\x54\x65\x78\x74", "\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x61\x62\x73\x6F\x6C\x75\x74\x65\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74", "\x2E\x62\x6F\x78\x2C\x2E\x64\x65\x74\x61\x69\x6C\x5F\x69\x6D\x67\x2C\x6E\x61\x76\x20\x6C\x69", "\x64\x69\x73\x70\x6C\x61\x79\x3A\x74\x61\x62\x6C\x65\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74", "\x62\x6F\x64\x79", "\x72\x65\x61\x64\x79", "\x72\x65\x73\x69\x7A\x65"];

function base() {
	var l = $(window)[_$_7106[0]]();
	if ($(_$_7106[2])[_$_7106[1]] > 0) {
		$(_$_7106[3])[_$_7106[0]](l - 36)
	};
	var k = $(_$_7106[6])[_$_7106[5]](_$_7106[4]);
	$(_$_7106[6])[_$_7106[5]](_$_7106[7], k);
	$(_$_7106[6])[_$_7106[5]](_$_7106[8], k);
	var j = $(_$_7106[10])[_$_7106[5]](_$_7106[9]);
	$(_$_7106[10])[_$_7106[5]](_$_7106[8], j);
}

function my_nav() {
	var m = $(_$_7106[12])[_$_7106[11]]();
	$(_$_7106[18])[_$_7106[17]](m)[_$_7106[16]](_$_7106[15])[_$_7106[14]](_$_7106[13]);
	var n = $(_$_7106[20])[_$_7106[19]]();
	$(_$_7106[21])[_$_7106[19]](n);
	$(_$_7106[24])[_$_7106[23]](function () {
		$(_$_7106[18])[_$_7106[22]](200)
	});
}
$(document)[_$_7106[112]](function () {
	var e = $(_$_7106[26])[_$_7106[5]](_$_7106[25]);
	if (e[_$_7106[28]](_$_7106[27]) >= 0) {
		if ($(_$_7106[29])[_$_7106[1]] > 0) {
			var d = $(_$_7106[32])[_$_7106[31]](_$_7106[30]);
			$(_$_7106[35])[_$_7106[34]](_$_7106[33]);
			$(_$_7106[35])[_$_7106[17]](_$_7106[36]);
			$(_$_7106[40])[_$_7106[31]](_$_7106[30], _$_7106[39])[_$_7106[31]](_$_7106[37], _$_7106[38]);
			$(_$_7106[43])[_$_7106[31]](_$_7106[41], _$_7106[42]);
		};
		if ($(_$_7106[44])[_$_7106[1]] > 0) {
			$(_$_7106[35])[_$_7106[34]](_$_7106[45]);
			$(_$_7106[35])[_$_7106[17]](_$_7106[46]);
		};
		if ($(_$_7106[47])[_$_7106[1]] > 0) {
			$(_$_7106[35])[_$_7106[34]](_$_7106[48]);
			$(_$_7106[35])[_$_7106[17]](_$_7106[49]);
			$(_$_7106[40])[_$_7106[31]](_$_7106[30], _$_7106[39])[_$_7106[31]](_$_7106[37], _$_7106[38]);
		};
		$(_$_7106[59])[_$_7106[58]](function () {
			if ($(window)[_$_7106[50]]() > 959) {
				$(_$_7106[53], this)[_$_7106[52]]({
					bottom: _$_7106[51]
				}, 400);
				$(_$_7106[56], this)[_$_7106[55]](100)[_$_7106[52]]({
					top: _$_7106[54]
				}, 400);
			}
		}, function () {
			$(_$_7106[53], this)[_$_7106[52]]({
				bottom: _$_7106[57]
			}, 200);
			$(_$_7106[56], this)[_$_7106[52]]({
				top: _$_7106[51]
			}, 300);
		});
		if (navigator[_$_7106[61]][_$_7106[28]](_$_7106[60]) > 0) {
			$(_$_7106[63])[_$_7106[62]]()
		};
		if ($(_$_7106[64])[_$_7106[1]] > 0) {
			var f = $(_$_7106[64])[_$_7106[66]]()[_$_7106[65]];
			$(window)[_$_7106[71]](function () {
				if ($(window)[_$_7106[50]]() <= 959) {
					return false
				};
				if ($(window)[_$_7106[67]]() > f) {
					$(_$_7106[64])[_$_7106[34]](_$_7106[68]);
					$(_$_7106[29])[_$_7106[34]](_$_7106[69]);
				} else {
					$(_$_7106[64])[_$_7106[70]](_$_7106[68]);
					$(_$_7106[29])[_$_7106[70]](_$_7106[69]);
				};
			});
		};
		if ($(_$_7106[72])[_$_7106[1]] > 0) {
			$(_$_7106[74])[_$_7106[31]](_$_7106[37], _$_7106[73])
		};
		$(_$_7106[6])[_$_7106[78]](function () {
			if ($(_$_7106[75], this)[_$_7106[1]] > 0) {
				$(_$_7106[77], this)[_$_7106[34]](_$_7106[76])
			}
		});
		if ($(_$_7106[79])[_$_7106[1]] > 0) {
			var a = document[_$_7106[80]](_$_7106[79]);
			var c = new Masonry(a);
			var b = imagesLoaded($(_$_7106[6]));
			b[_$_7106[89]](_$_7106[81], function (h, g) {
				var i = g[_$_7106[82]] ? _$_7106[83] : _$_7106[84];
				$(g[_$_7106[87]])[_$_7106[86]](_$_7106[6])[_$_7106[85]](100);
				c[_$_7106[88]]();
			});
		};
		my_nav();
		base();
		$(_$_7106[91])[_$_7106[23]](function () {
			$(_$_7106[90])[_$_7106[78]](function () {
				$(this)[_$_7106[70]](_$_7106[89])
			});
			$(this)[_$_7106[34]](_$_7106[89]);
		});
		$(_$_7106[93])[_$_7106[23]](function () {
			$(_$_7106[3])[_$_7106[5]]({
				"\x77\x69\x64\x74\x68": _$_7106[92],
				"\x68\x65\x69\x67\x68\x74": $(window)[_$_7106[0]]() - 36,
				"\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70": _$_7106[51]
			})
		});
		$(_$_7106[97])[_$_7106[23]](function () {
			$(_$_7106[3])[_$_7106[5]]({
				"\x77\x69\x64\x74\x68": _$_7106[94],
				"\x68\x65\x69\x67\x68\x74": _$_7106[95],
				"\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70": _$_7106[96]
			})
		});
		$(_$_7106[100])[_$_7106[23]](function () {
			$(_$_7106[3])[_$_7106[5]]({
				"\x77\x69\x64\x74\x68": _$_7106[98],
				"\x68\x65\x69\x67\x68\x74": _$_7106[99],
				"\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70": _$_7106[96]
			})
		});
		$(_$_7106[103])[_$_7106[23]](function () {
			$(_$_7106[102])[_$_7106[101]](300)
		});
		$(_$_7106[106])[_$_7106[105]](_$_7106[104]);
	} else {
		$(_$_7106[109])[_$_7106[5]](_$_7106[107], _$_7106[108]);
		$(_$_7106[111])[_$_7106[5]](_$_7106[107], _$_7106[110]);
	};
});
$(window)[_$_7106[113]](function () {
	base()
});


$(document).ready(function () {
	$('a.taobao,.contact ul li:nth-child(2) a').attr('href', 'http://www.taobao.com/webww/ww.php?ver=3&touid=%E9%BA%A6%E7%94%B0%E6%98%A0%E5%83%8F%E9%A6%86&siteid=cntaobao&status=1&charset=utf-8').attr('target', 'blank');

	function other_out() {
		$('.other_site').fadeOut(300);
	};

	function other_in() {
		$('.other_site').fadeIn(300);
	};

	$('#preview_group').hoverIntent({
		sensitivity: 3, //滑鼠滑動的敏感度,最少要設定為1
		interval: 50, //滑鼠滑過後要延遲的秒數
		over: other_in, //滑鼠滑過要執行的函式
		timeout: 20, //滑鼠滑出前要延遲的秒數
		out: other_out //滑鼠滑出要執行的函式
	});
	//demo
});