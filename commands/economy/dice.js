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
    name: "dice",
    aliases: [],
    description: `Play the dice game and bet your cash\nUsage: \`${prefix}dice <bet> <high/low>\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        var arr = ['high', 'low'];
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[1] || !arr.includes(args[1].toLowerCase())) return message.reply(`Wrong format! Example: \`${client.config.prefix}dice 100 low\``);
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
                                .setTitle('CASINO: DICE')
                                .setDescription('<@' + users[0].uid + '>, you need to wait `' + (60 - secs - 55) + '` second')
                            return message.channel.send({
                                embeds: [embed]
                            });
                        }
                        if (users[0].cash >= args[0]) {
                            var dice1 = Math.floor(Math.random() * 6) + 1;
                            var dice2 = Math.floor(Math.random() * 6) + 1;
                            var tot = dice1 + dice2;
                            while (tot == 6) {
                                dice1 = Math.floor(Math.random() * 6) + 1;
                                dice2 = Math.floor(Math.random() * 6) + 1;
                                tot = dice1 + dice2;
                            }

                            if (dice1 == 1 && dice2 == 1) {
                                bnow = users[0].cash + (args[0] * 10);
                                senow = users[0].gambling.dice.snakeeyes + 1;
                                totcwnow = users[0].gambling.totcoins.win + (args[0] * 10);
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        cash: bnow,
                                        "cooldown.universaleco": now.getTime(),
                                        "gambling.dice.snakeeyes": senow,
                                        "gambling.totcoins.win": totcwnow
                                    }
                                });

                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('CASINO: DICE')
                                    .addFields({
                                        name: `Dice 1`,
                                        value: `${dice1}`
                                    }, {
                                        name: `Dice 2`,
                                        value: `${dice2}`
                                    }, {
                                        name: `What a Luck!`,
                                        value: '<@' + users[0].uid + '>, you rolled snake eyes (1 and 1) and won `' + args[0] * 10 + '`'
                                    })
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else if (dice1 == dice2) {
                                bnow = users[0].cash + (args[0] * 2);
                                wnow = users[0].gambling.dice.win + 1;
                                totcwnow = users[0].gambling.totcoins.win + (args[0] * 2);
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        cash: bnow,
                                        "cooldown.universaleco": now.getTime(),
                                        "gambling.dice.win": wnow,
                                        "gambling.totcoins.win": totcwnow
                                    }
                                });

                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('CASINO: DICE')
                                    .addFields({
                                        name: `Dice 1`,
                                        value: `${dice1}`
                                    }, {
                                        name: `Dice 2`,
                                        value: `${dice2}`
                                    }, {
                                        name: `Double!`,
                                        value: '<@' + users[0].uid + '>, you rolled double and won `' + args[0] * 2 + '`'
                                    })
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else if (tot < 6 && args[1] == 'low') {
                                bnow = users[0].cash + args[0];
                                wnow = users[0].gambling.dice.win + 1;
                                totcwnow = users[0].gambling.totcoins.win + args[0];
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        cash: bnow,
                                        "cooldown.universaleco": now.getTime(),
                                        "gambling.dice.win": wnow,
                                        "gambling.totcoins.win": totcwnow
                                    }
                                });

                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('CASINO: DICE')
                                    .addFields({
                                        name: `Dice 1`,
                                        value: `${dice1}`
                                    }, {
                                        name: `Dice 2`,
                                        value: `${dice2}`
                                    }, {
                                        name: `Low!`,
                                        value: '<@' + users[0].uid + '>, you rolled `' + tot + '` and won `' + args[0] + '`'
                                    })
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else if (tot > 6 && args[1] == 'high') {
                                bnow = users[0].cash + args[0];
                                wnow = users[0].gambling.dice.win + 1;
                                totcwnow = users[0].gambling.totcoins.win + args[0];
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        cash: bnow,
                                        "cooldown.universaleco": now.getTime(),
                                        "gambling.dice.win": wnow,
                                        "gambling.totcoins.win": totcwnow
                                    }
                                });

                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('CASINO: DICE')
                                    .addFields({
                                        name: `Dice 1`,
                                        value: `${dice1}`
                                    }, {
                                        name: `Dice 2`,
                                        value: `${dice2}`
                                    }, {
                                        name: `High!`,
                                        value: '<@' + users[0].uid + '>, you rolled `' + tot + '` and won `' + args[0] + '`'
                                    })
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else {
                                bnow = users[0].cash - args[0];
                                lnow = users[0].gambling.dice.lose + 1;
                                totclnow = users[0].gambling.totcoins.lose + args[0];
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        cash: bnow,
                                        "cooldown.universaleco": now.getTime(),
                                        "gambling.dice.lose": lnow,
                                        "gambling.totcoins.lose": totclnow
                                    }
                                });

                                const embed = new MessageEmbed()
                                    .setColor('#FF0009')
                                    .setTitle('CASINO: DICE')
                                    .addFields({
                                        name: `Dice 1`,
                                        value: `${dice1}`
                                    }, {
                                        name: `Dice 2`,
                                        value: `${dice2}`
                                    }, {
                                        name: `Lose!`,
                                        value: '<@' + users[0].uid + '>, you rolled `' + tot + '` and lose `' + args[0] + '`'
                                    })
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            }
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('CASINO: DICE')
                                .setDescription(`You don't have enough cash.`)
                            message.channel.send({
                                embeds: [embed]
                            });
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('DICE')
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
                        .setTitle('CASINO: DICE')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
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