const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const connect = require('./db/config');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});


app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 8000;
const Url = process.env.Mongo_Url;


const start = async()=>{
 try {
   const conn =await connect(Url);
    console.log(`database connected at `);//${conn.connection.host}
  app.listen(PORT,()=>{
    console.log(`server conected at http://localhost:${PORT}`);
   }) 
  
 } catch (error) {
     console.log(error);
 }
}

start();