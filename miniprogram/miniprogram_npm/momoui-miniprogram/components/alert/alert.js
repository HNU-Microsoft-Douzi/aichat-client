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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var severity2icon = {
    success: 'checkbox-marked-circle-outline',
    info: 'info-outline',
    warning: 'alert-outline',
    error: 'alert-circle-outline'
};
Component({
    behaviors: [_muiBase2.default],
    properties: {
        closeText: {
            type: String,
            value: null
        },
        closeIcon: {
            type: String,
            optionalTypes: [Object],
            value: null
        },
        color: {
            type: String,
            value: null
        },
        icon: {
            type: Boolean,
            optionalTypes: [String, Object],
            value: null
        },
        message: {
            type: String
        },
        onClose: {
            // @ts-ignore
            type: Function,
            value: null
        },
        severity: {
            type: String,
            value: 'success'
        },
        title: {
            type: String,
            value: null
        },
        variant: {
            type: String,
            value: 'standard'
        }
    },
    data: {
        _hasAction: false,
        _showIconStyle: ''
    },
    lifetimes: {
        attached: function attached() {
            var _data = this.data,
                icon = _data.icon,
                color = _data.color;

            if (typeof icon !== 'boolean' && !icon) {
                this._setIcon(color);
            }
        }
    },
    methods: {
        _setIcon: function _setIcon(severity) {
            this.setData({ icon: severity2icon[severity] || 'success' });
        },
        _close: function _close(e) {
            var onClose = this.data.onClose;

            if (onClose && typeof onClose === 'function') {
                onClose(e, this.dataset);
            }
        }
    },
    observers: {
        'icon, severity': function iconSeverity(icon, severity) {
            if (typeof icon !== 'boolean' && !icon) {
                this._setIcon(severity);
            }
            if (typeof icon === 'boolean' && !icon) {
                this.setData({ _showIconStyle: 'display: none;' });
            }
        },
        'onClose, closeText': function onCloseCloseText(onClose, closeText) {
            if (onClose || closeText) {
                this.setData({ _hasAction: true });
            } else {
                this.setData({ _hasAction: false });
            }
        }
    },
    options: {
        virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared',
        multipleSlots: true
    }
});

/***/ })

/******/ });