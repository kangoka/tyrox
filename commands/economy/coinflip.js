const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');
const { prefix } = require('../../json/config.json')

module.exports = {
    name: "coinflip",
    aliases: ['cf'],
    description: `Play coinflip and bet your cash\nUsage: \`${prefix}coinflip <bet> <heads/tails>\`\nAlias: \`cf\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        var arr = ['heads', 'tails'];
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[1] || !arr.includes(args[1].toLowerCase())) return message.reply(`Bad format! Example: \`${client.config.prefix}coinflip 100 heads\``);
        args[0] = parseInt(args[0]);
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();
				const now = new Date();

                if (users[0] != undefined) {
                    if (users[0].cooldown.injured == 0) {
						const then = new Date(users[0].cooldown.universaleco);
                        const diff = now.getTime() - then.getTime();
                        const secs = Math.floor((diff % (1000 * 60)) / 1000);

                        if (60 - secs > 54) {
							client.close()
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('CASINO: COINFLIP')
                                .setDescription('<@' + users[0].uid + '>, you need to wait `' + (60 - secs - 55) + '` second')
                            return message.channel.send({
                                embeds: [embed]
                            });
                        }
                        if (users[0].cash >= args[0]) {
                            const embed = new MessageEmbed();
                            embed.setDescription('Tossing Coin');
                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            }).then(async m => {
                                var coinflip = ['heads', 'tails'];
                                var result = coinflip[Math.floor(Math.random() * coinflip.length)]
                                if (result == args[1].toLowerCase()) {
                                    bnow = users[0].cash + args[0];
                                    wnow = users[0].gambling.coinflip.win + 1;
                                    totcwnow = users[0].gambling.totcoins.win + args[0];
                                    await db.collection("users").updateOne({
                                        uid: message.author.id
                                    }, {
                                        $set: {
                                            cash: bnow,
											"cooldown.universaleco": now.getTime(),
                                            "gambling.coinflip.win": wnow,
                                            "gambling.totcoins.win": totcwnow
                                        }
                                    });
                                    embed.setTitle('COINFLIP')
                                    embed.setColor('#00FF11')
                                    embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\nYou won `' + args[0] + ' cash`')
                                    embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    m.edit({
                                        embeds: [embed]
                                    });
                                    client.close()
                                } else {
                                    bnow = users[0].cash - args[0];
                                    lnow = users[0].gambling.coinflip.lose + 1;
                                    totclnow = users[0].gambling.totcoins.lose + args[0];
                                    await db.collection("users").updateOne({
                                        uid: message.author.id
                                    }, {
                                        $set: {
                                            cash: bnow,
											"cooldown.universaleco": now.getTime(),
                                            "gambling.coinflip.lose": lnow,
                                            "gambling.totcoins.lose": totclnow
                                        }
                                    });
                                    embed.setTitle('COINFLIP')
                                    embed.setColor('#FF0009')
                                    embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\nYou lose `' + args[0] + ' cash`')
                                    embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    m.edit({
                                        embeds: [embed]
                                    });
                                    client.close()
                                }
                            });
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('COINFLIP')
                                .setDescription(`You don't have enough cash.`)
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                            client.close()
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('COINFLIP')
                            .setDescription(`You are injured! You need to get fully healed to do activites. Type \`${client.config.prefix}checkups\` to see the doctor`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                        client.close()
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('COINFLIP')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                    client.close()
                }
            })
        } catch (e) {
            console.log(e);
        }
    },
};