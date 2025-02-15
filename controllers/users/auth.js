const ResponseHandler = require("../../utils/ResponseHandler");

const UserCrud_crud = require("../../services/users-crud");
const UserModule = new UserCrud_crud();

const EventCrud_crud = require("../../services/event-crud");
const EventModule = new EventCrud_crud();

const bcrypt = require("bcrypt")


const userProfileBasicData = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {

        const isExist = UserModule.getById(req.userId);
        if (!isExist) {
            return responseHandler.error("User Not Found", 404);
        }
        const updatedUser = await UserModule.update(req.userId, req.body);
        return responseHandler.success({
            _id: updatedUser._id,
            fname: updatedUser.fname,
            lname: updatedUser.lname,
            email: updatedUser.email,
            location: updatedUser.location,
            phone: updatedUser.phone
        }, "User Updated Successfully", 200);

    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const changePassword = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const { oldPassword, newPassword } = req.body
        const userData = await UserModule.getById(req.userId);

        if (!userData) {
            return responseHandler.error("User Not Found", 404);
        }


        const isMatch = await userData.comparePassword(oldPassword);
        if (!isMatch) {
            return responseHandler.error("Invalid credentials", 401);
        }

        const hashPassword = await bcrypt.hash(newPassword, 12);
        await UserModule.update(req.userId, { password: hashPassword });

        return responseHandler.success("Password Updated Successfully", 200);

    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const myProfile = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const userData = await UserModule.getById(req.userId);
        if (!userData) {
            return responseHandler.error("User Not Found", 404);
        }

        const userEvents = await EventModule.getAll();

        return responseHandler.success({
            user: {
                _id: userData._id,
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
                location: userData.location,
                phone: userData.phone
            },
            events: userEvents.slice(-3)

        }, "User Data", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

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
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return responseHandler.error("Invalid credentials", 401);
        }
        const token = await user.generateToken();
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
    userProfileBasicData,
    changePassword,
    myProfile
}