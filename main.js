require('dotenv').config(); // variáveis do .env
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAIAPI } = require('openai');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const openai = new OpenAI({ 
  key: process.env.CHATGPT_API_KEY, 
  models: ['davinci'] 
});

let personalidades = [];
let cargosAutorizados = process.env.CARGOS_AUTORIZADOS.split(',');

// Load the personalities from JSON
fs.readFile('data/personalidades.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  personalidades = JSON.parse(data);
  console.log('Personalidades carregadas com sucesso!');
});

client.once('ready', () => {
  console.log('Bot está online!');
});

const commands = {
  personalidade: require('./commands/personalidade.js'), // Set a personality
  token: require('./commands/token.js'), // OpenAi Token too (not tested)
  role: require('./commands/role.js'), // Manage the roles
  openaiToken: require('./commands/openaiToken.js'), // Change the OpenAi Token (API)
};

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content;
  const args = content.slice('!'.length).trim().split(/ +/);

  const command = args.shift().toLowerCase();

  if (command === 'token') {
    if (message.member.roles.cache.some(role => cargosAutorizados.includes(role.id))) {
      commands.token.execute(message, args);
    } else {
      message.channel.send('Você não tem permissão para executar este comando.');
    }
    return;
  }

  if (command === 'openaitoken') {
    if (message.member.roles.cache.some(role => cargosAutorizados.includes(role.id))) {
      commands.openaiToken.execute(message, args);
    } else {
      message.channel.send('Você não tem permissão para executar este comando.');
    }
    return;
  }

  if (command === 'role') {
    if (message.member.roles.cache.some(role => cargosAutorizados.includes(role.id))) {
      const subCommand = args.shift().toLowerCase();
      const cargoID = args[0];

      commands.role.execute(message, subCommand, cargoID, cargosAutorizados);
    } else {
      message.channel.send('Você não tem permissão para executar este comando.');
    }
    return;
  }

  // News commands here
});

function construirPrompt(mensagem, personalidade) {
  let prompt = mensagem;

  if (personalidade.tomDeVoz) {
    prompt = `Tom de voz: ${personalidade.tomDeVoz}\n${prompt}`;
  }

  if (personalidade.estiloDeComunicacao) {
    prompt = `Estilo de comunicação: ${personalidade.estiloDeComunicacao}\n${prompt}`;
  }

  if (personalidade.topicoPreferido) {
    prompt = `Tópico preferido: ${personalidade.topicoPreferido}\n${prompt}`;
  }

  return prompt;
}

const token = process.env.DISCORD_TOKEN;
client.login(token);
