function verifyAdmin(req, res, next) {
  try {
    //TODO: need to get data from query
    if (req?.user?.user?.email != "hrachh@codal.com") {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Unauthenticated" });
    }
    next();
  } catch (e) {
    return res.status(400).json("Unauthorized");
  }
}

module.exports = verifyAdmin;
