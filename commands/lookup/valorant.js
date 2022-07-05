const {
    Message,
    Client,
    MessageEmbed,
    MessageAttachment
} = require("discord.js")
const { prefix } = require('../../json/config.json')
var request = require('request');
var cheerio = require('cheerio');
const Canvas = require('canvas');

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
    name: "valorant",
    aliases: ['val'],
    description: `Get Valorant player stats\nUsage: \`${prefix}valorant <username> <hashtag>\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0] || !args[1]) return message.reply("Bad format! Example: `tvalorant VTRLyz KNTL`")
        let UR_L = "https://tracker.gg/valorant/profile/riot/" + args[0] + "%23" + args[1] + "/overview";

        request(UR_L, function (err, resp, body) {
            $ = cheerio.load(body);

            let KD = getStatData(0, $);
            if (KD == -1) {
                return message.reply("Invalid, make sure your profile is not private (on website tracker.gg) and you have entered a valid account");
            }

            const embed = new MessageEmbed()
                .setColor('#eded50')
                .setDescription(`Generating...`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            message.reply({
                embeds: [embed]
            }).then(async m => {
                let rankImage = $('#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.site-container.trn-grid.trn-grid--vertical.trn-grid--small > div.trn-grid.container > div.segment-stats.area-main-stats.card.bordered.header-bordered.responsive > div.highlighted.highlighted--giants > div.highlighted__content > div > div.valorant-highlighted-content__stats > img')[0].attribs['src']
                let topAgent = $('#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.site-container.trn-grid.trn-grid--vertical.trn-grid--small > div.trn-grid.container > div.top-agents.area-top-agents > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > img')[0].attribs['src']
                let bg = 'https://i.imgur.com/6U1S7ZY.png'

                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png') bg = 'https://i.imgur.com/6D0oOQJ.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png') bg = 'https://i.imgur.com/gSgli3X.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png') bg = 'https://i.imgur.com/exObDeg.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png') bg = 'https://i.imgur.com/WQkvCdT.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png') bg = 'https://i.imgur.com/WJWW49x.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png') bg = 'https://i.imgur.com/LBvJ36a.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png') bg = 'https://i.imgur.com/li6QPsN.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png') bg = 'https://i.imgur.com/QxVQ656.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png') bg = 'https://i.imgur.com/Tde2P9v.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png') bg = 'https://i.imgur.com/4airQRL.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png') bg = 'https://i.imgur.com/bHRjwAG.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png') bg = 'https://i.imgur.com/dRqjtqR.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png') bg = 'https://i.imgur.com/nhQeuep.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png') bg = 'https://i.imgur.com/aNlZVwp.png' 
                if (topAgent == 'https://titles.trackercdn.com/valorant-api/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png') bg = 'https://i.imgur.com/ok7mwFR.png' 

                let DPR = getStatData(0, $);
                let KDR = getStatData(1, $);
                let HS_PERCENT = getStatData(2, $);
                let WIN_PERCENT = getStatData(3, $);
                let WIN = getStatData(4, $);
                let KILLS = getStatData(5, $);
                let HS = getStatData(6, $);
                let DEATHS = getStatData(7, $);
                let ASSISTS = getStatData(8, $);
                let SPR = getStatData(9, $);
                let KPR = getStatData(10, $);
                let FB = getStatData(11, $);
                let ACES = getStatData(12, $);
                let CLUTCHES = getStatData(13, $);
                let MK = getStatData(15, $);

                const canvas = Canvas.createCanvas(1920, 1080);
                const context = canvas.getContext('2d');

                /*Assets
                
                Killjoy: https://i.imgur.com/6U1S7ZY.png
                Sage: https://i.imgur.com/bHRjwAG.png
                Breach: https://i.imgur.com/gSgli3X.png
                Phoenix: https://i.imgur.com/QxVQ656.png
                Jett: https://i.imgur.com/WJWW49x.png
                Cypher: https://i.imgur.com/WQkvCdT.png
                Reyna: https://i.imgur.com/4airQRL.png
                Omen: https://i.imgur.com/li6QPsN.png
                Sova: https://i.imgur.com/nhQeuep.png
                Kay/o: https://i.imgur.com/LBvJ36a.png
                Astra: https://i.imgur.com/6D0oOQJ.png
                Brimstone: https://i.imgur.com/exObDeg.png
                Raze: https://i.imgur.com/Tde2P9v.png
                Skye: https://i.imgur.com/dRqjtqR.png
                Viper: https://i.imgur.com/aNlZVwp.png
                Yoru: https://i.imgur.com/ok7mwFR.png

                */
                const background = await Canvas.loadImage(bg);
                context.drawImage(background, 0, 0, canvas.width, canvas.height);

                const grid3 = await Canvas.loadImage('https://pngimage.net/wp-content/uploads/2018/06/opacity-png.png');
                context.drawImage(grid3, 0, 0, canvas.width, canvas.height);

                context.strokeStyle = '#0099ff';
                context.strokeRect(0, 0, canvas.width, canvas.height);

                // Below rank

                context.font = '37px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Identifier\n' + args[0] + '#' + args[1], 70, 300);

                // Beside rank

                // context.font = '30px "Revolution Gothic ExtraBold It"'
                // context.fillStyle = '#ffffff';
                // context.fillText('Rank\n' + rank, 230, 70);

                // Stats Grid 1

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Kills\n' + KILLS, 520, 200);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Deaths\n' + DEATHS, 520, 310);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Assists\n' + ASSISTS, 520, 420);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Headshots\n' + HS, 520, 530);

                // Stats Grid 2

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Wins\n' + WIN, 930, 200);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('First Bloods\n' + FB, 930, 310);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Aces\n' + ACES, 930, 420);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Clutches\n' + CLUTCHES, 930, 530);

                // Stats Grid 3

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('K/D Ratio\n' + KDR, 1340, 200);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('HS%\n' + HS_PERCENT, 1340, 310);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Win%\n' + WIN_PERCENT, 1340, 420);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Kills/Round\n' + KPR, 1340, 530);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Score/Round\n' + SPR, 1340, 640);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Damage/Round\n' + DPR, 1340, 750);

                context.font = '40px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Most Kill (Match)\n' + MK, 1340, 860);

                // Note
                context.font = '50px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('Displaying Current Episode and Act\n', canvas.width / 2 - 200, 100);

                // Footer
                context.font = '18px "Revolution Gothic ExtraBold It"'
                context.fillStyle = '#ffffff';
                context.fillText('This stats generated by Tyrox Bot', 1450, 1000);

                context.beginPath();
                context.arc(125, 125, 100, 0, Math.PI * 2, true);
                context.closePath();
                context.clip();


                const avatar = await Canvas.loadImage(rankImage);
                context.drawImage(avatar, 25, 25, 200, 200);

                const attachment = new MessageAttachment(canvas.toBuffer(), 'player-stats.jpg');

                m.delete()
                message.reply({
                    files: [attachment]
                });
            })


            // let embed = new MessageEmbed()
            //     .setTitle("**Valorant " + args[0] + "#" + args[1] + " Stats**")
            //     .setColor("#00FF11")
            //     .setThumbnail(rankImage)
            //     .addField("Current stats",
            //         "Damage/Round: " + "**" + DPR.toString() + "**" + "\n" +
            //         "K/D Ratio: " + "**" + KDR.toString() + "**" + "\n" +
            //         "HS%: " + "**" + HS_PERCENT.toString() + "**" + "\n" +
            //         "Win%: " + "**" + WIN_PERCENT.toString() + "**" + "\n" +
            //         "Wins: " + "**" + WIN.toString() + "**" + "\n" +
            //         "Kills: " + "**" + KILLS.toString() + "**" + "\n" +
            //         "Deaths: " + "**" + DEATHS.toString() + "**" + "\n" +
            //         "Assist: " + "**" + ASSISTS.toString() + "**" + "\n" +
            //         "Headshots: " + "**" + HS.toString() + "**" + "\n" +
            //         "Score/Round: " + "**" + SPR.toString() + "**" + "\n" +
            //         "Kills/Round: " + "**" + KPR.toString() + "**" + "\n" +
            //         "Fist Bloods: " + "**" + FB.toString() + "**" + "\n" +
            //         "Aces: " + "**" + ACES.toString() + "**" + "\n" +
            //         "Clutches: " + "**" + CLUTCHES.toString() + "**" + "\n" +
            //         "Most Kill (Match): " + "**" + MK.toString() + "**", true)
            //     .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

            // message.channel.send({
            //     embeds: [embed]
            // });
        })
    },
};