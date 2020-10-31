const db = require('./models')
var crypto = require('crypto-js');
const Op = db.Sequelize.Op
const Post = db.Post
const User = db.User
const Tag = db.Tag
let password =  crypto.AES.encrypt("admin", 'alpha-wolf').toString();
const userTest = {
    username: "admin",
    phone: "01230123",
    email: "admin@gmail.com",
    avt	:'',
    password: password,
    permistion:'0'
}
const postTest = {
    idtag: 1,
    iduser: 1,
    title: "Some text title",
    content: "Some text Content",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fzingnews.vn%2Fnhung-hinh-anh-luu-giu-khoanh-khac-dang-nho-cua-doi-nguoi-post860196.html&psig=AOvVaw0O2FpsVXXWnDtjN6wPARzq&ust=1604064576620000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjlvqz02ewCFQAAAAAdAAAAABAD"
};
const tagTest = {
    idtag: null,
    nametag:"An toan bao mat thong tin"
};
async function main(){
    await User.create(userTest).then(()=>console.log("User insert success !")).catch((err)=>{console.log("User insert Error !"+err)})
    // await Tag.create(tagTest).then(()=>console.log("Tag insert success !")).catch((err)=>{console.log("Tag insert Error !"+err)})
    // await Post.create(postTest).then(()=>console.log("Post insert success !")).catch((err)=>{console.log("Post insert Error !"+err)})

    // await User.update({avt: 'aaaaaaaaaaaa'},{ where: { iduser : 1 } })
    // .then(()=>console.log("User update success !"))
    // .catch((err)=>{console.log("User update Error !"+err)});
}
main()