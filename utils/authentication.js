const Auth = (redirectPath = '/login') => (req, res, next) => {
    if (req.session.logged_in) {
      next();
    } else {
      res.redirect(redirectPath);
    }
  };
  
  module.exports = Auth;