const jwt = require('jsonwebtoken');


const verificationToken = (req,res,next) =>{
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
        if(token === null){
            res.status(401);
        }else{
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (error,decode)=>{
                if(error){
                    res.status(401).json({message:"login dulu dong"});
                }
                req.body.email = decode.email;
                next();
            });
        }
}

module.exports = verificationToken;