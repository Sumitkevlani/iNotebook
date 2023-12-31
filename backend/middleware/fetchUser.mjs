import jwt from 'jsonwebtoken';

const JWT_SECRET = "thisisaninotebookapplicationwhichisthenotebookonthecloud";

function fetchUser(req,res,next){
    const authToken = req.header('auth-token');
    if(!authToken){
        res.status(401).json({message: "Please authenticate with a valid token"});
    }
    else{
        try {
            const data = jwt.verify(authToken,JWT_SECRET);
            req.id = data.id;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({message: "Please authenticate with a valid token"});
        }
    }
}

export default fetchUser;