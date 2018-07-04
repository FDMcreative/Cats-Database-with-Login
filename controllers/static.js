function indexRoute(req,res){
  res.redirect('/cats');
}

module.exports = {
  index: indexRoute
};
