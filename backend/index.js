import express from 'express';
import mongoose from 'mongoose';
import dotenv  from 'dotenv';
import cors from 'cors';
import userRoutes from './locoroutes/routes.js'  


dotenv.config()  

const app = express(); 
const port = process.env.PORT || 6500;


app.use(express.json());
 
app.use(cors());

app.get('/user', (req,res)=>{
    res.send('Api Running in the data')
  })


app.use('/api', userRoutes)




app.listen(port, ()=>{
    console.log(`Server is runing ${port}`)
}) 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err)); 
