import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

import mongoose from "mongoose";

const connectionUrl = 'mongodb://mongodb:27017/marvel';
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// export default db;

app.listen(3000, '0.0.0.0', () => console.log("Server is running"));