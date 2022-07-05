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
    name: "coinflipduo",
    aliases: ['cfd'],
    description: `Play coinflip and bet your cash, but this one vs someone else\nUsage: \`${prefix}coinflipduo <bet> <@user>\`\nAlias: \`cfd\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[1]) return message.reply(`Bad format! Example: \`${client.config.prefix}coinflipduo 100 @KangOka\``);
        const user = message.mentions.users.first().id;
        const usert = message.author.id;
        if (user == message.author.id) return message.reply('Seriously?')
        args[0] = parseInt(args[0]);
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: user
                }).toArray();
                const userz = await db.collection("users").find({
                    uid: usert
                }).toArray();

                if (users[0] != undefined && userz[0] != undefined) {
                    if (users[0].cooldown.injured == 0 && userz[0].cooldown.injured == 0) {
                        if (users[0].cash >= args[0] && userz[0].cash >= args[0]) {

                            const embed = new MessageEmbed()
                            embed.setColor('#0099FF')
                            embed.setTitle('COINFLIP DUO')
                            embed.setDescription('<@' + user + '>, do you want to accept the game?')
                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            }).then(async m => {
                                m.react('394330939523858454').then(() => m.react('394331039218008064')).catch(() => console.error('One of the emojis failed to react.'));
                                const filter = (reaction, userr) => {
                                    return (reaction.emoji.name === 'yea' && userr.id === user) || (reaction.emoji.name === 'nay' && userr.id === user);
                                };

                                m.awaitReactions({
                                        filter,
                                        max: 1,
                                        time: 15000,
                                        errors: ['time']
                                    })
                                    .then(collected => {
                                        if (collected.first()._emoji.name == 'yea') {
                                            embed.setTitle('COINFLIP DUO')
                                            embed.setColor('#0099FF')
                                            embed.setDescription('Randomize the player who choose tails or heads')
                                            m.edit({
                                                embeds: [embed]
                                            }).then(async msg => {
                                                msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                                await new Promise(r => setTimeout(r, 3000));
                                                var pleyer = [user, userz[0].uid];
                                                const resultt = pleyer[Math.floor(Math.random() * pleyer.length)]
                                                embed.setTitle('COINFLIP DUO')
                                                embed.setColor('#0099FF')
                                                embed.setDescription(`<@${resultt}>, choose heads or tails`)
                                                embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                msg.edit({
                                                    embeds: [embed]
                                                }).then(async meseg => {
                                                    meseg.react('795406980365156403').then(() => m.react('795406981765529620')).catch(() => console.error('One of the emojis failed to react.'));
                                                    const filter = (reaction, userrr) => {
                                                        return (reaction.emoji.name === 'heads' && userrr.id === resultt) || (reaction.emoji.name === 'tails' && userrr.id === resultt);
                                                    };

                                                    meseg.awaitReactions({
                                                            filter,
                                                            max: 1,
                                                            time: 15000,
                                                            errors: ['time']
                                                        })
                                                        .then(collected => {
                                                            embed.setTitle('COINFLIP DUO')
                                                            embed.setColor('#0099FF')
                                                            embed.setDescription('Tossing Coin')
                                                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                            meseg.edit({
                                                                embeds: [embed]
                                                            }).then(async mesege => {
                                                                var coinflip = ['heads', 'tails'];
                                                                var result = coinflip[Math.floor(Math.random() * coinflip.length)]
                                                                if (collected.first().users.cache.get(resultt) != undefined) {
                                                                    var p = resultt
                                                                } else {
                                                                    var p = resultt
                                                                }
                                                                if (result == collected.first()._emoji.name) {
                                                                    if (p == user) {
                                                                        var win = user
                                                                        var lose = usert
                                                                    } else {
                                                                        var win = usert
                                                                        var lose = user
                                                                    }
                                                                    const winner = await db.collection("users").find({
                                                                        uid: win
                                                                    }).toArray();

                                                                    const loser = await db.collection("users").find({
                                                                        uid: lose
                                                                    }).toArray();

                                                                    bnow = winner[0].cash + args[0];
                                                                    wnow = winner[0].gambling.coinflipd.win + 1;
                                                                    totcwnow = winner[0].gambling.totcoins.win + args[0];
                                                                    await db.collection("users").updateOne({
                                                                        uid: win
                                                                    }, {
                                                                        $set: {
                                                                            cash: bnow,
                                                                            "gambling.coinflipd.win": wnow,
                                                                            "gambling.totcoins.win": totcwnow
                                                                        }
                                                                    });

                                                                    bnow = loser[0].cash - args[0];
                                                                    lnow = loser[0].gambling.coinflipd.lose + 1;
                                                                    totcwnow = loser[0].gambling.totcoins.lose + args[0];
                                                                    await db.collection("users").updateOne({
                                                                        uid: lose
                                                                    }, {
                                                                        $set: {
                                                                            cash: bnow,
                                                                            "gambling.coinflipd.lose": lnow,
                                                                            "gambling.totcoins.lose": totcwnow
                                                                        }
                                                                    });

                                                                    embed.setTitle('COINFLIP DUO')
                                                                    embed.setColor('#00FF11')
                                                                    embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\n<@' + win + '> won `' + args[0] + '`\n<@' + lose + '> lose `' + args[0] + '`')
                                                                    embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                                    mesege.edit({
                                                                        embeds: [embed]
                                                                    });
                                                                    client.close()
                                                                } else {
                                                                    if (p == user) {
                                                                        var win = usert
                                                                        var lose = user
                                                                    } else {
                                                                        var win = user
                                                                        var lose = usert
                                                                    }
                                                                    const winner = await db.collection("users").find({
                                                                        uid: win
                                                                    }).toArray();

                                                                    const loser = await db.collection("users").find({
                                                                        uid: lose
                                                                    }).toArray();

                                                                    bnow = winner[0].cash + args[0];
                                                                    wnow = winner[0].gambling.coinflipd.win + 1;
                                                                    totcwnow = winner[0].gambling.totcoins.win + args[0];
                                                                    await db.collection("users").updateOne({
                                                                        uid: win
                                                                    }, {
                                                                        $set: {
                                                                            cash: bnow,
                                                                            "gambling.coinflipd.win": wnow,
                                                                            "gambling.totcoins.win": totcwnow
                                                                        }
                                                                    });

                                                                    bnow = loser[0].cash - args[0];
                                                                    lnow = loser[0].gambling.coinflipd.lose + 1;
                                                                    totcwnow = loser[0].gambling.totcoins.lose + args[0];
                                                                    await db.collection("users").updateOne({
                                                                        uid: lose
                                                                    }, {
                                                                        $set: {
                                                                            cash: bnow,
                                                                            "gambling.coinflipd.lose": lnow,
                                                                            "gambling.totcoins.lose": totcwnow
                                                                        }
                                                                    });

                                                                    embed.setTitle('COINFLIP DUO')
                                                                    embed.setColor('#00FF11')
                                                                    embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\n<@' + win + '> won `' + args[0] + '`\n<@' + lose + '> lose `' + args[0] + '`')
                                                                    embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                                    mesege.edit({
                                                                        embeds: [embed]
                                                                    });
                                                                    client.close()
                                                                }
                                                            })
                                                        })
                                                        .catch(collected => {
                                                            embed.setTitle('COINFLIP DUO')
                                                            embed.setColor('#FF0009')
                                                            embed.setDescription(`<@${resultt}> isn't here, game aborted.`)
                                                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                            meseg.edit({
                                                                embeds: [embed]
                                                            })
                                                            client.close()
                                                        });
                                                })
                                            })
                                        } else if (collected.first()._emoji.name == 'nay') {
                                            embed.setTitle('COINFLIP DUO')
                                            embed.setColor('#FF0009')
                                            embed.setDescription(`<@${user}> didn't accept the game`)
                                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            m.edit({
                                                embeds: [embed]
                                            });
                                            client.close()
                                        }
                                    })
                                    .catch(collected => {
                                        embed.setTitle('COINFLIP DUO')
                                        embed.setColor('#FF0009')
                                        embed.setDescription(`<@${user}> didn't accept the game`)
                                        embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                        m.edit({
                                            embeds: [embed]
                                        });
                                        client.close()
                                    });
                            })
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('COINFLIP DUO')
                                .setDescription(`You or <@${user}> don't have enough cash`)
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                            client.close()
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('COINFLIP DUO')
                            .setDescription(`You or <@` + user + `> are injured! You need to get fully healed to do activites. Type \`${client.config.prefix}checkups\` to see the doctor`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                        client.close()
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('GIVE COINS')
                        .setDescription('Both player need to registered on the system to play.')
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