var express = require('express');
var router = express.Router();
var path = require('path')
var query = require('../config/db')

/* GET home page. */
// 连接 MySql 数据库
router.get('/id', function(req, res,net) {

  // 防止跨域 测试使用
  // res.header("Access-Control-Allow-Origin", "*");

  // var id = req.query.id;

  query('SELECT * FROM name_list WHERE id = ?', [req.query.id], function(err, rows, fields) {

    let resultsMsg = {}
    if (err) {
      console.log(err);
      // throw err;
      res.status(500).send(err)
    }else{
      resultsMsg = {
        code: 0,
        msg: '请求成功',
        data: rows[0]
      }
      res.status(200).send(resultsMsg);
    }
  })
});

// 设置模板
router.get('/temple', function(req, res, next) {
  res.render('index', { title: 'Tobi' })
});

// 获取 body 的参数 
router.post('/profile', function(req, res, next) {
  console.log(req.body.id);
  res.status(200).send('成功')
});

// 设置 cookie
router.get('/cookie', function(req, res) {
  res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
  res.status(200).send("设置cookie成功")
});

// 清除cookie  测试未成功 -- 失败
router.get('/clearCookie', function(req, res) {
  res.clearCookie('rememberme', { path: '/' })
  res.status(200).send('清除成功')
});

// 下载 测试未通过
router.get('/download', function(req, res) {
  res.download('/images/2.jpg');
  res.status(200).send('下载成功')
});

// jsonp 测试未通过
router.get('/back', function(req, res) {
  res.jsonp({ user: 'tobi' });
});

// 302 重定向
router.get('/redirect', function(req, res) {
  res.redirect('https://www.baidu.com');
});

// send 测试
router.get('/sendText', function(req, res) {
  // res.set("Content-Type", "text/html");
  res.send('<p>some html</p>')
})

// sendfile  地址从 c: 开始查找
router.get('/file', function(req, res) {
  res.status(200).sendFile('/Users/gethin/Desktop/myapp/public/images/2.jpg')
})

// router.route 避免路由重复命名
router.route('/user/:user_id')
  .all(function(req, res, next) {
    next()
  })
  .get(function(req, res) {
    res.status(200).send({name: 'gethin'})
  })
  .post(function(req, res) {
    res.status(200).send({[req.params.user_id]: '啦啦啦'})
  })

module.exports = router;
