import Router from 'koa-router';
import indexCtrl from '../controllers/indexCtrl';
import projectsCtrl from '../controllers/projectsCtrl';
import projectCtrl from '../controllers/projectCtrl';
import founderCtrl from '../controllers/founderCtrl';

const router = Router();

router.get('/', indexCtrl);
router.get('/projects', projectsCtrl);
router.get('/project/:id', projectCtrl);
router.get('/founder', founderCtrl);

export default router;
