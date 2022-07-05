const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: ['servinfo', 'si'],
    description: "Get the this information\nAlias: `si`, `servinfo`",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role);
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        const members = message.guild.members.cache;

        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addFields({
                name: 'General',
                value: `**Name:** ${message.guild.name.toString()}\n` + 
                    `**ID:** ${(message.guild.id).toString()}\n` + 
                    `**Owner:** <@${(message.guild.ownerId).toString()}>\n` + 
                    `**Boost Tier:** ${(message.guild.premiumTier).toString() ? `Tier ${(message.guild.premiumTier).toString()}` : 'None'}\n` +
                    `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter].toString()}\n` +
                    `**Verification Level:** ${verificationLevels[message.guild.verificationLevel].toString()}\n` +
                    `**Created:** ${(message.guild.createdAt).toString()}`,
            },{
                name: 'Statistics',
                value: `**Role Count:** ${roles.length.toString()}\n` + 
                `**Emoji Count:** ${emojis.size.toString()}\n` + 
                `**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size.toString()}\n` + 
                `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size.toString()}\n` + 
                `**Member Count:** ${message.guild.memberCount.toString()}\n` + 
                `**Boost Count:** ${message.guild.premiumSubscriptionCount.toString() || '0'}\n`
            })
            // .addField("Statistics", ["**Role Count:**"])
                // `**Emoji Count:** ${emojis.size.toString()}`,
                // `**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size.toString()}`,
                // `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size.toString()}`,
                // `**Member Count:** ${message.guild.memberCount.toString()}`,
                // `**Humans:** ${members.filter(member => !member.user.bot).size.toString()}`,
                // `**Bots:** ${members.filter(member => member.user.bot).size.toString()}`,
                // `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size.toString()}`,
                // `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size.toString()}`,
                // `**Boost Count:** ${message.guild.premiumSubscriptionCount.toString() || '0'}`,
                // '\u200b'
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png')
        message.channel.send({
            embeds: [embed]
        });
    },
};