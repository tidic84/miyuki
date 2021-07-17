const { MessageEmbed, MessageAttachment } = require('discord.js');
const { blue, green, yellow, red } = require(`../colors.json`);
const { Guild, Profile } = require("../models/modelsIndex") 
const fs = require('fs');
const mongoose = require("mongoose")

module.exports = async (client) => {

    client.errorMessage = async (message, errMessage, cmd) => {
        const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setImage('https://media.discordapp.net/attachments/855018848897466381/859479979641274398/oups.gif')
                    if(cmd){
                        embed.setDescription(`:x: ${errMessage}
                        Usage: \`${cmd.help.usage}\``)
                    } else {
                        embed.setDescription(`:x: ${errMessage}`)
                    }
            message.channel.send(embed);
    }

    client.upFirst = async a =>{
        //console.log(a[0].toUpperCase() + a.substring(1))
        return a[0].toUpperCase() + a.substring(1)
    }

    // client.loadMessagesReact = async () => {
    //     for (const server of Object.keys(client.guilds.map)) {
    //         var guild = client.guilds.cache.get(server)
    //         await console.log(guild)
    //         await console.log(server)

    //         const settings = await  client.getGuild(guild)
    //         await console.log(settings)
    //         for (const messages of Object.keys(settings.messageReact)){
    //             // guild.channels.cache.get(DB[guild.id]["channel"]).messages.fetch(DB[guild.id]["message"]);
    //             for (const channels of guild.channels){
    //                 guild.channels.cache.get(channels).messages.fetch(messages);
    //             }
    //         }
    //     }
    // }

    // Guild Functions

    client.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Nouveau Serveur --> ${g.guildName}`));
    }

    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id});
        if (data){
             return data;

        } else if (!data){
            const newGuild = {
                guildID: guild.id,
                guildName: guild.name
            };
            client.createGuild(newGuild);
    
            return client.getGuild2(guild);
        }
        
    }
    client.getGuild2 = async guild => {
        const data = await Guild.findOne({ guildID: guild.id});
        if (data){
             return data;
        } else {
            return client.getGuild(guild);;
        }
    }

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        console.log(settings);
        return data.updateOne(settings).catch(error => {
            console.log(error);
        })

    }

    // User Functions

    client.createProfile = async (member) => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member);
        const createProfile = await new Profile(merged);
        createProfile.save().then(m => console.log(`Nouveau Membre -->  ${m.userName}  <-- dans ${m.serverID}`));
    }

    client.getProfile = async (member, memberGuild) => {
        var data = "";

        if(memberGuild != undefined) data = await Profile.findOne({ userID: member.id, serverID: memberGuild});
        else data = await Profile.findOne({ userID: member.id, serverID: member.guild.id});
        

        if (data){
             return data;

        } else if (!data){
            if(memberGuild != undefined) {
            const newProfile = {
                userID: member.id,
                userName: member.username,
                serverID: memberGuild,
                coins: 100,
                bank: 0
            };
            await client.createProfile(newProfile);
    
            
            return await client.getProfile2(member, memberGuild);
            

            } else {
                const newProfile = {
                    userID: member.id,
                    userName: member.displayName,
                    serverID: member.guild.id,
                    coins: 100,
                    bank: 0
                };
                client.createProfile(newProfile);
        
                return client.getProfile2(member);

            }
        }    
        
    }

    client.getProfile2 = async (member, memberGuild) => {
        var data = "";
        if(memberGuild != undefined) data = await Profile.findOne({ userID: member.id, serverID: memberGuild});
        else data = await Profile.findOne({ userID: member.id, serverID: member.guild.id});
        
        if (data){
             return data;
        }
    }

    client.updateProfile = async (member, settings, memberGuild) => {
        let data = "";
        if (memberGuild != "undefined") data = await client.getProfile(member, memberGuild);
        else data = await client.getProfile(member);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        console.log(settings);
        return data.updateOne(settings).catch(error => {
            console.log(error);
        })

    }

    client.separator = (numb) => {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }

}