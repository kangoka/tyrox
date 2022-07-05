const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "bless",
    aliases: [],
    description: "Spawn a cash to a user",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id != parseInt(client.config.owner)) return message.reply("LMAO, imagine :eyes:")
        if ((!args[0] || !args[1]) || isNaN(parseInt(args[1])) || isNaN(parseInt(args[0]))) return message.reply(`Bad format! Example: \`${client.config.prefix}bless 348489801407922196 1000\``)
        args[1] = parseInt(args[1])

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const user = await db.collection("users").find({
                    uid: (args[0]).toString()
                }).toArray();

                if (user[0] == undefined) return message.reply("User not found")

                bnow = user[0].cash + args[1];
                await db.collection("users").updateOne({
                    uid: user[0].uid
                }, {
                    $set: {
                        cash: bnow
                    }
                });

                const embed = new MessageEmbed()
                    .setColor('#00FF11')
                    .setTitle('SPAWN CASH')
                    .setDescription('You spawned `' + formatNumber(args[1]) + '` cash to **' + user[0].displayName + '**')
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                message.channel.send({embeds: [embed]});
            })
        } catch (e) {
            console.log(e);
        }
    },
};