const Discord = require('discord.js');

const DisTube = require('distube')

const client = new Discord.Client();

const prefix = '?';

const fs = require('fs');

const channelIDs = ['812056557268238350', '812081224008335411'];

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Já estou ligado, tem calma');
});

client.on('guildMemberAdd', (guildMember) =>{

    channelIDs.forEach(id => {
        guildMember.guild.channels.cache.get(id).send(`Bem vindo meu grande tolo <@${guildMember.user.id}>`);
    });
});

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'montanha'){
        client.commands.get('montanha').execute(message, args);
    }else if(command === 'pergunta' || command === 'p'){
        client.commands.get('pergunta').execute(message, args);
    }else if(command === 'rafa'){
        client.commands.get('rafa').execute(message, args);
    }else if(command === 'help' || command === 'h'){
        client.commands.get('help').execute(message, args);
    }else if(command === 'musica' || command === 'mu'){
        client.distube.play(message, args.join(" "));
    }
    if (["repeat", "loop"].includes(command))
        client.distube.setRepeatMode(message, parseInt(args[0]));

    if (command === "stop" || command === 'st') {
        client.distube.stop(message);
        message.channel.send("Não quero T_T");
    }

    if (command === "skip" || command === 'sk')
        client.distube.skip(message);

    if (command === "queue" || command === 'q') {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
}});

client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}\n${status(queue)}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ));


client.login ('ODEyMDU1MDEwNjY1MTY4OTA3.YC7LKQ.BnJmbjluT-AFuscGT8RkrM-4KWI')