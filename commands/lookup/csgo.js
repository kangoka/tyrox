const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js")
const axios = require('axios');
var request = require('request');
var cheerio = require('cheerio');

function getStatData(location, $) {
    var selector = $('.segment-stats .value').eq(location).text();
    var stat_array = $.parseHTML(selector);
    var stat = 0;

    if (stat_array == null || stat_array.lengh == 0) {
        return -1;
    } else {
        stat = stat_array[0].data;
    }

    return stat;
}
module.exports = {
    name: "csgo",
    aliases: [],
    description: "Get CS:GO player stats",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`Bad format! Example: \`${client.config.prefix}dota player okatampz\``)
        axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${client.config.steamwapi}&vanityurl=${args[0]}`).then(response => {
            data = response.data;
            let s64 = data.response.steamid;

            var UR_L = "https://tracker.gg/csgo/profile/steam/" + s64 + "/overview";

            if (!args[0]) {
                return message.channel.send("Please Enter a valid STEAMID64");
            }

            request(UR_L, function (err, resp, body) {
                $ = cheerio.load(body);

                var KD = getStatData(0, $);
                if (KD == -1) {
                    return message.channel.send("Invalid, make sure your profile is not private and you have entered a valid Steam vanity username!");
                }

                var KILLS = getStatData(1, $);
                var WIN_PERCENT = getStatData(2, $);
                var WIN = getStatData(6, $);
                var LOSE = getStatData(7, $);
                var MVP = getStatData(3, $);
                var HS = getStatData(4, $);
                var DEATHS = getStatData(5, $);
                var SCORE = getStatData(8, $);
                var MONEY = getStatData(9, $);
                var ACCURACY = getStatData(11, $);
                var BS = getStatData(12, $);
                var BD = getStatData(13, $);
                var HR = getStatData(14, $);
                
                var embed = new MessageEmbed()
                    .setTitle("***CSGO Stats***")
                    .setColor("#00FF11")
                    .addField("Current stats",
                        "Total KD: " + "__**" + KD.toString() + "**__" + "\n" +
                        "Total Win: " + "__**" + WIN.toString() + "**__" + "\n" +
                        "Total Lose: " + "__**" + LOSE.toString() + "**__" + "\n" +
                        "Total Win%: " + "__**" + WIN_PERCENT.toString() + "**__" + "\n" +
                        "Total MVPs: " + "__**" + MVP.toString() + "**__" + "\n" +
                        "Total Score: " + "__**" + SCORE.toString() + "**__" + "\n" +
                        "Total Kills: " + "__**" + KILLS.toString() + "**__" + "\n" +
                        "Total Deaths: " + "__**" + DEATHS.toString() + "**__" + "\n" +
                        "Total Bombs Set: " + "__**" + BS.toString() + "**__" + "\n" +
                        "Total Bombs Defused: " + "__**" + BD.toString() + "**__" + "\n" +
                        "Total Headshots: " + "__**" + HS.toString() + "**__" + "\n" +
                        "Total Money Earned: " + "__**" + MONEY.toString() + "**__" + "\n" +
                        "Shot Accuracy: " + "__**" + ACCURACY.toString() + "**__", true)
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

                message.channel.send({embeds: [embed]});
            })
        }).catch((e) => {
            message.reply("An error occured. If this error persist in the next calls, please report using `treport`.")
        });
    },
};