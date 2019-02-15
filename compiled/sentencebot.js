'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startBot = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mastodonApi = require('mastodon-api');

var _mastodonApi2 = _interopRequireDefault(_mastodonApi);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _settings = require('./settings');

var _sentencemodel = require('./sentencemodel');

var _picture = require('./picture');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendToot = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2, sentenceModel, pictures) {
    var accessToken = _ref2.accessToken,
        instanceUrl = _ref2.instanceUrl,
        tootOptions = _ref2.tootOptions;
    var instance, text, toot, picture, response, mediaId;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            instance = new _mastodonApi2.default({
              access_token: accessToken,
              api_url: instanceUrl
            });
            text = (0, _sentencemodel.generateSentence)(sentenceModel);
            toot = (0, _assign2.default)(tootOptions, {
              status: text
            });

            if (!(pictures != null)) {
              _context.next = 13;
              break;
            }

            picture = (0, _util.randomPick)(pictures);

            // upload the picture

            _context.next = 7;
            return instance.post('media', {
              file: _fs2.default.createReadStream(picture)
            });

          case 7:
            response = _context.sent;

            if (!(response.data == null || response.data.id == null)) {
              _context.next = 11;
              break;
            }

            console.warn('Error while uploading image', response.data || response, picture);
            return _context.abrupt('return');

          case 11:
            mediaId = response.data.id;

            toot.media_ids = [mediaId];

          case 13:
            return _context.abrupt('return', instance.post('statuses', toot));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendToot(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var startBot = exports.startBot = function startBot() {
  var settings = (0, _settings.getSettings)(__dirname + '/../settings.json');
  var sentenceModel = (0, _sentencemodel.loadModel)(__dirname + '/../' + settings.dataFile);

  var pictures = null;
  if (settings.illustrationFolder != null) {
    pictures = (0, _picture.listPictures)(__dirname + '/../' + settings.illustrationFolder);
  }

  sendToot(settings, sentenceModel, pictures).then(function (r) {
    return console.log('Published: ', r.data.content);
  }).catch(function (e) {
    return console.log('Error: ', e);
  });

  setInterval(function () {
    sendToot(settings, sentenceModel).then(function (r) {
      return console.log('Published: ', r.data.content);
    }).catch(function (e) {
      return console.log('Error: ', e);
    });
  }, settings.timeBetweenToots * 60000);
};

exports.default = startBot;