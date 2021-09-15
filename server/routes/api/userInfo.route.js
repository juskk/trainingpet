const router = require('express').Router();
const UserInfoController = require('../../controllers/userInfo.controller')

const userInfoController = new UserInfoController()

router.route('/getInfo/:userId').get(userInfoController.getInfo)
router.route('/setInfo').post(userInfoController.setInfo)
router.route('/updateInfo/:id').post(userInfoController.updateInfo)

module.exports = router