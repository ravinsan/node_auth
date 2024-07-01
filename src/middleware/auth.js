import jwt from 'jsonwebtoken';
process.loadEnvFile();
const secretKey = process.env.SECREST_KEY; 

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
const rmBearertoken = token.split(' ')[1];

  jwt.verify(rmBearertoken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;