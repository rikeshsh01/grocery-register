var jwt = require('jsonwebtoken');
var privateKey = "MynameisRicky";

const fetchCustomer = (req,res,next)=>{
    // Get the customer from jwt token and id to req object 
    const token = req.header("auth-token");
    console.log(token, "This is token")
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,privateKey);
        console.log(data)

        // console.log(data.customer)
        // req.user = data.customer;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid tokennn"})
    }

}

module.exports = fetchCustomer;