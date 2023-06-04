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
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
/******/ })
/************************************************************************/
/******/ ({

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Component({
  data: {
    rippleArray: [],
    width: 0,
    height: 0,
    radius: 0,
    backgroundColor: null
  },
  /*
  lifetimes: {
    attached() {
      this.setData({
        _getRippleItemNode: this._getRippleItemNode.bind(this),
      })
    },
  },
  */
  methods: {
    /*
    _getRippleItemNode(rippleItem) {
      console.log('getRef', rippleItem)
      if (!this._rippleItemMap) {
        this._rippleItemMap = {}
      }
      this._rippleItemMap[rippleKey] = rippleItem
      this._currentRippleItem = rippleItem
    },
    _RippleEnd() {
      console.log('ripple end', this._currentRippleItem)
      if (this._rippleItem) {
        this._rippleItem._RippleEnd()
      }
      if (this._currentRippleItem) {
        this._currentRippleItem._RippleEnd()
      }
    },
    */
    _RippleAction: function _RippleAction(params) {
      var width = params.width,
          height = params.height,
          left = params.left,
          top = params.top,
          borderRadius = params.borderRadius,
          scrollLeft = params.scrollLeft,
          scrollTop = params.scrollTop,
          backgroundColor = params.backgroundColor,
          x = params.x,
          y = params.y,
          _params$center = params.center,
          center = _params$center === undefined ? false : _params$center;

      var radius = Math.max(width, height);
      var rippleX = void 0;
      var rippleY = void 0;
      if (center) {
        rippleX = width / 2 - radius / 2;
        rippleY = height / 2 - radius / 2;
      } else {
        rippleX = x - (left + scrollLeft) - radius / 2;
        rippleY = y - (top + scrollTop) - radius / 2;
      }
      this.data.rippleArray.push({
        key: 'ripple-' + new Date().getTime() + '-' + Math.round(Math.random() * 10000),
        x: rippleX,
        y: rippleY
      });
      var newData = {
        rippleArray: this.data.rippleArray,
        width: width,
        height: height,
        radius: radius,
        borderRadius: borderRadius
      };
      if (backgroundColor) {
        newData.backgroundColor = backgroundColor;
      }
      this.setData(newData);
    },

    /* 暂时注销
    _updateRippleArray: debounce(function () {
      this.setData({
        rippleArray: this.data.rippleArray
      })
    }, 1000),
    */
    _clearRippleAction: function _clearRippleAction(e) {
      var rippleKey = e.detail.rippleKey;

      var tobeDeleteIndex = this.data.rippleArray.findIndex(function (item) {
        return item.key === rippleKey;
      });
      this.data.rippleArray.splice(tobeDeleteIndex, 1);
      /*
      if (this._rippleItemMap) {
        delete this._rippleItemMap[rippleKey]
      }
      */
      /**
       *  this._updateRippleArray()
       *  使用debounce防抖可以减少短时间内大量不必要的setData
       *  但此处暂时不使用_updateRippleArray
       *  因为当ripple动画还未完成时，若组件的属性被人为更改（重新渲染）
       *  clear rippleArray后再调用_updateRippleArray无效，无法将ripple删掉
       *  这里就在下面直接setData了
       * */
      /*
      this.setData({
        rippleArray: this.data.rippleArray
      })
      */
    }
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared'
  }
});

/***/ })

/******/ });