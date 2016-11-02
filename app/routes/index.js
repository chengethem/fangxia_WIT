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

var _projectCtrl = require('../controllers/projectCtrl');

var _projectCtrl2 = _interopRequireDefault(_projectCtrl);

var _founderCtrl = require('../controllers/founderCtrl');

var _founderCtrl2 = _interopRequireDefault(_founderCtrl);

var _contactCtrl = require('../controllers/contactCtrl');

var _contactCtrl2 = _interopRequireDefault(_contactCtrl);

var _conceptCtrl = require('../controllers/conceptCtrl');

var _conceptCtrl2 = _interopRequireDefault(_conceptCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

router.get('/', _indexCtrl2.default);
router.get('/projects', _projectsCtrl2.default);
router.get('/project/:id', _projectCtrl2.default);
router.get('/founder', _founderCtrl2.default);
router.get('/contact', _contactCtrl2.default);
router.get('/concept', _conceptCtrl2.default);

exports.default = router;