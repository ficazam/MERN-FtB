const express = require('express');
const denv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT:string = process.env.PORT || '8000';

//connect to the database:
connectDB(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req:any,res:any) => {
    res.status(200).json({ message: 'Welcome to our support desk API.' })
})

//Routes:
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, ():void => console.log(`server started on port ${PORT}`));
