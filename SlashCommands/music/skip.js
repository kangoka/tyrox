const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skip the current song",
    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | SKIP')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }

        await queue.skip();

        const embedNoSong = new MessageEmbed()
                .setColor('#00FF11')
                .setTitle('MUSIC | SKIP')
                .setDescription(`Skipped the current song`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        return interaction.followUp({
            embeds: [embedNoSong]
        });
    },
};