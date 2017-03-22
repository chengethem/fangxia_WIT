const Router = require('koa-router');
const indexCtrl = require('../controllers/indexCtrl');
const projectsCtrl = require('../controllers/projectsCtrl');
const projectCtrl = require('../controllers/projectCtrl');
const founderCtrl = require('../controllers/founderCtrl');
const contactCtrl = require('../controllers/contactCtrl');
const conceptCtrl = require('../controllers/conceptCtrl');

const router = Router();

router.get('/', indexCtrl);
router.get('/projects', projectsCtrl);
router.get('/project/:id', projectCtrl);
router.get('/founder', founderCtrl);
router.get('/contact', contactCtrl);
router.get('/concept', conceptCtrl);

module.exports = router;
