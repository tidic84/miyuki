const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const fs = require("fs")
const DB = require("../../res/db.json")
module.exports.run = (client, message, args) => {
    client.saveDB(DB, message);
    if (!DB[message.guild.id]) {
        DB[message.guild.id] = {}
        //DB[message.guild.id] = {"Nom": message.guild.name}
    }
    DB[message.guild.id]["test"] = "test"
    DB[message.guild.id]["truc"] =  "truc"
    client.saveDB(DB, message);

    message.channel.send(DB[message.guild.id]["test"])
    message.channel.send(DB[message.guild.id]["truc"])
    
    // "855018846687330324": {
    //     "test": "test",
    //     "truc": "truc"
    // }

};

module.exports.help = {
    name: "test",
    description: "test",
    usage: "test",
    category: 'misc'
}