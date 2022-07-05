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
    name: "crash",
    aliases: ['cr'],
    description: `Have you ever play crash gambling game? Now you can play it with this command\nUsage: \`${prefix}crash <bet>\` and react to the emoji when you like to stop\nAlias: \`cr\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) < 10 || !args[0]) return message.reply(`Bad format! Example: \`${client.config.prefix}}crash 100\`.\nNote: Min bet \`10\``);
        args[0] = parseInt(args[0])
        let multiplier = 1.0
        let profit = 0.0
        let crash = (Math.random() * (1.0 - 5.0) + 5.0).toFixed(1)
        let increment = 1.0
        let cond = true
        let l = false
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

                        if (60 - secs > 44) {
							client.close()
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('CASINO: CRASH')
                                .setDescription('<@' + users[0].uid + '>, you need to wait `' + (60 - secs - 45) + '` second')
                            return message.channel.send({
                                embeds: [embed]
                            });
                        }
                        if (users[0].cash >= args[0]) {
                            const embed = new MessageEmbed()
                                .setColor('#0099FF')
                                .setTitle('CRASH')
                                //.setDescription('**Multiplier**\n' + (multiplier).toFixed(1) + 'x\n\n**Profit**\n' + profit + ' coins\n\nNote: Current max crash is `5.0`. React below if would like to stop')
                                .addFields({
                                    name: 'Multiplier',
                                    value: (multiplier).toFixed(1).toString() + 'x',
                                    inline: true
                                }, {
                                    name: 'Profit',
                                    value: profit.toString(),
                                    inline: true
                                },{
                                    name: 'Note',
                                    value: 'React <:stop:795905933283819530> below to stop'
                                })
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            return message.channel.send({
                                embeds: [embed]
                            }).then(async m => {
                                m.react('795905933283819530')
                                const filter = (reaction, userr) => {
                                    return reaction.emoji.name === 'stop' && userr.id === message.author.id
                                };
    
                                m.awaitReactions({
                                        filter,
                                        max: 1,
                                        time: 67000,
                                        errors: ['time'],
                                    })
                                    .then(async collected => {
                                        if (collected.first()._emoji.name == 'stop') {
                                            cond = false
                                                // await new Promise(r => setTimeout(r, 2000));
    
                                                bnow = users[0].cash + profit;
                                                cnow = users[0].gambling.crash.win + 1;
                                                totcwnow = users[0].gambling.totcoins.win + profit;
                                                await db.collection("users").updateOne({
                                                    uid: message.author.id
                                                }, {
                                                    $set: {
                                                        cash: bnow,
														"cooldown.universaleco": now.getTime(),
                                                        "gambling.crash.win": cnow,
                                                        "gambling.totcoins.win": totcwnow
                                                    }
                                                });
    
                                                embed.setColor('#00FF11')
                                                embed.setTitle('CRASH')
                                                //embed.setDescription('**Stopped at**\n' + (multiplier).toFixed(1) + 'x\n\n**Profit**\n' + profit + ' coins')
                                                embed.fields = []
                                                embed.addFields({
                                                    name: 'Stopped at',
                                                    value: (multiplier).toFixed(1).toString() + 'x',
                                                    inline: true
                                                }, {
                                                    name: 'Profit',
                                                    value: Math.round(profit).toString(),
                                                    inline: true
                                                },{
                                                    name: 'Note',
                                                    value: 'React <:stop:795905933283819530> below to stop'
                                                })
                                                embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                m.edit({
                                                    embeds: [embed]
                                                })
                                                client.close()
                                        }
                                    })
                                    .catch(collected => {
                                        client.close()
                                    });
    
                                await new Promise(r => setTimeout(r, 3000));
                                while (cond) {
                                    await new Promise(r => setTimeout(r, 1400));
                                    increment += 0.1
                                    multiplier += 0.1
                                    profit += args[0] * 0.1
                                    if (parseFloat((increment).toFixed(1)) >= parseFloat(crash)) {
                                        cond = false

                                        bnow = users[0].cash - args[0];
                                        cnow = users[0].gambling.crash.lose + 1;
                                        totcwnow = users[0].gambling.totcoins.lose + args[0];
                                        await db.collection("users").updateOne({
                                            uid: message.author.id
                                        }, {
                                            $set: {
                                                cash: bnow,
                                                "cooldown.universaleco": now.getTime(),
                                                "gambling.crash.lose": cnow,
                                                "gambling.totcoins.lose": totcwnow
                                            }
                                        });
        
                                        embed.setColor('#FF0009')
                                        embed.setTitle('CRASH')
                                        //embed.setDescription('**Crashed at**\n' + (multiplier).toFixed(1) + 'x\n\n**Lost**\n' + args[0] + ' coins')
                                        embed.fields = []
                                        embed.addFields({
                                            name: 'Crashed at',
                                            value: (multiplier).toFixed(1).toString() + 'x',
                                            inline: true
                                        }, {
                                            name: 'Profit',
                                            value: '-' + args[0].toString() + ' cash',
                                            inline: true
                                        })
                                        embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                        m.edit({
                                            embeds: [embed]
                                        })
                                        return client.close()
                                    }
                                    embed.setColor('#0099FF')
                                    embed.setTitle('CRASH')
                                    //embed.setDescription('**Multiplier**\n' + (multiplier).toFixed(1) + 'x\n\n**Profit**\n' + profit + ' coins\n\nNote: Current max crash is `5.0`. React below if would like to stop')
                                    embed.fields = []
                                    embed.addFields({
                                        name: 'Multiplier',
                                        value: (multiplier).toFixed(1).toString() + 'x',
                                        inline: true
                                    }, {
                                        name: 'Profit',
                                        value: Math.round(profit).toString() + ' cash',
                                        inline: true
                                    },{
                                        name: 'Note',
                                        value: 'React <:stop:795905933283819530> below to stop'
                                    })
                                    embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

                                    cond == false ? '' : m.edit({
                                        embeds: [embed]
                                    })
                                }
                            })
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('CRASH')
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
                            .setTitle('CRASH')
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
                        .setTitle('CRASH')
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