const jwt = require("jsonwebtoken");

async function verifyToken(req,res,next){
    try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];//&& because first it check truthy values (it shouldn't null , undefined,"",0 or false)
    if(!token)
        return res.status(401).json({message:"Token is missing -  please login "});
    const decoded = jwt.verify(token,process.env.JWT_SECRET); //not need for await because we have library to verify it is sync function
    req.user = decoded;
    next();
}
    catch(err)
    {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

}


module.exports = verifyToken //need to send middleware method .
