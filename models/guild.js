const mongoose = require ('mongoose');

const { DEFAULTSETTINGS: defaults } = require("../config");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: {
        "type": String,
        "default": defaults.prefix
    },
    currency: {
        "type": String,
        "default": defaults.currency
    },
    leaveMessage: {
        "type": String,
        "default": defaults.leaveMessage
    },
    welcome: {
        "type": String,
        "default": defaults.welcome
    },
    welcomeMessage: {
        "type": String,
        "default": defaults.welcomeMessage
    },
    welcomeChannel: {
        "type": String,
        "default": undefined
    },
    welcomeRole: {
        "type": Array,
        "default": [undefined]
    },
    messageReact: {
        "type": Map,
        "default": []
    },
    message: {
        "type": String,
        "default": undefined
    },
    channel: {
        "type": String,
        "default": undefined
    },
    ecoMin: {
        "type": Number,
        "default": defaults.ecoMin
    },
    ecoMax: {
        "type": Number,
        "default": defaults.ecoMax
    },
    workCooldown: {
        "type": Number,
        "default": defaults.workCooldown
    },
    welcomeCoins: {
        "type": Number,
        'default': defaults.welcomeCoins
    },
    ticketChannel: {
        "type": String,
        "default": undefined
    },
    ticketCategory: {
        "type": String,
        "default": undefined
    }
});

module.exports = mongoose.model("Guild", guildSchema);