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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Behavior({
    properties: {
        mClass: {
            type: String,
            value: ''
        },
        mStyle: {
            type: String,
            value: ''
        }
    }
});

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var openTypeMap = {
    contact: 'contact',
    getPhoneNumber: 'getphonenumber',
    getUserInfo: 'getuserinfo',
    openSetting: 'opensetting',
    launchApp: 'launchapp'
};
var ObserversForControlledPropsByAncestor = function ObserversForControlledPropsByAncestor(props) {
    var obs = {};
    props.forEach(function (item) {
        obs[item] = function () {
            if (!this._hasAttached) {
                if (!this._propIsSet) {
                    this._propIsSet = {};
                }
                this._propIsSet[item] = true;
            }
        };
    });
    return obs;
};
// 防抖动函数
function debounce(func, wait) {
    var timer = void 0;
    var delay = parseInt(wait, 10) || 0;
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        clearTimeout(timer);
        var content = this;
        timer = setTimeout(function () {
            func.apply(content, args);
        }, delay);
    };
}
exports.debounce = debounce;
exports.openTypeMap = openTypeMap;
exports.ObserversForControlledPropsByAncestor = ObserversForControlledPropsByAncestor;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_muiBase2.default],
    properties: {
        max: {
            type: Number,
            value: 5
        },
        spacing: {
            type: String,
            value: 'medium'
        }
    },
    data: {
        _pureAvatars: [],
        _more: 0,
        _moreStyle: ''
    },
    lifetimes: {
        created: function created() {
            var _this = this;

            if (!this._ArrangeAvatars) {
                this._ArrangeAvatars = (0, _utils.debounce)(function () {
                    var newAvatars = _this.data._pureAvatars;
                    if (newAvatars.length > 0) {
                        var _data = _this.data,
                            max = _data.max,
                            spacing = _data.spacing;

                        var more = 0;
                        var moreStyle = void 0;
                        newAvatars.forEach(function (item, index) {
                            var targetStyles = { 'z-index': 0, 'margin-left': '-8px' };
                            if (index === 0) {
                                targetStyles['margin-left'] = '0';
                            } else if (!Number.isNaN(Number(spacing))) {
                                targetStyles['margin-left'] = '-' + spacing + 'px';
                            } else if (spacing === 'small') {
                                targetStyles['margin-left'] = '-16px';
                            }
                            if (index >= max) {
                                more += 1;
                                targetStyles.display = 'none';
                                if (!moreStyle) {
                                    moreStyle = 'z-index: 0;margin-left: ' + targetStyles['margin-left'] + ';';
                                }
                            } else {
                                targetStyles['z-index'] = max - index;
                            }
                            item._groupControlAction(targetStyles);
                        });
                        _this.setData({
                            _more: more,
                            _moreStyle: moreStyle
                        });
                    }
                }, 50);
            }
        }
    },
    relations: {
        '../avatar/avatar': {
            type: 'child',
            linked: function linked(target) {
                if (target) {
                    this.data._pureAvatars.push(target);
                    this.setData({ _pureAvatars: this.data._pureAvatars });
                }
            },
            unlinked: function unlinked(target) {
                var _targetIndex = this.data._pureAvatars.findIndex(function (item) {
                    return item === target;
                });
                this.data._pureAvatars.splice(_targetIndex, 1);
                this.setData({ _pureAvatars: this.data._pureAvatars });
            }
        }
    },
    observers: {
        'max, spacing, _pureAvatars': function maxSpacing_pureAvatars() {
            if (this._ArrangeAvatars) {
                this._ArrangeAvatars();
            }
        }
    },
    options: {
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ })

/******/ });