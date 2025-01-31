const express = require("express");
const router = express.Router();

//const { upload } = require("../utils/MulterImageUploader");

// const authRoutes = require("./auth");
/*======================= Admin Routes =================================== */
const admin = require("./admin/admin");
router.use("/dashboard", admin);
/*======================= Admin Routes =================================== */

/*======================= Users Routes =================================== */
const users = require("./users/users");
router.use("/users", users);
/*======================= Users Routes =================================== */





module.exports = router;
