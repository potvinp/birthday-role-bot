# Discord Role Management Bot

This Discord bot allows only Community Moderators and Community Admins to grant and remove the Birthday role to users on demand with the `/birthdaygrant` and `/birthdayrevoke` commands.

## Requirements
- **Node.js**: v22 or higher
- **npm Packages**:
  - `discord.js`
  - `@discordjs/rest`
  - `dotenv`
- **Discord Intents**:
  - Presence Intent
  - Server Members Intent
  - Message Content Intent
- **Permissions**:
  - The bot requires Administrator permissions in your Discord server.

## Installation
1. **Clone the repository**:
```sh
git clone https://github.com/potvinp/birthday-role-bot.git
cd discord-role-management-bot
```

2. **Install the required npm packages**:
```sh
npm install discord.js @discordjs/rest dotenv
```

3. **Set up your environment variables**:
Create a `.env` file in the root of your project directory and add your bot token and client ID:

```env
BOT_TOKEN=your-bot-token
CLIENT_ID=your-client-id
```

4. **Configure Intents**:
Ensure your bot has the following intents enabled:
- Presence Intent
- Server Members Intent
- Message Content Intent

You can enable these intents in the [Discord Developer Portal](https://discord.com/developers/applications) under your application's settings.

5. **Grant Administrator Permissions**:
Ensure your bot has Administrator permissions in your Discord server to manage roles and read messages.

## Usage

1. **Run the bot**:
```sh
node index.js
```

2. **Commands**:
- `/birthdaygrant`: Grant the Birthday role to a user.
- `/birthdayrevoke`: Remove the Birthday role from a user.

These commands can only be used by users with the Community Moderator or Community Admin roles.

## Development
Feel free to contribute to the project by opening issues or submitting pull requests. Ensure to follow the code style and include appropriate tests.
