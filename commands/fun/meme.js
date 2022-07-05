const {
    Message,
    Client,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "meme",
    aliases: [''],
    description: "Generate random meme and sometimes it's making your day",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let data = await fetch("https://api.popcatdev.repl.co/meme")
            .then(r => r.json())

        const button1 = new MessageButton()
            .setLabel("Generate")
            .setStyle("PRIMARY")
            .setCustomId("memerate")
            .setEmoji("🔁")

        const button2 = new MessageButton()
            .setLabel("Close")
            .setStyle("DANGER")
            .setCustomId("memeclose")
            .setEmoji("🔒")

        const row = new MessageActionRow()
            .addComponents(button1)
            // .addComponents(button2)

        const newEmbed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(data.url)
            .setColor('RANDOM')
            .setDescription(`👍 ${data.upvotes} 💬 ${data.comments}`)
            .setImage(data.image)
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

        let msg = await message.channel.send({
            embeds: [newEmbed],
            components: [row]
        })

        let filter = (i) => i.user.id === message.author.id;

        const collector = await msg.createMessageComponentCollector({
            filter,
            type: "BUTTON"
        })


        collector.on("collect", async(i) => {
            if (i.customId === "memerate") {
                await i.deferUpdate();
                let meme2 = await fetch("https://api.popcatdev.repl.co/meme")
                    .then(r => r.json())

                const emb2 = new MessageEmbed()
                    .setTitle(meme2.title)
                    .setURL(meme2.url)
                    .setColor('RANDOM')
                    .setDescription(`👍 ${meme2.upvotes} 💬 ${meme2.comments}`)
                    .setImage(meme2.image)
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

                return msg.edit({
                    embeds: [emb2]
                })
            }
            if (i.customId === "memeclose") {
                return msg.delete();
            }
        })
    },
};