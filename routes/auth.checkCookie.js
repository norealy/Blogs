module.exports.checkCookie = function(req,res,next){
    console.log(req.signedCookies.userId)
    // console.log(req.session.user.iduser)
    if(!req.signedCookies.userId){
        console.log("You must login ~!")
        res.redirect('/auth/login');
        return;
    }
    else{
        next();
    }
}