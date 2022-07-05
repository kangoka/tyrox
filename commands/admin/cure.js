const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "cure",
    aliases: [],
    description: "",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id != parseInt(client.config.owner)) return message.reply("LMAO, imagine :eyes:")
        if ((!args[0] || isNaN(parseInt(args[0])))) return message.reply(`Bad format! Example: \`${client.config.prefix}cure 348489801407922196\``)

        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const user = await db.collection("users").find({
                    uid: (args[0]).toString()
                }).toArray();

                if (user[0] == undefined) return message.reply("User not found")
                if (user[0].cooldown.injured == 0) return message.reply("User isn't injured")

                injured = user[0].cooldown.injured - user[0].cooldown.injured;
                await db.collection("users").updateOne({
                    uid: user[0].uid
                }, {
                    $set: {
                        "cooldown.injured": injured
                    }
                });

                const embed = new MessageEmbed()
                    .setColor('#00FF11')
                    .setTitle('CURE INJURY')
                    .setDescription('You cured **' + user[0].displayName + '**')
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                message.channel.send({embeds: [embed]});
            })
        } catch (e) {
            console.log(e);
        }
    },
};