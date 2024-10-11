let router = require('express').Router();

// 관리자 페이지
router.get('/admin', async function (req, res) {
  return res.render('auth/admin.ejs');
});

module.exports = router;