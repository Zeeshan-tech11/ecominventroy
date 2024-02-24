export const isAuthorized = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.redirect("/login");
  }
};
