const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const { prefix } = require('../../json/config.json')
const axios = require('axios');

module.exports = {
    name: "apex",
    aliases: [],
    description: `Get Apex Legends player stats\nUsage: \`${prefix}apex <origin/xbl/psn> <identifier>\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0] || !args[1]) return message.reply(`Bad format! Example: \`${client.config.prefix}apex origin MKLWGaming\``)
        axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${args[0]}/${args[1]}`, {
            headers: {
                "TRN-Api-Key": client.config.trackgege
            }
        }).then(response => {
            apex = response.data;
            var arr = JSON.parse(JSON.stringify(apex))

            const embed = new MessageEmbed()
                .setColor('#0099FF')
                .setTitle('APEX PLAYER STATS')
                .setThumbnail(`https://trackercdn.com/cdn/apex.tracker.gg/legends/${arr.data.metadata.activeLegendName.toLowerCase()}-tile.png`)
                .addFields({
                    name: 'Platform',
                    value: arr.data.platformInfo.platformSlug || "Can't fetch the data"
                }, {
                    name: 'IGN',
                    value: arr.data.platformInfo.platformUserIdentifier || "Can't fetch the data"
                }, {
                    name: '\u200B',
                    value: '\u200B'
                }, {
                    name: 'Active Legend',
                    value: arr.data.metadata.activeLegendName || "Can't fetch the data"
                }, {
                    name: 'Level',
                    value: arr.data.segments[0].stats.level.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.level.percentile).toFixed(1).toString() + '%)' || "Can't fetch the data"
                }, {
                    name: 'Kills',
                    value: arr.data.segments[0].stats.kills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.kills.percentile).toFixed(1).toString() + '%)' || "Can't fetch the data"
                }, {
                    name: 'Damage',
                    value: arr.data.segments[0].stats.damage.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.damage.percentile).toFixed(1).toString() + '%)' || "Can't fetch the data"
                }, {
                    name: 'Headshots',
                    value: arr.data.segments[0].stats.headshots.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.headshots.percentile).toFixed(1).toString() + '%)' || "Can't fetch the data"
                }, {
                    name: 'Pistol Kills',
                    value: arr.data.segments[0].stats.pistolKills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.pistolKills.percentile).toFixed(1).toString() + '%)' || "Can't fetch the data"
                })
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            message.channel.send({embeds: [embed]});
        }).catch((e) => {
            // if (e.response.data.errors[0].code === "CollectorResultStatus::NotFound") {
            //     message.channel.send(e.response.data.errors[0].message + " `;help apex` to see how to use.")
            // }
            //else{
            console.log(e)
            // message.channel.send("An error occured. `;help apex` to see how to use.")
            //}
        });
    },
};