const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    description: "Resume the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | RESUME')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }

        queue.setPaused(false);

        const embed = new MessageEmbed()
                .setColor('#0099FF')
                .setTitle('MUSIC | RESUME')
                .setDescription(`Resumed the player`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embed]
            });
    },
};