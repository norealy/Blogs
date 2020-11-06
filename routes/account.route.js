const express = require('express')
const User = require('../controller/user.controller')
const Post = require('../controller/post.controller')
const multer  = require('multer')

const router = express.Router()

var upload = multer({ dest: './public/image/' })

router.get('/',(req,res)=>{
	return res.render('layout/profile')
})
router.get('/profile/:id',(req,res)=>{
	console.log("AVT : "+req.session.user.avt)
	return res.render('layout/profile',{user:req.session.user})
})

router.get('/profile',(req,res)=>{
	console.log("AVT : "+req.session.user.avt)
	return res.render('layout/profile',{user:req.session.user})
})
router.post('/profile',upload.single('image'),async(req,res)=>{
	console.log("iduser:"+req.session.user.iduser)
	let data = req.file.path.split('/').slice(1).join('/')
	req.body.image = '../'+data
	console.log("before:"+req.body.image)
	User.update(req,res)
	.then(()=>{
		let user = req.session.user
		user.avt = req.body.image
		return res.render('layout/profile',{user:user})
	})
	.catch((error)=>{
		return res.render('index',{user:req.session.user},{error:"Update avt fail"+error})
	});
});


router.get('/timeline',async (req,res)=>{
	// console.log(req.session.user.iduser)
	let posts = await Post.findAllByUser(req.session.user.iduser)
	return res.render('layout/timeline',{posts:posts,tags:req.session.tags,user:req.session.user})
})
router.post('/timeline',upload.single('image'),async(req,res)=>{
	if(req.body.title&&req.body.content){
		console.log("idtag:"+req.body.idtag)
		if(req.file)
			{
				let data = req.file.path.split('/').slice(1).join('/')
				req.body.image = "../"+data
				console.log("before:"+req.body.image)
			}
		await Post.create(req,res)
		.then(()=>{
			console.log("Create post success !")
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	return res.redirect('/account/timeline')
})

module.exports = router;