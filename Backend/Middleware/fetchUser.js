var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Developmentisagoodthing';

const fetchUser = (req,res,next) =>{
    //Get the user from the jwt token and it to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : 'Please authenticate using a valid token'});
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next(); //This function does that if the function is verified, then move to the next function
    }
    catch(error){
        res.status(401).send({error : 'Please authenticate using a valid token'});
    }
}

module.exports = fetchUser;
