const {
    Message,
    Client,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require("discord.js");

module.exports = {
    name: "rps",
    aliases: [],
    description: "Play RPS game with your friend",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user = message.mentions.members.first();
        if (!user) return message.reply('Please mention a **valid** user to play with')
        if (user.user.id == message.author.id) return message.reply('You can\'t play with **yourself** smh')
        if (user.user.bot) return message.reply("You can't play with **bots**!")

        let confe = new MessageEmbed()
            .setDescription(`Waiting for **${user.user.username}** to accept your game of **RPS**`)
            .setColor("BLUE")
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

        let confirm = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Accept')
                .setStyle('SUCCESS')
                .setCustomId('accept')
                .setEmoji("872694899080855563"),
                new MessageButton()
                .setLabel('Decline')
                .setStyle('DANGER')
                .setCustomId('decline')
                .setEmoji("872694849059561603")
            )


        message.reply({
            embeds: [confe],
            components: [confirm],
            allowedMentions: {
                repliedUser: false
            }
        }).then(m => {
            let filter = (button) => button.user.id == user.user.id;
            const collector = m.createMessageComponentCollector({
                filter,
                type: 'BUTTON',
                time: 60000
            })
            collector.on('collect', (button) => {
                if (button.customId == 'decline') {
                    button.deferUpdate()
                    return collector.stop('decline')
                }
                button.deferUpdate()
                let pick = new MessageEmbed()
                    .setTitle(`${message.author.username} VS. ${user.user.username}`)
                    .setColor("RANDOM")
                    .setDescription("Choose either 🪨, 📄, or ✂️")

                let choices = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('rock')
                        .setStyle('SECONDARY')
                        .setEmoji("🪨"),
                        new MessageButton()
                        .setCustomId('paper')
                        .setStyle('SECONDARY')
                        .setEmoji("📄"),
                        new MessageButton()
                        .setCustomId('scissors')
                        .setStyle('SECONDARY')
                        .setEmoji("✂️")
                    )

                m.edit({
                    embeds: [pick],
                    components: [choices]
                })

                collector.stop()


                let users = new Set()
                users.add(message.author.id)
                users.add(user.user.id)
                let ping, pong;
                let filter = (b) => users.has(b.user.id)
                const collect = m.createMessageComponentCollector({
                    type: 'BUTTON',
                    time: 60000
                })
                collect.on('collect', (b) => {
                    users.delete(b.user.id)
                    if (b.user.id == user.user.id) {
                        ping = b.customId;
                        b.reply({
                            content: `You have choosen **${(b.customId)}**`,
                            ephemeral: true
                        })
                    }
                    if (b.user.id == message.author.id) {
                        pong = b.customId;
                        b.reply({
                            content: `You have choosen **${(b.customId)}**`,
                            ephemeral: true
                        })
                    }
                    if (users.size == 0) return collect.stop()
                })
                collect.on('end', (c, reason) => {
                    if (reason == 'time') {
                        let timeout = new MessageEmbed()
                            .setTitle('Timeout')
                            .setColor("RED")
                            .setDescription('A player did not pick in time, so I cancelled the game')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        m.edit({
                            embeds: [timeout],
                            components: []
                        })
                    } else {
                        if (ping == 'rock' && pong == 'scissors') {
                            let embed = new MessageEmbed()
                                .setTitle(`${user.user.username} Wins!`)
                                .setColor("GREEN")
                                .setDescription('**Rock** made **Scissors** broken!\nWinner: *Rock*')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            m.edit({
                                embeds: [embed],
                                components: []
                            })
                        } else if (ping == 'scissors' && pong == 'rock') {
                            let embed = new MessageEmbed()
                                .setTitle(`${message.member.user.username} Wins!`)
                                .setColor("GREEN")
                                .setDescription('**Rock** made **Scissors** broken!\nWinner: *Rock*')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            m.edit({
                                embeds: [embed],
                                components: []
                            })
                        } else if (ping == 'scissors' && pong == 'paper') {
                            let embed = new MessageEmbed()
                                .setTitle(`${user.user.username} Wins!`)
                                .setColor("GREEN")
                                .setDescription('**Scissors** cuts **Paper**! Rest in pieces!\nWinner: *Scissors*')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            m.edit({
                                embeds: [embed],
                                components: []
                            })
                        } else if (ping == 'paper' && pong == 'scissors') {
                            let embed = new MessageEmbed()
                                .setTitle(`${message.author.username} Wins!`)
                                .setColor("GREEN")
                                .setDescription('**Scissors** cuts **Paper**! Rest in pieces!\nWinner: *Scissors*')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            m.edit({
                                embeds: [embed],
                                components: []
                            })
                        } else if (ping == 'paper' && pong == 'rock') {
                            let embed = new MessageEmbed()
                                .setTitle(`${user.user.username} Wins!`)
                                .setColor("GREEN")
                                .setDescription('**Paper** wraps up **Rock**!\nWinner: *Paper*')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            m.edit({
                                embeds: [embed],
                                components: []
                            })
                        } else if (ping == 'rock' && pong == 'paper') {
                            let embed = new MessageEmbed()
                                .setTitle(`${message.member.user.username} Wins!`)
                                .setColor("GREEN")
                                .setDescription('**Paper** wraps up **Rock**!\nWinner: *Paper*')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            m.edit({
                                embeds: [embed],
                                components: []
                            })
                        } else {
                            let embed = new MessageEmbed()
                                .setTitle('Draw!')
                                .setColor("BLUE")
                                .setDescription(`Both players chose ${mem}!\nWinner: *None*`)
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            m.edit({
                                embeds: [embed],
                                components: []
                            })
                        }
                    }
                })
            })
            collector.on('end', (collected, reason) => {
                if (reason == 'time') {
                    let embed = new MessageEmbed()
                        .setTitle('Timeout')
                        .setColor("RED")
                        .setDescription(`**${user.user.username}** did not confirm before 60 seconds of time`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    m.edit({
                        embeds: [embed],
                        components: []
                    })
                }
                if (reason == 'decline') {
                    let embed = new MessageEmbed()
                        .setTitle("Declined")
                        .setColor("RED")
                        .setDescription(`**${user.user.username}** has declined your game of RPS`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    m.edit({
                        embeds: [embed],
                        components: []
                    })
                }
            })
        })
    },
};