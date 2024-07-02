import jwt from 'jsonwebtoken';
process.loadEnvFile();
const secretKey = process.env.SECREST_KEY; 

const verifyToken = (req, res, next) => {
  console.log(req);
 // const token = req.headers['authorization'];
  const token = req.cookies.token;
  //console.log("ff", req.cookies.token);
  if (!token) {
    return res.status(403).json({ message: 'Token is not authenticated' });
  }
//const rmBearertoken = token.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;