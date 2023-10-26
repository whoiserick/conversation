const fs = require('fs');

module.exports = {
  execute(message, args) {
    if (args[0] === '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') {
      fs.writeFile('.env', `DISCORD_TOKEN=${args[1]}`, (err) => {
        if (err) throw err;
        console.log('Token atualizado com sucesso!');
        process.exit(); // Reinicia o processo para aplicar a nova configuração
      });
    } else {
      message.channel.send('Token inválido.');
    }
  },
};
