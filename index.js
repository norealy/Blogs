const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
let session = require('express-session')
const Post = require('./controller/post.controller')
const Tag = require('./controller/tag.controller')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const accountRoute = require('./routes/account.route')
const { render } = require('pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'alphawolf',
	resave: true,
	saveUninitialized: false
  }));
app.use(express.static('./public'));
app.use('/users',userRoute)
app.use('/auth',authRoute)
app.use('/account',accountRoute)
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