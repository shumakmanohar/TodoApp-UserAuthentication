module.exports = function checknotAuthenticated(req,res,next)
{
  if(req.isAuthenticated())
  {
    return res.redirect('/todo')
  }
  next()
}