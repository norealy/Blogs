const db = require('../models')
const Post = db.Post
const Op = db.Sequelize.Op

exports.create = async(req, res) => {
    const post = {
      idtag: req.body.idtag,
      iduser: req.session.user.iduser,
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
   };
   return await Post.create(post)
  };

exports.findAll = async () => {
  let posts = await Post.findAll({raw:true});
  return posts
};
exports.findAllByUser = async (iduser) => {
  let posts = await Post.findAll({
    where: {
      iduser: `${iduser}`
    }
  });
  if (posts === null) {
    console.log('Not found!');
    return posts
  }else {
    return posts
  }
};
exports.findOne = async (req,res) => {
  const post = await Post.findOne({ where: { } });
  if (post === null) {
      console.log('Not found!');
  } else {
      console.log('Ok done findOne!');
  }
  return post
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};