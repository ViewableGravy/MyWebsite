(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})(window, document, 'Hammer');


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _components_gravylang_gravylang_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/gravylang/gravylang.component */ "./src/app/components/gravylang/gravylang.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_media_server_server_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/media-server/server.component */ "./src/app/components/media-server/server.component.ts");
/* harmony import */ var _components_skill_tree_skill_tree_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/skill-tree/skill-tree.component */ "./src/app/components/skill-tree/skill-tree.component.ts");








const routes = [{ path: "programming-language", component: _components_gravylang_gravylang_component__WEBPACK_IMPORTED_MODULE_2__["GravylangComponent"] },
    { path: "timeline", component: _components_skill_tree_skill_tree_component__WEBPACK_IMPORTED_MODULE_5__["SkillTreeComponent"] },
    { path: "media-server", component: _components_media_server_server_component__WEBPACK_IMPORTED_MODULE_4__["ServerHomeComponent"] },
    { path: "**", component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] }];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
    constructor() {
        this.title = 'appname';
        this.editorOptions = { theme: 'vs-dark', language: 'javascript' };
        this.code = 'function x() {\nconsole.log("Hello world!");\n}';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: MyHammerConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyHammerConfig", function() { return MyHammerConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-monaco-editor */ "./node_modules/ngx-monaco-editor/__ivy_ngcc__/fesm2015/ngx-monaco-editor.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_gravylang_gravylang_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/gravylang/gravylang.component */ "./src/app/components/gravylang/gravylang.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_skill_tree_skill_tree_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/skill-tree/skill-tree.component */ "./src/app/components/skill-tree/skill-tree.component.ts");
/* harmony import */ var _components_media_server_server_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/media-server/server.component */ "./src/app/components/media-server/server.component.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_skill_tree_list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/skill-tree/list-item/skill-list.component */ "./src/app/components/skill-tree/list-item/skill-list.component.ts");















class MyHammerConfig extends _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HammerGestureConfig"] {
    constructor() {
        super(...arguments);
        this.overrides = {
            swipe: { direction: hammerjs__WEBPACK_IMPORTED_MODULE_10__["DIRECTION_ALL"] },
        };
    }
}
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        {
            provide: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HAMMER_GESTURE_CONFIG"],
            useClass: MyHammerConfig,
        },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__["MonacoEditorModule"].forRoot(),
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HammerModule"],
            _components_skill_tree_list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_11__["SkillListModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _components_gravylang_gravylang_component__WEBPACK_IMPORTED_MODULE_6__["GravylangComponent"],
        _components_home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
        _components_skill_tree_skill_tree_component__WEBPACK_IMPORTED_MODULE_8__["SkillTreeComponent"],
        _components_media_server_server_component__WEBPACK_IMPORTED_MODULE_9__["ServerHomeComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__["MonacoEditorModule"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HammerModule"],
        _components_skill_tree_list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_11__["SkillListModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _components_gravylang_gravylang_component__WEBPACK_IMPORTED_MODULE_6__["GravylangComponent"],
                    _components_home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                    _components_skill_tree_skill_tree_component__WEBPACK_IMPORTED_MODULE_8__["SkillTreeComponent"],
                    _components_media_server_server_component__WEBPACK_IMPORTED_MODULE_9__["ServerHomeComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__["MonacoEditorModule"].forRoot(),
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HammerModule"],
                    _components_skill_tree_list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_11__["SkillListModule"]
                ],
                providers: [
                    {
                        provide: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["HAMMER_GESTURE_CONFIG"],
                        useClass: MyHammerConfig,
                    },
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/gravylang/gravylang.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/gravylang/gravylang.component.ts ***!
  \*************************************************************/
/*! exports provided: GravylangComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GravylangComponent", function() { return GravylangComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-monaco-editor */ "./node_modules/ngx-monaco-editor/__ivy_ngcc__/fesm2015/ngx-monaco-editor.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





class GravylangComponent {
    constructor() {
        this.editorOptions = { theme: 'vs-dark', language: 'javascript' };
        this.code = 'function x() {\nconsole.log("Hello world!");\n}';
    }
    ngOnInit() {
    }
}
GravylangComponent.ɵfac = function GravylangComponent_Factory(t) { return new (t || GravylangComponent)(); };
GravylangComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GravylangComponent, selectors: [["app-gravylang"]], decls: 9, vars: 3, consts: [[1, "background"], [1, "viewContainer"], [1, "thumbnail"], [1, "editorContainer"], [1, "editor", 3, "options", "ngModel", "ngModelChange"], [1, "thumbnailContainer", "basic-flex", 3, "routerLink"], ["src", "assets/MadeInAbyss.jpg", 1, "thumbnail", "thumb3"]], template: function GravylangComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ngx-monaco-editor", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GravylangComponent_Template_ngx_monaco_editor_ngModelChange_4_listener($event) { return ctx.code = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.editorOptions)("ngModel", ctx.code);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/home");
    } }, directives: [ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_1__["EditorComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"]], styles: [".background[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-size: cover;\n  overflow: hidden;\n  background-image: url('RandomLandscape1.jpg');\n}\n\n.editorContainer[_ngcontent-%COMP%] {\n  border: 2px solid rgba(60, 6, 255, 0.918);\n  position: relative;\n  height: 100vh;\n  overflow: hidden;\n}\n\n.editor[_ngcontent-%COMP%] {\n  width: 60vw;\n  height: 102vh;\n  padding: 0;\n  margin: 0;\n  opacity: 80%;\n}\n\n.basic-flex[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.viewContainer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: center;\n  justify-content: space-around;\n  align-items: center;\n  width: 100vw;\n  height: 100vh;\n  border: 2px solid rgba(212, 11, 11, 0.918);\n}\n\n.thumbnailContainer[_ngcontent-%COMP%] {\n  transition: height 0.2s;\n  overflow: hidden;\n  border: 2px solid rgba(255, 255, 255, 0.26);\n  position: relative;\n  outline: none;\n  height: 300px;\n  margin: 1px;\n}\n\n.thumbnailContainer[_ngcontent-%COMP%]:hover {\n  transition: all 0.2s;\n  outline: none;\n  height: 400px;\n  border: 3px solid black;\n  margin: 0;\n}\n\n.thumbnailContainer[_ngcontent-%COMP%]:hover    > h1[_ngcontent-%COMP%] {\n  transition: font-size 0.2s;\n  font-size: 40px;\n}\n\n.thumbnail[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 400px;\n  object-fit: cover;\n  pointer-events: none;\n}\n\nh1[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  color: white;\n  transition: font-size 0.2s;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ncmF2eWxhbmcvZ3JhdnlsYW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLDZDQUFBO0FBQ0Y7O0FBQ0E7RUFDRSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBRUY7O0FBQUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtBQUdGOztBQURBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsNkJBQUE7QUFJRjs7QUFEQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLDZCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDBDQUFBO0FBSUY7O0FBREE7RUFDRSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsMkNBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtBQUlGOztBQURBO0VBQ0Usb0JBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtBQUlGOztBQURBO0VBQ0UsMEJBQUE7RUFDQSxlQUFBO0FBSUY7O0FBREE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUFJRjs7QUFEQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSwyQkFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0NBQUE7QUFJRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZ3JhdnlsYW5nL2dyYXZ5bGFuZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iYWNrZ3JvdW5kIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTAwJTsgXG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvTGFuZHNjYXBlL1JhbmRvbUxhbmRzY2FwZTEuanBnXCIpO1xufVxuLmVkaXRvckNvbnRhaW5lciB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoNjAsIDYsIDI1NSwgMC45MTgpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwdmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uZWRpdG9yIHtcbiAgd2lkdGg6IDYwdnc7XG4gIGhlaWdodDogMTAydmg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgb3BhY2l0eTogODAlO1xufVxuLmJhc2ljLWZsZXgge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyOyBcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbi52aWV3Q29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMjEyLCAxMSwgMTEsIDAuOTE4KTtcbn1cblxuLnRodW1ibmFpbENvbnRhaW5lciB7XG4gIHRyYW5zaXRpb246IGhlaWdodCAwLjJzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjYpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGhlaWdodDogMzAwcHg7XG4gIG1hcmdpbjogMXB4O1xufVxuXG4udGh1bWJuYWlsQ29udGFpbmVyOmhvdmVyIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGhlaWdodDogNDAwcHg7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHJnYigwLCAwLCAwKTtcbiAgbWFyZ2luOiAwO1xufVxuXG4udGh1bWJuYWlsQ29udGFpbmVyOmhvdmVyID4gaDEge1xuICB0cmFuc2l0aW9uOiBmb250LXNpemUgMC4ycztcbiAgZm9udC1zaXplOiA0MHB4O1xufVxuXG4udGh1bWJuYWlsIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6NDAwcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuaDEge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdHJhbnNpdGlvbjogZm9udC1zaXplIDAuMnM7XG4gIC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDFweDtcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogYmxhY2s7XG59XG5cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GravylangComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-gravylang',
                templateUrl: './gravylang.component.html',
                styleUrls: ['./gravylang.component.scss'],
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
    onSwipe(event) {
        if (Math.abs(event.deltaX) > 40) {
            if (event.deltaX < 0) {
                this.RotateLeft();
            }
            else {
                this.RotateRight();
            }
        }
    }
    IsNotNullOrUndefined(element) {
        return typeof (element) != 'undefined' && element != null;
    }
    RotateRight() {
        let topLeft = document.getElementsByClassName("top-left")[0];
        if (this.IsNotNullOrUndefined(topLeft)) {
            let initialTopRight = document.getElementsByClassName("top-right")[0];
            if (this.IsNotNullOrUndefined(initialTopRight)) {
                initialTopRight.classList.remove('top-right');
            }
            let initialMiddle = document.getElementsByClassName('middle')[0];
            initialMiddle.classList.add('right');
            initialMiddle.classList.add('top-right');
            initialMiddle.classList.remove('middle');
            topLeft.classList.add("middle");
            topLeft.classList.remove("left");
            topLeft.classList.remove("top-left");
            let nextTop = document.getElementsByClassName("left");
            if (this.IsNotNullOrUndefined(nextTop[0])) {
                nextTop[0].classList.add("top-left");
            }
            //update bullets
            let bullets = document.getElementsByClassName("bullet");
            for (let i = 0; i < bullets.length; i++) {
                if (bullets[i].classList.contains("highlighted")) {
                    bullets[i - 1].classList.add("highlighted");
                    bullets[i].classList.remove("highlighted");
                    break;
                }
            }
        }
        else {
            console.log("Cannot rotate further right");
            return;
        }
    }
    RotateLeft() {
        let topRight = document.getElementsByClassName("top-right")[0];
        if (this.IsNotNullOrUndefined(topRight)) {
            let initialTopLeft = document.getElementsByClassName("top-left")[0];
            if (this.IsNotNullOrUndefined(initialTopLeft)) {
                initialTopLeft.classList.remove('top-left');
            }
            let initialMiddle = document.getElementsByClassName("middle")[0];
            initialMiddle.classList.add('left');
            initialMiddle.classList.add('top-left');
            initialMiddle.classList.remove('middle');
            topRight.classList.add("middle");
            topRight.classList.remove("right");
            topRight.classList.remove("top-right");
            let nextTop = document.getElementsByClassName("right");
            if (this.IsNotNullOrUndefined(nextTop[0])) {
                nextTop[0].classList.add("top-right");
            }
            //update bullets
            let bullets = document.getElementsByClassName("bullet");
            for (let i = 0; i < bullets.length; i++) {
                if (bullets[i].classList.contains("highlighted")) {
                    bullets[i + 1].classList.add("highlighted");
                    bullets[i].classList.remove("highlighted");
                    break;
                }
            }
        }
        else {
            console.log("Cannot rotate further left");
            return;
        }
    }
    debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    }
    ;
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 19, vars: 3, consts: [[1, "outer", "desktop-basic-flex", 3, "swipe"], [1, "inner", "desktop-basic-flex"], ["id", "listContainer"], ["id", "thumbnail_Container_1", 1, "thumbnailContainer", "left", "top-left", 3, "routerLink"], ["id", "thumbnail_1", "src", "assets/home/WeatheringWithYouVertical_720.webp", "alt", "server todo", 1, "thumbnail"], ["id", "thumbnail_Container_2", 1, "thumbnailContainer", "middle", 3, "routerLink"], ["id", "thumbnail_2", "src", "assets/home/YourName_720.webp", "alt", "skill-tree", 1, "thumbnail"], ["id", "thumbnail_Container_3", 1, "thumbnailContainer", "right", "top-right", 3, "routerLink"], ["id", "thumbnail_3", "src", "assets/home/SpiceAndWolf_444.webp", "alt", "gravylang", 1, "thumbnail"], ["id", "bulletContainer"], [1, "bullet"], [1, "bullet", "highlighted"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("swipe", function HomeComponent_Template_div_swipe_0_listener($event) { return ctx.onSwipe($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ol", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Media Server");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Timeline");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Personal Programming Language");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ol", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "li", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/media-server");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/timeline");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/programming-language");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: ["@media only screen and (min-width: 481px) {\n  .inner[_ngcontent-%COMP%] {\n    width: 1200px;\n    height: 700px;\n  }\n\n  .thumbnailContainer[_ngcontent-%COMP%] {\n    width: 300px;\n    height: 500px;\n    text-align: center;\n  }\n\n  .thumbnailContainer[_ngcontent-%COMP%]:hover {\n    height: 650px;\n    transition: height 0.2s;\n  }\n\n  .thumbnailContainer[_ngcontent-%COMP%]:hover    > h1[_ngcontent-%COMP%] {\n    transition: font-size 0.2s;\n    font-size: 40px;\n  }\n\n  h1[_ngcontent-%COMP%] {\n    position: absolute;\n    bottom: 0;\n    left: 50%;\n    transform: translateX(-50%);\n    color: white;\n    transition: font-size 0.2s;\n    -webkit-text-stroke-width: 1px;\n    -webkit-text-stroke-color: black;\n    width: 90%;\n  }\n\n  .thumbnailContainer[_ngcontent-%COMP%] {\n    margin-left: 25px;\n    margin-right: 25px;\n    transition: height 0.2s;\n    overflow: hidden;\n    border: 2px solid rgba(255, 255, 255, 0.26);\n    position: relative;\n    outline: none;\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n  }\n\n  .desktop-basic-flex[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n  }\n\n  .outer[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    background: url('RandomLandscape1.jpg');\n    background-size: cover;\n    overflow: hidden;\n  }\n\n  .thumbnail[_ngcontent-%COMP%] {\n    object-fit: cover;\n    pointer-events: none;\n    width: 300px;\n    height: 650px;\n  }\n\n  #thumbnail_container_1[_ngcontent-%COMP%], #thumbnail_container_2[_ngcontent-%COMP%] {\n    filter: grayscale(80%);\n  }\n\n  #listContainer[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n    margin-top: 0;\n    margin-bottom: 0;\n    height: 650px;\n  }\n\n  #bulletContainer[_ngcontent-%COMP%] {\n    visibility: hidden;\n    overflow: hidden;\n  }\n}\nul[_ngcontent-%COMP%] {\n  padding-left: 0;\n  width: 80%;\n  margin-top: 0;\n  margin-bottom: 0;\n}\nol[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n@media (min-width: 320px) and (max-width: 480px) {\n  .outer[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    overflow-y: hidden;\n    background: url('RandomLandscape1.jpg');\n    background-size: cover;\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n  }\n\n  .inner[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 80%;\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n  }\n\n  .thumbnailContainer[_ngcontent-%COMP%] {\n    position: fixed;\n    transition: all 0.5s;\n    transition: pointer-events 0;\n    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);\n    overflow: hidden;\n  }\n\n  .left[_ngcontent-%COMP%] {\n    z-index: 0;\n    top: 15%;\n    left: 0;\n    height: 70%;\n    width: 60%;\n    pointer-events: none;\n  }\n\n  .right[_ngcontent-%COMP%] {\n    z-index: 0;\n    top: 15%;\n    left: 45%;\n    height: 70%;\n    width: 60%;\n    pointer-events: none;\n  }\n\n  .top-right[_ngcontent-%COMP%] {\n    z-index: 1;\n  }\n\n  .middle[_ngcontent-%COMP%] {\n    z-index: 2;\n    height: 85%;\n    top: 7.5%;\n    left: 15%;\n    width: 70%;\n    pointer-events: auto;\n  }\n\n  #listContainer[_ngcontent-%COMP%] {\n    height: 100%;\n    width: 95%;\n    position: relative;\n  }\n\n  h1[_ngcontent-%COMP%] {\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n    bottom: 5%;\n    margin: 0 0 0 0;\n    color: white;\n    transition: font-size 0.2s;\n    -webkit-text-stroke-width: 1px;\n    -webkit-text-stroke-color: black;\n  }\n\n  .thumbnail[_ngcontent-%COMP%] {\n    position: absolute;\n    object-fit: cover;\n    pointer-events: none;\n    width: 100%;\n    height: 100%;\n  }\n\n  #bulletContainer[_ngcontent-%COMP%] {\n    visibility: visible;\n    position: fixed;\n    width: 25vw;\n    height: 4vh;\n    left: 50vw;\n    transform: translateX(-50%);\n    bottom: 0vh;\n    display: flex;\n    justify-content: space-evenly;\n    padding: 0;\n    overflow: visible;\n  }\n\n  .bullet[_ngcontent-%COMP%] {\n    opacity: 0.5;\n    transition: all 0.5s;\n    visibility: visible;\n    background-color: white;\n    width: 10%;\n    height: 0;\n    padding-bottom: 10%;\n    border-radius: 50%;\n  }\n\n  .highlighted[_ngcontent-%COMP%] {\n    transition: all 0.5s;\n    opacity: 0.8;\n    visibility: visible;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRTtJQUNFLGFBQUE7SUFDQSxhQUFBO0VBQUY7O0VBRUE7SUFDRSxZQUFBO0lBQ0EsYUFBQTtJQUNBLGtCQUFBO0VBQ0Y7O0VBQ0E7SUFDRSxhQUFBO0lBQ0EsdUJBQUE7RUFFRjs7RUFBQTtJQUNFLDBCQUFBO0lBQ0EsZUFBQTtFQUdGOztFQUFBO0lBQ0Usa0JBQUE7SUFDQSxTQUFBO0lBQ0EsU0FBQTtJQUNBLDJCQUFBO0lBQ0EsWUFBQTtJQUNBLDBCQUFBO0lBQ0EsOEJBQUE7SUFDQSxnQ0FBQTtJQUNBLFVBQUE7RUFHRjs7RUFBQTtJQUNFLGlCQUFBO0lBQ0Esa0JBQUE7SUFDQSx1QkFBQTtJQUNBLGdCQUFBO0lBQ0EsMkNBQUE7SUFDQSxrQkFBQTtJQUNBLGFBQUE7SUFDQSxhQUFBO0lBQ0EsbUJBQUE7SUFDQSw2QkFBQTtFQUdGOztFQUFBO0lBQ0UsYUFBQTtJQUNBLG1CQUFBO0lBQ0EsNkJBQUE7RUFHRjs7RUFBQTtJQUNFLGtCQUFBO0lBQ0EsTUFBQTtJQUNBLE9BQUE7SUFDQSxZQUFBO0lBQ0EsV0FBQTtJQUNBLHVDQUFBO0lBQ0Esc0JBQUE7SUFDQSxnQkFBQTtFQUdGOztFQUFBO0lBQ0UsaUJBQUE7SUFDQSxvQkFBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0VBR0Y7O0VBQUE7SUFDRSxzQkFBQTtFQUdGOztFQUFBO0lBQ0UsYUFBQTtJQUNBLG1CQUFBO0lBQ0EsNkJBQUE7SUFDQSxhQUFBO0lBQ0EsZ0JBQUE7SUFDQSxhQUFBO0VBR0Y7O0VBQUE7SUFDRSxrQkFBQTtJQUNBLGdCQUFBO0VBR0Y7QUFDRjtBQUFBO0VBQ0UsZUFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUFFRjtBQUNBO0VBQ0UsZ0JBQUE7RUFDQSxVQUFBO0FBRUY7QUFDQTtFQUNFO0lBQ0Usa0JBQUE7SUFDQSxNQUFBO0lBQ0EsT0FBQTtJQUNBLFlBQUE7SUFDQSxXQUFBO0lBQ0Esa0JBQUE7SUFDQSx1Q0FBQTtJQUNBLHNCQUFBO0lBQ0EsZ0JBQUE7SUFDQSxhQUFBO0lBQ0EsbUJBQUE7SUFDQSw2QkFBQTtFQUVGOztFQUNBO0lBQ0UsV0FBQTtJQUNBLFdBQUE7SUFDQSxnQkFBQTtJQUNBLGFBQUE7SUFDQSxtQkFBQTtJQUNBLDZCQUFBO0VBRUY7O0VBQ0E7SUFDRSxlQUFBO0lBQ0Esb0JBQUE7SUFDQSw0QkFBQTtJQUNBLDJDQUFBO0lBQ0EsZ0JBQUE7RUFFRjs7RUFDQTtJQUNFLFVBQUE7SUFDQSxRQUFBO0lBQ0EsT0FBQTtJQUNBLFdBQUE7SUFDQSxVQUFBO0lBQ0Esb0JBQUE7RUFFRjs7RUFDQTtJQUNFLFVBQUE7SUFDQSxRQUFBO0lBQ0EsU0FBQTtJQUNBLFdBQUE7SUFDQSxVQUFBO0lBQ0Esb0JBQUE7RUFFRjs7RUFDQTtJQUNFLFVBQUE7RUFFRjs7RUFDQTtJQUNFLFVBQUE7SUFDQSxXQUFBO0lBQ0EsU0FBQTtJQUNBLFNBQUE7SUFDQSxVQUFBO0lBQ0Esb0JBQUE7RUFFRjs7RUFDQTtJQUNFLFlBQUE7SUFDQSxVQUFBO0lBQ0Esa0JBQUE7RUFFRjs7RUFDQTtJQUNFLGtCQUFBO0lBQ0EsU0FBQTtJQUNBLDJCQUFBO0lBQ0EsVUFBQTtJQUNBLGVBQUE7SUFDQSxZQUFBO0lBQ0EsMEJBQUE7SUFDQSw4QkFBQTtJQUNBLGdDQUFBO0VBRUY7O0VBQ0E7SUFDRSxrQkFBQTtJQUNBLGlCQUFBO0lBQ0Esb0JBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtFQUVGOztFQUNBO0lBQ0UsbUJBQUE7SUFDQSxlQUFBO0lBQ0EsV0FBQTtJQUNBLFdBQUE7SUFDQSxVQUFBO0lBQ0EsMkJBQUE7SUFDQSxXQUFBO0lBQ0EsYUFBQTtJQUNBLDZCQUFBO0lBQ0EsVUFBQTtJQUNBLGlCQUFBO0VBRUY7O0VBQ0E7SUFDRSxZQUFBO0lBQ0Esb0JBQUE7SUFDQSxtQkFBQTtJQUNBLHVCQUFBO0lBQ0EsVUFBQTtJQUNBLFNBQUE7SUFDQSxtQkFBQTtJQUNBLGtCQUFBO0VBRUY7O0VBQ0E7SUFDRSxvQkFBQTtJQUNBLFlBQUE7SUFDQSxtQkFBQTtFQUVGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0ODFweCl7XG4gIC5pbm5lciB7XG4gICAgd2lkdGg6IDEyMDBweDtcbiAgICBoZWlnaHQ6IDcwMHB4O1xuICB9XG4gIC50aHVtYm5haWxDb250YWluZXIge1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICBoZWlnaHQ6IDUwMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuICAudGh1bWJuYWlsQ29udGFpbmVyOmhvdmVyIHtcbiAgICBoZWlnaHQ6IDY1MHB4O1xuICAgIHRyYW5zaXRpb246IGhlaWdodCAwLjJzO1xuICB9XG4gIC50aHVtYm5haWxDb250YWluZXI6aG92ZXIgPiBoMSB7XG4gICAgdHJhbnNpdGlvbjogZm9udC1zaXplIDAuMnM7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgaDEge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdHJhbnNpdGlvbjogZm9udC1zaXplIDAuMnM7XG4gICAgLXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMXB4O1xuICAgIC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6IGJsYWNrO1xuICAgIHdpZHRoOiA5MCU7XG4gIH1cblxuICAudGh1bWJuYWlsQ29udGFpbmVyIHtcbiAgICBtYXJnaW4tbGVmdDogMjVweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDI1cHg7XG4gICAgdHJhbnNpdGlvbjogaGVpZ2h0IDAuMnM7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjYpO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgfVxuXG4gIC5kZXNrdG9wLWJhc2ljLWZsZXgge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgfVxuXG4gIC5vdXRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoJy4uLy4uLy4uL2Fzc2V0cy9MYW5kc2NhcGUvUmFuZG9tTGFuZHNjYXBlMS5qcGcnKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cblxuICAudGh1bWJuYWlsIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgaGVpZ2h0OjY1MHB4O1xuICB9XG5cbiAgI3RodW1ibmFpbF9jb250YWluZXJfMSwgI3RodW1ibmFpbF9jb250YWluZXJfMiB7XG4gICAgZmlsdGVyOiBncmF5c2NhbGUoODAlKTtcbiAgfVxuXG4gICNsaXN0Q29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIGhlaWdodDogNjUwcHg7XG4gIH1cblxuICAjYnVsbGV0Q29udGFpbmVyIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxufVxuXG51bCB7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgd2lkdGg6IDgwJTtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxub2wge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogMzIwcHgpIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xuICAub3V0ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICAgIGJhY2tncm91bmQ6IHVybCgnLi4vLi4vLi4vYXNzZXRzL0xhbmRzY2FwZS9SYW5kb21MYW5kc2NhcGUxLmpwZycpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIH1cblxuICAuaW5uZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogODAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICB9XG5cbiAgLnRodW1ibmFpbENvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzO1xuICAgIHRyYW5zaXRpb246IHBvaW50ZXItZXZlbnRzIDA7XG4gICAgYm94LXNoYWRvdzogNXB4IDVweCAxMHB4IHJnYmEoMCwwLDAsMC40KTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLmxlZnQge1xuICAgIHotaW5kZXg6IDA7XG4gICAgdG9wOiAxNSU7XG4gICAgbGVmdDogMDtcbiAgICBoZWlnaHQ6IDcwJTtcbiAgICB3aWR0aDogNjAlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLnJpZ2h0IHtcbiAgICB6LWluZGV4OiAwO1xuICAgIHRvcDogMTUlO1xuICAgIGxlZnQ6IDQ1JTtcbiAgICBoZWlnaHQ6IDcwJTtcbiAgICB3aWR0aDogNjAlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLnRvcC1yaWdodCB7XG4gICAgei1pbmRleDogMTtcbiAgfVxuXG4gIC5taWRkbGUge1xuICAgIHotaW5kZXg6IDI7XG4gICAgaGVpZ2h0OiA4NSU7XG4gICAgdG9wOiA3LjUlO1xuICAgIGxlZnQ6IDE1JTtcbiAgICB3aWR0aDogNzAlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICB9XG5cbiAgI2xpc3RDb250YWluZXIge1xuICAgIGhlaWdodDoxMDAlO1xuICAgIHdpZHRoOiA5NSU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgaDEge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgIGJvdHRvbTogNSU7XG4gICAgbWFyZ2luOiAwIDAgMCAwO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0cmFuc2l0aW9uOiBmb250LXNpemUgMC4ycztcbiAgICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XG4gICAgLXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogYmxhY2s7XG4gIH1cblxuICAudGh1bWJuYWlsIHtcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6MTAwJTtcbiAgfVxuXG4gICNidWxsZXRDb250YWluZXIge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAyNXZ3O1xuICAgIGhlaWdodDogNHZoO1xuICAgIGxlZnQ6IDUwdnc7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgIGJvdHRvbTogMHZoO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgcGFkZGluZzogMDtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgfVxuXG4gIC5idWxsZXQge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cztcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAxMCU7XG4gICAgaGVpZ2h0OiAwO1xuICAgIHBhZGRpbmctYm90dG9tOiAxMCU7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB9XG5cbiAgLmhpZ2hsaWdodGVkIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cztcbiAgICBvcGFjaXR5OiAwLjg7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgfVxufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/components/media-server/domains.ts":
/*!****************************************************!*\
  !*** ./src/app/components/media-server/domains.ts ***!
  \****************************************************/
/*! exports provided: domains */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "domains", function() { return domains; });
const domains = [
    {
        "name": "radarr",
        "domain": "radarr.gravy.cc",
        "path": "",
        "color": "#FFC230"
    },
    {
        "name": "lidarr",
        "domain": "lidarr.gravy.cc",
        "path": "",
        "color": "#009252"
    },
    {
        "name": "sonarr",
        "domain": "sonarr.gravy.cc",
        "path": "",
        "color": "#2193B5"
    },
    {
        "name": "plex",
        "domain": "plex.gravy.cc",
        "path": "",
        "color": "#e5a00d"
    },
    {
        "name": "deluge",
        "domain": "deluge.gravy.cc",
        "path": "",
        "color": "#4C90E8"
    },
    {
        "name": "Kuma",
        "domain": "kuma.gravy.cc",
        "path": "",
        "color": "#7BE7A3"
    },
    {
        "name": "Status",
        "domain": "status.gravy.cc",
        "path": "",
        "color": "#F05492"
    }
];


/***/ }),

/***/ "./src/app/components/media-server/server.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/media-server/server.component.ts ***!
  \*************************************************************/
/*! exports provided: ServerHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerHomeComponent", function() { return ServerHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _domains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domains */ "./src/app/components/media-server/domains.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function ServerHomeComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\n    ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\n    ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "sub");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\n  ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("--clr:", item_r1.color, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("href", "https://", item_r1.domain, "", item_r1.path, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-text", item_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1.domain);
} }
class ServerHomeComponent {
    constructor() {
        this.domains = _domains__WEBPACK_IMPORTED_MODULE_1__["domains"];
    }
}
ServerHomeComponent.ɵfac = function ServerHomeComponent_Factory(t) { return new (t || ServerHomeComponent)(); };
ServerHomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ServerHomeComponent, selectors: [["server-home"]], decls: 11, vars: 1, consts: [["href", "/", "id", "Home", 2, "--clr", "rgba(255,0,0)"], [3, "style", 4, "ngFor", "ngForOf"], [3, "href"]], template: function ServerHomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Design from https://www.youtube.com/watch?v=I90no1eQ45E&t=93s");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\n  ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ServerHomeComponent_li_8_Template, 8, 8, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\n");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.domains);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["@import url(\"https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap\");\n*[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: \"Poppins\", sans-serif;\n}\n#Home[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 3em;\n  text-decoration: none;\n  line-height: 1em;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: transparent;\n  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);\n  top: 0.5vw;\n  left: 0.5vw;\n}\n#Home[_ngcontent-%COMP%]::before {\n  content: \"Home\";\n  position: absolute;\n  color: #fff;\n  width: 0;\n  overflow: hidden;\n  transition: 1s;\n  border-right: 8px solid var(--clr);\n  -webkit-text-stroke: 1px var(--clr);\n  color: var(--clr);\n}\n#Home[_ngcontent-%COMP%]:hover::before {\n  width: 100%;\n  filter: drop-shadow(0 0 15px var(--clr));\n}\nul[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #252839;\n  flex-direction: column;\n  gap: 30px;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n  list-style: none;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 4em;\n  text-decoration: none;\n  line-height: 1em;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: transparent;\n  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::before {\n  content: attr(data-text);\n  position: absolute;\n  color: #fff;\n  width: 0;\n  height: 70%;\n  overflow: hidden;\n  transition: 1s;\n  border-right: 8px solid var(--clr);\n  -webkit-text-stroke: 1px var(--clr);\n  color: var(--clr);\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover::before {\n  width: 100%;\n  filter: drop-shadow(0 0 15px var(--clr));\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover    + sub[_ngcontent-%COMP%] {\n  color: lime;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   sub[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-60%, 135%);\n  font-size: 1.2em;\n  z-index: 2;\n  color: rgba(0, 255, 234, 0.5);\n  pointer-events: none;\n  transition: 1s;\n}\np[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 1px;\n  left: 5px;\n  color: #35395180;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9tZWRpYS1zZXJ2ZXIvc2VydmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFRLHFGQUFBO0FBRVI7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0NBQUE7QUFBRjtBQUdBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlEQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUFBRjtBQUdBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsaUJBQUE7QUFBRjtBQUdBO0VBQ0UsV0FBQTtFQUNBLHdDQUFBO0FBQUY7QUFHQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBQUY7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpREFBQTtBQUFGO0FBR0E7RUFDRSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUNBLGlCQUFBO0FBQUY7QUFHQTtFQUNFLFdBQUE7RUFDQSx3Q0FBQTtBQUFGO0FBR0E7RUFDRSxXQUFBO0FBQUY7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSw2QkFBQTtFQUNBLG9CQUFBO0VBQ0EsY0FBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUFBRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbWVkaWEtc2VydmVyL3NlcnZlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6d2dodEA3MDAmZGlzcGxheT1zd2FwJyk7XG5cbioge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG59XG5cbiNIb21lIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBmb250LXNpemU6IDNlbTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBsaW5lLWhlaWdodDogMWVtO1xuICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gIC13ZWJraXQtdGV4dC1zdHJva2U6IDFweCByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7XG4gIHRvcDogMC41dnc7XG4gIGxlZnQ6IDAuNXZ3O1xufVxuXG4jSG9tZTo6YmVmb3JlIHtcbiAgY29udGVudDogXCJIb21lXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29sb3I6ICNmZmY7XG4gIHdpZHRoOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0cmFuc2l0aW9uOiAxcztcbiAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgdmFyKC0tY2xyKTtcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZTogMXB4IHZhcigtLWNscik7XG4gIGNvbG9yOiB2YXIoLS1jbHIpO1xufVxuXG4jSG9tZTpob3Zlcjo6YmVmb3JlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDE1cHggdmFyKC0tY2xyKSk7XG59XG5cbnVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kOiAjMjUyODM5O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDMwcHg7XG59XG5cbnVsIGxpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG51bCBsaSBhIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LXNpemU6IDRlbTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBsaW5lLWhlaWdodDogMWVtO1xuICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gIC13ZWJraXQtdGV4dC1zdHJva2U6IDFweCByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7XG59XG5cbnVsIGxpIGE6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS10ZXh0KTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb2xvcjogI2ZmZjtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogNzAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0cmFuc2l0aW9uOiAxcztcbiAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgdmFyKC0tY2xyKTtcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZTogMXB4IHZhcigtLWNscik7XG4gIGNvbG9yOiB2YXIoLS1jbHIpO1xufVxuXG51bCBsaSBhOmhvdmVyOjpiZWZvcmUge1xuICB3aWR0aDogMTAwJTtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMTVweCB2YXIoLS1jbHIpKTtcbn1cblxudWwgbGkgYTpob3ZlciArIHN1YiB7XG4gIGNvbG9yOiByZ2IoMCwgMjU1LCAwKTtcbn1cblxudWwgbGkgc3ViIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNjAlICwgMTM1JSk7XG4gIGZvbnQtc2l6ZTogMS4yZW07XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiByZ2JhKDAsIDI1NSwgMjM0LCAwLjUpO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdHJhbnNpdGlvbjogMXM7XG59XG5cbnAge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMXB4O1xuICBsZWZ0OiA1cHg7XG4gIGNvbG9yOiMzNTM5NTE4MDtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServerHomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'server-home',
                templateUrl: './server.component.html',
                styleUrls: ['./server.component.scss'],
                preserveWhitespaces: true
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/skill-tree/list-item/skill-list.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/skill-tree/list-item/skill-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: SkillListComponent, SkillListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillListComponent", function() { return SkillListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillListModule", function() { return SkillListModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




const _c0 = ["list"];
const _c1 = ["fire"];
const _c2 = ["cards"];
function SkillListComponent_li_2_img_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 7);
} if (rf & 2) {
    const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("aspect-ratio", item_r2.image.aspect);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", item_r2.image.img, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function SkillListComponent_li_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", null, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SkillListComponent_li_2_img_7_Template, 1, 3, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r2.heading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r2.body);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r2.image);
} }
class SkillListComponent {
    constructor(ref) {
        this.ref = ref;
        //Local "cache" of cards. Not all are loaded however this means that scrolling quickly should be smooth af
        //This will get updated less frequently from a database but will get more data at a time to put it into memory
        this.items = [
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "fourteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "thirteenth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                image: {
                    img: "https://cliparting.com/wp-content/uploads/2018/03/cool-pictures-2018-2.jpg",
                    aspect: "4 / 3"
                }
            },
            {
                heading: "twelth Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "eleventh Card",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                image: {
                    img: "https://c4.wallpaperflare.com/wallpaper/227/583/604/anime-anime-girls-digital-art-artwork-2d-hd-wallpaper-preview.jpg",
                    aspect: "14/22"
                }
            },
            {
                heading: "tenth Card",
                body: "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            },
            {
                heading: "nineth Card",
                body: "Lorem ipsum dolor sit amet"
            },
            {
                heading: "Rrrrruuuufff",
                body: "Lorem Ruffffsum",
                image: {
                    img: "./assets/test/cool-pictures-2018-2.jpg",
                    aspect: "4 / 3"
                }
            },
            {
                heading: "Dr. Seuss",
                body: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose"
            },
            {
                heading: "Steve Jobs",
                body: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma — which is living with the results of other people's thinking"
            },
            {
                heading: "Eleanor Roosevelt",
                body: "The future belongs to those who believe in the beauty of their dreams"
            },
            {
                heading: "Robert Louis Stevenson",
                body: "Don't judge each day by the harvest you reap but by the seeds that you plant",
                image: {
                    img: "https://c4.wallpaperflare.com/wallpaper/28/832/21/ultrawide-8k-no-mans-sky-poster-wallpaper-preview.jpg",
                    aspect: "84/29"
                }
            },
            {
                heading: "Margaret Mead",
                body: "Always remember that you are absolutely unique. Just like everyone else"
            },
            {
                heading: "Franklin D. Roosevelt",
                body: "When you reach the end of your rope, tie a knot in it and hang on"
            },
            {
                heading: "Mother Teresa",
                body: "Spread love everywhere you go. Let no one ever come to you without leaving happier"
            }
        ];
        this.min = 8;
        this.max = 15;
        this.ready = false;
    }
    ngOnInit() {
        this.max = this.items.length;
        this.min = this.max - 8;
    }
    ngAfterViewInit() {
        let images = document.images;
        let counter = 0;
        let incrementCounter = () => {
            counter++;
            if (counter === images.length) {
                this.scrollBottom();
                this.ready = true;
            }
        };
        [].forEach.call(images, (img) => {
            if (img.complete)
                incrementCounter();
            else
                img.addEventListener('load', incrementCounter, false);
        });
    }
    scrollBottom() {
        if (!document.getElementById('tree').classList.contains("focused"))
            document.getElementById("fire").scrollIntoView();
    }
    loadNewTops() {
        if (this.min >= 2) {
            this.min -= 2;
            this.ref.detectChanges();
            return true;
        }
        return false;
    }
    cullBottom() {
        if (this.max > 1) {
            this.max--;
            this.ref.detectChanges();
            return true;
        }
        return false;
    }
    loadNewBottom() {
        if (this.max < this.items.length) {
            this.max++;
            this.ref.detectChanges();
            return true;
        }
        return false;
    }
    cullTop() {
        if (this.min < this.items.length + 1) {
            this.min += 2;
            this.ref.detectChanges();
            return true;
        }
        return false;
    }
    ApplyFilter() {
        return true;
    }
}
SkillListComponent.ɵfac = function SkillListComponent_Factory(t) { return new (t || SkillListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
SkillListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SkillListComponent, selectors: [["skill-listcomponent"]], viewQuery: function SkillListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.list = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.fire = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.cards = _t);
    } }, decls: 7, vars: 5, consts: [["list", ""], [4, "ngFor", "ngForOf"], ["id", "fire"], ["src", "../../../assets/Fire-GIFs-Get-the-best-GIF-on-GIPHY.gif"], ["cards", ""], [1, "content"], [3, "src", "aspect-ratio", 4, "ngIf"], [3, "src"]], template: function SkillListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", null, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, SkillListComponent_li_2_Template, 8, 3, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "slice");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind3"](3, 1, ctx.items, ctx.min, ctx.max));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["SlicePipe"]], styles: ["*[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nul[_ngcontent-%COMP%] {\n  list-style: none;\n}\n\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 20px;\n  background-color: #313131;\n  border-radius: 10px;\n  margin-bottom: 20px;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0 0 0 0;\n  text-align: center;\n  font-size: xx-large;\n}\n\n.content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 25px;\n  font-weight: 500;\n  line-height: 30px;\n  margin-bottom: 10px;\n  color: #eeeeee;\n}\n\n.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 30px;\n  font-weight: 300;\n  color: #eeeeee;\n}\n\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  display: none;\n}\n\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n@media only screen and (min-width: 768px) {\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    width: 50%;\n    margin-bottom: 50px;\n    position: relative;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(odd) {\n    float: left;\n    clear: right;\n    transform: translateX(-30px);\n    border-radius: 10px 0 10px 10px;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(even) {\n    float: right;\n    clear: left;\n    transform: translateX(30px);\n    border-radius: 0 10px 10px 10px;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n    width: 100px;\n    height: 100px;\n    background-color: transparent;\n    padding: 0;\n    margin: 0;\n    float: right;\n    clear: both;\n    right: 50%;\n    transform: translateX(50%);\n    overflow: visible;\n    display: inline;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::after {\n    content: \"\";\n    position: absolute;\n    height: 20px;\n    width: 20px;\n    background-color: #949494;\n    border-radius: 50%;\n    top: 0;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(odd)::after {\n    transform: translate(50%, -50%);\n    right: -30px;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(even)::after {\n    transform: translate(-50%, -50%);\n    left: -30px;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child::after {\n    height: 0;\n    width: 0;\n  }\n\n  ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child   img[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9za2lsbC10cmVlL2xpc3QtaXRlbS9za2lsbC1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksU0FBQTtFQUNBLFVBQUE7RUFDQSxzQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGFBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxhQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0FBQ0o7O0FBRUE7RUFFSTtJQUNJLFVBQUE7SUFDQSxtQkFBQTtJQUNBLGtCQUFBO0VBQU47O0VBR0U7SUFDSSxXQUFBO0lBQ0EsWUFBQTtJQUNBLDRCQUFBO0lBQ0EsK0JBQUE7RUFBTjs7RUFHRTtJQUNJLFlBQUE7SUFDQSxXQUFBO0lBQ0EsMkJBQUE7SUFDQSwrQkFBQTtFQUFOOztFQUdFO0lBQ0ksWUFBQTtJQUNBLGFBQUE7SUFDQSw2QkFBQTtJQUVBLFVBQUE7SUFDQSxTQUFBO0lBRUEsWUFBQTtJQUNBLFdBQUE7SUFDQSxVQUFBO0lBQ0EsMEJBQUE7SUFDQSxpQkFBQTtJQUVBLGVBQUE7RUFITjs7RUFNRTtJQUNJLFdBQUE7SUFDQSxrQkFBQTtJQUNBLFlBQUE7SUFDQSxXQUFBO0lBQ0EseUJBQUE7SUFDQSxrQkFBQTtJQUNBLE1BQUE7RUFITjs7RUFNRTtJQUNJLCtCQUFBO0lBQ0EsWUFBQTtFQUhOOztFQU1FO0lBQ0ksZ0NBQUE7SUFDQSxXQUFBO0VBSE47O0VBTUU7SUFDSSxTQUFBO0lBQ0EsUUFBQTtFQUhOOztFQU1FO0lBQ0ksWUFBQTtJQUNBLGFBQUE7RUFITjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9za2lsbC10cmVlL2xpc3QtaXRlbS9za2lsbC1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxudWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbnVsIGxpIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMTMxMzE7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG5wIHtcbiAgICBtYXJnaW46IDAgMCAwIDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG59XG5cbi5jb250ZW50IGgyIHtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIGNvbG9yOiByZ2IoMjM4LCAyMzgsIDIzOCk7XG59XG5cbi5jb250ZW50IHAge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGNvbG9yOiByZ2IoMjM4LCAyMzgsIDIzOCk7XG59XG5cbnVsIGxpOmxhc3QtY2hpbGQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbnVsIGxpIGltZyB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcblxuICAgIHVsIGxpIHtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNTBweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIHVsIGxpOm50aC1jaGlsZChvZGQpIHtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIGNsZWFyOiByaWdodDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0zMHB4KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweCAwIDEwcHggMTBweDtcbiAgICB9XG5cbiAgICB1bCBsaTpudGgtY2hpbGQoZXZlbikge1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgIGNsZWFyOiBsZWZ0O1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAgMTBweCAxMHB4IDEwcHg7XG4gICAgfVxuXG4gICAgdWwgbGk6bGFzdC1jaGlsZCB7XG4gICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBjbGVhcjogYm90aDtcbiAgICAgICAgcmlnaHQ6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuXG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICB9XG5cbiAgICB1bCBsaTo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ4LCAxNDgsIDE0OCk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgdG9wOiAwO1xuICAgIH1cblxuICAgIHVsIGxpOm50aC1jaGlsZChvZGQpOjphZnRlciB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDUwJSwgLTUwJSk7XG4gICAgICAgIHJpZ2h0OiAtMzBweDtcbiAgICB9XG5cbiAgICB1bCBsaTpudGgtY2hpbGQoZXZlbik6OmFmdGVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICAgIGxlZnQ6IC0zMHB4O1xuICAgIH1cblxuICAgIHVsIGxpOmxhc3QtY2hpbGQ6OmFmdGVyIHtcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICB3aWR0aDogMDtcbiAgICB9XG5cbiAgICB1bCBsaTpsYXN0LWNoaWxkIGltZyB7XG4gICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICB9XG5cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SkillListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'skill-listcomponent',
                templateUrl: './skill-list.component.html',
                styleUrls: ['./skill-list.component.scss'],
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, { cards: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
            args: ['cards']
        }], list: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['list']
        }], fire: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['fire']
        }] }); })();
class SkillListModule {
}
SkillListModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SkillListModule });
SkillListModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function SkillListModule_Factory(t) { return new (t || SkillListModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SkillListModule, { declarations: [SkillListComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]], exports: [SkillListComponent] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SkillListModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]
                ],
                exports: [SkillListComponent],
                declarations: [SkillListComponent],
                providers: [],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/skill-tree/skill-tree.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/skill-tree/skill-tree.component.ts ***!
  \***************************************************************/
/*! exports provided: SkillTreeComponent, debounce, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillTreeComponent", function() { return SkillTreeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list-item/skill-list.component */ "./src/app/components/skill-tree/list-item/skill-list.component.ts");





const _c0 = ["container"];
class SkillTreeComponent {
    constructor(ref) {
        this.ref = ref;
        this.eFilter = Filter;
    }
    ngOnInit() {
    }
    onResize(event) {
        let width = event.target.innerWidth - 1015;
        if (width > 85)
            return;
        if (width < 0)
            width = 0;
        let percent = width / 85;
        let suggested = document.getElementById('Suggested-Scroll');
        suggested.style.opacity = percent.toString();
    }
    ApplyFilter(filter) {
        console.log(Filter[filter]);
    }
    scroll(event) {
        if (document.getElementById('tree').classList.contains("focused")) {
            //timeline
        }
        else {
            let wheelDirection = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
            if (wheelDirection === 1) {
                if (this.skillList.ready) {
                    this.MoveDown();
                }
                else {
                    alert("please try again now");
                }
            }
        }
    }
    timelineScroll() {
        if (!document.getElementById('tree').classList.contains("focused")) {
            return;
        }
        this.skillList.cards.forEach((c) => {
            c.nativeElement.style.border = "none";
        });
        let first = -1; //top element position in array
        let last = -1; //bottom element position in array (should be higher)
        //optimisation - store these instead of calculating every scroll event (then only check before and after first)
        this.skillList.cards.toArray().forEach((c, i) => {
            if (!this.isPartiallyInViewport(c.nativeElement))
                return;
            if (first == undefined || first == -1)
                first = i;
            last = i;
        });
        this.HandleTop(first);
        if (this.skillList.cards.toArray().length - 1 - last < 3) {
            this.skillList.loadNewBottom();
            return;
        }
        if (this.skillList.cards.toArray().length - 1 - last > 3) {
            this.skillList.cullBottom();
            return;
        }
    }
    onSwipe(event) {
        console.log(event);
        if (Math.abs(event.deltaY) > 40) {
            if (event.deltaY < 0) {
                this.MoveDown();
            }
        }
    }
    MoveDown() {
        const foo = document.getElementById('page');
        for (let i = 0; i < foo.children.length; i++) {
            if (foo.children[i].classList.contains("focused")) {
                if (i !== foo.children.length - 1) {
                    foo.children[i + 1].classList.add("focused");
                    foo.children[i + 1].classList.remove("below");
                    foo.children[i].classList.remove("focused");
                    foo.children[i].classList.add("above");
                }
            }
        }
    }
    MoveUp() {
        const foo = document.getElementById('page');
        for (let i = 0; i < foo.children.length; i++) {
            if (foo.children[i].classList.contains("focused")) {
                if (i !== 0) {
                    foo.children[i - 1].classList.add("focused");
                    foo.children[i - 1].classList.remove("above");
                    foo.children[i].classList.remove("focused");
                    foo.children[i].classList.add("below");
                }
                else {
                    break;
                }
            }
        }
    }
    HandleTop(first) {
        if (first < 4) {
            const previousScroll = this.container.nativeElement.scrollTop;
            if (this.skillList.loadNewTops()) {
                const newElementsHeight = this.getRealHeight(this.skillList.cards.toArray()[0]) + this.getRealHeight(this.skillList.cards.toArray()[1]); //new element added
                this.container.nativeElement.scrollTop = previousScroll + newElementsHeight;
                return;
            }
        }
        if (first >= 7) {
            const previousScroll = this.container.nativeElement.scrollTop;
            const height = this.getRealHeight(this.skillList.cards.toArray()[0]) + this.getRealHeight(this.skillList.cards.toArray()[1]);
            if (this.skillList.cullTop()) {
                this.container.nativeElement.scrollTop = previousScroll - height;
                return;
            }
        }
    }
    isPartiallyInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0);
    }
    getRealHeight(element) {
        const styles = window.getComputedStyle(element.nativeElement);
        const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
        return margin + element.nativeElement.offsetHeight;
    }
}
SkillTreeComponent.ɵfac = function SkillTreeComponent_Factory(t) { return new (t || SkillTreeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"])); };
SkillTreeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SkillTreeComponent, selectors: [["app-skill-tree"]], viewQuery: function SkillTreeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_2__["SkillListComponent"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.container = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.skillList = _t.first);
    } }, hostBindings: function SkillTreeComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("resize", function SkillTreeComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"])("mousewheel", function SkillTreeComponent_mousewheel_HostBindingHandler($event) { return ctx.scroll($event); });
    } }, decls: 28, vars: 0, consts: [["id", "page", 3, "swipe"], ["id", "introduction", 1, "focused", 3, "onwheel"], ["id", "tree", 1, "below", 3, "onwheel"], [3, "click"], ["id", "container", 1, "container", 3, "scroll"], ["container", ""], ["id", "timeline", 1, "timeline"], ["id", "skill-list"], ["id", "Suggested-Scroll"], ["id", "filter"]], template: function SkillTreeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("swipe", function SkillTreeComponent_Template_div_swipe_0_listener($event) { return ctx.onSwipe($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "section", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onwheel", function SkillTreeComponent_Template_section_onwheel_1_listener() { return ctx.MoveDown(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Eventually you will be welcomed to a timeline of my life when you scroll down");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " For now you may scroll down to view the unfinished product");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "section", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onwheel", function SkillTreeComponent_Template_section_onwheel_6_listener() { return ctx.MoveUp(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SkillTreeComponent_Template_button_click_7_listener() { return ctx.MoveUp(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("scroll", function SkillTreeComponent_Template_div_scroll_9_listener() { return ctx.timelineScroll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "skill-listcomponent", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SkillTreeComponent_Template_button_click_20_listener() { return ctx.ApplyFilter(ctx.eFilter.Professional); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "\uD83D\uDDA5\uFE0F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SkillTreeComponent_Template_button_click_22_listener() { return ctx.ApplyFilter(ctx.eFilter.Gaming); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "\uD83D\uDD79\uFE0F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SkillTreeComponent_Template_button_click_24_listener() { return ctx.ApplyFilter(ctx.eFilter.Financial); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "\uD83D\uDCB0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SkillTreeComponent_Template_button_click_26_listener() { return ctx.ApplyFilter(ctx.eFilter.Personal); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "\uD83D\uDE1C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_2__["SkillListComponent"]], styles: ["*[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\ndiv[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n\ndiv[_ngcontent-%COMP%] {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n\n#page[_ngcontent-%COMP%] {\n  overflow: hidden;\n  height: 100vh;\n  width: 100vw;\n}\n\n#page[_ngcontent-%COMP%]    > section[_ngcontent-%COMP%] {\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  transition: all 0.5s cubic-bezier(0.1, 1, 0.5, 1);\n}\n\n#page[_ngcontent-%COMP%]    > .below[_ngcontent-%COMP%] {\n  top: 100vh;\n}\n\n#page[_ngcontent-%COMP%]    > .above[_ngcontent-%COMP%] {\n  top: -100vh;\n}\n\n.focused[_ngcontent-%COMP%] {\n  top: 0;\n}\n\n#introduction[_ngcontent-%COMP%] {\n  background-color: lightblue;\n  z-index: 1;\n}\n\n#tree[_ngcontent-%COMP%] {\n  background-color: #101010;\n}\n\nbutton[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 20px;\n  background-color: red;\n  position: absolute;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0 0 0 0;\n  text-align: center;\n  font-size: xx-large;\n}\n\n.container[_ngcontent-%COMP%] {\n  max-height: 100vh;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  background-color: #202020;\n  overflow-y: scroll;\n}\n\n.timeline[_ngcontent-%COMP%] {\n  width: 80%;\n  max-width: 800px;\n  position: relative;\n  overflow-x: visible;\n  padding-top: 60px;\n  margin-bottom: -162px;\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%] {\n  position: relative;\n  bottom: 40vh;\n  width: 100%;\n  overflow: visible;\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: relative;\n  float: right;\n  width: 50px;\n  clear: both;\n  transform: translateX(-50%);\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  height: 75px;\n  background-color: none;\n  border: 4px solid white;\n  border-radius: 25px;\n  z-index: 2;\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:first-child) {\n  height: 20px;\n  width: 20px;\n  right: 30px;\n  top: 5px;\n  margin-top: 9px;\n  background: white;\n  transform: translateX(-50%) rotate(45deg);\n  animation: fade 1s infinite;\n  animation-direction: alternate;\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(2n) {\n  animation-delay: 0.6s;\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(3n) {\n  animation-delay: 0.9s;\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(4n) {\n  animation-delay: 1.2s;\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:first-child)::after {\n  position: absolute;\n  content: \"\";\n  height: 16px;\n  width: 16px;\n  background: #202020;\n  transform: rotate(45deg) translateX(-1px) rotate(-45deg);\n}\n\n#Suggested-Scroll[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  position: absolute;\n  width: 10%;\n  height: 10%;\n  left: 50%;\n  transform: translateX(-50%);\n  top: 20%;\n  animation: animateMouseScroll 1.2s infinite cubic-bezier(0, 0, 0.43, 0.82);\n  background-color: white;\n}\n\n#filter[_ngcontent-%COMP%] {\n  position: fixed;\n  float: left;\n  width: 60px;\n  height: 240px;\n  top: 50vh;\n  left: 10px;\n  transform: translateY(-50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n#filter[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  width: 100%;\n  flex-grow: 1;\n  position: relative;\n  border: none;\n  background-color: #202020;\n  font-size: 40px;\n  border: none;\n}\n\n#filter[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:hover {\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: white;\n  cursor: pointer;\n}\n\n@keyframes animateMouseScroll {\n  from {\n    top: 20%;\n    opacity: 100%;\n  }\n  to {\n    top: 50%;\n    opacity: 0%;\n  }\n}\n\n@keyframes fade {\n  from {\n    opacity: 100%;\n  }\n  to {\n    opacity: 0%;\n  }\n}\n\n@media only screen and (min-width: 768px) {\n  .timeline[_ngcontent-%COMP%]::before {\n    content: \"\";\n    position: absolute;\n    height: 100%;\n    width: 2px;\n    left: 50%;\n    transform: translateX(-50%);\n    background-color: #a0a0a0;\n    margin-top: -60px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9za2lsbC10cmVlL3NraWxsLXRyZWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0FBQ0o7O0FBR0E7RUFDSSxhQUFBO0FBQUo7O0FBR0E7RUFDQSx3QkFBQTtFQUNBLHFCQUFBO0FBQUE7O0FBSUE7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBREo7O0FBSUE7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtBQURKOztBQUlBO0VBQ0ksVUFBQTtBQURKOztBQUdBO0VBQ0ksV0FBQTtBQUFKOztBQUdBO0VBQ0ksTUFBQTtBQUFKOztBQUdBO0VBQ0ksMkJBQUE7RUFDQSxVQUFBO0FBQUo7O0FBR0E7RUFDSSx5QkFBQTtBQUFKOztBQUdBO0VBQ0ksWUFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0E7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksaUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUFBSjs7QUFHQTtFQUNJLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0FBQUo7O0FBR0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUFBSjs7QUFHQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsMkJBQUE7QUFBSjs7QUFHQTtFQUNJLFlBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0FBQUo7O0FBR0E7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EseUNBQUE7RUFDQSwyQkFBQTtFQUNBLDhCQUFBO0FBQUo7O0FBSUk7RUFDSSxxQkFBQTtBQURSOztBQUFJO0VBQ0kscUJBQUE7QUFHUjs7QUFKSTtFQUNJLHFCQUFBO0FBT1I7O0FBSEE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esd0RBQUE7QUFNSjs7QUFIQTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7RUFDQSxRQUFBO0VBQ0EsMEVBQUE7RUFDQSx1QkFBQTtBQU1KOztBQUhBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsMkJBQUE7RUFFQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0FBS0o7O0FBRkE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFLSjs7QUFEQTtFQUNJLDhCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxlQUFBO0FBSUo7O0FBREE7RUFDSTtJQUFNLFFBQUE7SUFBVSxhQUFBO0VBTWxCO0VBTEU7SUFBSSxRQUFBO0lBQVUsV0FBQTtFQVNoQjtBQUNGOztBQVBBO0VBQ0k7SUFBTSxhQUFBO0VBVVI7RUFURTtJQUFLLFdBQUE7RUFZUDtBQUNGOztBQVZBO0VBQ0k7SUFDSSxXQUFBO0lBQ0Esa0JBQUE7SUFDQSxZQUFBO0lBQ0EsVUFBQTtJQUNBLFNBQUE7SUFDQSwyQkFBQTtJQUNBLHlCQUFBO0lBQ0EsaUJBQUE7RUFZTjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9za2lsbC10cmVlL3NraWxsLXRyZWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5cbmRpdjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG4gIFxuZGl2IHtcbi1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbnNjcm9sbGJhci13aWR0aDogbm9uZTtcbn1cblxuXG4jcGFnZSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIHdpZHRoOiAxMDB2dztcbn1cblxuI3BhZ2UgPiBzZWN0aW9uIHtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgY3ViaWMtYmV6aWVyKDAuMSwgMSwgMC41LCAxKTs7XG59XG5cbiNwYWdlID4gLmJlbG93IHtcbiAgICB0b3A6IDEwMHZoO1xufVxuI3BhZ2UgPiAuYWJvdmUge1xuICAgIHRvcDogLTEwMHZoO1xufVxuXG4uZm9jdXNlZCB7XG4gICAgdG9wOiAwO1xufVxuXG4jaW50cm9kdWN0aW9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG4gICAgei1pbmRleDogMTtcbn1cblxuI3RyZWUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMDEwMTA7XG59XG5cbmJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG5wIHtcbiAgICBtYXJnaW46IDAgMCAwIDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG59XG5cbi5jb250YWluZXIge1xuICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzIsIDMyLCAzMik7XG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuXG4udGltZWxpbmUge1xuICAgIHdpZHRoOiA4MCU7XG4gICAgbWF4LXdpZHRoOiA4MDBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3cteDogdmlzaWJsZTtcbiAgICBwYWRkaW5nLXRvcDogNjBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAtMTYycHg7XG59XG5cbiNTdWdnZXN0ZWQtU2Nyb2xsIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm90dG9tOiA0MHZoO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4jU3VnZ2VzdGVkLVNjcm9sbCA+IGRpdiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGZsb2F0OiByaWdodDtcbiAgICB3aWR0aDogNTBweDtcbiAgICBjbGVhcjogYm90aDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG59XG5cbiNTdWdnZXN0ZWQtU2Nyb2xsID4gZGl2OmZpcnN0LWNoaWxkIHtcbiAgICBoZWlnaHQ6IDc1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbm9uZTtcbiAgICBib3JkZXI6IDRweCBzb2xpZCB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgIHotaW5kZXg6IDI7XG59XG5cbiNTdWdnZXN0ZWQtU2Nyb2xsID4gZGl2Om5vdCg6Zmlyc3QtY2hpbGQpIHtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgcmlnaHQ6IDMwcHg7XG4gICAgdG9wOiA1cHg7XG4gICAgbWFyZ2luLXRvcDogOXB4O1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoNDVkZWcpO1xuICAgIGFuaW1hdGlvbjogZmFkZSAxcyBpbmZpbml0ZTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGVcbn1cblxuQGZvciAkaSBmcm9tIDIgdGhyb3VnaCA0IHtcbiAgICAjU3VnZ2VzdGVkLVNjcm9sbCA+IGRpdjpudGgtY2hpbGQoI3skaX1uKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogI3skaSAqIDAuM31zO1xuICAgIH1cbn1cblxuI1N1Z2dlc3RlZC1TY3JvbGwgPiBkaXY6bm90KDpmaXJzdC1jaGlsZCk6OmFmdGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgY29udGVudDpcIlwiO1xuICAgIGhlaWdodDogMTZweDtcbiAgICB3aWR0aDogMTZweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMzIsIDMyLCAzMik7O1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKSB0cmFuc2xhdGVYKC0xcHgpIHJvdGF0ZSgtNDVkZWcpO1xufVxuXG4jU3VnZ2VzdGVkLVNjcm9sbCA+IGRpdiA+IGRpdjpmaXJzdC1jaGlsZCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxMCU7XG4gICAgaGVpZ2h0OiAxMCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICB0b3A6IDIwJTtcbiAgICBhbmltYXRpb246IGFuaW1hdGVNb3VzZVNjcm9sbCAxLjJzIGluZmluaXRlIGN1YmljLWJlemllcigwLCAwLCAwLjQzLCAwLjgyKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuI2ZpbHRlciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGhlaWdodDogMjQwcHg7XG4gICAgdG9wOiA1MHZoO1xuICAgIGxlZnQ6IDEwcHg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbn1cblxuI2ZpbHRlciA+IGJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMyLCAzMiwgMzIpO1xuICAgIGZvbnQtc2l6ZTogNDBweDs7XG4gICAgYm9yZGVyOiBub25lO1xuXG59XG5cbiNmaWx0ZXIgPiBidXR0b246aG92ZXIge1xuICAgIC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDFweDtcbiAgICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiB3aGl0ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBrZXlmcmFtZXMgYW5pbWF0ZU1vdXNlU2Nyb2xsIHtcbiAgICBmcm9tIHt0b3A6IDIwJTsgb3BhY2l0eTogMTAwJTt9XG4gICAgdG8ge3RvcDogNTAlOyBvcGFjaXR5OiAwJX1cbn1cblxuQGtleWZyYW1lcyBmYWRlIHtcbiAgICBmcm9tIHtvcGFjaXR5OiAxMDAlOyB9XG4gICAgdG8geyBvcGFjaXR5OiAwJTsgfVxufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLnRpbWVsaW5lOjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAycHg7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTYwLCAxNjAsIDE2MCk7XG4gICAgICAgIG1hcmdpbi10b3A6IC02MHB4XG4gICAgfVxufSJdfQ== */"] });
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    debounce(50)
], SkillTreeComponent.prototype, "HandleTop", null);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SkillTreeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-skill-tree',
                templateUrl: './skill-tree.component.html',
                styleUrls: ['./skill-tree.component.scss']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }]; }, { container: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['container']
        }], skillList: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: [_list_item_skill_list_component__WEBPACK_IMPORTED_MODULE_2__["SkillListComponent"]]
        }], onResize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['window:resize', ['$event']]
        }], scroll: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['mousewheel', ['$event']]
        }], HandleTop: [] }); })();
function debounce(delay = 300) {
    return function (target, propertyKey, descriptor) {
        const timeoutKey = Symbol();
        const original = descriptor.value;
        descriptor.value = function (...args) {
            clearTimeout(this[timeoutKey]);
            this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
        };
        return descriptor;
    };
}
var Filter;
(function (Filter) {
    Filter[Filter["Professional"] = 0] = "Professional";
    Filter[Filter["Gaming"] = 1] = "Gaming";
    Filter[Filter["Financial"] = 2] = "Financial";
    Filter[Filter["Personal"] = 3] = "Personal";
})(Filter || (Filter = {}));


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/gravy/Documents/gravy.cc/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map