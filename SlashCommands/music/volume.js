const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Change or check the volume of the player",
    options: [
        {
            name: "percentage",
            description: "percentage to change the volume to",
            type: "INTEGER",
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const volumePercentage = interaction.options.getInteger("percentage");
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | VOLUME')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }

        if (!volumePercentage) {
            const embedInfoVol = new MessageEmbed()
                .setColor('#0099FF')
                .setTitle('MUSIC | VOLUME')
                .setDescription(`The current volume is \`${queue.volume}%\``)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedInfoVol]
            });
        }

        if (volumePercentage < 0 || volumePercentage > 100) {
            const embedWrongVol = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | VOLUME')
                .setDescription("The volume must be betweeen 1 and 100")
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedWrongVol]
            });
        }

        queue.setVolume(volumePercentage);

        const embedSetVol = new MessageEmbed()
                .setColor('#00FF11')
                .setTitle('MUSIC | VOLUME')
                .setDescription(`Volume has been set to \`${volumePercentage}%\``)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        return interaction.followUp({
            embeds: [embedSetVol]
        });
    },
};