{
  let clipBoardContent = '';

  let mf = {
    button: document.querySelector('#mf-btn'),
    clear: document.querySelector('#mf-clear'),
    in: document.querySelector('#mf-in'),
    out: document.querySelector('#mf-out'),
  };
  let sql = {
    button: document.querySelector('#sqlmin-btn'),
    clear: document.querySelector('#sqlmin-clear'),
    in: document.querySelector('#sqlmin-in'),
    out: document.querySelector('#sqlmin-out'),
  };

  mf.button.addEventListener('click', function() {

    if (!window.isSecureContext) {
      throw new Error('Context is not secure');
    }

    navigator.clipboard.readText().then(text => {
      let temp = text;
      mf.in.value = temp;

      temp = temp.replace(/"/g, '\\"')
        .replace(/\$x\$/g, '\\$x\\$')
        .replace(/;;/g, ';')
        .replace(/^--.*\r?\n/gm, '')
        .replace(/^\s*\r?\n/gm, '')
        .replace(/\s\s+/g, ' ')
        .replace(/.+/gm, function(match) {
          return `$this->addSql("${match}");`;
        });

      mf.out.value = temp;
      clipBoardContent = temp;

    }).then(() => {
      navigator.clipboard.writeText(clipBoardContent).catch(err => {
        console.log('Failed to write to clipboard: ', err);
      });
    }).catch(err => {
      console.log('Failed to read from clipboard', err);
    });

    changeButtonContent(mf.button, 'Copied!', 'Format and copy');
  });

  mf.clear.addEventListener('click', function() {
    mf.in.value = '';
    mf.out.value = '';
  });

  sql.button.addEventListener('click', function() {
    navigator.clipboard.readText().then(text => {
      let temp = text;
      sql.in.value = temp;

      temp = temp.replace(/\s\s+/g, ' ').replace(/\n/g, ' ');

      sql.out.value = temp;
      clipBoardContent = temp;

    }).then(() => {
      navigator.clipboard.writeText(clipBoardContent).catch(err => {
        console.log('Failed to write to clipboard: ', err);
      });
    }).catch(err => {
      console.log('Failed to read from clipboard', err);
    });
    changeButtonContent(sql.button, 'Copied!', 'Minify and copy');
  });

  sql.clear.addEventListener('click', function() {
    sql.in.value = '';
    sql.out.value = '';
  });
}