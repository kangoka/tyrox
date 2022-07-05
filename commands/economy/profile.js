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
    name: "profile",
    aliases: ['p'],
    description: `Check a user profile\nUsage: \`${prefix}profile <@user>\` for checking others profile or \`${prefix}p\` to check your profile\nAlias: \`p\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
		let user = message.author.id;
		let thumbnail = message.author.displayAvatarURL();
        if (!isNaN(args[0])) return message.reply(`C'mon, you need mention the user`)
		if (args[0]) {
			user = message.mentions.users.first().id;
			thumbnail = message.mentions.users.first().displayAvatarURL();
		}

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: user
                }).toArray();

                if (users[0] != undefined) {
                    const then = new Date(users[0].registered);
                    const now = new Date();
                    const diff = now.getTime() - then.getTime();
                    const days = diff / (24 * 3600 * 1000)
                    const embed = new MessageEmbed()
                        .setColor('#00FF11')
                        .setTitle('PROFILE')
                        .setThumbnail(thumbnail)
                        .addFields({
                            name: 'User',
                            value: `<@${user.toString()}>`
                        }, {
                            name: 'Cash',
                            value: (formatNumber(users[0].cash))
                        }, {
                            name: 'Bank',
                            value: users[0].bank < 1000 ? users[0].bank.toString() : (formatNumber(users[0].bank))
                        }, {
                            name: 'Dirty Money',
                            value: users[0].dirtymoney < 1000 ? users[0].dirtymoney.toString() : (formatNumber(users[0].dirtymoney))
                        }, {
                            name: '\u200B',
                            value: '\u200B'
                        }, {
                            name: 'Intelligence',
                            value: users[0].stats.int.toString() + ' points',
                            inline: true
                        }, {
                            name: 'Agility',
                            value: users[0].stats.agi.toString() + ' points',
                            inline: true
                        }, {
                            name: 'Strength',
                            value: users[0].stats.str.toString() + ' points',
                            inline: true
                        }, {
                            name: '\u200B',
                            value: '\u200B'
                        }, {
                            name: 'Items',
                            value: Object.keys(users[0].inventory.items).map((key) => {
                                return `${key[0].toUpperCase()}${key.slice(1).toLowerCase()} (${users[0].inventory.items[key]})`
                            }).join(", ") || "-"
                        }, {
                            name: 'Weapons',
                            value: users[0].inventory.weapons || "-"
                        }, {
                            name: '\u200B',
                            value: '\u200B'
                        }, {
                            name: 'Total Win',
                            value: formatNumber(users[0].gambling.totcoins.win)
                        }, {
                            name: 'Total Lose',
                            value: formatNumber(users[0].gambling.totcoins.lose)
                        }, {
                            name: 'Coinflip (Solo)',
                            value: 'Win: `' + users[0].gambling.coinflip.win.toString() + '`\nLose: `' + users[0].gambling.coinflip.lose.toString() + '`',
                            inline: true
                        }, {
                            name: 'Coinflip (Duo)',
                            value: 'Win: `' + users[0].gambling.coinflipd.win.toString() + '`\nLose: `' + users[0].gambling.coinflipd.lose.toString() + '`',
                            inline: true
                        }, {
                            name: 'Dice (Solo)',
                            value: 'Win: `' + users[0].gambling.dice.win.toString() + '`\nLose: `' + users[0].gambling.dice.lose.toString() + '`\nSnake Eyes: `' + users[0].gambling.dice.snakeeyes.toString() + '`',
                            inline: true
                        }, {
                            name: 'Dice (Duo)',
                            value: 'Win: `' + users[0].gambling.diced.win.toString() + '`\nLose: `' + users[0].gambling.diced.lose.toString() + '`',
                            inline: true
                        }, {
                            name: 'Slot',
                            value: 'Win: `' + users[0].gambling.slot.win.toString() + '`\nLose: `' + users[0].gambling.slot.lose.toString() + '`\nJackpot: `' + users[0].gambling.slot.jackpot.toString() + '`',
                            inline: true
                        }, {
                            name: 'Roullete',
                            value: 'Win: `' + users[0].gambling.roullete.win.toString() + '`\nLose: `' + users[0].gambling.roullete.lose.toString() + '`\nJackpot: `' + users[0].gambling.roullete.jackpot.toString() + '`',
                            inline: true
                        }, {
                            name: 'Crash',
                            value: 'Win: `' + users[0].gambling.crash.win.toString() + '`\nLose: `' + users[0].gambling.crash.lose.toString() + '`',
                            inline: true
                        }, {
                            name: '\u200B',
                            value: '\u200B'
                        }, {
                            name: 'Badge',
                            value: users[0].badge == "" ? '-' : users[0].badge,
                            inline: true
                        }, {
                            name: 'Account Age',
                            value: days.toFixed(0).toString() + ' days',
                            inline: false
                        })
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                    client.close()
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('PROFILE')
                        .addFields({
                            name: `Not Found`,
                            value: 'User that you tag is not registered.'
                        })
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                }
                client.close()
            })
        } catch (e) {
            client.close()
            console.log(e);
        }
    },
};