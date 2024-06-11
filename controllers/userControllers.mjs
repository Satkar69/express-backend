import { userSchema } from "../models/userModels.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// cost factor which determines how much time is needed to calculate a single bcrypt hash
const saltRounds = 10;

// jwt secret to sign the token
const jwtSecretKey = process.env.JWT_SECRET;

/**
 * @param {*} req --> '{*}' tells req can be of any type
 * @param {*} res
 * @returns String
 */

// functi0n to create new user

export const createUser = async (req, res) => {
  // destructure the keys from request body
  const { username, email, password } = req.body;

  // check if required field are filled
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter the required fields",
    });
  }

  try {
    // get the user with the email
    const existingUser = await userSchema.findUnique({
      where: {
        email: email,
      },
    });

    // check if the user with the given email already exists
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: `User with the email ${email} already exists`,
      });
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // store the new user
    await userSchema.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "The user has been created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 *
 * @param {*} plainTextPassword
 * @param {*} salt
 * @returns hash
 */

// Asynchronous function to hash the password
const hashPassword = async (plainTextPassword) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
};

/**
 * @param {*} req --> '{*}' tells req can be of any type
 * @param {*} res
 * @returns String
 */

// function to read all users

export const getUsers = async (req, res) => {
  try {
    const users = await userSchema.findMany();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 *
 * @param {*} plainTextPassword
 * @param {*} hashedPassword
 * @returns boolean
 */

// Asynchronous function to hash the password
const comparePassword = async (plainTextPassword, hashedPassword) => {
  return bcrypt.compare(
    plainTextPassword,
    hashedPassword,
    function (err, result) {}
  );
};

/**
 * @param {*} req --> '{*}' tells req can be of any type
 * @param {*} res
 * @returns String
 */

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter the required fields",
    });
  }

  try {
    const existingUser = await userSchema.findUnique({
      where: {
        email: email,
      },
    });

    // check if the email exists
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `The user with the email'${email}' does not exist`,
      });
    }

    // check if the hash of the password matches the hash stored in db
    const checkPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "The password you have entered is incorrect",
      });
    }

    // generate jwt token
    const token = jwt.sign({ user_id: existingUser.id }, jwtSecretKey, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
