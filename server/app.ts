import * as http from 'http';
import * as path from 'path';
import Server from './server';

const app = new Server().app;
app.set('port', (process.env.PORT || 3000));

app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(app.get('port'), () => {
        console.log('Scrumify listening on port ' + app.get('port'));
});
