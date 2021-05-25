import { Router } from 'express';
import * as AfiConttoller from '../controllers/afiController';

const router = Router();

router.route('/').get(AfiConttoller.example);
router.route('/countAfis').get(AfiConttoller.countAfis);
router.route('/afis').get(AfiConttoller.getAfis);
router.route('/afi/:id').get(AfiConttoller.getAfi)
router.route('/addAfi').post(AfiConttoller.addAfi);
router.route('/addAfis').post(AfiConttoller.addAfis);
router.route('/editAfi').put(AfiConttoller.editAfi);
router.route('/deleteAfi/:id').delete(AfiConttoller.deleteAfi);

export default router;