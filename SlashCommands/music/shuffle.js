const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Shuffle song in the queue",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | SHUFFLE')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }

        queue.shuffle();
        const embedNoSong = new MessageEmbed()
            .setColor('#00FF11')
            .setTitle('MUSIC | SHUFFLE')
            .setDescription(`Queue has been shuffled`)
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        return interaction.followUp({
            embeds: [embedNoSong]
        });
    },
};