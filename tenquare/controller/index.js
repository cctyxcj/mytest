exports.showIndex = async (req,res,next)=>{
    res.render('index.html')
}

exports.showLogin = async (req,res,next)=>{
    res.render('login.html')
}