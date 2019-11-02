import express = require('express');
import { utils } from './utils';

const app = express();

app.listen(4000, () => console.log(`App listening on port 4000!`));

app.get('*', (req, res) => {
    switch(req.url){
        case '/':
          res.sendFile(utils.getRootPath('/index.html'));
          break;
        case '/dist/main.js':
            res.sendFile(utils.getRootPath('/dist/main.js'));
          break;
    }
});