import * as http from 'http';
import * as path from 'path';
import Server from './server';

const app = new Server().app;

app.set('port', (process.env.PORT || 3000));

/**
 * Default path to deliver Angular app
 */
app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
});

/**
 * Start HTTP Server on specified port
 */
app.listen(app.get('port'), () => {
        console.log('Scrumify listening on port ' + app.get('port'));
});
