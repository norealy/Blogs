const db = require('../models')
const User = db.User
const Op = db.Sequelize.Op
var crypto = require('crypto-js');
exports.create = (req, res) => {
	let password =  crypto.AES.encrypt(req.body.password, 'alpha-wolf').toString();
	console.log(password)
  	const user = {
		username: req.body.username,
		phone: req.body.phone,
		email: req.body.email,
		avt	:'',
	    password: password,
		permistion:'1'
	 };
	 User.create(user)
	    .then(() => {
			return res.render('index')
	    })
	    .catch(err => {
			console.log(err)
			return res.render('auth/register')
	    });
	};

exports.findAll = async () => {
	let users = await User.findAll({raw:true});
	return users
};

exports.findOne = async (req,res) => {
	const user = await User.findOne({ where: { username:req.body.username } }).then((user)=>{
		console.log()
		const bytes = crypto.AES.decrypt(user.password, 'alpha-wolf');
		const pass = bytes.toString(crypto.enc.Utf8);
		if(pass==req.body.password){
			return user
		}else{
			return null
		}
	});
	if (user === null) {
		console.log('Not found!');
	} else {
		console.log('Ok done findOne!');
	}
	return user
};

exports.update = async(req, res) => {
	const user = await User.update({avt: `${req.body.image}`},{ where: { iduser : req.session.user.iduser } })
	return user
};

exports.delete = async (id) => {
  await User.destroy({where:{iduser:id}}).then(()=>{return true}).catch((err)=>{return false})
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};