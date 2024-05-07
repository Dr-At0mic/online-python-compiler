import express from 'express';
import dotenv from 'dotenv';

import python from './routes/python.routes.js'
import cors from './commonUtils/cors.js';

dotenv.config();

const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(cors)

app.use(express.json());

app.listen(PORT, () => {
    console.log("server is running at port 3000");
});

app.use('/api/python',python);


// creating middleware

app.use((err, req , res , next) => {
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal server Error';
    return res.status(statusCode).json({
        success: false , 
        statusCode,
        message
    });
});