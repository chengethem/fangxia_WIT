import Router from 'koa-router';
import indexCtrl from '../controllers/indexCtrl';
import projectsCtrl from '../controllers/projectsCtrl';
import projectCtrl from '../controllers/projectCtrl';
import founderCtrl from '../controllers/founderCtrl';
import contactCtrl from '../controllers/contactCtrl';
import conceptCtrl from '../controllers/conceptCtrl';

const router = Router();

router.get('/', indexCtrl);
router.get('/projects', projectsCtrl);
router.get('/project/:id', projectCtrl);
router.get('/founder', founderCtrl);
router.get('/contact', contactCtrl);
router.get('/concept', conceptCtrl);

export default router;
