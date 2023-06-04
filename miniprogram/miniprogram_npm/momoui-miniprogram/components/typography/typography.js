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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _muiController = __webpack_require__(2);

var _muiController2 = _interopRequireDefault(_muiController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_muiBase2.default, _muiController2.default],
    properties: {
        align: {
            type: String,
            value: 'inherit'
        },
        color: {
            type: String,
            value: 'initial'
        },
        display: {
            type: String,
            value: 'initial'
        },
        gutterBottom: {
            type: Boolean,
            value: false
        },
        noWrap: {
            type: Boolean,
            value: false
        },
        paragraph: {
            type: Boolean,
            value: false
        },
        variant: {
            type: String,
            value: 'body1'
        }
    },
    options: {
        virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

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

/***/ })

/******/ });