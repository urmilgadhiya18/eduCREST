import mongoose from "mongoose";

const connection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    }
    catch(error){
        console.log(error)
    }
}

export default connection;
