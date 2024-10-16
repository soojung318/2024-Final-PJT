let router = require('express').Router();


router.get('/monitoring', function (req, res) {

  if (!req.session.user) {
    return res.render('auth/login.ejs', { csrfToken: req.csrfToken(), user: req.session.user });
  }

  const sessionUserId = req.session.user.userid;

  // 관리자 권한 확인: userid가 "admin"인지 확인
  if (sessionUserId !== 'admin') {
    return res.render('auth/error.ejs', { message: '접근 권한이 없습니다.', redirect: '/auth/login' });
  }

  const csrfToken = req.csrfToken();
  res.render('monitoring/monitoring.ejs', { csrfToken, user: req.session.user });
});

module.exports = router;