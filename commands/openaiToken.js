const fs = require('fs');

module.exports = {
  execute(message, args) {
    const newToken = args[0];
    fs.writeFile('.env', `OPENAI_API_KEY=${newToken}`, (err) => {
      if (err) throw err;
      console.log('Token da OpenAI atualizado com sucesso!');
      message.channel.send(`Token da OpenAI atualizado com sucesso para: ${newToken}`);
    });
  },
};
