const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
    try{
        const docoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user=decoded

        return next()
    }catch(err){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
}

module.exports=auth;