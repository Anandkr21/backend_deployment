const jwt =require('jsonwebtoken')

const authenticate=(req,res,next) =>{
    const token =req.headers.authorization
    if(token){
        jwt.verify(token,"anand", (err,decoded) =>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({'msg':'Please LogIn'})
            }
        })
    }else{
        res.send({'msg':'Please LogIn'})
    }
}

module.exports={
    authenticate
}