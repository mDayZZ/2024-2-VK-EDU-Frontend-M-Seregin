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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js?!./styles/index.scss":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js??ref--7-2!./styles/index.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"../node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"html {\\n  box-sizing: border-box;\\n}\\n\\n*,\\n*::before,\\n*::after {\\n  box-sizing: inherit;\\n}\\n\\np {\\n  margin: 0;\\n}\\n\\n:root {\\n  --color-purple-dark: #423c56;\\n  --color-purple-light: #664867;\\n  --color-pink-dark: #996781;\\n  --color-pink-color: #dc92a6;\\n  --color-peach-color: #e8c0be;\\n  --transition-duration: 0.2s;\\n}\\n\\n.container {\\n  width: 100%;\\n  padding-inline: 20px;\\n}\\n\\nhtml {\\n  --theme-header-background: var(--color-purple-dark);\\n  --theme-header-color: #fff;\\n  --theme-body-background: var(--color-pink-color);\\n  --theme-body-color: #000;\\n  --theme-action-background: var(--color-purple-light);\\n  --theme-action-color: #fff;\\n}\\n\\nbody {\\n  margin: 0;\\n  background-color: #fff;\\n  color: #333;\\n  font-size: 15px;\\n  font-family: Helvetica, Arial, sans-serif;\\n  font-weight: 400;\\n  line-height: 20px;\\n  min-height: 100dvh;\\n  min-width: 100dvw;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-between;\\n  background-color: var(--theme-body-background);\\n}\\n\\nmain {\\n  display: flex;\\n  flex: 1;\\n  width: 100%;\\n  overflow-y: auto;\\n}\\n\\nfooter {\\n  margin: 0;\\n  padding: 0;\\n}\\n\\nform {\\n  margin: 0;\\n}\\n\\ninput {\\n  border: 0;\\n  outline: none;\\n  width: 100%;\\n  padding: 14px;\\n}\\n\\n.avatar {\\n  width: 48px;\\n  aspect-ratio: 1;\\n  object-fit: cover;\\n  object-position: center;\\n}\\n.avatar--rounded {\\n  border-radius: 50%;\\n}\\n\\n.iconButton {\\n  aspect-ratio: 1;\\n  background-color: transparent;\\n  border: none;\\n  border-radius: 50%;\\n  transition-duration: var(--transition-duration);\\n}\\n.iconButton:hover {\\n  background-color: rgba(255, 255, 255, 0.1);\\n}\\n.iconButton:active {\\n  background-color: rgba(0, 0, 0, 0.3);\\n  transition-duration: 0s;\\n}\\n\\n.textButton {\\n  padding-inline: 20px;\\n  border: none;\\n  color: var(--theme-action-color);\\n  background-color: var(--theme-action-background);\\n}\\n.textButton:hover {\\n  filter: brightness(1.1);\\n}\\n.textButton:active {\\n  transition-duration: 0s;\\n  filter: brightness(0.6);\\n}\\n\\n.header {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  padding: 20px;\\n  background-color: var(--theme-header-background);\\n  color: var(--theme-header-color);\\n}\\n.header__chatInfo {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.header__chatInfo-body {\\n  line-height: 1;\\n}\\n.header__chatInfo-title {\\n  font-size: 16px;\\n  font-weight: 700;\\n  margin: 0;\\n}\\n.header__chatInfo-status {\\n  font-size: 12px;\\n  margin: 0;\\n  margin-top: 5px;\\n}\\n.header__actionContainer {\\n  display: flex;\\n  flex-wrap: nowrap;\\n  flex: 0;\\n}\\n.header__actionButton {\\n  color: #fff;\\n}\\n\\n.chatContainer {\\n  display: flex;\\n  flex-direction: column;\\n  flex: 1;\\n  gap: 20px;\\n  padding-block: 10px;\\n  width: 100%;\\n}\\n\\n.message {\\n  display: inline-flex;\\n  align-items: flex-end;\\n  gap: 12px;\\n  max-width: 80%;\\n  margin-right: auto;\\n}\\n.message--self {\\n  margin-right: 0;\\n  margin-left: auto;\\n  flex-direction: row-reverse;\\n}\\n.message--self .message__block {\\n  border-radius: 10px 10px 0 10px;\\n}\\n@media (min-width: 768px) {\\n  .message--self .message__block {\\n    border-radius: 10px 10px 10px 0;\\n  }\\n}\\n@media (min-width: 768px) {\\n  .message--self {\\n    margin-right: auto;\\n    margin-left: 0;\\n    flex-direction: row;\\n  }\\n}\\n.message__block {\\n  padding-block: 10px;\\n  padding-inline: 20px;\\n  color: black;\\n  background-color: var(--color-peach-color);\\n  border-radius: 10px 10px 10px 0;\\n  word-break: break-word;\\n}\\n.message__username {\\n  color: #202020;\\n  font-size: 12px;\\n}\\n.message__text {\\n  margin-block: 4px;\\n}\\n.message__datetime {\\n  color: #393939;\\n  font-size: 12px;\\n  align-self: flex-end;\\n}\\n\\n.chatForm {\\n  display: flex;\\n  flex-wrap: nowrap;\\n  width: 100%;\\n  border: 1px solid rgba(25, 25, 25, 0.32);\\n}\\n.chatForm__input {\\n  font-size: 14px;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./styles/index.scss?../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js??ref--7-2");

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///../node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ \"./styles/index.scss\");\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/api */ \"./js/api.js\");\n/* harmony import */ var _js_utils_createElements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/utils/createElements */ \"./js/utils/createElements.js\");\n/* harmony import */ var _js_utils_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/utils/date */ \"./js/utils/date.js\");\n\n\n\n\nvar main = document.querySelector('main');\nvar form = document.querySelector('form');\nvar input = document.querySelector('.chatForm__input');\nvar chatContainer = document.querySelector('.chatContainer');\nvar chatTitle = document.getElementById('chatTitle');\nvar chatAvatar = document.getElementById('chatAvatar');\nvar chatStatus = document.getElementById('chatStatus');\nvar userInfo = JSON.parse(Object(_js_api__WEBPACK_IMPORTED_MODULE_1__[\"getUserById\"])(24));\nvar chatInfo = JSON.parse(Object(_js_api__WEBPACK_IMPORTED_MODULE_1__[\"getChatById\"])(1));\nvar updateMessages = function updateMessages() {\n  chatContainer.innerHTML = '';\n  chatInfo.messages.forEach(function (message) {\n    var senderInfo = JSON.parse(Object(_js_api__WEBPACK_IMPORTED_MODULE_1__[\"getUserById\"])(message.senderId));\n    var isSelf = senderInfo.id === userInfo.id;\n    var datetime = Object(_js_utils_date__WEBPACK_IMPORTED_MODULE_3__[\"getDatetime\"])(message.datetime);\n    chatContainer.insertAdjacentElement(\"beforeend\", Object(_js_utils_createElements__WEBPACK_IMPORTED_MODULE_2__[\"createMessageElement\"])(senderInfo, isSelf, message.messageText, datetime));\n  });\n  main.scrollTop = main.scrollHeight;\n  localStorage.setItem('messages', JSON.stringify(chatInfo.messages));\n};\nvar sendMessage = function sendMessage(message) {\n  var messageId = Math.floor(Math.random() * (100000 - 1)) + 1;\n  var datetime = new Date().toISOString();\n  var newMessage = {\n    id: messageId,\n    senderId: userInfo.id,\n    messageText: message,\n    datetime: datetime\n  };\n  chatInfo.messages.push(newMessage);\n  updateMessages();\n};\nvar updateChatInfo = function updateChatInfo() {\n  chatTitle.innerText = chatInfo.title;\n  chatAvatar.src = chatInfo.avatarUrl;\n  if (chatInfo.isPublic) {\n    chatStatus.innerText = \"\".concat(chatInfo.users.length, \" \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432\");\n  }\n};\ndocument.addEventListener('DOMContentLoaded', function () {\n  var messagesFromStorage = JSON.parse(localStorage.getItem('messages'));\n  if (messagesFromStorage) {\n    chatInfo.messages = messagesFromStorage;\n  }\n  updateChatInfo();\n  updateMessages();\n});\nform.addEventListener('submit', handleSubmit);\nfunction handleSubmit(event) {\n  event.preventDefault();\n  sendMessage(input.value);\n  input.value = '';\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./js/api.js":
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/*! exports provided: getUserById, getChatById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserById\", function() { return getUserById; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getChatById\", function() { return getChatById; });\nvar users = [{\n  id: '12',\n  avatarUrl: './images/chat_avatar.jpg',\n  username: 'Жанна Аркадьевна',\n  status: 'В сети'\n}, {\n  id: '24',\n  avatarUrl: './images/konst_avatar.jpeg',\n  username: 'Константин',\n  status: 'В сети'\n}, {\n  id: '26',\n  avatarUrl: './images/shat_avatar.jpg',\n  username: 'Максим Викторович',\n  status: '2023-04-21T18:25:43-05:00'\n}];\nvar chats = [{\n  id: '1',\n  title: 'Дом Шаталиных',\n  avatarUrl: '/images/chat_avatar.jpg',\n  users: [{\n    id: '12',\n    role: 'member'\n  }, {\n    id: '24',\n    role: 'member'\n  }, {\n    id: '26',\n    role: 'admin'\n  }],\n  messages: [{\n    id: '140',\n    senderId: '12',\n    messageText: 'Купи хлеба пж',\n    datetime: '2023-04-21T18:25:43-05:00'\n  }, {\n    id: '141',\n    senderId: '24',\n    messageText: 'Дорогая моя, я дворецкий, а не доставщик',\n    datetime: '2023-04-21T18:41:43-04:12'\n  }, {\n    id: '141',\n    senderId: '26',\n    messageText: 'Константин, в этом месяце работаете без зарплаты',\n    datetime: '2023-04-21T20:13:10-04:12'\n  }],\n  isPublic: true\n}];\nvar getUserById = function getUserById(id) {\n  return JSON.stringify(users.filter(function (user) {\n    return user.id === String(id);\n  })[0]);\n};\nvar getChatById = function getChatById(id) {\n  return JSON.stringify(chats.filter(function (chat) {\n    return chat.id === String(id);\n  })[0]);\n};\n\n//# sourceURL=webpack:///./js/api.js?");

/***/ }),

/***/ "./js/utils/createElements.js":
/*!************************************!*\
  !*** ./js/utils/createElements.js ***!
  \************************************/
/*! exports provided: createMessageElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMessageElement\", function() { return createMessageElement; });\nvar createMessageBlockElement = function createMessageBlockElement() {};\nvar createTextElement = function createTextElement(messageText) {\n  var textElement = document.createElement(\"p\");\n  textElement.classList.add('message__text');\n  textElement.innerText = messageText;\n  return textElement;\n};\nvar createDatetimeElement = function createDatetimeElement(datetime) {\n  var datetimeElement = document.createElement(\"p\");\n  datetimeElement.classList.add('message__datetime');\n  datetimeElement.innerText = datetime;\n  return datetimeElement;\n};\nvar createMessageElement = function createMessageElement(senderInfo, isSelf, messageText, datetime) {\n  var messageBlockElement = document.createElement('div');\n  messageBlockElement.classList.add('message__block');\n  messageBlockElement.insertAdjacentHTML(\"beforeend\", \"\\n            <p class=\\\"message__username\\\">\".concat(senderInfo.username, \"</p>\\n        \"));\n  messageBlockElement.insertAdjacentElement(\"beforeend\", createTextElement(messageText));\n  messageBlockElement.insertAdjacentElement(\"beforeend\", createDatetimeElement(datetime));\n  var messageElement = document.createElement(\"div\");\n  messageElement.classList.add('message');\n  if (isSelf) {\n    messageElement.classList.add('message--self');\n  }\n  messageElement.insertAdjacentHTML(\"beforeend\", \"<img src=\\\"\".concat(senderInfo.avatarUrl, \"\\\" alt=\\\"sender avatar\\\" class=\\\"message__avatar avatar avatar--rounded\\\">\"));\n  messageElement.insertAdjacentElement('beforeend', messageBlockElement);\n  return messageElement;\n};\n\n//# sourceURL=webpack:///./js/utils/createElements.js?");

/***/ }),

/***/ "./js/utils/date.js":
/*!**************************!*\
  !*** ./js/utils/date.js ***!
  \**************************/
/*! exports provided: getDatetime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDatetime\", function() { return getDatetime; });\nvar getDatetime = function getDatetime(datetime) {\n  var dateNow = new Date();\n  if (!datetime) {\n    return null;\n  }\n  var date = new Date(datetime);\n  var day = String(date.getDate()); // День\n  var month = date.toLocaleString('default', {\n    month: 'short'\n  });\n  var year = String(date.getFullYear());\n  var time = date.toLocaleTimeString([], {\n    hour: '2-digit',\n    minute: '2-digit'\n  });\n  if (dateNow.getFullYear() !== date.getFullYear()) {\n    return \"\".concat(day, \" \").concat(month, \" \").concat(year, \" \").concat(time);\n  }\n  var formattedDate = [];\n  formattedDate.push(time);\n  if (dateNow.getDate() !== date.getDate() || dateNow.getMonth() !== date.getMonth()) {\n    formattedDate.unshift(month);\n    formattedDate.unshift(day);\n  }\n  return formattedDate.join(' ');\n};\n\n//# sourceURL=webpack:///./js/utils/date.js?");

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js??ref--7-2!./index.scss */ \"../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js?!./styles/index.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./styles/index.scss?");

/***/ })

/******/ });