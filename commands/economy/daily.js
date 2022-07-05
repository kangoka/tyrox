const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "daily",
    aliases: ['d'],
    description: "Get daily allowance from goverment\nAlias: `d`",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();
                const now = new Date();

                if (users[0] != undefined) {
                    const then = new Date(users[0].date);
                    const diff = now.getTime() - then.getTime();
                    const diffHours = Math.round(diff / (1000 * 60 * 60));
                    let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    let secs = Math.floor((diff % (1000 * 60)) / 1000);

                    if (diffHours <= 23) {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('DAILY')
                            .setDescription('You can get allowance from goverment in `' + (23 - diffHours) + 'h ' + (59 - mins) + 'm ' + (60 - secs) + 's`')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    } else {
                        bnow = users[0].cash + 100000;
                        await db.collection("users").updateOne({
                            uid: message.author.id
                        }, {
                            $set: {
                                cash: bnow,
                                date: fromBigInt(now.getTime())
                            }
                        });
                        const embed = new MessageEmbed()
                            .setColor('#00FF11')
                            .setTitle('DAILY')
                            .setDescription('You get `' + 100000 + '` allowance from goverment')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('DAILY')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                }
                client.close()
            })
        } catch (e) {
            console.log(e);
        }
    },
};