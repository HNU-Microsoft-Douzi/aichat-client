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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var styleProps = ['color', 'variant', 'size'];
exports.default = Behavior({
    data: {
        muiClasses: ''
    },
    lifetimes: {
        attached: function attached() {
            if (!this._firstOberverForMuiClass) {
                var _data = this.data,
                    color = _data.color,
                    variant = _data.variant,
                    size = _data.size,
                    mClass = _data.mClass;

                this._defindMuiBehaviors({
                    color: color,
                    variant: variant,
                    size: size,
                    mClass: mClass
                });
            }
        }
    },
    methods: {
        _defindMuiBehaviors: function _defindMuiBehaviors() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            /** 整合所有样式 */
            var newData = {};
            var muiClassesArr = [];
            styleProps.forEach(function (sp) {
                muiClassesArr.push(params[sp] ? 'mui-' + sp + '-' + params[sp] : '');
            });
            if (params.mClass) {
                muiClassesArr.push(params.mClass);
            }
            newData.muiClasses = muiClassesArr.join(' ');
            this.setData(newData);
        }
    },
    observers: {
        'color, variant, size, mClass': function colorVariantSizeMClass(color, variant, size, mClass) {
            this._firstOberverForMuiClass = true;
            this._defindMuiBehaviors({
                color: color,
                variant: variant,
                size: size,
                mClass: mClass
            });
        }
    }
});

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _muiController = __webpack_require__(2);

var _muiController2 = _interopRequireDefault(_muiController);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_muiBase2.default, _muiController2.default],
    properties: {
        color: {
            type: String,
            value: 'default'
        },
        disabled: {
            type: Boolean,
            value: false
        },
        disableElevation: {
            type: Boolean,
            value: false
        },
        disableRipple: {
            type: Boolean,
            value: false
        },
        fullWidth: {
            type: Boolean,
            value: false
        },
        orientation: {
            type: String,
            value: 'horizontal'
        },
        size: {
            type: String,
            value: 'medium'
        },
        variant: {
            type: String,
            value: 'outlined'
        }
    },
    data: {
        _pureButtons: []
    },
    lifetimes: {
        created: function created() {
            var _this = this;

            if (!this._ArrangeButtons) {
                this._ArrangeButtons = (0, _utils.debounce)(function () {
                    var newButtons = _this.data._pureButtons;
                    if (newButtons.length > 0) {
                        newButtons.forEach(function (item) {
                            item._ReRenderControlledProps();
                        });
                    }
                }, 50);
            }
        }
    },
    relations: {
        '../button/button': {
            type: 'child',
            linked: function linked(target) {
                if (target) {
                    this.data._pureButtons.push(target);
                    this.setData({ _pureButtons: this.data._pureButtons });
                }
            },
            unlinked: function unlinked(target) {
                var _targetIndex = this.data._pureButtons.findIndex(function (item) {
                    return item === target;
                });
                this.data._pureButtons.splice(_targetIndex, 1);
                this.setData({ _pureButtons: this.data._pureButtons });
            }
        }
    },
    observers: {
        'color, disabled, disableElevation, disableRipple, size, variant, _pureButtons': function colorDisabledDisableElevationDisableRippleSizeVariant_pureButtons() {
            if (this._ArrangeButtons) {
                this._ArrangeButtons();
            }
        }
    },
    options: {
        // virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ })

/******/ });