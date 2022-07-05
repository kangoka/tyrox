const { QueryType } = require("discord-player");
const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "Play song from the title or Spotify playlist",
    options: [
        {
            name: "songtitle",
            description: "title of the song or Spotify playlist",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const songTitle = interaction.options.getString("songtitle");

        if (!interaction.member.voice.channel){
            const embedNoJoin = new MessageEmbed()
            .setColor('#FF0009')
            .setTitle('MUSIC | PLAY')
            .setDescription(`Maybe join a voice channel first?`)
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoJoin]
            });
        }
        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

        const embedPlay = new MessageEmbed()
            .setColor('#FF0009')
            .setTitle('MUSIC | PLAY')
            .setDescription(`Playing ${songTitle}`)
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        interaction.followUp({
            embeds: [embedPlay]
        });

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};