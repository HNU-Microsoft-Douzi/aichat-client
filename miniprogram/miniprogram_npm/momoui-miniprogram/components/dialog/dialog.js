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
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
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

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_muiBase2.default],
    properties: {
        actions: {
            type: Object,
            value: null
        },
        content: {
            type: String,
            value: null
        },
        disableBackdropClick: {
            type: Boolean,
            value: false
        },
        fullScreen: {
            type: Boolean,
            value: false
        },
        fullWidth: {
            type: Boolean,
            value: false
        },
        maxWidth: {
            type: Boolean,
            optionalTypes: [String],
            value: false
        },
        onBackdropClick: {
            // @ts-ignore
            type: Function,
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
        },
        scroll: {
            type: String,
            value: 'paper'
        },
        title: {
            type: String,
            value: null
        },
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
        }
    },
    methods: {
        _ClickDialogContent: function _ClickDialogContent() {},
        _confirm: function _confirm(e) {
            var actions = this.data.actions;

            if (actions && actions.onConfirm && typeof actions.onConfirm === 'function') {
                actions.onConfirm(e);
            }
        },
        _Cancel: function _Cancel(e) {
            var actions = this.data.actions;

            if (actions && actions.onCancel && typeof actions.onCancel === 'function') {
                actions.onCancel(e);
            }
        }
    },
    observers: {},
    options: {
        virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ })

/******/ });