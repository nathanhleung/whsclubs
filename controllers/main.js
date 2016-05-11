exports.home = (req, res) => {
  res.render('home', {
    title: 'Credit Sheet Search'
  });
};

exports.dash = (req, res) => {
  res.render('dash', {
    title: 'Club Dashboard',
  });
};

exports.gradecalc = (req, res) => {
  res.render('gradecalc', {
    title: 'Grade Calculator',
  });
};