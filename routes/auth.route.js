const express = require('express');
const User = require('../controller/user.controller')
const router = express.Router()

router.get('/login',(req,res)=>{
	return res.render('layout/login')
})
router.get('/logout',(req,res)=>{
	res.clearCookie('userId',{ path: '/' });
	return res.render('layout/login')
})
router.post('/login',async (req,res)=>{
	if(req.body.username && req.body.password){
		const user = await User.findOne(req,res)
		req.session.user = user
		console.log(user.iduser)
		if(user===null){
			console.log("Username or password Wrong !")
			return res.render('layout/login',{error:"Username or password Wrong !"})
		}else{
			res.cookie('userId',user.iduser,{signed:true})
			console.log(req.signedCookies)
			return res.render('index',{user:user})
		}
	}else{
		console.log("Username or password null")
		return res.render('layout/login',{error:"Username or password null !"})
	}
})
router.get('/register',(req,res)=>{
	return res.render('layout/register')
})
router.post('/register',async(req,res)=>{
	if(req.body.username && req.body.password && req.body.email && req.body.phone){
		console.log("Username or password Ok")
		let user = await User.create(req,res)
		req.session.user = user
		res.cookie('userId',user.iduser,{signed:true})
		console.log(req.signedCookies)
		return res.redirect('/')
	}else{
		console.log("Username or password null")
		return res.render('layout/register')
	}
})


module.exports = router;
