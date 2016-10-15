/**
 * Created by TOBI ALAGBE on 9/4/2016.
 */


var mongoose          = require('mongoose'),


    userSchema        =  mongoose.Schema({
        fullName:      { type: String },
        email:         { type: String, required: true, unique: true, lowercase: true },
        password:      { type: String, required: true },
        registered_on: { type: Date, default: Date.now }
    });



userSchema.methods.comparePassword = function(password, done) {
    if(password == this.password){
        done(false, true);
    }
};

module.exports = mongoose.model('User', userSchema, 'users');