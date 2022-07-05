const {
    Message,
    Client,
    MessageEmbed,
    MessageButton,
    MessageActionRow,
    MessageAttachment
} = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "shoot-on-iphone",
    aliases: ['soi'],
    description: "Generate random shot on iPhone video\nAlias: `soi`",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let data = await fetch("https://shot-on-iphone.studio/api/video")
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
            .setURL(data.url)
            .setColor('RANDOM')
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');


        const attachment = new MessageAttachment(data.url);

        let msg = await message.channel.send({
            files: [attachment],
            components: [row]
        })

        let filter = (i) => i.user.id === message.author.id;

        const collector = await msg.createMessageComponentCollector({
            filter,
            type: "BUTTON"
        })


        collector.on("collect", async (i) => {
            if (i.customId === "memerate") {
                await i.deferUpdate();
                let meme2 = await fetch("https://shot-on-iphone.studio/api/video")
                    .then(r => r.json())

                const attachment = new MessageAttachment(meme2.url);

                return msg.edit({
                    files: [attachment]
                })
            }
            if (i.customId === "memeclose") {
                return msg.delete();
            }
        })
    },
};