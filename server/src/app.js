import express from 'express';
import path from 'path';
import logger from 'morgan';

import * as apiCtrl from './controllers/api';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', '..', 'client', '_build'), {
  maxAge: '1y',
}));
app.use(logger('dev'));

app.get('/api/club-data', apiCtrl.clubData);

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}!`);
});

export default app;