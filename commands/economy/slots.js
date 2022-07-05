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
    name: "slots",
    aliases: [],
    description: `Play slots game and bet your cash\nUsage: \`${prefix}slots <bet>\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[0]) return message.reply(`Bad format! Example: \`${client.config.prefix}slots 100\``);
        args[0] = parseInt(args[0]);

        var arr = [':gem:', ':first_place:', ':100:', ':moneybag:', ':dollar:']
        var lone = Math.floor(Math.random() * 5) + 1
        var ltwo = Math.floor(Math.random() * 5) + 1
        var lthree = Math.floor(Math.random() * 5) + 1
        var lfour = Math.floor(Math.random() * 5) + 1
        var lfive = Math.floor(Math.random() * 5) + 1
        var lsix = Math.floor(Math.random() * 5) + 1
        var lseven = Math.floor(Math.random() * 5) + 1
        var leight = Math.floor(Math.random() * 5) + 1
        var lnine = Math.floor(Math.random() * 5) + 1


        var winl = lfour == lfive
        var winh = lfour == lfive && lfour == lsix
        var jackpot = lfour == 1 && lfive == 1 && lsix == 1

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
                            const embed = new MessageEmbed()
                                .setColor('#0099FF')
                                .setTitle('SLOTS')
                                .setDescription(arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + '\n ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' \n' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1])
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            }).then(async m => {
                                m.react('796132964039131176')
                                const filter = (reaction, userr) => {
                                    return reaction.emoji.name === 'spin' && userr.id === message.author.id
                                };

                                m.awaitReactions({
                                        filter,
                                        max: 1,
                                        time: 15000,
                                        errors: ['time'],
                                    })
                                    .then(async collected => {
                                        const embed = new MessageEmbed()
                                            .setColor('#0099FF')
                                            .setTitle('SLOTS')
                                            .setDescription('<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + '\n ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' \n' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>')
                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png')
                                        m.edit({
                                            embeds: [embed]
                                        }).then(async a => {
                                            await new Promise(r => setTimeout(r, 2000));
                                            const embed = new MessageEmbed()
                                                .setColor('#0099FF')
                                                .setTitle('SLOTS')
                                                .setDescription(arr[lone - 1] + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + '\n ' + arr[lfour - 1] + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' \n' + arr[lseven - 1] + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>')
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            a.edit({
                                                embeds: [embed]
                                            }).then(async me => {
                                                await new Promise(r => setTimeout(r, 2000));
                                                const embed = new MessageEmbed()
                                                    .setColor('#0099FF')
                                                    .setTitle('SLOTS')
                                                    .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + '<a:cycle:796132989045702716>' + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + '<a:cycle:796132989045702716>' + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + '<a:cycle:796132989045702716>')
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                me.edit({
                                                    embeds: [embed]
                                                }).then(async mes => {
                                                    await new Promise(r => setTimeout(r, 2000));
                                                    const embed = new MessageEmbed()
                                                        .setColor('#0099FF')
                                                        .setTitle('SLOTS')
                                                        .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1])
                                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                    mes.edit({
                                                        embeds: [embed]
                                                    }).then(async msg => {
                                                        if (jackpot) {
                                                            bnow = users[0].cash + (args[0] * 10);
                                                            sjnow = users[0].gambling.slot.jackpot + 1;
                                                            totcwnow = users[0].gambling.totcoins.win + (args[0] * 10);
                                                            await db.collection("users").updateOne({
                                                                uid: message.author.id
                                                            }, {
                                                                $set: {
                                                                    cash: bnow,
                                                                    "gambling.slot.jackpot": fromInt(sjnow),
                                                                    "gambling.totcoins.win": totcwnow
                                                                }
                                                            });

                                                            const embed = new MessageEmbed()
                                                                .setColor('#00FF11')
                                                                .setTitle('SLOTS')
                                                                .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1] + '\n\n' + 'Jackpot! You won `' + args[0] * 10 + '`')
                                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                            msg.edit({
                                                                embeds: [embed]
                                                            })
                                                            client.close()

                                                        } else if (winh) {
                                                            bnow = users[0].cash + (args[0] * 3);
                                                            wnow = users[0].gambling.slot.win + 1;
                                                            totcwnow = users[0].gambling.totcoins.win + (args[0] * 3);
                                                            await db.collection("users").updateOne({
                                                                uid: message.author.id
                                                            }, {
                                                                $set: {
                                                                    cash: bnow,
                                                                    "gambling.slot.win": fromInt(wnow),
                                                                    "gambling.totcoins.win": totcwnow
                                                                }
                                                            });

                                                            const embed = new MessageEmbed()
                                                                .setColor('#00FF11')
                                                                .setTitle('SLOTS')
                                                                .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1] + '\n\n' + 'You won `' + args[0] * 3 + '`')
                                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                            msg.edit({
                                                                embeds: [embed]
                                                            })
                                                            client.close()
                                                        } else if (winl) {
                                                            bnow = users[0].cash + args[0];
                                                            wnow = users[0].gambling.slot.win + 1;
                                                            totcwnow = users[0].gambling.totcoins.win + args[0];
                                                            await db.collection("users").updateOne({
                                                                uid: message.author.id
                                                            }, {
                                                                $set: {
                                                                    cash: bnow,
                                                                    "gambling.slot.win": fromInt(wnow),
                                                                    "gambling.totcoins.win": totcwnow
                                                                }
                                                            });

                                                            const embed = new MessageEmbed()
                                                                .setColor('#00FF11')
                                                                .setTitle('SLOTS')
                                                                .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1] + '\n\n' + 'You won `' + args[0] + '`')
                                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                            msg.edit({
                                                                embeds: [embed]
                                                            })
                                                            client.close()
                                                        } else {
                                                            bnow = users[0].cash - args[0];
                                                            lnow = users[0].gambling.slot.lose + 1;
                                                            totcwnow = users[0].gambling.totcoins.lose + args[0];
                                                            await db.collection("users").updateOne({
                                                                uid: message.author.id
                                                            }, {
                                                                $set: {
                                                                    cash: bnow,
                                                                    "gambling.slot.lose": fromInt(lnow),
                                                                    "gambling.totcoins.lose": totcwnow
                                                                }
                                                            });

                                                            const embed = new MessageEmbed()
                                                                .setColor('#FF0009')
                                                                .setTitle('SLOTS')
                                                                .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1] + '\n\n' + 'You just lost `' + args[0] + '`')
                                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                            msg.edit({
                                                                embeds: [embed]
                                                            })
                                                            client.close()
                                                        }
                                                    })
                                                })
                                            })
                                        })
                                    })
                                    .catch(collected => {
                                        m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                        const embed = new MessageEmbed()
                                            .setColor('#FF0009')
                                            .setTitle('SLOTS')
                                            .setDescription(`Game aborted! You didn't press the <:spin:796132964039131176> button`)
                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                        m.edit({
                                            embeds: [embed]
                                        });
                                        client.close()
                                    });
                            })
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('SLOTS')
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
                            .setTitle('SLOTS')
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
                        .setTitle('SLOTS')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    m.edit({
                        embeds: [embed]
                    });
                    client.close()
                }
            })
        } catch (e) {
            message.reply(`An error occured. Please report this issue using \`${client.config.prefix}report\``)
        }
    },
};