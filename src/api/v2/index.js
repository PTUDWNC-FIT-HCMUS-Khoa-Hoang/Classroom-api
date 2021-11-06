import express from 'express';
import connectMongoDB from './database/mongoose';
import startMiddleware from './start/middleware';
import startRoutes from './start/routes';
import dotenv from 'dotenv';

// Environment variables
dotenv.config({ path: './src/api/v2/configs/.env' });

// Init Variables
const app = express();
const port = process.env.PORT || 5000;

//Database
connectMongoDB();

// Middlewares
startMiddleware(app);

// Routes
startRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
