// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var chatSchema = mongoose.Schema({
    user     : String,
    message  : String,
    added_date: {
        type: Date, default: Date.now
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Chat', chatSchema);

