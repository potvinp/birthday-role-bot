const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const roleToGrantOrRemove = '1090681449528705087';
const authorizedRoles = ['745229208720113705', '745228689536581694'];

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, member, options } = interaction;

    if (!member.roles.cache.some(role => authorizedRoles.includes(role.id))) {
        await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        return;
    }

    const targetUser = options.getUser('user');

    if (commandName === 'birthdaygrant') {
        const role = interaction.guild.roles.cache.get(roleToGrantOrRemove);
        const targetMember = interaction.guild.members.cache.get(targetUser.id);
        await targetMember.roles.add(role);
        await interaction.reply({ content: `Granted the Birthday role to ${targetUser.username}`, ephemeral: true });
    } else if (commandName === 'birthdayrevoke') {
        const role = interaction.guild.roles.cache.get(roleToGrantOrRemove);
        const targetMember = interaction.guild.members.cache.get(targetUser.id);
        await targetMember.roles.remove(role);
        await interaction.reply({ content: `Removed the Birthday role from ${targetUser.username}`, ephemeral: true });
    }
});

client.login(token);

const rest = new REST({ version: '9' }).setToken(token);

const commands = [
    {
        name: 'birthdaygrant',
        description: 'Grant the Birthday role to a user',
        options: [
            {
                name: 'user',
                type: 6,
                description: 'The user to grant the role to',
                required: true,
            },
        ],
    },
    {
        name: 'birthdayrevoke',
        description: 'Remove the Birthday role from a user',
        options: [
            {
                name: 'user',
                type: 6,
                description: 'The user to remove the role from',
                required: true,
            },
        ],
    },
];

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
