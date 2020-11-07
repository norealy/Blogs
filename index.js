require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const Post = require('./controller/post.controller')
const Tag = require('./controller/tag.controller')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const authCookie = require('./routes/auth.checkCookie')
const accountRoute = require('./routes/account.route')
const { render } = require('pug')
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: process.env.SESSION_SECRET||'alphawolf',
	resave: true,
	saveUninitialized: true,
	name:'session'
  }));

app.use(express.static('./public'));
app.set('view engine','pug')
app.set('views','./views')
app.set('trust proxy', 1)
app.use('/auth',authRoute)
app.use('/users',authCookie.checkCookie,userRoute)
app.use('/account',authCookie.checkCookie,accountRoute)

app.get('/',async(req,res)=>{
	req.session.tags = await Tag.findAll()
	if(req.session.user){
		return res.render('index',{tags:req.session.tags,user:req.session.user})
	}else
		return res.render('index',{tags:req.session.tags})
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

app.listen(port,()=>console.log(`Ok run ! Server port ${port}`))