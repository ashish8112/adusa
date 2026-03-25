const jwt = require("jsonwebtoken");

async function verifyToken(req,res,next){
    try{
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(" ")[1];
    if(!token)
        return  res.status(401).json({message:"Enter Correct Token"});
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
}
catch(err)
{
    res.status(500).json({message:err.message});
}

}

module.exports= verifyToken;