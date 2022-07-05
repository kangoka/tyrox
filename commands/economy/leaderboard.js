const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');
const { prefix } = require('../../json/config.json')

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

module.exports = {
    name: "leaderboard",
    aliases: ['lb'],
    description: `Check global leaderboard\nUsage: \`${prefix}leaderboard <cash/bank>\`\nAlias: \`lb\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`Bad format! Example: \`${client.config.prefix}leaderboard cash\``)
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                const query = {};
                if (users[0] != undefined) {
                    if (args[0].toLowerCase() == 'cash') {
                        const sortCash = {
                            cash: -1
                        };

                        const cashCursor = await db.collection("users").find(query).sort(sortCash).limit(10).toArray();
                        const cashList = cashCursor.map((value, index) => {
                            return `\`#${index + 1}\` ${value.displayName} **|** ${formatNumber(value.cash)}\n`
                        }).join(' ')

                        const embed = new MessageEmbed()
                            .setColor('#00FF11')
                            .setTitle('LEADERBOARD')
                            .setDescription(cashList + "\n\nCurrently we only show the top 10")
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    } else if (args[0].toLowerCase() == 'bank') {
                        const sortBank = {
                            bank: -1
                        };

                        const bankCursor = await db.collection("users").find(query).sort(sortBank).limit(10).toArray();
                        const bankList = bankCursor.map((value, index) => {
                            return `\`#${index + 1}\` ${value.displayName} **|** ${formatNumber(value.bank)}\n`
                        }).join(' ')

                        const embed = new MessageEmbed()
                            .setColor('#00FF11')
                            .setTitle('LEADERBOARD')
                            .setDescription(bankList + "\n\nCurrently we only show the top 10")
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    } else {
                        message.reply("Current available sort is by cash or bank")
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('LEADERBOARD')
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