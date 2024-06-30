import mongoose from 'mongoose';

process.loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME     = process.env.DB_NAME;

const connectDB = async()=>{
    try{
          const connetionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
          console.log(`MongoDB Connected: ${connetionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("MongoDB connection failed", error);
        process.exit(1);
    }
}

export default connectDB;