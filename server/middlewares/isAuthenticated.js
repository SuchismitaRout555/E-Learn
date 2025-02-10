import jwt  from "jsonwebtoken";
 
const isAuthenticated =  async (req, res) => {
    try{
 const token = req.cookies.token;
 if (!token) {
    return res.status(401).json({
         message: "Unauthenticated", 
         success: false });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
        return res.
    }
    } catch(error){
        console.log(error);
    }
};