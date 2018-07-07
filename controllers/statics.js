function indexRoute(req, res){
  res.redirect('statics/index');
}

module.exports = {
  index: indexRoute
};
