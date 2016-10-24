'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _indexCtrl = require('../controllers/indexCtrl');

var _indexCtrl2 = _interopRequireDefault(_indexCtrl);

var _projectsCtrl = require('../controllers/projectsCtrl');

var _projectsCtrl2 = _interopRequireDefault(_projectsCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

router.get('/', _indexCtrl2.default);
router.get('/projects', _projectsCtrl2.default);

exports.default = router;