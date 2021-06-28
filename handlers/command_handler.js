const { readdirSync } = require('fs');

module.exports = (client, Discord) => {
    const dir = "./commands/"  
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        for (const file of commands) {
            const commandFile = require(`${dir}/${dirs}/${file}`);
            client.commands.set(commandFile.help.name, commandFile);
            console.log(`Commande chargé --> ${commandFile.help.name}`)
        }
    })





    // for (const file of command_files) {
    //     const command = require(`../commands/${file}`);
    //     if(command.name){
    //         client.commands.set(command.name, command);
    //         console.log(`Commande -> ${command.name} chargé !`)
    //     } else {
    //         continue;
    //     }
    // }
}