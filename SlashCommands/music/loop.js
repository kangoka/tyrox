const player = require("../../client/player");
const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Set a loop mode",
    options: [
        {
            name: "mode",
            description: "The time to seek (in seconds)",
            type: "INTEGER",
            required: true,
            choices: [
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF
                },
                {
                    name: 'Track',
                    value: QueueRepeatMode.TRACK
                },
                {
                    name: 'Queue',
                    value: QueueRepeatMode.QUEUE
                },
            ]
        },
    ],
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | STOP')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }

        const loopMode = interaction.options.getInteger("mode");
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
        const embed = new MessageEmbed()
            .setColor('#FF0009')
            .setTitle('MUSIC | LOOP')
            .setDescription(`Uh, sorry but something seems not working`)
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        
        if (!success) return interaction.followUp({ embeds: [embed] });
        switch (mode) {
            case '🔂':
                const embedOne = new MessageEmbed()
                    .setColor('#00FF11')
                    .setTitle('MUSIC | LOOP')
                    .setDescription(`Okay, loop for this track is enabled`)
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                interaction.followUp({
                    embeds: [embedOne]
                });
                break;
            case '🔁':
                const embedAll = new MessageEmbed()
                    .setColor('#00FF11')
                    .setTitle('MUSIC | LOOP')
                    .setDescription(`Okay, loop for this queue is enabled`)
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                interaction.followUp({
                    embeds: [embedAll]
                });
                break;
        
            default:
                const embedOff = new MessageEmbed()
                    .setColor('#00FF11')
                    .setTitle('MUSIC | LOOP')
                    .setDescription(`Okay, loop is disabled`)
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                interaction.followUp({
                    embeds: [embedOff]
                });
                break;
        }
    },
};