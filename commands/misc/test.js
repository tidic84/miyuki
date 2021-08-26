const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const fs = require("fs")
const DB = require("../../res/db.json")
let mysql = require('mysql');

module.exports.run = (client, message, args) => {

    str = args[0]
    
    console.log(str.substring(0, 1))

    // let connection = mysql.createConnection({
    //     host: 'sql301.epizy.com',
    //     user: 'epiz_29097817',
    //     password: 'xa32vc8b',
    //     database: 'epiz_29097817_discord_db	'
    // })
    // console.log(connection)

    //console.log(message.guild.emojis.cache.get(args[0]))
    //console.log(message.guild.emojis.cache.find(emoji => emoji.name === 'kallium'))

};

module.exports.help = {
    name: "test",
    description: "test",
    usage: "test",
    category: 'misc'
}