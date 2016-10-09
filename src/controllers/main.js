export function home(req, res) {
  res.render('home', {
    title: 'Credit Sheet Search'
  });
};

export function notfound(req, res) {
  res.render('404', {
    title: '404 - Page Not Found',
  });
};
