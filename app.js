const express = require('express');
const path = require('path');
const logger = require('morgan');

const mainCtrl = require('./controllers/main');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
}));
app.use('/static', express.static(path.join(__dirname, 'static'), {
  maxAge: '1y',
}));
app.use(logger('dev'));
app.use((req, res, next) => {
  res.locals.basedir = app.get('views');
  next();
});

app.get('/', mainCtrl.home);
app.get('/key_club', mainCtrl.key_club);
app.get('/science_club', mainCtrl.science_club);
app.get('/soph_committee', mainCtrl.soph_committee);

app.get('/dash', mainCtrl.dash);
app.get('/gradecalculator', mainCtrl.gradecalc);

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}!`);
});