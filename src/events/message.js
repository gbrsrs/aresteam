module.exports = async (client) => {

    let prefix = "-"

    client.on('message', async (message) => {

        if(message.author.bot) return;
        if(!message.guild) return;
        if(!message.content.startsWith(prefix)) return;
    
        if(!message.member) return;
        if (!message.member) message.member = await message.guild.fetchMember()
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase()
        const dev = process.env.TOKEN
    
        
        if(cmd.length === 0) return;
    
        
        var command = client.commands.get(cmd)
        
        if(!command) command = client.commands.get(client.aliases.get(cmd))

        if(command) command.run(client, message, args)

        if(!command) {

            var embed = {
                title: ':man_scientist: Comando inexistente!',
                description: 'Não encontramos esse comando em nosso banco de dados.',
                color: 'RED'
            }

            message.reply({ embed: embed })

        }

    })

}