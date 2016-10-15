/**
 * Created by TOBI ALAGBE on 9/4/2016.
 */

module.exports = {

    db: process.env.MONGODB || process.env.MONGOHQ_URL,


};

// MONGODB=mongodb://localhost:27017/chatterbox
// meant to b in env for local dev