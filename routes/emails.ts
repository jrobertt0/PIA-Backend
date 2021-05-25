import { Router } from 'express';
import * as EmailsController from '../controllers/emailsController';

const router = Router();

router.route('/').get(EmailsController.example);
router.route('/countEmails').get(EmailsController.countEmails);
router.route('/emails').get(EmailsController.getEmails);
router.route('/email/:id').get(EmailsController.getEmail)
router.route('/addEmail').post(EmailsController.addEmail);
router.route('/editEmail').put(EmailsController.editEmail);
router.route('/deleteEmail').delete(EmailsController.deleteEmail);

export default router;