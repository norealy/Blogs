const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
let session = require('express-session')
const User = require('./controller/user.controller')
const Post = require('./controller/post.controller')
const Tag = require('./controller/tag.controller')
const { render } = require('pug')

var multer  = require('multer')
var upload = multer({ dest: './public/image/' })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'alphawolf',
	resave: true,
	saveUninitialized: false
  }));
app.use(express.static('./public'));
app.use(express.static('./public'));
app.set('view engine','pug')
app.set('views','./views')
app.set('trust proxy', 1)

app.get('/',async(req,res)=>{
	req.session.tags = await Tag.findAll()
	if(req.session.user){
		return res.render('index',{tags:req.session.tags,user:req.session.user})
	}else
		return res.render('index',{tags:req.session.tags})
})

app.get('/users',async(req,res) => {
	var users = await User.findAll();
	// console.log(typeof users)
	return res.render('layout/user',
		{
			users : users
		});
})

app.get('/users/search',async(req,res)=>{
	users = await User.findAll();
	var q = req.query.q

	var matchedUsers = users.filter(
		function(user){
			return user.username.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		}
	)
	console.log(req.query)
	return res.render('layout/user',{users : matchedUsers})
})
app.get('/posts',async(req,res)=>{
	let posts = await Post.findAll()
	return res.render('layout/posts',{posts:posts,tags:req.session.tags})
})
app.get('/about',(req,res)=>{
	return res.render('layout/about')
})
app.get('/contact',(req,res)=>{
	return res.render('layout/contact')
})
app.get('/auth/login',(req,res)=>{
	return res.render('layout/login')
})
app.post('/auth/login',async (req,res)=>{
	if(req.body.username && req.body.password){
		const user = await User.findOne(req,res)
		req.session.user = user
		if(user===null){
			console.log("Username or password Wrong !")
			return res.render('layout/login',{error:"Username or password Wrong !"})
		}else{
			return res.render('index',{user:user})
		}
	}else{
		console.log("Username or password null")
		return res.render('layout/login',{error:"Username or password null !"})
	}
})
app.get('/auth/register',(req,res)=>{
	return res.render('layout/register')
})
app.post('/auth/register',(req,res)=>{
	if(req.body.username && req.body.password && req.body.email && req.body.phone){
		console.log("Username or password Ok")
		User.create(req,res)
	}else{
		console.log("Username or password null")
		return res.render('layout/register')
	}
})

app.get('/account/profile',(req,res)=>{
	console.log("AVT : "+req.session.user.avt)
	return res.render('layout/profile',{user:req.session.user})
})
app.post('/account/profile',upload.single('image'),async(req,res)=>{
	console.log("iduser:"+req.session.user.iduser)
	let data = req.file.path.split('\\').slice(1).join('/')
	req.body.image = "../"+data
	// console.log("before:"+req.session.user.avt)
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


app.get('/account/timeline',async (req,res)=>{
	// console.log(req.session.user.iduser)
	let posts = await Post.findAllByUser(req.session.user.iduser)
	return res.render('layout/timeline',{posts:posts,tags:req.session.tags,user:req.session.user})
})
app.post('/account/timeline',upload.single('image'),async(req,res)=>{
	if(req.body.title&&req.body.content){
		console.log("idtag:"+req.body.idtag)
		if(req.file)
			{
				let data = req.file.path.split('\\').slice(1).join('/')
				req.body.image = "../"+data
				console.log("before:"+req.body.image)
			}
		await Post.create(req,res)
		.then(()=>{
			console.log("Creat post success !")
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	return res.redirect('/account/timeline')
})

app.listen(port,()=>console.log(`Ok run ! Server port ${port}`))