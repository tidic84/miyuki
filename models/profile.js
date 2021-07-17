const mongoose = require ('mongoose');

const { DEFAULTSETTINGS: defaults } = require("../config");

const profileSchema = mongoose.Schema({
    userName: { type: String, require: true },
    userID: { type: String, require: true},
    serverID: { type: String, require: true },
    coins: { type: Number, default: 100 },
    bank: { type: Number }
    
});

module.exports = mongoose.model("Profile", profileSchema);