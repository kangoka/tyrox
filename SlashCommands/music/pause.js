const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    description: "Pause the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | NOW PLAYING')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }
        queue.setPaused(true);

        const embedNoSong = new MessageEmbed()
                .setColor('#0099FF')
                .setTitle('MUSIC | PAUSE')
                .setDescription(`Track paused`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        return interaction.followUp({
            embeds: [embedNoSong]
        });
    },
};