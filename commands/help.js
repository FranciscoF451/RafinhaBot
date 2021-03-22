// at the top of your file
const Discord = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Menus para Bots')
	.setDescription('Eu aiiiio que isto não é um restaurante para pedir menu')
	.addFields(
		{ name: 'Montanha', value: 'Fala?', inline: true },
		{ name: 'Pergunta', value: 'És bot?', inline: true },
        { name: 'Rafa', value: 'É fiiiixe', inline: true },
		{ name: 'Musica', value: 'Vou cantar toda a noite.', inline: true },
		{ name: 'Stop', value: 'Não me calo.', inline: true },
		{ name: 'Skip', value: 'Próxima?', inline: true },
		{ name: 'Queue', value: 'É as músicas do show de hoje!!', inline: true },
	)


    module.exports = {
        name: 'help',
        description: 'help command',
        execute(message, args){
            message.channel.send(exampleEmbed);
        }
    }