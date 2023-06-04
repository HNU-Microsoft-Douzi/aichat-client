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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
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

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _observers;

var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridStylesMap = {
    alignContent: 'align-content',
    alignItems: 'align-items',
    direction: 'flex-direction',
    justify: 'justify-content',
    wrap: 'flex-wrap'
};
var gridClassesMap = {
    container: 'container',
    item: 'item',
    spacing: 'spacing-',
    xs: 'xs-',
    sm: 'sm-',
    md: 'md-',
    lg: 'lg-',
    xl: 'xl-'
};
Component({
    behaviors: [_muiBase2.default],
    properties: {
        alignContent: {
            type: String,
            value: 'stretch'
        },
        alignItems: {
            type: String,
            value: 'stretch'
        },
        container: {
            type: Boolean,
            value: false
        },
        direction: {
            type: String,
            value: 'row'
        },
        item: {
            type: Boolean,
            value: false
        },
        justify: {
            type: String,
            value: 'flex-start'
        },
        spacing: {
            type: Number,
            value: 0
        },
        wrap: {
            type: String,
            value: 'wrap'
        },
        xs: {
            type: Boolean,
            optionalTypes: [Number, String],
            value: false
        },
        sm: {
            type: Boolean,
            optionalTypes: [Number, String],
            value: false
        },
        md: {
            type: Boolean,
            optionalTypes: [Number, String],
            value: false
        },
        lg: {
            type: Boolean,
            optionalTypes: [Number, String],
            value: false
        },
        xl: {
            type: Boolean,
            optionalTypes: [Number, String],
            value: false
        },
        zeroMinWidth: {
            type: Boolean,
            value: false
        }
    },
    data: {
        _innerStyles: '',
        _innerClasses: ''
    },
    attached: function attached() {
        var _data = this.data,
            alignContent = _data.alignContent,
            alignItems = _data.alignItems,
            direction = _data.direction,
            justify = _data.justify,
            wrap = _data.wrap,
            container = _data.container,
            item = _data.item,
            spacing = _data.spacing,
            xs = _data.xs,
            sm = _data.sm,
            md = _data.md,
            lg = _data.lg,
            xl = _data.xl;

        this._defineGridClasses({
            container: container,
            item: item,
            spacing: spacing,
            xs: xs,
            sm: sm,
            md: md,
            lg: lg,
            xl: xl
        });
        this._defineGridStyles({
            alignContent: alignContent, alignItems: alignItems, direction: direction, justify: justify, wrap: wrap
        });
    },

    methods: {
        _defineGridClasses: function _defineGridClasses() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var _innerClasses = '';
            Object.keys(gridClassesMap).forEach(function (prop) {
                if (gridClassesMap[prop].slice(-1) === '-') {
                    if (prop === 'spacing' && params.container || prop !== 'spacing' && params[prop]) {
                        _innerClasses = '' + _innerClasses + gridClassesMap[prop] + params[prop] + ' ';
                    }
                } else if (typeof params[prop] === 'boolean' && params[prop]) {
                    _innerClasses = '' + _innerClasses + gridClassesMap[prop] + ' ';
                }
            });
            this.setData({
                _innerClasses: _innerClasses
            });
        },
        _defineGridStyles: function _defineGridStyles() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var _innerStyles = '';
            Object.keys(gridStylesMap).forEach(function (prop) {
                if (params[prop]) {
                    _innerStyles = '' + _innerStyles + gridStylesMap[prop] + ':' + params[prop] + ';';
                }
            });
            this.setData({
                _innerStyles: _innerStyles
            });
        }
    },
    observers: (_observers = {}, _observers[Object.keys(gridStylesMap).join(',')] = function (alignContent, alignItems, direction, justify, wrap) {
        this._defineGridStyles({
            alignContent: alignContent, alignItems: alignItems, direction: direction, justify: justify, wrap: wrap
        });
    }, _observers[Object.keys(gridClassesMap).join(',')] = function (container, item, spacing, xs, sm, md, lg, xl) {
        this._defineGridClasses({
            container: container,
            item: item,
            spacing: spacing,
            xs: xs,
            sm: sm,
            md: md,
            lg: lg,
            xl: xl
        });
    }, _observers),
    options: {
        virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ })

/******/ });