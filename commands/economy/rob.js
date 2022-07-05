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
    name: "rob",
    aliases: ['r'],
    description: `Tired be a good person? You can engage a robbery with this command\nUsage: \`${prefix}rob person <@user>\` to rob a person\n\`${prefix}rob bank\` to rob a bank\n\`${prefix}rob heist\` to start bank heist with your friend\nAlias: \`r\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`What kind of robbery do you want to engage? Available options: \`${client.config.prefix}rob <person/bank/heist>\``)
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();
                const now = new Date();

                if (users[0] != undefined) {
                    if (users[0].cooldown.injured == 0) {
                        if (args[0].toLowerCase() == 'bank') {
                            if (users[0].inventory.weapons == "") {
                                const embed = new MessageEmbed()
                                    .setColor('#FF0009')
                                    .setTitle('ROB | BANK')
                                    .setDescription('You need a gun to engage bank robbery')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                return message.channel.send({
                                    embeds: [embed]
                                });
                            }
                            let then = new Date(users[0].cooldown.rob.bank);
                            let diff = now.getTime() - then.getTime();
                            let diffHours = Math.round(diff / (1000 * 60 * 60));
                            let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            let secs = Math.floor((diff % (1000 * 60)) / 1000);
                            if (diffHours <= 0) {
                                const embed = new MessageEmbed()
                                    .setColor('#FF0009')
                                    .setTitle('ROB | BANK')
                                    .addFields({
                                        name: `Failed`,
                                        value: 'You can engage bank robbery again in `' + (59 - mins) + 'm ' + (60 - secs) + 's`'
                                    })
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else {
                                // chanceFail = 30.000
                                // chanceSuccess = 60.000
                                // chanceCaught = 5.000
                                // chanceCaughtFail = 5.000
                                // chanceTotal = 100.000

                                let randomChance = (Math.random() * (100.000 - 0.000) + 0.000).toFixed(3);
                                if (randomChance >= 0.000 && randomChance <= 5.000) {
                                    if (users[0].stats.agi >= 2.000) {
                                        let randomChance = (Math.random() * ((4.000 - users[0].stats.agi) - 0.000) + 0.000).toFixed(3);
                                        if (randomChance <= 0) {
                                            let randomInjured = Math.floor(Math.random() * 5) + 10

                                            injured = users[0].cooldown.injured + randomInjured
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    "cooldown.injured": injured,
                                                    "cooldown.rob.bank": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#FF0009')
                                                .setTitle('ROB | BANK')
                                                .setDescription('You failed to rob the bank because the cops coming too fast, a shotout is not evadeable and you got shot several times but thanks to your `agi` points that that save your life because you can lose the cops when you barely can breathe.' +
                                                'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        }
                                    } else {
                                        let randomInjured = Math.floor(Math.random() * 5) + 10

                                        injured = users[0].cooldown.injured + randomInjured
                                        bnow = users[0].cash - 50000
                                        await db.collection("users").updateOne({
                                            uid: message.author.id
                                        }, {
                                            $set: {
                                                cash: bnow,
                                                "cooldown.injured": injured,
                                                "cooldown.rob.bank": fromBigInt(now.getTime())
                                            }
                                        });

                                        const embed = new MessageEmbed()
                                            .setColor('#FF0009')
                                            .setTitle('ROB | BANK')
                                            .setDescription('You failed to rob the bank because the cops coming too fast, a shotout is not evadeable and you got shot several times but still making the run.' +
                                            'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                        message.channel.send({
                                            embeds: [embed]
                                        });
                                    }
                                } else if (randomChance >= 6.000 && randomChance <= 10.000) {
                                    let randomInjured = Math.floor(Math.random() * 5) + 10

                                    injured = users[0].cooldown.injured + randomInjured
                                    await db.collection("users").updateOne({
                                        uid: message.author.id
                                    }, {
                                        $set: {
                                            "cooldown.injured": injured,
                                            "cooldown.rob.bank": fromBigInt(now.getTime())
                                        }
                                    });

                                    const embed = new MessageEmbed()
                                        .setColor('#FF0009')
                                        .setTitle('ROB | BANK')
                                        .setDescription('You failed to rob the bank because the cops coming too fast, a shotout is not evadeable and you now have gun shot wounds. ' +
                                        'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                } else if (randomChance >= 11.000 && randomChance <= 40.000) {
                                    const embed = new MessageEmbed()
                                        .setColor('#FF0009')
                                        .setTitle('ROB | BANK')
                                        .setDescription('You failed to rob the bank because the bank has the strict security system, luckily you can run without any wounds or even dead')
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                } else {
                                    let randomCash = Math.floor(Math.random() * (110000 - 90000) + 90000);
                                    bnow = users[0].dirtymoney + randomCash
                                    await db.collection("users").updateOne({
                                        uid: message.author.id
                                    }, {
                                        $set: {
                                            dirtymoney: bnow,
                                            "cooldown.rob.bank": fromBigInt(now.getTime())
                                        }
                                    });
                                    const embed = new MessageEmbed()
                                        .setColor('#00FF11')
                                        .setTitle('ROB | BANK')
                                        .setDescription('You successfully rob the bank and lose the cops. You get `' + randomCash + '` dirty money.\n' +
                                        'Use `tlaundry` to laundry all your dirty money')
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                }
                            }
                        } else if (args[0].toLowerCase() == 'person') {
                            if (!args[1]) return message.reply('You need to! Example: `trob person @TargetUser`');
                            const targetUser = message.mentions.users.first().id;
                            if (!targetUser) return message.reply('You are not mentioning a person')
                            const userz = await db.collection("users").find({
                                uid: targetUser
                            }).toArray();
                            if (targetUser == userz[0].uid) return message.reply('Seriously?')
                            // const player = message.author.id;

                            if (userz[0] != undefined) {
                                if (userz[0].cooldown.injured == 0) {
                                    let then = new Date(users[0].cooldown.rob.person);
                                    let diff = now.getTime() - then.getTime();
                                    // let diffHours = Math.round(diff / (1000 * 60 * 60));
                                    let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                                    let secs = Math.floor((diff % (1000 * 60)) / 1000);

                                    if (mins >= 29) {
                                        if (users[0].inventory.weapons != "" && userz[0].inventory.weapons != "") {
                                            let userRandom = 49.000 - users[0].stats.str - users[0].stats.agi;
                                            let randomChance = (Math.random() * ((100.000) - 0.000) + 0.000).toFixed(3);
                                            if (randomChance >= userRandom) {
                                                if (userz[0].cash != 0) {
                                                    let randomCash = Math.floor(Math.random() * (userz[0].cash - (userz[0].cash / 20)) + (userz[0].cash / 20));
                                                    let randomInjured = Math.floor(Math.random() * 4) + 1
                                                    let chanceGetInjured = Math.floor(Math.random() * 1) + 10
                                                    if (chanceGetInjured > 5) {
                                                        let robber = users[0].cash + randomCash
                                                        let robbed = userz[0].cash - randomCash

                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                cash: robber,
                                                                "cooldown.rob.person": fromBigInt(now.getTime())
                                                            }
                                                        });

                                                        await db.collection("users").updateOne({
                                                            uid: targetUser
                                                        }, {
                                                            $set: {
                                                                cash: robbed,
                                                                "cooldown.injured": fromBigInt(randomInjured)
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#00FF11')
                                                            .setTitle('ROB | PERSON')
                                                            .setDescription('You successfully rob <@' + targetUser + '> a shotout broke up but you can run while shooting without a scratch. You got `' + randomCash + '`')
                                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                        message.channel.send({
                                                            embeds: [embed]
                                                        });
                                                    } else {
                                                        let robber = users[0].cash + randomCash
                                                        let robbed = userz[0].cash - randomCash

                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                cash: robber,
                                                                "cooldown.rob.person": fromBigInt(now.getTime()),
                                                                "cooldown.injured": fromBigInt(randomInjured)
                                                            }
                                                        });

                                                        await db.collection("users").updateOne({
                                                            uid: targetUser
                                                        }, {
                                                            $set: {
                                                                cash: fromBigInt(robbed),
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#00FF11')
                                                            .setTitle('ROB | PERSON')
                                                            .setDescription('You successfully rob <@' + targetUser + '> a shotout broke up and you got shot `' + randomInjured + '` times but lickily you still can run for your life. You got `' + randomCash + '`\n' +
                                                                'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                        message.channel.send({
                                                            embeds: [embed]
                                                        });
                                                    }
                                                } else {
                                                    let randomInjured = Math.floor(Math.random() * 4) + 1

                                                    await db.collection("users").updateOne({
                                                        uid: message.author.id
                                                    }, {
                                                        $set: {
                                                            "cooldown.rob.person": fromBigInt(now.getTime()),
                                                            "cooldown.injured": randomInjured
                                                        }
                                                    });

                                                    const embed = new MessageEmbed()
                                                        .setColor('#FF0009')
                                                        .setTitle('ROB | PERSON')
                                                        .setDescription('You tried to rob <@' + targetUser + '> but that person don\'t bring any cash and a shotout broke up and you got shot `' + randomInjured + '` times but lickily you still can run for your life\n' +
                                                            'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                    message.channel.send({
                                                        embeds: [embed]
                                                    });
                                                }
                                            } else {
                                                let randomInjured = Math.floor(Math.random() * 4) + 1

                                                await db.collection("users").updateOne({
                                                    uid: message.author.id
                                                }, {
                                                    $set: {
                                                        "cooldown.rob.person": fromBigInt(now.getTime()),
                                                        "cooldown.injured": randomInjured
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#FF0009')
                                                    .setTitle('ROB | PERSON')
                                                    .setDescription('You tried to rob <@' + targetUser + '> but you are not prepared and got shot.' +
                                                        'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            }
                                        } else if (users[0].inventory.weapons == "" && userz[0].inventory.weapons == "") {
                                            let userRandom = 49.000 - users[0].stats.str - users[0].stats.agi;
                                            let randomChance = (Math.random() * ((100.000) - 0.000) + 0.000).toFixed(3);
                                            if (randomChance >= userRandom) {
                                                if (userz[0].cash != 0) {
                                                    let randomCash = Math.floor(Math.random() * (userz[0].cash - (userz[0].cash / 20)) + (userz[0].cash / 20));
                                                    let randomInjured = Math.floor(Math.random() * 3) + 1
                                                    let chanceGetInjured = Math.floor(Math.random() * 1) + 10
                                                    if (chanceGetInjured > 5) {
                                                        let robber = users[0].cash + randomCash
                                                        let robbed = userz[0].cash - randomCash

                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                cash: robber,
                                                                "cooldown.rob.person": fromBigInt(now.getTime())
                                                            }
                                                        });

                                                        await db.collection("users").updateOne({
                                                            uid: targetUser
                                                        }, {
                                                            $set: {
                                                                cash: robbed,
                                                                "cooldown.injured": randomInjured
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#00FF11')
                                                            .setTitle('ROB | PERSON')
                                                            .setDescription('You successfully rob <@' + targetUser + '> a fight broke up but you win the fight and run with `' + randomCash + '`')
                                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                        message.channel.send({
                                                            embeds: [embed]
                                                        });
                                                    } else {
                                                        let robber = users[0].cash + randomCash
                                                        let robbed = userz[0].cash - randomCash

                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                cash: robber,
                                                                "cooldown.rob.person": fromBigInt(now.getTime()),
                                                                "cooldown.injured": randomInjured
                                                            }
                                                        });

                                                        await db.collection("users").updateOne({
                                                            uid: targetUser
                                                        }, {
                                                            $set: {
                                                                cash: robbed,
                                                                "cooldown.injured": randomInjured
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#00FF11')
                                                            .setTitle('ROB | PERSON')
                                                            .setDescription('You successfully rob <@' + targetUser + '> a fight broke up and the fight is almost tie but you can run but injured while grabbing `' + randomCash + '`\n' +
                                                                'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                        message.channel.send({
                                                            embeds: [embed]
                                                        });
                                                    }
                                                } else {
                                                    await db.collection("users").updateOne({
                                                        uid: message.author.id
                                                    }, {
                                                        $set: {
                                                            "cooldown.rob.person": fromBigInt(now.getTime()),
                                                        }
                                                    });

                                                    const embed = new MessageEmbed()
                                                        .setColor('#FF0009')
                                                        .setTitle('ROB | PERSON')
                                                        .setDescription('You tried to rob <@' + targetUser + '> but that person can run faster than you. It is recommended robbing people with guns')
                                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                    message.channel.send({
                                                        embeds: [embed]
                                                    });
                                                }
                                            } else {
                                                let randomInjured = Math.floor(Math.random() * 4) + 1

                                                await db.collection("users").updateOne({
                                                    uid: message.author.id
                                                }, {
                                                    $set: {
                                                        "cooldown.rob.person": fromBigInt(now.getTime()),
                                                        "cooldown.injured": randomInjured
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#FF0009')
                                                    .setTitle('ROB | PERSON')
                                                    .setDescription('You tried to rob <@' + targetUser + '> but you are too weak and in result you got beaten up' +
                                                        'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            }
                                        } else if (users[0].inventory.weapons != "" && userz[0].inventory.weapons == "") {
                                            if (userz[0].cash != 0) {
                                                let randomCash = Math.floor(Math.random() * (userz[0].cash - (userz[0].cash / 20)) + (userz[0].cash / 20));

                                                let robber = users[0].cash + randomCash
                                                let robbed = userz[0].cash - randomCash

                                                await db.collection("users").updateOne({
                                                    uid: message.author.id
                                                }, {
                                                    $set: {
                                                        cash: robber,
                                                        "cooldown.rob.person": fromBigInt(now.getTime())
                                                    }
                                                });

                                                await db.collection("users").updateOne({
                                                    uid: targetUser
                                                }, {
                                                    $set: {
                                                        cash: robbed,
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#00FF11')
                                                    .setTitle('ROB | PERSON')
                                                    .setDescription('You pointing your gun at <@' + targetUser + '>\'s head and robbed `' + randomCash + '`')
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            } else {
                                                let randomCash = Math.floor(Math.random() * (50000 - 10000) + (10000));

                                                let robber = users[0].bank + randomCash
                                                let robbed = userz[0].bank - randomCash

                                                await db.collection("users").updateOne({
                                                    uid: message.author.id
                                                }, {
                                                    $set: {
                                                        bank: robber,
                                                        "cooldown.rob.person": fromBigInt(now.getTime())
                                                    }
                                                });

                                                await db.collection("users").updateOne({
                                                    uid: targetUser
                                                }, {
                                                    $set: {
                                                        bank: robbed,
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#00FF11')
                                                    .setTitle('ROB | PERSON')
                                                    .setDescription('You pointing your gun at <@' + targetUser + '>\'s head but that person don\'t bring any cash, instead you force that person to send the money through Cash App `' + randomCash + '`')
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            }
                                        } else {
                                            let userRandom = 49.000 - users[0].stats.str - users[0].stats.agi;
                                            let randomChance = (Math.random() * ((100.000) - 0.000) + 0.000).toFixed(3);
                                            if (randomChance >= userRandom) {
                                                const embed = new MessageEmbed()
                                                    .setColor('#FF0009')
                                                    .setTitle('ROB | PERSON')
                                                    .setDescription('You tried to rob <@' + targetUser + '> with bare hand when that person has a gun, luckily you can run without getting shot')
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            } else {
                                                let randomInjured = Math.floor(Math.random() * 5) + 1

                                                await db.collection("users").updateOne({
                                                    uid: message.author.id
                                                }, {
                                                    $set: {
                                                        "cooldown.rob.person": fromBigInt(now.getTime()),
                                                        "cooldown.injured": randomInjured
                                                    }
                                                });
                                                const embed = new MessageEmbed()
                                                    .setColor('#FF0009')
                                                    .setTitle('ROB | PERSON')
                                                    .setDescription('You tried to rob <@' + targetUser + '> with bare hand when that person has a gun, you can escape but you got shot' +
                                                        'You need to checkups routinely for `' + randomInjured + '` times. Also, when you injured, you can\'t do **ANYTHING** until you fully healed')
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            }
                                        }
                                    } else {
                                        const embed = new MessageEmbed()
                                            .setColor('#FF0009')
                                            .setTitle('ROB | PERSON')
                                            .setDescription('You can rob a person again in `' + (29 - mins) + 'm ' + (60 - secs) + 's`')
                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                        message.channel.send({
                                            embeds: [embed]
                                        });
                                    }
                                } else {
                                    const embed = new MessageEmbed()
                                        .setColor('#FF0009')
                                        .setTitle('ROB | PERSON')
                                        .setDescription('You can\'t rob injured person')
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                }
                            } else {
                                const embed = new MessageEmbed()
                                    .setColor('#FF0009')
                                    .setTitle('ROB | PERSON')
                                    .setDescription('That person is not registered on our system!')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            }
                        } else if (args[0].toLowerCase() == 'heist') {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('ROB | HEIST')
                                .setDescription('Coming soon!')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('ROB')
                            .setDescription(`You are injured! You need to get fully healed to do activites. Type \`${client.config.prefix}checkups\` to see the doctor`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('ROB')
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