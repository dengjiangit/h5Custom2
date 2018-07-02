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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 291);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(43);
var hide = __webpack_require__(31);
var redefine = __webpack_require__(32);
var ctx = __webpack_require__(44);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(34);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.addNewPageData = addNewPageData;
exports.getViewDom = getViewDom;
exports.getPageListDom = getPageListDom;
exports.copyPageData = copyPageData;
exports.pushLayerData = pushLayerData;
exports.setPageClass = setPageClass;
exports.getPageClass = getPageClass;
exports.setLayerClass = setLayerClass;
exports.getLayerClass = getLayerClass;
exports.getDataLayers = getDataLayers;
exports.getDataLayer = getDataLayer;
exports.getDataPage = getDataPage;
exports.getNowPage = getNowPage;
exports.removeDataPage = removeDataPage;
exports.removeDataLayer = removeDataLayer;
exports.setDataApp = setDataApp;
exports.setAppDataEdit = setAppDataEdit;
exports.AppDataChange = AppDataChange;
exports.saveHistory = saveHistory;

var _localStorage = __webpack_require__(111);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 添加新的页面
// obj.index 插入位置， obj.page 插入页面， obj.pageName 页面名字
function addNewPageData(obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object') {
        return;
    }
    var index = obj['index'] || AppData.data[AppData.edit.pageType].length + 1;

    // slider 继承上一次
    var page = obj.page;
    AppData.data[AppData.edit.pageType].splice(index, 0, page);
    AppDataChange();
}

// 获取view 对象
// 获取当前的 view 区域对象
function getViewDom() {
    var $view = null;
    if (AppData.edit.pageType === 'pages') {
        $view = $('#pageView');
    } else if (AppData.edit.pageType === 'popups') {
        $view = $('#pageViewPopup');
    } else if (AppData.edit.pageType === 'fixeds') {
        $view = $('#pageViewFixed');
    } else {
        // ... 其他
    }
    return $view;
}

// 获取当前的 getPageListDom
function getPageListDom() {
    var $list = null;
    if (AppData.edit.pageType === 'pages') {
        $list = $('#pagesList');
    } else if (AppData.edit.pageType === 'popups') {
        $list = $('#popupsList');
    } else if (AppData.edit.pageType === 'fixeds') {
        $list = $('#fixedsList');
    } else {
        // ... 其他
    }
    return $list;
}

// 复制页面
function copyPageData(index) {
    var page = JSON.parse((0, _stringify2.default)(AppData.data[AppData.edit.pageType][index - 1]));
    AppData.data[AppData.edit.pageType].splice(index, 0, page);
    AppDataChange();
}

// 插入layer
function pushLayerData(obj, Page) {
    var layers = getDataLayers(); // 数组

    // 如果 layers 没有
    if (!layers) {
        $.tip({
            msg: '请先新建页面', //
            type: 'danger', //success,danger,warning
            time: 3000 //
        });
        return;
    }

    // 在前面插入
    layers.splice(0, 0, obj);
    // console.log(layers, AppData.edit.pageIndex)
    // 重置layers
    Page[Page.className].layers = layers;
    AppDataChange();
}

// 设置 page 类
function setPageClass(self) {
    console.log('setPageClass', self.className);
    AppData.edit.pageClass = self;
    AppData.edit.pageType = self.className + 's'; // 设置类型
}

// 获取当前编辑的页面的 类
function getPageClass() {
    return AppData.edit.pageClass;
}

// 设置 layer 类
function setLayerClass(self) {
    AppData.edit.layerClass = self;
}

function getLayerClass() {
    return AppData.edit.layerClass;
}

//获取 当前页面的 layers
function getDataLayers() {
    var page = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex] || [];
    return page.layers;
}

//获取 当前页面的 layer
function getDataLayer() {
    return AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[AppData.edit.layerIndex];
}

//获取 index  页面
function getDataPage(index) {
    return AppData.data[AppData.edit.pageType][index];
}

// 获取当前page
function getNowPage() {
    var page = null;
    if (AppData.edit.pageIndex !== null) {
        page = getDataPage(AppData.edit.pageIndex);
    }
    return page;
}

// 删除 index 的 页面
function removeDataPage(index) {
    AppData.data[AppData.edit.pageType].remove(index);
    AppDataChange();
}

// 删除 对应 page 下面的 index
function removeDataLayer(index) {
    var cName = AppData.edit.pageType;
    AppData.data[cName][AppData.edit.pageIndex].layers.remove(index);
    AppDataChange();
}

// 设置 app 其他参数 name, info, img
function setDataApp(obj) {
    if (obj.name) {
        AppData.data.name = obj.name;
    }
    if (obj.info) {
        AppData.data.info = obj.info;
    }
    if (obj.img) {
        AppData.data.img = obj.img;
    }
    AppDataChange();
}

// 设置 AppData.edit
function setAppDataEdit(obj, change) {
    for (var key in obj) {
        AppData.edit[key] = obj[key];
    }
    if (change === true) {
        AppDataChange();
    }
}

// 变化监听
function AppDataChange() {
    (0, _localStorage.setStorage)('APP_DATA', AppData.data);
    $(document).trigger('appDataChange', true);
    console.log('app data 改变, 设置缓存');
}

// 存个历史记录，自动监听了输入框，表单的历史记录，其他历史记录需要手动加入
function saveHistory() {
    var cName = AppData.edit.pageType;
    var index = AppData.edit.pageIndex;
    var page = AppData.data[cName][index];
    // 删除之前先存个历史记录
    AppData.edit.history.push((0, _stringify2.default)({
        page: page,
        index: index
    }));
}

// // 
// window.AppData = new Proxy(AppData, {
//   set: function (target, key, value, receiver) {
//     console.log(`setting ${key}!`);
//     return Reflect.set(target, key, value, receiver);
//   }
// });

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(58)('wks');
var uid = __webpack_require__(36);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var scale = 1;
var winWidth = $(window).width();
if (winWidth >= 1920) {
    scale = 1.5;
} else if (winWidth >= 1600) {
    scale = 1.2;
} else {}
// ...


// 全局方法
var g = {
    $doc: $(document), // 存成变量，方便打包压缩
    scale: scale // 默认phone 的缩放
};

exports.default = g;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var ctx = __webpack_require__(22);
var hide = __webpack_require__(16);
var has = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(90);
var toPrimitive = __webpack_require__(67);
var dP = Object.defineProperty;

exports.f = __webpack_require__(15) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(148)('wks');
var uid = __webpack_require__(81);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(25)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var createDesc = __webpack_require__(35);
module.exports = __webpack_require__(15) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(248);
var toPrimitive = __webpack_require__(50);
var dP = Object.defineProperty;

exports.f = __webpack_require__(17) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(52);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(51);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(42);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(108);
var defined = __webpack_require__(48);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(209);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(18);
var createDesc = __webpack_require__(80);
module.exports = __webpack_require__(17) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var hide = __webpack_require__(31);
var has = __webpack_require__(38);
var SRC = __webpack_require__(81)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(43).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(7);
var defined = __webpack_require__(51);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(11).f;
var has = __webpack_require__(20);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(118);
var defined = __webpack_require__(51);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(119);
var createDesc = __webpack_require__(80);
var toIObject = __webpack_require__(39);
var toPrimitive = __webpack_require__(50);
var has = __webpack_require__(38);
var IE8_DOM_DEFINE = __webpack_require__(248);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(17) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(38);
var toObject = __webpack_require__(21);
var IE_PROTO = __webpack_require__(166)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(26);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(7);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(58)('keys');
var uid = __webpack_require__(36);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(43);
var fails = __webpack_require__(7);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(44);
var IObject = __webpack_require__(118);
var toObject = __webpack_require__(21);
var toLength = __webpack_require__(19);
var asc = __webpack_require__(183);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13);
var dPs = __webpack_require__(125);
var enumBugKeys = __webpack_require__(59);
var IE_PROTO = __webpack_require__(49)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(55)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(93).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(47);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(30) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 59 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(213), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(216);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(220);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(17)) {
  var LIBRARY = __webpack_require__(71);
  var global = __webpack_require__(6);
  var fails = __webpack_require__(7);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(159);
  var $buffer = __webpack_require__(189);
  var ctx = __webpack_require__(44);
  var anInstance = __webpack_require__(87);
  var propertyDesc = __webpack_require__(80);
  var hide = __webpack_require__(31);
  var redefineAll = __webpack_require__(89);
  var toInteger = __webpack_require__(52);
  var toLength = __webpack_require__(19);
  var toIndex = __webpack_require__(274);
  var toAbsoluteIndex = __webpack_require__(83);
  var toPrimitive = __webpack_require__(50);
  var has = __webpack_require__(38);
  var classof = __webpack_require__(120);
  var isObject = __webpack_require__(8);
  var toObject = __webpack_require__(21);
  var isArrayIter = __webpack_require__(180);
  var create = __webpack_require__(84);
  var getPrototypeOf = __webpack_require__(41);
  var gOPN = __webpack_require__(85).f;
  var getIterFn = __webpack_require__(182);
  var uid = __webpack_require__(81);
  var wks = __webpack_require__(12);
  var createArrayMethod = __webpack_require__(54);
  var createArrayIncludes = __webpack_require__(149);
  var speciesConstructor = __webpack_require__(156);
  var ArrayIterators = __webpack_require__(185);
  var Iterators = __webpack_require__(105);
  var $iterDetect = __webpack_require__(153);
  var setSpecies = __webpack_require__(86);
  var arrayFill = __webpack_require__(184);
  var arrayCopyWithin = __webpack_require__(264);
  var $DP = __webpack_require__(18);
  var $GOPD = __webpack_require__(40);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(269);
var $export = __webpack_require__(0);
var shared = __webpack_require__(148)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(272))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(190);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(192);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(10);
var redefine = __webpack_require__(91);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(23);
var $iterCreate = __webpack_require__(124);
var setToStringTag = __webpack_require__(37);
var getPrototypeOf = __webpack_require__(94);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(92);
var enumBugKeys = __webpack_require__(59);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(48);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(81)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(38);
var setDesc = __webpack_require__(18).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(7)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(12)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(31)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initControl = initControl;
exports.layerShow = layerShow;
exports.uniqendLayer = uniqendLayer;

var _basicTpl = __webpack_require__(107);

var _basicMoreTpl = __webpack_require__(134);

var _AppDataFun = __webpack_require__(1);

//初始化控制器
// 通过 AppData里面的 参数 自动实例化
//基础模版
function initControl(self) {

    var $pageView = (0, _AppDataFun.getViewDom)();
    var $nowlayer = $pageView.find('.layer').eq(AppData.edit.layerIndex);

    var $control = $pageView.find('.mt-control');
    var style = self[self.className].style;

    //先注销之前的控制器
    if ($control[0]) {
        $control.remove();
        $control = null;
    }

    //初始化当前的控制器
    $nowlayer.control({
        movex: true,
        movey: true,
        rotate: true,
        autosize: true,
        fixedsize: true
    });

    //控制器事件绑定
    $nowlayer.off('change').on('change', function (e, data) {
        // 如果data没值，说明是点击事件，直接跳过
        if (!data) {
            return;
        }

        // 设置 style 对象
        for (var key in data) {
            if (key === 'rotate') {
                // 迭代中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理
                style['transform'] = 'rotate(' + data[key] + ')';
            } else {
                style[key] = parseInt(data[key], 10) + 'px';
            }
        }

        // 如果是旋转
        if (data['rotate']) {
            // 同步 transform
            (0, _basicMoreTpl.asyncRotate)(style);
        } else {
            // 同步基本设置
            (0, _basicTpl.asyncBasic)(style);
        }

        // 监听变化
        (0, _AppDataFun.AppDataChange)();
    });
}

/**
 * 控制layer 设置区域的隐藏，显示
 */
// 拓展模版
function layerShow(dom) {
    //显示layer or 隐藏app设区域
    $('.setlayer').hide();
    // if(dom === '#setAppBox') {
    //     // 清空AppData.edit
    //     AppData.edit = Object.assign(AppData.edit, {
    //         pageIndex: null, // 默认编辑页面 index
    //         pageClass: null, //当前编辑的 page 类
    //         layerIndex: null, // 默认选中的layer index
    //         layerDom: null, // 当前编辑的layer Dom对象
    //         layerClass: null // 当前编辑的layer 类
    //     });
    // }
    $(dom).show();
}

/**
 * @desc layer 排序
 * @param self 当前的page 类
 * @param data {from: 0, to: 2}
*/
function uniqendLayer(self, data) {
    console.log('排序', data);

    // 存个历史记录
    (0, _AppDataFun.saveHistory)();

    //交换layers。需要重新排序 from 变成了 to， 但是 from - to 中间这段，都加了1
    var arr = self[self.className].layers;
    var fromData = arr[data.from];

    // 从下往上
    if (data.from > data.to) {
        for (var _i = 0; _i < data.from - data.to; _i++) {
            var index = data.from - _i;
            arr[index] = arr[index - 1];
            console.log('排序次数', index, index - 1);
        }
    } else {
        // 从上往下
        for (var _i2 = 0; _i2 < data.to - data.from; _i2++) {
            var _index = data.from + _i2;
            arr[_index] = arr[_index + 1];
            console.log('排序次数', _index, _index + 1);
        }
    }
    console.log('排序次数', data.from, data.to);
    arr[data.to] = fromData;

    //设置z-index 属性 . 备注：这里 z-index 最大为9999
    for (var i = 0; i < arr.length; i++) {
        arr[i].style['z-index'] = 9999 - i;
    }

    //重新渲染viewPage， 重新渲染必须在 self.newLayer 之前，因为 newLayer 里面会设置 AppData.edit.layerDom 
    self.initPageDom();

    //渲染控制器
    var $active = $('#layerlist').find('.active');
    if ($active[0]) {
        var _index2 = $active.index();
        //new layer
        self.newLayer(_index2);
    }

    // 重新渲染列表
    // self.initLayerList();

    (0, _AppDataFun.AppDataChange)();
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(123)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(66)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(136);

var _promise2 = _interopRequireDefault(_promise);

exports.openDB = openDB;
exports.deleteDB = deleteDB;
exports.closeDB = closeDB;
exports.addData = addData;
exports.putData = putData;
exports.getDataByKey = getDataByKey;
exports.getAllData = getAllData;
exports.deleteData = deleteData;
exports.clearData = clearData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 关系型数据库 
// @param INDEXEDDB_DB : 全局的数据库实例化对象
var conf = {
    name: 'H5DS', // 数据库名字
    version: 1, // 版本
    ojstore: {
        "img": { keyPath: "id" // 主健id
        } }
};

/**
 * 打开数据库
 */
function openDB() {

    return new _promise2.default(function (resolve, reject) {
        var indexedDB = window.indexedDB || window.webkitindexedDB;
        var request = indexedDB.open(conf.name);

        request.onerror = function (e) {
            console.error(e.currentTarget.error.message);
            reject(false);
        };
        request.onsuccess = function (e) {
            window.INDEXEDDB_DB_RET = e.target.result;
            console.log('成功建立并打开数据库:' + conf.name + ' version' + conf.version);
            resolve(true);
        };
        request.onupgradeneeded = function (e) {
            var db = e.target.result;
            var transaction = e.target.transaction;

            for (var key in conf.ojstore) {
                if (!db.objectStoreNames.contains(key)) {
                    //没有该对象空间时创建该对象空间
                    db.createObjectStore(key, conf.ojstore[key]);
                    console.log('成功建立对象存储空间：' + key);
                }
            }
        };
        window.INDEXEDDB_DB = indexedDB;
    });
}

/**
 * 删除数据库
 */
function deleteDB(dbname) {
    var self = this;
    INDEXEDDB_DB.deleteDatabase(dbname);
    console.log(dbname + '数据库已删除');
}

//关闭数据库
function closeDB() {
    INDEXEDDB_DB_RET.close();
    console.log('数据库已关闭');
}

//添加数据，重复添加会报错
function addData(storename, data, callback) {
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    for (var i = 0; i < data.length; i++) {
        var request = store.add(data[i]);
        request.onerror = function () {
            console.error('add添加数据库中已有该数据');
        };
        request.onsuccess = function () {
            console.log('add添加数据已存入数据库');
            callback();
        };
    }
}

// 添加数据，重复添加会更新原有数据
function putData(storename, data) {
    console.log(data);
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    for (var i = 0; i < data.length; i++) {
        var request = store.put(data[i]);
        request.onerror = function () {
            console.error('put添加数据库中已有该数据');
        };
        request.onsuccess = function () {
            console.log('put添加数据已存入数据库');
        };
    }
}

//根据存储空间的键找到对应数据
function getDataByKey(storename, key, callback) {
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    var request = store.get(key);
    request.onerror = function () {
        console.error('getDataByKey error');
    };
    request.onsuccess = function (e) {
        var result = e.target.result;
        console.log('查找数据成功');
        console.log(result);
        $(document).off('event_getDataByKey').on('event_getDataByKey', result);
        if (callback) {
            callback(result);
        }
    };
}

// 获取全部数据 ，根据 storename
function getAllData(storename, callback) {
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    var request = store.openCursor();
    var data = [];
    request.onerror = function () {
        console.error('getDataByKey error');
    };
    request.onsuccess = function (e) {
        var result = e.target.result;
        if (result && result !== null) {
            data.push(result.value);
            result.continue();
        } else {
            if (callback) {
                console.log('全部查找数据成功');
                callback(data);
            }
        }
    };
}

//删除某一条记录
function deleteData(storename, key) {
    var store = store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    store.delete(key);
    console.log('已删除存储空间' + storename + '中' + key + '记录');
}

//删除存储空间全部记录
function clearData(storename) {

    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    store.clear();
    console.log('已删除存储空间' + storename + '全部记录');
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(27);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(22);
var call = __webpack_require__(113);
var isArrayIter = __webpack_require__(114);
var anObject = __webpack_require__(13);
var toLength = __webpack_require__(57);
var getIterFn = __webpack_require__(115);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSysImgTypes = getSysImgTypes;
exports.saveData = saveData;
exports.getSysTpls = getSysTpls;
exports.getSysTplsTypes = getSysTplsTypes;
exports.getUserTpls = getUserTpls;
exports.addUserTpls = addUserTpls;
exports.delUserTpls = delUserTpls;
exports.getSysImgs = getSysImgs;
exports.getAppData = getAppData;
exports.getUserImgs = getUserImgs;
exports.getMp3 = getMp3;
exports.uploadImgBase64 = uploadImgBase64;
exports.delImg = delImg;
// 获取图片素材分类
function getSysImgTypes() {
    return $.ajax({
        type: 'post',
        url: '/api/getSysImgTypes',
        dataType: 'json'
    });
}

// 保存APP
// obj : { name: '', pageSize: 20, pageNum: 1 }
function saveData(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/saveData',
        data: obj,
        dataType: 'json'
    });
}

// 获取模板素材
// obj : { name: '', pageSize: 20, pageNum: 1 }
function getSysTpls(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getSysTpls',
        data: obj,
        dataType: 'json'
    });
}

// 获取模板素材分类
function getSysTplsTypes() {
    return $.ajax({
        type: 'post',
        url: '/api/getSysTplsTypes',
        dataType: 'json'
    });
}

// 获取我的模板
function getUserTpls(data) {
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/getUserTpls',
        dataType: 'json'
    });
}

// 添加我的模板
function addUserTpls(data) {
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/addUserTpls',
        dataType: 'json'
    });
}

// 删除我的模板
function delUserTpls(data) {
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/delUserTpls',
        dataType: 'json'
    });
}

// 获取图片素材
// obj : { name: '', pageSize: 20, pageNum: 1 }
function getSysImgs(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getSysImgs',
        data: obj,
        dataType: 'json'
    });
}

// 获取app json
// obj : { appid: 1 }
function getAppData(obj) {
    //获取APP对象
    return $.ajax({
        type: 'post',
        url: '/api/getUserApp',
        data: obj,
        dataType: 'json'
    });
}

// 获取我的图片
// obj : { pageSize: 20, pageNum: 1 }
function getUserImgs(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getUserImgs',
        data: obj,
        dataType: 'json'
    });
}

// 获取音乐
// obj : { pageSize: 20, pageNum: 1 }
function getMp3(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getMp3',
        data: obj,
        dataType: 'json'
    });
}

// 上传图片
// obj : { imgData: xx}
function uploadImgBase64(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/uploadBase64',
        data: obj,
        dataType: 'json'
    });
}

/**
 * @desc 删除用户图片
 * @param id 图片ID
*/
function delImg(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/delUserImgs',
        data: obj,
        dataType: 'json'
    });
}

/***/ }),
/* 79 */,
/* 80 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(250);
var enumBugKeys = __webpack_require__(167);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(52);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(251);
var enumBugKeys = __webpack_require__(167);
var IE_PROTO = __webpack_require__(166)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(164)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(168).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(250);
var hiddenKeys = __webpack_require__(167).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(6);
var dP = __webpack_require__(18);
var DESCRIPTORS = __webpack_require__(17);
var SPECIES = __webpack_require__(12)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(44);
var call = __webpack_require__(262);
var isArrayIter = __webpack_require__(180);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(19);
var getIterFn = __webpack_require__(182);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(32);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(15) && !__webpack_require__(25)(function () {
  return Object.defineProperty(__webpack_require__(55)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(20);
var toIObject = __webpack_require__(24);
var arrayIndexOf = __webpack_require__(126)(false);
var IE_PROTO = __webpack_require__(49)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(20);
var toObject = __webpack_require__(69);
var IE_PROTO = __webpack_require__(49)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
var global = __webpack_require__(3);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(23);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(96);
var defineProperty = __webpack_require__(11).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 99 */
/***/ (function(module, exports) {



/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.arrToObj = arrToObj;
exports.isNull = isNull;
// 数组 [{key1: val1}, {key2: val2}] => {key1: val1, key2: val2}
function arrToObj(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Object) {
            if (obj[arr[i]['id']] === undefined) {
                obj[arr[i]['id']] = arr[i]['value'];
            }
        }
    }
    return obj;
}

// 判断是否是 null, '', undefined
function isNull(val) {
    if (val === null || val === '' || val === undefined) {
        return true;
    } else {
        return false;
    }
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(42);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

var _bgColorTpl = __webpack_require__(144);

var _basicTpl = __webpack_require__(107);

var _basicMoreTpl = __webpack_require__(134);

var _layerSetUeTpl = __webpack_require__(223);

var _cssFilter = __webpack_require__(135);

var _layerFun = __webpack_require__(73);

var _AppDataFun = __webpack_require__(1);

var _layerAnimateTpl = __webpack_require__(234);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//图层
// layer 的公用函数
// 交互
//基础模版
//
var Layer = function () {
    function Layer(layer) {
        (0, _classCallCheck3.default)(this, Layer);

        this.className = 'layer';
        this.$selectAnimateDom = null; // 当前选中的animate
        // 方便修改layer 参数
        this.layer = layer;
    }

    //渲染layer，这里只设置 style


    (0, _createClass3.default)(Layer, [{
        key: '_renderLayer',
        value: function _renderLayer() {
            AppData.edit.layerDom.setStyle({
                style: this.layer.style,
                estyle: this.layer.estyle,
                animate: this.layer.animate
            });
            (0, _AppDataFun.AppDataChange)();
        }

        //公用的 set区域 模板

    }, {
        key: '_getSetBoxTpl',
        value: function _getSetBoxTpl() {
            var self = this;
            var _layer = this.layer,
                estyle = _layer.estyle,
                style = _layer.style;

            var bcolor = estyle['background-color'] || '';
            var transform = style['transform'] || '';

            // 背景模板
            var bgColorTpls = (0, _bgColorTpl.bgColorTpl)({
                color: bcolor ? bcolor.colorHex() : 'initial',
                opacity: bcolor ? bcolor.colorOpacity() : 1
            });

            // x, y, height, width 模板
            var basicTpls = (0, _basicTpl.basicTpl)({
                x: style.left,
                y: style.top,
                height: style.height,
                width: style.width
            });

            // 拓展模板 - 滚动条
            var boxshadow = (0, _cssFilter.boxshadowFilter)(estyle['box-shadow']);
            var border = (0, _cssFilter.borderFilter)(estyle['border']);
            var opacity = (0, _cssFilter.getOpacity)(estyle['opacity']);
            var basicMoreTpls = (0, _basicMoreTpl.basicMoreTpl)({
                rotate: transform.transformValue('rotate'),
                opacity: opacity,
                radius: estyle['border-radius'],
                boxshadow: boxshadow.size,
                boxshadowColor: boxshadow.color,
                boxshadowOpacity: boxshadow.opacity,
                borderSize: border.size,
                borderType: border.type,
                borderColor: border.color,
                borderOpacity: border.opacity
            });

            return {
                basicTpls: basicTpls,
                bgColorTpls: bgColorTpls,
                basicMoreTpls: basicMoreTpls
            };
        }

        //事件绑定

    }, {
        key: '_initEvent',
        value: function _initEvent() {
            var _this = this;

            // ui 组件方法重新实例化
            initSlider();
            initSelectOne();

            // 绑定basic事件
            (0, _basicTpl.basicEvent)(this);

            // 绑定拓展事件
            (0, _basicMoreTpl.baiscMoreEvent)(this);

            // 设置 背景色
            (0, _bgColorTpl.initBgColor)(this, $('#setLayerBox'), function () {
                _this._renderLayer();
            });
        }

        // 初始化

    }, {
        key: '_init',
        value: function _init() {

            // 设置名字
            $('#setLayerType').html(this.layer.typename + (AppData.edit.layerIndex + 1));

            // console.log('layer::layer 169 =>', this);
            // 动画设置区域
            (0, _layerAnimateTpl.setAnimateList)(this);

            // ue 设置
            // 默认隐藏面板
            $('.setue-set-hide').removeClass('setue-set-show');
            (0, _layerSetUeTpl.initUeSet)(this);

            // 事件绑定
            (0, _layerSetUeTpl.setUeEvent)(this);

            // 动画列表事件
            (0, _layerAnimateTpl.animateEvent)(this);

            // 实例化控制器
            (0, _layerFun.initControl)(this);
        }
    }]);
    return Layer;
}(); // 拓展模版
//背景色模版


exports.default = Layer;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(18).f;
var has = __webpack_require__(38);
var TAG = __webpack_require__(12)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(51);
var fails = __webpack_require__(7);
var spaces = __webpack_require__(170);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.basicTpl = basicTpl;
exports.asyncBasic = asyncBasic;
exports.domDataBindSelf = domDataBindSelf;
exports.basicEvent = basicEvent;

var _AppDataFun = __webpack_require__(1);

// 基础set的模板
function basicTpl(obj) {
    return '\n\t<div class="set-baisc">\n\t\t<div class="tr">\n\t\t\t<span><em>x\u5750\u6807</em> <input mt-wheel="0,1,10000" id="basicTpl_set_x" mt-type="px" class="mt-input" value="' + obj.x + '" type="" placeholder="x\u5750\u6807"></span>\n\t\t\t<span><em>y\u5750\u6807</em> <input mt-wheel="0,1,10000" id="basicTpl_set_y" mt-type="px" class="mt-input" value="' + obj.y + '" type="" placeholder="y\u5750\u6807"></span>\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<span><em>\u5BBD\u5EA6</em> <input mt-wheel="0,1,10000" id="basicTpl_set_width" mt-type="px" mt-min="0" class="mt-input" value="' + obj.width + '" type="" placeholder="\u5BBD" ></span>\n\t\t\t<span><em>\u9AD8\u5EA6</em> <input mt-wheel="0,1,10000" id="basicTpl_set_height" mt-type="px" mt-min="0" class="mt-input" value="' + obj.height + '" type="" placeholder="\u9AD8" ></span>\n\t\t</div>\n\t</div>\n';
}

// 给set模板赋值
function asyncBasic(style) {
    var top = style.top,
        left = style.left,
        height = style.height,
        width = style.width;

    $('#basicTpl_set_x').val(left);
    $('#basicTpl_set_y').val(top);
    $('#basicTpl_set_height').val(height);
    $('#basicTpl_set_width').val(width);
}

// 同时设置 DOM，self 的值
function domDataBindSelf(obj, self) {
    if (!AppData.edit.layerDom) {
        return false;
    }
    for (var key in obj) {
        self.layer.style[key] = obj[key];
    }
    AppData.edit.layerDom.css(obj);
    (0, _AppDataFun.AppDataChange)();
}

// 事件绑定
function basicEvent(self) {

    // 设置 x
    $('#basicTpl_set_x').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            left: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 y
    $('#basicTpl_set_y').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            top: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 width
    $('#basicTpl_set_width').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            width: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 height
    $('#basicTpl_set_height').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            height: parseInt(val, 10) + 'px'
        }, self);
    });
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(27);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(36)('meta');
var isObject = __webpack_require__(14);
var has = __webpack_require__(20);
var setDesc = __webpack_require__(11).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(25)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(34);

var _stringify2 = _interopRequireDefault(_stringify);

exports.setStorage = setStorage;
exports.getStorage = getStorage;
exports.clearStorage = clearStorage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 设置  本地缓存
 */
function setStorage(key, obj) {
    if (typeof obj === 'string') {
        localStorage.setItem(key, obj);
    } else {
        localStorage.setItem(key, (0, _stringify2.default)(obj));
    }
}

/**
 * 获取
 */
function getStorage(key) {
    var val = localStorage.getItem(key);
    try {
        return JSON.parse(val);
    } catch (e) {
        return val;
    }
}

/**
 * 删除， 如果不传值，删除所有
 */
function clearStorage(key) {
    if (key) {
        localStorage.removeItem(key);
    } else {
        localStorage.clear();
    }
}

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(23);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(76);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(23);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(16);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imgTpl = imgTpl;
exports.convertBase64UrlToBlob = convertBase64UrlToBlob;
exports.base64ToUrl = base64ToUrl;
exports.initCrop = initCrop;

var _indexedDB = __webpack_require__(75);

var db = _interopRequireWildcard(_indexedDB);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// indexedDB

var imgNullTpl = '<div class="a-selectimg img-null">选择图片</div>';

function imgTpl(obj) {
    if (!obj || !obj.src) {
        return '\n        <div class="set-img set_img">\n            <div class="set_img_crop">' + imgNullTpl + '</div>\n        </div>\n        ';
    }
    if (obj.src.indexOf('#') !== -1) {
        obj.src = obj.src.split('#')[0];
    }
    // $crop 对象是 set_img_crop
    return '\n    <div class="set-img set_img">\n        <div data-oldsrc="' + obj.src + '" data-src="' + obj.src + '" class="set_img_crop"></div>\n    </div>';
}

/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *        用url方式表示的base64图片数据  
 */
function convertBase64UrlToBlob(urlData) {
    var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte  
    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

/**
 * base64 to url
 * @param base64
 * @param temp 时间戳
 * @return url
 */
function base64ToUrl(base64, temp) {
    var URL = window.URL || window.webkitURL;
    // 通过 file 生成目标 url
    return URL.createObjectURL(convertBase64UrlToBlob(base64)) + ('#' + temp);
}

/**
 *	图片剪切方法的初始化
 *	$crop: set_img_crop 对象
 *	set: crop 插件的参数
 *	self: 当前操作的类
 *	callback: 执行完成后的回调函数
 *  selectImgBack 选择图片的回调函数
 */
function initCrop(self, $crop, set, callback) {

    var obj = self[self.className];
    // 裁剪函数
    $crop.empty(); // 如果原来有对象，先清空DOM，和事件

    set.wh = set.wh || ['100%', '100%'];

    // 如果没图
    if (!$crop.crop(set)) {
        $crop.html(imgNullTpl);
    }

    // 绑定剪切事件
    $crop.off('crop').on('crop', function (e, data) {
        // 还原图片
        if (typeof data === 'string') {
            if (obj.type === 'img') {
                obj.data.src = data;
            } else {
                // 背景
                obj.style['background-image'] = data;
            }
            callback('reset');
        } else {
            // 图片上传

            var temp = +new Date();
            var imgURL = base64ToUrl(data.imgData, temp);

            // 存储图片到本地，提交的时候，再统一上传到服务器
            db.addData('img', [{
                id: temp,
                value: data.imgData
            }], function () {
                // 图片特殊处理
                if (obj.type === 'img') {
                    obj.data.src = imgURL;
                } else {
                    // 背景
                    obj.style['background-image'] = imgURL;
                }
                callback('crop');
            });
        }
    });

    // 清除背景图
    $crop.off('cropDel.' + self.className).on('cropDel.' + self.className, function (e) {
        $crop.attr({
            'data-oldsrc': '',
            'data-src': ''
        }).html(imgNullTpl);

        // 图片特殊处理, 这里只是清除图片。并没有删除图层
        if (obj.type === 'img') {
            obj.data.src = '';
        } else {
            // 背景
            obj.style['background-image'] = '';
        }
        callback('delete');
    });

    // 换图
    // $crop.off('cropNew.' + self.className).on('cropNew.' + self.className, function(e, val) {
    //     // console.log('换图', val);
    // })

    // 选择图片, 这里感觉右侧的编辑区域，判断当前应该调用哪个事件
    var evName = 'layer';
    if (!$('#setAppBox').is(':hidden')) {
        evName = 'app';
    } else if (!$('#setPageBox').is(':hidden')) {
        evName = AppData.edit.pageType;
    } else if (!$('#setLayerBox').is(':hidden')) {
        evName = 'layer';
    } else {}
    // ...


    // console.log('初始化选择图片的方法');
    $crop.off('selectImg.' + evName).on('selectImg.' + evName, function (e, val) {
        $crop.attr({
            'data-oldsrc': val,
            'data-src': val
        });
        if ($crop.find('.img-null')[0]) {
            $crop.crop(set);
        } else {
            //事件触发, 还原
            $crop.find('.mt-cropbtn-init').trigger('click');
        }
        // 选择后的回调函数
        $crop.trigger('selectImgBack', val);
        callback('select', val);
    });

    return $crop;
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(45);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 119 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(45);
var TAG = __webpack_require__(12)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var defined = __webpack_require__(48);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(56);
var descriptor = __webpack_require__(35);
var setToStringTag = __webpack_require__(37);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var anObject = __webpack_require__(13);
var getKeys = __webpack_require__(68);

module.exports = __webpack_require__(15) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(24);
var toLength = __webpack_require__(57);
var toAbsoluteIndex = __webpack_require__(127);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(129);
var step = __webpack_require__(109);
var Iterators = __webpack_require__(23);
var toIObject = __webpack_require__(24);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(66)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 130 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(27);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(92);
var hiddenKeys = __webpack_require__(59).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(98);
var createDesc = __webpack_require__(35);
var toIObject = __webpack_require__(24);
var toPrimitive = __webpack_require__(67);
var has = __webpack_require__(20);
var IE8_DOM_DEFINE = __webpack_require__(90);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(15) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.basicMoreTpl = basicMoreTpl;
exports.asyncRotate = asyncRotate;
exports.setLayerDomAndObj = setLayerDomAndObj;
exports.baiscMoreEvent = baiscMoreEvent;

var _cssFilter = __webpack_require__(135);

var _funs = __webpack_require__(100);

var _AppDataFun = __webpack_require__(1);

/* 拓展参数 */
var radiusMax = 500; // 圆角最大参数

function basicMoreTpl(obj) {
    return '\n\t<div class="set-baiscmore">\n\t\t<div class="tr">\n\t\t\t<h5>\u65CB\u8F6C\u89D2\u5EA6</h5>\n\t\t\t<div mt-bind="basicMoreTpl_rotate_input" id="basicMoreTpl_rotate" mt-filter="*360" class="mt-slider-bar" data-val="' + parseInt(obj.rotate || 0, 10) / 360 + '"></div>\n\t\t\t<input mt-wheel="0,1,360" mt-bind="basicMoreTpl_rotate" id="basicMoreTpl_rotate_input" mt-filter="/360" mt-min="0" mt-max="360" mt-type="deg" mt-fixed="4" class="mt-input" value="' + (obj.rotate || 0) + '" placeholder="\u5EA6\u6570">\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<h5>\u5706\u89D2</h5>\n\t\t\t<div mt-bind="basicMoreTpl_radius_input" mt-filter="*' + radiusMax + '" id="basicMoreTpl_radius" class="mt-slider-bar" data-val="' + parseInt(obj.radius || 0, 10) / radiusMax + '"></div>\n\t\t\t<input mt-wheel="0,1,' + radiusMax + '" mt-fixed="5" mt-bind="basicMoreTpl_radius" mt-filter="/' + radiusMax + '" id="basicMoreTpl_radius_input" class="mt-input" mt-type="px" mt-min="0" mt-max="' + radiusMax + '" value="' + (obj.radius || 0) + '">\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<h5>\u900F\u660E\u5EA6</h5>\n\t\t\t<div mt-bind="basicMoreTpl_opacity_input" id="basicMoreTpl_opacity" class="mt-slider-bar" data-val="' + ((0, _funs.isNull)(obj.opacity) ? 1 : obj.opacity) + '"></div>\n\t\t\t<input mt-wheel="0,0.1,1" mt-bind="basicMoreTpl_opacity" id="basicMoreTpl_opacity_input" class="mt-input" mt-type="" mt-min="0" mt-max="1" value="' + obj.opacity + '">\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<h5>\u5F00\u542F\u9634\u5F71</h5>\n\t\t\t<div id="basicMoreTpl_boxshadow_switch" data-toggle=\'[{"dom":"#basicMoreTpl_boxshadowStyleId","class":"show"}]\' class="mt-switch" data-val="' + ((0, _funs.isNull)(obj.boxshadow) ? 'off' : 'on') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="tr' + (!(0, _funs.isNull)(obj.boxshadow) ? ' show' : ' ') + '" id="basicMoreTpl_boxshadowStyleId" style="display: none;">\n\t\t\t<h5>\u9634\u5F71\u8BBE\u7F6E</h5>\n\t\t\t<div mt-bind="basicMoreTpl_boxshadow_input" mt-filter="*100" id="basicMoreTpl_boxshadow" class="mt-slider-bar" data-val="' + parseInt((0, _funs.isNull)(obj.boxshadow) ? 10 : obj.boxshadow, 10) / 100 + '"></div>\n\t\t\t<input mt-wheel="0,1,100" mt-fixed="2" mt-bind="basicMoreTpl_boxshadow" mt-filter="/100" id="basicMoreTpl_boxshadow_input" class="mt-input" mt-type="px" mt-min="0" mt-max="100" value="' + ((0, _funs.isNull)(obj.boxshadow) ? '10px' : obj.boxshadow) + '">\n\t\t\t<div class="tr">\n\t\t\t\t<h5>\u9634\u5F71\u989C\u8272</h5>\n\t\t\t\t<div class="mt-color" id="basicMoreTpl_boxshadowColor">\n\t\t\t\t\t<input id="basicMoreTpl_boxshadowColor_input" type="color" value="' + (obj.boxshadowColor || '#000') + '"/>\n\t\t\t\t\t\u900F\u660E\u5EA6\uFF1A<div id="basicMoreTpl_boxshadowOpactity" style="width:95px" class="mt-slider-bar" data-val="' + ((0, _funs.isNull)(obj.boxshadowOpacity) ? 1 : obj.boxshadowOpacity) + '"></div>\n\t\t\t\t\t<a class="mt-color-clear"><i class="iconfont icon-eraser"></i>\u6E05\u9664</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<h5>\u5F00\u542F\u8FB9\u6846</h5>\n\t\t\t<div id="basicMoreTpl_border_switch" data-toggle=\'[{"dom":"#basicMoreTpl_borderStyleId","class":"show"}]\' class="mt-switch" data-val="' + ((0, _funs.isNull)(obj.borderSize) ? 'off' : 'on') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="tr' + (!(0, _funs.isNull)(obj.borderSize) ? ' show' : ' ') + '" id="basicMoreTpl_borderStyleId" style="display:none">\n\t\t\t<h5>\u8FB9\u6846\u7C7B\u578B</h5>\n\t\t\t<div class="mt-select">\n\t\t\t\t<select id="basicMoreTpl_borderStyle" value="' + (obj.borderType || 'solid') + '" placeholder="\u4E0B\u62C9\u9009\u62E9">\n\t\t\t\t\t<option value="solid">\u5B9E\u7EBF</option>\n\t\t\t\t\t<option value="double">\u53CC\u7EBF</option>\n\t\t\t\t\t<option value="dashed">\u865A\u7EBF</option>\n\t\t\t\t\t<option value="dotted">\u70B9\u7EBF</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t&nbsp;&nbsp;&nbsp;&nbsp;\n\t\t\t<h5>\u8FB9\u6846\u5927\u5C0F</h5>\n\t\t\t<input mt-wheel="1,1,10000" id="basicMoreTpl_borderSize" class="mt-input" mt-type="px" mt-min="1" value="' + (obj.borderSize || '10px') + '" type="" name="">\n\t\t\t<div class="tr">\n\t\t\t\t<h5>\u8FB9\u6846\u989C\u8272</h5>\n\t\t\t\t<div class="mt-color">\n\t\t\t\t\t<input id="basicMoreTpl_borderColor" type="color" value="' + (obj.borderColor || '#000') + '"/>\n\t\t\t\t\t\u900F\u660E\u5EA6\uFF1A<div style="width:95px" id="basicMoreTpl_borderOpactiy" class="mt-slider-bar" data-val="' + ((0, _funs.isNull)(obj.borderOpacity) ? 1 : obj.borderOpacity) + '"></div>\n\t\t\t\t\t<a class="mt-color-clear"><i class="iconfont icon-eraser"></i>\u6E05\u9664</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n';
}

// 设置 set 里面的 rotate 滚动条和输入框参数
function asyncRotate(style) {
    console.log(style);
    var rotate = $.getTransform(style.transform, 'rotate');
    var $rotate = $('#basicMoreTpl_rotate').attr('data-val', parseInt(rotate, 10) / 360);
    $('#basicMoreTpl_rotate_input').val(rotate + 'deg');
    setSilderVal($rotate);
}

// dom: layer, element 对应设置的对象
function setLayerDomAndObj(dom, obj, self, nochange) {

    // 特殊情况不设置layerDom
    if (!AppData.edit.layerDom) {
        return;
    }

    // 先设置 self 属性
    for (var key in obj) {
        if (obj[key] !== '') {
            if (dom === 'element') {
                self.layer.estyle[key] = obj[key];
            } else {
                self.layer.style[key] = obj[key];
            }
        } else {
            // 删除对应的 self.style[key]
            // self.style['configurable'] = true; // 严格模式下需要设置
            if (dom === 'element') {
                delete self.layer.estyle[key];
            } else {
                delete self.layer.style[key];
            }
        }
    }

    // 设置 dom
    if (dom === 'element') {
        AppData.edit.layerDom.find('.element').css(obj);
    } else {
        AppData.edit.layerDom.css(obj);
    }

    //监听变化
    if (!nochange) {
        (0, _AppDataFun.AppDataChange)();
    }
}

// 事件
function baiscMoreEvent(self) {

    // 旋转的 slider
    $('#basicMoreTpl_rotate').off('change').on('change', function (e, val) {

        // 迭代中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理.需要用到矩阵
        // 设置 dom
        setLayerDomAndObj('layer', {
            transform: 'rotate(' + val * 360 + 'deg)'
        }, self);
    });

    // 旋转的 input
    $('#basicMoreTpl_rotate_input').off('change input').on('change input', function (e) {

        var val = parseInt($(this).val(), 10);

        // 迭代到后面，如果要对transform 进行扩展，中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理 可以使用 矩阵
        // 设置 dom
        setLayerDomAndObj('layer', {
            transform: 'rotate(' + val + 'deg)'
        }, self);
    });

    // 圆角的 slider
    $('#basicMoreTpl_radius').off('change').on('change', function (e, val) {
        // console.log('~~~~~', val);
        // 设置 dom
        setLayerDomAndObj('element', {
            'border-radius': val * radiusMax + 'px'
        }, self);
    });

    // 圆角的 Input
    $('#basicMoreTpl_radius_input').off('change input').on('change input', function (e) {
        var val = parseInt($(this).val(), 10);
        // console.log('>>>>', val);
        // 设置 DOM
        setLayerDomAndObj('element', {
            'border-radius': val + 'px'
        }, self);
    });

    // 透明度 slider
    $('#basicMoreTpl_opacity').off('change').on('change', function (e, val) {
        // 设置 DOM
        setLayerDomAndObj('element', {
            'opacity': val
        }, self);
    });

    // 透明度 Input
    $('#basicMoreTpl_opacity_input').off('change input').on('change input', function (e) {
        var val = $(this).val();

        setLayerDomAndObj('element', {
            'opacity': val
        }, self);
    });

    // 开启阴影
    $('#basicMoreTpl_boxshadow_switch').off('change').on('change', function (e, val) {
        if (val) {
            val = '0 0 10px rgba(0,0,0,0.5)';
            setLayerDomAndObj('element', {
                'box-shadow': val
            }, self);
        } else {
            setLayerDomAndObj('element', {
                'box-shadow': ''
            }, self);
        }
    });

    // 阴影 slider - size
    $('#basicMoreTpl_boxshadow').off('change').on('change', function (e, val) {

        // 数据过滤
        val = parseInt(val * 100, 10);
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 阴影  Input
    $('#basicMoreTpl_boxshadow_input').off('change').on('change', function (e) {

        var val = $(this).val();
        val = parseInt(val, 10);
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 阴影 颜色
    $('#basicMoreTpl_boxshadowColor_input').off('change').on('change', function (e) {
        var val = $(this).val();
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { color: val });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 阴影 透明度
    $('#basicMoreTpl_boxshadowOpactity').off('change').on('change', function (e, val) {
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { opacity: val });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 开启边框
    $('#basicMoreTpl_border_switch').off('change').on('change', function (e, val) {
        if (val) {
            val = '10px solid rgba(0,0,0,1)';
            setLayerDomAndObj('element', {
                'border': val
            }, self);
        } else {
            setLayerDomAndObj('element', {
                'border': ''
            }, self);
        }
    });

    // 边框 大小 input
    $('#basicMoreTpl_borderSize').off('change').on('change', function (e) {

        var val = $(this).val();
        val = parseInt(val, 10);
        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });

    // 边框 颜色
    $('#basicMoreTpl_borderColor').off('change').on('change', function (e) {
        var val = $(this).val();
        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { color: val });

        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });

    // 边框类型
    $('#basicMoreTpl_borderStyle').off('change').on('change', function (e) {
        var val = $(this).val();
        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { type: val });
        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });

    // 边框 透明度
    $('#basicMoreTpl_borderOpactiy').off('change').on('change', function (e, val) {

        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { opacity: val });

        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.borderFilter = borderFilter;
exports.setBorder = setBorder;
exports.boxshadowFilter = boxshadowFilter;
exports.setBoxshadow = setBoxshadow;
exports.animationFilter = animationFilter;
exports.getOpacity = getOpacity;
// 过滤 border  1px solid rgba(0,0,0,0.5)
function borderFilter(border) {
    if (border) {
        var arr = border.split(' ');
        return {
            size: arr[0],
            type: arr[1],
            color: arr[2].colorHex() || '#000000',
            opacity: arr[2].colorOpacity() || 1
        };
    } else {
        // 如果没有 border
        // console.log('cssFilter.js borderFilter() => ', border);
        return {
            size: null,
            type: null,
            color: null,
            opacity: null
        };
    }
}

// 设置 border 
function setBorder(target, obj) {
    var exg = /(\d+(px)?\s)(\w+\s)(rgba\((\w+),(\w+),(\w+),(((1|0)?\.)?\d+)\))/;
    if (obj.size !== undefined) {
        target = target.replace(exg, obj.size + ' $3$4');
    }
    if (obj.color !== undefined) {
        // 颜色转换
        var color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',$8)');
    }
    if (obj.opacity !== undefined) {
        target = target.replace(exg, '$1$3rgba($5,$6,$7,' + obj.opacity + ')');
    }
    if (obj.type !== undefined) {
        target = target.replace(exg, '$1' + obj.type + ' rgba($5,$6,$7,$8)');
    }
    return target;
}

// 过滤 box-shadow 0 0 5px rgba(0,0,0,.5)
function boxshadowFilter(boxshadow) {
    if (boxshadow) {
        var arr = boxshadow.split(' ');
        return {
            size: arr[2],
            color: arr[3].colorHex() || '#000000',
            opacity: arr[3].colorOpacity() || 1
        };
    } else {
        // console.log('cssFilter.js boxshadowFilter() => ', boxshadow);
        return {
            size: null,
            color: null,
            opacity: null
        };
    }
}

// 添加 boxshadow 属性  /(\d+(px)?\s){2}(\d+(px)?\s)((rgba\()(\w+)(,)(\w+)(,)(\w+)(,)((0\.)?\d+)\))/
// color传入 #000000 格式
function setBoxshadow(target, obj) {
    var exg = /(\d+(px)?\s)(\d+(px)?\s)(\d+(px)?\s)(rgba\((\d+),(\d+),(\d+),(((1|0)?\.)?\d+)\))/;
    if (obj.size !== undefined) {
        target = target.replace(exg, '$1$3' + obj.size + ' $7');
    }
    if (obj.color !== undefined) {
        // 颜色转换
        var color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3$5rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',$11)');
    }
    if (obj.opacity !== undefined) {
        target = target.replace(exg, '$1$3$5rgba($8,$9,$10,' + obj.opacity + ')');
    }
    return target;
}

// 过滤 animation  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
function animationFilter(animation) {
    if (animation) {
        var arr = animation.split(' ');
    } else {
        return {
            name: null, // 动画名称
            duration: null, // 动画执行时间
            timing: null, // 动画速度曲线 linear,ease,ease-in,ease-out,ease-in-out, cubic-bezier(n,n,n,n) 贝塞尔
            delay: null, // 延迟执行
            count: null, // 播放次数
            direction: null, // 是否循环交替反向播放动画 normal: 正常播放， reverse：反向播放，alternate/alternate-reverse：动画在奇数/偶数次正向播放，在偶数/奇数次反向播放。
            fillMode: null, // 动画停留 none，forwards，backwards，both
            playState: null // 控制播放状态 paused，running
        };
    }
}

/**
 * 获取 opacity 透明度
*/
function getOpacity(val) {
    if (val === undefined) {
        val = 1;
    }
    return val;
}

// export { borderFilter, boxshadowFilter, setBoxshadow , setBorder };

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(199), __esModule: true };

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(13);
var aFunction = __webpack_require__(42);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(22);
var invoke = __webpack_require__(201);
var html = __webpack_require__(93);
var cel = __webpack_require__(55);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(27)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var isObject = __webpack_require__(14);
var newPromiseCapability = __webpack_require__(101);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var dP = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(15);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//提示信息
$.tip = function (setting) {
    var defaults = {
        msg: '操作成功', //
        type: 'success', //success,danger,warning
        time: 3000, //
        callback: null //
    };
    var set = $.extend(defaults, setting || {});
    tipsMsg(set);
};

function tipsMsg(obj) {
    var id = 'mt_' + new Date().getTime();
    var type = 'mt-tip-' + obj.type + ' animated fadeInDown';
    if (!$('body').find('.mt-tip-group')[0]) {
        $('body').append('<div class="mt-tip-group"></div>');
    }
    $('.mt-tip-group').append('<div class="mt-tip-inner"><div class="' + type + '" id="' + id + '">' + obj.msg + '</div></div>');
    if (!obj.time) {
        obj.time = 3000;
    }
    setTimeout(function () {
        var $id = $('#' + id);
        $id.removeClass('fadeInDown').addClass('fadeOutUp');
        setTimeout(function () {
            $id.remove();
            if (obj.callback) {
                obj.callback($id);
            }
        }, 800);
    }, obj.time);
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bgColorTpl = bgColorTpl;
exports.initBgColor = initBgColor;

var _AppDataFun = __webpack_require__(1);

var _funs = __webpack_require__(100);

function bgColorTpl(obj) {
    // console.log('==>', obj);
    return '\n    <div class="set-bgcolor">\n        <div class="tr">\n            \u80CC\u666F\u5E95\u8272:\n            <div class="mt-color set_bg_color">\n                <input class="set_bg_color_input" type="color" value="' + obj.color + '"/>\n                \u900F\u660E\u5EA6\uFF1A<div style="width:95px" class="mt-slider-bar set_bg_opacity" data-val="' + (obj.opacity ? obj.opacity : 0) + '"></div>\n                <a class="mt-color-clear"><i class="iconfont icon-eraser"></i>\u6E05\u9664</a>\n            </div>\n        </div>\n    </div>\n';
}

// 设置背景颜色
function initBgColor(self, $parent, callback) {

    // 选择颜色， 颜色+透明度 已经封装 在 unit/color.js
    $parent.find('.set_bg_color').off('change').on('change', function (e, data) {
        var key = self.className !== 'layer' ? 'style' : 'estyle';
        self[self.className][key]['background-color'] = data;
        callback();
    });
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLayerDom = getLayerDom;
exports.addLayer = addLayer;
exports.layerTypeSelect = layerTypeSelect;

var _index = __webpack_require__(212);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(236);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(240);

var _index6 = _interopRequireDefault(_index5);

var _AppDataFun = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 根据 layer 设置 对于的 phone 里面的 layer DOM
 * @param layer new Layer() 的对象
*/
// 设置 layer
function getLayerDom(layer) {
    var dom = '';
    switch (layer.type) {
        case 'img':
            dom = (0, _index.imgDom)(layer);break;
        case 'text':
            dom = (0, _index3.textDom)(layer);break;
        case 'video':
            dom = (0, _index5.videoDom)(layer);break;
        default:
            break;
    }
    return dom;
}

// 添加 layer ，添加新的layer
function addLayer(type) {
    console.log('添加图层', type);
    switch (type) {
        case 'img':
            addLayerBack(new _index.ImgLayer());break;
        case 'text':
            addLayerBack(new _index3.TextLayer());break;
        case 'video':
            addLayerBack(new _index5.VideoLayer());break;
        default:
            break;
    }
}

/**
 * @author Mantou
 * @desc 判断不同的图层类型，去 new 不同的图层类， 选择图层后
 * @param {object} layer - 页面对象
 */
function layerTypeSelect(layer) {
    console.log('选择图层->', layer);
    if (!layer) {
        return;
    }
    switch (layer.type) {
        case 'img':
            new _index2.default(layer).init();break;
        case 'text':
            new _index4.default(layer).init();break;
        case 'video':
            new _index6.default(layer).init();break;
        default:
            break;
    }
}

// 添加 layer 后，需要重新实例化一些 page方法
function addLayerBack(obj) {
    // 获取当前编辑的页面类
    var Page = (0, _AppDataFun.getPageClass)();
    if (!Page) {
        $.tip({
            msg: '请先新建页面', //
            type: 'danger', //success,danger,warning
            time: 3000 //
        });
        return;
    }
    (0, _AppDataFun.pushLayerData)(obj, Page);
    // 更新 list
    Page.initLayerList();
    // 更新 layer 的 dom
    Page.initPageDom();
    // 选择第一个layer
    // AppData.edit.layerIndex = null;
    Page.selectFirstLayer();
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStyle = getStyle;
/**
 * 获取css 从 style 中
*/
function getStyle(style, key) {
    var val = false;
    if (style) {
        var arr = style.split(';');
        arr.forEach(function (elem, index) {
            if (elem.indexOf(key) !== -1) {
                val = elem.split(':')[1];
                val = $.trim(val);
            }
        });
    }
    return val;
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterTxt = filterTxt;
/**
 * @desc 过滤 txt 文本
 * @param $this 文本box jquery对象
 * @return shtml 新的文本
*/
function filterTxt($this) {
    // 设置 sHtml ，给每个文字加个 class txt, 给每行加 txt-line
    var shtml = '';
    $this.find('div').each(function (index, elem) {
        var str = $(this).html();
        var arr = []; // 存放拆分的字符串
        var code = '<div class="txt-line">';
        // console.log(str);
        // 如果是换行
        if (str.indexOf('<br>') !== -1) {
            arr = [str];
        } else {
            // 先去掉 <span class="txt"></span> 标签
            str = str.replace(/<span class="txt"( style=".+")?>/g, '');
            str = str.replace(/<\/span>/g, '');
            // 去掉空格
            str = str.replace(/&nbsp;/g, ' ');
            // 拆分数组
            arr = str.split('');
        }

        arr.forEach(function (elem, index) {
            // console.log(elem);
            if (elem === ' ') {
                code += '&nbsp;';
            } else if (elem === '<br>') {
                code += '<br>';
            } else {
                code += '<span class="txt">' + elem + '</span>';
            }
        });

        code += '</div>';
        shtml += code;
    });

    return shtml;
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(43);
var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(71) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(39);
var toLength = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(83);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 150 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(45);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(8);
var cof = __webpack_require__(45);
var MATCH = __webpack_require__(12)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(12)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(5);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(31);
var redefine = __webpack_require__(32);
var fails = __webpack_require__(7);
var defined = __webpack_require__(51);
var wks = __webpack_require__(12);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(26);
var SPECIES = __webpack_require__(12)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(32);
var redefineAll = __webpack_require__(89);
var meta = __webpack_require__(70);
var forOf = __webpack_require__(88);
var anInstance = __webpack_require__(87);
var isObject = __webpack_require__(8);
var fails = __webpack_require__(7);
var $iterDetect = __webpack_require__(153);
var setToStringTag = __webpack_require__(103);
var inheritIfRequired = __webpack_require__(171);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var hide = __webpack_require__(31);
var uid = __webpack_require__(81);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(71) || !__webpack_require__(7)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(6)[K];
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(26);
var ctx = __webpack_require__(44);
var forOf = __webpack_require__(88);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadHTML = loadHTML;
/**
 * @desc loading 模板
*/
var loadArr = exports.loadArr = ['<div class="timer"></div>', '<div class="typing_loader"></div>', '<div class="location_indicator"></div>', '<div class="dashboard"></div>', '<div class="battery"></div>', '<div class="magnifier"></div>', '<div class="help"></div>', '<div class="cloud"></div>', '<div class="eye"></div>', '<div class="coffee_cup"></div>', '<div class="square"></div>', '<div class="circle"></div>'];

// loading 
function loadHTML(self) {
    var loadIndex = self.app.loading;
    return '\n    <div class="loaders">\n        ' + loadArr.map(function (elem, index) {
        return '<div class="loader ' + (index == loadIndex ? 'active' : '') + '">\n                ' + elem + '     \n            </div>';
    }).join('') + '\n    </div>\n    ';
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(43);
var LIBRARY = __webpack_require__(71);
var wksExt = __webpack_require__(249);
var defineProperty = __webpack_require__(18).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(148)('keys');
var uid = __webpack_require__(81);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 167 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(8);
var anObject = __webpack_require__(5);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(44)(Function.call, __webpack_require__(40).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var setPrototypeOf = __webpack_require__(169).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(52);
var defined = __webpack_require__(51);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 173 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 174 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(52);
var defined = __webpack_require__(51);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(71);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(32);
var hide = __webpack_require__(31);
var Iterators = __webpack_require__(105);
var $iterCreate = __webpack_require__(177);
var setToStringTag = __webpack_require__(103);
var getPrototypeOf = __webpack_require__(41);
var ITERATOR = __webpack_require__(12)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(84);
var descriptor = __webpack_require__(80);
var setToStringTag = __webpack_require__(103);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(31)(IteratorPrototype, __webpack_require__(12)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(152);
var defined = __webpack_require__(51);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(12)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(105);
var ITERATOR = __webpack_require__(12)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(18);
var createDesc = __webpack_require__(80);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(120);
var ITERATOR = __webpack_require__(12)('iterator');
var Iterators = __webpack_require__(105);
module.exports = __webpack_require__(43).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(384);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(83);
var toLength = __webpack_require__(19);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(72);
var step = __webpack_require__(265);
var Iterators = __webpack_require__(105);
var toIObject = __webpack_require__(39);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(176)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(44);
var invoke = __webpack_require__(255);
var html = __webpack_require__(168);
var cel = __webpack_require__(164);
var global = __webpack_require__(6);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(45)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var macrotask = __webpack_require__(186).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(45)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(26);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(17);
var LIBRARY = __webpack_require__(71);
var $typed = __webpack_require__(159);
var hide = __webpack_require__(31);
var redefineAll = __webpack_require__(89);
var fails = __webpack_require__(7);
var anInstance = __webpack_require__(87);
var toInteger = __webpack_require__(52);
var toLength = __webpack_require__(19);
var toIndex = __webpack_require__(274);
var gOPN = __webpack_require__(85).f;
var dP = __webpack_require__(18).f;
var arrayFill = __webpack_require__(184);
var setToStringTag = __webpack_require__(103);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(191), __esModule: true };

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(95);
module.exports = __webpack_require__(96).f('iterator');


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(193), __esModule: true };

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(194);
__webpack_require__(99);
__webpack_require__(197);
__webpack_require__(198);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(20);
var DESCRIPTORS = __webpack_require__(15);
var $export = __webpack_require__(10);
var redefine = __webpack_require__(91);
var META = __webpack_require__(110).KEY;
var $fails = __webpack_require__(25);
var shared = __webpack_require__(58);
var setToStringTag = __webpack_require__(37);
var uid = __webpack_require__(36);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(96);
var wksDefine = __webpack_require__(97);
var enumKeys = __webpack_require__(195);
var isArray = __webpack_require__(131);
var anObject = __webpack_require__(13);
var isObject = __webpack_require__(14);
var toIObject = __webpack_require__(24);
var toPrimitive = __webpack_require__(67);
var createDesc = __webpack_require__(35);
var _create = __webpack_require__(56);
var gOPNExt = __webpack_require__(196);
var $GOPD = __webpack_require__(133);
var $DP = __webpack_require__(11);
var $keys = __webpack_require__(68);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(132).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(98).f = $propertyIsEnumerable;
  __webpack_require__(130).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(68);
var gOPS = __webpack_require__(130);
var pIE = __webpack_require__(98);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(24);
var gOPN = __webpack_require__(132).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97)('asyncIterator');


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97)('observable');


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99);
__webpack_require__(74);
__webpack_require__(95);
__webpack_require__(200);
__webpack_require__(204);
__webpack_require__(205);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var global = __webpack_require__(3);
var ctx = __webpack_require__(22);
var classof = __webpack_require__(76);
var $export = __webpack_require__(10);
var isObject = __webpack_require__(14);
var aFunction = __webpack_require__(42);
var anInstance = __webpack_require__(112);
var forOf = __webpack_require__(77);
var speciesConstructor = __webpack_require__(137);
var task = __webpack_require__(138).set;
var microtask = __webpack_require__(202)();
var newPromiseCapabilityModule = __webpack_require__(101);
var perform = __webpack_require__(139);
var userAgent = __webpack_require__(203);
var promiseResolve = __webpack_require__(140);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(116)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(37)($Promise, PROMISE);
__webpack_require__(141)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(142)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 201 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(138).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(27)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(10);
var core = __webpack_require__(2);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(137);
var promiseResolve = __webpack_require__(140);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(101);
var perform = __webpack_require__(139);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 对象 to obj
*/
$.toStyle = function (obj, animate) {
    var style = [];
    if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object') {
        for (var key in obj) {
            if (key === 'background-image') {
                style.push(key + ': url(' + obj[key] + ')');
            } else {
                style.push(key + ': ' + obj[key]);
            }
        }
    }

    // 设置动画
    if (animate && animate.length > 0) {
        var arr = [];
        for (var i = 0; i < animate.length; i++) {
            arr.push(animate[i].style);
        }
        style.push('animation: ' + arr.join(','));
        // 默认 动画暂停
        // style.push('animation-play-state: paused');
    }
    return style.join(';');
};

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 确认弹窗
*/
$.confirms = function (setting) {
    var _this = this;

    if (!$('.mt-modal-bg')[0]) {
        $('body').append('<div class="mt-modal-bg"></div>');
    }

    var defaults = {
        title: '系统提示',
        content: '内容...',
        width: 300, // 宽度
        callback: null // 回调函数
    };
    var set = $.extend(defaults, setting || {});
    var id = 'confirm_' + +new Date();
    var tpl = '\n        <div class="mt-confirm" id="' + id + '">\n            <div class="mt-modal-box" style="width: ' + set.width + 'px;">\n                <a class="mt-modal-close">\n                    <i class="iconfont icon-close"></i>\n                </a>\n                <div class="mt-modal-title">' + set.title + '</div>\n                <div class="mt-modal-content">' + set.content + '</div>\n                <div class="mt-modal-btns">\n                    <a class="mt-btn-cancel">\u53D6\u6D88</a>\n                    <a class="mt-btn-ok">\u786E\u5B9A</a>\n                </div>\n            </div>\n        </div>\n    ';
    $('body').append(tpl);
    var $confirm = $('#' + id);
    var $bg = $('.mt-modal-bg');
    var $close = $confirm.find('.mt-modal-close');

    // 绑定事件
    this.bindEvent = function () {
        var self = _this;
        $confirm.on('click', '.mt-btn-cancel', function (e) {
            self.hide(false);
        });
        $confirm.on('click', '.mt-btn-ok', function (e) {
            self.hide(true);
        });
        $confirm.on('click', '.mt-modal-close', function (e) {
            self.hide(null);
        });
    };

    // 显示
    this.show = function () {
        $confirm.removeClass('zoomOut').addClass('animated zoomIn').show();
        $bg.show();
        _this.bindEvent();
    };

    // 隐藏
    this.hide = function (mark) {
        $confirm.removeClass('zoomIn').addClass('zoomOut');
        setTimeout(function () {
            $confirm.hide();
            $bg.hide();
            $confirm.off('click').remove();
        }, 500);
        if (set.callback) {
            set.callback(mark);
        }
    };

    return this;
};

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//设置html，如果mark = true，不重置 mt-active
function setHtml(page, showpage, maxpage, mark) {
    page = page ? page : 1;
    var shtml = '<div class="mt-pagelist">\n        <ul class="clearfix">\n            <li><a class="iconfont icon-a3left mt-pageprev"></a></li>\n            {{pageli}}\n            <li><a class="iconfont icon-a3right mt-pagenext"></a></li>\n        </ul>\n    </div>';
    var pageli = '';
    var addCls = function addCls(num) {
        var className = '';
        if (!mark && num == page) {
            className = 'mt-active';
        }
        return className;
    };
    if (maxpage == 0) {
        shtml = '';
    } else if (maxpage <= showpage + 1) {
        for (var i = 0; i < maxpage; i++) {
            pageli += '<li><a class="' + addCls(i + 1) + '">' + (i + 1) + '</a></li>';
        }
    } else {
        //如果是大于maxpage
        var size = showpage - 2; //中间显示size个
        // 分三种情况： 1234...9   1...345...9  1...6789
        if (page < size + 1) {
            //1234...9
            for (var _i = 0; _i < size + 1; _i++) {
                pageli += '<li><a class="' + addCls(_i + 1) + '">' + (_i + 1) + '</a></li>';
            }
            pageli += '<li><a class="mt-pagelist-next">...</a></li>';
            pageli += '<li><a>' + maxpage + '</a></li>';
        } else if (page >= size + 1 && page <= maxpage - size) {
            //1...567...9    			
            pageli += '<li><a>1</a></li>';
            pageli += '<li><a class="mt-pagelist-prev">...</a></li>';
            for (var _i2 = page - 1; _i2 < size + page - 1; _i2++) {
                pageli += '<li><a class="' + addCls(_i2) + '">' + _i2 + '</a></li>';
            }
            pageli += '<li><a class="mt-pagelist-next">...</a></li>';
            pageli += '<li><a>' + maxpage + '</a></li>';
        } else {
            //1...6789
            pageli += '<li><a>1</a></li>';
            pageli += '<li><a class="mt-pagelist-prev">...</a></li>';
            for (var _i3 = 0; _i3 < size + 1; _i3++) {
                var nowp = maxpage - (size + 1 - _i3) + 1;
                pageli += '<li><a class="' + addCls(nowp) + '">' + nowp + '</a></li>';
            }
        }
    }
    addCls = null;
    shtml = shtml.replace('{{pageli}}', pageli);
    return shtml;
}

/**
 * 分页插件
 */
$.fn.pagelist = function (setting) {

    var defaults = {
        refresh: false,
        page: 9, //当前第几页
        pagesize: 20, //20条每页
        count: 0, //总共多少条数据
        showpage: 5 //最大显示多少页 .. >= 4
    };
    var _this = this;
    var set = $.extend(defaults, setting);
    var maxpage = Math.ceil(set.count / set.pagesize);

    // 避免重复渲染
    if ($(this).find('.mt-pagelist')[0]) {
        $(this).html(setHtml(set.page, set.showpage, maxpage));
        return;
    }

    if (set.showpage < 4) {
        console.error('showpage最小为4');
        return;
    }

    //页面跳转
    var toPage = function toPage(page, mark) {
        $(_this).html(setHtml(page, set.showpage, maxpage, mark));
    };

    //自定义page事件
    var pageEvent = function pageEvent(nowpage) {
        $(_this).trigger('page', {
            page: nowpage,
            count: set.count,
            pagesize: set.pagesize
        });
    };

    //上一页
    var nextPage = function nextPage() {
        var nowpage = $(_this).find('.mt-active').html();
        nowpage++;
        if (nowpage > maxpage) {
            nowpage = maxpage;
        }
        pageEvent(nowpage);
        toPage(nowpage);
    };

    //下一页
    var prevPage = function prevPage() {
        var nowpage = $(_this).find('.mt-active').html();
        nowpage--;
        if (nowpage <= 0) {
            nowpage = 1;
        }
        pageEvent(nowpage);
        toPage(nowpage);
    };

    //上一段
    var prevSize = function prevSize() {
        var nowpage = $(_this).find('.mt-pagelist-prev').parent().next().text();
        var size = set.showpage - Math.ceil(set.showpage / 2);
        nowpage = parseInt(nowpage, 10);
        nowpage -= size;
        if (nowpage < 1) {
            nowpage = 1;
        }
        toPage(nowpage, true);
    };

    //下一段
    var nextSize = function nextSize() {
        var nowpage = $(_this).find('.mt-pagelist-next').parent().prev().text();
        nowpage = parseInt(nowpage, 10);
        nowpage += 2;
        if (nowpage > maxpage) {
            nowpage = maxpage;
        }
        toPage(nowpage, true);
    };

    //init
    var init = function init() {
        $(_this).html(setHtml(set.page, set.showpage, maxpage));
    };

    //事件驱动
    $(_this).off('click.pagelist').on('click.pagelist', '.mt-pagelist', function (e) {
        var cls = e.target.className ? e.target.className : '';
        if (cls.indexOf('mt-pagenext') != -1) {
            //下一页
            nextPage();
        } else if (cls.indexOf('mt-pageprev') != -1) {
            //上一页
            prevPage();
        } else if (cls.indexOf('mt-pagelist-next') != -1) {
            //下一段
            nextSize();
        } else if (cls.indexOf('mt-pagelist-prev') != -1) {
            //上一段
            prevSize();
        } else {
            //页码
            var nowpage = parseInt(e.target.text, 10);
            pageEvent(nowpage);
            toPage(nowpage);
        }
    });

    init();

    // 刷新当前页面
    _this.refresh = function () {
        $(_this).html(setHtml(set.page, set.showpage, maxpage));
    }.bind(_this);

    return _this;
}; //END fn

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(210), __esModule: true };

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(211);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(15), 'Object', { defineProperty: __webpack_require__(11).f });


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImgLayer = undefined;

var _getPrototypeOf = __webpack_require__(60);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.imgDom = imgDom;

var _layer = __webpack_require__(102);

var _layer2 = _interopRequireDefault(_layer);

var _imgTpl = __webpack_require__(117);

var _AppDataFun = __webpack_require__(1);

var _set = __webpack_require__(235);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// layer 模板
//图片模版 。。
function imgDom(obj) {
    return '\n    <div id="' + (obj.id || '') + '" data-uefun="' + (obj.ue ? $.escape(obj.ue) : '') + '" class="layer layer-img" style="' + $.toStyle(obj.style) + '">\n        <div class="element" style="' + $.toStyle(obj.estyle, obj.animate) + '"><img src="' + (obj.data.src || 'none') + '" /></div>\n    </div>';
}

// layer 原始数据, 用于保存在 AppData里面的数据

var ImgLayer = exports.ImgLayer = function ImgLayer(animate, data, estyle, style, type, typename) {
    (0, _classCallCheck3.default)(this, ImgLayer);

    this.animate = animate || [];
    this.data = data || {
        src: _set.blankImg
    };
    this.estyle = estyle || {};
    this.style = style || {
        width: '200px',
        height: '160px',
        top: '10px',
        left: '10px',
        'z-index': 9999
    };
    this.type = type || 'img';
    this.color = 'none';
    this.ue = null;
    this.typename = typename || '图片';
};

// Img 类，主要是一些方法实现


var Img = function (_Layer) {
    (0, _inherits3.default)(Img, _Layer);

    function Img(layer) {
        (0, _classCallCheck3.default)(this, Img);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Img.__proto__ || (0, _getPrototypeOf2.default)(Img)).call(this, layer));

        _this.$crop = null;
        return _this;
    }

    (0, _createClass3.default)(Img, [{
        key: 'cropBack',
        value: function cropBack(method, val) {
            console.log(method, val);
            if (method === 'crop') {
                // 剪切后 重新设置 img 的src
                AppData.edit.layerDom.find('img').attr('src', this.layer.data.src);
            } else if (method === 'reset') {
                // ... 重置图片
                AppData.edit.layerDom.find('img').attr('src', this.layer.data.src);
            } else if (method === 'delete') {
                // 删除图片，在 initCrop 里面已经做了处理了
            } else if (method === 'select') {
                var img = new Image();
                img.src = val;
                // 重新设置layer 对象
                this.layer.data.src = val;
                this.layer.style.width = img.naturalWidth + 'px';
                this.layer.style.height = img.naturalHeight + 'px';
                // 重新设置尺寸
                AppData.edit.layerDom.css({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                }).find('img').attr('src', val);
                $('#basicTpl_set_width').val(img.naturalWidth + 'px');
                $('#basicTpl_set_height').val(img.naturalHeight + 'px');
            }
            // 重新渲染页面
            (0, _AppDataFun.AppDataChange)();
        }

        // 事件绑定

    }, {
        key: 'initEvent',
        value: function initEvent() {
            var self = this;
            // 图片剪切, 因为事件绑定，被外部函数所引用，形成闭包，内存无法释放。以后这里需要做优化
            var $crop = (0, _imgTpl.initCrop)(this, $('#setStyle').find('.set_img_crop'), {}, this.cropBack.bind(this));
        }

        // 模板

    }, {
        key: 'render',
        value: function render() {

            var self = this;

            // 图片模板
            var imgTpls = (0, _imgTpl.imgTpl)({
                src: self[self.className].data.src || ''
            });

            var _getSetBoxTpl = this._getSetBoxTpl(),
                basicTpls = _getSetBoxTpl.basicTpls,
                bgColorTpls = _getSetBoxTpl.bgColorTpls,
                basicMoreTpls = _getSetBoxTpl.basicMoreTpls;

            // 编辑区域


            $('#setStyle').html(basicTpls + imgTpls + bgColorTpls + basicMoreTpls);
        }

        // 初始化

    }, {
        key: 'init',
        value: function init() {

            // 初始化 公用模块
            this._init();

            // 控制tab head 显示隐藏
            // this.setLayerTabHead();

            // 初始化设置区域
            this.render();

            // 设置区域事件绑定，事件绑定在 render 之后执行
            this._initEvent();
            this.initEvent();

            // console.log('layer::img 11 =>', this);
            (0, _AppDataFun.setLayerClass)(this);
        }
    }]);
    return Img;
}(_layer2.default);

exports.default = Img;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(214);
module.exports = __webpack_require__(2).Object.getPrototypeOf;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(69);
var $getPrototypeOf = __webpack_require__(94);

__webpack_require__(215)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(10);
var core = __webpack_require__(2);
var fails = __webpack_require__(25);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(217), __esModule: true };

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(218);
module.exports = __webpack_require__(2).Object.setPrototypeOf;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(10);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(219).set });


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(14);
var anObject = __webpack_require__(13);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(22)(Function.call, __webpack_require__(133).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(221), __esModule: true };

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(222);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(56) });


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setUeEvent = setUeEvent;
exports.initUeSet = initUeSet;

var _linkTpl = __webpack_require__(224);

var _toPageTpl = __webpack_require__(226);

var _telTpl = __webpack_require__(228);

var _msgTpl = __webpack_require__(230);

var _hideShowTpl = __webpack_require__(232);

var _AppDataFun = __webpack_require__(1);

/**
 * @desc layer 的交互
*/
/**
 * @desc 交互模块及功能，在页面上全是 JS控制，为了不加太多属性，之用一个属性控制, 所有函数名字前面加个 ueOf
 * <div class="layer" data-ue='{"name":"超链接", "fun": "ueOflink", "data": "http://www.h5ds.com"}'></div>
 * 多个存放到数组
 */
function switchUeTpl(self, fun) {
    // if(!self.layer.ue.data) {
    //     self.layer.ue.data = {};
    // }
    var tpl = '';

    console.log(self.layer.ue);

    switch (fun) {
        case 'link':
            tpl = (0, _linkTpl.linkTpl)(self);break;
        case 'toPage':
            tpl = (0, _toPageTpl.toPageTpl)(self);break;
        case 'tel':
            tpl = (0, _telTpl.telTpl)(self);break;
        case 'msg':
            tpl = (0, _msgTpl.msgTpl)(self);break;
        case 'hideShow':
            tpl = (0, _hideShowTpl.hideShowTpl)(self);break;
    }

    $('#setUeSetBox').html(tpl);
    // return tpl;
}

/**
 * @desc layer 的交互
*/
function switchUeEvent(self, fun) {
    switch (fun) {
        case 'link':
            (0, _linkTpl.linkEvent)(self);break;
        case 'toPage':
            (0, _toPageTpl.toPageEvent)(self);break;
        case 'tel':
            (0, _telTpl.telEvent)(self);break;
        case 'msg':
            (0, _msgTpl.msgEvent)(self);break;
        case 'hideShow':
            (0, _hideShowTpl.hideShowEvent)(self);break;
    }
}

// 以下非配置项 ////////////////////////////////////////////////////////////////////////////////////////

/**
 * @desc 设置交互名字
*/
function setUeName(self) {
    var name = '';
    var layer = self.layer;
    var ue = layer.ue;
    if (ue) {
        name = ue.name;
    }
    $('#setUeSetName').html(name);
}

/**
 * @desc 事件
 */
function setUeEvent(self) {

    var toggleSet = function toggleSet() {
        if ($('.setue-set-show')[0]) {
            $('.setue-set-show').removeClass('setue-set-show');
        } else {
            $('#setUeSet').addClass('setue-set-show');
        }
    };

    // 选择 列表
    $('#setUeList').off('click').on('click', '.fun', function (e) {
        var fun = $(this).attr('data-fun');
        var name = $(this).find('span').text();

        // 设置参数
        if (!self.layer.ue) {
            self.layer.ue = {};
        }
        // 设置参数 fun 作为 key
        if (!self.layer.ue[fun]) {
            self.layer.ue[fun] = {
                name: name,
                fun: fun,
                data: null
            };
        }

        // 重新设置列表 样式
        initUeSet(self);
        toggleSet(); // 显示面板

        // 设置模板
        switchUeTpl(self, fun);
        // 添加事件
        switchUeEvent(self, fun);

        $('.clear-setue').attr('data-fun', fun);
    });

    // 功能模块 - 关闭面板
    $(document).off('click.setUeClose').on('click.setUeClose', '.close-setue', function (e) {
        // 设置参数
        toggleSet();
    });

    // 清除功能
    $(document).off('click.setUeClear').on('click.setUeClear', '.clear-setue', function (e) {
        // 设置参数
        var fun = $(this).attr('data-fun');
        delete self.layer.ue[fun];
        initUeSet(self);
        (0, _AppDataFun.AppDataChange)();
        toggleSet();
    });
}

/**
 * @desc 交互区域设置
*/
function initUeSet(self) {

    // 设置交互名字
    setUeName(self);

    // 设置模板，显示or 隐藏 设置区域
    var $setUeList = $('#setUeList');
    $setUeList.find('.fun').removeClass('active');
    if (self.layer.ue) {
        for (var key in self.layer.ue) {
            var ue = self.layer.ue[key];
            $setUeList.find('.fun[data-fun="' + ue.fun + '"]').addClass('active');
        }
    }
}

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.linkTpl = linkTpl;
exports.linkEvent = linkEvent;

__webpack_require__(225);

var _AppDataFun = __webpack_require__(1);

/**
 * @desc 超链接
 */
function linkTpl(self) {
    var _self$layer$ue$link = self.layer.ue.link,
        data = _self$layer$ue$link.data,
        name = _self$layer$ue$link.name,
        fun = _self$layer$ue$link.fun;

    return '\n        <div class="uebox uebox-links">\n            <div class="uebox-links-txt">\n                <textarea placeholder="\u8BF7\u8F93\u5165\u5E26http\u7684\u94FE\u63A5\u5730\u5740" id="ueBoxLinksTextArea">' + (data || '') + '</textarea>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u8981\u8DF3\u8F6C\u5230\u7684\u94FE\u63A5\u5730\u5740\u5C31\u53EF\u4EE5\u4E86\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件。。
*/
function linkEvent(self) {
    $('#ueBoxLinksTextArea').off('change').on('change', function () {
        var val = $(this).val();
        self.layer.ue.link.data = val;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 225 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toPageTpl = toPageTpl;
exports.toPageEvent = toPageEvent;

__webpack_require__(227);

var _AppDataFun = __webpack_require__(1);

/**
 * @desc 页面跳转
 */
function toPageTpl(self) {
    var _self$layer$ue$toPage = self.layer.ue.toPage,
        data = _self$layer$ue$toPage.data,
        name = _self$layer$ue$toPage.name,
        fun = _self$layer$ue$toPage.fun;

    var shtml = '';
    for (var i = 0; i < AppData.data.pages.length; i++) {
        var d = AppData.data.pages[i];
        shtml += '<li title="' + d.name + '" data-page="' + i + '" class="' + (data === i ? 'active' : '') + '">\n            <span class="num">' + (i + 1) + '</span>\n            <span class="name">' + d.name + '</span>\n        </li>';
    }
    return '\n        <div class="uebox uebox-topages">\n            <div class="uebox-topages">\n                <h4>\u8BF7\u9009\u62E9\u60A8\u8981\u8DF3\u8F6C\u7684\u9875\u9762\uFF1A</h4>\n                <ul id="ueBoxToPage">\n                    ' + shtml + '\n                </ul>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u9009\u62E9\u4E00\u4E2A\u8981\u8DF3\u8F6C\u7684\u9875\u9762\uFF0C\u70B9\u51FB\u4F1A\u89E6\u53D1\u4EA4\u4E92\u6548\u679C\uFF0C\u8DF3\u8F6C\u5230\u6307\u5B9A\u7684\u9875\u9762\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function toPageEvent(self) {
    $('#ueBoxToPage').off('click').on('click', 'li', function () {
        var val = $(this).attr('data-page');
        $(this).addClass('active').siblings('li').removeClass('active');
        self.layer.ue.toPage.data = parseInt(val, 10);
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 227 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.telTpl = telTpl;
exports.telEvent = telEvent;

__webpack_require__(229);

var _AppDataFun = __webpack_require__(1);

/**
 * @desc 超链接
 */
function telTpl(self) {
    var _self$layer$ue$tel = self.layer.ue.tel,
        data = _self$layer$ue$tel.data,
        name = _self$layer$ue$tel.name,
        fun = _self$layer$ue$tel.fun;

    return '\n        <div class="uebox uebox-tel">\n            <div class="uebox-tel-input">\n                <input placeholder="\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801" id="ueBoxLinksTel" value="' + (data || '') + '"/>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u8981\u7535\u8BDD\u53F7\u7801\u5373\u53EF\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function telEvent(self) {
    $('#ueBoxLinksTel').off('change').on('change', function () {
        var val = $(this).val();
        self.layer.ue.tel.data = val;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 229 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.msgTpl = msgTpl;
exports.msgEvent = msgEvent;

__webpack_require__(231);

var _AppDataFun = __webpack_require__(1);

/**
 * @desc 发短信
 */
function msgTpl(self) {
    var _self$layer$ue$msg = self.layer.ue.msg,
        data = _self$layer$ue$msg.data,
        name = _self$layer$ue$msg.name,
        fun = _self$layer$ue$msg.fun;

    return '\n        <div class="uebox uebox-tel">\n            <div class="uebox-tel-input">\n                <input placeholder="\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801" id="ueBoxMsg" value="' + (data || '') + '"/>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u8981\u53D1\u77ED\u4FE1\u7684\u7535\u8BDD\u53F7\u7801\u5373\u53EF\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function msgEvent(self) {
    $('#ueBoxMsg').off('change').on('change', function () {
        var val = $(this).val();
        self.layer.ue.msg.data = val;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 231 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideShowTpl = hideShowTpl;
exports.hideShowEvent = hideShowEvent;

__webpack_require__(233);

var _AppDataFun = __webpack_require__(1);

/**
 * @desc 超链接
 */
function hideShowTpl(self) {
    if (!self.layer.ue.hideShow.data) {
        self.layer.ue.hideShow.data = {};
    }
    var _self$layer$ue$hideSh = self.layer.ue.hideShow,
        data = _self$layer$ue$hideSh.data,
        name = _self$layer$ue$hideSh.name,
        fun = _self$layer$ue$hideSh.fun;

    return '\n        <div class="uebox uebox-hideshow">\n            <div class="uebox-hideshow-box">\n                <ul id="ueBoxShowHideCheckbox" class="mt-checkbox-group">\n                    <li class="mt-checkbox-item ' + (data.type === 'show' ? 'mt-checkbox-active' : '') + '" data-val="show">\u53EA\u663E\u793A</li>\n                    <li class="mt-checkbox-item ' + (data.type === 'hide' ? 'mt-checkbox-active' : '') + '" data-val="hide">\u53EA\u9690\u85CF</li>\n                    <li class="mt-checkbox-item ' + (data.type === 'showhide' ? 'mt-checkbox-active' : '') + '" data-val="showhide">\u663E\u9690\u5207\u6362</li>\n                </ul>\n                <textarea placeholder="\u8BF7\u8F93\u5165\u76EE\u6807\u5143\u7D20\u7684id, \u591A\u4E2Aid\u7528,\u5206\u9694" id="ueBoxHideShowTextArea">' + (data.ids || '') + '</textarea>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u9009\u62E9\u663E\u9690\u85CF\u7684\u4EA4\u4E92\u65B9\u5F0F\uFF0C\u8BBE\u7F6E\u76EE\u6807\u5143\u7D20\u7684id\uFF0C\u591A\u4E2Aid\u7528,\u5206\u9694\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function hideShowEvent(self) {
    $('#ueBoxShowHideCheckbox').off('changes').on('changes', function (e, data) {
        self.layer.ue.hideShow.data.type = data.val;
        (0, _AppDataFun.AppDataChange)();
    });

    $('#ueBoxHideShowTextArea').off('change').on('change', function (e) {
        var val = $(this).val();
        if (/[a-zA-z_0-9,]+/.test(val)) {
            self.layer.ue.hideShow.data.ids = val;
            (0, _AppDataFun.AppDataChange)();
        } else {
            $.tip({
                msg: 'id格式填写错误', //
                type: 'danger',
                time: 3000
            });
        }
    });
}

/***/ }),
/* 233 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setAnimateList = setAnimateList;
exports.animateEvent = animateEvent;

var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

var _AppDataFun = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 动画类型转换
function animateType(type) {
    console.log(type);
    switch (type) {
        case 'in':
            type = '进入';
            break;
        case 'out':
            type = '离开';
            break;
        default:
            type = '强调';
            break;
    }
    return type;
}

// 动画类型转换 反
//
function animateTypeUn(type) {
    switch (type) {
        case '进入':
            type = 'in';
            break;
        case '离开':
            type = 'out';
            break;
        default:
            type = 'em';
            break;
    }
    return type;
}

// 设置layer 的动画的 列表
function tplAnimateHTML(obj) {
    if (obj === undefined) {
        // 添加动画，默认设置的动画
        obj = { // 添加动画，默认的动画
            animate: 'fadeIn',
            name: 'fade in',
            type: 'in',
            time: '1s',
            delay: '0s',
            count: '1',
            fun: 'ease'
        };
    }

    obj.type = animateType(obj.type);
    return '<li class="animation-item" data-animate="' + obj.animate + '" data-type="' + obj.type + '" data-name="' + obj.name + '">\n                <span class="tname">\n                    <span data-title="' + obj.type + '\uFF1A' + obj.name + '" class="animation-name">' + obj.type + ':' + obj.name + '</span>\n                </span>\n                <span class="ttime">\n                    <input mt-wheel="0,0.1,10000" data-type="time" class="animation-time mt-input" mt-type="s" type="text" value="' + obj.time + '">\n                </span>\n                <span class="tdelay">\n                    <input mt-wheel="0,0.1,10000" data-type="delay" class="animation-delay mt-input" mt-type="s" type="text" value="' + obj.delay + '"> \n                </span>\n                <span class="tcount">\n                    <input data-type="count" class="animation-count mt-input" mt-type="" type="text" mt-wheel="1,1,10000" value="' + obj.count + '"> \n                </span>\n                <span class="tfun">\n                    <div class="mt-select">\n                        <select class="animation-fun" data-type="fun" placeholder="\u51FD\u6570">\n                            <option ' + (obj.fun === 'ease' ? 'selected' : '') + ' value="ease">\u9ED8\u8BA4</option>\n                            <option ' + (obj.fun === 'linear' ? 'selected' : '') + ' value="linear">\u5300\u901F</option>\n                            <option ' + (obj.fun === 'ease-in' ? 'selected' : '') + ' value="ease-in">\u52A0\u901F</option>\n                            <option ' + (obj.fun === 'ease-out' ? 'selected' : '') + ' value="ease-out">\u51CF\u901F</option>\n                            <option ' + (obj.fun === 'ease-in-out' ? 'selected' : '') + ' value="ease-in-out">\u8D77\u59CB\u6162</option>\n                        </select>\n                    </div>\n                </span>\n                <!--<input data-type="fun" class="animation-fun mt-input" mt-type="" type="text" value="' + obj.fun + '">-->\n                <a class="animation-delete"><i class="iconfont icon-close"></i></a>\n            </li>';
}

// 设置动画
function setAnimate(self) {
    // 设置 layer 动画属性
    // animation: name duration timing-function delay iteration-count direction fill-mode play-state;
    var arr = [];
    $('#animationList').find('li').each(function () {
        var $that = $(this);
        var obj = {};
        var $name = $that.find('.animation-name');

        // 设置点击对象的值
        obj['animate'] = $that.attr('data-animate');
        obj['name'] = $that.attr('data-name');
        obj['type'] = $that.attr('data-type');
        obj['time'] = $that.find('.animation-time').val();
        obj['delay'] = $that.find('.animation-delay').val();
        obj['count'] = $that.find('.animation-count').val();
        obj['fun'] = $that.find('.animation-fun').val();

        arr.push({
            name: obj.name,
            type: animateTypeUn(obj.type),
            style: obj.animate + ' ' + obj.time + ' ' + obj.fun + ' ' + obj.delay + ' ' + obj.count + ' normal forwards running'
        });
    });

    // table 标题显示
    if (arr.length === 0) {
        $('.animate-title').hide();
    } else {
        $('.animate-title').show();
    }

    // 设置 edit 对象里面的临时变量 -> 动画
    if (AppData.edit.layerDom) {
        AppData.edit.layerDom.addStyle({
            animate: arr
        });
    }

    // 设置 layer 对象
    self.layer.animate = arr;
    (0, _AppDataFun.AppDataChange)();
}

// 设置动画 的设置区域
function setAnimateList(self) {
    var $animationList = $('#animationList');
    var timeMax = 0; // 动画时间加上延时时间
    var anim = self.layer.animate;
    // console.log('>>>>',anim);
    if ($.isArray(anim) && anim.length > 0) {
        var shtml = '';
        for (var i = 0; i < anim.length; i++) {
            var d = anim[i];
            var style = d.style.replace(/\s+/, ' ');
            var name = d.name;
            var type = d.type;
            // zoomIn 1s ease 2s 1 normal forwards running
            var sArr = style.split(' ');
            var animate = sArr[0],
                time = sArr[1],
                fun = sArr[2],
                delay = sArr[3],
                count = sArr[4];

            var timeAll = parseInt(time, 10) + parseInt(delay, 10);
            if (timeMax < timeAll) {
                timeMax = timeAll;
            }

            shtml += tplAnimateHTML({
                animate: animate,
                name: name,
                type: type,
                fun: fun,
                time: time,
                delay: delay,
                count: count
            });
        } // end for	
        $('.animate-title').show();
        $animationList.html(shtml);
    } else {
        $('.animate-title').hide();
        $animationList.empty();
    }
}

// 动画列表 的事件
function animateEvent(self) {
    var $animationList = $('#animationList');

    // 动画排序 uniqend
    $animationList.off('uniqend').on('uniqend', function (e, obj) {
        // console.log('>>>>>>>>>', obj);
        setAnimate(self);
    });

    // 选中动画 li标签
    $animationList.off('click.animationItem').on('click.animationItem', '.animation-item', function (e) {
        e.stopPropagation();
        var $this = $(this);

        $this.addClass('active').siblings().removeClass('active');
        // // 设置点击对象的值
        self.$selectAnimateDom = $this;
    });

    // 删除动画
    $animationList.off('click.animationDelete').on('click.animationDelete', '.animation-delete', function (e) {
        e.stopPropagation();
        $(this).closest('.animation-item').remove();
        // 重新设置 layer动画 dom, obj
        setAnimate(self);
    });

    // 选择动画
    $('#animatesList').off('click.liDataAniamte').on('click.liDataAniamte', "li[data-animate]", function (e) {
        e.stopPropagation();
        if (!self.$selectAnimateDom) {
            $.tip({
                msg: '请先添加动画，或选择动画列表！',
                type: 'danger'
            });
            return;
        }

        // 保留原来的时间，延迟，次数
        var old = {};
        old.time = self.$selectAnimateDom.find('.animation-time').val();
        old.delay = self.$selectAnimateDom.find('.animation-delay').val();
        old.count = self.$selectAnimateDom.find('.animation-count').val();
        old.fun = self.$selectAnimateDom.find('.animation-fun').val();

        var animate = $(this).data('animate');
        var name = $(this).data('name');
        var type = $(this).data('type');
        var time = $(this).data('time');
        var delay = $(this).data('delay');
        var count = $(this).data('count');
        var fun = $(this).data('fun');

        // 初始化 动画 li 区域
        self.$selectAnimateDom.attr('data-animate', animate);
        self.$selectAnimateDom.attr('data-name', name);
        self.$selectAnimateDom.attr('data-type', type);
        self.$selectAnimateDom.find('.animation-time').val(old.time || time);
        self.$selectAnimateDom.find('.animation-delay').val(old.delay || delay);
        self.$selectAnimateDom.find('.animation-count').val(old.count || count);
        self.$selectAnimateDom.find('.animation-fun').val(old.fun || fun);

        // 设置名字
        type = animateType(type);
        self.$selectAnimateDom.find('.animation-name').attr('data-title', type + ':' + name).html(type + ':' + name);

        // 重新设置 layer动画 dom, obj
        setAnimate(self);
    });

    // 修改动画参数
    $animationList.off('changes.input').on('changes.input', 'input', function (e, val) {
        e.stopPropagation();
        setAnimate(self);
    });

    // 选择动画函数
    $animationList.off('change.animateFun').on('change.animateFun', '.animation-fun', function (e, val) {
        e.stopPropagation();
        setAnimate(self);
    });

    // 添加动画
    $('#animationAdd').off('click').on('click', function (e) {
        e.stopPropagation();
        $('#animationList').append(tplAnimateHTML());
        $('#animationList').find('li').last().trigger('click.animationItem');
        setAnimate(self);
    });
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var blankImg = exports.blankImg = '/assets/images/imgDom.jpg'; // 默认替代图片

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextLayer = undefined;

var _getPrototypeOf = __webpack_require__(60);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.textDom = textDom;

__webpack_require__(237);

var _layer = __webpack_require__(102);

var _layer2 = _interopRequireDefault(_layer);

var _setTpl = __webpack_require__(238);

var _fun = __webpack_require__(239);

var font = _interopRequireWildcard(_fun);

var _filterTxt = __webpack_require__(147);

var _AppDataFun = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// layer 模板
// 设置文本样式
function textDom(obj) {
    var shtml = '';
    var d = obj.data;
    if (d.data) {
        shtml = '<div class="el-text" style="' + d.fontStyle + '">' + d.data + '</div>';
    }
    return '\n    <div id="' + (obj.id || '') + '" data-uefun="' + (obj.ue ? $.escape(obj.ue) : '') + '" class="layer layer-text" style="' + $.toStyle(obj.style) + '">\n        <div class="element" style="' + $.toStyle(obj.estyle, obj.animate) + '">\n            ' + (shtml || '<div>请输入文本内容</div>') + '\n        </div>\n    </div>';
}

// layer 原始数据
// 图片模版 。。

var TextLayer = exports.TextLayer = function TextLayer(animate, data, estyle, style, type, typename) {
    (0, _classCallCheck3.default)(this, TextLayer);

    this.animate = animate || [];
    this.data = {
        data: '<div>请输入文本内容</div>',
        fontStyle: ''
    };
    this.estyle = estyle || {};
    this.style = style || {
        width: '200px',
        height: '160px',
        top: '10px',
        left: '10px',
        'z-index': 9999
    };
    this.ue = null;
    this.type = type || 'text';
    this.typename = typename || '文本';
};

var Text = function (_Layer) {
    (0, _inherits3.default)(Text, _Layer);

    function Text(layer) {
        (0, _classCallCheck3.default)(this, Text);
        return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).call(this, layer));
    }

    // 事件绑定


    (0, _createClass3.default)(Text, [{
        key: 'initEvent',
        value: function initEvent() {
            var self = this;
            var $exTextEdit = $('#exTextEdit');

            // 自定义事件
            $exTextEdit.off('keyup').on('keyup', function (e) {
                // 复制内
                if (e.ctrlKey && e.keyCode === 86) {
                    e.stopPropagation();
                    $(this).trigger('edit', 'copy');
                } else {
                    $(this).trigger('edit');
                }
            });

            // 变化事件监听
            // console.log('绑定');
            $exTextEdit.off('edit').on('edit', function (e, copy) {
                var $this = $(this);
                var style = $this.attr('style');
                var sHtml = '';

                // 如果是复制内容, 自动清除格式
                if (copy) {
                    $this.removeAttr('style').find('span').removeAttr('style');
                }
                sHtml = $this.html();
                var eHtml = '<div style="' + style + '" class="el-text">' + sHtml + '</div>';
                // console.log('$$$$', style);
                // 重新设置layer 对象
                self.layer.data.data = sHtml;
                self.layer.data.fontStyle = style;
                // 设置 self
                AppData.edit.layerDom.find('.element').html(eHtml);
                (0, _AppDataFun.AppDataChange)();
            });

            // 字体颜色
            $('#exZiTiYanSe').off('change').on('change', function (e) {
                $exTextEdit.css('color', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 字体背景色
            // $('#exFontBg').off('change').on('change', function(e) {
            //     // 字体
            //     $exTextEdit.find('.txt').css('background-color', e.target.value);
            //     $exTextEdit.trigger('edit');
            // });

            // 字体大小
            $('#exFontSize').off('changes').on('changes', function (e) {
                // 字体
                $exTextEdit.css('font-size', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 字体间距
            $('#exFontSpace').off('changes').on('changes', function (e) {
                $exTextEdit.css('letter-spacing', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 字体行高
            $('#exFontLineHeight').off('changes').on('changes', function (e) {
                $exTextEdit.css('line-height', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 样式调试
            $('#exTextBtns').off('click').on('click', '.ex-btn', function (e) {
                var key = $(this).attr('data-fun');
                var $el = $exTextEdit;
                switch (key) {
                    case 'bold':
                        font.setBold($el);break;
                    case 'italic':
                        font.setOblique($el);break;
                    case 'strikethrough':
                        font.setFontLine($el, 'line-through');break;
                    case 'underline':
                        font.setFontLine($el, 'underline');break;
                    case 'indent':
                        font.fontDent($el, 'indent');break;
                    case 'dedent':
                        font.fontDent($el, 'dedent');break;
                    case 'alignright':
                        font.fontAlign($el, 'right');break;
                    case 'aligncenter':
                        font.fontAlign($el, 'center');break;
                    case 'alignleft':
                        font.fontAlign($el, 'left');break;
                    case 'eraser':
                        font.clearStyle($el);break;
                }
                $exTextEdit.trigger('edit');
            });
        }

        // 模板

    }, {
        key: 'render',
        value: function render() {
            // 图片模板
            var tpls = (0, _setTpl.setTpl)(this);

            var _getSetBoxTpl = this._getSetBoxTpl(),
                basicTpls = _getSetBoxTpl.basicTpls,
                bgColorTpls = _getSetBoxTpl.bgColorTpls,
                basicMoreTpls = _getSetBoxTpl.basicMoreTpls;

            // 编辑区域


            $('#setStyle').empty().html(basicTpls + tpls + bgColorTpls + basicMoreTpls);
        }

        // 初始化

    }, {
        key: 'init',
        value: function init() {

            // 初始化 公用模块
            this._init();

            // 初始化设置区域
            this.render();

            // 设置区域事件绑定，事件绑定在 render 之后执行
            this._initEvent();
            this.initEvent();

            // console.log('layer::img 11 =>', this);
            (0, _AppDataFun.setLayerClass)(this);
        }
    }]);
    return Text;
}(_layer2.default);

exports.default = Text;

/***/ }),
/* 237 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTpl = setTpl;

var _getCssInStyle = __webpack_require__(146);

/**
 * 设置模板
*/
function setTpl(self) {
    var obj = self.layer;
    var str = '<div class="ex-set-text">\n        <div class="ex-btns" id="exTextBtns">\n            <a class="ex-btn" data-fun="bold"><i class="iconfont icon-bold"></i></a>\n            <a class="ex-btn" data-fun="italic"><i class="iconfont icon-italic"></i></a>\n            <a class="ex-btn" data-fun="strikethrough"><i class="iconfont icon-strikethrough"></i></a>\n            <a class="ex-btn" data-fun="underline"><i class="iconfont icon-underline"></i></a>\n            <a class="line"></a>\n            <a class="ex-btn" data-fun="indent"><i class="iconfont icon-indent"></i></a>\n            <a class="ex-btn" data-fun="dedent"><i class="iconfont icon-dedent"></i></a>\n            <a class="line"></a>\n            <a class="ex-btn" data-fun="alignright"><i class="iconfont icon-alignright"></i></a>\n            <a class="ex-btn" data-fun="aligncenter"><i class="iconfont icon-aligncenter"></i></a>\n            <a class="ex-btn" data-fun="alignleft"><i class="iconfont icon-alignleft"></i></a>\n            <a class="line"></a>\n            <!-- <a class="ex-btn" data-fun="chain"><i class="iconfont icon-chain"></i></a>\n            <a class="ex-btn" data-fun="chainbroken"><i class="iconfont icon-chainbroken"></i></a>\n            <a class="ex-btn" data-fun="eraser"><i class="iconfont icon-eraser"></i></a><br/> -->\n\n            <!-- <div class="mt-select-diy">\n                <div class="mt-select-title">\u5B57\u4F53\u9009\u62E9</div>\n                <div class="mt-select-body" style="display: none;">\n                    \u8FD9\u91CC\u968F\u4FBF\u5199\u70B9\u4EC0\u4E48...\n                </div>\n            </div> -->\n            \n            <a title="\u6587\u5B57\u989C\u8272" class="ex-btn ex-btn-fontcolor" data-fun="zitiyanse">\n                <input class="mt-color-hidden" id="exZiTiYanSe" type="color" />\n                <i class="iconfont icon-zitiyanse"></i>\n            </a>\n            <!-- <a title="\u6587\u5B57\u80CC\u666F" class="ex-btn ex-btn-fontcolor" data-fun="a">\n            <input class="mt-color-hidden" id="exFontBg" type="color" />\n                <i class="iconfont icon-a"></i>\n            </a> -->\n            <br/>\n\n            <a title="\u5B57\u4F53\u5927\u5C0F" class="ex-btn"><i class="iconfont icon-zitidaxiao"></i></a>\n            <input mt-wheel="12,1,60" id="exFontSize" class="mt-input" mt-type=\'px\' type="text" value="' + ((0, _getCssInStyle.getStyle)(obj.data.fontStyle, 'font-size') || '14px') + '" placeholder="\u5B57\u4F53\u5927\u5C0Fpx" name="">\n\n            <a title="\u6587\u5B57\u95F4\u8DDD" class="ex-btn"><i class="iconfont icon-textwidth"></i></a>\n            <input mt-wheel="0,1,100" id="exFontSpace" class="mt-input" mt-type=\'px\' type="text" value="' + ((0, _getCssInStyle.getStyle)(obj.data.fontStyle, 'letter-spacing') || 0) + '" placeholder="\u6587\u5B57\u95F4\u8DDD" name="">\n\n            <a title="\u6587\u5B57\u884C\u9AD8" class="ex-btn"><i class="iconfont icon-textheight"></i></a>\n            <input mt-wheel="0,1,1000" id="exFontLineHeight" class="mt-input" mt-type=\'px\' type="text" value="' + ((0, _getCssInStyle.getStyle)(obj.data.fontStyle, 'line-height') || '21px') + '" placeholder="\u6587\u5B57\u884C\u9AD8" name="">\n        </div>\n        <div class="ex-text-edit">\n            <div style="' + obj.data.fontStyle + '" id="exTextEdit" contenteditable="true">\n                ' + obj.data.data + '\n            </div>\n        </div>\n    </div>';
    return str;
}

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setBold = setBold;
exports.setOblique = setOblique;
exports.setFontLine = setFontLine;
exports.fontDent = fontDent;
exports.fontAlign = fontAlign;
exports.setLink = setLink;
exports.clearStyle = clearStyle;
exports.getCurPos = getCurPos;
exports.setCurPos = setCurPos;
/**
 * @desc 设置字体加粗
 * @param $el 文本框对象
*/
function setBold($el) {
    var bold = $el.css('font-weight');
    if (bold == '400') {
        $el.css('font-weight', 'bolder');
    } else {
        $el.css('font-weight', '400');
    }
}

/**
 * @desc 设置字体倾斜
 * @param $el 文本框对象
*/
function setOblique($el) {
    var style = $el.css('font-style');
    if (style == 'oblique') {
        $el.css('font-style', 'normal');
    } else {
        $el.css('font-style', 'oblique');
    }
}

/**
 * @desc 设置文字线条
 * @param $el 文本框对象
 * @param val 线的位置 line-through, underline
*/
function setFontLine($el, val) {
    var style = $el.css('text-decoration');
    if (style.indexOf(val) === -1) {
        $el.css('text-decoration', val);
    } else {
        $el.css('text-decoration', 'none');
    }
}

/**
 * @desc 设置字缩进
 * @param $el 文本框对象
 * @param val 缩进方向 indent，dedent
 */
function fontDent($el, val) {
    var style = parseInt($el.css('text-indent'), 10);
    var fontSize = parseInt($el.css('font-size'), 10);
    if (val === 'indent') {
        style += fontSize;
    } else if (val === 'dedent') {
        style -= fontSize;
    } else {
        // ...
    }
    $el.css('text-indent', style);
}

/**
 * @desc 文本对齐方式
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
function fontAlign($el, val) {
    var style = $el.css('text-align');
    // console.log(style);
    $el.css('text-align', val);
}

/**
 * @desc 超链接
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
function setLink($el, val) {
    var style = $el.attr('mt-exa-link') || false;
}

/**
 * @desc 清除样式
 * @param $el 文本框对象
*/
function clearStyle($el) {
    $el.attr('style', '');
}

// 获取光标位置
function getCurPos(textDom) {
    var cursorPos = 0;
    if (document.selection) {
        // IE Support
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
    } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        cursorPos = textDom.selectionStart;
    }
    return cursorPos;
}

// 设置光标位置
function setCurPos(textDom, pos) {
    if (textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VideoLayer = undefined;

var _getPrototypeOf = __webpack_require__(60);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.videoDom = videoDom;

__webpack_require__(241);

var _layer = __webpack_require__(102);

var _layer2 = _interopRequireDefault(_layer);

var _setTpl = __webpack_require__(242);

var _fun = __webpack_require__(243);

var font = _interopRequireWildcard(_fun);

var _filterTxt = __webpack_require__(147);

var _AppDataFun = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// layer 模板
// 设置文本样式
function videoDom(obj) {
    var shtml = '';
    var d = obj.data;
    return '\n    <div id="' + (obj.id || '') + '" data-uefun="' + (obj.ue ? $.escape(obj.ue) : '') + '" class="layer layer-text" style="' + $.toStyle(obj.style) + '">\n        <div class="element" style="' + $.toStyle(obj.estyle, obj.animate) + '">\n            ' + obj.data + '\n        </div>\n    </div>';
}

// layer 原始数据
// 图片模版 。。

var VideoLayer = exports.VideoLayer = function VideoLayer(animate, data, estyle, style, type, typename) {
    (0, _classCallCheck3.default)(this, VideoLayer);

    this.animate = animate || [];
    this.data = null;
    this.estyle = estyle || {};
    this.style = style || {
        width: '200px',
        height: '160px',
        top: '10px',
        left: '10px',
        'z-index': 9999
    };
    this.ue = null;
    this.type = type || 'video';
    this.typename = typename || '视频';
};

var Video = function (_Layer) {
    (0, _inherits3.default)(Video, _Layer);

    function Video(layer) {
        (0, _classCallCheck3.default)(this, Video);
        return (0, _possibleConstructorReturn3.default)(this, (Video.__proto__ || (0, _getPrototypeOf2.default)(Video)).call(this, layer));
    }

    // 事件绑定


    (0, _createClass3.default)(Video, [{
        key: 'initEvent',
        value: function initEvent() {
            var self = this;

            $('#videoUrl').on('change', function () {
                self.layer.data = $(this).val();
                AppData.edit.layerDom.find('.element').html($(this).val());
                (0, _AppDataFun.AppDataChange)();
            });
        }

        // 模板

    }, {
        key: 'render',
        value: function render() {
            // 模板
            var tpls = (0, _setTpl.setTpl)(this);

            var _getSetBoxTpl = this._getSetBoxTpl(),
                basicTpls = _getSetBoxTpl.basicTpls,
                bgColorTpls = _getSetBoxTpl.bgColorTpls,
                basicMoreTpls = _getSetBoxTpl.basicMoreTpls;

            // 编辑区域


            $('#setStyle').html(basicTpls + tpls + bgColorTpls + basicMoreTpls);
        }

        // 初始化

    }, {
        key: 'init',
        value: function init() {

            // 初始化 公用模块
            this._init();

            // 初始化设置区域
            this.render();

            // 设置区域事件绑定，事件绑定在 render 之后执行
            this._initEvent();
            this.initEvent();

            // console.log('layer::img 11 =>', this);
            (0, _AppDataFun.setLayerClass)(this);
        }
    }]);
    return Video;
}(_layer2.default);

exports.default = Video;

/***/ }),
/* 241 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTpl = setTpl;

var _getCssInStyle = __webpack_require__(146);

/**
 * 设置模板
*/
function setTpl(self) {
    var obj = self.layer;
    var str = '<div class="ex-set-video">\n        <textarea id="videoUrl">' + obj.data + '</textarea>\n        </div>';
    return str;
}

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setBold = setBold;
exports.setOblique = setOblique;
exports.setFontLine = setFontLine;
exports.fontDent = fontDent;
exports.fontAlign = fontAlign;
exports.setLink = setLink;
exports.clearStyle = clearStyle;
exports.getCurPos = getCurPos;
exports.setCurPos = setCurPos;
/**
 * @desc 设置字体加粗
 * @param $el 文本框对象
*/
function setBold($el) {
    var bold = $el.css('font-weight');
    if (bold == '400') {
        $el.css('font-weight', 'bolder');
    } else {
        $el.css('font-weight', '400');
    }
}

/**
 * @desc 设置字体倾斜
 * @param $el 文本框对象
*/
function setOblique($el) {
    var style = $el.css('font-style');
    if (style == 'oblique') {
        $el.css('font-style', 'normal');
    } else {
        $el.css('font-style', 'oblique');
    }
}

/**
 * @desc 设置文字线条
 * @param $el 文本框对象
 * @param val 线的位置 line-through, underline
*/
function setFontLine($el, val) {
    var style = $el.css('text-decoration');
    if (style.indexOf(val) === -1) {
        $el.css('text-decoration', val);
    } else {
        $el.css('text-decoration', 'none');
    }
}

/**
 * @desc 设置字缩进
 * @param $el 文本框对象
 * @param val 缩进方向 indent，dedent
 */
function fontDent($el, val) {
    var style = parseInt($el.css('text-indent'), 10);
    var fontSize = parseInt($el.css('font-size'), 10);
    if (val === 'indent') {
        style += fontSize;
    } else if (val === 'dedent') {
        style -= fontSize;
    } else {
        // ...
    }
    $el.css('text-indent', style);
}

/**
 * @desc 文本对齐方式
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
function fontAlign($el, val) {
    var style = $el.css('text-align');
    // console.log(style);
    $el.css('text-align', val);
}

/**
 * @desc 超链接
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
function setLink($el, val) {
    var style = $el.attr('mt-exa-link') || false;
}

/**
 * @desc 清除样式
 * @param $el 文本框对象
*/
function clearStyle($el) {
    $el.attr('style', '');
}

// 获取光标位置
function getCurPos(textDom) {
    var cursorPos = 0;
    if (document.selection) {
        // IE Support
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
    } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        cursorPos = textDom.selectionStart;
    }
    return cursorPos;
}

// 设置光标位置
function setCurPos(textDom, pos) {
    if (textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(136);

var _promise2 = _interopRequireDefault(_promise);

var _stringify = __webpack_require__(34);

var _stringify2 = _interopRequireDefault(_stringify);

exports.appToHtmlFile = appToHtmlFile;
exports.eventAppViewShow = eventAppViewShow;
exports.appToHTML = appToHTML;

var _indexedDB = __webpack_require__(75);

var db = _interopRequireWildcard(_indexedDB);

var _ajax = __webpack_require__(78);

var _AppDataFun = __webpack_require__(1);

var _layerSwitch = __webpack_require__(145);

var _loading = __webpack_require__(163);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 将AppData里面的 img 单独拿出来
 * @param data 也就是 传入一个 app 对象
*/
// indexedDB
function getAppDataImgs(data) {
    var arr = [];
    var pages = data.pages;

    if (data.style['background-image']) {
        arr.push(data.style['background-image']);
    }
    pages.forEach(function (page) {
        if (page.style['background-image']) {
            arr.push(page.style['background-image']);
        }
        page.layers.forEach(function (layer) {
            if (layer.type === 'img') {
                arr.push(layer.data.src);
            }
        });
    });

    return arr;
}

// app 页面的数据
/**
 * @desc 传入一个 app 对象，生成对应的 html 文件，这个方法必须是一个纯方法
 * 因为这个方法被案例中心，新建app的时候调用
*/
function appToHtmlFile(app) {
    return '\n        <!doctype html>\n        <html>\n        <head>\n            <title>' + app.name + '</title>\n            <meta name="description" content="' + app.info + '">\n            <meta name="keywords" content="' + app.info + '">\n            <meta http-equiv="X-UA-Compatible" content="IE=edge">\n            <meta name="format-detection" content="telephone=no" />\n            <meta name="format-detection" content="email=no" />\n            <meta name="apple-mobile-web-app-capable" content="yes" />\n            <meta name="apple-mobile-web-app-status-bar-style" content="black" />\n            <meta http-equiv="Cache-Control" content="no-cache" />\n            <meta name="x5-fullscreen" content="true">\n            <meta name="x5-orientation" content="portrait">\n            <meta name="x5-page-mode" content="app">\n            <meta charset="utf-8">\n            <script src="/assets/plugin/h5ds.screen.js"></script>\n            <meta name="apple-mobile-web-app-capable" content="yes" />\n            <!-- Set render engine for 360 browser -->\n            <meta name="renderer" content="webkit">\n            <!-- No Baidu Siteapp-->\n            <meta http-equiv="Cache-Control" content="no-siteapp" />\n            <link rel="stylesheet" type="text/css" href="/assets/plugin/animate.css">\n            <link rel="stylesheet" type="text/css" href="/assets/plugin/animations.css">\n            <link rel="stylesheet" type="text/css" href="/assets/plugin/loaders.css">\n            <link rel="stylesheet" type="text/css" href="/assets/font/iconfont.css">\n            <link rel="stylesheet" type="text/css" href="/assets/plugin/h5ds.app.css">\n            <!--js-->\n            <script src="/assets/plugin/jquery-2.1.1.js"></script>\n            <script src="/assets/plugin/jquery.touchSwipe.min.js"></script>\n            <script>var IMG_SOURCE = \'' + (0, _stringify2.default)(getAppDataImgs(app)) + '\';</script>\n            <script src="/assets/plugin/h5ds.swiper.js"></script>\n        </head>\n        <body ondragstart="return false">\n            ' + (app.mp3.url ? '<div class="h5ds-video-icon"><i></i><i></i><i></i><i></i></div>' : '') + '\n            <div id="h5dsPopups">\n                ' + app.popups.map(function (popup, index) {
        return '\n                            <div class="h5ds-swiper-page" id="' + (popup.id || '') + '" style="' + $.toStyle(popup.style) + '">\n                                <div class="h5ds-swiper-layers">\n                                ' + popup.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                                </div>\n                            </div>';
    }).join('') + '\n            </div>\n            <div id="h5dsFixeds">\n                ' + app.fixeds.map(function (fixed, index) {
        return '\n                            <div class="h5ds-swiper-page" id="' + (fixed.id || '') + '" style="' + $.toStyle(fixed.style) + '">\n                                <div class="h5ds-swiper-layers">\n                                ' + fixed.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                                </div>\n                            </div>';
    }).join('') + '\n            </div>\n            <div class="h5ds-loading" id="h5dsLoading">\n                <div class="h5ds-loadinner">\n                ' + _loading.loadArr[app.loading] + '\n                    <div class="h5ds-progress" id="h5dsProgress">0</div>\n                </div>\n            </div>\n            <div id="h5dsSwiper" pages-length="' + app.pages.length + '" class="h5ds-swiper" style="' + $.toStyle(app.style) + '">\n            ' + app.pages.map(function (page, index) {
        return '\n                    <div id="' + (page.id || '') + '" data-autoplay="' + (page.slider.autoplay ? page.slider.time : false) + '" data-lock="' + page.slider.lock + '" class="h5ds-swiper-page" style="' + $.toStyle(page.style) + '">\n                        <div class="h5ds-swiper-layers">\n                        ' + page.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                        </div>\n                    </div>';
    }).join('') + '\n            </div>\n            ' + (app.mp3.url ? '<audio style="display:none; height:0;" autoplay="autoplay" id="h5dsBgMusic" preload="auto" src="' + app.mp3.url + '" loop="loop"></audio>' : '') + '\n        </body>\n        </html>';
}

/**
 * @desc 设置弹窗的预览数据
*/
function appHTML(app) {
    return '\n        <div class="view-phone">\n            <div class="change-page">\n                <a class="prev" id="pageToPrev"><i class="iconfont icon-a3top"></i></a>\n                <p><span id="nowPageNum">1</span>/' + app.pages.length + '</p>\n                <a class="next" id="pageToNext"><i class="iconfont icon-a3down"></i></a>\n            </div>\n            <div class="view-phone-window">\n                ' + (app.mp3.url ? '<audio style="display:none; height:0;" autoplay="autoplay" id="h5dsBgMusic" preload="auto" src="' + app.mp3.url + '" loop="loop"></audio>' : '') + '\n                ' + (app.mp3.url ? '<div class="h5ds-video-icon"><i></i><i></i><i></i><i></i></div>' : '') + '\n                <div id="h5dsPopups">\n                    ' + app.popups.map(function (popup, index) {
        return '\n                                <div id="' + (popup.id || '') + '" class="h5ds-swiper-page" style="' + $.toStyle(popup.style) + '">\n                                    <div class="h5ds-swiper-layers">\n                                    ' + popup.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                                    </div>\n                                </div>';
    }).join('') + '\n                </div>\n                <div id="h5dsFixeds">\n                    ' + app.fixeds.map(function (fixed, index) {
        return '\n                                <div id="' + (fixed.id || '') + '" class="h5ds-swiper-page" style="' + $.toStyle(fixed.style) + '">\n                                    <div class="h5ds-swiper-layers">\n                                    ' + fixed.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                                    </div>\n                                </div>';
    }).join('') + '\n                </div>\n                <div id="h5dsSwiper" class="h5ds-swiper" style="' + $.toStyle(app.style) + '">\n                ' + app.pages.map(function (page, index) {
        return '\n                            <div id="' + (page.id || '') + '" data-autoplay="' + (page.slider.autoplay ? page.slider.time : false) + '" data-lock="' + page.slider.lock + '" class="h5ds-swiper-page" style="' + $.toStyle(page.style) + '">\n                                <div class="h5ds-swiper-layers">\n                                ' + page.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                                </div>\n                            </div>';
    }).join('') + '\n                </div>\n            </div>\n        </div>\n        <div class="other-info">\n            <div class="infos clearfix">\n                <h2>\u57FA\u672C\u53C2\u6570</h2>\n                <div class="qrcode-box box-left">\n                    <img class="mainpic" src="' + app.img + '"/>\n                </div>\n                <div class="box-right">\n                    <input class="app-name-input" type="text" value="' + app.name + '"/>\n                    <textarea class="app-info-textarea">' + app.info + '</textarea>\n                </div>\n            </div>\n            <div class="qrcode clearfix">\n                <h2>\u4E8C\u7EF4\u7801</h2>\n                <div class="qrcode-box box-left" id="qrcode">\n                    <span class="qrcode-tips">\u53D1\u5E03\u540E\u751F\u6210</span>\n                </div>\n                <div class="box-right qrcode-url-box">\n                    <span class="qrcode-tips">\u53D1\u5E03\u540E\u751F\u6210</span>\n                </div>\n            </div>\n            <div class="btns">\n                <a id="continueEdit" class="btn-edit">\u7EE7\u7EED\u7F16\u8F91</a>\n                <a id="publishApp" class="btn-publish">\u53D1\u5E03</a>\n            </div>\n        </div>\n    ';
}

// 生成二维码
function newQrcode() {
    // 生成二维码
    var owner = $.getUrlData('owner');
    var id = $.getUrlData('id');
    var path = location.origin + '/apps/' + owner + '/' + id + '/index.html';
    $('.qrcode-url-box').html(path);
    var $qrcode = $('#qrcode').empty();
    new QRCode($qrcode[0], {
        text: path,
        width: 140,
        height: 140,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 事件初始化， 在app.js 里面初始化
var animated = false;
function eventAppViewShow(self) {

    // 切换按钮
    $('#appViewShow').on('click', '#pageToPrev, #pageToNext', function () {

        // 动画中，不能继续点
        if (animated) {
            return;
        }

        var cls = $(this).attr('class');
        var $out = $('#h5dsSwiper').find('.h5ds-swiper-current');
        var outIndex = $out.index();
        if (cls === 'prev') {
            $('#h5dsSwiper').trigger('h5ds_down', {
                $out: $out,
                outIndex: outIndex
            }).trigger('h5ds_left', {
                $out: $out,
                outIndex: outIndex
            });
        } else {
            $('#h5dsSwiper').trigger('h5ds_up', {
                $out: $out,
                outIndex: outIndex
            }).trigger('h5ds_right', {
                $out: $out,
                outIndex: outIndex
            });
        }
    });

    // 继续编辑
    $('#appViewShow').on('click', '#continueEdit', function () {
        $('#appViewShow').trigger('closeModal');
    });

    // 发布
    $('#appViewShow').on('click', '#publishApp', function () {

        var load = $.loading({
            tip: 'H5生成中，请耐心等待！'
        });

        var appid = $.getUrlData('id');
        if (appid === null) {
            $.tip({
                msg: '操作失败！APP的id不见了', //
                type: 'danger' //success,danger,warning
            });
            return;
        }
        (0, _ajax.saveData)({
            id: appid,
            name: AppData.data.name,
            pic: AppData.data.img,
            des: AppData.data.info,
            data: (0, _stringify2.default)(AppData.data),
            shtml: appToHtmlFile(AppData.data)
        }).done(function (res) {
            if (res.success) {
                $.tip();
                load.close();

                newQrcode();
            }
        });
    });

    // 修改名字
    $('#appViewShow').on('change', '.app-name-input', function () {
        var name = $(this).val();
        self.app.name = name;
        $('.a-setname').html(name);
        $('#appSetName').val(name);
        (0, _AppDataFun.AppDataChange)();
    });

    // 修改描述
    $('#appViewShow').on('change', '.app-info-textarea', function () {
        var info = $(this).val();
        self.app.info = info;
        $('#appSetInfo').val(info);
        (0, _AppDataFun.AppDataChange)();
    });
}

// 获取 blob 图片, 约定 arr#index 表示数组
function getBlobImg() {
    // let keys = []; // 记录 AppData.data[key] 中，有blob图片的 key 集合
    var blobObj = [];
    var app = AppData.data;

    // app 主图
    if (app.img.isBlob()) {
        blobObj[app.img.blobId()] = ['img'];
    }

    // app 背景
    if (app.style['background-image'].isBlob()) {
        blobObj[app.style['background-image'].blobId()] = ['style', 'background-image'];
    }

    // pages, layers 背景 layer 的 data.src // 如果还有其他的，都在这里添加
    app.pages.forEach(function (page, i) {
        var pageBg = page.style['background-image'] || '';
        if (pageBg.isBlob()) {
            blobObj[pageBg.blobId()] = ['pages#' + i, 'background-image'];
        }

        // layers
        page.layers.forEach(function (layer, j) {
            var layerBg = layer.style['background-image'] || '';
            var src = '';
            if (layer.data && layer.data.src) {
                src = layer.data.src;
            }
            if (layerBg.isBlob()) {
                blobObj[layerBg.blobId()] = ['pages#' + i, 'layers#' + j, 'background-image'];
            }
            if (src.isBlob()) {
                blobObj[src.blobId()] = ['pages#' + i, 'layers#' + j, 'data', 'src'];
            }
        });
    });

    return blobObj;
}

// 重新设置 AppData.data 重置img，然后渲染弹窗
/**
 * @desc 在替换完二进制地址的照片后，将html渲染到弹窗里面。显示弹窗里面的内容
 * @param objs getBlobImg() 返回的数据，二进制图片 { id: 记录的AppData.data里面的路径}
 * @param allRes indexedDb里面查询到的base64图片。[{id: base64}]
*/
function resetAppData(objs, allRes) {
    var app = AppData.data;
    // 重置img

    var _loop = function _loop(i) {
        var d = allRes[i];
        var keysArr = objs[d.id];
        var point = app; // 临时指针
        keysArr.forEach(function (elem) {
            if (elem === 'background-image' || elem === 'src') {
                point[elem] = d.src;
            } else {
                if (elem.indexOf('#') !== -1) {
                    var arr = elem.split('#');
                    point = point[arr[0]][arr[1]];
                } else {
                    point = point[elem];
                }
            }
        });
    };

    for (var i = 0; i < allRes.length; i++) {
        _loop(i);
    }

    // 替换地址后，保存一次local 避免二次上传图片
    (0, _AppDataFun.AppDataChange)();

    // console.log('img 已经转换 ****', app);
    var html = appHTML(app);
    // console.log(html);

    // render 弹窗
    $('#appViewShowBtn').trigger('click');

    // 关闭弹窗事件
    $('#appViewShow').on('closeBack', function () {
        $(this).find('.mt-modal-full').html('');
    }).find('.mt-modal-full').html('' + html);

    // 自动播放音乐
    autoPlayMusic();

    // 滑动
    var $h5dsSwiper = $('#h5dsSwiper');
    $h5dsSwiper.h5dsSwiper({
        len: app.pages.length
    });
    $h5dsSwiper.off('animateStart animateEnd').on('animateStart', function (e, index) {
        // 切换编号
        $('#nowPageNum').html(index + 1);
        animated = true;
    }).on('animateEnd', function () {
        animated = false;
    });
}

/**
 * AppData.data 组合成HTML代码
 */
function appToHTML() {
    console.log(AppData.data);

    return new _promise2.default(function (resolve1, reject1) {

        // 上传 blob 图片
        db.getAllData('img', function (res) {
            // console.log(res);
            if (!res) {
                // ...
                reject1(false);
                return;
            }

            // 找出 blob 图片
            var objs = getBlobImg();
            // console.log(objs);
            // 如果有图
            var arr = [];

            var _loop2 = function _loop2(i) {
                var d = res[i];
                if (objs[d.id]) {
                    var p = new _promise2.default(function (resolve) {
                        (0, _ajax.uploadImgBase64)({
                            imgData: d.value,
                            name: 'crop_' + d.id
                        }).done(function (res) {
                            if (res.success) {
                                resolve({
                                    id: d.id,
                                    src: res.data.src
                                });
                            }
                        });
                    });
                    arr.push(p);
                }
            };

            for (var i = 0; i < res.length; i++) {
                _loop2(i);
            }
            _promise2.default.all(arr).then(function (allRes) {
                resetAppData(objs, allRes);
                resolve1(true);
            });
        });
    });
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(34);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _basicTpl = __webpack_require__(107);

var _imgTpl = __webpack_require__(117);

var _bgTpl = __webpack_require__(283);

var _bgColorTpl = __webpack_require__(144);

var _layerSwitch = __webpack_require__(145);

var _layerFun = __webpack_require__(73);

var _appSliderTypeTpl = __webpack_require__(284);

var _layerListTpl = __webpack_require__(285);

var _AppDataFun = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 所有页面，弹窗，浮动层，都继承这个类，提供一些公用方法
 */
//设置翻页模式，锁定，自动
// 渲染 不同类型的 layer dom
//背景模版
//坐标，尺寸基础模块
var PageClass = function () {
    function PageClass(props) {
        (0, _classCallCheck3.default)(this, PageClass);

        console.log('>>>>>>', props);
        this.layerListTpl = _layerListTpl.layerListTpl;
        this.pagesList = props.pagesList || 'pagesList'; // pagesList 的 id
        this.className = props.className || 'page'; // 类名字
        this[props.className || 'page'] = props[props.className]; // 直接编辑当前page 对象 app里面的page ，不是new Page() 对象
    }

    // 选择第一个layer


    (0, _createClass3.default)(PageClass, [{
        key: 'selectFirstLayer',
        value: function selectFirstLayer() {
            var $layer = $('#layerlist').find('.layer-item');
            if ($layer[0]) {
                $layer.eq(0).trigger('click.select');
            }
        }

        // 初始化layerlist

    }, {
        key: 'initLayerList',
        value: function initLayerList(indexActive) {

            // 因为要设置重新选中，这里必须设置 layerIndex = null, 列表发生了变化
            AppData.edit.layerIndex = null;

            var shtml = '';
            var layers = this[this.className].layers;

            if (layers.length == 0) {
                shtml = '<li><span>\u6682\u65E0\u56FE\u5C42</span></li>';
            } else {
                var zIndex = 9999;
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    // 重置z-index
                    layer.style['z-index'] = zIndex - i;
                    shtml += this.layerListTpl({
                        type: layer.typename,
                        active: indexActive === i ? true : false
                    });
                }
            }
            $('#layerlist').html(shtml);
        }

        // 渲染页面样式

    }, {
        key: 'renderPage',
        value: function renderPage() {
            (0, _AppDataFun.getViewDom)().setStyle({
                style: this[this.className].style
            }).show();
            (0, _AppDataFun.AppDataChange)();
        }

        // 包含了剪切图片的所有方法

    }, {
        key: 'initCropFun',
        value: function initCropFun() {
            var self = this;
            var style = this[this.className].style;

            var $crop = (0, _imgTpl.initCrop)(self, $('#setPageStyle').find('.set_img_crop'), { delBtn: true }, function (type, val) {
                // 剪切后，this.style 发生变化，重新渲染可视区域, delete 里面做了处理了
                if (type === 'select') {
                    style['background-image'] = val;
                }
                // AppDataChange();
                self.renderPage();
            });
        }

        // 初始化设置区域,设置page样式

    }, {
        key: 'initSetBox',
        value: function initSetBox() {

            var self = this;
            var $setPageStyle = $('#setPageStyle');
            var _className = this[this.className],
                style = _className.style,
                slider = _className.slider;

            // 设置背景参数

            var bgTpls = (0, _bgTpl.bgTpl)({
                repeat: style['background-repeat'] || 'initial',
                color: style['background-color'] || 'none',
                size: style['background-size'] || 'initial'
            });

            // 设置背景色
            var bcolor = style['background-color'];
            var bgColorTpls = (0, _bgColorTpl.bgColorTpl)({
                color: bcolor ? bcolor.colorHex() : 'initial',
                opacity: bcolor ? bcolor.colorOpacity() : 1
            });

            // 翻页模式, app 整体可以设置翻页，每个page可以单独设置

            var appSliderTypeTpls = ''; // _page 作为不同的ID使用

            if (this.className === 'page') {
                appSliderTypeTpls = '<div class="set-slider">' + (0, _appSliderTypeTpl.appSliderTypeTpl)({
                    lock: slider['lock'],
                    autoplay: slider['autoplay'],
                    time: slider['time']
                }, '_page') + '</div>';
            }

            // 如果page没有背景，初始化一个空的模版
            var allTpls = '';
            if (!style) {
                style = {};
                allTpls = (0, _imgTpl.imgTpl)() + bgTpls + bgColorTpls + appSliderTypeTpls;
            } else {
                // 如果page有背景图
                if (style['background-image']) {
                    var imgTpls = (0, _imgTpl.imgTpl)({
                        src: style['background-image'] || ''
                    });
                    allTpls = imgTpls + bgTpls + bgColorTpls + appSliderTypeTpls;
                } else {
                    // 只有背景色
                    allTpls = (0, _imgTpl.imgTpl)() + bgTpls + bgColorTpls + appSliderTypeTpls;
                }
            }
            $setPageStyle.html(allTpls);

            // 初始化图片剪切功能
            this.initCropFun();

            // 设置样式
            this.renderPage();
        }

        // 重置z-index

    }, {
        key: 'resetZIndex',
        value: function resetZIndex() {
            (0, _AppDataFun.getViewDom)().find('.layer').each(function (ind, elem) {
                $(this).css('z-index', 9999 - ind);
            });
        }

        // 事件

    }, {
        key: 'initEvent',
        value: function initEvent() {
            var self = this;
            var $setPageStyle = $('#setPageStyle');
            var $layerlist = $('#layerlist');

            //初始化方法
            initSlider();
            initSelectOne();

            // 删除layer
            $layerlist.off('click.dellayer').on('click.dellayer', '.dellayer', function (e) {
                e.stopPropagation();

                var $li = $(this).parent();
                var index = $li.index();
                (0, _AppDataFun.getViewDom)().find('.layer').eq(index).remove();
                $li.remove();

                // 存个历史记录
                (0, _AppDataFun.saveHistory)();

                // 删除 AppData.data[cName][xx].layers[index] 
                (0, _AppDataFun.removeDataLayer)(index);

                AppData.edit.layerIndex = null;
                AppData.edit.layerDom = null;

                // 重新设置 z-index
                self.resetZIndex();

                // 默认选择第一layer
                var $li0 = $('#layerlist').find('.layer-item').eq(0);
                if ($li0[0]) {
                    // 重置选择状态
                    $li0.trigger('click');
                } else {
                    // 删除完之后，什么都不干
                    return;
                }
            });

            // 复制layer
            $layerlist.off('click.copylayer').on('click.copylayer', '.copylayer', function (e) {
                e.stopPropagation();

                var $li = $(this).parent();
                var index = $li.index();

                // console.log('**************', self, index);
                var obj = self[self.className].layers[index];
                // 拷贝一份
                obj = JSON.parse((0, _stringify2.default)(obj));

                // 复制内容存放到 copyLayer 里面
                delete obj['z-index'];
                AppData.edit.copyLayer = obj;

                $.tip({
                    msg: '复制成功！ctrl + v 粘贴',
                    type: 'success',
                    time: 3000
                });
            });

            // 粘贴
            $(document).off('pastelayer').on('pastelayer', function (e) {

                if (!AppData.edit.copyLayer) {
                    $.tip({
                        msg: '请先复制图层！',
                        type: 'error',
                        time: 3000
                    });
                    return;
                }

                // 存个历史记录
                (0, _AppDataFun.saveHistory)();

                // e.stopPropagation();
                var $li = $('#layerlist').find('.active');
                var index = 0;
                if ($li[0]) {
                    index = $li.index();
                }

                // 前面插入
                var layer = JSON.parse((0, _stringify2.default)(AppData.edit.copyLayer)); // 拷贝对象
                self[self.className].layers.splice(index, 0, layer);

                // 重新渲染列表
                self.initLayerList();
                // 重新渲染viewPage
                self.initPageDom();

                (0, _AppDataFun.AppDataChange)();

                // 设置选中
                $('#layerlist').find('.layer-item').eq(index).trigger('click');
            });

            // 显示隐藏
            $layerlist.off('click.showlayer').on('click.showlayer', '.showlayer', function (e) {
                e.stopPropagation();
                var $li = $(this).parent();
                var index = $li.index();
                var $layer = (0, _AppDataFun.getViewDom)().find('.layer').eq(index);
                if ($layer.is(':hidden')) {
                    $layer.show();
                    $(this).removeClass('showlayer_hide');
                } else {
                    $layer.hide();
                    $(this).addClass('showlayer_hide');
                }
            });

            //选择layer 通过 浮动的 列表
            $layerlist.off('click.select').on('click.select', '.layer-item', function (e, val) {
                var index = $(this).index();
                $('#layerlist').find('.layer-item').eq(index).addClass('active').siblings('.layer-item').removeClass('active');
                //new layer
                self.newLayer(index);
            });

            //排序 layer列表
            $layerlist.off('uniqend').on('uniqend', function (e, data) {

                // 排序
                (0, _layerFun.uniqendLayer)(self, data);

                // 排序不能撤销操作
            });

            //选择layer 通过 layer
            (0, _AppDataFun.getViewDom)().off('click.layer contextmenu.layer').on('click.layer contextmenu.layer', '.layer', function (e) {

                // 取消焦点
                $(':focus').blur();

                // 如果在组合模式下，不选择单个layer
                if (AppData.edit.group) {
                    return;
                }

                var index = $(this).index();
                $('#layerlist').find('li').removeClass('active').eq(index).addClass('active');
                //new layer
                self.newLayer(index);
            });

            // 设置 背景
            (0, _bgTpl.initBg)(this, $setPageStyle, function () {
                self.renderPage();
            });

            // 设置 背景色
            (0, _bgColorTpl.initBgColor)(this, $setPageStyle, function () {
                self.renderPage();
            });

            // 锁定翻页
            if (self.className === 'page') {
                (0, _appSliderTypeTpl.initAppSliderType)(self, '_page');
            }

            // 播放该页动画
            $('.play-animation-do').trigger('click');
        }

        //初始化页面对象 , phone 里面的内容

    }, {
        key: 'initPageDom',
        value: function initPageDom() {
            var layers = this[this.className].layers;
            var $pageView = (0, _AppDataFun.getViewDom)();
            var arr = [];
            for (var i = 0; i < layers.length; i++) {
                arr.push((0, _layerSwitch.getLayerDom)(layers[i]));
            }
            $pageView.html(arr.join(''));
            arr = null;
        }

        // 选择layer 之后，需要重新渲染 layer 对象 AppData.edit.layerDom 这个对象，在排序，复制之后，得重新设置

    }, {
        key: 'newLayer',
        value: function newLayer(index) {

            //显示layer设置
            (0, _layerFun.layerShow)('#setLayerBox');

            var pageIndex = 0;
            try {
                pageIndex = $('#' + this.pagesList).find('.active').index();
            } catch (e) {
                pageIndex = undefined;
            }
            // active 是哪个，就实例化哪个
            var layer = this[this.className].layers[index];

            /**
             * 如果选择同一个page的同一个layer ，不再重复渲染set区域
             * 这里因为会添加，删除layer, layerIndex 在变化中。如果没有控制器，只单独初始化控制器
            */
            if (index === AppData.edit.layerIndex && pageIndex === AppData.edit.pageIndex) {
                if (!(0, _AppDataFun.getViewDom)().find('.mt-control')[0]) {
                    // 实例化控制器
                    (0, _layerFun.initControl)({
                        layer: layer,
                        selectAnimateDom: null,
                        className: 'layer'
                    });
                }
            } else {
                // 给layer 容器设置值, 设置 AppData.edit.layerDom, layerIndex
                AppData.edit.layerIndex = index;
                (0, _AppDataFun.getViewDom)().find('.layer').each(function () {
                    if ($(this).css('z-index') == 9999 - index) {
                        AppData.edit.layerDom = $(this);
                    }
                });

                // 添加之前，先存个历史记录
                (0, _AppDataFun.saveHistory)();

                // new 对应的 layer, 这里是layer 的入口
                (0, _layerSwitch.layerTypeSelect)(layer);
            }
        }

        //初始化方法

    }, {
        key: '_init',
        value: function _init() {
            console.log(this);
            $('#setPageName').html(this[this.className].name);
            this.initLayerList();
            this.initSetBox();
            this.initPageDom();
            this.initEvent();

            (0, _AppDataFun.setPageClass)(this);

            return this;
        }
    }]);
    return PageClass;
}(); //layer list
// layer 的公用函数
//背景色模版
//图片模版


exports.default = PageClass;

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PAGE_SIZE = undefined;
exports.newPage = newPage;
exports.getImgSysTypes = getImgSysTypes;
exports.sysImg = sysImg;
exports.myImg = myImg;

var _ajax = __webpack_require__(78);

// ajax

var PAGE_SIZE = exports.PAGE_SIZE = 20;

// 系统图片的分页
function newPage(count, $dom, callback) {
    // 初始化分页
    $dom.pagelist({
        page: 1,
        pagesize: PAGE_SIZE,
        count: count
    }).on('page', function (e, p) {
        callback(p);
    });
}

// 获取图片素材
function getSysImgsFun(p) {
    $('#imgSysList').loading();
    (0, _ajax.getSysImgs)({ name: '', type: p.type, pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            // console.log(res.data);
            var tpl = '';
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                tpl += '<li><div class="imgbox"><img src="' + d.url + '" alt=""></div></li>';
            }
            // 设置 素材列表
            $('#imgSysList').html(tpl);

            // 分页
            var $imgPagelist = $('#imgPagelist');
            if (!$imgPagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                newPage(res.count, $imgPagelist, getSysImgsFun);
            }
        }
    });
}

// 获取图片素材分类
function getImgSysTypes() {
    $('#imgSysTypesList').loading();
    (0, _ajax.getSysImgTypes)().done(function (res) {
        if (res.success) {
            var tpl = '<li class="item active" data-id=""><a href="javascript:;">全部</a></li>';
            for (var i = 0; i < res.data.length; i++) {
                tpl += '<li class="item" data-id="' + res.data[i].id + '"><a href="javascript:;">' + res.data[i].name + '</a></li>';
            }
            $('#imgSysTypesList').html(tpl);
        }
    });
}

// 我的图片
function userImgTpl(data) {
    data.url = data.url.replace(/\\/g, '/');
    return '<li>\n                <div class="imgbox"><!--\n                    --><img src="' + data.url + '"><!--\n                    --><a class="del-my-img" data-id="' + data.id + '"><i class="iconfont icon-close"></i></a><!--\n                --></div>\n            </li>';
}

// 系统图片
function sysImg() {

    // 获取系统图片
    getSysImgsFun({
        type: '',
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 获取图片素材分类
    getImgSysTypes();

    // 图片上传 **
    $('#uploadImg').upload({
        auto: true,
        method: 'post',
        multi: true, //多文件上传
        fileName: 'file', //表单名字
        data: {}, //附带表单
        url: '/api/upload',
        uploadStart: function uploadStart() {
            // 切换到我的图库
            $('#sysOrMyImgs').find('li[data-type="my"]').trigger('click');
        },
        uploadSuccess: function uploadSuccess(res) {
            //...
            console.log('上传成功！重新获取用户图片', res);
            getUserImgsFun({
                pagesize: PAGE_SIZE,
                page: 1
            });
            // $('#imgMyList').prepend(userImgTpl(res.data));
        },
        uploadError: function uploadError(res) {
            console.error('图片上传失败！', res);
        }
    });

    // 选择图分类
    $('#imgSysTypesList').on('click', '.item', function (e) {
        $(this).addClass('active').siblings('.item').removeClass('active');
        var id = $(this).attr('data-id');
        getSysImgsFun({
            type: id,
            pagesize: PAGE_SIZE,
            page: 1
        });
    });
}

// 获取用户的图片
function getUserImgsFun(p) {
    (0, _ajax.getUserImgs)({ pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            // console.log('用户图片=>', res);
            var str = '';
            for (var i = 0; i < res.data.length; i++) {
                str += userImgTpl(res.data[i]);
            }
            $('#imgMyList').html(str);

            // 分页
            var $imgPagelist = $('#imgUserPagelist');
            if (!$imgPagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                newPage(res.count, $imgPagelist, getUserImgsFun);
            }
        } else {
            console.error('获取用户图片失败！');
        }
    });
}

// 我的图片
function myImg() {
    getUserImgsFun({
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 删除我的图片
    $('#imgMyList').on('click', '.del-my-img', function (e) {
        var _this = this;

        var id = $(this).attr('data-id');
        (0, _ajax.delImg)({
            id: id
        }).done(function (res) {
            if (res.success) {
                $(_this).closest('li').remove();
            }
        });
    });
}

/***/ }),
/* 247 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(17) && !__webpack_require__(7)(function () {
  return Object.defineProperty(__webpack_require__(164)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(12);


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(38);
var toIObject = __webpack_require__(39);
var arrayIndexOf = __webpack_require__(149)(false);
var IE_PROTO = __webpack_require__(166)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(18);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(82);

module.exports = __webpack_require__(17) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(39);
var gOPN = __webpack_require__(85).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(82);
var gOPS = __webpack_require__(150);
var pIE = __webpack_require__(119);
var toObject = __webpack_require__(21);
var IObject = __webpack_require__(118);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(7)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(26);
var isObject = __webpack_require__(8);
var invoke = __webpack_require__(255);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 255 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(6).parseInt;
var $trim = __webpack_require__(104).trim;
var ws = __webpack_require__(170);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(6).parseFloat;
var $trim = __webpack_require__(104).trim;

module.exports = 1 / $parseFloat(__webpack_require__(170) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(45);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(8);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 260 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(173);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(26);
var toObject = __webpack_require__(21);
var IObject = __webpack_require__(118);
var toLength = __webpack_require__(19);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(83);
var toLength = __webpack_require__(19);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 265 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(17) && /./g.flags != 'g') __webpack_require__(18).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(154)
});


/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(188);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(270);
var validate = __webpack_require__(106);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(158)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(18).f;
var create = __webpack_require__(84);
var redefineAll = __webpack_require__(89);
var ctx = __webpack_require__(44);
var anInstance = __webpack_require__(87);
var forOf = __webpack_require__(88);
var $iterDefine = __webpack_require__(176);
var step = __webpack_require__(265);
var setSpecies = __webpack_require__(86);
var DESCRIPTORS = __webpack_require__(17);
var fastKey = __webpack_require__(70).fastKey;
var validate = __webpack_require__(106);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(270);
var validate = __webpack_require__(106);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(158)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(54)(0);
var redefine = __webpack_require__(32);
var meta = __webpack_require__(70);
var assign = __webpack_require__(253);
var weak = __webpack_require__(273);
var isObject = __webpack_require__(8);
var fails = __webpack_require__(7);
var validate = __webpack_require__(106);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(158)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(89);
var getWeak = __webpack_require__(70).getWeak;
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var anInstance = __webpack_require__(87);
var forOf = __webpack_require__(88);
var createArrayMethod = __webpack_require__(54);
var $has = __webpack_require__(38);
var validate = __webpack_require__(106);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(52);
var toLength = __webpack_require__(19);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(85);
var gOPS = __webpack_require__(150);
var anObject = __webpack_require__(5);
var Reflect = __webpack_require__(6).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(151);
var isObject = __webpack_require__(8);
var toLength = __webpack_require__(19);
var ctx = __webpack_require__(44);
var IS_CONCAT_SPREADABLE = __webpack_require__(12)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(19);
var repeat = __webpack_require__(172);
var defined = __webpack_require__(51);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(82);
var toIObject = __webpack_require__(39);
var isEnum = __webpack_require__(119).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(120);
var from = __webpack_require__(280);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(88);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 281 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//transform过滤器

//用法
// var rotate = $dom.transform('rotate')
// $dom.transform({'rotate','10deg'})

$.fn.transform = function (obj) {
    var transform = $(this).attr('style') || '';
    //获取
    if (typeof obj == 'string') {
        if (transform.indexOf('transform') != -1) {
            return $.getTransform(transform, obj);
        } else {
            return false;
        }
    } else {
        //设置
        var cls = [];

        //保留原来的参数
        var saveOld = function saveOld(str) {
            var val = $.getTransform(transform, str);
            if (val) {
                cls.push(str + '(' + val + ')');
            }
        };
        var arr = ['translate', 'rotate', 'scale', 'skew'];
        for (var i = 0; i < arr.length; i++) {
            if (obj[arr[i]]) {
                cls.push(arr[i] + '(' + obj[arr[i]] + ')');
            } else {
                saveOld(arr[i]);
            }
        }

        cls = cls.join(' ');
        $(this).css({
            '-webkit-transform': cls,
            'transform': cls
        });
    }
};

//获取对应的参数
$.getTransform = function (transform, str) {
    transform = transform || '';
    if (transform.indexOf(str) != -1) {
        var exp = RegExp('.*' + str + '\\((.+?)\\).*');
        return parseFloat(transform.replace(exp, '$1'));
    } else {
        return false;
    }
};

// 获取transform 值
String.prototype.transformValue = function (name) {
    if (this.indexOf(name) != -1) {
        var exp = RegExp('.*' + name + '\\((.+?)\\).*');
        return this.replace(exp, '$1');
    } else {
        return false;
    }
};

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bgTpl = bgTpl;
exports.initBg = initBg;
/**
 * 背景模板
*/
function bgTpl(obj) {
    return '\n    <div class="set-bg">\n        <div class="tr">\n            \u80CC\u666F\u6A21\u5F0F:\n            <div class="mt-selectone set_bg_repeat" data-val="' + obj.repeat + '">\n                <a data-val="no-repeat" class="option">\u9ED8\u8BA4</a>\n                <a data-val="repeat-x" class="option">X\u5E73\u94FA</a>\n                <a data-val="repeat-y" class="option">Y\u5E73\u94FA</a>\n                <a data-val="repeat" class="option">\u5E73\u94FA</a>\n            </div>\n        </div>\n        <div class="tr">\n            \u80CC\u666F\u5C3A\u5BF8:\n            <div class="mt-selectone set_bg_size" data-val="' + obj.size + '">\n                <a data-val="initial" class="option">\u9ED8\u8BA4</a>\n                <a data-val="contain" class="option">\u9002\u914D</a>\n                <a data-val="cover" class="option">\u62C9\u4F38</a>\n            </div>\n        </div>\n    </div>';
}

// 设置 bg
function initBg(self, $parent, callback) {
    var obj = self[self.className];
    // 选择背景模式
    $parent.find('.set_bg_repeat').off('change').on('change', function (e, data) {
        obj.style['background-repeat'] = data;
        callback();
    });

    // 选择背景尺寸
    $parent.find('.set_bg_size').off('change').on('change', function (e, data) {
        obj.style['background-size'] = data;
        callback();
    });
}

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appSliderTypeTpl = appSliderTypeTpl;
exports.initAppSliderType = initAppSliderType;

var _AppDataFun = __webpack_require__(1);

var _funs = __webpack_require__(100);

// 自动翻页最大时间 ,d 单位秒
var AppSliderMaxTime = 30;

// 模板
function appSliderTypeTpl(obj, id) {
    id = id ? id : '';
    return '\n\t\t<div class="tr">\n\t\t\t\u9501\u5B9A\u7FFB\u9875:\n\t\t\t<div id="app_lock' + id + '" class="mt-switch" data-val="' + (obj.lock ? 'on' : 'off') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t\t<i data-title="\u5F00\u542F\u540E\uFF0C\u6ED1\u52A8\u9875\u9762\u4E0D\u80FD\u89E6\u53D1\u7FFB\u9875\u6548\u679C\uFF01" class="iconfont icon-bangzhu"></i>\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t\u81EA\u52A8\u7FFB\u9875:\n\t\t\t<div id="app_auto_play' + id + '" data-toggle=\'[{"dom":"#app_auto_play_div' + id + '", "class":"show"}]\' class="mt-switch" data-val="' + (obj.autoplay ? 'on' : 'off') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t\t<i data-title="\u5F00\u542F\u540E\uFF0C\u9875\u9762\u4F1A\u81EA\u52A8\u64AD\u653E\uFF01"  class="iconfont icon-bangzhu"></i>\n\t\t</div>\n\t\t<div class="tr' + (obj.autoplay ? ' show' : '') + '" id="app_auto_play_div' + id + '" style="display:none;">\n\t\t\t\u7FFB\u9875\u65F6\u95F4:\n\t\t\t<div id="app_auto_play_time' + id + '" class="mt-slider-bar" mt-bind="app_auto_play_time_input' + id + '" mt-filter="*' + AppSliderMaxTime + '" data-val="' + obj.time / AppSliderMaxTime + '"></div>\n\t\t\t<input mt-wheel="1,1,10000" id="app_auto_play_time_input' + id + '" class="mt-input" mt-bind="app_auto_play_time' + id + '" mt-filter="/' + AppSliderMaxTime + '" mt-min="0" mt-max="' + AppSliderMaxTime + '" mt-type="" type="" value="' + parseInt((0, _funs.isNull)(obj.time) ? 0 : obj.time, 10) + '" name=""> \u79D2\n\t\t</div>';
}

// 设置翻页类型，锁定 或者 自动翻页
function initAppSliderType(self, id) {
    id = id ? id : '';
    var obj = self[self.className];
    //锁定翻页
    $('#app_lock' + id).off('change').on('change', function (e, data) {
        obj.slider.lock = data;
        (0, _AppDataFun.AppDataChange)();
    });

    //自动翻页
    $('#app_auto_play' + id).off('change').on('change', function (e, data) {
        obj.slider.autoplay = data;
        (0, _AppDataFun.AppDataChange)();
    });

    // 翻页时间
    $('#app_auto_play_time' + id).off('change').on('change', function (e, data) {
        obj.slider.time = Math.round(data * AppSliderMaxTime);
        (0, _AppDataFun.AppDataChange)();
    });

    // 翻页时间
    $('#app_auto_play_time_input' + id).off('changes').on('changes', function (e, data) {
        obj.slider.time = data;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.layerListTpl = layerListTpl;
// layer 列表
function layerListTpl(obj) {
				return '<li class="layer-item ' + (obj.active ? 'active' : '') + '">\n\t\t\t\t<a class="showlayer"><i class="iconfont icon-yanjing"></i></a>\n\t\t\t\t<span>' + obj.type + '</span>\n\t\t\t\t<a class="dellayer" title="\u5220\u9664\u56FE\u5C42"><i class="iconfont icon-icodel"></i></a>\n\t\t\t\t<a class="copylayer" title="\u590D\u5236\u56FE\u5C42"><i class="iconfont icon-fuzhi"></i></a>\n\t\t\t</li>';
}

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 进入动画
*/
var animatesIn = exports.animatesIn = [{ name: 'bounceIn', type: 'in', animate: 'bounceIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceInDown', type: 'in', animate: 'bounceInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceInLeft', type: 'in', animate: 'bounceInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceInRight', type: 'in', animate: 'bounceInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceInUp', type: 'in', animate: 'bounceInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeIn', type: 'in', animate: 'fadeIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInDown', type: 'in', animate: 'fadeInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInDownBig', type: 'in', animate: 'fadeInDownBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInLeft', type: 'in', animate: 'fadeInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInLeftBig', type: 'in', animate: 'fadeInLeftBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInRight', type: 'in', animate: 'fadeInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInRightBig', type: 'in', animate: 'fadeInRightBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInUp', type: 'in', animate: 'fadeInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeInUpBig', type: 'in', animate: 'fadeInUpBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'flipInX', type: 'in', animate: 'flipInX', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'flipInY', type: 'in', animate: 'flipInY', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'lightSpeedIn', type: 'in', animate: 'lightSpeedIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateIn', type: 'in', animate: 'rotateIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateInDownLeft', type: 'in', animate: 'rotateInDownLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateInDownRight', type: 'in', animate: 'rotateInDownRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateInUpLeft', type: 'in', animate: 'rotateInUpLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateInUpRight', type: 'in', animate: 'rotateInUpRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideInUp', type: 'in', animate: 'slideInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideInDown', type: 'in', animate: 'slideInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideInLeft', type: 'in', animate: 'slideInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideInRight', type: 'in', animate: 'slideInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomIn', type: 'in', animate: 'zoomIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomInDown', type: 'in', animate: 'zoomInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomInLeft', type: 'in', animate: 'zoomInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomInRight', type: 'in', animate: 'zoomInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomInUp', type: 'in', animate: 'zoomInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rollIn', type: 'in', animate: 'rollIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }];

/**
 * 离开动画
*/
var animatesOut = exports.animatesOut = [{ name: 'bounceOut', type: 'out', animate: 'bounceOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceOutDown', type: 'out', animate: 'bounceOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceOutLeft', type: 'out', animate: 'bounceOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceOutRight', type: 'out', animate: 'bounceOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'bounceOutUp', type: 'out', animate: 'bounceOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOut', type: 'out', animate: 'fadeOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutDown', type: 'out', animate: 'fadeOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutDownBig', type: 'out', animate: 'fadeOutDownBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutLeft', type: 'out', animate: 'fadeOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutLeftBig', type: 'out', animate: 'fadeOutLeftBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutRight', type: 'out', animate: 'fadeOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutRightBig', type: 'out', animate: 'fadeOutRightBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutUp', type: 'out', animate: 'fadeOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'fadeOutUpBig', type: 'out', animate: 'fadeOutUpBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'flipOutX', type: 'out', animate: 'flipOutX', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'flipOutY', type: 'out', animate: 'flipOutY', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'lightSpeedOut', type: 'out', animate: 'lightSpeedOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateOut', type: 'out', animate: 'rotateOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateOutDownLeft', type: 'out', animate: 'rotateOutDownLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateOutDownRight', type: 'out', animate: 'rotateOutDownRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateOutUpLeft', type: 'out', animate: 'rotateOutUpLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rotateOutUpRight', type: 'out', animate: 'rotateOutUpRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideOutUp', type: 'out', animate: 'slideOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideOutDown', type: 'out', animate: 'slideOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideOutLeft', type: 'out', animate: 'slideOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'slideOutRight', type: 'out', animate: 'slideOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomOut', type: 'out', animate: 'zoomOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomOutDown', type: 'out', animate: 'zoomOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomOutLeft', type: 'out', animate: 'zoomOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomOutRight', type: 'out', animate: 'zoomOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'zoomOutUp', type: 'out', animate: 'zoomOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'hinge', type: 'out', animate: 'hinge', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rollOut', type: 'out', animate: 'rollOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }];

/**
 * 强调动画
*/
var animatesEm = exports.animatesEm = [{ name: 'bounce', type: 'em', animate: 'bounce', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'flash', type: 'em', animate: 'flash', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'pulse', type: 'em', animate: 'pulse', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'rubberBand', type: 'em', animate: 'rubberBand', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'shake', type: 'em', animate: 'shake', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'swing', type: 'em', animate: 'swing', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'tada', type: 'em', animate: 'tada', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'wobble', type: 'em', animate: 'wobble', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'jello', type: 'em', animate: 'jello', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'flip', type: 'em', animate: 'flip', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'jello', type: 'em', animate: 'jello', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'roll one', type: 'em', animate: 'rollOneCount', time: '1s', delay: '0s', count: 1, fun: 'linear' }];

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(34);

var _stringify2 = _interopRequireDefault(_stringify);

exports.iniFastEvent = iniFastEvent;
exports.setPhoneScale = setPhoneScale;

var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

var _AppDataFun = __webpack_require__(1);

var _ajax = __webpack_require__(78);

var _tplSource = __webpack_require__(288);

var _localStorage = __webpack_require__(111);

var _layerFun = __webpack_require__(73);

var _appFunLayerGroup = __webpack_require__(289);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * APP 函数集合
*/
// 放大画布
function fastToMax() {
    $('#fastToMax').off('click').on('click', function (e) {
        var $phonebox = $('.phonebox');
        var scale = $phonebox.transform('scale') || 1;
        AppData.edit.phoneScale = scale;
        scale += 0.2;
        if (scale > 2) {
            scale = 2;
        }
        $phonebox.transform({
            scale: scale
        });
    });
}

// 缩小画布
function fastToMin() {
    $('#fastToMin').off('click').on('click', function (e) {
        var $phonebox = $('.phonebox');
        var scale = $phonebox.transform('scale') || 1;
        scale -= 0.2;
        if (scale < 0.5) {
            scale = 0.5;
        }
        AppData.edit.phoneScale = scale;
        $phonebox.transform({
            scale: scale
        });
    });
}

/**
 * 鼠标滚动缩放页面
*/
function mouseWheelPhone() {
    $('.phonebox').on('mousewheel.phone', function (e) {
        e.preventDefault();
        // 往下加
        if (e.originalEvent.deltaY > 0) {
            $('#fastToMax').trigger('click');
        } else {
            $('#fastToMin').trigger('click');
        }
    });
}

/**
 * 复制页面
*/
function copyPage(self) {
    $('.add-page-do').on('click', function () {
        self.copyPage(AppData.edit.pageIndex);
    });
}

/**
 * 删除页面
*/
function delPage(self) {
    $('.del-page-do').on('click', function () {
        self.delPage(AppData.edit.pageIndex);
    });
}

/**
 * 新增页面
*/
function addPage(self) {
    $('#fastAddNewPage').on('click', function () {
        self.addPage(AppData.edit.pageIndex);
    });
}

/**
 * 保存当前模板
*/
function savePage(self) {
    $('.save-page-do').on('click', function () {
        if (AppData.edit.pageIndex !== null) {
            var page = (0, _AppDataFun.getNowPage)();
            page = JSON.parse((0, _stringify2.default)(page));
            delete page['index'];

            var load = $.loading();
            $('#phoneApp').addClass('element-show');
            html2canvas($('#pageView')[0], {
                height: 486,
                width: 320
            }).then(function (canvas) {
                $('#phoneApp').removeClass('element-show');
                (0, _ajax.uploadImgBase64)({
                    imgData: canvas.toDataURL("image/jpeg", 0.5)
                }).done(function (res) {
                    // console.log(res);
                    load.close();
                    if (!res.success) {
                        return;
                    }
                    (0, _ajax.addUserTpls)({
                        name: page.name,
                        data: (0, _stringify2.default)(page),
                        pic: res.data.src
                    }).done(function (result) {
                        if (result.success) {
                            $.tip({});
                            // 重新加载用户模板列表
                            (0, _tplSource.getUserTplsFun)({
                                type: '',
                                pagesize: 20,
                                page: 1
                            });
                        }
                    });
                });
            });
        }
    });
}

// 撤销，next
function unRedoFun(self) {
    var appPageHistory = '';
    var appHistoryIndex = 0; // 记录当前的下标
    var appHistoryLock = false; // 点击撤销，恢复按钮的时候，不记录操作

    var historyFun = function historyFun(e, mark) {

        if (appHistoryLock) {
            return;
        }

        var index = AppData.edit.pageIndex;
        var page = AppData.data[AppData.edit.pageType][index];
        var pageStr = (0, _stringify2.default)(page);
        if (mark && appPageHistory !== pageStr) {
            console.log('发生变化，进行缓存记录');
            // 缓存记录 
            AppData.edit.history.push((0, _stringify2.default)({
                page: page,
                index: index
            }));
            // 只存20条记录
            if (AppData.edit.history.length > 20) {
                AppData.edit.history.shift();
            }
            appHistoryIndex = AppData.edit.history.length - 1;
            appPageHistory = pageStr;
        }
    };

    // 绑定历史操作监听
    $(document).on('mouseup.history keyup.history appDataChange.history', historyFun);

    // 点击撤销，下一步之后的操作
    var unRedo = function unRedo() {
        // console.log(appHistoryIndex);
        if (appHistoryIndex < 0) {
            appHistoryIndex = 0;
            return;
        }
        appHistoryLock = true;
        var history = AppData.edit.history;
        if (history.length > 0) {
            var his = history[appHistoryIndex];
            if (his) {
                var obj = JSON.parse(his);
                AppData.data[AppData.edit.pageType][obj.index] = obj.page;
                $('#pagesList').find('.page-item').eq(obj.index).trigger('click', true);
            }
        }
        appHistoryLock = false;
    };

    // 撤销， 撤销的时候，不记录缓存
    $('#fastToNext').on('click', function (e) {
        e.stopPropagation();
        appHistoryIndex--;
        unRedo(appHistoryIndex);
    });

    // 下一步
    $('#fastToPrev').on('click', function (e) {
        e.stopPropagation();
        appHistoryIndex++;
        unRedo(appHistoryIndex);
    });
}

// 设置 x,y 坐标
/**
 * @desc 坐标添加或者删除
 * @param d 方向 x, y
 * @param type 添加或者减少 add, del
 * @param num 每次添加减少的值
*/
function setXYPoint(xy, num) {
    // ...
    var $dom = null;
    var val = null;
    if (xy === 'x') {
        $dom = $('#basicTpl_set_x');
    } else {
        $dom = $('#basicTpl_set_y');
    }
    val = parseInt($dom.val(), 10) + num;
    $dom.val(val + 'px');
    $dom.trigger('changes', val);
}

// 移动层级
function layerFromTo(data) {
    if (data.to < 0 || data.to > AppData.edit.pageClass.page.layers.length) {
        console.log('不能移动了', data.to);
        return;
    }
    (0, _layerFun.uniqendLayer)(AppData.edit.pageClass, data);
    AppData.edit.pageClass.initLayerList(data.to);
}

// 鼠标右键操作
function mouseRightBtn(self) {
    $(document).on('contextmenu', '#phone', function (e) {
        e.preventDefault();
    });
    $(document).on('contextmenu.menu', '.page-view .layer, .mt-contextmenu', function (e) {
        e.preventDefault();
        // ...
        $.contextMenu({
            x: e.pageX,
            y: e.pageY,
            vals: [{ name: '<i class="iconfont icon-dingceng"></i> 置顶层', val: 'top' }, { name: '<i class="iconfont icon-diceng"></i> 置底层', val: 'bottom' }, { name: '<i class="iconfont icon-shangyiyiceng"></i> 上移一层', val: 'prev' }, { name: '<i class="iconfont icon-xiayiyiceng"></i> 下移一层', val: 'next' }, { name: '<i class="iconfont icon-fuzhi"></i> 复制图层', val: 'copy' }, { name: '<i class="iconfont icon-niantie"></i> 粘贴图层', val: 'paste' }, { name: '<i class="iconfont icon-shoucang"></i> 收藏图层', val: 'save' }, { name: '<i class="iconfont icon-icodel"></i> 删除图层', val: 'del' }],
            callback: function callback(val, $layer) {
                var activeIndex = $('#layerlist').find('.active').index();
                switch (val) {
                    // 置顶
                    case 'top':
                        layerFromTo({
                            from: activeIndex,
                            to: 0
                        });break;

                    // 置底
                    case 'bottom':
                        layerFromTo({
                            from: activeIndex,
                            to: AppData.edit.pageClass.page.layers.length - 1
                        });break;

                    // 上移一层
                    case 'prev':
                        layerFromTo({
                            from: activeIndex,
                            to: activeIndex - 1
                        });break;

                    // 下移一层
                    case 'next':
                        layerFromTo({
                            from: activeIndex,
                            to: activeIndex + 1
                        });break;

                    // 复制图层
                    case 'copy':
                        $('#layerlist').find('.active .copylayer').trigger('click');break;

                    // 粘贴图层
                    case 'paste':
                        $(document).trigger('pastelayer');break;

                    // 收藏图层
                    case 'save':
                        $('.save-page-do').trigger('click');break;

                    // 删除图层
                    case 'del':
                        $('#layerlist').find('.active .dellayer').trigger('click');break;
                }
            }
        });
    });
}

// 快捷按钮操作
function shortcuts() {
    $(document).on("keydown.shortcuts", function (e) {
        var ev = window.event || e;
        var code = ev.keyCode || ev.which;
        //ctrl+s + code
        console.log(code, ev.shiftKey);

        // 这里加个锁吧
        if ($(':focus').length !== 0) {
            console.log('不监听');
            return;
        }

        if (ev.ctrlKey && [83, 90, 89, 189, 187, 80, 75, 72, 67, 86].indexOf(code) !== -1) {
            ev.preventDefault();
            switch (code) {
                case 83:
                    $('#appPublish').trigger('click');break; // ctrl+s 保存预览APP
                case 90:
                    $('#fastToNext').trigger('click');break; // ctrl+z 撤销
                case 89:
                    $('#fastToPrev').trigger('click');break; // ctrl+y 恢复
                case 189:
                    $('#fastToMin').trigger('click');break; // ctrl+ - 缩小画布
                case 187:
                    $('#fastToMax').trigger('click');break; // ctrl+ + 放大画布
                case 80:
                    $('.play-animation-do').trigger('click');break; // ctrl+ p 播放动画
                case 75:
                    $('.close-animation-do').trigger('click');break; // ctrl+ k 元素可见
                case 72:
                    $('#gridBoxBtn').trigger('click');break; // ctrl+ h 显示网格
                case 86:
                    $(document).trigger('pastelayer');break; // ctrl+ v 粘贴
                case 67:
                    {
                        var $active = $('#layerlist').find('.active');
                        if ($active[0]) {
                            $active.find('.copylayer').trigger('click');
                        }
                    };break; // ctrl+ c 复制
            }
        }

        // 删除
        if (code === 46) {
            ev.preventDefault();
            $('#layerlist').find('.active .dellayer').trigger('click'); // delete 删除layer
        }

        // 上下左右切换
        if ([38, 40, 37, 39].indexOf(code) !== -1) {
            ev.preventDefault();

            var num = 1;
            if (ev.shiftKey) {
                num = 20;
            }

            if (AppData.edit.layerIndex !== null) {
                switch (code) {
                    case 38:
                        setXYPoint('y', -num);break; // 上
                    case 37:
                        setXYPoint('x', -num);break; // 左
                    case 39:
                        setXYPoint('x', num);break; // 右
                    case 40:
                        setXYPoint('y', num);break; // 下
                }
            } else if ((0, _AppDataFun.getViewDom)().find('.mt-control').length > 1) {
                // 选择组
                var arr = (0, _appFunLayerGroup.getLayerGroupArr)();
                switch (code) {
                    case 38:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, null, -num);break; // 上
                    case 37:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, -num, null);break; // 左
                    case 39:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, num, null);break; // 右
                    case 40:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, null, num);break; // 下
                }
                (0, _appFunLayerGroup.setLayerGroupArr)(arr);
            }
        }
    });
}

/**
 * 初始化事件
 */
function iniFastEvent(self) {
    fastToMax();
    fastToMin();
    copyPage(self);
    delPage(self);
    addPage(self);
    savePage(self);
    unRedoFun(self);
    shortcuts(); // 快捷键
    mouseRightBtn(self); // 鼠标右键
}

/**
 * 初始化的时候，默认设置phone 的 缩放
*/
function setPhoneScale() {
    $('.phonebox').transform({
        "scale": _global2.default.scale
    });
}

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserTplsFun = getUserTplsFun;
exports.sysTpls = sysTpls;

var _ajax = __webpack_require__(78);

var _imgSource = __webpack_require__(246);

var _null = __webpack_require__(537);

var _null2 = _interopRequireDefault(_null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取系统模板分类
// ajax
function getSysTplsTypesFun() {
    $('#imgSysList').loading();
    (0, _ajax.getSysTplsTypes)().done(function (res) {
        if (res.success) {
            // console.log(res.data);
            var tpl = '<h5>HOT:</h5> <a data-id="">All</a>';
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                tpl += '<a data-id="' + d.id + '">' + d.name + '</a>';
            }
            // 设置 素材列表
            $('#sysTplsTypesList').html(tpl);
        }
    });
}

// 获取系统模板 
function getSysTplsFun(p) {
    $('#sysTplsList').loading();
    (0, _ajax.getSysTpls)({ name: p.name || '', type: p.type, pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            // console.log(res.data);
            var arr = res.data;
            arr.unshift({
                data: '{"name": "空白页面", "style": {}, "layers": [], "slider": {"animate": 1, "autoplay": false, "lock": false, "time": 5}}',
                name: '空白页面',
                pic: _null2.default
            });
            var tpl = '';
            for (var i = 0; i < arr.length; i++) {
                var d = arr[i];
                tpl += '<li>\n                    <div class="name">' + d.name + '</div>\n                    <div class="imgbox"><img src="' + d.pic + '" alt=""></div>\n                </li>';
            }
            // 设置 素材列表
            $('#sysTplsList').html(tpl);
            $('#sysTplsList').find('li').each(function (index, elem) {
                $(elem).data('val', arr[index].data);
            });

            // 分页
            var $pagelist = $('#sysTplsPagelist');
            if (!$pagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                (0, _imgSource.newPage)(res.count, $pagelist, getSysTplsFun);
            }
        }
    });
}

// 获取用户模板
function getUserTplsFun(p) {
    $('#myTplsList').loading();
    (0, _ajax.getUserTpls)({
        name: '',
        pageSize: p.pagesize,
        pageNum: p.page
    }).done(function (res) {
        if (res.success) {
            var tpl = '';
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                tpl += '<li data-id="' + d.id + '">\n                    <div class="name">' + d.name + '</div>\n                    <a data-id="' + d.id + '" class="del"><i class="iconfont icon-close"></i></a>\n                    <div class="imgbox"><img src="' + d.pic + '" alt=""></div>\n                </li>';
            }
            // 设置 素材列表
            $('#myTplsList').html(tpl);
            $('#myTplsList').find('li').each(function (index, elem) {
                $(elem).data('val', res.data[index].data);
            });

            // 分页
            var $pagelist = $('#myTplsPageList');
            if (!$pagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                (0, _imgSource.newPage)(res.count, $pagelist, getUserTplsFun);
            }
        }
    });
}

// 选择系统模板分类事件
function eventSysTpls() {
    // 选择模板分类
    $('#sysTplsTypesList').on('click', 'a', function (e) {
        $(this).addClass('active').siblings('a').removeClass('active');
        var id = $(this).attr('data-id');
        getSysTplsFun({
            type: id,
            pagesize: _imgSource.PAGE_SIZE,
            page: 1
        });
    });

    // 选择系统模板
    $('#sysTplsList, #myTplsList').on('click', 'li', function (e) {
        var val = $(this).data('val');
        var $item = $('#pagesList').find('.active');
        var index = $item.index();
        AppData.edit.appClass.addPage(index, JSON.parse(val));
    });

    // 删除用户模板
    $('#myTplsList').on('click', '.del', function (e) {
        e.stopPropagation();
        var id = $(this).attr('data-id');
        (0, _ajax.delUserTpls)({
            id: id
        }).done(function (res) {
            if (res.success) {
                $.tip();
                getUserTplsFun({
                    type: '',
                    pagesize: _imgSource.PAGE_SIZE,
                    page: 1
                });
            }
        });
    });

    // 搜索
    $('#searchSysTpl').on('click', '.mt-search-btn', function () {
        var name = $('#searchSysTplInput').val();
        var $active = $('#sysTplsTypesList').find('.active');
        var id = $active[0] ? $active.attr('data-id') : '';
        getSysTplsFun({
            name: name,
            type: id,
            pagesize: _imgSource.PAGE_SIZE,
            page: 1
        });
    });
}

// 系统图片
function sysTpls() {

    // 获取系统图片
    getSysTplsFun({
        type: '',
        pagesize: _imgSource.PAGE_SIZE,
        page: 1
    });

    // 获取用户图片
    getUserTplsFun({
        type: '',
        pagesize: _imgSource.PAGE_SIZE,
        page: 1
    });

    // 获取模板分类
    getSysTplsTypesFun();

    // 系统模板事件
    eventSysTpls();
}

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLayerGroupArr = getLayerGroupArr;
exports.changeLayerGroupArr = changeLayerGroupArr;
exports.setLayerGroupArr = setLayerGroupArr;
exports.groupLayers = groupLayers;

var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

var _layerFun = __webpack_require__(73);

var _AppDataFun = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// layer 组的操作
// 同步保存 组的数据
function saveGroupData() {
    (0, _AppDataFun.getViewDom)().find('.mt-control').each(function () {
        var $layer = $(this).closest('.layer');
        var index = 9999 - $layer.css('z-index');
        var layer = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[index];
        layer.style.left = $layer.css('left');
        layer.style.top = $layer.css('top');
    });
    (0, _AppDataFun.AppDataChange)();
}

// 获取layer 组的参数
function getLayerGroupArr() {
    var arr = [];
    (0, _AppDataFun.getViewDom)().find('.mt-control').each(function () {
        var $this = $(this).closest('.layer');
        var oleft = parseInt($this.css('left'), 10);
        var otop = parseInt($this.css('top'), 10);
        arr.push({
            nleft: oleft,
            ntop: otop,
            dom: $this,
            left: oleft,
            top: otop
        });
    });

    return arr;
}

// 变化layer 组的位置, 新的x,y 坐标 是叠加的值
function changeLayerGroupArr(arr, x, y) {
    var scale = AppData.edit.phoneScale || _global2.default.scale;
    arr.forEach(function (elem) {
        // 记录当前的位置
        if (x) {
            elem.nleft = elem.left + x / scale;
        } else {
            elem.nleft = elem.left;
        }
        if (y) {
            elem.ntop = elem.top + y / scale;
        } else {
            elem.ntop = elem.top;
        }
        elem.dom.css({
            left: elem.nleft,
            top: elem.ntop
        });
    });
}

// 设置 layer 组的 值
function setLayerGroupArr(arr) {
    arr.forEach(function (elem) {
        var index = 9999 - elem.dom.css('z-index');
        var layer = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[index];
        layer.style.left = elem.nleft + 'px';
        layer.style.top = elem.ntop + 'px';
    });
    (0, _AppDataFun.AppDataChange)();
    arr = null;
}

/**
 * @desc 组合图层 事件, app.js 里面调用一次
*/
function groupLayers(self) {

    // $(document).trigger('appDataChange.history');

    // 通过旋转后的DIV，获取到外部DIV的坐标和尺寸
    /**              w
     *     ------------------------
     *     |                      |
     *     |     倾斜的矩形形      |  h
     *     |                      |
     *     ------------------------    
     */
    var rectParam = function rectParam($dom) {
        var rotate = $dom.transform('rotate') % 90;
        var ro = rotate * (Math.PI / 180);
        var dw = parseInt($dom.css('width'), 10),
            dh = parseInt($dom.css('height'), 10);
        var dLeft = parseInt($dom.css('left'), 10),
            dTop = parseInt($dom.css('top'), 10);
        var center = {
            left: dLeft + dw / 2,
            top: dTop + dh / 2
        };
        if (rotate == 0) {
            return {
                top: dTop,
                left: dLeft,
                wid: dw,
                hei: dh,
                dw: dw,
                dh: dh,
                center: center
            };
        }
        var a = Math.cos(ro) * dw,
            b = Math.sin(ro) * dw,
            c = Math.cos(Math.PI / 2 - ro) * dh,
            d = Math.sin(Math.PI / 2 - ro) * dh;
        var wid = Math.ceil(c + a),
            hei = Math.ceil(b + d);
        return {
            top: center.top - hei / 2, // 外壳的 top
            left: center.left - wid / 2, // 外壳 的 left
            wid: wid, // 外壳宽
            hei: hei, // 外壳高
            dw: dw, // 真实宽
            dh: dh, // 真实高
            center: center
        };
    };

    // 快捷键功能, 左对齐
    $('#groupAlignLeft').on('click', function () {

        var min = Infinity;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var val = rectParam($layer).left;
            if (val < min) {
                min = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left = min; 求left
            var domLeft = min + p.wid / 2 - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 上对齐
    $('#groupAlignUpDown').on('click', function () {

        var min = Infinity;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var val = rectParam($layer).top;
            if (val < min) {
                min = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left = min; 求left
            var domTop = min + p.hei / 2 - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 右对齐
    $('#groupAlignRight').on('click', function () {

        var max = 0;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            var val = p.left + p.wid;
            if (val > max) {
                max = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left + wid = max; 求 left
            var domLeft = max - p.wid / 2 - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 下对齐
    $('#groupAlignDown').on('click', function () {

        var max = 0;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            var val = p.top + p.hei;
            if (val > max) {
                max = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left + wid = max; 求 left
            var domTop = max - p.hei / 2 - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 水平居中对齐
    $('#groupAlignLeftRightCenter').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var val = 0;
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            val += p.center.top;
        });
        val = val / len; // 获取平均高度
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 pianYi = val - p.center.top; 求 top
            var domTop = val - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 垂直居中对齐
    $('#groupAlignUpDownCenter').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var val = 0;
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            val += p.center.left;
        });
        val = val / len; // 获取平均高度
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 pianYi = val - p.center.top; 求 top
            var domLeft = val - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 垂直均分
    $('#groupAlignUpDownEven').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var min = Infinity,
            max = 0;
        var all = 0; // 所有宽
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (p.top < min) {
                min = p.top;
            }
            if (p.top + p.hei > max) {
                max = p.top + p.hei;
            }
            all += p.hei;
        });
        var eachSize = (max - min - all) / (len - 1); // 获取平均 间隔
        var prev = 0;
        $controls.each(function (index) {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (index !== 0) {
                var val = eachSize + prev;
                // 这里要单独写个方法
                $layer.css('top', val + 'px');
                prev = val + p.hei;
            } else {
                prev = p.hei + p.top;
            }
        });
        saveGroupData();
    });

    // 水平均分
    $('#groupAlignRightLeftEven').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var min = Infinity,
            max = 0;
        var all = 0; // 所有宽
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (p.left < min) {
                min = p.left;
            }
            if (p.left + p.wid > max) {
                max = p.left + p.wid;
            }
            all += p.wid;
        });
        var eachSize = (max - min - all) / (len - 1); // 获取平均 间隔
        var prev = 0;
        $controls.each(function (index) {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (index !== 0) {
                var val = eachSize + prev;
                // 这里要单独写个方法
                $layer.css('left', val + 'px');
                prev = val + p.wid;
            } else {
                prev = p.wid + p.left;
            }
        });
        saveGroupData();
    });

    // 拖动事件
    var initGroupEvent = function initGroupEvent() {
        // 让图层可拖动
        _global2.default.$doc.off('mousedown.group').on('mousedown.group', '.mt-control', function (ed) {
            ed.preventDefault();
            var arr = getLayerGroupArr(); // 获取layer 组的数据
            _global2.default.$doc.on('mousemove.group', function (em) {
                var x = em.pageX - ed.pageX;
                var y = em.pageY - ed.pageY;
                // 变化位置
                changeLayerGroupArr(arr, x, y);
            }).on('mouseup.group', function (eu) {
                // 数据缓存到 AppData, 设置组的值
                setLayerGroupArr(arr);
                _global2.default.$doc.off('mousemove.group mouseup.group');
            });
        });
    };

    // 鼠标右键功能， 慢慢开发
    // g.$doc.off('contextmenu.group').on('contextmenu.group', '.mt-control', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     $.contextMenu({
    //         x: e.pageX,
    //         y: e.pageY,
    //         vals: [
    //             { name: '<i class="iconfont icon-fuzhi"></i> 复制图层', val: 'copy' },
    //             { name: '<i class="iconfont icon-icodel"></i> 删除图层', val: 'del' }
    //         ],
    //         callback: (val, $layer) => {
    //             console.log(val);
    //             if (val === 'copy') {
    //                 console.log('复制图层！');
    //             } else if (val === 'del') {
    //                 console.log('删除图层！');
    //             }
    //         }
    //     });
    // });

    // 拖动选择一组layer
    $('#phone').off('mousedown.layerGroup').on('mousedown.layerGroup', function (ed) {
        if (!$(ed.target).closest('.layer')[0]) {

            // 控制器的代码
            var controlBox = '<div class="mt-control">\n                <span class="mt-control-top"></span>\n                <span class="mt-control-left"></span>\n                <span class="mt-control-right"></span>\n                <span class="mt-control-bottom"></span>\n                <span class="mt-control-topleft"></span>\n                <span class="mt-control-topright"></span>\n                <span class="mt-control-bottomleft"></span>\n                <span class="mt-control-bottomright"></span>\n                <span class="mt-control-center"></span>\n            </div>';

            // 获取当前的layer 位置, 获取中心点。
            var arr = [];
            (0, _AppDataFun.getViewDom)().find('.layer').each(function () {
                var $this = $(this);
                var rotate = $this.transform('rotate');
                $this.transform({ 'rotate': '0deg' });
                var obj = {
                    left: $this.offset().left,
                    top: $this.offset().top,
                    width: $this.width(),
                    height: $this.height(),
                    dom: $this
                };
                if (rotate) {
                    $this.transform({ 'rotate': rotate + 'deg' });
                }
                obj.center = {
                    x: obj.left + obj.width / 2,
                    y: obj.top + obj.height / 2
                };
                arr.push(obj);
            });

            // 写入选中框
            if (!$('.layer-group-select')[0]) {
                $('body').append('<div class="layer-group-select"></div>');
            }

            // 拖动的时候，时刻监听，然后给对应的layer 设置好 样式
            var $selectGroup = $('.layer-group-select');
            var wid = void 0,
                hei = void 0,
                top = void 0,
                left = void 0;
            _global2.default.$doc.on('mousemove.layerGroup', function (em) {

                wid = Math.abs(em.pageX - ed.pageX);
                hei = Math.abs(em.pageY - ed.pageY);

                // 拉动鼠标
                em.pageX > ed.pageX ? left = ed.pageX : left = em.pageX;
                em.pageY > ed.pageY ? top = ed.pageY : top = em.pageY;

                $selectGroup.css({
                    top: top,
                    left: left,
                    width: wid,
                    height: hei
                });

                // 设置 控制器
                arr.forEach(function (elem, index) {
                    var _elem$center = elem.center,
                        x = _elem$center.x,
                        y = _elem$center.y;

                    if (x > left && x < left + wid && y > top && y < top + hei) {
                        // console.log('中心了', index);
                        if (!elem.dom.find('.mt-control')[0]) {
                            elem.dom.append(controlBox);
                        }
                    } else {
                        elem.dom.find('.mt-control').remove();
                    }
                });
            }).on('mouseup.layerGroup', function (eu) {
                _global2.default.$doc.off('mousemove.layerGroup mouseup.layerGroup');
                // console.log(wid, hei, top, left);

                // 调出拖动组的浮动层，选中之后，接下来就要，对选中的进行操作了
                var $control = (0, _AppDataFun.getViewDom)().find('.mt-control');
                if ($control.length > 1) {
                    console.log('触发图层集合的操作');
                    // 显示 设置区域
                    (0, _layerFun.layerShow)('#setLayerGroupBox');

                    // 启用组合模式 , 这时候，设置个 group 参数，如果在点击 layer 的时候，发现有 group 参数，就统一操作
                    AppData.edit.group = true;

                    // 初始化图层组的事件，拖动移动位置
                    initGroupEvent();
                } else if ($control.length === 1) {
                    // 只选中一个，就选择这个图层
                    $control.closest('.layer').trigger('click');
                } else {}
                // ...


                // 释放内存
                arr = null;
                $selectGroup.remove();
            });
        }
    });
}

/***/ }),
/* 290 */,
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(292);
module.exports = __webpack_require__(494);


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(293);

__webpack_require__(490);

__webpack_require__(491);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(247)))

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(294);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(365);
__webpack_require__(366);
__webpack_require__(367);
__webpack_require__(368);
__webpack_require__(369);
__webpack_require__(370);
__webpack_require__(371);
__webpack_require__(372);
__webpack_require__(374);
__webpack_require__(375);
__webpack_require__(377);
__webpack_require__(378);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(381);
__webpack_require__(382);
__webpack_require__(383);
__webpack_require__(385);
__webpack_require__(386);
__webpack_require__(387);
__webpack_require__(388);
__webpack_require__(389);
__webpack_require__(390);
__webpack_require__(391);
__webpack_require__(392);
__webpack_require__(393);
__webpack_require__(394);
__webpack_require__(395);
__webpack_require__(396);
__webpack_require__(397);
__webpack_require__(185);
__webpack_require__(398);
__webpack_require__(399);
__webpack_require__(266);
__webpack_require__(400);
__webpack_require__(401);
__webpack_require__(402);
__webpack_require__(403);
__webpack_require__(404);
__webpack_require__(269);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(405);
__webpack_require__(406);
__webpack_require__(407);
__webpack_require__(408);
__webpack_require__(409);
__webpack_require__(410);
__webpack_require__(411);
__webpack_require__(412);
__webpack_require__(413);
__webpack_require__(414);
__webpack_require__(415);
__webpack_require__(416);
__webpack_require__(417);
__webpack_require__(418);
__webpack_require__(419);
__webpack_require__(420);
__webpack_require__(421);
__webpack_require__(422);
__webpack_require__(423);
__webpack_require__(424);
__webpack_require__(425);
__webpack_require__(426);
__webpack_require__(427);
__webpack_require__(428);
__webpack_require__(429);
__webpack_require__(430);
__webpack_require__(431);
__webpack_require__(432);
__webpack_require__(433);
__webpack_require__(434);
__webpack_require__(435);
__webpack_require__(436);
__webpack_require__(437);
__webpack_require__(438);
__webpack_require__(439);
__webpack_require__(440);
__webpack_require__(441);
__webpack_require__(442);
__webpack_require__(443);
__webpack_require__(444);
__webpack_require__(445);
__webpack_require__(446);
__webpack_require__(447);
__webpack_require__(448);
__webpack_require__(449);
__webpack_require__(450);
__webpack_require__(451);
__webpack_require__(452);
__webpack_require__(453);
__webpack_require__(454);
__webpack_require__(455);
__webpack_require__(456);
__webpack_require__(457);
__webpack_require__(458);
__webpack_require__(459);
__webpack_require__(460);
__webpack_require__(461);
__webpack_require__(462);
__webpack_require__(463);
__webpack_require__(464);
__webpack_require__(465);
__webpack_require__(466);
__webpack_require__(467);
__webpack_require__(468);
__webpack_require__(469);
__webpack_require__(470);
__webpack_require__(471);
__webpack_require__(472);
__webpack_require__(473);
__webpack_require__(474);
__webpack_require__(475);
__webpack_require__(476);
__webpack_require__(477);
__webpack_require__(478);
__webpack_require__(479);
__webpack_require__(480);
__webpack_require__(481);
__webpack_require__(482);
__webpack_require__(483);
__webpack_require__(484);
__webpack_require__(485);
__webpack_require__(486);
__webpack_require__(487);
__webpack_require__(488);
__webpack_require__(489);
module.exports = __webpack_require__(43);


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(17);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(32);
var META = __webpack_require__(70).KEY;
var $fails = __webpack_require__(7);
var shared = __webpack_require__(148);
var setToStringTag = __webpack_require__(103);
var uid = __webpack_require__(81);
var wks = __webpack_require__(12);
var wksExt = __webpack_require__(249);
var wksDefine = __webpack_require__(165);
var enumKeys = __webpack_require__(295);
var isArray = __webpack_require__(151);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(39);
var toPrimitive = __webpack_require__(50);
var createDesc = __webpack_require__(80);
var _create = __webpack_require__(84);
var gOPNExt = __webpack_require__(252);
var $GOPD = __webpack_require__(40);
var $DP = __webpack_require__(18);
var $keys = __webpack_require__(82);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(85).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(119).f = $propertyIsEnumerable;
  __webpack_require__(150).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(71)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(31)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(82);
var gOPS = __webpack_require__(150);
var pIE = __webpack_require__(119);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(84) });


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(17), 'Object', { defineProperty: __webpack_require__(18).f });


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(17), 'Object', { defineProperties: __webpack_require__(251) });


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(39);
var $getOwnPropertyDescriptor = __webpack_require__(40).f;

__webpack_require__(53)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(21);
var $getPrototypeOf = __webpack_require__(41);

__webpack_require__(53)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21);
var $keys = __webpack_require__(82);

__webpack_require__(53)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(53)('getOwnPropertyNames', function () {
  return __webpack_require__(252).f;
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(8);
var meta = __webpack_require__(70).onFreeze;

__webpack_require__(53)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(8);
var meta = __webpack_require__(70).onFreeze;

__webpack_require__(53)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(8);
var meta = __webpack_require__(70).onFreeze;

__webpack_require__(53)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(8);

__webpack_require__(53)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(8);

__webpack_require__(53)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(8);

__webpack_require__(53)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(253) });


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(311) });


/***/ }),
/* 311 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(169).set });


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(120);
var test = {};
test[__webpack_require__(12)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(32)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(254) });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(18).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(17) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(8);
var getPrototypeOf = __webpack_require__(41);
var HAS_INSTANCE = __webpack_require__(12)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(18).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(256);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(257);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(6);
var has = __webpack_require__(38);
var cof = __webpack_require__(45);
var inheritIfRequired = __webpack_require__(171);
var toPrimitive = __webpack_require__(50);
var fails = __webpack_require__(7);
var gOPN = __webpack_require__(85).f;
var gOPD = __webpack_require__(40).f;
var dP = __webpack_require__(18).f;
var $trim = __webpack_require__(104).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(84)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(17) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(32)(global, NUMBER, $Number);
}


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(52);
var aNumberValue = __webpack_require__(258);
var repeat = __webpack_require__(172);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(7)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(7);
var aNumberValue = __webpack_require__(258);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(6).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(259) });


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(259);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(257);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(256);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(260);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(173);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(174);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(261) });


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(7)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(260) });


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(173) });


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(174);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(7)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(174);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(83);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(39);
var toLength = __webpack_require__(19);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(104)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(175)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(176)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(175)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(19);
var context = __webpack_require__(178);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(179)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(178);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(179)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(172)
});


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(19);
var context = __webpack_require__(178);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(179)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(33)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(33)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(33)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(33)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(33)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(33)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(33)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(33)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(33)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(33)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(33)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(33)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(33)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(21);
var toPrimitive = __webpack_require__(50);

$export($export.P + $export.F * __webpack_require__(7)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(373);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(7);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(32)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(12)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(31)(proto, TO_PRIMITIVE, __webpack_require__(376));


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(50);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(151) });


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(44);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(21);
var call = __webpack_require__(262);
var isArrayIter = __webpack_require__(180);
var toLength = __webpack_require__(19);
var createProperty = __webpack_require__(181);
var getIterFn = __webpack_require__(182);

$export($export.S + $export.F * !__webpack_require__(153)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(181);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(7)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(39);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(118) != Object || !__webpack_require__(46)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(168);
var cof = __webpack_require__(45);
var toAbsoluteIndex = __webpack_require__(83);
var toLength = __webpack_require__(19);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(7)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(26);
var toObject = __webpack_require__(21);
var fails = __webpack_require__(7);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(46)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(54)(0);
var STRICT = __webpack_require__(46)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var isArray = __webpack_require__(151);
var SPECIES = __webpack_require__(12)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(54)(1);

$export($export.P + $export.F * !__webpack_require__(46)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(54)(2);

$export($export.P + $export.F * !__webpack_require__(46)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(54)(3);

$export($export.P + $export.F * !__webpack_require__(46)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(54)(4);

$export($export.P + $export.F * !__webpack_require__(46)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(263);

$export($export.P + $export.F * !__webpack_require__(46)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(263);

$export($export.P + $export.F * !__webpack_require__(46)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(149)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(46)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(39);
var toInteger = __webpack_require__(52);
var toLength = __webpack_require__(19);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(46)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(264) });

__webpack_require__(72)('copyWithin');


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(184) });

__webpack_require__(72)('fill');


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(54)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(72)(KEY);


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(54)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(72)(KEY);


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86)('Array');


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var inheritIfRequired = __webpack_require__(171);
var dP = __webpack_require__(18).f;
var gOPN = __webpack_require__(85).f;
var isRegExp = __webpack_require__(152);
var $flags = __webpack_require__(154);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(17) && (!CORRECT_NEW || __webpack_require__(7)(function () {
  re2[__webpack_require__(12)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(32)(global, 'RegExp', $RegExp);
}

__webpack_require__(86)('RegExp');


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(266);
var anObject = __webpack_require__(5);
var $flags = __webpack_require__(154);
var DESCRIPTORS = __webpack_require__(17);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(32)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(7)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(155)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(155)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(155)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(155)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(152);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(71);
var global = __webpack_require__(6);
var ctx = __webpack_require__(44);
var classof = __webpack_require__(120);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(26);
var anInstance = __webpack_require__(87);
var forOf = __webpack_require__(88);
var speciesConstructor = __webpack_require__(156);
var task = __webpack_require__(186).set;
var microtask = __webpack_require__(187)();
var newPromiseCapabilityModule = __webpack_require__(188);
var perform = __webpack_require__(267);
var userAgent = __webpack_require__(157);
var promiseResolve = __webpack_require__(268);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(12)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(89)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(103)($Promise, PROMISE);
__webpack_require__(86)(PROMISE);
Wrapper = __webpack_require__(43)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(153)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(273);
var validate = __webpack_require__(106);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(158)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(159);
var buffer = __webpack_require__(189);
var anObject = __webpack_require__(5);
var toAbsoluteIndex = __webpack_require__(83);
var toLength = __webpack_require__(19);
var isObject = __webpack_require__(8);
var ArrayBuffer = __webpack_require__(6).ArrayBuffer;
var speciesConstructor = __webpack_require__(156);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(7)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(86)(ARRAY_BUFFER);


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(159).ABV, {
  DataView: __webpack_require__(189).DataView
});


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(26);
var anObject = __webpack_require__(5);
var rApply = (__webpack_require__(6).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(7)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(84);
var aFunction = __webpack_require__(26);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var fails = __webpack_require__(7);
var bind = __webpack_require__(254);
var rConstruct = (__webpack_require__(6).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(18);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(50);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(7)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(40).f;
var anObject = __webpack_require__(5);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(5);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(177)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(40);
var getPrototypeOf = __webpack_require__(41);
var has = __webpack_require__(38);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(8);
var anObject = __webpack_require__(5);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(40);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(5);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(41);
var anObject = __webpack_require__(5);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(5);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(275) });


/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(5);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(18);
var gOPD = __webpack_require__(40);
var getPrototypeOf = __webpack_require__(41);
var has = __webpack_require__(38);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(80);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(169);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(149)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(72)('includes');


/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(276);
var toObject = __webpack_require__(21);
var toLength = __webpack_require__(19);
var aFunction = __webpack_require__(26);
var arraySpeciesCreate = __webpack_require__(183);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(72)('flatMap');


/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(276);
var toObject = __webpack_require__(21);
var toLength = __webpack_require__(19);
var toInteger = __webpack_require__(52);
var arraySpeciesCreate = __webpack_require__(183);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(72)('flatten');


/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(175)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(277);
var userAgent = __webpack_require__(157);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(277);
var userAgent = __webpack_require__(157);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(104)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(104)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(51);
var toLength = __webpack_require__(19);
var isRegExp = __webpack_require__(152);
var getFlags = __webpack_require__(154);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(177)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(165)('asyncIterator');


/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(165)('observable');


/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(275);
var toIObject = __webpack_require__(39);
var gOPD = __webpack_require__(40);
var createProperty = __webpack_require__(181);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(278)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(278)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(21);
var aFunction = __webpack_require__(26);
var $defineProperty = __webpack_require__(18);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(17) && $export($export.P + __webpack_require__(160), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(21);
var aFunction = __webpack_require__(26);
var $defineProperty = __webpack_require__(18);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(17) && $export($export.P + __webpack_require__(160), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(21);
var toPrimitive = __webpack_require__(50);
var getPrototypeOf = __webpack_require__(41);
var getOwnPropertyDescriptor = __webpack_require__(40).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(17) && $export($export.P + __webpack_require__(160), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(21);
var toPrimitive = __webpack_require__(50);
var getPrototypeOf = __webpack_require__(41);
var getOwnPropertyDescriptor = __webpack_require__(40).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(17) && $export($export.P + __webpack_require__(160), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(279)('Map') });


/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(279)('Set') });


/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(161)('Map');


/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(161)('Set');


/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(161)('WeakMap');


/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(161)('WeakSet');


/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(162)('Map');


/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(162)('Set');


/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(162)('WeakMap');


/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(162)('WeakSet');


/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(6) });


/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(6) });


/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(45);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(281);
var fround = __webpack_require__(261);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(281) });


/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(43);
var global = __webpack_require__(6);
var speciesConstructor = __webpack_require__(156);
var promiseResolve = __webpack_require__(268);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(188);
var perform = __webpack_require__(267);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var getPrototypeOf = __webpack_require__(41);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(271);
var from = __webpack_require__(280);
var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var getPrototypeOf = __webpack_require__(41);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var getPrototypeOf = __webpack_require__(41);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(64);
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(26);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(187)();
var process = __webpack_require__(6).process;
var isNode = __webpack_require__(45)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(6);
var core = __webpack_require__(43);
var microtask = __webpack_require__(187)();
var OBSERVABLE = __webpack_require__(12)('observable');
var aFunction = __webpack_require__(26);
var anObject = __webpack_require__(5);
var anInstance = __webpack_require__(87);
var redefineAll = __webpack_require__(89);
var hide = __webpack_require__(31);
var forOf = __webpack_require__(88);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(86)('Observable');


/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(6);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(157);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(186);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(185);
var getKeys = __webpack_require__(82);
var redefine = __webpack_require__(32);
var global = __webpack_require__(6);
var hide = __webpack_require__(31);
var Iterators = __webpack_require__(105);
var wks = __webpack_require__(12);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(247)))

/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(492);
module.exports = __webpack_require__(43).RegExp.escape;


/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(493)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 493 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(121);

__webpack_require__(495);

__webpack_require__(496);

__webpack_require__(497);

__webpack_require__(498);

__webpack_require__(499);

__webpack_require__(500);

__webpack_require__(501);

__webpack_require__(502);

__webpack_require__(503);

__webpack_require__(504);

__webpack_require__(505);

__webpack_require__(506);

__webpack_require__(206);

__webpack_require__(507);

__webpack_require__(508);

__webpack_require__(207);

__webpack_require__(509);

__webpack_require__(510);

__webpack_require__(511);

__webpack_require__(143);

__webpack_require__(512);

__webpack_require__(513);

__webpack_require__(514);

__webpack_require__(515);

__webpack_require__(516);

__webpack_require__(517);

__webpack_require__(518);

__webpack_require__(519);

__webpack_require__(520);

__webpack_require__(521);

__webpack_require__(522);

__webpack_require__(523);

__webpack_require__(524);

__webpack_require__(208);

__webpack_require__(525);

__webpack_require__(526);

var _indexedDB = __webpack_require__(75);

var db = _interopRequireWildcard(_indexedDB);

var _app = __webpack_require__(527);

var _app2 = _interopRequireDefault(_app);

var _localStorage = __webpack_require__(111);

var _imgURLClear = __webpack_require__(539);

var _ajax = __webpack_require__(78);

var _imgSource = __webpack_require__(246);

var _tplSource = __webpack_require__(288);

var _otherSource = __webpack_require__(540);

var _appFun = __webpack_require__(287);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// 数据容器
// 模板资源
// ajax
//..
//控制器

//分页
//开关
//图片剪切
//tabs
//触发器
//选
//设置样式
//简单的模版引擎
// 滚轮事件
// 确认
// 获取浏览器url 数据
// json转码escape
// 帮助提示
// 浮点数计算
//import './unit/Matrix.js'; // 矩阵算法

//插件
// 数据双向绑定
//资源库事件 //

// 全局方法
//点击右侧
(function (window) {
    window.AppData = {
        data: null, //缓存APP数据
        edit: {
            pageType: 'pages', // 当前编辑的类型，pages, popups, fixeds 对应 data里面的 key
            copyLayer: null, // 复制layer内容
            history: [], // 历史记录
            setapp: true, // 我喜欢就加上咯，任性！
            phoneScale: null, // 手机缩放比例
            appClass: null, // appClass
            pageIndex: null, // 默认编辑页面 index
            pageClass: null, //当前编辑的 page 类
            layerIndex: null, // 默认选中的layer index
            layerDom: null, // 当前编辑的layer Dom对象
            layerClass: null // 当前编辑的layer 类
        }
    };
})(window);

// 初始化App
// 图片资源
// indexedDB

//APP 类
//drag
//文件上传
// 滚动条
//title提示 
//列表排序
//单选
//颜色
//添加样式
//简单的模版引擎
// 弹框
// loading
// object 变成 style top:10px; left: 20px; // ... 
// 右键菜单初始化
// 复选框
//自动控制单位
// js 原生对象继承的方法集合
//设置app参数


//事件 ....
function iniApp(res) {

    // 新增扩展, 浮动层, 弹窗层，兼容老版本.ss
    if (!res.fixeds) {
        res.fixeds = [{
            id: '',
            name: '浮动层',
            style: {},
            layers: []
        }];
    }
    if (!res.popups) {
        res.popups = [];
    }

    AppData.data = res;

    var app = new _app2.default(res);
    app.init();

    // 如果pages 没有列表， 展开页面选择框
    if (res.pages.length === 0) {
        $('#flod-btn').trigger('click');
    }
}

// 获取数据
function getData() {
    // 获取缓存数据
    var uid_id = (0, _localStorage.getStorage)('UID_ID');
    var uid = $.getUrlData('owner');
    var id = $.getUrlData('id');

    if (uid === null && id === null) {
        $.tip({
            msg: '操作失败，请先选择APP', //
            type: 'danger', //success,danger,warning
            time: 30000 //
        });
        return;
    }

    // 如果有缓存， 且当前打开的 appid 
    if (uid_id === uid + '_' + id) {
        var APP_DATA = (0, _localStorage.getStorage)('APP_DATA');

        // 数据清洗 - 将 缓存的图片进行数据清洗，因为刷新后，二进制缓存更新了。
        (0, _imgURLClear.imgURLClear)(APP_DATA, function () {
            iniApp(APP_DATA);
        });
    } else {
        //获取APP对象
        (0, _ajax.getAppData)({ appid: $.getUrlData('id') }).done(function (res) {
            // console.log("main.js 43 =>",res);
            // 初始化编辑器方法，入口
            if (res.success) {
                (0, _localStorage.setStorage)('UID_ID', uid + '_' + id);
                iniApp(JSON.parse(res.data.data));
            }
        });
    }
}

// 主函数入口
$(function () {

    // 系统图片
    (0, _imgSource.sysImg)();

    // 系统模板
    (0, _tplSource.sysTpls)();

    // 我的图片
    (0, _imgSource.myImg)();

    // 音乐
    (0, _otherSource.sysMp3)();

    // 设置缩放
    (0, _appFun.setPhoneScale)();

    // 创建数据库, 这个方法是异步的
    db.openDB().then(function (res) {
        // 获取数据， 渲染app
        if (res) {
            getData();
        }
    });
});

/***/ }),
/* 495 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 496 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//左侧伸缩
$(function () {

    var $phone = $('#phone');
    $('#flod-btn').on('click', function (e) {
        var left = 330;
        var $temps = $('#temps');
        var $iconfont = $(this).find('.iconfont');
        if ($temps.attr('data-status') == 'show') {
            $temps.attr('data-status', 'hide');
            $iconfont.removeClass('icon-a3left').addClass('icon-a3right');
            $phone.css({
                'left': 0
            });
        } else {
            $temps.attr('data-status', 'show');
            $iconfont.removeClass('icon-a3right').addClass('icon-a3left');
            $phone.css({
                'left': left
            });
        }
    });
});

/***/ }),
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _layerFun = __webpack_require__(73);

var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

var _indexedDB = __webpack_require__(75);

var _localStorage = __webpack_require__(111);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 所有的 全局事件均用 -do 结尾

// 切换右侧面板的 tab
$(function () {
    $('.appset .appname').on('click', function (e) {
        (0, _layerFun.layerShow)('#setAppBox');
    });
});

// 选择音乐，loading, 背景快速入口
//控制编辑区域显示隐藏的方法
$(function () {
    $('.appset').on('click', '.bg', function () {
        (0, _layerFun.layerShow)('#setAppBox');
        $('.tab-appbasic').trigger('click'); //
    });

    $('.appset').on('click', '.music', function () {
        (0, _layerFun.layerShow)('#setAppBox');
        $('.tab-appmusic').trigger('click');
    });

    $('.appset').on('click', '.loading', function () {
        (0, _layerFun.layerShow)('#setAppBox');
        $('.tab-apploading').trigger('click');
    });

    $('.appset').on('click', '.helpinfo', function () {

        // 展开
        if ($('#temps').attr('data-status') !== 'show') {
            $('.flod-btn').trigger('click');
        }
        // 切换到主要区域
        $('.appset .bg').trigger('click');

        // 帮助
        $.helps({
            show: true,
            data: [{ dom: '.appset', content: '【整体设置】点击此处设置H5页面的整体内容：背景，主图，介绍, 背景音乐，加载效果等', pos: 'bottom' }, { dom: '#clearLocalSave', content: '【清除缓存】这里清除本地缓存', pos: 'bottom' }, { dom: '#appPublish', content: '【预览/发布】做好之后，发布应用点击这里发布应用或者预览应用，全部OK后生成二维码', pos: 'bottom' }, { dom: '.left', content: '【页面列表】此处主要展示页面的列表，也可以在【模板中心】中选择模板进行页面添加', pos: 'right' }, { dom: '.a-tpls', content: '【模板中心】所有页面模板都在这里了，你可以选择系统提供的模板，也可以选择自己保存的模板', pos: 'right' }, { dom: '#fastMenu', content: '【图层】页面里面所有的元素叫做图层，你可以在这里选择需要创建的图层，也可以点击“。。。”展开图层，选择更多图层', pos: 'left' }, { dom: '#setAppBox', content: '【设置区域】只需要记住，页面，图层，动画，交互等任何设置相关的操作都在这里进行就可以了。顶部会显示：当前选中的对象', pos: 'left' }, { dom: '.phonebox', content: '【可视化区域】页面的可视化界面，所见即所得', pos: 'left' }, { dom: '.layerlist', content: '【图层列表】可以展开图层列表，这里有图层相关的一些操作！', pos: 'bottom' }, { dom: '.fastbtns', content: '【快捷操作】这里有一些快捷操作的方法 <br/>【ctrl+s 保存预览APP】<br/>【ctrl+z 撤销】<br/>【ctrl+y 恢复】<br/>【ctrl+ - 缩小画布】<br/>【ctrl+ + 放大画布】<br/>【ctrl+ p 播放动画】<br/>【ctrl+ k 元素可见】<br/>【ctrl+ h 显示网格】<br/>【ctrl + d 删除】<br/>【上，下，左，右 微调距离】<br/>【shift + 上，下，左，右 大幅度调距离】', pos: 'left' }]
        });
    });
});

$(function () {
    // 清除缓存
    $('#clearLocalSave').on('click', function () {
        (0, _localStorage.clearStorage)();
        (0, _indexedDB.deleteDB)('H5DS');
        // $.tip({
        //     msg: '清除本地缓存成功！',
        //     callback: function() {
        //         window.location.reload();
        //     }
        // })
        window.location.reload();
    });
});

// 播放页面动画
$(function () {

    // 播放动画
    _global2.default.$doc.on('click', '.play-animation-do', function (e) {
        var $phoneApp = $('#phoneApp');
        $phoneApp.removeClass('element-show').find('.element').each(function (elem, index) {
            $(this).css('animation-play-state', 'running');
        });
        $phoneApp.hide(0).show(0);
    });

    // 关闭动画
    // g.$doc.on('click', '.close-animation-do', function(e) {
    //     let $phoneApp = $('#phoneApp');
    //     $phoneApp.addClass('animation-disabled').find('.element').each(function(elem, index) {
    //         $(this).css('animation-play-state', 'paused');
    //     });
    //     $phoneApp.hide(0).show(0);
    // });

    // 播放当前对象的动画
    _global2.default.$doc.on('click', '.play-nowlayer-animation-do', function (e) {
        $('#phoneApp').removeClass('animation-disabled');
        AppData.edit.layerDom.find('.element').css('animation-play-state', 'running').hide(0).show(0);
    });

    // 显示网格
    // g.$doc.on('click', '.show-grid-do', function(e) {
    //     let $grid = $('#phoneApp').find('.gridbox');
    //     if($grid.is(':hidden')) {
    //        $grid.show(); 
    //     }
    // });
});

/***/ }),
/* 498 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    var $source = $('#source');
    $source.on('click', '.close-source', function (e) {
        $source.hide();
    });

    _global2.default.$doc.on('click', '.a-selectimg', function (e) {
        $source.show();
    });
});

// 切换我的图库和系统图库
//控制source面板的显示隐藏

$(function () {
    var $sysOrMyImgs = $('#sysOrMyImgs');
    var $source = $('#source');
    $sysOrMyImgs.on('click', '[data-type]', function () {
        var mark = $(this).attr('data-type');
        $(this).addClass('active').siblings('[data-type]').removeClass('active');
        $source.find('.sourceitem[data-type="' + mark + '"]').addClass('show').siblings('[data-type]').removeClass('show');
    });
});

// 选择图片，然后换图
$(function () {
    $('.source-list').on('click', 'img', function (e) {
        // 如果设置APP的面板打开
        if (!$('#setAppBox').is(':hidden')) {
            $('#setAppBox').find('.set_img_crop').trigger('selectImg.app', $(this).attr('src'));
        }
        // page 设置
        if (!$('#setPageBox').is(':hidden')) {
            $('#setPageBox').find('.set_img_crop').trigger('selectImg.' + AppData.edit.pageType, $(this).attr('src'));
        }
        // layer 设置
        if (!$('#setLayerBox').is(':hidden')) {
            console.log('xxx' + AppData.edit.pageType);
            $('#setLayerBox').find('.set_img_crop').trigger('selectImg.layer', $(this).attr('src'));
        }
        // 关闭弹窗
        $('.close-source').trigger('click');
    });
});

/***/ }),
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 从数组中移除 obj 这里的 obj 是同样的引用地址
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp === obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
};

// 判断是否是二进制
String.prototype.isBlob = function () {
    if (!this) {
        return false;
    }
    if (this.indexOf('blob:http') !== -1) {
        return true;
    } else {
        return false;
    }
};

// 获取blob id
String.prototype.blobId = function () {
    if (this.isBlob()) {
        return this.split('#')[1];
    } else {
        return null;
    }
};

/***/ }),
/* 500 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 数据过滤
function filterVal($this, val) {
    var filter = $this.attr('mt-filter');
    var fixed = $this.attr('mt-fixed') || 0;
    if (filter !== undefined) {
        if (filter.indexOf('/') !== -1) {
            val = val / filter.split('/')[1];
        }
        if (filter.indexOf('+') !== -1) {
            val = val + --filter.split('+')[1];
        }
        if (filter.indexOf('-') !== -1) {
            val = val - filter.split('-')[1];
        }
        if (filter.indexOf('*') !== -1) {
            val = val * filter.split('*')[1];
        }
    }
    if (parseFloat(val) < 1 && fixed === 0) {
        fixed = 1;
    }
    return val === 0 ? 0 : parseFloat(val).toFixed(fixed);
}

// 数据联动
/**
*	简单的数据联动绑定，针对 slider的
*	mt-bind="id" 数据将联动到 对应的ID上去
*	mt-filter="*360" 表示 当前的值 val * 360 为绑定的值
*	mt-fixed="2" 表示保留小数点
*/
_global2.default.$doc.on('change input', '[mt-bind]', function (e, val) {

    var id = $(this).attr('mt-bind');
    var $bind = $('#' + id);
    var type = $bind.attr('mt-type') || '';
    if (val) {
        // 如果是slider ，或者是其他自定义表单返回的值。
        val = filterVal($(this), val);
        $bind.val(val + type);
    } else {
        // 如果是表单，input 等返回的值
        val = $(this).val();
        // console.log(val);
        val = filterVal($(this), val);
        $bind.attr('data-val', val > 1 ? 1 : val);
        //设置slider
        // console.log(val);
        setSilderVal($bind);
    }
});

/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('change', '[mt-type]', function (e) {

    // 设置单位
    var danwei = $(this).attr('mt-type');
    var val = $(this).val();
    var reg = /(^[-+]?\d+(\.\d+)?$)/;
    if (reg.test(val)) {
        val = val.replace(reg, '$1');
    } else {
        val = parseInt(val, 10) || 0;
    }

    // 设置范围
    var min = $(this).attr('mt-min') || null;
    var max = $(this).attr('mt-max') || null;
    if (min !== null && parseInt(val, 10) < parseInt(min, 10)) {
        val = min;
    }
    if (max !== null && parseInt(val, 10) > parseInt(max, 10)) {
        val = max;
    }

    val += danwei;

    $(this).val(val).trigger('changes', val);
}); /**
    *	设置input 单位， 设置 min max 后，需要通过 changs 拿到val
    */

/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

//减法函数，用来得到精确的减法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accSub(arg1,arg2)
//返回值：arg1减去arg2的精确结果
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accSub(this, arg);
};

/***/ }),
/* 503 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 选择框
 */
$(document).on('click', '.mt-checkbox-item', function () {
    var $this = $(this);
    var $group = $this.closest('.mt-checkbox-group');
    $this.addClass('mt-checkbox-active').siblings('.mt-checkbox-item').removeClass('mt-checkbox-active');
    $group.trigger('changes', {
        val: $this.attr('data-val'),
        text: $this.html()
    });
});

/***/ }),
/* 504 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 帮助提示
 * data 传入一个 数组 [ {dom: '#id1', content: '内容...'} ]
*/
$.helps = function (setting) {
    var defaults = {
        data: [] // 提示列队
    };
    var set = $.extend(defaults, setting);

    // 如果没有，就初始化一个
    if (!$('.mt-helps')[0]) {
        $('body').append('\n        <div class="mt-helps">\n            <div class="mt-helps-content">\n                <a class="mt-helps-close"><i class="iconfont icon-close"></i></a>\n                <div class="mt-helps-info"></div>\n                <div class="mt-helps-btns">\n                    <a class="mt-helps-prev">\u4E0A\u4E00\u6B65</a>\n                    <a class="mt-helps-next">\u4E0B\u4E00\u6B65</a>\n                    <a class="mt-helps-end">\u5B8C\u6210</a>\n                </div>\n            </div>\n        </div>\n        ');
    }

    var $help = $('.mt-helps');
    var $content = $help.find('.mt-helps-content');

    // 显示DOM
    var showDom = function showDom(index) {
        if (index === 0) {
            $('.mt-helps-prev').hide();
            $('.mt-helps-next').show();
            $('.mt-helps-end').hide();
        } else if (index === set.data.length - 1) {
            $('.mt-helps-next').hide();
            $('.mt-helps-end').show();
            $('.mt-helps-prev').show();
        } else {
            $('.mt-helps-end').hide();
            $('.mt-helps-next').show();
            $('.mt-helps-prev').show();
        }
        var obj = set.data[index];
        var $target = $(obj.dom);
        var size = {
            width: $target.outerWidth(),
            height: $target.outerHeight(),
            left: $target.offset().left,
            top: $target.offset().top
        };
        $help.css(size);
        var cls = '';
        $content.removeClass().addClass('mt-helps-content mt-helps-' + obj.pos);
        $help.find('.mt-helps-info').html(obj ? obj.content : '');
    };

    // 默认显示第一个
    var activeIndex = 0;
    showDom(activeIndex);
    if (set.data.length === 1) {
        $('.mt-helps-next').hide();
        $('.mt-helps-end').show();
    }

    // 事件绑定
    $help.on('click', '.mt-helps-next', function () {
        activeIndex++;
        if (activeIndex < set.data.length) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.mt-helps-prev', function () {
        activeIndex--;
        if (activeIndex >= 0) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.mt-helps-close, .mt-helps-end', function () {
        $help.off('click');
        $help.remove();
    });
};

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 鼠标右键触发的弹窗, 这种右键菜单，只能同时出现一个， 这个方法只会在页面上初始化个contextMenu
*/
$.contextMenu = function (setting) {
    var defaults = {
        x: 0, // 必须是个数
        y: 0,
        vals: [], // { name: xx, val: xxx }
        callback: null // 点击后的回调函数，返回 obj
    };
    var set = $.extend(defaults, setting);
    if (!$('.mt-contextmenu')[0]) {
        var tpl = '<div class="mt-contextmenu" style="left: ' + set.x + 'px; top: ' + set.y + 'px;">\n            <ul>\n                ' + set.vals.map(function (elem) {
            return '<li class="mt-contextmenu-item" data-val="' + elem.val + '">' + elem.name + '</li>';
        }).join('') + '\n            </ul>\n        </div>';
        $('body').append(tpl);
    }

    // 设置
    var $box = $('.mt-contextmenu');
    var size = {
        height: $box.height(),
        width: $box.width(),
        win_width: $(window).width(),
        win_height: $(window).height(),
        new_x: set.x,
        new_y: set.y
    };
    // x 超出window
    if (set.x + size.width > size.win_width) {
        size.new_x = size.win_width - size.width - 10;
    }
    // y 超出 window
    if (set.y + size.height > size.win_height) {
        size.new_y = size.win_height - size.height - 10;
    }
    $box.css({
        left: size.new_x,
        top: size.new_y
    });

    // 事件绑定
    $(document).off('click.contextmenu').on('click.contextmenu', function (e) {
        var $context = $(e.target).closest('.mt-contextmenu-item');
        if ($context[0] && set.callback) {
            set.callback($context.attr('data-val'), $context);
        }
        $('.mt-contextmenu').remove();
    });
};

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(34);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$.escape = function (obj) {
    var str = '';
    try {
        str = escape((0, _stringify2.default)(obj));
    } catch (e) {
        str = false;
    }
    return str;
};

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.getUrlData = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var data = null;
    if (r != null) {
        data = unescape(r[2]);
    }
    return data;
};

/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc loading 设置
 */
$.fn.loading = function (setting) {
    var defaults = {
        tip: 'loading',
        center: true,
        window: false
    };
    var set = $.extend(defaults, setting);
    var $this = $(this);
    if (!set.center) {
        $this.html('<div class="mt-loading">' + set.tip + '</div>');
    } else {
        $this.html('<div class="mt-loading mt-loading-center">' + set.tip + '</div>');
    }
};

$.loading = function (setting) {
    var defaults = {
        tip: 'loading...'
    };
    var set = $.extend(defaults, setting);
    var id = 'mt_loading_' + +new Date();
    $('body').append('<div class="mt-loading-window" id="' + id + '" >\n        <div class="mt-loading-center">' + set.tip + '</div>\n    </div>');

    this.close = function () {
        $('#' + id).remove();
    };

    return this;
};

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!$('.mt-modal-bg')[0]) {
    $('body').append('<div class="mt-modal-bg"></div>');
}
_global2.default.$doc.on('click.modal', '[mt-modal]', function (e) {
    var domName = $(this).attr('mt-modal');
    var $modal = $(domName);
    var $bg = $('.mt-modal-bg');
    var $close = $modal.find('.mt-modal-close');

    // 显示弹窗
    var showModal = function showModal() {
        $modal.removeClass('zoomOut').addClass('animated zoomIn').show();
        $bg.show();
    };

    showModal();

    // 关闭事件绑定
    $close.off('click').on('click', function () {
        $modal.removeClass('zoomIn').addClass('zoomOut');
        $modal.trigger('closeBack');
        setTimeout(function () {
            $modal.hide();
            $bg.hide();
            $close.off('click');
            $modal.off('closeModal');
        }, 800);
    });

    // 对外部提供的关闭事件
    $modal.off('closeModal').on('closeModal', function (a) {
        $close.trigger('click');
    });

    // 对外提供显示事件
    $modal.off('showModal').on('showModal', function () {
        showModal();
    });
});

/***/ }),
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mousewheel.wheel', '[mt-wheel]', function (e) {
    e.preventDefault();
    var val = parseFloat($(this).val());
    var arr = $(this).attr('mt-wheel').split(',');
    var num = parseFloat(arr[1]);
    // 往下加
    if (e.originalEvent.deltaY > 0) {
        val = val.add(num);
    } else {
        val = val.sub(num);
    }
    if (val < parseFloat(arr[0])) {
        val = parseFloat(arr[0]);
    }
    if (val > parseFloat(arr[2])) {
        val = parseFloat(arr[2]);
    }
    $(this).val(val);
    $(this).trigger('change');
    // $(this).trigger('changes', val);
    // $(this).trigger('input');
}); // 自定义鼠标滚动事件

/***/ }),
/* 511 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//自定义模版引擎
$.tpl = function (tpl, data, fixed) {
    var tpl2 = tpl;
    for (var key in data) {
        var reg = new RegExp("{{" + key + "}}", "gm");
        tpl2 = tpl2.replace(reg, data[key]);
    }

    return tpl2;
};

/***/ }),
/* 512 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//设置样式

// 将原来的style转换成 object
function styleToObject(style) {
    if (!style) {
        return {};
    }
    var oldArr = style.split(';');
    style = {};
    for (var i = 0; i < oldArr.length; i++) {
        var keys = oldArr[i].split(':');
        keys[0] = keys[0].trim();
        // animation-play-state 是后面控制动画设置上去的
        if (keys[0] !== 'animation-play-state' && keys[0] !== '') {
            style[keys[0]] = keys[1];
        }
    }
    return style;
}

// style 设置给 $dom  estyle 设置 给 $dom.find('.element')
$.fn.addStyle = function (obj) {

    // 将原来的style转换成 object
    var oldStyle = styleToObject($(this).attr('style'));
    var oldEStyle = styleToObject($(this).find('.element').attr('style'));
    // 新添加的style
    var style = obj.style;
    var estyle = obj.estyle;
    var animate = obj.animate;

    // 设置dom 样式
    if (style) {
        // 设置 dom
        for (var key in style) {
            if (style[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        oldStyle[key] = 'url(' + style[key].split('#')[0] + ')';
                    } else {
                        oldStyle[key] = 'url(' + style[key] + ')';
                    }
                } else {
                    oldStyle[key] = style[key];
                }
            }
        }
    }

    // 设置 element 样式
    for (var _key in estyle) {
        if (estyle[_key]) {
            if (_key == 'background-image') {
                // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                if (style[_key].indexOf('#') !== -1) {
                    oldEStyle[_key] = 'url(' + estyle[_key].split('#')[0] + ')';
                } else {
                    oldEStyle[_key] = 'url(' + estyle[_key] + ')';
                }
            } else {
                if (_key !== '') {
                    oldEStyle[_key] = estyle[_key];
                }
            }
        }
    }

    // 设置动画 
    if (animate && animate.length > 0) {
        var arr = [];
        for (var i = 0; i < animate.length; i++) {
            arr.push(animate[i].style);
        }
        oldEStyle['animation'] = arr.join(',');
    } else {
        if (oldEStyle['animation']) {
            delete oldEStyle.animation;
        }
    }

    $(this).attr('style', '').css(oldStyle);
    $(this).find('.element').attr('style', '').css(oldEStyle);
};

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//设置样式
// style 设置给 $dom  estyle 设置 给 $dom.find('.element')
$.fn.setStyle = function (obj) {

    if (!obj) {
        console.warn('obj不存在', obj);
        return;
    }

    var style = obj.style;
    var estyle = obj.estyle;
    var animate = obj.animate;

    // 设置dom 样式
    if (style) {
        // 设置 dom
        var _obj = {};
        for (var key in style) {
            if (style[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        _obj[key] = 'url(' + style[key].split('#')[0] + ')';
                    } else {
                        _obj[key] = 'url(' + style[key] + ')';
                    }
                } else {
                    _obj[key] = style[key];
                }
            }
        }
        $(this).attr('style', '').css(_obj);
    }

    // 如果 estyle 有才设置
    if (estyle) {
        // 设置 element 样式
        var elementObj = {};
        var $element = $(this).find('.element');
        for (var key in estyle) {
            if (estyle[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        elementObj[key] = 'url(' + estyle[key].split('#')[0] + ')';
                    } else {
                        elementObj[key] = 'url(' + estyle[key] + ')';
                    }
                } else {
                    elementObj[key] = estyle[key];
                }
            }
        }

        // 设置动画 
        if (animate && animate.length > 0) {
            var arr = [];
            for (var i = 0; i < animate.length; i++) {
                arr.push(animate[i].style);
            }
            elementObj['animation'] = arr.join(',');
        }

        $element.attr('style', '').css(elementObj);
    }

    return this;
};

/***/ }),
/* 514 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*RGBA颜色转换为16进制*/
String.prototype.colorHex = function () {
    if (!this) {
        return 'initial';
    }
    var aColor = this.replace(/(rgba\()(\d+,\d+,\d+),(((1|0)?\.)?\d+)\)/g, "$2").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
            hex += hex;
        }
        strHex += hex;
    }
    if (strHex.length !== 7) {
        strHex = this;
    }
    return strHex;
};

//rgba 获取透明度
//颜色选择
String.prototype.colorOpacity = function () {
    if (!this) {
        return 1;
    }
    return this.replace(/rgba\(\d+,\d+,\d+,(((0|1)?\.)?\d+)\)/g, '$1');
};

/* 16进制颜色转为RGBA格式 dot 表示透明度， 如果传入 mark = true, 返回一个颜色数组 */
String.prototype.colorRgba = function (dot, mark) {

    var sColor = this.toLowerCase();
    var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值  
        var sColorChange = [];
        for (var _i = 1; _i < 7; _i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2), 16));
        }

        if (mark) {
            return sColorChange;
        }
        return "rgba(" + sColorChange.join(",") + "," + dot + ")";
    } else {
        return sColor;
    }
};

//清理颜色
_global2.default.$doc.on('click.color', '.mt-color-clear', function (e) {
    var $color = $(this).closest('.mt-color').find('input[type=color]');
    var $slider = $(this).closest('.mt-color').find('.mt-slider-bar');
    $color.val('initial');
    $slider.attr('data-val', 1);
    $slider.find('.mt-slider-active').width('100%');
    $(this).closest('.mt-color').trigger('change', 'initial');
});

//颜色操作监听
_global2.default.$doc.on('change', '.mt-color input[type="color"]', function (e) {
    var val = $(this).val();
    var dot = $(this).closest('.mt-color').find('.mt-slider-bar').attr('data-val') || 0;
    $(this).closest('.mt-color').trigger('change', val.colorRgba(dot));
});

//滑动条监听
_global2.default.$doc.on('change', '.mt-color .mt-slider-bar', function (e) {
    var $color = $(this).closest('.mt-color').find('input[type="color"]');
    var dot = $(this).attr('data-val') || 0;
    var val = $color.val();
    $(this).closest('.mt-color').trigger('change', val.colorRgba(dot));
});

/***/ }),
/* 515 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click.selectdiy', '.mt-select-diy', function (e) {
    var $body = $(this).find('.mt-select-body');
    if ($(e.target).closest('.mt-select-body')[0]) {
        return;
    }
    if ($body.is(':hidden')) {
        $body.show();
    } else {
        $body.hide();
    }
}).on('click.selectdiy', function (e) {
    if (!$(e.target).closest('.mt-select-diy')[0]) {
        $('.mt-select-body').hide();
    }
});

_global2.default.$doc.on('click', '.mt-select', function (e) {
    e.stopPropagation();
    console.log('aa');
    $(this).find('select')[0].click();
});

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click.selectone', '.mt-selectone', function (e) {
	var $option = $(e.target).closest('.option');

	// 如果点击的是是其他区域
	if (!$option[0]) {
		return;
	}

	var val = $option.attr('data-val');
	$(this).attr('data-val', val).trigger('change', val);
	$option.addClass('mt-selected').siblings('.option').removeClass('mt-selected');
});

function initSelectOne() {
	$('.mt-selectone').each(function (index, el) {
		var val = $(this).attr('data-val');
		$(this).find('.option[data-val="' + val + '"]').addClass('mt-selected');
	});
};

window.initSelectOne = initSelectOne;

initSelectOne();

/***/ }),
/* 517 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//提示信息
_global2.default.$doc.off("click.toggle").on("click.toggle", "[data-toggle]", function () {
    var $this = $(this);
    var data = JSON.parse($this.attr("data-toggle"));
    for (var i = 0; i < data.length; i++) {
        $(data[i].dom).toggleClass(data[i].class);
    }
});

/***/ }),
/* 518 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mousedown.uniqlist', '.mt-uniqlist', function (e) {

    var xd = e.pageX,
        yd = e.pageY,
        _this = this,
        $this = $(this);

    $this.trigger('uniqstart');

    //点击其他区域，不拖动
    if (e.target.className == 'mt-uniqlist') {
        return;
    }

    //处理 二次拖动clone的BUG
    if ($(e.target).closest('.mt-uniq-clone')[0]) {
        return;
    }

    var $li = $(e.target).closest('li');

    if (!$li[0]) {
        return;
    }

    var left = parseInt($li.position().left, 10),
        top = parseInt($li.position().top, 10),
        liHei = $li.height();
    var startIndex = $li.index();

    var $clone = null;

    //使用clone 方法
    var cloneDom = function cloneDom() {
        $li.addClass('mt-uniq-start').siblings('li').removeClass('mt-uniq-start');
        //使用clone
        $clone = $($li.clone());
        $clone.addClass('mt-uniq-clone').css({
            left: left,
            top: top,
            width: $li.width(),
            height: $li.height(),
            position: 'absolute'
        });
        $this.append($clone.prop('outerHTML'));
        $clone = $('.mt-uniq-clone');
    };

    //这里只能上下拖动
    var outHei = parseInt($li.css('margin-top'), 10) + parseInt($li.css('margin-bottom'), 10);
    var maxHei = liHei + outHei;

    var litop = $li.css('top');
    litop = litop != 'auto' ? parseInt(litop, 10) : 0;

    //处理click事件
    var clickMark = true;
    var initCloneMark = false;

    _global2.default.$doc.on('mousemove.uniqlist', function (em) {
        var move = litop + (em.pageY - yd);

        //允许2px的误差
        if (Math.abs(move) > 3) {
            clickMark = false;
            //只执行一次
            if (!initCloneMark) {
                initCloneMark = true;
                cloneDom();
                cloneDom = null;
            }
            $clone.css({
                left: left + (em.pageX - xd),
                top: top + (em.pageY - yd)
            });

            if (move > 0 && move > maxHei) {
                if ($li.next()[0]) {
                    litop -= maxHei;
                    $li.before($li.next());
                }
            } else if (move < 0 && -move > maxHei) {
                if ($li.prev()[0]) {
                    litop += maxHei;
                    $li.after($li.prev());
                }
            }
        }
    }).on('mouseup.uniqlist', function (e) {
        var endleft = parseInt($li.position().left, 10),
            endtop = parseInt($li.position().top, 10);

        //click事件
        if (clickMark) {
            $li.removeClass('mt-uniq-start');
            $this = null;
            $li = null;
        } else {
            $clone.animate({
                left: endleft,
                top: endtop
            }, 500, function () {
                $clone.remove();
                $li.removeClass('mt-uniq-start');
                var endIndx = $li.index();
                if (endIndx >= 0 && startIndex != endIndx) {
                    $this.trigger('uniqend', {
                        from: startIndex,
                        to: endIndx
                    });
                }
                $clone = null;
                $this = null;
                $li = null;
            });
        }
        _global2.default.$doc.off('mousemove.uniqlist');
        _global2.default.$doc.off('mouseup.uniqlist');
    });
});

/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click.tabs', '.mt-tab-head', function (e) {
    var $this = $(this);
    var $tab = $this.closest('.mt-tab');
    var index = $this.index();
    $this.addClass('mt-active').siblings('.mt-tab-head').removeClass('mt-active');
    $tab.find('>.mt-tab-body').find('>.mt-tab-box').removeClass('mt-active').eq(index).addClass('mt-active');
    $tab.trigger('changes', {
        dom: $this,
        index: index
    });
});

/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mouseover.title', '[data-title]', function (e) {
    var title = $(this).attr('data-title'),
        divstr = '',
        left = $(this).offset().left,
        top = $(this).offset().top,
        hei = $(this).height(),
        wid = $(this).width();
    divstr = '<div class="mt-title mt-title-animated animated zoomIn" style="left:' + left + 'px; top:' + (top + hei + 2) + 'px;">' + title + '</div>';
    $('body').append(divstr);
}).on('mouseout.title', function (e) {
    $('.mt-title').remove();
});

/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

__webpack_require__(282);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//transform 方法

//控制杆 \u8be5\u8f6f\u4ef6\u7531\u8463\u6d9b\u72ec\u7acb\u5f00\u53d1
$.fn.crop = function (setting) {
    var defaults = {
        movex: true,
        movey: true,
        borderWidth: -500,
        callback: null,
        delBtn: false,
        defaultWidth: 323, // 默认的图片框宽度
        defaultHeight: 218, // 默认的图片框高度
        wh: ['100%', '100%'] // 如果设置 100% 就表示默认 全屏显示，也可以设置 1,2 表示比例
    };
    var set = $.extend(defaults, setting);

    // 剪切区域宽度和高度，这里定义的全局变量，不做参数传递
    set['width'] = 0;
    set['height'] = 0;

    var _this = this;
    var $crop = $(this);
    var $this = $(this).empty(); // 渲染前，先清空内容，解除事件
    var srcOld = $this.data('src');

    if (!srcOld) {
        return false;
    }

    var idname = +new Date(); // 时间戳做事件别名
    var shtml = '<div class="mt-crop">\n                    <div class="mt-crop-bg">\n                        <div class="mt-crop-box">\n                            <div class="mt-crop-controlbox">\n                                <div class="mt-crop-control">\n                                    <span class="mt-control-center"></span>\n                                    <span class="mt-control-top"></span>\n                                    <span class="mt-control-left"></span>\n                                    <span class="mt-control-right"></span>\n                                    <span class="mt-control-bottom"></span>\n                                    <span class="mt-control-topleft"></span>\n                                    <span class="mt-control-topright"></span>\n                                    <span class="mt-control-bottomleft"></span>\n                                    <span class="mt-control-bottomright"></span>\n                                </div>\n                            </div>\n                            <img class="mt-crop-img" src="' + srcOld + '" alt="">\n                        </div>\n                    </div>\n                    <div class="mt-crop-fun">\n                        <a class="mt-crop-100">100%</a><!--\n                        --><a class="mt-crop-11">1:1</a><!--\n                        --><a class="mt-crop-23">2:3</a><!--\n                        --><a class="mt-crop-34">3:4</a><!--\n                        --><a class="mt-crop-35">3:5</a>\n                    </div>\n                    <div class="mt-crop-btns">\n                           <a class="mt-cropbtn-change a-selectimg"><i class="iconfont icon-icoreset"></i> \u6362\u56FE</a><!--\n                        --><a class="mt-cropbtn-crop"><i class="iconfont icon-icocrop"></i> \u88C1\u526A</a><!--\n                        --><a class="mt-cropbtn-init"><i class="iconfont icon-icoinit"></i> \u8FD8\u539F</a><!--\n                        -->' + (set.delBtn ? '<a class="mt-cropbtn-del"><i class="iconfont icon-icodel"></i> 删除</a>' : '') + '\n                    </div>\n                </div>';

    $this.find('.mt-crop').remove();
    $this = $this.empty().html(shtml).find('.mt-crop');

    var swid, shei; //选区大小
    var $bg = $this.find('.mt-crop-bg');
    var bg = {
        wid: parseInt($bg.width(), 10),
        hei: parseInt($bg.height(), 10)
    };
    var img = null;
    var x = set.borderWidth,
        y = set.borderWidth; //移动位置
    //初始化图片
    var $img = $this.find('.mt-crop-img');

    //移动
    var moveFun = function moveFun(e, _this) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var $box = $(_this).parent();
        var box = {
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
        };
        _global2.default.$doc.on('mousemove.crop_move', function (em) {
            var left = box.left + (em.pageX - down.x) / _global2.default.scale - set.borderWidth;
            var top = box.top + (em.pageY - down.y) / _global2.default.scale - set.borderWidth;
            if (top + shei > set.height) {
                top = set.height - shei - 2;
            }
            if (top < 0) {
                top = 0;
            }
            if (left + swid > set.width) {
                left = set.width - swid - 2;
            }
            if (left < 0) {
                left = 0;
            }
            top += set.borderWidth;
            left += set.borderWidth;

            y = top;
            x = left;

            var style = {
                left: left,
                top: top
            };
            if (!set.movex) {
                delete style.left;
            }
            if (!set.movey) {
                delete style.top;
            }
            $box.css(style);
            style = null;
        }).on('mouseup.crop_move', function (e) {
            _global2.default.$doc.off('mousemove.crop_move mouseup.crop_move');
        });
    };

    //缩放
    var resizeFun = function resizeFun(e, _this, type) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var $box = $(_this).parent();
        var box = {
            wid: parseInt($box.width(), 10),
            hei: parseInt($box.height(), 10),
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
        };
        var scale = $box.transform('scale');

        swid = box.wid;
        shei = box.hei;

        _global2.default.$doc.on('mousemove.crop_resize', function (em) {

            var val = {
                x: em.pageX - down.x,
                y: em.pageY - down.y
            };
            var hei, wid;
            if (type == 'top') {
                hei = box.hei - val.y;
                y = box.top + val.y;

                //超出top
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }

                $box.css({
                    height: hei,
                    top: y
                });
            } else if (type == 'bottom') {
                hei = box.hei + val.y;

                //超出底部
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2;
                }

                $box.css({
                    height: hei
                });
            } else if (type == 'left') {
                wid = box.wid - val.x;
                x = box.left + val.x;

                //左边超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }

                $box.css({
                    width: wid,
                    left: x
                });
            } else if (type == 'right') {
                wid = box.wid + val.x;

                //右边超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2;
                }

                $box.css({
                    width: wid
                });
            } else if (type == 'topleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                x = box.left + val.x;
                y = box.top + box.hei - hei;

                //超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                }

                $box.css({
                    height: hei,
                    width: wid,
                    top: y,
                    left: x
                });
            } else if (type == 'topright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
                y = box.top + box.hei - hei;

                //超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2;
                }
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                }

                $box.css({
                    height: hei,
                    width: wid,
                    top: y
                });
            } else if (type == 'bottomleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                x = box.left + val.x;

                //超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2;
                }

                $box.css({
                    width: wid,
                    height: hei,
                    left: x
                });
            } else if (type == 'bottomright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;

                //超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2;
                }
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2;
                }

                $box.css({
                    height: hei,
                    width: wid
                });
            }

            if (wid) {
                swid = wid;
            }
            if (hei) {
                shei = hei;
            }
        }).on('mouseup.crop_resize', function (e) {
            _global2.default.$doc.off('mousemove.crop_resize mouseup.crop_resize');
        });
    };

    //图片预加载
    var loadImage = function loadImage(url, callback) {
        var imgs = new Image();
        imgs.src = url;
        imgs.onload = function () {
            //图片下载完毕时异步调用callback函数。 
            callback(imgs); // 将callback函数this指针切换为img。
            // imgs.onload = null;
        };
    };

    //获取参数
    var getValue = function getValue() {
        var scale = img.wid / img.width;
        return {
            x: (x - set.borderWidth) / scale,
            y: (y - set.borderWidth) / scale,
            width: swid / scale,
            height: shei / scale,
            realWidth: img.width,
            realHeight: img.height,
            src: img.src
        };
    };

    //设置比例
    var setSize = function setSize(a, b) {

        if (a == '100%') {
            swid = img.wid;
            shei = img.hei;
        } else {
            //设置宽度
            if (img.wid > img.hei) {
                swid = img.hei * a / b;
                shei = img.hei;
            } else {
                swid = img.wid;
                shei = img.wid * b / a;
            }
        }

        var $controlbox = $this.find('.mt-crop-controlbox');

        $controlbox.css({
            display: 'block',
            width: swid - 2,
            height: shei - 2,
            top: set.borderWidth,
            left: set.borderWidth
        });

        //保留原来属性
        if (!$controlbox.attr('data-old')) {
            $controlbox.attr('data-old', $controlbox.attr('style'));
        }
    };

    //设置参数 - 图片预加载后，设置一些参数
    var reSet = function reSet(_img) {
        img = {
            width: _img.width,
            height: _img.height,
            wid: parseInt($img.width(), 10),
            hei: parseInt($img.height(), 10),
            src: _img.src

            // 如果图片是隐藏的。需要手动去计算wid,hei， 默认的宽高是323px * 218px
        };if ($img.is(':hidden')) {

            //
            if (img.width < set.defaultWidth && img.height < set.defaultHeight) {
                img.wid = img.width;
                img.hei = img.height;
            } else {
                // 如果真实图片的 宽度比较小
                if (img.width / img.height >= set.defaultWidth / set.defaultHeight) {
                    img.wid = set.defaultWidth;
                    img.hei = img.wid * (img.height / img.width);
                } else {
                    // 如果高度比较小
                    img.hei = set.defaultHeight;
                    img.wid = img.hei * (img.width / img.height);
                }
            }
        }

        console.log('reSet Crop');

        //设置移动范围
        set.width = img.wid;
        set.height = img.hei;
        swid = img.wid;
        shei = img.hei;

        //设置区域
        $this.find('.mt-crop-box').css({
            width: img.wid,
            height: img.hei,
            top: (bg.hei - img.hei) / 2
        });

        //初始化剪切区域
        setSize(set.wh[0], set.wh[1]);
    };

    //销毁
    _this.distory = function () {
        $crop.off('mousedown.crop_' + idname);
        $crop.off('click.crop_' + idname);
        $crop.off('click.cropset_' + idname);
        $crop.off('click.cropinit_' + idname);
        $crop.off('click.cropchang_' + idname);
        $crop.off('click.cropdel_' + idname);
        $this.find('.mt-crop').remove();
    };

    //事件绑定
    var initEvent = function initEvent() {

        //事件绑定
        $crop.off('mousedown.crop_' + idname).on('mousedown.crop_' + idname, '.mt-crop-control', function (e) {
            switch (e.target.className) {
                case 'mt-crop-control':
                    moveFun(e, this);
                    break;
                case 'mt-control-top':
                    resizeFun(e, this, 'top');
                    break;
                case 'mt-control-topleft':
                    resizeFun(e, this, 'topleft');
                    break;
                case 'mt-control-topright':
                    resizeFun(e, this, 'topright');
                    break;
                case 'mt-control-bottom':
                    resizeFun(e, this, 'bottom');
                    break;
                case 'mt-control-bottomleft':
                    resizeFun(e, this, 'bottomleft');
                    break;
                case 'mt-control-bottomright':
                    resizeFun(e, this, 'bottomright');
                    break;
                case 'mt-control-left':
                    resizeFun(e, this, 'left');
                    break;
                case 'mt-control-right':
                    resizeFun(e, this, 'right');
                    break;
            }
        });

        //裁剪
        $crop.off('click.crop_' + idname).on('click.crop_' + idname, '.mt-cropbtn-crop', function (e) {
            var obj = getValue();
            var image = new Image();
            image.src = obj.src;
            var canvas = $('<canvas width="' + obj.width + '" height="' + obj.height + '"></canvas>')[0],
                ctx = canvas.getContext('2d');

            ctx.drawImage(image, obj.x, obj.y, obj.width, obj.height, 0, 0, obj.width, obj.height);
            var data = canvas.toDataURL();

            //console.log(data)
            _this.distory();
            $crop.data('src', data);
            $crop.crop(set);

            //事件触发
            $crop.trigger('crop', {
                imgData: data,
                crop: obj,
                name: 'crop_' + idname
            });
        });

        //设置比例
        $crop.off('click.cropset_' + idname).on('click.cropset_' + idname, '.mt-crop-fun', function (e) {
            switch (e.target.className) {
                case 'mt-crop-100':
                    setSize('100%', '100%');break;
                case 'mt-crop-11':
                    setSize(1, 1);break;
                case 'mt-crop-23':
                    setSize(2, 3);break;
                case 'mt-crop-34':
                    setSize(3, 4);break;
                case 'mt-crop-35':
                    setSize(3, 5);break;
            }
        });

        //还原
        $crop.off('click.cropinit_' + idname).on('click.cropinit_' + idname, '.mt-cropbtn-init', function (e) {
            console.log('还原');
            _this.distory();
            var src = $crop.attr('data-oldsrc');
            $crop.data('src', src);
            $crop.crop(set);
            //事件触发
            $crop.trigger('crop', src);
        });

        //换图
        $crop.off('click.cropchang_' + idname).on('click.cropchang_' + idname, '.mt-cropbtn-change', function (e) {
            //_this.distory();
            //事件触发 , _this 是当前操作的 DOM 。 
            $crop.trigger('cropNew', _this);
        });

        //删除
        $crop.off('click.cropdel_' + idname).on('click.cropdel_' + idname, '.mt-cropbtn-del', function (e) {
            _this.distory();
            //$this.remove();
            //事件触发
            // $(_this).find('.mt-crop').hide();
            $crop.trigger('cropDel');
        });
    };

    //图片预加载
    var mark = true;
    loadImage($img.attr('src'), function (_img) {
        //设置参数
        reSet(_img);
        if (mark) {
            mark = false;
            initEvent();
        }
    });

    return _this;
};

/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置值
function setSilderVal($this) {
    $this.empty().html('<div class="mt-slider-active"><a class="mt-slider-btn"></a></div>');
    var defaultVal = $this.attr('data-val'),
        wid = $this.width();
    $this.find('.mt-slider-active').width(defaultVal * wid);
}

//初始化值
function initSlider() {
    $('.mt-slider-bar').each(function () {
        setSilderVal($(this));
    });
}

// 事件 change,start, end
_global2.default.$doc.on('mousedown.slider', '.mt-slider-btn', function (e) {
    var xs = e.pageX,
        $slider = $(this).closest('.mt-slider-bar'),
        $active = $slider.find('.mt-slider-active'),
        max = parseInt($slider.width(), 10),
        defaultVal = $slider.attr('data-val'),
        wid = max * defaultVal,
        val = null;
    $slider.trigger('start', (defaultVal / max).toFixed(2));
    _global2.default.$doc.on('mousemove.slider', function (e) {
        var mx = e.pageX;
        val = wid + (mx - xs);
        if (val < 0) {
            val = 0;
        } else if (val > max) {
            val = max;
        }
        $active.width(val);
        $slider.attr('data-val', (val / max).toFixed(2));
        $slider.trigger('change', (val / max).toFixed(2));
    }).on('mouseup.slider', function (e) {
        var dval = (val / max).toFixed(2);
        $slider.attr('data-val', dval);
        $slider.trigger('end', dval);
        _global2.default.$doc.off('mousemove.slider mouseup.slider');
    });
});

window.initSlider = initSlider;
window.setSilderVal = setSilderVal;

$(function () {
    initSlider();
});

/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click', '.mt-switch', function (e) {
    var $this = $(this);
    if ($this.attr('data-val') == 'on') {
        $this.attr('data-val', 'off');
        $this.trigger('change', false);
    } else {
        $this.attr('data-val', 'on');
        $this.trigger('change', true);
    }
});

$.fn.switch = function (val) {
    if (val) {
        return $(this).attr('data-val');
    } else {
        $(this).attr('data-val', val).trigger('change', val);
    }
};

/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
    $.fn.upload = function (opts) {
        var itemTpl = '<div class="mt-upload-item">\n\t\t\t\t\t\t<div class="mt-upload-progress">\n\t\t\t\t\t\t\t<div class="mt-upload-progress-bar"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class="mt-upload-filename">{{fileName}}</span>\n\t\t\t\t\t\t<span class="delfilebtn">\u5220\u9664</span>\n\t\t\t\t\t</div>';
        var defaults = {
            type: 'jpg,png,gif,jpeg', //允许上传的文件类型，格式'jpg,png,gif'
            url: '', //文件提交的地址
            auto: true, //是否开启自动上传
            method: 'post', //发送请求的方式，get或post
            multi: true, //是否允许选择多个文件,如果是单图上传，imgbox 设置为img对象
            data: null, //发送给服务端的参数，格式：{key:value}
            fileName: 'file', //在后端接受文件的参数名称，如PHP中的$_FILES['file']
            limit: 2048, //允许上传的文件大小，单位KB
            imgbox: null,
            itemTpl: itemTpl, //上传队列显示的模板
            uploadStart: null, //上传开始时的动作
            uploadSuccess: null, //上传成功的动作
            uploadComplete: null, //上传完成的动作
            uploadError: null, //上传失败的动作
            init: null, //初始化时的动作
            cancel: null //删除掉某个文件后的回调函数
        };

        var set = $.extend(defaults, opts);
        var _this = this;

        //设置BTN_HTML
        function setBtnHTML() {
            var shtml = $(_this).html();
            $(_this).html(shtml + '<input class="mt-upload-input" type="file" ' + (set.multi ? 'multiple="true"' : '') + ' />');
        }

        //将文件的单位由bytes转换
        function bytesToSize(bytes) {
            if (bytes === 0) return '0 B';
            var k = 1024;
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return bytes / Math.pow(k, i) + '' + sizes[i];
            //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];  
        }

        //数据过滤
        function fileFilter(file) {

            var type = file.type.split('/');
            var size = file.size;
            if (set.type.indexOf(type[1]) == -1) {
                //alert('文件格式错误！');
                $.tip({
                    msg: '文件格式错误！',
                    type: 'danger'
                });
                return false;
            }
            if (size > set.limit * 1024) {
                $.tip({
                    msg: '文件尺寸不能超过' + bytesToSize(set.limit * 1024),
                    type: 'danger'
                });
                return false;
            }
            return true;
        }

        //上传
        function uploadFun(file) {

            //上传开始
            // $(_this).trigger('uploadStart', file);
            if (set.uploadStart) {
                set.uploadStart(file);
            }

            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                //上传进度条
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var percentage = Math.round(e.loaded * 100 / e.total);
                        console.log(percentage);
                    }
                }, false);

                xhr.upload.addEventListener("load", function (e) {
                    //console.log("上传完毕...",e)
                    //完成
                    if (set.uploadComplete) {
                        set.uploadComplete(e);
                    }
                }, false);

                xhr.open(set.method, set.url, true);
                xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
                xhr.overrideMimeType("text/plain; charset=utf-8");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var obj = JSON.parse(xhr.responseText);

                            //设置HTML
                            var tpl = set.itemTpl.replace('{{fileName}}', obj.data.name);

                            //单图上传
                            if (!set.multi) {
                                if (set.imgbox) {
                                    $(set.imgbox).attr('src', obj.data.url);
                                } else {
                                    // $(_this).append(tpl)
                                }
                            } else {
                                if (set.imgbox) {
                                    $(set.imgbox).append(tpl);
                                } else {
                                    // $(_this).append(tpl)
                                }
                            }
                            //成功！
                            if (set.uploadSuccess) {
                                set.uploadSuccess(obj, xhr);
                            }
                            // $(_this).trigger('uploadSuccess', obj, xhr);
                        } else {
                            //失败！
                            if (set.uploadError) {
                                set.uploadError(xhr);
                            }
                            // $(_this).trigger('uploadError', xhr);
                        }
                    }
                };
                var fd = new FormData();
                fd.append(file.name, file);
                if (set.data) {
                    for (var key in set.data) {
                        fd.append(key, set.data[key]);
                    }
                }
                xhr.send(fd);
            } else {
                // $(_this).trigger('uploadError', xhr);
                if (set.uploadError) {
                    set.uploadError(xhr);
                }
            }
        }

        //事件方法
        function eventFun() {
            //事件绑定, 如果采用事件委托，会导致 uploadFun 暴露给window对象，这样形成闭包函数，upload函数被新的upload覆盖
            $(_this).find('.mt-upload-input').off('change.upload').on('change.upload', function (e) {
                // 获取文件列表对象
                var files = e.target.files;
                for (var i = 0; i < files.length; i++) {
                    //上传图片
                    if (fileFilter(files[i])) {
                        uploadFun(files[i]);
                    }
                }
            });
        }

        //init
        function initFun() {
            setBtnHTML();
            eventFun();
        }

        initFun();

        return $(this);
    };
})(jQuery);

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mousedown.drag', '.mt-drag', function (e) {
    var xd = e.pageX,
        yd = e.pageY,
        _this = this,
        $this = $(this),
        left = $this.offset().left,
        top = $this.offset().top;

    var set = {
        limit: true, //边界限制
        undrag: []
    };
    var dragset = $this.attr('data-dragset');
    dragset = dragset ? JSON.parse(dragset) : {};
    set = $.extend(set, dragset);

    //undrag 区域设置,不拖动
    if (set.undrag.length != 0) {
        for (var i = 0; i < set.undrag.length; i++) {
            if ($(e.target).closest(set.undrag[i])[0]) {
                return;
            }
        }
    }

    //限制边界
    if (set.limit) {
        var wid = $this.width(),
            hei = $this.height(),
            outLeft = $this.parent().offset().left,
            outTop = $this.parent().offset().top,
            outWid = $this.parent().width(),
            outHei = $this.parent().height();
    }

    _global2.default.$doc.on('mousemove.drag', function (em) {

        var x = left + (em.pageX - xd),
            y = top + (em.pageY - yd);

        //区域限制
        if (set.limit) {
            if (x < outLeft) {
                x = outLeft;
            } else if (x > outWid - wid) {
                x = outWid - wid;
            }

            if (y < outTop) {
                y = outTop;
            } else if (y > outHei - hei) {
                y = outHei - hei;
            }
        }

        $this.css({
            left: x,
            top: y
        });
    }).on('mouseup.drag', function (e) {
        _global2.default.$doc.off('mousemove.drag mouseup.drag');
    });
});

/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

__webpack_require__(282);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//transform 方法

//控制杆
$.fn.control = function (setting) {
    var defaults = {
        movex: true, //x方向移动
        movey: true, //y方向移动
        autosize: true, //任意拉伸
        fixedsize: true, //固定比例拉伸
        rotate: true //旋转
    };
    var $this = $(this);
    var set = $.extend(defaults, setting);
    var shtml = '<div class="mt-control">\n\t\t\t\t\t{{rotate}}\n\t\t\t\t\t{{autosize}}\n\t\t\t\t\t{{fixedsize}}\n\t\t\t\t\t<span class="mt-control-center"></span>\n\t\t\t\t</div>';

    //如果没有旋转
    if (set.rotate) {
        shtml = shtml.replace('{{rotate}}', '<span class="mt-control-rotate"></span>');
    } else {
        shtml = shtml.replace('{{rotate}}', '');
    }

    //自动缩放
    if (set.autosize) {
        shtml = shtml.replace('{{autosize}}', '<span class="mt-control-top"></span>\n\t\t\t\t\t<span class="mt-control-left"></span>\n\t\t\t\t\t<span class="mt-control-right"></span>\n\t\t\t\t\t<span class="mt-control-bottom"></span>');
    } else {
        shtml = shtml.replace('{{autosize}}', '');
    }

    //如果没有缩放
    if (set.fixedsize) {
        shtml = shtml.replace('{{fixedsize}}', '<span class="mt-control-topleft"></span>\n\t\t\t\t\t<span class="mt-control-topright"></span>\n\t\t\t\t\t<span class="mt-control-bottomleft"></span>\n\t\t\t\t\t<span class="mt-control-bottomright"></span>');
    } else {
        shtml = shtml.replace('{{fixedsize}}', '');
    }

    var $controlDom = $this.find('.mt-control');
    if ($controlDom[0]) {
        $controlDom.remove();
        $controlDom = null;
    }

    $this.append(shtml);

    //移动
    var moveFun = function moveFun(e, _this) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var $box = $(_this).parent();
        var scale = AppData.edit.phoneScale || _global2.default.scale;
        var box = {
            left: parseInt($box.css('left'), 10) * scale,
            top: parseInt($box.css('top'), 10) * scale
        };
        var style = null;
        _global2.default.$doc.on('mousemove.control_move', function (em) {
            style = {
                left: (box.left + (em.pageX - down.x)) / scale,
                top: (box.top + (em.pageY - down.y)) / scale
            };
            if (!set.movex) {
                delete style.left;
            }
            if (!set.movey) {
                delete style.top;
            }
            $box.css(style);
        }).on('mouseup.control_move', function (e) {
            _global2.default.$doc.off('mousemove.control_move mouseup.control_move');
            $this.trigger('change', style);
            style = null;
        });
    };

    //旋转
    var rotateFun = function rotateFun(e, _this) {
        var $target = $(e.target);
        var $center = $(_this).find('.mt-control-center');
        var $box = $(_this).parent();
        var center = {
            x: parseInt($center.offset().left, 10),
            y: parseInt($center.offset().top, 10)
        };
        var pi = 180 / Math.PI;
        var du = null;
        _global2.default.$doc.on('mousemove.control_rotate', function (em) {
            var x = em.pageX - center.x;
            var y = center.y - em.pageY;
            du = Math.atan(x / y);
            du = du * pi;
            du = parseInt(du, 10);

            //判断向限
            if (x >= 0 && y >= 0) {//1
                //...
            } else if (x >= 0 && y < 0) {
                //4
                du = Math.abs(du);
                du = 180 - du;
            } else if (x < 0 && y >= 0) {
                //2
                du = du + 360;
            } else {
                //3
                du = du + 180;
            }
            //旋转的时候，固定中心点
            $box.transform({
                'rotate': du + 'deg'
            });
        }).on('mouseup.control_rotate', function (e) {
            _global2.default.$doc.off('mousemove.control_rotate mouseup.control_rotate');
            $this.trigger('change', {
                'rotate': du + 'deg'
            });
            du = null;
        });
    };

    //缩放
    var resizeFun = function resizeFun(e, _this, type) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var scale = AppData.edit.phoneScale || _global2.default.scale;
        var $box = $(_this).parent();
        var box = {
            wid: parseInt($box.width(), 10),
            hei: parseInt($box.height(), 10),
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
            // let scale = $box.transform('scale');
        };var hei = null,
            wid = null,
            top = null,
            left = null;

        _global2.default.$doc.on('mousemove.control_resize', function (em) {
            var val = {
                x: (em.pageX - down.x) / scale,
                y: (em.pageY - down.y) / scale
            };
            if (type == 'top') {
                hei = box.hei - val.y;
                top = box.top + val.y;
            } else if (type == 'bottom') {
                hei = box.hei + val.y;
            } else if (type == 'left') {
                wid = box.wid - val.x;
                left = box.left + val.x;
            } else if (type == 'right') {
                wid = box.wid + val.x;
            } else if (type == 'topleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                top = box.top + box.hei - hei;
                left = box.left + val.x;
            } else if (type == 'topright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
                top = box.top + box.hei - hei;
            } else if (type == 'bottomleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                left = box.left + val.x;
            } else if (type == 'bottomright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
            }

            $box.css({
                height: hei || box.hei,
                width: wid || box.wid,
                top: top || box.top,
                left: left || box.left
            });
        }).on('mouseup.control_resize', function (e) {
            _global2.default.$doc.off('mousemove.control_resize mouseup.control_resize');
            $this.trigger('change', {
                height: hei || box.hei,
                width: wid || box.wid,
                top: top || box.top,
                left: left || box.left
            });
        });
    };

    //销毁
    this.distory = function () {
        $('.mt-control').remove();
        moveFun = null;
        rotateFun = null;
        resizeFun = null;
    };

    //事件绑定
    _global2.default.$doc.off('mousedown.control').on('mousedown.control', '.mt-control', function (e) {
        e.preventDefault();

        // 专门给 group 提供的，如果正在编辑器组合，原来的方法都失效
        if (AppData.edit.group) {
            return;
        }

        switch (e.target.className) {
            case 'mt-control':
                moveFun(e, this);
                break;
            case 'mt-control-rotate':
                rotateFun(e, this);
                break;
            case 'mt-control-top':
                resizeFun(e, this, 'top');
                break;
            case 'mt-control-topleft':
                resizeFun(e, this, 'topleft');
                break;
            case 'mt-control-topright':
                resizeFun(e, this, 'topright');
                break;
            case 'mt-control-bottom':
                resizeFun(e, this, 'bottom');
                break;
            case 'mt-control-bottomleft':
                resizeFun(e, this, 'bottomleft');
                break;
            case 'mt-control-bottomright':
                resizeFun(e, this, 'bottomright');
                break;
            case 'mt-control-left':
                resizeFun(e, this, 'left');
                break;
            case 'mt-control-right':
                resizeFun(e, this, 'right');
                break;
        }
    });

    return this;
};

/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _appsetTpl = __webpack_require__(528);

var _imgTpl = __webpack_require__(117);

var _bgTpl = __webpack_require__(283);

var _bgColorTpl = __webpack_require__(144);

var _pageListTpl = __webpack_require__(529);

var _appSliderAnimateTpl = __webpack_require__(530);

var _appSliderTypeTpl = __webpack_require__(284);

var _pageFun = __webpack_require__(531);

var _layerFun = __webpack_require__(73);

var _layerSwitch = __webpack_require__(145);

var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

var _AppDataFun = __webpack_require__(1);

var _saveApp = __webpack_require__(244);

var _page = __webpack_require__(532);

var _page2 = _interopRequireDefault(_page);

var _popup = __webpack_require__(533);

var _popup2 = _interopRequireDefault(_popup);

var _fixed = __webpack_require__(534);

var _fixed2 = _interopRequireDefault(_fixed);

var _animate = __webpack_require__(535);

var _animate2 = _interopRequireDefault(_animate);

var _appFun = __webpack_require__(287);

var _appFunLayerGroup = __webpack_require__(289);

var _loading = __webpack_require__(163);

var _app2 = __webpack_require__(538);

var _app3 = _interopRequireDefault(_app2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 新建空白的APP
// layer 组的操作

//控制编辑区域显示隐藏的方法
//设置翻页模式，锁定，自动
//page 列表模版
//背景模版
//app设置模版
var AppNew = function AppNew(name, info, img, mp3, loading, slider, style, pages) {
    (0, _classCallCheck3.default)(this, AppNew);

    this.name = name || '新建APP';
    this.info = info || 'H5DS 太酷炫了';
    this.img = img || _app3.default;
    this.mp3 = mp3 || { name: '', url: '' };
    this.loading = loading || 0;
    this.slider = slider || 0;
    this.style = style || '';
    this.pages = pages || []; // 页面
    this.popups = popups || []; // 弹窗
    this.fixeds = fixeds || []; // 浮动层
};

// app 方法类
// 加载图标

// 画布的快捷操作
//选择翻页动画
//背景色模版
//图片模版


var App = function () {
    function App(res) {
        (0, _classCallCheck3.default)(this, App);

        this.app = res;
        this.className = 'app';
    }

    // 设置左侧页面列表， 内部调用


    (0, _createClass3.default)(App, [{
        key: 'setPageList',
        value: function setPageList() {
            var tpls = '';
            var pages = this.app[AppData.edit.pageType];
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                tpls += (0, _pageListTpl.pageListTpl)(page, 'page');
            }
            (0, _AppDataFun.getPageListDom)().html(tpls);
        }

        //设置左侧页面列表

    }, {
        key: 'setPagePage',
        value: function setPagePage() {
            var tpls = '';
            var pages = this.app.pages;
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                tpls += (0, _pageListTpl.pageListTpl)(page, 'page');
            }
            $('#pagesList').html(tpls);
        }

        //设置左侧弹窗列表

    }, {
        key: 'setPagePopup',
        value: function setPagePopup() {
            var tpls = '';
            var popups = this.app.popups;
            for (var i = 0; i < popups.length; i++) {
                var popup = popups[i];
                tpls += (0, _pageListTpl.pageListTpl)(popup, 'popup');
            }
            $('#popupsList').html(tpls);
        }

        //设置左侧浮动元素列表

    }, {
        key: 'setPageFlex',
        value: function setPageFlex() {
            // ...
            var tpls = '';
            var fixeds = this.app.fixeds;
            for (var i = 0; i < fixeds.length; i++) {
                var fixed = fixeds[i];
                tpls += (0, _pageListTpl.pageListTpl)(fixed, 'fixed');
            }
            $('#fixedsList').html(tpls);
        }

        // 释放组合的选择

    }, {
        key: 'destoryGroup',
        value: function destoryGroup() {
            AppData.edit.group = false;
            _global2.default.$doc.off('mousedown.group');
            _global2.default.$doc.off('contextmenu.group');
        }

        // 初始化loading

    }, {
        key: 'initLoad',
        value: function initLoad() {
            $('#setAppLoading').html((0, _loading.loadHTML)(this));
        }

        //初始化MP3

    }, {
        key: 'initMp3',
        value: function initMp3() {
            // 设置mp3
            var self = this;
            var mp3 = this.app.mp3;
            $('#nowappName').html('<span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ' + (mp3.name || '')).attr('data-url', mp3.url || '');

            // 选择使用mp3
            $('#mp3list').on('click', '.use', function (e) {
                var $item = $(this).closest('.item');
                var url = $item.attr('data-url');
                var name = $item.find('.name').text();
                self.app.mp3 = {
                    name: name,
                    url: url
                };
                $('#nowappName').html('<span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ' + (name || '')).attr('data-url', url || '');

                // 暂停播放
                $('.mp3-play-iconing').removeClass('mp3-play-iconing');
                if (url) {
                    $('#appMp3Audio')[0].pause();
                }

                (0, _AppDataFun.AppDataChange)();
            });

            // 清除背景音乐
            $('.now-use-mp3').on('click', '.del', function () {
                $('#nowappName').html('').attr('data-url', '');
                self.app.mp3 = {
                    name: '',
                    url: ''
                };
            });

            // 试听 选中的
            $('.now-use-mp3').on('click', '.try', function () {
                var $parent = $(this).parent();
                var url = $parent.find('.name').attr('data-url');
                $('.mp3-play-iconing').removeClass('mp3-play-iconing');
                $parent.find('.mp3-play-icon').addClass('mp3-play-iconing');
                if (url) {
                    $('#appMp3Audio').attr('src', url)[0].play();
                }
            });

            // 试听
            $('#mp3list').on('click', '.try', function () {
                var $parent = $(this).parent();
                var url = $parent.attr('data-url');
                $('.mp3-play-iconing').removeClass('mp3-play-iconing');
                $parent.find('.mp3-play-icon').addClass('mp3-play-iconing');
                if (url) {
                    $('#appMp3Audio').attr('src', url)[0].play();
                }
            });

            // 暂停
            $('#setAppMp3').on('click', '.mp3-play-iconing', function () {
                $(this).removeClass('mp3-play-iconing');
                $('#appMp3Audio')[0].pause();
            });
        }

        //设置操作区

    }, {
        key: 'initSet',
        value: function initSet() {
            var _app = this.app,
                style = _app.style,
                name = _app.name,
                info = _app.info,
                img = _app.img,
                slider = _app.slider;

            var bcolor = style['background-color'];
            var $setAppBg = $('#setAppBg');

            //app设置区域显示
            (0, _layerFun.layerShow)('#setAppBox');

            // //模版赋值，tpl,data
            var appsetTpls = (0, _appsetTpl.appsetTpl)({
                name: name,
                info: info,
                img: img
            });
            var imgTpls = (0, _imgTpl.imgTpl)({
                src: style['background-image'],
                id: 'cropimg',
                cropdom: 'appCropDom'
            });
            var bgTpls = (0, _bgTpl.bgTpl)({
                repeat: style['background-repeat'],
                size: style['background-size'],
                repeatId: 'appRepeat',
                sizeId: 'appSize'
            });
            var bgColorTpls = (0, _bgColorTpl.bgColorTpl)({
                color: bcolor ? bcolor.colorHex() : 'initial',
                opacity: bcolor ? bcolor.colorOpacity() : 1,
                colorId: 'appbgColor'
            });

            // 翻页动画选择
            var appSliderAnimateTpls = (0, _appSliderAnimateTpl.appSliderAnimateTpl)({
                playtype: slider['animate']
            });

            // 翻页模式
            // let appSliderTypeTpls = appSliderTypeTpl({
            //     lock: slider['lock'],
            //     autoplay: slider['autoplay'],
            //     time: slider['time']
            // })

            // 设置HTML
            $setAppBg.empty().html(appsetTpls + '<div class="tr">\u9875\u9762\u80CC\u666F\uFF1A</div>' + imgTpls + bgTpls + bgColorTpls + ('<div class="set-slider">' + appSliderAnimateTpls + '</div>'));
            // 设置app名字
            $('.a-setname').html(name);
        }

        // 事件

    }, {
        key: 'eventFun',
        value: function eventFun() {
            var self = this;
            var $pagesList = $('#pagesList, #popupsList, #fixedsList');

            // loading 选择
            $('#setAppLoading').on('click', '.loader', function (e) {
                self.app.loading = $(this).index();
                $(this).addClass('active').siblings('.loader').removeClass('active');
            });

            // pagelist事件, 拖动排序，选择页面
            (0, _pageListTpl.initPageListEvent)(this);

            // app 翻页动画
            (0, _appSliderAnimateTpl.initAppSliderAnimate)(this);

            // app 翻页模式
            (0, _appSliderTypeTpl.initAppSliderType)(this);

            // 点击空白，销毁layer控制器
            _global2.default.$doc.off('mousedown.destoryControl').on('mousedown.destoryControl', function (e) {
                if (!$(e.target).closest('.layer')[0] && $(e.target).closest('#phone')[0]) {
                    (0, _pageListTpl.destoryControl)();
                    // 然后默认选择page
                    (0, _AppDataFun.getPageListDom)().find('.active').trigger('click');

                    // 点击空白，重新释放 组的选择
                    self.destoryGroup();
                }
            });

            // 组合图层的相关操作
            (0, _appFunLayerGroup.groupLayers)();

            // 删除page
            $pagesList.off('click.delpage').on('click.delpage', '.del-page', function (e) {
                e.stopPropagation();
                var $item = $(this).closest('.page-item');
                var index = $item.index();
                self.delPage(index);
            });

            // 新增page
            // $pagesList.off('click.addpage').on('click.addpage', '.add-page', function (e) {
            //     e.stopPropagation();
            //     let $item = $(this).closest('.page-item');
            //     let index = $item.index();
            //     self.addPage(index);
            // });

            // 修改页面名字
            $pagesList.off('click.editpage').on('click.editpage', '.edit-page', function (e) {
                e.stopPropagation();
                var $item = $(this).closest('.page-item');
                var index = $item.index();
                var page = self.app[AppData.edit.pageType][index];
                // self.delPage(index);
                $.confirms({
                    title: '修改页面名字',
                    content: '\n                <input id="editPageInputId" class="edit-page-input" value="' + (page.id || '') + '" type="text" placeholder="\u9875\u9762ID"/>\n                <input id="editPageInput" class="edit-page-input" value="' + (page.name || '') + '" type="text" placeholder="\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0"/>',
                    callback: function callback(mark) {
                        if (mark) {
                            var name = $('#editPageInput').val();
                            var id = $('#editPageInputId').val();
                            if (!/^[_a-zA-Z][_a-zA-Z0-9]+/.test(id)) {
                                $.tip({
                                    msg: 'id必须是字母或者下划线开头，且必须由字母，数字，或者下划线组成！', //
                                    type: 'danger', //success,danger,warning
                                    time: 5000 //
                                });
                                return;
                            }
                            page.name = name;
                            page.id = id;
                            $item.find('.page-content').html('\n                        <span class="page-name">' + name + '</span>\n                        ' + (!id ? '' : '<span class="page-id">ID: ' + id + '</span>') + '\n                        ');
                            $('#setPageName').html(name);
                            (0, _AppDataFun.AppDataChange)();
                        }
                    }
                }).show();
            });

            // 复制页面;
            $pagesList.off('click.copypage').on('click.copypage', '.copy-page', function (e) {
                e.stopPropagation();
                var $item = $(this).closest('.page-item');
                var index = $item.index();
                self.copyPage(index);
            });

            // 选择页面类型，切换，弹窗，浮动，页面
            $('#leftPagesList').on('changes', function (e, obj) {
                // 切换后，pageIndex 设置为 null,默认不选中，然后触发选中效果
                AppData.edit.pageIndex = null;
                AppData.edit.pageType = obj.dom.attr('data-name');

                // 如果是弹窗层，弹窗层显示
                if (AppData.edit.pageType === 'popups') {
                    $('#pageViewPopup').show();
                } else {
                    $('#pageViewPopup').hide();
                }

                // 如果是浮动层，全屏，就不能触发底层事件了
                if (AppData.edit.pageType === 'fixeds') {
                    $('#pageViewFixed').addClass('page-viewup-full');
                } else {
                    $('#pageViewFixed').removeClass('page-viewup-full');
                }

                // 切换后，设置默认选中
                var $active = (0, _AppDataFun.getPageListDom)().find('.active');
                if ($active[0]) {
                    $active.trigger('click');
                } else {
                    (0, _AppDataFun.getPageListDom)().find('.page-item').eq(0).trigger('click');
                }
            });
        }

        //初始化页面方法

    }, {
        key: 'initSetEvent',
        value: function initSetEvent() {
            var self = this;
            var $setAppBg = $('#setAppBg');

            // 图片剪切, 如果初始化图片没有，就不实例化图片剪切
            // 初始化图片剪切
            var $crop = (0, _imgTpl.initCrop)(this, $('#setAppBg').find('.set_img_crop'), { delBtn: true }, function (type, val) {
                // 剪切后，this.style 发生变化，重新渲染可视区域，  delete 里面做了处理了
                if (type === 'select') {
                    self.app.style['background-image'] = val;
                    $('#phoneApp').css('background-image', 'url(' + val + ')');
                }
                self.renderPhone();
            });

            // 初始化方法 slider
            initSlider();

            // 下拉
            initSelectOne();

            // 设置app 的事件绑定，主图上传，设置APP名称，设置APP信息 from '../templete/appsetTpl'
            (0, _appsetTpl.initAppset)();

            // 设置 背景
            (0, _bgTpl.initBg)(this, $setAppBg, function () {
                self.renderPhone();
            });

            // 设置 背景色
            (0, _bgColorTpl.initBgColor)(this, $setAppBg, function () {
                self.renderPhone();
            });
        }

        //设置phone区域的样式

    }, {
        key: 'renderPhone',
        value: function renderPhone() {

            //设置样式
            $('#phoneApp').setStyle({
                style: this.app.style
            });

            (0, _AppDataFun.AppDataChange)();
        }

        // 初始化选中的page, canRender 强制渲染，撤销用

    }, {
        key: 'newPage',
        value: function newPage(index, canRender) {

            //显示设置区域
            (0, _layerFun.layerShow)('#setPageBox');

            //如果选择同一个类型的同一个页面，不再重复渲染
            if (AppData.edit.pageIndex == index && !canRender) {
                return;
            }

            //设置当前选中 appData
            (0, _pageFun.setPage)(index, this);

            // console.log('app.js 183 => 设置当前选中的page', AppData.edit.pageIndex)
            var p = (0, _AppDataFun.getDataPage)(index);
            p['index'] = index;

            console.log('new page ----------------------', AppData.edit.pageType, p);

            if (AppData.edit.pageType === 'pages') {
                new _page2.default({
                    className: 'page',
                    page: p,
                    pagesList: 'pagesList'
                }).init();
            } else if (AppData.edit.pageType === 'popups') {
                new _popup2.default({
                    className: 'popup',
                    popup: p,
                    pagesList: 'popupsList'
                }).init();
            } else if (AppData.edit.pageType === 'fixeds') {
                new _fixed2.default({
                    className: 'fixed',
                    fixed: p,
                    pagesList: 'fixedsList'
                }).init();
            } else {
                // ...
            }
        }

        // 初始化 动画 模块 选项

    }, {
        key: 'newAnimate',
        value: function newAnimate() {
            var animate = new _animate2.default();
            animate.init();
        }

        // 添加功能layer模块

    }, {
        key: 'addLayerModule',
        value: function addLayerModule() {
            var $fastMenu = $('#fastMenu');
            $fastMenu.off('click.fun').on('click.fun', '.fun', function () {
                var fun = $(this).data('fun');
                $fastMenu.find('.fastlist').removeClass('show');
                $fastMenu.find('.more').removeClass('active');
                (0, _layerSwitch.addLayer)(fun);
            });
        }

        //删除页面

    }, {
        key: 'delPage',
        value: function delPage(index) {

            if (AppData.edit.pageType === 'fixeds') {
                $.tip({
                    msg: '浮动层不可删除',
                    type: 'danger',
                    time: 3000
                });
                return;
            }

            $.confirms({
                content: '是否要删除当前页面？',
                callback: function callback(mark) {
                    if (mark) {
                        // 清除DOM
                        (0, _AppDataFun.getPageListDom)().find('.page-item').eq(index).remove();

                        // 移除data page 数据
                        (0, _AppDataFun.removeDataPage)(index);

                        // 默认选择第一个
                        var $page = (0, _AppDataFun.getPageListDom)().find('.page-item').eq(0);
                        if ($page[0]) {
                            AppData.edit.pageIndex = null;
                            $page.trigger('click');
                        } else {
                            $('#layerlist').html('');
                            $('.appname').trigger('click');
                            (0, _AppDataFun.getViewDom)().html('');
                        }
                    }
                }
            }).show();
        }

        //新增页面, 这里目前只能新增页面，不能新增 popup ,fixed 后期加 ，在 tplSource.js 里面调用

    }, {
        key: 'addPage',
        value: function addPage(index, page) {

            if (AppData.edit.pageType === 'fixeds') {
                $.tip({
                    msg: '浮动层只能加一个',
                    type: 'danger',
                    time: 3000
                });
                return;
            }

            if (!page) {
                console.error('App.addPage 方法，必须传入 page 对象');
                return;
            }

            // 插入pages
            (0, _AppDataFun.addNewPageData)({
                index: index + 1,
                page: page || null
            });

            // 设置左侧的 page List
            this.setPageList();

            // 默认选择新增的那一个
            (0, _AppDataFun.getPageListDom)().find('.page-item').eq(index + 1).trigger('click');
        }

        //复制页面

    }, {
        key: 'copyPage',
        value: function copyPage(index) {

            if (AppData.edit.pageType === 'fixeds') {
                $.tip({
                    msg: '浮动层不可复制',
                    type: 'danger',
                    time: 3000
                });
                return;
            }

            // 复制pages
            (0, _AppDataFun.copyPageData)(index + 1);

            // 设置左侧的 page List
            this.setPageList();

            // 默认选择新增的那一个
            (0, _AppDataFun.getPageListDom)().find('.page-item').eq(index + 1).trigger('click');
        }

        // 发布预览

    }, {
        key: 'publish',
        value: function publish() {
            $('#appPublish').on('click', function () {
                // console.log(AppData.data);
                var load = $.loading({
                    tip: 'H5生成中，请耐心等待！'
                });
                (0, _saveApp.appToHTML)().then(function (res) {
                    load.close();
                });
            });
        }

        //初始化背景参数

    }, {
        key: 'init',
        value: function init() {

            this.newAnimate();
            this.initSet();
            this.initMp3();
            this.initLoad();
            this.initSetEvent();
            this.renderPhone();

            //设置page 列表
            this.setPagePopup();
            this.setPagePage();
            this.setPageFlex();
            this.eventFun();

            // 默认选中第一页, 这里new Layer 设置了 local
            $('#fixedsList').find('.page-item').eq(0).trigger('click');
            // $('#pagesList').find('.page-item').eq(0).trigger('click');
            $('#leftPagesList').find('[data-name="pages"]').trigger('click');

            this.addLayerModule(); // 添加layer模块

            // 快捷图标事件
            (0, _appFun.iniFastEvent)(this);

            // 发布
            this.publish();
            // 绑定发布弹窗的各种事件
            (0, _saveApp.eventAppViewShow)(this);

            AppData.edit.appClass = this;
        }
    }]);
    return App;
}();

exports.default = App;

/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appsetTpl = appsetTpl;
exports.initAppset = initAppset;

var _AppDataFun = __webpack_require__(1);

function appsetTpl(obj) {
    return '<div class="set-appinfo">\n\t\t\t\t<div class="tr">\n\t\t\t\t\t\u4E3B\u56FE: <a id="appSetUpload" class="mt-upload-btn"><img id="uploadMainImg" src="' + obj.img + '" width="100" height="100"/></a>\n\t\t\t\t</div>\n\t\t\t\t<div class="tr">\n\t\t\t\t\t\u6807\u9898: <input id="appSetName" type="text" class="mt-input" width="200" value="' + obj.name + '"/>\n\t\t\t\t</div>\n\t\t\t\t<div class="tr">\n\t\t\t\t\t\u63CF\u8FF0: <textarea id="appSetInfo" style="resize:none" type="text" class="mt-textarea">' + obj.info + '</textarea>\n\t\t\t\t</div>\n\t\t\t</div>';
}

// appset 的事件
function initAppset() {

    //设置名字
    $('#appSetName').on('input', function (e) {
        var val = $(this).val();
        var $setname = $('.a-setname');
        $setname.html(val);
        (0, _AppDataFun.setDataApp)({
            name: val
        });
    });

    //设置info
    $('#appSetInfo').on('input', function (e) {
        (0, _AppDataFun.setDataApp)({
            info: $(this).val()
        });
    });

    //图片上传 ..
    $('#appSetUpload').upload({
        auto: true,
        method: 'post',
        multi: false, //多文件上传
        fileName: 'file', //表单名字
        data: {}, //附带表单
        imgbox: '#uploadMainImg', //放图片的box
        url: '/api/upload', //上传
        uploadSuccess: function uploadSuccess(res) {
            //...
            (0, _AppDataFun.setDataApp)({
                img: res.data.url
            });
        },
        uploadError: function uploadError(res) {
            console.error('图片上传失败！', res);
        }
    });
}

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pageListTpl = pageListTpl;
exports.destoryControl = destoryControl;
exports.initPageListEvent = initPageListEvent;
/**
 * page 列表的模板
*/

function pageListTpl(obj, type) {
    return ' \n\t<li class="page-item" data-name="' + obj.name + '">\n\t\t<div class="page-content">\n            <span class="page-name">' + obj.name + '</span>\n            ' + (!obj.id ? '' : '<span class="page-id">ID: ' + obj.id + '</span>') + '\n\t\t</div>\n\t\t<div class="page-info">\n             <a class="important edit-page" data-title="\u7F16\u8F91\u9875\u9762\u4FE1\u606F"><i class="iconfont icon-bianji1"></i></a>\n             ' + (type !== 'fixed' ? '<a class="copy-page" data-title="\u590D\u5236\u9875\u9762"><i class="iconfont icon-fuzhi"></i></a>\n             <a class="del-page" data-title="\u5220\u9664\u9875\u9762"><i class="iconfont icon-icodel"></i></a>' : '') + '\n\t\t</div>\n\t</li>';
}

// 销毁 layer 控制器
function destoryControl() {
    //取消layer的选中状态
    var $control = $('#phoneApp').find('.mt-control');
    if ($control[0]) {
        $control.remove();
        $control = null;
    }
    AppData.edit.layerDom = null;
    AppData.edit.layerIndex = null;
    $('#layerlist').find('.active').removeClass('active');
}

// page 列表的事件
function initPageListEvent(self) {
    //选择page    , canRender 强行渲染
    $('#pagesList, #popupsList, #fixedsList').off('click').on('click', '.page-item', function (e, canRender) {
        e.stopPropagation();
        $(this).addClass('active').siblings('.page-item').not('.mt-uniq-clone').removeClass('active');
        var index = $(this).index();

        // 选择页面的时候，清除 AppData.edit.layerIndex 
        AppData.edit.layerIndex = null;

        // 销毁控制器
        destoryControl();

        // console.log(e.delegateTarget.id);

        var pageType = 'pages';
        if (e.delegateTarget.id === 'popupsList') {
            pageType = 'popups';
        } else if (e.delegateTarget.id === 'fixedsList') {
            pageType = 'fixeds';
        }
        AppData.edit.pageType = pageType;

        //new page
        self.newPage(index, canRender);
    });

    //排序回调
    $('#pagesList, #popupsList, #fixedsList').off('uniqend').on('uniqend', function (e, data) {
        //交换pages。需要重新排序 from 变成了 to， 但是 from - to 中间这段，都加了1
        var pages = self.app[AppData.edit.pageType];
        var fromData = pages[data.from];

        // 从下往上
        if (data.from > data.to) {
            for (var i = 0; i < data.from - data.to; i++) {
                var index = data.from - i;
                pages[index] = pages[index - 1];
                console.log('排序次数', index, index - 1);
            }
        } else {
            // 从上往下
            for (var _i = 0; _i < data.to - data.from; _i++) {
                var _index = data.from + _i;
                pages[_index] = pages[_index + 1];
                console.log('排序次数', _index, _index + 1);
            }
        }
        console.log('排序次数', data.from, data.to);
        pages[data.to] = fromData;

        //重新设置当前选中的下标
        var $this = $(this).find('.active');
    });
}

/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appSliderAnimateTpl = appSliderAnimateTpl;
exports.initAppSliderAnimate = initAppSliderAnimate;

var _AppDataFun = __webpack_require__(1);

function appSliderAnimateTpl(obj) {
    // console.log(obj)
    return '\n    <div class="tr">\u7FFB\u9875\u52A8\u753B:</div>\n    <div class="tr">\n        <div id="appPageSlider" class="mt-selectone" data-val="' + obj.playtype + '">\n            <a data-val="1" class="option">1</a>\n            <a data-val="2" class="option">2</a>\n            <a data-val="3" class="option">3</a>\n            <a data-val="4" class="option">4</a>\n            <a data-val="5" class="option">5</a>\n            <a data-val="6" class="option">6</a>\n        </div>\n    </div>';
}

// 初始化选择页面的事件
function initAppSliderAnimate(self) {
    //翻页样式
    $('#appPageSlider').on('change', function (e, data) {
        self.app.slider.animate = parseInt(data, 10);
        // console.log('appSliderAnimateTpl =>', AppData)
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPage = setPage;

var _AppDataFun = __webpack_require__(1);

/**
 * 设置 全局page 对象
 */
function setPage(index, self) {
    if (index !== null) {
        (0, _AppDataFun.setAppDataEdit)({
            pageIndex: index
        });
    }
}

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(60);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pageClass = __webpack_require__(245);

var _pageClass2 = _interopRequireDefault(_pageClass);

var _layerListTpl = __webpack_require__(285);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//layer list

/**
 * 页面
 */
var Page = function (_PageClass) {
    (0, _inherits3.default)(Page, _PageClass);

    function Page(props) {
        (0, _classCallCheck3.default)(this, Page);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this, props));

        _this.page = props.page; // 直接编辑当前page 对象 app里面的page ，不是new Page() 对象
        return _this;
    }

    //初始化方法


    (0, _createClass3.default)(Page, [{
        key: 'init',
        value: function init() {
            // ...
            this._init();
        }
    }]);
    return Page;
}(_pageClass2.default);

exports.default = Page;

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(60);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pageClass = __webpack_require__(245);

var _pageClass2 = _interopRequireDefault(_pageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 页面
 */
var Popup = function (_PageClass) {
    (0, _inherits3.default)(Popup, _PageClass);

    function Popup(props) {
        (0, _classCallCheck3.default)(this, Popup);
        return (0, _possibleConstructorReturn3.default)(this, (Popup.__proto__ || (0, _getPrototypeOf2.default)(Popup)).call(this, props));
    }

    //初始化方法


    (0, _createClass3.default)(Popup, [{
        key: 'init',
        value: function init() {
            console.log(this);
            // ...
            this._init();
        }
    }]);
    return Popup;
}(_pageClass2.default);

exports.default = Popup;

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(60);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(62);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pageClass = __webpack_require__(245);

var _pageClass2 = _interopRequireDefault(_pageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 页面
 */
var Fixed = function (_PageClass) {
    (0, _inherits3.default)(Fixed, _PageClass);

    function Fixed(props) {
        (0, _classCallCheck3.default)(this, Fixed);
        return (0, _possibleConstructorReturn3.default)(this, (Fixed.__proto__ || (0, _getPrototypeOf2.default)(Fixed)).call(this, props));
    }

    //初始化方法


    (0, _createClass3.default)(Fixed, [{
        key: 'init',
        value: function init() {
            console.log(this);
            // ...
            this._init();
        }
    }]);
    return Fixed;
}(_pageClass2.default);

exports.default = Fixed;

/***/ }),
/* 535 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(29);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(28);

var _createClass3 = _interopRequireDefault(_createClass2);

var _animateTpl = __webpack_require__(536);

var _animates = __webpack_require__(286);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 动画配置

// animation: name duration timing-function delay iteration-count direction fill-mode play-state;
var Animate = function () {
    function Animate() {
        // .....

        (0, _classCallCheck3.default)(this, Animate);
    }

    (0, _createClass3.default)(Animate, [{
        key: 'render',
        value: function render() {
            $('#animationIn').html((0, _animateTpl.animtesToHtml)(_animates.animatesIn));
            $('#animationOut').html((0, _animateTpl.animtesToHtml)(_animates.animatesOut));
            $('#animationEm').html((0, _animateTpl.animtesToHtml)(_animates.animatesEm));
        }

        //初始化方法

    }, {
        key: 'init',
        value: function init() {
            this.render();
        }
    }]);
    return Animate;
}(); //动画模版


exports.default = Animate;

/***/ }),
/* 536 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.animtesToHtml = animtesToHtml;

var _animates = __webpack_require__(286);

// 动画配置

function animtesToHtml(arr) {
    var sHtml = '';
    for (var i = 0; i < arr.length; i++) {
        var _arr$i = arr[i],
            animate = _arr$i.animate,
            name = _arr$i.name,
            type = _arr$i.type,
            time = _arr$i.time,
            delay = _arr$i.delay,
            count = _arr$i.count,
            fun = _arr$i.fun;

        sHtml += '<li data-animate="' + animate + '" data-name="' + name + '" data-type="' + type + '" data-time="' + time + '" data-delay="' + delay + '" data-count="' + count + '" data-fun="' + fun + '">' + name + '</li>';
    }
    return '<div class="animates">\n                <ul class="clearfix">' + sHtml + '</ul>\n            </div>';
}

/***/ }),
/* 537 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/null.png";

/***/ }),
/* 538 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/app.png";

/***/ }),
/* 539 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imgURLClear = imgURLClear;

var _indexedDB = __webpack_require__(75);

var _funs = __webpack_require__(100);

var _imgTpl = __webpack_require__(117);

//  图片方法

// @param obj：对应层的obj对象 type:object，imgCacheObj 所有的图片缓存 type:[]
// 清理 style.background 和 data.src
function clearStyleImg(obj, imgCacheObj) {

    // 过滤背景
    if (obj['style'] && obj.style['background-image']) {
        var url = obj.style['background-image'] || '';
        if (url.isBlob()) {
            var temp = url.split('#')[1];
            obj.style['background-image'] = (0, _imgTpl.base64ToUrl)(imgCacheObj[temp], temp);
        }
    }

    // 过滤 data
    if (obj['data'] && obj.data['src']) {
        var _url = obj.data['src'] || '';
        if (_url.isBlob()) {
            var _temp = _url.split('#')[1];
            obj.data['src'] = (0, _imgTpl.base64ToUrl)(imgCacheObj[_temp], _temp);
        }
    }
}

// @param APP_DATA : APP本地缓存数据， callback: 数据清洗后的回调函数
// 数据清洗
function imgURLClear(APP_DATA, callback) {

    // 从本地数据库去拿缓存图片
    (0, _indexedDB.openDB)().then(function (res) {

        if (!res) {
            return;
        }
        // 获取全部缓存图片
        (0, _indexedDB.getAllData)('img', function (arr) {
            if (arr.length > 0) {

                // 图片的缓存对象
                var imgCacheObj = (0, _funs.arrToObj)(arr);

                // 过滤 APP
                clearStyleImg(APP_DATA, imgCacheObj);
                for (var i = 0; i < APP_DATA.pages.length; i++) {
                    // 过滤 pages
                    clearStyleImg(APP_DATA[AppData.edit.pageType][i], imgCacheObj);
                    for (var j = 0; j < APP_DATA[AppData.edit.pageType][i].layers.length; j++) {
                        // 过滤 layers
                        clearStyleImg(APP_DATA[AppData.edit.pageType][i].layers[j], imgCacheObj);
                    }
                }

                // 释放引用内存
                imgCacheObj = null;

                callback();
            } else {
                // 无缓存图片
                callback();
            }
        });
    });
}

/***/ }),
/* 540 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mp3List = Mp3List;
exports.sysMp3 = sysMp3;

var _ajax = __webpack_require__(78);

var _imgSource = __webpack_require__(246);

// 我的图片
function Mp3List(p) {
    (0, _ajax.getMp3)({ pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            console.log('mp3=>', res);
            var str = '';
            for (var i = 0; i < res.data.length; i++) {
                str += '<li class="item" data-url="' + res.data[i].url + '">\n                            <span class="name"><span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ' + res.data[i].name + '</span>\n                            <span class="size">' + res.data[i].size + '</span>\n                            <span class="try">\u8BD5\u542C</span>\n                            <span class="use">\u4F7F\u7528</span>\n                        </li>';
            }
            $('#mp3list').empty().html(str);

            // 分页
            var $imgPagelist = $('#mp3pagelist');
            if (!$imgPagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                (0, _imgSource.newPage)(res.count, $imgPagelist, Mp3List);
            }
        } else {
            console.error('获取用户图片失败！');
        }
    });
}

// 我的图片
// ajax
function sysMp3() {
    Mp3List({
        pagesize: _imgSource.PAGE_SIZE,
        page: 1
    });
}

/***/ })
/******/ ]);