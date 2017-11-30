import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(app.get('port'), () => {
        console.log('Scrumify listening on port ' + app.get('port'));
});

export { app };