const {
    Message,
    Client,
    MessageEmbed,
} = require("discord.js")
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "laundry",
    aliases: [''],
    description: "Laundry your dirty money",
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
                    const hasItem = Object.keys(users[0].inventory.items).includes('phone')
                    if (hasItem) {
                        if (users[0].dirtymoney > 10000) {
                            const embed = new MessageEmbed()
                                .setColor('#eded50')
                                .setTitle('LAUNDRY')
                                .setDescription(`Processing...`)
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            }).then(async m => {
                                await new Promise(r => setTimeout(r, 5000));

                                bnow = users[0].cash + (users[0].dirtymoney - 5000) 
                                await db.collection("users").findOneAndUpdate({
                                    uid: message.author.id,
                                }, {
                                    $set: {
                                        cash: bnow,
                                        dirtymoney: 0
                                    }
                                });

                                embed.setTitle('LAUNDRY')
                                embed.setColor('#00FF11')
                                embed.setDescription(`Success, you receive \`${users[0].dirtymoney - 5000}\``)
                                embed.setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                m.edit({
                                    embeds: [embed]
                                })
                                client.close()
                            })
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('LAUNDRY')
                                .setDescription('You don\'t have enough dirty money')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('LAUNDRY')
                            .setDescription('You need a phone to do money laundering')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('LAUNDRY')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                }
            })
        } catch (e) {
            console.log(e);
        }
    },
};