const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Get list of commands how to use them\nAlias: `h`",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const directories = [...new Set(client.commands.map(cmd => cmd.directory))].filter((cmd) => cmd != 'admin')

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter((cmd) => cmd.directory === dir).map(cmd => {
                return {
                    name: cmd.name || 'the command doesn\'t exist',
                    description: cmd.description || 'no description'
                }
            })

            return {
                directory: formatString(dir),
                commands: getCommands
            }
        });

        const embed = new MessageEmbed().setDescription("Select a category in the dropdown menu")

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder('Select a category')
                .setDisabled(state)
                .addOptions(
                    categories.map((cmd) => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Commands from ${cmd.directory} category`
                        }
                    })
                )
            )
        ]

        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false)
        })

        const filter = (interaction) => interaction.user.id === message.author.id

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 60000
        })

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values
            const category = categories.find(x => x.directory.toLowerCase() === directory)

            const categoryEmbed = new MessageEmbed()
                .setTitle(`${directory[0].toUpperCase()}${directory.slice(1).toLowerCase()} commands`)
                .setDescription('Here are the list of commands')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `${cmd.name}`,
                            value: cmd.description,
                            inline: true
                        }
                    })
                )

            interaction.update({
                embeds: [categoryEmbed]
            })
        })

        collector.on('end', () => {
            initialMessage.edit({
                components: components(true)
            })
        })

    },
};