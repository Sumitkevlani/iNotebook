import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

//Schema and Model
//schema is the blue print of the documents in the collection, whereas model is basically simply a construction manager that uses that blueprint to basically perform the CRUD operations over the database.
//schema is simply used to demonstrate what all fields will be there, all the validation rules and even an function can be there to have consistent data
//models basically use that schema and provide an interface to perform database queries like create, find, findOne, update, delete, etc.
const User = mongoose.model('user',UserSchema);

export default User;