const Router = require('koa-router');
const indexCtrl = require('../controllers/indexCtrl');
const projectsCtrl = require('../controllers/projectsCtrl');
const projectCtrl = require('../controllers/projectCtrl');
const founderCtrl = require('../controllers/founderCtrl');
const contactCtrl = require('../controllers/contactCtrl');
const conceptCtrl = require('../controllers/conceptCtrl');
const dashboardCtrl = require('../controllers/dashboardCtrl');
const contentCtrl = require('../controllers/contentCtrl');
const updateContent = require('../controllers/updateContent');

const router = Router();

router.get('/', indexCtrl);
router.get('/projects', projectsCtrl);
router.get('/project/:id', projectCtrl);
router.get('/founder', founderCtrl);
router.get('/contact', contactCtrl);
router.get('/concept', conceptCtrl);
router.get('/dashboard/api/:contentType?', contentCtrl);
router.post('/dashboard/api/:contentType?', updateContent);
router.get(/^\/dashboard(?:\/|$)/, dashboardCtrl);


module.exports = router;
