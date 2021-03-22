import mongoose from "mongoose";

const connectionUrl = process.env.DATABASE_URL;
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

export default db;