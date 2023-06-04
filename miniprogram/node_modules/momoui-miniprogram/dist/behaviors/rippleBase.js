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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Behavior({
    properties: {
        disableRipple: {
            type: Boolean,
            value: false
        },
        centerRipple: {
            type: Boolean,
            value: false
        },
        rippleColor: {
            type: String,
            value: ''
        }
    },
    data: {
        _rippleList: [],
        _rpcStyle: {
            width: 0,
            height: 0,
            borderRadius: 0,
            radius: 0
        }
    },
    methods: {
        _RippleAction: function _RippleAction(rippleParams) {
            var _this = this;

            var _data = this.data,
                disableRipple = _data.disableRipple,
                disabled = _data.disabled;

            if (!disableRipple && !disabled) {
                var _data2 = this.data,
                    _rippleList = _data2._rippleList,
                    _rpcStyle = _data2._rpcStyle,
                    centerRipple = _data2.centerRipple;

                var newData = {};
                var newRpcStyles = {};
                Object.keys(_rpcStyle).forEach(function (styleKey) {
                    newRpcStyles[styleKey] = rippleParams[styleKey];
                });
                if (Object.keys(newRpcStyles).length > 0) {
                    newData._rpcStyle = newRpcStyles;
                }
                var query = this.createSelectorQuery();
                query.select('.mui-ripple-base').fields({
                    rect: true
                });
                query.selectViewport().scrollOffset();
                query.exec(function (res) {
                    var _ref = res || {},
                        view = _ref[0],
                        viewport = _ref[1];

                    var _ref2 = view || {},
                        _ref2$left = _ref2.left,
                        left = _ref2$left === undefined ? 0 : _ref2$left,
                        _ref2$top = _ref2.top,
                        top = _ref2$top === undefined ? 0 : _ref2$top;

                    var _ref3 = viewport || {},
                        _ref3$scrollLeft = _ref3.scrollLeft,
                        scrollLeft = _ref3$scrollLeft === undefined ? 0 : _ref3$scrollLeft,
                        _ref3$scrollTop = _ref3.scrollTop,
                        scrollTop = _ref3$scrollTop === undefined ? 0 : _ref3$scrollTop;

                    var rippleX = void 0;
                    var rippleY = void 0;
                    if (centerRipple) {
                        rippleX = rippleParams.centerX;
                        rippleY = rippleParams.centerY;
                    } else {
                        rippleX = rippleParams.x - (left + scrollLeft) - rippleParams.radius / 2;
                        rippleY = rippleParams.y - (top + scrollTop) - rippleParams.radius / 2;
                    }
                    _rippleList.push({
                        key: rippleParams.key,
                        x: rippleX,
                        y: rippleY,
                        rippleClass: rippleParams.rippleClass
                    });
                    newData._rippleList = _rippleList;
                    _this.setData(newData);
                });
            }
        },
        _RippleEnd: function _RippleEnd(_ref4) {
            var key = _ref4.key,
                _ref4$rippleClass = _ref4.rippleClass,
                rippleClass = _ref4$rippleClass === undefined ? '' : _ref4$rippleClass;

            if (key) {
                var endRippleIndex = this.data._rippleList.findIndex(function (item) {
                    return item.key === key;
                });
                if (endRippleIndex > -1) {
                    var _setData;

                    this.setData((_setData = {}, _setData['_rippleList[' + endRippleIndex + '].rippleClass'] = rippleClass, _setData));
                }
            }
        },
        _RippleAnimationEnd: function _RippleAnimationEnd(e) {
            var animationName = e.detail.animationName,
                key = e.target.dataset.key;

            if (key && animationName !== 'rippleLongpress') {
                var tobeDeleteIndex = this.data._rippleList.findIndex(function (item) {
                    return item.key === key;
                });
                this.data._rippleList.splice(tobeDeleteIndex, 1);
            }
        }
        /*
        _RippleAction(e) {
          const {disableRipple} = this.data
          const {disabled} = this.data
          if (!disableRipple && !disabled) {
            if (!this._muiRippleContainer) {
              const _muiRippleContainer = this.selectComponent('._mui-ripple-container')
              this._muiRippleContainer = _muiRippleContainer
            }
            if (this._muiRippleContainer) {
              const {pageX: x, pageY: y} = e.changedTouches[0]
              const query = this.createSelectorQuery()
              query.select('.mui-ripple-base').fields({
                size: true,
                rect: true,
                computedStyle: ['borderRadius']
              })
              query.selectViewport().scrollOffset()
              query.exec((res) => {
                const [view, viewPort] = res || {}
                const {
                  width = 0,
                  height = 0,
                  left = 0,
                  top = 0,
                  borderRadius = 0,
                } = view || {}
                if (width > 0 && height > 0) {
                  const {scrollLeft = 0, scrollTop = 0} = viewPort || {}
                  const {rippleColor} = this.data
                  this._muiRippleContainer._RippleAction({
                    width,
                    height,
                    left,
                    top,
                    borderRadius,
                    scrollLeft,
                    scrollTop,
                    backgroundColor: rippleColor,
                    x,
                    y,
                    center: this.data.centerRipple,
                  })
                }
              })
            }
          }
        }
        */

    }
});

/***/ })

/******/ });