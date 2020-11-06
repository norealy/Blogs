const express = require('express');
const bodyParser = require('body-parser')
let session = require('express-session')
const User = require('../controller/user.controller')

let router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
	secret: 'alphawolf',
	resave: true,
	saveUninitialized: false
  }));
router.get('/',async(req,res) => {
	var users = await User.findAll();
	return res.render('layout/user',
		{
			users : users
		});
})
router.get('/delete/:username',async(req,res) => {
	await User.delete(req.params.username);
	return res.redirect('/users')
})
router.get('/search',async(req,res)=>{
    let users = await User.findAll();
	var q = req.query.q

	var matchedUsers = users.filter(
		function(user){
			return user.username.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		}
	)
	console.log(req.query)
	return res.render('layout/user',{users : matchedUsers})
})

module.exports = router;
