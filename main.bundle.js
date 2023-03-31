/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function initShadowTester() {
  var wrapperDiv = document.querySelector('.wrapper');
  resetInputFields();
  addInputEvents();
  wrapperDiv.addEventListener('click', function (e) {
    switch (e.target.className) {
      case 'input-div__btn':
        handleClick(e.target);
        break;
      case 'wrapper__add-set' || 0:
        addNewInputSet(e);
        break;
      case 'checkbox-div__checkbox':
        handleInput(e.target);
        break;
      default:
        return;
    }
  });
  function handleClick(eTarget) {
    var nextSibling = eTarget.nextElementSibling;
    var prevSibling = eTarget.previousElementSibling;
    if (nextSibling && nextSibling.className === 'input-div__input') {
      nextSibling.value--;
      nextSibling.dispatchEvent(new Event('input'));
    }
    if (prevSibling && prevSibling.className === 'input-div__input') {
      prevSibling.value++;
      prevSibling.dispatchEvent(new Event('input'));
    }
  }
}
function addInputEvents() {
  var _selectElements = selectElements(),
    _selectElements2 = _slicedToArray(_selectElements, 4),
    inputFields = _selectElements2[1],
    colorRgba = _selectElements2[2],
    lastInputSet = _selectElements2[3];
  inputFields.forEach(function (item) {
    item.addEventListener('input', function (e) {
      handleInput(e.target);
    });
  });
  colorRgba.forEach(function (item) {
    item.addEventListener('input', function () {
      return handleColor(colorRgba, lastInputSet);
    });
  });
}
function selectElements() {
  var allInputSets = document.querySelectorAll('.input-wrapper');
  var lastInputSet = allInputSets[allInputSets.length - 1];
  var inputFields = lastInputSet.querySelectorAll('.input-div__input');
  var colorRgba = lastInputSet.querySelectorAll('.input-div__input-rgba');
  return [allInputSets, inputFields, colorRgba, lastInputSet];
}
function resetInputFields() {
  var _selectElements3 = selectElements(),
    _selectElements4 = _slicedToArray(_selectElements3, 4),
    inputFields = _selectElements4[1],
    colorRgba = _selectElements4[2],
    lastInputSet = _selectElements4[3];
  inputFields.forEach(function (item, index) {
    index !== inputFields.length - 1 ? item.value = '0' : item.value = '';
  });
  colorRgba.forEach(function (item) {
    return item.value = '';
  });
  lastInputSet.querySelector('.checkbox-div__checkbox').checked = false;
}
function addNewInputSet(e) {
  var newInputSet = document.querySelector('.input-wrapper').cloneNode(true);
  var newShadowBox = document.createElement("div");
  newShadowBox.classList.add('shadow-boxes__shadow-box');
  newShadowBox.classList.add('shadow-boxes__shadow-box_shadow-box-absolute');
  e.target.insertAdjacentElement('beforebegin', newInputSet);
  document.querySelector('.shadow-boxes__shadow-box').insertAdjacentElement('afterend', newShadowBox);
  var _selectElements5 = selectElements(),
    _selectElements6 = _slicedToArray(_selectElements5, 1),
    allInputSets = _selectElements6[0];
  allInputSets[allInputSets.length - 1].querySelector('.input-div__color').style.background = 'none';
  resetInputFields();
  addInputEvents();
}
function handleColor(colorRgba, lastInputSet) {
  var hexColor = lastInputSet.querySelector('.input-container:last-child .input-div__input');
  var hexArr = [];
  colorRgba.forEach(function (item, index) {
    var alphaChannel = item.value.slice(0, item.value.length - 1);
    var hexValue = rgbToHex(item, index, colorRgba, alphaChannel);
    if (index !== colorRgba.length - 1) {
      if (+item.value < 0 || +item.value > 255 || Number.isNaN(+item.value)) {
        item.value = '';
        hexColor.value = '';
        return;
      }
      if (+item.value >= 0 && +item.value <= 255) {
        hexValue.length === 1 ? hexArr.push('0' + hexValue) : hexArr.push(hexValue);
      }
    } else if (!item.value.includes('%')) {
      +item.value > 0 && +item.value <= 1 ? hexArr.push(hexValue) : null;
    }
    if (item.value.includes('%') && item.value.slice(item.value.length - 1) === '%') {
      +alphaChannel >= 0 && +alphaChannel <= 100 ? hexArr.push(hexValue) : null;
    }
  });
  hexColor.value = '#' + hexArr.join('');
  hexColor.dispatchEvent(new Event('input'));
}
function handleInput(eTarget) {
  var _selectElements7 = selectElements(),
    _selectElements8 = _slicedToArray(_selectElements7, 1),
    allInputSets = _selectElements8[0];
  var regExHex = new RegExp('^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$');
  var isInset = [];
  eTarget.classList.contains('input-div__input_hex-color') && regExHex.test(eTarget.value) ? eTarget.nextElementSibling.style.background = eTarget.value : null;
  allInputSets.forEach(function (set) {
    isInset.push(set.querySelector('.checkbox-div__checkbox').checked);
    var inputFields = set.querySelectorAll('.input-div__input');
    if (!eTarget.classList.contains('input-div__input_hex-color')) {
      Number.isNaN(+eTarget.value) ? eTarget.value = '0' : null;
    }
    regExHex.test(inputFields[4].value) || inputFields[4].value === '' ? drawShadow(allInputSets, isInset) : null;
  });
}
function rgbToHex(item, index, colorRgba, alphaChannel) {
  if (index !== colorRgba.length - 1) return Number(item.value).toString(16);
  if (+item.value >= 0 && +item.value <= 1) {
    return Math.round(Number(item.value) * 255).toString(16);
  }
  if (item.value.includes('%') && item.value.slice(item.value.length - 1) === '%') {
    return Math.round(Number(alphaChannel / 100) * 255).toString(16);
  }
}
function drawShadow(allInputSets, isInset) {
  var shadowBox = document.querySelectorAll('.shadow-boxes__shadow-box');
  var inset = '';
  allInputSets.forEach(function (item, index) {
    var inputValues = item.querySelectorAll('.input-div__input');
    isInset[index] ? inset = 'inset' : inset = '';
    if (inputValues[4].value === '') return;
    shadowBox[index].style.boxShadow = "".concat(inset, " ").concat(+inputValues[0].value, "px ").concat(+inputValues[1].value, "px \n            ").concat(+inputValues[2].value, "px ").concat(+inputValues[3].value, "px ").concat(inputValues[4].value);
  });
}
initShadowTester();
/******/ })()
;