const mongoose = require("mongoose");

function connectDB() {
    const url =
        "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.0ozt3va.mongodb.net/deja";

    try {
        mongoose.connect(url);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    const dbConnection = mongoose.connection;

    dbConnection.once("open", () => {
        console.log(`Database connected`);
    });

    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });

    return dbConnection;
}

const db = connectDB();

exports.db = db;