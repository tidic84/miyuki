const { MessageEmbed } = require("discord.js");
const { blue, green, yellow, red, purple } = require('../colors.json')

module.exports = async (client, Discord) => {
    const { Player } = require("discord-music-player");
        const player = new Player(client, {
            leaveOnEmpty: false,
        });
        client.player = player;
        
        client.player
            .on('songFirst', (queue, song) => {
                embedSong = new MessageEmbed()
                    .setAuthor(`Lecture`)
                    .setTitle(`${song.name}`)
                    .setURL(`${song.url}`)
                    .setColor(`${green}`)
                    .setDescription(`:white_check_mark: Lecture de la vidéo`)
                    .setThumbnail(`${song.thumbnail}`)
                queue.data.message.channel.send({embeds: [embedSong]})
            })
            .on('songAdd', (queue, song) => {
                if(!queue.songs[1]) return
                embedSong = new MessageEmbed()
                    .setAuthor(`Ajout`)
                    .setTitle(`${song.name}`)
                    .setURL(`${song.url}`)
                    .setColor(`${green}`)
                    .setDescription(`:white_check_mark: Ajout de la vidéo`)
                    .setThumbnail(`${song.thumbnail}`)
                queue.data.message.channel.send({embeds: [embedSong]})
            })
            .on('error', (error, queue) => {
                console.log(`Error: ${error} in ${queue.guild.name}`);
            })

}