// Avoid `console` errors in browsers that lack a console.
(function() {
		var method;
		var noop = function () {};
		var methods = [
				'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
				'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
				'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
				'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
				method = methods[length];

				// Only stub undefined methods.
				if (!console[method]) {
						console[method] = noop;
				}
		}

	console.info("exec polyfill");
	// Place any jQuery/helper plugins in here.
	//fix function bind
	if (!Function.prototype.bind) {
			Function.prototype.bind = function() {
				var fn = this,
					args = [].slice.call( arguments ),
					object = args.shift();

					return function() {
						return fn.apply( object, args.concat( [].slice.call(arguments) ) );
					};
			};
	}

	//fix indexOf
	if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
					"use strict";
					if (this == null) {
							throw new TypeError();
					}
					var t = Object(this);
					var len = t.length >>> 0;
					if (len === 0) {
							return -1;
					}
					var n = 0;
					if (arguments.length > 1) {
							n = Number(arguments[1]);
							if (n != n) { // shortcut for verifying if it's NaN
									n = 0;
							} else if (n != 0 && n != Infinity && n != -Infinity) {
									n = (n > 0 || -1) * Math.floor(Math.abs(n));
							}
					}
					if (n >= len) {
							return -1;
					}
					var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
					for (; k < len; k++) {
							if (k in t && t[k] === searchElement) {
									return k;
							}
					}
					return -1;
			}
	}

	//fix forEach
	if (!Array.prototype.forEach)
	{
		Array.prototype.forEach = function(fun /*, thisArg */)
		{
			"use strict";

			if (this === void 0 || this === null)
				throw new TypeError();

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== "function")
				throw new TypeError();

			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++)
			{
				if (i in t)
					fun.call(thisArg, t[i], i, t);
			}
		};
	}

	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun/*, thisArg*/) {
			'use strict';

			if (this === void 0 || this === null) {
				throw new TypeError();
			}

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function') {
				throw new TypeError();
			}

			var res = [];
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t) {
					var val = t[i];

					// NOTE: Technically this should Object.defineProperty at
					//			 the next index, as push can be affected by
					//			 properties on Object.prototype and Array.prototype.
					//			 But that method's new, and collisions should be
					//			 rare, so use the more-compatible alternative.
					if (fun.call(thisArg, val, i, t)) {
						res.push(val);
					}
				}
			}

			return res;
		};
	}

	// Production steps of ECMA-262, Edition 5, 15.4.4.21
	// Reference: http://es5.github.io/#x15.4.4.21
	if (!Array.prototype.reduce) {
		Array.prototype.reduce = function(callback /*, initialValue*/) {
			'use strict';
			if (this == null) {
				throw new TypeError('Array.prototype.reduce called on null or undefined');
			}
			if (typeof callback !== 'function') {
				throw new TypeError(callback + ' is not a function');
			}
			var t = Object(this), len = t.length >>> 0, k = 0, value;
			if (arguments.length == 2) {
				value = arguments[1];
			} else {
				while (k < len && !(k in t)) {
					k++;
				}
				if (k >= len) {
					throw new TypeError('Reduce of empty array with no initial value');
				}
				value = t[k++];
			}
			for (; k < len; k++) {
				if (k in t) {
					value = callback(value, t[k], k, t);
				}
			}
			return value;
		};
	}

	//fix object.create
	if (typeof Object.create != 'function') {
		(function () {
				var F = function () {};
				Object.create = function (o) {
						if (arguments.length > 1) { throw Error('Second argument not supported');}
						if (o === null) { throw Error('Cannot set a null [[Prototype]]');}
						if (typeof o != 'object') { throw TypeError('Argument must be an object');}
						F.prototype = o;
						return new F();
				};
		})();
	}

	//object assign
	if (typeof Object.assign != 'function') {
		Object.assign = function(target) {
			'use strict';
			if (target == null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}

			target = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var source = arguments[index];
				if (source != null) {
					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}
			}
			return target;
		};
	}

	//Array.find
	if (!Array.prototype.find) {
	  Array.prototype.find = function(predicate) {
	    'use strict';
	    if (this == null) {
	      throw new TypeError('Array.prototype.find called on null or undefined');
	    }
	    if (typeof predicate !== 'function') {
	      throw new TypeError('predicate must be a function');
	    }
	    var list = Object(this);
	    var length = list.length >>> 0;
	    var thisArg = arguments[1];
	    var value;

	    for (var i = 0; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) {
	        return value;
	      }
	    }
	    return undefined;
	  };
	}

	//animationframe
	// shim layer with setTimeout fallback
	window.requestAnimationFrame = (function(){
		return	window.requestAnimationFrame			 ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame		||
						function( callback ){
							window.setTimeout(callback, 1000 / 60);
						};
	})();

	//Promise polyfill
	//https://raw.githubusercontent.com/taylorhakes/promise-polyfill/master/promise.min.js
	!function(e){function t(){}function n(e,t){return function(){e.apply(t,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function r(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void a(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?i:f)(t.promise,e._value);var o;try{o=n(e._value)}catch(r){return void f(t.promise,r)}i(t.promise,o)}))}function i(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var r=t.then;if(t instanceof o)return e._state=3,e._value=t,void u(e);if("function"==typeof r)return void s(n(r,t),e)}e._state=1,e._value=t,u(e)}catch(i){f(e,i)}}function f(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&a(function(){e._handled||d(e._value)},1);for(var t=0,n=e._deferreds.length;n>t;t++)r(e,e._deferreds[t]);e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function s(e,t){var n=!1;try{e(function(e){n||(n=!0,i(t,e))},function(e){n||(n=!0,f(t,e))})}catch(o){if(n)return;n=!0,f(t,o)}}var l=setTimeout,a="function"==typeof setImmediate&&setImmediate||function(e){l(e,1)},d=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,n){var i=new o(t);return r(this,new c(e,n,i)),i},o.all=function(e){var t=Array.prototype.slice.call(e);return new o(function(e,n){function o(i,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(e){o(i,e)},n)}t[i]=f,0===--r&&e(t)}catch(c){n(c)}}if(0===t.length)return e([]);for(var r=t.length,i=0;i<t.length;i++)o(i,t[i])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(t){t(e)})},o.reject=function(e){return new o(function(t,n){n(e)})},o.race=function(e){return new o(function(t,n){for(var o=0,r=e.length;r>o;o++)e[o].then(t,n)})},o._setImmediateFn=function(e){a=e},o._setUnhandledRejectionFn=function(e){d=e},e.Promise||(e.Promise=o)}(window);
}());
