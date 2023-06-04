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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
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

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_muiBase2.default],
    properties: {
        avatar: {
            type: String,
            optionalTypes: [Object],
            value: null
        },
        clickable: {
            type: Boolean,
            value: false
        },
        color: {
            type: String,
            value: 'default'
        },
        deleteIcon: {
            type: String,
            value: null
        },
        disabled: {
            type: Boolean,
            value: false
        },
        icon: {
            type: String,
            optionalTypes: [Object],
            value: null
        },
        label: {
            type: String,
            value: null
        },
        onClick: {
            // @ts-ignore
            type: Function,
            value: null
        },
        onDelete: {
            // @ts-ignore
            type: Function,
            value: null
        },
        size: {
            type: String,
            value: 'medium'
        },
        variant: {
            type: String,
            value: 'default'
        }
    },
    data: {
        _avatarIcon: '',
        _avatarIconStyle: '',
        _hasDelete: false
    },
    methods: {
        _Click: function _Click(e) {
            var onClick = this.data.onClick;

            if (onClick && typeof onClick === 'function') {
                onClick(e, this.dataset);
            }
        },
        _delete: function _delete(e) {
            var onDelete = this.data.onDelete;

            if (onDelete && typeof onDelete === 'function') {
                onDelete(e, this.dataset);
            }
        }
    },
    observers: {
        avatar: function avatar(_avatar) {
            var _avatarIcon = '';
            var _avatarText = '';
            var _avatarSrc = '';
            var _avatarIconStyle = '';
            if (_avatar) {
                if (_avatar.src) {
                    _avatarSrc = _avatar.src;
                } else if (_avatar.icon) {
                    _avatarIcon = _avatar.icon;
                    _avatarIconStyle = 'icon';
                } else if (typeof _avatar === 'string') {
                    _avatarIcon = _avatar;
                    _avatarIconStyle = 'icon';
                } else if (_avatar.text && typeof _avatar.text === 'string') {
                    _avatarText = _avatar.text;
                }
            }
            this.setData({
                _avatarIcon: _avatarIcon,
                _avatarText: _avatarText,
                _avatarSrc: _avatarSrc,
                _avatarIconStyle: _avatarIconStyle
            });
        },
        onDelete: function onDelete(_onDelete) {
            if (_onDelete) {
                this.setData({ _hasDelete: true });
            } else {
                this.setData({ _hasDelete: false });
            }
        }
    },
    options: {
        virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ })

/******/ });