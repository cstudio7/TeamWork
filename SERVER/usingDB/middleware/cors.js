
import express from 'express';
const app = express();


// cors middleware
const cor = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 'x-access-token',
    'Origin, X-Requested-With, Content-Type, Accept, token',
  );
  if (req.method === 'OPTIONS') {
    res.header('x-access-token', 'PATCH, PUT, GET, POST, DELETE');
    return res.status(200).json({});
  }


  next();
};

export default cor;
