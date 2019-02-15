'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listPictures = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXTENSION_REGEX = /\.(jpeg|jpg|png)$/;

var listPictures = exports.listPictures = function listPictures(folder) {
  var files = _fs2.default.readdirSync(folder);
  files = files.filter(function (file) {
    return EXTENSION_REGEX.test(file);
  });
  return files.map(function (file) {
    return _path2.default.join(folder, file);
  });
};