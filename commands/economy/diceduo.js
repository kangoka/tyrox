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
    name: "diceduo",
    aliases: ['dd'],
    description: `Play the dice game and bet your cash, but this time vs someone else\nUsage: \`${prefix}diceduo <bet> <@user>\`\nAlias: \`dd\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[1]) return message.reply(`Bad format! Example: \`${client.config.prefix}diceduo 100 @KangOka\``);
        const user = message.mentions.users.first().id;
        const usert = message.author.id;
        let p1 = 0
        let p2 = 0
        if (user == message.author.id) return message.reply('Seriously?')
        args[0] = parseInt(args[0]);
        try {
            MongoClient.connect(connectionString, async function (err, client) {
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
                            embed.setTitle('DICE DUO')
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
                                            embed.setTitle('DICE DUO')
                                            embed.setColor('#0099FF')
                                            embed.setDescription('Randomize the player who roll the dice first')
                                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            m.edit({
                                                embeds: [embed]
                                            }).then(async msg => {
                                                msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                                await new Promise(r => setTimeout(r, 3000));
                                                var pleyer = [user, userz[0].uid];
                                                const resultt = pleyer[Math.floor(Math.random() * pleyer.length)]
                                                if (resultt == user) {
                                                    var after = userz[0].uid
                                                } else if (resultt == userz[0].uid) {
                                                    var after = user
                                                }
                                                embed.setTitle('DICE DUO')
                                                embed.setColor('#0099FF')
                                                embed.setDescription(`<@${resultt}>, your turn to roll the dice`)
                                                embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                msg.edit({
                                                    embeds: [embed]
                                                }).then(async meseg => {
                                                    meseg.react('795735130664337483').catch(() => console.error('One of the emojis failed to react.'));
                                                    const filter = (reaction, userrr) => {
                                                        return reaction.emoji.name === 'dice' && userrr.id === resultt
                                                    };

                                                    meseg.awaitReactions({
                                                            filter,
                                                            max: 1,
                                                            time: 15000,
                                                            errors: ['time']
                                                        })
                                                        .then(collected => {
                                                            embed.setTitle('DICE DUO')
                                                            embed.setColor('#0099FF')
                                                            embed.setDescription('Rolling The Dice')
                                                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                            meseg.edit({
                                                                embeds: [embed]
                                                            }).then(async mesege => {
                                                                mesege.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                                                await new Promise(r => setTimeout(r, 2000));
                                                                const p1d1 = Math.floor(Math.random() * 6) + 1
                                                                const p1d2 = Math.floor(Math.random() * 6) + 1
                                                                p1 = p1d1 + p1d2
                                                                embed.setTitle('DICE DUO')
                                                                embed.setColor('#0099FF')
                                                                embed.setDescription('<@' + resultt + '>\nDice 1: `' + p1d1 + '`\nDice 2: `' + p1d2 + '`\n\n<@' + after + '>, your turn to roll the dice')
                                                                embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                                mesege.edit({
                                                                    embeds: [embed]
                                                                }).then(async mesegx => {
                                                                    mesegx.react('795735130664337483').catch(() => console.error('One of the emojis failed to react.'));
                                                                    const filter = (reaction, userrr) => {
                                                                        return reaction.emoji.name === 'dice' && userrr.id === after
                                                                    };

                                                                    meseg.awaitReactions({
                                                                            filter,
                                                                            max: 1,
                                                                            time: 15000,
                                                                            errors: ['time']
                                                                        })
                                                                        .then(collected => {
                                                                            embed.setTitle('DICE DUO')
                                                                            embed.setColor('#0099FF')
                                                                            embed.setDescription('Rolling The Dice')
                                                                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                                            meseg.edit({
                                                                                embeds: [embed]
                                                                            }).then(async mesege => {
                                                                                mesege.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                                                                await new Promise(r => setTimeout(r, 2000));
                                                                                const p2d1 = Math.floor(Math.random() * 6) + 1
                                                                                const p2d2 = Math.floor(Math.random() * 6) + 1
                                                                                p2 = p2d1 + p2d2

                                                                                if (p1 == p2) {
                                                                                    client.close()
                                                                                    embed.setTitle('DICE DUO')
                                                                                    embed.setColor('#595959')
                                                                                    embed.setDescription('<@' + resultt + '>\nDice 1: `' + p1d1 + '`\nDice 2: `' + p1d2 + '`\n\n<@' + after + '>\nDice 1: `' + p2d1 + '`\nDice 2: `' + p2d2 + '`\n' +
                                                                                        '\nDRAW! Looks like we don\'t have a winner here')
                                                                                    embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                                                    return mesege.edit({
                                                                                        embeds: [embed]
                                                                                    })
                                                                                }

                                                                                if (after == user && p2 > p1) {
                                                                                    var win = user
                                                                                    var lose = userz[0].uid
                                                                                    var woon = p2
                                                                                    var loose = p1
                                                                                } else if (after == user && p2 < p1) {
                                                                                    var win = userz[0].uid
                                                                                    var lose = user
                                                                                    var woon = p1
                                                                                    var loose = p2
                                                                                } else if (after == userz[0].uid && p2 > p1) {
                                                                                    var win = userz[0].uid
                                                                                    var lose = user
                                                                                    var woon = p2
                                                                                    var loose = p1
                                                                                } else if (after == userz[0].uid && p2 < p1) {
                                                                                    var win = user
                                                                                    var lose = userz[0].uid
                                                                                    var woon = p1
                                                                                    var loose = p2
                                                                                }

                                                                                const winner = await db.collection("users").find({
                                                                                    uid: win
                                                                                }).toArray();

                                                                                const loser = await db.collection("users").find({
                                                                                    uid: lose
                                                                                }).toArray();

                                                                                bnow = winner[0].cash + args[0];
                                                                                wnow = winner[0].gambling.diced.win + 1;
                                                                                totcwnow = winner[0].gambling.totcoins.win + args[0];
                                                                                await db.collection("users").updateOne({
                                                                                    uid: win
                                                                                }, {
                                                                                    $set: {
                                                                                        cash: bnow,
                                                                                        "gambling.diced.win": wnow,
                                                                                        "gambling.totcoins.win": totcwnow
                                                                                    }
                                                                                });

                                                                                bnow = loser[0].cash - args[0];
                                                                                lnow = loser[0].gambling.diced.lose + 1;
                                                                                totcwnow = loser[0].gambling.totcoins.lose + args[0];
                                                                                await db.collection("users").updateOne({
                                                                                    uid: lose
                                                                                }, {
                                                                                    $set: {
                                                                                        cash: bnow,
                                                                                        "gambling.diced.lose": lnow,
                                                                                        "gambling.totcoins.lose": totcwnow
                                                                                    }
                                                                                });

                                                                                embed.setTitle('DICE DUO')
                                                                                embed.setColor('#00FF11')
                                                                                embed.setDescription('<@' + resultt + '>\nDice 1: `' + p1d1 + '`\nDice 2: `' + p1d2 + '`\n\n<@' + after + '>\nDice 1: `' + p2d1 + '`\nDice 2: `' + p2d2 + '`\n' +
                                                                                    '\n<@' + win + '> rolled `' + woon + '` and won `' + args[0] + '`\n<@' + lose + '> rolled `' + loose + '` and lost `' + args[0] + '`')
                                                                                embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                                                mesege.edit({
                                                                                    embeds: [embed]
                                                                                })
                                                                                client.close()
                                                                            })
                                                                        })
                                                                        .catch(collected => {
                                                                            embed.setTitle('DICE DUO')
                                                                            embed.setColor('#FF0009')
                                                                            embed.setDescription(`<@${after}> isn't here, game aborted.`)
                                                                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                                            meseg.edit({
                                                                                embeds: [embed]
                                                                            })
                                                                            client.close()
                                                                        });
                                                                })
                                                            })
                                                        }).catch(collected => {
                                                            embed.setTitle('DICE DUO')
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
                                            embed.setTitle('DICE DUO')
                                            embed.setColor('#FF0009')
                                            embed.setDescription(`<@${user}> doesn't accept the game`)
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
                                        embed.setDescription(`<@${user}> doesn't accept the game`)
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
                                .setDescription(`You don't have enough cash`)
                            embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                            client.close()
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('DICE DUO')
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
                        .setTitle('COINFLIP DUO')
                        .setDescription('Both player need to registered on the system to play.')
                    embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
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