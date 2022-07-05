const {
    Message,
    Client,
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const { prefix } = require('../../json/config.json')
const axios = require('axios');
const Canvas = require('canvas');

module.exports = {
    name: "splitgate",
    aliases: ['sg'],
    description: `Get Splitgate player stats\nUsage: \`${prefix}splitgate <steam/xbl/psn> <identifier>\`. For Steam user, identifier can be found on example (marked with bold): steamcommunity.com/id/**okatampz**/\nAlias: \`sg\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0] || !args[1]) return message.reply(`Bad format! Example: \`${client.config.prefix}splitgate steam okatampz\``)

        axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${client.config.steamwapi}&vanityurl=${args[1]}`).then(response => {
            data = response.data;
            var s64 = data.response.steamid;

            axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${args[0]}/${s64}`, {
                headers: {
                    "TRN-Api-Key": client.config.trackgege
                }
            }).then(async response => {
                sg = response.data;
                var arr = JSON.parse(JSON.stringify(sg))
                const embed = new MessageEmbed()
                    .setColor('#eded50')
                    .setDescription(`Generating...`)
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                message.reply({
                    embeds: [embed]
                }).then(async m => {
                    let platform = arr.data.platformInfo.platformSlug + "\n"
                    let country = arr.data.userInfo.countryCode + '\n'
                    let level = arr.data.segments[0].stats.progressionLevel.percentile == null ? arr.data.segments[0].stats.progressionLevel.displayValue : arr.data.segments[0].stats.progressionLevel.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.progressionLevel.percentile).toFixed(1).toString() + '%)\n'
                    let exp = Object.keys(arr.data.segments[0].stats.rankLevel.metadata).length == 0 ? 'TBD' : arr.data.segments[0].stats.rankProgression.percentile == null ? arr.data.segments[0].stats.rankProgression.displayValue : arr.data.segments[0].stats.rankProgression.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.rankProgression.percentile).toFixed(1).toString() + '%)\n\n'
                    let kills = arr.data.segments[0].stats.kills.percentile == null ? arr.data.segments[0].stats.kills.displayValue : arr.data.segments[0].stats.kills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.kills.percentile).toFixed(1).toString() + '%)' + "\n"
                    let assists = arr.data.segments[0].stats.assists.percentile == null ? arr.data.segments[0].stats.assists.displayValue : arr.data.segments[0].stats.assists.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.assists.percentile).toFixed(1).toString() + '%)'
                    let deaths = arr.data.segments[0].stats.deaths.percentile == null ? arr.data.segments[0].stats.deaths.displayValue : arr.data.segments[0].stats.deaths.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.deaths.percentile).toFixed(1).toString() + '%)'
                    let suicides = arr.data.segments[0].stats.suicides.percentile == null ? arr.data.segments[0].stats.suicides.displayValue : arr.data.segments[0].stats.suicides.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.suicides.percentile).toFixed(1).toString() + '%)'
                    let teabags = arr.data.segments[0].stats.teabags.percentile == null ? arr.data.segments[0].stats.teabags.displayValue : arr.data.segments[0].stats.teabags.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.teabags.percentile).toFixed(1).toString() + '%)'
                    let ktp = arr.data.segments[0].stats.killsThruPortal.percentile == null ? arr.data.segments[0].stats.killsThruPortal.displayValue : arr.data.segments[0].stats.killsThruPortal.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.killsThruPortal.percentile).toFixed(1).toString() + '%)'
                    let dd = arr.data.segments[0].stats.damageDealt.percentile == null ? arr.data.segments[0].stats.damageDealt.displayValue : arr.data.segments[0].stats.damageDealt.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.damageDealt.percentile).toFixed(1).toString() + '%)'
                    let mp = arr.data.segments[0].stats.matchesPlayed.percentile == null ? arr.data.segments[0].stats.matchesPlayed.displayValue : arr.data.segments[0].stats.matchesPlayed.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.matchesPlayed.percentile).toFixed(1).toString() + '%)'
                    let wins = arr.data.segments[0].stats.wins.percentile == null ? arr.data.segments[0].stats.wins.displayValue : arr.data.segments[0].stats.wins.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.wins.percentile).toFixed(1).toString() + '%)'
                    let losses = arr.data.segments[0].stats.losses.percentile == null ? arr.data.segments[0].stats.losses.displayValue : arr.data.segments[0].stats.losses.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.losses.percentile).toFixed(1).toString() + '%)'
                    let hk = arr.data.segments[0].stats.headshotKills.percentile == null ? arr.data.segments[0].stats.headshotKills.displayValue : arr.data.segments[0].stats.headshotKills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.headshotKills.percentile).toFixed(1).toString() + '%)'
                    let sa = arr.data.segments[0].stats.shotsAccuracy.percentile == null ? arr.data.segments[0].stats.shotsAccuracy.displayValue : arr.data.segments[0].stats.shotsAccuracy.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.shotsAccuracy.percentile).toFixed(1).toString() + '%)'
                    let kd = arr.data.segments[0].stats.kd.percentile == null ? arr.data.segments[0].stats.kd.displayValue : arr.data.segments[0].stats.kd.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.kd.percentile).toFixed(1).toString() + '%)'
                    let kad = arr.data.segments[0].stats.kad.percentile == null ? arr.data.segments[0].stats.kad.displayValue : arr.data.segments[0].stats.kad.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.kad.percentile).toFixed(1).toString() + '%)'
                    let kpm = arr.data.segments[0].stats.killsPerMatch.percentile == null ? arr.data.segments[0].stats.killsPerMatch.displayValue : arr.data.segments[0].stats.killsPerMatch.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.killsPerMatch.percentile).toFixed(1).toString() + '%)'
                    let dk = arr.data.segments[0].stats.medalDoubleKills.percentile == null ? arr.data.segments[0].stats.medalDoubleKills.displayValue : arr.data.segments[0].stats.medalDoubleKills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.medalDoubleKills.percentile).toFixed(1).toString() + '%)'
                    let tk = arr.data.segments[0].stats.medalTripleKills.percentile == null ? arr.data.segments[0].stats.medalTripleKills.displayValue : arr.data.segments[0].stats.medalTripleKills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.medalTripleKills.percentile).toFixed(1).toString() + '%)'
                    let quadkill = arr.data.segments[0].stats.medalQuadKills.percentile == null ? arr.data.segments[0].stats.medalQuadKills.displayValue : arr.data.segments[0].stats.medalQuadKills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.medalQuadKills.percentile).toFixed(1).toString() + '%)'
                    let quintkill = arr.data.segments[0].stats.medalQuintKills.percentile == null ? arr.data.segments[0].stats.medalQuintKills.displayValue : arr.data.segments[0].stats.medalQuintKills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.medalQuintKills.percentile).toFixed(1).toString() + '%)'
                    let ks = arr.data.segments[0].stats.kingSlayers.percentile == null ? arr.data.segments[0].stats.kingSlayers.displayValue : arr.data.segments[0].stats.kingSlayers.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.kingSlayers.percentile).toFixed(1).toString() + '%)'
                    let hks = arr.data.segments[0].stats.highestConsecutiveKills.percentile == null ? arr.data.segments[0].stats.highestConsecutiveKills.displayValue : arr.data.segments[0].stats.highestConsecutiveKills.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.highestConsecutiveKills.percentile).toFixed(1).toString() + '%)'
                    let fb = arr.data.segments[0].stats.firstBloods.percentile == null ? arr.data.segments[0].stats.firstBloods.displayValue : arr.data.segments[0].stats.firstBloods.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.firstBloods.percentile).toFixed(1).toString() + '%)'
                    let dp = arr.data.segments[0].stats.distancePortaled.percentile == null ? arr.data.segments[0].stats.distancePortaled.displayValue : arr.data.segments[0].stats.distancePortaled.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.distancePortaled.percentile).toFixed(1).toString() + '%)'
                    let tp = arr.data.segments[0].stats.timePlayed.percentile == null ? arr.data.segments[0].stats.timePlayed.displayValue : arr.data.segments[0].stats.timePlayed.displayValue + ' (Top ' + (100 - arr.data.segments[0].stats.timePlayed.percentile).toFixed(1).toString() + '%)'
                    let mmr = arr.data.segments[0].stats.rankLevel.percentile == null ? (arr.data.segments[0].stats.rankLevel.value == null ? 'TBD' : arr.data.segments[0].stats.rankLevel.value).toString() : (arr.data.segments[0].stats.rankLevel.value).toString() + ' (Top ' + (100 - arr.data.segments[0].stats.rankLevel.percentile).toFixed(1).toString() + '%)'
                    let rank = Object.keys(arr.data.segments[0].stats.rankLevel.metadata).length == 0 ? 'TBD' : arr.data.segments[0].stats.rankLevel.metadata.rankName
                    let ign = arr.data.platformInfo.platformUserHandle

                    const canvas = Canvas.createCanvas(1920, 1080);
                    const context = canvas.getContext('2d');

                    const background = await Canvas.loadImage('https://i.imgur.com/dLBZiw6.png');
                    context.drawImage(background, 0, 0, canvas.width, canvas.height);

                    const grid3 = await Canvas.loadImage('https://pngimage.net/wp-content/uploads/2018/06/opacity-png.png');
                    context.drawImage(grid3, 0, 0, canvas.width, canvas.height);

                    context.strokeStyle = '#0099ff';
                    context.strokeRect(0, 0, canvas.width, canvas.height);

                    // Below rank

                    context.font = '37px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Platform\n' + platform, 70, 300);

                    context.font = '37px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Country\n' + country, 70, 420);

                    context.font = '37px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('IGN\n' + ign, 70, 550);

                    context.font = '37px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Level\n' + level, 70, 680);

                    context.font = '37px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Time Played\n' + tp, 70, 810);

                    // Beside rank

                    context.font = '30px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Rank\n' + rank, 230, 70);

                    context.font = '30px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('MMR\n' + mmr, 230, 170);

                    // Stats Grid 1

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Kills\n' + kills, 520, 90);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Assists\n' + assists, 520, 200);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Deaths\n' + deaths, 520, 310);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Suicides\n' + suicides, 520, 420);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Teabags\n' + teabags, 520, 530);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('K/D\n' + kd, 520, 640);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('KA/D\n' + kad, 520, 750);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Matches Played\n' + mp, 520, 860);

                    // Stats Grid 2

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Wins\n' + wins, 930, 90);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Losses\n' + losses, 930, 200);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Damage Dealt\n' + dd, 930, 310);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Kills Thru Portal\n' + ktp, 930, 420);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Headshot Kills\n' + hk, 930, 530);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Shots Accuracy\n' + sa, 930, 640);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Kills Per Match\n' + kpm, 930, 750);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Double Kills\n' + dk, 930, 860);

                    // Stats Grid 3

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Triple Kills\n' + tk, 1340, 90);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Quad Kills\n' + quadkill, 1340, 200);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Quint Kills\n' + quintkill, 1340, 310);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('King Slayers\n' + ks, 1340, 420);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Highest Consecutive Kills\n' + hks, 1340, 530);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('First Bloods\n' + fb, 1340, 640);

                    context.font = '33px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('Distance Portaled\n' + dp, 1340, 750);

                    // Footer
                    context.font = '18px "Revolution Gothic ExtraBold It"'
                    context.fillStyle = '#ffffff';
                    context.fillText('This stats generated by Tyrox Bot', 1450, 1000);

                    context.beginPath();
                    context.arc(125, 125, 100, 0, Math.PI * 2, true);
                    context.closePath();
                    context.clip();


                    const avatar = await Canvas.loadImage(Object.keys(arr.data.segments[0].stats.rankLevel.metadata).length == 0 ? arr.data.platformInfo.avatarUrl : arr.data.segments[0].stats.rankLevel.metadata.imageUrl);
                    context.drawImage(avatar, 25, 25, 200, 200);

                    const attachment = new MessageAttachment(canvas.toBuffer(), 'player-stats.jpg');

                    m.delete()
                    message.reply({
                        files: [attachment]
                    });

                })

                // const embed = new MessageEmbed()
                //     .setColor('#0099FF')
                //     .setTitle('Splitgate Player Stats')
                //     .setThumbnail(Object.keys(arr.data.segments[0].stats.rankLevel.metadata).length == 0 ? arr.data.platformInfo.avatarUrl : arr.data.segments[0].stats.rankLevel.metadata.imageUrl)
                //     .setDescription('**Platform:** ' + platform +
                //         '**Country:** ' + country +
                //         '**IGN:** ' + ign + '\n' +
                //         '**Level:** ' + level + '\n' +
                //         '**Rank:** ' + rank + '\n' +
                //         '**MMR:** ' + mmr + '\n' +
                //         '**MMR Progress:** ' + exp + '\n\n' +
                //         '**Kills:** ' + kills +
                //         '**Assists:** ' + assists + '\n' +
                //         '**Deaths:** ' + deaths + '\n' +
                //         '**Suicides:** ' + suicides + '\n' +
                //         '**Teabags:** ' + teabags + '\n' +
                //         '**K/D:** ' + kd + '\n' +
                //         '**KA/D:** ' + kad + '\n\n' +
                //         '**Matches Played:** ' + mp + '\n' +
                //         '**Wins:** ' + wins + '\n' +
                //         '**Losses:** ' + losses + '\n\n' +
                //         '**Damage Dealt:** ' + dd + '\n' +
                //         '**Kills Thru Portals:** ' + ktp + '\n' +
                //         '**Headshot Kills:** ' + hk + '\n' +
                //         '**Shots Accuracy:** ' + sa + '\n' +
                //         '**Kills Per Match:** ' + kpm + '\n' +
                //         '**Double Kills:** ' + dk + '\n' +
                //         '**Triple Kills:** ' + tk + '\n' +
                //         '**Quad Kills:** ' + quadkill + '\n' +
                //         '**Quint Kills:** ' + quintkill + '\n' +
                //         '**King Slayers:** ' + ks + '\n' +
                //         '**Highest Consecutive Kills:** ' + hks + '\n' +
                //         '**First Bloods:** ' + fb + '\n' +
                //         '**Distance Portaled:** ' + dp + '\n\n' +
                //         '**Time Played:** ' + tp
                //     )
                //     .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                // message.channel.send({
                //     embeds: [embed]
                // });
            }).catch((e) => {
				if (e.response.status == 404) return message.reply("Sorry, I think this profile doesn't exist")
                // if (e.response.data.errors[0].code === "CollectorResultStatus::NotFound") {
                //     message.channel.send(e.response.data.errors[0].message + " `;help apex` to see how to use.")
                // }
                //else{
                message.reply(`An error occured. If this error persist, please report using \`${client.config.prefix}report\`.`)
                // message.channel.send("An error occured. `;help apex` to see how to use.")
                //}
            });

        }).catch((e) => {
            message.reply(`An error occured. If this error persist, please report using \`${client.config.prefix}report\`.`)
        });
    },
};