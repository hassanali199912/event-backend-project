const jwt = require("jsonwebtoken");
const ResponseHandler = require("../utils/ResponseHandler");
const UserCrud = require("../services/users-crud");
const UserModule = new UserCrud();
const BASIC_CRUD = require("../services/index-crud");

module.exports.checkToken = async (req, res, next) => {
  const responseHandler = new ResponseHandler(res);
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return responseHandler.authorizathionError("Not authenticated.");
    }

    let token = req.get("Authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!decodedToken) {
      return responseHandler.authorizathionError("Not authenticated.");
    }
    const user = await UserModule.getById(decodedToken.id);
    if (!user) {
      return responseHandler.authorizathionError("Not authenticated.");
    }
    req.userId = user._id;
    next();
  } catch (err) {
    return responseHandler.error(err.message, 500, err);
  }
};

module.exports.isAdmin = async (req, res, next) => {
  const responseHandler = new ResponseHandler(res);
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return responseHandler.authorizathionError("Not authenticated.");
    }

    let token = req.get("Authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!decodedToken) {
      return responseHandler.authorizathionError("Not authenticated.");
    }
    const user = await UserModule.getById(decodedToken.id);
    if (!user) {
      return responseHandler.authorizathionError("Not authenticated.");
    }
    if (user.role !== "CODEMODE") {
      return responseHandler.authorizathionError("Not authenticated.");
    }
    req.userId = user._id;

    next();
  } catch (err) {
    return responseHandler.error(err.message, 500, err);
  }
};

module.exports.isOwner = (module) => {
  return async (req, res, next) => {
    const responseHandler = new ResponseHandler(res);
    const CRUD = new BASIC_CRUD(module);
    try {
      const isExist = await CRUD.getById(req.params.id);
      if (!isExist) {
        return responseHandler.notFound("Not found");
      }
      if (isExist.userId.toString() !== req.userId.toString()) {
        return responseHandler.authorizathionError("Not authenticated.");
      }
      next();
    } catch (err) {
      return responseHandler.error(err.message, 500, err);
    }
  };
}
