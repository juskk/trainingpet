const router = require('express').Router();
const UserController = require('../../controllers/user.controller')
const passport = require('passport');


const userController = new UserController()

router.route('/protected').post(passport.authenticate('jwt', {session: false}), userController.ProtectedRoute)
router.route('/login').post(userController.Login)
router.route('/signup').post(userController.Register)

module.exports = router