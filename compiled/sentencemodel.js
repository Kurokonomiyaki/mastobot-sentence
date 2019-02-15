'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSentence = exports.loadModel = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadModel = exports.loadModel = function loadModel(file) {
  var model = JSON.parse(_fs2.default.readFileSync(file).toString());
  return model;
};

var generateSentence = exports.generateSentence = function generateSentence(model) {
  var sentence = (0, _util.randomPick)(model.strings);
  return sentence.replace(/\${(.+?)}/, function (matched) {
    var variableName = matched.substring(2, matched.length - 1);
    var collection = model.collections[variableName];
    return (0, _util.randomPick)(collection);
  });
};