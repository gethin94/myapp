module.exports = function(req, res) {
  res.send('This views directory is ' + req.app.get('views'))
}