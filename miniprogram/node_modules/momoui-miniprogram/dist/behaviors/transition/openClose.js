module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
    fade: {
        transition: [{
            property: 'opacity'
        }],
        start: 'opacity: 0;',
        end: 'opacity: 1;'
    },
    grow: {
        transition: [{
            property: 'opacity'
        }, {
            property: 'transform',
            duration: function duration(_duration) {
                return _duration * 0.666;
            }
        }],
        start: 'opacity: 0; transform: scale(0.75, ' + Math.pow(0.75, 2) + ');',
        end: 'opacity: 1; transform: scale(1, 1);'
    },
    slide: {
        transition: [{
            property: 'transform',
            timingFunction: {
                enter: 'cubic-bezier(0, 0, 0.2, 1)',
                exit: 'cubic-bezier(0.4, 0, 0.6, 1)'
            }
        }]
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _transitionTypeMap = __webpack_require__(3);

var _transitionTypeMap2 = _interopRequireDefault(_transitionTypeMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transitionPeriod = ['enter', 'exit'];
exports.default = Behavior({
    properties: {
        transitions: {
            type: Array,
            value: []
        },
        transitionDelay: {
            type: Number,
            optionalTypes: [Object],
            value: 0
        },
        transitionDuration: {
            type: Number,
            optionalTypes: [Object],
            value: 225
        },
        transitionType: {
            type: String,
            value: null
        }
    },
    data: {
        _enterStyle: '',
        _exitStyle: '',
        _startStyle: '',
        _endStyle: ''
    },
    methods: {
        ______GenTransitionsStyle: function ______GenTransitionsStyle(transitionProps, keepPrevStyles) {
            this.generatedTransitionStyle = true;
            var newData = {};
            var _transitionProps$tran = transitionProps.transitions,
                transitions = _transitionProps$tran === undefined ? [] : _transitionProps$tran,
                _transitionProps$dela = transitionProps.delay,
                defaultDelay = _transitionProps$dela === undefined ? 0 : _transitionProps$dela,
                _transitionProps$dura = transitionProps.duration,
                defaultDuration = _transitionProps$dura === undefined ? 225 : _transitionProps$dura,
                type = transitionProps.type;

            var defaultTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
            var realTransition = [];
            if (Array.isArray(transitions) && transitions.length > 0) {
                realTransition = transitions;
            } else if (type && _transitionTypeMap2.default[type]) {
                realTransition = _transitionTypeMap2.default[type].transition;
                newData._startStyle = _transitionTypeMap2.default[type].start || (keepPrevStyles ? this.data._startStyle : '');
                newData._endStyle = _transitionTypeMap2.default[type].end || (keepPrevStyles ? this.data._endStyle : '');
            }
            realTransition.forEach(function (item) {
                transitionPeriod.forEach(function (period) {
                    var transitionProps = item;
                    var property = transitionProps.property,
                        _transitionProps$dura2 = transitionProps.duration,
                        duration = _transitionProps$dura2 === undefined ? defaultDuration : _transitionProps$dura2,
                        _transitionProps$dela2 = transitionProps.delay,
                        delay = _transitionProps$dela2 === undefined ? defaultDelay : _transitionProps$dela2,
                        _transitionProps$timi = transitionProps.timingFunction,
                        timingFunction = _transitionProps$timi === undefined ? defaultTimingFunction : _transitionProps$timi;

                    if (property) {
                        var realProperty = property;
                        if (property[period]) {
                            realProperty = property[period];
                        }
                        var realDuration = duration;
                        if (duration[period]) {
                            realDuration = duration[period];
                        }
                        if (typeof realDuration === 'function') {
                            realDuration = realDuration(defaultDuration);
                        }
                        var realDelay = delay;
                        if (delay[period]) {
                            realDelay = delay[period];
                        }
                        if (typeof realDelay === 'function') {
                            realDelay = realDelay(defaultDelay);
                        }
                        var realTimingFunction = timingFunction;
                        if (timingFunction[period]) {
                            realTimingFunction = timingFunction[period];
                        }
                        var thisTransition = realProperty + ' ' + realDuration + 'ms ' + realTimingFunction + ' ' + realDelay + 'ms';
                        if (newData['_' + period + 'Style']) {
                            newData['_' + period + 'Style'] = newData._enterStyle + ', ' + thisTransition;
                        } else {
                            newData['_' + period + 'Style'] = 'transition: ' + thisTransition;
                        }
                    }
                });
            });
            transitionPeriod.forEach(function (period) {
                if (newData['_' + period + 'Style']) {
                    newData['_' + period + 'Style'] = newData['_' + period + 'Style'] + ';';
                }
            });
            if (Object.keys(newData).length > 0) {
                this.setData(newData);
            }
        }
    },
    lifetimes: {
        attached: function attached() {
            if (!this.generatedTransitionStyle) {
                var _data = this.data,
                    transition = _data.transition,
                    transitionDelay = _data.transitionDelay,
                    transitionDuration = _data.transitionDuration,
                    transitionType = _data.transitionType;

                this.______GenTransitionsStyle({
                    transition: transition,
                    delay: transitionDelay,
                    duration: transitionDuration,
                    type: transitionType || undefined
                }, true);
            }
        }
    },
    observers: {
        'transition,transitionDelay,transitionDuration,transitionType': function transitionTransitionDelayTransitionDurationTransitionType(transitions, delay, duration, type) {
            this.______GenTransitionsStyle({
                transitions: transitions,
                delay: delay,
                duration: duration,
                type: type || undefined
            });
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _transition = __webpack_require__(4);

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Behavior({
    behaviors: [_transition2.default],
    properties: {
        autoHideDuration: {
            type: Number,
            value: null
        },
        onClose: {
            // @ts-ignore
            type: Function,
            value: null
        },
        open: {
            type: Boolean,
            value: null
        }
    },
    data: {
        _open: false,
        _show: false
    },
    methods: {
        _close: function _close(e) {
            var onClose = this.data.onClose;

            if (onClose && typeof onClose === 'function') {
                onClose(e, this.dataset);
            }
        }
    },
    observers: {
        open: function open(_open) {
            var _this = this;

            clearTimeout(this.closeTimer);
            clearTimeout(this.openTimer);
            var _data = this.data,
                autoHideDuration = _data.autoHideDuration,
                transitionDuration = _data.transitionDuration;

            if (_open) {
                if (autoHideDuration > 0) {
                    clearTimeout(this.closeTimer);
                    this.closeTimer = setTimeout(function () {
                        _this._close();
                    }, autoHideDuration);
                }
                this.setData({ _open: true }, function () {
                    var needUpdateData = void 0;
                    var _onBeforeShow = _this._onBeforeShow;

                    if (_onBeforeShow && typeof _onBeforeShow === 'function') {
                        var onBeforeShowRes = _onBeforeShow();
                        if (onBeforeShowRes && onBeforeShowRes.then) {
                            onBeforeShowRes.then(function (theNeedUpdateData) {
                                needUpdateData = theNeedUpdateData;
                                if (needUpdateData) {
                                    _this.setData(needUpdateData);
                                }
                                clearTimeout(_this.openTimer);
                                _this.openTimer = setTimeout(function () {
                                    _this.setData({ _show: true });
                                }, 50);
                            }).catch(function (e) {
                                return console.log(e);
                            });
                        } else {
                            needUpdateData = onBeforeShowRes;
                            if (needUpdateData) {
                                _this.setData(needUpdateData);
                            }
                            clearTimeout(_this.openTimer);
                            _this.openTimer = setTimeout(function () {
                                _this.setData({ _show: true });
                            }, 50);
                        }
                    } else {
                        clearTimeout(_this.openTimer);
                        _this.openTimer = setTimeout(function () {
                            _this.setData({ _show: true });
                        }, 50);
                    }
                });
            } else {
                this.setData({ _show: false });
                clearTimeout(this.closeTimer);
                this.closeTimer = setTimeout(function () {
                    _this.setData({ _open: false });
                }, transitionDuration);
            }
        }
    }
});

/***/ })
/******/ ]);