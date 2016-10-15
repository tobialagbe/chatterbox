/**
 * Created by TOBI ALAGBE on 9/4/2016.
 */

var mongoose          = require('mongoose'),


    dataSchema        =  mongoose.Schema({

        storyId:      { type: String },
        chatter:      [],
        registered_on: { type: Date, default: Date.now }

    });





module.exports = mongoose.model('Data', dataSchema, 'data');