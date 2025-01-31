const ResponseHandler = require("../../utils/ResponseHandler");
const UserCrud_crud = require("../../services/users-crud");
const UserModule = new UserCrud_crud();

/*
    The Auth Oprations For The Users
*/

const login = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const { email, password } = req.body;
        const user = await UserModule.filterBy({ email });
        if (!user.length > 0) {
            return responseHandler.error("User not found", 404);
        }
        const userData = await UserModule.getById(user[0]._id);
        const isMatch = await userData.comparePassword(password);
        if (!isMatch) {
            return responseHandler.error("Invalid credentials", 401);
        }
        const token = await userData.generateToken();
        return responseHandler.success({ token }, "Login successful", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


const register = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const { email } = req.body;
        const user = await UserModule.filterBy({ email });
        if (user.length > 0) {
            return responseHandler.error("User already exists", 400);
        }
        const newUser = await UserModule.create(req.body);
        const token = await newUser.generateToken();
        return responseHandler.success({ token }, "Registration successful", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}



module.exports = {

    login,
    register,
}