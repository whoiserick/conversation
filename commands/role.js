client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const content = message.content;
  const args = content.slice('!'.length).trim().split(/ +/);

  const command = args.shift().toLowerCase();

  if (command === 'role') {
    const subCommand = args.shift().toLowerCase();
    const cargoID = args[0];

    if (subCommand === 'add') {
      cargosAutorizados.push(cargoID);
      fs.writeFile('.env', `CARGOS_AUTORIZADOS=${cargosAutorizados.join(',')}`, (err) => {
        if (err) throw err;
        console.log('Cargos autorizados atualizados com sucesso!');
      });
    } else if (subCommand === 'remove') {
      cargosAutorizados = cargosAutorizados.filter(id => id !== cargoID);
      fs.writeFile('.env', `CARGOS_AUTORIZADOS=${cargosAutorizados.join(',')}`, (err) => {
        if (err) throw err;
        console.log('Cargos autorizados atualizados com sucesso!');
      });
    }
  }

  //
});
