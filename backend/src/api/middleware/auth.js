import jsonwebtoken from 'jsonwebtoken';


const authenticate =  (req,res,next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.sendStatus(401);
        return;
    }
   const parts = authHeader.split(" ")

const token = parts[1]
try {
    res.locals.user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    next()
}
catch (err){
    res.sendStatus(403);
}
}


const authorizeAdmin =  (req,res,next) => {

    if (res.locals.user.role === "admin"){
    next()
    return;
}

    res.sendStatus(403);
    return;
  
}

export {authenticate,authorizeAdmin}