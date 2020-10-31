const db = require('../models')
const Tag = db.Tag
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    const tag = {
      idtag: 1,
      nametag:"Lap trinh"
   };
   Post.create(post)
      .then(() => {
          return "Success !"
      })
      .catch(err => {
          console.log(err)
          return "Fail !"
      });
  };

exports.findAll = async() => {
  let tags = await Tag.findAll({raw:true});
  return tags
};

exports.findOne = async(nametag) => {
  let tag = await Tag.findOne({where:{nametag:nametag}});
  return tag
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};