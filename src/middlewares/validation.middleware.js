export const ValidateForm = (req, res, next) => {
  const { name, desc, price, imageUrl } = req.body;
  if (!name || !desc) {
    return res.render("new-peoduct", {});
  }
  next();
};
