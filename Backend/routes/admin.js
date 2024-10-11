
let router = require('express').Router();

// BackendServer auth
// DB Setup
const { setup } = require('../utils/setup_db');


// admin계정에서 회원 list 불러오기
router.get('/admin', async function (req, res) {
  const { mysqldb } = await setup();
  const sessionuser = req.headers['sessionuser'];

  if (!sessionuser) {
      return res.status(401).json({ alertMsg: '인증되지 않은 사용자' });
  }

  const page = parseInt(req.query.page) || 1; // 현재 페이지 번호, 기본값은 1
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 10; // 페이지당 항목 수, 기본값은 10
  const offset = (page - 1) * itemsPerPage;

  const [users] = await mysqldb.promise().query(`SELECT * FROM users ORDER BY id DESC LIMIT ?, ?`, [offset, itemsPerPage]);
  const [totalCount] = await mysqldb.promise().query('SELECT COUNT(*) as count FROM users');
  const totalPages = Math.ceil(totalCount[0].count / itemsPerPage);

  res.json({
      users,
      totalPages,
      currentPage: page
  });
});


module.exports = router;