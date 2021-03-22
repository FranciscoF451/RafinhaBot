const Discord = require('discord.js');

const rafaImagem = ['https://i.imgur.com/eAZ0n49.jpg', 'https://imgur.com/edCEdbE.jpg', 'https://imgur.com/mu6GX3r.jpg', 'https://imgur.com/Y5Ff53K.jpg'];


module.exports = {
    name: 'rafa',
    description: 'rafa command',
    execute(message){       
        const images = rafaImagem[Math.floor(Math.random() * rafaImagem.length)];
        
        const image = new Discord.MessageEmbed()
        .setTitle('Chamaram-me?')
        .attachFiles(images)

        message.channel.send(image)
    }
}
