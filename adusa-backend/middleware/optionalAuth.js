const jwt = require("jsonwebtoken");

function optionalAuth (req,res,next){
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token)
         return  next();
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded;
        next();
    }
    catch(err){
        return next(); //because if token is expired or invalid , we don't have to add req.user but we have to send this request forward
    }
}
module.exports = optionalAuth;