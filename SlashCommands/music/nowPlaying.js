const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "now-playing",
    description: "Shows information about the current song",
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

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return interaction.followUp({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress,
                        },
                    ],
                    color: '#0099FF',
                    footer: {
                        text: `Queued by ${queue.current.requestedBy.tag}`,
                    },
                },
            ],
        });
    },
};