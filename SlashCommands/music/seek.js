const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "seek",
    description: "Skip to the given time",
    options: [
        {
            name: "time",
            description: "The time to seek (in seconds)",
            type: "INTEGER",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | SEEK')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }

        const time = interaction.options.getInteger("time") * 1000;
        await queue.seek(time);
        const embed = new MessageEmbed()
                .setColor('#00FF11')
                .setTitle('MUSIC | SEEK')
                .setDescription(`Skipped to ${time / 1000} seconds`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embed]
            });
    },
};