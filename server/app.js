const express= require('express');
// const app=express();
const dotenv =require('dotenv');
const mongoDb=require('./config/database.js');
const cookieparser=require('cookie-parser');
const userRoute=require('./routes/userRoutes.js');
const meassageRoute=require('./routes/messageRoute.js');
const cors=require('cors');
const {app,server} =require('./soket/socket.js');
dotenv.config({});            //initilize dotenv

app.use(express.urlencoded({extended:true}));
app.use(express.json()); //json middleware
app.use(cookieparser());
const corsOptions = {
    origin: 'http://localhost:5173',
    // methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));
app.use('/user',userRoute); //use userRoute
app.use('/message',meassageRoute);

const PORT=process.env.PORT ||8080;
server.listen(process.env.PORT,()=>{
    mongoDb();
    console.log(`app running on ${PORT}`);
})