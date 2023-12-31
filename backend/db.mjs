import mongoose from 'mongoose';
const mongoURI = "mongodb+srv://sumit_kevlani_30082004:Sumit@cluster0.27z7eah.mongodb.net/ecomm";
async function connectToDatabase(){
    try {
        const result = await mongoose.connect(mongoURI);
        console.log("Connected to database successfully");
    }     
    catch (error) {
        console.log(error);   
    }
}


export default connectToDatabase;