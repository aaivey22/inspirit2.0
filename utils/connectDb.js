import mongoose from 'mongoose';

const connection = {}

async function connectDb() {
    if (connection.isConnected) {
        // use existing database connection
        // console.log("using existing connection")
        return;
    }
    try{
    // use new database connection
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    // console.log("DB Connected")
    connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;