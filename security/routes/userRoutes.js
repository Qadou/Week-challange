const express = require('express')
const router = express.Router();
const {home,addUser,searchById, getAllusersController,setsession} = require('../controllers/userController');
const session = require('express-session');
const {login,ensureToken,protected} = require('../controllers/authentification');


router.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true } // Secure: HttpOnly and Secure flags set
}));

router.get('/set-session',setsession );
router.use(express.json());

router.get('/',ensureToken,home);
router.get('/display',ensureToken, getAllusersController);
router.post('/add',ensureToken,addUser);
router.get('/search/:id',ensureToken,searchById);
router.post('/login',login);
router.get('/protected',ensureToken,protected);



module.exports = router