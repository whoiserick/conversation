const fs = require('fs');

module.exports = {
  execute(message, args, personalidades) {
    const novoUsuario = {
      usuarioId: message.author.id,
      dataHora: new Date(),
      comando: '!personalidade',
      tomDeVoz: args[0],
      estiloDeComunicacao: args[1],
      topicoPreferido: args[2]
    };

    personalidades.push(novoUsuario);

    // Salva as personalidades no arquivo JSON
    fs.writeFile('data/personalidades.json', JSON.stringify(personalidades), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Personalidades salvas com sucesso!');
      }
    });

    message.channel.send('Personalidade definida com sucesso!');
  },
};
