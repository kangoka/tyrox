const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "register",
    aliases: ['r'],
    description: "Register on the system and start playing",
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

                if (users[0] != undefined) {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('REGISTER')
                        .addFields({
                            name: `Failed`,
                            value: 'You already registered in the system.'
                        })
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('REGISTER')
                        .addFields({
                            name: `Rules`,
                            value: '1. Macros/scripts/selfbot/multiple accounts is not allowed\n' +
                                '2. Exploitation, spreading, and activation of bugs is prohibited\n' +
                                '3. RMT is prohibited\n\n' +
                                'Failure to follow these rules will result in a ban or account reset!\n' +
                                'Reacting with the emoji means you will follow the rules and acknowlege the consequences\n\n' +
                                'Rules can be change at any time without notice, you may check `trules` once in a while\n\n' + 
                                'If you found bugs, the game seems not right, or suggestions, please use `treport`'
                        })
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    }).then(async m => {
                        Promise.all([
                                m.react('876606927956750356'),
                                m.react('876607460964704347'),
                            ])
                            .catch(() => console.error('One of the emojis failed to react.'));
                        const filter = (reaction, userrr) => {
                            return (reaction.emoji.name === 'okie' || reaction.emoji.name === 'nothanks') && userrr.id === message.author.id
                        };

                        await m.awaitReactions({
                                filter,
                                max: 1,
                                time: 45000,
                                errors: ['time']
                            })
                            .then(async collected => {
                                await new Promise(r => setTimeout(r, 3000));
                                if (collected.first()._emoji.name === 'okie') {
                                    const now = new Date();
                                    await db.collection("users").insertOne({
                                        uid: message.author.id,
                                        displayName: message.author.username,
                                        cash: fromInt(0),
                                        bank: fromInt(0),
                                        dirtymoney: fromInt(0),
                                        sbank: 0,
                                        registered: (now.getTime()),
                                        robbedby: fromInt(0),
                                        badge: 0,
                                        cooldown: {
                                            vote: fromInt(0),
                                            report: fromBigInt(0),
                                            daily: fromInt(0),
                                            work: fromInt(0),
                                            train: fromInt(0),
                                            fish: fromInt(0),
                                            dig: fromInt(0),
                                            rob: {
                                                person: fromInt(0),
                                                bank: fromInt(0),
                                                heist: fromInt(0)
                                            },
                                            injured: 0,
                                            checkups: fromInt(0),
											universaleco: fromInt(0)
                                        },
                                        stats: {
                                            int: 1.000,
                                            agi: 1.000,
                                            str: 1.000,
                                            fish: 70.00,
                                            dig: 70.00
                                        },
                                        gambling: {
                                            totcoins: {
                                                win: fromInt(0),
                                                lose: fromInt(0)
                                            },
                                            coinflip: {
                                                win: 0,
                                                lose: 0
                                            },
                                            coinflipd: {
                                                win: 0,
                                                lose: 0
                                            },
                                            dice: {
                                                win: 0,
                                                lose: 0,
                                                snakeeyes: 0
                                            },
                                            diced: {
                                                win: 0,
                                                lose: 0,
                                                snakeeyes: 0
                                            },
                                            slot: {
                                                win: 0,
                                                lose: 0,
                                                jackpot: 0
                                            },
                                            roullete: {
                                                win: 0,
                                                lose: 0,
                                                jackpot: 0
                                            },
                                            crash: {
                                                win: 0,
                                                lose: 0
                                            },
                                            horse: {
                                                win: 0,
                                                lose: 0
                                            },
                                            blackjack: {
                                                win: 0,
                                                lose: 0
                                            }
                                        },
                                        inventory: {
                                            items: {},
                                            weapons: ""
                                        }
                                    });

                                    const embed = new MessageEmbed()
                                        .setColor('#00FF11')
                                        .setTitle('REGISTER')
                                        .addFields({
                                            name: `Success`,
                                            value: 'You are now registered on the system, have fun!'
                                        })
                                        .setFooter('Tryox', 'https://i.imgur.com/86gFNId.png');
                                    m.edit({
                                        embeds: [embed]
                                    });
                                } else if (collected.first()._emoji.name === 'nothanks') {
                                    const embed = new MessageEmbed()
                                        .setTitle('REGISTER')
                                        .setColor('#FF0009')
                                        .setDescription('You doesn\'t accept the rules')
                                        .setFooter('Tryox', 'https://i.imgur.com/86gFNId.png');
                                    m.edit({
                                        embeds: [embed]
                                    });
                                }
                            }).catch(collected => {
                                embed.setTitle('REGISTER')
                                embed.setColor('#FF0009')
                                embed.setDescription('You didn\'t react to the message')
                                m.edit({
                                    embeds: [embed]
                                })
                                client.close()
                            });
                    })
                }
            })
        } catch (e) {
            console.log(e);
        }
    },
};