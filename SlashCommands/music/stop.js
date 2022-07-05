const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
    description: "Stop the player",
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

        queue.destroy();
        const embed = new MessageEmbed()
                .setColor('#00FF11')
                .setTitle('MUSIC | STOP')
                .setDescription(`Stopped, bye 👋`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embed]
            });
    },
};