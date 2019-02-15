"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var randomPick = exports.randomPick = function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

exports.default = randomPick;