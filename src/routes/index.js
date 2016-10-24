import Router from 'koa-router';
import indexCtrl from '../controllers/indexCtrl';
import projectsCtrl from '../controllers/projectsCtrl';

const router = Router();

router.get('/', indexCtrl);
router.get('/projects', projectsCtrl);

export default router;
