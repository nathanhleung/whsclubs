import express from 'express';
import path from 'path';
import logger from 'morgan';

import * as mainCtrl from './controllers/main';
import * as apiCtrl from './controllers/api';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public'), {
  maxAge: '1y',
}));
app.use(logger('dev'));
app.use((req, res, next) => {
  res.locals.basedir = app.get('views');
  next();
});

// app.get('/', mainCtrl.home);
app.get('/api/club-data', apiCtrl.clubData);

app.get('*', mainCtrl.notfound);

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}!`);
});

export default app;