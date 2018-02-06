const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true //Because this is the only login authentication it is required, but if using multiple sources this shouldn't be required.
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    }
});

//Create collection and add achema
mongoose.model('users', UserSchema);