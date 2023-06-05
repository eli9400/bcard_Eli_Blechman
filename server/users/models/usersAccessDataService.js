const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const bcrypt = require("bcrypt");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user = await user.save();

      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      if (!user)
        throw new Error("Authentication Error: Invalid email or password");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword)
        throw new Error("Authentication Error: Invalid email or password");

      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

/* const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      return Promise.resolve({ normalizedUser, userId });
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update not in mongodb");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      return Promise.resolve(`user no. ${userId} change his business status!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card liked not in mongodb");
}; */
/* const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    console.log("1");
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      });
      if (!updatedUser)
        throw new Error("Could not find this user in the database");

      const user = lodash.pick(updatedUser, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("Update user not available in MongoDB");
};
 */

/* const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { password, ...otherData } = normalizedUser;

      // Hash and salt the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the normalizedUser object with the new hashed password
      const updatedUser = { ...otherData, password: hashedPassword };

      // Update the user in the database
      const user = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
      if (!user) throw new Error("Could not find this user in the database");

      const userResponse = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(userResponse);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("Update user not available in MongoDB");
}; */
const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { password, ...otherData } = normalizedUser;

      // Hash and salt the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the normalized User object with the new hashed password
      const updatedUser = { ...otherData, password: hashedPassword };

      // Update the user in the database
      const user = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
      if (!user) throw new Error("Could not find this user in the database");

      const userResponse = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(userResponse);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("Update user not available in MongoDB");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("Could not find this user in the database");

      user.businessStatus = !user.businessStatus; // Toggle the business status

      await user.save();

      return Promise.resolve(
        `User no. ${userId} has updated business status: ${user.businessStatus}`
      );
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve(
    "Change user business status not available in MongoDB"
  );
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      return Promise.resolve(`user no. ${userId} deleted!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
