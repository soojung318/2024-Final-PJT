let router = require('express').Router();


router.get('/monitoring', function (req, res) {

  if (!req.session.user) {
    return res.render('auth/login.ejs', { csrfToken: req.csrfToken(), user: req.session.user });
  }

  const csrfToken = req.csrfToken();
  res.render('monitoring/monitoring.ejs', { csrfToken, user: req.session.user });
});

module.exports = router;